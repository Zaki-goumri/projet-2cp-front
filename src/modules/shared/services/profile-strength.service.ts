import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from '@/modules/shared/types';

export class ProfileStrengthService {
  private static instance: ProfileStrengthService | null = null;
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

  public static getInstance(): ProfileStrengthService {
    if (!ProfileStrengthService.instance) {
      ProfileStrengthService.instance = new ProfileStrengthService();
    }
    return ProfileStrengthService.instance;
  }

  public async calculateProfileStrength(user: User): Promise<number> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.MODEL_NAME });
      
      const prompt = `Analyze this user profile and calculate a profile strength percentage (0-100) based on the completeness and quality of their information. Consider the following factors:
      1. Basic Information (name, email, number, location)
      2. Profile Picture
      3. Description
      4. Links
      5. Role-specific information (education, experience, skills for students)
      
      Profile Data:
      ${JSON.stringify(user, null, 2)}
      
      Return ONLY a number between 0 and 100 representing the profile strength percentage.`;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const strength = parseInt(response.text().trim());
      
      // Ensure the result is a valid number between 0 and 100
      return Math.min(Math.max(isNaN(strength) ? 0 : strength, 0), 100);
    } catch (error) {
      console.error('Error calculating profile strength:', error);
      return 0;
    }
  }
}

export const profileStrengthService = ProfileStrengthService.getInstance(); 