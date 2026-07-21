// Deck & Card Utility functions for Texas Hold'em

export const SUITS = [
  { symbol: '♠', name: 'spades', color: 'black', label: 'Picas' },
  { symbol: '♥', name: 'hearts', color: 'red', label: 'Corazones' },
  { symbol: '♦', name: 'diamonds', color: 'blue', label: 'Diamantes' }, // Using vibrant blue/red 4-color deck style for clarity
  { symbol: '♣', name: 'clubs', color: 'green', label: 'Tréboles' },
];

export const RANKS = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: 'J' },
  { value: 12, label: 'Q' },
  { value: 13, label: 'K' },
  { value: 14, label: 'A' },
];

export function createDeck() {
  const deck = [];
  let id = 0;
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `card-${id++}`,
        suit: suit.symbol,
        suitName: suit.name,
        suitColor: suit.color,
        rank: rank.value,
        rankLabel: rank.label,
        code: `${rank.label}${suit.symbol}`
      });
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export function formatCard(card) {
  if (!card) return '??';
  return `${card.rankLabel}${card.suit}`;
}
