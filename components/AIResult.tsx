
import React from 'react';
import { Bot, Sparkles, Terminal, Copy, ThumbsUp } from 'lucide-react';

interface AIResultProps {
  content: string;
  isLoading: boolean;
  themeStyles: any;
}

const AIResult: React.FC<AIResultProps> = ({ content, isLoading, themeStyles }) => {
  return (
    <div className={`max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className={`rounded-xl overflow-hidden shadow-2xl ${themeStyles.panel} relative`}>
        {/* Glow Header */}
        <div className={`h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent ${isLoading ? 'animate-pulse' : ''}`} />
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-purple-500/20 ${themeStyles.accent}`}>
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                Kore AI Intelligence
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              </h3>
              <p className="text-xs opacity-50 font-mono">MODEL: GEMINI-3-FLASH-PREVIEW // CORE-V2.1</p>
            </div>
            
            <div className="ml-auto flex gap-2">
              <button className="p-2 hover:bg-white/5 rounded"><Copy size={16} /></button>
              <button className="p-2 hover:bg-white/5 rounded"><ThumbsUp size={16} /></button>
            </div>
          </div>

          <div className={`prose prose-invert max-w-none font-mono text-sm leading-relaxed ${themeStyles.text}`}>
            {isLoading && !content ? (
              <div className="flex flex-col gap-4">
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
              </div>
            ) : (
              <div className="whitespace-pre-wrap">
                {content}
                {isLoading && <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1" />}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/5 px-6 py-3 flex justify-between items-center text-[10px] opacity-40 uppercase tracking-tighter">
          <div className="flex gap-4">
            <span>Latency: 12ms</span>
            <span>Confidence: 98.4%</span>
          </div>
          <div className="flex items-center gap-1">
            <Terminal size={10} />
            ROOT@THEKORE_OS
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResult;
