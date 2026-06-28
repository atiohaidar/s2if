import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'artificial-neural-networks',
    slug: 'artificial-neural-networks',
    title: 'Artificial Neural Networks',
    summary: 'Konsep dasar Artificial Neural Networks, Perceptron, Logistic Regression, Multi-Layer Perceptron (MLP), Backpropagation, dan fungsi aktivasi.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 10.2,
    tags: ['neural-networks', 'perceptron', 'backpropagation', 'deep-learning'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;
