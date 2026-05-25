<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import VideoSidebar from '$lib/components/VideoSidebar.svelte';
  import VideoSyncArticle from '$lib/components/VideoSyncArticle.svelte';
  import { Play } from 'lucide-svelte';

  const videoBaseUrl = 'https://www.youtube.com/watch?v=bMvk3uwuTTg';

  let videoSidebar: VideoSidebar;

  const chapters = [
    { title: 'Intro: Semangat Berbagi & Belajar', time: '0:16', seconds: 16 },
    { title: 'Tema CIAS Innovation Week: Everyone Can Innovate', time: '3:32', seconds: 212 },
    { title: 'Waiting Mode vs Innovation Mode', time: '19:31', seconds: 1171 },
    { title: 'Inovasi Bukan Hanya Soal Teknologi Canggih', time: '23:45', seconds: 1425 },
    { title: 'Workplace Innovation: Menyelesaikan Masalah Sehari-hari', time: '28:51', seconds: 1731 },
    { title: 'Menjadi Bagian dari Solusi di Tengah Krisis', time: '34:06', seconds: 2046 },
    { title: 'Inovasi Lahir dari Masalah & Tantangan (3 Langkah Mudah)', time: '42:05', seconds: 2525 },
    { title: 'Langkah 1: Identifikasi Masalah Pelanggan', time: '45:01', seconds: 2701 },
    { title: 'Langkah 2: Propose New Solution (Value & Adopsi)', time: '52:39', seconds: 3159 },
    { title: 'Langkah 3: Iterasi & Feedback Loop Terus-Menerus', time: '55:24', seconds: 3324 },
    { title: 'Q&A: Mengelola Risiko & Politik Korporasi', time: '58:03', seconds: 3483 },
    { title: 'Q&A: Belajar dari Kegagalan Lego (Inovasi Butuh "Kotak")', time: '1:17:19', seconds: 4639 }
  ];

  const sectionMap = [
    { id: 'pendahuluan-tema', startSeconds: 16, endSeconds: 1170 },
    { id: 'waiting-vs-innovation', startSeconds: 1171, endSeconds: 1424 },
    { id: 'definisi-inovasi', startSeconds: 1425, endSeconds: 1730 },
    { id: 'workplace-innovation', startSeconds: 1731, endSeconds: 2045 },
    { id: 'bagian-dari-solusi', startSeconds: 2046, endSeconds: 2524 },
    { id: 'tiga-langkah-mudah', startSeconds: 2525, endSeconds: 3482 },
    { id: 'tanya-jawab-inovasi', startSeconds: 3483, endSeconds: 5000 }
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
    } else {
      const hoursMatch = href.match(/t=(\d+)h(\d+)m(\d+)s/);
      if (hoursMatch) {
        event.preventDefault();
        const totalSeconds = parseInt(hoursMatch[1]) * 3600 + parseInt(hoursMatch[2]) * 60 + parseInt(hoursMatch[3]);
        videoSidebar?.seekTo(totalSeconds);
      }
    }
  }
</script>

<svelte:head>
  <title>Cara Berinovasi dengan Mudah bersama Dr. Indrawan Nugroho - S2IF Notebook</title>
  <meta
    name="description"
    content="Panduan praktis berinovasi di era transisi pasca-pandemi: mendefinisikan ulang inovasi, workplace innovation, dan tiga langkah praktis (identifikasi problem, solusi bernilai, iterasi/feedback loop)."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Cara Berinovasi dengan Mudah"
    date="25 Mei 2026"
    status="wip"
    tags={['Inovasi', 'Mindset', 'Kreativitas', 'Bisnis']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini dirangkum berdasarkan pemaparan inspiratif oleh <strong>Dr. Indrawan Nugroho</strong> (Co-founder & CEO CIAS) pada sesi pembuka acara
    <em>CIAS Innovation Week 2021</em> dengan tema <strong>"Everyone Can Innovate"</strong>. Video lengkap dapat disimak di
    <a href="https://www.youtube.com/watch?v=bMvk3uwuTTg" target="_blank" rel="noopener noreferrer">YouTube Dr. Indrawan Nugroho</a>.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <div data-section-id="pendahuluan-tema">
      <NoteSection title="1. Pendahuluan & Semangat 'Everyone Can Innovate'">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m16s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:16 Semangat Belajar & Berbagi
          </a>
          <a
            href="{videoBaseUrl}&t=3m32s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 3:32 Tema: Everyone Can Innovate
          </a>
        </div>
        <p>
          Dr. Indrawan Nugroho menyambut hangat ribuan peserta <strong>CIAS Innovation Week 2021</strong>. 
          Semangat belajar dan berbagi ini terus menyala di tengah tantangan besar yang dihadapi bangsa. 
          Krisis justru memicu lahirnya kreativitas, kolaborasi, dan kemauan luar biasa untuk berbenah diri.
        </p>
        <p>
          Tema besar yang diangkat adalah <strong>"Everyone Can Innovate"</strong> (Semua Orang Bisa Berinovasi). 
          Ada ketakutan umum di masyarakat bahwa inovasi hanya bisa dilakukan oleh orang-orang jenius, departemen R&D khusus, 
          atau mereka yang memiliki dana raksasa. CIAS Innovation Week mengajak kita semua untuk <strong>back to basic</strong> 
          (kembali ke dasar-dasar fundamental) agar setiap orang—mulai dari pimpinan korporasi, manajer, staf, pelaku UMKM, 
          hingga mahasiswa—percaya diri untuk berinovasi di lingkungan masing-masing.
        </p>
        <p>Ada tiga kategori subtema utama yang dibahas sepanjang acara ini:</p>
        <ul>
          <li><strong>Building Culture & Capability:</strong> Membangun budaya inovasi yang sehat dan menanamkan kapabilitas di dalam organisasi.</li>
          <li><strong>Agile Ways of Working:</strong> Mengadopsi cara kerja tangkas (agile) untuk mempercepat perwujudan ide.</li>
          <li><strong>Automation:</strong> Menggunakan otomasi sederhana untuk membebaskan manusia dari pekerjaan rutin/manual, sehingga bisa fokus melahirkan value sejati.</li>
        </ul>
      </NoteSection>
    </div>

    <div data-section-id="waiting-vs-innovation">
      <NoteSection title="2. Krisis sebagai Batas Reset Global: Waiting Mode vs Innovation Mode">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=19m31s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 19:31 Waiting Mode vs Innovation Mode
          </a>
        </div>
        <p>
          Pandemi dan krisis global bertindak sebagai batas seleksi alam bagi dunia bisnis. 
          Ada sebuah kebenaran mutlak: <strong>dunia tidak akan pernah kembali ke masa lalu</strong>. Batas seleksi ini memaksa semua entitas untuk direset kembali ke titik awal. 
          Perusahaan raksasa yang mendominasi pasar sebelum krisis belum tentu bisa mempertahankan kejayaannya jika tidak bergerak cepat. 
          Sebaliknya, krisis ini adalah peluang emas bagi UMKM atau pemula yang sebelumnya bukan siapa-siapa untuk melesat menjadi jawara baru di dunia baru.
        </p>
        <p>Dr. Indrawan memetakan manusia dalam menghadapi transisi ini ke dalam dua mode mentalitas:</p>
        <div class="mode-comparison">
          <div class="mode-card waiting">
            <h4>Waiting Mode (Survival Mode)</h4>
            <ul>
              <li>Cenderung menanti hingga krisis mereda dan berharap kondisi kembali seperti dulu.</li>
              <li>Menjalankan bisnis dengan cara operasional yang sama persis seperti sebelumnya.</li>
              <li>Hasilnya: Terjebak dalam lumpur stagnasi dan perlahan kehilangan relevansi di pasar.</li>
            </ul>
          </div>
          <div class="mode-card innovation">
            <h4>Innovation Mode (Growth Mode)</h4>
            <ul>
              <li>Menyambut transisi sebagai keniscayaan meskipun merepotkan dan berisiko tinggi.</li>
              <li>Aktif mencari cara-cara baru dalam berbisnis, melayani pelanggan, dan mengelola organisasi.</li>
              <li>Hasilnya: Berpeluang besar menjadi pemimpin pasar baru pasca-krisis karena kesiapan beradaptasi.</li>
            </ul>
          </div>
        </div>
      </NoteSection>
    </div>

    <div data-section-id="definisi-inovasi">
      <NoteSection title="3. Mendefinisikan Ulang Inovasi (Bukan Sekadar Teknologi Canggih)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=23m45s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 23:45 Salah Kaprah Mengenai Inovasi
          </a>
        </div>
        <p>
          Salah satu hambatan terbesar orang enggan berinovasi adalah anggapan bahwa inovasi harus berupa sesuatu yang sangat canggih dan futuristik. 
          Saat mendengar kata "inovasi", yang terbayang di kepala orang-orang seringkali adalah produk Apple yang indah, pembuatan aplikasi mobile yang rumit, 
          analisis big data, cloud computing, atau revolusi Industri 4.0.
        </p>
        <p>
          Dr. Indrawan menegaskan bahwa <strong>teknologi bukanlah inovasi itu sendiri</strong>. Teknologi hanyalah <em>tools</em> (alat bantu). 
          Ia menganalogikan teknologi dengan peralatan dapur seperti panci dan penggorengan. Memiliki wajan termahal tidak otomatis membuat seseorang menjadi chef bintang lima yang mampu menyajikan hidangan lezat.
        </p>
        <Callout type="tip" title="Definisi Sejati Inovasi">
          <strong>Inovasi adalah:</strong> Apapun tindakan atau perubahan yang Anda lakukan—baik dalam produk, jasa, proses, maupun cara kerja—yang memenuhi 3 kriteria utama:
          <ol>
            <li><strong>Baru/Berbeda:</strong> Memiliki perbedaan atau kebaruan dibanding cara lama.</li>
            <li><strong>Memberikan Value Tinggi:</strong> Berhasil menyelesaikan masalah nyata pelanggan atau memberikan manfaat yang besar.</li>
            <li><strong>Diadopsi (Dipakai):</strong> Solusi tersebut benar-benar digunakan secara nyata oleh pelanggan.</li>
          </ol>
        </Callout>
      </NoteSection>
    </div>

    <div data-section-id="workplace-innovation">
      <NoteSection title="4. Lahirnya Workplace Innovation di Tengah Disrupsi">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=28m51s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 28:51 Semua Orang Harus Berinovasi & Workplace Innovation
          </a>
        </div>
        <p>
          Dalam struktur korporasi tradisional, inovasi kerap dianggap sebagai monopoli departemen tertentu saja, seperti R&D atau Product Development. 
          Namun, di era dinamis saat ini, model tersebut sudah usang. Ketika krisis mendisrupsi seluruh lini bisnis secara mendadak, tidak mungkin solusi hanya dipikirkan oleh segelintir orang di jajaran direksi atau divisi khusus.
        </p>
        <p>
          Coronavirus memicu ledakan tipe inovasi baru yang disebut <strong>Workplace Innovation</strong> (Inovasi di Tempat Kerja). Ini adalah inovasi praktis berskala mikro hingga menengah yang lahir di lingkungan kerja sehari-hari untuk merespons perubahan situasi kerja yang mendadak (misalnya saat transisi ke WFH).
        </p>
        <Callout type="info" title="Contoh Workplace Innovation">
          Seorang manajer or staf di divisi <strong>Finance</strong> yang biasanya menyusun laporan keuangan manual dua minggu sekali. Di masa krisis, manajemen dituntut mengambil keputusan strategis harian yang sangat cepat. 
          Staf Finance tersebut berinovasi dengan memanfaatkan tools gratisan yang ada untuk membangun dashboard laporan keuangan <em>real-time</em> yang akurat dan mudah diakses kapan saja oleh pimpinan. Tindakan kecil ini adalah <strong>inovasi luar biasa</strong> yang menyelamatkan kelangsungan bisnis organisasi.
        </Callout>
      </NoteSection>
    </div>

    <div data-section-id="bagian-dari-solusi">
      <NoteSection title="5. Mati Lampu dan Dua Golongan Manusia: Menjadi Pahlawan Tengah Krisis">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=34m06s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 34:06 Analogi Mati Lampu & Membangun Kavling Pikiran
          </a>
        </div>
        <p>
          Dr. Indrawan memberikan analogi yang sangat membekas tentang situasi krisis. 
          Bayangkan Anda sedang bekerja di sebuah gedung perkantoran, dan tiba-tiba <strong>mati lampu total</strong>. 
          Dalam hitungan detik, seluruh penghuni gedung akan terbelah menjadi dua golongan manusia:
        </p>
        <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
          <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.3rem; text-align: center;">Dua Golongan Manusia Saat Mati Lampu</h4>
          <div class="people-groups">
            <div class="group-box problem-maker">
              <h5>Golongan 1: Bagian dari Masalah (Passive / Complaining)</h5>
              <p>Mulai berteriak menyalahkan PLN, marah karena UPS tidak menyala, mengeluh panas, atau memilih tidur diam menunggu lampu menyala sendiri. Mereka memperkeruh suasana dan memicu kepanikan.</p>
            </div>
            <div class="group-box solution-provider">
              <h5>Golongan 2: Bagian dari Solusi (Active / Innovating)</h5>
              <p>Bergerak tenang mencari generator cadangan, membagikan daya baterai laptopnya kepada rekan yang sedang mengejar dokumen darurat, atau menyalakan tethering HP agar tim tetap bisa berkomunikasi. Mereka aktif bertindak.</p>
            </div>
          </div>
        </div>
        <p>
          Di tengah kegelapan krisis, seluruh perhatian pimpinan dan pelanggan akan terarah untuk mencari "pahlawan" yang membawa cahaya solusi. 
          Ketika debu-debu kepanikan mulai mereda dan lampu menyala kembali, wajah-wajah golongan kedua (pembawa solusi) akan <strong>terpatri erat di benak pimpinan dan pelanggan</strong>.
        </p>
        <p>
          Inovasi adalah kendaraan terbaik untuk <strong>membangun "Kavling Pikiran" (Top of Mind)</strong>. Bagi karyawan, Anda menjadi prioritas utama untuk promosi karir strategis karena terbukti handal dalam ketidakpastian. Bagi pengusaha, Anda menjadi pilihan utama pelanggan karena Anda satu-satunya yang repot-repot memikirkan dan menyesuaikan produk demi kenyamanan mereka di masa sulit.
        </p>
      </NoteSection>
    </div>

    <div data-section-id="tiga-langkah-mudah">
      <NoteSection title="6. 3 Langkah Mudah Berinovasi (Framework CIAS)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=42m05s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 42:05 Asal Mula Lahirnya Inovasi
          </a>
          <a
            href="{videoBaseUrl}&t=45m01s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 45:01 Langkah 1: Identify Customer Problem
          </a>
          <a
            href="{videoBaseUrl}&t=52m39s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 52:39 Langkah 2: Propose New Solution
          </a>
          <a
            href="{videoBaseUrl}&t=55m24s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 55:24 Langkah 3: Iterasi & Feedback Loop
          </a>
        </div>
        <p>
          Bagaimana cara memulai langkah konkret sebagai seorang inovator mandiri? 
          Dr. Indrawan membagikan framework tiga langkah sederhana yang sangat aplikatif untuk siapa saja.
        </p>

        <h3>Langkah 1: Identifikasi Masalah Pelanggan (Identify Customer Problem)</h3>
        <p>
          Inovasi sejati tidak dimulai dari ide yang hebat, melainkan dari <strong>masalah yang mendalam</strong>. 
          Seorang inovator adalah "pemburu masalah". Di balik setiap inovasi legendaris dunia, selalu ada problem nyata yang tidak terselesaikan dengan baik oleh alternatif solusi saat itu:
        </p>
        <ul>
          <li><strong>Bola Lampu Edison:</strong> Lahir karena solusi obor dan lampu minyak saat itu sangat berbahaya (risiko kebakaran tinggi) serta minyak ikan paus sangat mahal dan menyusahkan.</li>
          <li><strong>Kartu Prabayar Seluler:</strong> Lahir karena sistem pasca-bayar membuat pelanggan syok dengan tagihan bengkak di akhir bulan, dan operator telekomunikasi kesulitan menagih pembayaran yang menunggak.</li>
          <li><strong>Ojek Online (Gojek):</strong> Lahir karena repotnya mencari ojek pangkalan (harus jalan jauh, tawar-menawar harga tidak pasti, dan rasa tidak aman karena tidak ada rekam identitas pengemudi).</li>
        </ul>
        <p>
          Mulailah dengan mengamati lingkungan Anda. Tanyakan: Apa <em>pain point</em> terbesar yang dirasakan customer eksternal (pembeli produk) atau customer internal Anda (rekan kerja beda divisi, atasan Anda)?
        </p>

        <h3>Langkah 2: Tawarkan Solusi Baru (Propose New Solution)</h3>
        <p>
          Setelah menemukan masalah yang layak diselesaikan (painful, mendesak, dan bernilai tinggi jika dipecahkan), rancanglah solusi alternatif yang memiliki unsur kebaruan. 
          Solusi ini harus didesain agar mudah diadopsi oleh pengguna. Dr. Indrawan membedakan tiga level pemikiran kreatif:
        </p>
        <ul>
          <li><strong>Creativity (Kreativitas):</strong> Sekadar menghasilkan ide yang berbeda atau unik dari yang lain, tanpa melihat kegunaannya.</li>
          <li><strong>Invention (Penemuan):</strong> Ide unik tersebut berhasil diwujudkan menjadi solusi yang terbukti memiliki nilai guna yang lebih baik.</li>
          <li><strong>Innovation (Inovasi):</strong> Penemuan tersebut <strong>benar-benar diadopsi dan digunakan secara luas</strong> oleh target market hingga mereka tidak bisa hidup tanpanya karena manfaatnya yang teramat besar.</li>
        </ul>

        <h3>Langkah 3: Lakukan Iterasi & Feedback Loop Terus-Menerus</h3>
        <p>
          Jangan pernah berasumsi bahwa ide pertama Anda adalah solusi yang sempurna. Ide pertama hanyalah kumpulan hipotesis. 
          Langkah terbaik adalah mewujudkan ide tersebut ke dalam bentuk <strong>Prototype Sederhana</strong> secepat mungkin, lalu tunjukkan langsung kepada calon pengguna.
        </p>
        <p>
          Mintalah kritik dan feedback jujur: Bagian mana yang membantu mereka? Bagian mana yang membingungkan? Dari data tersebut, lakukan perbaikan untuk menghasilkan prototype versi kedua. 
          Ulangi siklus ini hingga pengguna berkata, <em>"Nah, versi ini yang sangat saya butuhkan! Terima kasih sudah menyelesaikan masalah saya!"</em>
        </p>
      </NoteSection>
    </div>

    <div data-section-id="tanya-jawab-inovasi">
      <NoteSection title="7. Sesi Tanya Jawab (Q&A) & Insight Mendalam">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=58m3s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 58:03 Q&A: Inovasi Skala Besar vs Mikro
          </a>
          <a
            href="{videoBaseUrl}&t=1h3m26s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:03:26 Q&A: Juri Inovasi
          </a>
          <a
            href="{videoBaseUrl}&t=1h7m0s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:07:00 Q&A: Value Proposition & Resign?
          </a>
          <a
            href="{videoBaseUrl}&t=1h11m12s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:11:12 Q&A: Hambatan Waterfall & Politik Korporasi
          </a>
          <a
            href="{videoBaseUrl}&t=1h17m19s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge" onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:17:19 Q&A: Lego & Bahaya Terlalu Nafsu Berinovasi
          </a>
        </div>
        <p> Sesi Q&A menghadirkan diskusi yang sangat tajam terkait tantangan implementasi inovasi di dunia nyata:</p>

        <h3>1. Inovasi Skala Besar vs Workplace Innovation</h3>
        <p>
          Untuk <em>Workplace Innovation</em> yang bersifat operasional harian, jalankan saja secara natural tanpa batas karena biayanya murah dan dampaknya langsung terasa di tim kerja masing-masing. 
          Inovasi kecil tidak perlu “waktu khusus”, tetapi organisasi tetap butuh mekanisme untuk memonitor, mengapresiasi, dan memberi dukungan agar pelakunya tidak merasa berjalan sendirian.
          Namun, untuk inisiatif inovasi besar (merilis produk baru, merambah market baru, mengubah model bisnis), perusahaan harus melakukan <strong>Funneling (Penyaringan)</strong> yang ketat:
        </p>
        <div class="funnel-container">
          <div class="funnel-step step-1"><strong>1. Prototype Sederhana</strong><br/><small>Uji minat awal ke segelintir user</small></div>
          <div class="funnel-arrow">▼</div>
          <div class="funnel-step step-2"><strong>2. MVP (Minimum Viable Product)</strong><br/><small>Luncurkan produk minim fungsi untuk melihat reaksi pasar riil</small></div>
          <div class="funnel-arrow">▼</div>
          <div class="funnel-step step-3"><strong>3. Piloting & Scaling</strong><br/><small>Bangun produk utuh dan lakukan pemasaran massal</small></div>
        </div>
        <p>Proses ini meminimalkan risiko kerugian finansial yang masif akibat terlanjur memproduksi barang yang ternyata tidak laku di pasar.</p>

        <h3>2. Siapa Juri Inovasi Sebenarnya?</h3>
        <p>
          Banyak orang mengira juri inovasi adalah dewan penilai, panelis, atau atasan yang menentukan keberhasilan sebuah karya. Namun, realitanya tidak demikian.
        </p>
        <Callout type="tip" title="Prinsip Utama Juri Inovasi">
          <strong>Juri utama dari setiap inovasi adalah customer atau pengguna itu sendiri.</strong> Merekalah yang memegang keputusan akhir apakah solusi yang ditawarkan benar-benar bernilai dan layak digunakan.
        </Callout>
        <p>
          Ada beberapa tolok ukur utama yang menentukan penilaian dari "juri sejati" ini:
        </p>
        <ul>
          <li><strong>Penyelesaian Masalah:</strong> Apakah solusi tersebut benar-benar menyelesaikan masalah nyata mereka, atau hanya sekadar terlihat keren di atas kertas?</li>
          <li><strong>Tingkat Adopsi:</strong> Jika inovasi tidak dipakai atau tidak menyelesaikan masalah customer, maka inovasi itu gagal—meskipun memenangkan lomba internal atau dipuji atasan.</li>
          <li><strong>Aksi Nyata (Real Action):</strong> Ukuran keberhasilan diukur dari kesediaan mereka mengeluarkan uang (dompet) atau frekuensi penggunaan aktif secara berkala (<em>active user</em>).</li>
        </ul>
        <p>
          Oleh karena itu, cara terbaik untuk menguji inovasi adalah dengan mewujudkan ide ke bentuk <strong>Prototype Sederhana</strong>, menunjukkannya langsung ke calon pengguna, dan meminta feedback jujur mereka secara berkala.
        </p>

        <h3>3. Value Proposition Lemah: Berinovasi atau Resign?</h3>
        <p>
          Ketika dihadapkan pada situasi di mana produk perusahaan tidak lagi memiliki daya saing (<em>unique value proposition</em>) yang relevan dengan kebutuhan pasar saat ini, seringkali muncul keputusasaan untuk langsung menyerah.
        </p>
        <Callout type="warning" title="Mentalitas Inovator">
          <strong>Resign adalah pilihan terakhir.</strong> Sebagai seorang inovator, tantangan ini justru menjadi panggung pembuktian kapasitas diri untuk melahirkan alternatif baru.
        </Callout>
        <p>
          Meskipun Anda tidak berada di posisi manajemen puncak atau tidak memiliki wewenang untuk mengubah produk inti secara langsung, Anda tetap memiliki opsi inovasi operasional/pemasaran berikut:
        </p>
        <ul>
          <li><strong>Repackaging & Repositioning:</strong> Mengemas ulang atau menyajikan produk dengan narasi baru yang lebih sesuai dengan kondisi krisis saat ini.</li>
          <li><strong>Service Delivery Improvement:</strong> Memperbaiki dan mempercepat bagaimana layanan atau produk tersebut disampaikan kepada pelanggan untuk meningkatkan kepuasan.</li>
          <li><strong>Alternative Communication:</strong> Mengomunikasikan nilai kegunaan produk dengan metode yang lebih relevan dan menyentuh sisi emosional pasar.</li>
        </ul>
        <p>
          Tunjukkan mentalitas inovator yang proaktif dengan memaksimalkan apa saja yang berada di dalam ruang wewenang Anda terlebih dahulu sebelum mengambil keputusan besar untuk berpindah tempat kerja.
        </p>

        <h3>4. Menghadapi Budaya Waterfall dan Keengganan Atasan (Politik Korporasi)</h3>
        <p>
          Dr. Indrawan mengutip ucapan pimpinan Deloitte: <em>"Corporate Innovation is not a creativity problem, but a political problem."</em> 
          Inovasi di perusahaan besar membutuhkan dukungan struktural yang kuat. Untuk meluncurkan inovasi strategis yang kompleks, pastikan Anda merangkul dua peran krusial:
        </p>
        <ul>
          <li><strong>Promotor:</strong> Tokoh ahli/kunci di dalam perusahaan yang paham inovasi dan memiliki pengaruh sosial yang kuat untuk menggerakkan tim.</li>
          <li><strong>Sponsor:</strong> Pejabat struktural tinggi (Direksi/C-Level) yang memiliki kekuasaan wewenang dan dana untuk memproteksi serta mendanai project tersebut dari hambatan birokrasi.</li>
        </ul>

        <h3>5. Belajar dari Kegagalan Lego: Inovasi Butuh "Kotak"</h3>
        <p>
          Inovasi yang terlalu bebas tanpa arah justru sangat berbahaya. Lego pernah hampir bangkrut total karena terlalu nafsu berinovasi pasca penurunan penjualan. 
          Mereka merekrut puluhan anak muda super jenius dari universitas ternama, memberikan dana tak terbatas, dan membebaskan mereka mendesain mainan apa saja tanpa batasan.
        </p>
        <p>
          Hasilnya adalah bencana: lahir mainan-mainan liar seperti <em>action figure</em> rumit yang kehilangan jati diri Lego. 
          Pelanggan setia bingung dan menolak membeli produk tersebut karena ruh Lego (balok yang disusun kreatif) lenyap. 
          Lego berhasil bangkit dari jurang kehancuran saat mereka memutuskan <strong>kembali ke jati diri / Core Value Proposition</strong> mereka: balok sederhana yang saling mengunci (<em>interlocking bricks</em>) sebagai media penuang imajinasi anak.
        </p>
        <p>
          <strong>Pelajaran Berharga:</strong> Berpikir di luar kotak (<em>out of the box</em>) itu baik, tetapi dalam implementasi inovasi, Anda <strong>tetap butuh "kotak" (fokus, batasan nilai inti, dan arahan strategis)</strong> agar inovasi tersebut efektif, terkontrol, dan bernilai tinggi bagi bisnis.
        </p>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="bMvk3uwuTTg" {chapters} />

<style>
  /* Styling Premium Khusus Halaman Ini */
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

  /* Mode Comparison Cards */
  .mode-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .mode-card {
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--color-line);
  }

  .mode-card.waiting {
    background: var(--color-status-danger-soft);
    border-left: 4px solid var(--color-status-error-start);
  }

  .mode-card.innovation {
    background: var(--color-status-success-soft);
    border-left: 4px solid var(--color-status-done-start);
  }

  .mode-card h4 {
    margin-top: 0;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .mode-card.waiting h4 {
    color: var(--color-status-error-start);
  }

  .mode-card.innovation h4 {
    color: var(--color-status-done-start);
  }

  .mode-card ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .mode-card li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* People Groups layout */
  .people-groups {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .group-box {
    flex: 1;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid var(--color-line);
  }

  .group-box.problem-maker {
    background: var(--color-surface);
  }

  .group-box.solution-provider {
    background: var(--color-status-info-soft);
    border: 2px dashed var(--color-callout-info-border);
  }

  .group-box h5 {
    margin-top: 0;
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .group-box p {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  /* Funnel Visual Layout */
  .funnel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
    gap: 0.25rem;
  }

  .funnel-step {
    width: 80%;
    text-align: center;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-line);
  }

  .funnel-step.step-1 {
    width: 80%;
    background: var(--color-status-info-soft);
  }

  .funnel-step.step-2 {
    width: 60%;
    background: var(--color-status-warning-soft);
  }

  .funnel-step.step-3 {
    width: 40%;
    background: var(--color-status-success-soft);
  }

  .funnel-arrow {
    font-size: 0.8rem;
    color: var(--color-ink-muted);
  }

  @media (max-width: 768px) {
    .mode-comparison {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .people-groups {
      flex-direction: column;
    }

    .funnel-step {
      width: 100% !important;
    }
  }
</style>
