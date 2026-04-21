import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'dynamic-programming',
    slug: 'dynamic-programming',
    title: 'Pemrograman Dinamik',
    summary: 'Modul 6: konsep DP, top-down vs bottom-up, contoh kasus, dan optimasi ruang memori.',
    type: 'catatan',
    track: 'materi',
    status: 'wip',
    order: 12,
    tags: ['dynamic-programming', 'memoization', 'tabulation', 'lcs', 'knapsack'],
    prereq: ['konsep', 'branch-and-bound'],
    renderMode: 'mixed',
};

export default manifest;
