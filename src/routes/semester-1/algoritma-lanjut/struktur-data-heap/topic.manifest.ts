import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'struktur-data-heap',
    slug: 'struktur-data-heap',
    title: 'Struktur Data Pohon Berbasis Array (Heap & Segment Tree)',
    summary: 'Pembahasan mengenai representasi pohon pada array, Pohon Segmen, dan struktur Heap beserta aplikasinya.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 5,
    tags: ['heap', 'segment-tree', 'heapsort', 'rmq'],
    prereq: ['pencacahan-dan-akumulasi-frekuensi'],
    renderMode: 'mixed',
};

export default manifest;
