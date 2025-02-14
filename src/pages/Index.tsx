
import { Link } from "react-router-dom";
import { Flame, Trophy, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";

const subjects = [
  { id: 'russian', name: 'Русский язык', icon: '📖', grades: [5, 6, 7, 8, 9] },
  { id: 'literature', name: 'Литература', icon: '📚', grades: [5, 6, 7, 8, 9] },
  { id: 'algebra', name: 'Алгебра', icon: '🔢', grades: [7, 8, 9] },
  { id: 'geometry', name: 'Геометрия', icon: '📐', grades: [7, 8, 9] },
  { id: 'history', name: 'История', icon: '🏛', grades: [5, 6, 7, 8, 9] },
  { id: 'geography', name: 'География', icon: '🗺', grades: [5, 6, 7, 8, 9] },
  { id: 'physics', name: 'Физика', icon: '🔬', grades: [7, 8, 9] },
  { id: 'chemistry', name: 'Химия', icon: '🧪', grades: [8, 9] },
  { id: 'biology', name: 'Биология', icon: '🦠', grades: [5, 6, 7, 8, 9] },
  { id: 'social', name: 'Обществознание', icon: '📜', grades: [5, 6, 7, 8, 9] },
  { id: 'informatics', name: 'Информатика', icon: '💻', grades: [5, 6, 7, 8, 9] },
  { id: 'english', name: 'Английский язык', icon: '💬', grades: [5, 6, 7, 8, 9] }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Добро пожаловать в Мир Знаний
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Изучайте школьные предметы в интерактивной форме
          </p>
        </div>

        {/* User Progress Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Уровень 1</h2>
              <p className="text-gray-600">100/300 XP до следующего уровня</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Flame className="h-6 w-6 text-edu-accent mr-2" />
                <span className="text-lg font-medium">3 дня подряд</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-edu-primary mr-2" />
                <span className="text-lg font-medium">5 достижений</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-edu-primary rounded-full w-1/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/${subject.id}`}
              className="group bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  <span className="mr-2">{subject.icon}</span>
                  {subject.name}
                </h3>
                <Star className="h-6 w-6 text-edu-accent" />
              </div>
              <p className="text-gray-600 mb-4">
                {subject.grades.length === 5
                  ? "5-9 классы"
                  : subject.grades.length === 3
                  ? "7-9 классы"
                  : "8-9 классы"}
              </p>
              <div className="text-edu-primary group-hover:translate-x-2 transition-transform duration-300">
                Начать обучение →
              </div>
            </Link>
          ))}
        </div>

        {/* Daily Challenge Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Ежедневный вызов
            </h2>
            <div className="flex items-center">
              <Flame className="h-6 w-6 text-edu-accent animate-pulse mr-2" />
              <span className="text-lg font-medium">Новое задание</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Решите задание и получите дополнительные XP!
            </p>
            <Link
              to="/daily-challenge"
              className="block w-full bg-edu-primary text-white rounded-lg py-3 px-6 font-medium hover:bg-edu-secondary transition-colors duration-200 text-center"
            >
              Начать вызов
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
