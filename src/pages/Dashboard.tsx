// @ts-ignore
const nvidiaApiKey = import.meta.env.VITE_NVIDIA_API_KEY;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle2, AlertCircle, XCircle, Play, Copy, ArrowRight, Loader2, Zap, Workflow, BarChart3, History, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const heroCode = `
function Hero() {
  return (
    <div className="relative w-full h-[500px] bg-black text-white overflow-hidden flex flex-col items-center justify-center border border-zinc-800 rounded-xl">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono mb-6 text-zinc-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          AI-Optimized Version
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 max-w-3xl">
          Stop losing <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600">68% of traffic</span> to slow loading times.
        </h1>
        
        <p className="text-zinc-400 text-lg max-w-xl mb-8">
          We rebuild sluggish websites into high-performance conversion machines using modern edge infrastructure.
        </p>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Book Action Call
          </button>
        </div>
      </div>
    </div>
  );
}
`.trim();


const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  React.useEffect(() => {
    let charIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, charIndex));
      charIndex++;
      if (charIndex > text.length) {
        clearInterval(intervalId);
      }
    }, 15);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}</span>;
};

type WarRoomApiMessage = {
  agent: string;
  message: string;
};

const AGENT_ICONS: Record<string, string> = {
  'UX Spy': '🕵️‍♂️',
  'CRO Hacker': '📈',
  'SEO Scout': '🔎',
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [activeTab, setActiveTab] = useState('audit');
  const [warRoomMessages, setWarRoomMessages] = useState<{agent: string, icon: string, text: string}[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || isSearching) {
      return;
    }

    setIsSearching(true);
    setIsAnalyzed(false);
    setSearchError('');
    setWarRoomMessages([]);

    // 🚨 WARNING: Hardcoded key for hackathon demo speed. 
    // Is key ko hackathon ke baad Nvidia portal se revoke kar dena!
    const nvidiaApiKey = "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";
    
    if (!nvidiaApiKey) {
      setSearchError('Missing NVIDIA_API_KEY. Check your code.');
      setIsSearching(false);
      return;
    }

    const systemPrompt = `
You are a "Multi-Agent War Room" analyst.
Return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
Do not include backticks.
Do not include any text before or after JSON.

Output must be EXACTLY a JSON array where each item has this shape:
[
  { "agent": "UX Spy", "message": "..." },
  { "agent": "CRO Hacker", "message": "..." },
  { "agent": "SEO Scout", "message": "..." }
]

Rules:
- Use only these agent names: UX Spy, CRO Hacker, SEO Scout.
- Every object must contain only "agent" and "message" fields.
- Produce at least 6 total messages with natural turn-taking.
- Keep recommendations specific to the provided website URL.
`.trim();

    try {
      // URL dhyan se dekhna, ab hum apne local Vite server ko call kar rahe hain
      const response = await fetch('/api/nvidia/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${nvidiaApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'abacusai/dracarys-llama-3.1-70b-instruct',
          temperature: 0.3,
          max_tokens: 1024,
          top_p: 1,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analyze this website:\n${url}` },
          ],
        }),
      });

      if (!response.ok) {
        const details = await response.text().catch(() => '');
        throw new Error(`Nvidia API request failed (${response.status}): ${details || 'No error details'}`);
      }

      const completion = await response.json();
      let rawContent = completion?.choices?.[0]?.message?.content;
      
      if (typeof rawContent !== 'string' || !rawContent.trim()) {
        throw new Error('Model returned empty content.');
      }

      // Safety Hack: Strip markdown formatting just in case the model adds ```json
      rawContent = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();

      let parsed: unknown;
      try {
        parsed = JSON.parse(rawContent);
      } catch {
        throw new Error('Model returned invalid JSON format. Try again.');
      }

      const validMessages =
        Array.isArray(parsed) &&
        parsed.every((item) =>
          item &&
          typeof item === 'object' &&
          typeof (item as WarRoomApiMessage).agent === 'string' &&
          typeof (item as WarRoomApiMessage).message === 'string'
        );

      if (!validMessages) {
        throw new Error('JSON shape mismatch. Expected: Array<{ agent: string; message: string }>.');
      }

      const normalizedMessages = (parsed as WarRoomApiMessage[]).map((item) => ({
        agent: item.agent,
        icon: AGENT_ICONS[item.agent] || '🤖',
        text: item.message,
      }));

      setWarRoomMessages(normalizedMessages);
      setIsAnalyzed(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate analysis.';
      setSearchError(message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRunFullAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Full analysis complete! Please check your email for the detailed report.');
    }, 2500);
  };

  return (
    <div className="w-full max-w-5xl flex flex-col p-4 sm:p-8 gap-8 items-center pb-32">
      {/* Hero Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center mb-10"
      >
        <div className="mb-10 text-center space-y-3 relative z-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Analyze any <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">domain</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Generate instant audits, proposals, and outreach assets.
          </p>
        </div>

        <div className="relative w-full max-w-2xl">
          {/* Animated Glow Behind Input */}
          <motion.div 
            animate={{ 
              opacity: isFocused ? 0.4 : 0.15,
              scale: isFocused ? 1.05 : 1
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-indigo-500/20 blur-[30px] rounded-full pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent blur-xl rounded-full pointer-events-none"></div>
          
          <form onSubmit={handleSearch} className="relative group w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10 transition-colors duration-300">
              <Search className={`w-5 h-5 ${isFocused ? 'text-indigo-400' : 'text-zinc-500'}`} />
            </div>
            <input
              type="url"
              placeholder="https://acme-corp.com..."
              className="w-full bg-[#0A0A0A]/80 backdrop-blur-md border border-[#1F1F1F] rounded-xl py-4 pl-12 pr-24 text-lg font-medium text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isSearching}
              required
            />
            
            {/* Old Search Loading Beam removed for War Room */}

            <div className="absolute inset-y-0 right-4 flex items-center gap-2 z-10">
              <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">&#8984;</span>
              <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">K</span>
            </div>
          </form>
        </div>
        {searchError && (
          <div className="mt-4 w-full max-w-2xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {searchError}
          </div>
        )}
      </motion.div>

      {/* Live AI War Room */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl mt-8 bg-[#090909] border border-[#1F1F1F] rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#1F1F1F] bg-[#0C0C0C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-zinc-400 flex items-center gap-2 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                LIVE AI WAR ROOM
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-6 space-y-5 min-h-[300px] flex flex-col font-mono text-sm leading-relaxed">
              {warRoomMessages.length === 0 && (
                <div className="text-zinc-500 animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                  Agents assembling...
                </div>
              )}
              
              {warRoomMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-lg">{msg.icon}</span>
                    <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">{msg.agent}</span>
                  </div>
                  <div className="text-zinc-300 pl-8 border-l-2 border-zinc-800 ml-[9px] py-1 relative">
                    <TypewriterText text={msg.text} />
                  </div>
                </motion.div>
              ))}
              
              {/* Active typing indicator */}
              {isSearching && warRoomMessages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-zinc-500 flex flex-col gap-1.5 mt-4"
                >
                  <div className="flex items-center gap-2 font-bold animate-pulse">
                    <span className="text-lg opacity-50">
                      {warRoomMessages.length % 3 === 1 ? '📈' : '🔎'}
                    </span>
                    <span className="text-indigo-400/50">
                      {warRoomMessages.length % 3 === 1 ? 'CRO Hacker' : 'SEO Scout'}
                    </span>
                  </div>
                  <div className="pl-8 border-l-2 border-zinc-800/50 ml-[9px] py-2 flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {!isSearching && warRoomMessages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-emerald-400 text-xs font-bold tracking-widest mt-6 pt-4 border-t border-[#1F1F1F] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  ANALYSIS COMPLETE.
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State / Features */}
      {!isAnalyzed && !isSearching && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
        >
          {[
            { icon: Zap, title: "Instant Audits", desc: "Get actionable insights on performance, SEO, and UX within seconds." },
            { icon: Workflow, title: "Automated Proposals", desc: "Generate client-ready proposals tailored to the specific issues found." },
            { icon: BarChart3, title: "Conversion Scripts", desc: "Get AI-generated outreach scripts to land more deals." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col p-6 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 relative z-10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-white font-medium mb-2 relative z-10 group-hover:text-indigo-100 transition-colors">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{feature.desc}</p>
            </div>
          ))}
          
          <div className="md:col-span-3 mt-8">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-4 px-2">
              <History className="w-4 h-4" />
              <span>Recent Analyses</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { url: "stripe.com", time: "2 hours ago", score: "92" },
                { url: "vercel.com", time: "5 hours ago", score: "98" }
              ].map((recent, i) => (
                <div key={i} onClick={() => { setUrl(`https://${recent.url}`); handleSearch({ preventDefault: () => {} } as React.FormEvent); }} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl hover:bg-[#0F0F0F] hover:border-[#2F2F2F] cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      <Globe className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{recent.url}</div>
                      <div className="text-[11px] text-zinc-500">{recent.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Score: {recent.score}
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Terminal */}
      <AnimatePresence>
        {isAnalyzed && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full flex-1 bg-[#090909] border border-[#1F1F1F] rounded-2xl flex flex-col overflow-hidden shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
            <div className="px-4 pt-4 border-b border-[#1F1F1F] bg-[#0C0C0C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-row items-center space-x-2 text-xs font-mono text-zinc-500 mb-2 sm:mb-0">
                <div className="flex space-x-1.5 mr-4 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <span>~ /analysis/{url.replace(/^https?:\/\//, '').split('/')[0] || 'domain'}</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] uppercase font-mono px-2 py-0.5">
                Complete
              </Badge>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden bg-black/20 backdrop-blur-sm">
              <div className="w-full h-full flex flex-col">
                {/* Tabs Navigation matching HTML structure */}
                <div className="px-4 pt-4 border-b border-[#1F1F1F] bg-[#0C0C0C] flex items-center -mt-px w-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  <div className="flex gap-1 p-1 bg-black/40 rounded-t-lg border-x border-t border-[#1F1F1F] relative min-w-max">
                    {[
                      { id: 'audit', label: 'Site Audit' },
                      { id: 'autofix', label: 'Live AI Auto-Fix (God-Mode)' },
                      { id: 'proposal', label: 'Generated Proposal' },
                      { id: 'script', label: 'Outreach Script' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors z-10 outline-none ${
                          activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute inset-0 bg-zinc-800 rounded-md -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden relative">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {activeTab === 'audit' && (
                      <motion.div
                        key="audit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="m-0 space-y-6 w-full"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Critical Issues */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.0, type: 'spring', stiffness: 100, damping: 20 }}
                        className="flex flex-col"
                      >
                      <Card className="bg-zinc-900/30 border-zinc-800 flex flex-col flex-1">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.div
                              animate={{ boxShadow: ['0 0 8px rgba(239,68,68,0.3)', '0 0 12px rgba(239,68,68,0.6)', '0 0 8px rgba(239,68,68,0.3)'] }}
                              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                              className="w-2 h-2 rounded-full bg-red-500" 
                            />
                            <CardTitle className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Critical Issues</CardTitle>
                          </div>
                          <CardDescription className="text-xs text-zinc-500">Immediate action required</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-3">
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex flex-col gap-1 text-sm text-zinc-200">
                              <div className="flex items-center gap-2 font-medium">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                No CTA above fold
                              </div>
                              <p className="text-xs text-zinc-500 pl-6">Conversions drop 40%.</p>
                            </li>
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex flex-col gap-1 text-sm text-zinc-200">
                              <div className="flex items-center gap-2 font-medium">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                Mobile LCP &gt; 4.2s
                              </div>
                              <p className="text-xs text-zinc-500 pl-6">Hero image delays render.</p>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      </motion.div>

                      {/* Warnings */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, type: 'spring', stiffness: 100, damping: 20 }}
                        className="flex flex-col"
                      >
                      <Card className="bg-zinc-900/30 border-zinc-800 flex flex-col flex-1">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.div
                              animate={{ boxShadow: ['0 0 8px rgba(245,158,11,0.3)', '0 0 12px rgba(245,158,11,0.6)', '0 0 8px rgba(245,158,11,0.3)'] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                              className="w-2 h-2 rounded-full bg-amber-500" 
                            />
                            <CardTitle className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Warnings</CardTitle>
                          </div>
                          <CardDescription className="text-xs text-zinc-500">Optimization opportunities</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-3">
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex flex-col gap-1 text-sm text-zinc-200">
                              <div className="flex items-center gap-2 font-medium">
                                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                                Vague value prop
                              </div>
                              <p className="text-xs text-zinc-500 pl-6">"Innovative solutions" is unclear.</p>
                            </li>
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex flex-col gap-1 text-sm text-zinc-200">
                              <div className="flex items-center gap-2 font-medium">
                                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                                No social proof
                              </div>
                              <p className="text-xs text-zinc-500 pl-6">Add testimonials near checkout.</p>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      </motion.div>

                      {/* Passing Items */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
                        className="flex flex-col"
                      >
                      <Card className="bg-zinc-900/30 border-zinc-800 flex flex-col flex-1">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.div
                              animate={{ boxShadow: ['0 0 8px rgba(16,185,129,0.3)', '0 0 12px rgba(16,185,129,0.6)', '0 0 8px rgba(16,185,129,0.3)'] }}
                              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
                              className="w-2 h-2 rounded-full bg-emerald-500" 
                            />
                            <CardTitle className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Passing Checks</CardTitle>
                          </div>
                          <CardDescription className="text-xs text-zinc-500">Working as intended</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-3">
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex items-center gap-2 text-sm text-zinc-200 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ARIA accessibility marks
                            </li>
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex items-center gap-2 text-sm text-zinc-200 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              SSL & Security Headers
                            </li>
                            <li className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg flex items-center gap-2 text-sm text-zinc-200 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              Responsive structure
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      </motion.div>

                    </div>
                      </motion.div>
                    )}

                    {activeTab === 'autofix' && (
                      <motion.div
                        key="autofix"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full m-0 flex flex-col gap-6"
                      >
                        <div className="flex flex-col gap-2">
                          <h2 className="text-xl font-medium text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-400" /> Generative UI Auto-Fixer
                          </h2>
                          <p className="text-sm text-zinc-400 max-w-4xl leading-relaxed">
                            <span className="text-white font-medium">The Pitch:</span> "We don't just tell clients what's wrong. AutoPitch AI instantly rewrites their codebase to fix it. Here is a live, better version of your website, ready to copy-paste."
                            <br/><br/>
                            <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded inline-block">
                              SYSTEM PROMPT: Based on the flaws, generate a strictly valid, single-file React component using Tailwind CSS that replaces their bad Hero Section. Use a minimalist dark-mode aesthetic.
                            </span>
                          </p>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[500px]">
                          <LiveProvider code={heroCode} scope={{}}>
                            <div className="flex flex-col h-full bg-[#050505] border border-[#1F1F1F] rounded-xl overflow-hidden">
                              <div className="px-4 py-2 bg-gradient-to-r from-zinc-900 to-black border-b border-[#1F1F1F] font-mono text-xs text-zinc-400 flex items-center justify-between">
                                <span>Hero.tsx</span>
                                <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">AI Generated</span>
                              </div>
                              <div className="flex-1 overflow-auto p-4 text-sm font-mono text-zinc-300">
                                <LiveEditor className="font-mono" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', backgroundColor: 'transparent' }} />
                              </div>
                              <LiveError className="bg-red-900/20 text-red-400 p-4 font-mono text-xs border-t border-red-900/50" />
                            </div>
                            
                            <div className="flex flex-col h-full bg-[#050505] border border-[#1F1F1F] rounded-xl overflow-hidden">
                              <div className="px-4 py-2 border-b border-[#1F1F1F] bg-[#0A0A0A] font-medium text-xs text-zinc-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Live Render Preview
                              </div>
                              <div className="flex-1 p-0 overflow-hidden bg-black flex items-center justify-center relative">
                                {/* The LivePreview renders the actual component */}
                                <div className="w-full h-full transform scale-[0.8] origin-center sm:scale-100 flex items-center justify-center">
                                  <LivePreview className="w-full" />
                                </div>
                              </div>
                            </div>
                          </LiveProvider>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'proposal' && (
                      <motion.div
                        key="proposal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full m-0"
                      >
                    <Card className="bg-[#0A0A0A] border border-[#1F1F1F] overflow-hidden max-w-3xl mx-auto rounded-xl">
                      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                      <CardContent className="p-8 md:p-12 prose prose-sm md:prose-base max-w-none prose-headings:font-semibold prose-a:text-indigo-400 prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-li:text-zinc-400 prose-strong:text-zinc-200">
                        <div className="flex items-center justify-between mb-12 border-b border-[#1F1F1F] pb-6">
                          <div>
                            <h2 className="text-2xl mt-0 mb-1 text-white">Growth & Conversion Proposal</h2>
                            <p className="text-zinc-500 m-0 text-sm">Prepared for: {url || 'Client'}</p>
                          </div>
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-zinc-300 font-bold">
                            AG
                          </div>
                        </div>

                        <h3>Executive Summary</h3>
                        <p className="leading-relaxed">
                          Based on our rapid audit of your landing page, we've identified the core bottleneck 
                          in your current funnel: high drop-off preceding the primary CTA, largely driven by 
                          vague value positioning and a lack of immediate social proof above the fold.
                        </p>

                        <h3>Proposed Action Plan</h3>
                        <ul className="space-y-2 mt-4 text-zinc-400">
                          <li><strong className="text-zinc-200">Phase 1: Above-the-fold Redesign</strong> &mdash; we will introduce a direct, outcome-driven headline paired with 3 customer micro-testimonials.</li>
                          <li><strong className="text-zinc-200">Phase 2: Performance Audit</strong> &mdash; addressing the 4.2s LCP by converting the hero video to WebM and lazy-loading secondary images.</li>
                          <li><strong className="text-zinc-200">Phase 3: Checkout Optimization</strong> &mdash; implementing trust badges and a 1-click Google sign-on friction reducer.</li>
                        </ul>

                        <div className="mt-12 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h4 className="m-0 text-lg text-zinc-200">Magic Proposal Link</h4>
                            <p className="m-0 mt-1 text-zinc-500 text-sm">Send this link to your client</p>
                          </div>
                          <a target="_blank" href={`/proposal/${url.replace(/^https?:\/\//, '').replace(/\./g, '-')}`} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition-colors flex items-center gap-2 no-underline whitespace-nowrap self-stretch md:self-auto justify-center">
                            OPEN PORTAL <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                      </motion.div>
                    )}

                    {activeTab === 'script' && (
                      <motion.div
                        key="script"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full m-0"
                      >
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-indigo-400 text-xs font-medium">
                          <Play className="w-3 h-3" />
                          Loom Script Ready
                        </div>
                        <button className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md">
                          <Copy className="w-3 h-3" /> Copy Script
                        </button>
                      </div>
                      
                      <div className="bg-[#0D0D12] border border-zinc-800 rounded-xl p-8 font-mono text-base leading-loose shadow-2xl relative overflow-hidden group">
                        {/* Teleprompter Focus Line Effect */}
                        <div className="absolute top-1/2 left-0 right-0 h-16 -mt-8 bg-white/[0.03] border-y border-white/[0.05] pointer-events-none" />
                        
                        <div className="relative z-10 text-zinc-400 space-y-6">
                          <p>
                            <span className="text-indigo-400 font-semibold">[Wave to camera]</span> Hey {url ? 'team' : 'first name'},
                          </p>
                          <p className="text-zinc-300">
                            I was just browsing through your site and noticed you've got a fantastic product, 
                            but there's a small bottleneck on your hero section that might be costing you signups.
                          </p>
                          <p>
                            <span className="text-indigo-400 font-semibold">[Screen share: Highlight main CTA]</span>
                          </p>
                          <p className="text-zinc-300">
                            Right now, your main CTA is blending in, and it takes about 4 seconds for the mobile page to load. 
                            We've seen companies fix exactly this issue and bump conversions by 20-30% within a week.
                          </p>
                          <p>
                            I put together a quick breakdown of how you can fix this in literally one afternoon. 
                            If you're open to it, just reply 'yes' and I'll send over the step-by-step doc.
                          </p>
                          <p>
                            Cheers!
                          </p>
                        </div>
                      </div>
                    </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* Footer Controls similar to provided HTML */}
            <div className="px-6 py-4 border-t border-[#1F1F1F] bg-[#0C0C0C] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-zinc-600 flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  AI ENGINE: CLAUDE-3-OPUS-V2
                </span>
              </div>
              <button 
                onClick={handleRunFullAnalysis}
                disabled={isAnalyzing}
                className="px-4 py-1.5 bg-white text-black text-[11px] font-bold rounded hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    ANALYZING...
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </>
                ) : (
                  <>
                    RUN FULL ANALYSIS
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
