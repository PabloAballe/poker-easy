// Texas Hold'em 7-Card Evaluator & Ranking Engine

export const HAND_TYPES = {
  ROYAL_FLUSH: { rank: 9, name: 'Escalera Real', desc: 'A-K-Q-J-10 del mismo palo' },
  STRAIGHT_FLUSH: { rank: 8, name: 'Escalera de Color', desc: '5 cartas consecutivas del mismo palo' },
  FOUR_OF_A_KIND: { rank: 7, name: 'Póker (4 iguales)', desc: '4 cartas del mismo valor' },
  FULL_HOUSE: { rank: 6, name: 'Full House', desc: 'Trio + Pareja' },
  FLUSH: { rank: 5, name: 'Color (Flush)', desc: '5 cartas del mismo palo' },
  STRAIGHT: { rank: 4, name: 'Escalera', desc: '5 cartas en orden consecutivo' },
  THREE_OF_A_KIND: { rank: 3, name: 'Trio', desc: '3 cartas del mismo valor' },
  TWO_PAIR: { rank: 2, name: 'Doble Pareja', desc: 'Dos parejas distintas' },
  ONE_PAIR: { rank: 1, name: 'Pareja', desc: '2 cartas del mismo valor' },
  HIGH_CARD: { rank: 0, name: 'Carta Alta', desc: 'Mano sin combinaciones' },
};

function rankToLabel(val) {
  if (val === 14) return 'As';
  if (val === 13) return 'Rey';
  if (val === 12) return 'Dama';
  if (val === 11) return 'Jota';
  return val.toString();
}

function getCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const head = arr[0];
  const tail = arr.slice(1);
  const withHead = getCombinations(tail, k - 1).map(c => [head, ...c]);
  const withoutHead = getCombinations(tail, k);
  return [...withHead, ...withoutHead];
}

export function evaluate5Cards(cards) {
  if (cards.length !== 5) return null;
  const sorted = [...cards].sort((a, b) => b.rank - a.rank);

  const ranks = sorted.map(c => c.rank);
  const suits = sorted.map(c => c.suit);

  const isFlush = suits.every(s => s === suits[0]);

  // Check straight
  let isStraight = false;
  let straightHigh = 0;

  if (
    ranks[0] - ranks[4] === 4 &&
    new Set(ranks).size === 5
  ) {
    isStraight = true;
    straightHigh = ranks[0];
  } else if (
    ranks[0] === 14 &&
    ranks[1] === 5 &&
    ranks[2] === 4 &&
    ranks[3] === 3 &&
    ranks[4] === 2
  ) {
    // Ace-low straight (A-2-3-4-5)
    isStraight = true;
    straightHigh = 5;
  }

  // Value counts
  const counts = {};
  for (const r of ranks) {
    counts[r] = (counts[r] || 0) + 1;
  }

  const countEntries = Object.entries(counts)
    .map(([r, cnt]) => ({ rank: Number(r), count: cnt }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);

  // Royal / Straight Flush
  if (isFlush && isStraight) {
    if (straightHigh === 14) {
      return {
        type: HAND_TYPES.ROYAL_FLUSH,
        score: 9000000,
        description: 'Escalera Real de ' + sorted[0].suit,
        best5: sorted
      };
    }
    return {
      type: HAND_TYPES.STRAIGHT_FLUSH,
      score: 8000000 + straightHigh,
      description: `Escalera de Color al ${rankToLabel(straightHigh)}`,
      best5: sorted
    };
  }

  // Four of a kind
  if (countEntries[0].count === 4) {
    const quadRank = countEntries[0].rank;
    const kicker = countEntries[1].rank;
    return {
      type: HAND_TYPES.FOUR_OF_A_KIND,
      score: 7000000 + quadRank * 15 + kicker,
      description: `Póker de ${rankToLabel(quadRank)}s`,
      best5: sorted
    };
  }

  // Full House
  if (countEntries[0].count === 3 && countEntries[1].count === 2) {
    const trioRank = countEntries[0].rank;
    const pairRank = countEntries[1].rank;
    return {
      type: HAND_TYPES.FULL_HOUSE,
      score: 6000000 + trioRank * 15 + pairRank,
      description: `Full House de ${rankToLabel(trioRank)}s y ${rankToLabel(pairRank)}s`,
      best5: sorted
    };
  }

  // Flush
  if (isFlush) {
    const score = 5000000 + ranks[0]*10000 + ranks[1]*1000 + ranks[2]*100 + ranks[3]*10 + ranks[4];
    return {
      type: HAND_TYPES.FLUSH,
      score,
      description: `Color de ${sorted[0].suit} al ${rankToLabel(ranks[0])}`,
      best5: sorted
    };
  }

  // Straight
  if (isStraight) {
    return {
      type: HAND_TYPES.STRAIGHT,
      score: 4000000 + straightHigh,
      description: `Escalera al ${rankToLabel(straightHigh)}`,
      best5: sorted
    };
  }

  // Three of a kind
  if (countEntries[0].count === 3) {
    const trioRank = countEntries[0].rank;
    const k1 = countEntries[1].rank;
    const k2 = countEntries[2].rank;
    return {
      type: HAND_TYPES.THREE_OF_A_KIND,
      score: 3000000 + trioRank * 300 + k1 * 15 + k2,
      description: `Trio de ${rankToLabel(trioRank)}s`,
      best5: sorted
    };
  }

  // Two Pair
  if (countEntries[0].count === 2 && countEntries[1].count === 2) {
    const p1 = countEntries[0].rank;
    const p2 = countEntries[1].rank;
    const kicker = countEntries[2].rank;
    return {
      type: HAND_TYPES.TWO_PAIR,
      score: 2000000 + p1 * 300 + p2 * 15 + kicker,
      description: `Doble Pareja de ${rankToLabel(p1)}s y ${rankToLabel(p2)}s`,
      best5: sorted
    };
  }

  // One Pair
  if (countEntries[0].count === 2) {
    const pRank = countEntries[0].rank;
    const k1 = countEntries[1].rank;
    const k2 = countEntries[2].rank;
    const k3 = countEntries[3].rank;
    return {
      type: HAND_TYPES.ONE_PAIR,
      score: 1000000 + pRank * 4000 + k1 * 200 + k2 * 10 + k3,
      description: `Pareja de ${rankToLabel(pRank)}s`,
      best5: sorted
    };
  }

  // High Card
  const score = ranks[0]*10000 + ranks[1]*1000 + ranks[2]*100 + ranks[3]*10 + ranks[4];
  return {
    type: HAND_TYPES.HIGH_CARD,
    score,
    description: `Carta Alta (${rankToLabel(ranks[0])})`,
    best5: sorted
  };
}

export function evaluate7Cards(allCards) {
  if (!allCards || allCards.length < 5) return null;
  if (allCards.length === 5) return evaluate5Cards(allCards);

  const combos = getCombinations(allCards, 5);
  let bestHand = null;

  for (const combo of combos) {
    const evalResult = evaluate5Cards(combo);
    if (!bestHand || evalResult.score > bestHand.score) {
      bestHand = evalResult;
    }
  }

  return bestHand;
}
