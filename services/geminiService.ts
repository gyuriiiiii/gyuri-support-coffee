import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateThankYouMessage = async (name: string, coffeeCount: number, message: string): Promise<string> => {
  if (!apiKey) {
    return "API Key가 설정되지 않았습니다. 하지만 규리가 마음만은 잘 받았다고 전해달래요! ☕️";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Context: "규리" is a friendly, cheerful creator. A fan named "${name}" just bought her ${coffeeCount} cups of coffee and left this message: "${message}".
        Task: Write a short, warm, and witty thank-you note from Gyuri to ${name}. Use emojis. Written in Korean (informal but polite '해요' style).
        Max length: 2 sentences.
      `,
    });

    return response.text || "정말 감사합니다! 맛있게 마실게요! ☕️💖";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "커피 정말 감사합니다! 규리가 감동받았어요! ☕️❤️";
  }
};