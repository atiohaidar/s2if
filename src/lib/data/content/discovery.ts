import type { TopicManifest } from './types';

export interface DiscoveredTopic extends TopicManifest {
    semesterId: string;
    subjectId: string;
}

interface TopicManifestModule {
    default: TopicManifest;
}

const topicManifestModules = import.meta.glob(
    '../../../routes/semester-*/*/*/topic.manifest.ts',
    { eager: true },
) as Record<string, TopicManifestModule>;

const TOPIC_MANIFEST_PATH_REGEX =
    /\/routes\/([^/]+)\/([^/]+)\/([^/]+)\/topic\.manifest\.ts$/;

function assertManifestPath(path: string): {
    semesterId: string;
    subjectId: string;
    topicFolder: string;
} {
    const normalizedPath = path.replace(/\\/g, '/');
    const match = normalizedPath.match(TOPIC_MANIFEST_PATH_REGEX);

    if (!match) {
        throw new Error(
            `Invalid topic manifest path: ${normalizedPath}. Expected src/routes/{semester}/{subject}/{topic}/topic.manifest.ts`,
        );
    }

    return {
        semesterId: match[1],
        subjectId: match[2],
        topicFolder: match[3],
    };
}

export function discoverTopicManifests(): DiscoveredTopic[] {
    const discovered: DiscoveredTopic[] = [];

    for (const [path, module] of Object.entries(topicManifestModules)) {
        const { semesterId, subjectId, topicFolder } = assertManifestPath(path);
        const manifest = module.default;

        if (manifest.slug !== topicFolder || manifest.id !== topicFolder) {
            throw new Error(
                `Manifest slug/id mismatch for ${path}. Both id and slug must equal route folder '${topicFolder}'.`,
            );
        }

        discovered.push({
            ...manifest,
            semesterId,
            subjectId,
        });
    }

    return discovered;
}