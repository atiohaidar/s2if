import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-struktur-gabungan-himpunan-disjoin',
    slug: 'bedah-soal-struktur-gabungan-himpunan-disjoin',
    title: 'Bedah Soal: Struktur Gabungan Himpunan Disjoin (DSU)',
    summary: 'Bedah soal operasi makeSet/find/union pada DSU dengan pembahasan state parent[] dan rank[] langkah demi langkah.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'wip',
    order: 8,
    tags: ['bedah-soal', 'dsu', 'union-find', 'rank'],
    prereq: ['struktur-gabungan-himpunan-disjoin'],
    renderMode: 'note',
};

export default manifest;
