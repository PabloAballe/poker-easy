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
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5 sm:gap-3">
        {/* Top Row: Brand & Level Status & Audio */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('academy')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm sm:text-base shadow-md shadow-amber-500/20 shrink-0">
              ♠
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                Poker<span className="text-amber-400">Easy</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">Aprende sin esfuerzo</p>
            </div>
          </div>

          {/* XP Level & Controls Right */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Level Chip */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="text-[11px] sm:text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-300">
                  <span>Niv. {level}</span>
                  <span className="text-slate-400 text-[10px]">({xp} XP)</span>
                </div>
                <div className="w-14 sm:w-20 bg-slate-700 h-1 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Dictionary Concept Button */}
            <button
              onClick={() => onOpenGlossary && onOpenGlossary('equity')}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              title="Diccionario de Conceptos"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Conceptos 💡</span>
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={soundMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Bottom Navigation Pills (Scrollable on Mobile) */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none w-full border-t border-slate-800/60 pt-2">
          <button
            onClick={() => setActiveTab('academy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'academy'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Academia
          </button>

          <button
            onClick={() => setActiveTab('drills')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'drills'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Entrenamiento
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'game'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Partida En Vivo
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'stats'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Estadísticas
          </button>
        </nav>
      </div>
    </header>
  );
}
