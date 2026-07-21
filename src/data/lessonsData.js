// Interactive Lessons Metadata with real Module titles

export const LESSON_CATEGORIES = [
  {
    id: 'module-1',
    title: 'Módulo 1: Fundamentos y Jerarquía',
    subtitle: 'Aprende las 10 combinaciones de cartas de menor a mayor fuerza',
    icon: 'Layers',
    badge: 'Principiante',
    lessons: [
      {
        id: 'hand-rankings',
        title: 'Ranking de Manos Interactivo',
        desc: 'Conoce las 10 jugadas del poker con cartas en vivo',
        type: 'hand_ranks_visualizer'
      },
      {
        id: 'hand-quiz-mini',
        title: 'Desafío Infinito: ¿Cuál mano gana?',
        desc: 'Compara 2 manos generadas aleatoriamente en tiempo real',
        type: 'mini_hand_match'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Módulo 2: Las 4 Fases de la Partida',
    subtitle: 'Pre-flop, Flop, Turn y River explicados paso a paso',
    icon: 'PlayCircle',
    badge: 'Intermedio',
    lessons: [
      {
        id: 'street-walkthrough',
        title: 'Simulador Paso a Paso de una Mano',
        desc: 'Sigue el viaje completo de una jugada desde las ciegas hasta el desenlace',
        type: 'street_simulation'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Módulo 3: Posición y Regla del 4 y 2',
    subtitle: 'Ventaja del Botón y cómo calcular tu % de victoria sin calculadora',
    icon: 'Brain',
    badge: 'Avanzado',
    lessons: [
      {
        id: 'rule-4-2',
        title: 'Calculadora de la Regla del 4 y del 2',
        desc: 'Calcula tu porcentaje de victoria en 2 segundos',
        type: 'math_outs_rule'
      }
    ]
  }
];

export const HAND_RANKINGS_LIST = [
  {
    rank: 10,
    name: 'Escalera Real (Royal Flush)',
    desc: 'La mano imbatible del poker. 10, J, Q, K y As del mismo palo.',
    example: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' },
      { rank: 12, rankLabel: 'Q', suit: '♠', suitColor: 'black' },
      { rank: 11, rankLabel: 'J', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 9,
    name: 'Escalera de Color (Straight Flush)',
    desc: 'Cualquier secuencia de 5 cartas seguidas del mismo palo.',
    example: [
      { rank: 9, rankLabel: '9', suit: '♥', suitColor: 'red' },
      { rank: 8, rankLabel: '8', suit: '♥', suitColor: 'red' },
      { rank: 7, rankLabel: '7', suit: '♥', suitColor: 'red' },
      { rank: 6, rankLabel: '6', suit: '♥', suitColor: 'red' },
      { rank: 5, rankLabel: '5', suit: '♥', suitColor: 'red' },
    ]
  },
  {
    rank: 8,
    name: 'Póker (Four of a Kind)',
    desc: '4 cartas exactamente con el mismo valor numérico.',
    example: [
      { rank: 10, rankLabel: '10', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♥', suitColor: 'red' },
      { rank: 10, rankLabel: '10', suit: '♦', suitColor: 'blue' },
      { rank: 10, rankLabel: '10', suit: '♣', suitColor: 'green' },
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 7,
    name: 'Full House (Trio + Pareja)',
    desc: 'Combinación formada por 3 cartas de un número y 2 cartas de otro.',
    example: [
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♥', suitColor: 'red' },
      { rank: 13, rankLabel: 'K', suit: '♦', suitColor: 'blue' },
      { rank: 4, rankLabel: '4', suit: '♣', suitColor: 'green' },
      { rank: 4, rankLabel: '4', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 6,
    name: 'Color (Flush)',
    desc: '5 cartas del mismo palo sin importar el orden.',
    example: [
      { rank: 14, rankLabel: 'A', suit: '♦', suitColor: 'blue' },
      { rank: 11, rankLabel: 'J', suit: '♦', suitColor: 'blue' },
      { rank: 8, rankLabel: '8', suit: '♦', suitColor: 'blue' },
      { rank: 5, rankLabel: '5', suit: '♦', suitColor: 'blue' },
      { rank: 2, rankLabel: '2', suit: '♦', suitColor: 'blue' },
    ]
  },
  {
    rank: 5,
    name: 'Escalera (Straight)',
    desc: '5 cartas con valores numéricos consecutivos de palos mezclados.',
    example: [
      { rank: 8, rankLabel: '8', suit: '♠', suitColor: 'black' },
      { rank: 7, rankLabel: '7', suit: '♥', suitColor: 'red' },
      { rank: 6, rankLabel: '6', suit: '♣', suitColor: 'green' },
      { rank: 5, rankLabel: '5', suit: '♦', suitColor: 'blue' },
      { rank: 4, rankLabel: '4', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 4,
    name: 'Trio (Three of a Kind)',
    desc: '3 cartas del mismo número.',
    example: [
      { rank: 12, rankLabel: 'Q', suit: '♠', suitColor: 'black' },
      { rank: 12, rankLabel: 'Q', suit: '♥', suitColor: 'red' },
      { rank: 12, rankLabel: 'Q', suit: '♣', suitColor: 'green' },
      { rank: 9, rankLabel: '9', suit: '♦', suitColor: 'blue' },
      { rank: 3, rankLabel: '3', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 3,
    name: 'Doble Pareja (Two Pair)',
    desc: '2 cartas de un número + 2 cartas de otro número distinto.',
    example: [
      { rank: 11, rankLabel: 'J', suit: '♠', suitColor: 'black' },
      { rank: 11, rankLabel: 'J', suit: '♥', suitColor: 'red' },
      { rank: 7, rankLabel: '7', suit: '♦', suitColor: 'blue' },
      { rank: 7, rankLabel: '7', suit: '♣', suitColor: 'green' },
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 2,
    name: 'Pareja (One Pair)',
    desc: '2 cartas del mismo número.',
    example: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 14, rankLabel: 'A', suit: '♥', suitColor: 'red' },
      { rank: 10, rankLabel: '10', suit: '♦', suitColor: 'blue' },
      { rank: 6, rankLabel: '6', suit: '♣', suitColor: 'green' },
      { rank: 2, rankLabel: '2', suit: '♠', suitColor: 'black' },
    ]
  },
  {
    rank: 1,
    name: 'Carta Alta (High Card)',
    desc: 'Mano sin combinaciones. Gana la carta de valor más alto.',
    example: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 11, rankLabel: 'J', suit: '♥', suitColor: 'red' },
      { rank: 8, rankLabel: '8', suit: '♦', suitColor: 'blue' },
      { rank: 5, rankLabel: '5', suit: '♣', suitColor: 'green' },
      { rank: 3, rankLabel: '3', suit: '♠', suitColor: 'black' },
    ]
  }
];
