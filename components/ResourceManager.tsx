
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Cpu, Database, Zap, Activity } from 'lucide-react';
import { ResourceState } from '../types';

interface ResourceManagerProps {
  resources: ResourceState;
  setResources: React.Dispatch<React.SetStateAction<ResourceState>>;
  themeStyles: any;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ resources, setResources, themeStyles }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const next = [...prev, {
          time: new Date().toLocaleTimeString(),
          cpu: resources.currentCpu + (Math.random() * 10 - 5),
          ram: resources.currentRam + (Math.random() * 5 - 2.5)
        }].slice(-20);
        return next;
      });

      setResources(prev => ({
        ...prev,
        currentCpu: Math.min(prev.cpuLimit, Math.max(10, prev.currentCpu + (Math.random() * 4 - 2))),
        currentRam: Math.min(prev.ramLimit, Math.max(20, prev.currentRam + (Math.random() * 2 - 1)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [resources.cpuLimit, resources.ramLimit, setResources]);

  return (
    <div className={`p-4 h-full flex flex-col gap-6 ${themeStyles.text}`}>
      <div className="flex items-center gap-2 mb-2">
        <Activity size={20} className={themeStyles.accent} />
        <h2 className="text-sm font-bold uppercase tracking-widest">Resource Core</h2>
      </div>

      {/* CPU Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center gap-2"><Cpu size={14} /> CPU LIMIT</span>
          <span className="font-mono">{resources.cpuLimit}%</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={resources.cpuLimit}
          onChange={(e) => setResources(prev => ({ ...prev, cpuLimit: parseInt(e.target.value) }))}
          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${themeStyles.accentBg}`} 
            style={{ width: `${(resources.currentCpu / resources.cpuLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* RAM Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center gap-2"><Database size={14} /> RAM LIMIT</span>
          <span className="font-mono">{(resources.ramLimit / 10).toFixed(1)} GB</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="320" 
          value={resources.ramLimit}
          onChange={(e) => setResources(prev => ({ ...prev, ramLimit: parseInt(e.target.value) }))}
          className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-500" 
            style={{ width: `${(resources.currentRam / resources.ramLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Graphs */}
      <div className="flex-1 mt-4">
        <div className="h-32 w-full opacity-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#a855f7" 
                fill="#a855f7" 
                fillOpacity={0.1} 
                isAnimationActive={false}
              />
              <Area 
                type="monotone" 
                dataKey="ram" 
                stroke="#22d3ee" 
                fill="#22d3ee" 
                fillOpacity={0.1} 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Throttle Toggle */}
      <button 
        onClick={() => setResources(prev => ({ ...prev, isThrottled: !prev.isThrottled }))}
        className={`mt-auto w-full py-3 rounded flex items-center justify-center gap-3 text-xs font-bold transition-all ${
          resources.isThrottled 
            ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : 'bg-green-500/20 text-green-400 border border-green-500/50'
        }`}
      >
        <Zap size={16} fill={resources.isThrottled ? 'currentColor' : 'none'} />
        {resources.isThrottled ? 'GAMING MODE ACTIVE' : 'PRODUCTIVITY MODE'}
      </button>
    </div>
  );
};

export default ResourceManager;
