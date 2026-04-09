<script lang="ts">
    import {
        BookOpen,
        BookOpenText,
        BrainCircuit,
        CalendarDays,
        ChartColumn,
        Check,
        Code2,
        Copy,
        Calculator,
        FileText,
        Globe,
        Home,
        Info,
        Lightbulb,
        NotebookPen,
        PenLine,
        Pickaxe,
        Save,
        Shield,
        ShieldAlert,
        Trash2,
        TriangleAlert,
        X,
    } from "lucide-svelte";

    interface Props {
        name: string;
        size?: number;
    }

    let { name, size = 20 }: Props = $props();
</script>

{#if name === "home"}
    <Home size={size} strokeWidth={2} />
{:else if name === "notebook"}
    <NotebookPen size={size} strokeWidth={2} />
{:else if name === "semester"}
    <BookOpen size={size} strokeWidth={2} />
{:else if name === "topic-catatan"}
    <FileText size={size} strokeWidth={2} />
{:else if name === "topic-visual"}
    <ChartColumn size={size} strokeWidth={2} />
{:else if name === "topic-praktek"}
    <Code2 size={size} strokeWidth={2} />
{:else if name === "subject-algoritma"}
    <Calculator size={size} strokeWidth={2} />
{:else if name === "subject-machine-learning"}
    <BrainCircuit size={size} strokeWidth={2} />
{:else if name === "subject-sistem-terdistribusi"}
    <Globe size={size} strokeWidth={2} />
{:else if name === "subject-data-mining"}
    <Pickaxe size={size} strokeWidth={2} />
{:else if name === "subject-keamanan-informasi"}
    <Shield size={size} strokeWidth={2} />
{:else if name === "callout-tip"}
    <Lightbulb size={size} strokeWidth={2} />
{:else if name === "callout-warning"}
    <TriangleAlert size={size} strokeWidth={2} />
{:else if name === "callout-info"}
    <Info size={size} strokeWidth={2} />
{:else if name === "callout-danger"}
    <ShieldAlert size={size} strokeWidth={2} />
{:else if name === "copy"}
    <Copy size={size} strokeWidth={2} />
{:else if name === "check"}
    <Check size={size} strokeWidth={2} />
{:else if name === "close"}
    <X size={size} strokeWidth={2} />
{:else if name === "save"}
    <Save size={size} strokeWidth={2} />
{:else if name === "trash"}
    <Trash2 size={size} strokeWidth={2} />
{:else if name === "page"}
    <BookOpenText size={size} strokeWidth={2} />
{:else if name === "note"}
    <PenLine size={size} strokeWidth={2} />
{:else if name === "edit"}
    <PenLine size={size} strokeWidth={2} />
{:else if name === "overview"}
    <CalendarDays size={size} strokeWidth={2} />
{:else if name === "topics"}
    <BookOpenText size={size} strokeWidth={2} />
{/if}

<style>
    :global(svg) {
        display: block;
    }
</style>