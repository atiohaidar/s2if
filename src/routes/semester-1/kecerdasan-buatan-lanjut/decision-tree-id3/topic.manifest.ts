import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'decision-tree-id3',
    slug: 'decision-tree-id3',
    title: 'Decision Tree dengan Metode ID3',
    summary: 'Materi konsep decision tree, entropy, information gain, dan contoh pembentukan tree dengan metode ID3.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 10,
    tags: ['decision-tree', 'id3', 'entropy', 'information-gain'],
    prereq: ['machine-learning'],
    renderMode: 'mixed',
};

export default manifest;
