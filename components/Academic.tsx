import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Academic: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full min-h-screen pt-48 px-6 md:px-12 flex flex-col md:flex-row gap-12 text-[#1a1a1a]">
      <div className="md:w-1/3">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sticky top-48 text-6xl md:text-8xl font-serif italic leading-[0.8]"
        >
          {t.academicTitle}
        </motion.h1>
      </div>

      <div className="md:w-2/3 flex flex-col justify-end pb-24">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="space-y-16 max-w-2xl"
        >
            <div className="space-y-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                    {t.academicIntro}
                </p>
                
                <p className="text-md md:text-lg opacity-80 leading-relaxed">
                    {t.academicP1}
                </p>
            </div>

            {/* 2024 - Apichatpong Weerasethakul Workshop */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2024</h3>
                    <span className="text-xs opacity-50 font-mono">{t.invitedLecture}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    Apichatpong Weerasethakul's Workshop<br />
                    Graduate School of Tama Art University
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    "あなたとの距離と音楽について" (About Distance and Music Between You)
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    At the personal invitation of director Apichatpong Weerasethakul, delivered a special lecture during his workshop at Tama Art University's graduate school. The lecture covered the technology and artistic application of binaural audio, Nakamura's area of expertise, providing both explanation and practical demonstrations for students and artists.
                </p>
            </div>

            {/* 2025 - National Tainan University */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2025 ~</h3>
                    <span className="text-xs opacity-50 font-mono">{t.ongoing}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    National University of Tainan, Taiwan<br />
                    Popular Music Course
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    國立台南大学 ポピュラーミュージックコース
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    Currently teaching popular music courses at the National University of Tainan in Taiwan, bringing expertise in music production, composition, and audio technology to students in an international academic setting.
                </p>
            </div>

            {/* 2015, 18, 19, 25 - Taiwan Universities */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2015, 2018, 2019, 2025</h3>
                    <span className="text-xs opacity-50 font-mono">{t.invitedLecture}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    National Tainan University & Soochow University, Taiwan
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    台湾の大学での招聘講義（國立台南大学、東呉大学）
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    Conducted a series of invited special lectures and workshops on music production and performance at several universities in Taiwan. Over multiple years, he served as a special lecturer on "Popular Music Keyboard" at the National Tainan University. He also led a week-long intensive course on Piano and DAW (Digital Audio Workstation) techniques at Soochow University. These engagements involved sharing expert knowledge of Japanese popular music and advanced production techniques, contributing to international educational exchange with local students.
                </p>
            </div>

            {/* 2024 - Showa University */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2024</h3>
                    <span className="text-xs opacity-50 font-mono">{t.researchPresentation}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    Showa University of Music Research Presentation
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    昭和音楽大学 研究発表会
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    Presented at the research conference of his alma mater, the Showa University of Music. In a joint research performance with Associate Professor Atsushi Mori (piano), Nakamura integrated his original media music and live visuals with Professor Mori's acoustic piano performance. This collaboration demonstrated new possibilities for expression that bridge the gap between artistic practice and academic research within a university setting.
                </p>
            </div>

            {/* 2022-23 - High School Contest Judge */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2022 - 2023</h3>
                    <span className="text-xs opacity-50 font-mono">{t.judge}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    All-Japan High School Light Music Contest (Kanto Regional)
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    全国高等学校軽音楽コンテスト 関東大会 審査員
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    Serving as a judge for the contest hosted by the All-Japan High School Light Music Club Federation, contributing to the discovery and development of next-generation talent. He evaluated and advised on student performances from both a technical and musical perspective. (2022 Preliminaries, 2023 Finals)
                </p>
            </div>

            {/* 2016 - Geopark Music Contest */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2016</h3>
                    <span className="text-xs opacity-50 font-mono">{t.judge}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    Shikoku Seiyo Geopark Music Contest
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    四国西予ジオパーク ミュージックコンテスト 審査員
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    Participated as a judge for a music contest where the legendary composer Nobuo Uematsu served as head of the jury. He contributed to the promotion of regional music culture by evaluating submitted works from a professional standpoint.
                </p>
            </div>

            {/* Beyond Boundary Music */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2025 ~</h3>
                    <span className="text-xs opacity-50 font-mono">{t.ongoing}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    Educational Activities through "Beyond Boundary Music"
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    主宰プラットフォーム「Beyond Boundary Music」における教育活動
                </p>
                <p className="text-sm opacity-70 leading-relaxed mb-4">
                    Through his self-produced platform, "Beyond Boundary Music," he continuously conducts public workshops and publishes technical articles on his blog (note). This serves as an open educational resource, sharing specialized knowledge widely and fostering a dialogue with the next generation of creators and art fans.
                </p>
                <a 
                    href="https://note.com/bbmusic" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                >
                    Visit Beyond Boundary Music Blog →
                </a>
            </div>

             <div className="pt-24">
                <p className="text-xs uppercase tracking-widest mb-4 opacity-50">{t.contactForLectures}</p>
                <p className="text-sm opacity-70 leading-relaxed mb-4">
                    {t.contactForLecturesDesc}
                </p>
                <a href="#/about" className="inline-block text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    {t.contactPage}
                </a>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Academic;
