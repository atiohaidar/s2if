import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'deep-learning',
    slug: 'deep-learning',
    title: 'Deep Learning',
    summary: 'Pengenalan deep learning, arsitektur utama, sejarah singkat, dan contoh penerapan modern.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 12,
    tags: ['deep-learning', 'neural-network', 'history'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;
