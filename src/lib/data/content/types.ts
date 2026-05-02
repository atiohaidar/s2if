export type TopicType = 'catatan' | 'visual' | 'praktek' | 'soal';
export type TopicTrack = 'materi' | 'bedah-soal';
export type TopicStatus = 'done' | 'wip' | 'todo';
export type RenderMode = 'note' | 'interactive' | 'mixed';

export interface TopicManifest {
    id: string;
    slug: string;
    title: string;
    summary: string;
    type: TopicType;
    track: TopicTrack;
    status: TopicStatus;
    order: number;
    tags: string[];
    prereq: string[];
    renderMode: RenderMode;
}

export interface Topic extends TopicManifest {
    name: string;
}

export interface SubjectIndex {
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

export interface Subject extends SubjectIndex {
    name: string;
    topics: Topic[];
}

export interface SemesterIndex {
    id: string;
    slug: string;
    title: string;
    order: number;
}

export interface Semester extends SemesterIndex {
    name: string;
    subjects: Subject[];
}

export interface CatalogEntry {
    semesterId: string;
    semesterName: string;
    subjectId: string;
    subjectName: string;
    topicId?: string;
    topicName?: string;
    track?: TopicTrack;
    type?: TopicType;
    status?: TopicStatus;
    kind: 'semester' | 'subject' | 'topic';
    order: number;
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
    return [...items].sort((left, right) => {
        return left.order - right.order;
    });
}

export function fromTopicManifest(manifest: TopicManifest): Topic {
    return {
        ...manifest,
        name: manifest.title,
    };
}

export function getAllSubjects(curriculum: Semester[]): Subject[] {
    return curriculum.flatMap((semester) => sortByOrder(semester.subjects));
}

export function findSubject(
    curriculum: Semester[],
    semesterId: string,
    subjectId: string,
): Subject | undefined {
    const semester = curriculum.find((entry) => entry.id === semesterId);
    return semester?.subjects.find((subject) => subject.id === subjectId);
}

export function findTopic(
    curriculum: Semester[],
    semesterId: string,
    subjectId: string,
    topicId: string,
): Topic | undefined {
    const subject = findSubject(curriculum, semesterId, subjectId);
    return subject?.topics?.find((topic) => topic.id === topicId);
}

export function buildCatalog(curriculum: Semester[]): CatalogEntry[] {
    const catalog: CatalogEntry[] = [];

    for (const semester of sortByOrder(curriculum)) {
        catalog.push({
            semesterId: semester.id,
            semesterName: semester.name,
            subjectId: '',
            subjectName: '',
            kind: 'semester',
            order: semester.order,
        });

        for (const subject of sortByOrder(semester.subjects)) {
            catalog.push({
                semesterId: semester.id,
                semesterName: semester.name,
                subjectId: subject.id,
                subjectName: subject.name,
                status: subject.status,
                kind: 'subject',
                order: subject.order,
            });

            for (const topic of sortByOrder(subject.topics ?? [])) {
                catalog.push({
                    semesterId: semester.id,
                    semesterName: semester.name,
                    subjectId: subject.id,
                    subjectName: subject.name,
                    topicId: topic.id,
                    topicName: topic.name,
                    track: topic.track,
                    type: topic.type,
                    status: topic.status,
                    kind: 'topic',
                    order: topic.order,
                });
            }
        }
    }

    return catalog;
}