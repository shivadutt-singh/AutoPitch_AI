import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Sparkles, X, MessageSquare, Bot } from 'lucide-react';

export default function Proposal() {
  const { id } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  // Format the ID from the URL (e.g., techflow-io -> techflow.io)
  const domain = id ? id.replace('-', '.') : 'example.com';
  // Attempt to load the actual domain in the iframe (using https://)
  // Note: Many popular domains set X-Frame-Options to DENY or SAMEORIGIN, 
  // so we use example.com as a fallback demo if it fails, but we'll try the requested URL.
  const targetUrl = `https://${domain}`; 

  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `Hello! I'm the AutoPitch Assistant. I've analyzed ${domain} and found significant UI/UX friction points causing an estimated $124k/year in lost revenue. Are you the owner of this site?` 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Fake AI Response logic based on "System Prompt" idea
    setTimeout(() => {
      let botReply = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('yes') || lower.includes('owner') || lower.includes('i am')) {
        botReply = "Great! Based on our scrape of your site, your Core Web Vitals are poor (LCP exceeds 4.5s) causing a 32% user drop-off. Your checkout/CTA flow lacks strong conversion anchors.\n\nOur agency can rebuild this in a modern stack (Next.js + Tailwind) to solve these bottlenecks permanently. Shall we schedule a 15-minute action call?";
      } else if (lower.includes('how') || lower.includes('show') || lower.includes('details')) {
        botReply = "Here is the breakdown of our analysis:\n\n1. 4.5s Load Time (-32% traffic)\n2. Unoptimized Mobile Flow (68% abandonment)\n3. Weak CTA placement\n\nOur agency specializes in fixing these exact issues to plug the revenue leak. When are you free to chat?";
      } else {
        botReply = "Every day you delay, you leave money on the table. Our migration package solves these performance and conversion bottlenecks permanently. Let's fix this.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      {/* Top Bar for navigation back */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 z-50 justify-between">
         <Link to="/leads" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Leads
          </Link>
          <div className="text-sm text-zinc-400 font-mono flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            Live Preview: {targetUrl}
          </div>
      </div>

      {/* The Iframe Illusion */}
      <div className="w-full h-full pt-14 bg-white">
        <iframe 
          src={targetUrl} 
          className="w-full h-full border-none opacity-90 grayscale-[0.2]"
          title="Client Website"
          sandbox="allow-scripts allow-same-origin"
          onError={(e) => {
            // Very basic fallback if iframe fails entirely, though JS can't always detect X-Frame-Options errors
          }}
        />
      </div>

      {/* Floating Chatbot Widget (Vercel Style) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-[calc(100vw-2rem)] sm:w-[380px] h-[60vh] sm:h-[500px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between bg-gradient-to-b from-[#111] to-[#0A0A0A]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white tracking-tight">AutoPitch AI</h3>
                    <p className="text-xs text-zinc-500 font-mono">Judging {domain}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-[#1F1F1F] rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] ${
                        message.role === 'user' 
                          ? 'bg-white text-black rounded-tr-sm font-medium' 
                          : 'bg-[#111] border border-[#1F1F1F] text-zinc-300 rounded-tl-sm leading-relaxed whitespace-pre-wrap'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A]">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message AutoPitch..."
                    className="w-full bg-[#111] border border-[#1F1F1F] rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-1.5 p-2 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-center mt-3">
                  <span className="text-[10px] text-zinc-600 font-medium tracking-wide uppercase">Powered by AutoPitch</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-colors relative ${
            isChatOpen ? 'bg-[#111] border border-[#1F1F1F] text-zinc-400 hover:text-white' : 'bg-white text-black hover:bg-zinc-200'
          }`}
        >
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#0A0A0A]" />
          )}
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </div>
  );
}
