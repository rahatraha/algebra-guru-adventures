import { Link } from "react-router-dom";
import { Flame, Trophy, Star, ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { subjectNames } from "../data/subjects";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

const Index = () => {
  const { t, language } = useLanguage();
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mainRef.current) return;
    
    // Clean up any previous elements
    const existingElements = mainRef.current.querySelectorAll('.duolingo-shape');
    existingElements.forEach(el => el.remove());
    
    // Add Duolingo-inspired decorative shapes in the background
    const shapes = [
      { type: 'circle', color: '#6366F130', size: '100px' },
      { type: 'circle', color: '#10B98130', size: '80px' }, 
      { type: 'circle', color: '#F59E0B30', size: '120px' },
      { type: 'square', color: '#8B5CF630', size: '90px' },
      { type: 'square', color: '#6366F130', size: '70px' },
      { type: 'triangle', color: '#10B98130', size: '100px' },
      { type: 'triangle', color: '#F59E0B30', size: '80px' },
      { type: 'zigzag', color: '#6366F130', size: '150px' }
    ];
    
    shapes.forEach((shape, index) => {
      const element = document.createElement('div');
      element.className = 'duolingo-shape';
      
      if (shape.type === 'circle') {
        element.style.width = shape.size;
        element.style.height = shape.size;
        element.style.borderRadius = '50%';
        element.style.backgroundColor = shape.color;
      } else if (shape.type === 'square') {
        element.style.width = shape.size;
        element.style.height = shape.size;
        element.style.backgroundColor = shape.color;
        element.style.transform = `rotate(${Math.random() * 45}deg)`;
      } else if (shape.type === 'triangle') {
        const sizeNum = parseInt(shape.size);
        element.style.width = '0';
        element.style.height = '0';
        element.style.borderLeft = `${sizeNum/2}px solid transparent`;
        element.style.borderRight = `${sizeNum/2}px solid transparent`;
        element.style.borderBottom = `${sizeNum}px solid ${shape.color}`;
      } else if (shape.type === 'zigzag') {
        const sizeNum = parseInt(shape.size);
        element.style.width = shape.size;
        element.style.height = `${sizeNum/5}px`;
        element.style.backgroundImage = `linear-gradient(135deg, ${shape.color} 25%, transparent 25%), 
                                       linear-gradient(225deg, ${shape.color} 25%, transparent 25%), 
                                       linear-gradient(315deg, ${shape.color} 25%, transparent 25%), 
                                       linear-gradient(45deg, ${shape.color} 25%, transparent 25%)`;
        element.style.backgroundSize = `${sizeNum/3}px ${sizeNum/3}px`;
      }
      
      // Position randomly on the page
      element.style.top = `${Math.random() * 100}%`;
      element.style.left = `${Math.random() * 100}%`;
      
      // Add some will float randomly (Duolingo style)
      if (index % 3 === 0) {
        element.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 2}s`;
      }
      
      mainRef.current?.appendChild(element);
    });
    
    // Add some educational symbols
    const symbols = ['∑', '∫', '√', 'π', 'θ', '∞', 'Δ', '≥', 'α', 'β', '÷', '×'];
    for (let i = 0; i < 15; i++) {
      const symbol = document.createElement('div');
      symbol.className = 'duolingo-shape';
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.fontSize = `${30 + Math.random() * 20}px`;
      symbol.style.color = ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 4)] + '30';
      symbol.style.top = `${Math.random() * 100}%`;
      symbol.style.left = `${Math.random() * 100}%`;
      symbol.style.fontWeight = 'bold';
      
      // Rotate some symbols for visual interest
      symbol.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
      
      // Float animation for some symbols
      if (i % 4 === 0) {
        symbol.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
        symbol.style.animationDelay = `${Math.random() * 2}s`;
      }
      
      mainRef.current?.appendChild(symbol);
    }
    
  }, []);
  
  const subjects = [
    {
      id: 'russian',
      name: subjectNames[language].russian,
      icon: '📖',
      grades: [5, 6, 7, 8, 9],
      color: 'from-blue-50 to-blue-100 border-blue-200'
    }, 
    {
      id: 'literature',
      name: subjectNames[language].literature,
      icon: '📚',
      grades: [5, 6, 7, 8, 9],
      color: 'from-purple-50 to-purple-100 border-purple-200'
    }, 
    {
      id: 'algebra',
      name: subjectNames[language].algebra,
      icon: '🔢',
      grades: [7, 8, 9],
      color: 'from-green-50 to-green-100 border-green-200'
    }, 
    {
      id: 'geometry',
      name: subjectNames[language].geometry,
      icon: '📐',
      grades: [7, 8, 9],
      color: 'from-yellow-50 to-yellow-100 border-yellow-200'
    }, 
    {
      id: 'history',
      name: subjectNames[language].history,
      icon: '🏛',
      grades: [5, 6, 7, 8, 9],
      color: 'from-orange-50 to-orange-100 border-orange-200'
    }, 
    {
      id: 'geography',
      name: subjectNames[language].geography,
      icon: '🗺',
      grades: [5, 6, 7, 8, 9],
      color: 'from-teal-50 to-teal-100 border-teal-200'
    }, 
    {
      id: 'physics',
      name: subjectNames[language].physics,
      icon: '🔬',
      grades: [7, 8, 9],
      color: 'from-cyan-50 to-cyan-100 border-cyan-200'
    }, 
    {
      id: 'chemistry',
      name: subjectNames[language].chemistry,
      icon: '🧪',
      grades: [8, 9],
      color: 'from-red-50 to-red-100 border-red-200'
    }, 
    {
      id: 'biology',
      name: subjectNames[language].biology,
      icon: '🦠',
      grades: [5, 6, 7, 8, 9],
      color: 'from-emerald-50 to-emerald-100 border-emerald-200'
    }, 
    {
      id: 'social',
      name: subjectNames[language].social,
      icon: '📜',
      grades: [5, 6, 7, 8, 9],
      color: 'from-indigo-50 to-indigo-100 border-indigo-200'
    }, 
    {
      id: 'informatics',
      name: subjectNames[language].informatics,
      icon: '💻',
      grades: [5, 6, 7, 8, 9],
      color: 'from-blue-50 to-blue-100 border-blue-200'
    }, 
    {
      id: 'english',
      name: subjectNames[language].english,
      icon: '💬',
      grades: [5, 6, 7, 8, 9],
      color: 'from-pink-50 to-pink-100 border-pink-200'
    },
    {
      id: 'kazakh',
      name: subjectNames[language].kazakh,
      icon: '🇰🇿',
      grades: [5, 6, 7, 8, 9],
      color: 'from-sky-50 to-sky-100 border-sky-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main ref={mainRef} className="container mx-auto px-4 py-8 relative overflow-hidden">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-edu-primary mb-4">
            {t('welcome')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* User Progress Section */}
        <Card className="p-6 mb-10 bg-gradient-to-br from-edu-primary/5 to-edu-primary/10 border-2 border-edu-primary/20 rounded-2xl progress-card-bg">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-edu-primary">{t('level')} 1</h2>
              <p className="text-gray-600">100/300 {t('to_next_level')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Flame className="h-6 w-6 text-edu-accent mr-2" />
                <span className="text-lg font-medium">3 {t('streak')}</span>
              </div>
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-lg font-medium">5 {t('achievements')}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-3 bg-white rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-gradient-to-r from-edu-primary to-edu-secondary rounded-full w-1/3 transition-all duration-500"></div>
          </div>
          
          {/* Duolingo-inspired decorative pattern for progress card */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="rounded-full" 
                style={{
                  width: 6, 
                  height: 6, 
                  backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6'][i]
                }}
              ></div>
            ))}
          </div>
        </Card>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
          {subjects.map(subject => (
            <Link 
              key={subject.id} 
              to={`/${subject.id}`} 
              className="group"
            >
              <Card className={`bg-gradient-to-br ${subject.color} border-2 p-5 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 subject-card`}>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{subject.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {subject.grades.length === 5 
                          ? `5-9 ${t('grades')}` 
                          : subject.grades.length === 3 
                            ? `7-9 ${t('grades')}` 
                            : `8-9 ${t('grades')}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:bg-edu-primary group-hover:text-white transition-colors duration-300">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                </div>
                {/* Progress Indicator */}
                <div className="mt-4 h-2 bg-white/70 rounded-full overflow-hidden">
                  <div className="h-full bg-edu-primary/40 rounded-full w-1/4 transition-all duration-500"></div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Daily Challenge Section */}
        <Card className="p-6 bg-gradient-to-br from-edu-accent/10 to-edu-accent/20 border-2 border-edu-accent/30 rounded-2xl mb-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-edu-accent">
              {t('daily_challenge')}
            </h2>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
              <Flame className="h-6 w-6 text-edu-accent animate-pulse mr-2" />
              <span className="text-lg font-medium">{t('new_task')}</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-lg text-gray-700 mb-4">
              {t('solve_task')}
            </p>
            <Link 
              to="/daily-challenge" 
              className="block w-full bg-gradient-to-r from-edu-accent to-edu-accent/80 text-white rounded-lg py-3 px-6 font-medium hover:from-edu-accent/90 hover:to-edu-accent/70 transition-colors duration-200 text-center"
            >
              {t('start_challenge')}
            </Link>
          </div>
          
          {/* Examples of challenges */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-edu-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">{t('earn_more_xp')}</h3>
              </div>
              <p className="text-sm text-gray-600">+50 XP</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-edu-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-edu-accent" />
                <h3 className="font-medium">{t('keep_streak')}</h3>
              </div>
              <p className="text-sm text-gray-600">+1 {t('day')}</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
