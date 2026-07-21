import React from 'react';

export default function PlayingCard({ card, faceDown = false, size = 'md', highlighted = false, className = '' }) {
  if (faceDown || !card) {
    const sizeClasses = {
      sm: 'w-8 h-12 text-xs',
      md: 'w-14 h-20 text-sm',
      lg: 'w-20 h-28 text-base',
      xl: 'w-24 h-36 text-lg'
    }[size];

    return (
      <div className={`relative ${sizeClasses} rounded-lg bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 border-2 border-indigo-400/40 shadow-lg flex items-center justify-center select-none ${className}`}>
        <div className="w-4/5 h-4/5 border border-indigo-400/30 rounded-md bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px] opacity-40"></div>
        <div className="absolute text-indigo-300/80 font-bold">♠</div>
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

  const sizeClasses = {
    sm: 'w-8 h-12 text-xs p-1',
    md: 'w-14 h-20 text-xs p-1.5',
    lg: 'w-20 h-28 text-sm p-2',
    xl: 'w-24 h-36 text-base p-2.5'
  }[size];

  return (
    <div
      className={`relative ${sizeClasses} ${colorStyles} rounded-lg border-2 shadow-md flex flex-col justify-between font-extrabold select-none transition-transform duration-200 hover:-translate-y-1 ${
        highlighted ? 'ring-4 ring-yellow-400 border-yellow-400 shadow-yellow-400/50 scale-105' : ''
      } ${className}`}
    >
      <div className="flex flex-col items-start leading-none">
        <span>{rankLabel}</span>
        <span className="text-base">{suit}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-80">
        {suit}
      </div>
      <div className="flex flex-col items-end leading-none rotate-180">
        <span>{rankLabel}</span>
        <span className="text-base">{suit}</span>
      </div>
    </div>
  );
}
