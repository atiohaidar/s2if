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
    { title: 'Level 1: Menghafal (Remembering) & Jeruk Lemon', time: '1:43', seconds: 103 },
    { title: 'Level 2: Memahami (Understanding) - Tanya Kenapa?', time: '3:21', seconds: 201 },
    { title: 'Level 3: Mengaplikasikan (Applying) - Praktik Langsung', time: '4:04', seconds: 244 },
    { title: 'Level 4: Menganalisa (Analyzing) - Komparasi Pola', time: '5:25', seconds: 325 },
    { title: 'Level 5: Mengevaluasi (Evaluating) - Kritis Mengukur Batasan', time: '6:24', seconds: 384 },
    { title: 'Level 6: Menciptakan (Creating) - Inovasi Solutif', time: '7:21', seconds: 441 },
    { title: 'Perangkap Belajar: Sindrom Loncat Tahap & ATM', time: '8:25', seconds: 505 },
    { title: 'Studi Kasus: Mengapa F15library, Bukan Buku?', time: '9:25', seconds: 565 }
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
      question: 'Mengapa menghafal (Remembering) tetap menjadi pondasi krusial meski kerap dikritik?',
      options: [
        'Karena sistem ujian sekolah hanya menilai kemampuan mengingat hafalan',
        'Karena otak membutuhkan fakta mentah dan kosakata dasar sebelum mampu memahami dan menganalisis relasi antar-konsep',
        'Karena menghafal sudah cukup untuk menciptakan inovasi tingkat tinggi',
        'Karena orang jenius tidak perlu memahami alasan di balik suatu fenomena'
      ],
      correctIndex: 1,
      explanation:
        'Menghafal bukan hal buruk; ia adalah lapisan dasar (foundation). Tanpa fakta mentah dan istilah dasar (vocabulary), kita tidak punya bahan baku mental untuk berpikir kritis di tingkat yang lebih tinggi.'
    },
    {
      question: 'Dalam analogi jeruk lemon, manakah tindakan yang mencerminkan tahap "Mengevaluasi" (Evaluating)?',
      options: [
        'Menghafal bahwa warna jeruk lemon adalah kuning dan bentuknya oval',
        'Memeras air lemon lalu meminumnya setiap pagi saat flu',
        'Menilai bahwa air perasan lemon terlalu asam untuk penderita maag dan mudah teroksidasi di udara bebas',
        'Membuat kapsul time-release vitamin C di laboratorium farmasi'
      ],
      correctIndex: 2,
      explanation:
        'Tahap evaluasi berfokus pada penilaian kritis terhadap efektivitas, limitasi, dan efek samping dari solusi yang sudah ada, sebelum memikirkan rancangan solusi baru.'
    },
    {
      question: 'Apa bahaya terbesar ketika seseorang melompati tahap Menganalisa dan Mengevaluasi, lalu langsung "Menciptakan"?',
      options: [
        'Hasilnya hanya sekadar ATM (Amati, Tiru, Modifikasi) dangkal tanpa memahami kekurangan sistem yang ditiru',
        'Orang tersebut akan menghafal terlalu banyak rumus teori',
        'Proses pembuatan produk menjadi memakan waktu terlalu lama',
        'Sistem yang dibuat akan bebas dari bug dan masalah teknis'
      ],
      correctIndex: 0,
      explanation:
        'Ketika kita langsung melompat dari hafalan/praktik pemula ke inovasi, kita tidak tahu apa yang sebenarnya belum diselesaikan oleh orang lain. Akibatnya kita terjebak "reinventing the wheel" atau meniru produk secara dangkal.'
    },
    {
      question: 'Mengapa Aditia Yudis memilih membangun F15library.com daripada langsung menulis buku baru saat diminta audiensnya?',
      options: [
        'Karena menulis buku membutuhkan biaya cetak yang terlalu mahal',
        'Karena melalui evaluasi, ia menyadari konsep yang ingin ditulisnya kemungkinan sudah ada yang menulis lebih bagus dan lengkap, sehingga kurasi & rangkuman 15 menit jauh lebih bernilai',
        'Karena ia belum menguasai cara menulis buku yang menarik',
        'Karena platform perpustakaan digital lebih mudah dibuat daripada menyusun daftar pustaka'
      ],
      correctIndex: 1,
      explanation:
        'Alih-alih terburu-buru menciptakan karya duplikatif, Aditia mengevaluasi landscape pengetahuan yang ada. Solusi yang bernilai tinggi bukan menulis buku serupa, melainkan memfasilitasi audiens menyerap 2.000+ buku kelas dunia dalam format ringkas 15 menit.'
    }
  ];
</script>

<svelte:head>
  <title>Taksonomi Bloom: Dari Menghafal ke Menciptakan - S2IF Notebook</title>
  <meta
    name="description"
    content="Membedah 6 tingkatan Taksonomi Bloom dalam proses belajar: mengapa hafalan belasan tahun terasa sia-sia, bahaya melompati tahap analisis dan evaluasi, hingga studi kasus inovasi produk."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Taksonomi Bloom: Dari Menghafal ke Menciptakan"
    date="23 Oktober 2026"
    status="done"
    tags={['Taksonomi Bloom', 'Mindset', 'Cara Belajar', 'Inovasi', 'Kreativitas']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini dirangkum berdasarkan pemaparan <strong>Aditia Yudis</strong> (Founder F15library.com) pada video
    <em>"From Rote Memorization to Creation: How Deep Do You Actually Learn? | GBLK PROJECT #45"</em>.
    Video lengkap dapat disimak melalui tautan
    <a href="https://www.youtube.com/watch?v=ImHHBUkFmo8" target="_blank" rel="noopener noreferrer">
      YouTube Aditia Yudis (GBLK PROJECT #45)
    </a>. Gunakan sidebar video untuk menyimak materi secara tersinkronisasi.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <!-- Section 1 -->
    <div data-section-id="paradoks-belajar">
      <NoteSection title="1. Paradoks Belasan Tahun Belajar: Mengapa Ilmu Terasa 'Gak Kepakai'?">
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
          Coba tengok kembali perjalanan panjang pendidikan formal kita: sejak umur 4–5 tahun kita masuk TK, lanjut 6 tahun di SD, 3 tahun di SMP, 3 tahun di SMA, lalu diteruskan 4 tahun di bangku kuliah. Lebih dari <strong>16 tahun</strong> hidup kita diatur jadwal ketat: bangun pagi, berbaris rapi, memakai seragam lengkap dengan dasi terikat kencang, izin ke toilet dengan angkat tangan, dan menunggu bunyi lonceng bel pergantian jam.
        </p>

        <p>
          Namun, begitu lulus dan terjun ke dunia kerja nyata, keluhan klise yang hampir selalu muncul adalah: <em>"Kenapa hampir semua ilmu yang dipelajari belasan tahun itu rasanya gak kepakai?"</em>
        </p>

        <Callout type="warning" title="Akar Masalah Sebenarnya">
          Masalah utamanya bukan karena biologi, matematika, atau sejarah itu tidak berguna. Masalahnya adalah selama belasan tahun, sistem persekolahan konvensional mayoritas <strong>hanya menguji dan melatih kita di level paling dasar: Menghafal (Rote Memorization)</strong>.
        </Callout>

        <p>
          Contoh hafalan yang akrab di memori kita:
        </p>
        <ul>
          <li>Membedakan tumbuhan monokotil vs dikotil, atau akar serabut vs akar tunggang.</li>
          <li>Mengklasifikasikan reproduksi hewan: ovipar, vivipar, ovovivipar.</li>
          <li>Menghafal nama-nama kingdom: animalia, plantae, fungi.</li>
          <li>Menghafal tahun dan lokasi penandatanganan prasasti bersejarah.</li>
        </ul>

        <p>
          Apakah menghafal itu buruk? Tentu tidak. Menghafal adalah batu bata pertama dari sebuah gedung pengetahuan. Namun jika proses belajar berhenti hanya di hafalan, wajar jika ketika berhadapan dengan masalah dinamis di dunia profesional, otak kita terasa gagap. Di sinilah <strong>Taksonomi Bloom</strong> hadir memberikan peta navigasi proses belajar yang utuh.
        </p>
      </NoteSection>
    </div>

    <!-- Ringkasan Tabel Taksonomi Bloom -->
    <NoteSection title="Peta Kognitif: 6 Tingkatan Taksonomi Bloom (Analogi Jeruk Lemon)">
      <p>
        Untuk memahami hierarki ini dengan mudah, Aditia Yudis menggunakan satu analogi sederhana yang sangat runut: <strong>Jeruk Lemon</strong>.
      </p>

      <div class="table-container">
        <table class="notebook-table">
          <thead>
            <tr>
              <th style="width: 14%;">Tingkat</th>
              <th style="width: 20%;">Kategori Kognitif</th>
              <th style="width: 32%;">Analogi Jeruk Lemon</th>
              <th style="width: 34%;">Penerapan di Dunia Nyata / Tech</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Level 6</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menciptakan</strong> (Creating)
              </td>
              <td>Merancang formula turunan (Ester-C) atau kapsul <em>time-release</em> agar aman bagi penderita asam lambung.</td>
              <td>Mendesain arsitektur sistem baru, membangun platform solusi yang belum pernah ada, atau merumuskan metodologi orisinal.</td>
            </tr>
            <tr>
              <td><strong>Level 5</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Mengevaluasi</strong> (Evaluating)
              </td>
              <td>Menilai kritis bahwa perasan lemon terlalu asam untuk lambung sensitif dan vitamin C-nya cepat teroksidasi udara.</td>
              <td>Audit keamanan, review arsitektur, profiling performa, serta mengidentifikasi batasan dan <em>trade-off</em> sistem.</td>
            </tr>
            <tr>
              <td><strong>Level 4</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menganalisa</strong> (Analyzing)
              </td>
              <td>Membandingkan kandungan vitamin C lemon dengan buah lain (kiwi, jambu biji), dan memilah kandungan asam sitrat vs askorbat.</td>
              <td>Membedah struktur data, komparasi kompleksitas algoritma, benchmark latensi database, dan identifikasi akar masalah (root cause).</td>
            </tr>
            <tr>
              <td><strong>Level 3</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Mengaplikasikan</strong> (Applying)
              </td>
              <td>Memotong lemon, memeras air sarinya, lalu meminumnya langsung saat badan terasa meriang.</td>
              <td>Menulis kode berdasarkan tutorial, menjalankan deployment pipeline, atau menerapkan rumus statistik pada dataset.</td>
            </tr>
            <tr>
              <td><strong>Level 2</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Memahami</strong> (Understanding)
              </td>
              <td>Memahami alasan kenapa lemon mengandung vitamin C dan kenapa vitamin C penting untuk sistem imun manusia.</td>
              <td>Memahami konsep di balik <em>asynchronous event loop</em>, prinsip OOP, atau cara kerja <em>relational integrity</em> database.</td>
            </tr>
            <tr>
              <td><strong>Level 1</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Menghafal</strong> (Remembering)
              </td>
              <td>Mengingat ciri fisik lemon: bentuk lonjong, kulit kuning, rasa asam, dan mengandung nutrisi vitamin C.</td>
              <td>Menghafal syntax dasar, keyword bahasa pemrograman, fungsi built-in, serta daftar HTTP status code (200, 404, 500).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteSection>

    <!-- Section 2 -->
    <div data-section-id="level-1-menghafal">
      <NoteSection title="2. Level 1: Menghafal (Remembering) — Pondasi yang Kerap Dicibir">
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
          Belakangan sering muncul anggapan bahwa di era mesin pencari dan kecerdasan buatan, kita sama sekali tidak perlu menghafal: <em>"Ngapain ngafal kalau semua bisa di-search dalam 3 detik?"</em>.
        </p>

        <p>
          Sikap anti-menghafal yang ekstrem ini keliru. Aditia Yudis mengingatkan bahwa <strong>menghafal adalah fondasi paling awal</strong>. Jika seorang programmer sama sekali tidak hafal sintaks dasar atau terminologi logika, setiap kali menulis satu baris kode ia harus berhenti membuka dokumentasi. Otak manusia memerlukan memori kerja (<em>working memory</em>) berisi istilah dan fakta mentah agar bisa mengolah ide yang lebih kompleks secara lancar.
        </p>

        <p>
          Pada analogi lemon, di tahap ini kita sekadar mengingat data faktual: bentuknya oval, kulitnya kuning, rasanya asam, dan ada vitamin C di dalamnya. Ini adalah modal awal, tetapi jelas tidak boleh berhenti di sini.
        </p>
      </NoteSection>
    </div>

    <!-- Section 3 -->
    <div data-section-id="level-2-memahami">
      <NoteSection title="3. Level 2: Memahami (Understanding) — Rantai Pertanyaan 'Kenapa?'">
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
            <Play size={12} /> 3:41 Menanyakan Alasan di Balik Fakta
          </a>
        </div>

        <p>
          Banyak orang bangga berkata: <em>"Buat apa hafal kalau gak paham?"</em>. Memahami memang setingkat lebih tinggi daripada sekadar mengingat. Ciri seseorang mulai masuk ke level pemahaman adalah munculnya keberanian untuk bertanya <strong>"Kenapa?" (Why)</strong>:
        </p>

        <ul>
          <li><em>Kenapa jeruk lemon mengandung vitamin C?</em></li>
          <li><em>Kenapa vitamin C bagus untuk orang yang sedang mengalami penurunan imunitas tubuh?</em></li>
          <li><em>Kenapa buah-buahan yang kaya kandungan antioksidan sering kali memiliki pigmentasi warna kekuningan atau oranye?</em></li>
        </ul>

        <p>
          Ketika kita mengerti peran asam askorbat dalam sintesis kolagen dan perlindungan sel darah putih, kita tidak lagi sekadar menghafal label "lemon = sehat", melainkan memahami mekanisme biologis di baliknya.
        </p>
      </NoteSection>
    </div>

    <!-- Section 4 -->
    <div data-section-id="level-3-mengaplikasikan">
      <NoteSection title="4. Level 3: Mengaplikasikan (Applying) — Menurunkan Teori ke Praktik">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=4m04s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 4:04 Jangan Cuma Teori, Lakukan!
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
          Pengetahuan teoritis yang tersimpan di kepala tidak akan menghasilkan manfaat nyata jika tidak dipraktikkan. Pada level ini, seseorang mengambil ilmunya dan menerapkannya dalam tindakan fisik nyata.
        </p>

        <p>
          Dalam analogi lemon: kita membelah buah tersebut dengan pisau, memeras sarinya ke dalam air, lalu meminumnya saat flu atau menyajikannya ke anggota keluarga yang sedang tidak enak badan.
        </p>

        <Callout type="tip" title="Catatan Kritis">
          Banyak program kursus atau bootcamp berhenti di Level 3. Begitu peserta bisa menjalankan tutorial atau mempraktikkan resep langkah-demi-langkah, mereka dianggap sudah "ahli". Padahal di Taksonomi Bloom, <strong>Level 3 baru separuh perjalanan</strong>. Tiga level berikutnya adalah pembeda sejati antara seorang pelaksana teknis dan seorang inovator.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 5 -->
    <div data-section-id="level-4-menganalisa">
      <NoteSection title="5. Level 4: Menganalisa (Analyzing) — Membedah Pola & Komparasi Kritis">
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
          Esensi dari analisa adalah <strong>membedah struktur</strong> dan <strong>melakukan perbandingan objektif</strong>. Orang di level analisa tidak terpaku pada satu solusi tunggal; mereka mulai mempertanyakan:
        </p>

        <ul>
          <li><em>Apakah hanya jeruk lemon yang mengandung vitamin C? Bagaimana dengan kiwi, jambu biji, atau brokoli?</em></li>
          <li><em>Apakah di dalam lemon hanya ada vitamin C, atau ada kandungan asam sitrat, potassium, dan bioflavonoid?</em></li>
          <li><em>Berapa rasio kandungan vitamin C per 100 gram antara lemon dibandingkan sumber nutrisi lainnya?</em></li>
        </ul>

        <p>
          Dengan menganalisis, kita menyadari bahwa rasa masam pada lemon sebagian besar dipicu oleh asam sitrat, bukan murni vitamin C. Kita juga menemukan bahwa jambu biji merah memiliki konsentrasi vitamin C yang jauh lebih padat dibanding lemon. Kita mulai melihat gambaran sistemik secara utuh.
        </p>
      </NoteSection>
    </div>

    <!-- Section 6 -->
    <div data-section-id="level-5-mengevaluasi">
      <NoteSection title="6. Level 5: Mengevaluasi (Evaluating) — Menemukan Celah & Batasan Solusi">
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
            <Play size={12} /> 7:01 Kerapuhan Vitamin C Alami
          </a>
        </div>

        <p>
          Setelah membandingkan data pada tahap analisa, tahap berikutnya adalah <strong>mengevaluasi</strong>: menilai kelebihan, kekurangan, efektivitas, serta risiko dari metode yang ada saat ini.
        </p>

        <p>
          Ketika mengevaluasi konsumsi air perasan lemon murni, kita menemukan beberapa kelemahan nyata:
        </p>
        <ol>
          <li><strong>Inefisiensi Dosis:</strong> Untuk mencapai dosis terapi 500–1000 mg vitamin C, kita harus memeras puluhan buah lemon, yang mana sangat tidak praktis.</li>
          <li><strong>Risiko Keasaman (Acidity):</strong> Keasaman asam sitrat lemon yang pekat sangat berisiko mengiritasi dinding lambung bagi mereka yang memiliki riwayat maag atau GERD.</li>
          <li><strong>Ketidakstabilan Kimiawi:</strong> Vitamin C dalam cairan perasan sangat rentan rusak teroksidasi saat terpapar udara dan cahaya ruangan.</li>
        </ol>

        <p>
          Evaluasi kritis inilah yang menjadi <strong>pemicu utama lahirnya inovasi</strong>. Tanpa menemukan apa yang kurang dan apa yang gagal bekerja dari solusi saat ini, kita tidak akan pernah tahu ke arah mana perbaikan harus ditujukan.
        </p>
      </NoteSection>
    </div>

    <!-- Section 7 -->
    <div data-section-id="level-6-menciptakan">
      <NoteSection title="7. Level 6: Menciptakan (Creating) — Lahirnya Inovasi Solutif">
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
            <Play size={12} /> 8:04 Teknologi Farmasi Time-Release
          </a>
        </div>

        <p>
          Puncak dari Taksonomi Bloom adalah <strong>Menciptakan (Creating)</strong>: merajut seluruh wawasan kognitif dari tahapan sebelumnya untuk melahirkan solusi baru yang belum pernah ada, atau merekayasa perbaikan yang menambal semua kelemahan pada tahap evaluasi.
        </p>

        <p>
          Di dunia farmasi, hasil evaluasi terhadap kelemahan sari lemon melahirkan inovasi konkret:
        </p>
        <ul>
          <li><strong>Sintesis Garam Askorbat (Ester-C):</strong> Mengubah bentuk asam menjadi garam kalsium askorbat dengan pH netral, sehingga penderita maag dapat mengonsumsi vitamin C dosis tinggi tanpa mual.</li>
          <li><strong>Teknologi Time-Release Capsule:</strong> Merancang mikrokapsul dengan lapisan larut bertahap (<em>sustained release</em>), sehingga vitamin C dilepaskan perlahan selama 8–12 jam di dalam usus, menjaga lambung dari lonjakan keasaman mendadak.</li>
        </ul>

        <p>
          Inovasi semacam ini tidak muncul dari ide liar yang tiba-tiba datang tanpa dasar, melainkan buah dari analisis dan evaluasi yang sangat matang.
        </p>
      </NoteSection>
    </div>

    <!-- Section 8 -->
    <div data-section-id="jebakan-lompat-tahap">
      <NoteSection title="8. Perangkap Belajar: Sindrom Loncat Tahap & Budaya ATM Dangkal">
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
          Aditia Yudis menyoroti kekeliruan umum dalam metode pembelajaran kita: <strong>kebiasaan melompati tahapan</strong>.
        </p>

        <div class="note-quote-box">
          <p>
            Seseorang baru diajari <strong>menghafal</strong> teori, belum sempat benar-benar <strong>memahami</strong> tapi sudah buru-buru disuruh <strong>mempraktikkan</strong>. Baru saja selesai praktik, langsung dituntut: <em>"Ayo buat inovasi baru yang kreatif!"</em>.
          </p>
        </div>

        <p>
          Karena melewati tahap <strong>menganalisa</strong> dan <strong>mengevaluasi</strong>, apa yang dihasilkan?
          Keluaran yang terjadi akhirnya sekadar <strong>ATM (Amati, Tiru, Modifikasi) dangkal</strong>. Seseorang hanya meniru tampilan luar produk yang sedang populer, mengubah sedikit warna atau logonya, tanpa memahami kelemahan arsitektural di dalamnya. Ini bukan inovasi, melainkan replikasi kosmetik.
        </p>
      </NoteSection>
    </div>

    <!-- Section 9 -->
    <div data-section-id="studi-kasus-f15library">
      <NoteSection title="9. Studi Kasus F15library: Mengapa Membuat Platform, Bukan Buku?">
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
            <Play size={12} /> 9:46 Fase Analisis & Evaluasi
          </a>
          <a
            href="{videoBaseUrl}&t=10m14s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 10:14 Kelahiran F15library.com
          </a>
        </div>

        <p>
          Sebagai penutup, Aditia membagikan cerita pribadinya saat didorong banyak orang untuk menulis buku:
        </p>

        <blockquote class="simple-quote">
          "Mas Adit kan pintar berbicara dan wawasannya luas, bikin buku dong Mas! Pasti laris kalau Mas Adit yang nulis."
        </blockquote>

        <p>
          Alih-alih langsung tergiur melompat ke tahap <strong>Menciptakan (menulis buku baru)</strong> demi validasi atau status, ia menahan diri dan masuk ke tahap <strong>Menganalisa dan Mengevaluasi</strong>:
        </p>

        <ul>
          <li><strong>Audit Literatur:</strong> Jangan-jangan gagasan pengembangan diri atau bisnis yang ingin ia tulis sebenarnya sudah pernah ditulis oleh penulis kelas dunia dengan riset puluhan tahun yang jauh lebih komprehensif?</li>
          <li><strong>Pertanyaan Nilai Tambah:</strong> Jika ia menulis buku dengan topik yang persis sama, apakah karyanya akan lebih baik dari buku-buku referensi utama tersebut? Jika tidak, menulis buku baru hanyalah pemborosan waktu yang menghasilkan karya redundan.</li>
          <li><strong>Mencari Kebutuhan Riil:</strong> Masalah nyata masyarakat kita bukan kekurangan buku berkualitas, melainkan keterbatasan waktu membaca dan kendala bahasa untuk buku-buku luar negeri yang belum diterjemahkan.</li>
        </ul>

        <p>
          Dari hasil evaluasi tersebut, lahirlah <strong>F15library.com</strong>: sebuah platform yang merangkum 2.000+ buku <em>bestseller</em> dunia ke dalam intisari 15 menit berbahasa Indonesia (teks dan audio), dapat diakses gratis tanpa perlu registrasi atau login. Ini adalah contoh konkret tindakan <em>Creating</em> yang berlandaskan analisis dan evaluasi yang jujur.
        </p>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <!-- Kuis Kilat -->
  <NoteSection title="Uji Pemahaman: Kuis Kilat Taksonomi Bloom">
    <p>
      Uji intuisi kognitif Anda mengenai hierarki Taksonomi Bloom dan proses pembelajaran melalui kuis ringkas berikut:
    </p>
    <Quiz title="Kuis Taksonomi Bloom & Mindset Belajar" questions={quizQuestions} />
  </NoteSection>

  <!-- Summary Callout -->
  <Callout type="tip" title="Poin Penting untuk Diingat">
    <ol>
      <li><strong>Hafalan Bukan Musuh:</strong> Menghafal adalah fondasi kosa kata mental; kuasai fakta dasar tanpa rasa gengsi.</li>
      <li><strong>Tanyakan Alasan:</strong> Selalu gali pertanyaan <em>"Kenapa hal ini terjadi?"</em> agar masuk ke level pemahaman.</li>
      <li><strong>Uji Lewat Praktik:</strong> Terapkan konsep ke tindakan nyata agar teori tidak mengendap sia-sia.</li>
      <li><strong>Bandingkan Alternatif:</strong> Lakukan komparasi objektif untuk melihat kelebihan dan kekurangan berbagai pendekatan.</li>
      <li><strong>Evaluasi Batasan:</strong> Cari titik lemah dari solusi yang ada sebagai bahan bakar perbaikan.</li>
      <li><strong>Ciptakan Solusi Nyata:</strong> Inovasi bermakna lahir dari hasil evaluasi yang jujur, bukan sekadar plagiasi instan.</li>
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
