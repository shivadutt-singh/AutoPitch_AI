import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, Filter, Mail, Globe, ArrowRight, MoreHorizontal, CheckCircle2, Clock, XCircle, ChevronDown, Activity, Send, Upload, Loader2 } from 'lucide-react';

export default function Leads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [leads, setLeads] = useState([
    {
      id: 1,
      domain: 'techflow.io',
      name: 'Sarah Jenkins',
      title: 'Head of Growth',
      email: 'sarah@techflow.io',
      status: 'hot',
      score: 94,
      lastContact: '2 hours ago',
      notes: 'Opened the proposal PDF twice. Receptive to the hero section redesign.'
    },
    {
      id: 2,
      domain: 'globalreach.co',
      name: 'Marcus Chen',
      title: 'Founder & CEO',
      email: 'm.chen@globalreach.co',
      status: 'contacted',
      score: 78,
      lastContact: '1 day ago',
      notes: 'Sent the initial Loom video. Waiting for a reply.'
    },
    {
      id: 3,
      domain: 'nexus-health.com',
      name: 'Dr. Emily Carter',
      title: 'Marketing Director',
      email: 'ecarter@nexus-health.com',
      status: 'new',
      score: 88,
      lastContact: 'Never',
      notes: 'LCP is over 5s. Huge opportunity for frontend optimization.'
    },
    {
      id: 4,
      domain: 'stackbuilder.dev',
      name: 'David Ortiz',
      title: 'CTO',
      email: 'david@stackbuilder.dev',
      status: 'archived',
      score: 65,
      lastContact: '2 weeks ago',
      notes: 'Not interested at this time. Recently hired an in-house team.'
    }
  ]);

  const handleBulkUpload = () => {
    setIsUploading(true);
    // Simulate parsing and analyzing bulk domains
    setTimeout(() => {
      setIsUploading(false);
      setLeads(prev => [
        {
          id: Date.now(),
          domain: 'innovate-ai.io',
          name: 'Alex Rivera',
          title: 'CEO',
          email: 'alex@innovate-ai.io',
          status: 'new',
          score: 82,
          lastContact: 'Never',
          notes: 'Bulk imported. Audit shows poor mobile accessibility.'
        },
        {
          id: Date.now() + 1,
          domain: 'cloud-scale.com',
          name: 'Priya Patel',
          title: 'VP Engineering',
          email: 'priya@cloud-scale.com',
          status: 'new',
          score: 55,
          lastContact: 'Never',
          notes: 'Bulk imported. Critical SEO issues detected.'
        },
        ...prev
      ]);
    }, 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hot':
        return <span className="px-2 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><Activity className="w-3 h-3" /> Hot Lead</span>;
      case 'contacted':
        return <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> Contacted</span>;
      case 'new':
        return <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> New</span>;
      default:
        return <span className="px-2 py-1 bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"><XCircle className="w-3 h-3" /> Archived</span>;
    }
  };

  const filteredLeads = leads.filter(l => 
    l.domain.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl flex flex-col p-8 gap-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-2 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            Lead Pipeline
          </h1>
          <p className="text-zinc-400 text-sm">
            Manage your generated leads, outreach scripts, and proposals.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-[#0A0A0A] border border-[#1F1F1F] hover:bg-[#111111] hover:border-zinc-700 rounded-lg text-zinc-400 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <div className="relative">
            <input 
              type="file" 
              accept=".csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              onChange={handleBulkUpload}
              disabled={isUploading}
            />
            <button 
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:shadow-none pointer-events-none"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isUploading ? 'Analyzing Domains...' : 'Bulk Import CSV'}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden shadow-2xl relative"
      >
        {/* Animated Line Effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1F1F1F] bg-[#050505] text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <div className="col-span-4 pl-2">Prospect</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Audit Score</div>
              <div className="col-span-2">Last Contact</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#1F1F1F]/50">
              {filteredLeads.map((lead, i) => (
                <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col"
                >
                  <div 
                    className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors cursor-pointer ${expandedLead === lead.id ? 'bg-indigo-500/[0.02]' : 'hover:bg-zinc-900/30'}`}
                    onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                  >
                <div className="col-span-4 flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium text-white truncate">{lead.domain}</div>
                    <div className="text-xs text-zinc-500 truncate">{lead.name} • {lead.title}</div>
                  </div>
                </div>
                
                <div className="col-span-3 flex items-center">
                  {getStatusBadge(lead.status)}
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${lead.score >= 90 ? 'bg-emerald-500' : lead.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-zinc-300">{lead.score}</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center text-xs text-zinc-500">
                  {lead.lastContact}
                </div>

                <div className="col-span-1 flex items-center justify-end pr-2">
                  <button className={`p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors ${expandedLead === lead.id ? 'bg-zinc-800 text-white' : ''}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedLead === lead.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedLead === lead.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#070707] border-t border-[#1F1F1F]/50"
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Contact Info</div>
                          <div className="flex items-center gap-2 text-sm text-zinc-300">
                            <Mail className="w-3.5 h-3.5 text-zinc-500" />
                            {lead.email}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Notes</div>
                          <p className="text-sm text-zinc-400 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50 leading-relaxed">
                            {lead.notes}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 col-span-2">
                        <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Quick Actions</div>
                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                            <Send className="w-4 h-4" /> Send Follow-up
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 bg-[#111111] hover:bg-zinc-800 border border-[#2F2F2F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            <Globe className="w-4 h-4" /> Re-run Audit
                          </button>
                          <button className="flex-none p-2 bg-[#111111] hover:bg-zinc-800 border border-[#2F2F2F] text-zinc-400 hover:text-white rounded-lg transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-[#1F1F1F]">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-500">Proposal Generated</span>
                            <a href={`/proposal/${lead.domain.replace(/\./g, '-')}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group">
                              View proposal portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredLeads.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-white font-medium mb-1">No leads found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search query.</p>
            </div>
          )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
