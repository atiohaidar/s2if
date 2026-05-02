import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { semesterIndexes, subjectIndexes } from '../src/lib/data/content/indexes';

type TopicStatus = 'done' | 'wip' | 'todo';

interface SemesterIndex {
    id: string;
    slug: string;
    title: string;
    order: number;
}

interface SubjectIndex {
    semesterId: string;
    id: string;
    slug: string;
    title: string;
    icon: string;
    summary: string;
    status: TopicStatus;
    order: number;
    tags: string[];
}

export function toTitleFromSlug(slug: string): string {
    return slug
        .split('-')
        .filter((part) => part.length > 0)
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(' ');
}

export function serializeArray(values: string[]): string {
    if (values.length === 0) {
        return '[]';
    }
    return `[${values.map((value) => `'${value.replace(/'/g, "\\'")}'`).join(', ')}]`;
}

export function renderIndexes(
    semesters: SemesterIndex[],
    subjects: SubjectIndex[],
): string {
    const semesterLines = semesters
        .map(
            (semester) => `    {
        id: '${semester.id}',
        slug: '${semester.slug}',
        title: '${semester.title.replace(/'/g, "\\'")}',
        order: ${semester.order},
    },`,
        )
        .join('\n');

    const subjectLines = subjects
        .map(
            (subject) => `    {
        semesterId: '${subject.semesterId}',
        id: '${subject.id}',
        slug: '${subject.slug}',
        title: '${subject.title.replace(/'/g, "\\'")}',
        icon: '${subject.icon.replace(/'/g, "\\'")}',
        summary: '${subject.summary.replace(/'/g, "\\'")}',
        status: '${subject.status}',
        order: ${subject.order},
        tags: ${serializeArray(subject.tags)},
    },`,
        )
        .join('\n');

    return `import type { SemesterIndex, SubjectIndex } from './types';

export const semesterIndexes: SemesterIndex[] = [
${semesterLines}
];

export const subjectIndexes: SubjectIndex[] = [
${subjectLines}
];
`;
}

async function discoverRouteStructure(): Promise<
    Array<{ semesterId: string; subjectIds: string[] }>
> {
    const routesDir = path.resolve(process.cwd(), 'src', 'routes');
    const semesterDirs = (await readdir(routesDir, { withFileTypes: true }))
        .filter(
            (entry) =>
                entry.isDirectory() &&
                (entry.name.startsWith('semester-') || entry.name === 'luar-perkuliahan'),
        )
        .map((entry) => entry.name)
        .sort();

    const structure: Array<{ semesterId: string; subjectIds: string[] }> = [];
    for (const semesterId of semesterDirs) {
        const semesterDir = path.join(routesDir, semesterId);
        const subjectIds = (await readdir(semesterDir, { withFileTypes: true }))
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort();

        structure.push({
            semesterId,
            subjectIds,
        });
    }

    return structure;
}

export async function main(): Promise<void> {
    const structure = await discoverRouteStructure();

    const existingSemesters = new Map(semesterIndexes.map((entry) => [entry.id, entry]));
    const existingSubjects = new Map(
        subjectIndexes.map((entry) => [`${entry.semesterId}/${entry.id}`, entry]),
    );

    const nextSemesters: SemesterIndex[] = [];
    const nextSubjects: SubjectIndex[] = [];

    structure.forEach((semester, semesterIndex) => {
        const existingSemester = existingSemesters.get(semester.semesterId);
        nextSemesters.push({
            id: semester.semesterId,
            slug: semester.semesterId,
            title: existingSemester?.title ?? toTitleFromSlug(semester.semesterId),
            order: existingSemester?.order ?? semesterIndex + 1,
        });

        semester.subjectIds.forEach((subjectId, subjectIndex) => {
            const key = `${semester.semesterId}/${subjectId}`;
            const existingSubject = existingSubjects.get(key);
            nextSubjects.push({
                semesterId: semester.semesterId,
                id: subjectId,
                slug: subjectId,
                title: existingSubject?.title ?? toTitleFromSlug(subjectId),
                icon: existingSubject?.icon ?? 'subject-algoritma',
                summary: existingSubject?.summary ?? 'Ringkasan mata kuliah belum diisi.',
                status: existingSubject?.status ?? 'todo',
                order: existingSubject?.order ?? subjectIndex + 1,
                tags: existingSubject?.tags ?? [],
            });
        });
    });

    nextSemesters.sort((left, right) => left.order - right.order);
    nextSubjects.sort((left, right) => {
        const semesterCompare = left.semesterId.localeCompare(right.semesterId);
        if (semesterCompare !== 0) {
            return semesterCompare;
        }
        return left.order - right.order;
    });

    const indexesPath = path.resolve(
        process.cwd(),
        'src',
        'lib',
        'data',
        'content',
        'indexes.ts',
    );

    await writeFile(indexesPath, renderIndexes(nextSemesters, nextSubjects), 'utf-8');
    console.log('Indexes synced successfully.');
    console.log(`- ${indexesPath}`);
}

const isDirectRun =
    process.argv[1] !== undefined &&
    pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
    main().catch((error) => {
        console.error(`Failed to sync indexes: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    });
}