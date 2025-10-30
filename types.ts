export enum Platform {
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter (X)',
  TIKTOK = 'TikTok',
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  CASUAL = 'Casual',
  FUNNY = 'Funny',
  INSPIRING = 'Inspiring',
  EXCITED = 'Excited',
}

export interface GenerationParams {
  topic: string;
  audience: string;
  tone: Tone;
  platform: Platform;
}

export interface GeneratedContent {
  captions: string[];
  hashtags: string[];
}

export interface HistoryEntry {
  id: number;
  topic: string;
  timestamp: Date;
  content: GeneratedContent;
}
