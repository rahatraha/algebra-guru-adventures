
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TheoryContentProps {
  content: string;
}

export const TheoryContent = ({ content }: TheoryContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create background patterns when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any previous patterns
    const existingBgElements = containerRef.current.querySelectorAll('.bg-element');
    existingBgElements.forEach(el => el.remove());
    
    // Create mathematical symbols and shapes
    const symbols = ['∑', '∫', '√', 'π', '∞', '÷', '×', '=', 'α', 'β', 'Δ'];
    const colors = ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B'];
    
    // Add math symbols
    for (let i = 0; i < 15; i++) {
      const symbol = document.createElement('div');
      symbol.className = 'bg-element absolute text-3xl opacity-5 select-none z-0 font-bold transform';
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.color = colors[Math.floor(Math.random() * colors.length)];
      symbol.style.top = `${Math.random() * 100}%`;
      symbol.style.left = `${Math.random() * 100}%`;
      symbol.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
      containerRef.current.appendChild(symbol);
    }
    
    // Add geometric shapes (inspired by Duolingo)
    const shapes = ['circle', 'triangle', 'square', 'zigzag'];
    for (let i = 0; i < 10; i++) {
      const shape = document.createElement('div');
      shape.className = `bg-element absolute opacity-5 select-none z-0`;
      
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 20 + Math.random() * 30;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      switch (shapeType) {
        case 'circle':
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.borderRadius = '50%';
          shape.style.backgroundColor = color;
          break;
        case 'triangle':
          shape.style.width = '0';
          shape.style.height = '0';
          shape.style.borderLeft = `${size/2}px solid transparent`;
          shape.style.borderRight = `${size/2}px solid transparent`;
          shape.style.borderBottom = `${size}px solid ${color}`;
          break;
        case 'square':
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.backgroundColor = color;
          break;
        case 'zigzag':
          shape.style.width = `${size}px`;
          shape.style.height = `${size/4}px`;
          shape.style.backgroundImage = `linear-gradient(135deg, ${color} 25%, transparent 25%), 
                                         linear-gradient(225deg, ${color} 25%, transparent 25%), 
                                         linear-gradient(315deg, ${color} 25%, transparent 25%), 
                                         linear-gradient(45deg, ${color} 25%, transparent 25%)`;
          shape.style.backgroundSize = `${size/2}px ${size/2}px`;
          break;
      }
      
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.transform = `rotate(${Math.random() * 360}deg)`;
      containerRef.current.appendChild(shape);
    }
    
    // Add a book illustration
    const book = document.createElement('div');
    book.className = 'bg-element absolute opacity-5 z-0';
    book.style.width = '100px';
    book.style.height = '70px';
    book.style.border = '3px solid #6366F1';
    book.style.borderRadius = '3px 10px 10px 3px';
    book.style.bottom = '15%';
    book.style.right = '10%';
    book.style.transform = 'rotate(-5deg)';
    containerRef.current.appendChild(book);
    
    // Add book pages
    const pages = document.createElement('div');
    pages.className = 'absolute inset-0 m-1';
    pages.style.borderRight = '2px solid #6366F180';
    book.appendChild(pages);
    
    // Add notebook/laptop outline
    const laptop = document.createElement('div');
    laptop.className = 'bg-element absolute opacity-5 z-0';
    laptop.style.width = '120px';
    laptop.style.height = '80px';
    laptop.style.border = '3px solid #10B981';
    laptop.style.borderRadius = '5px';
    laptop.style.top = '20%';
    laptop.style.left = '15%';
    containerRef.current.appendChild(laptop);
    
    // Add laptop screen
    const screen = document.createElement('div');
    screen.className = 'absolute inset-0 m-2';
    screen.style.border = '1px solid #10B98180';
    laptop.appendChild(screen);

  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "prose max-w-none relative overflow-hidden",
        "bg-gradient-to-br from-white to-blue-50/30",
        "p-8 rounded-xl shadow-sm border-2 border-edu-primary/20"
      )}
    >
      {/* Duolingo-style pattern at the top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-edu-primary"></div>
      <div className="absolute top-2 left-0 right-0 h-2 bg-edu-success"></div>
      <div className="absolute top-4 left-0 right-0 h-2 bg-edu-accent"></div>
      
      {/* Content with a slight background to make it readable */}
      <div 
        className="relative z-10 bg-white/90 p-6 rounded-lg shadow-sm"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};
