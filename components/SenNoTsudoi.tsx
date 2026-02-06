import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const SenNoTsudoi: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = 'Sen no Tsudoi | NAKAMURA Hiroyuki';
  }, []);

  const tracks = [
    {
      title: language === 'ja' ? 'Bokubi' : language === 'zh' ? 'Bokubi' : 'Bokubi',
      videoId: 'L4g7ES8r3Bs',
      duration: '05:13'
    },
    {
      title: language === 'ja' ? 'Distance to Soil' : language === 'zh' ? 'Distance to Soil' : 'Distance to Soil',
      videoId: 'Z0Y0laDQXHE',
      duration: '05:12'
    },
    {
      title: language === 'ja' ? 'River God' : language === 'zh' ? 'River God' : 'River God',
      videoId: '6_keqXc2xZk',
      duration: '03:23'
    },
    {
      title: language === 'ja' ? 'Hakusha Seisho' : language === 'zh' ? 'Hakusha-Seisho' : 'Hakusha-Seisho',
      videoId: '5qoaXFSSjDw',
      duration: '02:50'
    },
    {
      title: language === 'ja' ? 'Voices in the Void' : language === 'zh' ? 'Voices in the Void' : 'Voices in the Void',
      videoId: 'Ix0agLigfsQ',
      duration: '04:09'
    },
    {
      title: language === 'ja' ? 'Bella' : language === 'zh' ? 'Bella' : 'Bella',
      videoId: '2uQ9OHdS75o',
      duration: '05:17'
    },
    {
      title: language === 'ja' ? 'Senshu' : language === 'zh' ? 'Senshu' : 'Senshu',
      videoId: 'Tp7M4ewRr34',
      duration: '03:44'
    }
  ];

  const description = {
    en: `"Sen no Tsudoi" (A Gathering of a Thousand) is a post-orchestral album by Hiroyuki Nakamura, exploring cultural, spatial, and sonic intersections between Asia and Europe.

Built upon minimalist electronics, breathing-based phrasing, and acoustic improvisation, the album blends field recordings, orchestral fragments, and spatial 3D sound to create music that composes not only sound, but space itself.

"What can music do in times of war and division?"
— This album attempts to document and reinterpret history through an Asian lens.

Using almost no MIDI, Nakamura treats reverb as resonance, breathing as rhythm, and silence as material. The result is a deeply meditative, yet vividly spatial sonic landscape.`,
    ja: `《Sen no Tsudoi（千の集い）》は、中村浩之によるポストオーケストラ・アルバムであり、ヨーロッパとアジア、過去と現在、記憶と歴史の交差点を音と空間によって描き出す作品です。

「芸術にできることは、記録し、歴史を再解釈し、何度も定義し直すことだと私は考えます。」

戦争や分断が続くこの時代に、音楽は何を為すべきか。中村はアジア人としての視点から、ヨーロッパのクラシック音楽を再文脈化し、アジア的なノイズ、呼吸、沈黙と融合させ、新しい音のかたちを提示しています。

本作ではMIDIの使用を最小限に抑え、アジア的な呼吸と間合いをもとにサウンドが配置され、立体音響による空間的作曲が行われています。教会のリバーブは洞窟のように響き、生活音や即興的な電子処理が複層的に絡み合うことで、「空間そのものが語り出す」ようなサウンド体験が生まれています。`,
    zh: `《Sen no Tsudoi（千之會）》是中村浩之創作的後管弦樂專輯，以聲音與空間描繪歐洲與亞洲、過去與現在、記憶與歷史的交會點。

「我認為藝術能做的，就是記錄、重新詮釋歷史，並不斷地再定義。」

在戰爭與分裂仍持續的當下，音樂應當承擔什麼使命？
中村以亞洲人的視角，重新脈絡化歐洲古典音樂，並與亞洲的噪音、呼吸、靜默相融合，提出嶄新的聲音形態。

本作盡量減少對 MIDI 的使用，以亞洲式的呼吸與間奏為基礎配置聲響，並透過立體音響進行空間性作曲。教堂的殘響如洞窟般迴盪，生活聲響與即興的電子處理交織，形成一種「空間本身開始說話」的聲音體驗。`
  };

  const trackDescriptions = {
    en: [
      {
        title: 'Bokubi',
        text: '"Beneath the heavy rain clouds, a landscape unfolds like an ink painting." — Quoted from a novel by Japanese author Shigeru Tonooka. The piece begins with sonic fragments and rhythms that seem undefined. As elements converge, a solitary voice sings of distant love, giving shape to the formless.'
      },
      {
        title: 'Distance to Soil',
        text: '"By simply observing, the present reveals its dramatic nature." The voice fades, and expanding sonic textures unfold. Abrasive sounds disrupt, while deliberate tones gather and reveal new structural forms.'
      },
      {
        title: 'River God',
        text: '"History pulses with life—not born simultaneously, but collected through vibrations." Breathing-like rhythms organize the texture. A voice neither distinctly Asian nor Western merges with harmonic layers that evoke the weight of stone.'
      },
      {
        title: 'Hakusha-Seisho',
        text: '"What is called artistic may evoke an entirely opposite response in others." The boundary between environmental and instrumental sound dissolves, creating a unified auditory space where distinctions blur.'
      },
      {
        title: 'Voices in the Void',
        text: '"The voices that only you can hear arise from the products of memory and history." Electronic sound wraps around the breathing rhythms of the piano. A fusion of improvisation and spatial awareness creates a deeply introspective experience.'
      },
      {
        title: 'Bella',
        text: '"Beauty is expressed in many languages, but always contains something unspeakable—beauty that coexists with ugliness." Sounds from entirely different temporalities coexist from the beginning, resonating as if naturally aligned—blurring the line between beauty and contradiction.'
      },
      {
        title: 'Senshu',
        text: '"Even thirty minutes may feel long or short depending on one\'s mindset." This track features dynamic rhythms reminiscent of Asian festivals and Western folk music. Electronic textures bridge eras—past and present converging in a rhythmic farewell.'
      }
    ],
    ja: [
      {
        title: 'Bokubi',
        text: '「どんよりと垂れこめた雨雲の下に、墨絵のような風景が展ける」— 日本の作家・外村繁の小説より引用。曇天の空の下、未完成な音の断片が集まり、やがて一つの声が愛の距離を歌い始める。未整理なリズムやカットされがちな音を中心に構成された「はじまり」の音楽。'
      },
      {
        title: 'Distance to Soil',
        text: '「観察していくだけで、今あるものはドラマティックに展開していく」声が消え、空間が広がる。だが強い音がそれを切り裂き、意思ある音が新たなかたちで集まる。映像作品としても展開された代表曲。'
      },
      {
        title: 'River God',
        text: '「多くの歴史は鼓動している。それは同時に生まれるのではなく、振動によって集まる」呼吸のようなリズムが全体を整え、アジア的でも西洋的でもない声が石のような重層的な響きを持つ和声と融合する。'
      },
      {
        title: 'Hakusha-Seisho',
        text: '「芸術的だとされる風景も、人によっては真逆の印象を抱く」環境音と楽器音の境界が曖昧になり、音同士が溶け合っていく。音の「ジャンル」や「意図」が解体される瞬間。'
      },
      {
        title: 'Voices in the Void',
        text: '「自分の中にしか聞こえない声、それは歴史や記憶の産物である」ピアノの呼吸に沿う形で電子音響が進行。即興性と空間性が融合し、記憶の奥底に触れるような内面的作品。'
      },
      {
        title: 'Bella',
        text: '「美という言葉には常に言葉にできない要素があり、それは時に醜さを伴う」異なる時間軸に属する音が初めから共存し、それがごく自然なものとして響く。「混在」そのものが美であるという感覚を形にした一曲。'
      },
      {
        title: 'Senshu',
        text: '「30分が長くも短くも感じられる。それは態度が時間を変えるからだ」アジアの祭りや西洋の民謡を想起させるようなノスタルジックなリズムが、現代の電子音響と融合。過去と現在が接続されるフィナーレ。'
      }
    ],
    zh: [
      {
        title: 'Bokubi',
        text: '「在陰鬱低垂的雨雲之下，展開如水墨畫般的風景」—— 引自日本作家・外村繁小說。在陰天之下，未完成的音之片段逐漸聚集，最終化為一個歌唱愛之距離的聲音。以未整理的節奏與斷裂的聲響為核心構成的「開始之音樂」。'
      },
      {
        title: 'Distance to Soil',
        text: '「只要持續觀察，眼前存在的事物便會戲劇性地展開」聲音消隱，空間擴張。然而強烈的聲響劃破其中，帶著意志的音群以全新形態凝聚。亦曾以影像作品形式呈現的代表曲。'
      },
      {
        title: 'River God',
        text: '「眾多的歷史正在脈動。它們並非同時誕生，而是因振動而聚集」如呼吸般的律動調整全體，不屬於亞洲也不屬於西方的聲音，與如同石塊般厚重的和聲共鳴交織。'
      },
      {
        title: 'Hakusha-Seisho',
        text: '「即便被認為是藝術性的風景，對某些人而言卻可能帶來完全相反的印象」環境音與樂器聲的界線逐漸模糊，聲音彼此融化。於此，聲音的「類型」與「意圖」被解體的瞬間浮現。'
      },
      {
        title: 'Voices in the Void',
        text: '「那僅能在自己內心聽見的聲音，是歷史與記憶的產物」沿著鋼琴的呼吸，電子音響展開。即興性與空間性相互交融，觸及記憶深層的內在之作。'
      },
      {
        title: 'Bella',
        text: '「"美"這個詞總帶有無法言說的元素，而那有時也伴隨著醜」屬於不同時間軸的聲音自始便共存，並以極其自然的方式迴響。將「混雜本身即為美」的感覺具象化的一曲。'
      },
      {
        title: 'Senshu',
        text: '「三十分鐘既可感覺漫長，也可轉瞬即逝，因為態度會改變時間」帶有亞洲祭典或西方民謠意象的懷舊節奏，與現代電子音響相融合。於此，過去與現在被銜接，形成終章。'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Sen no Tsudoi
          </h1>
          <p className="text-2xl text-gray-600 mb-2">千の集い</p>
          <p className="text-sm text-gray-500 tracking-widest">DE6067</p>
        </motion.div>

        {/* Album Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <img
            src="https://www.dragonseyerecordings.com/wp-content/uploads/2024/11/de6067.jpg"
            alt="Sen no Tsudoi Album Cover"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="https://www.dragonseyerecordings.com/release/de6067/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            💿 Label Release Page
          </a>
          <a
            href="https://orcd.co/sen-no-tsudoi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Streaming
          </a>
          <a
            href="https://www.youtube.com/playlist?list=PLb_2IgACrNd9j9MLFkpMetV0CoXyiKcoE"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            YouTube Playlist
          </a>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {description[language]}
            </p>
          </div>
        </motion.div>

        {/* Music Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">Music Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg mb-3">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${track.videoId}`}
                    title={track.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{track.title}</h3>
                  <span className="text-sm text-gray-500">{track.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Track Descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">Track Notes</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {trackDescriptions[language].map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="border-l-4 border-gray-300 pl-6"
              >
                <h3 className="text-xl font-semibold mb-2">{index + 1}. {track.title}</h3>
                <p className="text-gray-700 leading-relaxed">{track.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-sm text-gray-600 space-y-2"
        >
          <p>All compositions, images, mixing, and mastering by NAKAMURA Hiroyuki</p>
          <p>Tr.1 vocal: Uzning (Korea)</p>
          <p>Tr.5 piano: Atsushi Mori (Japan)</p>
          <p className="pt-4">Duration: 30:09</p>
          <p>Format: Digital, Streaming</p>
          <p>Release Date: November 15, 2024</p>
          <p>Release: Dragon's Eye Recordings</p>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://headphonecommute.com/2024/11/14/nakamura-hiroyuki-voices-in-the-void/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-gray-300 hover:border-black transition-colors"
          >
            Headphone Commute Review
          </a>
          <a
            href="https://foxydigitalis.zone/2024/10/18/video-premiere-nakamura-hiroyuki-distance-to-soil/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-gray-300 hover:border-black transition-colors"
          >
            Foxy Digitalis
          </a>
          <a
            href="https://www.chaindlk.com/reviews/12399"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-gray-300 hover:border-black transition-colors"
          >
            Chain D.L.K.
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default SenNoTsudoi;
