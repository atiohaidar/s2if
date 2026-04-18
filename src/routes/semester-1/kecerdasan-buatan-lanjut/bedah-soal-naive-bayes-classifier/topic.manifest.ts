import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'bedah-soal-naive-bayes-classifier',
    slug: 'bedah-soal-naive-bayes-classifier',
    title: 'Bedah Soal: Naive Bayes Classifier',
    summary: 'Bedah soal klasifikasi penerimaan pelamar dengan Naive Bayes berdasarkan IPK, psikologi, dan wawancara.',
    type: 'praktek',
    track: 'bedah-soal',
    status: 'done',
    order: 9.5,
    tags: ['bedah-soal', 'naive-bayes', 'classification', 'machine-learning'],
    prereq: ['machine-learning'],
    renderMode: 'note',
};

export default manifest;