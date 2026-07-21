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

  const navItems = [
    { id: 'academy', label: 'Academia', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'drills', label: 'Entrenar', icon: <Target className="w-4 h-4" /> },
    { id: 'game', label: 'En Vivo', icon: <PlayCircle className="w-4 h-4" />, highlight: true },
    { id: 'stats', label: 'Stats', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-3 py-2 sm:px-4 sm:py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setActiveTab('academy')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs sm:text-base shadow-md shadow-amber-500/20 shrink-0">
              ♠
            </div>
            <div className="leading-tight">
              <h1 className="text-sm sm:text-lg font-black tracking-tight text-white flex items-center gap-1">
                Poker<span className="text-amber-400">Easy</span>
              </h1>
              <p className="text-[9px] sm:text-xs text-slate-400 hidden xs:block">Aprende fácil</p>
            </div>
          </div>

          {/* Center Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Status Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* XP Level Chip */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-300">
                  <span>Niv.{level}</span>
                  <span className="text-slate-400 text-[9px]">({xp}XP)</span>
                </div>
                <div className="w-10 sm:w-16 bg-slate-700 h-1 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Concept Glossary Trigger */}
            <button
              onClick={() => onOpenGlossary && onOpenGlossary('equity')}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1"
              title="Diccionario de Conceptos"
            >
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Conceptos 💡</span>
            </button>

            {/* Sound Mute/Unmute */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={soundMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Mobile Bottom Navigation Bar (Visible only on Mobile screens < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 shadow-2xl flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                sound.playChipBet();
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
