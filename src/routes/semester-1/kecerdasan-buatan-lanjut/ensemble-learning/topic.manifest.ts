import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'ensemble-learning',
    slug: 'ensemble-learning',
    title: 'Ensemble Learning',
    summary: 'Pengenalan Ensemble Learning, perbandingan Bias vs Variance, metode Bagging dan Boosting, serta perhitungan akurasi gabungan.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 11,
    tags: ['ensemble', 'bagging', 'boosting', 'bias-variance'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;
