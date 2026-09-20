import React, { useState } from 'react';
import {
  Layers,
  ChevronRight,
  RotateCcw,
  Check,
  Search,
  Grid,
  Filter,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LifecycleStage, LifecycleStageId, SystemItem } from '../types';
import { SystemCard } from './SystemCard';

interface LifecycleFlowSectionProps {
  stages: LifecycleStage[];
  favoriteSystemIds: string[];
  onToggleFavorite: (systemId: string) => void;
  onEnterSystem: (system: SystemItem) => void;
  searchFilter?: string;
}

export const LifecycleFlowSection: React.FC<LifecycleFlowSectionProps> = ({
  stages,
  favoriteSystemIds,
  onToggleFavorite,
  onEnterSystem,
  searchFilter = ''
}) => {
  const [selectedStageId, setSelectedStageId] = useState<LifecycleStageId | 'all'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveQuery = (searchFilter || localSearch).trim().toLowerCase();

  const getFilteredStageSystems = (stage: LifecycleStage) => {
    if (!effectiveQuery) return stage.systems;
    return stage.systems.filter(
      s =>
        s.name.toLowerCase().includes(effectiveQuery) ||
        s.coreCapability.toLowerCase().includes(effectiveQuery) ||
        s.capabilityTags.some(t => t.toLowerCase().includes(effectiveQuery)) ||
        s.description.toLowerCase().includes(effectiveQuery)
    );
  };

  const totalSystemsCount = stages.reduce((acc, st) => acc + st.systems.length, 0);
  const selectedStage = stages.find(s => s.id === selectedStageId);

  const displayedSystems =
    selectedStageId === 'all'
      ? stages.flatMap(st => getFilteredStageSystems(st))
      : selectedStage
      ? getFilteredStageSystems(selectedStage)
      : [];

  return (
    <section id="lifecycle-section" className="mb-6 scroll-mt-20">
      {/* 模块顶部标题栏与导览说明 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Grid className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              集约协同业务系统快捷入口矩阵
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              5 大链路阶段 · {totalSystemsCount} 套业务系统全量纳管
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            对应上方全景蓝图各大业务域，支持按全生命周期阶段检索并一键单点登录直达。
          </p>
        </div>

        {/* 快速阶段筛选胶囊条 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setSelectedStageId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
              selectedStageId === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            全部系统 ({totalSystemsCount})
          </button>
          {stages.map(st => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStageId(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                selectedStageId === st.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              0{st.order} {st.name.replace('数据', '')} ({st.systems.length})
            </button>
          ))}
        </div>
      </div>

      {/* 主展示区 */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        {/* 系统列表工具栏 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              {selectedStageId === 'all' ? '全部纳管业务系统' : `【0${selectedStage?.order} ${selectedStage?.name}】所辖系统`}
            </span>
            <span className="text-xs text-slate-400">
              ({displayedSystems.length} 套就绪)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="筛选当前视图系统..."
                className="w-48 sm:w-56 text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {selectedStageId !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedStageId('all')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>重置为全部</span>
              </button>
            )}
          </div>
        </div>

        {/* 系统卡片平铺网格 */}
        {displayedSystems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {displayedSystems.map(system => (
              <SystemCard
                key={system.id}
                system={system}
                isFavorite={favoriteSystemIds.includes(system.id)}
                onToggleFavorite={onToggleFavorite}
                onEnterSystem={onEnterSystem}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-400 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            未检索到与 "{effectiveQuery}" 相关的系统，请更换关键词搜索
          </div>
        )}
      </div>
    </section>
  );
};
