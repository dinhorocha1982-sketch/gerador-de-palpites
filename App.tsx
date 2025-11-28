import React, { useState, useEffect } from 'react';
import { GeneratorTab } from './components/GeneratorTab';
import { PuxadaTab } from './components/PuxadaTab';
import { HoroscopeTab } from './components/HoroscopeTab';
import { DreamTab } from './components/DreamTab';
import { DailyStrongTab } from './components/DailyStrongTab';
import { getDailyTip } from './utils/gameLogic';
import { Dices, Sparkles, PawPrint, MoonStar, TrendingUp, Shuffle, Clover, Calendar, Info } from 'lucide-react';
import { Animal } from './types';

type Tab = 'dream' | 'horoscope' | 'puxada' | 'generator' | 'strong';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dream');
  const [dailyTip, setDailyTip] = useState<{ animal: Animal, milhar: string } | null>(null);

  useEffect(() => {
    setDailyTip(getDailyTip());
  }, []);

  // Callback to switch tabs from within components (e.g. DreamTab buttons)
  const handleTabChange = (tab: Tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 md:py-10">
      
      {/* App Header / Logo Area */}
      <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-700">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mx-auto mb-4 border border-emerald-400/30">
          <Clover className="text-white w-9 h-9 drop-shadow-md" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-400 to-emerald-200 tracking-tight">
          Gerador de Palpite <br /> Mestre Dinho
        </h1>
        <p className="text-xs md:text-sm text-emerald-500/80 mt-2 font-medium max-w-xs mx-auto">
          A inteligência artificial decifrando seus sonhos para o Jogo do Bicho.
        </p>
      </div>

      {/* Main App Card */}
      <div className="w-full max-w-lg bg-[#051a10]/80 backdrop-blur-xl border border-emerald-900/50 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col mb-6">
        
        {/* Top Navigation Tabs */}
        <div className="flex items-center justify-between px-2 pt-2 pb-0 bg-black/20 border-b border-emerald-900/30 overflow-x-auto scrollbar-hide">
          <NavTab 
            active={activeTab === 'dream'} 
            onClick={() => setActiveTab('dream')} 
            icon={<MoonStar size={18} />} 
            label="Sonho" 
          />
          <NavTab 
            active={activeTab === 'horoscope'} 
            onClick={() => setActiveTab('horoscope')} 
            icon={<Sparkles size={18} />} 
            label="Signo" 
          />
          <NavTab 
            active={activeTab === 'puxada'} 
            onClick={() => setActiveTab('puxada')} 
            icon={<PawPrint size={18} />} 
            label="Puxada" 
          />
          <NavTab 
            active={activeTab === 'generator'} 
            onClick={() => setActiveTab('generator')} 
            icon={<Shuffle size={18} />} 
            label="Gerador" 
          />
          <NavTab 
            active={activeTab === 'strong'} 
            onClick={() => setActiveTab('strong')} 
            icon={<TrendingUp size={18} />} 
            label="Fortes" 
          />
        </div>

        {/* Content Area */}
        <div className="p-6 min-h-[400px] bg-gradient-to-b from-transparent to-emerald-950/30">
          {activeTab === 'dream' && <DreamTab onNavigate={handleTabChange} />}
          {activeTab === 'horoscope' && <HoroscopeTab />}
          {activeTab === 'puxada' && <PuxadaTab />}
          {activeTab === 'generator' && <GeneratorTab />}
          {activeTab === 'strong' && <DailyStrongTab />}
        </div>
      </div>

      {/* Daily Tip Section (Bottom) */}
      {dailyTip && (
        <div className="w-full max-w-lg animate-in slide-in-from-bottom-4 duration-1000 delay-200">
           <div className="bg-gradient-to-r from-emerald-900/80 to-[#022c22] border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden group">
              
              <div className="absolute top-0 right-0 p-8 bg-emerald-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-emerald-950 rounded-xl border border-emerald-800 flex items-center justify-center flex-col shadow-inner">
                    <Calendar className="w-5 h-5 text-emerald-500 mb-1" />
                    <span className="text-[8px] font-bold text-emerald-400 leading-none">HOJE</span>
                 </div>
                 <div>
                    <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Bicho do Dia ({new Date().toLocaleDateString('pt-BR').slice(0, 5)})
                    </h3>
                    <div className="flex items-baseline gap-2">
                       <span className="text-xl font-bold text-white">{dailyTip.animal.name}</span>
                       <span className="text-emerald-600 text-xs font-bold">Gr. {dailyTip.animal.id}</span>
                    </div>
                 </div>
              </div>

              <div className="text-right relative z-10 bg-black/20 p-2 rounded-lg border border-emerald-500/10">
                 <div className="text-[10px] text-emerald-500 font-bold uppercase mb-0.5">Milhar Forte</div>
                 <div className="text-2xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-400 tracking-widest">
                    {dailyTip.milhar}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Footer / Copyright */}
      <div className="mt-8 text-center opacity-40">
        <p className="text-[10px] text-emerald-100 uppercase tracking-widest">Mestre Dinho v2.0</p>
      </div>
    </div>
  );
};

const NavTab: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-3 px-3 md:px-5 min-w-[70px] relative transition-all duration-300 group ${
      active ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-300/70'
    }`}
  >
    <div className={`mb-1.5 transition-transform duration-300 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'group-hover:scale-105'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-bold tracking-wide uppercase transition-colors ${active ? 'text-emerald-400' : ''}`}>{label}</span>
    
    {/* Active Indicator Line */}
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 shadow-[0_-2px_6px_rgba(16,185,129,0.5)] rounded-t-full" />
    )}
  </button>
);

export default App;
