import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'konsep',
    slug: 'konsep',
    title: 'Konsep Dasar Sebelum Materi Lanjutan',
    summary: 'Fondasi istilah, tracing, rekursi, dan kompleksitas sebelum topik lanjutan.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 2,
    tags: ['konsep', 'kompleksitas', 'rekursi'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;