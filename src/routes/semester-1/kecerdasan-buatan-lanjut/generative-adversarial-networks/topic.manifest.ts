import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'generative-adversarial-networks',
    slug: 'generative-adversarial-networks',
    title: 'Generative Adversarial Networks (GANs)',
    summary: 'Konsep dasar Generative Adversarial Networks (GANs), submodel Generator & Discriminator, analogi zero-sum game, serta berbagai aplikasi praktisnya.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 14,
    tags: ['unsupervised', 'generative-models', 'gans', 'deep-learning'],
    prereq: ['deep-unsupervised-learning'],
    renderMode: 'note',
};

export default manifest;
