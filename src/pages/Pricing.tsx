import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription at any time from your account settings. Your access will remain active until the end of your current billing period." },
    { q: "What happens if I exceed my monthly audit limit?", a: "If you hit your limit, you'll be prompted to upgrade to the next tier. We don't soft-lock your account, but further audits will be paused until upgraded." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied, just contact support." },
    { q: "Is there a discount for annual billing?", a: "Yes, we offer a 20% discount if you choose to be billed annually instead of monthly." }
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col p-8 gap-8 items-center pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center mb-10 text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          Scale your outbound engine with our flexible plans. No hidden fees or surprises.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {[
          {
            name: "Hobby",
            price: "$0",
            description: "Perfect for exploring the platform.",
            features: ["10 Audits / month", "Basic Proposals", "Community Support"],
          },
          {
            name: "Pro",
            price: "$49",
            description: "For professionals running campaigns.",
            features: ["500 Audits / month", "Advanced Proposals", "Priority Support", "Custom Branding"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For teams requiring scale and security.",
            features: ["Unlimited Audits", "White-label Reports", "Dedicated Success Manager", "SLA"],
          }
        ].map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            {/* Animated Hover Glow Behind Card */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl ${plan.popular ? 'bg-indigo-500/20' : 'bg-white/5'}`} />
            
            <div className={`flex flex-col h-full bg-[#0A0A0A] border ${plan.popular ? 'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.15)]' : 'border-[#1F1F1F] hover:border-[#2F2F2F]'} rounded-2xl overflow-hidden relative z-10 transition-colors duration-300`}>
              {plan.popular && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 text-center w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 w-12 transform skew-x-[-20deg] -translate-x-12 animate-[shimmer_3s_infinite]" />
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-light text-white mb-2">{plan.price}<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                <p className="text-sm text-zinc-400 mb-6 flex-1">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-emerald-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${plan.popular ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white hover:bg-zinc-200 text-black'}`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-3xl mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Frequently asked questions</h2>
          <p className="text-zinc-400">Everything you need to know about the product and billing.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-medium transition-colors ${openFaq === i ? 'text-indigo-400' : 'text-white'}`}>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-[#1F1F1F] bg-[#050505]/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
