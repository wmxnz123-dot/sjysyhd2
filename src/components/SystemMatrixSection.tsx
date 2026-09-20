import React, { useState } from 'react';
import {
  Search,
  Grid,
  Sparkles,
  Layers,
  Database,
  Cpu,
  RotateCcw
} from 'lucide-react';
import { SystemItem } from '../types';
import { SystemCard } from './SystemCard';

interface SystemMatrixSectionProps {
  systems: SystemItem[];
  favoriteSystemIds: string[];
  onToggleFavorite: (systemId: string) => void;
  onEnterSystem: (system: SystemItem) => void;
  searchFilter?: string;
}

export const SystemMatrixSection: React.FC<SystemMatrixSectionProps> = ({
  systems,
  favoriteSystemIds,
  onToggleFavorite,
  onEnterSystem,
  searchFilter = ''
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const effectiveQuery = (searchFilter || localSearch).trim().toLowerCase();

  // Helper filter
  const matchesQuery = (s: SystemItem) => {
    if (!effectiveQuery) return true;
    return (
      s.name.toLowerCase().includes(effectiveQuery) ||
      s.coreCapability.toLowerCase().includes(effectiveQuery) ||
      s.capabilityTags.some(t => t.toLowerCase().includes(effectiveQuery)) ||
      s.description.toLowerCase().includes(effectiveQuery)
    );
  };

  // Row 1: 可信数据空间、智能体开发平台
  const row1Ids = ['trusted-data-space', 'agent-dev'];
  const row1Systems = systems
    .filter(s => row1Ids.includes(s.id))
    .sort((a, b) => row1Ids.indexOf(a.id) - row1Ids.indexOf(b.id));

  // Row 3 (底座): 天枢数据治理平台
  const row3Ids = ['tianshu-governance'];
  const row3Systems = systems.filter(s => row3Ids.includes(s.id));

  // Row 2: 其余放第二行
  // (数据填报平台、协作开发平台、数据沙箱平台、数据标注平台、EvayBI平台、数据运营平台、数据服务平台、数据资产平台)
  const row2Systems = systems.filter(
    s => !row1Ids.includes(s.id) && !row3Ids.includes(s.id)
  );

  // Filtered views according to search input
  const filteredRow1 = row1Systems.filter(matchesQuery);
  const filteredRow2 = row2Systems.filter(matchesQuery);
  const filteredRow3 = row3Systems.filter(matchesQuery);

  const totalFilteredCount =
    filteredRow1.length + filteredRow2.length + filteredRow3.length;

  return (
    <section id="lifecycle-section" className="mb-6 scroll-mt-20">
      {/* 模块顶部说明与搜索 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Grid className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              集约协同业务系统入口矩阵
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              全景分层部署 · {systems.length} 套系统全量纳管
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            横向协同开发利用与可信流通，纵向依托天枢数据治理核心底座，提供一网统管与统一单点登录服务。
          </p>
        </div>

        {/* 快速搜索栏 */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="搜索矩阵子系统..."
              className="w-52 sm:w-64 text-xs bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 placeholder-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch('')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>清空</span>
            </button>
          )}
        </div>
      </div>

      {/* 主三行分层排布容器 */}
      <div className="space-y-4">
        {/* 第一行：可信数据空间 和 智能体开发平台 */}
        {filteredRow1.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  第一层 · 创新应用与可信流通前沿
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  (可信数据空间 · 智能体开发平台)
                </span>
              </div>
              <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                2 套核心系统
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredRow1.map(system => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isFavorite={favoriteSystemIds.includes(system.id)}
                  onToggleFavorite={onToggleFavorite}
                  onEnterSystem={onEnterSystem}
                />
              ))}
            </div>
          </div>
        )}

        {/* 第二行：其余系统 (数据填报、协作开发、数据沙箱、数据标注、EvayBI、数据运营、数据服务、数据资产) */}
        {filteredRow2.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  第二层 · 全链路业务集约应用与服务
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  (数据填报 · 敏捷分析 · 安全开发 · 要素运营与资产服务)
                </span>
              </div>
              <span className="text-[11px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                {filteredRow2.length} 套业务系统
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredRow2.map(system => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isFavorite={favoriteSystemIds.includes(system.id)}
                  onToggleFavorite={onToggleFavorite}
                  onEnterSystem={onEnterSystem}
                />
              ))}
            </div>
          </div>
        )}

        {/* 第三行：核心底座——天枢数据治理平台 (颜色更深、突出底座基石) */}
        {filteredRow3.length > 0 && (
          <div className="bg-gradient-to-r from-[#07193b] via-[#0b2452] to-[#07193b] rounded-2xl border border-blue-900/60 p-4 sm:p-5 shadow-md">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-blue-900/40">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  第三层 · 核心底座（基石底座）
                </span>
                <span className="text-[11px] text-blue-300 font-medium">
                  (全域数据标准 · 元数据拓扑 · 质量稽核 · 数据安全分类分级)
                </span>
              </div>
              <span className="text-[11px] text-blue-200 font-bold bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
                数据要素统一底座
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {filteredRow3.map(system => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isFavorite={favoriteSystemIds.includes(system.id)}
                  onToggleFavorite={onToggleFavorite}
                  onEnterSystem={onEnterSystem}
                  isBaseFoundation={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* 搜无匹配结果提示 */}
        {totalFilteredCount === 0 && (
          <div className="py-16 text-center text-xs text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            未检索到与“{effectiveQuery}”相匹配的系统，请尝试调整关键词。
          </div>
        )}
      </div>
    </section>
  );
};
