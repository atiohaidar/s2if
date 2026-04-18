import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'machine-learning',
    slug: 'machine-learning',
    title: 'Machine Learning',
    summary: 'Konsep dasar machine learning, jenis pembelajaran, alur kerja model, dan evaluasi.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 9,
    tags: ['machine-learning', 'supervised', 'unsupervised'],
    prereq: ['pengantar-ai'],
    renderMode: 'note',
};

export default manifest;
