import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'toefl-overview',
    slug: 'toefl-overview',
    title: 'Apa yang Harus Dipahami untuk TOEFL',
    summary: 'Ringkasan materi inti yang perlu dikuasai untuk persiapan TOEFL.',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 1,
    tags: ['toefl', 'reading', 'listening', 'grammar'],
    prereq: [],
    renderMode: 'note',
};

export default manifest;