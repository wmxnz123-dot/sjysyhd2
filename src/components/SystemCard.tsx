import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
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
      className="group rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition-all p-3.5 flex flex-col justify-between cursor-pointer shadow-2xs relative"
      id={`system-card-${system.id}`}
      title={`${system.name} - ${system.description}`}
    >
      {/* Header: Icon, System Full Name, Core Capability Tag */}
      <div>
        <div className="flex items-start gap-2.5 min-w-0 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5 shadow-2xs">
            <IconHelper name={system.iconName} className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug break-words">
              {system.name}
            </h4>
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                {system.coreCapability}
              </span>
            </div>
          </div>
        </div>

        {/* 2-line Description with readable typography */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {system.description}
        </p>
      </div>

      {/* Footer: Favorite (Bottom-Left) & Enter CTA (Bottom-Right) */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        {onToggleFavorite ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(system.id);
            }}
            className="p-1 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer rounded hover:bg-slate-100/70 -ml-1"
            title={isFavorite ? '取消收藏' : '收藏系统'}
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400 hover:text-amber-400'
              }`}
            />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>进入系统</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};




