import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  FileClock,
  CheckSquare,
  ArrowUpRight,
  Clock,
  User,
  CheckCircle,
  ExternalLink,
  Filter,
  Check,
  Building2,
  Calendar
} from 'lucide-react';
import { TodoTask, SystemItem } from '../types';

interface WorkspaceSectionProps {
  todos: TodoTask[];
  onSelectTask: (task: TodoTask) => void;
  onQuickCompleteTask: (taskId: string) => void;
  onOpenSystem: (systemId: string) => void;
  allSystems: SystemItem[];
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  todos,
  onSelectTask,
  onQuickCompleteTask,
  onOpenSystem,
  allSystems
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'process' | 'apply' | 'task'>('audit');

  const auditList = todos.filter(t => t.type === 'audit');
  const processList = todos.filter(t => t.type === 'process');
  const applyList = todos.filter(t => t.type === 'apply');
  const taskList = todos.filter(t => t.type === 'task');

  const currentList = todos.filter(t => t.type === activeTab);

  const getSystem = (systemId: string) => allSystems.find(s => s.id === systemId);

  return (
    <section id="workspace-section" className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6 scroll-mt-20">
      {/* Section Header with Geometric Balance Divider */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
          我的工作台 / 任务流转中心
        </h2>
        <div className="h-[1px] flex-1 mx-4 bg-slate-200"></div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="w-2 h-2 rounded-full bg-blue-300"></span>
          <span className="w-2 h-2 rounded-full bg-blue-100"></span>
        </div>
      </div>

      {/* 4 Interactive Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5">
        {/* Card 1: 待审核 */}
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
            activeTab === 'audit'
              ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
          id="stat-card-audit"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              待审核
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'audit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                activeTab === 'audit' ? 'text-blue-700' : 'text-slate-900'
              }`}
            >
              {auditList.length}
            </span>
            <span className="text-xs text-slate-500">件需裁决</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            涉及流通合约、资产入表
          </div>
        </button>

        {/* Card 2: 待处理 */}
        <button
          type="button"
          onClick={() => setActiveTab('process')}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
            activeTab === 'process'
              ? 'bg-orange-50/90 border-orange-400 ring-2 ring-orange-500/20 shadow-xs'
              : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
          id="stat-card-process"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              待处理
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'process'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 group-hover:bg-orange-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                activeTab === 'process' ? 'text-orange-700' : 'text-slate-900'
              }`}
            >
              {processList.length}
            </span>
            <span className="text-xs text-slate-500">项预警与异常</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
            CDC流同步告警、质量校验
          </div>
        </button>

        {/* Card 3: 我的申请 */}
        <button
          type="button"
          onClick={() => setActiveTab('apply')}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
            activeTab === 'apply'
              ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
          id="stat-card-apply"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              我的申请
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'apply'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'
              }`}
            >
              <FileClock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                activeTab === 'apply' ? 'text-emerald-700' : 'text-slate-900'
              }`}
            >
              {applyList.length}
            </span>
            <span className="text-xs text-slate-500">项审批中</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            沙箱高算力、全省代码库
          </div>
        </button>

        {/* Card 4: 我的任务 */}
        <button
          type="button"
          onClick={() => setActiveTab('task')}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
            activeTab === 'task'
              ? 'bg-indigo-50/90 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
              : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
          id="stat-card-task"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              常规任务
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'task'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                activeTab === 'task' ? 'text-indigo-700' : 'text-slate-900'
              }`}
            >
              {taskList.length}
            </span>
            <span className="text-xs text-slate-500">项进行中</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
            月度确权报告、跨系统对账
          </div>
        </button>
      </div>

      {/* Task List Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Sub-header with tab switcher label */}
        <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs sm:text-sm text-slate-800">
              {activeTab === 'audit' && '待审核事项列表'}
              {activeTab === 'process' && '待处理告警与工单'}
              {activeTab === 'apply' && '我发起的审批跟踪'}
              {activeTab === 'task' && '我的专属在办任务'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-medium">
              共 {currentList.length} 条
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>实时同步自各业务子系统</span>
          </div>
        </div>

        {/* Task Items */}
        {currentList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {currentList.map(item => {
              const matchedSys = getSystem(item.systemId);

              return (
                <div
                  key={item.id}
                  className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {/* Priority pill */}
                      {item.priority === 'high' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          紧急
                        </span>
                      )}
                      {item.priority === 'medium' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          较高
                        </span>
                      )}
                      {item.priority === 'low' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          普通
                        </span>
                      )}

                      {/* Associated System Badge */}
                      <button
                        type="button"
                        onClick={() => onOpenSystem(item.systemId)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                        title={`点击查看所属系统：${item.systemName}`}
                      >
                        <span>{item.systemName}</span>
                        <ArrowUpRight className="w-3 h-3 text-blue-500" />
                      </button>

                      <span className="text-xs text-slate-400">· {item.time}</span>
                    </div>

                    <h4
                      onClick={() => onSelectTask(item)}
                      className="text-sm font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {item.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      {item.applicant && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          申请方: {item.applicant}
                        </span>
                      )}
                      {item.deadline && (
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          时限: {item.deadline}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => onSelectTask(item)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>前往办理</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickCompleteTask(item.id)}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="标记为已完成"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">标记完成</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-700">
              当前暂无待处理事项
            </div>
            <p className="text-xs text-slate-400 mt-1">
              各项业务系统运行平稳，您可以前往全链路导航开展探索
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
