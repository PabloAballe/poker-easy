import React, { useState } from 'react';
import { HAND_RANKINGS_LIST } from '../../data/lessonsData.js';
import PlayingCard from '../common/PlayingCard.jsx';
import { CheckCircle2, XCircle, Trophy, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { sound } from '../../engine/sound.js';
import confetti from 'canvas-confetti';

export default function HandRankingsVisualizer({ onEarnXP }) {
  const [selectedHandRank, setSelectedHandRank] = useState(10);

  // Mini quiz state inside the ranking module
  const [quizState, setQuizState] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const selectedHand = HAND_RANKINGS_LIST.find(h => h.rank === selectedHandRank);

  const startMiniQuiz = () => {
    // Pick 2 random distinct hands
    const idx1 = Math.floor(Math.random() * HAND_RANKINGS_LIST.length);
    let idx2 = Math.floor(Math.random() * HAND_RANKINGS_LIST.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * HAND_RANKINGS_LIST.length);
    }

    const handA = HAND_RANKINGS_LIST[idx1];
    const handB = HAND_RANKINGS_LIST[idx2];
    const winner = handA.rank > handB.rank ? 'A' : 'B';

    setQuizState({ handA, handB, winner });
    setFeedback(null);
  };

  const handlePickHand = (choice) => {
    if (!quizState || feedback) return;

    if (choice === quizState.winner) {
      sound.playCorrect();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setFeedback({
        isCorrect: true,
        message: `¡Correcto! ${choice === 'A' ? quizState.handA.name : quizState.handB.name} gana a ${choice === 'A' ? quizState.handB.name : quizState.handA.name}. (+20 XP)`
      });
      if (onEarnXP) onEarnXP(20);
    } else {
      sound.playWrong();
      setFeedback({
        isCorrect: false,
        message: `Incorrecto. ${quizState.winner === 'A' ? quizState.handA.name : quizState.handB.name} es una combinación superior.`
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Hand Selector List */}
      <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">
          Jerarquía de Manos (10 - 1)
        </h3>
        <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
          {HAND_RANKINGS_LIST.map((hand) => {
            const isSelected = hand.rank === selectedHandRank;
            return (
              <button
                key={hand.rank}
                onClick={() => {
                  setSelectedHandRank(hand.rank);
                  sound.playCardDeal();
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {hand.rank}
                  </span>
                  <span>{hand.name}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visualizer & Cards View */}
      <div className="lg:col-span-8 space-y-6">
        {/* Card Showcase Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
            <div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Fuerza #{selectedHand.rank} de 10
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{selectedHand.name}</h2>
            </div>
            <Trophy className="w-8 h-8 text-amber-400 opacity-80" />
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedHand.desc}</p>

          {/* Cards Display */}
          <div className="bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-6 flex flex-wrap items-center justify-center gap-3 min-h-[140px] shadow-inner">
            {selectedHand.example.map((card, idx) => (
              <PlayingCard key={idx} card={card} size="lg" highlighted={true} />
            ))}
          </div>
        </div>

        {/* Gamified Comparison Trainer Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Desafío Rápido: ¿Cuál Mano Gana?
              </h3>
              <p className="text-xs text-slate-400">Gana +20 XP eligiendo la mano más fuerte en 1 clic</p>
            </div>
            {!quizState && (
              <button
                onClick={startMiniQuiz}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all"
              >
                Comenzar Desafío
              </button>
            )}
          </div>

          {quizState ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A */}
                <button
                  onClick={() => handlePickHand('A')}
                  disabled={!!feedback}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 p-4 rounded-xl text-left transition-all group cursor-pointer disabled:opacity-80"
                >
                  <div className="text-xs font-bold text-amber-400 mb-2">Opción A</div>
                  <div className="font-bold text-white mb-3">{quizState.handA.name}</div>
                  <div className="flex gap-1.5 justify-center bg-slate-900/60 p-2 rounded-lg">
                    {quizState.handA.example.map((c, i) => (
                      <PlayingCard key={i} card={c} size="sm" />
                    ))}
                  </div>
                </button>

                {/* Option B */}
                <button
                  onClick={() => handlePickHand('B')}
                  disabled={!!feedback}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 p-4 rounded-xl text-left transition-all group cursor-pointer disabled:opacity-80"
                >
                  <div className="text-xs font-bold text-amber-400 mb-2">Opción B</div>
                  <div className="font-bold text-white mb-3">{quizState.handB.name}</div>
                  <div className="flex gap-1.5 justify-center bg-slate-900/60 p-2 rounded-lg">
                    {quizState.handB.example.map((c, i) => (
                      <PlayingCard key={i} card={c} size="sm" />
                    ))}
                  </div>
                </button>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl flex items-center justify-between gap-3 text-sm font-bold ${
                    feedback.isCorrect ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
                    <span>{feedback.message}</span>
                  </div>
                  <button
                    onClick={startMiniQuiz}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs"
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-950/50 border border-dashed border-slate-800 rounded-xl p-6 text-center text-slate-500 text-xs">
              Haz clic en "Comenzar Desafío" para poner a prueba tus reflejos visuales.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
