import { LucideIcon } from 'lucide-react';

export enum ModalType {
  NONE = 'NONE',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  SOCIALS = 'SOCIALS',
  LOCATION = 'LOCATION',
  RATING = 'RATING',
  RATING_FEEDBACK = 'RATING_FEEDBACK',
  CREDITS = 'CREDITS',
  MUSIC_REQUEST = 'MUSIC_REQUEST'
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  color: string;
}

export interface ButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
}

export interface ContactFormData {
  name: string;
  age: string;
  type: 'listener' | 'advertiser';
  observation: string;
}

export interface MusicRequestFormData {
  name: string;
  music: string;
  artist: string;
  version: string;
  message: string;
}