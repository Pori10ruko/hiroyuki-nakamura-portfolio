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
// Anything left over (no workId, no inferred match, no `artist` tag) is
// grouped by its `group` field and rendered in the "leftover" video section
// on the Work page — see getLeftoverVideoGroups(). Nothing is dropped.

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

// Non-YouTube embeds tied to a specific project (SoundCloud etc.) — also
// read off _spec/live.js (`$v`). Only one entry in production: JOY-S's BLEU
// Teaser.
export interface ProjectEmbed {
  title: string;
  embedSrc: string;
}
export const EXTRA_EMBEDS: Record<string, ProjectEmbed[]> = {
  '39': [
    {
      title: 'BLEU Teaser',
      embedSrc:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208092275&color=%230c6689&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
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
  for (const v of [...own, ...matched, ...extra]) {
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
      groups.set(key, { key, labelKey, literalLabel, videos: [] });
    }
    groups.get(key)!.videos.push({ id: v.id, title: v.title, channel: v.channel });
  }

  return [...groups.values()];
}
