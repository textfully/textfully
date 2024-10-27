import { DiscordLogo } from "@/assets/discord-logo";
import { GitHubLogo } from "@/assets/github-logo";
import Logo from "@/assets/logo";
import { XLogo } from "@/assets/x-logo";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#252525]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-row justify-between sm:space-y-8 sm:justify-start items-center sm:flex-col sm:items-start">
            <button className="flex gap-x-2 items-center" onClick={scrollToTop}>
              <div className="w-5 h-5 text-[#0A93F6]">
                <Logo />
              </div>
              <p className="text-base font-semibold text-white font-general">
                Textfully
              </p>
            </button>
            <div className="flex gap-x-6">
              <a href="https://twitter.com/textfully_dev">
                <XLogo className="h-4 w-4 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
              <a href="https://github.com/gtfol/textfully">
                <GitHubLogo className="h-4 w-4 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
              <a href="https://discord.gg/textfully">
                <DiscordLogo className="h-4 w-4 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-[550] mb-4 font-general">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/changelog"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="/docs/getting-started"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="/docs/api-reference"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="/docs/examples"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="/docs/sdks"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  SDKs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-[550] mb-4 font-general">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pricing"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/products/messages"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Messages
                </a>
              </li>
              <li>
                <a
                  href="/products/phone-numbers"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Phone Numbers
                </a>
              </li>
              <li>
                <a
                  href="/products/conversations"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Conversations
                </a>
              </li>
              <li>
                <a
                  href="/products/ai-agents"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  AI Agents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-[550] mb-4 font-general">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-zinc-400 text-sm hover:text-gray-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#252525] flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#50555c] text-sm mb-4 md:mb-0">
            © 2024 gtfol, LLC. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-[#50555c] hover:text-[#9CA3AF] text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[#50555c] hover:text-[#9CA3AF] text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
