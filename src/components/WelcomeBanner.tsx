import React from 'react';
import {
  ShieldCheck,
  Layers,
  Sparkles,
  Server,
  Activity
} from 'lucide-react';

interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Welcome greetings and subtitle */}
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              欢迎回来，{userName}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              数据要素联合工作专班 · 综合管理员
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            数据要素全链路工作门户 · 涵盖数据资源化、资产化与价值化全生命周期，提供 16 套业务系统的统一单点登录与敏捷导航。
          </p>
        </div>

        {/* Platform Overview Health Indicators */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 shrink-0">
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2.5 flex flex-col items-center min-w-[90px] shadow-2xs">
            <div className="flex items-center gap-1.5 text-blue-700">
              <Layers className="w-3.5 h-3.5" />
              <span className="text-lg font-bold font-mono">5</span>
            </div>
            <span className="text-[11px] text-slate-600 font-medium mt-0.5">流转阶段</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2.5 flex flex-col items-center min-w-[90px] shadow-2xs">
            <div className="flex items-center gap-1.5 text-indigo-700">
              <Server className="w-3.5 h-3.5" />
              <span className="text-lg font-bold font-mono">16</span>
            </div>
            <span className="text-[11px] text-slate-600 font-medium mt-0.5">联通系统</span>
          </div>

          <div 
            className="bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2.5 flex flex-col items-center min-w-[90px] shadow-2xs"
            title="暂无统计数据，预留展位"
          >
            <div className="flex items-center gap-1.5 text-slate-400">
              <Activity className="w-3.5 h-3.5" />
              <span className="text-lg font-bold font-mono text-slate-400">--</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">统计展位 01</span>
          </div>

          <div 
            className="bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2.5 flex flex-col items-center min-w-[90px] shadow-2xs"
            title="暂无统计数据，预留展位"
          >
            <div className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-lg font-bold font-mono text-slate-400">--</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">统计展位 02</span>
          </div>
        </div>
      </div>
    </section>
  );
};

