import React, { useEffect } from 'react';
import PlayingCard from '../common/PlayingCard.jsx';
import ActionControls from './ActionControls.jsx';
import CoachHUD from './CoachHUD.jsx';
import LiveLeaderboard from './LiveLeaderboard.jsx';
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
    <div className="space-y-3 sm:space-y-4 max-w-7xl mx-auto w-full overflow-hidden">
      {/* AI Coach HUD (Compact Top Bar) */}
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

      {/* Main Grid: Left = Table & Controls, Right = Real-Time Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3 sm:gap-4 items-start w-full overflow-hidden">
        {/* Left Column: Poker Felt Table */}
        <div className="space-y-3 w-full overflow-hidden">
          {/* Oval Felt Table Container */}
          <div className="relative bg-emerald-950/90 border-[4px] sm:border-[8px] border-amber-950/80 rounded-[32px] sm:rounded-[80px] p-2 sm:p-6 min-h-[300px] sm:min-h-[380px] flex flex-col justify-between shadow-xl shadow-emerald-950/80 overflow-hidden w-full">
            {/* Felt Inner Texture Ring */}
            <div className="absolute inset-1.5 sm:inset-3 rounded-[24px] sm:rounded-[60px] border border-emerald-700/30 pointer-events-none"></div>

            {/* Center Community Cards & Pot */}
            <div className="relative z-10 my-auto text-center space-y-1.5 sm:space-y-2">
              <div className="inline-block bg-slate-950/85 border border-amber-500/40 px-2.5 py-0.5 sm:px-4 sm:py-1 rounded-full shadow-md">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-widest block leading-none">Bote Total</span>
                <span className="text-base sm:text-xl font-black text-white">{pot} 🪙</span>
              </div>

              {/* Community Cards */}
              <div className="flex justify-center items-center gap-1 sm:gap-1.5 min-h-[55px] sm:min-h-[75px]">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const card = communityCards[idx];
                  return (
                    <div key={idx} className="transition-all duration-300">
                      {card ? (
                        <PlayingCard card={card} size="xs" className="sm:hidden" highlighted={true} />
                      ) : (
                        <PlayingCard faceDown={true} size="xs" className="sm:hidden opacity-20" />
                      )}
                      {card ? (
                        <PlayingCard card={card} size="sm" className="hidden sm:block" highlighted={true} />
                      ) : (
                        <PlayingCard faceDown={true} size="sm" className="hidden sm:block opacity-20" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Street Name Badge */}
              <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-emerald-400/80 uppercase">
                — {street} —
              </div>
            </div>

            {/* Players Seats Grid around the Table */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2 relative z-10 mt-2 sm:mt-3 w-full">
              {players.map((player, idx) => {
                const isTurn = currentTurn === idx && street !== 'SHOWDOWN';
                const isHero = player.isHuman;

                return (
                  <div
                    key={player.id}
                    className={`relative flex flex-col items-center p-1 sm:p-2 rounded-lg sm:rounded-xl border transition-all overflow-hidden ${
                      player.folded
                        ? 'opacity-40 bg-slate-900/40 border-slate-800'
                        : isTurn
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg scale-105'
                        : player.isWinner
                        ? 'bg-emerald-500/30 border-emerald-400 ring-2 ring-emerald-400 shadow-lg'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    {/* Dealer Button Badge */}
                    {gameState.dealerIdx === idx && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-yellow-400 text-slate-950 font-black text-[8px] sm:text-[10px] flex items-center justify-center border border-slate-900 shadow-md">
                        D
                      </span>
                    )}

                    {/* Avatar & Name */}
                    <div className="text-sm sm:text-xl leading-none">{player.avatar}</div>
                    <div className="text-[9px] sm:text-[11px] font-black text-white truncate max-w-[45px] sm:max-w-[70px] mt-0.5 leading-tight">{player.name}</div>
                    <div className="text-[8px] sm:text-[10px] font-bold text-amber-300">{player.chips} 🪙</div>

                    {/* Action Chip Badge */}
                    {player.lastAction && (
                      <span className="mt-0.5 text-[7px] sm:text-[9px] font-black px-1 py-0.2 rounded bg-slate-950/90 text-slate-300 border border-slate-700 truncate max-w-[45px] leading-none">
                        {player.lastAction}
                      </span>
                    )}

                    {/* Cards Display */}
                    <div className="flex gap-0.5 mt-0.5 sm:mt-1">
                      {player.cards.map((c, cIdx) => (
                        <div key={cIdx}>
                          {isHero || street === 'SHOWDOWN' ? (
                            <>
                              <PlayingCard card={c} size="xs" className="sm:hidden" />
                              <PlayingCard card={c} size="sm" className="hidden sm:block" />
                            </>
                          ) : (
                            <>
                              <PlayingCard faceDown={true} size="xs" className="sm:hidden" />
                              <PlayingCard faceDown={true} size="sm" className="hidden sm:block" />
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Hand Result Description on Showdown */}
                    {street === 'SHOWDOWN' && player.handResultDesc && !player.folded && (
                      <div className="mt-0.5 text-[7px] sm:text-[8px] font-extrabold text-amber-300 bg-slate-950/90 px-0.5 py-0.2 rounded border border-amber-500/30 text-center leading-tight truncate max-w-[50px]">
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
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 sm:p-3 rounded-xl flex items-center justify-between text-slate-950 font-black shadow-lg text-xs">
              <span className="truncate mr-2">{winnerNotice}</span>
              <button
                onClick={handleNextHand}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-all shadow shrink-0"
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

        {/* Right Column: Real-Time Live Chip Leaderboard */}
        <div className="w-full">
          <LiveLeaderboard players={players} />
        </div>
      </div>
    </div>
  );
}
