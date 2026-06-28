import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'kmeans-clustering',
    slug: 'kmeans-clustering',
    title: 'K-Means Clustering',
    summary: 'Konsep unsupervised learning dengan K-Means, kriteria clustering, metrik kualitas (SSE, Silhouette), dan problematikanya.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 9.2,
    tags: ['unsupervised', 'clustering', 'k-means'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;
