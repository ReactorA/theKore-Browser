
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  Shield, 
  History, 
  Bookmark, 
  LayoutGrid, 
  PanelLeftClose, 
  PanelRightClose,
  Globe,
  Zap,
  Menu,
  ChevronRight
} from 'lucide-react';
import { ThemeType, ResourceState, SearchMode, AIResponse } from './types';
import { THEMES } from './constants';
import ResourceManager from './components/ResourceManager';
import AIResult from './components/AIResult';
import { koreAI } from './services/geminiService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.VOID_TECH);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('GOOGLE');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse>({ text: '', isLoading: false });
  
  const [resources, setResources] = useState<ResourceState>({
    cpuLimit: 80,
    ramLimit: 160,
    currentCpu: 15,
    currentRam: 42,
    isThrottled: false
  });

  const styles = THEMES[theme];

  const handleSearch = useCallback(async (mode: SearchMode) => {
    if (!searchQuery.trim()) return;
    setSearchMode(mode);
    setIsSearching(true);

    if (mode === 'KORE_AI') {
      setAiResponse({ text: '', isLoading: true });
      await koreAI.askKore(searchQuery, (text) => {
        setAiResponse(prev => ({ ...prev, text, isLoading: true }));
      });
      setAiResponse(prev => ({ ...prev, isLoading: false }));
    } else {
      // Simulate Google Search
      setTimeout(() => {
        setIsSearching(false);
      }, 800);
    }
  }, [searchQuery]);

  return (
    <div className={`h-screen w-screen flex transition-colors duration-500 ${styles.bg} ${styles.text} relative overflow-hidden`}>
      {/* Background Animated Pattern */}
      {styles.pattern && <div className={`absolute inset-0 z-0 pointer-events-none ${styles.pattern} opacity-10`} />}
      
      {/* Sidebar: Nav & Resources */}
      <aside className={`z-20 h-full flex transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'} ${styles.sidebar}`}>
        <div className="flex flex-col w-full h-full">
          {/* Nav Icons */}
          <div className="flex p-4 gap-4 border-b border-white/5">
            <button className={`p-2 rounded transition-colors ${styles.tabActive}`}><History size={18} /></button>
            <button className="p-2 rounded hover:bg-white/5 transition-colors"><Bookmark size={18} /></button>
            <button className="p-2 rounded hover:bg-white/5 transition-colors"><Shield size={18} /></button>
            <button className="p-2 rounded hover:bg-white/5 transition-colors ml-auto"><Settings size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ResourceManager resources={resources} setResources={setResources} themeStyles={styles} />
          </div>

          {/* Theme Selector */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <h3 className="text-[10px] uppercase tracking-widest mb-3 opacity-50">Theme Environments</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEMES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key as ThemeType)}
                  className={`text-[10px] py-2 rounded flex flex-col items-center gap-1 border transition-all ${
                    theme === key ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${value.bg} border border-white/20`} />
                  {value.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 h-full">
        {/* Top bar / Tabs */}
        <header className="h-12 flex items-center px-4 gap-2 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-white/5 rounded"
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
          </button>
          
          <div className="flex-1 flex items-center overflow-x-auto gap-1 scrollbar-hide">
            {['Home', 'GitHub', 'Figma', 'Docs'].map(tab => (
              <div 
                key={tab}
                onClick={() => { setActiveTab(tab); setAiResponse({ text: '', isLoading: false }); setIsSearching(false); }}
                className={`px-4 py-1.5 rounded-t-lg text-xs cursor-pointer whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab ? styles.tabActive : styles.tabInactive
                }`}
              >
                {tab === 'Home' ? <Zap size={12} /> : <Globe size={12} />}
                {tab}
                <span className="opacity-0 hover:opacity-100 ml-2">×</span>
              </div>
            ))}
          </div>
          
          <button className="p-1 hover:bg-white/5 rounded ml-2"><LayoutGrid size={18} /></button>
        </header>

        {/* Browser viewport */}
        <div className="flex-1 overflow-y-auto p-4 md:p-12 relative flex flex-col items-center">
          
          {/* Logo & Intro if Home */}
          {!isSearching && !aiResponse.text && (
            <div className="text-center mt-12 mb-12 animate-in fade-in zoom-in-95 duration-700">
              <div className={`w-24 h-24 mx-auto rounded-3xl ${styles.accentBg} flex items-center justify-center shadow-[0_0_40px_-5px_currentColor] mb-6 ${styles.accent}`}>
                <Zap size={48} className="text-white fill-white" />
              </div>
              <h1 className="text-5xl font-black italic tracking-tighter mb-2">THEKORE<span className="opacity-20 font-light">OS</span></h1>
              <p className="opacity-50 text-sm font-mono tracking-widest uppercase">Performance Hybrid Engine</p>
            </div>
          )}

          {/* Dual-Core Search Bar */}
          <div className={`w-full max-w-2xl transition-all duration-500 ${isSearching || aiResponse.text ? 'mt-0' : 'mt-0'}`}>
            <div className={`flex items-stretch p-1 rounded-2xl ${styles.panel} border shadow-2xl transition-all hover:scale-[1.01]`}>
              <div className="flex items-center px-4 opacity-50"><Search size={20} /></div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch('GOOGLE')}
                placeholder="Search web or ask Kore AI..."
                className={`flex-1 bg-transparent border-none outline-none py-4 text-lg ${styles.text}`}
              />
              
              <div className="flex gap-1 p-1">
                <button 
                  onClick={() => handleSearch('GOOGLE')}
                  className={`px-4 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-95`}
                >
                  <Globe size={14} className="opacity-50" />
                  GOOGLE
                </button>
                <button 
                  onClick={() => handleSearch('KORE_AI')}
                  className={`px-6 rounded-xl flex items-center gap-2 text-xs font-black tracking-widest shadow-lg active:scale-95 ${styles.button}`}
                >
                  <Zap size={14} fill="currentColor" />
                  KORE AI
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            {!isSearching && !aiResponse.text && (
              <div className="flex justify-center gap-6 mt-12 opacity-40">
                {['Youtube', 'Reddit', 'Twitter', 'Twitch'].map(site => (
                  <button key={site} className="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/5 flex items-center justify-center">
                      <ChevronRight size={16} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest">{site}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Result Engine Rendering */}
          <div className="w-full">
            {aiResponse.text || aiResponse.isLoading ? (
              <AIResult content={aiResponse.text} isLoading={aiResponse.isLoading} themeStyles={styles} />
            ) : isSearching ? (
              <div className="max-w-4xl mx-auto mt-8 space-y-6">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`p-6 rounded-xl border animate-in fade-in slide-in-from-bottom-${i*2} duration-500 ${styles.panel}`}>
                    <div className={`h-4 w-1/4 mb-3 rounded-full opacity-30 ${styles.accentBg}`} />
                    <div className="h-6 w-3/4 mb-2 rounded-full bg-white/10" />
                    <div className="h-4 w-full rounded-full bg-white/5" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer info bar */}
        <footer className={`h-6 flex items-center justify-between px-3 text-[10px] opacity-40 font-mono uppercase tracking-widest ${styles.panel} border-t`}>
          <div className="flex gap-4">
            <span>TheKore v1.0.4-stable</span>
            <span className={resources.isThrottled ? 'text-red-400 font-bold' : ''}>
              {resources.isThrottled ? 'LOW LATENCY MODE' : 'STANDBY'}
            </span>
          </div>
          <div className="flex gap-4">
            <span>Ping: 14ms</span>
            <span>Uptime: 02:44:12</span>
            <span>Engine: Chromium 120.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
