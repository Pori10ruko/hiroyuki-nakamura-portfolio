import React, { useEffect, useRef } from 'react';

const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    const render = () => {
      time += 0.015; // Increased speed for more visible flow
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Style settings - Bold and Chic
      ctx.lineWidth = 1.5; // Thicker lines for visibility
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.5)'; // Darker opacity (0.2 -> 0.5)
      
      const lines = 10; // Slight increase in density
      const baseAmplitude = 60; // Increased base wave height
      
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Distribute lines across the screen height
        const yOffset = (canvas.height / lines) * i + (canvas.height / lines) / 2;
        
        // Draw the wave
        for (let x = 0; x < canvas.width; x += 5) { // Smaller step for smoother curves
            // Distance from mouse
            const dist = Math.abs(x - mouseX);
            
            // Mouse Interaction Logic:
            // Using cubic falloff for a more "magnetic" and organic feel.
            // Range is wider (1000px) and effect is much stronger (150px height).
            const influence = Math.max(0, 1 - dist / 1000); 
            const mouseEffect = Math.pow(influence, 3) * 150;

            // Sine wave math - Layered frequencies
            const frequency = 0.002 + (i * 0.0005);
            
            // Primary wave (Flow)
            const wave = Math.sin(x * frequency + time + (i * 0.5));
            
            // Secondary wave (Organic noise)
            const organic = Math.cos(x * 0.001 - time * 0.8);

            // Calculate Y position
            // Add mouse Y influence to slightly pull lines up/down based on cursor height
            const mouseYShift = (mouseY / canvas.height - 0.5) * 50 * influence;

            const y = yOffset 
                    + (wave * baseAmplitude) 
                    + (organic * 30) 
                    + (Math.sin(x * 0.01 + time * 2) * mouseEffect) // Rapid flutter near mouse
                    + mouseYShift;
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-multiply"
    />
  );
};

export default AudioVisualizer;