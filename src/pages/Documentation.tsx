import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Terminal, Zap, ArrowLeft } from 'lucide-react';

export default function Documentation() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  const docs = [
    { 
      id: 'getting-started',
      icon: BookOpen, 
      title: "Getting Started", 
      desc: "Quick start guide to running your first analysis.",
      content: (
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>Welcome to the Orbit API. To get started, you'll need an API key from your settings dashboard.</p>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">1. Installation</h3>
            <pre className="p-4 bg-[#050505] border border-[#1F1F1F] rounded-xl text-zinc-300 font-mono overflow-x-auto">
              npm install @orbit/sdk
            </pre>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">2. Initialization</h3>
            <p>Initialize the client with your API key:</p>
            <pre className="p-4 bg-[#050505] border border-[#1F1F1F] rounded-xl text-zinc-300 font-mono overflow-x-auto">
{`import { OrbitClient } from '@orbit/sdk';

const orbit = new OrbitClient({
  apiKey: 'YOUR_API_KEY'
});`}
            </pre>
          </div>
        </div>
      )
    },
    { 
      id: 'api-reference',
      icon: Code, 
      title: "API Reference", 
      desc: "Detailed endpoints, parameters, and response schemas.",
      content: (
        <div className="space-y-8 text-zinc-400 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-mono font-bold">POST</span>
              <code className="text-white font-mono">/v1/analyze</code>
            </div>
            <p className="mb-4">Run a completely automated audit on a target domain.</p>
            
            <h4 className="text-white font-medium mb-3">Parameters</h4>
            <div className="bg-[#050505] border border-[#1F1F1F] rounded-xl divide-y divide-[#1F1F1F]">
              <div className="p-4 flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <code className="text-indigo-400 font-mono">url</code>
                  <span className="text-xs text-red-400 ml-2">Required</span>
                </div>
                <div className="md:w-3/4">The target URL to analyze.</div>
              </div>
              <div className="p-4 flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <code className="text-indigo-400 font-mono">engine</code>
                  <span className="text-xs text-zinc-500 ml-2">Optional</span>
                </div>
                <div className="md:w-3/4">LLM engine to use (claude-3-opus-v2, gpt-4o).</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'cli-tools',
      icon: Terminal, 
      title: "CLI Tools", 
      desc: "Run bulk audits directly from your terminal.",
      content: (
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>If you prefer the terminal, our CLI is the fastest way to run bulk operations.</p>
          
          <pre className="p-4 bg-[#050505] border border-[#1F1F1F] rounded-xl text-zinc-300 font-mono flex flex-col gap-2 overflow-x-auto">
            <span className="text-zinc-500"># Install globally</span>
            <span>npm install -g orbit-cli</span>
            <span className="text-zinc-500 mt-2"># Login with your token</span>
            <span>orbit login</span>
            <span className="text-zinc-500 mt-2"># Run an audit</span>
            <span>orbit audit acme-corp.com --export-pdf</span>
          </pre>
        </div>
      )
    },
    { 
      id: 'webhooks',
      icon: Zap, 
      title: "Webhooks", 
      desc: "Real-time notifications for completed background jobs.",
      content: (
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>Configure webhooks to receive payloads when long-running tasks are completed asynchronously.</p>
          
          <h3 className="text-lg font-medium text-white">Payload Structure</h3>
          <pre className="p-4 bg-[#050505] border border-[#1F1F1F] rounded-xl text-zinc-300 font-mono overflow-x-auto">
{`{
  "id": "evt_12345",
  "type": "audit.completed",
  "data": {
    "audit_id": "aud_890",
    "domain": "acme-corp.com",
    "report_url": "https://orbit.so/reports/890"
  },
  "created": 1678901234
}`}
          </pre>
          
          <p>We recommend verifying the webhook signature using your signing secret to prevent replay attacks.</p>
        </div>
      )
    },
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col p-8 gap-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
          {activeDoc ? docs.find(d => d.id === activeDoc)?.title : "Documentation"}
        </h1>
        <p className="text-zinc-400 text-sm">
          {activeDoc 
            ? docs.find(d => d.id === activeDoc)?.desc 
            : "Everything you need to integrate and build with the Orbit API."}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!activeDoc ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {docs.map((item, i) => (
                <motion.button
                  onClick={() => setActiveDoc(item.id)}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative block text-left focus:outline-none"
                >
                  {/* Animated Hover Glow Behind Card */}
                  <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-start gap-4 p-6 bg-[#0A0A0A] border border-[#1F1F1F] group-hover:border-indigo-500/30 rounded-2xl transition-colors relative z-10 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                    <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors relative overflow-hidden">
                      {/* Icon inner glow on hover */}
                      <div className="absolute inset-0 bg-indigo-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-indigo-100 transition-colors">{item.title}</h3>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                <div className="border-b border-[#1F1F1F] px-6 py-4 bg-[#050505]">
                  <h2 className="text-sm font-medium text-zinc-300">Quick Code Example</h2>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-zinc-400 leading-relaxed">
                    <code className="language-js">
{`const response = await fetch('https://api.orbit.so/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://acme-corp.com',
    engine: 'claude-3-opus-v2',
    generate_proposal: true
  })
});

const data = await response.json();
console.log(data.findings);`}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <button 
              onClick={() => setActiveDoc(null)}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800/50 w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Overview
            </button>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8">
              {docs.find(d => d.id === activeDoc)?.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
