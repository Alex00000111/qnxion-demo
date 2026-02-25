
export enum Channel {
  LINKEDIN = 'LinkedIn',
  EMAIL = 'Email',
  WHATSAPP = 'WhatsApp'
}

export enum PostStatus {
  DRAFT = 'Draft',
  PENDING_REVIEW = 'Pending Review',
  APPROVED = 'Approved',
  SCHEDULED = 'Scheduled',
  PUBLISHED = 'Published'
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  credits: number;
  avatar: string;
  isBlacklisted: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
}

export interface Post {
  id: string;
  authorId: string;
  title?: string;
  type: 'Post' | 'Article';
  content: string;
  media?: MediaFile[];
  status: PostStatus;
  isAiGenerated: boolean;
  scheduledTime?: string;
  reviewDeadline: string;
  qualityScore?: number;
  performanceScore?: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface KnowledgeFact {
  id: string;
  question: string;
  answer: string;
  category: string;
  timestamp: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Outbound' | 'Inbound';
  status: 'Active' | 'Paused' | 'Completed';
  channels: Channel[];
  targets: number;
  successRate: number;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  channel: Channel;
  unread: boolean;
  status: 'AI_MANAGED' | 'HUMAN_HANDOVER';
}

// --- DEMO mock data types ---

export interface MockUser {
  name: string;
  role: string;
  organization: string;
  tier: string;
  avatarSeed: string;
}

export interface EcmsMetrics {
  personalCredits: number;
  orgAmplificationPool: number;
  ecosystemGrowthPool: number;
  totalGcu: number;
  totalReach: number;
}

export interface ReviewQueueItem {
  id: string;
  title: string;
  content: string;
  alternativeContent: string;
  scheduledTime: string;
  qualityScore: number;
  type: 'Post' | 'Article';
}

export interface ActivityFeedItem {
  id: string;
  company: string;
  action: string;
  timeAgo: string;
  credits: number;
  avatarSeed: number;
}

export interface LinkedInMetrics {
  search: { appearances: number; change: number };
  visitors: {
    pageViews: number; pageViewsChange: number;
    uniqueVisitors: number; uniqueVisitorsChange: number;
    desktopPct: number; mobilePct: number;
  };
  followers: {
    total: number; newFollowers: number; newFollowersChange: number;
    demographics: { location: string; percentage: number }[];
  };
  content: {
    impressions: number; impressionsChange: number;
    reactions: number; reactionsChange: number;
    comments: number; commentsChange: number;
    reposts: number; repostsChange: number;
  };
  posts: {
    title: string;
    impressions: number;
    engagementRate: number;
    reactions: number;
    comments: number;
  }[];
  visitorDemographics: {
    jobFunction: { label: string; percentage: number }[];
    companySize: { label: string; percentage: number }[];
    industry: { label: string; percentage: number }[];
    location: { label: string; percentage: number }[];
    seniority: { label: string; percentage: number }[];
  };
}

export interface ChartDataPoint {
  day: string;
  impressions: number;
  followers: number;
  ecosystemMultiplier?: number;
}

export interface DashboardStatCard {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export interface EngagementChartPoint {
  name: string;
  engagement: number;
  credits: number;
}
