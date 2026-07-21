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
    <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Raise Slider & Quick Bets */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400">Subir a:</span>
          <span className="text-sm font-black text-amber-400 min-w-[70px]">{raiseVal} 🪙</span>
        </div>

        <input
          type="range"
          min={minRaise}
          max={maxRaise}
          step={10}
          value={raiseVal}
          onChange={(e) => setRaiseVal(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />

        <div className="flex gap-1.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setRaiseVal(minRaise)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
          >
            Min
          </button>
          <button
            onClick={() => setRaiseVal(Math.min(maxRaise, Math.round(gameState.pot * 0.5)))}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
          >
            1/2 Pot
          </button>
          <button
            onClick={() => setRaiseVal(Math.min(maxRaise, gameState.pot))}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
          >
            Pot
          </button>
          <button
            onClick={() => setRaiseVal(maxRaise)}
            className="px-2.5 py-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-xs font-black"
          >
            All-in
          </button>
        </div>
      </div>

      {/* Primary Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleAction('FOLD')}
          className="py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-lg shadow-rose-600/20 text-sm transition-all"
        >
          Retirarse (Fold)
        </button>

        {canCheck ? (
          <button
            onClick={() => handleAction('CHECK')}
            className="py-3 bg-slate-700 hover:bg-slate-600 text-white font-extrabold rounded-xl shadow-lg text-sm transition-all"
          >
            Pasar (Check)
          </button>
        ) : (
          <button
            onClick={() => handleAction('CALL')}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/20 text-sm transition-all"
          >
            Igualar {toCall} 🪙
          </button>
        )}

        <button
          onClick={() => handleAction('RAISE', raiseVal)}
          className="py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all"
        >
          Subir a {raiseVal} 🪙
        </button>
      </div>
    </div>
  );
}
