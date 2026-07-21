import React, { useState } from 'react';
import { LESSON_CATEGORIES } from '../../data/lessonsData.js';
import HandRankingsVisualizer from './HandRankingsVisualizer.jsx';
import StreetSimulation from './StreetSimulation.jsx';
import OutsRuleCalculator from './OutsRuleCalculator.jsx';
import { Layers, PlayCircle, Brain } from 'lucide-react';
import { sound } from '../../engine/sound.js';

export default function AcademyMain({ onEarnXP, onOpenGlossary }) {
  const [activeCategory, setActiveCategory] = useState(LESSON_CATEGORIES[0]?.id || 'module-1');
  const [activeLessonId, setActiveLessonId] = useState('hand-rankings');

  const iconsMap = {
    Layers: <Layers className="w-5 h-5" />,
    PlayCircle: <PlayCircle className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />
  };

  const currentCategory = LESSON_CATEGORIES.find(c => c.id === activeCategory) || LESSON_CATEGORIES[0];

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LESSON_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.lessons && cat.lessons.length > 0) {
                  setActiveLessonId(cat.lessons[0].id);
                }
                sound.playChipBet();
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl bg-slate-800 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {iconsMap[cat.icon]}
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                  {cat.badge}
                </span>
              </div>
              <h3 className="font-extrabold text-white text-base">{cat.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Sub-lesson Tabs */}
      {currentCategory && currentCategory.lessons && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 flex items-center gap-2 overflow-x-auto">
          {currentCategory.lessons.map((lesson) => {
            const isCurrent = lesson.id === activeLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  sound.playCardDeal();
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lesson.title}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Lesson Component Render */}
      <div>
        {activeLessonId === 'hand-rankings' && <HandRankingsVisualizer onEarnXP={onEarnXP} onOpenGlossary={onOpenGlossary} />}
        {activeLessonId === 'hand-quiz-mini' && <HandRankingsVisualizer onEarnXP={onEarnXP} onOpenGlossary={onOpenGlossary} />}
        {activeLessonId === 'street-walkthrough' && <StreetSimulation onOpenGlossary={onOpenGlossary} />}
        {activeLessonId === 'rule-4-2' && <OutsRuleCalculator onOpenGlossary={onOpenGlossary} />}
      </div>
    </div>
  );
}
