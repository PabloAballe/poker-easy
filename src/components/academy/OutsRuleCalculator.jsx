import React, { useState } from 'react';
import { Brain, Calculator, Percent, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../engine/sound.js';

const QUICK_OUTS = [
  { name: 'Proyecto de Color (Flush Draw)', outs: 9, desc: 'Te faltan 9 cartas del mismo palo' },
  { name: 'Escalera Abierta (OESD)', outs: 8, desc: 'Te sirven 4 cartas por arriba y 4 por abajo' },
  { name: 'Escalera Interna (Gutshot)', outs: 4, desc: 'Te falta 1 carta específica en el medio' },
  { name: 'Dos Cartas Superiores (Overcards)', outs: 6, desc: '6 cartas para hacer la Pareja Más Alta' },
];

export default function OutsRuleCalculator() {
  const [outsCount, setOutsCount] = useState(9);

  const flopEquity = Math.min(100, outsCount * 4);
  const turnEquity = Math.min(100, outsCount * 2);

  return (
    <div className="space-y-6">
      {/* Intro Rule Box */}
      <div className="bg-gradient-to-br from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">La Regla de Oro del 4 y del 2</h2>
            <p className="text-xs text-blue-300">Aprende a calcular tus probabilidades de ganar sin usar calculadora</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs font-bold text-amber-400 mb-1">En el Flop (Faltan 2 cartas)</div>
            <div className="text-lg font-black text-white">Multiplica tus Outs × 4</div>
            <p className="text-xs text-slate-400 mt-1">
              Ejemplo: Si tienes 9 outs para hacer color → 9 × 4 = <strong>36% de probabilidad de ganar</strong>.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs font-bold text-emerald-400 mb-1">En el Turn (Falta 1 carta)</div>
            <div className="text-lg font-black text-white">Multiplica tus Outs × 2</div>
            <p className="text-xs text-slate-400 mt-1">
              Ejemplo: Si te quedan 9 outs en el Turn → 9 × 2 = <strong>18% de probabilidad de ganar</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            Calculadora Interactiva de Salidas (Outs)
          </h3>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            Mueve el deslizador
          </span>
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {QUICK_OUTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOutsCount(item.outs);
                sound.playChipBet();
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                outsCount === item.outs
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="text-xs font-bold">{item.name}</div>
              <div className="text-sm font-black text-white mt-1">{item.outs} Outs</div>
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200">
              Número de Outs elegidos: <span className="text-amber-400 font-extrabold text-lg">{outsCount}</span>
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={outsCount}
            onChange={(e) => setOutsCount(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Results Bar Visualizers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
              <span>PROBABILIDAD EN EL FLOP (x4)</span>
              <span className="text-amber-400 text-sm font-black">{flopEquity}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                style={{ width: `${flopEquity}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
              <span>PROBABILIDAD EN EL TURN (x2)</span>
              <span className="text-emerald-400 text-sm font-black">{turnEquity}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${turnEquity}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
