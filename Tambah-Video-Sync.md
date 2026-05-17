# Tambah Video Sync ke Materi

Dokumen ini adalah quick-start untuk menambahkan fitur **Video Sidebar + Bidirectional Sync** ke halaman catatan manapun yang memiliki sumber video YouTube.

## Apa yang Didapat?

1. **Video Sidebar** — Panel samping kanan yang bisa dibuka/ditutup, berisi pemutar YouTube inline + chapter timeline.
2. **Timestamp Badges** — Badge di dalam catatan yang jika diklik, langsung melompat ke menit video tersebut di sidebar (tanpa buka tab baru).
3. **Bidirectional Sync** — Saat video diputar, bagian catatan yang relevan otomatis di-highlight dan di-scroll.
4. **Smart Auto-Scroll** — Jika user scroll manual, auto-scroll otomatis berhenti. Muncul tombol "Ikuti Video Lagi" untuk re-sync.

## Komponen yang Digunakan

| Komponen | Lokasi | Fungsi |
|---|---|---|
| `VideoSidebar` | `$lib/components/VideoSidebar.svelte` | Panel samping video YouTube + chapter timeline |
| `VideoSyncArticle` | `$lib/components/VideoSyncArticle.svelte` | Wrapper yang menangani highlight & auto-scroll |

## Langkah-Langkah

### 1. Siapkan Data

Di `<script>` halaman `+page.svelte`, definisikan 3 data:

```ts
import VideoSidebar from "$lib/components/VideoSidebar.svelte";
import VideoSyncArticle from "$lib/components/VideoSyncArticle.svelte";
import { Play } from "lucide-svelte";

const videoBaseUrl = "https://www.youtube.com/watch?v=VIDEO_ID";

let videoSidebar: VideoSidebar;

// Chapter timeline (muncul di sidebar)
const chapters = [
    { title: 'Intro', time: '0:03', seconds: 3 },
    { title: 'Bab 1', time: '5:00', seconds: 300 },
    // ... tambah sesuai video
];

// Pemetaan section catatan ke rentang waktu video
const sectionMap = [
    { id: 'pendahuluan', startSeconds: 3, endSeconds: 299 },
    { id: 'bab-1', startSeconds: 300, endSeconds: 599 },
    // ... tambah sesuai section
];
```

### 2. Tambahkan Event Delegation

Tambahkan fungsi ini di `<script>` agar semua timestamp badge otomatis mengontrol video sidebar:

```ts
function handleTimestampClick(event: MouseEvent) {
    const badge = (event.target as HTMLElement).closest('.timestamp-badge') as HTMLAnchorElement | null;
    if (!badge) return;
    const href = badge.getAttribute('href') ?? '';
    const match = href.match(/t=(\d+)m(\d+)s/);
    if (match) {
        event.preventDefault();
        const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2]);
        videoSidebar?.seekTo(totalSeconds);
    }
}
```

### 3. Susun Template

```svelte
<article class="note-article" onclick={handleTimestampClick}>
    <NoteHeader title="..." date="..." status="done" tags={[...]} />

    <VideoSyncArticle {sectionMap}>
        <div data-section-id="pendahuluan">
            <NoteSection title="Pendahuluan">
                <!-- Timestamp badges -->
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=0m3s" class="timestamp-badge">
                        <Play size={12} /> 0:03 Intro
                    </a>
                </div>
                <!-- Isi catatan... -->
            </NoteSection>
        </div>

        <div data-section-id="bab-1">
            <NoteSection title="Bab 1">
                <!-- Isi catatan... -->
            </NoteSection>
        </div>
    </VideoSyncArticle>

    <!-- Section tanpa video sync (glosarium, kuis) TIDAK perlu di-wrap -->
    <NoteSection title="Kuis">...</NoteSection>
</article>

<VideoSidebar bind:this={videoSidebar} videoId="VIDEO_ID" {chapters} />
```

### 4. Validasi

Jalankan:

`npm run check`

## Aturan Penting

1. **`data-section-id`** harus cocok dengan `id` di `sectionMap`.
2. **Section tanpa video mapping** (Glosarium, Kuis) tidak perlu di-wrap dengan `data-section-id`.
3. **Timestamp badge** harus menggunakan format URL `t=XmYs` (contoh: `t=15m24s`).
4. **VideoSidebar** dan **NotesPanel** saling kompromi — jika satu dibuka, yang lain otomatis tutup.
5. **Tidak ada package eksternal** — YouTube IFrame API dimuat secara lazy via `<script>` tag.

## Checklist Cepat

1. Video sidebar muncul saat tombol "Video" di sisi kanan diklik.
2. Klik timestamp badge di catatan → video lompat ke menit yang benar.
3. Saat video diputar, section catatan yang aktif ter-highlight.
4. Scroll manual → auto-scroll berhenti, tombol "Ikuti Video Lagi" muncul.
5. Buka NotesPanel → Video sidebar otomatis tutup (dan sebaliknya).
6. Tidak ada error pada `npm run check`.

## Referensi Implementasi

Lihat contoh lengkap di:
- `src/routes/semester-1/kecerdasan-buatan-lanjut/unsupervised-learning-autoencoders/+page.svelte`
