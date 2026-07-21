import React, { useState, useEffect } from 'react';
import { generateInfiniteDrill } from '../../engine/proceduralDrills.js';
import PlayingCard from '../common/PlayingCard.jsx';
import { Target, CheckCircle2, XCircle, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { sound } from '../../engine/sound.js';
import confetti from 'canvas-confetti';

export default function DrillRunner({ onEarnXP, onRecordAccuracy }) {
  const [currentDrill, setCurrentDrill] = useState(() => generateInfiniteDrill());
  const [selectedOption, setSelectedOption] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const handleSelectOption = (opt) => {
    if (selectedOption) return;
    setSelectedOption(opt);

    if (opt.correct) {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (onEarnXP) onEarnXP(50 + newStreak * 5);
      if (onRecordAccuracy) onRecordAccuracy(true);
    } else {
      sound.playWrong();
      setStreak(0);
      if (onRecordAccuracy) onRecordAccuracy(false);
    }
  };

  const handleNextDrill = () => {
    setSelectedOption(null);
    setCurrentDrill(generateInfiniteDrill());
    setTotalCompleted(prev => prev + 1);
    sound.playCardDeal();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Drill Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">
              Modo Infinito • Ejercicio #{totalCompleted + 1}
            </div>
            <h2 className="text-xl font-black text-white">{currentDrill.title}</h2>
          </div>
        </div>

        {/* Streak & Score Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
            <div className="text-xs">
              <div className="text-slate-400">Racha Imparable</div>
              <div className="font-extrabold text-white text-sm">{streak} aciertos</div>
            </div>
          </div>

          <button
            onClick={handleNextDrill}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Generar nueva mano aleatoria"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Scenario Desk */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Table Stats Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Posición: <strong className="text-amber-400">{currentDrill.position}</strong>
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Fase: <strong className="text-emerald-400">{currentDrill.street}</strong>
            </span>
          </div>

          <div className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Bote actual: {currentDrill.pot} 🪙 | Apuesta a pagar: {currentDrill.toCall} 🪙
          </div>
        </div>

        {/* Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hero Hand */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="text-xs font-bold text-amber-400">Tus Cartas (Hero)</div>
            <div className="flex gap-2">
              {currentDrill.heroHand.map((c, i) => (
                <PlayingCard key={i} card={c} size="md" highlighted={true} />
              ))}
            </div>
          </div>

          {/* Community Cards */}
          <div className="bg-emerald-950/60 border border-emerald-800/40 p-4 rounded-xl flex items-center justify-between">
            <div className="text-xs font-bold text-emerald-400">Cartas Comunitarias en Mesa</div>
            <div className="flex gap-1.5">
              {currentDrill.community.length > 0 ? (
                currentDrill.community.map((c, i) => <PlayingCard key={i} card={c} size="md" />)
              ) : (
                <span className="text-xs text-slate-500 italic">Pre-flop (Aún sin mesa)</span>
              )}
            </div>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-white font-extrabold text-base">
          {currentDrill.question}
        </div>

        {/* Options Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {currentDrill.options.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-200';

            if (selectedOption) {
              if (opt.correct) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={!!selectedOption}
                className={`w-full p-4 rounded-xl border font-bold text-sm text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {selectedOption && (
                  <div>
                    {opt.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      isSelected && <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {selectedOption && (
          <div
            className={`p-5 rounded-xl border text-sm leading-relaxed space-y-3 ${
              selectedOption.correct
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-base">
              {selectedOption.correct ? '¡Decisión Óptima!' : 'Decisión Subóptima'}
            </div>
            <p>{selectedOption.explanation}</p>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextDrill}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all"
              >
                Siguiente Mano Generada
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
