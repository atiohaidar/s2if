import { discoverTopicManifests } from './discovery';
import { semesterIndexes, subjectIndexes } from './indexes';
import type {
    CatalogEntry,
    Semester,
    Subject,
    Topic,
} from './types';
import {
    buildCatalog,
    findSubject as findSubjectInCurriculum,
    findTopic as findTopicInCurriculum,
    fromTopicManifest,
    getAllSubjects as getAllSubjectsInCurriculum,
} from './types';

export type { RenderMode, Semester, Subject, Topic, TopicManifest, TopicStatus, TopicTrack, TopicType } from './types';

const discoveredTopics = discoverTopicManifests();

const topicsBySubject = discoveredTopics.reduce<Map<string, Topic[]>>((map, topic) => {
    const key = `${topic.semesterId}/${topic.subjectId}`;
    const existingTopics = map.get(key) ?? [];
    existingTopics.push(fromTopicManifest(topic));
    map.set(key, existingTopics);
    return map;
}, new Map());

export const curriculum: Semester[] = semesterIndexes
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((semester) => {
        const subjects: Subject[] = subjectIndexes
            .filter((subject) => subject.semesterId === semester.id)
            .slice()
            .sort((left, right) => left.order - right.order)
            .map((subject) => {
                const topicKey = `${semester.id}/${subject.id}`;
                const topics = (topicsBySubject.get(topicKey) ?? []).slice().sort((left, right) => left.order - right.order);

                return {
                    ...subject,
                    name: subject.title,
                    topics,
                };
            });

        return {
            ...semester,
            name: semester.title,
            subjects,
        };
    });

export const catalog: CatalogEntry[] = buildCatalog(curriculum);

export function getAllSubjects(): Subject[] {
    return getAllSubjectsInCurriculum(curriculum);
}

export function findSubject(semesterId: string, subjectId: string): Subject | undefined {
    return findSubjectInCurriculum(curriculum, semesterId, subjectId);
}

export function findTopic(
    semesterId: string,
    subjectId: string,
    topicId: string,
): Topic | undefined {
    return findTopicInCurriculum(curriculum, semesterId, subjectId, topicId);
}