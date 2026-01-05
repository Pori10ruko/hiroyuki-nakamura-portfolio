import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const DistantEcho: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-[#dfdbd5]">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]"
        />
        
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-tight mb-6"
          >
            Distant Echo
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl font-light tracking-wide opacity-80"
          >
            Piano & Live Painting
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 text-sm uppercase tracking-widest opacity-60"
          >
            2024
          </motion.div>
        </div>

        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Concept */}
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {language === 'ja' ? 'コンセプト' : language === 'zh' ? '概念' : 'Concept'}
            </h2>
            
            {language === 'ja' ? (
              <>
                <p className="text-lg leading-relaxed mb-6 opacity-90">
                  「距離」と「残響」の美学。
                </p>
                <p className="text-base leading-relaxed opacity-80 mb-4">
                  ピアノの旋律が空間に描く不可視の軌跡を、独自の音響処理によって聴覚的な建築として再構築します。静寂の中に浮かび上がる音の粒子が、鑑賞者の記憶と共振する没入型ライブインスタレーション。
                </p>
                <p className="text-base leading-relaxed opacity-80">
                  能登真理亜（Maria Noto）の描く生命力溢れる色彩と、全方位から包み込む音響空間がリアルタイムに交錯し、鑑賞者を無限の広がりへと誘います。
                </p>
              </>
            ) : language === 'zh' ? (
              <>
                <p className="text-lg leading-relaxed mb-6 opacity-90">
                  「距離」與「殘響」的美學。
                </p>
                <p className="text-base leading-relaxed opacity-80 mb-4">
                  鋼琴旋律在空間中繪製的無形軌跡，透過獨特的聲音處理重構為聽覺建築。寂靜中浮現的聲音粒子與觀眾記憶共鳴的沉浸式現場裝置。
                </p>
                <p className="text-base leading-relaxed opacity-80">
                  Maria Noto繪製的充滿生命力的色彩與全方位聲音空間即時交織，引領觀眾進入無限廣闊。
                </p>
              </>
            ) : (
              <>
                <p className="text-lg leading-relaxed mb-6 opacity-90">
                  The aesthetics of "distance" and "reverberation".
                </p>
                <p className="text-base leading-relaxed opacity-80 mb-4">
                  Piano melodies trace invisible trajectories in space, reconstructed as auditory architecture through unique sound processing. An immersive live installation where sound particles emerge from silence to resonate with the audience's memories.
                </p>
                <p className="text-base leading-relaxed opacity-80">
                  Maria Noto's vibrant colors and omnidirectional acoustic space intertwine in real-time, inviting viewers into infinite expanses.
                </p>
              </>
            )}
          </section>

          {/* Credits */}
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {language === 'ja' ? 'クレジット' : language === 'zh' ? '工作人員' : 'Credits'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div>
                <p className="uppercase tracking-widest opacity-60 mb-2">Piano & Sound Design</p>
                <p className="text-lg">Hiroyuki Nakamura</p>
              </div>
              <div>
                <p className="uppercase tracking-widest opacity-60 mb-2">Live Painting</p>
                <p className="text-lg">Maria Noto (能登真理亜)</p>
              </div>
              <div>
                <p className="uppercase tracking-widest opacity-60 mb-2">Spatial Audio</p>
                <p className="text-lg">Binaural / Immersive Audio</p>
              </div>
              <div>
                <p className="uppercase tracking-widest opacity-60 mb-2">Year</p>
                <p className="text-lg">2024</p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {language === 'ja' ? '技術的特徴' : language === 'zh' ? '技術特色' : 'Technical Features'}
            </h2>
            <div className="space-y-6 text-base opacity-80">
              {language === 'ja' ? (
                <>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">バイノーラル音響技術</h3>
                    <p className="leading-relaxed">
                      ヘッドフォンでの視聴に最適化された3次元音響空間。ピアノの音色が空間を自由に移動し、聴き手を取り囲むように設計されています。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">リアルタイム・インタラクション</h3>
                    <p className="leading-relaxed">
                      ピアノ演奏と能登真理亜のライブペインティングが即興的に呼応。音と色彩が有機的に融合する、再現不可能な一回性の体験を創出します。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">音響処理とエフェクト</h3>
                    <p className="leading-relaxed">
                      独自開発のリバーブとディレイ処理により、音の「距離感」と「残響」を精密にコントロール。空間そのものを楽器として演奏します。
                    </p>
                  </div>
                </>
              ) : language === 'zh' ? (
                <>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">雙聲道音響技術</h3>
                    <p className="leading-relaxed">
                      針對耳機收聽優化的三維聲音空間。鋼琴音色在空間中自由移動，設計為環繞聽眾。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">即時互動</h3>
                    <p className="leading-relaxed">
                      鋼琴演奏與Maria Noto的現場繪畫即興呼應。聲音與色彩有機融合，創造無法複製的一次性體驗。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">聲音處理與效果</h3>
                    <p className="leading-relaxed">
                      透過自主開發的殘響與延遲處理，精確控制聲音的「距離感」與「殘響」。將空間本身作為樂器演奏。
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">Binaural Audio Technology</h3>
                    <p className="leading-relaxed">
                      Three-dimensional sound space optimized for headphone listening. Piano tones freely move through space, designed to surround the listener.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">Real-time Interaction</h3>
                    <p className="leading-relaxed">
                      Piano performance and Maria Noto's live painting respond improvisationally. Sound and color organically merge, creating an unrepeatable, one-time experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 opacity-100">Audio Processing & Effects</h3>
                    <p className="leading-relaxed">
                      Through proprietary reverb and delay processing, precisely controlling the "sense of distance" and "reverberation" of sound. Playing space itself as an instrument.
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Back Button */}
          <div className="pt-12 flex justify-center">
            <motion.a
              href="/#/work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-white/5 border border-white/20 hover:bg-white/10 transition-colors duration-300 text-sm uppercase tracking-widest"
            >
              {language === 'ja' ? '作品一覧に戻る' : language === 'zh' ? '返回作品列表' : 'Back to Works'}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DistantEcho;
