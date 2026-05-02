<script lang="ts">
    import {
        ArrowLeft,
        ArrowRight,
        BookOpen,
        BookOpenText,
        Bot,
        Brain,
        BrainCircuit,
        Car,
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
        Maximize2,
        Minimize2,
        Moon,
        NotebookPen,
        PenLine,
        Pickaxe,
        Save,
        Scale,
        Shield,
        ShieldAlert,
        Sparkles,
        SunMedium,
        Trash2,
        TriangleAlert,
        User,
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
{:else if name === "topic-soal"}
    <NotebookPen size={size} strokeWidth={2} />
{:else if name === "subject-algoritma"}
    <Calculator size={size} strokeWidth={2} />
{:else if name === "subject-machine-learning"}
    <BrainCircuit size={size} strokeWidth={2} />
{:else if name === "subject-ai-lanjut"}
    <BrainCircuit size={size} strokeWidth={2} />
{:else if name === "subject-optimasi"}
    <ChartColumn size={size} strokeWidth={2} />
{:else if name === "subject-tren-perangkat-lunak"}
    <Globe size={size} strokeWidth={2} />
{:else if name === "subject-bahasa-inggris"}
    <BookOpenText size={size} strokeWidth={2} />
{:else if name === "subject-toefl-preparation"}
    <NotebookPen size={size} strokeWidth={2} />
{:else if name === "subject-permobilan"}
    <Car size={size} strokeWidth={2} />
{:else if name === "subject-sistem-terdistribusi"}
    <Globe size={size} strokeWidth={2} />
{:else if name === "subject-data-mining"}
    <Pickaxe size={size} strokeWidth={2} />
{:else if name === "subject-keamanan-informasi"}
    <Shield size={size} strokeWidth={2} />
{:else if name === "subject-vibe-coding"}
    <Sparkles size={size} strokeWidth={2} />
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
{:else if name === "maximize"}
    <Maximize2 size={size} strokeWidth={2} />
{:else if name === "minimize"}
    <Minimize2 size={size} strokeWidth={2} />
{:else if name === "theme-light"}
    <SunMedium size={size} strokeWidth={2} />
{:else if name === "theme-dark"}
    <Moon size={size} strokeWidth={2} />
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
{:else if name === "arrow-left"}
    <ArrowLeft size={size} strokeWidth={2} />
{:else if name === "arrow-right"}
    <ArrowRight size={size} strokeWidth={2} />
{:else if name === "ai-brain"}
    <Brain size={size} strokeWidth={2} />
{:else if name === "ai-scale"}
    <Scale size={size} strokeWidth={2} />
{:else if name === "ai-user"}
    <User size={size} strokeWidth={2} />
{:else if name === "ai-bot"}
    <Bot size={size} strokeWidth={2} />
{/if}

<style>
    :global(svg) {
        display: block;
    }
</style>