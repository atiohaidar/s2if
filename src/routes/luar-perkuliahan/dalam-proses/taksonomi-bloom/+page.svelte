<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import VideoSidebar from '$lib/components/VideoSidebar.svelte';
  import VideoSyncArticle from '$lib/components/VideoSyncArticle.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import { Play } from 'lucide-svelte';

  const videoBaseUrl = 'https://www.youtube.com/watch?v=ImHHBUkFmo8';
  const videoId = 'ImHHBUkFmo8';

  let videoSidebar: VideoSidebar;

  const chapters = [
    { title: 'Intro: Paradoks Belasan Tahun Belajar', time: '0:00', seconds: 0 },
    { title: 'Level 1: Menghafal (Remembering) & Terminologi Riset', time: '1:43', seconds: 103 },
    { title: 'Level 2: Memahami (Understanding) - Tanya Kenapa?', time: '3:21', seconds: 201 },
    { title: 'Level 3: Mengaplikasikan (Applying) - Thought Experiment', time: '4:04', seconds: 244 },
    { title: 'Level 4: Menganalisa (Analyzing) - Komparasi SOTA', time: '5:25', seconds: 325 },
    { title: 'Level 5: Mengevaluasi (Evaluating) - Threats to Validity', time: '6:24', seconds: 384 },
    { title: 'Level 6: Menciptakan (Creating) - Novel Research Gap', time: '7:21', seconds: 441 },
    { title: 'Perangkap Riset: Sindrom Loncat Tahap & ATM Dangkal', time: '8:25', seconds: 505 },
    { title: 'Studi Kasus: Audit Literatur Sebelum Menulis Karya', time: '9:25', seconds: 565 }
  ];

  const sectionMap = [
    { id: 'paradoks-belajar', startSeconds: 0, endSeconds: 102 },
    { id: 'level-1-menghafal', startSeconds: 103, endSeconds: 200 },
    { id: 'level-2-memahami', startSeconds: 201, endSeconds: 243 },
    { id: 'level-3-mengaplikasikan', startSeconds: 244, endSeconds: 324 },
    { id: 'level-4-menganalisa', startSeconds: 325, endSeconds: 383 },
    { id: 'level-5-mengevaluasi', startSeconds: 384, endSeconds: 440 },
    { id: 'level-6-menciptakan', startSeconds: 441, endSeconds: 504 },
    { id: 'jebakan-lompat-tahap', startSeconds: 505, endSeconds: 564 },
    { id: 'studi-kasus-f15library', startSeconds: 565, endSeconds: 640 }
  ];

  function handleTimestampClick(event: MouseEvent) {
    const badge = (event.target as HTMLElement).closest(
      '.timestamp-badge'
    ) as HTMLAnchorElement | null;
    if (!badge) return;
    const href = badge.getAttribute('href') ?? '';
    const match = href.match(/t=(\d+)m(\d+)s/);
    if (match) {
      event.preventDefault();
      const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2]);
      videoSidebar?.seekTo(totalSeconds);
    } else {
      const matchSec = href.match(/t=(\d+)s/);
      if (matchSec) {
        event.preventDefault();
        const totalSeconds = parseInt(matchSec[1]);
        videoSidebar?.seekTo(totalSeconds);
      }
    }
  }

  const quizQuestions = [
    {
      question: 'Mengapa menghafal terminologi dasar (Remembering) tetap krusial saat membaca paper penelitian?',
      options: [
        'Karena reviewer paper hanya menilai seberapa banyak sitasi yang dihafal',
        'Karena otak membutuhkan terminologi dan definisi metrik mentah (p-value, precision, baseline) dalam working memory agar pembacaan argumen paper tidak terus-menerus terdistraksi mencari arti kata',
        'Karena menghafal abstrak sudah cukup untuk memahami metodologi penelitian secara utuh',
        'Karena peneliti hebat tidak perlu memahami relasi sebab-akibat antar-variabel'
      ],
      correctIndex: 1,
      explanation:
        'Menghafal istilah dasar (vocabulary) dan metrik statistik adalah fondasi mental. Tanpa itu, energi kognitif kita akan habis terbuang hanya untuk mengecek glosarium dasar setiap kali membaca satu paragraf paper.'
    },
    {
      question: 'Ketika kita mereview paper orang lain tanpa mengulang kodingan atau eksperimen lab author, bagaimana tahap "Mengaplikasikan" (Applying) dijalankan?',
      options: [
        'Tahap tersebut wajib di-skip karena kita tidak memegang source code asli',
        'Dengan mengaplikasikan rubrik metodologi ilmiah (validitas internal/eksternal) dan melakukan mental simulation (thought experiment) untuk menguji logika metode author pada skenario edge case hipotetis',
        'Dengan sekadar menyalin ulang teks kesimpulan paper ke dokumen review kita',
        'Dengan meminta AI menjalankan kodingan author tanpa mengecek logikanya'
      ],
      correctIndex: 1,
      explanation:
        'Dalam domain kognitif, Applying tidak selalu berupa aksi fisik menjalankan kode. Kita mengaplikasikan kaidah ilmiah, kriteria validitas riset, serta thought experiment (menguji cara kerja metode author pada kondisi batas atau dataset ekstrem).'
    },
    {
      question: 'Apa bahaya terbesar jika seorang mahasiswa/peneliti melompati tahap Menganalisa dan Mengevaluasi saat membaca literatur, lalu langsung mencoba "Menciptakan" (Creating/menulis riset baru)?',
      options: [
        'Riset yang dihasilkan berisiko sekadar ATM dangkal (mengubah sedikit variabel sepele atau sekadar ganti lokasi studi) tanpa kontribusi kebaruan (novelty) yang bermakna',
        'Paper yang dibuat akan otomatis diterima di konferensi top tier',
        'Waktu penulisan paper menjadi jauh lebih singkat dan bebas revisi',
        'Metodologi yang diajukan otomatis bebas dari ancaman validitas (threats to validity)'
      ],
      correctIndex: 0,
      explanation:
        'Tanpa analisis dekonstruksi dan evaluasi limitasi karya terdahulu, kita tidak tahu di mana celah riset yang sebenarnya. Akhirnya kita hanya menghasilkan inovasi kosmetik (reinventing the broken wheel).'
    },
    {
      question: 'Mengapa Aditia Yudis memilih membangun F15library.com daripada langsung menulis buku baru, dan apa pelajarannya bagi periset akademis?',
      options: [
        'Karena menulis buku membutuhkan biaya cetak yang terlalu mahal',
        'Sebelum mempublikasikan riset baru, penting melakukan systematic literature review untuk memastikan ide kita bukan pengulangan yang sudah dibahas tuntas oleh orang lain dengan lebih baik',
        'Karena membuat website lebih bergengsi daripada mempublikasikan paper jurnal',
        'Karena membaca 2.000 buku lebih cepat daripada menulis satu bab penelitian'
      ],
      correctIndex: 1,
      explanation:
        'Sama seperti Aditia yang menahan diri demi mengaudit karya dunia yang sudah ada, seorang peneliti wajib melakukan audit literatur agar tidak membuang waktu meneliti hal yang sudah selesai dipecahkan oleh komunitas ilmiah.'
    }
  ];
</script>

<svelte:head>
  <title>Taksonomi Bloom: Dari Menghafal ke Menciptakan - S2IF Notebook</title>
  <meta
    name="description"
    content="Membedah 6 tingkatan Taksonomi Bloom dalam proses belajar dan konteks membaca/mereview paper penelitian: dari menghafal istilah, thought experiment, evaluasi kritis, hingga menemukan novel research gap."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Taksonomi Bloom: Dari Menghafal ke Menciptakan"
    date="23 Oktober 2026"
    status="done"
    tags={['Taksonomi Bloom', 'Mindset', 'Cara Belajar', 'Paper Review', 'Critical Thinking']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini diadaptasi dari pemaparan inspiratif <strong>Aditia Yudis</strong> (Founder F15library.com) pada video
    <em>"From Rote Memorization to Creation: How Deep Do You Actually Learn? | GBLK PROJECT #45"</em>.
    Video lengkap dapat disimak melalui tautan
    <a href="https://www.youtube.com/watch?v=ImHHBUkFmo8" target="_blank" rel="noopener noreferrer">
      YouTube Aditia Yudis (GBLK PROJECT #45)
    </a>. Untuk sinkronisasi topik dan bab pembahasan, gunakan panel video yang tersedia.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <!-- Section 1 -->
    <div data-section-id="paradoks-belajar">
      <NoteSection title="1. Paradoks Belasan Tahun Belajar: Mengapa Hafalan Tidak Cukup?">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m0s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:00 Paradoks Pendidikan & Hafalan
          </a>
          <a
            href="{videoBaseUrl}&t=0m51s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:51 Rutinitas Kaku 12+ Tahun
          </a>
        </div>

        <p>
          Coba tengok kembali perjalanan panjang pendidikan formal kita: dari TK, SD, SMP, SMA, hingga perguruan tinggi. Lebih dari <strong>16 tahun</strong> hidup kita dihabiskan dalam format yang serba terstruktur: bangun pagi, memakai seragam lengkap dengan dasi terikat rapi, meminta izin ke toilet dengan angkat tangan, dan menunggu bunyi lonceng bel pergantian kelas.
        </p>

        <p>
          Namun, saat memasuki dunia riset pascasarjana atau lingkungan riset terapan di mana kita dihadapkan pada tumpukan paper jurnal bereputasi tinggi, banyak mahasiswa mengeluh: <em>"Kenapa membaca paper ilmiah terasa sangat melelahkan dan sulit menemukan ide riset baru?"</em>
        </p>

        <Callout type="warning" title="Akar Masalah Kognitif">
          Masalahnya bukan karena otak kita tidak mampu, melainkan karena selama belasan tahun kita terbiasa dilatih hanya pada tingkatan kognitif paling dasar: <strong>Menghafal (Rote Memorization)</strong>. Di sekolah, kita dinilai dari seberapa tepat mengingat hafalan klasifikasi biologi, rumus baku, atau tanggal prasasti sejarah.
        </Callout>

        <p>
          Menghafal adalah fondasi awal yang penting, tetapi tidak akan pernah cukup untuk melakukan <strong>analisis kritis (critical thinking)</strong> atau <strong>peer-review ilmiah</strong>. Di sinilah <strong>Taksonomi Bloom</strong> menjadi kompas penting bagi akademisi dan praktisi untuk melangkah dari sekadar "tahu istilah" menuju "mampu menciptakan kontribusi ilmiah orisinal".
        </p>
      </NoteSection>
    </div>

    <!-- Ringkasan Tabel Taksonomi Bloom -->
    <NoteSection title="Peta Kognitif: 6 Tingkatan Taksonomi Bloom dalam Konteks Membaca Paper">
      <p>
        Dalam video aslinya, Aditia Yudis mengilustrasikan hierarki kognitif ini menggunakan analogi buah <strong>Jeruk Lemon</strong>. Tabel berikut mengomparasikan analogi lemon tersebut dengan penerapannya saat <strong>membaca, mengkritisi, dan mereview paper penelitian</strong>:
      </p>

      <div class="table-container">
        <table class="notebook-table">
          <thead>
            <tr>
              <th style="width: 12%;">Tingkat</th>
              <th style="width: 18%;">Kategori</th>
              <th style="width: 32%;">Analogi Jeruk Lemon (Aditia Yudis)</th>
              <th style="width: 38%;">Penerapan dalam Membaca / Mereview Paper Ilmiah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Level 6</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menciptakan</strong> (Creating)
              </td>
              <td>Merancang formula turunan (Ester-C) atau kapsul <em>time-release</em> agar aman bagi penderita maag.</td>
              <td>
                <strong>Menemukan Novel Research Gap:</strong> Merumuskan hipotesis lanjutan, merancang modifikasi algoritma/metode baru untuk menambal kelemahan paper yang dibaca, atau menyusun proposal tesis orisinal.
              </td>
            </tr>
            <tr>
              <td><strong>Level 5</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Mengevaluasi</strong> (Evaluating)
              </td>
              <td>Menilai kritis bahwa air perasan lemon terlalu asam untuk lambung sensitif dan vitamin C-nya mudah teroksidasi.</td>
              <td>
                <strong>Academic Judgment & Peer-Review:</strong> Mengkritisi ancaman validitas (<em>internal/external validity</em>), menguji apakah bukti empiris cukup kuat mendukung klaim kesimpulan author, serta memberi rekomendasi (Accept/Reject).
              </td>
            </tr>
            <tr>
              <td><strong>Level 4</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menganalisa</strong> (Analyzing)
              </td>
              <td>Membandingkan kandungan vitamin C lemon dengan buah lain (kiwi, jambu biji) dan memilah asam sitrat vs askorbat.</td>
              <td>
                <strong>Dekonstruksi & Komparasi SOTA:</strong> Membedah kesesuaian data hasil vs klaim author, membandingkan performa metode author dengan model <em>baseline</em>/SOTA terdahulu, serta mendeteksi potensi <em>cherry-picking</em>.
              </td>
            </tr>
            <tr>
              <td><strong>Level 3</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Mengaplikasikan</strong> (Applying)
              </td>
              <td>Memotong lemon, memeras air sarinya, lalu meminumnya saat flu untuk meningkatkan imunitas tubuh.</td>
              <td>
                <strong>Penerapan Framework & Thought Experiment:</strong> Menerapkan rubrik metodologi ilmiah pada teks paper, serta melakukan simulasi mental (menguji bagaimana metode author bekerja pada skenario <em>edge cases</em>/dataset ekstrem).
              </td>
            </tr>
            <tr>
              <td><strong>Level 2</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Memahami</strong> (Understanding)
              </td>
              <td>Memahami alasan kenapa lemon mengandung vitamin C dan kenapa vitamin C melindungi sel imun manusia.</td>
              <td>
                <strong>Memahami Alur Argumen Author:</strong> Menangkap <em>research question</em>, latar belakang masalah, landasan teoritis, serta alasan mengapa author memilih metode tersebut dibanding pendekatan konvensional.
              </td>
            </tr>
            <tr>
              <td><strong>Level 1</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Menghafal</strong> (Remembering)
              </td>
              <td>Mengingat ciri fisik lemon: bentuk lonjong, kulit kuning, rasa asam, dan memiliki kandungan vitamin C.</td>
              <td>
                <strong>Penguasaan Terminologi Dasar:</strong> Me-recall definisi istilah riset dan metrik statistik (misal: <em>p-value</em>, <em>precision</em>, <em>recall</em>, <em>F1-score</em>, <em>overfitting</em>, <em>sample size</em>, <em>baseline</em>).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteSection>

    <!-- Section 2 -->
    <div data-section-id="level-1-menghafal">
      <NoteSection title="2. Level 1: Menghafal (Remembering) — Penguasaan Terminologi Dasar Riset">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=1m43s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:43 Menghafal sebagai Pondasi
          </a>
          <a
            href="{videoBaseUrl}&t=2m43s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 2:43 Analogi Jeruk Lemon
          </a>
        </div>

        <p>
          Ada sebagian akademisi pemula yang sinis terhadap hafalan: <em>"Sekarang kan ada AI dan Google, ngapain ngafal istilah teknis?"</em>.
        </p>

        <p>
          Pandangan ini keliru. Aditia Yudis menekankan bahwa <strong>menghafal adalah batu bata pertama</strong>. Bayangkan seorang peneliti membaca paper tentang <em>Deep Learning</em> tetapi tidak hafal apa arti istilah dasar seperti <em>loss function</em>, <em>learning rate</em>, <em>cross-entropy</em>, atau <em>overfitting</em>. Setiap membaca satu kalimat, proses berpikirnya akan terinterupsi karena harus membuka kamus atau bertanya ke AI.
        </p>

        <p>
          Memori kerja (<em>working memory</em>) manusia membutuhkan istilah-istilah dasar ini tersimpan rapi di kepala agar energi kognitif kita bisa difokuskan untuk mencerna alur logika yang jauh lebih rumit.
        </p>
      </NoteSection>
    </div>

    <!-- Section 3 -->
    <div data-section-id="level-2-memahami">
      <NoteSection title="3. Level 2: Memahami (Understanding) — Rantai Pertanyaan Kritis 'Kenapa?'">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=3m21s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 3:21 Masuk ke Level Memahami
          </a>
          <a
            href="{videoBaseUrl}&t=3m41s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 3:41 Menanyakan Alasan di Balik Klaim
          </a>
        </div>

        <p>
          Banyak orang hanya membaca abstrak dan kesimpulan paper, lalu mengira dirinya sudah "paham". Di Level 2 Taksonomi Bloom, pemahaman sejati ditandai dengan kemampuan kita mengajukan rantai pertanyaan <strong>"Kenapa?" (Why)</strong> terhadap pilihan metodologi author:
        </p>

        <ul>
          <li><em>Kenapa author memilih arsitektur berbasis Transformer dibanding LSTM untuk dataset sekuensial ini?</em></li>
          <li><em>Kenapa mereka menggunakan metrik F1-score makro ketimbang akurasi biasa? (Oh, ternyata datasetnya imbalanced).</em></li>
          <li><em>Kenapa loss function yang digunakan memiliki komponen regularisasi tambahan?</em></li>
        </ul>

        <p>
          Ketika Anda mampu menceritakan kembali inti permasalahan paper dan alasan di balik metodologinya dengan kata-kata sendiri tanpa menyontek teks aslinya, di situlah Anda telah mencapai tingkat <strong>Understanding</strong>.
        </p>
      </NoteSection>
    </div>

    <!-- Section 4 -->
    <div data-section-id="level-3-mengaplikasikan">
      <NoteSection title="4. Level 3: Mengaplikasikan (Applying) — Thought Experiment & Uji Skenario">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=4m04s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 4:04 Jangan Cuma Teori, Terapkan!
          </a>
          <a
            href="{videoBaseUrl}&t=4m26s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 4:26 Praktik Memeras Lemon
          </a>
        </div>

        <p>
          Pertanyaan mendasar yang sering muncul bagi akademisi dan reviewer adalah:
          <em>"Jika saat mereview paper orang lain kita tidak selalu mengulang kodingan atau mereplikasi eksperimen lab author dari awal, apakah tahap Mengaplikasikan (Applying) ini kita skip?"</em>
        </p>

        <Callout type="tip" title="Jawabannya: Sama Sekali Tidak Di-Skip!">
          Dalam domain kognitif, <strong>Applying</strong> tidak harus berarti menulis kode ulang secara fisik. Yang kita aplikasikan adalah <strong>Rubrik Metodologi Ilmiah</strong> dan <strong>Simulasi Mental (Thought Experiment)</strong> terhadap argumen author!
        </Callout>

        <p>Bentuk konkret aplikasi kognitif saat membaca paper:</p>
        <ol>
          <li>
            <strong>Menerapkan Kaidah Ilmiah:</strong> Anda mengaplikasikan kriteria validitas penelitian (seperti pada panduan <a href="/semester-1/tren-perangkat-lunak/mengkritisi-paper-penelitian">mengkritisi paper penelitian</a>). Misalnya menerapkan aturan: <em>"Apakah ukuran sampel N = 30 statistically valid untuk menggeneralisasi perilaku ribuan pengguna sistem?"</em>.
          </li>
          <li>
            <strong>Mental Simulation / Thought Experiment:</strong> Anda menerapkan logika algoritma author pada skenario hipotetis ekstrem (<em>edge cases</em>). Contoh: <em>"Bagaimana jika metode penanganan transaksi yang diajukan ini diterapkan pada jaringan dengan latensi 500 ms atau packet loss 20%? Apakah sistemnya tetap konsisten atau akan deadlock?"</em>.
          </li>
          <li>
            <strong>Menerapkan Standar Uji Komparasi:</strong> Anda menguji apakah parameter pada model pembanding (<em>baseline</em>) diatur secara adil, atau sengaja diset suboptimal agar model usulan author tampak unggul.
          </li>
        </ol>
      </NoteSection>
    </div>

    <!-- Section 5 -->
    <div data-section-id="level-4-menganalisa">
      <NoteSection title="5. Level 4: Menganalisa (Analyzing) — Dekonstruksi Klaim vs Evidence">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=5m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:25 Menganalisa & Membandingkan
          </a>
          <a
            href="{videoBaseUrl}&t=5m55s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:55 Eksplorasi Alternatif Sumber
          </a>
        </div>

        <p>
          Pada level ini, Anda membedah relasi antar bagian di dalam paper dan melakukan komparasi mendalam dengan literatur lain (<em>State-of-the-Art</em>):
        </p>

        <ul>
          <li><strong>Dekonstruksi Klaim vs. Bukti Empiris:</strong> Apakah klaim fantastis di bagian <em>Conclusion</em> benar-benar didukung oleh data angka pada tabel <em>Results</em>? Ataukah author melakukan <em>overclaim</em>?</li>
          <li><strong>Komparasi dengan SOTA Terdahulu:</strong> Apakah metode baru ini benar-benar lebih efisien dari paper tahun lalu, atau peningkatannya hanya 0.2% yang sebenarnya masuk dalam rentang standar deviasi (fluktuasi acak)?</li>
          <li><strong>Pemeriksaan Dataset & Distribusi:</strong> Apakah data yang digunakan representatif untuk kondisi riil, atau dataset sintetis yang sengaja dirancang agar algoritma author mudah berhasil (*cherry-picked*)?</li>
        </ul>

        <p>
          Seorang reviewer handal tidak menelan mentah-mentah apa yang ditulis author; ia menganalisis anatomi pembuktiannya baris demi baris.
        </p>
      </NoteSection>
    </div>

    <!-- Section 6 -->
    <div data-section-id="level-5-mengevaluasi">
      <NoteSection title="6. Level 5: Mengevaluasi (Evaluating) — Menilai 'Threats to Validity' & Kualitas">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=6m24s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 6:24 Mengevaluasi & Mengkritisi Solusi
          </a>
          <a
            href="{videoBaseUrl}&t=7m01s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 7:01 Mengidentifikasi Batasan Metodologis
          </a>
        </div>

        <p>
          Setelah membedah data di tahap analisa, Anda masuk ke tahap <strong>evaluasi</strong>: memberikan penilaian ilmiah (<em>academic judgment</em>) mengenai validitas, kelebihan, serta kelemahan fatal paper tersebut.
        </p>

        <p>
          Poin evaluasi kritis mencakup pengujian terhadap <strong>Threats to Validity</strong>:
        </p>
        <ol>
          <li><strong>Internal Validity:</strong> Apakah ada faktor perancu (<em>confounding variables</em>) yang luput dikontrol author sehingga hasil eksperimen menjadi bias?</li>
          <li><strong>External Validity:</strong> Sejauh mana temuan riset ini dapat digeneralisasi ke skenario dunia nyata, atau hanya berlaku khusus di lingkungan lab author?</li>
          <li><strong>Construct Validity:</strong> Apakah metrik yang diukur benar-benar merepresentasikan konsep yang ingin diuji? (Misal: mengukur kemudahan memahami kode hanya dari jumlah baris baris program).</li>
          <li><strong>Kelayakan Publikasi (Decision):</strong> Menilai secara objektif apakah paper ini layak berstatus <em>Accept</em>, <em>Minor/Major Revision</em>, atau <em>Reject</em>.</li>
        </ol>
      </NoteSection>
    </div>

    <!-- Section 7 -->
    <div data-section-id="level-6-menciptakan">
      <NoteSection title="7. Level 6: Menciptakan (Creating) — Merumuskan 'Novel Research Gap'">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=7m21s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 7:21 Merancang Solusi Baru
          </a>
          <a
            href="{videoBaseUrl}&t=8m04s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:04 Sintesis Inovasi Ilmiah
          </a>
        </div>

        <p>
          Tingkat tertinggi Taksonomi Bloom adalah <strong>Menciptakan (Creating / Synthesizing)</strong>.
          Bagi mahasiswa magister atau peneliti, tahap ini adalah momen ketika kelemahan yang Anda temukan pada tahap evaluasi diubah menjadi <strong>ide penelitian baru (novel research contribution)</strong>.
        </p>

        <p>Contoh konkret transisi dari evaluasi paper menuju penciptaan riset baru:</p>
        <ul>
          <li><em>"Setelah mengevaluasi paper X, saya menemukan bahwa algoritma mereka sangat akurat tapi membutuhkan konsumsi memori GPU yang tidak realistis untuk perangkat mobile."</em></li>
          <li>
            <strong>Langkah Creating:</strong> Anda merancang teknik kompresi model (kuantisasi atau pruning) baru yang mempertahankan 98% akurasi paper X namun memangkas kebutuhan RAM hingga 70%. Inilah yang menjadi topik tesis atau paper ilmiah orisinal Anda!
          </li>
        </ul>

        <p>
          Inovasi riset yang bernilai tinggi tidak lahir dari lamunan abstrak, melainkan lahir dari hasil evaluasi yang tajam terhadap batas kemampuan penelitian terdahulu.
        </p>
      </NoteSection>
    </div>

    <!-- Section 8 -->
    <div data-section-id="jebakan-lompat-tahap">
      <NoteSection title="8. Perangkap Riset: Sindrom Loncat Tahap & Budaya ATM Dangkal">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:25 Sindrom Loncat Tahap
          </a>
          <a
            href="{videoBaseUrl}&t=8m55s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:55 Jebakan ATM Tanpa Analisis
          </a>
        </div>

        <p>
          Aditia Yudis menyoroti kekeliruan umum yang sering melanda proses belajar dan riset: <strong>kebiasaan melompati tahapan</strong>.
        </p>

        <div class="note-quote-box">
          <p>
            Banyak mahasiswa baru membaca judul dan abstrak 1–2 paper (<strong>menghafal</strong>), belum memahami prinsip kerjanya secara mendalam, tapi sudah terburu-buru ingin langsung <strong>menciptakan judul tesis atau paper baru</strong>.
          </p>
        </div>

        <p>
          Karena melewati tahap <strong>menganalisa</strong> dan <strong>mengevaluasi</strong>, apa yang dihasilkan?
          Keluaran yang terjadi akhirnya sekadar <strong>ATM (Amati, Tiru, Modifikasi) dangkal</strong>:
        </p>
        <ul>
          <li>Hanya mengganti lokasi penelitian (misal: paper asli menguji di Rumah Sakit A, kita meniru persis lalu menguji di Rumah Sakit B tanpa ada kebaruan metodologi).</li>
          <li>Mengganti variabel sepele tanpa menjustifikasi alasan ilmiahnya.</li>
          <li>Mengulang kesalahan metodologis yang sebenarnya sudah lama diidentifikasi dan ditinggalkan oleh komunitas ilmiah dunia (*reinventing the broken wheel*).</li>
        </ul>
      </NoteSection>
    </div>

    <!-- Section 9 -->
    <div data-section-id="studi-kasus-f15library">
      <NoteSection title="9. Studi Kasus F15library: Pentingnya Literature Audit Sebelum Menulis">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=9m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 9:25 Ajakan Menulis Buku
          </a>
          <a
            href="{videoBaseUrl}&t=9m46s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 9:46 Fase Analisis & Evaluasi Literatur
          </a>
          <a
            href="{videoBaseUrl}&t=10m14s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 10:14 Inovasi Berdasarkan Celah Nyata
          </a>
        </div>

        <p>
          Kisah Aditia Yudis saat menolak langsung menulis buku baru menjadi analogi sempurna bagi dunia akademis:
        </p>

        <blockquote class="simple-quote">
          "Mas Adit kan pintar berbicara dan wawasannya luas, bikin buku dong Mas! Pasti laris kalau Mas Adit yang nulis."
        </blockquote>

        <p>
          Alih-alih langsung tergiur melompat ke tahap <strong>Menciptakan (menulis buku baru)</strong> demi status atau gengsi, Aditia menahan diri dan melakukan <strong>literature audit</strong>:
        </p>

        <ul>
          <li><strong>Audit Literatur Global:</strong> Jangan-jangan gagasan kepemimpinan dan produktivitas yang ingin ia tulis sebenarnya sudah pernah ditulis oleh para pemikir kaliber dunia dengan riset puluhan tahun yang jauh lebih matang?</li>
          <li><strong>Pertanyaan Nilai Tambah:</strong> Jika ia memaksakan menulis buku yang sama, apakah karyanya akan lebih baik daripada literatur utama tersebut? Jika tidak, menulis ulang hal yang sama hanyalah pemborosan waktu yang menghasilkan karya redundan.</li>
          <li><strong>Identifikasi Kebutuhan Riil:</strong> Masalah masyarakat kita bukan kekurangan buku bagus, melainkan keterbatasan waktu membaca dan kendala bahasa pada buku-buku referensi internasional.</li>
        </ul>

        <p>
          Dari evaluasi tersebut, lahirlah <strong>F15library.com</strong> yang merangkum 2.000+ buku <em>bestseller</em> dunia ke dalam intisari 15 menit berbahasa Indonesia.
        </p>

        <Callout type="tip" title="Pelajaran Emas bagi Peneliti">
          Sebelum terburu-buru menulis proposal riset atau draft paper, lakukan <strong>Systematic Literature Review</strong> yang jujur. Pastikan masalah yang ingin Anda teliti memang benar-benar belum selesai dipecahkan oleh peneliti lain, sehingga karya Anda memiliki kebaruan (<em>novelty</em>) dan nilai guna yang nyata.
        </Callout>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <!-- Kuis Kilat -->
  <NoteSection title="Uji Pemahaman: Kuis Kilat Taksonomi Bloom dalam Riset">
    <p>
      Uji intuisi kognitif Anda mengenai penerapan Taksonomi Bloom saat membaca dan mengkritisi paper penelitian melalui kuis ringkas berikut:
    </p>
    <Quiz title="Kuis Taksonomi Bloom & Review Paper Ilmiah" questions={quizQuestions} />
  </NoteSection>

  <!-- Summary Callout -->
  <Callout type="tip" title="Checklist Membaca Paper dengan Taksonomi Bloom">
    <ol>
      <li><strong>Remembering:</strong> Kuasai terminologi dasar, rumus metrik, dan istilah riset sebelum membaca lebih jauh.</li>
      <li><strong>Understanding:</strong> Pahami latar belakang masalah, hipotesis, dan alasan pemilihan metodologi author.</li>
      <li><strong>Applying:</strong> Terapkan rubrik validitas ilmiah dan uji logika author melalui simulasi mental (<em>thought experiment</em>) pada kasus batas.</li>
      <li><strong>Analyzing:</strong> Bedah kesesuaian antara bukti data pada tabel eksperimen dengan klaim kesimpulan author.</li>
      <li><strong>Evaluating:</strong> Nilai keterbatasan riset, potensi bias, serta ancaman terhadap validitas (<em>internal & external validity</em>).</li>
      <li><strong>Creating:</strong> Rumuskan kontribusi kebaruan (<em>novel research gap</em>) dari celah evaluasi tersebut untuk riset atau tesis Anda sendiri.</li>
    </ol>
  </Callout>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} {videoId} {chapters} />

<style>
  /* Timestamps Badges */
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

  /* Notebook Table */
  .table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid var(--color-line);
    border-radius: 8px;
    background: var(--color-surface);
  }

  .notebook-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: left;
  }

  .notebook-table th {
    background: var(--color-surface-muted);
    color: var(--color-binder);
    font-weight: 700;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid var(--color-line);
  }

  .notebook-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-line);
    vertical-align: top;
    line-height: 1.55;
  }

  .notebook-table tbody tr:last-child td {
    border-bottom: none;
  }

  .notebook-table tbody tr:hover {
    background: var(--color-surface-soft);
  }

  .tag-hot {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    background: var(--color-callout-warning-end);
    color: var(--color-callout-warning-text);
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    margin-right: 0.35rem;
  }

  .tag-lot {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    background: var(--color-status-info-soft);
    color: var(--color-link);
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    margin-right: 0.35rem;
  }

  /* Note Quote Box */
  .note-quote-box {
    background: var(--color-surface-soft);
    border-left: 3px solid var(--color-binder);
    padding: 0.85rem 1.25rem;
    margin: 1.25rem 0;
    border-radius: 0 6px 6px 0;
  }

  .note-quote-box p {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  /* Simple Quote */
  .simple-quote {
    margin: 1.25rem 0;
    padding: 0.75rem 1.25rem;
    border-left: 3px solid var(--color-binder);
    background: var(--color-surface-soft);
    font-family: var(--font-handwriting, inherit);
    font-size: 1.15rem;
    line-height: 1.5;
    color: var(--color-ink);
  }

  @media (max-width: 768px) {
    .notebook-table th,
    .notebook-table td {
      padding: 0.6rem 0.75rem;
      font-size: 0.82rem;
    }
  }
</style>
