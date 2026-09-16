import React from 'react';
import { Star } from 'lucide-react';
import { SystemItem } from '../types';
import { IconHelper } from './IconHelper';

interface SystemCardProps {
  system: SystemItem;
  isFavorite?: boolean;
  onToggleFavorite?: (systemId: string) => void;
  onEnterSystem: (system: SystemItem) => void;
  compact?: boolean;
}

export const SystemCard: React.FC<SystemCardProps> = ({
  system,
  isFavorite = false,
  onToggleFavorite,
  onEnterSystem
}) => {
  return (
    <div
      onClick={() => onEnterSystem(system)}
      className="group relative bg-white hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-indigo-50/20 border border-slate-200/90 hover:border-blue-400 rounded-xl px-3.5 py-3.5 sm:py-4 flex items-center justify-between gap-2.5 transition-all duration-150 hover:shadow-xs hover:-translate-y-0.5 cursor-pointer shadow-2xs min-h-[66px] sm:min-h-[70px]"
      id={`system-card-${system.id}`}
      title={`进入系统：${system.name} · ${system.coreCapability}`}
    >
      {/* Left: App Icon & System Quick Information */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Shortcut App Icon */}
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105">
          <IconHelper name={system.iconName} className="w-4.5 h-4.5" />
        </div>

        {/* System Name and Capability Badge */}
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate leading-tight">
            {system.name}
          </h4>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 group-hover:text-blue-700 bg-slate-100 group-hover:bg-blue-50 px-1.5 py-0.5 rounded font-medium truncate max-w-[140px] sm:max-w-[170px] transition-colors">
              {system.coreCapability}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Favorite Toggle */}
      {onToggleFavorite && (
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(system.id);
            }}
            className="p-1 rounded-md text-slate-300 hover:text-amber-500 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isFavorite ? '取消常用收藏' : '添加至常用系统'}
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-300 hover:text-amber-400'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};





