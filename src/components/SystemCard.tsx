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
  isBaseFoundation?: boolean;
}

export const SystemCard: React.FC<SystemCardProps> = ({
  system,
  isFavorite = false,
  onToggleFavorite,
  onEnterSystem,
  isBaseFoundation = false
}) => {
  return (
    <div
      onClick={() => onEnterSystem(system)}
      className={`group relative rounded-xl px-4 py-3.5 sm:py-4 flex items-center justify-between gap-2.5 transition-all duration-150 hover:-translate-y-0.5 cursor-pointer shadow-xs min-h-[68px] sm:min-h-[72px] ${
        isBaseFoundation
          ? 'bg-[#0f244a] hover:bg-[#132d5c] border border-blue-800/80 hover:border-blue-600 text-white shadow-md shadow-blue-950/20'
          : 'bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 border border-slate-200/90 hover:border-blue-400 text-slate-800 hover:shadow-xs'
      }`}
      id={`system-card-${system.id}`}
      title={`进入系统：${system.name} · ${system.coreCapability}${isBaseFoundation ? '（核心底座）' : ''}`}
    >
      {/* Left: App Icon & System Quick Information */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Shortcut App Icon */}
        <div
          className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 ${
            isBaseFoundation
              ? 'bg-blue-600 text-white group-hover:bg-blue-500'
              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
          }`}
        >
          <IconHelper name={system.iconName} className="w-4.5 h-4.5" />
        </div>

        {/* System Name and Capability Badge */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              className={`text-xs sm:text-[13px] font-bold transition-colors truncate leading-tight ${
                isBaseFoundation ? 'text-white group-hover:text-blue-200' : 'text-slate-800 group-hover:text-blue-600'
              }`}
            >
              {system.name}
            </h4>
            {isBaseFoundation && (
              <span className="shrink-0 px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                核心底座
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate max-w-[170px] sm:max-w-[200px] transition-colors ${
                isBaseFoundation
                  ? 'text-blue-200/90 bg-blue-950/60 border border-blue-800/60'
                  : 'text-slate-500 group-hover:text-blue-700 bg-slate-100 group-hover:bg-blue-50'
              }`}
            >
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
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              isBaseFoundation
                ? 'text-blue-300/60 hover:text-amber-400 hover:bg-white/10'
                : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
            }`}
            title={isFavorite ? '取消常用收藏' : '添加至常用系统'}
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorite ? 'fill-amber-400 text-amber-400' : isBaseFoundation ? 'text-blue-300/60 hover:text-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};





