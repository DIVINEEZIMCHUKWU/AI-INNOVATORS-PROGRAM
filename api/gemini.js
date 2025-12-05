const { GoogleGenAI } = require("@google/genai");

// Embedded context to avoid import issues
const SYLLABUS_CONTEXT = `
AI Young Innovators Program: Weekend virtual training for ages 7-20+.
5 modules: Web DevAI, Learning AI, Multimedia, Design, Advanced Skills.
Requirements: Computer, internet, parental consent.
Contact: WhatsApp 234812565024 or skillhivedigitalagency@gmail.com
`;

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
    return res.status(405).json({ 
      message: 'Method Not Allowed',
      allowed: ['POST', 'OPTIONS'],
      received: req.method
    });
  }

  console.log('Gemini API called with body:', req.body);

  const { message } = req.body || {};

  if (!message) {
    console.error('No message provided in request');
    return res.status(400).json({ message: 'Message is required' });
  }

  // Check if API key is available
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return res.status(500).json({ 
      message: 'API key not configured',
      error: 'GEMINI_API_KEY environment variable is missing'
    });
  }

  try {
    console.log('Initializing Gemini with API key...');
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

    console.log('Gemini response generated successfully');
    return res.status(200).json({ 
      response: response.text || "I apologize, I couldn't generate a response at this time."
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      status: error.status
    });
    return res.status(500).json({ 
      message: "I'm having trouble connecting to my AI brain right now. Please try again in a moment.",
      error: error.message
    });
  }
}
