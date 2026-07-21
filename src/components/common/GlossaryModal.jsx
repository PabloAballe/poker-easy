import React from 'react';
import { POKER_GLOSSARY } from '../../data/glossaryData.js';
import { X, HelpCircle, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function GlossaryModal({ termKey, onClose, onSelectTerm }) {
  if (!termKey) return null;

  const currentTerm = POKER_GLOSSARY[termKey] || {
    title: termKey,
    short: 'Concepto clave de Texas Hold’em.',
    analogy: 'Definición didáctica en proceso.',
    example: ''
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-5 overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Glosario de Poker</span>
              <h3 className="text-xl font-black text-white">{currentTerm.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Short Definition */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-slate-200 text-sm font-medium leading-relaxed">
          {currentTerm.short}
        </div>

        {/* Real-World Analogy */}
        {currentTerm.analogy && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-xs text-amber-200 space-y-1">
            <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Ejemplo de la vida real (Analogía sencilla)</span>
            </div>
            <p className="leading-relaxed">{currentTerm.analogy}</p>
          </div>
        )}

        {/* Real Game Example */}
        {currentTerm.example && (
          <div className="bg-emerald-950/40 border border-emerald-800/40 p-4 rounded-2xl text-xs text-emerald-300 space-y-1">
            <div className="font-extrabold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ejemplo en una partida de poker</span>
            </div>
            <p className="leading-relaxed">{currentTerm.example}</p>
          </div>
        )}

        {/* Quick Term Switcher */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Otros términos clave:</div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {Object.entries(POKER_GLOSSARY).map(([key, t]) => (
              <button
                key={key}
                onClick={() => onSelectTerm && onSelectTerm(key)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  key === termKey
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {t.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
