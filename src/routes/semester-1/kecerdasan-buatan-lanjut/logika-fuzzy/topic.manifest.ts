import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'logika-fuzzy',
    slug: 'logika-fuzzy',
    title: 'Logika Fuzzy',
    summary: 'Fuzzy set, membership function (segitiga/trapesium/Gaussian), operasi fuzzy, inferensi Mamdani vs Sugeno, defuzzification, multi-input, rule explosion, dan pengantar neuro-fuzzy (ANFIS).',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 7,
    tags: ['fuzzy', 'logika-fuzzy', 'ai', 'mamdani', 'sugeno', 'anfis'],
    prereq: ['pengantar-ai'],
    renderMode: 'note',
};

export default manifest;