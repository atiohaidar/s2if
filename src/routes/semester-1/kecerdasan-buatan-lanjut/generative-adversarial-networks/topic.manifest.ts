import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'generative-adversarial-networks',
    slug: 'generative-adversarial-networks',
    title: 'Generative Adversarial Networks (GANs)',
    summary: 'Konsep dasar Generative Adversarial Networks (GANs), submodel Generator & Discriminator, analogi zero-sum game, serta berbagai aplikasi praktisnya.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 12,
    tags: ['unsupervised', 'generative-models', 'gans', 'deep-learning'],
    prereq: ['unsupervised-learning-autoencoders'],
    renderMode: 'note',
};

export default manifest;
