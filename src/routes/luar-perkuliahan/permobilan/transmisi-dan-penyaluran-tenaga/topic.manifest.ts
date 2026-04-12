import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'transmisi-dan-penyaluran-tenaga',
    slug: 'transmisi-dan-penyaluran-tenaga',
    title: 'Transmisi dan Penyaluran Tenaga',
    summary: 'Bagaimana tenaga mesin diteruskan ke roda dan diatur sesuai kebutuhan.',
    type: 'catatan',
    track: 'materi',
    status: 'todo',
    order: 5,
    tags: ['otomotif', 'transmisi', 'drivetrain'],
    prereq: ['mesin-dan-siklus-kerja'],
    renderMode: 'note',
};

export default manifest;