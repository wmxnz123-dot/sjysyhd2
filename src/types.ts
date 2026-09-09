export type LifecycleStageId = 
  | 'collection'
  | 'governance'
  | 'development'
  | 'circulation'
  | 'operation';

export interface SystemItem {
  id: string;
  name: string;
  stageId: LifecycleStageId;
  stageName: string;
  stageOrder: number;
  description: string;
  coreCapability: string;
  capabilityTags: string[];
  iconName: string;
  status: 'online' | 'busy' | 'updating';
  recentActiveUsers?: number;
  version?: string;
  popularFeatures?: string[];
  docUrl?: string;
  routePath?: string;
}

export interface LifecycleStage {
  id: LifecycleStageId;
  order: number;
  name: string;
  subtitle: string;
  description: string;
  keyAction: string;
  iconName: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  badgeBg: string;
  systems: SystemItem[];
}

export interface TodoTask {
  id: string;
  title: string;
  type: 'audit' | 'process' | 'apply' | 'task';
  typeLabel: string;
  priority: 'high' | 'medium' | 'low';
  systemId: string;
  systemName: string;
  time: string;
  applicant?: string;
  description: string;
  deadline?: string;
}

export interface RecentVisitItem {
  id: string;
  systemId: string;
  systemName: string;
  stageName: string;
  visitedAt: string;
  actionSummary: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'task' | 'security';
  time: string;
  isRead: boolean;
  relatedSystem?: string;
}
