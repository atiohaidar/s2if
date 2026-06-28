import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'convolutional-neural-networks',
    slug: 'convolutional-neural-networks',
    title: 'Convolutional Neural Networks',
    summary: 'Cara kerja Convolutional Neural Networks (CNN), operasi konvolusi, filter/kernel, stride, padding, pooling, dan fully connected layer.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 12.2,
    tags: ['cnn', 'convolution', 'pooling', 'deep-learning'],
    prereq: ['deep-learning'],
    renderMode: 'note',
};

export default manifest;
