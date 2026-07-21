import React, { useState } from 'react';
import { BookOpen, Target, PlayCircle, BarChart3, Volume2, VolumeX, Award, HelpCircle, MoreVertical, X, Sparkles } from 'lucide-react';
import { sound } from '../../engine/sound.js';

export default function Header({ activeTab, setActiveTab, xp = 0, soundMuted, setSoundMuted, onOpenGlossary }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  const toggleSound = () => {
    sound.muted = !soundMuted;
    setSoundMuted(!soundMuted);
    if (!soundMuted) sound.playChipBet();
  };

  const navItems = [
    { id: 'academy', label: 'Academia', desc: 'Reglas y teoría explicada', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'drills', label: 'Entrenamiento', desc: 'Ejercicios infinitos con EV', icon: <Target className="w-5 h-5" /> },
    { id: 'game', label: 'Partida En Vivo', desc: 'Simulador 6-Max con Coach AI', icon: <PlayCircle className="w-5 h-5" />, highlight: true },
    { id: 'stats', label: 'Estadísticas', desc: 'VPIP, PFR y Winrate', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileDrawerOpen(false);
    sound.playChipBet();
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-3 py-2.5 sm:px-4 sm:py-3 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handleNavClick('academy')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs sm:text-base shadow-md shadow-amber-500/20 shrink-0">
              ♠
            </div>
            <div className="leading-tight">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1">
                Poker<span className="text-amber-400">Easy</span>
              </h1>
              <p className="text-[10px] text-slate-400 hidden xs:block">Aprende sin esfuerzo</p>
            </div>
          </div>

          {/* Desktop Navigation (Visible on md: screens and above) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
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
            {/* Level XP Chip */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1.5 rounded-full border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-300 leading-none">
                  <span>Niv.{level}</span>
                  <span className="text-slate-400 text-[9px]">({xp}XP)</span>
                </div>
                <div className="w-12 sm:w-16 bg-slate-700 h-1 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Desktop Concept Button */}
            <button
              onClick={() => onOpenGlossary && onOpenGlossary('equity')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold transition-all"
              title="Diccionario de Conceptos"
            >
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Conceptos 💡</span>
            </button>

            {/* Desktop Sound Button */}
            <button
              onClick={toggleSound}
              className="hidden sm:block p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={soundMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Mobile 3-Dots / Hamburger Menu Toggle Button (Visible on mobile < md) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-all flex items-center justify-center"
              aria-label="Abrir Menú"
            >
              <MoreVertical className="w-5 h-5 text-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Navigation Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setMobileDrawerOpen(false)}
          ></div>

          {/* Drawer Content Panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between shadow-2xl z-10 animate-slideLeft">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-xs">
                    ♠
                  </div>
                  <div>
                    <h3 className="font-black text-white text-sm">Menú de Navegación</h3>
                    <p className="text-[10px] text-slate-400">Poker Easy Academy</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Secciones Principales</div>
                {navItems.map((item) => {
                  const isCurrent = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isCurrent ? 'bg-slate-950/30' : 'bg-slate-800 text-amber-400'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className={`text-[10px] ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>{item.desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Utility Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Herramientas de Ayuda</div>

                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (onOpenGlossary) onOpenGlossary('equity');
                  }}
                  className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-left text-xs font-bold flex items-center gap-2.5"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Diccionario de Conceptos 💡</span>
                </button>

                <button
                  onClick={toggleSound}
                  className="w-full p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 text-left text-xs font-bold flex items-center gap-2.5"
                >
                  {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  <span>{soundMuted ? 'Activar Sonido' : 'Sonido Activado'}</span>
                </button>
              </div>
            </div>

            {/* Footer level status inside drawer */}
            <div className="pt-4 border-t border-slate-800 text-center">
              <div className="text-xs text-amber-400 font-black">Nivel {level} • {xp} XP</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Aprende poker de forma sencilla</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
