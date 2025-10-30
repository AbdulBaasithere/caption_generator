
import { Platform, Tone } from './types';
import { InstagramIcon, LinkedInIcon, TwitterIcon, TikTokIcon } from './components/IconComponents';
import type React from 'react';

interface PlatformOption {
  value: Platform;
  label: string;
  icon: React.FC<{className?: string}>;
}

interface ToneOption {
  value: Tone;
  label: string;
}

export const PLATFORM_OPTIONS: PlatformOption[] = [
  { value: Platform.INSTAGRAM, label: 'Instagram', icon: InstagramIcon },
  { value: Platform.LINKEDIN, label: 'LinkedIn', icon: LinkedInIcon },
  { value: Platform.TWITTER, label: 'Twitter (X)', icon: TwitterIcon },
  { value: Platform.TIKTOK, label: 'TikTok', icon: TikTokIcon },
];

export const TONE_OPTIONS: ToneOption[] = [
  { value: Tone.CASUAL, label: 'Casual' },
  { value: Tone.PROFESSIONAL, label: 'Professional' },
  { value: Tone.FUNNY, label: 'Funny' },
  { value: Tone.INSPIRING, label: 'Inspiring' },
  { value: Tone.EXCITED, label: 'Excited' },
];
