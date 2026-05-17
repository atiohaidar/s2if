import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-message-route',
    slug: 'bedah-soal-message-route',
    title: 'Bedah Soal: Jaringan Komputer (Message Route)',
    summary: 'Analisis jalur terpendek dalam graf unweighted menggunakan Breadth-First Search (BFS) dan rekonstruksi rute dengan Python.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 18,
    tags: ['bedah-soal', 'graph', 'bfs', 'python'],
    prereq: ['graph-theory'],
    renderMode: 'note',
};

export default manifest;
