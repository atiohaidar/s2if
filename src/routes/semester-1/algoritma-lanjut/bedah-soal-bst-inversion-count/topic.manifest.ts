import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-bst-inversion-count',
    slug: 'bedah-soal-bst-inversion-count',
    title: 'Bedah Soal: BST — Inversion Count',
    summary: 'Pembahasan lengkap soal menghitung jumlah inversi dalam array menggunakan pendekatan Augmented BST.',
    type: 'soal',
    track: 'bedah-soal',
    status: 'done',
    order: 14,
    tags: ['bst', 'inversion-count', 'augmented-bst', 'soal-latihan'],
    prereq: ['binary-search-tree'],
    renderMode: 'note',
};

export default manifest;
