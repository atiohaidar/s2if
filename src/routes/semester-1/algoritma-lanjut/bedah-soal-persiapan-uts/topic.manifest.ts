import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-persiapan-uts',
    slug: 'bedah-soal-persiapan-uts',
    title: 'Bedah Soal: Persiapan UTS (Live)',
    summary: 'Halaman khusus pembahasan soal-soal latihan persiapan UTS DAL secara bertahap.',
    type: 'soal',
    track: 'bedah-soal',
    status: 'wip',
    order: 99,
    tags: ['uts', 'latihan', 'live'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;
