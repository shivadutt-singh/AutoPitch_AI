import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Bell, Shield, Key, Plus, Copy, Trash2, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [savedMessage, setSavedMessage] = useState('');
  
  // Example states for different sections
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReport: false,
    marketing: true
  });
  
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Key', key: 'orb_live_****************', created: 'Oct 12, 2025', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development', key: 'orb_test_****************', created: 'Nov 04, 2025', lastUsed: 'Just now' }
  ]);

  const handleSave = (message: string) => {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'api-keys', icon: Key, label: 'API Keys' },
  ];

  return (
    <div className="w-full max-w-4xl flex flex-col p-8 gap-8 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Settings
        </h1>
        <p className="text-zinc-400 text-sm">
          Manage your account settings and preferences.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                  <div className="border-b border-[#1F1F1F] px-6 py-4">
                    <h2 className="text-lg font-medium text-white">Profile Information</h2>
                    <p className="text-sm text-zinc-500 mt-1">Update your account's profile information and email address.</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Name</label>
                      <input type="text" defaultValue="Alex Developer" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email</label>
                      <input type="email" defaultValue="alex@example.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors" />
                    </div>
                  </div>

                  <div className="border-t border-[#1F1F1F] px-6 py-4 bg-[#050505] flex justify-between items-center">
                    <span className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 opacity-0 transition-opacity duration-300" style={{ opacity: savedMessage === 'profile' ? 1 : 0 }}>
                      <CheckCircle2 className="w-4 h-4" /> Saved successfully
                    </span>
                    <button 
                      onClick={() => handleSave('profile')}
                      className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                  <div className="border-b border-[#1F1F1F] px-6 py-4">
                    <h2 className="text-lg font-medium text-white">Notification Preferences</h2>
                    <p className="text-sm text-zinc-500 mt-1">Manage what alerts we send to your email.</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {[
                      { id: 'emailAlerts', label: 'Audit Completion Alerts', desc: 'Receive an email when a large structural audit completes.' },
                      { id: 'weeklyReport', label: 'Weekly Summary', desc: 'A weekly digest of your workspace activity and usage.' },
                      { id: 'marketing', label: 'Product Updates', desc: 'News about major feature releases and platform changes.' }
                    ].map(pref => (
                      <div key={pref.id} className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-medium text-zinc-200">{pref.label}</h3>
                          <p className="text-sm text-zinc-500">{pref.desc}</p>
                        </div>
                        <button 
                          onClick={() => setNotifications(prev => ({ ...prev, [pref.id]: !prev[pref.id as keyof typeof prev] }))}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus:outline-none ${notifications[pref.id as keyof typeof notifications] ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                        >
                          <span className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications[pref.id as keyof typeof notifications] ? 'translate-x-2' : '-translate-x-2'}`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#1F1F1F] px-6 py-4 bg-[#050505] flex justify-between items-center">
                    <span className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 opacity-0 transition-opacity duration-300" style={{ opacity: savedMessage === 'notifications' ? 1 : 0 }}>
                      <CheckCircle2 className="w-4 h-4" /> Preferences saved
                    </span>
                    <button 
                      onClick={() => handleSave('notifications')}
                      className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                  <div className="border-b border-[#1F1F1F] px-6 py-4">
                    <h2 className="text-lg font-medium text-white">Security & Passwords</h2>
                    <p className="text-sm text-zinc-500 mt-1">Ensure your account uses a secure password and two-factor authentication.</p>
                  </div>
                  
                  <div className="p-6 space-y-6 border-b border-[#1F1F1F]">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-zinc-200">Change Password</h3>
                      <div className="space-y-4">
                        <input type="password" placeholder="Current password" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-zinc-600" />
                        <input type="password" placeholder="New password" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-zinc-600" />
                        <input type="password" placeholder="Confirm new password" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-zinc-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-200">Two-factor Authentication</h3>
                        <p className="text-sm text-zinc-500 mt-1">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-[#1F1F1F] px-6 py-4 bg-[#050505] flex justify-between items-center">
                    <span className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 opacity-0 transition-opacity duration-300" style={{ opacity: savedMessage === 'security' ? 1 : 0 }}>
                      <CheckCircle2 className="w-4 h-4" /> Password updated
                    </span>
                    <button 
                      onClick={() => handleSave('security')}
                      className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'api-keys' && (
              <motion.div 
                key="api-keys"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                  <div className="border-b border-[#1F1F1F] px-6 py-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-white">API Keys</h2>
                      <p className="text-sm text-zinc-500 mt-1">Manage keys for programmatic access to your resources.</p>
                    </div>
                    <button className="px-3 py-2 bg-white text-black text-xs font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> New Key
                    </button>
                  </div>
                  
                  <div className="divide-y divide-[#1F1F1F]">
                    {apiKeys.map(apiKey => (
                      <div key={apiKey.id} className="p-6 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-white">{apiKey.name}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-700">
                              {apiKey.key.split('_')[1]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <code className="text-xs font-mono text-zinc-300 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 select-all">
                              {apiKey.key}
                            </code>
                            <button className="p-1.5 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors" title="Copy key">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span>Created: {apiKey.created}</span>
                            <span>Last used: {apiKey.lastUsed}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setApiKeys(keys => keys.filter(k => k.id !== apiKey.id))}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {apiKeys.length === 0 && (
                      <div className="p-8 text-center bg-zinc-900/30">
                        <p className="text-sm text-zinc-400">No active API keys.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
