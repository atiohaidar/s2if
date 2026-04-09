import { semesterIndexes, subjectIndexes } from '../src/lib/data/content/indexes';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

interface DiscoveredTopic {
    semesterId: string;
    subjectId: string;
    id: string;
    slug: string;
    title: string;
    summary: string;
    type: 'catatan' | 'visual' | 'praktek';
    track: 'materi' | 'bedah-soal';
    status: 'done' | 'wip' | 'todo';
    order: number;
    tags: string[];
    prereq: string[];
    renderMode: 'note' | 'interactive' | 'mixed';
    pagePath: string;
    manifestPath: string;
}

type ValidationError = string;

export function hasDuplicates(values: string[]): string[] {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const value of values) {
        if (seen.has(value)) {
            duplicates.add(value);
            continue;
        }
        seen.add(value);
    }

    return [...duplicates];
}

export function findCycle(edges: Map<string, string[]>): string[] | null {
    const visiting = new Set<string>();
    const visited = new Set<string>();
    const stack: string[] = [];

    function dfs(node: string): string[] | null {
        if (visiting.has(node)) {
            const cycleStart = stack.indexOf(node);
            return [...stack.slice(cycleStart), node];
        }
        if (visited.has(node)) {
            return null;
        }

        visiting.add(node);
        stack.push(node);

        const nextNodes = edges.get(node) ?? [];
        for (const next of nextNodes) {
            const cycle = dfs(next);
            if (cycle) {
                return cycle;
            }
        }

        stack.pop();
        visiting.delete(node);
        visited.add(node);
        return null;
    }

    for (const node of edges.keys()) {
        const cycle = dfs(node);
        if (cycle) {
            return cycle;
        }
    }

    return null;
}

async function discoverTopicManifests(): Promise<DiscoveredTopic[]> {
    const routesDir = path.resolve(process.cwd(), 'src', 'routes');
    const semesters = (await readdir(routesDir, { withFileTypes: true }))
        .filter((entry) => entry.isDirectory() && entry.name.startsWith('semester-'))
        .map((entry) => entry.name);

    const discovered: DiscoveredTopic[] = [];

    for (const semesterId of semesters) {
        const semesterDir = path.join(routesDir, semesterId);
        const subjects = (await readdir(semesterDir, { withFileTypes: true }))
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name);

        for (const subjectId of subjects) {
            const subjectDir = path.join(semesterDir, subjectId);
            const topics = (await readdir(subjectDir, { withFileTypes: true }))
                .filter((entry) => entry.isDirectory())
                .map((entry) => entry.name);

            for (const topicFolder of topics) {
                const manifestPath = path.join(subjectDir, topicFolder, 'topic.manifest.ts');
                const pagePath = path.join(subjectDir, topicFolder, '+page.svelte');
                try {
                    let hasManifest = true;
                    let hasPage = true;

                    try {
                        await access(manifestPath);
                    } catch {
                        hasManifest = false;
                    }

                    try {
                        await access(pagePath);
                    } catch {
                        hasPage = false;
                    }

                    if (!hasManifest && !hasPage) {
                        continue;
                    }

                    if (hasPage && !hasManifest) {
                        throw new Error(
                            `Missing topic.manifest.ts for topic folder '${topicFolder}' in ${subjectDir}.`,
                        );
                    }

                    if (hasManifest && !hasPage) {
                        throw new Error(
                            `Missing +page.svelte for topic folder '${topicFolder}' in ${subjectDir}.`,
                        );
                    }

                    const module = await import(pathToFileURL(manifestPath).href);
                    const manifest = module.default as Omit<DiscoveredTopic, 'semesterId' | 'subjectId' | 'pagePath' | 'manifestPath'>;

                    if (!manifest || typeof manifest !== 'object') {
                        throw new Error('Manifest default export is invalid.');
                    }

                    if (manifest.id !== topicFolder || manifest.slug !== topicFolder) {
                        throw new Error(
                            `Manifest id/slug must match folder '${topicFolder}', got id='${manifest.id}' slug='${manifest.slug}'.`,
                        );
                    }

                    discovered.push({
                        ...manifest,
                        semesterId,
                        subjectId,
                        pagePath,
                        manifestPath,
                    });
                } catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    throw new Error(`Invalid manifest at ${manifestPath}: ${message}`);
                }
            }
        }
    }

    return discovered;
}

export async function validate(): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const topics = await discoverTopicManifests();

    const semesterIdDuplicates = hasDuplicates(semesterIndexes.map((semester) => semester.id));
    if (semesterIdDuplicates.length > 0) {
        errors.push(`Duplicate semester id: ${semesterIdDuplicates.join(', ')}`);
    }

    const semesterOrderDuplicates = hasDuplicates(semesterIndexes.map((semester) => String(semester.order)));
    if (semesterOrderDuplicates.length > 0) {
        errors.push(`Duplicate semester order: ${semesterOrderDuplicates.join(', ')}`);
    }

    const subjectKeyDuplicates = hasDuplicates(
        subjectIndexes.map((subject) => `${subject.semesterId}/${subject.id}`),
    );
    if (subjectKeyDuplicates.length > 0) {
        errors.push(`Duplicate subject key (semesterId/subjectId): ${subjectKeyDuplicates.join(', ')}`);
    }

    const knownSubjectKeys = new Set(subjectIndexes.map((subject) => `${subject.semesterId}/${subject.id}`));
    const topicGroups = new Map<string, typeof topics>();

    for (const topic of topics) {
        const groupKey = `${topic.semesterId}/${topic.subjectId}`;
        const existing = topicGroups.get(groupKey) ?? [];
        existing.push(topic);
        topicGroups.set(groupKey, existing);

        if (!knownSubjectKeys.has(groupKey)) {
            errors.push(
                `Topic '${topic.slug}' points to unknown subject '${groupKey}'. Add it to subject indexes.`,
            );
        }
    }

    for (const [groupKey, groupTopics] of topicGroups) {
        const duplicateIds = hasDuplicates(groupTopics.map((topic) => topic.id));
        if (duplicateIds.length > 0) {
            errors.push(`Duplicate topic id in ${groupKey}: ${duplicateIds.join(', ')}`);
        }

        const duplicateOrders = hasDuplicates(groupTopics.map((topic) => String(topic.order)));
        if (duplicateOrders.length > 0) {
            errors.push(`Duplicate topic order in ${groupKey}: ${duplicateOrders.join(', ')}`);
        }

        const topicIds = new Set(groupTopics.map((topic) => topic.id));
        for (const topic of groupTopics) {
            for (const prereq of topic.prereq) {
                if (!topicIds.has(prereq)) {
                    errors.push(
                        `Invalid prereq in ${groupKey}/${topic.id}: '${prereq}' not found in same subject.`,
                    );
                }
            }
        }

        const edges = new Map<string, string[]>();
        for (const topic of groupTopics) {
            edges.set(topic.id, [...topic.prereq]);
        }
        const cycle = findCycle(edges);
        if (cycle) {
            errors.push(`Prerequisite cycle in ${groupKey}: ${cycle.join(' -> ')}`);
        }
    }

    for (const topic of topics) {
        const pageSource = await readFile(topic.pagePath, 'utf-8');
        const noteHeaderTitleMatch = pageSource.match(/<NoteHeader[\s\S]*?title="([^"]+)"/);

        if (!noteHeaderTitleMatch) {
            errors.push(
                `Missing NoteHeader title in page ${topic.pagePath}.`,
            );
            continue;
        }

        const pageTitle = noteHeaderTitleMatch[1].trim();
        const manifestTitle = topic.title.trim();
        if (pageTitle !== manifestTitle) {
            errors.push(
                `Title mismatch at ${topic.manifestPath}. manifest='${manifestTitle}' page='${pageTitle}'.`,
            );
        }
    }

    return errors;
}

const isDirectRun =
    process.argv[1] !== undefined &&
    pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
    const errors = await validate();

    if (errors.length > 0) {
        console.error('Content validation failed with the following issues:');
        for (const issue of errors) {
            console.error(`- ${issue}`);
        }
        process.exit(1);
    }

    console.log('Content validation passed.');
}