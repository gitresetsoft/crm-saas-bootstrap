export type User = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at?: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  status: 'active' | 'trialing' | 'canceled' | 'incomplete' | 'past_due';
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  current_period_end: string;
  trial_end?: string;
};

export type Metric = {
  name: string;
  value: number;
  change: number;
  timeframe: 'daily' | 'weekly' | 'monthly';
};

export type Activity = {
  id: string;
  user_id: string;
  action: string;
  target: string;
  created_at: string;
};

export type ChartData = {
  name: string;
  value: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  created_at: string;
};

export type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  avatar?: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};