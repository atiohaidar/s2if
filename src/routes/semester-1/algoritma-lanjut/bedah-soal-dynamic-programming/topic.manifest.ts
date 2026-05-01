import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-dynamic-programming',
    slug: 'bedah-soal-dynamic-programming',
    title: 'Bedah Soal: Dynamic Programming',
    summary: 'Pembahasan soal-soal latihan Dynamic Programming, termasuk Minimum Coin Change dan LCS.',
    type: 'soal',
    track: 'bedah-soal',
    status: 'done',
    order: 13,
    tags: ['dynamic-programming', 'coin-change', 'soal-latihan'],
    prereq: ['dynamic-programming'],
    renderMode: 'note',
};

export default manifest;
