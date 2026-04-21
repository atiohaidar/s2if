import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'struktur-data-dasar',
    slug: 'struktur-data-dasar',
    title: 'Struktur Data Dasar Sebelum Masuk Sorting',
    summary:
        'Materi pondasi struktur data penting di algoritma: stack, queue, linked list, tree, heap, hash table, dan graph.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 2.5,
    tags: ['struktur-data', 'stack', 'heap', 'tree', 'queue'],
    prereq: ['konsep'],
    renderMode: 'note',
};

export default manifest;
