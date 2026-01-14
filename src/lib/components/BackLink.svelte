<script lang="ts">
    interface Props {
        href: string;
        label?: string;
    }

    let { href, label = "Kembali" }: Props = $props();
</script>

<footer class="back-link">
    <a {href}>← {label}</a>
</footer>

<style>
    .back-link {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-line);
    }

    .back-link a {
        color: var(--color-link);
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.2s;
    }

    .back-link a:hover {
        text-decoration: underline;
        opacity: 0.8;
    }
</style>
