import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "@google/generative-ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateContent(userId, category, keywords, length) {
    try {
        const prompt = `Crea un artículo con el título y el cuerpo sobre los siguientes temas: ${keywords.join(', ')}. 
                        El título debe ser llamativo y el cuerpo debe ser detallado.`;

        const completion = await openai.chat.completions.create({
            model: 'gemini-1.5-flash',
            messages: [
                {
                    role: 'system',
                    content: 'You are a content generator.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            store: true,
        });

        const generatedText = completion.choices[0].message.content;
        
        // Asume que el título y el cuerpo están separados por un salto de línea
        const [title, ...bodyParts] = generatedText.split('\n');
        const body = bodyParts.join('\n').trim();

        console.log('Title:', title);
        console.log('Body:', body);
    } catch (error) {
        console.error('Error generating content:', error);
    }
}

// Ejemplo de uso
generateContent('user-id-ejemplo', 'tecnología', ['inteligencia artificial', 'automatización'], 500);
