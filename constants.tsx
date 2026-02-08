
import { ThemeType } from './types';

export const THEMES = {
  [ThemeType.VOID_TECH]: {
    name: 'Void-Tech',
    bg: 'bg-[#020204]',
    text: 'text-gray-100',
    accent: 'text-[#a855f7]',
    accentBg: 'bg-[#a855f7]',
    panel: 'bg-black/60 backdrop-blur-2xl border-white/10',
    input: 'bg-white/5 border-white/10 text-white placeholder-gray-500',
    button: 'bg-[#a855f7] hover:bg-[#9333ea] text-white',
    sidebar: 'bg-[#050507] border-r border-white/5',
    tabActive: 'bg-white/10 text-white',
    tabInactive: 'text-gray-500 hover:text-gray-300',
    backgroundUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2048'
  },
  [ThemeType.DAYLIGHT]: {
    name: 'Daylight Protocol',
    bg: 'bg-[#fcfcfd]',
    text: 'text-[#0f172a]',
    accent: 'text-[#0ea5e9]',
    accentBg: 'bg-[#0ea5e9]',
    panel: 'bg-white/80 backdrop-blur-md border-[#e2e8f0] shadow-sm',
    input: 'bg-[#f1f5f9] border-[#cbd5e1] text-[#0f172a] placeholder-slate-400',
    button: 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold',
    sidebar: 'bg-white border-r border-[#e2e8f0]',
    tabActive: 'bg-[#f1f5f9] text-[#0f172a]',
    tabInactive: 'text-[#64748b] hover:text-[#0f172a]',
    backgroundUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2048'
  },
  [ThemeType.CYBER_PULSE]: {
    name: 'Cyber-Pulse',
    bg: 'bg-[#000000]',
    text: 'text-[#00ffff]',
    accent: 'text-[#ff00ff]',
    accentBg: 'bg-gradient-to-r from-[#00ffff] to-[#ff00ff]',
    panel: 'bg-black/80 backdrop-blur-xl border-[#00ffff]/40 shadow-[0_0_20px_rgba(0,255,255,0.15)]',
    input: 'bg-black border-[#00ffff]/30 text-[#00ffff] font-mono placeholder-[#00ffff]/30',
    button: 'bg-[#00ffff] hover:bg-[#00e5e5] text-black font-bold uppercase tracking-tighter',
    sidebar: 'bg-[#050505] border-r border-[#00ffff]/20',
    tabActive: 'bg-[#00ffff]/10 text-[#00ffff] border-b-2 border-[#ff00ff]',
    tabInactive: 'text-[#00ffff]/40 hover:text-[#00ffff]',
    backgroundUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2048'
  },
  [ThemeType.ZENITH]: {
    name: 'Zenith Sandstone',
    bg: 'bg-[#f4f1ea]',
    text: 'text-[#4a4a3a]',
    accent: 'text-[#8b7355]',
    accentBg: 'bg-[#8b7355]',
    panel: 'bg-[#ece8df] border-[#d9d4c7] shadow-inner',
    input: 'bg-white/60 border-[#d9d4c7] text-[#4a4a3a] placeholder-[#4a4a3a]/40',
    button: 'bg-[#8b7355] hover:bg-[#7a654a] text-white',
    sidebar: 'bg-[#ece8df] border-r border-[#d9d4c7]',
    tabActive: 'bg-white/80 text-[#4a4a3a]',
    tabInactive: 'text-[#4a4a3a]/50 hover:text-[#4a4a3a]',
    backgroundUrl: 'https://images.unsplash.com/photo-1541844053589-3462f4b8cc3a?auto=format&fit=crop&q=80&w=2048'
  }
};
