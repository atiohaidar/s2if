import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'blind-search',
    slug: 'blind-search',
    title: 'Blind Search (Uninformed Search)',
    summary: 'BFS, DFS, dan UCS dengan visualizer interaktif untuk membandingkan traversal.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 3,
    tags: ['bfs', 'dfs', 'ucs'],
    prereq: ['ai-searching-dan-visualisasi-tree'],
    renderMode: 'mixed',
};

export default manifest;