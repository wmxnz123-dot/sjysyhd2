import React, { useState } from 'react';
import img04Asset from '../data/img04.png';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  Download,
  Layers,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';

interface BlueprintHeroProps {
  onExploreSystems: () => void;
  onExploreFavorites?: () => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({
  onExploreSystems,
  onExploreFavorites,
  isLoggedIn = false,
  onOpenLogin
}) => {
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="blueprint-hero" className="mb-6 scroll-mt-20">
      {/* 1. 顶部战略宣传横幅与核心成效数据 (高规格平台宣传体量) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061838] via-[#0a234f] to-[#04122b] text-white p-6 sm:p-8 lg:p-9 shadow-xl border border-blue-900/40">
        {/* 背景科幻光晕底纹 */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* 左侧战略标语与定位 */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/15 text-sky-300 text-xs font-semibold border border-blue-400/25 mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>数字化转型顶层设计 · 集团级旗舰数字化底座</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-wide text-white leading-snug drop-shadow-sm mb-3">
              全链路数据要素
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200 ml-2">
                业务集约协同中枢
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              纵向贯通采集与精细治理，横向协同开发利用、安全流通与要素资产化运营，打破系统孤岛，实现全生命周期一网统管与乘数价值释放。
            </p>

            {/* 核心快捷行动按钮 */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onExploreSystems}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs sm:text-[13px] font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer group"
                id="hero-explore-systems-btn"
              >
                <span>直达业务系统矩阵</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 右侧宏观成果统计数据卡片 (提升领导视角的宣传分量) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3 shrink-0 lg:w-80">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-sky-400 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-semibold text-sky-300/80 bg-sky-400/10 px-1.5 py-0.5 rounded">全链路</span>
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">5 <span className="text-xs font-normal text-slate-400">大阶段</span></div>
              <div className="text-[11px] text-slate-300/80 mt-0.5">覆盖生命周期全流转</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-indigo-400 mb-1">
                <Server className="w-4 h-4" />
                <span className="text-[10px] font-semibold text-indigo-300/80 bg-indigo-400/10 px-1.5 py-0.5 rounded">集约纳管</span>
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">16 <span className="text-xs font-normal text-slate-400">套子系统</span></div>
              <div className="text-[11px] text-slate-300/80 mt-0.5">单点登录一键直达</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-semibold text-emerald-300/80 bg-emerald-400/10 px-1.5 py-0.5 rounded">可信保障</span>
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">100%</div>
              <div className="text-[11px] text-slate-300/80 mt-0.5">合规沙箱与全流程存证</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-semibold text-amber-300/80 bg-amber-400/10 px-1.5 py-0.5 rounded">实时联动</span>
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">24/7</div>
              <div className="text-[11px] text-slate-300/80 mt-0.5">集约协同调度在线率</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. img04.png 业务架构与中枢全景蓝图展台 (宣传门面 + 按图索引核心) */}
      <div className="mt-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* 展台标题栏与工具栏 */}
        <div className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              景
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  数据要素全生命周期集约协同业务全景蓝图
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  统一业务顶层架构
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                按图索骥：全景蓝图纵贯“采、治、用、通、营”，下方系统矩阵与蓝图各功能模块实时对应联动。
              </p>
            </div>
          </div>

          {/* 交互工具按键 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              title="点击以全屏模式清晰研读架构全景"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
              <span>放大全景</span>
            </button>

            <a
              href="/img04.png"
              download="数据要素全生命周期业务全景蓝图.png"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              title="下载高清全景架构蓝图"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">下载蓝图</span>
            </a>
          </div>
        </div>

        {/* 蓝图展示核心窗口：超清沉浸展示，可点击放大 */}
        <div 
          onClick={() => setIsFullscreenModalOpen(true)}
          className="relative group cursor-zoom-in bg-slate-50/50 p-2 sm:p-4 overflow-hidden flex items-center justify-center transition-all"
        >
          {/* 悬停放大提示 */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center pointer-events-none z-10">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-95 duration-200 bg-slate-900/80 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-sky-300" />
              <span>点击开启超清全屏蓝图</span>
            </div>
          </div>

          <img
            src={img04Asset || '/img04.png'}
            alt="数据要素全生命周期集约协同业务全景蓝图"
            className="w-full h-auto max-h-[580px] lg:max-h-[640px] object-contain rounded-xl select-none transition-transform duration-300 group-hover:scale-[1.006]"
            loading="eager"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== '/img04.png') {
                target.src = '/img04.png';
              }
            }}
          />
        </div>

        {/* 底部引导栏：引导用户从蓝图进入下方的系统快捷入口 */}
        <div className="px-5 py-3 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">蓝图功能已全面落地：</span>
            <span>涉及的 16 套业务系统已全部接入中枢，支持统一认证与协同调度</span>
          </div>

          <button
            type="button"
            onClick={onExploreSystems}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer group"
          >
            <span>前往下方系统矩阵一键直达</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. 全屏超清蓝图研读 Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold">全景研读</span>
              <h3 className="text-base sm:text-lg font-bold">数据要素全生命周期集约协同业务全景蓝图</h3>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/img04.png"
                download="数据要素全生命周期业务全景蓝图.png"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载原图 (1986×1104)</span>
              </a>

              <button
                type="button"
                onClick={() => setIsFullscreenModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="关闭全屏"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Large responsive image */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-4">
            <img
              src={img04Asset || '/img04.png'}
              alt="全景蓝图高清研读"
              className="max-w-none w-auto max-h-[88vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            提示：支持右键另存或使用右上角下载按钮获取高清印刷级蓝图
          </div>
        </div>
      )}
    </section>
  );
};
