<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
</script>

<svelte:head>
  <title>Metode Penelitian: Kualitatif vs Kuantitatif - S2IF Notebook</title>
  <meta
    name="description"
    content="Panduan komprehensif metode penelitian kualitatif, kuantitatif, dan mixed methods berdasarkan referensi akademik terbaru."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Metode Penelitian: Kualitatif vs Kuantitatif"
    date="08 Mei 2026"
    status="done"
    tags={['Metodologi Riset', 'Kualitatif', 'Kuantitatif', 'Mixed Methods']}
  />

  <NoteSection title="Pendahuluan: Filosofi Metode">
    <p>
      Penelitian ilmiah dibangun di atas dua pilar utama: <strong>Eksplorasi (Kualitatif)</strong> dan 
      <strong>Konfirmasi (Kuantitatif)</strong>. Pemilihan metode menentukan bagaimana kita memandang realitas dan bagaimana kita berinteraksi dengan subjek penelitian.
    </p>
  </NoteSection>

  <NoteSection title="1. Riset Kualitatif (Pendekatan Fenomenologis)">
    <p>
      Berfokus pada pemahaman perilaku manusia dan makna subjektif. Tujuannya adalah untuk memunculkan pemahaman kontekstual individu terhadap suatu masalah.
    </p>
    
    <div class="method-grid">
      <div class="method-card qual">
        <h5>Kekuatan & Batasan (Slide 5)</h5>
        <ul>
          <li>✅ Mampu memeriksa perasaan dan motivasi secara mendalam.</li>
          <li>✅ Memberikan wawasan situasi kehidupan nyata (real-life).</li>
          <li>❌ Tidak dapat mengekstrapolasi temuan ke seluruh populasi.</li>
          <li>❌ Membutuhkan upaya klerikal (administratif) yang memakan waktu lama.</li>
        </ul>
      </div>
      <div class="method-card qual">
        <h5>Analytical Objectives (Slide 25)</h5>
        <ul class="text-sm">
          <li>Mendeskripsikan variasi dalam fenomena.</li>
          <li>Mendeskripsikan dan menjelaskan hubungan antar variabel.</li>
          <li>Mendeskripsikan pengalaman individu.</li>
          <li>Mendeskripsikan norma-norma kelompok.</li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Callout type="tip" title="Kapan Digunakan? (Slide 6)">
        <ul>
          <li>Untuk memahami sesuatu secara mendalam (konsep, pemikiran, pengalaman).</li>
          <li>Saat kita tidak tahu apa yang diharapkan, guna mendefinisikan masalah atau mengembangkan pendekatan baru.</li>
        </ul>
      </Callout>
      <Callout type="danger" title="JANGAN Gunakan Kualitatif Untuk:">
        <ul class="text-xs">
          <li>Menghitung, mengukur, atau menawarkan validasi statistik.</li>
          <li>Menentukan konsep produk terbaik atau titik harga (price point).</li>
          <li>Menjadi pengganti riset kuantitatif hanya karena keterbatasan waktu/biaya saat evaluasi kuantitatif sangat kritikal.</li>
        </ul>
      </Callout>
    </div>

    <h4>A. Teknik Pengumpulan Data Kualitatif</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div class="feature-item">
        <div class="feature-icon">🎙️</div>
        <div>
          <strong>Wawancara Mendalam (One-on-one)</strong>
          <ul class="text-xs mt-1">
            <li><strong>Structured:</strong> Pertanyaan baku, bisa dilakukan pewawancara berbeda secara paralel.</li>
            <li><strong>Least-structured:</strong> Percakapan kasual dengan pertanyaan tindak lanjut (probing).</li>
            <li><strong>Unstructured:</strong> Mengikuti alur pikir partisipan untuk klarifikasi mendalam.</li>
          </ul>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">👁️</div>
        <div>
          <strong>Observasi Kualitatif (Slide 13)</strong>
          <p class="text-xs">Melibatkan 5 panca indra (penglihatan, penciuman, sentuhan, rasa, dan pendengaran). Tidak melibatkan angka, melainkan karakteristik kualitas.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">👥</div>
        <div>
          <strong>Focus Group Discussion (FGD)</strong>
          <p class="text-xs">Diskusi 6-10 orang responden target market untuk mencari jawaban "why", "what", dan "how". Peneliti tidak harus berinteraksi langsung (bisa via video conf).</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🌏</div>
        <div>
          <strong>Etnografi (Slide 12)</strong>
          <p class="text-xs">Metode observasi paling mendalam di lingkungan alami subjek. Bisa berlangsung hari hingga tahunan. Sangat bergantung pada <strong>keahlian (expertise) peneliti</strong>.</p>
        </div>
      </div>
    </div>

    <h4>B. Validasi & Analisis Data</h4>
    <Callout type="danger" title="Protokol Validasi Data (Slide 14)">
      Semua data (catatan/rekaman) <strong>WAJIB ditranskrip</strong>. Hasil transkripsi harus divalidasi oleh <strong>2-3 orang</strong> sebelum analisis konten, tematik, atau diskursus dilakukan.
    </Callout>

    <div class="case-study-box">
      <h5>Studi Kasus 1: Riset Dyslexia (Slide 18-20)</h5>
      <p class="text-sm">Riset terhadap 12 dewasa (usia 25-45) untuk membentuk <strong>Collective Life Story</strong> melalui 3 tahap:</p>
      <ol class="text-xs mt-2">
        <li>Tentukan elemen umum vs kontras dari cerita yang dibagikan.</li>
        <li>Buat tipologi (skema klasifikasi) yang sesuai untuk semua kasus.</li>
        <li><strong>Self-Validation Circle:</strong> Partisipan meninjau cerita kolektif tersebut untuk menilai akurasinya.</li>
      </ol>
    </div>

    <h4>C. Metode Analisis Data Kualitatif (Slide 15-17)</h4>
    <div class="analysis-types">
      <div class="analysis-box">
        <strong>1. Content Analysis:</strong> Metode riset yang menguji dan mengukur keberadaan kata, subjek, dan konsep tertentu dalam pesan teks, gambar, video, atau audio. Mampu mentransformasi input kualitatif menjadi data kuantitatif.
      </div>
      <div class="analysis-box">
        <strong>2. Thematic Analysis:</strong> Membantu mengidentifikasi, menganalisis, dan menginterpretasi pola dalam data (misal: feedback pengguna).
      </div>
      <div class="analysis-box">
        <strong>3. Discourse Analysis:</strong> Meneliti makna yang mendasari data kualitatif dan hubungan informasi dengan konteksnya.
      </div>
    </div>

    <div class="case-study-box mt-4">
      <h5>Studi Kasus 2: Analisis Keamanan Pejalan Kaki (Slide 10)</h5>
      <p class="text-sm">Contoh klasifikasi jawaban wawancara mengenai upaya keselamatan:</p>
      <ul class="text-xs mt-2">
        <li>Kelompok 1: Upaya di bidang <strong>Engineering</strong> (Teknik).</li>
        <li>Kelompok 2: Upaya di bidang <strong>Policy</strong> (Kebijakan).</li>
        <li>Kelompok 3: Upaya di bidang <strong>Education</strong> (Edukasi).</li>
      </ul>
    </div>
  </NoteSection>

  <NoteSection title="2. Riset Kuantitatif (Pendekatan Objektif)">
    <p>Inkuiri sistematis yang diukur dengan angka dan dianalisis secara statistik untuk mencapai tujuan berikut (Slide 23):</p>
    <ul class="styled-list mb-4">
      <li>Hipotesis diuji dalam urutan <strong>sebab-akibat (cause-effect order)</strong>.</li>
      <li>Tujuannya adalah mengembangkan <strong>generalisasi</strong> yang berkontribusi pada teori.</li>
    </ul>

    <div class="comparison-grid">
      <div class="comp-box">
        <h5>Assumptions underlying quantitative methods (Slide 22)</h5>
        <ul class="text-sm">
          <li><strong>Reality:</strong> Reality that can be studied objectively.</li>
          <li><strong>Independence:</strong> Researchers should remain distant and independent of what is being researched.</li>
          <li><strong>Values:</strong> The values of the researchers do not interfere with the research.</li>
        </ul>
      </div>
      <div class="comp-box">
        <h5>Analytical Objectives (Slide 25)</h5>
        <ul class="text-sm">
          <li>Kuantifikasi variasi data.</li>
          <li>Memprediksi hubungan sebab-akibat (causal).</li>
          <li>Deskripsi karakteristik populasi secara luas.</li>
        </ul>
      </div>
    </div>

    <h4>A. Tiga Jenis Umum Metode Kuantitatif (Slide 28)</h4>
    <div class="types-container">
      <div class="type-group">
        <strong>1. Experiments (True Experiments):</strong> Karakteristik utama adalah <strong>penempatan acak (random assignment)</strong> subjek ke kondisi eksperimental dan penggunaan kontrol eksperimental yang ketat.
      </div>
      <div class="type-group">
        <strong>2. Quasi-experiments:</strong> Menerapkan eksperimen <strong>non-acak</strong> pada subjek ke dalam kondisi eksperimental tertentu.
      </div>
      <div class="type-group">
        <strong>3. Surveys:</strong> Menggunakan kuesioner untuk mengumpulkan data guna <strong>mengestimasi karakteristik populasi</strong> besar berdasarkan sampel yang lebih kecil.
      </div>
    </div>

    <Callout type="info" title="Logika Variabel (Slide 27)">
      <strong>Variable:</strong> Sesuatu yang dapat berubah (something that can change).<br/>
      <strong>Independent Variables (IV):</strong> Faktor yang diukur, dimanipulasi, atau dipilih untuk menentukan hubungannya dengan fenomena (Penyebab). Diduga mempengaruhi variabel dependen.<br/>
      <strong>Dependent Variables (DV):</strong> Faktor yang diamati dan diukur untuk menentukan efek dari variabel independen (Akibat).
    </Callout>

    <h4>Katalog 12 Kasus Eksperimen (Slide 29-40)</h4>
    <div class="example-grid">
      <div class="ex-mini-card"><strong>Gatorade:</strong> IV: Minuman; DV: Heart Rate.</div>
      <div class="ex-mini-card"><strong>Chemotherapy:</strong> IV: Dosis; DV: Ukuran Tumor.</div>
      <div class="ex-mini-card"><strong>Interior:</strong> IV: Warna Ruangan; DV: Kecepatan Makan.</div>
      <div class="ex-mini-card"><strong>Hair Color:</strong> IV: Warna Rambut; DV: Dilatasi Pupil (Attraction).</div>
      <div class="ex-mini-card"><strong>Mozart:</strong> IV: Musik; DV: Skor Ujian. <small>(Obvious limitations)</small></div>
      <div class="ex-mini-card"><strong>Essential Oils:</strong> IV: Lavender; DV: Deep Sleep Duration.</div>
      <div class="ex-mini-card"><strong>Teaching:</strong> IV: Metode (AI vs Human); DV: Skor Kritis.</div>
      <div class="ex-mini-card"><strong>Concrete:</strong> IV: Campuran; DV: Berat saat collapse.</div>
      <div class="ex-mini-card"><strong>Pizza:</strong> IV: Crunchiness; DV: Tingkat kesukaan.</div>
      <div class="ex-mini-card"><strong>Protein:</strong> IV: Supplement; DV: Massa Otot.</div>
      <div class="ex-mini-card"><strong>Airbags:</strong> IV: Adanya Airbag; DV: Kerusakan Tengkorak.</div>
      <div class="ex-mini-card"><strong>Vitamins:</strong> IV: Vitamin; DV: Tekanan Darah/Kolesterol. <small>(Highly unrealistic)</small></div>
    </div>
  </NoteSection>

  <NoteSection title="3. General Framework (Slide 24)">
    <div class="method-grid">
      <div class="method-card quant">
        <h5>Quantitative Framework</h5>
        <ul class="text-sm">
          <li><strong>Tujuan:</strong> Mengonfirmasi hipotesis tentang fenomena.</li>
          <li><strong>Instrumen:</strong> Gaya yang lebih <strong>kaku (rigid)</strong> dalam memancing respons.</li>
          <li><strong>Metode:</strong> Sangat terstruktur (kuesioner, survei, observasi terstruktur).</li>
        </ul>
      </div>
      <div class="method-card qual">
        <h5>Qualitative Framework</h5>
        <ul class="text-sm">
          <li><strong>Tujuan:</strong> Mengeksplorasi fenomena.</li>
          <li><strong>Instrumen:</strong> Gaya yang lebih <strong>fleksibel dan iteratif</strong> dalam memancing respons.</li>
          <li><strong>Metode:</strong> Semi-terstruktur (wawancara mendalam, FGD, observasi partisipan).</li>
        </ul>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="4. Mixed Methods & Transformasi Data">
    <p>
      Penelitian besar yang menggabungkan kekuatan kualitatif dan kuantitatif. 
      <strong>Slide 26:</strong> Data kualitatif dapat ditransfer menjadi data kuantitatif untuk analisis lebih lanjut.
    </p>
    
    <div class="mixed-flow-card">
      <h5>Studi Kasus: Collaborative Document Authoring (Ilaria Liccardi)</h5>
      <p class="text-sm">Riset dilakukan karena studi terdahulu sudah <strong>usang (quite old)</strong> dan adanya kemajuan TI yang mengubah cara kerja kolaboratif.</p>
      
      <div class="activity-chips">
        <span>Planning</span> <span>Drafting</span> <span>Development</span> <span>Review</span> <span>Formatting</span>
      </div>

      <div class="mt-4 bg-white/20 p-3 rounded text-xs">
        <strong>Sub-Pertanyaan Riset (Slide 43):</strong>
        <ul class="list-disc ml-4 mt-1">
          <li>Bagaimana partisipan mendekati proses perencanaan (planning)?</li>
          <li>Informasi apa saja yang dimasukkan dalam rencana tersebut?</li>
          <li>Bagaimana mereka menjaga rencana agar tetap up-to-date?</li>
        </ul>
      </div>

      <ol class="mt-4">
        <li><strong>Fase Kualitatif (Field Study):</strong> Melibatkan 15 partisipan untuk mengidentifikasi alat yang paling sering digunakan dan masalah koordinasi.</li>
        <li><strong>Pengembangan Alat:</strong> Sebuah alat bantu kolaborasi baru dirancang berdasarkan temuan awal.</li>
        <li><strong>Fase Kuantitatif (Survei):</strong> Melibatkan 85 partisipan untuk membuktikan hipotesis menggunakan uji <strong>MANOVA</strong>.</li>
      </ol>
    </div>
  </NoteSection>

  <NoteSection title="5. Tabel Perbandingan Final (Other Comparisons - Slide 26)">
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Aspek</th>
            <th>Kuantitatif</th>
            <th>Kualitatif</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tujuan Analitis</strong></td>
            <td>Kuantifikasi variasi & Prediksi Kausal</td>
            <td>Deskripsi variasi & Menjelaskan hubungan</td>
          </tr>
          <tr>
            <td><strong>Format Pertanyaan</strong></td>
            <td><strong>Close-ended</strong> (Tetap)</td>
            <td><strong>Open-ended</strong> (Berubah-ubah)</td>
          </tr>
          <tr>
            <td><strong>Format Data</strong></td>
            <td><strong>Numerical</strong> (Angka)</td>
            <td><strong>Textual</strong> (Berdasarkan Judgement)</td>
          </tr>
          <tr>
            <td><strong>Gaya Instrumen</strong></td>
            <td>Rigid, Sangat Terstruktur</td>
            <td>Fleksibel, Iteratif</td>
          </tr>
          <tr>
            <td><strong>Sampel</strong></td>
            <td>Besar, Representatif</td>
            <td>Kecil, Spesifik</td>
          </tr>
          <tr>
            <td><strong>Sifat Data</strong></td>
            <td>Data numerik tetap</td>
            <td>Dapat ditransfer menjadi kuantitatif</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NoteSection>

  <BackLink href="/catalog" label="Kembali ke Katalog Materi" />
</article>

<style>
  .method-grid, .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .method-card, .comp-box {
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
  }

  .method-card.qual { border-left: 4px solid #af52de; }
  .method-card.quant { border-left: 4px solid #007aff; }

  .feature-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-surface-soft);
    border-radius: 10px;
  }
  .feature-icon { font-size: 1.5rem; }

  .analysis-types {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .analysis-box {
    padding: 1rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    font-size: 0.95rem;
  }

  .case-study-box {
    margin-top: 1.5rem;
    padding: 1.25rem;
    border: 1px dashed var(--color-primary);
    border-radius: 12px;
    background: rgba(0, 122, 255, 0.02);
  }

  .example-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .ex-mini-card {
    padding: 0.85rem;
    background: var(--color-surface-soft);
    border-radius: 8px;
    font-size: 0.8rem;
    border: 1px solid var(--color-line);
  }

  .mixed-flow-card {
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--color-surface-elevated) 0%, rgba(76, 217, 100, 0.05) 100%);
    border: 1px solid var(--color-line);
    border-radius: 15px;
    border-top: 4px solid #4cd964;
  }
  .activity-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .activity-chips span {
    padding: 0.25rem 0.75rem;
    background: #4cd964;
    color: white;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .comparison-table-wrap { overflow-x: auto; margin: 1rem 0; }
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-surface-elevated);
    border-radius: 8px;
    overflow: hidden;
  }
  .comparison-table th, .comparison-table td { padding: 1rem; border: 1px solid var(--color-line); text-align: left; font-size: 0.9rem; }
  .comparison-table th { background: var(--color-surface-soft); color: var(--color-primary); }

  .types-container { display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0; }
  .type-group { padding: 0.85rem; background: var(--color-surface-elevated); border-radius: 8px; border: 1px solid var(--color-line); font-size: 0.9rem; }

  @media (max-width: 768px) {
    .method-grid { grid-template-columns: 1fr; }
  }
</style>
