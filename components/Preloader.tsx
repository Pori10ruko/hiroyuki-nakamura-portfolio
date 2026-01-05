import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Speed of counter

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Small delay before unmounting to show 100%
      setTimeout(onComplete, 800);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 bg-[#1a1a1a] text-[#dfdbd5]"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-bold uppercase tracking-widest">Hiroyuki Nakamura</h1>
        <div className="text-xl font-bold">©2024</div>
      </div>
      
      <div className="flex justify-between items-end">
         <div className="text-9xl md:text-[12vw] font-bold leading-none tracking-tighter">
            {count}%
         </div>
         <div className="hidden md:block text-sm uppercase max-w-xs text-right mb-4">
            Loading artistic experience.<br/>
            Please wait while we curate the pixels.
         </div>
      </div>
    </motion.div>
  );
};

export default Preloader;