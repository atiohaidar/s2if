<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import { HelpCircle } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Labeling Emosi: Mengatasi Emotional Hijack dengan Neurosains - S2IF Notebook</title>
  <meta
    name="description"
    content="Mekanisme neurobiologis di balik teknik affect labeling — bagaimana menamai emosi secara presisi mengaktifkan prefrontal cortex dan meredam amygdala hijack."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Labeling Emosi: Mengatasi Emotional Hijack dengan Neurosains"
    date="31 Mei 2026"
    status="done"
    tags={['Psikologi', 'Neurosains', 'Mindset', 'Produktivitas']}
  />

  <Callout type="info" title="Sumber Referensi & Validitas Ilmiah">
    Catatan ini disusun berdasarkan mekanisme neurobiologis dari teknik <strong
      >Affect Labeling</strong
    >
    (menamai emosi). Teknik ini didukung oleh berbagai studi neuroimaging (fMRI) dan psikologi regulasi
    emosi seperti
    <em>Lieberman et al. (2007)</em>, <em>Hariri et al. (2000)</em>, dan tinjauan komprehensif
    <em>Torre & Lieberman (2018)</em>. Di bawah ini, referensi ilmiah disematkan langsung pada
    masing-masing klaim mekanisme untuk menjaga keandalan informasi.
  </Callout>

  <!-- SECTION 1: Kenapa Ini Penting -->
  <NoteSection title="1. Kenapa Ini Penting Buat Kita?">
    <p>
      Sebagai mahasiswa S2 atau siapapun yang sering berhadapan dengan tekanan intelektual tinggi —
      entah itu diskusi riset, kerja kelompok, <em>peer review</em>, atau sekadar bertukar pikiran
      soal tugas — kita pasti pernah mengalami momen di mana emosi tiba-tiba
      <strong>meledak duluan</strong> sebelum otak rasional sempat berpikir.
    </p>
    <p>
      Momen ini punya nama ilmiahnya: <strong>Amygdala Hijack</strong>. Dan ternyata, ada mekanisme
      neurobiologis yang sangat simpel untuk mengatasinya — cukup dengan
      <strong>menamai emosi yang sedang kita rasakan</strong>.
    </p>
    <p>
      Kedengerannya terlalu sederhana? Justru itulah <em>beauty</em>-nya. Mari kita bedah kenapa ini
      bekerja secara sains.
    </p>
  </NoteSection>

  <!-- SECTION 2: Skenario Nyata -->
  <NoteSection title="2. Skenario: Dikritik Teman Soal Metodologi Riset">
    <p>Bayangkan skenario ini. Lu sedang diskusi kelompok riset, dan teman satu tim lu bilang:</p>
    <div class="scenario-quote">
      <p>"Metodologi riset bagian lu kayaknya agak kurang kuat deh landasannya."</p>
    </div>

    <h4 class="scenario-label scenario-label--danger">❌ Tanpa Labeling (Amygdala Hijack)</h4>
    <div class="pathway-card pathway-card--danger">
      <div class="pathway-step">
        <span class="step-icon">🎯</span>
        <div>
          <strong>Trigger masuk</strong> — Kalimat kritik teman diproses oleh thalamus.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">🧨</span>
        <div>
          <strong>Thalamus → Amygdala (jalur cepat)</strong> — Otak emosional langsung aktif. Sinyal
          bahaya: <em>"Kompetensi gua diraguin!"</em>
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">🧠</span>
        <div>
          <strong>Prefrontal cortex: OFFLINE</strong> — Otak rasional di-<em>hijack</em>. Gak bisa
          mikir jernih.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">💢</span>
        <div>
          <strong>Respon otomatis:</strong>
          <em>"Sotoy banget sih, emang riset dia sendiri udah bener?"</em> — Defensif, marah, atau
          malah <em>passive-aggressive</em> ke teman sendiri.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">⏱️</span>
        <div>
          <strong>Waktu recovery: 20+ menit</strong> (atau berjam-jam kalau terus
          <em>overthinking</em>).
        </div>
      </div>
    </div>

    <h4 class="scenario-label scenario-label--success">✅ Dengan Labeling (Controlled Response)</h4>
    <div class="pathway-card pathway-card--success">
      <div class="pathway-step">
        <span class="step-icon">🎯</span>
        <div>
          <strong>Trigger masuk</strong> — Kalimat kritik yang sama.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">🧨</span>
        <div>
          <strong>Amygdala tetap aktif</strong> — Perasaan gak enak muncul. Itu wajar, gak bisa dihindari.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">🏷️</span>
        <div>
          <strong>Lu LABELI:</strong>
          <em>"Gua lagi ngerasa defensif dan insecure soal riset gua."</em>
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">💬</span>
        <div>
          <strong>Labeling → Broca's & Wernicke's area aktif</strong> — Proses menamai emosi memaksa
          <em>language centers</em> bekerja.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">🧠</span>
        <div>
          <strong>Language centers = bagian dari Prefrontal Cortex → ONLINE!</strong> — Prefrontal
          kirim <em>inhibitory signals</em> ke amygdala: <em>"Chill, I got this."</em>
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">😌</span>
        <div>
          <strong>Respon terkendali:</strong>
          <em
            >"Oh iya ya, boleh dong jelasin bagian mana yang kurang kuat? Biar gua perkuat lagi
            landasannya."</em
          > — Konstruktif, kepala dingin.
        </div>
      </div>
      <div class="pathway-arrow">↓</div>
      <div class="pathway-step">
        <span class="step-icon">⏱️</span>
        <div>
          <strong>Waktu recovery: 3–5 menit</strong> (resolusi natural).
        </div>
      </div>
    </div>

    <p>
      <strong>See the difference?</strong> Skenario sama persis, tapi hasilnya beda 180°. Yang
      berubah cuma satu hal: <em>lu menamai emosinya atau enggak</em>.
    </p>
  </NoteSection>

  <!-- SECTION 3: Mekanisme Biologis -->
  <NoteSection title="3. Mekanisme Biologis: Kenapa Naming Bekerja?">
    <p>Otak kita punya dua sistem utama yang saling tarik-menarik:</p>

    <div class="brain-systems">
      <div class="brain-card brain-card--amygdala">
        <h4>🧨 Amygdala</h4>
        <p class="brain-subtitle">Emotional Brain</p>
        <ul>
          <li>Fast, automatic</li>
          <li>"DANGER! REACT!"</li>
          <li>Saat dominan → lu <em>feel</em>, tapi gak bisa <em>think</em></li>
        </ul>
      </div>
      <div class="brain-vs">VS</div>
      <div class="brain-card brain-card--prefrontal">
        <h4>🧠 Prefrontal Cortex</h4>
        <p class="brain-subtitle">Thinking Brain</p>
        <ul>
          <li>Slow, deliberate</li>
          <li>"Let me assess this."</li>
          <li>Bisa SUPPRESS amygdala lewat <em>inhibitory fibers</em></li>
        </ul>
      </div>
    </div>

    <Callout type="tip" title="Core Insight">
      Prefrontal cortex memiliki <strong>physical inhibitory fibers</strong> yang terhubung langsung
      ke amygdala. Artinya, prefrontal cortex bisa literally "mematikan alarm" yang dikirim
      amygdala. Masalahnya? Prefrontal cortex butuh di-<em>trigger</em> dulu supaya menyala. Dan
      cara paling efektif men-<em>trigger</em>-nya? <strong>Menggunakan bahasa (language)</strong>
      <span class="citation-tag">[Hariri et al., 2000; Lieberman et al., 2007]</span>.
    </Callout>

    <h4>Kenapa Language?</h4>
    <div class="qa-block">
      <div class="qa-question">
        <span class="qa-label">Q:</span>
        "Tunggu, kenapa cuma 'menyebut nama' emosinya, kita langsung tenang? Magic macam apa ini?"
      </div>
      <div class="qa-answer">
        <span class="qa-label">A:</span>
        Simple. Ketika lu berusaha mencari kosakata untuk menamai emosi lu (misal:
        <em>"Gua lagi ngerasa defensif"</em>), lu
        <strong
          >terpaksa mengaktifkan Broca's area (produksi bahasa) & Wernicke's area (pemahaman bahasa)</strong
        >. Nah, language centers ini adanya di
        <strong>Prefrontal Cortex</strong>. Begitu prefrontal dipaksa ON untuk menyusun kata-kata,
        dia otomatis mengirimkan inhibitory signal ke amygdala: "Chill out, I got this."
        <em>Literal shut-down button</em>
        <span class="citation-tag">[Lieberman et al., 2007]</span>.
      </div>
    </div>
    <div class="qa-block">
      <div class="qa-question">
        <span class="qa-label">Q:</span>
        "Kenapa gak cukup cuma 'merasakan' aja tanpa dilabeli kata-kata?"
      </div>
      <div class="qa-answer">
        <span class="qa-label">A:</span>
        Karena kalau cuma dirasain tanpa disebut pakai kata,
        <strong>language centers lu tetap diam</strong>. Prefrontal cortex gak terpancing untuk
        online. Akibatnya, amygdala tetap dominan nge-release stress hormones (cortisol &
        adrenaline) tanpa ada remnya.
        <em>See the difference?</em> <span class="citation-tag">[Torre & Lieberman, 2018]</span>
      </div>
    </div>
    <div class="qa-block">
      <div class="qa-question">
        <span class="qa-label">Q:</span>
        "Kalau gitu, semakin presisi labelnya, semakin efektif?"
      </div>
      <div class="qa-answer">
        <span class="qa-label">A:</span>
        <strong>Exactly.</strong> Studi fMRI menunjukkan bahwa semakin akurat dan spesifik label
        emosinya, semakin besar penurunan aktivasi amygdala. Bilang <em>"gua stres"</em> itu kurang
        tajam — terlalu generik. Tapi bilang
        <em>"gua ngerasa insecure soal kemampuan riset gua"</em>? Jauh lebih powerful karena otak
        harus bekerja lebih keras untuk menyusun deskripsi yang tepat
        <span class="citation-tag">[Lieberman et al., 2007; Torre & Lieberman, 2018]</span>.
      </div>
    </div>
  </NoteSection>

  <!-- SECTION 4: Evidence fMRI -->
  <NoteSection title="4. Bukti Sains: Studi fMRI (Brain Imaging)">
    <p>
      Ini bukan teori motivasi atau self-help biasa. Ini backed by <strong
        >brain imaging studies</strong
      >.
    </p>
    <p>
      Researchers menunjukkan gambar-gambar emosional kepada partisipan, lalu meminta mereka
      melakukan dua hal:
    </p>
    <ul>
      <li><strong>Kelompok A:</strong> Hanya mengalami emosi (tanpa labeling)</li>
      <li>
        <strong>Kelompok B:</strong> Menamai emosi yang dirasakan ("Ini kemarahan", "Ini takut")
      </li>
    </ul>

    <div class="fmri-comparison">
      <div class="fmri-card fmri-card--without">
        <h4>Tanpa Labeling</h4>
        <div class="fmri-metric">
          <span class="metric-label">Amygdala</span>
          <div class="metric-bar metric-bar--high"></div>
          <span class="metric-value">HIGH ⬆️</span>
        </div>
        <div class="fmri-metric">
          <span class="metric-label">Prefrontal</span>
          <div class="metric-bar metric-bar--low"></div>
          <span class="metric-value">LOW ⬇️</span>
        </div>
        <div class="fmri-metric">
          <span class="metric-label">Emosi</span>
          <div class="metric-bar metric-bar--high"></div>
          <span class="metric-value">STRONG 🔥</span>
        </div>
      </div>
      <div class="fmri-card fmri-card--with">
        <h4>Dengan Labeling</h4>
        <div class="fmri-metric">
          <span class="metric-label">Amygdala</span>
          <div class="metric-bar metric-bar--low"></div>
          <span class="metric-value">LOW ⬇️</span>
        </div>
        <div class="fmri-metric">
          <span class="metric-label">Prefrontal</span>
          <div class="metric-bar metric-bar--high-good"></div>
          <span class="metric-value">HIGH ⬆️</span>
        </div>
        <div class="fmri-metric">
          <span class="metric-label">Emosi</span>
          <div class="metric-bar metric-bar--low"></div>
          <span class="metric-value">REDUCED ✅</span>
        </div>
      </div>
    </div>

    <div class="references-list">
      <h4>📚 Kumpulan Studi & Referensi Utama</h4>

      <div class="reference-item">
        <div class="ref-meta">
          <span class="ref-author">Lieberman, M. D., et al. (2007)</span>
          <span class="ref-journal">Psychological Science</span>
        </div>
        <p class="ref-title">
          <strong
            >"Putting Feelings Into Words: Affect Labeling Disrupts Amygdala Activity in Response to
            Affective Stimuli"</strong
          >
        </p>
        <p class="ref-desc">
          <em>Seminal paper</em> yang membuktikan secara langsung via fMRI bahwa verbal labeling
          mengurangi reaktivitas amygdala melalui peningkatan aktivasi
          <strong>Right Ventrolateral Prefrontal Cortex (RVLPFC)</strong>.
        </p>
      </div>

      <div class="reference-item">
        <div class="ref-meta">
          <span class="ref-author">Hariri, A. R., Bookheimer, S. Y., & Mazziotta, J. C. (2000)</span
          >
          <span class="ref-journal">NeuroReport</span>
        </div>
        <p class="ref-title">
          <strong>"Modulating amygdala response to fearful stimuli"</strong>
        </p>
        <p class="ref-desc">
          Studi awal yang menunjukkan bahwa mencocokkan/menamai stimulasi emosional secara sadar
          memicu regulasi prefrontal dan meredam aktivitas amygdala.
        </p>
      </div>

      <div class="reference-item">
        <div class="ref-meta">
          <span class="ref-author">Torre, J. B., & Lieberman, M. D. (2018)</span>
          <span class="ref-journal">Emotion Review</span>
        </div>
        <p class="ref-title">
          <strong
            >"Putting Feelings Into Words: Affect Labeling as Implicit Emotion Regulation"</strong
          >
        </p>
        <p class="ref-desc">
          Tinjauan komprehensif yang mengukuhkan <em>affect labeling</em> sebagai bentuk
          <strong>implicit emotion regulation</strong>
          yang sangat efektif pada tingkat eksperiensial, fisiologis (autonomic), dan neural, tanpa membebani
          kapasitas kognitif.
        </p>
      </div>
    </div>
  </NoteSection>

  <!-- SECTION 5: Math-Like Visual Synthesis -->
  <NoteSection title="5. Visual Synthesis: Formula Reboot Emosi">
    <p>Kalau kita sederhanakan seluruh mekanisme biologisnya menjadi sebuah formula:</p>

    <div class="formula-container">
      <div class="formula-row formula-row--danger">
        <span class="formula-label">Tanpa Naming:</span>
        <span class="formula-eq"
          >Stress Trigger + Silence = Amygdala Hijack (Thinking Brain OFF)</span
        >
      </div>
      <div class="formula-row formula-row--success">
        <span class="formula-label">Dengan Naming:</span>
        <span class="formula-eq"
          >Stress Trigger + Precise Labeling = Prefrontal Activation (System Restore)</span
        >
      </div>
    </div>

    <div class="visual-pathway">
      <div class="pathway-diagram">
        <div class="diagram-row">
          <div class="diagram-node diagram-node--trigger">Trigger</div>
          <div class="diagram-connector">→</div>
          <div class="diagram-node diagram-node--thalamus">Thalamus</div>
          <div class="diagram-connector">→</div>
          <div class="diagram-node diagram-node--amygdala">Amygdala</div>
        </div>
        <div class="diagram-branch">
          <div class="branch-line">↗ (dengan labeling)</div>
        </div>
        <div class="diagram-row">
          <div class="diagram-node diagram-node--language">Language Processing</div>
          <div class="diagram-connector">→</div>
          <div class="diagram-node diagram-node--prefrontal">Prefrontal Cortex</div>
          <div class="diagram-connector">→</div>
          <div class="diagram-node diagram-node--inhibit">Inhibitory Signal → Amygdala 🔇</div>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- SECTION 6: Neurochemistry Loop -->
  <NoteSection title="6. Feedback Loop: Kenapa Tanpa Labeling Bikin Stuck">
    <p>
      Tanpa labeling, yang terjadi adalah <strong>feedback loop negatif</strong> yang bikin emosi makin
      lama makin parah:
    </p>

    <div class="loop-container">
      <div class="loop-card loop-card--negative">
        <h4>🔴 Loop Negatif (Tanpa Labeling)</h4>
        <div class="loop-steps">
          <span class="loop-step">Amygdala aktif</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Release cortisol & adrenaline</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Stress hormones keep amygdala active</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Prefrontal SUPPRESSED</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step loop-step--highlight">STUCK di emotional state 🔁</span>
        </div>
      </div>
      <div class="loop-card loop-card--positive">
        <h4>🟢 Loop Positif (Dengan Labeling)</h4>
        <div class="loop-steps">
          <span class="loop-step">Amygdala aktif</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Lu label emosi</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Prefrontal ON → inhibit amygdala</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step">Less stress hormones</span>
          <span class="loop-arrow">→</span>
          <span class="loop-step loop-step--highlight">More prefrontal → CALMER 🔁</span>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- SECTION 7: Analogi -->
  <NoteSection title="7. Analogi: Fire Alarm & Burnt Toast">
    <p>Biar makin gampang diinget, bayangin skenario <em>fire alarm</em>:</p>

    <div class="analogy-grid">
      <div class="analogy-card analogy-card--without">
        <h4>🚨 Tanpa Naming</h4>
        <p>FIRE ALARM TRIGGERED</p>
        <p>↓ Everyone panic (amygdala hijack)</p>
        <p>↓ Nobody thinking clearly</p>
        <p>↓ Alarm keep ringing, berjam-jam</p>
        <p>↓ Akhirnya baru sadar: <em>ternyata cuma roti gosong</em></p>
      </div>
      <div class="analogy-card analogy-card--with">
        <h4>🧯 Dengan Naming</h4>
        <p>FIRE ALARM TRIGGERED</p>
        <p>↓ Someone: <em>"Wait, itu smoke detector. Let me check."</em></p>
        <p>↓ Actively assess (prefrontal aktif)</p>
        <p>↓ <em>"Oh, cuma roti gosong. Bukan kebakaran."</em></p>
        <p>↓ Alarm dimatikan. Everyone calm.</p>
      </div>
    </div>

    <p>
      <strong>Bottom Line:</strong> Labeling itu seperti orang yang bilang
      <em>"Wait, let me check"</em> — memaksa otak kita untuk mengaktifkan mode asesmen rasional, bukan
      mode panik otomatis.
    </p>
  </NoteSection>

  <!-- SECTION 8: Mental Debugging Cheat Sheet -->
  <NoteSection title="8. Mental Debugging Cheat Sheet 🛠️">
    <Callout type="tip" title="3-Step Reboot Sequence">
      Ketika lu merasa emosi mulai <em>hijack</em> otak — entah saat diskusi kelompok, baca
      feedback, atau situasi apapun — jalankan <strong>3 langkah reboot</strong> ini:
    </Callout>

    <div class="cheatsheet">
      <div class="cheat-step">
        <div class="cheat-number">1</div>
        <div class="cheat-content">
          <h4>Stop & Breakpoint 🛑</h4>
          <p>
            Sadari sinyal fisik di tubuh lu: jantung berdebar, napas pendek, rahang mengencang,
            pengen bales ketus. Ini <strong>red flag</strong> bahwa amygdala lagi dominan dan
            prefrontal cortex lu sedang <em>offline</em>.
          </p>
        </div>
      </div>
      <div class="cheat-step">
        <div class="cheat-number">2</div>
        <div class="cheat-content">
          <h4>Precision Labeling (Name the Bug) 🏷️</h4>
          <p>
            Jangan cuma bilang <em>"Gua stres."</em> Itu terlalu generik — seperti error log yang
            cuma bilang <code>Error: something went wrong</code>.
          </p>
          <p>
            Cari nama <strong>spesifiknya</strong>. Apakah itu:
          </p>
          <ul>
            <li><strong>Shame</strong> — "Gua malu karena merasa gak kompeten"</li>
            <li><strong>Defensive</strong> — "Gua ngerasa diserang dan pengen bales"</li>
            <li><strong>Insecure</strong> — "Gua takut orang lain nganggep gua gak layak"</li>
            <li>
              <strong>Overwhelmed</strong> — "Gua kewalahan karena terlalu banyak yang harus dibenerin"
            </li>
          </ul>
          <p>
            <strong
              >Semakin presisi labelnya, semakin kuat prefrontal cortex meredam amygdala.</strong
            >
          </p>
        </div>
      </div>
      <div class="cheat-step">
        <div class="cheat-number">3</div>
        <div class="cheat-content">
          <h4>Deploy Patch (Wait for Calm) ⏳</h4>
          <p>
            Setelah melabeli emosi, tunggu <strong>3–5 menit</strong>. Biarkan hormon stres
            (cortisol & adrenaline) luruh secara natural. Ini bukan kelemahan — ini adalah
            neuroscience. Otak lu sedang menjalankan <em>garbage collection</em> untuk membersihkan stress
            hormones dari sistem.
          </p>
          <p>
            Setelah itu, barulah respon. Lu akan takjub betapa berbedanya kualitas respon lu
            dibanding kalau lu langsung bereaksi impulsif.
          </p>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- SECTION 9: Langkah Meningkatkan Kecerdasan Emosional -->
  <NoteSection title="9. Langkah Meningkatkan Kecerdasan Emosional (Satu Persen)">
    <p>
      <a
        href="https://www.youtube.com/watch?v=jnwOBr7DtKA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Memahami Emosi dan Perasaan (Membaca Orang Lain Dan Diri Sendiri) | Belajar Psikologi: Seri
        Emosi
      </a>. Berikut adalah langkah konkret untuk meningkatkan kecerdasan emosional kita secara
      berkala:
    </p>

    <div class="eq-steps-container">
      <!-- LANGKAH 1 -->
      <div class="eq-step-card">
        <div class="eq-step-num">1</div>
        <div class="eq-step-content">
          <h4>Kenali dan Namai Emosi <span class="eq-time">⏱️ 3:09 - 4:21</span></h4>
          <p>
            Sadarilah apa yang sedang lu rasakan (misal: marah, iri, sedih) secara jujur dan cari
            tahu apa penyebab utamanya. Mampu mengidentifikasi emosi secara presisi adalah gerbang
            awal mengaktifkan kontrol rasional di prefrontal cortex.
          </p>
        </div>
      </div>

      <!-- LANGKAH 2 -->
      <div class="eq-step-card">
        <div class="eq-step-num">2</div>
        <div class="eq-step-content">
          <h4>Terima Emosi <span class="eq-time">⏱️ 4:28 - 5:41</span></h4>
          <p>
            Jangan melawan, menolak, atau menyangkal emosi tersebut. Sadarilah bahwa emosi hanyalah
            reaksi otak yang netral terhadap suatu stimulus, bukan hal memalukan yang harus ditekan.
          </p>
        </div>
      </div>

      <!-- LANGKAH 3 -->
      <div class="eq-step-card">
        <div class="eq-step-num">3</div>
        <div class="eq-step-content">
          <h4>Refleksi <span class="eq-time">⏱️ 5:44 - 6:44</span></h4>
          <p>
            Lakukan <em>cognitive reframing</em> dengan mencoba melihat situasi dari sudut pandang yang
            berbeda untuk mengubah persepsi lu. Apakah kritik teman tadi benar-benar serangan personal,
            atau sebenarnya peluang perbaikan?
          </p>
        </div>
      </div>

      <!-- LANGKAH 4 -->
      <div class="eq-step-card">
        <div class="eq-step-num">4</div>
        <div class="eq-step-content">
          <h4>Tindakan yang Tepat <span class="eq-time">⏱️ 6:48 - 7:38</span></h4>
          <p>
            Pahami batas kendali diri. Meskipun letupan emosi pertama kali di otak sangat sulit
            dikontrol (karena amygdala bekerja instan),
            <strong
              >tindakan nyata yang lu ambil selanjutnya 100% berada di bawah kendali kesadaran lu</strong
            >.
          </p>
        </div>
      </div>

      <!-- LANGKAH 5 -->
      <div class="eq-step-card">
        <div class="eq-step-num">5</div>
        <div class="eq-step-content">
          <h4>Empati <span class="eq-time">⏱️ 7:40 - 8:13</span></h4>
          <p>
            Berusahalah untuk memahami perasaan dan posisi orang lain. Dengan berempati, lu bisa
            menurunkan ego pribadi, menyelaraskan komunikasi, dan merespon situasi sulit dengan jauh
            lebih tenang dan bijak.
          </p>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- Glosarium -->
  <NoteSection title="Glosarium">
    <div class="glossary-container">
      <div class="glossary-item">
        <div class="term-wrapper">
          <span class="glossary-term">Amygdala</span>
          <span
            class="baby-trigger"
            data-tooltip="👶 Alarm kebakaran di otak. Kalau aktif, semua panik dulu baru mikir belakangan."
            ><HelpCircle size={16} /></span
          >
        </div>
        <span class="glossary-definition"
          >Struktur kecil berbentuk almond di otak yang berfungsi sebagai pusat pemrosesan emosi,
          terutama rasa takut dan ancaman. Bekerja sangat cepat dan otomatis.</span
        >
      </div>
      <div class="glossary-item">
        <div class="term-wrapper">
          <span class="glossary-term">Prefrontal Cortex</span>
          <span
            class="baby-trigger"
            data-tooltip="👶 Pilot pesawat. Bisa ambil alih kendali dari autopilot (amygdala) kalau di-activate."
            ><HelpCircle size={16} /></span
          >
        </div>
        <span class="glossary-definition"
          >Bagian depan otak yang bertanggung jawab untuk berpikir rasional, pengambilan keputusan,
          perencanaan, dan pengendalian impuls. Bisa mengirim sinyal inhibitory ke amygdala.</span
        >
      </div>
      <div class="glossary-item">
        <div class="term-wrapper">
          <span class="glossary-term">Amygdala Hijack</span>
          <span
            class="baby-trigger"
            data-tooltip="👶 Kayak HP yang tiba-tiba freeze. Sentuh tombol apapun gak respon, cuma bisa nunggu sampe normal lagi."
            ><HelpCircle size={16} /></span
          >
        </div>
        <span class="glossary-definition"
          >Kondisi di mana amygdala 'membajak' kendali otak sehingga respon emosional mendominasi
          sebelum otak rasional (prefrontal cortex) sempat memproses situasi.</span
        >
      </div>
      <div class="glossary-item">
        <div class="term-wrapper">
          <span class="glossary-term">Affect Labeling</span>
          <span
            class="baby-trigger"
            data-tooltip="👶 Kasih nama ke perasaan lu. Kayak nulis commit message yang jelas biar gak bingung."
            ><HelpCircle size={16} /></span
          >
        </div>
        <span class="glossary-definition"
          >Teknik menamai emosi yang sedang dirasakan secara verbal atau internal. Proses ini
          mengaktifkan language centers di prefrontal cortex, yang kemudian mengirim inhibitory
          signals ke amygdala.</span
        >
      </div>
      <div class="glossary-item">
        <div class="term-wrapper">
          <span class="glossary-term">Inhibitory Fibers</span>
          <span
            class="baby-trigger"
            data-tooltip="👶 Rem di mobil. Prefrontal cortex injek rem ke amygdala biar gak ngebut terus."
            ><HelpCircle size={16} /></span
          >
        </div>
        <span class="glossary-definition"
          >Jalur saraf fisik dari prefrontal cortex menuju amygdala yang berfungsi menekan atau
          meredakan aktivasi emosional. Semakin aktif prefrontal cortex, semakin kuat sinyal
          penekanannya.</span
        >
      </div>
    </div>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<style>
  /* ============================
     SCENARIO QUOTE
     ============================ */
  .scenario-quote {
    background: var(--color-surface-elevated);
    border-left: 4px solid var(--color-binder);
    padding: 1rem 1.5rem;
    margin: 1.25rem 0;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-size: 1.1rem;
    color: var(--color-ink);
    font-family: var(--font-handwriting);
  }

  /* ============================
     SCENARIO LABELS
     ============================ */
  .scenario-label {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-handwriting);
    font-size: 1.15rem;
  }
  .scenario-label--danger {
    color: var(--color-status-warning-border);
  }
  .scenario-label--success {
    color: var(--color-status-done-start);
  }

  /* ============================
     PATHWAY CARDS
     ============================ */
  .pathway-card {
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .pathway-card--danger {
    background: var(--color-status-warning-soft);
    border: 1px solid var(--color-status-warning-border);
  }
  .pathway-card--success {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-done-start);
  }
  .pathway-step {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.35rem 0;
  }
  .step-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .pathway-arrow {
    text-align: center;
    color: var(--color-ink-muted);
    font-size: 1rem;
    padding: 0.1rem 0;
  }

  /* ============================
     BRAIN SYSTEMS COMPARISON
     ============================ */
  .brain-systems {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .brain-card {
    flex: 1;
    padding: 1.25rem;
    border-radius: 12px;
    text-align: center;
  }
  .brain-card h4 {
    margin-top: 0;
    font-size: 1.15rem;
  }
  .brain-card ul {
    text-align: left;
    padding-left: 1.25rem;
    margin-bottom: 0;
  }
  .brain-subtitle {
    font-size: 0.85rem;
    color: var(--color-ink-muted);
    margin-top: -0.5rem;
    margin-bottom: 0.75rem;
    font-style: italic;
  }
  .brain-card--amygdala {
    background: var(--color-status-warning-soft);
    border: 2px solid var(--color-status-warning-border);
  }
  .brain-card--prefrontal {
    background: var(--color-status-success-soft);
    border: 2px solid var(--color-status-done-start);
  }
  .brain-vs {
    font-weight: 900;
    font-size: 1.3rem;
    color: var(--color-ink-muted);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .brain-systems {
      flex-direction: column;
    }
    .brain-vs {
      margin: 0.5rem 0;
    }
  }

  /* ============================
     Q&A DIALOGUE BLOCKS
     ============================ */
  .qa-block {
    margin: 1rem 0;
  }
  .qa-question,
  .qa-answer {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-bottom: 0.35rem;
    line-height: 1.6;
  }
  .qa-question {
    background: var(--color-surface-elevated);
    border-left: 3px solid var(--color-binder);
    font-style: italic;
  }
  .qa-answer {
    background: var(--color-surface-soft);
    border-left: 3px solid var(--color-status-done-start);
  }
  .qa-label {
    font-weight: 800;
    font-family: var(--font-handwriting);
    margin-right: 0.35rem;
    color: var(--color-binder);
  }

  /* ============================
     fMRI COMPARISON
     ============================ */
  .fmri-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .fmri-card {
    padding: 1.25rem;
    border-radius: 12px;
    text-align: center;
  }
  .fmri-card h4 {
    margin-top: 0;
    font-family: var(--font-handwriting);
    font-size: 1.1rem;
  }
  .fmri-card--without {
    background: var(--color-status-warning-soft);
    border: 1px solid var(--color-status-warning-border);
  }
  .fmri-card--with {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-done-start);
  }
  .fmri-metric {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .metric-label {
    width: 80px;
    text-align: right;
    font-weight: 600;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
  .metric-bar {
    height: 14px;
    border-radius: 7px;
    flex: 1;
  }
  .metric-bar--high {
    background: linear-gradient(90deg, #e57373 0%, #ef5350 100%);
    max-width: 80%;
  }
  .metric-bar--low {
    background: linear-gradient(90deg, #e0e0e0 0%, #bdbdbd 100%);
    max-width: 30%;
  }
  .metric-bar--high-good {
    background: linear-gradient(90deg, #66bb6a 0%, #43a047 100%);
    max-width: 80%;
  }
  .metric-value {
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
    width: 70px;
    text-align: left;
  }

  @media (max-width: 768px) {
    .fmri-comparison {
      grid-template-columns: 1fr;
    }
  }

  /* ============================
     FORMULA
     ============================ */
  .formula-container {
    margin: 1.5rem 0;
  }
  .formula-row {
    padding: 0.85rem 1.25rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    font-family: var(--font-mono, 'Courier New', monospace);
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
  }
  .formula-row--danger {
    background: var(--color-status-warning-soft);
    border-left: 4px solid var(--color-status-warning-border);
  }
  .formula-row--success {
    background: var(--color-status-success-soft);
    border-left: 4px solid var(--color-status-done-start);
  }
  .formula-label {
    font-weight: 700;
    flex-shrink: 0;
  }
  .formula-eq {
    font-size: 0.85rem;
  }

  /* ============================
     VISUAL PATHWAY DIAGRAM
     ============================ */
  .visual-pathway {
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  .pathway-diagram {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }
  .diagram-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0.5rem 0;
  }
  .diagram-node {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .diagram-node--trigger {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
  }
  .diagram-node--thalamus {
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-callout-info-border);
  }
  .diagram-node--amygdala {
    background: var(--color-status-warning-soft);
    border: 2px solid var(--color-status-warning-border);
  }
  .diagram-node--language {
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-callout-info-border);
  }
  .diagram-node--prefrontal {
    background: var(--color-status-success-soft);
    border: 2px solid var(--color-status-done-start);
  }
  .diagram-node--inhibit {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-done-start);
    color: var(--color-status-done-start);
  }
  .diagram-connector {
    font-size: 1.2rem;
    color: var(--color-ink-muted);
    font-weight: 700;
  }
  .diagram-branch {
    color: var(--color-status-done-start);
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.25rem 0;
  }

  /* ============================
     FEEDBACK LOOP
     ============================ */
  .loop-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .loop-card {
    padding: 1.25rem;
    border-radius: 12px;
  }
  .loop-card h4 {
    margin-top: 0;
    font-family: var(--font-handwriting);
  }
  .loop-card--negative {
    background: var(--color-status-warning-soft);
    border: 1px solid var(--color-status-warning-border);
  }
  .loop-card--positive {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-done-start);
  }
  .loop-steps {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .loop-step {
    background: var(--color-surface);
    padding: 0.35rem 0.7rem;
    border-radius: 6px;
    font-size: 0.82rem;
    border: 1px solid var(--color-line);
  }
  .loop-step--highlight {
    font-weight: 700;
    border: 2px solid var(--color-binder);
  }
  .loop-arrow {
    color: var(--color-ink-muted);
    font-weight: 700;
    font-size: 1rem;
  }

  /* ============================
     ANALOGY GRID
     ============================ */
  .analogy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .analogy-card {
    padding: 1.25rem;
    border-radius: 12px;
  }
  .analogy-card h4 {
    margin-top: 0;
    font-family: var(--font-handwriting);
    font-size: 1.1rem;
  }
  .analogy-card p {
    margin: 0.35rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .analogy-card--without {
    background: var(--color-status-warning-soft);
    border: 1px solid var(--color-status-warning-border);
  }
  .analogy-card--with {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-done-start);
  }

  @media (max-width: 768px) {
    .analogy-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ============================
     CHEAT SHEET
     ============================ */
  .cheatsheet {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 1.5rem 0;
  }
  .cheat-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }
  .cheat-step:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
  .cheat-number {
    background: var(--color-binder);
    color: var(--color-surface);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .cheat-content h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: var(--font-handwriting);
    font-size: 1.1rem;
  }
  .cheat-content code {
    background: var(--color-surface-soft);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.85rem;
    border: 1px solid var(--color-line);
  }

  /* ============================
     GLOSSARY (same pattern as sibling topics)
     ============================ */
  .glossary-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .glossary-item {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 768px) {
    .glossary-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
  .glossary-term {
    font-weight: bold;
    color: var(--color-binder);
    font-family: var(--font-handwriting);
    font-size: 1.1rem;
  }
  .glossary-definition {
    color: var(--color-ink);
    line-height: 1.5;
  }
  .term-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .baby-trigger {
    position: relative;
    cursor: pointer;
    font-size: 1.2rem;
    user-select: none;
    display: inline-block;
    transition: transform 0.2s;
  }
  .baby-trigger:hover {
    transform: scale(1.3) rotate(10deg);
  }
  .baby-trigger::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 130%;
    left: 50%;
    transform: translateX(-50%) scale(0.85);
    background: #fff9c4;
    color: #5d4037;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 2px solid #fff176;
    font-family: var(--font-handwriting);
    font-size: 0.95rem;
    font-weight: normal;
    width: 260px;
    white-space: normal;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.2s,
      transform 0.2s;
    z-index: 100;
    line-height: 1.4;
    text-align: left;
  }
  .baby-trigger:hover::after {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  .baby-trigger::before {
    content: '';
    position: absolute;
    bottom: 115%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 8px 0;
    border-style: solid;
    border-color: #fff176 transparent;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 100;
    pointer-events: none;
  }
  .baby-trigger:hover::before {
    opacity: 1;
  }

  /* ============================
     CITATIONS & MULTIPLE REFERENCES
     ============================ */
  .citation-tag {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-binder);
    background: var(--color-surface-soft);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    margin-left: 0.25rem;
    font-family: var(--font-mono, monospace);
    border: 1px solid var(--color-line);
    vertical-align: middle;
  }

  .references-list {
    margin-top: 2rem;
    border-top: 1px dashed var(--color-line);
    padding-top: 1.5rem;
  }
  .references-list h4 {
    font-family: var(--font-handwriting);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--color-ink);
  }
  .reference-item {
    background: var(--color-surface-elevated);
    border-left: 3px solid var(--color-binder);
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin-bottom: 1rem;
    text-align: left;
    transition: transform 0.2s;
  }
  .reference-item:hover {
    transform: translateX(4px);
  }
  .ref-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-ink-muted);
    margin-bottom: 0.25rem;
  }
  .ref-author {
    color: var(--color-binder);
  }
  .ref-journal {
    font-style: italic;
  }
  .ref-title {
    margin: 0.25rem 0 0.5rem 0;
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--color-ink);
  }
  .ref-desc {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--color-ink-muted);
  }

  /* ============================
     EQ STEPS (SATU PERSEN REFERENCE)
     ============================ */
  .eq-steps-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .eq-step-card {
    display: flex;
    gap: 1.25rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    align-items: flex-start;
    text-align: left;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }
  .eq-step-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .eq-step-num {
    background: var(--color-status-done-start);
    color: var(--color-surface);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.95rem;
    flex-shrink: 0;
    box-shadow: 0 2px 6px var(--color-status-success-soft);
  }
  .eq-step-content h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: var(--font-handwriting);
    font-size: 1.15rem;
    color: var(--color-ink);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .eq-time {
    font-size: 0.75rem;
    color: var(--color-ink-muted);
    font-family: var(--font-mono, monospace);
    background: var(--color-surface-soft);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    border: 1px solid var(--color-line);
  }
  .eq-step-content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-ink);
  }
</style>
