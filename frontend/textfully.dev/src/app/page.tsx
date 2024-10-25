import { ChevronRight } from 'lucide-react';
import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between p-6">
        <div className="text-2xl font-bold">Textfully</div>
        <div className="hidden md:flex items-center space-x-8">
          {['About', 'Blog', 'Customers', 'Resources', 'Docs', 'Pricing'].map((item) => (
            <a key={item} href="/" className="text-gray-300 hover:text-white">{item}</a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">Sign in</a>
          <a href="/" className="bg-white text-black px-4 py-2 rounded-full flex items-center">
            Get Started <ChevronRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          SMS & iMessage for Developers
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Send and receive text messages with a few lines of code. 
          Ideal for transactional and marketing messages at scale.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#2e2e2e] rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center space-x-2 mb-4">
            {['bg-red', 'bg-yellow', 'bg-green'].map((color) => (
              <div key={color} className={`w-3 h-3 rounded-full ${color}`} />
            ))}
          </div>

          <div className="text-gray-300 space-y-2">
            <div>
              <span className="text-[#797979]"># That&apos;s it. Just one line.</span>
            </div>

            <div>
              <span className="text-blue-400">textfully</span>.<span className="text-[#f6c87b]">send</span><span className="text-[#f9d849]">(</span>
                <span className="text-[#b8c87d]">"+16178856037"</span><span className="text-[#f6c87b]">,</span>
                <span className="text-[#b8c87d]">"Thanks for ordering! Your Acme order #12345 ships tomorrow."</span>
              <span className="text-[#f9d849]">)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Quick Setup',
              description: 'Get API key and start testing in 30 seconds.',
              cta: 'Try now'
            },
            {
              title: 'Native iMessage Support',
              description: 'Send blue bubble messages with full iMessage features.',
              cta: 'Learn more'
            },
            {
              title: 'Budget-friendly',
              description: 'Get started for free and pay as you grow. (No hidden fees)',
              cta: 'Get started'
            },
            {
              title: 'Built for Developers',
              description: 'Textfully SDK supports Python, Node.js, and other popular languages.',
              cta: 'Go to Docs'
            },
            {
              title: 'Fast Compliance',
              description: 'A2P 10DLC registration approved in days, not weeks.',
              cta: 'Sign up now'
            }
          ].map((card) => (
            <div key={card.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
              <a 
                href="/" 
                className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm"
              >
                {card.cta} 
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-8">Built for Modern Use Cases</h2>
        <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
          <div className="text-gray-300 space-y-6">
            <div>
              <span className="text-gray-500"># Transactional Messages</span><br />
              <span className="text-blue-400">textfully</span>.send(
                order.phone, 
                <span className="text-orange-300">`Thanks for ordering! Your ${"{product}"} ships tomorrow. Here&apos;s your tracking number: ${"{tracking_number}"}.`</span>
              )
            </div>
            <div>
              <span className="text-gray-500"># Marketing Campaigns</span><br />
              <span className="text-blue-400">textfully</span>.campaign.send({"{"}<br />
              &nbsp;&nbsp;template: <span className="text-orange-300">`spring-sale`</span>,<br />
              &nbsp;&nbsp;audience: <span className="text-orange-300">`active-customers`</span>,<br />
              &nbsp;&nbsp;variables: {"{"}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;discount: <span className="text-orange-300">`20%`</span><br />
              &nbsp;&nbsp;{"}"}<br />
              {"})"}</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-gray-400 mb-8">
          Get your API key in 30 seconds. Start sending messages in under 5 minutes.
        </p>
        <div className="flex justify-center space-x-4">
          {['Get Started', 'View Docs', 'Contact Us'].map((text, index) => (
            <a
              key={text}
              href="/"
              className={`px-6 py-3 rounded-full font-medium ${
                index === 0 ? 'bg-white text-black' : 'border border-gray-700'
              }`}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}