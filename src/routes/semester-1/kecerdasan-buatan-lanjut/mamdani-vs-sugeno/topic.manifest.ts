import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'mamdani-vs-sugeno',
    slug: 'mamdani-vs-sugeno',
    title: 'Mamdani vs Sugeno',
    summary: 'Perbandingan dua pendekatan fuzzy inference: Mamdani yang intuitif dan Sugeno yang lebih ringkas untuk komputasi.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 8,
    tags: ['fuzzy', 'mamdani', 'sugeno'],
    prereq: ['logika-fuzzy'],
    renderMode: 'note',
};

export default manifest;