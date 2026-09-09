import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Clock,
  User,
  ArrowUpRight,
  Send,
  Building,
  Calendar,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { TodoTask, SystemItem } from '../types';

interface TodoDetailModalProps {
  task: TodoTask | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (taskId: string) => void;
  onJumpToSystem: (systemId: string) => void;
  allSystems: SystemItem[];
}

export const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onComplete,
  onJumpToSystem,
  allSystems
}) => {
  const [remark, setRemark] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [doneNotice, setDoneNotice] = useState(false);

  if (!isOpen || !task) return null;

  const matchedSystem = allSystems.find(s => s.id === task.systemId);

  const handleAction = (status: 'approve' | 'done') => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDoneNotice(true);
      onComplete(task.id);
      setTimeout(() => {
        setDoneNotice(false);
        onClose();
      }, 1000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                task.type === 'audit'
                  ? 'bg-blue-100 text-blue-700'
                  : task.type === 'process'
                  ? 'bg-rose-100 text-rose-700'
                  : task.type === 'apply'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {task.typeLabel}
            </span>
            <span className="text-xs text-slate-500">事项编号: {task.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {task.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                关联系统: {task.systemName}
              </span>
              {task.applicant && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {task.applicant}
                </span>
              )}
              {task.deadline && (
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  时限: {task.deadline}
                </span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
            <div className="font-semibold text-slate-900 mb-1">事项详情背景：</div>
            {task.description}
          </div>

          {/* Quick jump to system */}
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 flex items-center justify-between">
            <div className="text-xs text-slate-700">
              可在 <strong>{task.systemName}</strong> 内查看原始日志、拓扑图与合约文件
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToSystem(task.systemId);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 rounded-md border border-blue-300 shadow-2xs transition-colors cursor-pointer"
            >
              <span>进入系统办理</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Processing Remark Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              办理办理意见 / 处理批注 (选填)
            </label>
            <textarea
              rows={2}
              value={remark}
              onChange={e => setRemark(e.target.value)}
              placeholder="请输入审批核准意见或操作执行备注..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            稍后处理
          </button>

          <div className="flex items-center gap-2">
            {doneNotice ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                已处理完成并同步至该系统
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleAction('done')}
                  disabled={submitting}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200/70 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  标记已办
                </button>
                <button
                  type="button"
                  onClick={() => handleAction('approve')}
                  disabled={submitting}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {task.type === 'audit' ? '核准通过并流转' : '确认处理'}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
