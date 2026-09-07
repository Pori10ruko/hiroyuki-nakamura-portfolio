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
const INFERRED_WORK_ID: Record<string, string> = {
  'D4dLEi8udTk': '4-3', // "Piano Distance 2 ... at Tokoji Temple" -> Architecture of Sound and Light at Tokoji Temple
  'vf7puav4mYo': '4-3', // "Gymnopédie ... at Tokoji Temple" -> same
  'lI7Rq58b2Ys': '21',  // "Piano & Live Painting Concert 'Look Up At The Stars'" -> album of same title
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

  const seen = new Set<string>();
  const merged: ResolvedVideo[] = [];
  for (const v of [...own, ...matched]) {
    if (seen.has(v.id)) continue;
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
  PROJECTS.forEach((p) => getProjectVideos(p).forEach((v) => assigned.add(v.id)));

  const leftovers = VIDEOS.filter((v) => !assigned.has(v.id));

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
