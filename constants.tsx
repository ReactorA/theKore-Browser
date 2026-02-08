
import { ThemeType } from './types';

export const THEMES = {
  [ThemeType.VOID_TECH]: {
    name: 'Void-Tech',
    bg: 'bg-[#0a0a0b]',
    text: 'text-gray-100',
    accent: 'text-[#a855f7]',
    accentBg: 'bg-[#a855f7]',
    panel: 'bg-black/40 backdrop-blur-xl border-white/10',
    input: 'bg-white/5 border-white/10 text-white placeholder-gray-500',
    button: 'bg-[#a855f7] hover:bg-[#9333ea] text-white',
    sidebar: 'bg-[#0f0f12] border-r border-white/5',
    tabActive: 'bg-white/10 text-white',
    tabInactive: 'text-gray-500 hover:text-gray-300',
    pattern: 'circuit-pattern'
  },
  [ThemeType.DAYLIGHT]: {
    name: 'Daylight Protocol',
    bg: 'bg-[#f8fafc]',
    text: 'text-[#0f172a]',
    accent: 'text-[#0ea5e9]',
    accentBg: 'bg-[#0ea5e9]',
    panel: 'bg-white border-[#e2e8f0] shadow-sm',
    input: 'bg-[#f1f5f9] border-[#cbd5e1] text-[#0f172a] placeholder-slate-400',
    button: 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold',
    sidebar: 'bg-white border-r border-[#e2e8f0]',
    tabActive: 'bg-[#f1f5f9] text-[#0f172a]',
    tabInactive: 'text-[#64748b] hover:text-[#0f172a]',
    pattern: ''
  },
  [ThemeType.CYBER_PULSE]: {
    name: 'Cyber-Pulse',
    bg: 'bg-[#050505]',
    text: 'text-[#00ffff]',
    accent: 'text-[#ff00ff]',
    accentBg: 'bg-gradient-to-r from-[#00ffff] to-[#ff00ff]',
    panel: 'bg-black/60 backdrop-blur-md border-[#00ffff]/30 rgb-border',
    input: 'bg-black/40 border-[#00ffff]/20 text-[#00ffff] font-mono placeholder-[#00ffff]/40',
    button: 'bg-[#00ffff] hover:bg-[#00e5e5] text-black font-bold uppercase tracking-tighter',
    sidebar: 'bg-black border-r border-[#00ffff]/20',
    tabActive: 'bg-[#00ffff]/10 text-[#00ffff] border-b-2 border-[#ff00ff]',
    tabInactive: 'text-[#00ffff]/60 hover:text-[#00ffff]',
    pattern: ''
  },
  [ThemeType.ZENITH]: {
    name: 'Zenith Sandstone',
    bg: 'bg-[#f5f5dc]',
    text: 'text-[#3f4e2e]',
    accent: 'text-[#6b8e23]',
    accentBg: 'bg-[#6b8e23]',
    panel: 'bg-[#efefd5] border-[#d4d4b4] rounded-2xl shadow-inner',
    input: 'bg-white/40 border-[#d4d4b4] text-[#3f4e2e] rounded-xl placeholder-[#3f4e2e]/50',
    button: 'bg-[#6b8e23] hover:bg-[#556b2f] text-white rounded-xl px-6',
    sidebar: 'bg-[#efefd5] border-r border-[#d4d4b4]',
    tabActive: 'bg-white/50 text-[#3f4e2e] rounded-t-lg',
    tabInactive: 'text-[#3f4e2e]/60 hover:text-[#3f4e2e]',
    pattern: ''
  }
};
