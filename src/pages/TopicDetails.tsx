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
            <li>Атом - мельчайшая частица химического элемента</li>
            <li>Молекула - наименьшая частица вещества</li>
            <li>Вещество - то, из чего состоят физические тела</li>
          </ul>
          <p>Химические явления (реакции):</p>
          <ul>
            <li>Выделение газа</li>
            <li>Изменение цвета</li>
            <li>Выпадение осадка</li>
            <li>Изменение температуры</li>
          </ul>
          <p>Физические явления:</p>
          <ul>
            <li>Изменение агрегатного состояния</li>
            <li>Изменение формы</li>
            <li>Деформация</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите тип вещества: вода (H₂O)",
            solution: "Вода - сложное вещество, состоит из атомов водорода (H) и кислорода (O). В молекуле воды 2 атома водорода и 1 атом кислорода."
          },
          {
            problem: "Определите тип явления: растворение сахара в воде",
            solution: "Это физическое явление, так как:\n1. Не образуется новое вещество\n2. Сахар можно выделить выпариванием воды\n3. Изменяется только агрегатное состояние сахара"
          }
        ],
        exercises: [
          {
            problem: "Классифицируйте вещества: O₂, NaCl, Fe, H₂O",
            answer: "O₂ - простое вещество (состоит из атомов одного элемента)\nNaCl - сложное вещество (состоит из атомов разных элементов)\nFe - простое вещество (состоит из атомов одного элемента)\nH₂O - сложное вещество (состоит из атомов разных элементов)"
          },
          {
            problem: "Определите тип явлений:\n1. Горение свечи\n2. Таяние льда\n3. Ржавление железа",
            answer: "1. Горение свечи - химическое явление (образуются новые вещества: CO₂ и H₂O)\n2. Таяние льда - физическое явление (изменяется только агрегатное состояние)\n3. Ржавление железа - химическое явление (образуется новое вещество - оксид железа Fe₂O₃)"
          }
        ]
      },
      1: {
        theory: `
          <h2>Кислород. Оксиды. Горение</h2>
          <p>Кислород:</p>
          <ul>
            <li>Химический символ - O</li>
            <li>Относительная атомная масса - 16</li>
            <li>Газ без цвета и запаха</li>
            <li>Плохо растворим в воде</li>
            <li>Поддерживает горение</li>
          </ul>
          <p>Оксиды - бинарные соединения элементов с кислородом:</p>
          <ul>
            <li>Основные (Na₂O, CaO)</li>
            <li>Кислотные (CO₂, SO₃)</li>
            <li>Амфотерные (Al₂O₃, ZnO)</li>
          </ul>
          <p>Горение - химическая реакция соединения веществ с кислородом, протекающая с выделением света и тепла.</p>
        `,
        examples: [
          {
            problem: "Напишите уравнение реакции горения магния",
            solution: "2Mg + O₂ = 2MgO\nМагний сгорает с образованием оксида магния. При горении наблюдается яркая вспышка."
          },
          {
            problem: "Классифицируйте оксид: SO₂",
            solution: "SO₂ (оксид серы (IV)) - кислотный оксид, так как:\n1. Образован неметаллом\n2. При взаимодействии с водой образует кислоту H₂SO₃"
          }
        ],
        exercises: [
          {
            problem: "Составьте уравнения реакций горения:\nа) алюминия\nб) серы\nв) метана (CH₄)",
            answer: "а) 4Al + 3O₂ = 2Al₂O₃\nб) S + O₂ = SO₂\nв) CH₄ + 2O₂ = CO₂ + 2H₂O"
          },
          {
            problem: "Классифицируйте оксиды: Na₂O, CO₂, ZnO, CaO, P₂O₅",
            answer: "Na₂O - основной оксид (образован активным металлом)\nCO₂ - кислотный оксид (образован неметаллом)\nZnO - амфотерный оксид\nCaO - основной оксид (образован щелочноземельным металлом)\nP₂O₅ - кислотный оксид (образован неметаллом)"
          }
        ]
      },
      2: {
        theory: `
          <h2>Водород. Кислоты. Соли</h2>
          <p>Водород:</p>
          <ul>
            <li>Химический символ - H</li>
            <li>Относительная атомная масса - 1</li>
            <li>Самый лёгкий газ</li>
            <li>Без цвета и запаха</li>
            <li>Малорастворим в воде</li>
          </ul>
          <p>Кислоты - сложные вещества, содержащие атомы водорода, способные замещаться атомами металла:</p>
          <ul>
            <li>Бескислородные (HCl, H₂S)</li>
            <li>Кислородсодержащие (H₂SO₄, HNO₃)</li>
          </ul>
          <p>Соли - продукты замещения атомов водорода в кислотах атомами металла:</p>
          <ul>
            <li>Средние (NaCl, CaSO₄)</li>
            <li>Кислые (NaHCO₃)</li>
            <li>Основные (Cu(OH)Cl)</li>
          </ul>
        `,
        examples: [
          {
            problem: "Получение водорода в лаборатории",
            solution: "Zn + 2HCl = ZnCl₂ + H₂↑\nПри взаимодействии цинка с соляной кислотой выделяется водород. Его можно собирать методом вытеснения воздуха или воды."
          },
          {
            problem: "Определите тип соли: Na₂CO₃",
            solution: "Na₂CO₃ (карбонат натрия) - средняя соль, так как:\n1. Все атомы водорода в кислоте H₂CO₃ замещены на атомы натрия\n2. Не содержит ни гидроксогрупп, ни атомов водорода от кислоты"
          }
        ],
        exercises: [
          {
            problem: "Составьте уравнения реакций получения солей:\nа) хлорида меди (II)\nб) сульфата цинка",
            answer: "а) Cu + 2HCl = CuCl₂ + H₂↑\nб) Zn + H₂SO₄ = ZnSO₄ + H₂↑"
          },
          {
            problem: "Классифицируйте соли: NaCl, KHSO₄, Cu(OH)Cl, K₂SO₄",
            answer: "NaCl - средняя соль\nKHSO₄ - кислая соль (содержит атом водорода от кислоты)\nCu(OH)Cl - основная соль (содержит гидроксогруппу)\nK₂SO₄ - средняя соль"
          }
        ]
      }
    },
    9: {
      0: {
        theory: `
          <h2>Электролитическая диссоциация</h2>
          <p>Электролитическая диссоциация - распад электролита на ионы при растворении в воде или расплавлении.</p>
          <p>Электролиты:</p>
          <ul>
            <li>Сильные (HCl, H₂SO₄, NaOH)</li>
            <li>Слабые (H₂CO₃, NH₄OH)</li>
            <li>Средние (CH₃COOH)</li>
          </ul>
          <p>Степень диссоциации:</p>
          <ul>
            <li>α = n(распавш.)/n(общее) × 100%</li>
            <li>Сильные: α > 30%</li>
            <li>Слабые: α < 3%</li>
          </ul>
        `,
        examples: [
          {
            problem: "Напишите уравнение диссоциации сульфата меди (II)",
            solution: "CuSO₄ = Cu²⁺ + SO₄²⁻\nПри растворении сульфата меди (II) в воде образуются катионы меди Cu²⁺ и анионы SO₄²⁻"
          },
          {
            problem: "Рассчитайте степень диссоциации уксусной кислоты, если из 200 молекул распалось 3",
            solution: "α = (3/200) × 100% = 1.5%\nУксусная кислота - слабый электролит (α < 3%)"
          }
        ],
        exercises: [
          {
            problem: "Напишите уравнения диссоциации:\nа) NaOH\nб) H₂SO₄\nв) Ca(OH)₂",
            answer: "а) NaOH = Na⁺ + OH⁻\nб) H₂SO₄ = 2H⁺ + SO₄²⁻\nв) Ca(OH)₂ = Ca²⁺ + 2OH⁻"
          },
          {
            problem: "Определите сильные и слабые электролиты: HCl, H₂S, KOH, H₂CO₃",
            answer: "Сильные электролиты: HCl, KOH\nСлабые электролиты: H₂S, H₂CO₃"
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
          <p>Фольклор - устное народное творчество, создаваемое народом и бытующее в народных массах.</p>
          <p>Виды фольклора:</p>
          <ul>
            <li>Сказки (волшебные, бытовые, о животных)</li>
            <li>Былины (киевский цикл, новгородский цикл)</li>
            <li>Пословицы и поговорки</li>
            <li>Загадки</li>
            <li>Песни (обрядовые, лирические)</li>
          </ul>
          <p>Особенности фольклора:</p>
          <ul>
            <li>Устная форма передачи</li>
            <li>Коллективное авторство</li>
            <li>Вариативность</li>
            <li>Традиционность</li>
          </ul>
        `,
        examples: [
          {
            problem: "Определите жанр: 'Не красна изба углами, а красна пирогами'",
            solution: "Это пословица. Признаки:\n1. Краткость\n2. Поучительный смысл\n3. Ритмичность\n4. Часто используется противопоставление"
          },
          {
            problem: "Найдите постоянные эпитеты в отрывке: 'По чисту полю, по зеленой траве бежит добрый молодец'",
            solution: "Постоянные эпитеты:\n1. чисто поле\n2. зеленая трава\n3. добрый молодец\nЭти определения традиционно используются в фольклоре"
          }
        ],
        exercises: [
          {
            problem: "Определите виды сказок:\n1. 'Колобок'\n2. 'Морозко'\n3. 'Каша из топора'",
            answer: "1. 'Колобок' - сказка о животных\n2. 'Морозко' - волшебная сказка\n3. 'Каша из топора' - бытовая сказка"
          },
          {
            problem: "Найдите общие черты былин и волшебных сказок",
            answer: "Общие черты:\n1. Фантастический элемент\n2. Троекратные повторы\n3. Постоянные эпитеты\n4. Героический характер\n5. Борьба добра со злом"
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
