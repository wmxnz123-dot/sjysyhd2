import React from 'react';
import { Star } from 'lucide-react';
import { SystemItem } from '../types';
import { SystemCard } from './SystemCard';

interface FavoriteSectionProps {
  favoriteSystems: SystemItem[];
  onToggleFavorite: (systemId: string) => void;
  onEnterSystem: (system: SystemItem) => void;
}

export const FavoriteSection: React.FC<FavoriteSectionProps> = ({
  favoriteSystems,
  onToggleFavorite,
  onEnterSystem
}) => {
  return (
    <section id="favorite-section" className="mb-6 scroll-mt-20">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>我收藏的系统</span>
              <span className="text-[11px] px-2 py-0.2 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                {favoriteSystems.length} 套
              </span>
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            高频业务系统便捷直达 · 点击系统右上角星标即可添加或取消
          </span>
        </div>

        {/* System Cards Grid */}
        {favoriteSystems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {favoriteSystems.map(system => (
              <SystemCard
                key={system.id}
                system={system}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onEnterSystem={onEnterSystem}
              />
            ))}
          </div>
        ) : (
          <div className="py-7 px-4 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Star className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
            <p className="text-xs font-semibold text-slate-700">暂无收藏的系统</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              点击下方全链路中任意系统卡片右上角的星标，即可快速收藏至此处
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
