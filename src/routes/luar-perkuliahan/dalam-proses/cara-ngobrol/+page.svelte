<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import VideoSidebar from '$lib/components/VideoSidebar.svelte';
  import VideoSyncArticle from '$lib/components/VideoSyncArticle.svelte';
  import { Play, Sparkles, MessageCircle, Heart, User, Award, CheckCircle } from 'lucide-svelte';

  const videoBaseUrl = 'https://www.youtube.com/watch?v=i-Y-7e4agls';

  let videoSidebar: VideoSidebar;

  const chapters = [
    { title: 'Intro & Rumus Ngobrol Enak', time: '0:13', seconds: 13 },
    { title: 'Belajar Mendengar & Memberi Space', time: '0:43', seconds: 43 },
    { title: 'Memahami Lawan Bicara (Respect & Sopan)', time: '1:30', seconds: 90 },
    { title: 'Berbicara dengan Tempo Santai', time: '2:59', seconds: 179 },
    { title: 'Menjaga Boundaries & Hal Sensitif', time: '3:53', seconds: 233 },
    { title: 'Mengatasi Rasa Gugup', time: '5:25', seconds: 325 },
    { title: 'Menjaga Relasi (Intensi & Waktu)', time: '6:22', seconds: 382 },
    { title: 'Meningkatkan Skill Komunikasi', time: '8:02', seconds: 482 },
    { title: 'Pesan Penting: Tetap Humble', time: '8:57', seconds: 537 },
  ];

  const sectionMap = [
    { id: 'rumus-ngobrol', startSeconds: 13, endSeconds: 42 },
    { id: 'mendengar-memberi-ruang', startSeconds: 43, endSeconds: 89 },
    { id: 'memahami-lawan-bicara', startSeconds: 90, endSeconds: 178 },
    { id: 'tempo-bicara-santai', startSeconds: 179, endSeconds: 232 },
    { id: 'boundaries-sensitif', startSeconds: 233, endSeconds: 324 },
    { id: 'mengatasi-gugup', startSeconds: 325, endSeconds: 381 },
    { id: 'menjaga-relasi', startSeconds: 382, endSeconds: 481 },
    { id: 'pentingnya-komunikasi', startSeconds: 482, endSeconds: 536 },
    { id: 'humble-jangan-sombong', startSeconds: 537, endSeconds: 700 },
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
  <title>Seni Mengobrol & Menjaga Relasi Interpersonal - S2IF Notebook</title>
  <meta
    name="description"
    content="Tips praktis seni mengobrol biar enak, belajar mendengar aktif, memahami tipe lawan bicara, menjaga boundaries sosial, dan merawat hubungan sosial secara tulus dan humble."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Seni Mengobrol & Menjaga Relasi Interpersonal"
    date="31 Mei 2026"
    status="done"
    tags={['Komunikasi', 'Social Skills', 'Mindset', 'Relasi']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini dirangkum berdasarkan sharing pengalaman praktis yang sangat berharga mengenai seni
    berkomunikasi yang efektif. Video lengkap dapat Anda tonton langsung di
    <a href={videoBaseUrl} target="_blank" rel="noopener noreferrer"
      >YouTube: Cara Ngobrol yang Enak</a
    >.
  </Callout>

  <VideoSyncArticle {sectionMap}>
    <!-- Section 1 -->
    <div data-section-id="rumus-ngobrol">
      <NoteSection title="1. Pendahuluan: Adakah Rumus Ngobrol Biar Enak?">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m13s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:13 Intro & Tips Ngobrol
          </a>
        </div>
        <p>
          Banyak orang bertanya-tanya, apakah ada rumus pasti atau resep rahasia untuk bisa
          mengobrol dengan nyaman dan membuat lawan bicara merasa dihargai? Meskipun kemampuan
          berkomunikasi sering dianggap sebagai bakat lahiriah, sebenarnya siapa pun dapat melatih
          dan meningkatkan keterampilan sosial ini berdasarkan pengalaman praktis sehari-hari.
        </p>
        <div class="highlight-box">
          <Sparkles size={18} class="box-icon" />
          <p>
            Komunikasi sejati bukanlah tentang pamer kepintaran atau mendominasi panggung obrolan.
            Esensinya terletak pada kenyamanan bersama, saling menghormati, dan koneksi yang tulus.
          </p>
        </div>
      </NoteSection>
    </div>

    <!-- Section 2 -->
    <div data-section-id="mendengar-memberi-ruang">
      <NoteSection title="2. Belajar Mendengar & Memberi Ruang (Space)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=0m43s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 0:43 Belajar Mendengar
          </a>
        </div>
        <p>
          Langkah pertama dan yang paling krusial dalam membangun obrolan yang berkualitas adalah <strong
            >belajar mendengar</strong
          >
          dan memberikan <strong>space (ruang)</strong> kepada lawan bicara.
        </p>
        <div class="quote-card">
          <p>
            "Conversation itu baru namanya 'flow' kalau kita ngasih ruang buat orang lain ngomong.
            Kalau dikit-dikit langsung di-cut, alurnya akan putus."
          </p>
        </div>
        <p>Ada beberapa hal yang perlu kita latih untuk memberi ruang dalam percakapan:</p>
        <ul>
          <li>
            <strong>Mengerem Keinginan Memotong:</strong> Tahan diri dari keinginan menyela, membantah,
            atau langsung menimpal pembicaraan saat orang lain sedang bercerita, meskipun kita merasa
            sudah mengetahui informasi tersebut.
          </li>
          <li>
            <strong>Dengarkan Sampai Selesai:</strong> Biarkan lawan bicara menuntaskan kalimatnya sebelum
            kita memberikan tanggapan atau opini.
          </li>
          <li>
            <strong>Hadir Sepenuhnya:</strong> Fokuskan perhatian pada apa yang mereka bagikan, bukan
            sibuk menyusun balasan di kepala kita sendiri.
          </li>
        </ul>
      </NoteSection>
    </div>

    <!-- Section 3 -->
    <div data-section-id="memahami-lawan-bicara">
      <NoteSection title="3. Kenali dan Pahami Lawan Bicara Anda">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=1m30s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 1:30 Pahami Lawan Bicara
          </a>
        </div>
        <p>
          Kita harus menyadari dengan siapa kita sedang berbicara. Mengenali status, hubungan, dan
          konteks lawan bicara akan menentukan bagaimana kita membawakan diri di depan mereka.
        </p>

        <div class="role-grid">
          <div class="role-card card-team">
            <div class="role-header">
              <User size={18} />
              <h4>Berbicara dengan Tim / Karyawan</h4>
            </div>
            <p>
              Tunjukkan sisi ketegasan yang mendidik demi profesionalisme kerja, namun tetap jaga
              kesopanan dan integritas hubungan kerja.
            </p>
          </div>

          <div class="role-card card-leader">
            <div class="role-header">
              <Award size={18} />
              <h4>Berbicara dengan Pemimpin / CEO Hebat</h4>
            </div>
            <p>
              Tunjukkan rasa hormat (respect) yang tulus dan bersikap sopan. Namun, **hindari sikap
              'peres' (memuji berlebihan secara palsu)** atau minder. Berbicaralah dengan rasa
              percaya diri yang tenang.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Prinsip Kesetaraan Sosial">
          Sehebat apa pun seseorang, jika kita menghadapinya dengan sopan, hormat, namun tanpa
          kepura-puraan (peres), kita sedang membangun hubungan interpersonal yang sehat dan saling
          menguntungkan (mutual benefit).
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 4 -->
    <div data-section-id="tempo-bicara-santai">
      <NoteSection title="4. Berbicara dengan Tempo yang Lebih Santai">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=2m59s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 2:59 Bicara Tempo Santai
          </a>
        </div>
        <p>
          Cara kita menyajikan kata-kata sangat mempengaruhi persepsi orang lain terhadap tingkat
          kematangan diri kita. Belajarlah berbicara dengan <strong>tempo yang lebih santai</strong> dan
          terkontrol.
        </p>
        <div class="comparison-box">
          <div class="comp-item negative">
            <h5>❌ Intonasi Reaktif & Terburu-buru</h5>
            <p>
              Terlihat tergesa-gesa, terlalu heboh, atau emosional. Biasanya mencerminkan kepanikan,
              kurangnya jam terbang sosial, atau kecenderungan bersikap defensif secara instan.
            </p>
          </div>
          <div class="comp-item positive">
            <h5>✅ Semangat Namun Tetap Tenang</h5>
            <p>
              Menjaga antusiasme obrolan tetapi diiringi intonasi yang tenang dan teratur. Pembawaan
              ini memberikan kesan matang, bijak, dan meyakinkan bagi lawan bicara.
            </p>
          </div>
        </div>
      </NoteSection>
    </div>

    <!-- Section 5 -->
    <div data-section-id="boundaries-sensitif">
      <NoteSection title="5. Menghormati Batasan (Boundaries) & Hal Sensitif">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=3m53s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 3:53 Menjaga Boundaries
          </a>
        </div>
        <p>
          Sensitivitas sosial adalah kemampuan menangkap sinyal emosi lawan bicara dan menyelaraskan
          topik obrolan kita.
        </p>
        <ul>
          <li>
            <strong>Tanggap Terhadap Kondisi Lawan Bicara:</strong> Jika lawan bicara sedang bercerita
            tentang kesulitannya (misal: bisnisnya sedang turun), jangan malah membalas dengan menceritakan
            kesuksesan finansial pribadi Anda yang kontradiktif. Berikan dorongan semangat (encouragement)
            terlebih dahulu.
          </li>
          <li>
            <strong>Gunakan 'Intro' Sebelum Menanyakan Hal Sensitif:</strong> Jika memang perlu
            menanyakan topik yang agak pribadi, sampaikan pengantar sopan terlebih dahulu, seperti:
            <em
              >"Gua mau nanya tentang hal ini, tapi kalau lu merasa sensitif atau gak nyaman buat
              jawab, santai aja ya..."</em
            >
          </li>
          <li>
            <strong>Jangan Mengorek 'Dapur' Orang Lain:</strong> Hindari pertanyaan yang tidak etis mengenai
            rahasia internal bisnis, urusan dapur usaha orang lain, atau hal-hal privasi yang tidak pantas
            ditanyakan pada pertemuan kasual.
          </li>
        </ul>
      </NoteSection>
    </div>

    <!-- Section 6 -->
    <div data-section-id="mengatasi-gugup">
      <NoteSection title="6. Mengatasi Rasa Gugup dengan Sikap Profesional">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=5m25s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 5:25 Mengatasi Rasa Gugup
          </a>
        </div>
        <p>
          Seringkali kita merasa gugup atau canggung saat berinteraksi dengan orang penting atau
          lingkungan baru. Cara terbaik mematahkannya adalah dengan mengadopsi <strong
            >mindset profesionalisme</strong
          >.
        </p>
        <Callout type="info" title="Contoh Kasus">
          Saat Anda berada di dunia kerja, jika atasan meminta Anda untuk memimpin meeting penting
          bersama supplier besar, Anda tidak bisa beralasan "Saya malu Pak, saya introvert."
          Tuntutan profesional memaksa kita menepis rasa malu demi menjalankan tanggung jawab.
          Begitu pula dalam kehidupan bersosialisasi, posisikan interaksi sosial sebagai bagian dari
          proses pendewasaan diri kita yang harus dihadapi dengan berani.
        </Callout>
      </NoteSection>
    </div>

    <!-- Section 7 -->
    <div data-section-id="menjaga-relasi">
      <NoteSection title="7. Strategi Menjaga Relasi: Kombinasi Intensi & Waktu">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=6m22s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 6:22 Menjaga Relasi
          </a>
        </div>
        <p>
          Menjaga relasi jangka panjang bukanlah perkara instan. Kita perlu melakukan filter yang
          bijak untuk menentukan mana relasi yang sejalan dengan nilai-nilai hidup kita (worth
          maintaining). Jika sudah terfilter, rawatlah menggunakan dua pilar utama:
        </p>
        <div class="pilar-container">
          <div class="pilar-card pilar-intensi">
            <h5>1. Intensi (Intent)</h5>
            <p>
              Saat bertemu dengan teman atau rekan kerja, datanglah dengan intensi yang tulus untuk
              saling mendengar dan bertukar cerita secara wajar. **Jangan datang hanya jika ada
              maunya saja** (misal: setelah lama menghilang tiba-tiba menghubungi untuk menawarkan
              jualan/MLM). Ketulusan adalah magnet sosial terbaik.
            </p>
          </div>
          <div class="pilar-card pilar-waktu">
            <h5>2. Waktu (Time)</h5>
            <p>
              Relasi dibangun di atas interaksi. Bahkan relasi bisnis paling profesional pun pada
              dasarnya adalah hubungan antara manusia dengan manusia (human to human). Sediakan
              waktu secara rutin untuk mengobrol atau sekadar menanyakan kabar agar hubungan tidak
              canggung akibat terlalu lama vakum berinteraksi.
            </p>
          </div>
        </div>
      </NoteSection>
    </div>

    <!-- Section 8 -->
    <div data-section-id="pentingnya-komunikasi">
      <NoteSection title="8. Mengapa Kita Harus Meningkatkan Skill Komunikasi?">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m02s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:02 Leverage Komunikasi
          </a>
        </div>
        <p>
          Apakah setiap orang wajib memiliki kemampuan berbicara yang luar biasa? Mungkin tidak
          harus menjadi pembicara publik ulung. Namun, <strong
            >meningkatkan kemampuan berkomunikasi (communication skill) adalah sebuah keharusan
            mutlak</strong
          > bagi siapa saja yang ingin berkembang.
        </p>
        <div class="leverage-card">
          <div class="leverage-content">
            <h4>Komunikasi adalah Daya Ungkit (Social Leverage)</h4>
            <p>
              Kemampuan berkomunikasi dengan lancar, terstruktur, dan meyakinkan membantu kita saat
              bernegosiasi dengan klien, berkolaborasi dengan rekan kerja, memimpin tim, maupun
              dalam menjalin kedekatan bersama pasangan hidup dan keluarga. Bahkan bagi seorang
              introvert sekali pun, interaksi sosial (meski via chat tertulis) tetap memerlukan
              penyampaian bahasa yang baik dan santun agar tidak menimbulkan kesalahpahaman.
            </p>
          </div>
        </div>
      </NoteSection>
    </div>

    <!-- Section 9 -->
    <div data-section-id="humble-jangan-sombong">
      <NoteSection title="9. Pesan Emas: Tetap Rendah Hati (Jangan Sombong)">
        <div class="section-meta-timestamps">
          <span class="meta-label">Materi Video:</span>
          <a
            href="{videoBaseUrl}&t=8m57s"
            target="_blank"
            rel="noopener noreferrer"
            class="timestamp-badge"
            onclick={handleTimestampClick}
          >
            <Play size={12} /> 8:57 Tetap Rendah Hati
          </a>
        </div>
        <p>
          Puncak dari kecerdasan sosial adalah kemampuan untuk menahan ego pribadi dan senantiasa
          bersikap rendah hati (humble) dalam setiap kesempatan.
        </p>
        <div class="humble-warning">
          <CheckCircle size={20} class="warning-icon" />
          <p>
            <strong>Ingat: Di atas langit ada langit.</strong> Kita tidak pernah tahu latar belakang asli
            dari orang yang baru saja kita temui. Banyak orang hebat yang mampu membeli barang-barang
            bernilai miliaran rupiah namun memilih tampil sangat sederhana dan tidak banyak bicara.
          </p>
        </div>
        <p>
          Sifat sombong atau arogan mungkin akan mendatangkan pujian palsu di depan mata Anda karena
          posisi atau aset yang Anda miliki saat ini. Namun di belakang layar, arogansi tersebut
          hanya akan mendatangkan ketidaksukaan dari sekeliling Anda. Ketika roda kehidupan berputar
          ke bawah dan posisi Anda hilang, sikap sombong tersebut dijamin akan meruntuhkan reputasi
          dan jaringan sosial Anda secara instan.
        </p>
      </NoteSection>
    </div>
  </VideoSyncArticle>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="i-Y-7e4agls" {chapters} />

<style>
  /* PREMIUM TYPOGRAPHY & INTEGRATED STYLES FOR THE "CARA NGOBROL" NOTE */

  /* 1. Header & Meta Timestamps styling */
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

  /* 2. Custom premium card components */
  .highlight-box {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    background: linear-gradient(
      135deg,
      var(--color-status-success-soft),
      var(--color-surface-elevated)
    );
    border-left: 4px solid var(--color-status-done-start);
    padding: 1.25rem;
    border-radius: 0 12px 12px 0;
    margin: 1.5rem 0;
  }

  .highlight-box p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  .box-icon {
    color: var(--color-status-done-start);
    flex-shrink: 0;
    margin-top: 2px;
  }

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

  /* 3. Role Grid layout */
  .role-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .role-card {
    padding: 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .role-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  }

  .role-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-binder);
  }

  .role-header h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .role-card p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--color-ink-muted);
  }

  /* 4. Comparison columns */
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

  /* 5. Pilar & Leverage layout */
  .pilar-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 1.5rem 0;
  }

  .pilar-card {
    padding: 1.25rem;
    border-radius: 8px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
  }

  .pilar-card h5 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-binder);
  }

  .pilar-card p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }

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
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  /* 6. Humble Warning styling */
  .humble-warning {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    background: var(--color-status-warning-soft);
    border: 1px solid var(--color-status-warning-border);
    padding: 1.25rem;
    border-radius: 10px;
    margin: 1.5rem 0;
  }

  .humble-warning p {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  .warning-icon {
    color: var(--color-status-warning-border);
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Responsive breakpoints matching reference instructions */
  @media (max-width: 768px) {
    .role-grid,
    .comparison-box {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .highlight-box,
    .quote-card,
    .role-card,
    .comp-item,
    .pilar-card,
    .leverage-card,
    .humble-warning {
      padding: 1rem;
    }
  }
</style>
