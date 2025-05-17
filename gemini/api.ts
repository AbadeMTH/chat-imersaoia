import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt";
import { apiKey } from "./apiKey";

const ai = new GoogleGenAI({
    apiKey: apiKey,
});

const chat = ai.chats.create({model: "gemini-2.0-flash", config: {systemInstruction: prompt}});

export async function response(msg: string) {
    const response = await chat.sendMessage({message: msg});
    const text = response.text;
    return text?.replace(/\*{1,2}(.+?)\*{1,2}/g, '$1');;
}
