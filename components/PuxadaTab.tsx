import React, { useState } from 'react';
import { ANIMALS } from '../constants';
import { getPuxada } from '../utils/gameLogic';
import { PawPrint, ArrowRight } from 'lucide-react';

export const PuxadaTab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedAnimal = selectedId ? ANIMALS.find(a => a.id === selectedId) : null;
  const puxadas = selectedId ? getPuxada(selectedId) : [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-emerald-400 mb-1">Tabela de Puxadas</h2>
        <p className="text-xs text-emerald-600/70">Selecione o bicho que saiu na cabeça.</p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {ANIMALS.map((animal) => (
          <button
            key={animal.id}
            onClick={() => setSelectedId(animal.id)}
            className={`p-1.5 rounded-lg text-[10px] font-bold transition-all border ${
              selectedId === animal.id
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)] scale-105 z-10'
                : 'bg-[#022c22] border-emerald-900/30 text-emerald-500/60 hover:bg-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="opacity-50 mb-0.5">#{animal.id}</div>
            <div className="truncate">{animal.name}</div>
          </button>
        ))}
      </div>

      {selectedAnimal && (
        <div className="bg-[#022c22] rounded-xl p-6 border border-emerald-500/20 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <PawPrint className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="font-bold text-emerald-300 text-sm">{selectedAnimal.name}</p>
            </div>
            <div className="flex flex-col items-center">
                 <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mb-1">Puxa</span>
                 <ArrowRight className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {puxadas.map((puxada) => (
              <div key={puxada.id} className="bg-[#051a10] p-3 rounded-lg flex items-center justify-between border border-emerald-900 group hover:border-emerald-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-emerald-900/50 flex items-center justify-center text-xs font-bold text-emerald-400 border border-emerald-800">
                    {puxada.id}
                  </span>
                  <span className="font-semibold text-emerald-100 text-sm">{puxada.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};