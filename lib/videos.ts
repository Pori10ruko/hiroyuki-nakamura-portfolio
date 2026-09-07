// Folds the flat VIDEOS catalogue (58 entries, restored from the live bundle
// 2026-09-06) into each Project's own `videos` field, so the standalone
// /video page's content is reachable from the Work grid instead of being a
// separate duplicate listing (2026-09-07 refactor).
//
// Matching order:
//   1. A project's own `videos` field (already curated, e.g. SITA, id "24").
//   2. Every VIDEOS entry whose `workId` matches the project id.
//   3. A small number of VIDEOS entries that have no `workId` in the
//      extracted catalogue but whose title unambiguously names a specific
//      work (see INFERRED_WORK_ID below) — this is an editorial inference
//      made in this refactor, not part of the extracted data, and is kept
//      separate from VIDEOS/constants.ts so it stays visible and reversible.
//
// Anything left over (no workId, no inferred match) is grouped by its
// `group` field and rendered in a fallback video section on the Work page —
// see getLeftoverVideoGroups(). As of 2026-09-07 every public entry resolves
// to a project, so that section renders nothing; it is kept only as a safety
// net so a future catalogue addition without a home is still visible rather
// than silently dropped.

import { PROJECTS, VIDEOS } from '../constants';
import type { Project, VideoEntry } from '../types';

export interface ResolvedVideo {
  id: string;
  title: string;
  channel?: string;
}

// Videos whose live-catalogue title names a specific work by name but were
// not tagged with a workId in the extracted catalogue. This mapping is an
// editorial inference made while merging the video page into Work
// (2026-09-07) — flagged in the task report, not a verified fact from the
// live bundle.
// ---------------------------------------------------------------------------
// 🔴 限定公開(unlisted)の動画は表に出さない。
// 本番 (index-DqG9yBGi.js) は除外セット e0 と許可リスト t0 でこれを行っていた。
// 2026-09-07 に YouTube を Cookie 無しで叩いて 11 本すべて "isUnlisted":true を実測済み。
// 除外の理由は「リンク切れ」ではなく限定公開であること。とくに V1FxXKFxYTM は
// DevGAMM の審査提出用コピーで、公開デモとは別物 (メモリ hobikibune_devgamm_2026)。
// ALLOW は本番が明示的に表示していたもの＝限定公開だが載せる判断がされている。
// ---------------------------------------------------------------------------
const UNLISTED = new Set<string>([
  '3TUAD9bo6Ko', 'NJ2_X9Ybq-I', 'JeRUBW1QWOQ', 'S8RzBlb0hQo', 's6yengQxH74',
  'qZHZwPZqjSk', 'b4ADwNB-4jk', 'D4dLEi8udTk', 'Bm53cMwSr-0', '84HVNdVfJqg',
  'UTzs9uSEbFY', 'V1FxXKFxYTM', 'lI7Rq58b2Ys', 'lmy-eChYDro',
  // 作品 id 12 (VENUS Festival) の link 先。2026-09-07 実測で isUnlisted:true、
  // 中身も "venus no shukusai digest demo1"。サムネイルとして表には出さない。
  'TWYuiozIxps',
]);

const ALLOW = new Set<string>([
  'lI7Rq58b2Ys', 'NJ2_X9Ybq-I', 'S8RzBlb0hQo', 's6yengQxH74', 'qZHZwPZqjSk',
]);

export function isPublicVideo(id: string): boolean {
  return !UNLISTED.has(id) || ALLOW.has(id);
}

const INFERRED_WORK_ID: Record<string, string> = {
  'D4dLEi8udTk': '4-3', // "Piano Distance 2 ... at Tokoji Temple" -> Architecture of Sound and Light at Tokoji Temple
  'vf7puav4mYo': '4-3', // "Gymnopédie ... at Tokoji Temple" -> same
  'lI7Rq58b2Ys': '21',  // "Piano & Live Painting Concert 'Look Up At The Stars'" -> album of same title

  // -------------------------------------------------------------------------
  // 2026-09-07: the /video page's four un-homed tiers ("Piano", "Archive",
  // "Spatial", artist "Utae") were folded into Work entries so the Work page
  // no longer ends in a catch-all block. Sources per group:
  //
  // Solo Piano Works (project 23-2) — a real entry on the pre-2026-01-06 site
  // (git 12b6db8^:constants.ts, id "23-2", RELEASES/SOLO, 2020-2024, with the
  // SoundCloud "solo-piano" playlist), and these exact four YouTube ids were
  // the "Solo Piano Works" block under RELEASES > SOLO until the 2026-09-06
  // redesign (git 771b26f:components/WorkGrid.tsx ~L484). Restored, not new.
  'bBCqNJIW4GQ': '23-2', // Piano Solo - Billie Jean
  'QvMYUWoV2jU': '23-2', // Piano solo - STAY TUNE
  'E-CZp4zW1oI': '23-2', // What Do You Mean?
  'rIQDM58aX-Y': '23-2', // Over The Rainbow

  // BBM Meeting (project bbm-meeting) — the 13 "BBM Meeting Vol.N" / "BBM
  // Vol.N" talk videos are one series by their own titles. Not attached to
  // "BBM Net Radio" (51, stand.fm audio) or "BBM Note" (41, text): nothing in
  // the repo says they are the same programme, so the series gets its own
  // ARCHIVE entry under its own name.
  '3vpCefTU9NM': 'bbm-meeting', 'j_5ZA-qA5hk': 'bbm-meeting', '5b0dT0aHkOo': 'bbm-meeting',
  'YMxvqrVLvJc': 'bbm-meeting', 'bB0AUbyJOys': 'bbm-meeting', 'q3SnQU5ztVw': 'bbm-meeting',
  '5smfeD4qYtc': 'bbm-meeting', 'T88S3Fo2oLI': 'bbm-meeting', 'ZNTVbejToNQ': 'bbm-meeting',
  'yhqwcs8TpPM': 'bbm-meeting', 'IlaFspjTygE': 'bbm-meeting', 'GKnVahg5A1I': 'bbm-meeting',
  'DL2VYhvL81o': 'bbm-meeting',

  // Spatial Audio — Erik Satie "Gymnopédie" (project gymnopedie-spatial). On
  // the pre-2026-09-06 site this video was its own titled block under the
  // SPATIAL AUDIO genre with an EN/JA note (git 771b26f:components/WorkGrid.tsx
  // ~L410); that note is now the entry's description.
  'azl0h7vc4eE': 'gymnopedie-spatial',

  // 2026 REEL "2Ch Spatial Experience" (project reel-2026). A showreel, not a
  // work; production only ever listed it in the /video "Spatial" tier. Given
  // its own SPATIAL AUDIO entry so it stays reachable under the same tab.
  'friwNAv_FTU': 'reel-2026',

  // Utae / Dystopia (Official MV) -> Utae - toi toi toi (33). Owner's
  // instruction 2026-09-07 ("For Utae, the one showing under toi toi toi can
  // be merged"). The repo itself does not say which Utae release Dystopia
  // belongs to — flagged in the task report.
  'qJdK-3P7fuY': '33',
};

// Per-project videos that exist only as hard-coded iframe blocks in the
// pre-refactor WorkGrid.tsx (Look Up at the Stars / UN.a / JOY-S) and are not
// part of the extracted VIDEOS catalogue in constants.ts. Read verbatim off
// _spec/live.js's own per-project video map (`fh`) so this is production
// fact, not invention — kept here rather than in constants.ts for the same
// reason as INFERRED_WORK_ID above. These are exactly the 10 video ids that
// were previously reachable only through WorkGrid's hard-coded sections.
const EXTRA_VIDEOS: Record<string, ResolvedVideo[]> = {
  '21': [
    { id: 'zXDl7wiq-dQ', title: 'Look Up at the Stars - Video 1' },
    { id: 'kHcXBKJCcP8', title: 'Look Up at the Stars - Video 2' },
    { id: 'lXkOnMQLFsg', title: 'Look Up at the Stars - Video 3' },
  ],
  '25-2': [{ id: 'P7QPGLEQoOM', title: 'UN.a Embrace' }],
  '26': [{ id: 'QH2ls79_ImA', title: 'UN.a Intersecting' }],
  '27': [
    { id: 'Rvki8xfQNBw', title: 'UN.a/COLOR Release Party' },
    { id: 'U9kxsHOumeo', title: 'Kenji Hirano / UN.a COLOR' },
  ],
  '39-2': [{ id: 'alolSBasznk', title: 'JOY-S - Red Thread' }],
  '39': [
    { id: 'QKwqqkYws_s', title: 'JOY-S Video 2' },
    { id: 'zGIbyx3Sx34', title: 'JOY-S Video 3' },
  ],
};

// Non-YouTube embeds tied to a specific project (SoundCloud etc.). '39' is
// read off _spec/live.js (`$v`) — the only one in production. '23-2' is the
// Solo Piano playlist embed that lived under RELEASES > SOLO until the
// 2026-09-06 redesign (git 771b26f:components/WorkGrid.tsx ~L559, and the
// entry's own `embedCode` in 12b6db8^:constants.ts) — src kept verbatim.
export interface ProjectEmbed {
  title: string;
  embedSrc: string;
  /** Player height in px; a playlist needs more room than a single track. */
  height?: number;
}
export const EXTRA_EMBEDS: Record<string, ProjectEmbed[]> = {
  '39': [
    {
      title: 'BLEU Teaser',
      embedSrc:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208092275&color=%230c6689&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    },
  ],
  '23-2': [
    {
      title: 'Solo Piano — SoundCloud playlist',
      embedSrc:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A133465326&color=%230c6689&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      height: 450,
    },
  ],
};

function effectiveWorkId(v: VideoEntry): string | undefined {
  return v.workId ?? INFERRED_WORK_ID[v.id];
}

function normalizeOwn(project: Project): ResolvedVideo[] {
  return (project.videos ?? []).map((v) =>
    typeof v === 'string' ? { id: v, title: v } : { id: v.id, title: v.title }
  );
}

/**
 * All videos for a single project: its own curated `videos` field first,
 * then any VIDEOS catalogue entries that resolve (natively or by
 * inference) to this project's id. De-duplicated by video id.
 */
// ---------------------------------------------------------------------------
// 作品の `link` が YouTube を指しているのに、その MV が動画として登録されていない
// ものがあった（XIDEN の5曲・YUKI『Share』）。カードを開いても映像が出ないので、
// リンクから拾って作品の映像として扱う。
// タイトルは 2026-09-07 に YouTube oEmbed で実取得したもの（作文していない）。
// ---------------------------------------------------------------------------
const LINK_VIDEO_TITLES: Record<string, string> = {
  QSQ4U3pcvzQ: 'YUKI『Share』',
  kqqkPzZV8b4: 'Day Opener / XIDEN【Official MV】',
  yrwF8EyLOcA: 'accompany / XIDEN【Official MV】',
  jWGWFkILgS4: '宿命 / XIDEN【Official MV】',
  lQ0atrk7IgA: 'closer / XIDEN【Official MV】',
  ttwOBxEhSwk: 'NOVA / XIDEN【Official MV】',
};

function youTubeIdFrom(url?: string): string | undefined {
  if (!url) return undefined;
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ??
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ??
    url.match(/\/embed\/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : undefined;
}

/** The MV a project links to, when it is public and its real title is known. */
function linkVideo(project: Project): ResolvedVideo | undefined {
  const id = youTubeIdFrom(project.link) ?? youTubeIdFrom(project.externalLink);
  if (!id || !isPublicVideo(id)) return undefined;
  const title = LINK_VIDEO_TITLES[id];
  return title ? { id, title } : undefined;
}

export function getProjectVideos(project: Project): ResolvedVideo[] {
  const own = normalizeOwn(project);
  const matched = VIDEOS.filter((v) => effectiveWorkId(v) === project.id).map((v) => ({
    id: v.id,
    title: v.title,
    channel: v.channel,
  }));
  const extra = EXTRA_VIDEOS[project.id] ?? [];

  const seen = new Set<string>();
  const merged: ResolvedVideo[] = [];
  const fromLink = linkVideo(project);
  for (const v of [...own, ...matched, ...extra, ...(fromLink ? [fromLink] : [])]) {
    if (seen.has(v.id)) continue;
    if (!isPublicVideo(v.id)) continue; // 限定公開は出さない
    seen.add(v.id);
    merged.push(v);
  }
  return merged;
}

export type LeftoverLabelKey =
  | 'videoPiano'
  | 'taxSpatial'
  | 'taxRelease'
  | 'taxCommissioned'
  | 'taxEducation'
  | 'taxArchive';

export interface LeftoverGroup {
  /** Stable key for React lists. */
  key: string;
  /** Translation key for the group label, or undefined for artist-named groups. */
  labelKey?: LeftoverLabelKey;
  /** Literal label to use instead of a translation key (artist-named groups). */
  literalLabel?: string;
  /** The catalogue's own `group` value, so the Work page can show only the
   *  groups that belong to the taxonomy the visitor is currently filtering by.
   *  Tiers that match no taxonomy tab (e.g. 'piano') appear only under "All". */
  tier: string;
  videos: ResolvedVideo[];
}

const GROUP_LABEL_KEY: Record<string, LeftoverLabelKey> = {
  piano: 'videoPiano',
  spatial: 'taxSpatial',
  release: 'taxRelease',
  commissioned: 'taxCommissioned',
  education: 'taxEducation',
  archive: 'taxArchive',
};

/**
 * Every VIDEOS entry that isn't reachable from any project card, grouped so
 * it can still be rendered somewhere on the Work page. Nothing from the
 * 58-video catalogue is dropped: an entry either ends up in a project's
 * derived video list, or in one of these groups.
 */
export function getLeftoverVideoGroups(): LeftoverGroup[] {
  const assigned = new Set<string>();
  PROJECTS.forEach((p) => {
    // 限定公開で除外された分も「割り当て済み」に数える（leftover へ落とさないため）
    normalizeOwn(p).forEach((v) => assigned.add(v.id));
    VIDEOS.filter((v) => effectiveWorkId(v) === p.id).forEach((v) => assigned.add(v.id));
  });

  // 限定公開は leftover にも出さない（assigned に入らないので二重に効かせる）
  const leftovers = VIDEOS.filter((v) => !assigned.has(v.id) && isPublicVideo(v.id));

  const groups = new Map<string, LeftoverGroup>();
  for (const v of leftovers) {
    let key: string;
    let labelKey: LeftoverLabelKey | undefined;
    let literalLabel: string | undefined;

    if (v.artist) {
      key = `artist:${v.artist}`;
      literalLabel = v.artist;
    } else {
      key = `group:${v.group}`;
      labelKey = GROUP_LABEL_KEY[v.group] ?? 'taxArchive';
    }

    if (!groups.has(key)) {
      groups.set(key, { key, labelKey, literalLabel, tier: v.group, videos: [] });
    }
    groups.get(key)!.videos.push({ id: v.id, title: v.title, channel: v.channel });
  }

  return [...groups.values()];
}
