<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import VideoSidebar from '$lib/components/VideoSidebar.svelte';
  import VideoSyncArticle from '$lib/components/VideoSyncArticle.svelte';
  import { Play } from 'lucide-svelte';

  const videoBaseUrl = 'https://www.youtube.com/watch?v=KK_9XxYpeTo';

  let videoSidebar: VideoSidebar;

  const chapters = [
    { title: 'Intro', time: '0:03', seconds: 3 },
    { title: 'Eksperimen Jawaban Kembar', time: '1:29', seconds: 89 },
    { title: 'Karakter & Brand Media', time: '3:08', seconds: 188 },
    { title: 'Riset MIT: Penurunan Kognitif', time: '4:33', seconds: 273 },
    { title: 'Cognitive Debt', time: '6:35', seconds: 395 },
    { title: 'Positive Bias pada AI', time: '8:24', seconds: 504 },
    { title: 'Tulisan Tanpa Analisis', time: '9:17', seconds: 557 },
    { title: 'Perspektif yang Homogen', time: '10:00', seconds: 600 },
    { title: 'Keindahan Narasi Otentik', time: '10:47', seconds: 647 },
    { title: 'Bahaya Model Collapse', time: '13:19', seconds: 799 },
    { title: 'Logika Template AI', time: '14:53', seconds: 893 },
    { title: 'The Great Flattening', time: '15:37', seconds: 937 },
    { title: 'Crisis of Authenticity', time: '18:46', seconds: 1126 },
    { title: 'Solusi: Dialektika Aktif', time: '18:49', seconds: 1129 },
    { title: 'Mencapai Wisdom & Personality', time: '20:07', seconds: 1207 },
  ];

  const sectionMap = [
    { id: 'pendahuluan-eksperimen', startSeconds: 3, endSeconds: 187 },
    { id: 'identitas-brand-media', startSeconds: 188, endSeconds: 272 },
    { id: 'riset-mit-cognitive-debt', startSeconds: 273, endSeconds: 503 },
    { id: 'keterbatasan-ai-bias', startSeconds: 504, endSeconds: 646 },
    { id: 'narasi-lokal-otentik', startSeconds: 647, endSeconds: 798 },
    { id: 'model-collapse-flattening', startSeconds: 799, endSeconds: 1125 },
    { id: 'dialektika-aktif-wisdom', startSeconds: 1126, endSeconds: 1250 },
  ];

  function handleTimestampClick(event: MouseEvent) {
    const badge = (event.target as HTMLElement).closest(
      '.timestamp-badge',
    ) as HTMLAnchorElement | null;
    if (!badge) return;
    const href = badge.getAttribute('href') ?? '';
    const match = href.match(/t=(\d+)m(\d+)s/);
    if (match) {
      event.preventDefault();
      const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2]);
      videoSidebar?.seekTo(totalSeconds);
    }
  }
</script>

<svelte:head>
  <title>Tulisan AI Terasa Hambar: Pentingnya Purpose dalam Narasi - S2IF Notebook</title>
  <meta
    name="description"
    content="Pembahasan mendalam tentang otentisitas, penurunan kognitif akibat AI, model collapse, dan pentingnya dialektika aktif dalam penulisan di era generative AI."
  />
</svelte:head>

<article class="note-article" onclick={handleTimestampClick}>
  <NoteHeader
    title="Tulisan AI Terasa Hambar: Pentingnya Purpose dalam Narasi"
    date="25 Mei 2026"
    status="wip"
    tags={['AI', 'Menulis', 'Otentisitas', 'Kognisi']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini dirangkum berdasarkan pemaparan menarik oleh <strong>Janoe Arijanto</strong> pada
    acara
    <em
      >GoodTalk (Eps. 175): "Tulisan AI Terasa Hambar, Janoe Arijanto Ungkap Pentingnya Purpose
      dalam Narasi"</em
    >. Video lengkap dapat disimak di
    <a href="https://youtu.be/KK_9XxYpeTo" target="_blank" rel="noopener noreferrer">YouTube GNFI</a
    >.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <div data-section-id="pendahuluan-eksperimen">
      <NoteSection title="1. Pendahuluan & Eksperimen Jawaban Kembar">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m3s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 0:03 Intro
          </a>
          <a
            href="{videoBaseUrl}&t=1m29s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 1:29 Eksperimen Kelas
          </a>
        </div>
        <p>
          Kita telah hidup berdampingan dengan Generative AI seperti ChatGPT, Gemini, dan model AI
          lainnya selama kurang lebih empat tahun. Hal ini melahirkan disrupsi yang luar biasa di
          berbagai lini pekerjaan, terutama di bidang penulisan kreatif dan pembuatan konten. Janoe
          Arijanto menegaskan bahwa kita <strong>tidak perlu anti-AI</strong>, melainkan harus
          menyikapi dan mengintegrasikannya dengan bijak.
        </p>
        <p>
          Satu studi eksperimen pribadi menarik dilakukan oleh Janoe kepada <strong
            >125 mahasiswa</strong
          >
          dari berbagai universitas dalam mata kuliah statistika digital (<em
            >digital measurement</em
          >). Ia memberikan soal UTS tingkat lanjut (<em>advance</em>) mengenai perbandingan
          analitik antarsistem yang sebelumnya
          <strong>tidak pernah ia ajarkan sama sekali di kelas</strong>.
        </p>
        <p>
          Hasilnya mengejutkan sekaligus menggelisahkan: <strong
            >hampir seluruh mahasiswa berhasil menjawab soal tersebut, namun lebih dari 80%
            jawabannya seragam alias kembar!</strong
          > Hal ini mengindikasikan bahwa para mahasiswa mencari jawaban secara instan menggunakan AI,
          namun kehilangan sentuhan otentisitas dan jati diri mereka dalam proses pengerjaannya.
        </p>
      </NoteSection>
    </div>

    <div data-section-id="identitas-brand-media">
      <NoteSection title="2. Otentisitas dan Identitas Brand Media">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=3m8s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 3:08 Brand & Karakter Media
          </a>
        </div>
        <p>
          Dalam industri media massa dan penulisan profesional, hilangnya otentisitas adalah ancaman
          eksistensial. Di era digital saat ini, media bukan lagi sekadar penyalur informasi,
          melainkan sebuah <strong>Brand</strong> yang dinilai berdasarkan karakter uniknya.
        </p>
        <p>Janoe mencontohkan beberapa karakter khas media besar di Indonesia:</p>
        <ul>
          <li>
            <strong>Tempo:</strong> Memiliki gaya bercerita (storytelling) yang sangat dipengaruhi oleh
            gaya tulisan khas Goenawan Mohamad yang sastrawi dan mengalir.
          </li>
          <li>
            <strong>Kompas:</strong> Lebih analitis, berdasar pada data kuat, mendalam, dan terstruktur.
          </li>
          <li>
            <strong>The Conversation:</strong> Berada di perbatasan antara tulisan akademis (setengah
            jurnal) yang dikemas secara populer.
          </li>
        </ul>
        <p>
          Jika media massa mulai membiarkan karakter unik tulisan mereka diseragamkan oleh gaya
          penulisan AI yang generik, maka identitas brand mereka akan lenyap perlahan, membuat
          mereka kehilangan pembaca setia.
        </p>
      </NoteSection>
    </div>

    <div data-section-id="riset-mit-cognitive-debt">
      <NoteSection title="3. Riset MIT: Penurunan Kognitif & Cognitive Debt">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=4m33s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 4:33 Riset MIT
          </a>
          <a
            href="{videoBaseUrl}&t=6m35s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 6:35 Cognitive Debt
          </a>
        </div>
        <p>
          Sebuah riset dari <strong>MIT</strong> (Massachusetts Institute of Technology) menunjukkan fakta
          yang sangat serius bagi kelangsungan kognisi manusia. Riset tersebut meneliti tiga kelompok
          mahasiswa: kelompok yang menggunakan AI, kelompok yang hanya menggunakan mesin pencari (search
          engine), dan kelompok yang tidak menggunakan keduanya.
        </p>
        <p>
          Ditemukan bahwa <strong>83% lebih</strong> mahasiswa yang diteliti
          <strong>sulit mengingat kembali kalimat bahkan pemikiran</strong> yang telah mereka tulis sendiri
          untuk sebuah tugas akademik. Di saat yang sama, pemindaian sensor otak menunjukkan bahwa:
        </p>
        <Callout type="danger" title="Penurunan Aktivitas Otak">
          Kelompok pengguna AI (ChatGPT/Gemini) menunjukkan <strong>aktivitas otak terendah</strong
          >. Proses kognitif untuk menganalisis, menyusun kalimat, dan menyaring informasi seolah
          "diwakilkan" sepenuhnya ke model LLM (Large Language Model) sehingga otak berada dalam
          kondisi nganggur (idle). Penurunan keterlibatan kognitif aktif tercatat mencapai
          <strong>hingga 50% lebih</strong>.
        </Callout>
        <p>
          Kondisi ini memicu fenomena yang disebut <strong
            >Cognitive Debt (Hutang Kognitif/Berpikir)</strong
          >. Ketika kita terus-menerus mendelegasikan tugas berpikir kita kepada mesin, kita
          berhutang pada pikiran kita sendiri. Hutang ini diwujudkan dalam bentuk penurunan daya
          ingat, melemahnya kemampuan analisis kritis, dan hilangnya rasa kepemilikan (<em
            >sense of belonging</em
          >) terhadap apa yang kita ciptakan.
        </p>
      </NoteSection>
    </div>

    <div data-section-id="keterbatasan-ai-bias">
      <NoteSection title="4. Keterbatasan AI: Positive Bias & Homogenisasi">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m24s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 8:24 Positive Bias pada AI
          </a>
          <a
            href="{videoBaseUrl}&t=9m17s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 9:17 Tulisan Tanpa Analisis
          </a>
          <a
            href="{videoBaseUrl}&t=10m0s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 10:00 Perspektif yang Homogen
          </a>
        </div>
        <p>
          Secara teknikal, model LLM dirancang untuk menghindari kontroversi, konten sensitif, atau
          narasi yang multitafsir demi keselamatan konten (alignment). Hal ini melahirkan fenomena <strong
            >Positive Bias</strong
          >.
        </p>
        <p>
          AI diprogram untuk selalu bersikap seperti "anak pramuka yang baik" — memberikan solusi
          yang secara moral aman, netral, berimbang, dan berlandaskan etika normatif. Akibatnya,
          tulisan yang dihasilkan AI cenderung:
        </p>
        <ul>
          <li>
            Tidak memiliki loncatan pemikiran atau sudut pandang radikal/inovatif yang berani.
          </li>
          <li>
            Sangat rapi, terstruktur, dan tata bahasanya baik secara permukaan, namun <strong
              >tidak memiliki kedalaman analisis</strong
            > yang berarti.
          </li>
          <li>
            Homogen dan seragam karena AI melakukan <em>crawling</em> dari konten paling populer di internet
            dengan indeks SEO yang tinggi, mengabaikan perspektif minoritas atau jurnal-jurnal ilmiah
            berbayar.
          </li>
        </ul>
      </NoteSection>
    </div>

    <div data-section-id="narasi-lokal-otentik">
      <NoteSection title="5. Pentingnya Vibe & Keindahan Narasi Lokal yang Otentik">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=10m47s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 10:47 Keindahan Narasi Otentik
          </a>
        </div>
        <p>
          Ada nilai-nilai dalam tulisan manusia yang tidak akan pernah bisa direplikasi secara
          otentik oleh kecerdasan buatan. Hal itu mencakup emosi personal yang mendalam, diksi-diksi
          pilihan yang sangat personal, serta pemahaman atas konteks lokal.
        </p>

        <p>
          Detail dan nuansa lokalitas yang kaya seperti ini tidak akan muncul di ChatGPT, karena AI
          hanya menangkap permukaan abstrak dari data yang paling populer. Tanpa kehati-hatian,
          keunikan cara berpikir manusia ini terancam terkubur di bawah tumpukan teks homogen AI.
        </p>
      </NoteSection>
    </div>

    <div data-section-id="model-collapse-flattening">
      <NoteSection title="6. Ancaman Model Collapse & The Great Flattening">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=13m19s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 13:19 Bahaya Model Collapse
          </a>
          <a
            href="{videoBaseUrl}&t=14m53s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 14:53 Logika Template AI
          </a>
          <a
            href="{videoBaseUrl}&t=15m37s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 15:37 The Great Flattening
          </a>
        </div>
        <p>
          Di tingkat arsitektural AI, terdapat ancaman yang disebut <strong>Model Collapse</strong>.
          Ketika internet dibanjiri oleh konten-konten hasil buatan AI, maka iterasi model AI
          berikutnya akan melatih diri mereka dengan menggunakan data buatan AI sebelumnya.
        </p>
        <p>
          Ini menciptakan siklus umpan balik yang merusak (feedback loop): mesin meniru mesin, yang
          berakibat pada penurunan kualitas data latih secara eksponensial. Informasi otentik dari
          manusia perlahan-lahan hilang dan tergantikan oleh halusinasi kolektif serta keseragaman
          mutlak.
        </p>
        <div
          class="visual-concept-card"
          style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0;"
        >
          <h4
            style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem; text-align: center;"
          >
            Siklus Model Collapse
          </h4>
          <div
            style="display: flex; justify-content: space-between; align-items: center; text-align: center; gap: 0.5rem; margin-top: 1rem;"
          >
            <div
              style="flex: 1; padding: 0.5rem; background: var(--color-status-success-soft); border: 1px solid var(--color-status-done-start); border-radius: 4px;"
            >
              <strong>Konten Manusia</strong><br /><small>Otentik & Kaya Lokasi</small>
            </div>
            <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
            <div
              style="flex: 1; padding: 0.5rem; background: var(--color-status-info-soft); border: 1px solid var(--color-callout-info-border); border-radius: 4px;"
            >
              <strong>AI Generasi 1</strong><br /><small>Meniru Manusia</small>
            </div>
            <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
            <div
              style="flex: 1.2; padding: 0.5rem; background: var(--color-status-warning-soft); border: 2px solid var(--color-status-warning-border); border-radius: 4px;"
            >
              <strong>AI Generasi 2 & Seterusnya</strong><br /><small
                >Meniru Hasil AI (Kualitas Drop)</small
              >
            </div>
          </div>
        </div>
        <p>
          Dampaknya di dunia nyata adalah <strong>The Great Flattening</strong> — sebuah zaman di mana
          seluruh tulisan terasa datar, dingin, homogen, tanpa dinamika logika, tanpa dialektika, dan
          tanpa rasa ingin tahu yang tulus. Logika tulisan menjadi sangat kaku mengikuti template standar
          (Pengantar - Isi - Kesimpulan bermoral normatif).
        </p>
      </NoteSection>
    </div>

    <div data-section-id="dialektika-aktif-wisdom">
      <NoteSection title="7. Solusi: Dialektika Aktif & Wisdom Penggunaan AI">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=18m49s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 18:49 Solusi Dialektika
          </a>
          <a
            href="{videoBaseUrl}&t=20m7s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
          >
            <Play size={12} /> 20:07 Wisdom & Personality
          </a>
        </div>
        <p>
          Bagaimanakah jalan keluarnya? Riset MIT yang sama menemukan satu anomali positif yang luar
          biasa:
        </p>
        <Callout type="tip" title="Temuan Positif: Dialektika Otak">
          Peserta studi yang <strong>pertama kali menyusun konsep berpikir sendiri</strong> secara
          mandiri (tanpa AI & search engine), lalu di akhir sesi menggunakan AI untuk memperkaya
          materi mereka, justru menunjukkan
          <strong>lonjakan aktivitas kognitif otak yang luar biasa tinggi</strong>!
        </Callout>
        <p>
          Ketika kita sudah memiliki sudut pandang (<em>angle</em>), logika awal, dan premis
          pribadi, lalu menggunakan AI sebagai teman diskusi atau penantang ide, akan terjadi
          <strong>dialektika yang aktif di dalam otak</strong>. Kita "menabrak-nabrakkan" pemikiran
          kita dengan pola pikir AI, sehingga hasil tulisan menjadi jauh lebih matang tanpa
          kehilangan karakter diri kita.
        </p>
        <p>
          Kita harus berhenti bertanya, <em>"Bagaimana mencegah AI membuat kita bodoh?"</em> dan
          beralih menanyakan,
          <em>"Bagaimana memastikan AI membantu kita mencapai wisdom (kebijaksanaan)?"</em>.
        </p>
        <p>
          Kunci utama di era ini adalah kedewasaan kognitif. Gunakan AI setelah Anda memiliki <em
            >core ideas</em
          > Anda sendiri. Pertahankan karakter, kepribadian, gaya bahasa, dan lokalitas khas Anda, agar
          narasi yang Anda hasilkan tetap berjiwa dan bermakna.
        </p>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="KK_9XxYpeTo" {chapters} />

<style>
  /* Video Timestamp Badges & Containers */
  .section-meta-timestamps {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    padding: 0.35rem 0.75rem;
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    border-radius: 20px;
    width: fit-content;
  }

  .meta-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-right: 0.25rem;
  }

  .timestamp-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-callout-info-border);
    color: var(--color-binder);
    padding: 0.15rem 0.55rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none !important;
    transition: all 0.2s ease-in-out;
    vertical-align: middle;
  }

  .timestamp-badge:hover {
    background: var(--color-binder);
    color: var(--color-surface) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 .timestamp-badge {
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
</style>
