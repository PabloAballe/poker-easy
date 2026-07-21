import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { generateCoachAdvice } from '../../engine/gameEngine.js';
import PokerTerm from '../common/PokerTerm.jsx';

export default function CoachHUD({ heroHand, communityCards, pot, toCall, activeOpponentsCount, assistedMode, setAssistedMode, onOpenGlossary }) {
  const [expandedReasoning, setExpandedReasoning] = useState(false);

  if (!assistedMode) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
          <EyeOff className="w-4 h-4 text-slate-500" />
          <span>Modo Asistido Desactivado</span>
        </div>
        <button
          onClick={() => setAssistedMode(true)}
          className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-xs font-bold transition-all"
        >
          Activar HUD 💡
        </button>
      </div>
    );
  }

  const advice = generateCoachAdvice(heroHand, communityCards, pot, toCall, activeOpponentsCount);
  if (!advice) return null;

  const { equity, potOdds, recommendedAction, reasoning } = advice;

  const actionColors = {
    RAISE: 'bg-emerald-500 text-slate-950 font-black',
    CALL: 'bg-blue-500 text-white font-extrabold',
    CHECK: 'bg-slate-700 text-white font-bold',
    FOLD: 'bg-rose-500 text-white font-bold'
  }[recommendedAction];

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 shadow-lg space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Title & Toggle */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-black text-white uppercase tracking-wider">Coach AI</span>
        </div>

        {/* Compact Key Metrics */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <PokerTerm term="equity" onClickTerm={onOpenGlossary} className="text-slate-400 text-[11px]">Victoria:</PokerTerm>
            <span className="text-amber-400 font-black">{equity}%</span>
          </div>

          <div className="flex items-center gap-1">
            <PokerTerm term="potOdds" onClickTerm={onOpenGlossary} className="text-slate-400 text-[11px]">Precio:</PokerTerm>
            <span className="text-blue-400 font-black">{potOdds}%</span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <span className="text-slate-400 text-[11px]">Sugerencia:</span>
            <span className={`px-2 py-0.5 rounded text-[11px] uppercase tracking-wide ${actionColors}`}>
              {recommendedAction}
            </span>
          </div>
        </div>

        {/* Expand Reason Button */}
        <button
          onClick={() => setExpandedReasoning(!expandedReasoning)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          title="Ver por qué"
        >
          {expandedReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Reasoning */}
      {expandedReasoning && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-200 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{reasoning}</span>
        </div>
      )}
    </div>
  );
}
