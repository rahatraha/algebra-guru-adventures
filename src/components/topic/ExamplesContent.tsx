
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface Example {
  problem: string;
  solution: string;
}

interface ExamplesContentProps {
  examples: Example[];
}

export const ExamplesContent = ({ examples }: ExamplesContentProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <Card 
          key={index} 
          className="p-6 shadow-sm overflow-hidden rounded-xl border-2 border-edu-primary/20 bg-gradient-to-br from-white to-blue-50 transition-all duration-300 hover:shadow-md hover:shadow-edu-primary/10 hover:-translate-y-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-edu-primary text-white rounded-full p-2 w-10 h-10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-edu-primary">
              {t('example')} {index + 1}
            </h3>
          </div>
          
          <div className="mb-4 border-l-4 border-edu-primary/50 pl-4 py-2 bg-white rounded-r">
            <p className="font-medium text-gray-800">{example.problem}</p>
          </div>
          
          <div className="bg-green-50 p-5 rounded-xl border-l-8 border-edu-success animate-fade-in">
            <h4 className="font-semibold text-edu-success mb-2 flex items-center gap-2">
              <span className="bg-edu-success text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
              {t('solution')}:
            </h4>
            <p className="whitespace-pre-line text-gray-700">{example.solution}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
