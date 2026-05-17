import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'graph-theory',
    slug: 'graph-theory',
    title: 'Teori Graf dan Algoritma Dasar',
    summary: 'Pengenalan graf, struktur data graf (Adjacency Matrix/List), serta algoritma penelusuran (BFS/DFS), Shortest Path, dan Minimum Spanning Tree.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 17,
    tags: ['Graph', 'BFS', 'DFS', 'Dijkstra', 'MST'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;
