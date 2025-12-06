import { GoogleGenAI } from "@google/genai";
import { SYLLABUS_CONTEXT } from '../constants';

// Add type definition for import.meta.env
declare global {
  interface ImportMeta {
    env: {
      VITE_GEMINI_API_KEY?: string;
    };
  }
}

// Get API key with fallbacks
const getApiKey = (): string => {
  // 1. Check Vite environment variables (for local development)
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  // 2. Check Create React App environment variables
  if (process.env.REACT_APP_GEMINI_API_KEY) {
    return process.env.REACT_APP_GEMINI_API_KEY;
  }
  // 3. Check Node/Cloud environment variables
  if (process.env.API_KEY) {
    return process.env.API_KEY;
  }
  // 4. Hardcoded fallback (for local development only)
  return "AIzaSyDrLBA6qnaSb2-NZMb0tnGN8sEj9EVxA18";
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('https://aiprograms.vercel.app/api/gemini.mjs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my AI brain right now. Please try again in a moment.";
  }
};