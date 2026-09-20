import { LifecycleStage, SystemItem, TodoTask, RecentVisitItem, SystemNotification } from '../types';

export const ALL_SYSTEMS: SystemItem[] = [
  // 第一阶段：数据采集与汇聚
  {
    id: 'data-reporting',
    name: '数据填报平台',
    stageId: 'collection',
    stageName: '数据采集与汇聚',
    stageOrder: 1,
    description: '提供低代码表单设计与多部门协同数据填报归集。',
    coreCapability: '数据填报',
    capabilityTags: ['数据填报', '智能校验', '多级流转', '协同录入'],
    iconName: 'FileSpreadsheet',
    status: 'online',
    recentActiveUsers: 89,
    version: 'v3.2.1',
    popularFeatures: ['动态表单生成器', 'excel批量导入校验', '移动端填报分发'],
    routePath: '/systems/data-reporting'
  },

  // 第二阶段：数据存储与治理
  {
    id: 'tianshu-governance',
    name: '天枢数据治理平台',
    stageId: 'governance',
    stageName: '数据存储与治理',
    stageOrder: 2,
    description: '全域统一数据治理底座，纳管元数据、血缘与质量标准。',
    coreCapability: '统一治理底座',
    capabilityTags: ['数据治理', '元数据拓扑', '质量稽核', '标准规范'],
    iconName: 'ShieldCheck',
    status: 'online',
    recentActiveUsers: 328,
    version: 'v6.0.2',
    popularFeatures: ['全链路端到端血缘', '自动质量核查规则库', '数据安全分类分级'],
    routePath: '/systems/tianshu-governance'
  },

  // 第三阶段：数据开发与利用
  {
    id: 'dev-collaboration',
    name: '协作开发平台',
    stageId: 'development',
    stageName: '数据开发与利用',
    stageOrder: 3,
    description: '多角色云端SQL/Python开发协同与DAG工作流调度。',
    coreCapability: '开发协同',
    capabilityTags: ['开发协同', 'DAG任务编排', '云端IDE', '版本管控'],
    iconName: 'Code2',
    status: 'online',
    recentActiveUsers: 284,
    version: 'v5.2.0',
    popularFeatures: ['可视化DAG依赖调度', 'Spark/Flink一体调试', 'SQL智能语法补全'],
    routePath: '/systems/dev-collaboration'
  },
  {
    id: 'data-sandbox',
    name: '数据沙箱平台',
    stageId: 'development',
    stageName: '数据开发与利用',
    stageOrder: 3,
    description: '打造可用不可见的密态安全计算与合规开发环境。',
    coreCapability: '在线开发环境',
    capabilityTags: ['在线开发环境', '密态沙箱', '零数据泄露', '可用不可见'],
    iconName: 'Box',
    status: 'online',
    recentActiveUsers: 112,
    version: 'v3.8.0',
    popularFeatures: ['网络物理隔离隔离区', '代码审计与行为录屏', '计算结果合规导出审计'],
    routePath: '/systems/data-sandbox'
  },
  {
    id: 'data-annotation',
    name: '数据标注平台',
    stageId: 'development',
    stageName: '数据开发与利用',
    stageOrder: 3,
    description: '提供多模态数据人机协同标注与质检验收流水线。',
    coreCapability: '数据标注',
    capabilityTags: ['数据标注', '多模态标注', 'AI辅助预标', '验收质检'],
    iconName: 'Tag',
    status: 'online',
    recentActiveUsers: 76,
    version: 'v3.5.0',
    popularFeatures: ['大模型智能预标注', '多人协同任务盲审', '质检抽样打分流水线'],
    routePath: '/systems/data-annotation'
  },
  {
    id: 'evay-bi',
    name: 'EvayBI平台',
    stageId: 'development',
    stageName: '数据开发与利用',
    stageOrder: 3,
    description: '敏捷商业智能与交互式多维指标大屏分析利用平台。',
    coreCapability: '分析利用平台',
    capabilityTags: ['分析利用平台', '敏捷BI', '交互大屏', '指标看板'],
    iconName: 'BarChart3',
    status: 'online',
    recentActiveUsers: 420,
    version: 'v7.4.2',
    popularFeatures: ['毫秒级百亿指标计算', '智能自然语言查数', '企业级权限水印导出'],
    routePath: '/systems/evay-bi'
  },
  {
    id: 'agent-dev',
    name: '智能体开发平台',
    stageId: 'development',
    stageName: '数据开发与利用',
    stageOrder: 3,
    description: '基于企业数据要素编排AI智能体与领域知识库应用。',
    coreCapability: 'AI应用开发',
    capabilityTags: ['AI应用开发', '智能体编排', '知识库RAG', 'Prompt调试'],
    iconName: 'Bot',
    status: 'online',
    recentActiveUsers: 238,
    version: 'v2.1.0',
    popularFeatures: ['低代码工作流Agent编排', '私域文档分块向量检索', '多端应用API发布'],
    routePath: '/systems/agent-dev'
  },

  // 第四阶段：数据可信流通
  {
    id: 'trusted-data-space',
    name: '可信数据空间',
    stageId: 'circulation',
    stageName: '数据可信流通',
    stageOrder: 4,
    description: '跨机构可用不可见的可信流通中枢与存证审计中心。',
    coreCapability: '合规数据流通',
    capabilityTags: ['合规数据流通', '数据合约', '隐私计算', '存证溯源'],
    iconName: 'Network',
    status: 'online',
    recentActiveUsers: 168,
    version: 'v3.1.0',
    popularFeatures: ['智能数据用例合约', '多方联邦计算节点', '区块链全链路存证不可篡改'],
    routePath: '/systems/trusted-data-space'
  },

  // 第五阶段：数据运营与服务
  {
    id: 'data-operation',
    name: '数据运营平台',
    stageId: 'operation',
    stageName: '数据运营与服务',
    stageOrder: 5,
    description: '全域要素流转价值计量、结算计费与运营态势感知。',
    coreCapability: '运营管理',
    capabilityTags: ['运营管理', '计量计费', '态势感知', '运营考核'],
    iconName: 'LineChart',
    status: 'online',
    recentActiveUsers: 94,
    version: 'v4.2.0',
    popularFeatures: ['要素流转计费结算账单', '全网接入态势实时大屏', '服务SLA合规履约率'],
    routePath: '/systems/data-operation'
  },
  {
    id: 'data-service',
    name: '数据服务平台',
    stageId: 'operation',
    stageName: '数据运营与服务',
    stageOrder: 5,
    description: '快速将数据资产封装为高并发安全的标准API服务。',
    coreCapability: '共享服务',
    capabilityTags: ['共享服务', 'API网关', '服务编排', '调用审计'],
    iconName: 'Send',
    status: 'online',
    recentActiveUsers: 382,
    version: 'v5.5.1',
    popularFeatures: ['SQL一键零代码生成API', '毫秒级高并发API网关', '调用链路全量安全脱敏'],
    routePath: '/systems/data-service'
  },
  {
    id: 'data-asset',
    name: '数据资产平台',
    stageId: 'operation',
    stageName: '数据运营与服务',
    stageOrder: 5,
    description: '一站式数据要素合规确权、成本估值与资产凭证入表。',
    coreCapability: '数据一站式入表',
    capabilityTags: ['数据一站式入表', '资产评估', '确权登记', '合规入表'],
    iconName: 'BadgeCent',
    status: 'online',
    recentActiveUsers: 156,
    version: 'v3.0.0',
    popularFeatures: ['数据资产价值评估模型', '入表财务合规审计表单', '区块链存证数字证书'],
    routePath: '/systems/data-asset'
  }
];

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'collection',
    order: 1,
    name: '数据采集与汇聚',
    subtitle: '多源输入 · 异构汇聚',
    description: '打通跨域、跨网、工业设备与互联网信源，实现全域数据统一归集与标准化抽取。',
    keyAction: '建立稳定可靠的多源数据输入管道',
    iconName: 'ArrowDownToLine',
    accentColor: '#1d4ed8', // blue-700
    accentBg: '#eff6ff',    // blue-50
    accentBorder: '#bfdbfe',// blue-200
    badgeBg: '#dbeafe',     // blue-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'collection')
  },
  {
    id: 'governance',
    order: 2,
    name: '数据存储与治理',
    subtitle: '标准规范 · 资产化底座',
    description: '构建统一数据资产目录、端到端元数据血缘、全生命周期质量稽核与合规分类分级。',
    keyAction: '将原始杂乱数据转化为高质量标准资产',
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
    name: '数据开发与利用',
    subtitle: '安全计算 · 智算赋能',
    description: '提供云端协作IDE、密态安全沙箱、高质量训练集加工、敏捷BI与大模型智能体编排。',
    keyAction: '激活数据生产力，实现算法与业务模型融合',
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
    name: '数据可信流通',
    subtitle: '隐私计算 · 合规流转',
    description: '依托可信数据空间技术，实现数据“可用不可见、可控可计量”，打破跨主体数据壁垒。',
    keyAction: '保障数据在安全合规边界下跨主体可信流通',
    iconName: 'Network',
    accentColor: '#059669', // emerald-600
    accentBg: '#ecfdf5',    // emerald-50
    accentBorder: '#a7f3d0',// emerald-200
    badgeBg: '#d1fae5',     // emerald-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'circulation')
  },
  {
    id: 'operation',
    order: 5,
    name: '数据运营与服务',
    subtitle: '价值释放 · 一站式入表',
    description: '开放标准服务API网关，推进数据要素资产入表与财务化，构建闭环运营态势感知。',
    keyAction: '完成数据要素商业化闭环与资产价值入表',
    iconName: 'Rocket',
    accentColor: '#d97706', // amber-600
    accentBg: '#fffbeb',    // amber-50
    accentBorder: '#fde68a',// amber-200
    badgeBg: '#fef3c7',     // amber-100
    systems: ALL_SYSTEMS.filter(s => s.stageId === 'operation')
  }
];

export const INITIAL_FAVORITE_SYSTEM_IDS = [
  'tianshu-governance',
  'data-service',
  'data-sandbox',
  'agent-dev'
];

export const INITIAL_RECENT_VISITS: RecentVisitItem[] = [
  {
    id: 'rec-1',
    systemId: 'tianshu-governance',
    systemName: '天枢数据治理平台',
    stageName: '数据存储与治理',
    visitedAt: '30分钟前',
    actionSummary: '复核【核心户籍与企业法人】数据质量稽核报告'
  },
  {
    id: 'rec-2',
    systemId: 'evay-bi',
    systemName: 'EvayBI平台',
    stageName: '数据开发与利用',
    visitedAt: '1小时前',
    actionSummary: '导出【全省数据要素利用效能总览】交互式大屏'
  },
  {
    id: 'rec-3',
    systemId: 'trusted-data-space',
    systemName: '可信数据空间',
    stageName: '数据可信流通',
    visitedAt: '2小时前',
    actionSummary: '签署【普惠金融信贷联合风控】数据使用合约'
  },
  {
    id: 'rec-4',
    systemId: 'data-reporting',
    systemName: '数据填报平台',
    stageName: '数据采集与汇聚',
    visitedAt: '昨天 17:15',
    actionSummary: '核对【2026年Q1重点产业链】数据填报批次汇总'
  }
];

export const INITIAL_TODOS: TodoTask[] = [
  // 待审核 (3)
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
    systemName: '数据资产平台',
    time: '2小时前',
    applicant: '交投集团 · 资产管理部',
    description: '申请将2025年度交通客流特征集进行无形资产登记与上架，需确认成本归集清单与法律权属声明。',
    deadline: '明日 12:00 前'
  },
  {
    id: 'todo-audit-3',
    title: '【填报归集验收】2026年Q1重点产业链产能填报批次汇总',
    type: 'audit',
    typeLabel: '待审核',
    priority: 'low',
    systemId: 'data-reporting',
    systemName: '数据填报平台',
    time: '4小时前',
    applicant: '经信委 · 产业协同科',
    description: '全区128家规上企业能耗与排产数据填报已完成初步校验，待进行批量归集入湖终审。',
    deadline: '本周五 17:00 前'
  },

  // 待处理 (2)
  {
    id: 'todo-proc-1',
    title: '【数据质量破损】核心户籍表身份证格式校验异常38条',
    type: 'process',
    typeLabel: '待处理',
    priority: 'high',
    systemId: 'tianshu-governance',
    systemName: '天枢数据治理平台',
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
    systemName: 'EvayBI平台',
    time: '进行中 (已完成 75%)',
    description: '需拉取天枢治理平台稽核合格率与运营平台流转结算数据，生成看板并导出PDF报表。',
    deadline: '明日 18:00'
  },
  {
    id: 'todo-task-2',
    title: '优化企业招商知识库智能体 Prompt编排与RAG召回率',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'medium',
    systemId: 'agent-dev',
    systemName: '智能体开发平台',
    time: '进行中 (已完成 50%)',
    description: '针对政策文档分块粒度进行调优，将准确率从82%提升至95%以上。',
    deadline: '本周五'
  },
  {
    id: 'todo-task-3',
    title: '组织召开【医疗影像数据集资产化】三方合规确权现场评审会',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'medium',
    systemId: 'data-asset',
    systemName: '数据资产平台',
    time: '排期待定',
    description: '协调律所、会计所与数据质量评估专家，对首批脱敏影像进行无形资产论证。',
    deadline: '下周二'
  },
  {
    id: 'todo-task-4',
    title: '检查协作开发平台生产环境DAG批处理夜间调度依赖',
    type: 'task',
    typeLabel: '我的任务',
    priority: 'low',
    systemId: 'dev-collaboration',
    systemName: '协作开发平台',
    time: '例行业务',
    description: '梳理跨库ETL作业上游依赖，清理历史废弃临时表与无引用视图。',
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
