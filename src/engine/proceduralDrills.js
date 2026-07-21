import { createDeck, shuffleDeck } from './deck.js';
import { evaluate7Cards } from './evaluator.js';
import { calculateEquity } from './equity.js';

const POSITIONS = ['Botón (BT)', 'Ciega Chica (SB)', 'Ciega Grande (BB)', 'Bajo la Pistola (UTG)', 'Corte (CO)'];
const STREETS = ['Pre-flop', 'Flop', 'Turn', 'River'];

export function generateInfiniteDrill() {
  const deck = shuffleDeck(createDeck());

  const heroHand = [deck[0], deck[1]];
  const streetIdx = Math.floor(Math.random() * 4);
  const street = STREETS[streetIdx];

  let community = [];
  if (street === 'Flop') community = [deck[2], deck[3], deck[4]];
  else if (street === 'Turn') community = [deck[2], deck[3], deck[4], deck[5]];
  else if (street === 'River') community = [deck[2], deck[3], deck[4], deck[5], deck[6]];

  const position = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  const pot = Math.floor(Math.random() * 15 + 3) * 10; // 30 to 180
  const toCall = Math.random() > 0.3 ? Math.floor(Math.random() * 6 + 2) * 5 : 0; // 0 to 40

  const { heroEquity } = calculateEquity(heroHand, community, 2, 300);
  const potOdds = toCall > 0 ? Math.round((toCall / (pot + toCall)) * 100) : 0;

  // Determine EV Optimal Action
  let correctId = 'CALL';
  let reasoning = '';

  if (toCall === 0) {
    if (heroEquity >= 60) {
      correctId = 'RAISE';
      reasoning = `Tienes una alta probabilidad de victoria (${heroEquity}%). Apostar o subir te permite construir el bote para ganar más fichas.`;
    } else {
      correctId = 'CHECK';
      reasoning = `Tu equity es del ${heroEquity}%. Pasar (Check) te permite ver gratis la siguiente carta sin arriesgar fichas.`;
    }
  } else {
    if (heroEquity >= potOdds + 8) {
      if (heroEquity > 75) {
        correctId = 'RAISE';
        reasoning = `¡Tienes una mano fuerte! Tu probabilidad de victoria (${heroEquity}%) supera con creces el costo del bote (${potOdds}%). Debes re-subir.`;
      } else {
        correctId = 'CALL';
        reasoning = `La matemática es favorable: pagar un ${potOdds}% del bote te da beneficios a largo plazo teniendo un ${heroEquity}% de probabilidad de ganar.`;
      }
    } else {
      correctId = 'FOLD';
      reasoning = `La apuesta es matemáticamente desfavorable: el rival pide un ${potOdds}% del bote pero tu probabilidad de victoria es de solo ${heroEquity}%. Lo correcto es retirarse.`;
    }
  }

  const options = [
    {
      id: 'FOLD',
      text: 'Retirarse (Fold)',
      correct: correctId === 'FOLD',
      explanation: correctId === 'FOLD' ? reasoning : `Retirarse aquí es un error. ${reasoning}`
    },
    {
      id: toCall === 0 ? 'CHECK' : 'CALL',
      text: toCall === 0 ? 'Pasar (Check)' : `Igualar ${toCall} 🪙 (Call)`,
      correct: correctId === 'CHECK' || correctId === 'CALL',
      explanation: (correctId === 'CHECK' || correctId === 'CALL') ? reasoning : `Esta acción no es óptima. ${reasoning}`
    },
    {
      id: 'RAISE',
      text: `Subir la apuesta (Raise)`,
      correct: correctId === 'RAISE',
      explanation: correctId === 'RAISE' ? reasoning : `Subir aquí arriesga demasiado. ${reasoning}`
    }
  ];

  let evalDesc = 'Mano de inicio';
  if (community.length >= 3) {
    const res = evaluate7Cards([...heroHand, ...community]);
    if (res) evalDesc = res.description;
  }

  return {
    id: `drill-gen-${Date.now()}-${Math.random()}`,
    category: `Módulo Práctico: ${street}`,
    title: `${evalDesc} en ${position}`,
    heroHand,
    position,
    pot,
    toCall,
    street,
    community,
    heroEquity,
    potOdds,
    question: `Estás en el ${position} durante el ${street}. El bote actual es de ${pot} 🪙 y ${toCall > 0 ? `tienes que pagar ${toCall} 🪙` : 'todos han pasado'}. ¿Cuál es la jugada matemáticamente correcta?`,
    options
  };
}
