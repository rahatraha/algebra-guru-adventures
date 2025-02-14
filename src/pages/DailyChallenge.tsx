
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  subject: "algebra" | "russian";
  text: string;
  options: string[];
  correctAnswer: string;
}

const DailyChallenge = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Создаем аудио элементы для звуковых эффектов
  const correctSound = new Audio("/correct.mp3");
  const incorrectSound = new Audio("/wrong.mp3");

  useEffect(() => {
    // В реальном приложении это будет API запрос
    const sampleQuestions: Question[] = [
      {
        id: 1,
        subject: "algebra",
        text: "Решите уравнение: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 8", "x = 6"],
        correctAnswer: "x = 5"
      },
      {
        id: 2,
        subject: "russian",
        text: "Укажите слово с проверяемой безударной гласной в корне",
        options: ["вода", "собака", "молоко", "корова"],
        correctAnswer: "вода"
      },
      {
        id: 3,
        subject: "algebra",
        text: "Найдите значение выражения: 125 ÷ 5",
        options: ["15", "25", "30", "20"],
        correctAnswer: "25"
      },
      {
        id: 4,
        subject: "russian",
        text: "В каком слове все согласные звуки мягкие?",
        options: ["щель", "чаща", "шить", "жить"],
        correctAnswer: "щель"
      }
    ];

    const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    setQuestions(sampleQuestions);
    setCurrentQuestion(randomQuestion);
  }, []);

  const handleAnswer = async (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      correctSound.play();
      toast({
        title: "Правильно!",
        description: "+50 XP",
        className: "bg-edu-success text-white"
      });
    } else {
      incorrectSound.play();
      toast({
        title: "Неправильно!",
        description: "Попробуйте завтра снова",
        className: "bg-edu-error text-white"
      });
    }

    // Ждем 2 секунды перед перенаправлением, чтобы пользователь увидел результат
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!currentQuestion) return <div>Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Ежедневный вызов
            </h1>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg text-gray-800 mb-4">{currentQuestion.text}</p>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={answered}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        answered
                          ? option === currentQuestion.correctAnswer
                            ? "bg-edu-success text-white"
                            : option === selectedAnswer
                            ? "bg-edu-error text-white"
                            : "bg-gray-100"
                          : "bg-white border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && option === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="h-5 w-5" />
                        )}
                        {answered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyChallenge;
