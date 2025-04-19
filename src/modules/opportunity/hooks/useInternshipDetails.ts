import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useInternshipDetails = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prompt = 'You are a Markdown renderer. I will send you a block of text. Your task is to return a clean, well-formatted Markdown version of it.\n\nUse:\n- `#` or `##` for headings\n- `**bold**` for important phrases\n- `-` or `*` for bullet points\n- Line breaks for readability\n- Code formatting only if explicitly required\n\n⚠️ Do not wrap the result in a code block. Do not use triple backticks. Just return plain Markdown.\n\nHere is the text:\n\n';
  const details = 'Details & Description\nHuawei is hiring for the Internship Program!\n\nSales & Project Details:\nBackground: This internship provides a hands-on learning opportunity in the ICT sector focusing on key technical areas\nOpportunity to network opportunities, data analysis, and innovative solutions across different core technology domains\n\nRequirements:\nOpen to 3rd year students or recent graduates in IT, Telecommunications, or related fields\nStrong analytical skills and proficiency in IT tools\nStudent communication skills and openness for technology\n\nBenefits:\nHands-on experience with cutting-edge technologies\nNetworking opportunities with industry professionals\nCertificate upon successful completion';

  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt + details);
        const text = result.response.text();
        const textFixed = text.replace(/\\n/g, "\n");
        setMarkdownText(textFixed);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch internship details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  return { markdownText, isLoading, error };
}; 