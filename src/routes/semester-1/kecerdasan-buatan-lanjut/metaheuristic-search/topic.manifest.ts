import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'metaheuristic-search',
    slug: 'metaheuristic-search',
    title: 'Metaheuristic Search',
    summary: 'Pengenalan teknik metaheuristik untuk pendekatan optimasi non-deterministik.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 8,
    tags: ['metaheuristic', 'optimasi'],
    prereq: ['informed-search'],
    renderMode: 'note',
};

export default manifest;