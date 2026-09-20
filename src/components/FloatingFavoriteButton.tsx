import React from 'react';
import { Star, ChevronLeft } from 'lucide-react';

interface FloatingFavoriteButtonProps {
  favoriteCount: number;
  onClick: () => void;
}

export const FloatingFavoriteButton: React.FC<FloatingFavoriteButtonProps> = ({
  favoriteCount,
  onClick
}) => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 pl-3.5 pr-2.5 py-3 rounded-l-2xl bg-gradient-to-l from-slate-900 to-slate-800 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border-y border-l border-white/20 group-hover:-translate-x-1"
        id="floating-favorite-btn"
        title="查看常用业务系统快捷抽屉"
      >
        <div className="relative">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white font-mono font-bold text-[9px] flex items-center justify-center ring-2 ring-slate-900">
              {favoriteCount}
            </span>
          )}
        </div>

        {/* 竖向文字或紧凑文字 */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-bold tracking-wide">常用系统</span>
          <span className="text-[10px] text-slate-300 group-hover:text-blue-200">
            快捷抽屉
          </span>
        </div>

        <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
