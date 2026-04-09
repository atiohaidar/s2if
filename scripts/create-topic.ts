import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

type TopicType = 'catatan' | 'visual' | 'praktek';
type TopicTrack = 'materi' | 'bedah-soal';
type TopicStatus = 'done' | 'wip' | 'todo';
type RenderMode = 'note' | 'interactive' | 'mixed';

interface Args {
    semester: string;
    subject: string;
    slug: string;
    title: string;
    summary: string;
    type: TopicType;
    track: TopicTrack;
    status: TopicStatus;
    order: number;
    renderMode: RenderMode;
}

export function parseArg(flag: string): string | undefined {
    const entry = process.argv.find((arg) => arg.startsWith(`${flag}=`));
    return entry?.slice(flag.length + 1);
}

export function required(name: string, value: string | undefined): string {
    if (!value || value.trim().length === 0) {
        throw new Error(`Missing required argument: ${name}`);
    }
    return value.trim();
}

export function asNumber(name: string, value: string | undefined): number {
    const parsed = Number(required(name, value));
    if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`Invalid numeric argument for ${name}: ${value}`);
    }
    return parsed;
}

export function templatePage(title: string, semester: string, subject: string): string {
    return `<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
</script>

<svelte:head>
    <title>${title} - S2IF Notebook</title>
    <meta name="description" content="Deskripsi singkat materi ini." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="${title}"
        date="09 April 2026"
        status="todo"
    />

    <NoteSection title="Ringkasan Materi">
        <p>Tulis konten materi di sini.</p>
    </NoteSection>

    <BackLink href="/${semester}/${subject}" label="Kembali" />
</article>
`;
}

export function templateManifest(args: Args): string {
    return `import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: '${args.slug}',
    slug: '${args.slug}',
    title: '${args.title.replace(/'/g, "\\'")}',
    summary: '${args.summary.replace(/'/g, "\\'")}',
    type: '${args.type}',
    track: '${args.track}',
    status: '${args.status}',
    order: ${args.order},
    tags: [],
    prereq: [],
    renderMode: '${args.renderMode}',
};

export default manifest;
`;
}

export async function main(): Promise<void> {
    const args: Args = {
        semester: required('--semester', parseArg('--semester')),
        subject: required('--subject', parseArg('--subject')),
        slug: required('--slug', parseArg('--slug')),
        title: required('--title', parseArg('--title')),
        summary: required('--summary', parseArg('--summary')),
        type: (parseArg('--type') as TopicType | undefined) ?? 'catatan',
        track: (parseArg('--track') as TopicTrack | undefined) ?? 'materi',
        status: (parseArg('--status') as TopicStatus | undefined) ?? 'todo',
        order: asNumber('--order', parseArg('--order')),
        renderMode: (parseArg('--renderMode') as RenderMode | undefined) ?? 'note',
    };

    const topicDir = path.resolve(
        process.cwd(),
        'src',
        'routes',
        args.semester,
        args.subject,
        args.slug,
    );

    await mkdir(topicDir, { recursive: true });

    const pagePath = path.join(topicDir, '+page.svelte');
    const manifestPath = path.join(topicDir, 'topic.manifest.ts');

    await writeFile(pagePath, templatePage(args.title, args.semester, args.subject), {
        encoding: 'utf-8',
        flag: 'wx',
    });

    await writeFile(manifestPath, templateManifest(args), {
        encoding: 'utf-8',
        flag: 'wx',
    });

    const npmBinary = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const syncResult = spawnSync(npmBinary, ['run', 'sync:indexes'], {
        cwd: process.cwd(),
        stdio: 'inherit',
    });
    if (syncResult.status !== 0) {
        throw new Error('Topic created, but failed to sync indexes. Please run: npm run sync:indexes');
    }

    console.log('Topic scaffold created successfully.');
    console.log(`- ${pagePath}`);
    console.log(`- ${manifestPath}`);
}

const isDirectRun =
    process.argv[1] !== undefined &&
    pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
    main().catch((error) => {
        console.error(`Failed to create topic scaffold: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    });
}