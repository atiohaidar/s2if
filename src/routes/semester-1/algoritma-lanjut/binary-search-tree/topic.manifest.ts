import type { TopicManifest } from '$lib/data/content/types';

const manifest: TopicManifest = {
    id: 'binary-search-tree',
    slug: 'binary-search-tree',
    title: 'Binary Search Tree (BST)',
    summary: 'Materi mendalam mengenai Binary Search Tree (BST), operasi dasar (Search, Min/Max, Successor), algoritma penghapusan formal, analisis kompleksitas, hingga penyeimbangan pohon (AVL Tree).',
    order: 10,
    type: 'catatan',
    track: 'materi',
    status: 'done',
    tags: ['binary-search-tree', 'data-structure', 'tree'],
    prereq: [],
    renderMode: 'note'
};

export default manifest;
