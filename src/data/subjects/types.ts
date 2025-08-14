
export interface TopicContent {
  theory: string;
  examples: Array<{
    problem: string;
    solution: string;
  }>;
  exercises: Array<{
    problem: string;
    answer: string;
  }>;
  additionalContent?: string;
  videoLinks?: string[];
  notes?: string[];
}

export type SubjectData = Record<string, Record<number, TopicContent>>;
export type SubjectsData = Record<string, SubjectData>;
