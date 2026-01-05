import React, { useRef, useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  useHover?: boolean;
}

// Minimalist set: Only Uppercase for a clean, flip-board aesthetic.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  scrambleSpeed = 40, // Slightly slower for elegance
  useHover = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '; // Preserve spaces
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2; // Slower reveal for a luxurious feel
    }, scrambleSpeed);
  };

  useEffect(() => {
    setDisplayText(text);
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleSpeed]);

  const handleMouseEnter = () => {
    if (useHover) {
      setIsHovered(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    if (useHover) {
      setIsHovered(false);
    }
  };

  return (
    <span 
      className={`inline-block whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;