
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, EyeOff, Book, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Exercise {
  problem: string;
  answer: string;
}

interface ExercisesContentProps {
  exercises: Exercise[];
}

export const ExercisesContent = ({ exercises }: ExercisesContentProps) => {
  const { t } = useLanguage();
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});
  const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const toggleAnswer = (index: number) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    
    // Mark as completed when showing answer
    if (!visibleAnswers[index] && !completedExercises[index]) {
      setCompletedExercises(prev => ({
        ...prev,
        [index]: true
      }));
    }
  };
  
  // Create background patterns when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any previous patterns
    const existingBgElements = containerRef.current.querySelectorAll('.bg-pattern');
    existingBgElements.forEach(el => el.remove());
    
    // Create formula patterns in the background
    const formulas = ['E=mc²', 'a²+b²=c²', 'F=ma', 'PV=nRT', 'f(x)=0'];
    
    for (let i = 0; i < 10; i++) {
      const formula = document.createElement('div');
      formula.className = 'bg-pattern absolute text-xl opacity-5 select-none z-0 font-mono';
      formula.textContent = formulas[Math.floor(Math.random() * formulas.length)];
      formula.style.top = `${Math.random() * 100}%`;
      formula.style.left = `${Math.random() * 100}%`;
      formula.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
      containerRef.current.appendChild(formula);
    }
    
    // Add geometric shapes (Duolingo-inspired)
    const colors = ['#6366F1', '#10B981', '#F59E0B'];
    for (let i = 0; i < 12; i++) {
      const shape = document.createElement('div');
      shape.className = 'bg-pattern absolute opacity-10 z-0';
      
      // Alternate between circles, squares and triangles
      const shapeType = i % 3;
      const size = 20 + Math.random() * 40;
      const color = colors[i % colors.length];
      
      if (shapeType === 0) {
        // Circle
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.borderRadius = '50%';
        shape.style.backgroundColor = color;
      } else if (shapeType === 1) {
        // Square
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.borderRadius = '4px';
        shape.style.transform = `rotate(${Math.random() * 45}deg)`;
      } else {
        // Triangle
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size/2}px solid transparent`;
        shape.style.borderRight = `${size/2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${color}`;
      }
      
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.left = `${Math.random() * 100}%`;
      containerRef.current.appendChild(shape);
    }
  }, []);
  
  return (
    <div ref={containerRef} className="space-y-8 relative">
      <div className="flex justify-between items-center bg-edu-primary/10 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-edu-primary flex items-center gap-2">
          <Award className="h-5 w-5" />
          {t('exercises')}
        </h2>
        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-edu-primary border border-edu-primary/20">
          {Object.keys(completedExercises).length}/{exercises.length} {t('completed')}
        </div>
      </div>
      
      {/* Duolingo-style decorative circles */}
      <div className="absolute top-14 right-4 flex gap-1.5">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="rounded-full" 
            style={{
              width: 8, 
              height: 8, 
              backgroundColor: ['#6366F1', '#10B981', '#F59E0B'][i]
            }}
          ></div>
        ))}
      </div>
      
      {exercises.map((exercise, index) => (
        <Card 
          key={index} 
          className={`p-6 shadow-sm overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-md relative z-10 ${
            completedExercises[index] 
              ? "border-edu-success/30 bg-gradient-to-br from-white to-green-50" 
              : "border-edu-accent/30 bg-gradient-to-br from-white to-yellow-50"
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`rounded-full p-2 w-10 h-10 flex items-center justify-center flex-shrink-0 ${
              completedExercises[index] ? "bg-edu-success text-white" : "bg-edu-accent text-white"
            }`}>
              {completedExercises[index] ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Book className="h-5 w-5" />
              )}
            </div>
            <h3 className={`font-bold text-lg ${
              completedExercises[index] ? "text-edu-success" : "text-edu-accent"
            }`}>
              {t('exercise')} {index + 1}
            </h3>
          </div>
          
          <div className="mb-6 border-l-4 pl-4 py-2 bg-white rounded-r border-edu-accent">
            <p className="whitespace-pre-line font-medium text-gray-800">{exercise.problem}</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              variant="outline"
              className={`w-full justify-between font-semibold ${
                visibleAnswers[index] 
                  ? "bg-edu-primary/10 text-edu-primary border-edu-primary/30" 
                  : "bg-edu-accent/10 text-edu-accent border-edu-accent/30 hover:bg-edu-accent/20"
              }`}
              onClick={() => toggleAnswer(index)}
            >
              <span>{visibleAnswers[index] ? t('hide_answer') : t('show_answer')}</span>
              {visibleAnswers[index] ? 
                <EyeOff className="h-4 w-4 ml-2" /> : 
                <Eye className="h-4 w-4 ml-2" />
              }
            </Button>
            
            {visibleAnswers[index] && (
              <div className="bg-green-50 p-5 rounded-xl border-l-8 border-edu-success animate-fade-in">
                <div className="flex items-start">
                  <div className="bg-edu-success text-white rounded-full min-w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-edu-success mb-2">
                      {t('correct_answer')}
                    </h4>
                    <p className="whitespace-pre-line text-gray-700">{exercise.answer}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {completedExercises[index] && !visibleAnswers[index] && (
            <div className="mt-4 text-center text-sm text-edu-success font-medium">
              ✓ {t('marked_as_completed')}
            </div>
          )}

          {/* Duolingo-style decorative dots in bottom corner */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="rounded-full bg-gray-200" 
                style={{
                  width: 4, 
                  height: 4
                }}
              ></div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
