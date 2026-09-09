import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Server,
  KeyRound,
  FileText
} from 'lucide-react';
import { SystemItem } from '../types';
import { IconHelper } from './IconHelper';

interface SystemModalProps {
  system: SystemItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmEnter: (system: SystemItem) => void;
}

export const SystemModal: React.FC<SystemModalProps> = ({
  system,
  isOpen,
  onClose,
  onConfirmEnter
}) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchedSuccess, setLaunchedSuccess] = useState(false);

  if (!isOpen || !system) return null;

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setLaunchedSuccess(true);
      onConfirmEnter(system);
      setTimeout(() => {
        setLaunchedSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
              <IconHelper name={system.iconName} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 font-medium">
                  第 {system.stageOrder} 阶段 · {system.stageName}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SSO就绪
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {system.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* One sentence description */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              系统定位与功能介绍
            </div>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {system.description}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              核心能力与技术标签
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                核心能力: {system.coreCapability}
              </span>
              {system.capabilityTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md text-xs font-normal bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* System Runtime Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center">
            <div>
              <div className="text-[11px] text-slate-400">服务状态</div>
              <div className="text-xs font-bold text-emerald-600 mt-0.5 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                高可用运行中
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">单点登录</div>
              <div className="text-xs font-bold text-blue-600 mt-0.5">
                SSO 免密直达
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">系统版本</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 font-mono">
                {system.version || 'v4.0.0'}
              </div>
            </div>
          </div>

          {/* Popular features list */}
          {system.popularFeatures && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                推荐快捷功能
              </div>
              <div className="space-y-1.5">
                {system.popularFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-slate-700 flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {feat}
                    </span>
                    <span className="text-[11px] text-blue-600 font-medium cursor-pointer">
                      快捷进入
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 sm:px-6 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-slate-400" />
            <span>已通过统一身份认证免密进入</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              取消
            </button>

            <button
              type="button"
              onClick={handleLaunch}
              disabled={isLaunching || launchedSuccess}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-80"
              id="confirm-launch-system-btn"
            >
              {launchedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>已登录并启动</span>
                </>
              ) : isLaunching ? (
                <span>正在校验凭证启动中...</span>
              ) : (
                <>
                  <span>在新标签进入系统</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
