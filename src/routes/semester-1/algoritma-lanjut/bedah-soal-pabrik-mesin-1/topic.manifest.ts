import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-pabrik-mesin-1',
    slug: 'bedah-soal-pabrik-mesin-1',
    title: 'Bedah Soal: Pabrik Mesin (Waktu Produksi Minimum)',
    summary: 'Bedah soal optimasi dengan binary search pada ruang solusi dan analisis kompleksitas.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 6,
    tags: ['bedah-soal', 'binary-search', 'optimasi'],
    prereq: ['week-5-dnc-pruning'],
    renderMode: 'note',
};

export default manifest;