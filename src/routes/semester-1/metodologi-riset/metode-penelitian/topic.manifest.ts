import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'metode-penelitian',
    slug: 'metode-penelitian',
    title: 'Metode Penelitian: Kualitatif vs Kuantitatif',
    summary: 'Perbandingan mendalam antara metode penelitian kualitatif dan kuantitatif, teknik pengumpulan data, serta analisis data dalam riset ilmiah.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 2,
    tags: ['metodologi-riset', 'kualitatif', 'kuantitatif', 'metode-penelitian'],
    prereq: ['hipotesis'],
    renderMode: 'note',
};

export default manifest;
