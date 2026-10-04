<script lang="ts">
  import { onMount } from 'svelte';
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import { RotateCcw, Check, Sparkles } from 'lucide-svelte';

  interface ChecklistItem {
    id: number;
    text: string;
  }

  const checklistItems: ChecklistItem[] = [
    {
      id: 1,
      text: 'Tentukan kalian mau bikin apa',
    },
    {
      id: 2,
      text: 'Spesifikkan apa yang mau kalian buat ',
    },
    {
      id: 3,
      text: 'Ajak diskusi terkait apa yang mau kita buat ke AI: tanya pendapatnya juga, kira-kira feasible gak untuk dibuat, dan teknologinya pakai apa',
    },
    {
      id: 4,
      text: 'Tanya kalau mau dibuat pakai framework apa aja, dan kasih tahu juga kalau kita maunya bikin pakai HTML sederhana',
    },
    {
      id: 5,
      text: 'Kalau idenya udah fix, minta dokumen PRD-nya ke AI, baru kita generate kodenya. Terus kalau ada yang kurang atau error, minta benerin',
    },
    {
      id: 6,
      text: 'Buat pertanyaan kritis terkait software-nya (misal: "kalau ada 1.000 user, kira-kira aplikasi ini bisa handle gak ya?" atau "apakah aplikasi ini udah bisa di-publish dan diakses orang banyak?")',
    },
    {
      id: 7,
      text: 'Pastiin lagi jawaban dari AI dari sumber yang lain (cross-check & verifikasi)',
    },
    {
      id: 8,
      text: 'Deploy aplikasinya (misal contohnya di GitHub Pages biar bisa diakses orang banyak)',
    },
    {
      id: 9,
      text: 'Terus di-maintain',
    },
  ];

  const STORAGE_KEY = 's2if_vibe_coding_checklist_v1';

  let checkedState = $state<Record<number, boolean>>({});

  onMount(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        checkedState = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal memuat checklist dari localStorage', e);
    }
  });

  function toggle(id: number) {
    checkedState[id] = !checkedState[id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState));
    } catch (e) {
      console.warn('Gagal menyimpan checklist ke localStorage', e);
    }
  }

  function resetChecklist() {
    if (confirm('Yakin mau reset semua checklist untuk mulai proyek baru?')) {
      checkedState = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Gagal reset checklist di localStorage', e);
      }
    }
  }

  let completedCount = $derived(checklistItems.filter((item) => checkedState[item.id]).length);
  let progressPercent = $derived(Math.round((completedCount / checklistItems.length) * 100));
  let isAllDone = $derived(completedCount === checklistItems.length);
</script>

<svelte:head>
  <title>Praktek Vibe Coding (Checklist Proyek) - S2IF Notebook</title>
  <meta
    name="description"
    content="Checklist praktis alur kerja Vibe Coding dari ideation sampai maintenance."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Praktek Vibe Coding"
    date="04 Oktober 2026"
    status="done"
    tags={['Vibe Coding', 'Praktek', 'Checklist', 'Project']}
  />

  <NoteSection title="Alur Kerja & Checklist Proyek">
    <Callout type="info" title="Tantangan Proyek Mandiri">
      Ini checklist langkah saat kamu mau bikin software sendiri bareng AI. Silakan eksplorasi
      sendiri dengan caramu dan centang tiap langkah yang udah kamu lewati. Progresmu otomatis
      tersimpan di browser!
    </Callout>

    <!-- Progress Card -->
    <div class="progress-box">
      <div class="progress-info">
        <div class="progress-label">
          <Sparkles size={18} class="sparkle-icon" />
          <span
            >Progres: {completedCount} dari {checklistItems.length} langkah ({progressPercent}%)</span
          >
        </div>
        <button type="button" class="reset-btn" onclick={resetChecklist}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div class="progress-track">
        <div class="progress-fill" style="width: {progressPercent}%" class:done={isAllDone}></div>
      </div>

      {#if isAllDone}
        <div class="done-banner">
          🎉 <strong>Mantap!</strong> Semua {checklistItems.length} langkah udah selesai kamu jalankan.
        </div>
      {/if}
    </div>

    <!-- The Checklist Items -->
    <div class="checklist">
      {#each checklistItems as item (item.id)}
        {@const checked = !!checkedState[item.id]}
        <div
          class="check-row"
          class:checked
          onclick={() => toggle(item.id)}
          role="button"
          tabindex="0"
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle(item.id);
            }
          }}
        >
          <div class="checkbox" class:checked>
            {#if checked}
              <Check size={16} strokeWidth={3} />
            {/if}
          </div>

          <div class="item-content">
            <span class="item-num">{item.id}.</span>
            <span class="item-text" class:strike={checked}>{item.text}</span>
          </div>
        </div>
      {/each}
    </div>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/vibe-coding" label="Kembali ke Vibe Coding" />
</article>

<style>
  .note-article {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Progress Box */
  .progress-box {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin: 1.25rem 0 1.75rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.65rem;
  }

  .progress-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-binder);
  }

  .progress-label :global(.sparkle-icon) {
    color: #e67e22;
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: transparent;
    border: 1px solid var(--color-line);
    color: var(--color-ink-muted);
    font-size: 0.78rem;
    padding: 0.25rem 0.55rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .reset-btn:hover {
    border-color: #e74c3c;
    color: #e74c3c;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: var(--color-surface-soft);
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid var(--color-line);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: width 0.3s ease;
    border-radius: 999px;
  }

  .progress-fill.done {
    background: #27ae60;
  }

  .done-banner {
    margin-top: 0.85rem;
    padding: 0.6rem 0.85rem;
    background: rgba(39, 174, 96, 0.1);
    border: 1px solid #27ae60;
    border-radius: 6px;
    font-size: 0.88rem;
    color: #1e824c;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Checklist Rows */
  .checklist {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .check-row {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    padding: 0.9rem 1.1rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    transition: all 0.15s ease;
  }

  .check-row:hover {
    border-color: var(--color-binder);
    transform: translateX(3px);
  }

  .check-row.checked {
    background: rgba(39, 174, 96, 0.04);
    border-color: #27ae60;
  }

  .checkbox {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    border: 2px solid var(--color-binder);
    background: var(--color-surface);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.15rem;
    transition: all 0.15s ease;
  }

  .check-row:hover .checkbox {
    border-color: #27ae60;
  }

  .checkbox.checked {
    background: #27ae60;
    border-color: #27ae60;
  }

  .item-content {
    flex: 1;
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--color-ink-strong);
  }

  .item-num {
    font-weight: 700;
    color: var(--color-binder);
    margin-right: 0.35rem;
  }

  .item-text.strike {
    color: var(--color-ink-muted);
    text-decoration: line-through;
    text-decoration-color: #27ae60;
  }
</style>
