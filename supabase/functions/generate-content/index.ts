import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  type: 'theory' | 'examples' | 'exercises' | 'quiz' | 'flashcards';
  subject: string;
  topic: string;
  grade: number;
  language?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type, subject, topic, grade, language = 'ru' } = await req.json() as GenerateRequest;

    console.log(`Generating ${type} for ${subject}/${topic} (grade ${grade})`);

    const prompts = {
      theory: `Ты — опытный учитель ${subject}. Напиши подробную теорию по теме "${topic}" для ${grade} класса.
Язык: ${language === 'kk' ? 'казахский' : 'русский'}.
Требования:
- Объясняй простым и понятным языком для школьника
- Включи основные понятия и определения
- Приведи формулы если нужно (используй LaTeX формат)
- Добавь интересные факты
- Структурируй текст с заголовками
- Объём: 500-800 слов`,

      examples: `Ты — опытный учитель ${subject}. Создай 5 примеров задач с подробными решениями по теме "${topic}" для ${grade} класса.
Язык: ${language === 'kk' ? 'казахский' : 'русский'}.
Формат ответа — JSON массив:
[
  {
    "problem": "Условие задачи",
    "solution": "Подробное пошаговое решение"
  }
]
Только JSON, без дополнительного текста.`,

      exercises: `Ты — опытный учитель ${subject}. Создай 10 упражнений для самостоятельной работы по теме "${topic}" для ${grade} класса.
Язык: ${language === 'kk' ? 'казахский' : 'русский'}.
Сложность: от простых к сложным.
Формат ответа — JSON массив:
[
  {
    "problem": "Условие задачи",
    "answer": "Краткий ответ"
  }
]
Только JSON, без дополнительного текста.`,

      quiz: `Ты — опытный учитель ${subject}. Создай викторину из 10 вопросов по теме "${topic}" для ${grade} класса.
Язык: ${language === 'kk' ? 'казахский' : 'русский'}.
Формат ответа — JSON:
{
  "questions": [
    {
      "id": "q1",
      "question": "Текст вопроса",
      "options": ["Вариант А", "Вариант Б", "Вариант В", "Вариант Г"],
      "correctAnswer": 0,
      "explanation": "Объяснение правильного ответа"
    }
  ]
}
Только JSON, без дополнительного текста.`,

      flashcards: `Ты — опытный учитель ${subject}. Создай 15 флеш-карточек для запоминания по теме "${topic}" для ${grade} класса.
Язык: ${language === 'kk' ? 'казахский' : 'русский'}.
Включи: термины, формулы, даты, факты.
Формат ответа — JSON массив:
[
  {
    "front": "Вопрос или термин",
    "back": "Ответ или определение"
  }
]
Только JSON, без дополнительного текста.`
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "Ты помощник для создания образовательного контента. Отвечай точно в запрошенном формате." 
          },
          { role: "user", content: prompts[type] }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, попробуйте позже" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Необходимо пополнить баланс" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    console.log(`Generated content for ${type}:`, content?.substring(0, 200));

    // Parse JSON for structured responses
    if (type !== 'theory') {
      try {
        // Extract JSON from possible markdown code blocks
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
        content = JSON.parse(jsonMatch[1].trim());
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        // Try to extract JSON array or object directly
        const arrayMatch = content.match(/\[[\s\S]*\]/);
        const objectMatch = content.match(/\{[\s\S]*\}/);
        if (arrayMatch) {
          content = JSON.parse(arrayMatch[0]);
        } else if (objectMatch) {
          content = JSON.parse(objectMatch[0]);
        }
      }
    }

    return new Response(JSON.stringify({ content, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-content function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});