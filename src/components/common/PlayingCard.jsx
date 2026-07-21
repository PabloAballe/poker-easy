import React from 'react';

export default function PlayingCard({ card, faceDown = false, size = 'md', highlighted = false, className = '' }) {
  const sizeConfig = {
    sm: {
      box: 'w-9 h-13 text-[10px] p-0.5 border',
      cornerRank: 'text-[11px] font-black leading-none',
      cornerSuit: 'text-[9px] leading-none',
      centerSuit: 'text-sm'
    },
    md: {
      box: 'w-13 h-19 text-xs p-1 border-2',
      cornerRank: 'text-xs font-black leading-none',
      cornerSuit: 'text-[10px] leading-none',
      centerSuit: 'text-xl'
    },
    lg: {
      box: 'w-20 h-28 text-sm p-1.5 border-2',
      cornerRank: 'text-sm font-black leading-none',
      cornerSuit: 'text-xs leading-none',
      centerSuit: 'text-3xl'
    },
    xl: {
      box: 'w-24 h-36 text-base p-2 border-2',
      cornerRank: 'text-base font-black leading-none',
      cornerSuit: 'text-sm leading-none',
      centerSuit: 'text-4xl'
    }
  }[size] || sizeConfig?.md;

  if (faceDown || !card) {
    return (
      <div className={`relative ${sizeConfig.box} rounded-lg bg-gradient-to-br from-indigo-800 via-slate-900 to-indigo-950 border-indigo-400/40 shadow-md flex items-center justify-center select-none ${className}`}>
        <div className="w-4/5 h-4/5 border border-indigo-400/30 rounded bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] opacity-40"></div>
        <div className="absolute text-indigo-300/80 font-bold text-xs">♠</div>
      </div>
    );
  }

  const { rankLabel, suit, suitColor } = card;

  const colorStyles = {
    black: 'text-slate-900 border-slate-300 bg-white',
    red: 'text-rose-600 border-rose-200 bg-white',
    blue: 'text-blue-600 border-blue-200 bg-white',
    green: 'text-emerald-600 border-emerald-200 bg-white'
  }[suitColor || 'black'];

  return (
    <div
      className={`relative ${sizeConfig.box} ${colorStyles} rounded-lg shadow-md flex flex-col justify-between font-extrabold select-none overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        highlighted ? 'ring-2 ring-yellow-400 border-yellow-400 shadow-yellow-400/50 scale-105 z-10' : ''
      } ${className}`}
    >
      {/* Top Left Corner */}
      <div className="flex flex-col items-center leading-tight">
        <span className={sizeConfig.cornerRank}>{rankLabel}</span>
        <span className={sizeConfig.cornerSuit}>{suit}</span>
      </div>

      {/* Center Suit Icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeConfig.centerSuit} opacity-90 font-normal leading-none pointer-events-none`}>
        {suit}
      </div>

      {/* Bottom Right Corner */}
      <div className="flex flex-col items-center leading-tight rotate-180">
        <span className={sizeConfig.cornerRank}>{rankLabel}</span>
        <span className={sizeConfig.cornerSuit}>{suit}</span>
      </div>
    </div>
  );
}
