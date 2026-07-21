import React from 'react';
import { Info } from 'lucide-react';

export default function PokerTerm({ term, children, onClickTerm, className = '' }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClickTerm) onClickTerm(term);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 decoration-dashed underline-offset-4 cursor-pointer px-1 rounded hover:bg-amber-400/10 transition-colors ${className}`}
      title="Haz clic para ver la explicación sencilla de este concepto"
    >
      <span>{children || term}</span>
      <Info className="w-3.5 h-3.5 text-amber-400 opacity-80 shrink-0" />
    </button>
  );
}
