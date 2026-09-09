import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Database,
  Layers,
  ArrowRight,
  ShieldCheck,
  Tag,
  ExternalLink
} from 'lucide-react';
import { SystemItem } from '../types';

interface DataCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSystem: (systemId: string) => void;
}

interface CatalogAsset {
  id: string;
  name: string;
  stageName: string;
  systemName: string;
  systemId: string;
  domain: string;
  volume: string;
  securityLevel: string;
  updateFreq: string;
  description: string;
}

const MOCK_ASSETS: CatalogAsset[] = [
  {
    id: 'ast-1',
    name: '全省法人单位基础信用信息库',
    stageName: '数据存储与治理',
    systemName: '天枢数据治理平台',
    systemId: 'tianshu-governance',
    domain: '市场监管 / 信用',
    volume: '2,840 万条',
    securityLevel: '商密二级',
    updateFreq: '实时CDC同步',
    description: '汇聚工商注册、税务评级、行政处罚、司法涉诉等多维企业主体全景信用指标库。'
  },
  {
    id: 'ast-2',
    name: '普惠金融信贷多方联合建模特征集',
    stageName: '数据开发与利用',
    systemName: '数据沙箱平台',
    systemId: 'data-sandbox',
    domain: '金融服务 / 风控',
    volume: '150 个特征维度',
    securityLevel: '密态计算专区',
    updateFreq: '按日更新',
    description: '通过密态沙箱隔离计算，融合社保流水与银联支付交易衍生指标，数据可用不可见。'
  },
  {
    id: 'ast-3',
    name: '全域智慧交通客流时空轨迹数据集',
    stageName: '数据可信流通',
    systemName: '可信数据空间',
    systemId: 'trusted-data-space',
    domain: '智慧交通 / 空间',
    volume: '4.2 TB',
    securityLevel: '合规合约流通',
    updateFreq: '每15分钟批次',
    description: '脱敏后的地铁、公交与网约车客流起止点OD矩阵，用于城市运力调配与商业选址。'
  },
  {
    id: 'ast-4',
    name: '工业母机传感器时序运行遥测数据',
    stageName: '数据采集与汇聚',
    systemName: '物联网平台',
    systemId: 'iot-platform',
    domain: '先进制造 / 物联',
    volume: '8.6 亿条测点',
    securityLevel: '工业内部密级',
    updateFreq: '秒级流上报',
    description: '纳管全区高精数控机床振动、温度、电流主轴高频测点，赋能预测性维护。'
  },
  {
    id: 'ast-5',
    name: '医疗脱敏影像与病理特征资产集 (入表评估中)',
    stageName: '数据运营与服务',
    systemName: '数据资产入表平台',
    systemId: 'data-asset',
    domain: '医疗健康 / 资产',
    volume: '12 万例',
    securityLevel: '入表合规审计',
    updateFreq: '季度确权',
    description: '完成法律权属确权与三方价值评估，已进入2026年度无形资产合规入表核算流程。'
  }
];

export const DataCatalogModal: React.FC<DataCatalogModalProps> = ({
  isOpen,
  onClose,
  onJumpToSystem
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = MOCK_ASSETS.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDomain = selectedDomain === 'all' || item.domain.includes(selectedDomain);
    return matchSearch && matchDomain;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">统一数据要素目录</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 font-medium">
                  3,428 个要素项
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                全生命周期贯通：查目录、找资产、看血缘、一键穿透对应系统
              </p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="搜索数据资源名称、主题域、密级..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs shrink-0 overflow-x-auto w-full sm:w-auto">
            <span className="text-slate-500">主题:</span>
            {['all', '信用', '风控', '交通', '物联', '医疗'].map(dom => (
              <button
                key={dom}
                type="button"
                onClick={() => setSelectedDomain(dom)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedDomain === dom
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {dom === 'all' ? '全部' : dom}
              </button>
            ))}
          </div>
        </div>

        {/* Assets List */}
        <div className="p-5 max-h-96 overflow-y-auto divide-y divide-slate-100 space-y-3">
          {filtered.map(asset => (
            <div
              key={asset.id}
              className="pt-3 first:pt-0 hover:bg-slate-50/80 p-3 rounded-xl transition-colors border border-slate-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {asset.name}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {asset.domain}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {asset.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onJumpToSystem(asset.systemId);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                >
                  <span>在【{asset.systemName}】查看</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                <span>所属阶段: {asset.stageName}</span>
                <span>数据规模: {asset.volume}</span>
                <span>更新频率: {asset.updateFreq}</span>
                <span className="text-emerald-700 font-medium">
                  密级: {asset.securityLevel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>共筛选出 {filtered.length} 个核心要素资源</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 font-medium cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
