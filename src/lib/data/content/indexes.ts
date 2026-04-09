import type { SemesterIndex, SubjectIndex } from './types';

export const semesterIndexes: SemesterIndex[] = [
    {
        id: 'semester-1',
        slug: 'semester-1',
        title: 'Semester 1',
        order: 1,
    },
];

export const subjectIndexes: SubjectIndex[] = [
    {
        semesterId: 'semester-1',
        id: 'algoritma-lanjut',
        slug: 'algoritma-lanjut',
        title: 'Desain Algoritma Lanjut',
        icon: 'subject-algoritma',
        summary: 'Fundamental desain algoritma, pembuktian, dan studi kasus optimasi.',
        status: 'wip',
        order: 1,
        tags: ['algoritma', 'optimasi', 'rekursi'],
    },
    {
        semesterId: 'semester-1',
        id: 'kecerdasan-buatan-lanjut',
        slug: 'kecerdasan-buatan-lanjut',
        title: 'Kecerdasan Buatan Lanjut',
        icon: 'subject-ai-lanjut',
        summary: 'Pencarian, strategi agen cerdas, dan simulasi visual untuk pemahaman konsep.',
        status: 'wip',
        order: 2,
        tags: ['ai', 'search', 'heuristic'],
    },
];
