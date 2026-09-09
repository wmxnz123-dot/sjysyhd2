/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ALL_SYSTEMS,
  LIFECYCLE_STAGES,
  INITIAL_FAVORITE_SYSTEM_IDS,
  INITIAL_RECENT_VISITS,
  INITIAL_TODOS,
  INITIAL_NOTIFICATIONS
} from './data/portalData';
import { SystemItem, TodoTask, RecentVisitItem, SystemNotification } from './types';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { FavoriteSection } from './components/FavoriteSection';
import { LifecycleFlowSection } from './components/LifecycleFlowSection';
import { SystemModal } from './components/SystemModal';
import { TodoDetailModal } from './components/TodoDetailModal';
import { SearchModal } from './components/SearchModal';
import { LoginPage } from './components/LoginPage';
import { CheckCircle, Info, Shield, Layers, Globe } from 'lucide-react';

export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portal_is_logged_in');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    department: string;
    role: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('portal_current_user');
      return saved
        ? JSON.parse(saved)
        : {
            name: '张明工',
            department: '市数据要素联合专班 · 综合科',
            role: '全域系统联通权限 (超管级)'
          };
    } catch {
      return {
        name: '张明工',
        department: '市数据要素联合专班 · 综合科',
        role: '全域系统联通权限 (超管级)'
      };
    }
  });

  // Global search input in header
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Favorites (persisted in localStorage if available)
  const [favoriteSystemIds, setFavoriteSystemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portal_favorite_systems');
      return saved ? JSON.parse(saved) : INITIAL_FAVORITE_SYSTEM_IDS;
    } catch {
      return INITIAL_FAVORITE_SYSTEM_IDS;
    }
  });

  // State for Recent Visits
  const [recentVisits, setRecentVisits] = useState<RecentVisitItem[]>(() => {
    try {
      const saved = localStorage.getItem('portal_recent_visits');
      return saved ? JSON.parse(saved) : INITIAL_RECENT_VISITS;
    } catch {
      return INITIAL_RECENT_VISITS;
    }
  });

  // State for Work Tasks
  const [todos, setTodos] = useState<TodoTask[]>(() => {
    try {
      const saved = localStorage.getItem('portal_todos');
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch {
      return INITIAL_TODOS;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [activeSystemModal, setActiveSystemModal] = useState<SystemItem | null>(null);
  const [activeTaskModal, setActiveTaskModal] = useState<TodoTask | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_favorite_systems', JSON.stringify(favoriteSystemIds));
    } catch {
      // ignore
    }
  }, [favoriteSystemIds]);

  // Save recent visits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_recent_visits', JSON.stringify(recentVisits));
    } catch {
      // ignore
    }
  }, [recentVisits]);

  // Save todos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_todos', JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  // Listen to ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle favorite system
  const handleToggleFavorite = (systemId: string) => {
    const system = ALL_SYSTEMS.find(s => s.id === systemId);
    if (favoriteSystemIds.includes(systemId)) {
      setFavoriteSystemIds(prev => prev.filter(id => id !== systemId));
      showToast(`已从常用系统移出：${system?.name || ''}`);
    } else {
      setFavoriteSystemIds(prev => [...prev, systemId]);
      showToast(`已成功添加至常用系统：${system?.name || ''}`);
    }
  };

  // Enter / Launch system
  const handleEnterSystem = (system: SystemItem) => {
    setActiveSystemModal(system);
  };

  const handleConfirmLaunch = (system: SystemItem) => {
    // Record into recent visits
    const newVisit: RecentVisitItem = {
      id: `rec-${Date.now()}`,
      systemId: system.id,
      systemName: system.name,
      stageName: system.stageName,
      visitedAt: '刚刚',
      actionSummary: `访问【${system.name}】并执行业务操作`
    };

    setRecentVisits(prev => {
      const filtered = prev.filter(p => p.systemId !== system.id);
      return [newVisit, ...filtered].slice(0, 6);
    });

    showToast(`正在通过统一SSO单点登录启动【${system.name}】...`);
  };

  // Quick complete task
  const handleQuickCompleteTask = (taskId: string) => {
    setTodos(prev => prev.filter(t => t.id !== taskId));
    showToast('事项已成功标记完成并归档');
  };

  // Smooth scroll helper
  const handleQuickNavigate = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = (user: { name: string; department: string; role: string }) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('portal_is_logged_in', 'true');
      localStorage.setItem('portal_current_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    showToast(`欢迎回来，${user.name}！已安全登入工作门户`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.setItem('portal_is_logged_in', 'false');
    } catch {
      // ignore
    }
    showToast('已安全退出当前会话并注销 SSO 凭证');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const favoriteSystems = ALL_SYSTEMS.filter(s => favoriteSystemIds.includes(s.id));

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        systems={ALL_SYSTEMS}
        onSelectSystem={handleEnterSystem}
        notifications={notifications}
        onMarkNotificationsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
          showToast('全部通知已标记为已读');
        }}
        onQuickNavigate={handleQuickNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. Welcome Area */}
        <WelcomeBanner userName={currentUser.name} />

        {/* 2. 我收藏的系统 (Placed above full lifecycle) */}
        <FavoriteSection
          favoriteSystems={favoriteSystems}
          onToggleFavorite={handleToggleFavorite}
          onEnterSystem={handleEnterSystem}
        />

        {/* 3. Data Element Full-Lifecycle - Core Visual Centerpiece */}
        <LifecycleFlowSection
          stages={LIFECYCLE_STAGES}
          favoriteSystemIds={favoriteSystemIds}
          onToggleFavorite={handleToggleFavorite}
          onEnterSystem={handleEnterSystem}
          searchFilter={searchQuery}
        />
      </main>

      {/* Enterprise Platform Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-700 text-white flex items-center justify-center font-bold text-[10px]">
              数
            </div>
            <span className="font-semibold text-slate-700">数据要素全链路工作门户</span>
            <span className="text-slate-300">|</span>
            <span>国家数据局与省市综合数据要素基础设施联通规范</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              商用密码二级等保已合规
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              统一身份认证 SSO v3.2
            </span>
            <span>© 2026 数据要素联合工作专班</span>
          </div>
        </div>
      </footer>

      {/* Dialog Modals */}
      <SystemModal
        system={activeSystemModal}
        isOpen={!!activeSystemModal}
        onClose={() => setActiveSystemModal(null)}
        onConfirmEnter={handleConfirmLaunch}
      />

      <TodoDetailModal
        task={activeTaskModal}
        isOpen={!!activeTaskModal}
        onClose={() => setActiveTaskModal(null)}
        onComplete={handleQuickCompleteTask}
        onJumpToSystem={systemId => {
          const s = ALL_SYSTEMS.find(item => item.id === systemId);
          if (s) handleEnterSystem(s);
        }}
        allSystems={ALL_SYSTEMS}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        systems={ALL_SYSTEMS}
        todos={todos}
        onSelectSystem={handleEnterSystem}
        onSelectTodo={task => setActiveTaskModal(task)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
