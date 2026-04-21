import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-dnc-binary-search-dan-partisi',
    slug: 'bedah-soal-dnc-binary-search-dan-partisi',
    title: 'Bedah Soal: DnC (Binary Search dan Partisi)',
    summary: 'Bedah dua soal DnC: hitung komparasi binary search dan hasil partisi quicksort berdasarkan pivot tertentu.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 11,
    tags: ['bedah-soal', 'dnc', 'binary-search', 'partition', 'quicksort'],
    prereq: ['week-5-dnc-pruning'],
    renderMode: 'note',
};

export default manifest;
