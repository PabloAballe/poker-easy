import React, { useEffect } from 'react';
import PlayingCard from '../common/PlayingCard.jsx';
import ActionControls from './ActionControls.jsx';
import CoachHUD from './CoachHUD.jsx';
import { sound } from '../../engine/sound.js';
import confetti from 'canvas-confetti';
import { processPlayerAction, startNewHand } from '../../engine/gameEngine.js';

export default function PokerTable({ gameState, setGameState, assistedMode, setAssistedMode, onHandComplete, onOpenGlossary }) {
  const { players, currentTurn, communityCards, pot, street, winnerNotice } = gameState;
  const activePlayer = players[currentTurn];
  const isHumanTurn = activePlayer && activePlayer.isHuman && street !== 'SHOWDOWN';

  // AI Turn Auto Processing
  useEffect(() => {
    if (street === 'SHOWDOWN' || !activePlayer || activePlayer.isHuman) return;

    const timer = setTimeout(() => {
      // AI simple decision
      const toCall = gameState.currentHighBet - activePlayer.currentBet;
      let action = 'CHECK';
      let raiseAmt = 0;

      if (toCall === 0) {
        if (Math.random() > 0.6) {
          action = 'RAISE';
          raiseAmt = Math.min(activePlayer.chips, gameState.minBet * 2);
        } else {
          action = 'CHECK';
        }
      } else {
        if (toCall > activePlayer.chips * 0.4 && Math.random() > 0.4) {
          action = 'FOLD';
        } else {
          action = 'CALL';
        }
      }

      const updated = processPlayerAction(gameState, action, raiseAmt);
      setGameState(updated);

      if (action === 'FOLD') sound.playFold();
      else if (action === 'RAISE' || action === 'CALL') sound.playChipBet();
      else sound.playCardDeal();
    }, 1100);

    return () => clearTimeout(timer);
  }, [currentTurn, street, gameState]);

  // Showdown confetti trigger if Hero wins
  useEffect(() => {
    if (street === 'SHOWDOWN') {
      const hero = players.find(p => p.isHuman);
      if (hero && hero.isWinner) {
        sound.playWin();
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      }
      if (onHandComplete) onHandComplete(gameState);
    }
  }, [street]);

  const handleAction = (type, val) => {
    const updated = processPlayerAction(gameState, type, val);
    setGameState(updated);
  };

  const handleNextHand = () => {
    const nextState = startNewHand(gameState);
    setGameState(nextState);
    sound.playCardDeal();
  };

  const heroPlayer = players.find(p => p.isHuman);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* AI Coach HUD */}
      {heroPlayer && (
        <CoachHUD
          heroHand={heroPlayer.cards}
          communityCards={communityCards}
          pot={pot}
          toCall={gameState.currentHighBet - heroPlayer.currentBet}
          activeOpponentsCount={players.filter(p => !p.folded && !p.isHuman).length}
          assistedMode={assistedMode}
          setAssistedMode={setAssistedMode}
          onOpenGlossary={onOpenGlossary}
        />
      )}

      {/* Oval Felt Table Container */}
      <div className="relative bg-emerald-950/90 border-[12px] border-amber-950/80 rounded-[120px] p-8 md:p-12 min-h-[480px] flex flex-col justify-between shadow-2xl shadow-emerald-950/80 overflow-hidden">
        {/* Felt Inner Texture Ring */}
        <div className="absolute inset-4 rounded-[100px] border-2 border-emerald-700/30 pointer-events-none"></div>

        {/* Center Community Cards & Pot */}
        <div className="relative z-10 my-auto text-center space-y-4">
          <div className="inline-block bg-slate-950/80 border border-amber-500/40 px-5 py-2 rounded-full shadow-lg">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Bote Total</span>
            <span className="text-2xl font-black text-white">{pot} 🪙</span>
          </div>

          {/* Community Cards */}
          <div className="flex justify-center items-center gap-2 min-h-[90px]">
            {[0, 1, 2, 3, 4].map((idx) => {
              const card = communityCards[idx];
              return (
                <div key={idx} className="transition-all duration-300">
                  {card ? (
                    <PlayingCard card={card} size="md" highlighted={true} />
                  ) : (
                    <PlayingCard faceDown={true} size="md" className="opacity-20" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Street Name Badge */}
          <div className="text-xs font-black tracking-widest text-emerald-400/80 uppercase">
            — {street} —
          </div>
        </div>

        {/* Players Seats Grid around the Table */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 relative z-10 mt-6">
          {players.map((player, idx) => {
            const isTurn = currentTurn === idx && street !== 'SHOWDOWN';
            const isHero = player.isHuman;

            return (
              <div
                key={player.id}
                className={`relative flex flex-col items-center p-3 rounded-2xl border transition-all ${
                  player.folded
                    ? 'opacity-40 bg-slate-900/40 border-slate-800'
                    : isTurn
                    ? 'bg-amber-500/20 border-amber-400 ring-4 ring-amber-400/40 shadow-lg shadow-amber-400/20 scale-105'
                    : player.isWinner
                    ? 'bg-emerald-500/30 border-emerald-400 ring-4 ring-emerald-400 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                {/* Dealer Button Badge */}
                {gameState.dealerIdx === idx && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-slate-900 shadow-md">
                    D
                  </span>
                )}

                {/* Avatar & Name */}
                <div className="text-2xl mb-1">{player.avatar}</div>
                <div className="text-xs font-black text-white truncate max-w-[80px]">{player.name}</div>
                <div className="text-[11px] font-bold text-amber-300">{player.chips} 🪙</div>

                {/* Action Chip Badge */}
                {player.lastAction && (
                  <span className="mt-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-950/90 text-slate-300 border border-slate-700">
                    {player.lastAction}
                  </span>
                )}

                {/* Cards Display */}
                <div className="flex gap-1 mt-2">
                  {player.cards.map((c, cIdx) => (
                    <div key={cIdx}>
                      {isHero || street === 'SHOWDOWN' ? (
                        <PlayingCard card={c} size="sm" />
                      ) : (
                        <PlayingCard faceDown={true} size="sm" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Hand Result Description on Showdown */}
                {street === 'SHOWDOWN' && player.handResultDesc && !player.folded && (
                  <div className="mt-1 text-[9px] font-extrabold text-amber-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-amber-500/30 text-center">
                    {player.handResultDesc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Showdown Winner Banner */}
      {street === 'SHOWDOWN' && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl flex items-center justify-between text-slate-950 font-black shadow-xl">
          <span>{winnerNotice}</span>
          <button
            onClick={handleNextHand}
            className="px-5 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-md"
          >
            Siguiente Mano →
          </button>
        </div>
      )}

      {/* Action Controls for Hero Turn */}
      <ActionControls
        gameState={gameState}
        onAction={handleAction}
        disabled={!isHumanTurn}
      />
    </div>
  );
}
