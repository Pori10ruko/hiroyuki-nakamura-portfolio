import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = 'Contact | NAKAMURA Hiroyuki';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const translations = {
    en: {
      title: 'CONTACT',
      subtitle: 'Get in touch',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
      directEmail: 'Or email directly',
      inquiriesFor: 'Inquiries for',
      lectures: 'Lectures & Workshops',
      collaboration: 'Collaboration & Projects',
      general: 'General Inquiries'
    },
    ja: {
      title: 'CONTACT',
      subtitle: 'お問い合わせ',
      name: 'お名前',
      email: 'メールアドレス',
      subject: '件名',
      message: 'メッセージ',
      send: '送信する',
      sending: '送信中...',
      success: 'メッセージを送信しました！',
      error: '送信に失敗しました。もう一度お試しください。',
      directEmail: 'または直接メールを送信',
      inquiriesFor: 'お問い合わせ内容',
      lectures: '講演・ワークショップ',
      collaboration: 'コラボレーション・プロジェクト',
      general: '一般的なお問い合わせ'
    },
    zh: {
      title: 'CONTACT',
      subtitle: '聯絡我們',
      name: '姓名',
      email: '電子郵件',
      subject: '主題',
      message: '訊息',
      send: '發送訊息',
      sending: '發送中...',
      success: '訊息已成功發送！',
      error: '發送失敗。請再試一次。',
      directEmail: '或直接發送電子郵件',
      inquiriesFor: '諮詢內容',
      lectures: '講座與工作坊',
      collaboration: '合作與專案',
      general: '一般諮詢'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Create mailto link with form data
    const mailtoLink = `mailto:nakamurahiroyuki.com@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full min-h-screen pt-32 md:pt-48 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8 md:gap-12 text-[#1a1a1a]">
      <div className="md:w-1/3">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sticky top-48 text-6xl md:text-8xl font-serif italic leading-[0.8]"
        >
          {t.title}
        </motion.h1>
      </div>

      <div className="md:w-2/3 flex flex-col justify-end pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-12 max-w-2xl"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            {t.subtitle}
          </p>

          {/* Inquiry Categories */}
          <div className="space-y-4 text-sm opacity-70">
            <p className="font-bold uppercase tracking-widest text-xs">{t.inquiriesFor}</p>
            <ul className="space-y-2">
              <li>• {t.lectures}</li>
              <li>• {t.collaboration}</li>
              <li>• {t.general}</li>
            </ul>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-8">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.name}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-[#1a1a1a]/20 focus:border-[#1a1a1a] outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.email}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-[#1a1a1a]/20 focus:border-[#1a1a1a] outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.subject}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-[#1a1a1a]/20 focus:border-[#1a1a1a] outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.message}
                required
                rows={6}
                className="w-full px-4 py-3 bg-transparent border-2 border-[#1a1a1a]/20 focus:border-[#1a1a1a] outline-none transition-colors text-lg resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-4 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ScrambleText text={status === 'sending' ? t.sending : t.send} />
            </button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-bold"
              >
                {t.success}
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 font-bold"
              >
                {t.error}
              </motion.p>
            )}
          </form>

          {/* Direct Email */}
          <div className="pt-12 border-t border-[#1a1a1a]/20">
            <p className="text-xs uppercase tracking-widest mb-4 opacity-50">{t.directEmail}</p>
            <a 
              href="mailto:nakamurahiroyuki.com@gmail.com" 
              className="inline-block text-2xl md:text-3xl font-serif italic hover:opacity-50 transition-opacity"
            >
              <ScrambleText text="nakamurahiroyuki.com@gmail.com" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
