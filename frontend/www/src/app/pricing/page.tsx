'use client';

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { NavBar } from "@/components/NavBar";

export default function PricingPage() {
  const [messageType, setMessageType] = useState("transactional");
  const [volume, setVolume] = useState(0);

  const volumeMarks = [
    { value: 0, label: "3,000" },
    { value: 12.5, label: "50,000" },
    { value: 25, label: "100,000" },
    { value: 37.5, label: "200,000" },
    { value: 50, label: "500,000" },
    { value: 62.5, label: "1,000,000" },
    { value: 75, label: "1,500,000" },
    { value: 87.5, label: "2,500,000" },
    { value: 100, label: "3,000,000+" },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      messages: "3,000 messages / mo",
      features: [
        { name: "Ticket Support", included: true },
        { name: "1-day Data Retention", included: true },
        { name: "1 Phone Number", included: true },
        { name: "100 messages a day", included: false },
        { name: "Multi-Region", included: false },
        { name: "Single Sign-On", included: false },
        { name: "Dedicated IPs", included: false },
      ],
      cta: "Get started",
    },
    {
      name: "Pro",
      price: "$20",
      messages: "50,000 messages / mo",
      features: [
        { name: "Ticket Support", included: true },
        { name: "3-day Data Retention", included: true },
        { name: "10 Phone Numbers", included: true },
        { name: "No daily limit", included: true },
        { name: "Multi-Region", included: true },
        { name: "Single Sign-On", included: false },
        { name: "Dedicated IPs", included: false },
      ],
      cta: "Get started",
    },
    {
      name: "Scale",
      price: "$90",
      messages: "100,000 messages / mo",
      features: [
        { name: "Slack & Ticket Support", included: true },
        { name: "7-day Data Retention", included: true },
        { name: "1,000 Phone Numbers", included: true },
        { name: "No daily limit", included: true },
        { name: "Multi-Region", included: true },
        { name: "Single Sign-On", included: true },
        { name: "Dedicated IP with Add-on", included: true },
      ],
      cta: "Get started",
    },
    {
      name: "Enterprise",
      price: "Custom",
      messages: "A plan based on your specific needs",
      features: [
        { name: "Priority Support", included: true },
        { name: "Flexible Data Retention", included: true },
        { name: "Flexible Phone Numbers", included: true },
        { name: "No daily limit", included: true },
        { name: "Multi-Region", included: true },
        { name: "Single Sign-On", included: true },
        { name: "Dedicated IPs with Add-on", included: true },
      ],
      cta: "Contact us",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4">Pricing</h1>
            <p className="text-xl text-gray-400">
              Start for free and scale as you grow.
            </p>
          </div>

          <div className="mb-16">
            <div className="flex justify-center gap-4 mb-8">
              <button
                className={`px-4 py-2 rounded-lg ${
                  messageType === "transactional"
                    ? "bg-gray-800"
                    : "bg-transparent text-gray-400"
                }`}
                onClick={() => setMessageType("transactional")}
              >
                Transactional Messages
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  messageType === "marketing"
                    ? "bg-gray-800"
                    : "bg-transparent text-gray-400"
                }`}
                onClick={() => setMessageType("marketing")}
              >
                Marketing Messages
              </button>
            </div>

            <div className="w-full px-8">
              <Slider
                value={[volume]}
                onValueChange={([val]) => setVolume(val)}
                max={100}
                step={12.5}
                className="w-full"
              />
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                {volumeMarks.map((mark) => (
                  <div key={mark.value} className="text-center">
                    <div>{mark.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-gray-900 rounded-xl p-6">
                <div className="mb-8">
                  <h3 className="text-xl mb-4">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">{plan.price} / mo</div>
                  <div className="text-gray-400 text-sm">{plan.messages}</div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-white text-black rounded-full py-3 font-medium hover:bg-gray-200 transition-colors">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
