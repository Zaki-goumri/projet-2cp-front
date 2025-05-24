import { GoogleGenerativeAI } from '@google/generative-ai';

export class InterviewService {
  private static instance: InterviewService | null = null;
  private genAI: GoogleGenerativeAI;

  private constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }

  public static getInstance(): InterviewService {
    if (!InterviewService.instance) {
      InterviewService.instance = new InterviewService();
    }
    return InterviewService.instance;
  }

  public async startInterviewSession(topic: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are an AI interviewer. Start an interview session about ${topic}. 
      Begin with a brief introduction and your first question. Keep responses concise and engaging.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error starting interview session:', error);
      throw error;
    }
  }

  public async respondToAnswer(userAnswer: string, context: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `As an AI interviewer, given the context: "${context}" and the candidate's answer: "${userAnswer}", 
      provide a brief response and ask the next relevant question. Keep it conversational and professional.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error processing interview response:', error);
      throw error;
    }
  }
}

export const interviewService = InterviewService.getInstance(); 