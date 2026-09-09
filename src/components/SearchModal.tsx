import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Command,
  FileCheck2,
  Workflow,
  Star,
  CornerDownLeft
} from 'lucide-react';
import { SystemItem, TodoTask } from '../types';
import { IconHelper } from './IconHelper';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  systems: SystemItem[];
  todos: TodoTask[];
  onSelectSystem: (system: SystemItem) => void;
  onSelectTodo: (task: TodoTask) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  systems,
  todos,
  onSelectSystem,
  onSelectTodo
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingSystems = q
    ? systems.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.coreCapability.toLowerCase().includes(q) ||
          s.stageName.toLowerCase().includes(q) ||
          s.capabilityTags.some(t => t.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
      )
    : systems.slice(0, 6);

  const matchingTodos = q
    ? todos.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.systemName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="输入系统名称、能力关键词、业务待办或资产标签..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-none text-slate-900 placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
            ESC 退出
          </div>
        </div>

        {/* Quick Tag Recommendations when empty */}
        {!q && (
          <div className="p-3.5 bg-blue-50/30 border-b border-slate-100 flex items-center gap-2 text-xs text-slate-600 flex-wrap">
            <span className="text-slate-400">热搜能力:</span>
            {['统一治理底座', '数据一站式入表', '合规数据流通', '在线开发环境', '物联采集', 'API服务'].map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
          {/* Matching Systems */}
          <div className="p-3">
            <div className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>{q ? `匹配系统 (${matchingSystems.length})` : '推荐快捷系统'}</span>
              <span className="text-[10px] text-slate-400">回车进入</span>
            </div>
            {matchingSystems.length > 0 ? (
              <div className="mt-1 space-y-1">
                {matchingSystems.map(system => (
                  <div
                    key={system.id}
                    onClick={() => {
                      onSelectSystem(system);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <IconHelper name={system.iconName} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 flex items-center gap-2">
                          <span>{system.name}</span>
                          <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-normal">
                            {system.stageName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {system.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <span>进入</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                未找到匹配的系统，请尝试更换关键词
              </div>
            )}
          </div>

          {/* Matching Todos / Tasks */}
          {matchingTodos.length > 0 && (
            <div className="p-3 bg-slate-50/50">
              <div className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                匹配的工作待办 ({matchingTodos.length})
              </div>
              <div className="mt-1 space-y-1">
                {matchingTodos.map(task => (
                  <div
                    key={task.id}
                    onClick={() => {
                      onSelectTodo(task);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                          {task.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          所属: {task.systemName} · {task.time}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      查看办理
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]">↑↓</kbd>
              选择
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]">↵</kbd>
              进入
            </span>
          </div>
          <span>数据要素全链路智能检索中心</span>
        </div>
      </div>
    </div>
  );
};
