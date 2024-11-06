"use client";

import Discord from "@/assets/icons/socials/discord";
import GitHub from "@/assets/icons/socials/github";
import Logo from "@/assets/logo";
import X from "@/assets/icons/socials/x";
import { scrollToTop } from "@/utils/helper";

interface SocialLink {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
}

interface FooterLink {
  href: string;
  label: string;
}

interface FooterLinks {
  developer: FooterLink[];
  product: FooterLink[];
  company: FooterLink[];
  legal: FooterLink[];
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://twitter.com/textfully_dev",
    icon: X,
    ariaLabel: "Twitter",
  },
  {
    href: "https://github.com/gtfol/textfully",
    icon: GitHub,
    ariaLabel: "GitHub",
  },
  {
    href: "https://discord.gg/Ct6FDCpFBU",
    icon: Discord,
    ariaLabel: "Discord",
  },
];

const FOOTER_LINKS: FooterLinks = {
  developer: [
    { href: "/changelog", label: "Changelog" },
    { href: "/docs/getting-started", label: "Getting Started" },
    { href: "/docs/api-reference", label: "API Reference" },
    { href: "/docs/examples", label: "Examples" },
    { href: "/docs/sdks", label: "SDKs" },
  ],
  product: [
    { href: "/products/messages", label: "Messages" },
    { href: "/products/phone-numbers", label: "Phone Numbers" },
    { href: "/products/conversations", label: "Conversations" },
    { href: "/products/ai-agents", label: "AI Agents" },
    { href: "/pricing", label: "Pricing" },
  ],
  company: [
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-[#252525]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-12 sm:gap-24 sm:flex-row sm:flex-wrap">
          <div className="w-full sm:w-auto flex flex-row justify-between sm:justify-start items-center sm:flex-col sm:items-start sm:space-y-8">
            <button className="flex gap-x-2 items-center" onClick={scrollToTop}>
              <div className="w-5 h-5 text-[#0A93F6]">
                <Logo />
              </div>
              <p className="text-base font-semibold text-white font-general">
                Textfully
              </p>
            </button>
            <div className="flex gap-x-6">
              {SOCIAL_LINKS.map(({ href, icon: Icon, ariaLabel }) => (
                <a key={href} href={href} aria-label={ariaLabel}>
                  <Icon className="h-4 w-4 fill-zinc-400 hover:fill-zinc-200 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full sm:flex-1">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-[550] mb-4 font-general capitalize">
                  {section}
                </h3>
                <ul className="space-y-2">
                  {links.map(({ href, label }: FooterLink) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#252525] flex flex-col sm:flex-row justify-between items-center">
          <div className="text-[#50555c] text-sm mb-4 sm:mb-0">
            © 2024 gtfol, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
