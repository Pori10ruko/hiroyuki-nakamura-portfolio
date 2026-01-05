import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-[#dfdbd5] overflow-hidden pointer-events-none">
      {/* Base Breathing Gradient */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={{
          background: [
            'linear-gradient(135deg, #e8e4e0 0%, #dfdbd5 50%, #cec9c2 100%)',
            'linear-gradient(135deg, #f0ece9 0%, #e6e2dd 50%, #d6d1ca 100%)',
            'linear-gradient(135deg, #e8e4e0 0%, #dfdbd5 50%, #cec9c2 100%)',
          ],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Shimmering Overlay */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light"
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Deep Shadow Vignette (Static base) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 20%, rgba(20,20,20,0.08) 100%)'
        }}
      />

      {/* Floating Light Orb (Warm & Pulsing) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 250, 240, 0.6) 0%, rgba(255,255,255,0) 70%)',
          mixBlendMode: 'overlay'
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.7, 0.3], // Stronger pulse
        }}
        transition={{
          duration: 8, // Faster breathing
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Deep Tone Orb (Cool/Shadow) */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(160, 155, 150, 0.3) 0%, rgba(0,0,0,0) 70%)',
          mixBlendMode: 'multiply'
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.2, 0.4], // Counter-pulse
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      />
    </div>
  );
};

export default AmbientBackground;