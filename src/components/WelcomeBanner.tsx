import React from 'react';
import {
  ShieldCheck,
  Layers,
  Sparkles,
  Server,
  Activity,
  LogIn,
  UserCheck
} from 'lucide-react';

interface WelcomeBannerProps {
  userName?: string;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
  department?: string;
  role?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName = '访客',
  isLoggedIn = false,
  onOpenLogin,
  department = '数据要素事业部',
  role = '全域系统联通权限 (超管级)'
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-4.5 shadow-2xs mb-3.5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Welcome greetings and subtitle */}
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isLoggedIn ? `欢迎回来，${userName}` : '欢迎访问数据要素全链路工作门户'}
            </h1>
            {isLoggedIn ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                {department} · {role.includes('超管') ? '综合管理员' : role}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                未登录模式 · 浏览全景
              </span>
            )}
          </div>
          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-none">
            {isLoggedIn
              ? '涵盖数据资源化、资产化与价值化全生命周期，提供 16 套业务系统的统一单点登录与敏捷导航。'
              : '数据要素全链路业务协同中枢已联通 16 套业务系统。请登录以使用 SSO 单点直达及定制工作台功能。'}
          </p>
        </div>

        {/* Platform Overview Health Indicators / Login Action */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 shrink-0">
          {!isLoggedIn && (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
              id="banner-login-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>立即登录</span>
            </button>
          )}

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

