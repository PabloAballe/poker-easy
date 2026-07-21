import { createDeck, shuffleDeck } from './deck.js';
import { evaluate7Cards } from './evaluator.js';

export function calculateEquity(heroHand, communityCards, numOpponents = 1, iterations = 350) {
  if (!heroHand || heroHand.length < 2) return { heroEquity: 50, tiePercent: 0, winPercent: 50 };

  const knownCardsStr = new Set([
    ...heroHand.map(c => c.code),
    ...communityCards.map(c => c.code)
  ]);

  const fullDeck = createDeck();
  const availableDeck = fullDeck.filter(c => !knownCardsStr.has(c.code));

  let wins = 0;
  let ties = 0;
  const cardsNeededCommunity = 5 - communityCards.length;

  for (let i = 0; i < iterations; i++) {
    const shuffled = shuffleDeck(availableDeck);
    let cardIdx = 0;

    // Deal remaining community cards
    const simCommunity = [...communityCards];
    for (let c = 0; c < cardsNeededCommunity; c++) {
      simCommunity.push(shuffled[cardIdx++]);
    }

    // Deal opponents
    const simOpponents = [];
    for (let o = 0; o < numOpponents; o++) {
      simOpponents.push([shuffled[cardIdx++], shuffled[cardIdx++]]);
    }

    // Evaluate Hero
    const heroEval = evaluate7Cards([...heroHand, ...simCommunity]);

    // Evaluate Opponents
    let maxOpponentScore = -1;
    for (const oppHand of simOpponents) {
      const oppEval = evaluate7Cards([...oppHand, ...simCommunity]);
      if (oppEval && oppEval.score > maxOpponentScore) {
        maxOpponentScore = oppEval.score;
      }
    }

    if (heroEval.score > maxOpponentScore) {
      wins++;
    } else if (heroEval.score === maxOpponentScore) {
      ties++;
    }
  }

  const winPercent = Math.round((wins / iterations) * 100);
  const tiePercent = Math.round((ties / iterations) * 100);
  const heroEquity = Math.min(99, Math.max(1, winPercent + Math.round(tiePercent / 2)));

  return { heroEquity, winPercent, tiePercent };
}
