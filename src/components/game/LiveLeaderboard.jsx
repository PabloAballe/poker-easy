import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Users } from 'lucide-react';

export default function LiveLeaderboard({ players }) {
  // Sort players by chip count descending
  const sortedPlayers = [...players].sort((a, b) => b.chips - a.chips);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Ranking en Vivo</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <Users className="w-3 h-3" />
          6 Jugadores
        </span>
      </div>

      <div className="space-y-1.5">
        {sortedPlayers.map((player, rankIdx) => {
          const rankNum = rankIdx + 1;
          const isHero = player.isHuman;
          const diff = player.chips - 1000;
          const isProfit = diff >= 0;

          const rankBadgeStyle = {
            1: 'bg-amber-400 text-slate-950 font-black',
            2: 'bg-slate-300 text-slate-950 font-extrabold',
            3: 'bg-amber-700 text-amber-100 font-extrabold'
          }[rankNum] || 'bg-slate-800 text-slate-400 font-bold';

          return (
            <div
              key={player.id}
              className={`p-2 rounded-xl border flex items-center justify-between transition-all text-xs ${
                isHero
                  ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${rankBadgeStyle}`}>
                  {rankNum}º
                </span>
                <span className="text-sm shrink-0">{player.avatar}</span>
                <div className="truncate min-w-0">
                  <div className={`font-bold truncate ${isHero ? 'text-amber-300 font-black' : 'text-slate-200'}`}>
                    {player.name} {isHero && '(Tú)'}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-extrabold text-white text-xs">{player.chips} 🪙</div>
                <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isProfit ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  <span>{isProfit ? `+${diff}` : diff}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
