
interface TheoryContentProps {
  content: string;
}

export const TheoryContent = ({ content }: TheoryContentProps) => {
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};
