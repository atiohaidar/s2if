import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'kelistrikan-dasar-dan-perawatan',
    slug: 'kelistrikan-dasar-dan-perawatan',
    title: 'Kelistrikan Dasar dan Perawatan',
    summary: 'Komponen listrik dasar, baterai, starter, dan perawatan rutin.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 7,
    tags: ['otomotif', 'kelistrikan', 'perawatan'],
    prereq: ['sistem-pendukung-mesin'],
    renderMode: 'note',
};

export default manifest;