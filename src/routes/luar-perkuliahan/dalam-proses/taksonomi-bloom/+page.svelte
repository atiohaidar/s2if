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
    { title: 'Intro: Belajar Belasan Tahun & Ilmu Gak Kepakai', time: '0:00', seconds: 0 },
    { title: 'Level 1: Menghafal (Remembering) & Jeruk Lemon', time: '1:43', seconds: 103 },
    { title: 'Level 2: Memahami (Understanding) - Tanya Kenapa?', time: '3:21', seconds: 201 },
    { title: 'Level 3: Mengaplikasikan (Applying) - Praktik Perasan Lemon', time: '4:04', seconds: 244 },
    { title: 'Level 4: Menganalisa (Analyzing) - Membanding-bandingkan', time: '5:25', seconds: 325 },
    { title: 'Level 5: Mengevaluasi (Evaluating) - Kritis Mengukur Limitasi', time: '6:24', seconds: 384 },
    { title: 'Level 6: Menciptakan (Creating) - Ester-C & Time Capsule', time: '7:21', seconds: 441 },
    { title: 'Perangkap Belajar: Sindrom Loncat Tahap & Budaya ATM', time: '8:25', seconds: 505 },
    { title: 'Studi Kasus: Mengapa F15library, Bukan Nulis Buku?', time: '9:25', seconds: 565 }
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
      question: 'Menurut pemaparan video, mengapa menghafal (Level 1) tetap dianggap sebagai pondasi yang baik dalam Taksonomi Bloom?',
      options: [
        'Karena sistem ujian sekolah mewajibkan nilai hafalan tinggi',
        'Karena menghafal adalah dasar pertama dari pendidikan untuk mengenal fakta awal sebelum bisa memahami atau menganalisis lebih jauh',
        'Karena orang yang hafal otomatis pasti paham penerapannya',
        'Karena otak kita sebaiknya hanya difokuskan untuk mengingat rumus'
      ],
      correctIndex: 1,
      explanation:
        'Di dalam video dijelaskan bahwa menghafal adalah dasar pertamanya pendidikan. Menghafal itu bagus dan penting sebagai pintu masuk, asalkan kita tidak berhenti hanya di level tersebut.'
    },
    {
      question: 'Dalam analogi jeruk lemon, pertanyaan manakah yang menandakan seseorang mulai berpindah ke tahap "Memahami" (Level 2)?',
      options: [
        'Berapa harga satu kilogram jeruk lemon di pasar?',
        'Kenapa jeruk lemon mengandung vitamin C dan kenapa vitamin C bagus untuk orang yang imunitasnya rendah?',
        'Apakah buah kiwi juga mengandung vitamin C sebanyak lemon?',
        'Bagaimana cara memeras lemon agar airnya tidak muncrat?'
      ],
      correctIndex: 1,
      explanation:
        'Ciri khas Level 2 (Memahami) adalah berani bertanya "Kenapa?" (Why) di balik fakta yang dihafal, seperti menggali alasan mengapa lemon mengandung vitamin C dan khasiatnya bagi imunitas.'
    },
    {
      question: 'Bagaimana teknologi kapsul Time-Release dan Ester-C lahir sebagai representasi tahap "Menciptakan" (Level 6)?',
      options: [
        'Lahir secara kebetulan tanpa melalui riset dan eksperimen',
        'Lahir dari hasil evaluasi bahwa air perasan lemon terlalu asam untuk penderita maag dan mudah teroksidasi, sehingga dirancang bentuk sediaan baru yang melepaskan vitamin secara bertahap',
        'Dibuat hanya untuk menaikkan harga jual buah lemon di pasaran',
        'Dibuat agar orang tidak perlu lagi makan buah-buahan segar'
      ],
      correctIndex: 1,
      explanation:
        'Menciptakan (Creating) adalah solusi atas evaluasi: penderita maag tidak tahan asam lemon pekat dan vitamin C mudah rusak. Maka dirancang inovasi turunan (Ester-C) dan kapsul time-release yang larut perlahan di lambung.'
    },
    {
      question: 'Mengapa Aditia Yudis memilih membangun F15library.com daripada langsung menulis buku baru saat disuruh audiensnya?',
      options: [
        'Karena biaya percetakan buku di Indonesia terlalu mahal',
        'Karena melalui tahap analisis dan evaluasi, ia menyadari jangan-jangan konsep yang ingin ia tulis sudah pernah ditulis orang lain dengan lebih lengkap, sehingga merangkum 2.000+ buku terbaik dunia jauh lebih bermanfaat',
        'Karena ia belum memiliki ide tulisan sama sekali',
        'Karena membuat website lebih cepat selesai daripada menulis satu bab buku'
      ],
      correctIndex: 1,
      explanation:
        'Sebelum terburu-buru menciptakan (nulis buku), ia menganalisa & mengevaluasi: jika konsepnya sudah ditulis orang lain dengan lebih bagus, ngapain buang waktu menulis hal yang sama persis? Solusi inovatifnya adalah membuat platform rangkuman 15 menit.'
    }
  ];
</script>

<svelte:head>
  <title>Taksonomi Bloom: Dari Menghafal ke Menciptakan - S2IF Notebook</title>
  <meta
    name="description"
    content="Bedah materi Taksonomi Bloom berdasarkan pemaparan Aditia Yudis (GBLK Project): paradoks hafalan belasan tahun sekolah, analogi jeruk lemon di 6 level kognitif, bahaya jebakan ATM tanpa analisis, hingga studi kasus lahirnya F15library.com."
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
    Catatan ini disusun berdasarkan video monolog <strong>Aditia Yudis</strong> pada kanal <em>GBLK PROJECT (#45)</em>:
    <strong>"From Rote Memorization to Creation: How Deep Do You Actually Learn?"</strong>.
    Video lengkap dapat disimak melalui tautan
    <a href="https://www.youtube.com/watch?v=ImHHBUkFmo8" target="_blank" rel="noopener noreferrer">
      YouTube Aditia Yudis (GBLK PROJECT #45)
    </a>. Gunakan panel video di sebelah kanan untuk menyimak pembahasan secara sinkron.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <!-- Section 1 -->
    <div data-section-id="paradoks-belajar">
      <NoteSection title="1. Paradoks Belasan Tahun Belajar: Mengapa Semua Ilmu Terasa 'Kagak Kepakai'?">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m0s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:00 Belajar Berbelas-belas Tahun
          </a>
          <a
            href="{videoBaseUrl}&t=0m51s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:51 Rutinitas Sekolah yang Ketat
          </a>
        </div>

        <p>
          Bayangkan perjalanan hidup kita sejak kecil: kita hanya diberi jeda hidup bebas dari umur 0 pas lahir sampai umur 3 atau 4 tahun. Masuk umur 5 tahun, kita sudah harus TK, lanjut TKB, lalu langsung masuk SD.
        </p>

        <p>
          Setiap pagi kita datang, berbaris rapi di depan kelas, harus angkat tangan bilang <em>"Bu, izin ke toilet..."</em>, mendengar bunyi lonceng <em>kling-kling-kling</em>, ditegur kalau dasi kurang kencang atau rok di atas lutut. Dan rutinitas serba patuh itu kita jalani selama <strong>12 tahun</strong> penuh (SD, SMP, SMA) dari umur 5 sampai 17 tahun. Setelah lulus dari situ pun kita masih kuliah lagi bertahun-tahun, seakan-akan kita masih kurang belajar.
        </p>

        <p>
          Tapi selama belasan tahun belajar itu, kenapa tiba-tiba pas masuk dunia kerja nyata, hampir semua ilmu yang kita pelajari terasa <strong>kagak kepakai</strong>? Apa sih sebenarnya yang salah?
        </p>

        <Callout type="warning" title="Penyebab Utama">
          Yang salah adalah selama belasan tahun sekolah (TK, SD, SMP, SMA, hingga kuliah), otak kita <strong>fokus cuma di level pertama pembelajaran: Menghafal</strong>.
        </Callout>

        <p>
          Isi memori kita dijejali pertanyaan-pertanyaan hafalan:
        </p>
        <ul>
          <li><em>"Apa bedanya tumbuhan monokotil dan dikotil?"</em></li>
          <li><em>"Apa bedanya akar serabut dan akar tunggang?"</em></li>
          <li><em>"Binatang apa saja yang ovipar, vivipar, dan ovovivipar?"</em></li>
          <li><em>"Apa bedanya kingdom animalia, plantae, dan fungi?"</em></li>
          <li><em>"Sebutkan prasasti yang ditandatangani pada tahun sekian!"</em></li>
        </ul>

        <p>
          Apakah menghafal itu boleh dan bagus? Bagus! Itu memang <strong>dasar pertamanya pendidikan</strong>. Tapi masalahnya, jangan berhenti cuma sampai di situ. Kapan pintarnya otak kita kalau cuma dipakai untuk menghafal? Inilah yang dijelaskan dalam <strong>Taksonomi Bloom</strong> yang memiliki 6 tingkatan belajar.
        </p>
      </NoteSection>
    </div>

    <!-- Ringkasan Tabel Taksonomi Bloom -->
    <NoteSection title="Peta 6 Tingkatan Taksonomi Bloom (Berdasarkan Analogi Jeruk Lemon)">
      <p>
        Untuk menjelaskan 6 tingkatan kognitif ini secara runut, Aditia Yudis menggunakan studi kasus buah <strong>Jeruk Lemon</strong> hingga lahirnya inovasi farmasi:
      </p>

      <div class="table-container">
        <table class="notebook-table">
          <thead>
            <tr>
              <th style="width: 12%;">Tingkat</th>
              <th style="width: 22%;">Tahapan Kognitif</th>
              <th style="width: 32%;">Pertanyaan & Tindakan Kunci</th>
              <th style="width: 34%;">Analogi Jeruk Lemon (Sesuai Script Video)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Level 6</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menciptakan</strong> (Creating)
              </td>
              <td>Merancang sesuatu yang baru untuk memecahkan masalah hasil evaluasi.</td>
              <td>Merancang ekstrak lemon menjadi bentuk turunan (<strong>Ester-C</strong> yang tidak asam di lambung) atau kapsul <strong>Time Capsule</strong> yang rilisnya bertahap.</td>
            </tr>
            <tr>
              <td><strong>Level 5</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Mengevaluasi</strong> (Evaluating)
              </td>
              <td>Mulai mengkritisi kelebihan, kekurangan, dan batas efektivitas.</td>
              <td>Menilai bahwa perasan lemon efektif, tapi airnya terlalu banyak untuk vitamin C yang sedikit, mudah teroksidasi, dan asamnya bikin sakit maag.</td>
            </tr>
            <tr>
              <td><strong>Level 4</strong></td>
              <td>
                <span class="tag-hot">HOT</span>
                <strong>Menganalisa</strong> (Analyzing)
              </td>
              <td>Mulai membanding-bandingkan dan membedah struktur.</td>
              <td>Mempertanyakan: apakah cuma lemon yang ada vitamin C? Apakah ada buah lain? Apakah di dalam lemon cuma ada vitamin C saja?</td>
            </tr>
            <tr>
              <td><strong>Level 3</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Mengaplikasikan</strong> (Applying)
              </td>
              <td>Jangan cuma teori, praktikkan ilmunya secara langsung!</td>
              <td>Jeruk lemon dibelah, diperas sarinya, lalu diminum sendiri atau diberikan ke orang yang sedang drop imunitasnya.</td>
            </tr>
            <tr>
              <td><strong>Level 2</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Memahami</strong> (Understanding)
              </td>
              <td>Mencari alasan sebab-akibat dengan bertanya <em>"Kenapa?"</em>.</td>
              <td>Bertanya: kenapa lemon mengandung vitamin C? Kenapa vitamin C bagus untuk imunitas tubuh? Kenapa rata-rata buah ber-vitamin C warnanya kekuningan?</td>
            </tr>
            <tr>
              <td><strong>Level 1</strong></td>
              <td>
                <span class="tag-lot">LOT</span>
                <strong>Menghafal</strong> (Remembering)
              </td>
              <td>Mengingat fakta mentah dan karakteristik awal.</td>
              <td>Menghafal ciri lemon: warnanya kuning, bentuknya oval/lonjong, rasanya asam, dan mengandung nutrisi vitamin C.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteSection>

    <!-- Section 2 -->
    <div data-section-id="level-1-menghafal">
      <NoteSection title="2. Level 1: Menghafal (Remembering) — Analogi Jeruk Lemon">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=1m43s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:43 Menghafal sebagai Langkah Pertama
          </a>
          <a
            href="{videoBaseUrl}&t=2m43s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 2:43 Fakta Dasar Jeruk Lemon
          </a>
        </div>

        <p>
          Menghafal adalah fase pembelajaran mendasar yang paling awal. Kalau kita sedang menghafalkan tentang jeruk lemon, apa saja fakta yang kita hafalkan?
        </p>

        <ul>
          <li>Jeruk lemon itu rasanya asem.</li>
          <li>Jeruk lemon itu warnanya kuning.</li>
          <li>Jeruk lemon itu bentuknya oval / lonjong.</li>
          <li>Jeruk lemon itu mengandung vitamin C.</li>
        </ul>

        <p>
          Ketika seseorang bisa menyebutkan fakta-fakta ini saat ditanya, itu artinya dia sedang <strong>menghafal</strong>.
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
            <Play size={12} /> 3:41 Bertanya 'Kenapa?' Berulang Kali
          </a>
        </div>

        <p>
          Di masyarakat, sering ada kelompok orang yang anti-menghafal dan berkata: <em>"Buat apa hafal kalau tidak paham? Yang penting mah paham intisarinya yang bakal kepakai dalam hidup!"</em>.
        </p>

        <p>
          Di Taksonomi Bloom, pemahaman memang berada persis di atas menghafal. Setelah hafal, tingkatan berikutnya adalah <strong>memahami</strong>. Cara menguji apakah kita sudah paham adalah dengan bertanya <strong>"Kenapa?"</strong> berulang kali:
        </p>

        <ul>
          <li><em>"Kenapa jeruk lemon tadi lu hafal mengandung vitamin C?"</em></li>
          <li><em>"Kenapa vitamin C bagus untuk orang yang sedang rendah imunitasnya?"</em></li>
          <li><em>"Kenapa vitamin C bagus?"</em></li>
          <li><em>"Kenapa rata-rata buah yang mengandung vitamin C warnanya kekuning-kuningan?"</em></li>
        </ul>

        <p>
          Ketika kita mulai mencari tahu alasan di balik hal-hal tersebut, di situlah kita sedang belajar memahami. Tapi ingat, jangan berhenti cuma sampai paham!
        </p>
      </NoteSection>
    </div>

    <!-- Section 4 -->
    <div data-section-id="level-3-mengaplikasikan">
      <NoteSection title="4. Level 3: Mengaplikasikan (Applying) — Praktik Langsung Perasan Lemon">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=4m04s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 4:04 Jangan Cuma Teori Doang, Lakuin!
          </a>
          <a
            href="{videoBaseUrl}&t=4m26s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 4:26 Memeras & Meminum Sari Lemon
          </a>
        </div>

        <p>
          Setelah menghafal dan memahami, langkah selanjutnya yang semua orang tahu adalah: <strong>dilakukan (dipraktikkan)</strong>! Jangan cuma berhenti di teori di kepala, tapi lakuin dong.
        </p>

        <p>
          Bagaimana contoh mengaplikasikannya?
          Kita belajar bahwa jeruk lemon itu mengandung cairan di dalamnya yang bisa dibelah dan diperas. Air hasil perasan ini namanya sari lemon, dan sari lemon berguna untuk meningkatkan imunitas tubuh.
        </p>

        <p>
          Maka kita langsung mempraktikkan teorinya: buah lemon kita belah, kita peras sarinya, kita minum sendiri, atau kita suruh orang yang imunitasnya lagi drop untuk minum air perasan tersebut. Itu namanya <strong>mempraktikkan / mengaplikasikan</strong>.
        </p>

        <Callout type="tip" title="Catatan dari Video">
          Aditia Yudis mengingatkan: <em>"Ini gua baru sebut 3 tahap, padahal Taksonomi Bloom ada 6 tahap. Dan kita bahkan di level mengaplikasikan itu aja udah jarang banget, kebanyakan masih mandek di menghafal!"</em>.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 5 -->
    <div data-section-id="level-4-menganalisa">
      <NoteSection title="5. Level 4: Menganalisa (Analyzing) — Membanding-bandingkan">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=5m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:25 Menganalisa Berarti Membandingkan
          </a>
          <a
            href="{videoBaseUrl}&t=5m55s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:55 Eksplorasi Alternatif Sumber Vitamin C
          </a>
        </div>

        <p>
          Di atas mengaplikasikan atau melakukan, tahap berikutnya adalah <strong>menganalisa</strong>.
        </p>

        <p>
          Orang yang menganalisa itu cirinya <strong>selalu membandingkan</strong>:
        </p>

        <div class="note-quote-box">
          <p>
            "Oke, jeruk lemon tadi saya sudah hafal: bentuknya oval, warnanya kuning, mengandung vitamin C. Saya sudah mulai memahami: vitamin C berguna untuk meningkatkan imunitas tubuh. Saya juga sudah mulai mengaplikasikan: cairannya diperas dan diminum.
            <strong>Tapi pertanyaan saya: apakah hanya jeruk lemon yang mengandung vitamin C? Apakah ada buah-buahan lain? Apakah hanya buah-buahan yang mengandung vitamin C? Dan apakah hanya ada vitamin C di dalam jeruk lemon?</strong>"
          </p>
        </div>

        <p>
          Di tahap analisa, kita mulai membanding-bandingkan dan mencari tahu:
        </p>
        <ul>
          <li>Ternyata bukan cuma vitamin C yang ada di dalam jeruk lemon.</li>
          <li>Ternyata vitamin C juga bisa didapatkan dari buah-buahan lain dan berbagai jenis makanan lainnya.</li>
        </ul>
      </NoteSection>
    </div>

    <!-- Section 6 -->
    <div data-section-id="level-5-mengevaluasi">
      <NoteSection title="6. Level 5: Mengevaluasi (Evaluating) — Mulai Mengkritisi Solusi">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=6m24s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 6:24 Mengevaluasi & Mengkritisi
          </a>
          <a
            href="{videoBaseUrl}&t=7m01s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 7:01 Kerapuhan & Masalah Jeruk Lemon
          </a>
        </div>

        <p>
          Setelah selesai menganalisa dan membandingkan, tahap berikutnya adalah <strong>mengevaluasi</strong>. Mengevaluasi itu gimana? Kita <strong>mulai mengkritisi</strong>:
        </p>

        <ol>
          <li>
            <strong>Volume Cairan Terlalu Banyak:</strong> Jeruk lemon memang efektif, tapi airnya itu terlalu banyak untuk kandungan vitamin C yang sebenarnya cuma sedikit.
          </li>
          <li>
            <strong>Mudah Teroksidasi:</strong> Jeruk lemon akan sangat mudah teroksidasi oleh udara bebas jika dibiarkan dalam bentuk air perasan.
          </li>
          <li>
            <strong>Tidak Ramah Asam Lambung:</strong> Keasaman sari lemon murni sangat berisiko menyakiti lambung orang yang memiliki penyakit maag atau asam lambung.
          </li>
        </ol>

        <p>
          Dari hasil perbandingan dan evaluasi ini, kita mulai berpikir: <em>"Berarti vitamin C itu efektif, tapi tidak harus dalam bentuk air perasan buah yang besar. Vitamin C bisa diekstrak!"</em>. Tapi gimana cara mengekstraknya agar tetap aman diminum? Pertanyaan evaluasi ini membawa kita ke level tertinggi.
        </p>
      </NoteSection>
    </div>

    <!-- Section 7 -->
    <div data-section-id="level-6-menciptakan">
      <NoteSection title="7. Level 6: Menciptakan (Creating) — Lahirnya Ester-C & Time Capsule">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=7m21s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 7:21 Menciptakan Sesuatu yang Baru
          </a>
          <a
            href="{videoBaseUrl}&t=8m04s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:04 Teknologi Kapsul Time-Release
          </a>
        </div>

        <p>
          Di level paling tinggi dalam Taksonomi Bloom, kita <strong>menciptakan sesuatu yang baru</strong>.
        </p>

        <p>
          Dari hasil evaluasi tadi, kita merancang solusi inovatif:
        </p>

        <div class="note-quote-box">
          <p>
            <em>"Saya mau merancang bagaimana caranya air jeruk lemon itu bisa diekstrak jadi kapsul yang rasa asamnya tidak menyakiti lambung orang yang punya asam lambung (maag). Jadi gimana caranya orang yang gampang sakit maag tetap bisa minum vitamin C?"</em>
          </p>
        </div>

        <p>
          Dari proses berpikir inilah lahir inovasi produk nyata:
        </p>
        <ul>
          <li><strong>Turunan Vitamin C (Ester-C):</strong> Mengubah bentuk vitamin C menjadi turunannya sehingga tidak bersifat asam di lambung.</li>
          <li><strong>Teknologi Time Capsule:</strong> Kapsul yang di dalamnya berisi butiran-butiran bulat kecil. Ketika masuk ke dalam lambung, pelepasan vitaminnya terjadi pelan-pelan (<em>sustained release</em>) agar lambung tidak kaget, tidak syok oleh asam mendadak, dan tidak memicu rasa sakit.</li>
        </ul>

        <p>
          Itulah hasil sejati dari sebuah proses pembelajaran lengkap: dari menghafal, memahami, mempraktikkan, menganalisa, mengevaluasi, hingga menciptakan!
        </p>
      </NoteSection>
    </div>

    <!-- Section 8 -->
    <div data-section-id="jebakan-lompat-tahap">
      <NoteSection title="8. Perangkap Belajar: Sindrom Loncat Tahap & Terjebak Budaya ATM">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:25 Mengapa Orang Kita Gak Kreatif?
          </a>
          <a
            href="{videoBaseUrl}&t=8m55s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:55 Jebakan ATM Tanpa Analisis & Evaluasi
          </a>
        </div>

        <p>
          Jangan heran kenapa banyak orang di sekitar kita sering bingung dan tidak kepikiran ide kreatif. Menurut Aditia Yudis, penyebabnya adalah <strong>kebiasaan belajar yang suka loncat tahap</strong>:
        </p>

        <div class="simple-quote">
          "Lu disuruh hafal dulu. Belum paham, lu udah disuruh praktikin. Habis praktik, lu langsung disuruh bikin yang baru. Ya pantesan aja cuman ATM (Amati, Tiru, Modifikasi) terus! Kapan mau jadi inovasi baru?"
        </div>

        <p>
          Banyak orang baru belajar mempraktikkan tutorial, belum sempat <strong>menganalisa</strong>, belum sempat <strong>mengevaluasi</strong> kekurangannya, sudah langsung dituntut bikin inovasi baru.
        </p>

        <Callout type="warning" title="Inovasi Bukan Tiba-tiba Muncul">
          Inovasi atau <em>creative thinking</em> itu bukan hasil dari ide yang tiba-tiba berbunyi <em>"dring!"</em> dari langit. Inovasi adalah hasil dari menganalisa dulu dan mempelajari dulu apa yang sudah pernah ada di dunia.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 9 -->
    <div data-section-id="studi-kasus-f15library">
      <NoteSection title="9. Studi Kasus Pribadi Aditia Yudis: Mengapa Membikin F15library.com, Bukan Buku?">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=9m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 9:25 Disuruh Bikin Buku
          </a>
          <a
            href="{videoBaseUrl}&t=9m46s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 9:46 Analisis: Jangan Tulis Hal yang Sama
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
          Di penutup videonya, Aditia membagikan contoh nyata saat orang-orang di sekitarnya mendorong dia:
        </p>

        <div class="simple-quote">
          "Mas Adit kan pintar ngomong, bikin buku dong Mas Adit! Pasti bagus deh kalau Mas Adit bikin buku."
        </div>

        <p>
          Tapi kenapa bukannya bikin buku, dia malah membuat <strong>F15library.com</strong>?
        </p>

        <p>
          Banyak orang heran: <em>"Aneh ya Mas Adit, disuruh bikin buku kok malah bikin perpustakaan? Kan bukan karya sendiri kalau perpustakaan..."</em>.
        </p>

        <p>
          Aditia menjelaskan bahwa dia sedang menjalani tahap <strong>menganalisa dan mengevaluasi</strong>:
        </p>

        <div class="note-quote-box">
          <p>
            "Jangan-jangan semua konsep yang mau saya bikin jadi buku itu sebenarnya sudah pernah ditulis orang lain? Ngapain saya tulis dua kali kalau tulisan saya tidak lebih lengkap dan tidak lebih bagus daripada yang pernah mereka tulis? <strong>Sebelum kamu nulis buku, pastiin dulu konsep kamu ini tidak pernah ditulis orang. Kalau enggak, ngapain buang waktu nulis hal yang sama persis?</strong>"
          </p>
        </div>

        <p>
          Karena itulah ia mendirikan <strong>F15library.com</strong>: sebuah tempat di mana lebih dari <strong>2.000 buku bestseller dunia</strong> dirangkum intisarinya agar bisa selesai dibaca dalam waktu 15 menit berbahasa Indonesia. Bahkan disediakan format <em>audiobook</em> gratis tanpa perlu login dan tanpa perlu bikin akun.
        </p>

        <p>
          Itulah contoh konkret penerapan Taksonomi Bloom: sebelum terburu-buru menciptakan sesuatu (level 6), lakukan analisa dan evaluasi (level 4 & 5) secara mendalam agar karya yang kita ciptakan benar-benar punya nilai baru!
        </p>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <!-- Kuis Kilat -->
  <NoteSection title="Uji Pemahaman: Kuis Kilat Taksonomi Bloom">
    <p>
      Uji seberapa baik Anda menangkap pesan dari analogi jeruk lemon dan studi kasus Aditia Yudis melalui kuis singkat berikut:
    </p>
    <Quiz title="Kuis Kilat Taksonomi Bloom (GBLK Project)" questions={quizQuestions} />
  </NoteSection>

  <!-- Summary Callout -->
  <Callout type="tip" title="Pesan Intisari Video">
    <ol>
      <li><strong>Menghafal itu Bagus:</strong> Menghafal adalah dasar pertama pendidikan, tetapi jangan berhenti hanya di situ.</li>
      <li><strong>Tanyakan 'Kenapa?':</strong> Masuk ke level pemahaman dengan selalu menggali alasan kausalitas di balik fakta.</li>
      <li><strong>Praktikkan:</strong> Jangan biarkan ilmu cuma jadi teori di kepala; peras dan aplikasikan sarinya.</li>
      <li><strong>Bandingkan (Analisa):</strong> Selalu bandingkan dengan alternatif lain agar melihat gambaran yang lebih luas.</li>
      <li><strong>Kritisi (Evaluasi):</strong> Temukan kelemahan dan keterbatasan solusi yang ada saat ini.</li>
      <li><strong>Ciptakan Inovasi:</strong> Rancang solusi baru (seperti Ester-C dan kapsul time-release) yang menambal kelemahan dari hasil evaluasi.</li>
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
