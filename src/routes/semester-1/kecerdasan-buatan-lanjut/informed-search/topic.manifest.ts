import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'informed-search',
    slug: 'informed-search',
    title: 'Informed Search (Heuristic Search)',
    summary: 'Pencarian berbasis heuristic untuk efisiensi eksplorasi ruang solusi.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 4,
    tags: ['heuristic', 'a-star'],
    prereq: ['blind-search'],
    renderMode: 'note',
};

export default manifest;