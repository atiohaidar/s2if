import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'passive-voice',
    slug: 'passive-voice',
    title: 'Passive Voice',
    summary: 'Pola dasar kalimat pasif dan cara mengubah kalimat aktif ke pasif.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 2,
    tags: ['bahasa-inggris', 'grammar', 'passive-voice'],
    prereq: ['rumus-grammar-tenses'],
    renderMode: 'note',
};

export default manifest;