import React, { useState } from 'react';
import Header from './components/common/Header.jsx';
import AcademyMain from './components/academy/AcademyMain.jsx';
import DrillRunner from './components/drills/DrillRunner.jsx';
import PokerTable from './components/game/PokerTable.jsx';
import PerformanceStats from './components/stats/PerformanceStats.jsx';
import GlossaryModal from './components/common/GlossaryModal.jsx';
import { createInitialGameState, startNewHand } from './engine/gameEngine.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('academy');
  const [xp, setXp] = useState(40);
  const [soundMuted, setSoundMuted] = useState(false);
  const [assistedMode, setAssistedMode] = useState(true);

  // Active Glossary Term Modal Key (e.g. 'equity', 'potOdds', null)
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);

  // Live Poker Game State
  const [gameState, setGameState] = useState(() => {
    const init = createInitialGameState();
    return startNewHand(init);
  });

  // Statistics State
  const [stats, setStats] = useState({
    handsPlayed: 0,
    handsWon: 0,
    vpipCount: 0,
    pfrCount: 0,
    drillCorrect: 0,
    drillTotal: 0
  });

  const [handHistory, setHandHistory] = useState([]);

  const handleEarnXP = (amount) => {
    setXp(prev => prev + amount);
  };

  const handleRecordDrillAccuracy = (isCorrect) => {
    setStats(prev => ({
      ...prev,
      drillTotal: prev.drillTotal + 1,
      drillCorrect: isCorrect ? prev.drillCorrect + 1 : prev.drillCorrect
    }));
  };

  const handleHandComplete = (completedState) => {
    const hero = completedState.players.find(p => p.isHuman);
    if (!hero) return;

    setStats(prev => ({
      ...prev,
      handsPlayed: prev.handsPlayed + 1,
      handsWon: hero.isWinner ? prev.handsWon + 1 : prev.handsWon,
      vpipCount: hero.lastAction && hero.lastAction !== 'FOLD' ? prev.vpipCount + 1 : prev.vpipCount,
      pfrCount: hero.lastAction && hero.lastAction.includes('RAISE') ? prev.pfrCount + 1 : prev.pfrCount
    }));

    if (hero.isWinner) {
      setXp(prev => prev + 30);
    }

    setHandHistory(prev => [
      {
        heroWon: hero.isWinner,
        pot: completedState.pot,
        desc: completedState.winnerNotice || 'Mano finalizada'
      },
      ...prev.slice(0, 19)
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col antialiased">
      {/* Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        onOpenGlossary={(term) => setActiveGlossaryTerm(term || 'equity')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'academy' && (
          <AcademyMain
            onEarnXP={handleEarnXP}
            onOpenGlossary={(term) => setActiveGlossaryTerm(term)}
          />
        )}

        {activeTab === 'drills' && (
          <DrillRunner
            onEarnXP={handleEarnXP}
            onRecordAccuracy={handleRecordDrillAccuracy}
            onOpenGlossary={(term) => setActiveGlossaryTerm(term)}
          />
        )}

        {activeTab === 'game' && (
          <PokerTable
            gameState={gameState}
            setGameState={setGameState}
            assistedMode={assistedMode}
            setAssistedMode={setAssistedMode}
            onHandComplete={handleHandComplete}
            onOpenGlossary={(term) => setActiveGlossaryTerm(term)}
          />
        )}

        {activeTab === 'stats' && (
          <PerformanceStats
            stats={stats}
            handHistory={handHistory}
            onOpenGlossary={(term) => setActiveGlossaryTerm(term)}
          />
        )}
      </main>

      {/* Interactive Concept Glossary Modal */}
      {activeGlossaryTerm && (
        <GlossaryModal
          termKey={activeGlossaryTerm}
          onClose={() => setActiveGlossaryTerm(null)}
          onSelectTerm={(key) => setActiveGlossaryTerm(key)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-3">
        <span>Poker Easy Academy • Aprende sin esfuerzo</span>
        <button
          onClick={() => setActiveGlossaryTerm('equity')}
          className="text-amber-400 hover:underline font-bold"
        >
          Ver Diccionario de Conceptos 💡
        </button>
      </footer>
    </div>
  );
}
