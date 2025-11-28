import { ANIMALS, PUXADAS } from '../constants';
import { Animal } from '../types';

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const padNumber = (num: number, width: number): string => {
  const n = num.toString();
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

export const getAnimalByNumber = (num: number): Animal | undefined => {
  // Normalize 00 to 100 for math, but keeps 00 representation
  let checkNum = num === 0 ? 100 : num;
  // If number is > 100 (e.g. Milhar), get last two digits
  if (checkNum > 100) {
    const lastTwo = parseInt(num.toString().slice(-2));
    checkNum = lastTwo === 0 ? 100 : lastTwo;
  }
  
  const animalId = Math.ceil(checkNum / 4);
  return ANIMALS.find(a => a.id === animalId);
};

export const generatePalpite = (type: string): { numbers: string[], animal?: string } => {
  switch (type) {
    case 'MILHAR':
      const m = getRandomInt(0, 9999);
      return { numbers: [padNumber(m, 4)], animal: getAnimalByNumber(m)?.name };
    case 'CENTENA':
      const c = getRandomInt(0, 999);
      return { numbers: [padNumber(c, 3)], animal: getAnimalByNumber(c)?.name };
    case 'GRUPO':
      const g = getRandomInt(1, 25);
      return { numbers: [padNumber(g, 2)], animal: ANIMALS.find(a => a.id === g)?.name };
    case 'TERNO_DEZENA':
      return { 
        numbers: Array.from({length: 3}, () => padNumber(getRandomInt(0, 99), 2)),
        animal: 'Misto' 
      };
    case 'TERNO_GRUPO':
      return { 
        numbers: Array.from({length: 3}, () => padNumber(getRandomInt(1, 25), 2)),
        animal: 'Grupos Variados' 
      };
    case 'DUQUE_DEZENA':
      return { 
        numbers: Array.from({length: 2}, () => padNumber(getRandomInt(0, 99), 2)),
        animal: 'Misto' 
      };
    case 'DUQUE_GRUPO':
      return { 
        numbers: Array.from({length: 2}, () => padNumber(getRandomInt(1, 25), 2)),
        animal: 'Grupos Variados' 
      };
    default:
      return { numbers: [], animal: '' };
  }
};

export const getStrongTens = (): string[] => {
  const tens = new Set<string>();
  while(tens.size < 10) {
    tens.add(padNumber(getRandomInt(0, 99), 2));
  }
  return Array.from(tens).sort();
};

export const getPuxada = (animalId: number): Animal[] => {
  const relatedIds = PUXADAS[animalId] || [];
  return relatedIds.map(id => ANIMALS.find(a => a.id === id)!).filter(Boolean);
};

// Deterministic random based on string seed
export const seededRandom = (seed: string): number => {
  let h = 0xdeadbeef;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  }
  h = ((h ^ h >>> 16) >>> 0);
  return h / 4294967296;
};

export const getDailyHoroscopeMilhar = (signId: string): string => {
  const dateStr = new Date().toDateString(); // Changes daily
  const seed = `${signId}-${dateStr}-mestre-dinho`;
  const rand = seededRandom(seed);
  const milhar = Math.floor(rand * 10000);
  return padNumber(milhar, 4);
};

// Generate a specific animal and milhar from any dream text
export const generateDreamPalpite = (dreamText: string): { animal: Animal | undefined, milhar: string } => {
  const cleanText = dreamText.trim().toLowerCase();
  // We use the text itself to generate a seed
  const rand = seededRandom(cleanText + "dream-key");
  const milharNum = Math.floor(rand * 10000);
  const milhar = padNumber(milharNum, 4);
  const animal = getAnimalByNumber(milharNum);
  
  return { animal, milhar };
};

// Get Daily Animal and Milhar based on Date
export const getDailyTip = (): { animal: Animal, milhar: string } => {
  const today = new Date().toLocaleDateString('pt-BR');
  const seed = `daily-tip-${today}`;
  
  // 1. Pick Animal (1-25)
  const rand1 = seededRandom(seed + 'animal');
  const animalId = Math.floor(rand1 * 25) + 1;
  const animal = ANIMALS.find(a => a.id === animalId)!;
  
  // 2. Pick a specific ten from the animal
  const rand2 = seededRandom(seed + 'ten');
  const tenIndex = Math.floor(rand2 * 4); // 0 to 3
  const ten = animal.tens[tenIndex];
  
  // 3. Pick a prefix (00-99)
  const rand3 = seededRandom(seed + 'prefix');
  const prefix = Math.floor(rand3 * 100).toString().padStart(2, '0');
  
  const milhar = `${prefix}${ten}`;
  
  return { animal, milhar };
};
