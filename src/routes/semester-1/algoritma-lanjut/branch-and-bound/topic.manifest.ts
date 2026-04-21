import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'branch-and-bound',
    slug: 'branch-and-bound',
    title: 'Keterurutan Data dan Batas Bawah Komputasi',
    summary: 'Modul 5: data terurut, merge sort, decision tree, dan implikasi batas bawah kompleksitas.',
    type: 'catatan',
    track: 'materi',
    status: 'wip',
    order: 9,
    tags: ['sorting', 'lower-bound', 'merge-sort', 'reduksi'],
    prereq: ['konsep'],
    renderMode: 'mixed',
};

export default manifest;
