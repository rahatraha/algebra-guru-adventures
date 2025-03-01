
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";

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
        <Card key={index} className="p-4 shadow-sm">
          <h3 className="font-semibold mb-2">{t('example')} {index + 1}</h3>
          <p className="mb-4 font-medium">{example.problem}</p>
          <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
            <p className="font-medium text-gray-700">{t('solution')}:</p>
            <p className="whitespace-pre-line">{example.solution}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
