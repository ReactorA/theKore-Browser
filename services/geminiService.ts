
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async askKore(prompt: string, onUpdate: (text: string, links?: any[]) => void) {
    // Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are Kore AI. You have access to real-time information via Google Search. 
          Respond in a high-tech, technical manner. List web sources if you use them.`,
          tools: [{ googleSearch: {} }]
        }
      });

      // Using .text property directly as per library standards
      const text = response.text || "I was unable to process that request.";
      
      // Extracting grounding chunks for transparency and source listing
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = grounding.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || '#'
      }));

      onUpdate(text, links);
    } catch (error) {
      console.error("Gemini Error:", error);
      onUpdate("ERROR: CONNECTION_REFUSED // INTERNAL_FAILURE", []);
    }
  }
}

export const koreAI = new GeminiService();
