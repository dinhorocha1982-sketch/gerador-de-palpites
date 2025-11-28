import React, { useState } from 'react';
import { GameType } from '../types';
import { generatePalpite } from '../utils/gameLogic';
import { RefreshCw, Copy, Check } from 'lucide-react';

const BET_TYPES: { id: GameType; label: string }[] = [
  { id: 'MILHAR', label: 'Milhar' },
  { id: 'CENTENA', label: 'Centena' },
  { id: 'GRUPO', label: 'Grupo' },
  { id: 'TERNO_DEZENA', label: 'Terno Dez.' },
  { id: 'TERNO_GRUPO', label: 'Terno Grp.' },
  { id: 'DUQUE_DEZENA', label: 'Duque Dez.' },
  { id: 'DUQUE_GRUPO', label: 'Duque Grp.' },
];

export const GeneratorTab: React.FC = () => {
  const [activeType, setActiveType] = useState<GameType>('MILHAR');
  const [results, setResults] = useState<{ numbers: string[]; animal?: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newResults = Array.from({ length: 5 }, () => generatePalpite(activeType));
    setResults(newResults);
    setCopied(false);
  };

  const handleCopy = () => {
    if (results.length === 0) return;
    const typeLabel = BET_TYPES.find(t => t.id === activeType)?.label;
    
    let text = `*Mestre Dinho - Palpites (${typeLabel})*\n\n`;
    results.forEach((res, i) => {
        text += `${i + 1}º: ${res.numbers.join('.')} ${res.animal ? `(${res.animal})` : ''}\n`;
    });
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
        <div className="flex gap-2 w-max">
          {BET_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => { setActiveType(type.id); setResults([]); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeType === type.id
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#022c22] border-emerald-900/50 text-emerald-400/70 hover:bg-emerald-900/40 hover:text-emerald-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 min-h-[220px]">
        {results.length > 0 ? (
          results.map((result, idx) => (
            <div 
              key={idx} 
              className="bg-[#022c22] rounded-xl border border-emerald-900/50 p-4 relative overflow-hidden animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards group hover:border-emerald-500/30 transition-colors"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-green-700" />
              <div className="flex justify-between items-center pl-3">
                 <div className="flex gap-3 items-center flex-1">
                    <span className="text-emerald-700 text-[10px] font-black mr-1">#{idx + 1}</span>
                    <div className="flex flex-wrap gap-2">
                      {result.numbers.map((num, i) => (
                          <span key={i} className="text-xl md:text-2xl font-bold text-white tracking-widest font-mono">
                              {num}
                              {i < result.numbers.length - 1 && <span className="text-emerald-700 ml-1 mr-1">.</span>}
                          </span>
                      ))}
                    </div>
                 </div>
                 {result.animal && (
                     <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider text-right ml-2 whitespace-nowrap bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900">{result.animal}</div>
                 )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-64 flex flex-col items-center justify-center bg-[#022c22]/50 rounded-2xl border-2 border-dashed border-emerald-900/30">
            <div className="text-emerald-600/50 text-center px-6 text-sm">
              <p>Escolha o tipo de jogo acima e clique em <span className="font-bold text-emerald-500">GERAR</span></p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 pt-2">
        <button
          onClick={handleGenerate}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all transform active:scale-95 border-b-4 border-emerald-800 hover:border-emerald-700 active:border-t-4 active:border-b-0"
        >
          <RefreshCw className="w-5 h-5" />
          GERAR 5 PALPITES
        </button>
        
        {results.length > 0 && (
            <button
            onClick={handleCopy}
            className="w-full bg-[#022c22] hover:bg-[#064e3b] text-emerald-400 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-emerald-900/50"
            >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Resultado'}
            </button>
        )}
      </div>
    </div>
  );
};