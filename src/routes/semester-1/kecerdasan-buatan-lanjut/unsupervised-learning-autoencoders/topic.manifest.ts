import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'unsupervised-learning-autoencoders',
    slug: 'unsupervised-learning-autoencoders',
    title: 'Unsupervised Learning dengan Autoencoders',
    summary: 'Konsep unsupervised learning menggunakan Autoencoders, mencakup arsitektur bottleneck, anomaly detection, denoising, pre-training, transfer learning, dan Variational Autoencoders (VAEs).',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 11.2,
    tags: ['unsupervised', 'autoencoders', 'deep-learning', 'vae'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;
