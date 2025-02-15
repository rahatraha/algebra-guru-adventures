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
  chemistry: {
    8: {
      0: {
        theory: `
          <h2>Первоначальные химические понятия</h2>
          <p>Химия - наука о веществах, их свойствах и превращениях.</p>
          <p>Основные понятия:</p>
          <ul>
            <li>Атом - мельчайшая частица химического эле��ента</li>
            <li>Молекула - наименьшая частица вещества</li>
            <li>Вещество - то, из чего состоят физические тела</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип вещества: вода (H₂O)",
            solution: "Вода - сложное вещество, состоит из атомов водорода (H) и кислорода (O)"
          }
        ],
        exercises: [
          {
            problem: "Классифицируйте вещества: O₂, NaCl, Fe, H₂O",
            answer: "O₂ - простое вещество\nNaCl - сложное вещество\nFe - простое вещество\nH₂O - сложное вещество"
          }
        ]
      },
      1: {
        theory: `
          <h2>Кислород. Водород</h2>
          <p>Кислород и водород - важнейшие химические элементы.</p>
          <p>Характеристики кислорода:</p>
          <ul>
            <li>Газ без цвета и запаха</li>
            <li>Поддерживает горение</li>
            <li>Необходим для дыхания</li>
            <li>Растворим в воде</li>
          </ul>
          <p>Характеристики водорода:</p>
          <ul>
            <li>Самый лёгкий газ</li>
            <li>Без цвета и запаха</li>
            <li>Горит с образованием воды</li>
          </ul>
        `,
        examples: [
          {
            problem: "Опишите реакцию горения водорода",
            solution: "2H₂ + O₂ = 2H₂O\nПри горении водорода в кислороде образуется вода. Реакция идёт с выделением большого количества теплоты."
          },
          {
            problem: "Как получить кислород в лаборатории?",
            solution: "1. Разложение пероксида водорода:\n2H₂O₂ = 2H₂O + O₂\n2. Разложение перманганата калия:\n2KMnO₄ = K₂MnO₄ + MnO₂ + O₂"
          }
        ],
        exercises: [
          {
            problem: "Составьте уравнение реакции получения водорода при взаимодействии цинка с соляной кислотой",
            answer: "Zn + 2HCl = ZnCl₂ + H₂"
          },
          {
            problem: "Рассчитайте объём кислорода (н.у.), который образуется при разложении 20 г пероксида водорода",
            answer: "1. 2H₂O₂ = 2H₂O + O₂\n2. m(H₂O₂) = 20 г\n3. n(H₂O₂) = 20/34 = 0,588 моль\n4. n(O₂) = 0,588/2 = 0,294 моль\n5. V(O₂) = 0,294 × 22,4 = 6,59 л"
          }
        ]
      },
      2: {
        theory: `
          <h2>Вода. Растворы</h2>
          <p>Вода - важнейшее вещество на Земле.</p>
          <p>Свойства воды:</p>
          <ul>
            <li>Бесцветная жидкость без вкуса и запаха</li>
            <li>Температура кипения 100°C</li>
            <li>Температура замерзания 0°C</li>
            <li>Универсальный растворитель</li>
          </ul>
          <p>Растворы:</p>
          <ul>
            <li>Насыщенные</li>
            <li>Ненасыщенные</li>
            <li>Пересыщенные</li>
          </ul>
        `,
        examples: [
          {
            problem: "Рассчитайте массовую долю соли в растворе, полученном при растворении 20 г соли в 180 г воды",
            solution: "1. ω = m(в-ва)/m(р-ра) × 100%\n2. m(р-ра) = m(в-ва) + m(воды) = 20 + 180 = 200 г\n3. ω = 20/200 × 100% = 10%"
          }
        ],
        exercises: [
          {
            problem: "Сколько граммов соли нужно растворить в 150 г воды для получения 10% раствора?",
            answer: "1. Пусть масса соли x г\n2. ω = x/(x + 150) × 100% = 10%\n3. 10x = x + 150\n4. 9x = 150\n5. x ≈ 16,7 г"
          }
        ]
      }
    },
    9: {
      0: {
        theory: `
          <h2>Металлы</h2>
          <p>Общие свойства металлов:</p>
          <ul>
            <li>Металлический блеск</li>
            <li>Пластичность</li>
            <li>Электропроводность</li>
            <li>Теплопроводность</li>
          </ul>
          <p>Реакции металлов:</p>
          <ul>
            <li>С кислородом</li>
            <li>С водой</li>
            <li>С кислотами</li>
            <li>С солями</li>
          </ul>
        `,
        examples: [
          {
            problem: "Напишите уравнение реакции взаимодействия натрия с водой",
            solution: "2Na + 2H₂O = 2NaOH + H₂↑\nПри взаимодействии натрия с водой образуется щёлочь и выделяется водород"
          }
        ],
        exercises: [
          {
            problem: "Составьте уравнения реакций: а) Al + O₂ → б) Fe + HCl →",
            answer: "а) 4Al + 3O₂ = 2Al₂O₃\nб) Fe + 2HCl = FeCl₂ + H₂"
          }
        ]
      }
    }
  },
  literature: {
    5: {
      0: {
        theory: `
          <h2>Устное народное творчество</h2>
          <p>Виды устного народного творчества:</p>
          <ul>
            <li>Сказки</li>
            <li>Былины</li>
            <li>Пословицы и поговорки</li>
            <li>Загадки</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите жанр: 'Не красна изба углами, а красна пирогами'",
            solution: "Это пословица. Она учит, что главное не внешняя красота, а внутреннее содержание, гостеприимство"
          }
        ],
        exercises: [
          {
            problem: "Найдите общее между сказкой и былиной",
            answer: "Общие черты:\n1. Устное народное творчество\n2. Наличие фантастических элементов\n3. Борьба добра со злом\n4. Особый стиль повествования"
          }
        ]
      }
    }
  },
  informatics: {
    7: {
      0: {
        theory: `
          <h2>Информация и информационные процессы</h2>
          <p>Виды информации:</p>
          <ul>
            <li>Текстовая</li>
            <li>Числовая</li>
            <li>Графическая</li>
            <li>Звуковая</li>
            <li>Видео</li>
          </ul>
          <p>Информационные процессы:</p>
          <ul>
            <li>Хранение</li>
            <li>Передача</li>
            <li>Обработка</li>
          </ul>
        `,
        examples: [
          {
            problem: "Рассчитайте объём текстового файла, содержащего 256 символов в кодировке ASCII",
            solution: "1. В кодировке ASCII один символ занимает 1 байт\n2. 256 символов × 1 байт = 256 байт"
          }
        ],
        exercises: [
          {
            problem: "Сколько бит потребуется для хранения 16-цветного изображения размером 100×100 пикселей?",
            answer: "1. Для кодирования 16 цветов нужно 4 бита\n2. 100 × 100 = 10000 пикселей\n3. 10000 × 4 = 40000 бит"
          }
        ]
      }
    }
  },
  english: {
    5: {
      0: {
        theory: `
          <h2>Present Simple Tense</h2>
          <p>Употребление Present Simple:</p>
          <ul>
            <li>Регулярные действия</li>
            <li>О��щеизвестные факты</li>
            <li>Расписания и графики</li>
          </ul>
          <p>Структура предложений:</p>
          <ul>
            <li>Утвердительные: I/You/We/They work, He/She/It works</li>
            <li>Отрицательные: I/You/We/They don't work, He/She/It doesn't work</li>
            <li>Вопросительные: Do I/you/we/they work? Does he/she/it work?</li>
          </ul>
        `,
        examples: [
          {
            problem: "Make sentences in Present Simple with 'study'",
            solution: "Positive: I study English every day\nNegative: He doesn't study on Sundays\nQuestion: Do you study French?"
          }
        ],
        exercises: [
          {
            problem: "Put the verbs in brackets in Present Simple: 1) She (live) in London. 2) They (not/play) tennis.",
            answer: "1) She lives in London\n2) They don't play tennis"
          }
        ]
      }
    }
  },
  geography: {
    5: {
      0: {
        theory: `
          <h2>Введение в географию</h2>
          <p>География - наука о Земле, её природе, населении и его хозяйственной деятельности.</p>
          <p>Основные разделы географии:</p>
          <ul>
            <li>Физическая география</li>
            <li>Экономическая география</li>
            <li>Социальная география</li>
            <li>Картография</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите стороны горизонта по компасу",
            solution: "1. Положите компас на ровную поверхность\n2. Дождитесь, пока стрелка остановится\n3. Северный конец стрелки укажет на север\n4. Определите остальные стороны горизонта"
          }
        ],
        exercises: [
          {
            problem: "Назовите основные способы изучения Земли",
            answer: "1. Полевые исследования\n2. Картографический метод\n3. Космическая съёмка\n4. Статистический метод"
          }
        ]
      }
    }
  },
  history: {
    6: {
      0: {
        theory: `
          <h2>История Древнего мира</h2>
          <p>Основные периоды истории Древнего мира:</p>
          <ul>
            <li>Первобытное общество</li>
            <li>Древний Восток</li>
            <li>Античность</li>
          </ul>
          <p>Исторические источники:</p>
          <ul>
            <li>Письменные</li>
            <li>Вещественные</li>
            <li>Устные</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип исторического источника: берестяная грамота",
            solution: "Берестяная грамота - письменный исторический источник. Это текст, процарапанный на березовой коре, который содержит информацию о жизни людей в древности."
          }
        ],
        exercises: [
          {
            problem: "Расположите в хронологическом порядке: а) появление письменности б) появление человека в) образование первых государств",
            answer: "1. Появление человека\n2. Появление письменности\n3. Образование первых государств"
          }
        ]
      }
    }
  },
  social: {
    6: {
      0: {
        theory: `
          <h2>Человек в социальном измерении</h2>
          <p>Основные характеристики personally��ти:</p>
          <ul>
            <li>Индивидуальность</li>
            <li>Социальность</li>
            <li>Активность</li>
            <li>Развитие</li>
          </ul>
          <p>Виды деятельности человека:</p>
          <ul>
            <li>Игра</li>
            <li>Учение</li>
            <li>Труд</li>
            <li>Общение</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите вид деятельности: ребенок собирает конструктор",
            solution: "Это игровая деятельность. Через игру ребенок познает мир, развивает моторику и мышление."
          }
        ],
        exercises: [
          {
            problem: "Приведите примеры различных видов деятельности человека в разном возрасте",
            answer: "Детство: игра, общение\nШкольный возраст: учеба, спорт\nВзрослый возраст: работа, творчество\nПожилой возраст: хобби, передача опыта"
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
