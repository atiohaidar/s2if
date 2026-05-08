<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import MathBlock from '$lib/components/MathBlock.svelte';
</script>

<svelte:head>
  <title>Hipotesis dalam Penelitian - S2IF Notebook</title>
  <meta
    name="description"
    content="Materi lengkap tentang konsep hipotesis, karakteristik hipotesis yang baik, falsifiability, serta berbagai studi kasus terapan dalam metodologi penelitian."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Hipotesis dalam Penelitian"
    date="08 Mei 2026"
    status="done"
    tags={['Metodologi Riset', 'Penelitian', 'Hipotesis']}
  />

  <NoteSection title="Definisi Hipotesis">
    <div class="quote-block">
      <blockquote>
        "Hypothesis is a proposition or a set of proposition set forth as an explanation for the
        occurrence of some specified group of phenomena either asserted merely as a provisional
        conjecture to guide some investigation or accepted as highly probable in the light of
        established facts."
      </blockquote>
      <cite>— Kothari</cite>
    </div>
    <p class="mt-4">
      Secara sederhana, hipotesis adalah jawaban sementara terhadap masalah penelitian yang
      kebenarannya masih harus diuji secara empiris.
    </p>
  </NoteSection>

  <NoteSection title="Aktivitas Penelitian">
    <p>Dalam siklus penelitian ilmiah, pembuatan hipotesis merupakan langkah ke-4:</p>
    <div class="steps-grid">
      <div class="step-card">
        <span class="step-num">1</span>
        <p>Formulasi Pertanyaan (Research Question)</p>
      </div>
      <div class="step-card">
        <span class="step-num">2</span>
        <p>Penelitian Latar Belakang (Literature Review)</p>
      </div>
      <div class="step-card">
        <span class="step-num">3</span>
        <p>Definisi Tujuan dan Sasaran</p>
      </div>
      <div class="step-card active">
        <span class="step-num">4</span>
        <p>Pembuatan Hipotesis</p>
      </div>
      <div class="step-card">
        <span class="step-num">5</span>
        <p>Perancangan Eksperimen</p>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Pentingnya Hipotesis">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="feature-item">
        <div class="feature-icon">🔍</div>
        <div>
          <strong>Klarifikasi</strong>
          <p>Memberikan kejelasan pada masalah dan tujuan penelitian.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📈</div>
        <div>
          <strong>Prediksi</strong>
          <p>Menjelaskan dan memprediksi hasil yang diharapkan dari penelitian.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🛠️</div>
        <div>
          <strong>Desain Riset</strong>
          <p>Menunjukkan jenis desain penelitian yang dibutuhkan.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎯</div>
        <div>
          <strong>Arahan Riset</strong>
          <p>Mengarahkan jalannya studi agar tetap pada jalur yang benar.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">👥</div>
        <div>
          <strong>Identifikasi Populasi</strong>
          <p>Membantu menentukan kelompok atau populasi spesifik yang akan diteliti.</p>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📊</div>
        <div>
          <strong>Fasilitasi Data</strong>
          <p>Mempermudah pengumpulan, analisis, hingga interpretasi data riset.</p>
        </div>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Karakteristik Hipotesis yang Baik">
    <p>Hipotesis yang efektif harus memenuhi kriteria berikut:</p>
    <ul class="styled-list">
      <li><strong>Jelas dan Presisi:</strong> Tidak bermakna ganda.</li>
      <li><strong>Berdasarkan Teori:</strong> Memiliki landasan ilmiah dari studi sebelumnya.</li>
      <li><strong>Dapat Diuji (Testable):</strong> Ada cara untuk membuktikan kebenarannya.</li>
      <li><strong>Spesifik:</strong> Cakupannya terbatas dan fokus.</li>
      <li><strong>Konsisten:</strong> Selaras dengan fakta-fakta yang sudah diketahui.</li>
      <li><strong>Efisiensi Waktu:</strong> Dapat diuji dalam jangka waktu yang masuk akal.</li>
    </ul>

    <Callout type="important" title="Falsifiability (Keterbukaan untuk Disanggah)">
      Dalam metode ilmiah, <strong>falsifiability</strong> adalah bagian krusial. Agar sebuah klaim dianggap ilmiah, harus ada kemungkinan bahwa klaim tersebut dapat dibuktikan salah melalui eksperimen atau observasi.
    </Callout>
  </NoteSection>

  <NoteSection title="Jenis-Jenis Hipotesis">
    <div class="types-container">
      <div class="type-group">
        <h4>Berdasarkan Jumlah Variabel</h4>
        <ul>
          <li>
            <strong>Simple:</strong> Hubungan antara satu variabel dependen dan satu independen.
            <br /><small>Contoh: "Olahraga setiap pagi meningkatkan produktivitas."</small>
          </li>
          <li>
            <strong>Complex:</strong> Hubungan antara dua atau lebih variabel.
            <br /><small>Contoh: "Diet tinggi gula dan gaya hidup sedenter meningkatkan risiko depresi."</small>
          </li>
        </ul>
      </div>

      <div class="type-group">
        <h4>Berdasarkan Arah Hubungan</h4>
        <ul>
          <li>
            <strong>Directional:</strong> Menentukan arah hubungan (lebih besar, meningkat, dll).
            <br /><small>Contoh: "Siswa yang sarapan akan mendapat nilai lebih tinggi."</small>
          </li>
          <li>
            <strong>Non-directional:</strong> Hanya menyatakan adanya hubungan tanpa menentukan arah.
            <br /><small>Contoh: "Ada korelasi antara profil pelajar dan tingkat pembelajaran."</small>
          </li>
        </ul>
      </div>

      <div class="type-group">
        <h4>Berdasarkan Statistik</h4>
        <ul>
          <li>
            <strong>Null (H0):</strong> Menyatakan tidak ada hubungan atau perbedaan signifikan.
            <br /><small>Contoh: "Durasi tidur tidak berpengaruh pada produktivitas."</small>
          </li>
          <li>
            <strong>Alternative (H1):</strong> Kebalikan dari Null, menyatakan adanya hubungan.
            <br /><small>Contoh: "Durasi tidur berpengaruh pada produktivitas."</small>
          </li>
        </ul>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Hipotesis dalam Riset Kuantitatif">
    <p>
      Dalam riset kuantitatif, hipotesis digunakan untuk memprediksi hubungan antar variabel yang dapat diukur. Terdapat tiga istilah kunci yang sering muncul:
    </p>

    <div class="variables-grid">
      <div class="var-card iv">
        <h5>Independent Variable (IV)</h5>
        <p>Variabel yang dimanipulasi atau yang mempengaruhi (Penyebab).</p>
      </div>
      <div class="var-card dv">
        <h5>Dependent Variable (DV)</h5>
        <p>Variabel yang diamati perubahannya (Akibat).</p>
      </div>
      <div class="var-card null-var">
        <h5>Null Hypothesis (H0)</h5>
        <p>Asumsi bahwa tidak ada hubungan antara IV dan DV.</p>
      </div>
    </div>

    <Callout type="info" title="Contoh Kuantitatif (Slide 19-20)">
      <ul>
        <li><strong>Kasus Biologi:</strong> Korelasi antara iklim (IV) dan bentuk daun (DV). H0: Tidak ada perbedaan signifikan bentuk daun di iklim kering maupun panas.</li>
        <li><strong>Kasus Bisnis:</strong> Perusahaan publik akan memiliki tingkat pertumbuhan (DV) yang lebih tinggi dibandingkan perusahaan privat (IV: Status Kepemilikan).</li>
      </ul>
    </Callout>
  </NoteSection>

  <NoteSection title="Contoh Penerapan: Dari Pertanyaan ke Hipotesis">
    <p>
      Berikut adalah cara mengubah Pertanyaan Riset (RQ) menjadi Hipotesis dan Hipotesis Nol (Null):
    </p>

    <div class="example-mapping">
      <!-- Example 1 -->
      <div class="mapping-card">
        <div class="mapping-rq"><strong>RQ:</strong> Apa manfaat kesehatan dari makan apel setiap hari?</div>
        <div class="mapping-h"><strong>Hipotesis:</strong> Meningkatkan konsumsi apel pada usia 60+ akan menurunkan frekuensi kunjungan ke dokter.</div>
        <div class="mapping-null"><strong>Null (H0):</strong> Meningkatkan konsumsi apel pada usia 60+ tidak berpengaruh pada frekuensi kunjungan ke dokter.</div>
      </div>

      <!-- Example 2 -->
      <div class="mapping-card">
        <div class="mapping-rq"><strong>RQ:</strong> Maskapai mana yang paling sering mengalami keterlambatan?</div>
        <div class="mapping-h"><strong>Hipotesis:</strong> Maskapai berbiaya rendah (low-cost) lebih mungkin mengalami delay dibandingkan maskapai premium.</div>
        <div class="mapping-null"><strong>Null (H0):</strong> Maskapai low-cost dan premium memiliki kemungkinan delay yang sama.</div>
      </div>

      <!-- Example 3 -->
      <div class="mapping-card">
        <div class="mapping-rq"><strong>RQ:</strong> Apakah pengaturan kerja fleksibel meningkatkan kepuasan kerja?</div>
        <div class="mapping-h"><strong>Hipotesis:</strong> Karyawan dengan jam kerja fleksibel akan melaporkan kepuasan kerja yang lebih tinggi.</div>
        <div class="mapping-null"><strong>Null (H0):</strong> Tidak ada hubungan antara fleksibilitas jam kerja dengan kepuasan kerja.</div>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Hipotesis Awal vs Hipotesis Teruji (Refined)">
    <p>
      Seringkali hipotesis pertama yang kita buat masih terlalu umum. Hipotesis yang baik harus
      <strong>spesifik</strong> dan <strong>terukur</strong>.
    </p>

    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Aspek</th>
            <th>Hipotesis Awal (Kasar)</th>
            <th>Hipotesis Teruji (Refined)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Contoh</strong></td>
            <td>"Menghadiri banyak kuliah membuat nilai ujian bagus."</td>
            <td>
              "Jika mahasiswa tahun pertama menghadiri lebih banyak kuliah, maka nilai ujian mereka
              akan meningkat."
            </td>
          </tr>
          <tr>
            <td><strong>Keunggulan</strong></td>
            <td>Masih ambigu (siapa? nilai apa?).</td>
            <td>Menyebut variabel, kelompok spesifik, dan hasil prediksi.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NoteSection>

  <NoteSection title="Hubungan Spesifik dalam Hipotesis">
    <p>Selain arah positif/negatif, hipotesis bisa menyatakan hubungan yang lebih kompleks:</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="info-card border-l-4 border-l-orange-500">
        <h4>Inverse Relationship (Terbalik)</h4>
        <p>Jika variabel A meningkat, maka variabel B menurun.</p>
        <small class="text-dim">Contoh: Semakin sering menggunakan media sosial, semakin rendah rentang perhatian (attention span).</small>
      </div>
      <div class="info-card border-l-4 border-l-purple-500">
        <h4>Magnitude of Difference (Besaran)</h4>
        <p>Menentukan jumlah spesifik perubahan.</p>
        <small class="text-dim">Contoh: Jika variabel A naik 2 poin, maka variabel B akan naik 3 poin.</small>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Hipotesis Berdasarkan Studi Terdahulu">
    <p>
      Dalam penulisan ilmiah, hipotesis sering kali merupakan sintesis dari berbagai temuan penelitian sebelumnya (premis).
    </p>

    <div class="academic-example">
      <div class="premise-box">
        <strong>Premis 1:</strong> Kemiripan semantik berbasis model semantik terdistribusi dapat digunakan untuk mengkategorisasikan ekspresi aspek (Carenini, dkk. 2005; Liu, dkk. 2005; Mikolov, dkk. 2013).
      </div>
      <div class="premise-box">
        <strong>Premis 2:</strong> Perhitungan kemiripan semantik menggunakan WordNet dapat melengkapi model word2vec untuk klasifikasi teks (Araque dkk., 2016).
      </div>
      <div class="hypothesis-box">
        <strong>Hipotesis Hasil Sintesis:</strong>
        <p>
          "Penanganan kategorisasi aspek karena permasalahan <em>co-occurrence</em> kata dalam konteks korpus dan keterbatasan <em>Out-of-Vocabulary</em> (OOV), dapat dikurangi dengan mengombinasikan pendekatan berbasis model semantik terdistribusi dan WordNet."
        </p>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Studi Kasus Terapan">
    <div class="case-studies">
      <!-- Case 1 -->
      <div class="case-card">
        <div class="case-header">
          <span class="case-tag">Kasus 1</span>
          <h4>Optimasi Hotel Reservation</h4>
        </div>
        <div class="case-body">
          <p><strong>Masalah:</strong> Terjadi penurunan jumlah booking dalam beberapa kuartal terakhir.</p>
          <p><strong>Pertanyaan Riset:</strong> Apakah masalahnya ada pada UI/UX website, harga, atau fasilitas?</p>
          <div class="case-hypothesis">
            <strong>Hipotesis:</strong> "Meningkatkan pengalaman pengguna (UX) dalam memilih hotel di website akan menghasilkan peningkatan jumlah pemesanan kamar."
          </div>
        </div>
      </div>

      <!-- Case 2 -->
      <div class="case-card">
        <div class="case-header">
          <span class="case-tag">Kasus 2</span>
          <h4>Collaborative Document Authoring</h4>
        </div>
        <div class="case-body">
          <p><strong>Fokus:</strong> Bagaimana orang bekerja sama dalam menyusun dokumen (planning, drafting, review).</p>
          <p><strong>Temuan Lapangan:</strong> Penulis menghadapi masalah koordinasi dan kurangnya alat bantu yang memadai.</p>
          <div class="case-hypothesis">
            <strong>Hipotesis:</strong> "Penambahan mekanisme <em>awareness</em> (kesadaran aktivitas rekan) pada ruang kerja kolaboratif akan memperbaiki proses penyusunan dokumen."
          </div>
        </div>
      </div>

      <!-- Case 3 -->
      <div class="case-card">
        <div class="case-header">
          <span class="case-tag">Kasus 3</span>
          <h4>Popularitas Twitter (Katz Centrality)</h4>
        </div>
        <div class="case-body">
          <p><strong>Masalah:</strong> Bagaimana mengukur popularitas seseorang secara akurat berdasarkan aktivitas digital?</p>
          <p><strong>Metode:</strong> Menggunakan graf untuk memodelkan konektivitas.</p>
          <div class="case-hypothesis">
            <strong>Hipotesis:</strong> "Hubungan <em>Follow, Reply,</em> dan <em>Mention</em> secara signifikan mempengaruhi peringkat popularitas pengguna di Twitter."
          </div>
        </div>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Kesimpulan: Alur Mendefinisikan Hipotesis">
    <ol class="ordered-steps">
      <li>Observasi fenomena dan identifikasi variabel (Independen & Dependen).</li>
      <li>Buat pertanyaan penelitian (Research Question) yang utama.</li>
      <li>Lakukan penelitian pendahuluan untuk memastikan kebaruan (novelty).</li>
      <li>Rancang draf hipotesis awal.</li>
      <li>Finalisasi hipotesis dengan memastikan variabel terukur secara spesifik.</li>
    </ol>
    
    <Callout type="tip" title="Validasi Statistik">
      Ingat bahwa hasil analisis data harus mampu mengonfirmasi atau menolak hipotesis tersebut (menggunakan metode seperti ANOVA atau uji statistik lainnya).
    </Callout>
  </NoteSection>

  <BackLink href="/catalog" label="Kembali ke Katalog Materi" />
</article>

<style>
  .quote-block {
    background: var(--color-surface-soft);
    border-left: 4px solid var(--color-primary);
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 0 8px 8px 0;
  }

  blockquote {
    margin: 0;
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-dim);
  }

  cite {
    display: block;
    margin-top: 0.5rem;
    font-weight: 600;
    text-align: right;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .step-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    position: relative;
    transition: transform 0.2s;
  }

  .step-card.active {
    border-color: var(--color-primary);
    box-shadow: 0 0 10px rgba(0, 122, 255, 0.1);
    transform: translateY(-4px);
  }

  .step-num {
    display: inline-flex;
    width: 30px;
    height: 30px;
    background: var(--color-primary);
    color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .feature-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-surface-soft);
    border-radius: 10px;
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .styled-list {
    list-style: none;
    padding: 0;
  }

  .styled-list li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .styled-list li::before {
    content: "•";
    color: var(--color-primary);
    font-weight: bold;
    position: absolute;
    left: 0;
  }

  .types-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .type-group {
    background: var(--color-surface-elevated);
    padding: 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
  }

  .type-group h4 {
    margin: 0 0 0.75rem;
    color: var(--color-primary);
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 0.5rem;
  }

  .type-group ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .type-group li {
    margin-bottom: 0.75rem;
  }

  .ordered-steps {
    counter-reset: step-counter;
    list-style: none;
    padding: 0;
  }

  .ordered-steps li {
    counter-increment: step-counter;
    margin-bottom: 1rem;
    padding-left: 3rem;
    position: relative;
    line-height: 1.6;
  }

  .ordered-steps li::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: var(--color-primary-soft);
    color: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .comparison-table-wrap {
    overflow-x: auto;
    margin: 1rem 0;
  }
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-surface-elevated);
    border-radius: 8px;
    overflow: hidden;
  }
  .comparison-table th, .comparison-table td {
    padding: 1rem;
    border: 1px solid var(--color-line);
    text-align: left;
  }
  .comparison-table th {
    background: var(--color-surface-soft);
    color: var(--color-primary);
  }

  .case-studies {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .case-card {
    border: 1px solid var(--color-line);
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-surface-elevated);
  }
  .case-header {
    background: var(--color-surface-soft);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--color-line);
  }
  .case-tag {
    background: var(--color-primary);
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .case-header h4 {
    margin: 0;
    color: var(--color-text);
  }
  .case-body {
    padding: 1rem;
  }
  .case-hypothesis {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--color-primary-soft);
    border-radius: 8px;
    color: var(--color-primary);
    font-style: italic;
  }

  .border-l-4 { border-left-width: 4px; }
  .border-l-orange-500 { border-left-color: #ff9500; }
  .border-l-purple-500 { border-left-color: #af52de; }
  .text-dim { color: var(--color-text-dim); font-size: 0.9rem; }

  .academic-example {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .premise-box {
    padding: 1rem;
    background: var(--color-surface-soft);
    border-left: 4px solid var(--color-primary-soft);
    font-size: 0.95rem;
  }
  .hypothesis-box {
    padding: 1.25rem;
    background: var(--color-primary-soft);
    border: 1px solid var(--color-primary);
    border-radius: 10px;
  }
  .hypothesis-box p {
    margin-top: 0.5rem;
    font-style: italic;
    color: var(--color-primary);
  }

  .variables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .var-card {
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
  }
  .var-card h5 {
    margin: 0 0 0.5rem;
    font-weight: bold;
    font-size: 1rem;
  }
  .var-card.iv { border-top: 4px solid #007aff; }
  .var-card.dv { border-top: 4px solid #4cd964; }
  .var-card.null-var { border-top: 4px solid #8e8e93; }

  .example-mapping {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .mapping-card {
    padding: 1.25rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
  }
  .mapping-rq { color: var(--color-primary); margin-bottom: 0.5rem; }
  .mapping-h { color: var(--color-text); margin-bottom: 0.25rem; }
  .mapping-null { color: var(--color-text-dim); font-size: 0.9rem; }

  @media (max-width: 768px) {
    .steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
