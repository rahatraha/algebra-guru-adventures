
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
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
  
  const toggleAnswer = (index: number) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <Card key={index} className="p-4 shadow-sm">
          <h3 className="font-semibold mb-2">{t('exercise')} {index + 1}</h3>
          <p className="mb-4 whitespace-pre-line">{exercise.problem}</p>
          
          <div className="space-y-2">
            <Button 
              variant="outline"
              className="w-full justify-between"
              onClick={() => toggleAnswer(index)}
            >
              <span>{visibleAnswers[index] ? t('hide_answer') : t('show_answer')}</span>
              {visibleAnswers[index] ? 
                <EyeOff className="h-4 w-4 ml-2" /> : 
                <Eye className="h-4 w-4 ml-2" />
              }
            </Button>
            
            {visibleAnswers[index] && (
              <div className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <p className="whitespace-pre-line">{exercise.answer}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
