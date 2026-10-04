import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'praktek-vibe-coding',
    slug: 'praktek-vibe-coding',
    title: 'Praktek Vibe Coding (Checklist Proyek)',
    summary: 'Checklist interaktif alur kerja Vibe Coding dari nol: ideation, diskusi dengan AI, PRD, batasan teknologi, pertanyaan kritis, deploy ke GitHub Pages, sampai maintenance.',
    type: 'praktek',
    track: 'materi',
    status: 'done',
    order: 4,
    tags: ['vibe-coding', 'praktek', 'checklist', 'project', 'hands-on', 'ai-assisted'],
    prereq: ['komprehensif'],
    renderMode: 'mixed',
};

export default manifest;
