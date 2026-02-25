import type {
  MockUser,
  EcmsMetrics,
  ReviewQueueItem,
  ActivityFeedItem,
  LinkedInMetrics,
  ChartDataPoint,
  EngagementChartPoint,
} from '../types';

// ─── User ────────────────────────────────────────────────────────────────────

export const MOCK_USER: MockUser = {
  name: 'Emmanuel',
  role: 'Founding Member',
  organization: 'TPAC Impact Collective',
  tier: 'Enterprise',
  avatarSeed: 'emmanuel-tpac',
};

// ─── ECMS Metrics ────────────────────────────────────────────────────────────

export const MOCK_ECMS_METRICS: EcmsMetrics = {
  personalCredits: 8450,
  orgAmplificationPool: 12800,
  ecosystemGrowthPool: 42900,
  totalGcu: 214500,
  totalReach: 1250000,
};

// ─── Review Queue ────────────────────────────────────────────────────────────

export const MOCK_REVIEW_QUEUE: ReviewQueueItem[] = [
  {
    id: 'rq-1',
    title: 'Why Third-Party Ecosystems Will Define B2B Growth in 2026',
    content:
      'The old playbook — cold outreach, ad spend, gated content — is dying. Companies that win in 2026 will build collaborative ecosystems where every member amplifies every other member.\n\nAt TPAC Impact Collective, we\'ve seen a 12x engagement multiplier when companies contribute authentic content to the collective. The math is simple: reciprocity scales better than paid reach.\n\nThree things I\'ve learned building this ecosystem:\n1. Trust compounds faster than followers\n2. Quality content earns visibility — not ad budgets\n3. The best partnerships start with genuine engagement\n\n#B2BGrowth #EcosystemStrategy #TPAC',
    alternativeContent:
      'Forget the old playbook. Cold outreach is noise. Ad spend is a tax. Gated content is a wall.\n\nThe future of B2B growth is ecosystems — networks where every member lifts every other member.\n\nWe built TPAC Impact Collective on one principle: reciprocity at scale. The results? 12x engagement, zero ad spend, and partnerships that compound.\n\nHere\'s what most companies get wrong about ecosystem growth:\n→ They treat it like marketing (it\'s not)\n→ They optimize for reach (optimize for trust)\n→ They go alone (go together)\n\n#CollectiveGrowth #B2B #ThirdPartyAdvantage',
    scheduledTime: 'Tomorrow, 9:00 AM',
    qualityScore: 94,
    type: 'Post',
  },
  {
    id: 'rq-2',
    title: 'The Hidden ROI of Ecosystem Credits',
    content:
      'Most companies measure ROI in dollars. At TPAC, we measure it in ecosystem credits — and the results are staggering.\n\nOur members earned 214,500 GCU last quarter. That translates to:\n• 1.25M organic impressions (zero ad spend)\n• 3,840 authentic reactions per week\n• 412 meaningful comments driving real conversations\n\nThe credit system works because it rewards quality over quantity. Write something valuable? The ecosystem amplifies it. Phone it in? The algorithm knows.\n\nThis is the future of B2B visibility.\n\n#ECMS #SocialCredits #OrganicGrowth',
    alternativeContent:
      'What if your marketing ROI wasn\'t measured in dollars — but in trust?\n\nThat\'s exactly what ecosystem credits do. At TPAC Impact Collective, our credit engine has delivered:\n✅ 1.25M organic reach with $0 ad spend\n✅ 3,840+ weekly reactions from real professionals\n✅ 412 comments that spark actual business conversations\n\nThe secret? Quality earns credits. Credits earn visibility. Visibility earns trust. Trust earns revenue.\n\nStop buying attention. Start earning it.\n\n#EcosystemEconomics #B2B #TPAC',
    scheduledTime: 'Tomorrow, 2:00 PM',
    qualityScore: 91,
    type: 'Post',
  },
  {
    id: 'rq-3',
    title: 'How Cradle Tech 10x\'d Their LinkedIn Presence in 90 Days',
    content:
      'Case study time. Cradle Tech joined TPAC Impact Collective three months ago with 200 followers and near-zero engagement.\n\nToday? 2,400 followers. 18% average engagement rate. 3 inbound partnership requests per week.\n\nWhat changed? They stopped broadcasting and started contributing. Every piece of content they published added value to the ecosystem — and the ecosystem returned the favor.\n\nThe playbook:\n1. Join the collective\n2. Share authentic insights (not sales pitches)\n3. Engage with other members\' content genuinely\n4. Let the credit engine amplify your best work\n\nResults speak for themselves.\n\n#CaseStudy #LinkedInGrowth #TPAC',
    alternativeContent:
      '90 days. 200 → 2,400 followers. 0% → 18% engagement.\n\nThat\'s what happened when Cradle Tech stopped doing LinkedIn the old way and joined TPAC Impact Collective.\n\nNo ads. No bots. No engagement pods. Just authentic content amplified by a reciprocity-based ecosystem.\n\nThe framework:\n→ Week 1-4: Contribute value, earn credits\n→ Week 5-8: Credit engine amplifies top content\n→ Week 9-12: Compound effect kicks in\n\n3 inbound partnership requests per week. From scratch.\n\nThis is what collective growth looks like.\n\n#GrowthHacking #B2BMarketing #EcosystemPower',
    scheduledTime: 'Thursday, 11:00 AM',
    qualityScore: 88,
    type: 'Post',
  },
  {
    id: 'rq-4',
    title: 'The Death of Cold Outreach (And What Replaces It)',
    content:
      'I used to send 200 cold messages a week. Response rate? 2%.\n\nNow I send zero. Inbound rate? 14 qualified conversations per week.\n\nThe difference? I stopped trying to sell and started contributing to an ecosystem that sells for me.\n\nWhen your content is amplified by 50+ companies who genuinely engage with it, prospects come to YOU. They\'ve already seen your insights. They already trust your expertise.\n\nCold outreach is dead. Warm ecosystems are the future.\n\n#SalesStrategy #B2B #NetworkEffect',
    alternativeContent:
      'Cold outreach: 200 messages/week → 2% response rate.\nEcosystem approach: 0 messages/week → 14 inbound conversations.\n\nI didn\'t get better at selling. I got better at contributing.\n\nWhen 50+ companies amplify your best content through a trust-based credit system, you don\'t need to chase prospects. They find you.\n\nThe shift:\n❌ Spray and pray → ✅ Share and earn\n❌ Buy attention → ✅ Earn trust\n❌ Go alone → ✅ Go collective\n\nThe future of B2B is warm. Very warm.\n\n#WarmOutreach #EcosystemSelling #TPAC',
    scheduledTime: 'Friday, 10:00 AM',
    qualityScore: 92,
    type: 'Post',
  },
];

// ─── Activity Feed ───────────────────────────────────────────────────────────

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: 'af-1', company: 'TechFlow Solutions', action: 'liked your post about ecosystem strategy', timeAgo: '2 minutes ago', credits: 5, avatarSeed: 11 },
  { id: 'af-2', company: 'Peresoft', action: 'commented on your article', timeAgo: '8 minutes ago', credits: 12, avatarSeed: 12 },
  { id: 'af-3', company: 'Realm ID', action: 'shared your case study', timeAgo: '15 minutes ago', credits: 18, avatarSeed: 13 },
  { id: 'af-4', company: 'Sage Enterprise', action: 'reposted your thought leadership piece', timeAgo: '32 minutes ago', credits: 15, avatarSeed: 14 },
  { id: 'af-5', company: 'Cradle Tech', action: 'liked your comment on their post', timeAgo: '1 hour ago', credits: 3, avatarSeed: 15 },
  { id: 'af-6', company: 'Asamco Digital', action: 'mentioned you in a post', timeAgo: '2 hours ago', credits: 8, avatarSeed: 16 },
];

// ─── LinkedIn Metrics ────────────────────────────────────────────────────────

export const MOCK_LINKEDIN_METRICS: LinkedInMetrics = {
  search: { appearances: 1840, change: 68 },
  visitors: {
    pageViews: 3420, pageViewsChange: 142,
    uniqueVisitors: 1890, uniqueVisitorsChange: 96,
    desktopPct: 62, mobilePct: 38,
  },
  followers: {
    total: 4250,
    newFollowers: 680,
    newFollowersChange: 215,
    demographics: [
      { location: 'Johannesburg, ZA', percentage: 28 },
      { location: 'Cape Town, ZA', percentage: 18 },
      { location: 'London, UK', percentage: 14 },
      { location: 'Nairobi, KE', percentage: 11 },
      { location: 'Lagos, NG', percentage: 9 },
      { location: 'New York, US', percentage: 7 },
    ],
  },
  content: {
    impressions: 45200, impressionsChange: 310,
    reactions: 3840, reactionsChange: 185,
    comments: 412, commentsChange: 94,
    reposts: 890, repostsChange: 240,
  },
  posts: [
    { title: 'Why Third-Party Ecosystems Will Define B2B Growth', impressions: 8420, engagementRate: 18.2, reactions: 624, comments: 89 },
    { title: 'The Hidden ROI of Ecosystem Credits', impressions: 6890, engagementRate: 14.6, reactions: 512, comments: 67 },
    { title: 'How Cradle Tech 10x\'d Their LinkedIn Presence', impressions: 5240, engagementRate: 16.8, reactions: 398, comments: 54 },
    { title: 'The Death of Cold Outreach', impressions: 4180, engagementRate: 12.4, reactions: 286, comments: 41 },
    { title: 'Building Trust at Scale: The TPAC Playbook', impressions: 3650, engagementRate: 11.2, reactions: 214, comments: 38 },
    { title: 'From 0 to 1M Impressions: Our Ecosystem Journey', impressions: 2890, engagementRate: 8.6, reactions: 168, comments: 29 },
  ],
  visitorDemographics: {
    jobFunction: [
      { label: 'Business Development', percentage: 24 },
      { label: 'Marketing', percentage: 21 },
      { label: 'Operations', percentage: 16 },
      { label: 'Sales', percentage: 14 },
      { label: 'Consulting', percentage: 12 },
    ],
    companySize: [
      { label: '11-50', percentage: 32 },
      { label: '51-200', percentage: 26 },
      { label: '201-500', percentage: 18 },
      { label: '1-10', percentage: 14 },
      { label: '501+', percentage: 10 },
    ],
    industry: [
      { label: 'Technology', percentage: 28 },
      { label: 'Financial Services', percentage: 19 },
      { label: 'Professional Services', percentage: 16 },
      { label: 'Manufacturing', percentage: 12 },
      { label: 'Education', percentage: 10 },
    ],
    location: [
      { label: 'South Africa', percentage: 42 },
      { label: 'United Kingdom', percentage: 16 },
      { label: 'Kenya', percentage: 12 },
      { label: 'Nigeria', percentage: 9 },
      { label: 'United States', percentage: 8 },
    ],
    seniority: [
      { label: 'Senior', percentage: 28 },
      { label: 'Manager', percentage: 24 },
      { label: 'Director', percentage: 18 },
      { label: 'VP', percentage: 14 },
      { label: 'C-Suite', percentage: 10 },
    ],
  },
};

// ─── Time-Series Chart Data (30-day upward trends) ──────────────────────────

export const MOCK_CHART_DATA: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 800 + day * 45;
  const noise = Math.sin(day * 0.8) * 120;
  return {
    day: `Day ${day}`,
    impressions: Math.round(base + noise + Math.random() * 80),
    followers: Math.round(3570 + day * 22 + Math.sin(day * 0.5) * 30),
    ecosystemMultiplier: Math.round((base + noise) * 0.65 + Math.random() * 60),
  };
});

// ─── Dashboard Engagement Chart (7-day) ─────────────────────────────────────

export const MOCK_ENGAGEMENT_CHART: EngagementChartPoint[] = [
  { name: 'Mon', engagement: 1420, credits: 840 },
  { name: 'Tue', engagement: 1680, credits: 920 },
  { name: 'Wed', engagement: 1540, credits: 1080 },
  { name: 'Thu', engagement: 1890, credits: 1240 },
  { name: 'Fri', engagement: 2100, credits: 1380 },
  { name: 'Sat', engagement: 1760, credits: 1120 },
  { name: 'Sun', engagement: 2340, credits: 1560 },
];
