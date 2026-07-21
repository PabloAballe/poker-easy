import React from 'react';
import { BookOpen, Target, PlayCircle, BarChart3, Volume2, VolumeX, Award, HelpCircle } from 'lucide-react';
import { sound } from '../../engine/sound.js';

export default function Header({ activeTab, setActiveTab, xp = 0, soundMuted, setSoundMuted, onOpenGlossary }) {
  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  const toggleSound = () => {
    sound.muted = !soundMuted;
    setSoundMuted(!soundMuted);
    if (!soundMuted) sound.playChipBet();
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & XP Status */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('academy')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              ♠
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                Poker<span className="text-amber-400">Easy</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  Academy
                </span>
              </h1>
              <p className="text-xs text-slate-400">Aprende sin esfuerzo</p>
            </div>
          </div>

          {/* Gamification Level Chip */}
          <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-300">
                <span>Nivel {level}</span>
                <span className="text-slate-400">({xp} XP)</span>
              </div>
              <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden mt-0.5">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('academy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'academy'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Academia
          </button>

          <button
            onClick={() => setActiveTab('drills')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'drills'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            Entrenamiento
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'game'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 animate-pulse'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            Partida En Vivo
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'stats'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Estadísticas
          </button>

          {/* Diccionario de Conceptos Button */}
          <button
            onClick={() => onOpenGlossary && onOpenGlossary('equity')}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold transition-all ml-1"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Conceptos 💡
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto md:ml-1"
            title={soundMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
