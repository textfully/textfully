import { DiscordLogo } from "@/assets/discord-logo";
import { GitHubLogo } from "@/assets/github-logo";
import { XLogo } from "@/assets/x-logo";

export const Footer = () => {
  return (
    <footer className="border-t border-[#252525]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-row justify-between sm:space-y-8 sm:justify-start items-center sm:flex-col sm:items-start">
            <div className="flex flex-row space-x-2 items-center">
              <img src="/logo.png" alt="Logo" className="h-8" />
              <span className="font-bold text-lg sm:text-xl">Textfully</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://twitter.com/textfully_dev">
                <XLogo className="h-5 w-5 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
              <a href="https://github.com/gtfol/textfully">
                <GitHubLogo className="h-5 w-5 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
              <a href="https://discord.gg/textfully">
                <DiscordLogo className="h-5 w-5 fill-gray-400 hover:fill-gray-200 transition-colors" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/changelog"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="/docs/getting-started"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="/docs/api-reference"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="/docs/examples"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="/docs/sdks"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  SDKs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pricing"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/products/messages"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Messages
                </a>
              </li>
              <li>
                <a
                  href="/products/phone-numbers"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Phone Numbers
                </a>
              </li>
              <li>
                <a
                  href="/products/conversations"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Conversations
                </a>
              </li>
              <li>
                <a
                  href="/products/ai-agents"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  AI Agents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
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
