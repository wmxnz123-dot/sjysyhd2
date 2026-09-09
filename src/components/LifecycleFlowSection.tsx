import React, { useState } from 'react';
import {
  ChevronRight,
  Workflow,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  ArrowDownToLine,
  Database,
  Cpu,
  Network,
  Rocket,
  Info,
  ShieldCheck
} from 'lucide-react';
import { LifecycleStage, LifecycleStageId, SystemItem } from '../types';
import { SystemCard } from './SystemCard';
import { IconHelper } from './IconHelper';

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
  // Active stage filter (null means show all 5 stages in full pipeline)
  const [activeStageId, setActiveStageId] = useState<LifecycleStageId | 'all'>('all');
  const [layoutMode, setLayoutMode] = useState<'columns' | 'pipeline'>('columns');

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

  const displayedStages =
    activeStageId === 'all'
      ? stages
      : stages.filter(st => st.id === activeStageId);

  return (
    <section id="lifecycle-section" className="mb-8 scroll-mt-20">
      {/* Section Header with Geometric Balance Divider */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-700 tracking-wider">
            数据要素全链路业务系统流转全景
          </h2>
          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            5大流转阶段 · 16套业务系统
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View switcher buttons */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setLayoutMode('columns')}
              className={`px-3 py-1 rounded-md transition-colors font-medium cursor-pointer ${
                layoutMode === 'columns'
                  ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              竖向看板模式
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('pipeline')}
              className={`px-3 py-1 rounded-md transition-colors font-medium cursor-pointer ${
                layoutMode === 'pipeline'
                  ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全景泳道模式
            </button>
          </div>

          <div className="hidden md:flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            <span className="w-2 h-2 rounded-full bg-blue-100"></span>
          </div>
        </div>
      </div>

      {/* Active Stage Filter Notice */}
      {activeStageId !== 'all' && (
        <div className="mb-4 px-4 py-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between text-xs text-blue-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              正在聚焦查看：<strong>{stages.find(s => s.id === activeStageId)?.name}</strong>（共 {stages.find(s => s.id === activeStageId)?.systems.length} 套系统）
            </span>
          </div>
          <button
            onClick={() => setActiveStageId('all')}
            className="font-semibold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
          >
            还原显示全部阶段 (16套系统)
          </button>
        </div>
      )}

      {/* 阶段流转节点与流转箭头模块 (统一置于上方，各节点带序号、图标、名称、subtitle和流转箭头，与下方五列精准对齐) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 sm:p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isFocused = activeStageId === stage.id;
            const stageSystems = getFilteredStageSystems(stage);

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id === activeStageId ? 'all' : stage.id)}
                className={`relative flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all border ${
                  isFocused
                    ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
                id={`flow-step-${stage.id}`}
                title="点击可聚焦或还原该阶段"
              >
                {/* 序号徽标 + 阶段图标 */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    0{stage.order}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: stage.accentColor }}
                  >
                    <IconHelper name={stage.iconName} className="w-4 h-4" />
                  </div>
                </div>

                {/* 阶段名称 */}
                <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight whitespace-nowrap">
                  {stage.name}
                </div>

                {/* 一句话介绍 */}
                <div className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap font-normal">
                  {stage.subtitle}
                </div>

                {/* 桌面端流转连接箭头: 指向下一个阶段列 */}
                {idx < stages.length - 1 && (
                  <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-5 h-5 rounded-full bg-white border border-slate-200 shadow-2xs items-center justify-center text-slate-400 pointer-events-none">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 竖向看板模式: 下方系统排版保持不动，垂直与上方 5 个节点严密对应 */}
      {layoutMode === 'columns' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-start">
          {displayedStages.map((stage) => {
            const stageSystems = getFilteredStageSystems(stage);

            return (
              <div
                key={stage.id}
                className="bg-slate-50/70 rounded-2xl p-2.5 sm:p-3 border border-slate-200 flex flex-col gap-2.5 shadow-2xs"
                id={`kanban-col-${stage.id}`}
              >
                {/* 看板列头 */}
                <div className="flex items-center justify-between px-1 pb-1.5 border-b border-slate-200/80">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: stage.accentColor }}
                    />
                    <span className="text-xs font-bold text-slate-800 truncate">{stage.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                    {stageSystems.length}套
                  </span>
                </div>

                {/* 该阶段系统卡片纵向排列，排版保持不动 */}
                <div className="flex flex-col gap-2.5">
                  {stageSystems.map(system => (
                    <SystemCard
                      key={system.id}
                      system={system}
                      isFavorite={favoriteSystemIds.includes(system.id)}
                      onToggleFavorite={onToggleFavorite}
                      onEnterSystem={onEnterSystem}
                    />
                  ))}
                  {stageSystems.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                      未匹配到系统
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 全景泳道模式: 各阶段横向泳道卡片网格 */}
      {layoutMode === 'pipeline' && (
        <div className="space-y-5">
          {displayedStages.map(stage => {
            const stageSystems = getFilteredStageSystems(stage);

            return (
              <div
                key={stage.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm transition-all hover:border-slate-300"
                id={`stage-lane-${stage.id}`}
              >
                {/* Stage Header Banner */}
                <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs font-bold text-xs shrink-0"
                      style={{ backgroundColor: stage.accentColor }}
                    >
                      0{stage.order}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        {stage.name}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {stageSystems.length} 套业务系统
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stage Systems Grid */}
                {stageSystems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {stageSystems.map(system => (
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
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    当前搜索条件下未匹配到本阶段的系统
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
