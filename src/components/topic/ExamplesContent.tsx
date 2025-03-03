
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";

interface Example {
  problem: string;
  solution: string;
}

interface ExamplesContentProps {
  examples: Example[];
}

export const ExamplesContent = ({ examples }: ExamplesContentProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create background patterns when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any previous patterns
    const existingBgElements = containerRef.current.querySelectorAll('.bg-element');
    existingBgElements.forEach(el => el.remove());
    
    // Add geometric patterns (Duolingo-inspired)
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div');
      const size = 30 + Math.random() * 20;
      const shapeTypes = ['circle', 'square'];
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const color = i % 2 === 0 ? '#6366F120' : '#10B98120';
      
      shape.className = 'bg-element absolute z-0';
      
      if (shapeType === 'circle') {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.borderRadius = '50%';
      } else {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.borderRadius = '6px';
        shape.style.transform = `rotate(${Math.random() * 45}deg)`;
      }
      
      shape.style.backgroundColor = color;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.left = `${Math.random() * 100}%`;
      containerRef.current.appendChild(shape);
    }
  }, []);
  
  return (
    <div ref={containerRef} className="space-y-6 relative pb-10">
      {/* Duolingo-style decorative elements at top */}
      <div className="flex gap-2 mb-4 ml-1">
        <div className="bg-edu-primary rounded-full w-3 h-3"></div>
        <div className="bg-edu-success rounded-full w-3 h-3"></div>
        <div className="bg-edu-accent rounded-full w-3 h-3"></div>
      </div>
      
      {examples.map((example, index) => (
        <Card 
          key={index} 
          className="p-6 shadow-sm overflow-hidden rounded-xl border-2 border-edu-primary/20 bg-gradient-to-br from-white to-blue-50 transition-all duration-300 hover:shadow-md hover:shadow-edu-primary/10 hover:-translate-y-1 relative z-10"
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
      
      {/* Add a Duolingo-inspired footer with zigzag pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
        <div className="flex">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 bg-edu-primary transform rotate-45"
              style={{
                marginLeft: i === 0 ? '-8px' : '-16px',
                marginTop: i % 2 === 0 ? '0' : '8px',
                opacity: 0.8 - (i * 0.02)
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
