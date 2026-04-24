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

  <NoteSection title="Definisi">
    <p>
      <strong>Metaheuristic search</strong> adalah pendekatan pencarian dan optimasi untuk masalah
      yang ruang solusinya sangat besar, rumit, atau sulit diselesaikan dengan cara eksak. Tujuannya
      bukan selalu mencari jawaban yang paling sempurna, tetapi mencari
      <strong>solusi yang sangat baik dalam waktu yang masuk akal</strong>.
    </p>
    <Callout type="info">
      Intinya sederhana: kalau semua kemungkinan solusi terlalu banyak untuk dicek satu per satu,
      metaheuristic membantu kita mencari solusi bagus dengan strategi yang cerdas dan tidak kaku.
    </Callout>
  </NoteSection>

  <NoteSection title="Versi Super Simpel">
    <p>
      Kalau dijelaskan dengan bahasa sehari-hari, <strong>Genetic Algorithm</strong> itu mirip
      seperti kita punya banyak jawaban percobaan, lalu:
    </p>
    <ol>
      <li>cek mana jawaban yang lumayan bagus,</li>
      <li>ambil beberapa jawaban bagus itu,</li>
      <li>gabungkan sebagian isinya,</li>
      <li>ubah sedikit secara acak,</li>
      <li>ulangi terus sampai hasilnya makin baik.</li>
    </ol>
    <Callout type="tip">
      Analogi sederhananya seperti mencoba banyak resep masakan. Resep yang rasanya lumayan enak
      dipilih, lalu beberapa bagian resep digabung, kemudian sedikit bumbunya diubah untuk melihat
      apakah hasil berikutnya bisa lebih enak.
    </Callout>
  </NoteSection>

  <NoteSection title="Glosarium Mini">
    <ul>
      <li><strong>Fitness</strong>: nilai kualitas solusi. Semakin tinggi atau semakin baik nilainya, solusi itu semakin menarik.</li>
      <li><strong>Kromosom</strong>: bentuk penulisan satu solusi di dalam algoritma.</li>
      <li><strong>Populasi</strong>: kumpulan banyak solusi yang sedang diuji bersama.</li>
      <li><strong>Generasi</strong>: satu putaran proses perbaikan solusi.</li>
      <li><strong>Seleksi</strong>: memilih solusi yang cukup baik untuk dipertahankan atau dijadikan parent.</li>
      <li><strong>Crossover / Rekombinasi</strong>: menggabungkan dua solusi untuk membuat solusi baru.</li>
      <li><strong>Mutasi</strong>: perubahan kecil secara acak pada solusi agar pencarian tidak mandek.</li>
      <li><strong>Diversity</strong>: tingkat keberagaman solusi dalam populasi.</li>
      <li><strong>Premature convergence</strong>: populasi terlalu cepat mirip semua, sehingga mudah berhenti di solusi lokal.</li>
    </ul>
  </NoteSection>

  <NoteSection title="Gambaran Umum Materi">
    <p>
      Di dunia metaheuristic ada banyak keluarga algoritma, misalnya
      <strong>Simulated Annealing</strong>, <strong>Tabu Search</strong>,
      <strong>Ant Colony Optimization</strong>, <strong>Particle Swarm Optimization</strong>, dan
      <strong>Evolutionary Computation</strong>.
    </p>
    <p>
      Namun, berdasarkan PDF sumber, pembahasan utamanya lebih banyak mengarah ke <strong
        >Evolutionary Computation (EC)</strong
      >
      dan terutama <strong>Genetic Algorithm (GA)</strong>. Jadi halaman ini juga mengikuti fokus
      tersebut.
    </p>
  </NoteSection>

  <NoteSection title="Apa itu Evolutionary Computation">
    <p>
      <strong>Evolutionary Computation</strong> adalah pendekatan optimasi yang terinspirasi dari proses
      evolusi biologis. Ide dasarnya: kumpulkan banyak calon solusi, nilai kualitasnya, lalu biarkan solusi
      yang lebih baik punya peluang lebih besar untuk "melahirkan" solusi baru.
    </p>
    <ul>
      <li><strong>Populasi</strong>: sekumpulan calon solusi.</li>
      <li><strong>Fitness</strong>: ukuran seberapa bagus suatu solusi.</li>
      <li><strong>Seleksi</strong>: memilih solusi yang layak jadi induk.</li>
      <li><strong>Rekombinasi</strong>: menggabungkan bagian solusi induk.</li>
      <li><strong>Mutasi</strong>: perubahan kecil agar pencarian tidak mandek.</li>
    </ul>
    <Callout type="tip">
      Bayangkan kita punya banyak jawaban sementara. Jawaban yang bagus dipertahankan, lalu
      diperbaiki sedikit demi sedikit sampai kualitas populasi makin meningkat dari generasi ke
      generasi.
    </Callout>
    <Callout type="info">
      Terjemahan istilah pentingnya: <strong>fitness</strong> berarti nilai kualitas solusi,
      <strong>seleksi</strong> berarti memilih solusi yang cukup baik, <strong>crossover</strong>
      berarti menggabungkan dua solusi, dan <strong>mutasi</strong> berarti mengubah sedikit solusi
      agar muncul variasi baru.
    </Callout>
  </NoteSection>

  <NoteSection title="Fokus Utama: Genetic Algorithm">
    <p>
      <strong>Genetic Algorithm</strong> adalah salah satu teknik paling penting dalam keluarga EC. Di
      materi sumber, bagian GA dibahas jauh lebih detail dibanding algoritma metaheuristic lain.
    </p>
    <ul>
      <li><strong>GA bekerja dengan populasi</strong>, bukan satu solusi saja.</li>
      <li><strong>Setiap solusi direpresentasikan sebagai kromosom</strong>.</li>
      <li><strong>Solusi dinilai dengan fitness</strong> untuk melihat mana yang lebih baik.</li>
      <li><strong>Generasi baru</strong> dibentuk lewat seleksi, rekombinasi, dan mutasi.</li>
    </ul>
    <Callout type="tip">
      Kalau pakai bahasa yang lebih santai: GA itu bukan mencari jawaban terbaik dalam satu kali
      tebak, tetapi memperbaiki banyak jawaban sedikit demi sedikit sampai ketemu yang semakin bagus.
    </Callout>
  </NoteSection>

  <NoteSection title="Representasi Solusi">
    <p>
      Salah satu hal penting dalam GA adalah <strong>cara menulis solusi ke dalam kromosom</strong>.
      Materi sumber menekankan bahwa kualitas representasi sangat mempengaruhi hasil.
    </p>
    <ul>
      <li>
        <strong>Binary encoding</strong>: cocok untuk solusi yang bisa ditulis sebagai 0 dan 1.
      </li>
      <li><strong>Real-valued encoding</strong>: cocok untuk parameter numerik kontinu.</li>
      <li>
        <strong>Permutation encoding</strong>: cocok untuk urutan, misalnya rute kunjungan pada TSP.
      </li>
    </ul>
    <Callout type="warning">
      Kalau representasi kromosomnya kurang tepat, algoritma bisa tetap berjalan tetapi sulit
      menemukan solusi yang bagus.
    </Callout>
  </NoteSection>

  <NoteSection title="Visualisasi Representasi Kromosom">
    <p>
      Visualisasi berikut membantu melihat bedanya <strong>genotype</strong> dan
      <strong>phenotype</strong>. Perhatikan bahwa satu solusi bisa ditulis dengan format berbeda
      tergantung jenis masalahnya.
    </p>
    <Callout type="info">
      Supaya lebih mudah: <strong>genotype</strong> bisa dianggap sebagai "bentuk data mentah" yang
      dibaca algoritma, sedangkan <strong>phenotype</strong> adalah arti nyatanya dalam masalah yang
      sedang kita selesaikan.
    </Callout>
    <ChromosomeEncodingVisualizer />
  </NoteSection>

  <NoteSection title="Alur Kerja GA">
    <p>Secara umum, Genetic Algorithm berjalan seperti siklus berikut:</p>
    <ol>
      <li>Buat populasi awal secara acak.</li>
      <li>Hitung fitness setiap individu.</li>
      <li>Pilih individu yang akan menjadi orang tua.</li>
      <li>Lakukan rekombinasi untuk menghasilkan anak.</li>
      <li>Lakukan mutasi kecil pada beberapa anak.</li>
      <li>Pilih individu yang dipertahankan ke generasi berikutnya.</li>
      <li>Ulangi sampai kondisi berhenti terpenuhi.</li>
    </ol>

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

    <Callout type="info">
      Penjelasan mudahnya: GA itu seperti mencoba banyak jawaban, memilih yang menjanjikan, lalu
      "mengawinkan" dan sedikit "mengubah" jawaban tersebut agar generasi berikutnya punya peluang
      lebih baik.
    </Callout>
  </NoteSection>

  <NoteSection title="Visualisasi Crossover dan Mutasi">
    <p>
      Di bawah ini, proses pembentukan anak divisualisasikan langkah demi langkah. Bagian ini
      membantu melihat lebih jelas <strong>urutan proses</strong> dan
      <strong>fungsi mutasi</strong> di dalam GA.
    </p>
    <Callout type="tip">
      Baca istilahnya seperti ini: <strong>crossover</strong> = menggabungkan dua parent, dan
      <strong>mutasi</strong> = mengubah sedikit hasil gabungan agar tidak terlalu kaku.
    </Callout>
    <GACrossoverMutationVisualizer />
  </NoteSection>

  <NoteSection title="Komponen Penting dalam GA">
    <ul>
      <li><strong>Inisialisasi populasi</strong>: menentukan calon solusi awal.</li>
      <li><strong>Evaluasi fitness</strong>: menilai kualitas tiap solusi.</li>
      <li><strong>Seleksi orang tua</strong>: memilih solusi yang boleh menghasilkan keturunan.</li>
      <li><strong>Rekombinasi</strong>: menggabungkan informasi dari dua induk.</li>
      <li><strong>Mutasi</strong>: menjaga keberagaman solusi.</li>
      <li>
        <strong>Seleksi survivor</strong>: menentukan siapa yang bertahan ke generasi selanjutnya.
      </li>
    </ul>
  </NoteSection>

  <NoteSection title="Visualisasi Evolusi Populasi">
    <p>
      Genetic Algorithm tidak bekerja pada satu solusi, tetapi pada <strong>sekumpulan solusi</strong>.
      Visualisasi ini menunjukkan bagaimana nilai fitness terbaik biasanya naik dari generasi ke
      generasi, sementara diversity perlahan menurun.
    </p>
    <Callout type="info">
      Kalau pembacanya masih baru, cukup pegang dua ide: <strong>fitness naik</strong> berarti solusi
      membaik, sedangkan <strong>diversity turun terlalu cepat</strong> berarti populasi berisiko
      jadi terlalu mirip.
    </Callout>
    <GAPopulationVisualizer />
  </NoteSection>

  <NoteSection title="Contoh Kasus dari Sumber">
    <p>
      PDF sumber memberi contoh bahwa EC/GA cocok untuk masalah optimasi yang kompleks, misalnya:
    </p>
    <ul>
      <li><strong>TSP atau routing</strong>: mencari urutan kunjungan yang efisien.</li>
      <li>
        <strong>Graph bisection</strong>: membagi graf menjadi dua bagian dengan biaya tertentu.
      </li>
      <li><strong>8-queens</strong>: menyusun queen agar tidak saling menyerang.</li>
      <li><strong>Pemotongan bahan</strong>: meminimalkan sisa material.</li>
      <li><strong>Penjadwalan kuliah</strong>: menyusun jadwal dengan banyak batasan.</li>
      <li><strong>Peramalan time series</strong>: mencari parameter terbaik untuk prediksi.</li>
    </ul>
  </NoteSection>

  <NoteSection title="Visualisasi TSP Sederhana">
    <p>
      Salah satu contoh yang dekat dengan materi sumber adalah <strong>TSP/routing</strong>. Visual
      ini memperlihatkan bagaimana kualitas rute bisa membaik setelah seleksi, crossover, dan mutasi.
    </p>
    <Callout type="tip">
      Anggap saja TSP itu tugas mencari urutan kunjungan kota yang paling hemat jarak. Semakin kecil
      total jaraknya, biasanya semakin baik solusi yang ditemukan.
    </Callout>
    <GATspRouteVisualizer />
  </NoteSection>

  <NoteSection title="Kelebihan dan Kapan Cocok Dipakai">
    <p>Berdasarkan materi sumber, EC/GA cocok ketika masalah:</p>
    <ul>
      <li>sangat kompleks dan sulit dipahami secara matematis,</li>
      <li>sulit diselesaikan dengan metode konvensional,</li>
      <li>tidak punya model analitis yang memadai,</li>
      <li>membutuhkan solusi baik dalam waktu terbatas, meski tidak harus optimum mutlak.</li>
    </ul>
  </NoteSection>

  <NoteSection title="Keterbatasan yang Harus Diingat">
    <p>Genetic Algorithm bukan alat ajaib. Hasilnya sangat dipengaruhi oleh desain algoritmanya.</p>
    <ul>
      <li><strong>Representasi kromosom</strong> harus tepat.</li>
      <li><strong>Fungsi fitness</strong> harus benar-benar mewakili tujuan masalah.</li>
      <li><strong>Pemilihan operator</strong> rekombinasi dan mutasi harus sesuai.</li>
      <li>
        <strong>Setting parameter</strong> seperti ukuran populasi dan laju mutasi perlu hati-hati.
      </li>
      <li>
        <strong>Premature convergence</strong> bisa terjadi ketika populasi terlalu cepat terkunci di
        solusi lokal.
      </li>
    </ul>
    <Callout type="warning">
      Masalah yang sering muncul adalah <strong>konvergensi prematur</strong>: algoritma terlihat
      cepat stabil, tetapi ternyata stabil pada solusi lokal, bukan solusi terbaik secara global.
    </Callout>
    <Callout type="info">
      Bahasa sederhananya: semua jawaban dalam populasi terlalu cepat jadi mirip. Akibatnya, algoritma
      merasa "sudah cukup baik", padahal mungkin masih ada jawaban yang lebih bagus di tempat lain.
    </Callout>
    <PrematureConvergenceVisualizer />
  </NoteSection>

  <NoteSection title="Ringkasan">
    <p>
      Metaheuristic adalah payung besar untuk pencarian solusi pada masalah optimasi yang sulit.
      Dalam sumber materi ini, fokus pembahasannya adalah <strong>Evolutionary Computation</strong>
      dan terutama <strong>Genetic Algorithm</strong>, yaitu pendekatan yang meniru ide evolusi
      untuk memperbaiki kualitas solusi sedikit demi sedikit melalui populasi, seleksi, rekombinasi,
      dan mutasi.
    </p>
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
            'Itulah kondisi khas saat metaheuristic dan khususnya EC/GA menjadi masuk akal untuk dipakai.',
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
  ol li + li,
  ul li + li {
    margin-top: 0.35rem;
  }
</style>
