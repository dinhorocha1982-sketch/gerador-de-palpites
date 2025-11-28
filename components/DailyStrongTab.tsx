import React, { useState, useEffect } from 'react';
import { getStrongTens } from '../utils/gameLogic';
import { TrendingUp, Award } from 'lucide-react';

export const DailyStrongTab: React.FC = () => {
  const [tens, setTens] = useState<string[]>([]);

  useEffect(() => {
    setTens(getStrongTens());
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-emerald-400 mb-1 flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Top 10 Dezenas
        </h2>
        <p className="text-xs text-emerald-600/70">Calculadas estatisticamente para o dia de hoje.</p>
      </div>

      <div className="bg-gradient-to-br from-[#022c22] to-emerald-950 p-6 rounded-3xl border border-emerald-500/20 shadow-inner">
        <div className="grid grid-cols-5 gap-4">
            {tens.map((ten, i) => (
                <div key={i} className="aspect-square flex flex-col items-center justify-center bg-[#051a10] rounded-2xl border border-emerald-800 text-white font-bold text-lg shadow-lg relative overflow-hidden group hover:border-emerald-500 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
                    <span className="relative z-10">{ten}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-900/50 flex gap-3 items-start">
          <div className="bg-emerald-900/50 p-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xs text-emerald-400/80 leading-relaxed">
              <strong className="text-emerald-300">Dica Mestre:</strong> Utilize estas dezenas para formar seus jogos de Duque de Dezena ou Terno de Dezena combinados com os palpites do seu sonho.
          </p>
      </div>
    </div>
  );
};