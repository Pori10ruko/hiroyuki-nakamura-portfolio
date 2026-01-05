import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const DistantEcho: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: 'Piano & Live Painting',
      date: '25.11.14',
      intro: `"Distant Echo" is an installation concert for piano, live painting, and near-field spatial sound.
Three different kinds of time meet in one space: the bodily time of live painting, the technological time of AI-based morphing, and the listening time that emerges when sound is perceived as distance and depth.
Built upon minimalist electronics, breathing-based phrasing, and acoustic improvisation, the album blends field recordings, orchestral fragments, and spatial 3D sound to create music that composes not only sound, but space itself.`,
      conceptTitle: 'Concept',
      concept: `"Distant Echo" asks how we can stand in relation to technology, not as something that simply overwhelms us, but as something we can re-negotiate through listening and distance.

By treating spatial sound as a way of sculpting distance, the piece invites the audience to move, to choose their own position, and to experience time as something relative rather than linear.`,
      installationTitle: 'Installation & Experience',
      installation: `The audience is free to walk around the space: approaching the piano and the painter, moving closer to or further from the speakers, and stepping into different layers of sound and image.

Instead of a fixed "front" and "back," the work is experienced as a field to be navigated.`,
      soundTitle: 'Sound & Technology',
      sound: `The piece relies on only two loudspeakers, yet aims to evoke a binaural, near-field spatial depth.

Piano internal sounds, mechanical noises, and extended resonance are layered with live electronics and saxophone processing (in the opening set), while Ableton Live, Max for Live, and TouchDesigner are linked in real time.`,
      infoTitle: 'Info & Credits',
      info: `Premiere: November 2025, EARTH+GALLERY (Tokyo)
Format: Installation concert for piano, live painting, near-field spatial sound
Duration: ~60 min (4 sections)

Credits:
Artistic Direction, Composition, Piano, Spatial Sound Design: NAKAMURA Hiroyuki
Live Painting: NOTO Maria
Soprano Saxophone & Engineering (Opening Set): UTSUGI Koichi
Visual System & AI Morphing: NAKAMURA Hiroyuki (TouchDesigner)
Live Electronics: Ableton Live, Max for Live
Venue: EARTH+GALLERY, Tokyo`
    },
    ja: {
      subtitle: 'ピアノとライブペインティング',
      date: '25.11.14',
      intro: `ピアノとライブペインティング、そしてニアフィールド立体音響によって構成されたインスタレーション作品です。

能登真理亜によるライブペインティングが刻む「身体の時間」、TouchDesigner と AI モーフィングが走らせる「テクノロジーの時間」、そして、音を立体的に"聴こうとする"ことで立ち上がる「意識／聴覚の時間」。

異なる三つの時間が同じ空間で対峙し、交差し、観客の歩みによって編集されていく——そのプロセスそのものを作品として提示する試みです。`,
      conceptTitle: 'コンセプト',
      concept: `今日、AI やリアルタイム映像技術は、私たちの日常や創作の速度を加速させ続けています。一方で、身体は「いま」という時間のスピードでしか動けません。

《Distant Echo》では、身体の速度でしか進まないライブペインティング、膨大なデータを一瞬で走査する AI 映像処理、そして、耳で「距離」を測ろうとする立体音響の体験、この三つを同じ空間に並置し、その"ズレ"をそのまま可視化／可聴化しています。

観客は、会場内を自由に歩きながら、どのレイヤーに近づき、どのレイヤーから離れるのかを、自分の身体で選び取ります。そのとき、テクノロジーとの距離感や、時間の感じ方そのものが、少しだけ相対化されていくのではないか——そんな仮説から生まれた作品です。`,
      installationTitle: 'インスタレーション体験',
      installation: `ピアノとライブペインティングが置かれた中心のエリア、耳の高さ近くに配置された 2 本のスピーカーによるニアフィールド音場、TouchDesigner によるリアルタイム映像と AI モーフィング。

観客は、定められた客席に座るのではなく、壁際を歩いたり、演奏者のすぐそばまで近づいたりしながら、自分自身で「どの距離から作品を見る／聴くのか」を選ぶことができます。

一曲目の映像の中に"入り込む"ような感覚と、ライブエレクトロニクスと即興性が混ざり合う時間の伸縮。そのあいだを回遊すること自体が、《Distant Echo》の重要な体験の一部となっています。`,
      soundTitle: '音響とテクノロジー',
      sound: `音響はあえて 2 チャンネルのスピーカーのみで構成し、「耳のすぐ近くで空間を彫刻する」ニアフィールド立体音響として設計されています。

ピアノの内部音、ハンマー、鍵盤のメカニカルノイズを分解・配置し、ディレイや残響を細かくレイヤーし、前後・奥行き・高さの感覚を彫刻。Ableton Live と Max for Live によるライブエレクトロニクス、TouchDesigner と連携した AI モーフィング映像。

音を"立体的に聴く"ことによって、観客は自然と「何に近づいているのか」「どこから鳴っているのか」という距離の感覚を取り戻していきます。その距離感の回復こそが、テクノロジーとどう向き合うかを考えるための小さな入口になれば──という願いを込めています。`,
      infoTitle: '公演情報・クレジット',
      info: `初演: 2025年11月, EARTH+GALLERY（東京）
形式: ピアノ、ライブペインティング、ニアフィールド立体音響によるインスタレーションコンサート
時間: 約60分（4セクション）

クレジット:
芸術監督・作曲・ピアノ・空間音響設計: 中村浩之
ライブペインティング: 能登真理亜
ソプラノサックス＆エンジニアリング（オープニングセット）: 宇津木紘一
映像システム・AIモーフィング: 中村浩之（TouchDesigner）
ライブエレクトロニクス: Ableton Live, Max for Live
会場: EARTH+GALLERY, 東京`
    },
    zh: {
      subtitle: '鋼琴與現場繪畫',
      date: '25.11.14',
      intro: `「Distant Echo」是結合鋼琴、現場繪畫與近場立體聲響的裝置音樂會。
三種不同的時間在同一空間中相遇：現場繪畫的身體時間、基於AI變形的技術時間，以及當聲音被感知為距離和深度時所浮現的聆聽時間。
建立在極簡電子、基於呼吸的樂句與聲學即興之上，作品融合了現場錄音、管弦樂片段和立體3D聲音，創造出不僅作曲聲音，更作曲空間本身的音樂。`,
      conceptTitle: '概念',
      concept: `「Distant Echo」探問我們如何與技術建立關係，不是作為單純壓倒我們的東西，而是我們可以透過聆聽和距離重新協商的對象。

透過將立體聲音視為雕塑距離的方式，作品邀請觀眾移動、選擇自己的位置，並將時間體驗為相對而非線性的事物。`,
      installationTitle: '裝置與體驗',
      installation: `觀眾可以自由在空間中走動：接近鋼琴和畫家，靠近或遠離揚聲器，進入不同層次的聲音和影像。

作品不是以固定的「前」和「後」來體驗，而是作為可以導航的場域。`,
      soundTitle: '聲響與技術',
      sound: `作品僅依賴兩個揚聲器，卻旨在喚起雙耳、近場的空間深度。

鋼琴內部聲音、機械噪音和延伸共鳴與現場電子和薩克斯風處理（在開場演出中）層層疊加，同時Ableton Live、Max for Live和TouchDesigner即時連結。`,
      infoTitle: '資訊與製作團隊',
      info: `首演: 2025年11月, EARTH+GALLERY（東京）
形式: 鋼琴、現場繪畫、近場立體聲響的裝置音樂會
時長: 約60分鐘（4個部分）

製作團隊:
藝術總監、作曲、鋼琴、空間聲響設計: 中村浩之
現場繪畫: 能登真理亞
高音薩克斯風＆工程（開場演出）: 宇津木紘一
視覺系統＆AI變形: 中村浩之（TouchDesigner）
現場電子: Ableton Live, Max for Live
場地: EARTH+GALLERY, 東京`
    }
  };

  const images = [
    'https://static.wixstatic.com/media/dbd631_829879e0bbcf438b8dbbc53bcca0e824~mv2.png/v1/fill/w_656,h_436,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-12-01%20%E5%8D%88%E5%89%8D11_12_42.png',
    'https://static.wixstatic.com/media/dbd631_477400d577e34857a601e32cabbd9502~mv2.jpg/v1/fill/w_656,h_436,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.jpg',
    'https://static.wixstatic.com/media/dbd631_579e0f8ac5eb467a9a13ad510ae64771~mv2.jpg/v1/fill/w_656,h_436,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC00867.jpg',
    'https://static.wixstatic.com/media/dbd631_51cadde8e18f4f2bb2f494a72c293ed7~mv2.jpg/v1/fill/w_656,h_436,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC01024.jpg'
  ];

  const t = content[language];

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
            Distant Echo
          </h1>
          <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
          <p className="text-sm text-gray-500 tracking-widest">{t.date}</p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <img
            src="https://bbm-sound.com/images/distant-echo.avif"
            alt="Distant Echo"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Note Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <a
            href="https://note.com/bbmusic/n/nec0dcaf3046a"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Note
          </a>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {t.intro}
            </p>
          </div>
        </motion.div>

        {/* Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <img
            src={images[0]}
            alt="Distant Echo Setup"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* YouTube Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mb-16"
        >
          <div className="w-full max-w-3xl mx-auto aspect-video">
            <iframe
              src="https://www.youtube.com/embed/Am1jq5AXBS4"
              title="Distant Echo - YouTube"
              className="w-full h-full rounded-lg shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Concept Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">{t.conceptTitle}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {t.concept}
            </p>
          </div>
        </motion.div>

        {/* Image 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <img
            src={images[1]}
            alt="Performance"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">{t.installationTitle}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {t.installation}
            </p>
          </div>
        </motion.div>

        {/* Image 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16"
        >
          <img
            src={images[2]}
            alt="Audience Experience"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Sound & Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">{t.soundTitle}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {t.sound}
            </p>
          </div>
        </motion.div>

        {/* Image 4 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-16"
        >
          <img
            src={images[3]}
            alt="Technical Setup"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Info & Credits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif mb-8 text-center">{t.infoTitle}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed text-sm">
              {t.info}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DistantEcho;
