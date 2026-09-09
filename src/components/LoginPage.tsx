import React, { useState, useEffect } from 'react';
import {
  Layers,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Database,
  Share2,
  Cpu,
  Sparkles,
  Smartphone,
  KeyRound,
  Activity,
  Network
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (userInfo: { name: string; department: string; role: string }) => void;
}

type LoginTab = 'account' | 'phone';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  // Login method tab
  const [activeTab, setActiveTab] = useState<LoginTab>('account');

  // Account login fields
  const [username, setUsername] = useState('zhangming');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  // Phone login fields
  const [phone, setPhone] = useState('13800138000');
  const [smsCode, setSmsCode] = useState('888888');
  const [countdown, setCountdown] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successTip, setSuccessTip] = useState('');

  // Handle SMS countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone.trim()) {
      setErrorMessage('请输入手机号码');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
      setErrorMessage('请输入有效的11位手机号码');
      return;
    }

    setErrorMessage('');
    setCountdown(60);
    setSuccessTip('验证码已发送至您的手机，测试验证码：888888');
    setSmsCode('888888');
    setTimeout(() => {
      setSuccessTip('');
    }, 4000);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (activeTab === 'account') {
      if (!username.trim()) {
        setErrorMessage('请输入账号');
        return;
      }
      if (!password.trim()) {
        setErrorMessage('请输入密码');
        return;
      }
    } else {
      if (!phone.trim()) {
        setErrorMessage('请输入手机号');
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
        setErrorMessage('请输入有效的11位手机号码');
        return;
      }
      if (!smsCode.trim()) {
        setErrorMessage('请输入验证码');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: activeTab === 'account' ? (username === 'zhangming' ? '张明工' : username) : '张明工',
        department: '数据要素事业部',
        role: '全域系统联通权限 (超管级)'
      });
    }, 350);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Top Banner Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-2.5 px-6 sm:px-10 shrink-0">
        <div className="w-[95%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight block">
                数据要素全链路工作门户
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Data Element Full-Lifecycle Enterprise Work Portal
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div className="w-full max-w-[920px] min-h-[480px] max-h-[calc(100vh-88px)] bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Decorative & Info Panel (7 cols on lg - wider) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            {/* Background Cyber Blueprint Grid SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="login-cyber-grid" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="#38bdf8" />
                  <path d="M 26 0 L 0 0 0 26" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#login-cyber-grid)" />
            </svg>

            {/* Ambient geometric gradient orbs */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-600/15 blur-2xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-indigo-600/15 blur-2xl pointer-events-none" />

            {/* Top Branding Section */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-medium border border-blue-400/25 mb-3 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>全生命周期一网通办</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
                全链路数据要素
                <br />
                业务集约协同中枢
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                纵向贯通采集治理，横向协同开发流通与资产运营，驱动数据要素全生命周期价值释放。
              </p>
            </div>

            {/* Middle Tech Visual: Data Pipeline Topology Graph */}
            <div className="relative z-10 my-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-inner backdrop-blur-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2.5 pb-2 border-b border-slate-800/80 font-mono">
                <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <Activity className="w-3 h-3 animate-pulse" />
                  DATA LIFECYCLE MESH
                </span>
                <span className="text-slate-500">5 STAGES</span>
              </div>

              {/* 5-Node Interconnected Data Flow */}
              <div className="relative flex items-center justify-between px-2 sm:px-4">
                {/* Connecting Circuit Line */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-500/40 via-indigo-500/50 to-emerald-500/40 z-0" />

                {/* Node 1: 汇聚 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/20">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium">汇聚</span>
                </div>

                {/* Node 2: 治理 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-400/50 flex items-center justify-center text-indigo-400 shadow-sm shadow-indigo-500/20">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium">治理</span>
                </div>

                {/* Node 3: 开发 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/20">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium">开发</span>
                </div>

                {/* Node 4: 流通 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/20">
                    <Share2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium">流通</span>
                </div>

                {/* Node 5: 运营 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-amber-950 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-sm shadow-amber-500/20">
                    <Network className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium">运营</span>
                </div>
              </div>
            </div>

            {/* Bottom Highlights */}
            <div className="relative z-10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>全域数据资源一网汇聚 · 统一纳管</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>跨域可信流通交易 · 资产合规运营</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>统一单点鉴权 · 20+ 专业系统互联互通</span>
              </div>
            </div>
          </div>

          {/* Right Form Panel (5 cols on lg - narrower) */}
          <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-center">
            <div>
              {/* Tab Switcher: 账号登录 vs 手机号登录 */}
              <div className="flex items-center border-b border-slate-200 mb-5 gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('account');
                    setErrorMessage('');
                  }}
                  className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                    activeTab === 'account'
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-account-login"
                >
                  <span>账号登录</span>
                  {activeTab === 'account' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('phone');
                    setErrorMessage('');
                  }}
                  className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                    activeTab === 'phone'
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-phone-login"
                >
                  <span>手机号登录</span>
                  {activeTab === 'phone' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>

              {/* Tips / Error Message */}
              {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {errorMessage}
                </div>
              )}
              {successTip && (
                <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                  {successTip}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {activeTab === 'account' ? (
                  <>
                    {/* 账号 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        账号
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="请输入账号"
                          className="w-full pl-9.5 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* 密码 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        密码
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="请输入密码"
                          className="w-full pl-9.5 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-end text-xs">
                      <button
                        type="button"
                        onClick={() => alert('如需重置密码，请联系专班信息技术支持中心或单位网络管理员。')}
                        className="text-blue-600 hover:text-blue-700 cursor-pointer text-xs"
                      >
                        忘记密码?
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 手机号 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        手机号
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="请输入11位手机号码"
                          maxLength={11}
                          className="w-full pl-9.5 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* 验证码 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        验证码
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={smsCode}
                            onChange={(e) => setSmsCode(e.target.value)}
                            placeholder="请输入短信验证码"
                            maxLength={6}
                            className="w-full pl-9.5 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <button
                          type="button"
                          disabled={countdown > 0}
                          onClick={handleSendCode}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shrink-0 transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                          {countdown > 0 ? `${countdown}s 后重试` : '获取验证码'}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit CTA Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    id="login-submit-button"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>登录进入工作门户</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-2.5 px-6 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white/50 shrink-0">
        <span>© 2026 数据要素全链路统一工作门户 · 山东亿云信息技术有限公司</span>
      </footer>
    </div>
  );
};
