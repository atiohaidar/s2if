import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'adversarial-search',
    slug: 'adversarial-search',
    title: 'Adversarial Search',
    summary: 'Minimax dan alpha-beta pruning untuk pengambilan keputusan kompetitif.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 5,
    tags: ['minimax', 'alpha-beta'],
    prereq: ['informed-search'],
    renderMode: 'note',
};

export default manifest;