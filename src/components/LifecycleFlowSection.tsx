import React, { useState } from 'react';
import {
  Layers,
  ChevronRight,
  RotateCcw,
  Check
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
  // 默认展示全部系统，点击左侧阶段可进行单阶段筛选
  const [selectedStageId, setSelectedStageId] = useState<LifecycleStageId | 'all'>('all');

  // Filter systems based on search if provided
  const query = searchFilter.trim().toLowerCase();

  const getFilteredStageSystems = (stage: LifecycleStage) => {
    if (!query) return stage.systems;
    return stage.systems.filter(
      s =>
        s.name.toLowerCase().includes(query) ||
        s.coreCapability.toLowerCase().includes(query) ||
        s.capabilityTags.some(t => t.toLowerCase().includes(query)) ||
        s.description.toLowerCase().includes(query)
    );
  };

  // 全量系统总数与当前过滤后的系统列表
  const totalSystemsCount = stages.reduce((acc, st) => acc + st.systems.length, 0);
  const selectedStage = stages.find(s => s.id === selectedStageId);

  // 右侧直接平铺展示的系统列表
  const displayedSystems =
    selectedStageId === 'all'
      ? stages.flatMap(st => getFilteredStageSystems(st))
      : selectedStage
      ? getFilteredStageSystems(selectedStage)
      : [];

  return (
    <section id="lifecycle-section" className="mb-2 scroll-mt-20">
      {/* 模块顶部标题栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider">
            数据要素全链路业务系统
          </h2>
          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            5大流转阶段 · {totalSystemsCount}套业务系统
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          <span>按要素生命周期自上而下流转协同</span>
        </div>
      </div>

      {/* 工作台左右分栏架构：左侧阶段导航筛选 + 右侧直接平铺展示所有系统 */}
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
        {/* 左侧阶段导航筛选侧栏 */}
        <aside className="w-full lg:w-72 xl:w-76 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col">
          <div className="px-1.5 py-1 mb-2.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">流转阶段导航</span>
            <span className="text-[11px] text-slate-400">点击筛选对应阶段系统</span>
          </div>

          <div className="flex-1 flex flex-col justify-between py-1 space-y-2">
            {/* 全部系统选项（默认选中） */}
            <button
              type="button"
              onClick={() => setSelectedStageId('all')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                selectedStageId === 'all'
                  ? 'bg-blue-50/90 border-blue-500 shadow-2xs ring-1 ring-blue-500/20 text-blue-900'
                  : 'bg-white border-transparent hover:bg-slate-50 text-slate-700 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 transition-colors ${
                    selectedStageId === 'all'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  ALL
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">全部业务系统</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">全生命周期 5 大阶段</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    selectedStageId === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {totalSystemsCount} 套
                </span>
                {selectedStageId === 'all' && (
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                )}
              </div>
            </button>

            {/* 分割线 */}
            <div className="h-px bg-slate-100 w-full my-0.5" />

            {/* 5大流转阶段列表 */}
            {stages.map((stage, idx) => {
              const isSelected = selectedStageId === stage.id;
              const stageFilteredSystems = getFilteredStageSystems(stage);
              const isLast = idx === stages.length - 1;

              return (
                <div key={stage.id} className="relative flex-1 flex flex-col justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'border-blue-500 shadow-2xs ring-1 ring-blue-500/20'
                        : 'border-transparent hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                    }`}
                    style={{
                      backgroundColor: isSelected ? stage.accentBg : undefined
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* 阶段编号 */}
                      <div
                        className="w-7.5 h-7.5 rounded-lg flex items-center justify-center font-bold text-xs text-white font-mono shrink-0 shadow-2xs"
                        style={{ backgroundColor: stage.accentColor }}
                      >
                        0{stage.order}
                      </div>

                      {/* 阶段标题与副标 */}
                      <div className="min-w-0">
                        <div
                          className={`text-xs font-bold truncate ${
                            isSelected ? 'text-slate-900' : 'text-slate-800'
                          }`}
                        >
                          {stage.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {stage.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* 右侧数量指示与高亮图标 */}
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          isSelected
                            ? 'bg-white text-slate-800 shadow-2xs border border-slate-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {stageFilteredSystems.length} 套
                      </span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-blue-600 ml-0.5" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                  </button>

                  {/* 阶段间竖向轻量微连接线 */}
                  {!isLast && (
                    <div className="w-0.5 h-1.5 bg-slate-200 mx-auto my-0.5 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* 右侧业务系统工作台展示区：直接平铺列出所有系统，不为每个阶段单独套框 */}
        <div className="flex-1 min-w-0 w-full bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
          <div>
            {/* 顶部指示条 */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>{selectedStageId === 'all' ? '全部业务系统' : selectedStage?.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                    {displayedSystems.length} 套系统
                  </span>
                </h3>
                {selectedStage && selectedStageId !== 'all' && (
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    · {selectedStage.subtitle}
                  </span>
                )}
              </div>

              {selectedStageId !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedStageId('all')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>显示全部系统</span>
                </button>
              )}
            </div>

            {/* 直接平铺渲染所有系统卡片，无阶段嵌套框 */}
            {displayedSystems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
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
              <div className="py-12 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                当前搜索条件下未匹配到业务系统
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
