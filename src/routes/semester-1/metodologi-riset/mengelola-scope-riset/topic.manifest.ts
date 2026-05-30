import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'mengelola-scope-riset',
    slug: 'mengelola-scope-riset',
    title: 'Kok Penelitianku Makin Ribet Ya?',
    summary: 'Panduan mengelola scope riset agar tidak overwhelmed: kapan harus fokus mendalam, kapan boleh skip dimensi, dan cara handle kritik pembaca soal keterbatasan.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 4,
    tags: ['metodologi-riset', 'research-scope', 'limitations', 'trade-offs'],
    prereq: ['menemukan-celah-riset'],
    renderMode: 'note',
};

export default manifest;
