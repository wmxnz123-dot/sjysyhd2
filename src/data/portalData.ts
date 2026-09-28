import { LifecycleStage, SystemItem, TodoTask, RecentVisitItem, SystemNotification } from '../types';

export const ALL_SYSTEMS: SystemItem[] = [
  // 1. 汇聚：物联网感知平台、视频融合与分析平台
  {
    id: 'iot-sensing',
    name: '物联网感知平台',
    stageId: 'collection',
    stageName: '数据采集与多源汇聚',
    stageOrder: 1,
    description: '全域IoT物联传感设备接入、多协议适配与高频时序数据标准化采集汇聚。',
    coreCapability: '全域物联感知采集',
    capabilityTags: ['IoT物联接入', '时序引擎', '边缘采集', '设备纳管'],
    iconName: 'Radio',
    status: 'online',
    recentActiveUsers: 142,
    version: 'v4.1.0',
    popularFeatures: ['海量高并发设备网关', '多协议适配器', '物联数据清洗流处理'],
    routePath: '/systems/iot-sensing'
  },
  {
    id: 'video-fusion',
    name: '视频融合与分析平台',
    stageId: 'collection',
    stageName: '数据采集与多源汇聚',
    stageOrder: 1,
    description: '汇聚城乡全域视音频监控流，提供视音频转码、时空流解析与AI智能结构化分析。',
    coreCapability: '视频流智能融合分析',
    capabilityTags: ['视音频流汇聚', '智能结构化', '时空视频解析', 'AI边缘推断'],
    iconName: 'Video',
    status: 'online',
    recentActiveUsers: 215,
    version: 'v3.5.2',
    popularFeatures: ['GB28181国标接入', '实时车流人流检测', '多视角融合全景追踪'],
    routePath: '/systems/video-fusion'
  },

  // 2. 治理：数据资源治理平台、数据标注平台、CIM 城市信息模型平台
  {
    id: 'data-governance',
    name: '数据资源治理平台',
    stageId: 'governance',
    stageName: '数据资源治理底座',
    stageOrder: 2,
    description: '全域统一数据治理核心底座，纳管全域元数据、端到端血缘与数据质量标准。',
    coreCapability: '统一数据治理底座',
    capabilityTags: ['统一治理底座', '元数据拓扑', '质量稽核', '标准规范'],
    iconName: 'ShieldCheck',
    status: 'online',
    recentActiveUsers: 368,
    version: 'v6.2.0',
    popularFeatures: ['端到端全链路血缘图谱', '多维数据质量检核引擎', '敏感数据自动分级分类'],
    routePath: '/systems/data-governance'
  },
  {
    id: 'cim-model',
    name: 'CIM 城市信息模型平台',
    stageId: 'governance',
    stageName: '数据资源治理底座',
    stageOrder: 2,
    description: '集成BIM/GIS多源三维时空模型，构建全要素数字孪生时空底板与空间数据治理。',
    coreCapability: '数字孪生三维时空底板',
    capabilityTags: ['CIM时空底座', 'BIM/GIS融合', '数字孪生', '空间拓扑治理'],
    iconName: 'Building2',
    status: 'online',
    recentActiveUsers: 189,
    version: 'v2.8.0',
    popularFeatures: ['城市级高精度时空底板', '地上地下一体化呈现', '三维空间数据质量校验'],
    routePath: '/systems/cim-model'
  },
  {
    id: 'data-annotation',
    name: '数据标注平台',
    stageId: 'governance',
    stageName: '数据资源治理底座',
    stageOrder: 2,
    description: '面向大模型与机器视觉，提供多模态数据清洗、人机协作标注与高质量语料库沉淀。',
    coreCapability: '高质量训练集加工',
    capabilityTags: ['高质量语料集', '多模态标注', '人机协同校验', 'RLHF数据集'],
    iconName: 'Tag',
    status: 'online',
    recentActiveUsers: 176,
    version: 'v2.4.0',
    popularFeatures: ['大模型智能辅助预标注', '多轮对话问答质检', '音视频时序高精切片'],
    routePath: '/systems/data-annotation'
  },

  // 3. 开发利用：融合应用开发平台、协作开发平台、数据沙箱平台、EvayBI平台（BI可视化分析工具）、智能体开发平台（AI算法服务平台）
  {
    id: 'fusion-app',
    name: '融合应用开发平台',
    stageId: 'development',
    stageName: '数据价值开发利用',
    stageOrder: 3,
    description: '提供多源业务数据融合构建与低代码应用搭建环境，快速孵化跨部门业务应用。',
    coreCapability: '多源业务敏捷融合开发',
    capabilityTags: ['融合应用构建', '低代码编排', '服务流集成', '敏捷业务交付'],
    iconName: 'AppWindow',
    status: 'online',
    recentActiveUsers: 198,
    version: 'v3.1.0',
    popularFeatures: ['可视化业务流编排', '跨系统数据融合画布', '一键微前端应用打包发布'],
    routePath: '/systems/fusion-app'
  },
  {
    id: 'dev-collaboration',
    name: '协作开发平台',
    stageId: 'development',
    stageName: '数据价值开发利用',
    stageOrder: 3,
    description: '面向数仓与算法工程师的云端协作IDE，支持多租户协同编码与复杂DAG调度。',
    coreCapability: '云端协作开发',
    capabilityTags: ['云端协作开发', 'SQL/Python IDE', 'DAG任务调度', '敏捷集成'],
    iconName: 'Code2',
    status: 'online',
    recentActiveUsers: 245,
    version: 'v4.5.0',
    popularFeatures: ['Web端多引擎SQL工作台', '可视化DAG任务编排', 'Git版本协作流'],
    routePath: '/systems/dev-collaboration'
  },
  {
    id: 'data-sandbox',
    name: '数据沙箱平台',
    stageId: 'development',
    stageName: '数据价值开发利用',
    stageOrder: 3,
    description: '高规格安全隔离计算环境，实现原始数据“可用不可见、可用不可存、可控可计量”。',
    coreCapability: '安全密态计算',
    capabilityTags: ['安全密态计算', '沙箱沙盒隔离', '可用不可见', '动态脱敏审计'],
    iconName: 'Box',
    status: 'online',
    recentActiveUsers: 112,
    version: 'v2.1.0',
    popularFeatures: ['网络物理隔离隔离区', '代码带入与结果带出审计', '动态水印与行为溯源'],
    routePath: '/systems/data-sandbox'
  },
  {
    id: 'evay-bi',
    name: 'EvayBI平台（BI可视化分析工具）',
    stageId: 'development',
    stageName: '数据价值开发利用',
    stageOrder: 3,
    description: '企业级敏捷BI可视化分析中枢，支持毫秒级百亿数据多维OLAP与交互式领导驾驶舱。',
    coreCapability: '敏捷BI可视化大屏',
    capabilityTags: ['敏捷多维分析', '领导驾驶舱', '即席OLAP', '自动化指标监控'],
    iconName: 'BarChart3',
    status: 'online',
    recentActiveUsers: 450,
    version: 'v5.8.0',
    popularFeatures: ['拖拽式大屏可视化画布', '智能自然语言查数(NL2SQL)', '多维联动下钻分析'],
    routePath: '/systems/evay-bi'
  },
  {
    id: 'agent-dev',
    name: '智能体开发平台（AI算法服务平台）',
    stageId: 'development',
    stageName: '数据价值开发利用',
    stageOrder: 3,
    description: '企业级大模型应用与智能体工厂，支持知识库向量检索RAG、工作流编排与算法服务发布。',
    coreCapability: '大模型应用与智能体编排',
    capabilityTags: ['大模型智能体', '算法服务工程', '企业级RAG', '多模态Prompt工程'],
    iconName: 'Bot',
    status: 'online',
    recentActiveUsers: 310,
    version: 'v2.0.0',
    popularFeatures: ['全模态大模型Prompt协同编排', '企业私有知识库RAG引擎', '智能体工作流可视化调试'],
    routePath: '/systems/agent-dev'
  },

  // 4. 流通：数据流通服务平台、可信数据空间、数据服务平台、数据资产管理平台
  {
    id: 'data-circulation',
    name: '数据流通服务平台',
    stageId: 'circulation',
    stageName: '数据要素合规流通',
    stageOrder: 4,
    description: '提供数据要素跨机构确权流通、合规审查撮合、合约履约存证与交易结算服务。',
    coreCapability: '要素流通撮合与履约',
    capabilityTags: ['要素流转服务', '合规合约签署', '区块链存证', '全流程审计追踪'],
    iconName: 'Share2',
    status: 'online',
    recentActiveUsers: 228,
    version: 'v3.0.0',
    popularFeatures: ['跨域要素交易撮合撮合', '智能合约自动履约', '区块链全链路存证'],
    routePath: '/systems/data-circulation'
  },
  {
    id: 'trusted-data-space',
    name: '可信数据空间',
    stageId: 'circulation',
    stageName: '数据要素合规流通',
    stageOrder: 4,
    description: '遵循国家数据基础设施规范的可信互通空间，提供联邦计算、区块链跨域存证与安全连接器。',
    coreCapability: '跨主体安全可信流通',
    capabilityTags: ['可信数据空间', '隐私计算网络', '联邦互联', '数据使用控制'],
    iconName: 'Network',
    status: 'online',
    recentActiveUsers: 195,
    version: 'v2.5.0',
    popularFeatures: ['空间连接器Connector快速入网', '联邦学习隐私联合建模', '数据使用限制动态控制'],
    routePath: '/systems/trusted-data-space'
  },
  {
    id: 'data-service',
    name: '数据服务平台',
    stageId: 'circulation',
    stageName: '数据要素合规流通',
    stageOrder: 4,
    description: '企业级统一数据API共享中枢，提供零代码服务封装、高并发弹性网关与精细化计量计费。',
    coreCapability: '高并发数据API网关',
    capabilityTags: ['统一API网关', '零代码API生成', '高并发熔断限流', '多协议适配'],
    iconName: 'Send',
    status: 'online',
    recentActiveUsers: 380,
    version: 'v5.1.0',
    popularFeatures: ['SQL一键零代码发布RESTful API', '服务网关弹性熔断限流', '全量调用鉴权日志审计'],
    routePath: '/systems/data-service'
  },
  {
    id: 'data-asset',
    name: '数据资产管理平台',
    stageId: 'circulation',
    stageName: '数据要素合规流通',
    stageOrder: 4,
    description: '贯通数据资产盘点、估值模型、权属确权与入表审计，赋能数据要素资产化与资本化运作。',
    coreCapability: '数据一站式入表确权',
    capabilityTags: ['数据资产入表', '价值评估模型', '确权登记证书', '合规审计凭证'],
    iconName: 'BadgeCent',
    status: 'online',
    recentActiveUsers: 172,
    version: 'v3.2.0',
    popularFeatures: ['数据资产收益分成与估值计算', '财务入表全流程合规审计', '资产确权凭证与上架交易'],
    routePath: '/systems/data-asset'
  }
];

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'collection',
    order: 1,
    name: '数据采集与多源汇聚',
    subtitle: '多源感知 · 视频物联',
    description: '打通跨域网络、全网IoT物联感知与视频监控信源，实现全域全模态动态数据统一接入。',
    keyAction: '建立稳定可靠的多源数据输入管道',
    iconName: 'Radio',
    accentColor: '#1d4ed8', // blue-700
    accentBg: '#eff6ff',    // blue-50
    accentBorder: '#bfdbfe',// blue-200
    badgeBg: '#dbeafe',     // blue-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'collection')
  },
  {
    id: 'governance',
    order: 2,
    name: '数据资源治理底座',
    subtitle: '标准规范 · 时空孪生',
    description: '构建全域统一数据治理底座、端到端元数据血缘、全周期质量稽核与CIM城市三维时空模型。',
    keyAction: '将原始杂乱数据转化为高质量标准资产与空间底座',
    iconName: 'Database',
    accentColor: '#0891b2', // cyan-600
    accentBg: '#ecfeff',    // cyan-50
    accentBorder: '#a5f3fc',// cyan-200
    badgeBg: '#cffafe',     // cyan-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'governance')
  },
  {
    id: 'development',
    order: 3,
    name: '数据价值开发利用',
    subtitle: '安全计算 · 智算赋能',
    description: '提供云端协作IDE、密态安全沙箱、大模型智能体编排与敏捷BI多维可视化分析利用工具。',
    keyAction: '激活数据生产力，实现算法、模型与业务融合',
    iconName: 'Cpu',
    accentColor: '#4f46e5', // indigo-600
    accentBg: '#eef2ff',    // indigo-50
    accentBorder: '#c7d2fe',// indigo-200
    badgeBg: '#e0e7ff',     // indigo-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'development')
  },
  {
    id: 'circulation',
    order: 4,
    name: '数据要素合规流通',
    subtitle: '隐私计算 · 资产入表',
    description: '依托可信数据空间与要素流通服务，推进高并发API安全共享与数据资产化一站式合规入表。',
    keyAction: '保障数据在安全合规边界下跨主体跨机构可信流通',
    iconName: 'Network',
    accentColor: '#059669', // emerald-600
    accentBg: '#ecfdf5',    // emerald-50
    accentBorder: '#a7f3d0',// emerald-200
    badgeBg: '#d1fae5',     // emerald-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'circulation')
  }
];

export const INITIAL_FAVORITE_SYSTEM_IDS = [
  'data-governance',
  'agent-dev',
  'trusted-data-space',
  'evay-bi'
];

export const INITIAL_RECENT_VISITS: RecentVisitItem[] = [
  {
    id: 'rec-1',
    systemId: 'data-governance',
    systemName: '数据资源治理平台',
    stageName: '数据资源治理底座',
    visitedAt: '20分钟前',
    actionSummary: '复核【核心户籍与企业法人】数据质量稽核报告'
  },
  {
    id: 'rec-2',
    systemId: 'evay-bi',
    systemName: 'EvayBI平台（BI可视化分析工具）',
    stageName: '数据价值开发利用',
    visitedAt: '1小时前',
    actionSummary: '导出【全省数据要素利用效能总览】交互式大屏'
  },
  {
    id: 'rec-3',
    systemId: 'trusted-data-space',
    systemName: '可信数据空间',
    stageName: '数据要素合规流通',
    visitedAt: '2小时前',
    actionSummary: '签署【普惠金融信贷联合风控】数据使用合约'
  },
  {
    id: 'rec-4',
    systemId: 'agent-dev',
    systemName: '智能体开发平台（AI算法服务平台）',
    stageName: '数据价值开发利用',
    visitedAt: '3小时前',
    actionSummary: '优化【企业政策智能问答知识库】Agent微调参数'
  }
];

export const INITIAL_TODOS: TodoTask[] = [
  // 待审核 (2)
  {
    id: 'todo-audit-1',
    title: '【跨域数据流通】普惠金融可信计算空间准入申请',
    type: 'audit',
    typeLabel: '待审核',
    priority: 'high',
    systemId: 'trusted-data-space',
    systemName: '可信数据空间',
    time: '30分钟前提交',
    applicant: '市大数据局 · 金融创新专班',
    description: '申请方申请使用可信数据空间密态环境进行银企风险数据联合计算，需核验数据合约与合规边界。',
    deadline: '今天 18:00 前处理'
  },
  {
    id: 'todo-audit-2',
    title: '【数据资产管理】智慧交通客流特征集资产化合规审核',
    type: 'audit',
    typeLabel: '待审核',
    priority: 'medium',
    systemId: 'data-asset',
    systemName: '数据资产管理平台',
    time: '2小时前',
    applicant: '交投集团 · 资产管理部',
    description: '申请将2025年度交通客流特征集进行无形资产登记与上架，需确认成本归集清单与法律权属声明。',
    deadline: '明日 12:00 前'
  },

  // 待处理 (2)
  {
    id: 'todo-proc-1',
    title: '【数据质量破损】核心户籍表身份证格式校验异常38条',
    type: 'process',
    typeLabel: '待处理',
    priority: 'high',
    systemId: 'data-governance',
    systemName: '数据资源治理平台',
    time: '1小时前',
    description: '今日凌晨自动跑批质量稽核规则触发阻断告警，需进入质量工作台复核脏数据原因并执行清洗规则。',
    deadline: '今日 14:00'
  },
  {
    id: 'todo-proc-2',
    title: '【服务网关限流】公共数据API接口调用频次达峰值阈值85%',
    type: 'process',
    typeLabel: '待处理',
    priority: 'medium',
    systemId: 'data-service',
    systemName: '数据服务平台',
    time: '4小时前',
    description: '文旅节假日客流查询接口QPS突破3200，建议临时扩展弹性网关节点并调高限流配额。',
    deadline: '今日 17:00'
  },

  // 我的申请 (1)
  {
    id: 'todo-apply-1',
    title: '【高算力申请】申请开通4卡A100数据沙箱AI模型训练环境',
    type: 'apply',
    typeLabel: '我的申请',
    priority: 'high',
    systemId: 'data-sandbox',
    systemName: '数据沙箱平台',
    time: '昨日申请',
    description: '当前状态：算力调度中心【审批中】，预计耗时4小时，用于大模型智能体微调任务。',
    deadline: '审批中'
  },

  // 我的任务 (4)
  {
    id: 'todo-task-1',
    title: '完成《2026年Q1数据要素全链路治理与流转评估报告》',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'high',
    systemId: 'evay-bi',
    systemName: 'EvayBI平台（BI可视化分析工具）',
    time: '进行中 (已完成 75%)',
    description: '需拉取治理平台稽核合格率与流通平台结算数据，生成大屏看板并导出PDF报表。',
    deadline: '明日 18:00'
  },
  {
    id: 'todo-task-2',
    title: '优化企业招商知识库智能体 Prompt编排与RAG召回率',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'medium',
    systemId: 'agent-dev',
    systemName: '智能体开发平台（AI算法服务平台）',
    time: '进行中 (已完成 50%)',
    description: '针对政策文档分块粒度进行调优，将准确率从82%提升至95%以上。',
    deadline: '本周五'
  },
  {
    id: 'todo-task-3',
    title: '协调CIM城市信息模型地上地下管网三维空间拓扑校验',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'medium',
    systemId: 'cim-model',
    systemName: 'CIM 城市信息模型平台',
    time: '排期待定',
    description: '协调住建与规划测绘单位，复核地下综合管廊BIM空间数据合规性。',
    deadline: '下周二'
  },
  {
    id: 'todo-task-4',
    title: '检查融合应用平台生产环境业务流依赖与接口健康度',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'low',
    systemId: 'fusion-app',
    systemName: '融合应用开发平台',
    time: '例行业务',
    description: '梳理跨部门一网协同审批流，清理历史废弃临时编排与无引用服务。',
    deadline: '本月内'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: '可信数据空间节点网络完成例行安全升级',
    content: '全部6个联邦学习参与方节点已平稳切换至 TLS 1.3 密态传输协议，服务无中断。',
    type: 'system',
    time: '10分钟前',
    isRead: false,
    relatedSystem: '可信数据空间'
  },
  {
    id: 'notif-2',
    title: '您提交的【政务数据资源目录】新版已通过备案审核',
    content: '市数据局已通过目录审核，新增18个公共服务接口已自动上线至数据服务平台。',
    type: 'task',
    time: '1小时前',
    isRead: false,
    relatedSystem: '数据服务平台'
  },
  {
    id: 'notif-3',
    title: '安全巡检提醒：建议及时开展季度敏感数据权限清退',
    content: '检测到有3位跨部门借调人员账号已超过30天未登录数据沙箱，建议依照安全规范回收权限。',
    type: 'security',
    time: '3小时前',
    isRead: true,
    relatedSystem: '数据沙箱平台'
  }
];
