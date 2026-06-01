<script lang="ts">
  import { page } from "$app/state";
  import NotesPanel from "$lib/components/NotesPanel.svelte";
  import { onMount } from "svelte";

  // Get the target pathname from the query string
  let targetPathname = $derived(page.url.searchParams.get("pathname") || "/");

  onMount(() => {
    // Set descriptive title for the popout window
    const baseName = targetPathname.split("/").pop() || "Beranda";
    const formattedTitle = baseName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    document.title = `Catatan: ${formattedTitle}`;
  });
</script>

<div class="popout-notes-container">
  <NotesPanel isOpen={true} overridePathname={targetPathname} />
</div>

<style>
  .popout-notes-container {
    width: 100vw;
    height: 100vh;
    background: var(--color-surface, #fffdf7);
    overflow: hidden;
  }
</style>
