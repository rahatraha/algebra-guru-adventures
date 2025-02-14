import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Book } from "lucide-react";

type SubjectId = 
  | "russian" 
  | "literature" 
  | "algebra" 
  | "geometry" 
  | "history" 
  | "geography" 
  | "physics" 
  | "chemistry" 
  | "biology" 
  | "social" 
  | "informatics" 
  | "english";

const subjectNames: Record<SubjectId, string> = {
  russian: "Русский язык",
  literature: "Литература",
  algebra: "Алгебра",
  geometry: "Геометрия",
  history: "История",
  geography: "География",
  physics: "Физика",
  chemistry: "Химия",
  biology: "Биология",
  social: "Обществознание",
  informatics: "Информатика",
  english: "Английский язык"
};

const getGradesForSubject = (subject: SubjectId): number[] => {
  switch (subject) {
    case "algebra":
    case "geometry":
    case "physics":
      return [7, 8, 9];
    case "chemistry":
      return [8, 9];
    default:
      return [5, 6, 7, 8, 9];
  }
};

const topics = {
  algebra: {
    5: [
      "Натуральные числа",
      "Сложение и вычитание",
      "Умножение и деление",
      "Площадь и периметр",
      "Обыкновенные дроби"
    ],
    6: [
      "Делимость чисел",
      "Сложение и вычитание дробей",
      "Умножение и деление дробей",
      "Отношения и пропорции",
      "Положительные и отрицательные числа"
    ],
    7: [
      "Выражения и их преобразования",
      "Уравнения с одной переменной",
      "Функции",
      "Степень с натуральным показателем",
      "Многочлены"
    ],
    8: [
      "Рациональные дроби",
      "Квадратные корни",
      "Квадратные уравнения",
      "Неравенства",
      "Степень с целым показателем"
    ],
    9: [
      "Квадратичная функция",
      "Уравнения и неравенства с одной переменной",
      "Уравнения и неравенства с двумя переменными",
      "Арифметическая и геометрическая прогрессии",
      "Элементы комбинаторики и теории вероятностей"
    ]
  },
  russian: {
    5: [
      "Фонетика",
      "Орфография",
      "Морфемика",
      "Лексика",
      "Морфология"
    ],
    6: [
      "Имя существительное",
      "Имя прилагательное",
      "Имя числительное",
      "Местоимение",
      "Глагол"
    ],
    7: [
      "Причастие",
      "Деепричастие",
      "Наречие",
      "Служебные части речи",
      "Междометие"
    ],
    8: [
      "Словосочетание",
      "Простое предложение",
      "Главные члены предложения",
      "Второстепенные члены предложения",
      "Односоставные предложения"
    ],
    9: [
      "Сложное предложение",
      "Сложносочиненные предложения",
      "Сложноподчиненные предложения",
      "Бессоюзные сложные предложения",
      "Сложные предложения с разными видами связи"
    ]
  }
};

const SubjectGrade = () => {
  const { subject } = useParams<{ subject: SubjectId }>();
  
  if (!subject || !subjectNames[subject]) {
    return <div>Предмет не найден</div>;
  }

  const grades = getGradesForSubject(subject);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {subjectNames[subject]}
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grades.map((grade) => (
            <div
              key={grade}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {grade} класс
              </h2>
              <ul className="space-y-3">
                {topics[subject]?.[grade]?.map((topic, index) => (
                  <li key={index}>
                    <Link
                      to={`/${subject}/${grade}/${index}`}
                      className="flex items-center space-x-2 text-gray-700 hover:text-edu-primary transition-colors duration-200"
                    >
                      <Book className="h-4 w-4" />
                      <span>{topic}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubjectGrade;
