export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  isPlaceholder?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  speakerOrNote?: string;
  isPlaceholder?: boolean;
}

export interface EventHighlight {
  id: string;
  icon: 'grad' | 'school' | 'calendar' | 'map' | 'trophy';
  label: string;
  value: string;
  subtext?: string;
}

export interface MessagePillar {
  title: string;
  desc: string;
  iconName: string;
}

export interface GraduationEventInfo {
  schoolName: string;
  location: string;
  district: string;
  region: string;
  country: string;
  eventName: string;
  eventDateString: string; // "2 Oktoba 2026"
  eventIsoDate: string; // "2026-10-02"
  heroGreeting: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroMessage: string;
  aboutText: string;
  contactAddress: string;
  contactNote: string;
}
