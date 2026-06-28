import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'deep-unsupervised-learning',
    slug: 'deep-unsupervised-learning',
    title: 'Deep Unsupervised Learning',
    summary: 'Pembelajaran mendalam tanpa label menggunakan Autoencoders (use case, bottleneck, stacked/denoising) dan Restricted Boltzmann Machines (RBM, DRBN).',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 12.4,
    tags: ['unsupervised', 'autoencoders', 'rbm', 'deep-learning'],
    prereq: ['deep-learning'],
    renderMode: 'note',
};

export default manifest;
