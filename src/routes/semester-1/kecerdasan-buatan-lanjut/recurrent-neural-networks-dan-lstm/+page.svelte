<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import MathBlock from '$lib/components/MathBlock.svelte';

  // LaTeX formulas defined inside script block to prevent Svelte HTML compiler errors
  const hiddenStateFormula = String.raw`s_t = \tanh(U x_t + W s_{t-1} + b_h)`;
  const outputFormula = String.raw`o_t = \text{softmax}(V s_t + b_o)`;
  const totalLossFormula = String.raw`E = \sum_{t} E_t = \sum_{t} -y_t \log(o_t)`;
  const bpttGradient = String.raw`\frac{\partial E}{\partial W} = \sum_{t} \frac{\partial E_t}{\partial W}`;
  const specificBpttChain = String.raw`\frac{\partial E_3}{\partial W} = \sum_{k=0}^3 \frac{\partial E_3}{\partial \hat{y}_3} \frac{\partial \hat{y}_3}{\partial s_3} \frac{\partial s_3}{\partial s_k} \frac{\partial s_k}{\partial W}`;

  const forgetGateFormula = String.raw`f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)`;
  const inputGateFormula = String.raw`i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)`;
  const candidateStateFormula = String.raw`\tilde{C}_t = \tanh(W_c \cdot [h_{t-1}, x_t] + b_c)`;
  const cellStateUpdate = String.raw`C_t = f_t * C_{t-1} + i_t * \tilde{C}_t`;
  const outputGateFormula = String.raw`o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)`;
  const hiddenStateUpdate = String.raw`h_t = o_t * \tanh(C_t)`;

  const quizQuestions = [
    {
      question:
        'Mengapa algoritma RNN standar mengalami kesulitan dalam mempelajari ketergantungan jangka panjang (long-term dependencies)?',
      options: [
        'Karena RNN tidak memiliki parameter bobot yang dibagikan secara bersamaan.',
        'Karena proses Backpropagation Through Time (BPTT) memicu perkalian matriks bobot berulang kali yang menyebabkan gradien mengecil secara eksponensial (vanishing gradient) atau membesar tanpa batas (exploding gradient).',
        'Karena RNN hanya mampu memproses data masukan dengan panjang tetap (fixed-size).',
        'Karena fungsi aktivasi tanh tidak diizinkan pada RNN.',
      ],
      correctIndex: 1,
      explanation:
        'Dalam BPTT, turunan terhadap hidden state masa lalu melibatkan perkalian berantai matriks bobot recurrent W. Jika nilai eigen W < 1, gradien meluruh ke nol (vanishing). Jika nilai eigen W > 1, gradien meledak (exploding).',
    },
    {
      question:
        'Pada arsitektur LSTM, gate manakah yang bertugas untuk menyaring informasi apa saja yang akan dibuang dari Cell State?',
      options: ['Input Gate', 'Output Gate', 'Forget Gate', 'Candidate Hidden State'],
      correctIndex: 2,
      explanation:
        'Forget Gate (ft) menerima input xt dan hidden state sebelumnya ht-1, mengeluarkan nilai probabilitas sigmoid [0, 1] untuk menentukan bagian informasi cell state masa lalu mana yang dibuang (0) atau dipertahankan (1).',
    },
  ];
</script>

<svelte:head>
  <title>Recurrent Neural Networks dan LSTM - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Recurrent Neural Networks dan LSTM"
    date="05 Juni 2026"
    status="done"
    tags={['RNN', 'LSTM', 'Sequence-Data']}
  />

  <NoteSection title="1. Masalah Pemrosesan Sekuensial">
    <p>
      Di dunia nyata, banyak data berbentuk <strong>sekuensial (deretan/barisan)</strong> seperti deret
      waktu (curah hujan, saham), teks (sekuens kata/huruf), suara (spektrum frekuensi), dan video (barisan
      frame).
    </p>
    <p>
      Pemrosesan data sekuens membutuhkan mekanisme untuk menyimpan informasi pada suatu waktu ($t$)
      agar bisa digunakan pada waktu setelahnya ($t+1$). Jaringan standar seperti ANN, CNN, atau DBN
      tidak memiliki memori untuk mengingat riwayat data masa lalu.
    </p>
  </NoteSection>

  <NoteSection title="2. Konsep Recurrent Neural Network (RNN)">
    <p>
      RNN adalah arsitektur neural network yang memiliki **koneksi melingkar (loop)** yang
      memungkinkan informasi dikirim dari satu langkah waktu ke langkah berikutnya. RNN bertindak
      seperti salinan berulang dari jaringan yang sama, yang meneruskan memori ke suksesornya.
    </p>

    <p><strong>Formulasi Matematis RNN:</strong></p>
    <p>Untuk setiap time step $t$:</p>
    <p><strong>1. Hidden State:</strong> Memori yang menyimpan hasil pemrosesan neuron.</p>
    <MathBlock latex={hiddenStateFormula} />
    <ul>
      <li>$x_t$: Input pada time step $t$.</li>
      <li>
        {'$s_{t-1}$'}: Hidden state dari time step sebelumnya (bernilai default 0 pada $t=0$).
      </li>
      <li>$U$: Bobot untuk input.</li>
      <li>$W$: Bobot untuk hidden state recurrent.</li>
    </ul>
    <p><strong>2. Output:</strong> Hasil prediksi pada time step $t$.</p>
    <MathBlock latex={outputFormula} />
    <ul>
      <li>$V$: Bobot untuk output.</li>
    </ul>
    <p>Parameter $U, W,$ dan $V$ dibagikan (shared/sama) di setiap langkah waktu.</p>
  </NoteSection>

  <NoteSection title="3. Pola Arsitektur RNN">
    <ul>
      <li>
        <strong>One-to-One:</strong> Input &amp; output ukuran tetap (bukan sekuens). Contoh: Klasifikasi
        gambar dasar.
      </li>
      <li>
        <strong>One-to-Many:</strong> Input tunggal, output berupa sekuens. Contoh: Image captioning (gambar
        $ ightarrow$ kalimat).
      </li>
      <li>
        <strong>Many-to-One:</strong> Input sekuens, output nilai tunggal. Contoh: Sentiment Analysis
        (kalimat $ ightarrow$ sentimen).
      </li>
      <li>
        <strong>Many-to-Many (Asinkron):</strong> Input sekuens, output sekuens dengan panjang berbeda.
        Contoh: Machine Translation (English $ ightarrow$ Indonesia).
      </li>
      <li>
        <strong>Many-to-Many (Sinkron):</strong> Input &amp; output sekuens dengan panjang sama. Contoh:
        Video classification (melabeli setiap frame video).
      </li>
    </ul>
  </NoteSection>

  <NoteSection title="4. Backpropagation Through Time &amp; Masalah Gradien">
    <p><strong>Backpropagation Through Time (BPTT):</strong></p>
    <p>
      Pelatihan RNN menelusuri setiap langkah rangkaian waktu. Total loss merupakan jumlah loss di
      setiap time step:
    </p>
    <MathBlock latex={totalLossFormula} />
    <p>
      Untuk menghitung gradien, kita menggunakan aturan rantai (chain rule) yang menjumlahkan
      gradien di setiap langkah waktu. Jika jumlah loop/langkah waktu sangat panjang, komputasi
      gradien menjadi sangat kompleks.
    </p>
    <MathBlock latex={bpttGradient} />
    <p>Untuk time step t = 3, gradient update terhadap recurrent weights W adalah:</p>
    <MathBlock latex={specificBpttChain} />
    <p>
      <strong>Truncated BPTT:</strong> Untuk mempercepat pelatihan, deretan data panjang dibagi menjadi
      beberapa subsequences dengan panjang langkah seragam untuk proses forward &amp; backward.
    </p>

    <Callout type="danger" title="Vanishing &amp; Exploding Gradients">
      <p>
        Saat menghitung gradien recurrent terhadap hidden state masa lalu, kita melakukan perkalian
        berulang kali dengan matriks bobot recurrent $W$.
      </p>
      <ul>
        <li>
          Jika nilai bobot kecil, nilai gradien akan mengecil secara eksponensial menuju nol (<strong
            >Vanishing Gradient</strong
          >). Akibatnya, model tidak bisa mempelajari pola jangka panjang.
        </li>
        <li>
          Jika nilai bobot besar, nilai gradien akan meledak membesar tanpa batas (<strong
            >Exploding Gradient</strong
          >), memicu ketidakstabilan numerik.
        </li>
      </ul>
    </Callout>
  </NoteSection>

  <NoteSection title="5. Long Short-Term Memory (LSTM)">
    <p>
      LSTM dipropose untuk memecahkan masalah vanishing gradient pada RNN standar. LSTM memiliki
      jalur utama yang disebut <strong>Cell State</strong> yang berfungsi seperti sabuk berjalan (conveyor
      belt) untuk menyalurkan informasi secara linear dengan sedikit interaksi.
    </p>
    <p>
      Informasi ke dalam cell state diatur oleh 3 gerbang (gates) berbasis aktivasi sigmoid $[0,
      1]$:
    </p>

    <p><strong>1. Forget Gate:</strong> Memutuskan informasi mana yang dibuang dari cell state.</p>
    <MathBlock latex={forgetGateFormula} />

    <p>
      <strong>2. Input Gate &amp; Candidate Cell State:</strong> Memutuskan informasi baru mana yang disimpan
      ke dalam cell state.
    </p>
    <MathBlock latex={inputGateFormula} />
    <MathBlock latex={candidateStateFormula} />

    <p>
      <strong>3. Update Cell State:</strong> Memperbarui cell state lama menjadi cell state baru.
    </p>
    <MathBlock latex={cellStateUpdate} />

    <p>
      <strong>4. Output Gate &amp; Hidden State:</strong> Menentukan nilai output hidden state berikutnya.
    </p>
    <MathBlock latex={outputGateFormula} />
    <MathBlock latex={hiddenStateUpdate} />

    <p><strong>Detail Operasi Aritmatika Internal LSTM (Slide 56-58):</strong></p>
    <ul>
      <li>
        <strong>Plus Junction ($+$):</strong> Penjumlahan elemen-demi-elemen (element-by-element
        addition) untuk menggabungkan informasi tanpa degradasi.
        <br />Contoh: <MathBlock
          latex={String.raw`[3, 4, 5]^T + [6, 7, 8]^T = [9, 11, 13]^T`}
          displayMode={false}
        />
      </li>
      <li>
        <strong>Times Junction ($\times$):</strong> Perkalian elemen-demi-elemen (element-by-element
        multiplication).
        <br />Contoh: <MathBlock
          latex={String.raw`[3, 4, 5]^T \times [6, 7, 8]^T = [18, 28, 40]^T`}
          displayMode={false}
        />
      </li>
      <li>
        <strong>Gating:</strong> Mengalikan vektor sinyal dengan vektor gerbang (bernilai $[0, 1]$)
        untuk melemahkan, mematikan, atau meloloskan sinyal.
        <br />Contoh: Sinyal <MathBlock latex={String.raw`[0.8, 0.8, 0.8]^T`} displayMode={false} /> dilewatkan
        ke gerbang <MathBlock latex={String.raw`[1.0, 0.5, 0.0]^T`} displayMode={false} /> menghasilkan
        <MathBlock latex={String.raw`[0.8, 0.4, 0.0]^T`} displayMode={false} />.
      </li>
    </ul>
  </NoteSection>

  <NoteSection title="6. Studi Kasus: Character-Level Language Model 'hello' (Slide 36-43)">
    <p>
      Aplikasi klasik RNN adalah memprediksi karakter berikutnya dalam sekuens teks. Misalkan kita
      melatih model untuk mengenali kata "h-e-l-l-o".
    </p>
    <p><strong>A. Representasi Input:</strong></p>
    <p>
      Kosakata unik adalah <MathBlock latex={String.raw`\{h, e, l, o\}`} displayMode={false} />.
      Karakter dipetakan menggunakan <strong>One-Hot Encoding</strong> berdimensi 4:
    </p>
    <ul>
      <li>$h = [1, 0, 0, 0]^T$</li>
      <li>$e = [0, 1, 0, 0]^T$</li>
      <li>$l = [0, 0, 1, 0]^T$</li>
      <li>$o = [0, 0, 0, 1]^T$</li>
    </ul>

    <p><strong>B. Tahap Pelatihan (Training Loop):</strong></p>
    <ol>
      <li>
        Pada time step $t=1$, input $x_1$ adalah "h" ($[1,0,0,0]^T$). Dikalikan dengan bobot {'$W_{xh}$'}
        menghasilkan representasi tersembunyi.
      </li>
      <li>
        Sinyal dilewatkan melalui fungsi aktivasi tanh ke output layer dengan dikalikan bobot {'$W_{ho}$'}
        menghasilkan skor kelas (misal $[1.0, 2.2, -3.0, 4.1]^T$).
      </li>
      <li>
        Menggunakan fungsi Softmax, model memprediksi probabilitas karakter berikutnya (misal
        menebak "o").
      </li>
      <li>
        Selisih prediksi dengan target asli "e" dihitung dengan Cross-Entropy Loss, lalu gradien
        dirambatkan mundur (BPTT) untuk memperbarui bobot {'$W_{xh}, W_{hh}, W_{hy}, b_h,$'} dan {'$b_y$'}.
      </li>
    </ol>

    <p><strong>C. Tahap Pengujian (Testing / Inference Loop):</strong></p>
    <ol>
      <li>Input pertama dimasukkan secara manual (yaitu karakter "h").</li>
      <li>Model menghasilkan output prediksi karakter berikutnya (misalnya menebak "e").</li>
      <li>
        Karakter hasil prediksi "e" tersebut **digunakan langsung sebagai input** untuk langkah
        waktu berikutnya ($t=2$).
      </li>
      <li>
        Langkah forward pass hidden layer berikutnya menggunakan memori hidden state langkah pertama
        dikalikan bobot recurrent {'$W_{hh}$'}, diulangi hingga seluruh rangkaian kata selesai
        terbentuk.
      </li>
    </ol>
  </NoteSection>

  <NoteSection title="7. Uji Pemahaman (Quiz)">
    <Quiz questions={quizQuestions} />
  </NoteSection>

  <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
