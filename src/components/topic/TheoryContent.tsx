
interface TheoryContentProps {
  content: string;
}

export const TheoryContent = ({ content }: TheoryContentProps) => {
  return (
    <div 
      className="prose max-w-none bg-white p-6 rounded-xl shadow-sm border-2 border-edu-primary/20"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};
