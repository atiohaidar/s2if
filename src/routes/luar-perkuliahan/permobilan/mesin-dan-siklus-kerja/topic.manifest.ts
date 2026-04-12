import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'mesin-dan-siklus-kerja',
    slug: 'mesin-dan-siklus-kerja',
    title: 'Mesin dan Siklus Kerja',
    summary: 'Pengenalan mesin pembakaran dalam dan langkah kerja dasarnya.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 3,
    tags: ['otomotif', 'mesin', 'pembakaran-dalam'],
    prereq: ['pengantar-avanza-gen-1'],
    renderMode: 'note',
};

export default manifest;