<script lang="ts">
    import Sticker from "./Sticker.svelte";
    import type { Subject } from "$lib/data/curriculum";

    interface Props {
        subject: Subject;
        semesterId: string;
    }

    let { subject, semesterId }: Props = $props();

    const statusLabels: Record<string, string> = {
        done: "Selesai",
        wip: "Proses",
        todo: "Belum",
    };
</script>

<a href="/{semesterId}/{subject.id}" class="subject-card">
    <span class="icon">{subject.icon}</span>
    <span class="name">{subject.name}</span>
    {#if subject.status}
        <Sticker type={subject.status} small>
            {statusLabels[subject.status]}
        </Sticker>
    {/if}
</a>

<style>
    .subject-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.25rem;
        background: white;
        border-radius: 8px;
        text-decoration: none;
        color: var(--color-ink);
        border: 1px solid var(--color-line);
        transition: all 0.2s;
    }

    .subject-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--color-binder);
    }

    .icon {
        font-size: 2rem;
    }

    .name {
        font-weight: 500;
        text-align: center;
    }
</style>
