import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'divide-and-conquer',
    slug: 'divide-and-conquer',
    title: 'Divide and Conquer',
    summary: 'Pembahasan strategi DnC dan pruning lengkap dengan visualizer serta kuis latihan.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 7,
    tags: ['dnc', 'pruning', 'quicksort'],
    prereq: ['konsep'],
    renderMode: 'mixed',
};

export default manifest;