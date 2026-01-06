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
                    {t.apichatpong2024Title}<br />
                    {t.apichatpong2024Subtitle}
                </h4>
                <img 
                    src="https://static.wixstatic.com/media/dbd631_914a7904f42445bd9fbcd6f441042366~mv2.png" 
                    alt="Apichatpong Weerasethakul Workshop" 
                    className="w-full max-w-xs mx-auto h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    {t.apichatpong2024Desc1}
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    {t.apichatpong2024Desc2}
                </p>
            </div>

            {/* 2025 - National Tainan University */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2025 ~</h3>
                    <span className="text-xs opacity-50 font-mono">{t.ongoing}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {t.tainan2025Title}<br />
                    {t.tainan2025Subtitle}
                </h4>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    {t.tainan2025Desc1}
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    {t.tainan2025Desc2}
                </p>
            </div>

            {/* 2015, 18, 19, 25 - Taiwan Universities */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2015, 2018, 2019, 2025</h3>
                    <span className="text-xs opacity-50 font-mono">{t.invitedLecture}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {t.taiwan2015Title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-2xl mx-auto">
                    <img 
                        src="https://www.dropbox.com/scl/fi/pbd4i3vigmcxgjd7kojez/LINE_20260106_150400.jpg?rlkey=1wk2gnlcv8oa46ds0ak42sl0y&raw=1" 
                        alt="Taiwan University Lecture 1" 
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img 
                        src="https://www.dropbox.com/scl/fi/rame5r8w7p68rvutj2tmo/510124538_10086190324801921_4341018970870501989_n.jpg?rlkey=iw6u5tfzqapiakwb7cmqes21h&raw=1" 
                        alt="Taiwan University Lecture 2" 
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    {t.taiwan2015Desc1}
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    {t.taiwan2015Desc2}
                </p>
            </div>

            {/* 2024 - Showa University */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2024</h3>
                    <span className="text-xs opacity-50 font-mono">{t.researchPresentation}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {t.showa2024Title}
                </h4>
                <img 
                    src="https://www.dropbox.com/scl/fi/kzlim75s3pxyh45x550j0/2025-07-19-11.17.22.png?rlkey=402bv0w80qndzog8b03ovhq9e&raw=1" 
                    alt="Showa University of Music" 
                    className="w-full max-w-sm mx-auto h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-sm opacity-80 leading-relaxed mb-2">
                    {t.showa2024Desc1}
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                    {t.showa2024Desc2}
                </p>
            </div>

            {/* 2022-23 - High School Contest Judge */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2022 - 2023</h3>
                    <span className="text-xs opacity-50 font-mono">{t.judge}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {language === 'ja' ? '全国高等学校軽音楽コンテスト 関東大会 審査員' : language === 'zh' ? '全國高中輕音樂大賽 關東地區 評審' : 'All-Japan High School Light Music Contest (Kanto Regional)'}
                </h4>
                <img 
                    src="https://www.dropbox.com/scl/fi/k70byyq3ihotsciyj4j7u/20180821-1.jpg?rlkey=4vwhlba0fphs2i3ob9clm0pp4&raw=1" 
                    alt="High School Light Music Contest" 
                    className="w-full max-w-sm mx-auto h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-sm opacity-70 leading-relaxed">
                    {language === 'ja' 
                      ? '全国高等学校軽音楽連盟が主催するコンテストの審査員として、次世代の才能の発見・育成に貢献。技術的・音楽的な観点から生徒のパフォーマンスを評価し、アドバイスを提供。（2022年予選、2023年決勝）'
                      : language === 'zh'
                      ? '擔任全國高中輕音樂聯盟主辦大賽的評審，為發掘及培育下一代音樂人才做出貢獻。從技術與音樂角度評價學生表演並提供建議。（2022年預賽、2023年決賽）'
                      : 'Serving as a judge for the contest hosted by the All-Japan High School Light Music Club Federation, contributing to the discovery and development of next-generation talent. He evaluated and advised on student performances from both a technical and musical perspective. (2022 Preliminaries, 2023 Finals)'}
                </p>
            </div>

            {/* 2016 - Geopark Music Contest */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2016</h3>
                    <span className="text-xs opacity-50 font-mono">{t.judge}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {language === 'ja' ? '四国西予ジオパーク ミュージックコンテスト 審査員' : language === 'zh' ? '四國西予地質公園 音樂大賽 評審' : 'Shikoku Seiyo Geopark Music Contest'}
                </h4>
                <img 
                    src="https://www.dropbox.com/scl/fi/frkslegkypne80hnzdlg6/5.jpg?rlkey=xtu3m9mcizoxvu9yzm8g3hhkl&raw=1" 
                    alt="Shikoku Seiyo Geopark Music Contest" 
                    className="w-full max-w-xs mx-auto h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-sm opacity-70 leading-relaxed">
                    {language === 'ja'
                      ? '伝説的作曲家・植松伸夫氏が審査委員長を務める音楽コンテストに審査員として参加。プロフェッショナルな観点から応募作品を評価し、地域の音楽文化振興に貢献。'
                      : language === 'zh'
                      ? '參與由傳奇作曲家植松伸夫擔任評審委員長的音樂大賽評審工作。以專業角度評價參賽作品，為地方音樂文化推廣做出貢獻。'
                      : 'Participated as a judge for a music contest where the legendary composer Nobuo Uematsu served as head of the jury. He contributed to the promotion of regional music culture by evaluating submitted works from a professional standpoint.'}
                </p>
            </div>

            {/* Beyond Boundary Music */}
            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-sm">2025 ~</h3>
                    <span className="text-xs opacity-50 font-mono">{t.ongoing}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {language === 'ja' ? '主宰プラットフォーム「Beyond Boundary Music」における教育活動' : language === 'zh' ? '主辦平台「Beyond Boundary Music」的教育活動' : 'Educational Activities through "Beyond Boundary Music"'}
                </h4>
                <img 
                    src="https://www.dropbox.com/scl/fi/6oz5c9nt8xf4gaiy8bjyi/bbm-logo-mark.jpg?rlkey=kerz7efqt8kiqajoa85assitj&raw=1" 
                    alt="Beyond Boundary Music" 
                    className="w-full max-w-xs mx-auto h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-sm opacity-70 leading-relaxed mb-4">
                    {language === 'ja'
                      ? '主宰する「Beyond Boundary Music」を通じて、公開ワークショップの実施やブログ（note）での技術記事執筆を継続的に行っています。専門知識を広く共有し、次世代のクリエイターやアートファンとの対話を育むオープンな教育リソースとして機能しています。'
                      : language === 'zh'
                      ? '透過主辦的「Beyond Boundary Music」平台，持續舉辦公開工作坊並在部落格（note）發表技術文章。作為開放性教育資源，廣泛分享專業知識，培育與下一代創作者及藝術愛好者的對話。'
                      : 'Through his self-produced platform, "Beyond Boundary Music," he continuously conducts public workshops and publishes technical articles on his blog (note). This serves as an open educational resource, sharing specialized knowledge widely and fostering a dialogue with the next generation of creators and art fans.'}
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
