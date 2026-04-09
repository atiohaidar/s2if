import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'pengantar-ai',
    slug: 'pengantar-ai',
    title: 'Pengantar Kecerdasan Buatan',
    summary: 'Dasar AI, komponen sistem AI, dan pentingnya paradigma search dalam AI.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 1,
    tags: ['ai', 'pengantar'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;