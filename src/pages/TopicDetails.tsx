
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface TopicContent {
  theory: string;
  examples: Array<{
    problem: string;
    solution: string;
  }>;
  exercises: Array<{
    problem: string;
    answer: string;
  }>;
}

const topics: Record<string, Record<string, Record<number, TopicContent>>> = {
  algebra: {
    5: {
      0: {
        theory: `
          <h2>Натуральные числа</h2>
          <p>Натуральные числа - это числа, которые используются для счёта предметов: 1, 2, 3, 4, 5, ...</p>
          <p>Основные свойства натуральных чисел:</p>
          <ul>
            <li>Каждое натуральное число имеет следующее за ним число</li>
            <li>Любое натуральное число, кроме 1, имеет предыдущее число</li>
            <li>Натуральные числа можно сравнивать</li>
          </ul>
        `,
        examples: [
          {
            problem: "Расположите числа в порядке возрастания: 15, 8, 23, 4, 16",
            solution: "4, 8, 15, 16, 23"
          },
          {
            problem: "Найдите следующее число после 99",
            solution: "100 - следующее натуральное число после 99"
          }
        ],
        exercises: [
          {
            problem: "Расположите числа в порядке убывания: 45, 67, 32, 89, 12",
            answer: "89, 67, 45, 32, 12"
          },
          {
            problem: "Какое число находится между 24 и 26?",
            answer: "25"
          }
        ]
      }
    }
  },
  russian: {
    5: {
      0: {
        theory: `
          <h2>Фонетика</h2>
          <p>Фонетика - это раздел науки о языке, который изучает звуки речи.</p>
          <p>Основные понятия фонетики:</p>
          <ul>
            <li>Гласные звуки - звуки, при произношении которых воздух не встречает преград</li>
            <li>Согласные звуки - звуки, при произношении которых воздух встречает преграды</li>
            <li>Ударение - выделение одного из слогов в слове силой голоса</li>
          </ul>
        `,
        examples: [
          {
            problem: "Сделайте фонетический разбор слова 'река'",
            solution: "река - [р'иека]\nр' - согл., мягк., звонк.\nи - гласн., безуд.\nе - гласн., ударн.\nк - согл., тверд., глух.\nа - гласн., безуд."
          }
        ],
        exercises: [
          {
            problem: "Сделайте фонетический разбор слова 'мяч'",
            answer: "мяч - [м'ач']\nм' - согл., мягк., звонк.\nа - гласн., ударн.\nч' - согл., мягк., глух."
          }
        ]
      }
    }
  }
};

const TopicDetails = () => {
  const { subject, grade, topicId } = useParams();
  
  if (!subject || !grade || !topicId || !topics[subject]?.[grade]?.[topicId]) {
    return <div>Тема не найдена</div>;
  }

  const content = topics[subject][grade][topicId];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="theory">Теория</TabsTrigger>
                  <TabsTrigger value="examples">Примеры</TabsTrigger>
                  <TabsTrigger value="exercises">Упражнения</TabsTrigger>
                </TabsList>
                
                <TabsContent value="theory">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content.theory }} 
                  />
                </TabsContent>

                <TabsContent value="examples">
                  <div className="space-y-6">
                    {content.examples.map((example, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">Пример {index + 1}</h3>
                        <p className="mb-4">{example.problem}</p>
                        <div className="bg-gray-50 p-4 rounded">
                          <p className="font-medium">Решение:</p>
                          <p className="whitespace-pre-line">{example.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exercises">
                  <div className="space-y-6">
                    {content.exercises.map((exercise, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">Упражнение {index + 1}</h3>
                        <p className="mb-4">{exercise.problem}</p>
                        <Button 
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => {
                            const button = document.getElementById(`answer-${index}`);
                            if (button) {
                              button.textContent = exercise.answer;
                            }
                          }}
                        >
                          <span id={`answer-${index}`}>Показать ответ</span>
                          <CheckCircle2 className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TopicDetails;
