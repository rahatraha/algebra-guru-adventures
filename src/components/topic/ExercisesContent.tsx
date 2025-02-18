
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface Exercise {
  problem: string;
  answer: string;
}

interface ExercisesContentProps {
  exercises: Exercise[];
}

export const ExercisesContent = ({ exercises }: ExercisesContentProps) => {
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
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
  );
};
