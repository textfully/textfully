"use client";

import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { NavBar } from "@/components/landing/nav-bar";
import clsx from "clsx";
import { Footer } from "@/components/landing/footer";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { SUBSCRIPTION_TIER } from "@/constants/enums";
import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";

export default function PricingPage() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "textfully-growth-plan" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
      });
    })();
  }, []);

  interface VolumeMark {
    value: number;
    contactLabel: string;
    messageLabel: string;
    price: string;
  }

  const volumeMarks: VolumeMark[] = [
    {
      value: 0,
      contactLabel: "Up to 500 contacts",
      messageLabel: "5k messages included",
      price: "$25",
    },
    {
      value: 20,
      contactLabel: "Up to 1,500 contacts",
      messageLabel: "25k messages included",
      price: "$49",
    },
    {
      value: 40,
      contactLabel: "Up to 5,000 contacts",
      messageLabel: "50k messages included",
      price: "$99",
    },
    {
      value: 52.5,
      contactLabel: "Up to 20,000 contacts",
      messageLabel: "100k messages included",
      price: "$199",
    },
    {
      value: 70,
      contactLabel: "Up to 40,000 contacts",
      messageLabel: "150k messages included",
      price: "$299",
    },
    {
      value: 100,
      contactLabel: "Up to 80,000 contacts",
      messageLabel: "200k messages included",
      price: "$399",
    },
  ];

  interface Plan {
    name: string;
    price: string;
    priceSuffix: string;
    features: { name: string; included: boolean; badge?: string }[];
    cta: { label: string; type: "signup" | "cal.com" };
    label?: string;
    type: "highlighted" | "primary" | "surface";
  }

  const plans: Plan[] = [
    {
      name: SUBSCRIPTION_TIER.free,
      price: "$0",
      priceSuffix: "/ month",
      features: [
        { name: "1 contact only", included: true },
        { name: "SMS/MMS only", included: true },
        { name: "500 messages included", included: true },
        { name: "Textfully phone number", included: true },
        { name: "Community support", included: true },
        { name: "No integrations", included: false },
      ],
      cta: { label: "Start for free", type: "signup" },
      type: "surface",
    },
    {
      name: SUBSCRIPTION_TIER.basic,
      price: "$10",
      label: "Most Popular",
      priceSuffix: "/ month",
      features: [
        { name: "Up to 50 contacts", included: true },
        { name: "SMS/MMS only", included: true },
        { name: "1k messages included", included: true },
        { name: "Custom phone numbers", included: true, badge: "Add-on" },
        { name: "Basic email support", included: true },
        { name: "3-day data retention", included: true },
      ],
      cta: { label: "Get started", type: "signup" },
      type: "primary",
    },
    {
      name: SUBSCRIPTION_TIER.pro,
      price: "$25",
      label: "Best Value",
      priceSuffix: "/ month",
      features: [
        { name: "Up to 100 contacts", included: true },
        { name: "SMS/MMS & iMessage", included: true },
        { name: "5k messages included", included: true },
        { name: "Custom phone numbers", included: true, badge: "Add-on" },
        { name: "Priority email support", included: true },
        { name: "7-day data retention", included: true },
      ],
      cta: { label: "Get started", type: "signup" },
      type: "highlighted",
    },
    {
      name: SUBSCRIPTION_TIER.growth,
      price: "Custom",
      priceSuffix: "",
      features: [
        { name: "Unlimited contacts", included: true },
        { name: "SMS/MMS & iMessage", included: true },
        { name: "Unlimited messages", included: true },
        { name: "Custom phone numbers", included: true, badge: "Add-on" },
        { name: "24/7 premium support", included: true },
        { name: "Custom data retention", included: true },
      ],
      cta: { label: "Contact us", type: "cal.com" },
      type: "surface",
    },
  ];

  const getCurrentVolumeContactLabel = () => {
    const mark = volumeMarks.find((mark) => mark.value === sliderValue);
    return mark ? mark.contactLabel : volumeMarks[0].contactLabel;
  };

  const getCurrentVolumeMessageLabel = () => {
    const mark = volumeMarks.find((mark) => mark.value === sliderValue);
    return mark ? mark.messageLabel : volumeMarks[0].messageLabel;
  };

  const getCurrentVolumePrice = () => {
    const mark = volumeMarks.find((mark) => mark.value === sliderValue);
    return mark ? mark.price : volumeMarks[0].price;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavBar isFixed={true} />
      <div className="p-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <m.div
            className="text-center mt-16 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl mb-4 font-general font-[550]">Pricing</h1>
            <p className="text-base text-zinc-400">
              Start for free and scale as you grow.
            </p>
          </m.div>

          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {plans.map((plan, index) => {
              const highlightedButtonClassNames = clsx(
                "w-full rounded-lg relative mt-auto py-3 font-medium transition text-center",
                plan.type === "highlighted"
                  ? "bg-gradient-to-b hover:brightness-110 from-primary to-[#36a1ed] text-white shadow-sm"
                  : plan.type === "primary"
                    ? "bg-white text-black hover:bg-white/80"
                    : "bg-[#42444c] text-white hover:bg-[#4c4e57] shadow-sm"
              );

              return (
                <m.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className={clsx(
                    "flex flex-col justify-start rounded-xl bg-transparent",
                    plan.type === "highlighted" ? "" : "mt-4"
                  )}
                >
                  <div className="w-full px-2 pt-2 pb-1 flex items-center justify-between">
                    <p className="text-sm font-general font-medium text-white">
                      {plan.name}
                    </p>
                    {plan.label && (
                      <div
                        className={cn(
                          "px-2 py-1 rounded-lg",
                          plan.type === "highlighted"
                            ? "bg-primary/30"
                            : "bg-white/20"
                        )}
                      >
                        <p
                          className={cn(
                            "text-xs font-medium",
                            plan.type === "highlighted"
                              ? "text-primary"
                              : "text-white"
                          )}
                        >
                          {plan.label}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-full p-1 h-full">
                    <div className="w-full bg-[#2F3037] h-full flex flex-col relative p-4 rounded-xl">
                      <div className="inset-0 absolute element-dark !rounded-xl">
                        <div
                          className={cn(
                            "inset-0 absolute element opacity-30 !rounded-[11px]",
                            plan.type === "highlighted"
                              ? "!bg-[#0b93f6]/40 !border-white"
                              : ""
                          )}
                        ></div>
                      </div>
                      <div className="text-4xl font-medium mb-2 font-general relative">
                        {plan.type === "highlighted"
                          ? getCurrentVolumePrice()
                          : plan.price}
                        {plan.priceSuffix && (
                          <span className="text-sm font-normal ml-2 text-[#8a8a8a]">
                            {plan.priceSuffix}
                          </span>
                        )}
                      </div>
                      {plan.type === "highlighted" && (
                        <div className="pt-4 relative">
                          <Slider
                            value={[sliderValue]}
                            onValueChange={([val]) => {
                              const closest = volumeMarks.reduce(
                                (prev, curr) =>
                                  Math.abs(curr.value - val) <
                                  Math.abs(prev.value - val)
                                    ? curr
                                    : prev
                              );
                              setSliderValue(closest.value);
                            }}
                            max={95}
                            step={2.5}
                            className="w-full"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-y-4 mt-4 mb-6">
                        {plan.features.map((feature, index) => (
                          <div
                            key={feature.name}
                            className="flex items-center text-[13px]"
                          >
                            {feature.included ? (
                              <Check className="w-5 h-5 text-white mr-2 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-[#8a8a8a] mr-2 flex-shrink-0" />
                            )}
                            <span
                              className={
                                feature.included
                                  ? "text-white"
                                  : "text-[#8a8a8a]"
                              }
                            >
                              {index === 0 && plan.type === "highlighted"
                                ? getCurrentVolumeContactLabel()
                                : index === 2 && plan.type === "highlighted"
                                  ? getCurrentVolumeMessageLabel()
                                  : feature.name}
                              {feature.badge && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-zinc-300 text-zinc-900 font-medium rounded-md">
                                  {feature.badge}
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                      {plan.cta.type === "cal.com" ? (
                        <button
                          className={highlightedButtonClassNames}
                          data-cal-link="gtfol/textfully-growth-plan"
                          data-cal-config='{"layout":"month_view"}'
                        >
                          <div className="inset-0 absolute element-dark !rounded-lg">
                            <div
                              className={cn(
                                "inset-0 absolute element opacity-30 !rounded-[7px]"
                              )}
                            ></div>
                          </div>
                          {plan.cta.label}
                        </button>
                      ) : (
                        <Link
                          href="/signup"
                          className={highlightedButtonClassNames}
                        >
                          <div className="inset-0 absolute element-dark !rounded-lg">
                            <div className="inset-0 absolute element opacity-30 !rounded-[7px]"></div>
                          </div>
                          {plan.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
