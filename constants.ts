import { Animal, ZodiacSign, DreamMapping } from './types';

export const ANIMALS: Animal[] = [
  { id: 1, name: 'Avestruz', tens: ['01', '02', '03', '04'] },
  { id: 2, name: 'Águia', tens: ['05', '06', '07', '08'] },
  { id: 3, name: 'Burro', tens: ['09', '10', '11', '12'] },
  { id: 4, name: 'Borboleta', tens: ['13', '14', '15', '16'] },
  { id: 5, name: 'Cachorro', tens: ['17', '18', '19', '20'] },
  { id: 6, name: 'Cabra', tens: ['21', '22', '23', '24'] },
  { id: 7, name: 'Carneiro', tens: ['25', '26', '27', '28'] },
  { id: 8, name: 'Camelo', tens: ['29', '30', '31', '32'] },
  { id: 9, name: 'Cobra', tens: ['33', '34', '35', '36'] },
  { id: 10, name: 'Coelho', tens: ['37', '38', '39', '40'] },
  { id: 11, name: 'Cavalo', tens: ['41', '42', '43', '44'] },
  { id: 12, name: 'Elefante', tens: ['45', '46', '47', '48'] },
  { id: 13, name: 'Galo', tens: ['49', '50', '51', '52'] },
  { id: 14, name: 'Gato', tens: ['53', '54', '55', '56'] },
  { id: 15, name: 'Jacaré', tens: ['57', '58', '59', '60'] },
  { id: 16, name: 'Leão', tens: ['61', '62', '63', '64'] },
  { id: 17, name: 'Macaco', tens: ['65', '66', '67', '68'] },
  { id: 18, name: 'Porco', tens: ['69', '70', '71', '72'] },
  { id: 19, name: 'Pavão', tens: ['73', '74', '75', '76'] },
  { id: 20, name: 'Peru', tens: ['77', '78', '79', '80'] },
  { id: 21, name: 'Touro', tens: ['81', '82', '83', '84'] },
  { id: 22, name: 'Tigre', tens: ['85', '86', '87', '88'] },
  { id: 23, name: 'Urso', tens: ['89', '90', '91', '92'] },
  { id: 24, name: 'Veado', tens: ['93', '94', '95', '96'] },
  { id: 25, name: 'Vaca', tens: ['97', '98', '99', '00'] },
];

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Áries', dates: '21 Mar - 19 Abr', icon: '♈' },
  { id: 'taurus', name: 'Touro', dates: '20 Abr - 20 Mai', icon: '♉' },
  { id: 'gemini', name: 'Gêmeos', dates: '21 Mai - 20 Jun', icon: '♊' },
  { id: 'cancer', name: 'Câncer', dates: '21 Jun - 22 Jul', icon: '♋' },
  { id: 'leo', name: 'Leão', dates: '23 Jul - 22 Ago', icon: '♌' },
  { id: 'virgo', name: 'Virgem', dates: '23 Ago - 22 Set', icon: '♍' },
  { id: 'libra', name: 'Libra', dates: '23 Set - 22 Out', icon: '♎' },
  { id: 'scorpio', name: 'Escorpião', dates: '23 Out - 21 Nov', icon: '♏' },
  { id: 'sagittarius', name: 'Sagitário', dates: '22 Nov - 21 Dez', icon: '♐' },
  { id: 'capricorn', name: 'Capricórnio', dates: '22 Dez - 19 Jan', icon: '♑' },
  { id: 'aquarius', name: 'Aquário', dates: '20 Jan - 18 Fev', icon: '♒' },
  { id: 'pisces', name: 'Peixes', dates: '19 Fev - 20 Mar', icon: '♓' },
];

export const PUXADAS: Record<number, number[]> = {
  1: [25, 2, 8, 22],   // Avestruz puxa Vaca, Águia, Camelo, Tigre
  2: [1, 23, 7, 10],   // Águia puxa Avestruz, Urso, Carneiro, Coelho
  3: [11, 2, 23, 24],  // Burro puxa Cavalo, Águia, Urso, Veado
  4: [14, 18, 5, 20],  // Borboleta puxa Gato, Porco, Cachorro, Peru
  5: [16, 17, 14, 25], // Cachorro puxa Leão, Macaco, Gato, Vaca
  6: [11, 2, 7, 17],   // Cabra puxa Cavalo, Águia, Carneiro, Macaco
  7: [1, 6, 21, 25],   // Carneiro puxa Avestruz, Cabra, Touro, Vaca
  8: [15, 23, 11, 22], // Camelo puxa Jacaré, Urso, Cavalo, Tigre
  9: [15, 10, 5, 12],  // Cobra puxa Jacaré, Coelho, Cachorro, Elefante
  10: [7, 2, 11, 24],  // Coelho puxa Carneiro, Águia, Burro, Veado
  11: [3, 6, 25, 21],  // Cavalo puxa Burro, Cabra, Vaca, Touro
  12: [13, 10, 3, 23], // Elefante puxa Galo, Coelho, Burro, Urso
  13: [20, 17, 2, 14], // Galo puxa Peru, Macaco, Águia, Gato
  14: [4, 5, 16, 22],  // Gato puxa Borboleta, Cachorro, Leão, Tigre
  15: [9, 8, 4, 18],   // Jacaré puxa Cobra, Camelo, Borboleta, Porco
  16: [21, 22, 5, 14], // Leão puxa Touro, Tigre, Cachorro, Gato
  17: [1, 13, 2, 5],   // Macaco puxa Avestruz, Galo, Águia, Cachorro
  18: [9, 5, 15, 20],  // Porco puxa Cobra, Cachorro, Jacaré, Peru
  19: [13, 20, 12, 1], // Pavão puxa Galo, Peru, Elefante, Avestruz
  20: [13, 1, 19, 4],  // Peru puxa Galo, Avestruz, Pavão, Borboleta
  21: [25, 3, 6, 7],   // Touro puxa Vaca, Burro, Cabra, Carneiro
  22: [14, 16, 5, 25], // Tigre puxa Gato, Leão, Cachorro, Vaca
  23: [24, 15, 8, 12], // Urso puxa Veado, Jacaré, Camelo, Elefante
  24: [23, 10, 11, 7], // Veado puxa Urso, Coelho, Cavalo, Carneiro
  25: [21, 1, 7, 22],  // Vaca puxa Touro, Avestruz, Carneiro, Tigre
};

// Expanded Dream Dictionary
export const DREAM_DICTIONARY: DreamMapping[] = [
  // Grupo 01 - Avestruz
  { keywords: ['avestruz', 'ovo', 'buraco', 'esconder', 'correr', 'pescoço', 'pena'], animalId: 1 },
  // Grupo 02 - Águia
  { keywords: ['aguia', 'voar', 'céu', 'asas', 'nuvem', 'alto', 'avião', 'gavião', 'rapina'], animalId: 2 },
  // Grupo 03 - Burro
  { keywords: ['burro', 'jumento', 'carroça', 'trabalho', 'teimosia', 'orelha', 'relinchar'], animalId: 3 },
  // Grupo 04 - Borboleta
  { keywords: ['borboleta', 'jardim', 'flor', 'cor', 'transformação', 'lagarta', 'beleza'], animalId: 4 },
  // Grupo 05 - Cachorro
  { keywords: ['cachorro', 'cão', 'latido', 'mordida', 'amigo', 'fiel', 'policial', 'guarda', 'osso'], animalId: 5 },
  // Grupo 06 - Cabra
  { keywords: ['cabra', 'bode', 'leite', 'montanha', 'chifre', 'berrar', 'pastor'], animalId: 6 },
  // Grupo 07 - Carneiro
  { keywords: ['carneiro', 'ovelha', 'lã', 'rebanho', 'macio', 'branco', 'filhote', 'criança', 'bebê'], animalId: 7 },
  // Grupo 08 - Camelo
  { keywords: ['camelo', 'deserto', 'areia', 'sede', 'corcova', 'viagem', 'pirâmide', 'sol'], animalId: 8 },
  // Grupo 09 - Cobra
  { keywords: ['cobra', 'serpente', 'veneno', 'traição', 'rastejar', 'picada', 'medo', 'floresta'], animalId: 9 },
  // Grupo 10 - Coelho
  { keywords: ['coelho', 'lebre', 'dente', 'cenoura', 'páscoa', 'pular', 'orelhudo', 'toca'], animalId: 10 },
  // Grupo 11 - Cavalo
  { keywords: ['cavalo', 'égua', 'corrida', 'ferradura', 'trotar', 'cavalgar', 'sela', 'estábulo'], animalId: 11 },
  // Grupo 12 - Elefante
  { keywords: ['elefante', 'tromba', 'marfim', 'gigante', 'circo', 'memória', 'peso', 'pesado'], animalId: 12 },
  // Grupo 13 - Galo
  { keywords: ['galo', 'galinha', 'amanhecer', 'crista', 'briga', 'ovo', 'terreiro', 'penas'], animalId: 13 },
  // Grupo 14 - Gato
  { keywords: ['gato', 'felino', 'miau', 'telhado', 'unha', 'preguiça', 'sete vidas', 'noturno'], animalId: 14 },
  // Grupo 15 - Jacaré
  { keywords: ['jacaré', 'crocodilo', 'rio', 'lago', 'pântano', 'boca', 'dentes', 'verde', 'água'], animalId: 15 },
  // Grupo 16 - Leão
  { keywords: ['leão', 'rei', 'selva', 'rugido', 'juba', 'feroz', 'trono', 'coroa', 'poder'], animalId: 16 },
  // Grupo 17 - Macaco
  { keywords: ['macaco', 'banana', 'árvore', 'cipó', 'pulo', 'engraçado', 'floresta', 'imitador'], animalId: 17 },
  // Grupo 18 - Porco
  { keywords: ['porco', 'leitão', 'lama', 'sujeira', 'bacon', 'focinho', 'roncar', 'chiqueiro'], animalId: 18 },
  // Grupo 19 - Pavão
  { keywords: ['pavão', 'cauda', 'azul', 'leque', 'vaidade', 'orgulho', 'exótico', 'jardim'], animalId: 19 },
  // Grupo 20 - Peru
  { keywords: ['peru', 'natal', 'ceia', 'festa', 'grugulejar', 'comida', 'jantar', 'ave'], animalId: 20 },
  // Grupo 21 - Touro
  { keywords: ['touro', 'boi', 'vaca', 'chifre', 'vermelho', 'tourada', 'campo', 'força'], animalId: 21 },
  // Grupo 22 - Tigre
  { keywords: ['tigre', 'listras', 'bengala', 'caçador', 'asiático', 'garras', 'ataque'], animalId: 22 },
  // Grupo 23 - Urso
  { keywords: ['urso', 'mel', 'polar', 'pardo', 'inverno', 'hibernar', 'caverna', 'peludo'], animalId: 23 },
  // Grupo 24 - Veado
  { keywords: ['veado', 'cervo', 'galhada', 'bambi', 'floresta', 'tímido', 'rápido'], animalId: 24 },
  // Grupo 25 - Vaca
  { keywords: ['vaca', 'leite', 'fazenda', 'pasto', 'mugir', 'queijo', 'bezerro', 'dinheiro'], animalId: 25 },
  
  // Abstract Concepts & Common Objects
  { keywords: ['fogo', 'incêndio', 'queimar', 'calor'], animalId: 16 }, // Leão (Sol)
  { keywords: ['água', 'mar', 'chuva', 'nadar', 'enchente'], animalId: 15 }, // Jacaré
  { keywords: ['dinheiro', 'ouro', 'nota', 'moeda', 'riqueza', 'loteria'], animalId: 25 }, // Vaca (Riqueza)
  { keywords: ['casamento', 'igreja', 'noiva', 'anel'], animalId: 4 }, // Borboleta (União/Beleza)
  { keywords: ['morte', 'caixão', 'cemitério', 'fantasma'], animalId: 1 }, // Avestruz (Cabeça na terra)
  { keywords: ['sexo', 'amor', 'paixão', 'beijo'], animalId: 24 }, // Veado
  { keywords: ['briga', 'sangue', 'faca', 'tiro'], animalId: 13 }, // Galo (Briga)
  { keywords: ['criança', 'escola', 'brinquedo'], animalId: 7 }, // Carneiro
  { keywords: ['comida', 'fome', 'banquete', 'fruta'], animalId: 18 }, // Porco
  { keywords: ['dente', 'cair', 'dentista'], animalId: 10 }, // Coelho
  { keywords: ['policia', 'prisão', 'lei'], animalId: 2 }, // Águia (Vigilância)
  { keywords: ['carro', 'moto', 'ônibus', 'caminhão'], animalId: 8 }, // Camelo (Transporte)
  { keywords: ['casa', 'apartamento', 'mudança'], animalId: 5 }, // Cachorro (Guardião)
  { keywords: ['trabalho', 'chefe', 'escritório'], animalId: 3 }, // Burro (Carga)
  { keywords: ['festa', 'música', 'dança'], animalId: 17 }, // Macaco (Alegria)
];