import { GoogleGenerativeAI } from '@google/generative-ai';

export class PostInterviewService {
  private static instance: PostInterviewService | null = null;
  private genAI: GoogleGenerativeAI;
  private readonly MODEL_NAME = "gemini-1.5-flash-latest"; 
  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("VITE_GEMINI_API_KEY is not defined. Please check your .env file.");
      throw new Error("Gemini API Key is missing.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): PostInterviewService {
    if (!PostInterviewService.instance) {
      PostInterviewService.instance = new PostInterviewService();
    }
    return PostInterviewService.instance;
  }

  public async startPostInterview(postDescription: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.MODEL_NAME });
      
      const prompt = `You are an AI interviewer conducting an interview for a position with the following description:
      "${postDescription}"
      
      Start the interview with a brief introduction and your first relevant question. Focus on assessing the candidate's fit for this specific role. Keep responses concise and engaging.`;
      
      const result = await model.generateContent(prompt);
      const response =  result.response;
      return response.text();
    } catch (error) {
      console.error('Error starting post interview:', error);
      throw error;
    }
  }

  public async evaluateAnswer(userAnswer: string, context: string, postDescription: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.MODEL_NAME });
      
      const prompt = `As an AI interviewer for a position with this description:
      "${postDescription}"
      
      Given the conversation context: "${context}"
      And the candidate's answer: "${userAnswer}"
      
      Provide a brief evaluation of the answer and ask the next relevant question. Focus on how well the answer aligns with the position requirements.`;
      
      const result = await model.generateContent(prompt);
      const response =  result.response;
      return response.text();
    } catch (error) {
      console.error('Error evaluating answer:', error);
      throw error;
    }
  }
}

export const postInterviewService = PostInterviewService.getInstance();