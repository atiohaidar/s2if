/**
 * Curriculum Data Structure
 * =========================
 * This file defines the structure of your S2 Informatics curriculum.
 * 
 * HOW TO ADD NEW CONTENT:
 * 1. Add a new semester by adding an object to the `curriculum` array
 * 2. Add subjects to a semester by adding to the `subjects` array
 * 3. For each subject, you can set a status: 'done' | 'wip' | 'todo'
 * 
 * The sidebar will automatically update based on this data.
 */

export interface Topic {
    id: string;
    name: string;
    type: 'catatan' | 'visual' | 'praktek';
    status?: 'done' | 'wip' | 'todo';
}

export interface Subject {
    id: string;
    name: string;
    icon: string;
    status?: 'done' | 'wip' | 'todo';
    topics?: Topic[];
}

export interface Semester {
    id: string;
    name: string;
    subjects: Subject[];
}

/**
 * CURRICULUM DATA
 * Edit this to add your semesters, subjects, and topics
 */
export const curriculum: Semester[] = [
    {
        id: 'semester-1',
        name: 'Semester 1',
        subjects: [
            {
                id: 'algoritma-lanjut',
                name: 'Algoritma Lanjut',
                icon: '🧮',
                status: 'wip',
                topics: [
                    { id: 'intro', name: 'Pengantar', type: 'catatan', status: 'done' },
                    { id: 'graph-theory', name: 'Teori Graf', type: 'visual', status: 'wip' },
                    { id: 'dynamic-programming', name: 'Dynamic Programming', type: 'praktek' },
                ]
            },
            {
                id: 'machine-learning',
                name: 'Machine Learning',
                icon: '🤖',
                status: 'todo',
                topics: [
                    { id: 'intro', name: 'Pengantar ML', type: 'catatan' },
                    { id: 'regression', name: 'Regresi Linear', type: 'visual' },
                ]
            },
            {
                id: 'sistem-terdistribusi',
                name: 'Sistem Terdistribusi',
                icon: '🌐',
                status: 'todo'
            }
        ]
    },
    {
        id: 'semester-2',
        name: 'Semester 2',
        subjects: [
            {
                id: 'data-mining',
                name: 'Data Mining',
                icon: '⛏️',
                status: 'todo'
            },
            {
                id: 'keamanan-informasi',
                name: 'Keamanan Informasi',
                icon: '🔐',
                status: 'todo'
            }
        ]
    },
    // Add more semesters as needed...
];

/**
 * Helper function to get all subjects across all semesters
 */
export function getAllSubjects(): Subject[] {
    return curriculum.flatMap(sem => sem.subjects);
}

/**
 * Helper function to find a subject by ID
 */
export function findSubject(semesterId: string, subjectId: string): Subject | undefined {
    const semester = curriculum.find(s => s.id === semesterId);
    return semester?.subjects.find(sub => sub.id === subjectId);
}

/**
 * Helper function to find a topic
 */
export function findTopic(semesterId: string, subjectId: string, topicId: string): Topic | undefined {
    const subject = findSubject(semesterId, subjectId);
    return subject?.topics?.find(t => t.id === topicId);
}
