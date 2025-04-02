export type QuestionType = "Behavioral" | "Resume" | "Technical";

export interface GeneratedQuestion {
  questionPrompt: string;
  questionType: QuestionType;
}

export type GeneratedQuestionsArray = GeneratedQuestion[];

export interface SidebarProps {
  setOpenDialog: (open: boolean) => void;
}

export interface SessionType {
  id: string;
  date: string;
  userId: string;
  question: {
    id: string;
    category: string;
    prompt: string;
    response: string;
    rating: string;
    sessionId: string;
  }[];
}

export interface SessionComponentProps {
  session: SessionType;
}
