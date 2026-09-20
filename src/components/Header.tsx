import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ExternalLink,
  CheckCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  LogOut,
  UserCheck,
  LogIn,
  User
} from 'lucide-react';
import { SystemItem, SystemNotification } from '../types';
import { IconHelper } from './IconHelper';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSearchModal: () => void;
  systems: SystemItem[];
  onSelectSystem: (system: SystemItem) => void;
  notifications: SystemNotification[];
  onMarkNotificationsRead: () => void;
  onQuickNavigate?: (targetId: string) => void;
  onOpenFavoriteDrawer?: () => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; department: string; role: string } | null;
  onLogout?: () => void;
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  systems,
  onSelectSystem,
  notifications,
  onMarkNotificationsRead,
  onQuickNavigate,
  onOpenFavoriteDrawer,
  isLoggedIn = false,
  currentUser,
  onLogout,
  onOpenLogin
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Filter systems for inline search dropdown
  const filteredSystems = searchQuery.trim()
    ? systems.filter(
        s =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.coreCapability.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.capabilityTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          s.stageName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo and System Title */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-xl flex items-center justify-center shadow-xs">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    数据要素集约协同中枢门户
                  </span>
                  <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    全链路综合中枢
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:block tracking-wider">
                  DATA ELEMENT INTENSIVE COLLABORATION PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Global Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-md mx-4 sm:mx-8 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="搜索系统..."
                className="w-full bg-slate-100 border-none rounded-full py-1.5 pl-10 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button
                  type="button"
                  onClick={onOpenSearchModal}
                  title="打开全局搜索面板"
                  className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white hover:bg-slate-50 rounded-full border border-slate-200 transition-colors cursor-pointer"
                >
                  ⌘K
                </button>
              </div>
            </div>

            {/* Quick dropdown when typing in search input */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span>匹配系统 ({filteredSystems.length})</span>
                  <button
                    onClick={onOpenSearchModal}
                    className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    查看全部结果
                  </button>
                </div>
                {filteredSystems.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {filteredSystems.map(system => (
                      <div
                        key={system.id}
                        onClick={() => {
                          onSelectSystem(system);
                          setIsSearchFocused(false);
                        }}
                        className="px-3.5 py-2.5 hover:bg-blue-50/70 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                            <IconHelper name={system.iconName} className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800 group-hover:text-blue-700 flex items-center gap-1.5">
                              {system.name}
                              <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 font-normal">
                                {system.coreCapability}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {system.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>进入</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    未找到匹配系统，建议输入“治理”、“API”、“沙箱”、“入表”等关键词
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Notification Center */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="消息通知"
                id="header-notification-btn"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-800">
                        通知中心
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                          {unreadCount} 条未读
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkNotificationsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        全部已读
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {notifications.map(item => (
                      <div
                        key={item.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors ${
                          !item.isRead ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {item.content}
                        </p>
                        {item.relatedSystem && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                              关联: {item.relatedSystem}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer"
                    >
                      关闭
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login Button */}
            <div className="relative pl-3 border-l border-slate-200">
              {isLoggedIn && currentUser ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                    id="header-user-menu-btn"
                  >
                    <div className="hidden sm:block text-right">
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 flex items-center justify-end gap-1">
                        <span>{currentUser.name}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-400 leading-none mt-0.5">
                        {currentUser.department}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-200 overflow-hidden flex items-center justify-center text-white font-bold text-xs shadow-2xs">
                      {currentUser.name.slice(0, 1)}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3.5 py-2.5 border-b border-slate-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{currentUser.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100 font-normal">
                            已登录
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          部门：{currentUser.department}
                        </div>
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <UserCheck className="w-3 h-3" />
                          {currentUser.role}
                        </div>
                      </div>
                      <div className="pt-1">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            onLogout?.();
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium transition-colors"
                          id="btn-logout-header"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          退出登录
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  id="header-login-btn"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>登录</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
