import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyDGuiTtL1lWOAX20Cn40lQ21KSsHbA-scc",
});

export async function response(msg: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: msg,
        config: {
            systemInstruction: prompt,
        },
    });
    const text = response.text;
    return text;
}
