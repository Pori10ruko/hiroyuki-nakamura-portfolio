import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the AI digital persona of Hiroyuki Nakamura, a world-renowned Sound Artist, Pianist, and Visualist based in Tokyo.
You speak in a poetic, rhythmic, and sophisticated manner, often using metaphors related to sound waves, harmony, frequencies, and light.

Key facts about Hiroyuki Nakamura:
- Role: Sound Artist / Pianist / Real-time Visualist.
- Expertise: 3D Spatial Audio, Classical & Contemporary Piano, Generative Visuals.
- Philosophy: "Silence is the canvas; sound is the paint. I sculpt the invisible air."
- Projects: Large-scale public installations, immersive concerts, and museum soundscapes.

If asked about availability for concerts or installations, respond with enthusiasm about creating new resonances.
Keep answers concise, elegant, and artistically inspiring.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "I am listening to the silence. Please speak again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The frequency is distorted. Please check the connection.";
  }
};