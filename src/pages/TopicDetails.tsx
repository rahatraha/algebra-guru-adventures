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
  russian: {
    "5": {
      0: {
        theory: `
          <h2>Фонетика и графика</h2>
          <p>Изучение звуков речи и их обозначение на письме.</p>
          <p>Основные понятия:</p>
          <ul>
            <li>Звуки речи (гласные и согласные)</li>
            <li>Буквы русского алфавита</li>
            <li>Слог, ударение</li>
            <li>Фонетический разбор</li>
          </ul>
        `,
        examples: [
          {
            problem: "Сделайте фонетический разбор слова 'ёжик'",
            solution: "ёжик - 2 слога\n[й'ожык]\nё - [й'о] - 2 звука\nж - [ж] - согл., тв., звонк.\nи - [ы] - гласн., безуд.\nк - [к] - согл., тв., глух."
          }
        ],
        exercises: [
          {
            problem: "Выполните фонетический разбор слов: мяч, юла, ель",
            answer: "мяч: [м'ач'] - 1 слог\nюла: [й'ула] - 2 слога\nель: [й'эл'] - 1 слог"
          }
        ]
      },
      1: {
        theory: `
          <h2>Морфемика и словообразование</h2>
          <p>Изучение состава слова и способов образования новых слов.</p>
          <p>Основные понятия:</p>
          <ul>
            <li>Морфемы (корень, приставка, суффикс, окончание)</li>
            <li>Основа слова</li>
            <li>Однокоренные слова</li>
            <li>Способы словообразования</li>
          </ul>
        `,
        examples: [
          {
            problem: "Разберите слово 'подснежник' по составу",
            solution: "1) под- (приставка)\n2) -снеж- (корень)\n3) -ник (суффикс)\n4) ∅ (нулевое окончание)"
          }
        ],
        exercises: [
          {
            problem: "Разберите по составу слова: подоконник, пришкольный, лесник",
            answer: "подоконник: под-окон-ник-∅\nпришкольный: при-школь-н-ый\nлесник: лес-ник-∅"
          }
        ]
      },
      2: {
        theory: `
          <h2>Орфография</h2>
          <p>Правила правописания слов.</p>
          <p>Основные правила:</p>
          <ul>
            <li>Правописание корней</li>
            <li>Правописание приставок</li>
            <li>Правописание окончаний</li>
            <li>Правописание Ь и Ъ</li>
          </ul>
        `,
        examples: [
          {
            problem: "Объясните написание слова 'подъезд'",
            solution: "1) Приставка под-\n2) Корень -езд-\n3) Ъ пишется после приставки перед е\n4) Показывает твёрдость согласного"
          }
        ],
        exercises: [
          {
            problem: "Вставьте пропущенные буквы: п..дъём, в..езд, с..ёмка",
            answer: "подъём\nвъезд\nсъёмка"
          }
        ]
      }
    }
  },
  mathematics: {
    "5": {
      0: {
        theory: `
          <h2>Натуральные числа</h2>
          <p>Числа, используемые для счёта предметов.</p>
          <p>Основные свойства:</p>
          <ul>
            <li>Любое натуральное число имеет следующее</li>
            <li>Можно выполнять арифметические действия</li>
            <li>Числа можно сравнивать</li>
          </ul>
        `,
        examples: [
          {
            problem: "Сравните числа: 245 и 254",
            solution: "1) Сравниваем поразрядно\n2) В разряде сотен одинаковые цифры (2)\n3) В разряде десятков 4 < 5\n4) Значит 245 < 254"
          }
        ],
        exercises: [
          {
            problem: "Расположите числа в порядке возрастания: 678, 687, 867, 876, 768",
            answer: "678 < 687 < 768 < 867 < 876"
          }
        ]
      },
      1: {
        theory: `
          <h2>Дроби</h2>
          <p>Числа, состоящие из целой и дробной части.</p>
          <p>Виды дробей:</p>
          <ul>
            <li>Правильные и неправильные</li>
            <li>Смешанные числа</li>
            <li>Десятичные дроби</li>
          </ul>
        `,
        examples: [
          {
            problem: "Сравните дроби: 3/4 и 5/6",
            solution: "1) Приводим к общему знаменателю: 12\n2) 3/4 = 9/12\n3) 5/6 = 10/12\n4) 9 < 10, значит 3/4 < 5/6"
          }
        ],
        exercises: [
          {
            problem: "Выполните действия: 1/2 + 1/4, 3/4 - 1/3",
            answer: "1/2 + 1/4 = 2/4 + 1/4 = 3/4\n3/4 - 1/3 = 9/12 - 4/12 = 5/12"
          }
        ]
      },
      2: {
        theory: `
          <h2>Геометрические фигуры</h2>
          <p>Простейшие геометрические фигуры и их свойства.</p>
          <p>Основные понятия:</p>
          <ul>
            <li>Точка, прямая, отрезок</li>
            <li>Угол и его виды</li>
            <li>Треугольник</li>
            <li>Прямоугольник и квадрат</li>
          </ul>
        `,
        examples: [
          {
            problem: "Найдите периметр прямоугольника со с��оронами 5 см и 3 см",
            solution: "1) P = 2(a + b)\n2) P = 2(5 + 3)\n3) P = 2 × 8\n4) P = 16 см"
          }
        ],
        exercises: [
          {
            problem: "Вычислите:\n1) Периметр квадрата со стороной 4 см\n2) Площадь прямоугольника 6 см × 3 см",
            answer: "1) P = 4 × 4 = 16 см\n2) S = 6 × 3 = 18 см²"
          }
        ]
      }
    }
  },
  literature: {
    "5": {
      0: {
        theory: `
          <h2>Устное народное творчество</h2>
          <p>Фольклор - коллективное народное творчество.</p>
          <p>Жанры фольклора:</p>
          <ul>
            <li>Сказки</li>
            <li>Былины</li>
            <li>Пословицы и поговорки</li>
            <li>Загадки</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите жанр: 'Сестрица Алёнушка и братец Иванушка'",
            solution: "Это волшебная сказка:\n1) Есть чудесные превращения\n2) Присут��твуют постоянные эпитеты\n3) Имеет традиционный зачин и концовку"
          }
        ],
        exercises: [
          {
            problem: "Найдите общие черты в сказках 'Царевна-лягушка' и 'Морозко'",
            answer: "1) Волшебные превращения\n2) Испытания героев\n3) Добро побеждает зло\n4) Троекратные повторы"
          }
        ]
      }
    }
  },
  history: {
    "5": {
      0: {
        theory: `
          <h2>Введение в историю</h2>
          <p>История - наука о прошлом человечества.</p>
          <p>Исторические источники:</p>
          <ul>
            <li>Письменные</li>
            <li>Вещественные</li>
            <li>Устные</li>
            <li>Этнографические</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип исторического источника: берестяные грамоты",
            solution: "Это письменный источник:\n1) Содержит текст\n2) Относится к периоду Древней Руси\n3) Даёт информацию о повседневной жизни"
          }
        ],
        exercises: [
          {
            problem: "Классифицируйте источники: монеты, летописи, орудия труда, сказания",
            answer: "Монеты - вещественные\nЛетописи - письменные\nОрудия труда - вещественные\nСказания - устные"
          }
        ]
      }
    }
  },
  physics: {
    "7": {
      0: {
        theory: `
          <h2>Физические явления</h2>
          <p>Изучение природных явлений и их закономерностей.</p>
          <p>Виды явлений:</p>
          <ul>
            <li>Механические</li>
            <li>Тепловые</li>
            <li>Электрические</li>
            <li>Оптические</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите вид явления: кипение воды",
            solution: "Это тепловое явление:\n1) Связано с изменением температуры\n2) Происходит изменение агрегатного состояния\n3) Требуется подвод тепла"
          }
        ],
        exercises: [
          {
            problem: "Классифицируйте явления: гроза, радуга, падение мяча, таяние льда",
            answer: "Гроза - электрическое\nРадуга - оптическое\nПадение мяча - механическое\nТаяние льда - тепловое"
          }
        ]
      }
    }
  },
  chemistry: {
    "8": {
      0: {
        theory: `
          <h2>Предмет химии</h2>
          <p>Химия изучает вещества и их превращения.</p>
          <p>Основные понятия:</p>
          <ul>
            <li>Атомы и молекулы</li>
            <li>Химические элементы</li>
            <li>Пр��стые и сложные вещества</li>
            <li>Химические реакции</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип вещества: вода (H₂O)",
            solution: "Это сложное вещество:\n1) Состоит из разных атомов\n2) Содержит водород и кислород\n3) Имеет определённую формулу"
          }
        ],
        exercises: [
          {
            problem: "Классифицируйте вещества: O₂, NaCl, Fe, CO₂",
            answer: "O₂ - простое вещество\nNaCl - сложное вещество\nFe - простое вещество\nCO₂ - сложное вещество"
          }
        ]
      }
    }
  },
  biology: {
    "5": {
      0: {
        theory: `
          <h2>Введение в биологию</h2>
          <p>Биология - наука о живой природе.</p>
          <p>Признаки живых организмов:</p>
          <ul>
            <li>Питание</li>
            <li>Дыхание</li>
            <li>Размножение</li>
            <li>Рост и развитие</li>
          </ul>
        `,
        examples: [
          {
            problem: "Докажите, что растение - живой организм",
            solution: "1) Питается (фотосинтез)\n2) Дышит (поглощает O₂, выделяет CO₂)\n3) Размножается (семенами, черенками)\n4) Растёт и развивается"
          }
        ],
        exercises: [
          {
            problem: "Найдите признаки живого у гриба, бактерии и животного",
            answer: "Гриб: питание, рост, размножение\nБактерия: деление, питание, рост\nЖивотное: движение, питание, размножение"
          }
        ]
      }
    }
  },
  geography: {
    "5": {
      0: {
        theory: `
          <h2>География как наука</h2>
          <p>География изучает природу Земли, население и хозяйство.</p>
          <p>Методы географии:</p>
          <ul>
            <li>Наблюдение</li>
            <li>Картографический</li>
            <li>Статистический</li>
            <li>Космический</li>
          </ul>
        `,
        examples: [
          {
            problem: "Как определить стороны горизонта по компасу?",
            solution: "1) Положить компас горизонтально\n2) Дождаться остановки стрелки\n3) Синий конец - север\n4) Определить остальные стороны"
          }
        ],
        exercises: [
          {
            problem: "Определите масштаб карты, если расстояние 100 км представлено отрезком 2 см",
            answer: "1) 100 км = 10000000 см\n2) 2 см на карте = 10000000 см на местности\n3) Масштаб 1:5000000"
          }
        ]
      }
    }
  },
  english: {
    "5": {
      0: {
        theory: `
          <h2>Английский алфавит</h2>
          <p>26 букв, передающих 44 зву��а.</p>
          <p>Основные правила чтения:</p>
          <ul>
            <li>Открытый и закрытый слог</li>
            <li>Чтение гласных букв</li>
            <li>Особые буквосочетания</li>
            <li>Непроизносимые буквы</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип слога: name, cat, pen",
            solution: "name - открытый слог (a читается как [eɪ])\ncat - закрытый слог (a читается как [æ])\npen - закрытый слог (e читается как [e])"
          }
        ],
        exercises: [
          {
            problem: "Прочитайте слова: take, make, cake, lake",
            answer: "take [teɪk]\nmake [meɪk]\ncake [keɪk]\nlake [leɪk]"
          }
        ]
      }
    }
  },
  informatics: {
    "5": {
      0: {
        theory: `
          <h2>Информация и информационные процессы</h2>
          <p>Информация - сведения об окружающем мире.</p>
          <p>Виды информации:</p>
          <ul>
            <li>Текстовая</li>
            <li>Числовая</li>
            <li>Графическая</li>
            <li>Звуковая</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите вид информации: фотография, песня, телефонный номер",
            solution: "Фотография - графическая информация\nПесня - звуковая информация\nТелефонный номер - числовая информация"
          }
        ],
        exercises: [
          {
            problem: "Найдите примеры разных видов информации в учебнике",
            answer: "Текстовая - параграф учебника\nЧисловая - номера страниц\nГрафическая - иллюстрации\nЗвуковая - аудиоприложение"
          }
        ]
      }
    }
  }
};

const TopicDetails = () => {
  const { subject, grade, topicId } = useParams();
  
  if (!subject || !grade || !topicId || !topics[subject]?.[grade]?.[topicId]) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Тема не найдена</h2>
              <p className="text-gray-600">Извините, запрашиваемая тема не существует или была удалена.</p>
            </div>
          </Card>
        </main>
      </div>
    );
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
