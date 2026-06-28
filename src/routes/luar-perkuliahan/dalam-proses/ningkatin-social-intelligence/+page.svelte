<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import VideoSidebar from '$lib/components/VideoSidebar.svelte';
  import VideoSyncArticle from '$lib/components/VideoSyncArticle.svelte';
  import {
    Play,
    Sparkles,
    MessageCircle,
    Heart,
    User,
    Award,
    CheckCircle,
    Brain,
    Smile,
    Activity,
    HelpCircle,
    RefreshCw,
    BookOpen,
    Eye,
  } from 'lucide-svelte';

  const videoBaseUrl = 'https://www.youtube.com/watch?v=UtrzkJuvrwI';

  let videoSidebar: VideoSidebar;

  const chapters = [
    { title: 'Intro: IQ vs Social Intelligence', time: '0:00', seconds: 0 },
    { title: 'Konsep Kecerdasan Sosial (Edward Thorndike)', time: '1:48', seconds: 108 },
    { title: 'Dampak Sosial & Bahaya Sosial Rendah', time: '3:02', seconds: 182 },
    { title: 'Hubungan Kecerdasan Sosial & Akademik (IPK)', time: '5:30', seconds: 330 },
    { title: '1. Latih Kepekaan Sosial (Daniel Goleman)', time: '7:24', seconds: 444 },
    { title: '2. Stop Pengen Kelihatan Pintar (MIT)', time: '8:38', seconds: 518 },
    { title: '3. Emotional Mirroring (Neuroscience)', time: '10:26', seconds: 626 },
    { title: '4. Perbanyak Exposure Sosial', time: '11:45', seconds: 705 },
    { title: '5. Bangun Feedback Loop (Anti-NPD)', time: '12:35', seconds: 755 },
    { title: 'Membaca Pola Orang di Tongkrongan', time: '15:16', seconds: 916 },
    { title: 'Kenapa Jadi Asyik Lebih Penting dari Pintar', time: '16:45', seconds: 1005 },
    { title: 'Kesimpulan & Buku "Makanya Mikir"', time: '17:13', seconds: 1033 },
  ];

  const sectionMap = [
    { id: 'intro-iq-social', startSeconds: 0, endSeconds: 107 },
    { id: 'konsep-kecerdasan', startSeconds: 108, endSeconds: 181 },
    { id: 'dampak-kesehatan', startSeconds: 182, endSeconds: 329 },
    { id: 'hubungan-akademik', startSeconds: 330, endSeconds: 443 },
    { id: 'tips-1-kepekaan', startSeconds: 444, endSeconds: 517 },
    { id: 'tips-2-stop-pintar', startSeconds: 518, endSeconds: 625 },
    { id: 'tips-3-mirroring', startSeconds: 626, endSeconds: 704 },
    { id: 'tips-4-exposure', startSeconds: 705, endSeconds: 754 },
    { id: 'tips-5-feedback', startSeconds: 755, endSeconds: 915 },
    { id: 'membaca-pola', startSeconds: 916, endSeconds: 1004 },
    { id: 'kenapa-asyik-penting', startSeconds: 1005, endSeconds: 1032 },
    { id: 'kesimpulan-buku', startSeconds: 1033, endSeconds: 1200 },
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
  <title>Kecerdasan Sosial (Social Intelligence): Lebih Penting dari IQ? - S2IF Notebook</title>
  <meta
    name="description"
    content="Pelajari konsep kecerdasan sosial (social intelligence), dampaknya ke kesehatan hidup, serta 5 tips praktis meningkatkannya berdasarkan monolog edukatif Choki Pardede."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Kecerdasan Sosial (Social Intelligence): Lebih Penting dari IQ?"
    date="31 Mei 2026"
    status="done"
    tags={['Social Skills', 'Psikologi', 'Komunikasi', 'Mindset']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini dirangkum berdasarkan monolog informatif yang dibawakan secara kasual namun ilmiah
    mengenai pentingnya kecerdasan sosial. Video lengkap dapat Anda tonton langsung di
    <a href={videoBaseUrl} target="_blank" rel="noopener noreferrer"
      >YouTube: Ningkatin Social Intelegent</a
    >.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <!-- Section 1 -->
    <div data-section-id="intro-iq-social">
      <NoteSection title="1. Intro: Kecerdasan Kognitif (IQ) vs Kecerdasan Sosial">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m0s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:00 Intro & Bumper
          </a>
        </div>
        <p>
          Belakangan ini, algoritma media sosial diramaikan oleh perlombaan menguji kecerdasan
          kognitif atau <strong>IQ (Intelligence Quotient)</strong>. Banyak kreator konten berlomba-lomba
          memamerkan skor IQ mereka, mulai dari 120 hingga di atas 150. Namun, apakah kecerdasan
          kognitif yang tinggi menjamin kesuksesan sejati dalam kehidupan nyata?
        </p>
        <p>
          Ada satu faktor yang jauh lebih signifikan dalam memperbesar kemungkinan kesuksesan
          seseorang dibanding sekadar kemampuan kognitif logis, yaitu <strong
            >Social Intelligence (Kecerdasan Sosial)</strong
          >.
        </p>

        <div class="iq-vs-eq-grid">
          <div class="comparison-card iq-card">
            <div class="card-title">
              <Brain size={20} />
              <h4>Kecerdasan Kognitif (IQ)</h4>
            </div>
            <p>
              Berfokus pada kemampuan pemecahan masalah logis, matematika, memori, pola ruang, dan
              analisis akademis.
            </p>
            <div class="card-badge">Fokus: Logika & Analitis</div>
          </div>
          <div class="comparison-card sq-card">
            <div class="card-title">
              <Smile size={20} />
              <h4>Kecerdasan Sosial (SQ)</h4>
            </div>
            <p>
              Berfokus pada kemampuan bersosialisasi, memahami dinamika hubungan manusia, berempati,
              berkomunikasi dua arah, dan meng-handle konflik antarpribadi.
            </p>
            <div class="card-badge success">Fokus: Hubungan Manusia</div>
          </div>
        </div>
      </NoteSection>
    </div>

    <!-- Section 2 -->
    <div data-section-id="konsep-kecerdasan">
      <NoteSection title="2. Konsep Kecerdasan Sosial (Edward Thorndike)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=1m48s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:48 Konsep SQ
          </a>
        </div>
        <p>
          Konsep ini pertama kali dicetuskan pada tahun 1920-an oleh seorang psikolog ternama
          bernama <strong>Edward Thorndike</strong>. Menurut teorinya:
        </p>
        <ul>
          <li>Kecerdasan sosial adalah entitas yang sepenuhnya terpisah dari IQ kognitif.</li>
          <li>
            Pengukuran IQ konvensional sama sekali tidak menguji tingkat kecerdasan sosial
            seseorang.
          </li>
          <li>
            Orang yang sangat pintar secara logika belum tentu memiliki kecerdasan sosial yang baik
            dalam menangani hubungan antarpribadi.
          </li>
        </ul>
        <div class="highlight-box success-box">
          <Sparkles size={18} class="box-icon" />
          <p>
            <strong>Inti Definisi Edward Thorndike:</strong> Kecerdasan sosial adalah kemampuan
            untuk secara akurat <em>memahami orang lain</em> dan <em>mengelola hubungan sosial</em> secara
            efektif dalam berbagai situasi.
          </p>
        </div>
      </NoteSection>
    </div>

    <!-- Section 3 -->
    <div data-section-id="dampak-kesehatan">
      <NoteSection
        title="3. Dampak Sosial: Mengapa Kecerdasan Sosial Tinggi Bikin Sehat & Umur Panjang?"
      >
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=3m2s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 3:02 Dampak SQ
          </a>
        </div>
        <p>
          Riset psikologi menemukan korelasi yang sangat kuat antara kecerdasan sosial yang matang
          dengan tingkat kesehatan fisik serta umur panjang:
        </p>

        <div class="comparison-box">
          <div class="comp-item positive">
            <h5>✅ Dampak SQ Tinggi (Sehat & Umur Panjang)</h5>
            <p>
              Orang dengan SQ tinggi memahami cara menghadapi watak orang lain. Mereka cenderung
              terhindar dari konflik besar, tidak memiliki musuh/haters yang menguras emosi, dan
              menjalani hidup dengan tingkat stres sosial yang jauh lebih rendah.
            </p>
          </div>
          <div class="comp-item negative">
            <h5>❌ Dampak SQ Rendah (Pemicu Konflik Konstan)</h5>
            <p>
              Orang dengan SQ rendah cenderung memicu konflik tanpa mereka sadari (*clueless*).
              Ketidakmampuan menangkap sinyal sosial membuat mereka rentan membuat orang lain merasa
              jengkel, frustrasi, atau tidak dihargai, yang akhirnya memicu stres kronis akibat
              konflik sosial di lingkungan keluarga maupun kerja.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Bahaya Sikap Clueless Sosial">
          Ketidakmampuan bersosialisasi mengakibatkan seseorang rentan terjebak dalam *outcomes*
          buruk yang sebenarnya tidak mereka inginkan. Mereka seringkali mengeluhkan "Kenapa aku
          dibenci?" tanpa menyadari bahwa pemicunya adalah kata-kata atau tindakan mereka sendiri
          yang tidak peka konteks.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 4 -->
    <div data-section-id="hubungan-akademik">
      <NoteSection title="4. Korelasi Kecerdasan Sosial dengan Performa Akademik (IPK)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=5m30s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:30 Korelasi Akademik
          </a>
        </div>
        <p>
          Sebuah penelitian berjudul <em
            >"Social Intelligence and Student Academic Performance at Post Graduate Level"</em
          > menelaah hubungan antara performa akademik mahasiswa tingkat pascasarjana dengan kecerdasan
          sosial mereka.
        </p>
        <p>Hasil penelitian tersebut menunjukkan pola yang cukup unik:</p>
        <ul>
          <li>
            <strong>IPK Tinggi (3.6 – 4.0):</strong> Secara umum memiliki skor kecerdasan sosial yang
            tinggi (berkisar pada rata-rata 3.2). Mereka mampu menyeimbangkan pemikiran analitis dengan
            interaksi sosial yang sehat.
          </li>
          <li>
            <strong>IPK Rendah:</strong> Cenderung memiliki skor kecerdasan sosial yang lebih rendah (berkisar
            pada 2.4), yang mengindikasikan adanya kendala dalam kolaborasi kelompok atau komunikasi dengan
            dosen/rekan sejawat.
          </li>
        </ul>
        <div class="quote-card">
          <p>
            "Orang yang tidak memiliki *social skill* seringkali memicu emosi negatif pada
            orang-orang di sekitarnya. Jika Anda sering membuat orang kesal tanpa alasan yang jelas,
            mari luangkan waktu untuk mengevaluasi cara kita menempatkan diri dalam percakapan."
          </p>
        </div>
      </NoteSection>
    </div>

    <!-- Section 5 -->
    <div data-section-id="tips-1-kepekaan">
      <NoteSection title="5. Tips 1: Latih Kepekaan Sosial (Daniel Goleman)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=7m24s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 7:24 Kepekaan Sosial
          </a>
        </div>
        <p>
          Mengacu pada pemikiran psikolog <strong>Daniel Goleman</strong>, fondasi utama dari
          kecerdasan sosial adalah kemampuan membaca emosi orang lain secara
          <strong>real-time</strong>.
        </p>
        <p>
          Banyak orang terjebak dalam kondisi <em>"stone-deaf"</em> alias buta konteks emosional. Mereka
          hanya mendengar kata-kata literal tanpa memperhatikan sinyal-sinyal non-verbal yang krusial.
        </p>

        <div class="tips-card card-step1">
          <h4>💡 Bagaimana Melatih Kepekaan Sosial?</h4>
          <ul>
            <li>
              <strong>Perhatikan Nada Suara & Jeda:</strong> Cara seseorang mengucapkan sesuatu (cepat,
              lambat, ragu-ragu) menyimpan makna emosi yang lebih besar dari sekadar kalimat yang terucap.
            </li>
            <li>
              <strong>Amati Ekspresi Wajah & Gerak Tubuh:</strong> Sadari kontak mata, senyuman tipis,
              atau kerutan dahi lawan bicara Anda.
            </li>
            <li>
              <strong>Dengar untuk Mengerti, Bukan Menjawab:</strong> Saat orang lain berbicara, tahan
              diri dari menyusun argumen balasan di kepala Anda. Pusatkan pikiran sepenuhnya untuk menangkap
              esensi cerita mereka dengan tulus.
            </li>
          </ul>
        </div>
      </NoteSection>
    </div>

    <!-- Section 6 -->
    <div data-section-id="tips-2-stop-pintar">
      <NoteSection title="6. Tips 2: Stop Keinginan Terlihat Pintar (Collective Intelligence)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m38s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:38 Kurangi Ego Pintar
          </a>
        </div>
        <p>
          Penelitian dari <strong>MIT</strong> tentang <em>Collective Intelligence</em> memaparkan temuan
          menarik: orang yang sangat pintar secara akademis seringkali memiliki kecenderungan egois untuk
          <strong>memenangkan argumen</strong>, alih-alih mencoba memahami perspektif lawan bicaranya.
        </p>

        <div class="comparison-box">
          <div class="comp-item negative">
            <h5>❌ Pendekatan Debat / Menggurui</h5>
            <p>
              Langsung memotong ketidaksetujuan dengan membeberkan teori akademik yang berat: <em
                >"Tapi menurut studi di Universitas X, argumentasi Anda salah total!"</em
              > Pembawaan ini menghancurkan kenyamanan obrolan.
            </p>
          </div>
          <div class="comp-item positive">
            <h5>✅ Pendekatan Eksploratif / Ingin Tahu</h5>
            <p>
              Menanggapi ketidaksetujuan secara santun dan penasaran: <em
                >"Oh begitu ya? Kalau boleh tahu, kesimpulan Anda itu asalnya dari mana?"</em
              > Ini membangun kedekatan (*social connection*).
            </p>
          </div>
        </div>

        <p>
          <strong>Bahasa Tubuh yang Rendah Hati:</strong> Hindari postur tubuh defensif atau arogan, seperti
          melipat tangan di dada saat orang lain mengemukakan pendapat. Tunjukkan gestur terbuka, santai,
          dan penuh perhatian.
        </p>
      </NoteSection>
    </div>

    <!-- Section 7 -->
    <div data-section-id="tips-3-mirroring">
      <NoteSection title="7. Tips 3: Manfaatkan Emotional Mirroring (Mirror Neurons)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=10m26s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 10:26 Mirror Neurons
          </a>
        </div>
        <p>
          Berdasarkan temuan di bidang <strong>Neuroscience</strong>, otak manusia dipersenjatai
          dengan sel saraf khusus bernama <strong>Mirror Neurons (Sel Saraf Cermin)</strong>.
        </p>

        <div class="neuro-card">
          <div class="neuro-icon">
            <Activity size={24} />
          </div>
          <div class="neuro-content">
            <h4>Bagaimana Mirror Neurons Bekerja?</h4>
            <p>
              Sel saraf cermin ini bertanggung jawab menularkan emosi di antara manusia secara tidak
              sadar. Ketika Anda tertawa dengan tulus, orang di sekitar Anda secara biologis
              terdorong untuk ikut tertawa. Sebaliknya, jika Anda datang ke sebuah perkumpulan
              dengan aura murung dan dingin, suasana perkumpulan tersebut perlahan akan ikut berubah
              menjadi suram.
            </p>
          </div>
        </div>

        <p>
          <strong>Latihan Praktis:</strong> Gunakan kekuatan *mirror neurons* ini dengan melatih empati.
          Saat lawan bicara Anda sedang antusias bercerita tentang kesenangannya, ikutlah merasakan kesenangan
          tersebut. Saat mereka prihatin, tunjukkan rasa prihatin yang tulus. Menyelaraskan frekuensi
          emosi ini akan mengunci kedekatan batin secara instan.
        </p>
      </NoteSection>
    </div>

    <!-- Section 8 -->
    <div data-section-id="tips-4-exposure">
      <NoteSection title="8. Tips 4: Perbanyak Exposure Sosial (Hipotesis Kecerdasan Sosial)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=11m45s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 11:45 Exposure Sosial
          </a>
        </div>
        <p>
          Berdasarkan <em>Social Intelligence Hypothesis</em>, kemampuan sosial kita tidak akan
          pernah berkembang jika kita terus-menerus mengisolasi diri di dalam lingkaran pertemanan
          yang nyaman (*comfort zone circle*).
        </p>
        <div class="highlight-box info-box">
          <User size={18} class="box-icon" />
          <p>
            <strong>Menjadi Bunglon Sosial (Social Chameleon):</strong> Latihlah fleksibilitas sosial
            Anda dengan berani berinteraksi lintas kelompok sosial. Biasakan mengobrol dengan orang-orang
            yang memiliki latar belakang profesi, usia, dan pandangan hidup yang sangat bertolak belakang
            dengan Anda.
          </p>
        </div>
        <p>
          Semakin kompleks dan bervariasi interaksi yang Anda hadapi—meskipun terkadang memicu
          situasi yang sedikit canggung (*awkward*)—maka struktur sel saraf sosial di otak Anda akan
          semakin terlatih dan terasah tajam.
        </p>
      </NoteSection>
    </div>

    <!-- Section 9 -->
    <div data-section-id="tips-5-feedback">
      <NoteSection title="9. Tips 5: Bangun Feedback Loop yang Jujur (Anti-NPD)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=12m35s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 12:35 Feedback Loop
          </a>
        </div>
        <p>
          Indikator utama untuk mengukur apakah cara bersosialisasi kita itu asyik atau membosankan
          ditentukan oleh <strong>penilaian orang lain</strong>, bukan dari asumsi subjektif diri
          kita sendiri.
        </p>
        <p>
          Orang yang selalu merasa dirinya paling hebat dan paling seru di tongkrongan—tanpa peduli
          dengan respons lawan bicara—biasanya mencerminkan kecenderungan egoistik yang kurang
          disukai (bahkan mengarah pada tanda-tanda narsisme atau NPD).
        </p>

        <div class="feedback-loop-grid">
          <div class="feedback-card step-give">
            <div class="feedback-header">
              <RefreshCw size={18} />
              <h4>Beri Ruang Komunikasi Dua Arah</h4>
            </div>
            <p>
              Jangan mendominasi percakapan. Sebagai contoh ekstrem kasual: saat bernyanyi karaoke
              bersama teman-teman, jangan bernyanyi 8 lagu berturut-turut dari total 10 lagu. Hal
              itu mencerminkan keegoisan tinggi.
            </p>
          </div>
          <div class="feedback-card step-ask">
            <div class="feedback-header">
              <MessageCircle size={18} />
              <h4>Miliki "Kompas" Sosial Terpercaya</h4>
            </div>
            <p>
              Miliki 1 atau 2 orang sahabat dekat yang Anda percayai untuk memberikan kritik jujur
              tanpa filter mengenai bagaimana sikap Anda di depan publik.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Kunci Emas: Jangan Baper!">
          Jika orang terdekat memberikan kritik bahwa Anda terlalu banyak memotong pembicaraan atau
          terkesan menggurui, <strong>tahan ego Anda dan jangan terbawa perasaan (baper)</strong>. Evaluasi
          tersebut adalah umpan balik berharga (*feedback loop*) yang berfungsi sebagai pemandu arah
          untuk memperbaiki kecerdasan sosial Anda.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 10 -->
    <div data-section-id="membaca-pola">
      <NoteSection title="10. Kemampuan Utama: Membaca Pola Orang di Sekitar Anda">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=15m16s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 15:16 Membaca Pola
          </a>
        </div>
        <p>
          *Rule of thumb* yang paling efektif untuk dipraktikkan dalam pergaulan sehari-hari adalah
          kemampuan membaca <strong>pola perilaku individu</strong> di tongkrongan Anda:
        </p>

        <div class="pattern-grid">
          <div class="pattern-card">
            <h5>Mengenali Pemicu Kemarahan (Teman A)</h5>
            <p>
              Pahami topik-topik apa saja yang sensitif bagi mereka, sehingga Anda bisa menghindari
              hal tersebut demi menjaga keharmonisan hubungan.
            </p>
          </div>
          <div class="pattern-card">
            <h5>Mendeteksi Sinyal Kebosanan (Teman B)</h5>
            <p>
              Amati perubahan bahasa tubuh mereka (seperti sering melirik ponsel atau melihat ke
              arah luar). Sadari bahwa ini adalah pertanda jelas Anda harus <strong>berhenti mendominasi
              obrolan atau segera mengganti topik pembicaraan</strong>.
            </p>
          </div>
        </div>

        <p>
          Semakin peka Anda menangkap pola-pola ini, kehadiran Anda di setiap lingkaran pertemanan
          akan selalu dinanti-nanti karena Anda dianggap sebagai sosok yang pengertian, asyik, dan
          peka situasi.
        </p>
      </NoteSection>
    </div>

    <!-- Section 11 -->
    <div data-section-id="kenapa-asyik-penting">
      <NoteSection
        title="11. Esensi Sukses: Mengapa Menjadi Asyik Jauh Lebih Berharga dibanding Sekadar Pintar?"
      >
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=16m45s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 16:45 Pentingnya Jadi Asyik
          </a>
        </div>
        <p>
          Kecerdasan akademis yang tinggi barangkali dapat membawa Anda ke gerbang karier yang baik.
          Namun dalam dinamika kehidupan, yang menentukan seberapa jauh Anda dapat melangkah di
          dalam karier dan bisnis adalah <strong>apakah Anda menyenangkan untuk diajak bekerja sama
          (asyik)</strong>.
        </p>
        <div class="quote-card">
          <p>
            "Pintar itu tidak akan berguna kalau lu enggak asyik, Kawan. Pada akhirnya, orang yang
            mendapat pertolongan, kesempatan, dan promosi karier adalah orang yang asyik diajak
            bekerja sama, bukan sekadar orang yang pintar tapi menyebelin."
          </p>
        </div>
        <p>
          Ketulusan, kerendahan hati, dan kecerdasan sosial merupakan magnet sosial terkuat yang
          melahirkan relasi penuh kepercayaan lintas generasi.
        </p>
      </NoteSection>
    </div>

    <!-- Section 12 -->
    <div data-section-id="kesimpulan-buku">
      <NoteSection title="12. Kesimpulan: Kutipan Buku 'Makanya Mikir' Halaman 209">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=17m13s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 17:13 Kesimpulan Akhir
          </a>
        </div>
        <p>
          Pembahasan mengenai kecerdasan sosial ini sejalan dengan pokok pikiran yang dituangkan
          dalam buku bestseller <strong>"Makanya Mikir"</strong> pada halaman 209:
        </p>

        <div class="mikir-card">
          <div class="mikir-content">
            <BookOpen size={28} class="book-icon" />
            <blockquote>"Buat apa kita pintar kalau pada akhirnya kita menyebelin?"</blockquote>
          </div>
          <div class="mikir-footer">
            <span>— Makanya Mikir, Hlm. 209</span>
          </div>
        </div>

        <p>
          Dunia ini tidak pernah kekurangan orang pintar. Namun, dunia sangat mendambakan kehadiran
          orang pintar yang memiliki kehangatan empati dan kecerdasan bersosialisasi yang tulus.
        </p>

        <div class="leverage-card">
          <div class="leverage-content">
            <h4>💡 Bukti Nyata dari Sang Pembicara</h4>
            <p>
              Choki Pardede menutup monolognya dengan kejujuran yang menggelitik: sepanjang monolog,
              ia sebenarnya membaca teks panduan dari mesin prompter. Ia tidak benar-benar menghafal
              studi-studi akademis tersebut.
            </p>
            <p>
              Namun, mengapa penonton bersedia menyaksikan video tersebut dari awal hingga akhir
              dengan antusias? Jawabannya bukan karena ia terlihat paling pintar, melainkan karena
              <strong>ia membawakan pesan tersebut secara asyik, bersahabat, interaktif, dan sama sekali
              tidak menggurui</strong>. Itulah aplikasi nyata dari Kecerdasan Sosial.
            </p>
          </div>
        </div>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="UtrzkJuvrwI" {chapters} />

<style>
  /* CSS PREMIUM UNTUK HALAMAN KECERDASAN SOSIAL (SOCIAL INTELLIGENCE) */

  /* 1. Header & Meta Timestamps */
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
    gap: 0.3rem;
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-callout-info-border);
    color: var(--color-binder);
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none !important;
    transition: all 0.2s ease-in-out;
  }

  .timestamp-badge:hover {
    background: var(--color-binder);
    color: var(--color-surface) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 2. Grid IQ vs SQ */
  .iq-vs-eq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .comparison-card {
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    position: relative;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .comparison-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-binder);
  }

  .card-title h4 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .comparison-card p {
    margin: 0 0 1.25rem 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--color-ink-muted);
  }

  .card-badge {
    display: inline-block;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    background: var(--color-surface-soft);
    color: var(--color-ink-muted);
    border: 1px solid var(--color-line);
  }

  .card-badge.success {
    background: var(--color-status-success-soft);
    color: var(--color-status-done-start);
    border: 1px solid var(--color-status-done-start);
  }

  /* 3. Highlight Boxes */
  .highlight-box {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 0 12px 12px 0;
    margin: 1.5rem 0;
  }

  .highlight-box.success-box {
    background: linear-gradient(
      135deg,
      var(--color-status-success-soft),
      var(--color-surface-elevated)
    );
    border-left: 4px solid var(--color-status-done-start);
  }

  .highlight-box.info-box {
    background: linear-gradient(
      135deg,
      var(--color-status-info-soft),
      var(--color-surface-elevated)
    );
    border-left: 4px solid var(--color-binder);
  }

  .highlight-box p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-ink);
  }



  /* 4. Quote Cards */
  .quote-card {
    background: var(--color-surface-elevated);
    border-left: 4px solid var(--color-binder);
    padding: 1.25rem 1.5rem;
    border-radius: 0 8px 8px 0;
    margin: 1.5rem 0;
    font-style: italic;
    font-size: 1.05rem;
    font-family: var(--font-handwriting, inherit);
  }

  .quote-card p {
    margin: 0;
    color: var(--color-ink);
    line-height: 1.6;
  }

  /* 5. Tips Cards */
  .tips-card {
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    margin: 1.5rem 0;
  }

  .tips-card h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-binder);
  }

  .tips-card ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .tips-card li {
    margin-bottom: 0.75rem;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  .tips-card li:last-child {
    margin-bottom: 0;
  }

  /* 6. Comparison Columns */
  .comparison-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .comp-item {
    padding: 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--color-line);
  }

  .comp-item h5 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .comp-item p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .comp-item.negative {
    background: var(--color-status-danger-soft);
    border-left: 4px solid var(--color-status-error-start);
  }

  .comp-item.negative h5 {
    color: var(--color-status-error-start);
  }

  .comp-item.positive {
    background: var(--color-status-success-soft);
    border-left: 4px solid var(--color-status-done-start);
  }

  .comp-item.positive h5 {
    color: var(--color-status-done-start);
  }

  /* 7. Neuro Card */
  .neuro-card {
    display: flex;
    gap: 1rem;
    background: linear-gradient(
      135deg,
      var(--color-surface-elevated),
      var(--color-status-info-soft)
    );
    border: 1px solid var(--color-callout-info-border);
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
  }

  .neuro-icon {
    color: var(--color-binder);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .neuro-content h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-binder);
  }

  .neuro-content p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  /* 8. Feedback Loop */
  .feedback-loop-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .feedback-card {
    padding: 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
  }

  .feedback-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-binder);
  }

  .feedback-header h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
  }

  .feedback-card p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--color-ink-muted);
  }

  /* 9. Pattern Grid */
  .pattern-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .pattern-card {
    padding: 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    border-top: 4px solid var(--color-binder);
  }

  .pattern-card h5 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-binder);
  }

  .pattern-card p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--color-ink-muted);
  }

  /* 10. Mikir Card ("Makanya Mikir" Book) */
  .mikir-card {
    background: linear-gradient(135deg, var(--color-binder), var(--color-surface-elevated));
    color: var(--color-surface);
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
  }

  /* Dark mode support fallback */
  :global(.dark) .mikir-card {
    background: linear-gradient(135deg, #1e1b4b, var(--color-surface-elevated));
    color: var(--color-ink);
  }

  .mikir-content {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  :global(.book-icon) {
    flex-shrink: 0;
    opacity: 0.9;
  }

  .mikir-content blockquote {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5;
    font-family: var(--font-handwriting, inherit);
  }

  .mikir-footer {
    text-align: right;
    margin-top: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.85;
  }

  /* 11. Leverage Card */
  .leverage-card {
    background: linear-gradient(
      135deg,
      var(--color-surface-elevated),
      var(--color-status-info-soft)
    );
    border: 1px dashed var(--color-callout-info-border);
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
  }

  .leverage-content h4 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--color-binder);
    font-size: 1.1rem;
    font-weight: 700;
  }

  .leverage-content p {
    margin: 0 0 0.75rem 0;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  .leverage-content p:last-child {
    margin-bottom: 0;
  }

  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .iq-vs-eq-grid,
    .comparison-box,
    .feedback-loop-grid,
    .pattern-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .comparison-card,
    .highlight-box,
    .quote-card,
    .tips-card,
    .comp-item,
    .neuro-card,
    .feedback-card,
    .pattern-card,
    .mikir-card,
    .leverage-card {
      padding: 1.25rem;
    }

    .mikir-content blockquote {
      font-size: 1.1rem;
    }
  }
</style>
