import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'struktur-dasar-kendaraan',
    slug: 'struktur-dasar-kendaraan',
    title: 'Struktur Dasar Kendaraan',
    summary: 'Kerangka umum pembahasan bagian-bagian utama mobil.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 2,
    tags: ['otomotif', 'struktur', 'kendaraan'],
    prereq: ['pengantar-avanza-gen-1'],
    renderMode: 'note',
};

export default manifest;