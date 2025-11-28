import React, { useState } from 'react';
import { DREAM_DICTIONARY, ANIMALS } from '../constants';
import { generateDreamPalpite } from '../utils/gameLogic';
import { Search, Sparkles, Dices, Calendar } from 'lucide-react';

interface DreamTabProps {
  onNavigate?: (tab: 'generator' | 'strong') => void;
}

export const DreamTab: React.FC<DreamTabProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setHasSearched(true);
  };

  const lowerTerm = searchTerm.toLowerCase().trim();

  const dictionaryMatches = searchTerm.length >= 2 
    ? DREAM_DICTIONARY.filter(dream => 
        dream.keywords.some(k => lowerTerm.includes(k))
      ).map(dream => {
          const animal = ANIMALS.find(a => a.id === dream.animalId);
          return { ...dream, animal };
      })
    : [];
  
  const mysticResult = generateDreamPalpite(searchTerm);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {!hasSearched ? (
        <>
          <div className="space-y-2">
            <label className="text-emerald-400 text-sm font-semibold ml-1 block">
              O que você sonhou hoje?
            </label>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
              <textarea
                placeholder="Ex: Sonhei com uma praia cheia de tartarugas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative w-full bg-[#022c22] text-emerald-50 placeholder-emerald-800/50 border border-emerald-900/50 rounded-xl p-4 min-h-[140px] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-sm leading-relaxed"
              />
            </div>
          </div>

          <button 
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 group"
          >
            <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
            Interpretar Sonho
          </button>

          <div className="pt-2">
            <button 
              onClick={() => onNavigate?.('generator')}
              className="w-full bg-[#022c22] border border-emerald-900/50 hover:bg-emerald-900/30 text-emerald-400 text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Dices className="w-4 h-4" />
              Gerar Palpite Aleatório
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-emerald-900/30">
                <h3 className="text-emerald-400 font-bold">Resultado da Interpretação</h3>
                <button onClick={() => {setHasSearched(false); setSearchTerm('')}} className="text-xs text-slate-500 hover:text-emerald-400">Nova Consulta</button>
            </div>

             {/* Dictionary Results */}
             {dictionaryMatches.length > 0 && (
                <div className="space-y-2">
                    {dictionaryMatches.map((res, idx) => (
                        <div key={idx} className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                            <div>
                                <div className="flex flex-wrap gap-1 mb-1">
                                {res.keywords.filter(k => lowerTerm.includes(k)).map(k => (
                                    <span key={k} className="text-emerald-300 text-xs font-bold uppercase">{k}</span>
                                ))}
                                </div>
                                <span className="text-[10px] text-emerald-600 uppercase tracking-wider">Significado Direto</span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-white">{res.animal?.name}</div>
                                <div className="text-xs text-emerald-500">Grupo {res.animal?.id}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Mystic Result */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-[#022c22] p-6 rounded-2xl border border-emerald-500/30 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles className="w-32 h-32" />
                </div>
                
                <p className="text-emerald-400/80 text-xs uppercase tracking-widest font-bold mb-4">Palpite Místico</p>
                
                <div className="flex flex-col items-center justify-center mb-4">
                     <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-400 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {mysticResult.animal?.name}
                     </span>
                     <span className="text-emerald-500 font-mono text-sm mt-1">Grupo {mysticResult.animal?.id}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-600 text-xs font-bold">MILHAR</span>
                    <span className="text-xl font-mono font-bold text-white tracking-widest">{mysticResult.milhar}</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};