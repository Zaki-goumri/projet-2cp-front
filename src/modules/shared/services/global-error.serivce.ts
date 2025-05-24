import { GoogleGenerativeAI } from '@google/generative-ai';
import externalApi from 'axios';
import { toast } from 'react-toastify';

export class GlobalErrorService {
  private static instance: GlobalErrorService | null = null;
  private genAI: GoogleGenerativeAI;

  private constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }

  public static getInstance(): GlobalErrorService {
    if (!GlobalErrorService.instance) {
      GlobalErrorService.instance = new GlobalErrorService();
    }
    return GlobalErrorService.instance;
  }

  
  public async getErrorHandlingMessage(err: unknown): Promise<string | void> {
    if (!err) return '';

    const GEMINI_URL = import.meta.env.VITE_GEMINI_URL;
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_URL || !GEMINI_API_KEY) {
      console.warn('Missing Gemini config.');
      return;
    }

    try {
      const response = await externalApi.post(
        `${GEMINI_URL}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Analyse this error and return ONLY a short, non-technical notification message suitable for END USERS (max 100 characters). The message should be friendly, avoid technical jargon, and provide simple guidance on what happened. This will be shown directly to clients,Specify the messge depending on the error , NOT developers:\n\n${JSON.stringify(err)}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const errorMessage =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      return errorMessage;
    } catch (error: any) {
      console.error('Error with Gemini:', error.message);
    }
  }
}

export const globalErrorService = GlobalErrorService.getInstance();
