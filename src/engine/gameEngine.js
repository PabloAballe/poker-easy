import { createDeck, shuffleDeck } from './deck.js';
import { evaluate7Cards } from './evaluator.js';
import { calculateEquity } from './equity.js';

export const BOT_PERSONALITIES = [
  { id: 'hero', name: 'Tú (Hero)', avatar: '👤', style: 'Hero', isHuman: true },
  { id: 'bot-1', name: 'Carlos "La Roca"', avatar: '🗿', style: 'Tight-Passive', desc: 'Juega solo las mejores manos' },
  { id: 'bot-2', name: 'Sofía "Don Farol"', avatar: '🔥', style: 'Aggressive', desc: 'Le encanta apostar fuerte y presionar' },
  { id: 'bot-3', name: 'Mateo "El Sabio"', avatar: '🧙‍♂️', style: 'Balanced', desc: 'Juega con matemática de pot odds' },
  { id: 'bot-4', name: 'Lucía "La Amistosa"', avatar: '🐱', style: 'Calling-Station', desc: 'Le gusta ver todas las cartas' },
  { id: 'bot-5', name: 'Pedro "El Novato"', avatar: '🎲', style: 'Wild', desc: 'Impredecible e impulsivo' },
];

export function createInitialGameState() {
  const players = BOT_PERSONALITIES.map((bot, idx) => ({
    id: bot.id,
    name: bot.name,
    avatar: bot.avatar,
    style: bot.style,
    desc: bot.desc,
    isHuman: bot.isHuman,
    chips: 1000,
    currentBet: 0,
    cards: [],
    folded: false,
    isAllIn: false,
    positionName: getPositionName(idx, 0, BOT_PERSONALITIES.length),
    lastAction: null,
    isWinner: false,
    handResultDesc: ''
  }));

  return {
    players,
    dealerIdx: 0,
    currentTurn: 1,
    pot: 0,
    communityCards: [],
    street: 'PREFLOP', // PREFLOP, FLOP, TURN, RIVER, SHOWDOWN
    minBet: 20,
    currentHighBet: 20,
    deck: [],
    smallBlind: 10,
    bigBlind: 20,
    handHistory: [],
    winnerNotice: null
  };
}

function getPositionName(playerIdx, dealerIdx, totalPlayers) {
  const relative = (playerIdx - dealerIdx + totalPlayers) % totalPlayers;
  if (relative === 0) return 'Botón (BT)';
  if (relative === 1) return 'Ciega Pequeña (SB)';
  if (relative === 2) return 'Ciega Grande (BB)';
  if (relative === 3) return 'UTG';
  if (relative === 4) return 'MP';
  return 'CO';
}

export function startNewHand(state) {
  const deck = shuffleDeck(createDeck());
  let deckIdx = 0;

  const nextDealer = (state.dealerIdx + 1) % state.players.length;
  const sbIdx = (nextDealer + 1) % state.players.length;
  const bbIdx = (nextDealer + 2) % state.players.length;

  const players = state.players.map((p, idx) => {
    // Top up if busted
    const chips = p.chips <= 0 ? 1000 : p.chips;
    let bet = 0;

    if (idx === sbIdx) bet = Math.min(chips, state.smallBlind);
    if (idx === bbIdx) bet = Math.min(chips, state.bigBlind);

    return {
      ...p,
      chips: chips - bet,
      currentBet: bet,
      cards: [deck[deckIdx++], deck[deckIdx++]],
      folded: false,
      isAllIn: chips <= bet,
      positionName: getPositionName(idx, nextDealer, state.players.length),
      lastAction: bet > 0 ? (idx === sbIdx ? 'SB (10)' : 'BB (20)') : null,
      isWinner: false,
      handResultDesc: ''
    };
  });

  const pot = players.reduce((sum, p) => sum + p.currentBet, 0);

  // UTG acts first pre-flop
  const utgIdx = (bbIdx + 1) % players.length;

  return {
    ...state,
    deck: deck.slice(deckIdx),
    players,
    dealerIdx: nextDealer,
    currentTurn: utgIdx,
    pot,
    communityCards: [],
    street: 'PREFLOP',
    currentHighBet: state.bigBlind,
    winnerNotice: null
  };
}

export function processPlayerAction(state, actionType, raiseAmount = 0) {
  const activeIdx = state.currentTurn;
  const player = state.players[activeIdx];
  if (!player || player.folded) return state;

  let newPlayers = [...state.players];
  let newPot = state.pot;
  let newHighBet = state.currentHighBet;
  let actionText = '';

  if (actionType === 'FOLD') {
    newPlayers[activeIdx] = { ...player, folded: true, lastAction: 'FOLD' };
    actionText = 'Retirado (Fold)';
  } else if (actionType === 'CHECK') {
    newPlayers[activeIdx] = { ...player, lastAction: 'CHECK' };
    actionText = 'Pasa (Check)';
  } else if (actionType === 'CALL') {
    const amountNeeded = newHighBet - player.currentBet;
    const actualPay = Math.min(player.chips, amountNeeded);
    newPlayers[activeIdx] = {
      ...player,
      chips: player.chips - actualPay,
      currentBet: player.currentBet + actualPay,
      isAllIn: player.chips - actualPay === 0,
      lastAction: `CALL (${player.currentBet + actualPay})`
    };
    newPot += actualPay;
    actionText = `Iguala (${actualPay})`;
  } else if (actionType === 'RAISE') {
    const targetBet = raiseAmount;
    const additionalCost = targetBet - player.currentBet;
    const actualPay = Math.min(player.chips, additionalCost);
    newHighBet = player.currentBet + actualPay;
    newPlayers[activeIdx] = {
      ...player,
      chips: player.chips - actualPay,
      currentBet: player.currentBet + actualPay,
      isAllIn: player.chips - actualPay === 0,
      lastAction: `RAISE (${newHighBet})`
    };
    newPot += actualPay;
    actionText = `Subirá a ${newHighBet}`;
  }

  // Check if hand ends by folds (only 1 player remains)
  const activePlayers = newPlayers.filter(p => !p.folded);
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    const winnerIdx = newPlayers.findIndex(p => p.id === winner.id);
    newPlayers[winnerIdx] = {
      ...newPlayers[winnerIdx],
      chips: newPlayers[winnerIdx].chips + newPot,
      isWinner: true,
      handResultDesc: 'Gana por retiro de todos los rivales'
    };
    return {
      ...state,
      players: newPlayers,
      pot: newPot,
      street: 'SHOWDOWN',
      winnerNotice: `${winner.name} gana el bote de ${newPot} fichas!`
    };
  }

  // Check if betting round complete
  const isRoundComplete = checkRoundCompletion(newPlayers, newHighBet);

  if (isRoundComplete) {
    return advanceStreet({ ...state, players: newPlayers, pot: newPot, currentHighBet: newHighBet });
  }

  // Advance turn to next active player
  let nextIdx = (activeIdx + 1) % newPlayers.length;
  while (newPlayers[nextIdx].folded || newPlayers[nextIdx].isAllIn) {
    nextIdx = (nextIdx + 1) % newPlayers.length;
    if (nextIdx === activeIdx) break;
  }

  return {
    ...state,
    players: newPlayers,
    pot: newPot,
    currentHighBet: newHighBet,
    currentTurn: nextIdx
  };
}

function checkRoundCompletion(players, highBet) {
  const activePlayers = players.filter(p => !p.folded && !p.isAllIn);
  if (activePlayers.length <= 1) return true;
  return activePlayers.every(p => p.currentBet === highBet && p.lastAction !== null);
}

function advanceStreet(state) {
  const resetPlayers = state.players.map(p => ({ ...p, currentBet: 0, lastAction: null }));
  let deck = [...state.deck];
  let community = [...state.communityCards];

  if (state.street === 'PREFLOP') {
    // Deal Flop (3 cards)
    community.push(deck.pop(), deck.pop(), deck.pop());
    return getNextStreetState(state, resetPlayers, community, 'FLOP', deck);
  } else if (state.street === 'FLOP') {
    // Deal Turn (1 card)
    community.push(deck.pop());
    return getNextStreetState(state, resetPlayers, community, 'TURN', deck);
  } else if (state.street === 'TURN') {
    // Deal River (1 card)
    community.push(deck.pop());
    return getNextStreetState(state, resetPlayers, community, 'RIVER', deck);
  } else if (state.street === 'RIVER') {
    // Go to Showdown
    return resolveShowdown({ ...state, players: resetPlayers, communityCards: community });
  }

  return state;
}

function getNextStreetState(state, players, community, nextStreet, deck) {
  // Post-flop, first active player after Dealer acts first
  let nextTurn = (state.dealerIdx + 1) % players.length;
  while (players[nextTurn].folded || players[nextTurn].isAllIn) {
    nextTurn = (nextTurn + 1) % players.length;
  }

  return {
    ...state,
    players,
    communityCards: community,
    deck,
    street: nextStreet,
    currentHighBet: 0,
    currentTurn: nextTurn
  };
}

function resolveShowdown(state) {
  const activePlayers = state.players.filter(p => !p.folded);
  let bestScore = -1;
  let winners = [];

  const evaluatedPlayers = state.players.map(p => {
    if (p.folded) return p;
    const handEval = evaluate7Cards([...p.cards, ...state.communityCards]);
    if (handEval.score > bestScore) {
      bestScore = handEval.score;
      winners = [p.id];
    } else if (handEval.score === bestScore) {
      winners.push(p.id);
    }
    return {
      ...p,
      handResultDesc: handEval.description
    };
  });

  const splitPot = Math.floor(state.pot / winners.length);

  const finalPlayers = evaluatedPlayers.map(p => {
    if (winners.includes(p.id)) {
      return {
        ...p,
        chips: p.chips + splitPot,
        isWinner: true
      };
    }
    return p;
  });

  const winnerNames = finalPlayers.filter(p => p.isWinner).map(p => p.name).join(', ');

  return {
    ...state,
    players: finalPlayers,
    street: 'SHOWDOWN',
    winnerNotice: `¡Ganador: ${winnerNames} con el bote de ${state.pot} fichas!`
  };
}

export function generateCoachAdvice(heroHand, communityCards, pot, toCall, activeOpponentsCount) {
  if (!heroHand || heroHand.length < 2) return null;

  const { heroEquity } = calculateEquity(heroHand, communityCards, activeOpponentsCount);
  const potOdds = toCall > 0 ? Math.round((toCall / (pot + toCall)) * 100) : 0;

  let recommendedAction = 'CHECK';
  let reasoning = '';

  if (toCall === 0) {
    if (heroEquity > 65) {
      recommendedAction = 'RAISE';
      reasoning = `Tienes un ${heroEquity}% de probabilidad de ganar. Apuesta fuerte para sacar valor.`;
    } else {
      recommendedAction = 'CHECK';
      reasoning = `Tu probabilidad de victoria es del ${heroEquity}%. Pasar (Check) es gratis y seguro.`;
    }
  } else {
    if (heroEquity >= potOdds + 10) {
      if (heroEquity > 75) {
        recommendedAction = 'RAISE';
        reasoning = `¡Mano monstruo! (${heroEquity}% victoria vs ${potOdds}% precio). Re-sube sin miedo.`;
      } else {
        recommendedAction = 'CALL';
        reasoning = `Tus odds son rentables: Pagas un ${potOdds}% del bote teniendo un ${heroEquity}% de ganar.`;
      }
    } else {
      recommendedAction = 'FOLD';
      reasoning = `La apuesta es muy cara (${potOdds}% precio) para tu probabilidad de victoria (${heroEquity}%). Es mejor retirarse.`;
    }
  }

  return {
    equity: heroEquity,
    potOdds,
    recommendedAction,
    reasoning
  };
}
