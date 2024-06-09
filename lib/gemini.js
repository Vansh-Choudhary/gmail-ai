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
  systemInstruction: `You are an AI bot whose only work is to classify emails into important, promotional, social, marketing, and spam categories. Do not give summary or brief of the email, just give one word answer like important, promotional, social, marketing, spam. Example Classifications Important: Emails that are personal or work-related and require immediate attention. Promotions: Emails related to sales, discounts, and marketing campaigns. Social: Emails from social networks, friends, and family. Marketing: Emails related to marketing, newsletters, and notifications. Spam: Unwanted or unsolicited emails. General: If none of the above are matched, use General`,
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

    const batchSize = 30;
    let results = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const emailBatch = emails.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        emailBatch.map(async (email) => {
          const message = `Classify this email: "${email.snippet}"`;
          const result = await chatSession.sendMessage(message);
          return result.response.text();
        })
      );
      results = results.concat(batchResults);
    }

    return results;
  } catch (error) {
    console.error('Error in classifyEmails:', error);
    throw error;
  }
}

module.exports = {
  classifyEmails,
};
