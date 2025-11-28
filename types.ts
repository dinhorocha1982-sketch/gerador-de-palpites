export interface Animal {
  id: number;
  name: string;
  tens: string[];
}

export interface ZodiacSign {
  id: string;
  name: string;
  dates: string;
  icon: string;
}

export type GameType = 
  | 'MILHAR' 
  | 'CENTENA' 
  | 'GRUPO' 
  | 'TERNO_DEZENA' 
  | 'TERNO_GRUPO' 
  | 'DUQUE_DEZENA' 
  | 'DUQUE_GRUPO';

export interface DreamMapping {
  keywords: string[];
  animalId: number;
}
