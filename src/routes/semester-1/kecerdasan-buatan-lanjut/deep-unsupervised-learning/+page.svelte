<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    // LaTeX formulas defined inside script block to prevent Svelte HTML compiler errors
    const cdWeightDelta = String.raw`\Delta W = P(h_0 | v_0)v_0^T - P(h_k | v_k)v_k^T`;
    const weightUpdate = String.raw`W_{\text{baru}} = W_{\text{lama}} + \eta \Delta W`;

    const quizQuestions = [
        {
            question: "Bagaimanakah skema deteksi anomali (Anomaly Detection) menggunakan Autoencoder diimplementasikan secara praktis?",
            options: [
                "Model dilatih dengan data anomali, lalu mendeteksi jika data normal masuk.",
                "Model dilatih hanya dengan data normal, mencatat batas maksimum reconstruction error pada data validasi. Jika data produksi memiliki reconstruction error melebihi batas tersebut, data tersebut dianggap anomali.",
                "Menggunakan fungsi aktivasi tanh di bottleneck layer untuk membatasi nilai error di angka 0.04.",
                "Menggunakan model supervised dengan penambahan classifier layer di akhir decoder."
            ],
            correctIndex: 1,
            explanation: "Autoencoder dilatih untuk merekonstruksi data normal. Karena ia hanya mengenali pola data normal, jika ada data anomali (outlier) masuk, reconstruction error-nya akan sangat tinggi melampaui threshold validasi (misal 0.04)."
        },
        {
            question: "Apakah perbedaan mendasar antara representasi RBM (Restricted Boltzmann Machine) dengan Neural Network tradisional?",
            options: [
                "RBM merupakan model grafis berarah yang dilatih menggunakan backpropagation.",
                "RBM merupakan model grafis tak berarah (undirected) yang menggunakan unit stokastik dan tidak memiliki koneksi antar node pada layer yang sama (bipartite).",
                "RBM tidak memiliki lapisan tersembunyi (hidden layer).",
                "RBM menggunakan gradient descent konvensional untuk melatih bobotnya secara deterministik."
            ],
            correctIndex: 1,
            explanation: "RBM adalah model grafis tak berarah dua layer (visible & hidden) yang terhubung secara bipartite (tidak ada koneksi intra-layer). Node RBM menggunakan unit stokastik (probabilistik) dan dilatih menggunakan Gibbs sampling serta Contrastive Divergence."
        }
    ];
</script>

<svelte:head>
    <title>Deep Unsupervised Learning - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Deep Unsupervised Learning"
        date="28 Mei 2026"
        status="done"
        tags={["Unsupervised", "Autoencoders", "RBM", "Deep-Learning"]}
    />

    <NoteSection title="1. Pendahuluan Unsupervised Learning">
        <p>
            <strong>Deep Unsupervised Learning</strong> bertujuan untuk mempelajari struktur representasi tersembunyi dari data yang tidak berlabel. Hal ini sangat krusial karena akuisisi dan pelabelan data secara manual merupakan bagian paling mahal dalam proyek dunia nyata.
        </p>
        <p>
            Dua teknik utama unsupervised deep learning adalah <strong>Autoencoders</strong> dan <strong>Restricted Boltzmann Machines (RBM)</strong>.
        </p>
    </NoteSection>

    <NoteSection title="2. Autoencoders (AE) vs PCA">
        <p>
            <strong>Autoencoder</strong> adalah jaringan saraf tiruan yang dirancang untuk merekonstruksi inputnya sendiri pada layer output (menggunakan data input itu sendiri sebagai target/label).
        </p>
        <p>
            <strong>Struktur Utama Autoencoder:</strong>
        </p>
        <ul>
            <li><strong>Encoder:</strong> Memetakan input berdimensi tinggi ke ruang representasi laten (bottleneck) berdimensi rendah.</li>
            <li><strong>Bottleneck Layer:</strong> Lapisan dengan dimensi yang jauh lebih kecil dari input untuk memaksa jaringan memampatkan informasi penting (mereduksi dimensi).</li>
            <li><strong>Decoder:</strong> Memetakan representasi laten kembali ke bentuk dimensi input asli untuk menghasilkan rekonstruksi.</li>
        </ul>
        <p>
            <strong>Perbandingan dengan PCA:</strong> PCA melakukan proyeksi dimensi secara linear. Autoencoder mampu menangkap hubungan non-linear yang kompleks berkat penggunaan fungsi aktivasi non-linear.
        </p>
        <p>
            <strong>Stacked Autoencoders pada Gambar:</strong> Untuk data citra, penggunaan Convolution dan Deconvolution (Transposed Convolution) menghasilkan rekonstruksi yang jauh lebih baik dibandingkan fully connected layers (misalnya akurasi representasi MNIST 97.5% vs 87.5%).
        </p>
    </NoteSection>

    <NoteSection title="3. Empat Use Case Utama Autoencoder">
        <ol>
            <li>
                <strong>Anomaly Detection (Deteksi Anomali):</strong> Latih model hanya pada data normal. Catat batas kesalahan rekonstruksi maksimum (<em>max reconstruction error</em>) pada data validasi (misal 0.04). Gunakan model di produksi: jika nilai error data baru &gt; 0.04, tandai sebagai anomali. Sangat berguna untuk kelas tidak seimbang atau jika data rusak sulit diperoleh.
            </li>
            <li>
                <strong>Denoising:</strong> Menambahkan derau (noise) pada input, lalu melatih jaringan saraf untuk merekonstruksi versi input bersih asli. Bottleneck pada denoising autoencoder terkadang diizinkan berdimensi lebih besar dari input.
            </li>
            <li>
                <strong>Pretraining (Semi-Supervised):</strong> Jika data berlabel sangat sedikit namun data tidak berlabel melimpah. Latih encoder-decoder pada data tidak berlabel. Lepaskan decoder, sambungkan lapisan klasifikasi baru (classifier layer) di atas encoder, lalu latih secara supervised pada data berlabel yang sedikit (Transfer Learning).
            </li>
            <li>
                <strong>Similarity Detection:</strong> Latih encoder-decoder. Gunakan output vektor bottleneck (embedding/latent vector) dari dua input data. Jarak matematis antar vektor laten mewakili tingkat kemiripan kedua input tersebut.
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="4. Restricted Boltzmann Machines (RBM)">
        <p>
            RBM adalah model grafis tak berarah (<em>undirected graphical model</em>) dua lapis (Visible Layer dan Hidden Layer) yang diperkenalkan oleh Paul Smolensky tahun 1986 sebagai Harmonium. RBM populer karena digunakan pada kompetisi Netflix Prize.
        </p>
        <ul>
            <li><strong>Struktur Bipartite:</strong> Node terhubung antar layer, tetapi tidak ada koneksi antar node di dalam layer yang sama.</li>
            <li><strong>Stokastik:</strong> RBM menggunakan unit probabilistik/stokastik, bukan deterministik.</li>
            <li><strong>Biases:</strong> Memiliki <em>hidden bias</em> untuk membantu forward pass (prediksi laten), dan <em>visible bias</em> untuk membantu backward pass (rekonstruksi input).</li>
            <li><strong>Matriks Bobot W:</strong> Baris sama dengan jumlah visible node, kolom sama dengan jumlah hidden node.</li>
        </ul>
        <p><strong>Aplikasi RBM (Slide 29):</strong></p>
        <ul>
            <li>Dimensionality reduction (Reduksi dimensi)</li>
            <li>Classification (Klasifikasi)</li>
            <li>Collaborative filtering (Penyaringan kolaboratif, misal sistem rekomendasi)</li>
            <li>Feature learning (Pembelajaran fitur)</li>
            <li>Topic modelling (Pemodelan topik)</li>
        </ul>
        <p>
            <strong>Collaborative Filtering Phone Recommendation (Slide 41):</strong> RBM dapat memetakan ketertarikan pengguna terhadap berbagai tipe ponsel (seperti Xiaomi Redmi 7, Oppo A7, iPhone Xs, Lenovo Z5, Vivo V9 Pro, Oppo Find X, Galaxy A20, Galaxy S10+) sebagai visible layer stokastik ke representasi hidden layer yang merepresentasikan profil selera pengguna.
        </p>
    </NoteSection>

    <NoteSection title="5. Proses Latih RBM: Gibbs Sampling &amp; CD-k">
        <p>
            Pelatihan RBM tidak menggunakan SGD backpropagation biasa, melainkan melalui dua tahap:
        </p>
        <p><strong>1. Gibbs Sampling:</strong></p>
        <p>
            Mengingat vektor input $v_0$, kita hitung probabilitas aktivasi tersembunyi $P(h|v)$. Menggunakan nilai $h$ yang didapat, kita rekonstruksi input baru menggunakan $P(v|h)$. Proses diulang sebanyak $k$ kali hingga diperoleh rekonstruksi akhir $v_k$.
        </p>
        <p><strong>2. Contrastive Divergence (CD-k):</strong></p>
        <p>
            Matriks bobot diperbarui berdasarkan perbedaan produk luar (outer product) probabilitas aktivasi visible-hidden awal ($v_0$ &amp; $h_0$) dengan hasil rekonstruksi ke-k ($v_k$ &amp; $h_k$):
        </p>
        <MathBlock latex={cdWeightDelta} />
        <p>
            Pembaruan bobot baru dicari dengan menggunakan algoritma gradient ascent:
        </p>
        <MathBlock latex={weightUpdate} />
    </NoteSection>

    <NoteSection title="6. Deep Restricted Boltzmann Networks (DRBN)">
        <p>
            DRBN dibentuk dengan menumpuk beberapa lapisan RBM secara hierarkis (bisa puluhan, ratusan, hingga ribuan layer).
        </p>
        <ul>
            <li>Lapisan awal mengekstrak fitur tingkat rendah (low-level).</li>
            <li>Lapisan yang lebih tinggi mengekstrak fitur tingkat tinggi (high-level) yang abstrak dan sangat diskriminatif.</li>
            <li>DRBN bertindak sebagai model **rekayasa fitur otomatis (feature engineering)**. Fitur level tertinggi dari RBM terakhir dapat langsung dimasukkan sebagai input classifier eksternal seperti Naive Bayes atau Decision Tree.</li>
        </ul>
    </NoteSection>

    <NoteSection title="7. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
