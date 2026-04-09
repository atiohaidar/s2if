import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'graph-theory',
    slug: 'graph-theory',
    title: 'Teori Graf: Representasi Visual',
    summary: 'Visualisasi struktur graf, relasi node-edge, dan representasi matriks/adjacency.',
    type: 'visual',
    track: 'materi',
    status: 'wip',
    order: 4,
    tags: ['graf', 'visualisasi'],
    prereq: ['konsep'],
    renderMode: 'mixed',
};

export default manifest;