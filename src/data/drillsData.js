// Interactive Practice Drills & Scenario Quizzes

export const DRILLS = [
  {
    id: 'drill-1',
    category: 'Pre-flop Basics',
    title: 'Mano Monstruo en Posición',
    difficulty: 'Fácil',
    xp: 50,
    heroHand: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 14, rankLabel: 'A', suit: '♥', suitColor: 'red' }
    ],
    position: 'Botón (BT)',
    pot: 45,
    toCall: 15,
    street: 'Pre-flop',
    community: [],
    question: 'Estás en el Botón con Pareja de Ases (AA) y un rival ha subido a 15 fichas. ¿Cuál es la mejor jugada?',
    options: [
      { id: 'fold', text: 'Retirarse (Fold)', correct: false, explanation: '¡Jamás te retires con Pareja de Ases pre-flop! Es la mejor mano inicial del poker.' },
      { id: 'call', text: 'Igualar (Call) 15 fichas', correct: false, explanation: 'Igualar no está mal, pero re-subir (Re-raise) mete más dinero en el bote con la mejor mano.' },
      { id: 'raise', text: 'Re-subir (Raise) a 45 fichas', correct: true, explanation: '¡Correcto! Tienes la mejor mano pre-flop del juego. Tu objetivo es hacer crecer el bote al máximo.' }
    ]
  },
  {
    id: 'drill-2',
    category: 'Post-flop & Outs',
    title: 'Proyecto de Color (Nut Flush Draw)',
    difficulty: 'Media',
    xp: 75,
    heroHand: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♠', suitColor: 'black' }
    ],
    position: 'Ciega Grande (BB)',
    pot: 120,
    toCall: 30,
    street: 'Flop',
    community: [
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' },
      { rank: 7, rankLabel: '7', suit: '♠', suitColor: 'black' },
      { rank: 2, rankLabel: '2', suit: '♥', suitColor: 'red' }
    ],
    question: 'Tienes 4 picas (A♠ 10♠ K♠ 7♠). Te quedan 9 picas en la baraja (9 outs). El rival apuesto 30 fichas en un bote de 120. ¿Qué haces?',
    options: [
      { id: 'call', text: 'Igualar (Call) 30 fichas', correct: true, explanation: '¡Excelente! Tienes 9 outs x 4 ≈ 36% de completar color en el Turn/River. Solo debes pagar 30 para ganar 150 (Pot Odds geniales).' },
      { id: 'fold', text: 'Retirarse (Fold)', correct: false, explanation: 'Retirarse es un error grave aquí. Tienes casi un 36% de probabilidad de conseguir la mano ganadora.' },
      { id: 'raise', text: 'Ir de Farol con All-in', correct: false, explanation: 'Pagar (Call) es más seguro ya que tus pot odds te dan beneficio sin arriesgar todo tu stack.' }
    ]
  },
  {
    id: 'drill-3',
    category: 'Pre-flop Selection',
    title: 'Cartas Basura en Posición Temprana (UTG)',
    difficulty: 'Fácil',
    xp: 50,
    heroHand: [
      { rank: 7, rankLabel: '7', suit: '♥', suitColor: 'red' },
      { rank: 2, rankLabel: '2', suit: '♣', suitColor: 'green' }
    ],
    position: 'Bajo la Pistola (UTG)',
    pot: 15,
    toCall: 10,
    street: 'Pre-flop',
    community: [],
    question: 'Eres el primero en hablar (UTG) y tienes 7♥ 2♣. Es considerada estadísticamente la peor mano del poker. ¿Qué haces?',
    options: [
      { id: 'fold', text: 'Retirarse (Fold)', correct: true, explanation: '¡Perfecto! 7-2 no conectan en escalera, no son del mismo palo y son números bajos. Se tira siempre.' },
      { id: 'call', text: 'Ver la primera carta', correct: false, explanation: 'Entrar a jugar manos malas en primeras posiciones te hará perder muchas fichas a largo plazo.' },
      { id: 'raise', text: 'Farolear (Raise)', correct: false, explanation: 'Un farol desde la primera posición contra 5 jugadores raramente funciona.' }
    ]
  },
  {
    id: 'drill-4',
    category: 'Position & Value',
    title: 'Trio en el Flop',
    difficulty: 'Media',
    xp: 75,
    heroHand: [
      { rank: 8, rankLabel: '8', suit: '♣', suitColor: 'green' },
      { rank: 8, rankLabel: '8', suit: '♦', suitColor: 'blue' }
    ],
    position: 'Botón (BT)',
    pot: 80,
    toCall: 0,
    street: 'Flop',
    community: [
      { rank: 8, rankLabel: '8', suit: '♠', suitColor: 'black' },
      { rank: 11, rankLabel: 'J', suit: '♥', suitColor: 'red' },
      { rank: 3, rankLabel: '3', suit: '♦', suitColor: 'blue' }
    ],
    question: 'Con tu Pareja de 8s en mano y el 8♠ en el Flop, has hecho un Trio (Set). El rival pasa (Check). ¿Qué haces?',
    options: [
      { id: 'bet', text: 'Apostar 50 fichas para sacar valor', correct: true, explanation: '¡Muy bien! Tienes una mano fuertísima. Si el rival tiene una Jota u otra pareja, te pagará complacido.' },
      { id: 'check', text: 'Pasar (Check)', correct: false, explanation: 'Pasar le da una carta gratis al rival para que te supere o conecte escalera.' },
      { id: 'fold', text: 'Retirarse', correct: false, explanation: '¡Nunca te retires cuando tienes un Trio!' }
    ]
  }
];
