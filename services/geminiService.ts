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

// Initialize the Gemini API client
const ai = new GoogleGenAI({ 
  apiKey: getApiKey() 
});

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: `You are the helpful, enthusiastic AI Program Advisor for the "AI Young Innovators Program". 
        Your goal is to answer questions about the program based strictly on the following syllabus context.
        
        Context:
        ${SYLLABUS_CONTEXT}
        
        Guidelines:
        - Be encouraging and professional.
        - If a user asks about something not in the context, politely say you don't have that information but they can contact support.
        - Keep answers concise (under 100 words) unless asked for detail.
        - If asked about pricing or specific dates not in the text, refer them to the contact numbers.
        - Use emojis occasionally to be friendly.
        `,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my AI brain right now. Please try again in a moment.";
  }
};