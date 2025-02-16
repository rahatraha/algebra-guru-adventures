
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  avatar: string;
  level: number;
  xp: number;
  streakDays: number;
  subjects: SubjectProgress[];
  achievements: Achievement[];
  settings: UserSettings;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}
