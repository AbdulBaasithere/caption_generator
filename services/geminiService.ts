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

const responseSchemaPro = {
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
        },
        insights: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
                description: 'An actionable insight or suggestion to improve engagement.'
            },
            description: "An array of 3 actionable insights to improve the post's engagement."
        }
    },
    required: ['captions', 'hashtags', 'insights']
};


export const generateCaptionsAndHashtags = async (params: GenerationParams, isPro: boolean): Promise<GeneratedContent> => {
    const { topic, audience, tone, platform, language, brandVoice } = params;

    const model = isPro ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const schema = isPro ? responseSchemaPro : responseSchema;

    const languageInstruction = (language && language !== 'English') 
        ? `Generate all content STRICTLY in the following language: ${language}.` 
        : '';
    
    const brandVoiceInstruction = (isPro && brandVoice)
        ? `Adhere to this custom brand voice: "${brandVoice}".`
        : '';

    const insightsInstruction = isPro
        ? 'Additionally, provide 3 actionable insights for improving engagement on this post.'
        : '';

    const prompt = `
        ${languageInstruction}
        ${brandVoiceInstruction}
        Create 5 engaging and scroll-stopping social media captions for the platform: ${platform}.
        The topic is: "${topic}".
        The target audience is: "${audience || 'a general audience'}".
        The desired tone is: ${tone}.
        Include relevant emojis and a strong call-to-action in each caption.
        Also, generate a list of 10-15 relevant hashtags for this content.
        ${insightsInstruction}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.8,
                topP: 0.95,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText) as GeneratedContent;

        if (!parsedJson.captions || !parsedJson.hashtags) {
            throw new Error("Invalid response format from AI.");
        }
        
        if (isPro) {
            return parsedJson;
        }

        // Add watermark to captions for free users
        const watermarkedCaptions = parsedJson.captions.map(caption => 
            `${caption}\n\n---\n🚀 Generated with CaptionStudio AI`
        );

        return {
            ...parsedJson,
            captions: watermarkedCaptions,
        };
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from AI.");
    }
};
