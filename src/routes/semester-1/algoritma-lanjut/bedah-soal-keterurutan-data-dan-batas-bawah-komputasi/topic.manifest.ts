import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-keterurutan-data-dan-batas-bawah-komputasi',
    slug: 'bedah-soal-keterurutan-data-dan-batas-bawah-komputasi',
    title: 'Bedah Soal: Keterurutan Data dan Batas Bawah Komputasi',
    summary: 'Bedah soal tentang pengaruh sorting pada solusi dan batas bawah sorting berbasis komparasi.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 9,
    tags: ['bedah-soal', 'sorting', 'lower-bound', 'kompleksitas'],
    prereq: ['branch-and-bound'],
    renderMode: 'note',
};

export default manifest;