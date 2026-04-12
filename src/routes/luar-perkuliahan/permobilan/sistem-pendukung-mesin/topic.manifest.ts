import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'sistem-pendukung-mesin',
    slug: 'sistem-pendukung-mesin',
    title: 'Sistem Pendukung Mesin',
    summary: 'Bahan bakar, pendingin, pelumasan, dan kelistrikan dasar mesin.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 4,
    tags: ['otomotif', 'pendingin', 'pelumasan', 'bahan-bakar'],
    prereq: ['mesin-dan-siklus-kerja'],
    renderMode: 'note',
};

export default manifest;