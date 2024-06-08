// lib/gemini.js
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an AI bot whose only work is to classify emails into important, promotional, social, marketing, and spam categories.Do not give summary or brief of the email, just give one word answer like important, promotional,social,marketing,spam.",
  });
  
  const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 20,
    responseMimeType: "text/plain",
  };
  
  async function classifyEmails(emails) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
        history: [],
      });
  
      const results = await Promise.all(
        emails.map(async (email) => {
          const message = `Classify this email: "${email.snippet}"`;
          const result = await chatSession.sendMessage(message);
          return result.response.text();
        })
      );
  
      return results;
    } catch (error) {
      console.error('Error in classifyEmails:', error);
      throw error;
    }
  }
  
  module.exports = {
    classifyEmails,
  };
  