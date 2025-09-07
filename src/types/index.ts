interface RawJob {
  _id: string;
  hashOfContent: string;
  __v?: number;
  createdAt: string;
  updatedAt: string;
  company: string;
  llmoutput: any;  // JSON object structure from backend
}

interface UiJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  remote: boolean;
  tags: string[];
  description?: string;
  applyUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  postedAt: Date;
  expiresAt: Date;
  remote: boolean;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  image?: string;
  readTime: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  cv?: string;
  skills: string[];
  experience: string;
  interestedRoles: string[];
  notificationPreferences: {
    email: boolean;
    newJobs: boolean;
    matchingJobs: boolean;
  };
}

export interface NewsletterSubscription {
  email: string;
  preferences: {
    jobAlerts: boolean;
    blogUpdates: boolean;
    expatGuides: boolean;
  };
}