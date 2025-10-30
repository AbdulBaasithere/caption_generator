
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerationParams, GeneratedContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        captions: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
                description: 'An engaging social media caption.'
            },
            description: 'An array of 5 unique caption variations.'
        },
        hashtags: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
                description: 'A relevant hashtag without the # symbol.'
            },
            description: 'An array of 10-15 relevant hashtags.'
        }
    },
    required: ['captions', 'hashtags']
};

export const generateCaptionsAndHashtags = async (params: GenerationParams): Promise<GeneratedContent> => {
    const { topic, audience, tone, platform } = params;

    const prompt = `
        Create 5 engaging and scroll-stopping social media captions for the platform: ${platform}.
        The topic is: "${topic}".
        The target audience is: "${audience || 'a general audience'}".
        The desired tone is: ${tone}.
        Include relevant emojis and a strong call-to-action in each caption.
        Also, generate a list of 10-15 relevant hashtags for this content.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
                topP: 0.95,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText) as GeneratedContent;

        if (!parsedJson.captions || !parsedJson.hashtags) {
            throw new Error("Invalid response format from AI.");
        }
        
        return parsedJson;
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from AI.");
    }
};
