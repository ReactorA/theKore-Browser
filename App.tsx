
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  Shield, 
  History, 
  Bookmark, 
  LayoutGrid, 
  PanelLeftClose, 
  Globe,
  Zap,
  Menu,
  Plus,
  X,
  LogOut,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ThemeType, Tab, UserSession, AIResponse } from './types';
import { THEMES } from './constants';
import AIResult from './components/AIResult';
import LoginGate from './components/LoginGate';
import CyberPulseVisuals from './components/CyberPulseVisuals';
import { koreAI } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [theme, setTheme] = useState<ThemeType>(ThemeType.VOID_TECH);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tabs, setTabs] = useState<Tab[]>([{ id: 'init', title: 'New Tab', type: 'home' }]);
  const [activeTabId, setActiveTabId] = useState('init');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponses, setAiResponses] = useState<Record<string, AIResponse>>({});

  const styles = THEMES[theme];
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    const session = localStorage.getItem('thekore_session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const addNewTab = () => {
    const newId = Math.random().toString(36).substring(7);
    setTabs(prev => [...prev, { id: newId, title: 'New Tab', type: 'home' }]);
    setActiveTabId(newId);
    setSearchQuery('');
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      const resetId = 'reset-' + Date.now();
      setTabs([{ id: resetId, title: 'New Tab', type: 'home' }]);
      setActiveTabId(resetId);
      return;
    }
    const currentIndex = tabs.findIndex(t => t.id === id);
    const filtered = tabs.filter(t => t.id !== id);
    setTabs(filtered);
    
    if (activeTabId === id) {
      const nextTab = filtered[Math.max(0, currentIndex - 1)];
      setActiveTabId(nextTab.id);
    }
  };

  const isDirectUrl = (input: string) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?.*)?$/;
    return urlPattern.test(input.trim());
  };

  const formatUrl = (input: string) => {
    let url = input.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    return url;
  };

  const handleSearch = useCallback(async (mode: 'GOOGLE' | 'KORE_AI') => {
    const query = searchQuery.trim();
    if (!query) return;

    if (mode === 'KORE_AI') {
      setAiResponses(prev => ({ ...prev, [activeTabId]: { text: '', isLoading: true } }));
      setTabs(prev => prev.map(t => t.id === activeTabId ? { 
        ...t, 
        type: 'ai', 
        title: `Kore: ${query.slice(0, 15)}...`,
        searchQuery: query 
      } : t));
      
      await koreAI.askKore(query, (text, links) => {
        setAiResponses(prev => ({ 
          ...prev, 
          [activeTabId]: { text, isLoading: false, groundingLinks: links } 
        }));
      });
    } else {
      let finalUrl: string;
      let displayTitle: string;

      if (isDirectUrl(query)) {
        finalUrl = formatUrl(query);
        displayTitle = query.replace(/^https?:\/\//, '').split('/')[0];
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
        displayTitle = query;
      }

      setTabs(prev => prev.map(t => t.id === activeTabId ? { 
        ...t, 
        type: 'search', 
        title: displayTitle.length > 20 ? displayTitle.slice(0, 17) + '...' : displayTitle, 
        searchQuery: query,
        url: finalUrl
      } : t));
    }
    setSearchQuery('');
  }, [searchQuery, activeTabId]);

  const handleLogout = () => {
    localStorage.removeItem('thekore_session');
    setUser(null);
  };

  if (!user) return <LoginGate onLogin={setUser} />;

  return (
    <div className={`h-screen w-screen flex transition-colors duration-500 ${styles.bg} ${styles.text} relative overflow-hidden font-sans`}>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${styles.backgroundUrl})` }}
      />
      {theme === ThemeType.CYBER_PULSE && <CyberPulseVisuals />}
      
      <aside className={`z-40 h-full flex transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'} ${styles.sidebar} shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl`}>
        <div className="flex flex-col w-72 h-full p-6">
          <div className="flex items-center gap-4 mb-10 group">
            <div className="relative">
              <img src={user.avatar} className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 group-hover:border-purple-500/50 transition-all" alt="User" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#050507] rounded-full" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm truncate tracking-tight">{user.name}</p>
              <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-mono">Kernel v1.08.32</p>
            </div>
          </div>

          <div className="space-y-1.5 mb-10">
            <h3 className="text-[9px] uppercase tracking-[0.25em] opacity-30 mb-4 px-2 font-black">Workspace</h3>
            {[
              { icon: History, label: 'History' },
              { icon: Bookmark, label: 'Vault' },
              { icon: Shield, label: 'Encryption' },
              { icon: Settings, label: 'Settings' }
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-4 px-4 py-3 text-xs font-bold rounded-xl hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/5 active:scale-95 group">
                <item.icon size={16} className="opacity-30 group-hover:opacity-100 group-hover:text-purple-400 transition-all" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <h3 className="text-[9px] uppercase tracking-[0.25em] opacity-30 mb-4 px-2 font-black">Environments</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEMES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key as ThemeType)}
                  className={`p-3 rounded-2xl text-[10px] border font-black transition-all flex flex-col items-center gap-2 ${
                    theme === key 
                      ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                      : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${value.accentBg} shadow-sm`} />
                  {value.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <button 
              onClick={handleLogout}
              className="mt-8 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-xs font-black tracking-widest transition-all border border-transparent hover:border-red-500/20 shadow-lg active:scale-95"
            >
              <LogOut size={16} /> TERMINATE SESSION
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-20 h-full overflow-hidden bg-black/10">
        <header className="h-16 flex items-center px-4 gap-3 border-b border-white/5 bg-black/40 backdrop-blur-3xl z-50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 hover:bg-white/5 rounded-xl transition-all active:scale-90 border border-transparent hover:border-white/10">
            {sidebarOpen ? <PanelLeftClose size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-1">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative min-w-[160px] max-w-[220px] h-11 px-4 rounded-2xl flex items-center gap-3 text-xs font-bold cursor-pointer transition-all border ${
                  activeTabId === tab.id 
                    ? `${styles.tabActive} border-white/10 shadow-xl scale-[1.02]` 
                    : `${styles.tabInactive} bg-white/5 border-transparent hover:bg-white/10`
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeTabId === tab.id ? styles.accentBg + ' shadow-[0_0_10px_currentColor]' : 'bg-white/20'}`} />
                <span className="truncate flex-1 tracking-tight">{tab.title}</span>
                <button 
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-all p-1 hover:bg-white/10 rounded-lg active:scale-75"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button onClick={addNewTab} className="p-3 hover:bg-white/10 rounded-2xl transition-all ml-1 border border-transparent hover:border-white/10 active:scale-90">
              <Plus size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 px-3">
             <div className="flex flex-col items-end opacity-40 font-mono text-[9px] leading-tight tracking-widest hidden md:flex">
               <span>DL: 1.2 GB/S</span>
               <span>UP: 420 MB/S</span>
             </div>
             <div className="w-px h-6 bg-white/5" />
             <LayoutGrid size={20} className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative flex flex-col">
          {activeTab.type === 'home' ? (
            <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
               <div className={`w-32 h-32 rounded-[3rem] ${styles.accentBg} flex items-center justify-center shadow-[0_0_60px_-10px_currentColor] mb-10 ${styles.accent} transition-transform hover:scale-110 duration-500`}>
                 <Zap size={64} className="text-white fill-white" />
               </div>
               <h1 className="text-7xl font-black italic tracking-tighter mb-6 select-none">THEKORE<span className="opacity-10 font-thin not-italic">OS</span></h1>
               
               <div className={`w-full max-w-2xl p-2 rounded-[2.5rem] ${styles.panel} border shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex items-center mt-4 group focus-within:scale-[1.02] transition-all duration-300`}>
                  <div className="flex items-center px-6 opacity-30 group-focus-within:opacity-100 transition-opacity"><Search size={24} /></div>
                  <input 
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch('GOOGLE')}
                    placeholder="Enter URL or search the web..."
                    className="flex-1 bg-transparent py-6 px-2 outline-none text-xl font-bold placeholder:opacity-20 placeholder:font-black tracking-tight"
                  />
                  <div className="flex p-2">
                    <button onClick={() => handleSearch('GOOGLE')} className="px-10 py-4 rounded-[1.5rem] text-sm font-black hover:bg-white/10 flex items-center gap-3 transition-all active:scale-95 border border-transparent hover:border-white/5 uppercase tracking-widest bg-white/5">
                      {isDirectUrl(searchQuery) ? 'GO' : <><Globe size={18} /> GOOGLE</>}
                    </button>
                  </div>
               </div>

               {/* KORE AI floating trigger button (Corner) */}
               <button 
                  onClick={() => {
                    const q = searchQuery.trim() || "What can you do?";
                    setSearchQuery(q);
                    handleSearch('KORE_AI');
                  }}
                  className={`fixed bottom-12 right-12 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 group z-[60] ${styles.button} ${styles.accentBg}`}
                  title="Invoke Kore AI"
               >
                 <Sparkles size={32} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
                 <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-1 rounded-full animate-bounce shadow-lg">AI LIVE</div>
               </button>
            </div>
          ) : activeTab.type === 'ai' ? (
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-4xl mx-auto py-8">
                <AIResult 
                  content={aiResponses[activeTab.id]?.text || ''} 
                  isLoading={aiResponses[activeTab.id]?.isLoading || false} 
                  themeStyles={styles} 
                />
                {aiResponses[activeTab.id]?.groundingLinks && (
                  <div className="mt-8 flex flex-wrap gap-3 animate-in slide-in-from-bottom-4 duration-700 delay-500">
                    <div className="w-full text-[10px] font-black tracking-widest opacity-30 mb-2">VERIFIED CORE SOURCES</div>
                    {aiResponses[activeTab.id].groundingLinks.map((link, idx) => (
                      <a key={idx} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105">
                        <Globe size={14} className="text-purple-400" /> {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="h-12 bg-black/40 border-b border-white/5 flex items-center px-4 gap-4">
                 <div className="flex gap-2">
                   <button className="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100"><ArrowLeft size={16} /></button>
                   <button className="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100"><ArrowRight size={16} /></button>
                   <button className="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100"><RefreshCw size={16} /></button>
                 </div>
                 <div className="flex-1 max-w-2xl bg-white/5 border border-white/5 rounded-xl px-4 py-1.5 text-[11px] font-mono opacity-80 truncate flex items-center gap-2">
                   <Globe size={12} className="opacity-40" />
                   {activeTab.url}
                 </div>
                 <button 
                  onClick={() => window.open(activeTab.url, '_blank')}
                  className="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100 flex items-center gap-2 text-[10px] font-bold"
                 >
                   <ExternalLink size={14} /> OPEN EXTERNAL
                 </button>
              </div>
              <div className="flex-1 bg-white relative">
                 <iframe 
                    src={activeTab.url} 
                    className="w-full h-full border-none"
                    title="Web Browser View"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                 />
                 <div className="absolute top-4 right-4 z-10 p-4 bg-black/80 backdrop-blur rounded-2xl border border-white/10 text-[10px] max-w-xs pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                   <p className="font-bold mb-1 uppercase tracking-wid