import React, { useState, useEffect } from 'react';
import { sound } from '../../engine/sound.js';

export default function ActionControls({ gameState, onAction, disabled = false }) {
  const heroPlayer = gameState.players.find(p => p.isHuman);
  if (!heroPlayer || heroPlayer.folded) return null;

  const toCall = gameState.currentHighBet - heroPlayer.currentBet;
  const canCheck = toCall === 0;
  const minRaise = Math.max(gameState.minBet * 2, gameState.currentHighBet * 2);
  const maxRaise = heroPlayer.chips + heroPlayer.currentBet;

  const [raiseVal, setRaiseVal] = useState(minRaise);

  useEffect(() => {
    setRaiseVal(Math.min(maxRaise, Math.max(minRaise, gameState.currentHighBet * 2)));
  }, [gameState.currentHighBet, minRaise, maxRaise]);

  const handleAction = (type, val = 0) => {
    if (disabled) return;
    if (type === 'FOLD') sound.playFold();
    else if (type === 'RAISE' || type === 'CALL') sound.playChipBet();
    else sound.playCardDeal();

    onAction(type, val);
  };

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 space-y-2 transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Raise Slider & Quick Bets */}
      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
        <div className="flex items-center justify-between w-full sm:w-auto text-[11px] sm:text-xs">
          <span className="font-bold text-slate-400">Subir a:</span>
          <span className="font-black text-amber-400 min-w-[50px] text-right sm:text-left">{raiseVal} 🪙</span>
        </div>

        <input
          type="range"
          min={minRaise}
          max={maxRaise}
          step={10}
          value={raiseVal}
          onChange={(e) => setRaiseVal(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
        />

        <div className="flex gap-1 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setRaiseVal(minRaise)}
            className="flex-1 sm:flex-initial px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] sm:text-[11px] font-bold"
          >
            Min
          </button>
          <button
            onClick={() => setRaiseVal(Math.min(maxRaise, Math.round(gameState.pot * 0.5)))}
            className="flex-1 sm:flex-initial px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] sm:text-[11px] font-bold"
          >
            1/2 Pot
          </button>
          <button
            onClick={() => setRaiseVal(Math.min(maxRaise, gameState.pot))}
            className="flex-1 sm:flex-initial px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] sm:text-[11px] font-bold"
          >
            Pot
          </button>
          <button
            onClick={() => setRaiseVal(maxRaise)}
            className="flex-1 sm:flex-initial px-2 py-0.5 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 rounded text-[10px] sm:text-[11px] font-black"
          >
            All-in
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
        <button
          onClick={() => handleAction('FOLD')}
          className="py-2.5 px-1 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow text-[10px] sm:text-xs transition-all truncate"
        >
          Retirarse
        </button>

        {canCheck ? (
          <button
            onClick={() => handleAction('CHECK')}
            className="py-2.5 px-1 bg-slate-700 hover:bg-slate-600 text-white font-extrabold rounded-xl shadow text-[10px] sm:text-xs transition-all truncate"
          >
            Pasar
          </button>
        ) : (
          <button
            onClick={() => handleAction('CALL')}
            className="py-2.5 px-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow text-[10px] sm:text-xs transition-all truncate"
          >
            Igualar {toCall}🪙
          </button>
        )}

        <button
          onClick={() => handleAction('RAISE', raiseVal)}
          className="py-2.5 px-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl shadow text-[10px] sm:text-xs transition-all truncate"
        >
          Subir {raiseVal}🪙
        </button>
      </div>
    </div>
  );
}
