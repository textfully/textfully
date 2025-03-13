import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/auth/verify",
  "/auth/auth-code-error",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/auth/verify") ||
    request.nextUrl.pathname.startsWith("/reset-password");

  if (request.nextUrl.pathname.startsWith("/auth/auth-code-error")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (request.nextUrl.pathname.startsWith("/reset-password")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/forgot-password";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isAuthRoute) {
    const errorParam = request.nextUrl.searchParams.get("error");
    const errorCode = request.nextUrl.searchParams.get("error_code");
    const typeParam = request.nextUrl.searchParams.get("type");

    if (errorParam === "access_denied" && errorCode === "otp_expired") {
      const redirectUrl = request.nextUrl.clone();

      if (request.nextUrl.pathname.startsWith("/auth/verify")) {
        redirectUrl.pathname =
          typeParam === "email"
            ? "/signup"
            : typeParam === "recovery"
              ? "/forgot-password"
              : "/login";
      } else if (request.nextUrl.pathname.startsWith("/reset-password")) {
        redirectUrl.pathname = "/forgot-password";
      }

      // Preserve error parameters for client-side toast
      redirectUrl.searchParams.set("error", errorParam);
      redirectUrl.searchParams.set("error_code", errorCode);
      if (typeParam) {
        redirectUrl.searchParams.set("type", typeParam);
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  const isHomePage = request.nextUrl.pathname === "/";

  // Redirect to dashboard if user is signed in and on the auth pages
  if (user && isPublicRoute) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    const decodedRedirectTo = redirectTo
      ? decodeURIComponent(redirectTo)
      : null;
    if (decodedRedirectTo?.startsWith("/")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = decodedRedirectTo;
      redirectUrl.searchParams.delete("redirectTo");
      return NextResponse.redirect(redirectUrl);
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Redirect to login if user is not signed in and trying to access dashboard
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !isHomePage &&
    !request.nextUrl.pathname.startsWith("/auth/callback")
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    // Add the original URL as a search parameter to redirect back after login
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
