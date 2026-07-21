import React from 'react';
import { BarChart3, Trophy, Target, Award, Shield, History } from 'lucide-react';

export default function PerformanceStats({ stats, handHistory = [] }) {
  const { handsPlayed = 0, handsWon = 0, vpipCount = 0, pfrCount = 0, drillCorrect = 0, drillTotal = 0 } = stats;

  const winRate = handsPlayed > 0 ? Math.round((handsWon / handsPlayed) * 100) : 0;
  const vpip = handsPlayed > 0 ? Math.round((vpipCount / handsPlayed) * 100) : 0;
  const pfr = handsPlayed > 0 ? Math.round((pfrCount / handsPlayed) * 100) : 0;
  const accuracy = drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Title */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Panel de Rendimiento y Estadísticas</h2>
            <p className="text-xs text-slate-400">Analiza tus métricas clave de juego e historial</p>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Win Rate */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Win Rate (% Victorias)</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{winRate}%</div>
          <div className="text-xs text-slate-500">{handsWon} manos ganadas de {handsPlayed}</div>
        </div>

        {/* Training Accuracy */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Aciertos Entrenamiento</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{accuracy}%</div>
          <div className="text-xs text-slate-500">{drillCorrect} aciertos de {drillTotal} ejercicios</div>
        </div>

        {/* VPIP */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>VPIP (% Entra al Bote)</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{vpip}%</div>
          <div className="text-xs text-slate-500">Métrica de agresividad inicial</div>
        </div>

        {/* PFR */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>PFR (% Subida Pre-flop)</span>
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{pfr}%</div>
          <div className="text-xs text-slate-500">Frecuencia de re-subidas</div>
        </div>
      </div>

      {/* Hand History Log */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" />
          Registro de Manos Recientes
        </h3>

        {handHistory.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {handHistory.map((hand, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">Mano #{handHistory.length - idx}</div>
                  <div className="text-slate-400">{hand.desc}</div>
                </div>
                <span className={`font-black px-2.5 py-1 rounded-lg ${hand.heroWon ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {hand.heroWon ? `+${hand.pot} 🪙` : 'Retirado / Derrota'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950/40 border border-dashed border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
            Aún no has jugado manos en el simulador en vivo. Ve a "Partida En Vivo" para registrar partidas.
          </div>
        )}
      </div>
    </div>
  );
}
