"use client";

import Elixir from "@/assets/icons/languages/elixir";
import Go from "@/assets/icons/languages/go";
import NodeJS from "@/assets/icons/languages/nodejs";
import Python from "@/assets/icons/languages/python";
import Rust from "@/assets/icons/languages/rust";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import { PhoneNotifications } from "@/components/phone-notifications";
import { cn } from "@/utils/helper";
import { motion as m } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

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
  <span class="text-[#b8c87d]">"Your table is ready! See the host within 5 minutes or you'll lose your spot."</span>
<span class="text-[#f9d849]">)</span>;</pre>`,
  },
};

interface Language {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const languages: Language[] = [
  { id: "python", name: "Python", icon: <Python /> },
  { id: "nodejs", name: "Node.js", icon: <NodeJS /> },
  { id: "go", name: "Go", icon: <Go /> },
  { id: "elixir", name: "Elixir", icon: <Elixir /> },
  { id: "rust", name: "Rust", icon: <Rust /> },
];

interface Feature {
  title: string;
  description: string;
  cta: string;
  link: string;
}

const features: Feature[] = [
  {
    title: "Quick Setup",
    description:
      "Get an API key and send your first text message in 30 seconds.",
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
    title: "Affordable Pricing",
    description:
      "Start building for free and scale as you grow. No hidden fees. Cancel anytime.",
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
  {
    title: "All Your Messaging Needs",
    description:
      "Explore other products including Phone Numbers, Conversations, AI Agents, and more.",
    cta: "Learn more",
    link: "/products",
  },
];

interface CTA {
  name: string;
  link: string;
}

const ctas: CTA[] = [
  { name: "View Docs", link: "/docs" },
  { name: "Get Started", link: "/dashboard" },
];

export default function HomePage() {
  const [activeLanguage, setActiveLanguage] = useState("python");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const time = new Date().getTime();

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(time);
    setFormattedTime(formattedTime);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavBar />
      <div className="h-[calc(100vh-4rem)] max-w-3xl mx-auto flex items-center">
        <div className="w-full px-6 lg:px-4">
          <m.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
              className="w-52 h-52 mx-auto overflow-hidden relative ring-2"
            >
              <PhoneNotifications />
            </div>
            <m.h1
              className="text-4xl sm:text-5xl font-[550] text-balance font-general"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              iMessage & SMS API for Developers
            </m.h1>
            <m.p
              className="text-sm sm:text-base text-zinc-400 mt-6 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Textfully is an open source Twilio alternative. Send text messages
              with 1 line of code.
            </m.p>
          </m.div>
          <m.div
            className="w-full"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="w-full bg-[#212126] rounded-xl relative mt-10">
              <div className="inset-0 absolute element-dark !rounded-xl">
                <div className="inset-0 absolute element opacity-10 !rounded-[11px]"></div>
              </div>
              <div className="w-full flex justify-between items-center h-10 px-4 pr-1.5">
                <div className="flex gap-x-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <Link href="/docs">
                  <button className="px-3 py-1.5 mt-0.5 hover:bg-white/5 transition rounded-lg flex gap-x-1.5 items-center">
                    <Play className="w-3 h-3 fill-[#838284] stroke-[#838284]" />
                    <span className="text-xs font-medium">Try it Out</span>
                  </button>
                </Link>
              </div>
              <div className="w-full h-px bg-zinc-900 z-30 relative"></div>
              <div className="w-full flex px-0.5">
                <div className="w-full h-px bg-white/5"></div>
              </div>
              <div className="p-2 w-full flex gap-x-2 pb-1 overflow-x-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={cn(
                      "text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-x-2",
                      activeLanguage === lang.id
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <div className="w-4 h-4">{lang.icon}</div>
                    <p>{lang.name}</p>
                  </button>
                ))}
              </div>
              {/* Code Snippet */}
              <div className="w-full p-1">
                <div className="w-full bg-[#2F3037] relative p-4 rounded-[8px]">
                  <div className="inset-0 absolute element-dark">
                    <div className="inset-0 absolute element opacity-30"></div>
                  </div>
                  <>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: codeSnippets[activeLanguage].code,
                      }}
                    />
                    <br />
                    <div className="text-[#797979] text-sm font-mono">
                      {codeSnippets[activeLanguage].comment}
                    </div>
                  </>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      <m.div
        className="max-w-3xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <div className="flex flex-col gap-6 message-list w-full">
          {features.map((card, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                className={cn(
                  "w-full max-w-md flex flex-col relative",
                  isEven ? "mr-auto" : "ml-auto"
                )}
              >
                <div
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 20%, transparent 70%)",
                  }}
                  className="inset-0 absolute element-dark z-10 !rounded-[25px]"
                >
                  <div
                    className={cn(
                      "inset-0 absolute element !rounded-[24px]",
                      isEven ? "opacity-40" : "opacity-100"
                    )}
                  ></div>
                </div>
                <div
                  key={card.title}
                  className={cn(
                    "shared bg-white/5 flex w-full flex-col rounded-xl px-6 py-3.5",
                    isEven ? "received" : "sent"
                  )}
                >
                  <h3 className="text-[16px] text-white font-semibold mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white text-[15px] mb-2 opacity-80">
                    {card.description}
                  </p>
                  <Link href={card.link} className="w-fit">
                    <p
                      className={cn(
                        "font-semibold text-sm hover:brightness-110",
                        isEven ? "text-[#0A93F6]" : "text-sky-200"
                      )}
                    >
                      {card.cta}
                    </p>
                  </Link>
                </div>
                <div className="w-full h-4 flex justify-end items-center mt-2">
                  <p
                    className={cn(
                      "text-xs text-white/50",
                      isEven || index !== features.length - 1 ? "hidden" : ""
                    )}
                  >
                    <span className="font-semibold">Read&nbsp;</span>
                    {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </m.div>

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-32 text-center">
        <h2 className="text-3xl sm:text-4xl font-[550] font-general mb-4">
          Texting doesn't have to be hard.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mb-6">
          Ditch Twilio and build faster with Textfully.
        </p>
        <div className="flex justify-center gap-x-4 message-list">
          {ctas.map((cta, index) => (
            <a
              key={cta.name}
              href={cta.link}
              className={`px-4 py-2.5 small shared rounded-full !text-white font-medium text-sm leading-none ${
                index === 0 ? "bg-white received" : "sent"
              }`}
            >
              <p>{cta.name}</p>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
