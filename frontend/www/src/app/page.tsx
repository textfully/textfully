"use client";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronRight, Play, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface NavItem {
  name: string;
  link: string;
}

const navItems: NavItem[] = [
  { name: "Docs", link: "/docs" },
  { name: "Pricing", link: "/pricing" },
  { name: "Blog", link: "/blog" },
  { name: "Resources", link: "/resources" },
];

interface CodeSnippet {
  comment: string;
  code: string;
}

const codeSnippets: Record<string, CodeSnippet> = {
  python: {
    comment: "# That's it. Just one line.",
    code: `<pre class="whitespace-pre-wrap">
<span class="text-blue-400">textfully</span>.<span class="text-[#f6c87b]">send</span><span class="text-[#f9d849]">(</span>
  <span class="text-[#b8c87d]">"+16178856037"</span><span class="text-[#f6c87b]">,</span>
  <span class="text-[#b8c87d]">"Thanks for ordering! Your Acme order #</span><span class="text-[#7698b8]">{{</span><span class="text-[#b8c87d]">order_id</span><span class="text-[#7698b8]">}}</span><span class="text-[#b8c87d]"> ships tomorrow."</span>
<span class="text-[#f9d849]">)</span></pre>`,
  },
  nodejs: {
    comment: "// That's it. Just one line.",
    code: `<pre class="whitespace-pre-wrap">
<span class="text-[#c586c0]">await</span> <span class="text-[#cbcbf1]">textfully</span>.<span class="text-[#f6c87b]">send</span><span class="text-[#f9d849]">(</span>
  <span class="text-[#b8c87d]">"+16178856037"</span><span>,</span>
  <span class="text-[#b8c87d]">\`Your verification code is $\{</span><span class="text-[#cbcbf1]">code</span><span class="text-[#b8c87d]">\}. It will expire in 10 minutes.\`</span>
<span class="text-[#f9d849]">)</span></pre>`,
  },
  go: {
    comment: "// That's it. Just one line.",
    code: `<pre class="whitespace-pre-wrap">
<span class="text-[#9cdcfe]">err</span> := <span class="text-[#cbcbf1]">textfully</span>.<span class="text-[#f6c87b]">Send</span><span class="text-[#c586c0]">(</span>
  <span class="text-[#b8c87d]">"+16178856037"</span><span>,</span>
  <span class="text-[#b8c87d]">"Reminder: Your appointment is scheduled for tomorrow at 10 AM."</span>
<span class="text-[#c586c0]">)</span></pre>`,
  },
  elixir: {
    comment: "# That's it. Just one line.",
    code: `<pre class="whitespace-pre-wrap">
<span class="text-blue-400">Textfully</span>.<span class="text-[#f6c87b]">send</span><span class="text-[#c586c0]">(</span>
  <span class="text-[#b8c87d]">"+16178856037"</span><span>,</span>
  <span class="text-[#b8c87d]">"🎉 You're confirmed for SF Tech Mixer! Join us at 7 PM tomorrow."</span>
<span class="text-[#c586c0]">)</span></pre>`,
  },
  rust: {
    comment: "// That's it. Just one line.",
    code: `<pre class="whitespace-pre-wrap">
<span>textfully</span><span class="text-[#ff8c00]">::</span><span class="text-[#f6c87b]">send</span><span class="text-[#f9d849]">(</span>
  <span class="text-[#b8c87d]">"+16178856037"</span><span>,</span>
  <span class="text-[#b8c87d]">"Thanks for ordering! Your Acme order #12345 ships tomorrow."</span>
<span class="text-[#f9d849]">)</span>;</pre>`,
  },
};

interface Language {
  id: string;
  name: string;
  icon: string;
}

const languages: Array<Language> = [
  { id: "python", name: "Python", icon: "/python-logo.svg" },
  { id: "nodejs", name: "Node.js", icon: "/nodejs-logo.svg" },
  { id: "go", name: "Go", icon: "/go-logo.svg" },
  { id: "elixir", name: "Elixir", icon: "/elixir-logo.svg" },
  { id: "rust", name: "Rust", icon: "/rust-logo.svg" },
];

interface Feature {
  title: string;
  description: string;
  cta: string;
  link: string;
}

const features: Array<Feature> = [
  {
    title: "Quick Setup",
    description: "Get API key and send your first text message in 30 seconds.",
    cta: "Try now",
    link: "/dashboard",
  },
  {
    title: "Native iMessage Support",
    description: "Send blue bubble messages with full iMessage features.",
    cta: "Learn more",
    link: "/docs",
  },
  {
    title: "Budget-Friendly",
    description:
      "Start for free and scale with simple, affordable monthly pricing.",
    cta: "Get started",
    link: "/dashboard",
  },
  {
    title: "Built for Developers",
    description:
      "Our SDK supports Python, Node.js, and other popular languages.",
    cta: "Go to Docs",
    link: "/docs",
  },
  {
    title: "Fast Compliance",
    description:
      "Get your business A2P 10DLC registration approved in days, not weeks.",
    cta: "Sign up",
    link: "/dashboard",
  },
];

interface CTA {
  name: string;
  link: string;
}

const ctas: Array<CTA> = [
  { name: "Get Started", link: "/dashboard" },
  { name: "View Docs", link: "/docs" },
];

const cardArrowVariants = {
  initial: { x: 0 },
  hover: {
    x: 4,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const cardButtonVariants = {
  initial: { opacity: 0.9 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export default function HomePage() {
  const [activeLanguage, setActiveLanguage] = useState("python");
  const [activeWidth, setActiveWidth] = useState(0);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton =
      buttonsRef.current[languages.findIndex((l) => l.id === activeLanguage)];
    if (activeButton) {
      setActiveWidth(activeButton.offsetWidth);
    }
  }, [activeLanguage]);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-8 sm:pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12">
          SMS & iMessage API for Developers
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-4 leading-relaxed">
          Textfully is an open source Twilio alternative. Send text messages
          with 1 line of code.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden font-mono text-sm">
          <div className="flex flex-col">
            {/* Window Controls */}
            <div className="flex flex-row justify-between">
              <div className="flex items-center space-x-2 p-4">
                <div className="w-3 h-3 rounded-full bg-red" />
                <div className="w-3 h-3 rounded-full bg-yellow" />
                <div className="w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="flex items-center p-4">
                <Link
                  href="/dashboard"
                  className="px-4 py-1 font-medium text-sm font-inter bg-[#15803d] hover:bg-[#16a34a] text-white rounded-md transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-1 fill-white" />
                  {/* TODO: "Run" and show output in corresponding language */}
                  <span>Try it Yourself</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-end space-x-1 overflow-x-auto whitespace-nowrap pr-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={clsx(
                      "relative flex items-center px-4 py-2 text-sm h-9 transition-all duration-200 rounded-t-lg flex-shrink-0",
                      activeLanguage === lang.id
                        ? "bg-[#3a3a3a] text-white z-10 rounded-b-none"
                        : "bg-[#2a2a2a] text-gray-400 hover:bg-[#2e2e2e] hover:text-gray-300"
                    )}
                  >
                    <img
                      src={lang.icon}
                      alt={`${lang.name} icon`}
                      className="w-4 h-4 mr-2"
                    />
                    <span className="truncate">{lang.name}</span>
                  </button>
                ))}
                <a
                  href="https://github.com/gtfol/textfully"
                  className="relative flex items-center px-2 py-2 text-sm h-9 transition-all duration-200 rounded-t-lg text-gray-400 hover:bg-[#2e2e2e] hover:text-gray-300 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </a>
              </div>
              {/* Code Content */}
              <div className="p-4 space-y-2 bg-[#3a3a3a]">
                <div className="text-[#797979]">
                  {codeSnippets[activeLanguage].comment}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: codeSnippets[activeLanguage].code,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((card) => (
            <div
              key={card.title}
              className="bg-white/5 flex flex-col justify-between backdrop-blur-sm rounded-xl p-6"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
              <div>
                <motion.a
                  href={card.link}
                  className="group text-white hover:text-gray-300 inline-flex items-center text-sm"
                  variants={cardButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {card.cta}
                  <motion.span
                    className="inline-block ml-1"
                    variants={cardArrowVariants}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-8">Built for Modern Use Cases</h2>
        <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
          <div className="text-gray-300 space-y-6">
            <div>
              <span className="text-gray-500"># Transactional Messages</span>
              <br />
              <span className="text-blue-400">textfully</span>.send(
              order.phone,
              <span className="text-orange-300">
                `Thanks for ordering! Your ${"{product}"} ships tomorrow. Here's
                your tracking number: ${"{tracking_number}"}.`
              </span>
              )
            </div>
            <div>
              <span className="text-gray-500"># Marketing Campaigns</span>
              <br />
              <span className="text-blue-400">textfully</span>.campaign.send(
              {"{"}
              <br />
              &nbsp;&nbsp;template:{" "}
              <span className="text-orange-300">`spring-sale`</span>,<br />
              &nbsp;&nbsp;audience:{" "}
              <span className="text-orange-300">`active-customers`</span>,<br />
              &nbsp;&nbsp;variables: {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;discount:{" "}
              <span className="text-orange-300">`20%`</span>
              <br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"})"}
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-32 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          Ready to Start?
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-8">
          We're cheaper, better, and faster than Twilio.
        </p>
        <div className="flex justify-center space-x-4">
          {ctas.map((cta, index) => (
            <a
              key={cta.name}
              href={cta.link}
              className={`px-6 py-2 rounded-full font-medium ${
                index === 0 ? "bg-white text-black" : "border border-gray-700"
              }`}
            >
              {cta.name}
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}