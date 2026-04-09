import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'intro',
    slug: 'intro',
    title: 'Pengantar Desain Algoritma Lanjut',
    summary: 'Pengantar pola berpikir, objektif mata kuliah, dan peta materi algoritma lanjut.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 1,
    tags: ['pengantar', 'algoritma'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;