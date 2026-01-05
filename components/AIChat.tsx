import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome. I am the digital echo of Hiroyuki. How may I assist your curiosity?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <motion.button
        className="interactive fixed bottom-8 right-8 z-[60] w-14 h-14 bg-[#1a1a1a] text-[#dfdbd5] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        onClick={toggleChat}
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 h-screen w-full md:w-[400px] bg-[#dfdbd5] border-l border-[#1a1a1a]/10 shadow-2xl z-[55] flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-[#1a1a1a]/10 flex justify-between items-center bg-[#dfdbd5]">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest">Digital Consciousness</h3>
                <span className="text-xs text-[#1a1a1a]/60 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </span>
              </div>
              <button onClick={toggleChat} className="interactive p-2 hover:rotate-90 transition-transform">
                  <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#dfdbd5]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1a1a1a] text-[#dfdbd5]'
                        : 'border border-[#1a1a1a] text-[#1a1a1a]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <span className="text-xs uppercase tracking-widest animate-pulse">Thinking...</span>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-[#1a1a1a]/10 bg-[#dfdbd5]">
              <div className="flex gap-4 items-center border-b border-[#1a1a1a] pb-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent focus:outline-none text-[#1a1a1a] placeholder-[#1a1a1a]/40"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="interactive disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;