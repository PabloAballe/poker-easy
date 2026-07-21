import React from 'react';
import { Sparkles, ShieldCheck, EyeOff } from 'lucide-react';
import { generateCoachAdvice } from '../../engine/gameEngine.js';
import PokerTerm from '../common/PokerTerm.jsx';

export default function CoachHUD({ heroHand, communityCards, pot, toCall, activeOpponentsCount, assistedMode, setAssistedMode, onOpenGlossary }) {
  if (!assistedMode) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-slate-400 text-xs font-bold">
          <EyeOff className="w-4 h-4 text-slate-500" />
          <span>Modo Asistido Desactivado (Juego Libre Pro)</span>
        </div>
        <button
          onClick={() => setAssistedMode(true)}
          className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all"
        >
          Activar Coach HUD 💡
        </button>
      </div>
    );
  }

  const advice = generateCoachAdvice(heroHand, communityCards, pot, toCall, activeOpponentsCount);

  if (!advice) return null;

  const { equity, potOdds, recommendedAction, reasoning } = advice;

  const actionColors = {
    RAISE: 'bg-emerald-500 text-slate-950',
    CALL: 'bg-blue-500 text-white',
    CHECK: 'bg-slate-700 text-white',
    FOLD: 'bg-rose-500 text-white'
  }[recommendedAction];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-amber-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden space-y-4">
      {/* Top HUD Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-sm font-black text-white tracking-wide uppercase">AI Coach HUD (Asistencia en Vivo)</h3>
        </div>
        <button
          onClick={() => setAssistedMode(false)}
          className="text-xs text-slate-400 hover:text-white underline"
        >
          Ocultar Coach
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Equity Win Meter */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <PokerTerm term="equity" onClickTerm={onOpenGlossary}>Probabilidad (Equity)</PokerTerm>
            <span className="text-amber-400 font-extrabold">{equity}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
              style={{ width: `${equity}%` }}
            ></div>
          </div>
        </div>

        {/* Pot Odds */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <PokerTerm term="potOdds" onClickTerm={onOpenGlossary}>Precio (Pot Odds)</PokerTerm>
            <span className="text-blue-400 font-extrabold">{potOdds}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-300"
              style={{ width: `${potOdds}%` }}
            ></div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="col-span-2 md:col-span-1 bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400">Acción Recomendada:</span>
          <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider shadow-sm ${actionColors}`}>
            {recommendedAction}
          </span>
        </div>
      </div>

      {/* Reasoning Advice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200 font-medium leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>{reasoning}</span>
      </div>
    </div>
  );
}
