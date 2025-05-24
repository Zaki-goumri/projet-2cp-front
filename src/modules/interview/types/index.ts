export interface ConversationMessage {
  speaker: 'ai' | 'user';
  text: string;
}

export interface InterviewState {
  isListening: boolean;
  interviewTopic: string;
  conversation: ConversationMessage[];
  isLoading: boolean;
} 