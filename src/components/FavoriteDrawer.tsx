import React, { useEffect } from 'react';
import {
  Star,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Trash2
} from 'lucide-react';
import { SystemItem } from '../types';
import { IconHelper } from './IconHelper';

interface FavoriteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteSystems: SystemItem[];
  onToggleFavorite: (systemId: string) => void;
  onEnterSystem: (system: SystemItem) => void;
  onExploreAllSystems: () => void;
}

export const FavoriteDrawer: React.FC<FavoriteDrawerProps> = ({
  isOpen,
  onClose,
  favoriteSystems,
  onToggleFavorite,
  onEnterSystem,
  onExploreAllSystems
}) => {
  // ESC 键关闭抽屉
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 遮罩层 (半透明毛玻璃) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        {/* 抽屉主容器 */}
        <div className="w-screen max-w-md bg-white shadow-2xl pointer-events-auto flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
          {/* 1. 抽屉 Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-50 via-blue-50/20 to-amber-50/20 border-b border-slate-200/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-2xs border border-amber-200/60">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    我的常用系统
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    {favoriteSystems.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">高频业务直达 · 随时随地快捷呼出</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="关闭抽屉 (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. 抽屉内容列表区 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {favoriteSystems.length > 0 ? (
              favoriteSystems.map(system => (
                <div
                  key={system.id}
                  onClick={() => {
                    onEnterSystem(system);
                    onClose();
                  }}
                  className="group relative bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-400 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all duration-150 hover:shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* 图标 */}
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105">
                      <IconHelper name={system.iconName} className="w-5 h-5" />
                    </div>

                    {/* 信息 */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                          {system.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 bg-slate-100 group-hover:bg-blue-50 px-1.5 py-0.2 rounded font-medium truncate">
                          {system.coreCapability}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {system.stageName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 右侧动作 */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(system.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      title="移出常用系统"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 stroke-1 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">
                  暂未收藏常用业务系统
                </h4>
                <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed mb-4">
                  在主页面的全链路系统矩阵中，点击任意系统卡片右侧的星标，即可固定到此处。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreAllSystems();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-colors cursor-pointer"
                >
                  去浏览全链路系统矩阵
                </button>
              </div>
            )}
          </div>

          {/* 3. 抽屉底部提示与快捷前往全部系统 */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
              <span>共纳管 16 套业务系统</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreAllSystems();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>浏览全部 16 套系统</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[11px] text-slate-400 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
              💡 提示：点击任意系统右侧的垃圾桶图标即可取消收藏，或在主页面点击星标重新添加。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
