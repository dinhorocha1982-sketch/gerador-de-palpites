import React from 'react';
import { ZODIAC_SIGNS } from '../constants';
import { getDailyHoroscopeMilhar, getAnimalByNumber } from '../utils/gameLogic';
import { Star } from 'lucide-react';

export const HoroscopeTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-emerald-400 mb-1">Horóscopo da Sorte</h2>
        <p className="text-xs text-emerald-600/70">Milhar fixa diária por signo ({new Date().toLocaleDateString('pt-BR')})</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ZODIAC_SIGNS.map((sign) => {
          const luckyMilhar = getDailyHoroscopeMilhar(sign.id);
          const luckyAnimal = getAnimalByNumber(parseInt(luckyMilhar));

          return (
            <div key={sign.id} className="bg-[#022c22] p-3 rounded-xl border border-emerald-900/50 flex items-center justify-between group hover:border-emerald-500/30 transition-colors hover:bg-[#033529]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-xl border border-emerald-900">
                  {sign.icon}
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100 text-sm">{sign.name}</h3>
                  <p className="text-[10px] text-emerald-600/70">{sign.dates}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-white font-mono font-bold text-lg tracking-widest">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  {luckyMilhar}
                </div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase">
                  {luckyAnimal?.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};