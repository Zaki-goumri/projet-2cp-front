import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';

export class GlobalErrorService {
  private static instance: GlobalErrorService | null = null;
  private genAI: GoogleGenerativeAI;
  private readonly MODEL_NAME = 'gemini-1.5-flash-latest';

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Missing Gemini API key in environment variables.');
      throw new Error('Gemini API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): GlobalErrorService {
    if (!GlobalErrorService.instance) {
      GlobalErrorService.instance = new GlobalErrorService();
    }
    return GlobalErrorService.instance;
  }

  public async getErrorHandlingMessage(err: unknown): Promise<string | void> {
    if (!err) return '';

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.warn('Missing Gemini API key configuration.');
      return 'Something went wrong. Please try again.';
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.MODEL_NAME,
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 100,
        },
      });

      const prompt = `Analyze this error and return ONLY a short, non-technical notification message suitable for END USERS (max 100 characters). The message should be friendly, avoid technical jargon, and provide simple guidance on what happened. This will be shown directly to clients, NOT developers. Be specific based on the error type:

Error: ${JSON.stringify(err)}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const errorMessage = response.text();

      return errorMessage?.trim() || 'Something went wrong. Please try again.';
    } catch (error: any) {
      console.error('Error with Gemini API:', error.message);
      // Fallback to a generic user-friendly message
      return 'Something went wrong. Please try again.';
    }
  }

  /**
   * Shows a user-friendly error toast notification
   * @param err - The error object
   * @param fallbackMessage - Optional fallback message if AI fails
   */
  public async showErrorToast(
    err: unknown,
    fallbackMessage?: string
  ): Promise<void> {
    try {
      const userMessage = await this.getErrorHandlingMessage(err);
      const displayMessage =
        userMessage ||
        fallbackMessage ||
        'Something went wrong. Please try again.';

      toast.error(displayMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Failed to show error toast:', error);
      // Show fallback toast
      toast.error(fallbackMessage || 'Something went wrong. Please try again.');
    }
  }

  /**
   * Get a structured error analysis for debugging (development only)
   * @param err - The error object
   * @returns Detailed error analysis
   */
  public async getErrorAnalysis(err: unknown): Promise<string | void> {
    if (import.meta.env.PROD) {
      console.warn('Error analysis should not be used in production');
      return;
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.MODEL_NAME,
        generationConfig: {
          temperature: 0.1,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 500,
        },
      });

      const prompt = `Analyze this error for developers. Provide:
1. Error type and cause
2. Possible solutions
3. Prevention strategies

Error: ${JSON.stringify(err)}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Error analysis failed:', error.message);
      return;
    }
  }
}

export const globalErrorService = GlobalErrorService.getInstance();
