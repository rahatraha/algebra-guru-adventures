
import { useState } from "react";
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
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-edu-primary/10 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-edu-primary flex items-center gap-2">
          <Award className="h-5 w-5" />
          {t('exercises')}
        </h2>
        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-edu-primary border border-edu-primary/20">
          {Object.keys(completedExercises).length}/{exercises.length} {t('completed')}
        </div>
      </div>
      
      {exercises.map((exercise, index) => (
        <Card 
          key={index} 
          className={`p-6 shadow-sm overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
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
        </Card>
      ))}
    </div>
  );
};
