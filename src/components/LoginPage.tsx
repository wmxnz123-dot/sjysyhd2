import React, { useState, useEffect } from 'react';
import img02Asset from '../data/img02.png';
import {
  Layers,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Smartphone,
  KeyRound,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (userInfo: { name: string; department: string; role: string }) => void;
  onBackToPortal?: () => void;
}

type LoginTab = 'account' | 'phone';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBackToPortal }) => {
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

          {onBackToPortal && (
            <button
              type="button"
              onClick={onBackToPortal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-slate-600 hover:text-blue-600 text-xs font-medium transition-all cursor-pointer shadow-2xs"
              id="login-back-to-portal-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回工作门户</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="w-full max-w-[1140px] min-h-[570px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto">
          {/* Left Decorative & Info Panel (7 cols on lg - wider) */}
          <div className="lg:col-span-7 bg-[#0B1E3E] text-white p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            {/* Top Branding Section: Two-line title, breathable spacing, seamlessly connecting to diagram below */}
            <div className="relative z-10 shrink-0 mb-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/15 text-blue-300 text-xs font-semibold border border-blue-400/25 mb-2 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>全生命周期一网通办</span>
              </div>
              <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-black tracking-wide text-white mb-1.5 leading-snug drop-shadow-sm">
                全链路数据要素
                <br />
                业务集约协同中枢
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-300/80 leading-relaxed max-w-[560px]">
                纵向贯通采集治理，横向协同开发流通与资产运营，驱动数据要素全生命周期价值释放。
              </p>
            </div>

            {/* Left Visual Asset: Borderless, natural blend directly with the left panel's continuous deep-navy background */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2 px-0 overflow-hidden min-h-[340px]">
              <img
                src={img02Asset || '/img02.png'}
                alt="全链路数据要素业务集约协同中枢架构全景"
                className="w-full h-auto max-h-[410px] object-contain select-none transition-transform duration-300"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/img02.png') {
                    target.src = '/img02.png';
                  }
                }}
              />
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
