
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askKore(prompt: string, onUpdate: (text: string) => void) {
    try {
      const response = await this.ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are Kore AI, the high-performance intelligence core of TheKore Browser. 
          Your personality is sleek, technical, and highly efficient. 
          Provide concise, direct answers with a "gamer/pro developer" tone. 
          Use technical terms where appropriate but keep readability high. 
          Format using Markdown.`,
          temperature: 0.7,
        }
      });

      let fullText = '';
      for await (const chunk of response) {
        fullText += chunk.text;
        onUpdate(fullText);
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      onUpdate("ERROR: Internal Core Malfunction. Check connection parameters.");
    }
  }
}

export const koreAI = new GeminiService();
