
import React, { useEffect, useState } from 'react';

const CyberPulseVisuals: React.FC = () => {
  const [dataStreams, setDataStreams] = useState<string[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const streamInterval = setInterval(() => {
      const hex = '0123456789ABCDEF';
      let str = '';
      for (let i = 0; i < 24; i++) str += hex[Math.floor(Math.random() * 16)];
      setDataStreams(prev => [str, ...prev].slice(0, 20));
    }, 150);

    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(streamInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-50 opacity-30" />
      
      {/* Data Columns */}
      <div className="absolute left-6 top-20 bottom-0 flex flex-col font-mono text-[9px] text-[#00ffff] opacity-40 overflow-hidden tracking-tighter">
        <div className="mb-4 text-[#ff00ff] font-bold border-b border-[#ff00ff]/30 pb-1">KERNEL_LOGS</div>
        {dataStreams.map((s, i) => (
          <div key={i} className="py-0.5 whitespace-nowrap">
            {`[${time}] > 0x${s}`}
          </div>
        ))}
      </div>

      <div className="absolute right-6 top-20 bottom-0 flex flex-col font-mono text-[9px] text-[#ff00ff] opacity-40 overflow-hidden tracking-tighter items-end">
        <div className="mb-4 text-[#00ffff] font-bold border-b border-[#00ffff]/30 pb-1">NETWORK_TRAFFIC</div>
        {dataStreams.map((s, i) => (
          <div key={i} className="py-0.5 whitespace-nowrap">
            {`INBOUND::TCP_CORE_${s.slice(0, 4)}`}
          </div>
        ))}
      </div>

      {/* Real-time Clock and HUD element */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
        <div className="text-4xl font-black font-mono tracking-[0.5em] text-[#00ffff]">{time}</div>
        <div className="text-[10px] mt-2 text-[#ff00ff] font-bold tracking-[0.2em]">SYNCHRONIZED WITH THEKORE KERNEL</div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
};

export default CyberPulseVisuals;
