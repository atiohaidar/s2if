import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-romania-map',
    slug: 'bedah-soal-romania-map',
    title: 'Bedah Soal: Romania Map Problem',
    summary: 'Eksplorasi interaktif masalah klasik peta Romania menggunakan BFS, DFS, UCS, Greedy, dan A*.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 5.5,
    tags: ['bedah-soal', 'romania-map', 'bfs', 'dfs', 'ucs', 'greedy', 'a-star'],
    prereq: ['blind-search', 'informed-search'],
    renderMode: 'mixed',
};

export default manifest;
