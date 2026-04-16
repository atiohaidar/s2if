import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'support-vector-machine',
    slug: 'support-vector-machine',
    title: 'Support Vector Machine',
    summary: 'Materi klasifikasi SVM, margin, support vector, dan kernel trick untuk pemodelan data.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 2,
    tags: ['svm', 'klasifikasi', 'kernel', 'margin'],
    prereq: ['regresi-linear'],
    renderMode: 'note',
};

export default manifest;