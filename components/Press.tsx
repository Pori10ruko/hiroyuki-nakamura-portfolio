import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

type L3 = { en: string; ja: string; zh: string };

export const SELECTIONS: Array<{ year: string; title: L3; note: L3; url: string }> = [
  {
    year: '2026',
    title: {
      en: 'AI Song Contest 2026: Finalist "Maai"',
      ja: 'AI Song Contest 2026 ファイナリスト「Maai(間合い)」',
      zh: 'AI Song Contest 2026 決賽入圍〈Maai(間合い)〉',
    },
    note: {
      en: 'One of 14 finalists. Public voting is open until 21 November. Nakamura plans to perform at the awards ceremony in Bangkok on 29 November.',
      ja: '14組のファイナリストのひとつ。一般投票は11月21日まで。11月29日のバンコクでの授賞式で演奏する予定です。',
      zh: '14 組入圍者之一。公眾投票至 11 月 21 日止，預計於 11 月 29 日曼谷頒獎典禮上現場演奏。',
    },
    url: 'https://aisongcontest.com/the-2026-finalists',
  },
  {
    year: '2026',
    title: {
      en: 'SIMI Music Video Fest 2026: Official Selection',
      ja: 'SIMI Music Video Fest 2026 公式選出',
      zh: 'SIMI Music Video Fest 2026 入選',
    },
    note: {
      en: 'The music video for "Meltwater Stillness" (from Piano Distance) was an Official Selection of SIMI Film Fest 2026 in California, USA.',
      ja: 'Piano Distance の「Meltwater Stillness」のミュージックビデオが、アメリカ・カリフォルニア州の SIMI Film Fest 2026 に公式選出されました。',
      zh: 'Piano Distance 收錄曲〈Meltwater Stillness〉的音樂錄影帶，入選美國加州 SIMI Film Fest 2026。',
    },
    url: 'https://youtu.be/fP9vLVQJByE',
  },
];

export const EARLIER: Array<{ year: string; title: L3; note: L3 }> = [
  {
    year: '2020',
    title: { en: 'FMC2020: Finalist', ja: 'FMC2020 ファイナリスト', zh: 'FMC2020 決賽入圍' },
    note: {
      en: '"Supernal Tears", the title track of the mini-album Nakamura produced for erhu player Shin, was selected as a finalist in the international film music competition FMC2020.',
      ja: '二胡奏者Shinさんのミニアルバム(中村プロデュース)の表題曲「Supernal Tears」が、国際的な映画音楽コンクール FMC2020 でファイナリストに選ばれました。',
      zh: '中村為二胡演奏家 Shin 製作的迷你專輯，主打曲〈Supernal Tears〉入選國際電影音樂比賽 FMC2020 決賽。',
    },
  },
  {
    year: '',
    title: { en: 'SHOWstudio (UK): UN.a "COLOR" music video', ja: 'SHOWstudio(英国)で UN.a「COLOR」のMVが紹介', zh: 'SHOWstudio(英國)介紹 UN.a〈COLOR〉MV' },
    note: {
      en: 'The music video by UN.a, the unit of Nakamura with Koichi Utsugi, was featured on SHOWstudio in the UK.',
      ja: '中村と宇津木紘一のユニット UN.a のミュージックビデオが、英国の SHOWstudio で紹介されました。',
      zh: '中村與宇津木紘一的團體 UN.a 的音樂錄影帶，於英國 SHOWstudio 介紹。',
    },
  },
  {
    year: '2012',
    title: { en: 'Red Bull Music Academy Bass Camp Japan: Selected', ja: 'Red Bull Music Academy Bass Camp Japan 選出', zh: 'Red Bull Music Academy Bass Camp Japan 入選' },
    note: {
      en: 'Selected as one of 20 acts from Japan.',
      ja: '日本代表20組のひとつに選ばれました。',
      zh: '入選日本代表 20 組之一。',
    },
  },
];

export const PRESS: Array<{ year: string; source: string; work: string; kind: L3; quote?: string; quoteNote?: L3; url: string }> = [
  {
    year: '2026',
    source: 'Gonzo (circus) #192, p. 88',
    work: 'Piano Distance',
    kind: { en: 'Review by Anthony Fiumara', ja: 'Anthony Fiumara さんによるレビュー', zh: 'Anthony Fiumara 的樂評' },
    quote: 'een van de stillere hoogtepunten van het jaar',
    quoteNote: {
      en: 'translation by Nakamura: "one of the quieter highlights of the year"',
      ja: '中村訳「今年の静かなハイライトのひとつ」',
      zh: '中村譯「今年安靜的亮點之一」',
    },
    url: 'https://www.gonzocircus.com',
  },
  {
    year: '2026',
    source: 'Melted Form: Hum, Buzz, & Hiss #95',
    work: 'Piano Distance',
    kind: { en: 'Newsletter feature', ja: 'ニュースレターでの紹介', zh: '電子報介紹' },
    url: 'https://meltedform.substack.com/p/95-good-things',
  },
  {
    year: '2024',
    source: 'Foxy Digitalis: Video Premiere, "Distance to Soil"',
    work: 'Sen no Tsudoi',
    kind: { en: 'Video premiere (18 Oct 2024), by Brad Rose', ja: 'ビデオ・プレミア(2024年10月18日)、Brad Rose さん', zh: '影片首映(2024 年 10 月 18 日)，Brad Rose' },
    url: 'https://foxydigitalis.zone/2024/10/18/video-premiere-nakamura-hiroyuki-distance-to-soil',
  },
  {
    year: '2024',
    source: 'Chain D.L.K.',
    work: 'Sen no Tsudoi',
    kind: { en: 'Review', ja: 'レビュー', zh: '樂評' },
    url: 'https://chaindlk.com/reviews/12399',
  },
  {
    year: '2023',
    source: 'ele-king',
    work: 'Look Up At The Stars',
    kind: { en: 'Review', ja: 'レビュー', zh: '樂評' },
    url: 'https://ele-king.net/review/album/009166/',
  },
  {
    year: '2023',
    source: 'Mikiki',
    work: '',
    kind: { en: 'Interview', ja: 'インタビュー', zh: '訪談' },
    url: 'https://mikiki.tokyo.jp/articles/-/34235',
  },
];

export const SUPPORT: Array<{ year: string; title: L3; note: L3 }> = [
  {
    year: '2026',
    title: { en: 'Arts Council England', ja: 'Arts Council England', zh: 'Arts Council England' },
    note: { en: 'Supported DEEP FAKE, a UK co-production with Rosie Kay (K2CO).', ja: '英国との共同制作 DEEP FAKE(Rosie Kay / K2CO)への助成。', zh: '支持與 Rosie Kay(K2CO)的英日共製作 DEEP FAKE。' },
  },
  {
    year: '2026',
    title: { en: 'Great Britain Sasakawa Foundation', ja: 'Great Britain Sasakawa Foundation', zh: 'Great Britain Sasakawa Foundation' },
    note: { en: 'Supported DEEP FAKE.', ja: 'DEEP FAKE への助成。', zh: '支持 DEEP FAKE。' },
  },
];

export const COMMISSIONS: Array<{ year: string; title: L3; note: L3; url?: string }> = [
  {
    year: '2024',
    title: { en: 'Random International: Alone Together', ja: 'Random International『Alone Together』', zh: 'Random International《Alone Together》' },
    note: {
      en: 'Music and spatial audio, shown at Noor Riyadh (2024).',
      ja: '楽曲と空間音響を提供。Noor Riyadh(2024)で展示されました。',
      zh: '提供音樂與空間音響，於 Noor Riyadh(2024)展出。',
    },
  },
  {
    year: '2024–25',
    title: { en: 'SONY MUSIC / YUKI', ja: 'SONY MUSIC / YUKI', zh: 'SONY MUSIC / YUKI' },
    note: {
      en: 'Spatial audio for the "Share" music video (2025) and music for the interlude films of the "SUPER SLITS" tour (2024).',
      ja: '「Share」ミュージックビデオの立体音響(2025)と、ツアー「SUPER SLITS」の幕間映像の音楽(2024)。',
      zh: '〈Share〉音樂錄影帶的立體音響(2025)，以及「SUPER SLITS」巡演幕間影像的音樂(2024)。',
    },
    url: 'https://youtu.be/QSQ4U3pcvzQ',
  },
];

const HEAD = {
  title: { en: 'Press & Selections', ja: '掲載・選出', zh: '報導・入選' } as L3,
  sel: { en: 'Selections, 2026–', ja: '選出 2026〜', zh: '入選 2026〜' } as L3,
  earlier: { en: 'Earlier Selections & Features', ja: 'これまでの選出・紹介', zh: '過往入選・介紹' } as L3,
  press: { en: 'Press', ja: '掲載', zh: '報導' } as L3,
  support: { en: 'Grants & Support', ja: '助成・採択', zh: '補助・獲選' } as L3,
  comm: { en: 'Commissions & Collaborations', ja: '依頼・協働', zh: '委託・合作' } as L3,
};

const Press: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = 'Press & Selections | NAKAMURA Hiroyuki';
  }, []);

  return (
    <div className="w-full min-h-screen pt-44 md:pt-48 pl-4 pr-20 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8 md:gap-12 text-[#1a1a1a]">
      <div className="md:w-1/3">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:sticky md:top-48 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic leading-[0.9]"
        >
          {HEAD.title[language]}
        </motion.h1>
      </div>

      <div className="md:w-2/3 flex flex-col pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-16 max-w-2xl"
        >
          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{HEAD.sel[language]}</h2>
            <ul className="divide-y divide-[#1a1a1a]/15 border-t border-[#1a1a1a]/20">
              {SELECTIONS.map((s) => (
                <li key={s.title.en} className="py-6">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="interactive text-xl md:text-2xl font-serif hover:opacity-50 transition-opacity">
                      {s.title[language]} →
                    </a>
                    <span className="text-[10px] md:text-xs opacity-50 font-mono">{s.year}</span>
                  </div>
                  <p className="text-sm md:text-base opacity-80 leading-relaxed">{s.note[language]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{HEAD.earlier[language]}</h2>
            <ul className="divide-y divide-[#1a1a1a]/15 border-t border-[#1a1a1a]/20">
              {EARLIER.map((s) => (
                <li key={s.title.en} className="py-6">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <span className="text-lg md:text-xl font-serif">{s.title[language]}</span>
                    <span className="text-[10px] md:text-xs opacity-50 font-mono">{s.year}</span>
                  </div>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">{s.note[language]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{HEAD.press[language]}</h2>
            <ul className="divide-y divide-[#1a1a1a]/15 border-t border-[#1a1a1a]/20">
              {PRESS.map((p) => (
                <li key={p.source} className="py-6">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="interactive text-lg md:text-xl font-serif hover:opacity-50 transition-opacity">
                      {p.source} →
                    </a>
                    <span className="text-[10px] md:text-xs opacity-50 font-mono">{p.year}</span>
                  </div>
                  <p className="text-sm md:text-base opacity-70">
                    {p.work ? p.work + ' / ' : ''}{p.kind[language]}
                  </p>
                  {p.quote && (
                    <p className="mt-2 text-base md:text-lg font-serif italic opacity-90">
                      “{p.quote}”
                      {p.quoteNote && <span className="block text-xs not-italic opacity-60 mt-1">{p.quoteNote[language]}</span>}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{HEAD.support[language]}</h2>
            <ul className="divide-y divide-[#1a1a1a]/15 border-t border-[#1a1a1a]/20">
              {SUPPORT.map((s) => (
                <li key={s.title.en} className="py-6">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <span className="text-lg md:text-xl font-serif">{s.title[language]}</span>
                    <span className="text-[10px] md:text-xs opacity-50 font-mono">{s.year}</span>
                  </div>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">{s.note[language]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{HEAD.comm[language]}</h2>
            <ul className="divide-y divide-[#1a1a1a]/15 border-t border-[#1a1a1a]/20">
              {COMMISSIONS.map((c) => (
                <li key={c.title.en} className="py-6">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="interactive text-lg md:text-xl font-serif hover:opacity-50 transition-opacity">{c.title[language]} →</a>
                    ) : (
                      <span className="text-lg md:text-xl font-serif">{c.title[language]}</span>
                    )}
                    <span className="text-[10px] md:text-xs opacity-50 font-mono">{c.year}</span>
                  </div>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">{c.note[language]}</p>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Press;
