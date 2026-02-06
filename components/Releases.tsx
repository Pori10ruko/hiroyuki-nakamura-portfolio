import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

type ReleaseCategory = 'SOLO' | 'BBCO' | 'UN.a' | 'PRODUCE' | 'OTHER';

interface Release {
  title: string;
  year: string;
  image: string;
  description: { en: string; ja: string; zh: string };
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    bandcamp?: string;
    other?: string;
  };
}

const RELEASES: Record<ReleaseCategory, Release[]> = {
  SOLO: [
    {
      title: 'Look Up at the Stars',
      year: '2023',
      image: 'https://bbm-sound.com/images/look-up.jpg',
      description: {
        en: 'Solo album fusing piano with advanced binaural audio technology, exploring new possibilities in sonic space and perception.',
        ja: 'ピアノの繊細な響きとバイノーラル音響技術を融合させた、聴覚的な空間と知覚の新しい可能性を探求するソロアルバム。',
        zh: '將鋼琴細膩的共鳴與雙耳音響技術融合，探索聲音空間與感知中的全新可能性的個人專輯。'
      },
      links: {
        bandcamp: 'https://youngbloods.bandcamp.com/album/look-up-at-the-stars',
        youtube: 'https://www.youtube.com/watch?v=lI7Rq58b2Ys'
      }
    },
    {
      title: 'TRITONOMICS',
      year: '2022',
      image: 'https://f4.bcbits.com/img/a0987654321_10.jpg',
      description: {
        en: 'Electronic music debut featuring self-programmed and generated electronic compositions.',
        ja: '自らプログラミングし生成した電子音楽のデビュー作品。',
        zh: '自行編程並生成的電子音樂首張作品。'
      },
      links: {
        bandcamp: 'https://overlap.bandcamp.com/album/nakamura-hiroyuki-tritonomics'
      }
    },
    {
      title: 'Sen no Tsudoi (千の集い)',
      year: '2024',
      image: 'https://i.ytimg.com/vi/6_keqXc2xZk/maxresdefault.jpg',
      description: {
        en: 'Post-orchestral album depicting the intersection of Europe and Asia, past and present, memory and history through sound and space.',
        ja: 'ヨーロッパとアジア、過去と現在、記憶と歴史の交差点を音と空間によって描き出すポストオーケストラ・アルバム。',
        zh: '透過聲音與空間描繪歐洲與亞洲、過去與現在、記憶與歷史交會點的後管弦樂團專輯。'
      },
      links: {
        other: 'https://www.dragonseyerecordings.com/release/de9001/',
        youtube: 'https://www.youtube.com/playlist?list=PLb_2IgACrNd9j9MLFkpMetV0CoXyiKcoE'
      }
    },
    {
      title: 'Singular Forms 2',
      year: '2021',
      image: 'https://f4.bcbits.com/img/a1234567890_10.jpg',
      description: {
        en: 'Compilation album featuring singular forms of musical expression.',
        ja: '独創的な音楽表現を収録したコンピレーションアルバム。',
        zh: '收錄獨特音樂表現的合輯專輯。'
      },
      links: {
        bandcamp: 'https://youngbloods.bandcamp.com/album/singular-forms-2'
      }
    }
  ],
  BBCO: [
    {
      title: 'SITA',
      year: '2023',
      image: '/images/bbco-sita.jpg',
      description: {
        en: 'First album by Beyond Boundary Chamber Orchestra, developed from music created for DRAMATIC WORKS dance performance "SITA YOKOHAMA". Released on prestigious jazz label Daiki Musica.',
        ja: 'Beyond Boundary Chamber Orchestraのファーストアルバム。ダンスカンパニーDRAMATIC WORKSの公演「SITA YOKOHAMA」のために制作された音楽をさらに発展させ、ジャズの名門レーベルDaiki Musicaよりリリース。',
        zh: 'Beyond Boundary Chamber Orchestra 首張專輯。由為舞團 DRAMATIC WORKS 作品《SITA YOKOHAMA》創作的音樂發展而成，透過知名爵士廠牌 Daiki Musica 發行。'
      },
      links: {
        other: 'https://d-musica.co.jp/?p=389',
        youtube: 'https://www.youtube.com/watch?v=Zl3sF_lN6lM'
      }
    },
    {
      title: '2nd Album (In Development)',
      year: '2026',
      image: 'https://i.ytimg.com/vi/qZHZwPZqjSk/maxresdefault.jpg',
      description: {
        en: 'Collaborative project with international dance company. Deconstructing expressions rooted in Asian and European cultures to rebuild them into a new, unseen narrative. Scheduled for 2026 release.',
        ja: '海外のダンスカンパニーとの共同制作。アジアとヨーロッパ、それぞれの文化や身体性に根差した表現を一度解体し、まだ見ぬ新しい物語として再構築。2026年リリース予定。',
        zh: '與國際舞團合作製作。解構源自亞洲與歐洲文化與身體性的表現，重建為前所未見的全新敘事。預計於2026年發行。'
      },
      links: {
        youtube: 'https://www.youtube.com/watch?v=qZHZwPZqjSk'
      }
    }
  ],
  'UN.a': [
    {
      title: 'Intersecting',
      year: '2020',
      image: 'https://i.ytimg.com/vi/QH2ls79_ImA/maxresdefault.jpg',
      description: {
        en: 'Electro-jazz unit with saxophonist Koichi Utsugi. Achieved international recognition with NYC tour and UK SHOWstudio feature.',
        ja: 'サックス奏者・宇津木紘一と結成したエレクトロ・ジャズユニット。NYCツアーを成功させ、英国のSHOWstudioで紹介されるなど国際的な評価を獲得。',
        zh: '與薩克斯風手宇津木紘一共同組成的電子爵士單位。成功舉辦紐約巡演，並有音樂錄影帶登上英國SHOWstudio。'
      },
      links: {
        spotify: 'https://linkco.re/uAPbr8Mz?lang=ja',
        other: 'http://purre-goohn.com/un-a-intersecting/',
        youtube: 'https://www.youtube.com/watch?v=QH2ls79_ImA'
      }
    },
    {
      title: 'COLOR',
      year: '2018',
      image: 'https://i.ytimg.com/vi/U9kxsHOumeo/maxresdefault.jpg',
      description: {
        en: 'UN.a album featuring sophisticated electro-jazz compositions and visual collaborations.',
        ja: '洗練されたエレクトロ・ジャズ楽曲とビジュアルコラボレーションが特徴のUN.aアルバム。',
        zh: 'UN.a 專輯，以精緻的電子爵士作曲與視覺合作為特色。'
      },
      links: {
        other: 'http://purre-goohn.com/un-acolor/',
        youtube: 'https://www.youtube.com/watch?v=U9kxsHOumeo'
      }
    },
    {
      title: 'Melt in Dimensions feat. ermhoi',
      year: '2019',
      image: '/images/una-melt-in-dimensions.jpg',
      description: {
        en: 'Collaborative release featuring ermhoi, exploring dimensional sound spaces.',
        ja: 'ermhoi とのコラボレーションリリース。次元的な音響空間を探求。',
        zh: '與 ermhoi 合作發行，探索次元性聲音空間。'
      },
      links: {
        other: 'http://purre-goohn.com/un-amelt-in-dimensionsfeat-ermhoi/'
      }
    },
    {
      title: 'Aggregate',
      year: '2017',
      image: '/images/una-aggregate.jpg',
      description: {
        en: 'UN.a release exploring aggregated sonic textures and rhythmic structures.',
        ja: '集積された音響テクスチャとリズム構造を探求するUN.aリリース。',
        zh: 'UN.a 發行，探索聚合的聲音質地與節奏結構。'
      },
      links: {
        other: 'http://purre-goohn.com/un-aaggregate/'
      }
    },
    {
      title: 'Stand Alone',
      year: '2016',
      image: '/images/una-standalone.jpg',
      description: {
        en: 'UN.a album featuring standalone compositions and experimental approaches.',
        ja: '独立した楽曲と実験的なアプローチを特徴とするUN.aアルバム。',
        zh: 'UN.a 專輯，以獨立作曲與實驗性手法為特色。'
      },
      links: {
        other: 'http://purre-goohn.com/un-astand-alone/'
      }
    },
    {
      title: 'Industria',
      year: '2015',
      image: '/images/una-industria.jpg',
      description: {
        en: 'Early UN.a work exploring industrial soundscapes and electronic textures.',
        ja: '工業的サウンドスケープと電子的テクスチャを探求するUN.a初期作品。',
        zh: 'UN.a 早期作品，探索工業聲景與電子質地。'
      },
      links: {
        other: 'http://purre-goohn.com/un-aindustria/'
      }
    }
  ],
  PRODUCE: [
    {
      title: 'Erfu Shin - Supernal Tears',
      year: '2020',
      image: 'https://i.ytimg.com/vi/avpQVtT7vyk/maxresdefault.jpg',
      description: {
        en: 'Mini album produced for Erhu player Shin. The title track was selected as a finalist in the international film music competition FMC2020.',
        ja: '二胡奏者Shinのミニアルバムをプロデュース。表題曲が国際的な映画音楽コンクールFMC2020でファイナリストに選出。',
        zh: '為二胡演奏家Shin製作的迷你專輯。主打曲入選國際電影音樂比賽FMC2020決選。'
      },
      links: {
        spotify: 'https://linkco.re/ZQCEM5tF',
        youtube: 'https://www.youtube.com/watch?v=avpQVtT7vyk'
      }
    },
    {
      title: 'Utae - toi toi toi',
      year: '2019',
      image: 'https://i.ytimg.com/vi/m4J0QYEQ9Sk/maxresdefault.jpg',
      description: {
        en: 'Produced album for artist Utae, featuring sophisticated pop arrangements and production.',
        ja: 'アーティストUtaeのアルバムをプロデュース。洗練されたポップアレンジとプロダクション。',
        zh: '為藝人Utae製作的專輯，以精緻的流行編曲與製作為特色。'
      },
      links: {
        other: 'http://purre-goohn.com/utaervr/',
        youtube: 'https://www.youtube.com/watch?v=m4J0QYEQ9Sk'
      }
    },
    {
      title: '北谷和子 - 時の過ぎゆくままに',
      year: '2018',
      image: 'https://i.ytimg.com/vi/ytm5zN3xz_A/maxresdefault.jpg',
      description: {
        en: 'Second album for Kazuko Kitatani, featuring production, composition, and arrangement.',
        ja: '北谷和子のセカンドアルバム。プロデュース、作編曲を担当。',
        zh: '北谷和子第二張專輯。負責製作、作曲編曲。'
      },
      links: {
        other: 'http://kazukokitatani.com/memories.html',
        youtube: 'https://www.youtube.com/watch?v=ytm5zN3xz_A'
      }
    }
  ],
  OTHER: [
    {
      title: 'JOY-S - Red Thread',
      year: '2016',
      image: 'https://i.ytimg.com/vi/alolSBasznk/maxresdefault.jpg',
      description: {
        en: 'Classical pop unit combining classical instruments with modern pop sensibilities.',
        ja: 'クラシック楽器とモダンなポップ感性を組み合わせたクラシカル・ポップユニット。',
        zh: '結合古典樂器與現代流行感性的古典流行單位。'
      },
      links: {
        youtube: 'https://www.youtube.com/watch?v=alolSBasznk'
      }
    },
    {
      title: 'NH-Trio',
      year: '2015-2017',
      image: '/images/bbm-logo.jpg',
      description: {
        en: 'Piano-centric trio exploring noise, jazz, classical, and electronic music.',
        ja: 'ピアノを中心に、ノイズ、ジャズ、クラシック、エレクトロニックミュージックを行き来するトリオ。',
        zh: '以鋼琴為核心，遊走於噪音、爵士、古典與電子音樂之間的三重奏。'
      },
      links: {}
    }
  ]
};

const Releases: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ReleaseCategory>('SOLO');

  const categories: ReleaseCategory[] = ['SOLO', 'BBCO', 'UN.a', 'PRODUCE', 'OTHER'];

  const getCategoryDescription = (cat: ReleaseCategory) => {
    const descriptions = {
      SOLO: {
        en: 'Solo work as a pianist, composer, and media artist. Fusing piano with advanced technologies.',
        ja: 'ピアニスト、作曲家、メディアアーティストとしての個人創作活動。',
        zh: '身為鋼琴家、作曲家與媒體藝術家的個人創作。'
      },
      BBCO: {
        en: 'Beyond Boundary Chamber Orchestra - A genre-less chamber orchestra.',
        ja: 'Beyond Boundary Chamber Orchestra - ジャンルレスなチェンバー・オーケストラ。',
        zh: 'Beyond Boundary Chamber Orchestra - 無類別室內樂團。'
      },
      'UN.a': {
        en: 'Electro-jazz unit formed with saxophonist Koichi Utsugi.',
        ja: 'サックス奏者・宇津木紘一と結成したエレクトロ・ジャズユニット。',
        zh: '與薩克斯風手宇津木紘一共同組成的電子爵士單位。'
      },
      PRODUCE: {
        en: 'Production work for various artists through composition, arrangement, and sound design.',
        ja: '様々なアーティストの作品に作編曲、サウンドデザインで参加。',
        zh: '透過作曲、編曲、聲音設計參與多位藝術家的作品。'
      },
      OTHER: {
        en: 'Other musical units formed with specific concepts and memberships.',
        ja: '特定のコンセプトやメンバーシップで結成された音楽ユニット。',
        zh: '依照特定概念與成員所組成的其他音樂單位。'
      }
    };
    return descriptions[cat][language];
  };

  return (
    <div className="w-full min-h-screen pt-48 px-6 md:px-12 pb-24 bg-[#0a0a0a] text-[#dfdbd5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <Link to="/work" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest mb-8 hover:opacity-50 transition-opacity">
          <span>←</span> Back to Works
        </Link>
        <h1 className="text-6xl md:text-8xl font-serif italic mb-6">Releases</h1>
        <p className="text-lg opacity-70 max-w-3xl">
          {language === 'en' && 'Solo works and collaborative releases including BBCO, UN.a, and other units. Available on streaming platforms and physical media.'}
          {language === 'ja' && 'ソロ作品およびBBCO、UN.a等のユニットでのリリース作品。サブスクリプションサービスおよびCDで配信中。'}
          {language === 'zh' && '個人作品及BBCO、UN.a等組合的發行作品。可於串流平台及實體媒體取得。'}
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? 'bg-[#dfdbd5] text-[#0a0a0a]'
                  : 'bg-transparent border border-[#dfdbd5]/30 hover:border-[#dfdbd5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Category Description */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <p className="text-md opacity-60">{getCategoryDescription(selectedCategory)}</p>
      </motion.div>

      {/* Releases Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {RELEASES[selectedCategory].map((release, index) => (
            <motion.div
              key={`${release.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden mb-4 bg-[#1a1a1a]">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium">{release.title}</h3>
                  <span className="text-sm opacity-50">{release.year}</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed">
                  {release.description[language]}
                </p>

                {/* Links */}
                {Object.keys(release.links).length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-3">
                    {release.links.spotify && (
                      <a
                        href={release.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-wider hover:opacity-50 transition-opacity"
                      >
                        Spotify
                      </a>
                    )}
                    {release.links.appleMusic && (
                      <a
                        href={release.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-wider hover:opacity-50 transition-opacity"
                      >
                        Apple Music
                      </a>
                    )}
                    {release.links.youtube && (
                      <a
                        href={release.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-wider hover:opacity-50 transition-opacity"
                      >
                        YouTube
                      </a>
                    )}
                    {release.links.bandcamp && (
                      <a
                        href={release.links.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-wider hover:opacity-50 transition-opacity"
                      >
                        Bandcamp
                      </a>
                    )}
                    {release.links.other && (
                      <a
                        href={release.links.other}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-wider hover:opacity-50 transition-opacity"
                      >
                        More Info
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Releases;
