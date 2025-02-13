
import Navbar from "../components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Book, Users, Clock, Medal } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: string;
  icon: JSX.Element;
  completed?: boolean;
}

const achievements: Achievement[] = [
  // Основные достижения
  {
    id: "first_step",
    title: "Первый шаг",
    description: "Пройти первый тест на любом предмете",
    xp: 50,
    category: "Основные",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />
  },
  {
    id: "knowledge_polyhedron",
    title: "Многогранник знаний",
    description: "Пройти тесты по 3 разным предметам",
    xp: 200,
    category: "Основные",
    icon: <Star className="h-6 w-6 text-purple-500" />
  },
  // ... Добавляем остальные достижения из списка
  {
    id: "study_hero",
    title: "Герой учебы",
    description: "Пройти все тесты по теме за один день",
    xp: 800,
    category: "Основные",
    icon: <Medal className="h-6 w-6 text-yellow-600" />
  },
  // Достижения за практику
  {
    id: "no_mistakes",
    title: "Без ошибок",
    description: "Решить 10 заданий подряд без ошибок по любому предмету",
    xp: 200,
    category: "Практика",
    icon: <Book className="h-6 w-6 text-green-500" />
  },
  // ... Добавляем остальные достижения за практику
  {
    id: "functional_guru",
    title: "Функциональный гуру",
    description: "Пройти все тесты по математике или другим наукам, связанным с функциями и графиками",
    xp: 400,
    category: "Практика",
    icon: <Book className="h-6 w-6 text-blue-500" />
  },
  // Достижения за вовлеченность
  {
    id: "active_participant",
    title: "Активный участник",
    description: "Пройти 10 различных тестов за день по разным предметам",
    xp: 600,
    category: "Вовлеченность",
    icon: <Users className="h-6 w-6 text-indigo-500" />
  },
  // ... Добавляем остальные достижения за вовлеченность
  {
    id: "knowledge_generator",
    title: "Генератор знаний",
    description: "Пройти 50 тестов по разным предметам",
    xp: 1000,
    category: "Вовлеченность",
    icon: <Star className="h-6 w-6 text-yellow-500" />
  },
  // Достижения за лидерборд
  {
    id: "knowledge_leader",
    title: "Лидер знаний",
    description: "Попасть в топ-10 пользователей по XP за все предметы",
    xp: 500,
    category: "Лидерборд",
    icon: <Trophy className="h-6 w-6 text-yellow-600" />
  },
  // ... Добавляем остальные достижения за лидерборд
  {
    id: "month_scientist",
    title: "Учёный месяца",
    description: "Достигнуть 2000 XP за месяц, активно проходя тесты по всем предметам",
    xp: 1500,
    category: "Лидерборд",
    icon: <Trophy className="h-6 w-6 text-yellow-700" />
  }
];

const Achievements = () => {
  const categories = Array.from(new Set(achievements.map(a => a.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Достижения</h1>
        
        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements
                .filter(achievement => achievement.category === category)
                .map(achievement => (
                  <Card 
                    key={achievement.id}
                    className={`p-4 ${
                      achievement.completed 
                        ? "bg-green-50 border-green-200" 
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium text-yellow-600">
                            {achievement.xp} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Achievements;
