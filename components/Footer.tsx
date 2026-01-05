import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import InfiniteText from './InfiniteText';
import ScrambleText from './ScrambleText';

const Footer: React.FC = () => {
  return (
    <footer className="w-full min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      
      {/* Background Marquee */}
      <div className="absolute bottom-[20%] w-full opacity-5 pointer-events-none z-0">
         <InfiniteText baseVelocity={3} className="text-[15vw] font-black leading-none text-[#1a1a1a]">
            GET IN TOUCH — START A PROJECT — 
         </InfiniteText>
      </div>

      <div className="text-center z-10">
        <p className="text-sm uppercase tracking-widest mb-8 interactive">Have an idea?</p>
        <Magnetic>
            <Link to="/contact" className="interactive block text-[10vw] font-bold tracking-tighter leading-none hover:text-gray-500 transition-colors duration-300">
                <ScrambleText text="LET'S TALK" />
            </Link>
        </Magnetic>
      </div>

      <div className="absolute bottom-12 w-full px-12 flex justify-between text-sm font-bold uppercase tracking-widest z-10">
        <div className="flex gap-8">
            <Magnetic><a href="https://www.instagram.com/nakahiro0724/" target="_blank" rel="noopener noreferrer" className="interactive hover:underline block p-2"><ScrambleText text="Instagram" /></a></Magnetic>
            <Magnetic><a href="https://bbm-sound.com/" target="_blank" rel="noopener noreferrer" className="interactive hover:underline block p-2"><ScrambleText text="BBM" /></a></Magnetic>
        </div>
        <div>
            &copy; 2026 Hiroyuki Nakamura
        </div>
      </div>
      
      {/* Background Graphic */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[40vw] h-[40vw] border-[1px] border-black rounded-full opacity-10 pointer-events-none flex items-center justify-center z-0"
      >
        <div className="w-[80%] h-[80%] border-[1px] border-black rounded-full"></div>
      </motion.div>
    </footer>
  );
};

export default Footer;