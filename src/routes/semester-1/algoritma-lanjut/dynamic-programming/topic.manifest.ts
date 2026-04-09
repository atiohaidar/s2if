import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'dynamic-programming',
    slug: 'dynamic-programming',
    title: 'Praktek: Dynamic Programming',
    summary: 'Latihan interaktif untuk memahami DP melalui Fibonacci, trace, dan kuis.',
    type: 'praktek',
    track: 'materi',
    status: 'todo',
    order: 3,
    tags: ['dp', 'fibonacci', 'latihan'],
    prereq: ['konsep'],
    renderMode: 'interactive',
};

export default manifest;