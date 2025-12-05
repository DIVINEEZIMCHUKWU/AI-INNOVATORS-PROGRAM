const { GoogleGenAI } = require("@google/genai");
const { SYLLABUS_CONTEXT } = require('../constants.js');

// Initialize Gemini with server-side API key
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: message,
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

    return res.status(200).json({ 
      response: response.text || "I apologize, I couldn't generate a response at this time."
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      message: "I'm having trouble connecting to my AI brain right now. Please try again in a moment."
    });
  }
}
