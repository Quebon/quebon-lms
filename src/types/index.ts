export interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  employeeId: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  hrdPoints: number;
}

export interface Curriculum {
  id: string;
  code: string;
  title: string;
  lessonCount: number;
  period: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completionDate?: string;
  points: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  videoUrl?: string;
  quizzes: Quiz[];
}

export type ExampleContent = { type: 'text' | 'image'; value: string };

export interface Quiz {
  id: string;
  type: 'multiple_choice' | 'select_answer';
  question: string;
  options: string[] | string[][];
  correctAnswer: number | number[];
  explanation: string;
  expression?: string;
  example?: string | ExampleContent[];
}

export interface Inquiry {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
  status: 'pending' | 'answered';
  answer?: string;
  answerDate?: string;
}

export interface LearningResult {
  user: User;
  curriculum: Curriculum;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completionDate?: string;
  points: number;
}