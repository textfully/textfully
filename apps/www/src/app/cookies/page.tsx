import { BackToTop } from "@/components/landing/back-to-top";
import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/nav-bar";

export default function CookiesPage() {
  return (
    <>
      <NavBar shouldAnimate={false} isFixed={true} />
      <div className="max-w-4xl mx-auto px-4 py-16 mt-16">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated October 27, 2024</p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <p className="text-zinc-300 leading-relaxed">
              This Cookie Policy explains how gtfol, LLC ("Company," "we," "us,"
              and "our") uses cookies and similar technologies to recognize you
              when you visit our website at{" "}
              <a
                href="https://textfully.dev"
                className="text-[#0A93F6] hover:brightness-110"
              >
                https://textfully.dev
              </a>{" "}
              ("Website"). It explains what these technologies are and why we
              use them, as well as your rights to control our use of them.
            </p>
            <p className="text-zinc-300 leading-relaxed mt-4">
              In some cases we may use cookies to collect personal information,
              or that becomes personal information if we combine it with other
              information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">What are cookies?</h2>
            <p className="text-zinc-300 mb-4">
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </p>
            <p className="text-zinc-300 mb-4">
              Cookies set by the website owner (in this case, gtfol, LLC) are
              called "first-party cookies." Cookies set by parties other than
              the website owner are called "third-party cookies." Third-party
              cookies enable third-party features or functionality to be
              provided on or through the website (e.g., advertising, interactive
              content, and analytics). The parties that set these third-party
              cookies can recognize your computer both when it visits the
              website in question and also when it visits certain other
              websites.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why do we use cookies?</h2>
            <p className="text-zinc-300 mb-4">
              We use first- and third-party cookies for several reasons. Some
              cookies are required for technical reasons in order for our
              Website to operate, and we refer to these as "essential" or
              "strictly necessary" cookies. Other cookies also enable us to
              track and target the interests of our users to enhance the
              experience on our Online Properties. Third parties serve cookies
              through our Website for advertising, analytics, and other
              purposes. This is described in more detail below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              How can I control cookies?
            </h2>
            <p className="text-zinc-300 mb-4">
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              the Cookie Consent Manager. The Cookie Consent Manager allows you
              to select which categories of cookies you accept or reject.
              Essential cookies cannot be rejected as they are strictly
              necessary to provide you with services.
            </p>
            <p className="text-zinc-300 mb-4">
              The Cookie Consent Manager can be found in the notification banner
              and on our Website. If you choose to reject cookies, you may still
              use our Website though your access to some functionality and areas
              of our Website may be restricted. You may also set or amend your
              web browser controls to accept or refuse cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Analytics and customization cookies
            </h2>
            <p className="text-zinc-300 mb-4">
              These cookies collect information that is used either in aggregate
              form to help us understand how our Website is being used or how
              effective our marketing campaigns are, or to help us customize our
              Website for you.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left mb-4 border-collapse border border-zinc-700">
                <thead>
                  <tr className="bg-zinc-800">
                    <th className="px-4 py-2 border border-zinc-700">Name</th>
                    <th className="px-4 py-2 border border-zinc-700">
                      Purpose
                    </th>
                    <th className="px-4 py-2 border border-zinc-700">
                      Provider
                    </th>
                    <th className="px-4 py-2 border border-zinc-700">
                      Service
                    </th>
                    <th className="px-4 py-2 border border-zinc-700">Type</th>
                    <th className="px-4 py-2 border border-zinc-700">
                      Expires in
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-zinc-700">s7</td>
                    <td className="px-4 py-2 border border-zinc-700">
                      Gather data regarding site usage and user behavior on the
                      website.
                    </td>
                    <td className="px-4 py-2 border border-zinc-700">
                      api.fontshare.com
                    </td>
                    <td className="px-4 py-2 border border-zinc-700">
                      Adobe Analytics
                    </td>
                    <td className="px-4 py-2 border border-zinc-700">
                      server_cookie
                    </td>
                    <td className="px-4 py-2 border border-zinc-700">
                      session
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              How can I control cookies on my browser?
            </h2>
            <p className="text-zinc-300 mb-4">
              As the means by which you can refuse cookies through your web
              browser controls vary from browser to browser, you should visit
              your browser's help menu for more information. The following is
              information about how to manage cookies on the most popular
              browsers:
            </p>
            <ul className="list-disc pl-6 text-zinc-300 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Internet Explorer
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Edge
                </a>
              </li>
              <li>
                <a
                  href="https://help.opera.com/en/latest/web-preferences/"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Opera
                </a>
              </li>
            </ul>

            <p className="text-zinc-300 mt-4">
              In addition, most advertising networks offer you a way to opt out
              of targeted advertising. If you would like to find out more
              information, please visit:
            </p>
            <ul className="list-disc pl-6 text-zinc-300 space-y-2 mt-2">
              <li>
                <a
                  href="http://www.aboutads.info/choices/"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Digital Advertising Alliance
                </a>
              </li>
              <li>
                <a
                  href="https://youradchoices.ca/"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  Digital Advertising Alliance of Canada
                </a>
              </li>
              <li>
                <a
                  href="http://www.youronlinechoices.com/"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  European Interactive Digital Advertising Alliance
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              What about other tracking technologies, like web beacons?
            </h2>
            <p className="text-zinc-300 mb-4">
              Cookies are not the only way to recognize or track visitors to a
              website. We may use other, similar technologies from time to time,
              like web beacons (sometimes called "tracking pixels" or "clear
              gifs"). These are tiny graphics files that contain a unique
              identifier that enables us to recognize when someone has visited
              our Website or opened an email including them. This allows us, for
              example, to monitor the traffic patterns of users from one page
              within a website to another, to deliver or communicate with
              cookies, to understand whether you have come to the website from
              an online advertisement displayed on a third-party website, to
              improve site performance, and to measure the success of email
              marketing campaigns. In many instances, these technologies are
              reliant on cookies to function properly, and so declining cookies
              will impair their functioning.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Do you use Flash cookies or Local Shared Objects?
            </h2>
            <p className="text-zinc-300 mb-4">
              Websites may also use so-called "Flash Cookies" (also known as
              Local Shared Objects or "LSOs") to, among other things, collect
              and store information about your use of our services, fraud
              prevention, and for other site operations.
            </p>
            <p className="text-zinc-300 mb-4">
              If you do not want Flash Cookies stored on your computer, you can
              adjust the settings of your Flash player to block Flash Cookies
              storage using the tools contained in the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                className="text-[#0A93F6] hover:brightness-110"
              >
                Website Storage Settings Panel
              </a>
              . You can also control Flash Cookies by going to the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                className="text-[#0A93F6] hover:brightness-110"
              >
                Global Storage Settings Panel
              </a>{" "}
              and following the instructions.
            </p>
            <p className="text-zinc-300 mb-4">
              Please note that setting the Flash Player to restrict or limit
              acceptance of Flash Cookies may reduce or impede the functionality
              of some Flash applications, including, potentially, Flash
              applications used in connection with our services or online
              content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Do you serve targeted advertising?
            </h2>
            <p className="text-zinc-300 mb-4">
              Third parties may serve cookies on your computer or mobile device
              to serve advertising through our Website. These companies may use
              information about your visits to this and other websites in order
              to provide relevant advertisements about goods and services that
              you may be interested in. They may also employ technology that is
              used to measure the effectiveness of advertisements. They can
              accomplish this by using cookies or web beacons to collect
              information about your visits to this and other sites in order to
              provide relevant advertisements about goods and services of
              potential interest to you. The information collected through this
              process does not enable us or them to identify your name, contact
              details, or other details that directly identify you unless you
              choose to provide these.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              How often will you update this Cookie Policy?
            </h2>
            <p className="text-zinc-300 mb-4">
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal, or regulatory reasons. Please therefore
              revisit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
            <p className="text-zinc-300 mb-4">
              The date at the top of this Cookie Policy indicates when it was
              last updated.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Where can I get further information?
            </h2>
            <p className="text-zinc-300 mb-4">
              If you have any questions about our use of cookies or other
              technologies, please email us at textfully@gtfol.inc or by post
              to:
            </p>
            <div className="text-zinc-300">
              <p>gtfol, LLC</p>
              <p>1950 Washington St. Apt. 3A</p>
              <p>Boston, MA 02118</p>
              <p>United States</p>
            </div>
          </section>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
