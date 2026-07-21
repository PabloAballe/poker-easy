import React, { useState } from 'react';
import PlayingCard from '../common/PlayingCard.jsx';
import { ArrowRight, Play, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../../engine/sound.js';

const HAND_STREETS = [
  {
    step: 0,
    name: 'Pre-flop (Reparto de Manos)',
    badge: 'Fase 1',
    heroCards: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' }
    ],
    community: [],
    pot: 30,
    explanation: 'Antes de ver cartas comunes, las 2 Ciega (Pequeña y Grande) aportan sus apuestas obligatorias. Cada jugador recibe 2 cartas privadas cara abajo. Se realiza la 1ª ronda de apuestas.'
  },
  {
    step: 1,
    name: 'El Flop (3 Cartas Comunitarias)',
    badge: 'Fase 2',
    heroCards: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' }
    ],
    community: [
      { rank: 12, rankLabel: 'Q', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♥', suitColor: 'red' },
      { rank: 4, rankLabel: '4', suit: '♦', suitColor: 'blue' }
    ],
    pot: 90,
    explanation: 'El crupier saca 3 cartas comunitarias en el centro de la mesa (Flop). Con A♠ K♠ y Q♠ en mesa, ¡tienes un megaproyecto de Escalera Real y Proyecto de Color de Picas! Se realiza la 2ª ronda de apuestas.'
  },
  {
    step: 2,
    name: 'El Turn (4ª Carta Comunitaria)',
    badge: 'Fase 3',
    heroCards: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' }
    ],
    community: [
      { rank: 12, rankLabel: 'Q', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♥', suitColor: 'red' },
      { rank: 4, rankLabel: '4', suit: '♦', suitColor: 'blue' },
      { rank: 11, rankLabel: 'J', suit: '♠', suitColor: 'black' }
    ],
    pot: 240,
    explanation: 'Sale la 4ª carta (Turn). ¡La Jota de Picas J♠ completa tu Escalera Real de Picas! Es la mejor mano matemática e imbatible de todo el poker. Se realiza la 3ª ronda de apuestas.'
  },
  {
    step: 3,
    name: 'El River (5ª Carta) & Showdown',
    badge: 'Fase 4',
    heroCards: [
      { rank: 14, rankLabel: 'A', suit: '♠', suitColor: 'black' },
      { rank: 13, rankLabel: 'K', suit: '♠', suitColor: 'black' }
    ],
    community: [
      { rank: 12, rankLabel: 'Q', suit: '♠', suitColor: 'black' },
      { rank: 10, rankLabel: '10', suit: '♥', suitColor: 'red' },
      { rank: 4, rankLabel: '4', suit: '♦', suitColor: 'blue' },
      { rank: 11, rankLabel: 'J', suit: '♠', suitColor: 'black' },
      { rank: 2, rankLabel: '2', suit: '♣', suitColor: 'green' }
    ],
    pot: 600,
    explanation: 'Se destapa la 5ª y última carta (River). No hay más cartas por salir. Los jugadores muestran sus cartas (Showdown) y te llevas el bote total de 600 fichas.'
  }
];

export default function StreetSimulation() {
  const [currentStep, setCurrentStep] = useState(0);

  const currentData = HAND_STREETS[currentStep];

  const handleNext = () => {
    if (currentStep < HAND_STREETS.length - 1) {
      setCurrentStep(currentStep + 1);
      sound.playCardDeal();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      sound.playCardDeal();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    sound.playCardDeal();
  };

  return (
    <div className="space-y-6">
      {/* Simulation Board */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
              {currentData.badge}
            </span>
            <h2 className="text-xl font-black text-white">{currentData.name}</h2>
          </div>
          <div className="text-xs font-bold bg-slate-800 text-amber-300 px-3 py-1.5 rounded-full border border-slate-700">
            Bote acumulado: {currentData.pot} 🪙
          </div>
        </div>

        {/* Visual Cards Layout */}
        <div className="space-y-6">
          {/* Community Cards */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cartas Comunitarias en la Mesa ({currentData.community.length} / 5)
            </div>
            <div className="bg-emerald-950/80 border border-emerald-800/50 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-4 min-h-[140px] shadow-inner">
              {[0, 1, 2, 3, 4].map((idx) => {
                const card = currentData.community[idx];
                return (
                  <div key={idx} className="transition-all duration-300 transform">
                    {card ? <PlayingCard card={card} size="lg" highlighted={true} /> : <PlayingCard faceDown={true} size="lg" className="opacity-30" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Hole Cards */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400">Tus Cartas Privadas (Hero Hand)</div>
              <div className="text-xs text-slate-400">Tus 2 cartas secretas</div>
            </div>
            <div className="flex gap-2">
              {currentData.heroCards.map((c, i) => (
                <PlayingCard key={i} card={c} size="md" highlighted={true} />
              ))}
            </div>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="mt-6 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 text-slate-200 text-sm leading-relaxed flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{currentData.explanation}</span>
        </div>

        {/* Step Navigation Controls */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar Mano
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-all"
            >
              ← Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === HAND_STREETS.length - 1}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 shadow-md transition-all"
            >
              Siguiente Fase
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
