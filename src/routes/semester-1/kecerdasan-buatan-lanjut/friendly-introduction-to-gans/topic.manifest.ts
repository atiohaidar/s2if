import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'friendly-introduction-to-gans',
    slug: 'friendly-introduction-to-gans',
    title: 'A Friendly Introduction to Generative Adversarial Networks (GANs)',
    summary: 'Pendekatan intuitif memahami konsep GANs melalui analogi pemalsu lukisan & polisi di dunia Slanted Land 2x2 piksel, lengkap dengan penurunan fungsi error log loss dan proses training-nya.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 14.2,
    tags: ['unsupervised', 'generative-models', 'gans', 'math'],
    prereq: ['generative-adversarial-networks'],
    renderMode: 'note',
};

export default manifest;
