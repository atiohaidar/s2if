import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'metaheuristic-search',
    slug: 'metaheuristic-search',
    title: 'Metaheuristic Search',
    summary: 'Pengantar metaheuristic dengan fokus pada Evolutionary Computation dan Genetic Algorithm.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 5,
    tags: ['metaheuristic', 'optimasi', 'ec', 'ga'],
    prereq: ['informed-search'],
    renderMode: 'note',
};

export default manifest;
