import React, { useState } from 'react';
import {
  Search,
  Grid,
  Share2,
  Cpu,
  Database,
  Radio,
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

  // 1. 倒序第一层 (顶层)：流通 (数据流通服务平台、可信数据空间、数据服务平台、数据资产管理平台)
  const circulationIds = ['data-circulation', 'trusted-data-space', 'data-service', 'data-asset'];
  const circulationSystems = systems
    .filter(s => circulationIds.includes(s.id))
    .sort((a, b) => circulationIds.indexOf(a.id) - circulationIds.indexOf(b.id));

  // 2. 倒序第二层 (应用层)：开发利用 (融合应用开发平台、协作开发平台、数据沙箱平台、EvayBI平台、智能体开发平台)
  const developmentIds = ['agent-dev', 'evay-bi', 'fusion-app', 'dev-collaboration', 'data-sandbox'];
  const developmentSystems = systems
    .filter(s => developmentIds.includes(s.id))
    .sort((a, b) => developmentIds.indexOf(a.id) - developmentIds.indexOf(b.id));

  // 3. 倒序第三层 (底座层)：治理 (数据资源治理平台、CIM 城市信息模型平台、数据标注平台)
  const governanceIds = ['data-governance', 'cim-model', 'data-annotation'];
  const governanceSystems = systems
    .filter(s => governanceIds.includes(s.id))
    .sort((a, b) => governanceIds.indexOf(a.id) - governanceIds.indexOf(b.id));

  // 4. 倒序第四层 (源头层)：汇聚 (物联网感知平台、视频融合与分析平台)
  const collectionIds = ['iot-sensing', 'video-fusion'];
  const collectionSystems = systems
    .filter(s => collectionIds.includes(s.id))
    .sort((a, b) => collectionIds.indexOf(a.id) - collectionIds.indexOf(b.id));

  // Filtered views according to search input
  const filteredCirculation = circulationSystems.filter(matchesQuery);
  const filteredDevelopment = developmentSystems.filter(matchesQuery);
  const filteredGovernance = governanceSystems.filter(matchesQuery);
  const filteredCollection = collectionSystems.filter(matchesQuery);

  const totalFilteredCount =
    filteredCirculation.length + filteredDevelopment.length + filteredGovernance.length + filteredCollection.length;

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
              业务架构流程 (汇聚 ➔ 治理 ➔ 开发 ➔ 流通) · {systems.length} 套系统全量纳管
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            涵盖多源汇聚、资源治理、开发利用与要素流通四大流转阶段，提供一网统管与统一 SSO 单点登录直达。
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

      {/* 主四阶段倒序分层排布容器 */}
      <div className="space-y-4">
        {/* 第一层 (顶层)：数据要素合规流通与资产运营 (4 套) */}
        {filteredCirculation.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  第一层 · 数据要素合规流通与资产运营（价值释放层）
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                {filteredCirculation.length} 套流通系统
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredCirculation.map(system => (
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

        {/* 第二层 (中层)：数据价值开发与敏捷应用 (5 套) */}
        {filteredDevelopment.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  第二层 · 数据价值开发与敏捷应用（智算开发层）
                </span>
              </div>
              <span className="text-[11px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                {filteredDevelopment.length} 套开发利用系统
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {filteredDevelopment.map(system => (
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

        {/* 第三层 (核心底座)：数据资源治理与底座 (3 套，深色底座基石视觉) */}
        {filteredGovernance.length > 0 && (
          <div className="bg-gradient-to-r from-[#07193b] via-[#0b2452] to-[#07193b] rounded-2xl border border-blue-900/60 p-4 sm:p-5 shadow-md">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-blue-900/40">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  第三层 · 数据资源治理底座（基石底座层）
                </span>
              </div>
              <span className="text-[11px] text-cyan-200 font-bold bg-cyan-500/20 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                {filteredGovernance.length} 套治理底座系统
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {filteredGovernance.map(system => (
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

        {/* 第四层 (底层源头)：物理世界感知与多源汇聚 (2 套) */}
        {filteredCollection.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  第四层 · 物理世界感知与多源汇聚（源头接入层）
                </span>
              </div>
              <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                {filteredCollection.length} 套感知汇聚系统
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCollection.map(system => (
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
