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
      },
      1: {
        theory: `
          <h2>Орфография</h2>
          <p>Орфография - это раздел науки о языке, изучающий правила написания слов.</p>
          <p>Основные правила орфографии:</p>
          <ul>
            <li>Правописание безударных гласных в корне слова</li>
            <li>Правописание парных согласных</li>
            <li>Правописание непроизносимых согласных</li>
            <li>Правописание приставок</li>
          </ul>
          <p>Чтобы проверить безударную гласную в корне слова, нужно изменить слово так, чтобы проверяемая гласная оказалась под ударением.</p>
        `,
        examples: [
          {
            problem: "Как проверить написание слова 'вода'?",
            solution: "Чтобы проверить безударную гласную О в слове вода, нужно подобрать однокоренное слово, где эта гласная под ударением: вóды. Значит, в слове 'вода' пишется О."
          },
          {
            problem: "Как проверить написание слова 'мороз'?",
            solution: "В слове 'мороз' две буквы О. Первую можно проверить словом 'замóрозки', вторую проверять не нужно, так как она под ударением."
          }
        ],
        exercises: [
          {
            problem: "Вставьте пропущенную букву: в..да, л..са, тр..ва",
            answer: "вода, лиса, трава\nПроверочные слова: воды, лисы, травы"
          },
          {
            problem: "Подберите проверочные слова: м..рской, х..лодный, св..тить",
            answer: "морской (море), холодный (холод), светить (свет)"
          }
        ]
      },
      2: {
        theory: `
          <h2>Морфемика</h2>
          <p>Морфемика - это раздел науки о языке, который изучает строение слов.</p>
          <p>Основные морфемы (части слова):</p>
          <ul>
            <li>Корень - главная часть слова, в которой заключено общее значение всех однокоренных слов</li>
            <li>Приставка - часть слова, которая стоит перед корнем и служит для образования новых слов</li>
            <li>Суффикс - часть слова, которая стоит после корня и служит для образования новых слов</li>
            <li>Окончание - изменяемая часть слова, которая служит для связи слов в предложении</li>
          </ul>
          <p>Примеры разбора слов по составу:</p>
          <pre>
подснежник = под|снеж|ник|□
пришкольный = при|школь|н|ый
          </pre>
        `,
        examples: [
          {
            problem: "Разберите по составу слово 'подводный'",
            solution: "под - приставка\nвод - корень\nн - суффикс\nый - окончание"
          },
          {
            problem: "Найдите однокоренные слова: лес, лесник, лесной, прилесье",
            solution: "Все эти слова являются однокоренными, так как имеют общий корень -лес-"
          }
        ],
        exercises: [
          {
            problem: "Разберите по составу слова: домик, придорожный, подоконник",
            answer: "домик = дом|ик|□\nпридорожный = при|дорож|н|ый\nподоконник = под|окон|ник|□"
          },
          {
            problem: "Выделите корень в словах: лесной, перелесок, лесник, лесистый",
            answer: "Корень -лес- во всех словах"
          }
        ]
      },
      3: {
        theory: `
          <h2>Лексика</h2>
          <p>Лексика - это раздел науки о языке, изучающий словарный состав языка.</p>
          <p>Основные понятия лексики:</p>
          <ul>
            <li>Однозначные и многозначные слова</li>
            <li>Прямое и переносное значение слова</li>
            <li>Синонимы - слова, близкие по значению</li>
            <li>Антонимы - слова, противоположные по значению</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите, в каком значении употреблено слово 'золотой' в словосочетаниях: золотое кольцо, золотые руки, золотая осень",
            solution: "Золотое кольцо - прямое значение (сделанное из золота)\nЗолотые руки - переносное значение (умелые)\nЗолотая осень - переносное значение (о цвете листьев)"
          }
        ],
        exercises: [
          {
            problem: "Подберите синонимы к словам: храбрый, большой, говорить",
            answer: "Храбрый - смелый, отважный, бесстрашный\nБольшой - огромный, громадный, гигантский\nГоворить - сказать, молвить, произнести"
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
