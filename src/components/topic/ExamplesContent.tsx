
interface Example {
  problem: string;
  solution: string;
}

interface ExamplesContentProps {
  examples: Example[];
}

export const ExamplesContent = ({ examples }: ExamplesContentProps) => {
  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Пример {index + 1}</h3>
          <p className="mb-4">{example.problem}</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-medium">Решение:</p>
            <p className="whitespace-pre-line">{example.solution}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
