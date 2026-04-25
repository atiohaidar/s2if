<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import ChromosomeEncodingVisualizer from './components/ChromosomeEncodingVisualizer.svelte';
  import GACrossoverMutationVisualizer from './components/GACrossoverMutationVisualizer.svelte';
  import GAPopulationVisualizer from './components/GAPopulationVisualizer.svelte';
  import PrematureConvergenceVisualizer from './components/PrematureConvergenceVisualizer.svelte';
  import GATspRouteVisualizer from './components/GATspRouteVisualizer.svelte';
</script>

<svelte:head>
  <title>Metaheuristic Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Metaheuristic Search"
    date="24 April 2026"
    status="done"
    tags={['Metaheuristic', 'EC', 'GA', 'Optimization']}
  />

  <!-- 1. Definisi & Mindset -->
  <NoteSection title="Definisi & Mindset">
    <p>
      <strong>Metaheuristic search</strong> adalah pendekatan pencarian dan optimasi untuk masalah
      yang ruang solusinya sangat besar, rumit, atau sulit diselesaikan dengan cara eksak. Tujuannya
      bukan selalu mencari jawaban yang paling sempurna, tetapi mencari
      <strong>solusi yang sangat baik dalam waktu yang masuk akal</strong>.
    </p>

    <div class="meta-explanation">
      <h4>⭐ Kenapa ada "Meta"-nya?</h4>
      <p>
        <strong>Heuristic</strong> adalah strategi untuk mencari solusi (tips spesifik). <br>
        <strong>Meta</strong> berarti "melampaui" atau "di tingkat yang lebih tinggi".
      </p>
      <p class="analogy-text">
        💡 <strong>Analogi:</strong> Heuristik itu seperti punya <em>"Tips benerin kran"</em>. Metaheuristic itu seperti punya <em>"Metode cara belajar cepat"</em>. Metodenya bisa dipakai untuk belajar apa saja, bukan cuma benerin kran.
      </p>
    </div>

    <div class="config-mindset">
      <div class="mindset-header">⚙️ Mindset: Mencari Konfigurasi Terbaik</div>
      <p>
        Berbeda dengan A* yang mencari <strong>jalur (path)</strong>, Metaheuristic lebih banyak digunakan untuk mencari 
        <strong>konfigurasi (settingan)</strong> terbaik dari suatu masalah.
      </p>
      <div class="analogy-card">
        <strong>Analogi: Modifikasi Mobil Balap</strong>
        <p>Kamu punya banyak "knob" yang bisa diputar: Level Mesin, Tipe Ban, Tinggi Spoiler, dll. Kamu tidak peduli <em>cara</em> memasangnya, yang kamu mau adalah <strong>kombinasi settingan</strong> yang membuat mobil lari paling kencang.</p>
      </div>
    </div>
  </NoteSection>

  <!-- 2. Genotype vs Phenotype -->
  <NoteSection title="Genotype vs Phenotype">
    <p>Sebelum masuk ke cara kerjanya, kita harus paham apa yang kita "utak-atik". Memahami perbedaan antara kode dan wujud nyata solusi adalah kunci utama.</p>
    
    <div class="bio-grid">
      <div class="bio-card genotype">
        <div class="bio-icon">🧬</div>
        <h4>Genotype</h4>
        <p><strong>Bentuk Data Mentah:</strong> Representasi solusi yang dimanipulasi oleh algoritma (mutasi & crossover).</p>
        <div class="bio-analogy">Analogi: <strong>Resep Masakan</strong> (Instruksi tertulis).</div>
      </div>
      <div class="bio-card phenotype">
        <div class="bio-icon">🎂</div>
        <h4>Phenotype</h4>
        <p><strong>Wujud Nyata:</strong> Solusi asli di dunia nyata yang kita nilai kualitasnya (fitness).</p>
        <div class="bio-analogy">Analogi: <strong>Kue Jadi</strong> (Hasil yang bisa dicicipi).</div>
      </div>
    </div>

    <div class="example-box">
      <h4>Contoh: Masalah Rute (TSP)</h4>
      <ul>
        <li><strong>Genotype:</strong> Array angka <code>[2, 0, 3, 1]</code>.</li>
        <li><strong>Phenotype:</strong> Rute Jakarta → Bandung → Surabaya → Semarang.</li>
        <li><strong>Fitness:</strong> Dihitung berdasarkan total jarak (KM) rute tersebut.</li>
      </ul>
    </div>

    <Callout type="info">
      <strong>Intinya:</strong> Komputer bekerja di level <strong>Genotype</strong> (ngutak-ngatik kode), tapi kita menilai hasilnya di level <strong>Phenotype</strong> (cek apakah solusinya bagus atau tidak).
    </Callout>
  </NoteSection>

  <!-- 3. Versi Super Simpel -->
  <NoteSection title="Cara Kerja GA (Versi Super Simpel)">
    <p>
      Kalau dijelaskan dengan bahasa sehari-hari, <strong>Genetic Algorithm</strong> itu mirip
      seperti kita punya banyak jawaban percobaan, lalu:
    </p>
    <ol>
      <li>Cek mana jawaban yang lumayan bagus (Fitness).</li>
      <li>Ambil beberapa jawaban bagus itu (Seleksi).</li>
      <li>Gabungkan sebagian isinya (Crossover).</li>
      <li>Ubah sedikit secara acak (Mutasi).</li>
      <li>Ulangi terus sampai hasilnya makin baik (Generasi).</li>
    </ol>
    <Callout type="tip">
      Analogi sederhananya seperti mencoba banyak resep masakan. Resep yang rasanya lumayan enak
      dipilih, lalu beberapa bagian resep digabung, kemudian sedikit bumbunya diubah untuk melihat
      apakah hasil berikutnya bisa lebih enak.
    </Callout>
  </NoteSection>

  <!-- 4. Evolusi & Genetic Algorithm -->
  <NoteSection title="Evolutionary Computation & GA">
    <p>
      <strong>Evolutionary Computation (EC)</strong> adalah pendekatan optimasi yang terinspirasi dari proses
      evolusi biologis. <strong>Genetic Algorithm (GA)</strong> adalah salah satu teknik paling penting dalam keluarga EC.
    </p>
    
    <div class="ga-intro-grid">
        <div class="intro-card">
            <h4>Prinsip Utama GA:</h4>
            <ul>
                <li><strong>Bekerja dengan populasi</strong>, bukan satu solusi saja.</li>
                <li><strong>Representasi kromosom</strong>: Setiap solusi ditulis dalam kode.</li>
                <li><strong>Survival of the Fittest</strong>: Yang bagus yang bertahan.</li>
            </ul>
        </div>
    </div>

    <p>
      Di dunia metaheuristic ada banyak keluarga algoritma (Simulated Annealing, Ant Colony, PSO), 
      namun materi ini berfokus pada GA karena kemampuannya menyelesaikan masalah kompleks seperti routing, penjadwalan, dan peramalan.
    </p>
  </NoteSection>

  <!-- 5. Glosarium Mini -->
  <NoteSection title="Kamus Istilah GA">
    <div class="glossary-grid">
      <div class="glossary-item"><strong>Fitness:</strong> Nilai kualitas solusi (Skor).</div>
      <div class="glossary-item"><strong>Kromosom:</strong> Satu individu/solusi dalam bentuk kode.</div>
      <div class="glossary-item"><strong>Populasi:</strong> Kumpulan banyak solusi yang sedang diuji.</div>
      <div class="glossary-item"><strong>Generasi:</strong> Satu putaran/siklus perbaikan.</div>
      <div class="glossary-item"><strong>Seleksi:</strong> Memilih calon orang tua yang bagus.</div>
      <div class="glossary-item"><strong>Crossover:</strong> Menggabungkan (kawin silang) dua solusi.</div>
      <div class="glossary-item"><strong>Mutasi:</strong> Perubahan acak agar tidak mandek.</div>
    </div>
  </NoteSection>

  <!-- 6. Alur Kerja & Komponen -->
  <NoteSection title="Siklus Kerja Genetic Algorithm">
    <p>Secara umum, Genetic Algorithm berjalan seperti siklus berikut:</p>
    
    <CodeBlock
      language="python"
      code={`population = init_population()
while not stop_condition:
    fitness = evaluate(population)
    parents = select_parents(population, fitness)
    children = crossover(parents)
    children = mutate(children)
    population = survivor_selection(population, children, fitness)`}
    />

    <div class="component-deep-dive">
        <h4>Komponen Penting:</h4>
        <ul>
            <li><strong>Inisialisasi:</strong> Menentukan calon solusi awal (acak).</li>
            <li><strong>Evaluasi:</strong> Menilai kualitas (Fitness) tiap solusi.</li>
            <li><strong>Seleksi:</strong> Memilih siapa yang boleh "punya anak".</li>
            <li><strong>Rekombinasi/Crossover:</strong> Gabungin gen dari dua induk.</li>
            <li><strong>Mutasi:</strong> Jaga keberagaman solusi (biar gak mandek).</li>
            <li><strong>Survivor Selection:</strong> Siapa yang lanjut ke generasi depan.</li>
        </ul>
    </div>
  </NoteSection>

  <!-- 7. Deep Dive: Representasi -->
  <NoteSection title="Representasi & Encoding">
    <p>
      Bagaimana cara kita menulis solusi ke dalam kromosom? Ini sangat menentukan hasil akhir.
    </p>
    <div class="encoding-grid">
      <div class="e-card">
        <strong>Binary Encoding</strong>
        <p>Solusi ditulis sebagai 0 dan 1. Cocok untuk masalah Yes/No.</p>
      </div>
      <div class="e-card">
        <strong>Real-valued Encoding</strong>
        <p>Solusi ditulis sebagai angka desimal. Cocok untuk parameter matematika.</p>
      </div>
      <div class="e-card">
        <strong>Permutation Encoding</strong>
        <p>Solusi ditulis sebagai urutan. Cocok untuk rute (TSP).</p>
      </div>
    </div>
    
    <div class="vis-divider">Visualisasi Jenis Encoding:</div>
    <ChromosomeEncodingVisualizer />
  </NoteSection>

  <!-- 8. Visualisasi Proses -->
  <NoteSection title="Visualisasi: Crossover & Mutasi">
    <p>
      Proses pembentukan anak divisualisasikan langkah demi langkah.
    </p>
    <GACrossoverMutationVisualizer />
    <Callout type="tip">
        <strong>Ingat:</strong> Crossover adalah "warisan" dari orang tua, Mutasi adalah "variasi baru" agar populasi tidak homogen.
    </Callout>
  </NoteSection>

  <!-- 9. Evolusi & Contoh Kasus -->
  <NoteSection title="Evolusi Populasi & Contoh Kasus">
    <p>
      GA bekerja pada <strong>sekumpulan solusi</strong>. Lihat bagaimana kualitasnya membaik seiring waktu.
    </p>
    <GAPopulationVisualizer />
    
    <div class="case-studies">
        <h4>Contoh Kasus Penggunaan:</h4>
        <ul>
            <li><strong>TSP:</strong> Mencari rute terpendek antar kota.</li>
            <li><strong>Penjadwalan:</strong> Menyusun jadwal kuliah bebas konflik.</li>
            <li><strong>8-Queens:</strong> Menyusun bidak catur agar tidak saling serang.</li>
            <li><strong>Optimasi Bisnis:</strong> Pemotongan bahan, peramalan stok, dll.</li>
        </ul>
    </div>
    <GATspRouteVisualizer />
  </NoteSection>

  <!-- 10. Keterbatasan & Penutup -->
  <NoteSection title="Keterbatasan: Konvergensi Prematur">
    <Callout type="warning">
      Masalah yang sering muncul adalah <strong>konvergensi prematur</strong>: populasi terlalu cepat menjadi mirip semua dan terjebak di solusi lokal.
    </Callout>
    
    <div class="premature-box">
        <h4>🏘️ Analogi: Kampung Terpencil</h4>
        <p>Bayangkan sebuah kampung yang isinya itu-itu saja. Nggak ada orang baru, nggak ada ide baru. Kemajuan kampung itu pasti <strong>mandek</strong>.</p>
    </div>

    <PrematureConvergenceVisualizer />

    <div class="conclusion-box">
        <h4>Kapan Pakai GA?</h4>
        <p>GA cocok ketika masalahnya sangat kompleks, sulit dipahami secara matematis, atau butuh solusi "yang cukup bagus" dalam waktu yang singkat.</p>
    </div>
  </NoteSection>

  <NoteSection title="Kuis Tantangan: Metaheuristic dan GA">
    <Quiz
      title="Quiz Metaheuristic Search"
      questions={[
        {
          question:
            'Mengapa metaheuristic umumnya dipilih untuk masalah optimasi yang ruang solusinya sangat besar?',
          options: [
            'Karena metaheuristic selalu menjamin solusi optimum global.',
            'Karena metaheuristic menghilangkan kebutuhan fungsi tujuan.',
            'Karena pencarian eksak sering terlalu mahal secara komputasi sehingga dibutuhkan solusi yang sangat baik dalam waktu masuk akal.',
            'Karena metaheuristic hanya bekerja untuk masalah deterministik.',
          ],
          correctIndex: 2,
          explanation:
            'Inti metaheuristic adalah mencari solusi yang bagus saat pemeriksaan semua kemungkinan solusi tidak realistis dilakukan.',
        },
        {
          question:
            'Dalam konteks materi sumber, hubungan yang paling tepat antara metaheuristic, Evolutionary Computation (EC), dan Genetic Algorithm (GA) adalah...',
          options: [
            'GA adalah payung besar, sedangkan EC dan metaheuristic adalah turunannya.',
            'Metaheuristic adalah payung besar; EC merupakan salah satu keluarga di dalamnya; GA adalah salah satu teknik penting dalam EC.',
            'EC dan GA adalah dua istilah yang sama persis.',
            'Metaheuristic hanya membahas SA, ACO, dan PSO, bukan GA.',
          ],
          correctIndex: 1,
          explanation:
            'Di halaman ini dan PDF sumber, metaheuristic adalah payung besar, EC salah satu keluarganya, dan GA dibahas sebagai teknik utama dalam EC.',
        },
        {
          question: 'Apa fungsi utama fitness pada Genetic Algorithm?',
          options: [
            'Menentukan format tampilan kromosom.',
            'Mengukur seberapa baik suatu solusi terhadap tujuan masalah.',
            'Menentukan jumlah mutasi secara acak tanpa melihat kualitas solusi.',
            'Mengubah semua kromosom menjadi representasi biner.',
          ],
          correctIndex: 1,
          explanation:
            'Fitness adalah ukuran kualitas solusi. Nilai ini dipakai untuk evaluasi dan biasanya memengaruhi proses seleksi.',
        },
        {
          question:
            'Jika sebuah masalah menuntut pencarian urutan kunjungan kota seperti TSP, representasi kromosom yang paling sesuai adalah...',
          options: [
            'Binary encoding',
            'Permutation encoding',
            'One-hot image encoding',
            'String acak tanpa aturan posisi',
          ],
          correctIndex: 1,
          explanation:
            'TSP memerlukan urutan kunjungan, sehingga representasi permutasi lebih natural daripada biner biasa.',
        },
        {
          question: 'Manakah urutan proses yang paling masuk akal dalam satu siklus GA?',
          options: [
            'Mutasi -> seleksi survivor -> inisialisasi populasi -> evaluasi',
            'Inisialisasi populasi -> evaluasi fitness -> seleksi orang tua -> crossover -> mutasi -> seleksi survivor',
            'Evaluasi fitness -> berhenti -> crossover -> inisialisasi ulang',
            'Seleksi survivor -> mutasi -> definisi masalah -> evaluasi',
          ],
          correctIndex: 1,
          explanation:
            'Urutan umum GA dimulai dari populasi awal, lalu evaluasi, seleksi induk, rekombinasi, mutasi, dan pemilihan survivor untuk generasi berikutnya.',
        },
        {
          question: 'Mengapa mutasi tetap diperlukan walaupun kita sudah memiliki crossover?',
          options: [
            'Karena mutasi membuat semua solusi selalu lebih baik.',
            'Karena mutasi membantu menjaga keberagaman populasi dan mengurangi risiko pencarian cepat mandek.',
            'Karena crossover tidak boleh dipakai pada GA.',
            'Karena mutasi menggantikan fungsi fitness.',
          ],
          correctIndex: 1,
          explanation:
            'Mutasi memberi variasi baru sehingga populasi tidak terlalu homogen dan peluang keluar dari solusi lokal menjadi lebih baik.',
        },
        {
          question:
            'Apa yang paling mungkin terjadi jika fungsi fitness dirancang buruk dan tidak benar-benar mencerminkan tujuan masalah?',
          options: [
            'GA tetap pasti menemukan solusi terbaik global.',
            'GA bisa mengoptimalkan hal yang salah, sehingga solusi terlihat bagus menurut fitness tetapi buruk secara nyata.',
            'Crossover otomatis memperbaiki kesalahan definisi fitness.',
            'Representasi kromosom menjadi tidak diperlukan.',
          ],
          correctIndex: 1,
          explanation:
            'GA mengikuti fitness. Jika fitness salah arah, algoritma akan rajin mencari solusi yang salah arah juga.',
        },
        {
          question:
            'Istilah premature convergence pada GA paling tepat menggambarkan kondisi ketika...',
          options: [
            'populasi berkembang terlalu lambat tetapi masih menjelajah banyak area solusi.',
            'algoritma berhenti karena komputer kehabisan memori.',
            'populasi terlalu cepat menjadi mirip satu sama lain dan terkunci pada solusi lokal sebelum menemukan solusi global.',
            'semua individu selalu berbeda sampai akhir iterasi.',
          ],
          correctIndex: 2,
          explanation:
            'Premature convergence terjadi saat keragaman populasi turun terlalu cepat, sehingga pencarian berhenti di area lokal yang belum tentu terbaik.',
        },
        {
          question:
            "Seorang mahasiswa mengatakan: 'Karena GA berbasis evolusi, maka hasilnya pasti selalu optimum global jika jumlah generasi diperbanyak.' Penilaian yang paling tepat adalah...",
          options: [
            'Benar, karena evolusi biologis selalu menghasilkan solusi global terbaik.',
            'Kurang tepat, karena GA adalah pendekatan heuristik/metaheuristik yang bagus untuk mencari solusi baik, tetapi tidak otomatis menjamin optimum global.',
            'Benar hanya jika representasinya biner.',
            'Benar hanya jika tidak ada mutasi.',
          ],
          correctIndex: 1,
          explanation:
            'GA sering efektif, tetapi tetap tidak memberi jaminan mutlak optimum global pada semua kasus.',
        },
        {
          question:
            'Dari pilihan berikut, manakah contoh masalah yang paling sesuai dengan contoh pada materi sumber?',
          options: [
            'Kompresi citra dengan autoencoder saja',
            'Pencarian password brute force sederhana',
            'Penjadwalan kuliah dengan banyak batasan dan konflik',
            'Menampilkan halaman web statis',
          ],
          correctIndex: 2,
          explanation:
            'Materi sumber menyinggung contoh seperti TSP, graph bisection, 8-queens, pemotongan bahan, penjadwalan, dan peramalan time series.',
        },
        {
          question:
            'Mengapa representasi kromosom dan operator evolusi harus disesuaikan dengan jenis masalah?',
          options: [
            'Karena semua masalah sebenarnya identik dan butuh format yang sama.',
            'Karena solusi yang valid pada satu masalah belum tentu valid jika dimanipulasi dengan operator yang tidak cocok.',
            'Karena fungsi fitness hanya bekerja untuk representasi biner.',
            'Karena mutasi hanya boleh dilakukan pada data real-valued.',
          ],
          correctIndex: 1,
          explanation:
            'Pada banyak masalah, operator yang salah bisa menghasilkan solusi tidak valid atau merusak struktur penting dari solusi.',
        },
        {
          question:
            'Jika sebuah algoritma memilih solusi yang bagus, menggabungkan sebagian karakteristiknya, lalu menambahkan perubahan kecil acak untuk membentuk generasi baru, algoritma tersebut paling dekat dengan konsep...',
          options: [
            'Depth-First Search',
            'Genetic Algorithm',
            'Uniform Cost Search',
            'Alpha-Beta Pruning',
          ],
          correctIndex: 1,
          explanation:
            'Deskripsi itu tepat menggambarkan mekanisme GA: seleksi, rekombinasi, dan mutasi.',
        },
        {
          question:
            'Pernyataan mana yang paling kuat sebagai alasan EC/GA cocok dipakai pada masalah dunia nyata tertentu?',
          options: [
            'Masalah sangat sederhana sehingga solusi eksak bisa dihitung cepat.',
            'Masalah punya analisis matematika yang lengkap dan optimum eksak mudah dicapai.',
            'Masalah kompleks, sulit dimodelkan secara penuh, dan solusi baik lebih dibutuhkan daripada jaminan optimum mutlak.',
            'Masalah hanya memiliki satu kemungkinan solusi.',
          ],
          correctIndex: 2,
          explanation:
            'Itulah kondisi khas saat metaheuristic and khususnya EC/GA menjadi masuk akal untuk dipakai.',
        },
      ]}
    />
  </NoteSection>

  <BackLink
    href="/semester-1/kecerdasan-buatan-lanjut"
    label="Kembali ke Kecerdasan Buatan Lanjut"
  />
</article>

<style>
  .bio-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  .bio-card {
    background: var(--color-surface-soft);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--color-line);
    text-align: center;
  }
  .bio-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .bio-card h4 { margin: 0 0 0.5rem; color: var(--color-binder); }
  .bio-card p { font-size: 0.85rem; margin-bottom: 1rem; }
  .bio-analogy { font-size: 0.8rem; font-style: italic; color: var(--color-ink-soft); border-top: 1px solid var(--color-line); padding-top: 0.75rem; }

  .example-box {
    background: var(--color-surface-elevated);
    padding: 1.25rem;
    border-radius: 12px;
    margin: 1rem 0;
    border-left: 4px solid var(--color-binder);
  }
  .example-box h4 { margin-top: 0; font-size: 0.95rem; margin-bottom: 0.75rem; }
  .example-box ul { margin: 0; padding-left: 1.25rem; font-size: 0.85rem; }
  .example-box li { margin-bottom: 0.4rem; }

  .vis-divider { margin-top: 2rem; font-weight: bold; color: var(--color-ink-soft); font-size: 0.9rem; }

  .config-mindset {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: var(--color-surface-soft);
    color: var(--color-ink-strong);
    border-radius: 16px;
    border: 1px solid var(--color-line);
  }
  .mindset-header { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--color-binder); }
  .config-mindset p { font-size: 0.9rem; line-height: 1.6; }
  .analogy-card { 
    margin-top: 1rem; 
    padding: 1rem; 
    background: var(--color-surface-elevated); 
    border-radius: 10px; 
    border-left: 4px solid var(--color-binder); 
  }
  .analogy-card strong { display: block; margin-bottom: 0.25rem; color: var(--color-binder); }
  .analogy-card p { margin: 0; font-size: 0.85rem; font-style: italic; color: var(--color-ink-soft); }

  .premature-box {
    margin: 1rem 0;
    padding: 1.25rem;
    background: var(--color-surface-soft);
    border-radius: 12px;
    border: 1px solid var(--color-line);
  }
  .premature-box h4 { margin-top: 0; color: var(--color-binder); margin-bottom: 0.75rem; }
  .premature-box p { font-size: 0.85rem; margin-bottom: 0.75rem; }
  .premature-box ul { margin: 0; padding-left: 1.25rem; font-size: 0.8rem; color: var(--color-ink-soft); }
  .premature-box li { margin-bottom: 0.3rem; }

  .meta-explanation {
    margin-top: 1.5rem;
    padding: 1.25rem;
    background: var(--color-surface-soft);
    border-radius: 12px;
    border-left: 4px solid var(--color-binder);
  }
  .meta-explanation h4 { margin-top: 0; color: var(--color-binder); margin-bottom: 0.5rem; }
  .meta-explanation p { font-size: 0.85rem; line-height: 1.5; margin-bottom: 0.5rem; }
  .analogy-text { font-style: italic; color: var(--color-ink-soft); }

  .glossary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .glossary-item { font-size: 0.85rem; background: var(--color-surface-soft); padding: 0.5rem; border-radius: 6px; }

  .encoding-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 1rem 0; }
  .e-card { background: var(--color-surface-soft); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
  .e-card strong { color: var(--color-binder); display: block; margin-bottom: 0.25rem; }
  .e-card p { font-size: 0.8rem; margin: 0; }

  .component-deep-dive { background: var(--color-surface-elevated); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--color-binder); margin-top: 1rem; }
  .component-deep-dive h4 { margin-top: 0; font-size: 0.9rem; margin-bottom: 0.5rem; }
  .component-deep-dive ul { margin: 0; padding-left: 1.25rem; font-size: 0.85rem; }

  .case-studies { margin-top: 2rem; }
  .case-studies h4 { color: var(--color-binder); }
  .case-studies ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .case-studies li { background: var(--color-surface-soft); padding: 0.5rem; border-radius: 6px; list-style: none; font-size: 0.85rem; }

  .conclusion-box { margin-top: 2rem; padding: 1.25rem; background: var(--color-surface-soft); border-radius: 12px; border: 2px dashed var(--color-line); }
  .conclusion-box h4 { margin-top: 0; }

  ol li + li,
  ul li + li {
    margin-top: 0.35rem;
  }
</style>
