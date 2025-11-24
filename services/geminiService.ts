import { GoogleGenAI } from "@google/genai";
import { SYLLABUS_CONTEXT } from '../constants';

// Initialize the Gemini API client
// The API key is expected to be in the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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