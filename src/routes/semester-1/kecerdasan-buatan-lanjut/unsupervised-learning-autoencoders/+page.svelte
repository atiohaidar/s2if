<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import VideoSidebar from "$lib/components/VideoSidebar.svelte";
    import { HelpCircle, Play } from "lucide-svelte";

    const videoBaseUrl = "https://www.youtube.com/watch?v=Ex0nhOPzLIs";

    let videoSidebar: VideoSidebar;

    const chapters = [
        { title: 'Intro', time: '0:03', seconds: 3 },
        { title: 'Unsupervised Training', time: '2:58', seconds: 178 },
        { title: 'CNN Autoencoders', time: '9:38', seconds: 578 },
        { title: 'The Bottleneck', time: '11:25', seconds: 685 },
        { title: 'Even More Examples', time: '14:22', seconds: 862 },
        { title: 'Anomaly Detection', time: '15:24', seconds: 924 },
        { title: 'Anomaly Demo', time: '16:43', seconds: 1003 },
        { title: 'Denoising', time: '18:55', seconds: 1135 },
        { title: 'Pre-training', time: '20:37', seconds: 1237 },
        { title: 'BERT & Divisio', time: '23:35', seconds: 1415 },
        { title: 'Similarity Detection', time: '26:51', seconds: 1611 },
        { title: 'Generative AE', time: '29:12', seconds: 1752 },
        { title: 'Intrinsic Space', time: '30:17', seconds: 1817 },
        { title: 'Pac-Man Space', time: '32:15', seconds: 1935 },
        { title: 'Ideal Bottleneck', time: '34:50', seconds: 2090 },
        { title: 'Realita Fitur Tersebar', time: '35:46', seconds: 2146 },
        { title: 'VAE', time: '37:11', seconds: 2231 },
        { title: 'Kelebihan VAE', time: '41:04', seconds: 2464 },
        { title: 'Demo Latent Space', time: '43:05', seconds: 2585 },
        { title: 'Pengalaman DIVISIO', time: '46:48', seconds: 2808 },
        { title: 'Ringkasan', time: '48:35', seconds: 2915 },
    ];

    /**
     * Event delegation: intercept clicks on any .timestamp-badge link,
     * parse the YouTube ?t= parameter, and seek the embedded player instead.
     */
    function handleTimestampClick(event: MouseEvent) {
        const badge = (event.target as HTMLElement).closest('.timestamp-badge') as HTMLAnchorElement | null;
        if (!badge) return;
        const href = badge.getAttribute('href') ?? '';
        const match = href.match(/t=(\d+)m(\d+)s/);
        if (match) {
            event.preventDefault();
            const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2]);
            videoSidebar?.seekTo(totalSeconds);
        }
    }

    const quizQuestions = [
        {
            question: "Apa peran utama dari bottleneck (leher botol) pada arsitektur Autoencoder klasik?",
            options: [
                "Mempercepat proses training dengan membuang layer decoder.",
                "Memaksa jaringan mereduksi dimensi data dan mengekstrak representasi fitur yang paling penting.",
                "Menambahkan noise acak secara matematis untuk meningkatkan akurasi klasifikasi.",
                "Mengubah proses pembelajaran unsupervised secara otomatis menjadi supervised."
            ],
            correctIndex: 1,
            explanation: "Bottleneck memiliki dimensi yang jauh lebih kecil daripada input. Hal ini memaksa jaringan mengompresi data (misalnya dari 784 dimensi MNIST menjadi hanya 32 dimensi), sehingga model terpaksa membuang detail noise yang tidak penting dan hanya menyimpan fitur esensial yang paling mendasar untuk rekonstruksi."
        },
        {
            question: "Bagaimana cara Autoencoder mendeteksi bahwa suatu data baru adalah sebuah anomali?",
            options: [
                "Model akan secara otomatis menghasilkan probabilitas label 'anomali' mendekati 1.",
                "Model akan menghasilkan nilai latent vector bernilai negatif atau mendekati tak terhingga.",
                "Model akan menghasilkan tingkat reconstruction error yang sangat tinggi karena data tersebut tidak mirip dengan pola data normal yang dipelajari.",
                "Decoder akan mendeteksi noise dan otomatis membersihkannya tanpa mengubah output."
            ],
            correctIndex: 2,
            explanation: "Autoencoder dilatih hanya menggunakan data normal sehingga sangat mahir merekonstruksi data sejenis. Ketika diberikan data anomali yang tidak pernah dilihat sebelumnya, rekonstruksinya akan rusak, menghasilkan reconstruction error yang jauh melebihi threshold (batas) dari data latih normal."
        },
        {
            question: "Mengapa Variational Autoencoder (VAE) menghasilkan ruang laten (latent space) yang jauh lebih mulus dibandingkan Autoencoder klasik?",
            options: [
                "Karena VAE merepresentasikan ruang laten sebagai distribusi probabilitas (mean & variance) dan melakukan sampling acak.",
                "Karena VAE memiliki ukuran bottleneck yang jauh lebih besar daripada dimensi input aslinya.",
                "Karena VAE tidak menggunakan decoder sama sekali dalam proses pembuatan data baru.",
                "Karena VAE menggunakan algoritma clustering eksternal seperti DBScan atau k-means di dalam bottleneck."
            ],
            correctIndex: 0,
            explanation: "Dengan merepresentasikan ruang laten sebagai mean dan variance, lalu melakukan sampling secara acak, VAE dipaksa untuk memetakan ruang laten menjadi permukaan yang mulus (smooth surface) tanpa ada celah kosong. Ini mencegah decoder menghasilkan rekonstruksi yang rusak saat kita menjelajahi ruang laten."
        }
    ];
</script>

<svelte:head>
    <title>Unsupervised Learning dengan Autoencoders - S2IF Notebook</title>
    <meta name="description" content="Catatan kuliah komprehensif mengenai konsep Unsupervised Learning menggunakan Autoencoders, arsitektur bottleneck, 5 use cases utama, dan Variational Autoencoders (VAEs)." />
</svelte:head>

<article class="note-article" onclick={handleTimestampClick}>
    <NoteHeader
        title="Unsupervised Learning dengan Autoencoders"
        date="17 Mei 2026"
        status="done"
        tags={["Unsupervised", "Autoencoders", "VAE", "Anomaly-Detection"]}
    />

    <Callout type="info" title="Sumber Materi">
        Catatan ini disusun berdasarkan talk <strong>Christoph Henkelmann</strong> (CTO &amp; Founder, Divisio) berjudul <em>"Unsupervised Learning with Autoencoders"</em>. Video lengkap tersedia di: <a href="https://www.youtube.com/watch?v=Ex0nhOPzLIs&t=648s" target="_blank" rel="noopener noreferrer">YouTube — Unsupervised Learning with Autoencoders</a>.
    </Callout>

    <NoteSection title="Pendahuluan: Supervised vs Unsupervised Learning">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=0m3s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 0:03 Intro
            </a>
            <a href="{videoBaseUrl}&t=2m58s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 2:58 Unsupervised Training
            </a>
        </div>
        <p>
            Semua contoh dalam materi ini menggunakan dataset <strong>MNIST</strong> (<em>Modified National Institute of Standards and Technology</em>) — kumpulan 60.000 gambar training dan 10.000 gambar test berupa angka tulisan tangan berukuran 28 × 28 piksel grayscale. MNIST adalah <em>hello world</em>-nya neural network karena sudah sangat familiar, memberikan hasil cepat, dan bisa dijalankan di laptop biasa.
        </p>

        <h3>Supervised Learning: Kekuatan dan Kelemahannya</h3>
        <p>
            Pada <strong>Supervised Learning</strong>, kita memiliki data yang sudah dilabeli. Contoh paling sederhana: dataset MNIST diorganisir ke dalam folder-folder bernama 0 sampai 9 — folder "0" berisi gambar angka nol, folder "1" berisi gambar angka satu, dan seterusnya. Kita bertindak sebagai <strong>"guru" yang mengawasi (supervise)</strong> proses belajar model — itulah mengapa disebut <em>supervised</em>.
        </p>
        <p>
            Dengan arsitektur sederhana seperti fully connected network, MNIST sudah bisa diklasifikasi dengan akurasi sekitar 87%. Dengan CNN yang lebih canggih, akurasi bisa mencapai 97-98% hanya dalam setengah jam training di laptop.
        </p>
        <p>
            Namun, kelemahan terbesar supervised learning adalah <strong>ketergantungan pada data berlabel (annotated data)</strong>. Seseorang harus melakukan pekerjaan berat: mengambil semua gambar, memotongnya, memusatkannya, melihat satu per satu, lalu mengurutkannya ke dalam kelas yang benar. Proses anotasi ini membutuhkan:
        </p>
        <ul>
            <li><strong>Waktu dan uang</strong> — <em>Time is Money</em>. Data berkualitas baik menghasilkan model berkualitas baik, tapi mendapatkan dan melabeli data adalah pekerjaan yang sangat mahal.</li>
            <li><strong>Keahlian tingkat tinggi</strong> — misalnya dokter ahli untuk menganalisis scan medis, atau pakar linguistik untuk menganalisis tata bahasa tingkat lanjut.</li>
            <li><strong>Jumlah data yang besar</strong> — banyak data + banyak waktu = banyak uang.</li>
        </ul>

        <h3>Unsupervised Learning: Belajar Tanpa Label</h3>
        <p>
            Bayangkan kita mengambil semua gambar MNIST dan melemparkannya ke dalam satu folder raksasa, lalu kita <strong>sepenuhnya melupakan</strong> apa yang ada di setiap gambar. Apakah data ini masih berguna untuk belajar? <strong>Ya!</strong> Karena itulah kita menggunakan <strong>Unsupervised Learning</strong>.
        </p>
        <p>
            Unsupervised learning tetap membutuhkan data, tetapi <strong>tidak membutuhkan label</strong>. Karena akuisisi data dan pelabelan adalah bagian termahal dari kebanyakan proyek ML, maka teknik unsupervised sangat mempermudah hidup kita.
        </p>

        <Callout type="warning" title="No Free Lunch Theorem">
            Namun, perlu diingat: unsupervised learning bukanlah peluru perak (silver bullet) yang menyelesaikan semua masalah. Tidak ada keajaiban gratis — teknik ini memiliki trade-off tersendiri yang akan kita bahas di bagian akhir.
        </Callout>
    </NoteSection>

    <NoteSection title="Teknik Unsupervised Lainnya: Clustering & Separation">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=4m38s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 4:38 Clustering
            </a>
            <a href="{videoBaseUrl}&t=6m10s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 6:10 Separation Techniques
            </a>
        </div>
        <p>
            Sebelum masuk ke Autoencoders, penting untuk memahami dua keluarga teknik unsupervised lainnya yang sering dipakai di industri:
        </p>

        <h3>Clustering (Pengelompokan)</h3>
        <p>
            Algoritma clustering mengelompokkan data yang mirip ke dalam klaster tanpa mengetahui label sebelumnya. Setelah klaster terbentuk, kita cukup mengecek beberapa contoh di tiap klaster untuk menentukan labelnya — jauh lebih cepat daripada melabeli seluruh dataset satu per satu.
        </p>
        <ul>
            <li><strong>Kegunaan:</strong> klasifikasi cepat, eksplorasi data, dan <em>outlier detection</em> (data yang tidak masuk klaster mana pun kemungkinan besar adalah anomali).</li>
            <li><strong>Kelemahan:</strong> batas antar-klaster bersifat <em>smooth / fuzzy</em>, sehingga data di perbatasan (misalnya angka 7 yang mirip angka 1) sering salah dikelompokkan.</li>
            <li><strong>Metode populer:</strong> k-Means, DBScan, Spectral Clustering.</li>
        </ul>

        <h3>Separation / Dimensionality Reduction</h3>
        <p>
            Teknik-teknik ini mencari <strong>transformasi yang berguna</strong> pada data: menemukan dimensi-dimensi mana yang paling penting dan membuang sisanya. Bayangkan sekumpulan data 1000 dimensi, tetapi setelah dianalisis ternyata hanya 3 dimensi yang benar-benar berpengaruh.
        </p>
        <ul>
            <li><strong>Kegunaan:</strong> mengurangi dimensi data sebagai pre-processing sebelum melatih neural network (lebih sedikit dimensi = konvergensi lebih cepat = hasil lebih baik), serta <em>outlier detection</em>.</li>
            <li><strong>Metode populer:</strong> PCA (Principal Component Analysis), SVD (Singular Value Decomposition), Spectral Transformations, Wavelets.</li>
        </ul>

        <Callout type="info">
            Autoencoders bisa dianggap sebagai versi <em>deep learning</em> dari teknik separation ini — keduanya sama-sama mencari representasi berdimensi rendah dari data, tetapi Autoencoders mampu menangkap hubungan non-linear yang jauh lebih kompleks.
        </Callout>
    </NoteSection>

    <NoteSection title="Apa itu Autoencoder?">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=7m23s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 7:23 Konsep Autoencoder
            </a>
            <a href="{videoBaseUrl}&t=11m25s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 11:25 The Bottleneck
            </a>
            <a href="{videoBaseUrl}&t=12m57s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 12:57 Rekonstruksi vs Blur
            </a>
            <a href="{videoBaseUrl}&t=14m22s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 14:22 Kesalahan Rekonstruksi
            </a>
        </div>
        <p>
            <strong>Autoencoder</strong> adalah arsitektur neural network yang dirancang untuk mereproduksi atau merekonstruksi inputnya sendiri pada bagian output. Jadi secara sederhana, target output dari jaringan ini adalah input itu sendiri (<code>Y = X</code>).
        </p>
        <p>
            Proses ini terdengar membosankan—mengapa kita bersusah payah melatih neural network yang kompleks hanya untuk menduplikasi input? Rahasianya terletak pada bagian tengah arsitektur ini: <strong>The Bottleneck (Leher Botol)</strong>.
        </p>
        
        <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0;">
            <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Arsitektur Autoencoder</h4>
            <div style="display: flex; justify-content: space-between; align-items: center; text-align: center; gap: 0.5rem; margin-top: 1rem;">
                <div style="flex: 1; padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                    <strong>Input (X)</strong><br><small>High Dim (e.g. 784)</small>
                </div>
                <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
                <div style="flex: 1.2; padding: 0.5rem; background: var(--color-status-info-soft); border: 1px solid var(--color-callout-info-border); border-radius: 4px;">
                    <strong>Encoder</strong><br><small>Kompresi</small>
                </div>
                <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
                <div style="flex: 0.8; padding: 0.5rem; background: var(--color-status-warning-soft); border: 2px solid var(--color-status-warning-border); border-radius: 4px;">
                    <strong>Bottleneck (Z)</strong><br><small>Latent / Embedding (e.g. 32)</small>
                </div>
                <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
                <div style="flex: 1.2; padding: 0.5rem; background: var(--color-status-success-soft); border: 1px solid var(--color-status-done-start); border-radius: 4px;">
                    <strong>Decoder</strong><br><small>Rekonstruksi</small>
                </div>
                <div style="font-size: 1.2rem; color: var(--color-ink-muted);">➔</div>
                <div style="flex: 1; padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                    <strong>Output (X̂)</strong><br><small>High Dim (e.g. 784)</small>
                </div>
            </div>
        </div>

        <p>
            Autoencoder dibagi menjadi dua bagian utama:
        </p>
        <ol>
            <li>
                <strong>Encoder (Pengode):</strong> Bagian jaringan yang secara bertahap memperkecil ukuran layer untuk menekan informasi input menjadi sebuah representasi vektor berdimensi rendah (disebut <em>latent vector</em>, <em>embedding</em>, atau <em>feature vector</em>).
            </li>
            <li>
                <strong>Decoder (Penafsir sandi):</strong> Bagian jaringan yang menerima latent vector dari bottleneck dan secara bertahap memperluas kembali ukurannya untuk merekonstruksi input asli semirip mungkin.
            </li>
        </ol>

        <h3>The Bottleneck: Kunci Rahasia Autoencoder</h3>
        <p>
            Layer-layer input semakin mengecil → melewati bottleneck → lalu membesar kembali. Pada contoh MNIST, bottleneck hanya memiliki <strong>32 neuron</strong> sementara input memiliki <strong>784 piksel</strong>. Ini berarti neural network <strong>dipaksa</strong> untuk mereduksi dimensi input dengan faktor yang sangat besar — menekan seluruh informasi gambar melewati "lubang jarum" yang sangat sempit.
        </p>

        <h3>Bukan Sekadar Blur — Ini Adalah Rekonstruksi Cerdas</h3>
        <p>
            Pada pandangan pertama, hasil rekonstruksi autoencoder terlihat seperti gambar yang diburamkan. Tapi jika kita perhatikan lebih teliti, sebenarnya <strong>bukan hanya blur</strong> — model benar-benar <em>merekonstruksi</em> gambar berdasarkan pemahaman internalnya tentang fitur. Contoh-contoh spesifik dari eksperimen MNIST:
        </p>
        <ul>
            <li>Angka <strong>4</strong> asli memiliki kait kecil (<em>hook</em>) di bagian atas — dalam rekonstruksi, kait tersebut <strong>menghilang</strong> karena dianggap bukan fitur esensial dari angka 4.</li>
            <li>Angka <strong>0</strong> asli tidak tersambung sempurna (ditulis cepat dengan pena) — dalam rekonstruksi, angka 0 menjadi <strong>tersambung penuh</strong>. Jika ini hanya blur, seharusnya ada area abu-abu di titik terputus, tapi tidak ada.</li>
            <li>Angka <strong>3</strong> asli memiliki bagian bawah yang panjang — dalam rekonstruksi, bagian atas menjadi <strong>lebih melengkung</strong> dan proporsinya berubah.</li>
            <li>Angka <strong>2</strong> asli memiliki bagian atas yang sangat melengkung — rekonstruksi menunjukkan <strong>kelengkungan yang berbeda</strong>.</li>
        </ul>
        <p>
            Analoginya seperti ini: jika seseorang dengan cepat melihat sebuah angka lalu diminta menggambar ulang, ia akan mencoba meniru <em>gaya</em> angka tersebut (misalnya angka 1 gaya Amerika yang hanya berupa garis lurus vs angka 1 gaya Eropa yang memiliki kaki), tapi tidak akan menghasilkan posisi piksel yang persis sama. Inilah yang dilakukan autoencoder.
        </p>

        <Callout type="danger" title="Gambar Tidak Biasa = Rekonstruksi yang Salah">
            Gambar yang tidak lazim menghasilkan rekonstruksi yang <strong>lebih buruk secara signifikan</strong>, bukan hanya blur:
            <ul>
                <li>Angka <strong>4</strong> yang sebenarnya → direkonstruksi menjadi menyerupai angka <strong>9</strong>.</li>
                <li>Angka <strong>1</strong> yang tidak jelas → direkonstruksi menjadi menyerupai angka <strong>3</strong>.</li>
                <li>Angka <strong>4</strong> dengan garis horizontal yang terlalu panjang → menjadi semacam angka <strong>8 yang tergencet</strong>, bahkan tidak bisa dikenali.</li>
            </ul>
            Kesimpulan penting: semakin tidak biasa sebuah gambar dibandingkan data latih, semakin buruk rekonstruksinya. Fakta inilah yang membuka pintu ke berbagai <em>use case</em> yang sangat berguna!
        </Callout>
    </NoteSection>

    <NoteSection title="CNN Autoencoder & Transpose Convolution">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=9m38s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 9:38 CNN Autoencoder
            </a>
            <a href="{videoBaseUrl}&t=10m9s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 10:09 Transpose Convolution
            </a>
        </div>
        <p>
            Untuk data berbasis gambar, arsitektur <strong>Convolutional Neural Network (CNN)</strong> jauh lebih efektif daripada jaringan fully-connected biasa. CNN Autoencoder menggunakan layer konvolusi pada bagian Encoder dan layer <strong>Transpose Convolution</strong> pada bagian Decoder.
        </p>

        <Callout type="warning" title="Penamaan yang Sering Membingungkan">
            Banyak tutorial dan literatur yang menyebut layer rekonstruksi ini sebagai <em>Deconvolution Layer</em>, tetapi secara matematis operasi <em>deconvolution</em> adalah hal yang berbeda. Nama yang benar dalam framework seperti TensorFlow dan PyTorch adalah <strong>Transpose Convolution</strong> (atau <code>ConvTranspose2d</code> di PyTorch). Jika Anda mencari "deconvolution layer" di dokumentasi framework, Anda tidak akan menemukannya!
        </Callout>

        <p>
            Prinsipnya sederhana: Transpose Convolution adalah "konvolusi terbalik." Jika konvolusi biasa memperkecil ukuran spatial gambar (downsampling), maka Transpose Convolution memperbesar ukuran spatial gambar kembali (upsampling) untuk merekonstruksi resolusi asli.
        </p>

        <CodeBlock
            language="python"
            code={`import torch.nn as nn

# CNN Encoder: memperkecil spatial gambar
encoder = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=3, stride=2, padding=1),  # 28x28 -> 14x14
    nn.ReLU(),
    nn.Conv2d(16, 32, kernel_size=3, stride=2, padding=1), # 14x14 -> 7x7
    nn.ReLU(),
)

# CNN Decoder: memperbesar kembali spatial gambar
decoder = nn.Sequential(
    nn.ConvTranspose2d(32, 16, kernel_size=3, stride=2, padding=1, output_padding=1), # 7x7 -> 14x14
    nn.ReLU(),
    nn.ConvTranspose2d(16, 1, kernel_size=3, stride=2, padding=1, output_padding=1),  # 14x14 -> 28x28
    nn.Sigmoid(),
)`}
        />
    </NoteSection>

    <NoteSection title="5 Use Cases Utama Autoencoders">
        <p>
            Autoencoder terlihat sederhana, tetapi konsep kompresi dan rekonstruksi ini membuka pintu ke berbagai fungsi yang sangat kuat. Menariknya, setiap use case melibatkan "membuang" sebagian dari autoencoder:
        </p>

        <h3>
            1. Anomaly Detection (Deteksi Anomali)
            <a href="{videoBaseUrl}&t=15m24s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 15:24
            </a>
        </h3>
        <p>
            Use case pertama langsung memanfaatkan fakta bahwa gambar tidak biasa menghasilkan rekonstruksi yang buruk.
        </p>
        <p>
            <strong>Cara Kerja:</strong>
        </p>
        <ol>
            <li>Latih Autoencoder menggunakan data tidak berlabel sampai konvergen. Biarkan model belajar merekonstruksi data normal.</li>
            <li>Catat <strong>reconstruction error maksimal</strong> yang ditemui pada seluruh data training. Pada eksperimen MNIST, error maksimal yang tercatat adalah <strong>0.04</strong> (menggunakan L2 error).</li>
            <li>Bawa autoencoder ke produksi. Setiap data baru yang masuk, feed to autoencoder dan hitung reconstruction error-nya.</li>
            <li>Jika error melebihi threshold (> 0.04), tandai data tersebut sebagai <strong>anomali</strong>.</li>
        </ol>
        <p>
            <strong>Eksperimen nyata:</strong> Christoph Henkelmann menggambar beberapa gambar buatan tangan dan memasukkannya ke autoencoder MNIST yang sudah dilatih
            <a href="{videoBaseUrl}&t=16m43s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 16:43 Demo Anomali
            </a>:
        </p>
        <ul>
            <li>Simbol <strong>Sigma (Σ)</strong> → rekonstruksi rusak total, error <strong>0.10</strong> (jauh di atas threshold 0.04).</li>
            <li>Gambar <strong>smiley</strong> → tidak direkonstruksi dengan benar.</li>
            <li>Gambar <strong>garis-garis (stripes)</strong> → juga gagal direkonstruksi.</li>
        </ul>
        <p>
            Dalam <strong>setengah jam</strong>, ia sudah membangun sebuah network yang bisa membedakan apakah sesuatu adalah digit atau bukan!
        </p>

        <Callout type="tip" title="Mengapa Ini Sangat Powerful?">
            <ul>
                <li><strong>Tidak butuh contoh negatif:</strong> Classifier biasa (misal spam vs bukan spam) butuh contoh dari kedua kelas secara seimbang. Autoencoder hanya butuh data normal.</li>
                <li><strong>Contoh kasus reaktor nuklir:</strong> Kita memiliki ribuan jam data operasi normal, tapi kita tidak bisa meledakkan beberapa ribu reaktor untuk mendapatkan data kegagalan. Autoencoder bisa jadi sistem keamanan tambahan — seperti engineer berpengalaman yang langsung tahu ada yang salah saat mendengar suara mesin yang belum pernah ia dengar.</li>
                <li><strong>Berguna saat kita tidak tahu bentuk kegagalan:</strong> Kadang kita ingin sistem berkata "jika terjadi sesuatu yang tidak terduga, beritahu saya" — tapi bagaimana mengajarkan supervised system apa itu "tidak terduga"? Secara definisi, itu adalah hal yang kita tidak tahu!</li>
                <li><strong>Berguna saat label negatif sangat mahal.</strong></li>
            </ul>
        </Callout>

        <h3>
            2. Denoising Autoencoder (Pembersihan Noise)
            <a href="{videoBaseUrl}&t=18m55s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 18:55
            </a>
        </h3>
        <p>
            Variasi menarik: kali ini input dan output <em>tidak persis sama</em>. Kita menambahkan noise pada input, tetapi melatih model untuk merekonstruksi gambar <strong>asli yang bersih</strong>.
        </p>
        <ul>
            <li><strong>Cara Kerja:</strong> Tambahkan noise buatan ke gambar input (misalnya <em>salt-and-pepper noise</em> — piksel putih dan hitam acak yang ditaburkan seperti garam dan merica). Target output tetap gambar asli tanpa noise.</li>
            <li><strong>Hasil:</strong> Autoencoder belajar mengabaikan noise dan hanya merekonstruksi informasi esensial dari gambar.</li>
        </ul>

        <Callout type="warning" title="Dua Catatan Penting tentang Denoising">
            <ol>
                <li><strong>Ukuran bottleneck:</strong> Untuk denoising, kadang bottleneck justru harus <strong>lebih besar</strong> daripada autoencoder biasa. Jika model tidak bekerja, coba perbesar bottleneck dan struktur network secara keseluruhan.</li>
                <li><strong>Jenis noise harus cocok:</strong> Noise tidak sama dengan noise! Ada salt-and-pepper noise, Gaussian noise, pink noise, brown noise — masing-masing punya karakteristik berbeda. Denoising autoencoder yang dilatih dengan salt-and-pepper noise <strong>tidak akan bekerja</strong> untuk Gaussian noise. Pastikan noise saat training mirip dengan noise yang akan ditemui di dunia nyata.</li>
            </ol>
        </Callout>

        <h3>
            3. Pre-training dan Transfer Learning (Semi-supervised)
            <a href="{videoBaseUrl}&t=20m37s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 20:37
            </a>
        </h3>
        <p>
            Ini adalah bagian favorit dari presentasi — teknik yang <strong>benar-benar menghemat uang</strong> di industri nyata.
        </p>
        <p>
            <strong>Skenario:</strong> Bayangkan kita memiliki 60.000 gambar MNIST yang labelnya sudah dibuang. Kita tidak punya koneksi internet, tidak ada cara untuk melabeli ulang. Tapi kita bisa secara acak mengambil dan melabeli sekitar 1.000 gambar saja.
        </p>
        <p><strong>Langkah-langkah:</strong></p>
        <ol>
            <li><strong>Pre-training (Unsupervised):</strong> Latih autoencoder pada seluruh 60.000 data tanpa label seperti biasa. Biarkan model belajar merekonstruksi data.</li>
            <li><strong>Potong jaringan:</strong> Buang bagian Decoder. Sisakan hanya Encoder + Bottleneck.</li>
            <li><strong>Tempel classifier:</strong> Tempelkan layer klasifikasi linear sederhana di ujung bottleneck.</li>
            <li><strong>Transfer Training (Supervised):</strong> Latih jaringan gabungan ini menggunakan 1.000 data berlabel yang kita miliki.</li>
        </ol>
        <p>
            Teknik ini kadang disebut <strong>semi-supervised learning</strong> (bagian pertama unsupervised, bagian kedua supervised). Bagian pertama disebut <em>pre-training</em>, bagian kedua disebut <em>transfer training</em>.
        </p>
        <p>
            <strong>Mengapa ini bekerja?</strong> Karena Encoder sudah belajar mengekstrak informasi penting dari data asli dan mengompresnya menjadi representasi berdimensi rendah. Jika inputnya sudah terproses dan informasinya sudah diekstrak, kita butuh jauh <strong>lebih sedikit label</strong>. Layer terakhir seringkali hanya berupa linear classifier sederhana.
        </p>
        <p>
            <strong>Trade-off:</strong> Kita harus melakukan dua kali training dan ini lebih sulit. Jika sudah punya banyak data berlabel, gunakan saja supervised biasa. Tapi jika data berlabel sangat terbatas, teknik ini bisa mengurangi kebutuhan data berlabel hingga <strong>satu orde magnitudo</strong> (10× lebih sedikit) atau lebih.
        </p>

        <Callout type="info" title="Studi Kasus Nyata: BERT di Perusahaan Divisio">
            <div style="margin-bottom: 0.75rem;">
                <a href="{videoBaseUrl}&t=23m35s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                    <Play size={10} /> 23:35 BERT & Divisio Case Study
                </a>
            </div>
            <p>
                <strong>BERT</strong> (Bidirectional Encoder Representations from Transformers) — meskipun jarang orang menganggapnya sebagai autoencoder, secara teknis BERT adalah sebuah <strong>denoising autoencoder</strong> dengan arsitektur yang jauh lebih kompleks.
            </p>
            <p>
                BERT melakukan pre-training pada seluruh teks Wikipedia selama <strong>4 hingga 16 hari</strong> tanpa label manual apa pun — hanya membaca teks Wikipedia mentah.
            </p>
            <p>
                <strong>Kasus Divisio:</strong> Perusahaan AI kecil dari Cologne ini membutuhkan <em>Part-of-Speech (POS) tagger</em> kustom (sistem yang menandai subjek, objek, kata sifat, kata benda dalam kalimat). Normalnya, POS tagger membutuhkan minimal <strong>10.000 hingga 200.000 kalimat berlabel</strong>. Sebagai perusahaan kecil, mereka tidak mampu membayar 50 mahasiswa selama 4 bulan untuk melabeli data.
            </p>
            <p>
                Solusinya: dua orang (Christoph dan koleganya) melabeli kalimat selama satu minggu, menghasilkan <strong>1.000 kalimat</strong>. Kadang mereka berdebat selama 5 menit tentang satu kalimat saja karena tata bahasanya benar-benar rumit. Mereka menggabungkan 1.000 kalimat ini dengan BERT:
            </p>
            <ul>
                <li>Setelah hanya <strong>128 kalimat</strong> → performa sudah <strong>mendekati kemampuan manusia</strong>.</li>
                <li>Setelah <strong>800 kalimat</strong> (dari split 800 training / 200 validasi) → performa <strong>setara manusia</strong>.</li>
            </ul>
            <p>
                Alih-alih membutuhkan 100.000 kalimat, mereka cukup 1.000 kalimat. Bagi perusahaan kecil, ini seperti <strong>menemukan emas</strong>.
            </p>
        </Callout>

        <h3>
            4. Similarity Detection (Deteksi Kemiripan)
            <a href="{videoBaseUrl}&t=26m51s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 26:51
            </a>
        </h3>
        <p>
            Kali ini kita melatih autoencoder seperti biasa, lalu <strong>membuang Decoder</strong> dan <strong>tidak menempelkan apa pun</strong>. Lebih sederhana daripada transfer training.
        </p>
        <p>
            Kita cukup memasukkan data ke dalam Encoder dan mengambil output dari bottleneck. Output ini memiliki banyak nama: <em>feature vector</em>, <em>latent vector</em>, atau <em>embedding vector</em> — tergantung konteks penggunaannya.
        </p>
        <p>
            Sekarang kita punya dua vektor berdimensi rendah. Satu-satunya bagian matematika di seluruh materi ini: cukup <strong>hitung jarak (distance)</strong> antara dua vektor tersebut. Ada banyak cara menghitung jarak (Euclidean, Cosine, dll.) — pilihan tergantung use case, beberapa bekerja lebih baik daripada yang lain.
        </p>
        <p>
            Manusia sangat mahir mengenali kemiripan — kita bisa langsung bilang "dua botol ini kira-kira sama, hanya tutupnya yang berbeda." Tapi perbandingan piksel biasa akan <strong>langsung hancur</strong> jika gambar bergeser satu piksel saja. Dengan embedding vector dari autoencoder, kita mendapatkan perbandingan <em>fuzzy</em> yang jauh lebih robust.
        </p>

        <Callout type="info">
            Tahukah Anda? Begitulah cara chatbot mencocokan <em>intent</em> pengguna. Mereka menggunakan embedding vector dan menghitung jarak antar-vektor untuk menentukan apakah kalimat pengguna cocok dengan intent tertentu.
        </Callout>

        <h3>
            5. Generative Autoencoder dan Latent Space Exploration
            <a href="{videoBaseUrl}&t=29m12s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={10} /> 29:12
            </a>
        </h3>
        <p>
            Kali ini kita melakukan kebalikannya: <strong>buang Encoder</strong>, sisakan hanya Decoder. Lucu — setiap kali kita membuang sesuatu dari autoencoder, justru semakin berguna!
        </p>
        <p>
            Decoder telah belajar merekonstruksi input berdasarkan latent vector. Jika kita memberikan <strong>vektor buatan baru</strong> ke Decoder, ia akan menghasilkan data baru. Masukkan vektor yang tepat, dan tiba-tiba Decoder akan menghasilkan gambar angka 7 yang realistis.
        </p>
    </NoteSection>

    <NoteSection title="Intrinsic Space dan Dimension">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=30m17s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 30:17 Intrinsic Dimension
            </a>
            <a href="{videoBaseUrl}&t=32m15s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 32:15 Pac-Man Intrinsic Space
            </a>
            <a href="{videoBaseUrl}&t=34m50s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 34:50 Ideal Bottleneck
            </a>
        </div>
        <p>
            Konsep ini terdengar sangat <em>science fiction</em>, tapi sebenarnya jauh lebih sederhana dari yang dibayangkan.
        </p>
        <p>
            <strong>Intrinsic dimension</strong> adalah kompleksitas <em>sebenarnya</em> dari data Anda. Dataset MNIST secara teknis memiliki dimensi 784 (satu per piksel), tapi kenyataannya jauh lebih sederhana — kita hanya memiliki 10 jenis digit dengan beberapa variasi gaya penulisan. Dimensi intrinsik sebenarnya mungkin hanya sekitar <strong>20 dimensi</strong>.
        </p>
        <p>
            Mengapa ini penting? Jika kita tahu seberapa kompleks masalah kita sebenarnya, kita bisa mendesain sistem yang lebih baik: model yang terlalu besar akan cenderung <strong>overfit</strong>, model yang terlalu kecil tidak akan mampu menyelesaikan tugas. Autoencoder yang sempurna adalah yang bottleneck-nya persis seukuran intrinsic space.
        </p>

        <h3>Contoh: Intrinsic Space Game Pac-man</h3>
        <p>
            Layar Pac-man memiliki sekitar <strong>50.000 piksel</strong> (dimensi nominal). Tapi mari kita hitung informasi <em>sebenarnya</em> yang ada di layar:
        </p>
        <ul>
            <li><strong>Jumlah nyawa</strong> — 1 dimensi (satu angka).</li>
            <li><strong>Skor</strong> — 1 dimensi.</li>
            <li><strong>High score</strong> — 1 dimensi.</li>
            <li><strong>Level saat ini</strong> — 1 dimensi. Dan karena Pac-man adalah game terbatas (hanya ~255 level) dan bentuk maze tidak pernah berubah, maka <strong>bentuk maze juga hanya 1 dimensi!</strong> Autoencoder yang baik akan menyimpan pola semua maze, dan cukup 1 angka untuk memilih maze yang benar.</li>
            <li><strong>Status pil</strong> — ~250 dimensi (ada sekitar 250 pil, masing-masing bisa sudah dimakan atau belum).</li>
            <li><strong>Posisi 4 hantu</strong> — 8 dimensi (X dan Y untuk setiap hantu).</li>
            <li><strong>Posisi Pac-man</strong> — 2 dimensi.</li>
            <li><strong>State hantu</strong> — 4 dimensi (setiap hantu bisa dalam mode mengejar, bisa dimakan, dll.).</li>
            <li><strong>State Pac-man</strong> — 1 dimensi (hidup, sebelum game dimulai, dll.).</li>
            <li><strong>State permainan</strong> — 1 dimensi (running, ready, start screen, high score screen).</li>
            <li><strong>Hal-hal yang mungkin terlupakan</strong> — ~20 dimensi lagi.</li>
        </ul>
        <p>
            Total: <strong>kurang dari 500 dimensi</strong> — hanya <strong>1%</strong> dari dimensi nominal 50.000 piksel! Bottleneck Pac-man yang ideal hanya perlu 500 neuron.
        </p>

        <Callout type="tip" title="Bottleneck Ideal = Neuron yang Bermakna">
            Dalam autoencoder yang sempurna, setiap neuron di bottleneck akan <strong>merepresentasikan informasi yang bermakna</strong>. Kita bisa "membaca" state permainan langsung dari neuron-neuron bottleneck. Normalnya neural network adalah "black box" — kita tidak tahu apa yang dilakukan setiap neuron. Tapi pada autoencoder ideal, setiap neuron bottleneck menceritakan sesuatu yang berguna.
        </Callout>
    </NoteSection>

    <NoteSection title="Implementasi Sederhana dengan PyTorch">
        <p>
            Berikut adalah contoh struktur dasar Autoencoder linear sederhana menggunakan PyTorch untuk mengompresi gambar MNIST (28 × 28 = 784 piksel) menjadi representasi laten berukuran 32 dimensi:
        </p>

        <CodeBlock
            language="python"
            code={`import torch
import torch.nn as nn

class Autoencoder(nn.Module):
    def __init__(self):
        super(Autoencoder, self).__init__()
        
        # Encoder: Kompresi 784 dimensi -> 32 dimensi
        self.encoder = nn.Sequential(
            nn.Linear(28 * 28, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 32)      # Bottleneck
        )
        
        # Decoder: Rekonstruksi 32 dimensi -> 784 dimensi
        self.decoder = nn.Sequential(
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, 28 * 28),
            nn.Sigmoid()           # Output pixel dibatasi antara 0 dan 1
        )

    def forward(self, x):
        # x memiliki bentuk [batch_size, 784]
        latent = self.encoder(x)
        reconstructed = self.decoder(latent)
        return reconstructed

# Inisialisasi Model, Loss Function, dan Optimizer
model = Autoencoder()
criterion = nn.MSELoss() # Menggunakan Mean Squared Error untuk Reconstruction Loss
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
`}
        />
    </NoteSection>

    <NoteSection title="Realita di Dunia Nyata: Fitur yang Tersebar">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=35m46s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 35:46 Realita Penyebaran Fitur
            </a>
        </div>
        <p>
            Dalam contoh ideal (seperti analogi game Pac-man), kita membayangkan setiap neuron di bottleneck merepresentasikan satu informasi spesifik yang bermakna (misalnya neuron ke-1 = sisa nyawa, neuron ke-5 = posisi X Pac-man). Namun di dunia nyata, <strong>hal ini hampir tidak pernah terjadi</strong>.
        </p>
        <p>
            Yang sebenarnya terjadi adalah informasi setiap fitur <strong>tersebar (smeared) ke banyak neuron sekaligus</strong>. Neuron ke-1 mungkin menyimpan sedikit informasi tentang nyawa, sedikit tentang skor, dan sedikit tentang posisi hantu. Autoencoder klasik akan memanfaatkan semua neuron yang tersedia semaksimal mungkin — sangat sulit untuk menentukan neuron mana yang tidak berguna.
        </p>

        <Callout type="info" title="Strategi Praktis: Iterative Reduction">
            Pendekatan praktis untuk menemukan ukuran bottleneck yang tepat adalah dengan melakukan <strong>pengurangan bertahap</strong>: mulai dari bottleneck yang besar, perkecil secara bertahap, dan amati kapan performa rekonstruksi mulai menurun drastis. Mundur satu langkah, dan itulah titik optimal Anda.
        </Callout>
        <p>
            Masalah fitur yang tersebar inilah yang menjadi salah satu motivasi utama dikembangkannya <strong>Variational Autoencoder (VAE)</strong>, yang secara elegan memaksa fitur-fitur untuk lebih terpisah satu sama lain.
        </p>
    </NoteSection>

    <NoteSection title="Variational Autoencoder (VAE)">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=37m11s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 37:11 Konsep VAE
            </a>
            <a href="{videoBaseUrl}&t=41m4s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 41:04 Kelebihan VAE
            </a>
            <a href="{videoBaseUrl}&t=43m5s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 43:05 Demo Interaktif Latent Space
            </a>
        </div>
        <p>
            Pada Autoencoder klasik, ruang laten (latent space) seringkali tidak beraturan dan tidak mulus. Ada wilayah-wilayah kosong — jika kita memasukkan vektor dari wilayah tersebut, Decoder akan menghasilkan output yang rusak dan tidak masuk akal. Ini terjadi karena autoencoder klasik hanya meminimalkan <em>reconstruction loss</em>.
        </p>
        <p>
            <strong>Variational Autoencoder (VAE)</strong> menambahkan <strong>loss term kedua</strong> pada training: tidak hanya menghukum rekonstruksi yang buruk, tapi juga menghukum <strong>encoding yang buruk</strong>. Loss term kedua ini adalah <strong>KL Divergence</strong> yang mengukur kualitas konfigurasi bottleneck.
        </p>

        <h3>Bagaimana VAE Bekerja Secara Internal</h3>
        <p>
            Perbedaan kunci: VAE tidak menghasilkan satu latent vector deterministik. Sebaliknya, Encoder menghasilkan <strong>distribusi probabilitas</strong> — yaitu sepasang nilai <em>Mean</em> (μ) dan <em>Variance</em> (σ) untuk setiap dimensi bottleneck.
        </p>
        <p>
            Jadi alih-alih berkata "neuron ke-5 bernilai 0.5", VAE berkata "neuron ke-5 <em>rata-rata</em> bernilai 0.5, tapi saya tidak terlalu yakin — bisa jadi sedikit lebih tinggi atau rendah."
        </p>
        <p>
            Yang sangat tidak biasa untuk neural network: di dalam VAE terdapat <strong>random number generator</strong>! Decoder menerima input dengan cara melakukan <em>sampling</em> satu vektor laten dari distribusi yang dibuat oleh Encoder. Setiap kali forward pass, vektor yang di-sample sedikit berbeda.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="background: var(--color-status-neutral-soft); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--color-ink-muted);">
                <strong>Autoencoder Klasik:</strong><br>
                Encoder → menghasilkan 1 titik pasti di ruang laten (deterministik). Batas antar-region tajam dan tidak beraturan. Wilayah kosong menghasilkan output rusak.
            </div>
            <div style="background: var(--color-status-success-soft); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--color-status-done-start);">
                <strong>Variational Autoencoder (VAE):</strong><br>
                Encoder → menghasilkan distribusi probabilitas (μ dan σ). Decoder melakukan <em>sampling</em> acak. Batas menjadi fuzzy, ruang laten menjadi mulus tanpa celah kosong.
            </div>
        </div>

        <h3>Mengapa Sampling Membuat Segalanya Lebih Baik</h3>
        <p>
            Karena Decoder tidak pernah bisa yakin vektor apa yang akan diterimanya (karena di-sample secara acak), Encoder dipaksa untuk mengatur ruang laten menjadi <strong>permukaan yang mulus (smooth surface)</strong>. Fitur-fitur yang berbeda dipaksa untuk <strong>berjauhan satu sama lain</strong> dalam ruang laten, karena batas-batasnya yang fuzzy mendorong pemisahan fitur.
        </p>

        <Callout type="warning" title="3 Kelebihan Utama VAE">
            <ol>
                <li>
                    <strong>Ruang Laten Mulus (Smooth Latent Space):</strong> Kita bisa menggeser nilai vektor laten secara mulus dan melihat gambar bertransformasi secara halus. Misalnya, dengan menggeser satu slider, kita bisa melihat transisi mulus dari angka 0 perlahan berubah menjadi angka 9.
                </li>
                <li>
                    <strong>Fitur Terpisah (Disentangled Features):</strong> Setiap neuron bottleneck cenderung mempelajari fitur spesifik yang terpisah. Satu neuron mungkin mengontrol ketebalan garis, neuron lain mengontrol kelengkungan bagian atas digit, neuron lain lagi mengontrol ada/tidaknya garis horizontal.
                </li>
                <li>
                    <strong>Automatic Pruning (Dead Neurons):</strong> Jika bottleneck memiliki lebih banyak neuron daripada yang dibutuhkan (misal 32 neuron tapi data hanya butuh 20), VAE akan secara cerdas <strong>mendiamkan</strong> neuron yang tidak diperlukan — neuron tersebut menjadi <em>dead neurons</em> yang tidak menghasilkan output apapun saat digerakkan. Ini sangat berguna untuk menentukan dimensi intrinsik masalah tanpa trial-and-error!
                </li>
            </ol>
        </Callout>

        <h3>Demo Interaktif: Menjelajahi Latent Space MNIST</h3>
        <p>
            Dalam presentasi, Christoph mendemonstrasikan sebuah aplikasi interaktif yang menggunakan VAE pre-trained untuk menghasilkan gambar MNIST. Aplikasi ini memiliki <strong>32 slider</strong> — masing-masing mengontrol satu neuron bottleneck. Dengan menggeser slider, kita bisa mengeksplorasi latent space secara langsung:
        </p>
        <ul>
            <li>Dari titik acak, ia menemukan sebuah angka <strong>0</strong> yang cukup bagus — "semua orang setuju ini adalah angka nol."</li>
            <li>Dengan menggeser satu slider tertentu, angka 0 <strong>perlahan berubah menjadi angka 9</strong>. Ini menunjukkan bahwa dalam latent space, angka 0 dan 9 berada cukup dekat di dimensi tersebut.</li>
            <li>Slider lain membuat garis di bagian atas dan bawah — berguna jika ingin membangun angka 7.</li>
            <li>Ada slider yang <strong>sama sekali tidak berpengaruh</strong> — menggerakkannya ke kiri atau kanan tidak mengubah gambar. Ini adalah <strong>dead neuron</strong> yang tidak digunakan VAE.</li>
            <li>Slider lain mengontrol kelengkungan loop kanan atas pada angka 9.</li>
        </ul>
        <p>
            Setelah beberapa menit eksplorasi, ia menemukan sekitar <strong>10 dead neurons</strong> dari total 32. Karena 32 - 10 = 22, ini mengkonfirmasi bahwa <strong>dimensi intrinsik MNIST adalah sekitar 20</strong> — persis seperti estimasi teoretis! Dengan cara ini kita bisa menentukan dimensi intrinsik suatu masalah cukup dengan mengamati VAE.
        </p>
    </NoteSection>

    <NoteSection title="Pengalaman di Dunia Nyata: Brain Beats Brawn">
        <div class="section-meta-timestamps">
            <span class="meta-label">Materi Video:</span>
            <a href="{videoBaseUrl}&t=46m48s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 46:48 Pengalaman DIVISIO
            </a>
            <a href="{videoBaseUrl}&t=48m35s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                <Play size={12} /> 48:35 Ringkasan & Penutup
            </a>
        </div>
        <p>
            Berdasarkan pengalaman Christoph Henkelmann dan timnya di perusahaan AI Divisio, berikut rangkuman pengalaman menggunakan unsupervised learning di industri:
        </p>
        <ul>
            <li><strong>Brain beats brawn (Otak mengalahkan otot):</strong> Alih-alih terus melempar lebih banyak data berlabel ke masalah, teknik yang lebih cerdas menggunakan autoencoder membantu memahami masalah lebih dalam.</li>
            <li><strong>Perusahaan kecil bisa bersaing:</strong> Teknik ini memungkinkan perusahaan kecil melakukan hal-hal yang biasanya hanya mampu dilakukan perusahaan besar seperti Google. "Saya tidak bisa mengirim mobil self-driving berkeliling Jerman — saya tidak punya waktu, uang, atau sumber daya. Tapi dengan teknik ini, kami bisa melakukan hal-hal yang biasanya di luar jangkauan kami."</li>
            <li><strong>Proteksi data:</strong> Jika kita tidak memiliki data personal, kita tidak bisa membocorkannya. Data yang tidak ada tidak bisa disalahgunakan.</li>
            <li><strong>Data menjadi lebih murah, hasil menjadi lebih baik.</strong></li>
        </ul>

        <Callout type="danger" title="Peringatan: No Free Lunch">
            Namun satu hal yang harus diingat: unsupervised learning <strong>lebih sulit</strong> daripada supervised training. Modelnya lebih <em>fickle</em> (rewel/sensitif), lebih sulit menemukan konfigurasi parameter yang tepat. Classifier supervised sederhana yang sudah dibangun ribuan kali dan konfigurasinya sudah diketahui bekerja, <strong>jauh lebih mudah</strong> dibandingkan menemukan autoencoder yang tepat untuk masalah yang belum pernah dipecahkan sebelumnya. Tidak ada makan siang gratis!
        </Callout>
    </NoteSection>

    <NoteSection title="Glosarium Istilah Utama">
        <p>
            Berikut adalah glosarium istilah-istilah penting yang dibahas dalam kuliah Autoencoders dan Unsupervised Learning ini untuk mempermudah <em>quick-review</em> Anda sebelum kuis maupun ujian:
        </p>

        <div class="glossary-container">
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Neural Network (Jaringan Saraf Tiruan)</span>
                    <span class="baby-trigger" data-tooltip="👶 Kayak otak mainan dari balok-balok yang saling bisik-bisik biar bisa nebak gambar kucing!"><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Model komputasi yang terinspirasi dari struktur jaringan saraf biologis otak manusia, terdiri dari lapisan neuron yang saling terhubung untuk memproses informasi dan mempelajari pola data yang kompleks melalui penyesuaian bobot (weights).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Laten (Latent / Tersembunyi)</span>
                    <span class="baby-trigger" data-tooltip="👶 Sifat rahasia atau kekuatan super yang tersembunyi di dalam mainan, nggak keliatan langsung tapi bikin mainan itu seru!"><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Karakteristik atau informasi tersembunyi yang tidak terlihat secara langsung pada permukaan data asli, namun menjadi struktur atau pola dasar utama yang membentuk data tersebut.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Dimensi (Dimension)</span>
                    <span class="baby-trigger" data-tooltip="👶 Jumlah pertanyaan/tombol yang kamu butuhin buat ngejelasin bentuk mainanmu ke temen lewat telepon."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Dalam konteks data, dimensi merujuk pada jumlah fitur, variabel bebas, atau koordinat independen yang mendeskripsikan satu titik sampel data (misalnya: citra 28 × 28 piksel memiliki 784 dimensi).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Unsupervised Learning</span>
                    <span class="baby-trigger" data-tooltip="👶 Mainan lego yang diberesin sendiri sama anak kecil tanpa disuruh atau diajarin sama Papa Mama."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Pembelajaran mesin tanpa label atau pengawasan eksternal, di mana model belajar mencari pola dan struktur intrinsik sendiri secara mandiri dari data mentah.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Autoencoder</span>
                    <span class="baby-trigger" data-tooltip="👶 Mesin fotokopi ajaib yang ngecilin gambar jadi rahasia kecil, terus digedein lagi biar sama kayak aslinya!"><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Arsitektur jaringan saraf tiruan (neural network) unsupervised yang melatih model agar outputnya merekonstruksi inputnya sendiri melewati bottleneck dimensi rendah.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Bottleneck (Leher Botol)</span>
                    <span class="baby-trigger" data-tooltip="👶 Lubang sedotan sempit banget! Semua mainan dipaksa masuk situ, jadi cuma mainan paling penting yang bisa lolos."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Lapisan (layer) terdalam di tengah arsitektur Autoencoder dengan jumlah neuron terkecil, bertugas memaksa jaringan mengompresi informasi dan membuang detail noise yang tidak penting.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Encoder (Pengode)</span>
                    <span class="baby-trigger" data-tooltip="👶 Anak pinter yang jago ngringkes cerita dongeng tebel jadi satu kalimat rahasia."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Bagian dari Autoencoder yang bertugas memetakan dan mengompresi input dimensi tinggi menjadi representasi fitur dimensi rendah di area bottleneck.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Decoder (Penafsir Sandi)</span>
                    <span class="baby-trigger" data-tooltip="👶 Tukang sulap yang dikasih kalimat rahasia terus bisa bikin boneka/gambar utuh lagi dari kalimat itu."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Bagian dari Autoencoder yang menerima representasi laten berdimensi rendah dari bottleneck dan mengonversinya kembali menjadi dimensi spatial asli.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Reconstruction Error</span>
                    <span class="baby-trigger" data-tooltip="👶 Nilai beda antara mainan asli sama mainan tiruan buatan mesin. Makin kecil nilainya, makin hebat mesinnya!"><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Ukuran tingkat perbedaan atau kesalahan antara input asli dengan output hasil rekonstruksi decoder, biasanya dihitung dengan L2 Loss (Mean Squared Error).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Denoising Autoencoder</span>
                    <span class="baby-trigger" data-tooltip="👶 Kacamata ajaib yang bisa ngeliat mainan bersih padahal mainannya ketutupan lumpur kotor."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Variasi Autoencoder yang sengaja diberikan input kotor (noise buatan) saat training, namun decoder dituntut merekonstruksi gambar asli yang bersih dari noise tersebut.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Overcomplete Autoencoder</span>
                    <span class="baby-trigger" data-tooltip="👶 Kantong mainan yang ukurannya sengaja dibikin lebih gede dari mainannya biar bisa muat aksesoris tambahan buat bersihin kotoran."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Jenis Autoencoder di mana jumlah neuron pada bottleneck lebih besar daripada dimensi input, berguna untuk mengekstrak fitur yang sangat kaya (seperti pada tugas denoising).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Salt-and-Pepper Noise (Derau Garam-Merica)</span>
                    <span class="baby-trigger" data-tooltip="👶 Taburan bintik-bintik cokelat kotor dan butiran gula putih acak yang bikin fotomu jadi belepotan."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Jenis distorsi gambar berupa piksel hitam (pepper) dan putih (salt) acak yang menutupi gambar asli, sering digunakan untuk melatih Denoising Autoencoder.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Pre-training</span>
                    <span class="baby-trigger" data-tooltip="👶 Belajar kenalan dulu sama banyak mainan baru biar pinter, sebelum diajarin cara main satu game khusus."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Fase pelatihan awal jaringan saraf tiruan pada dataset tidak berlabel berskala besar untuk membangun pemahaman pola awal sebelum diarahkan ke domain spesifik.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Transfer Learning</span>
                    <span class="baby-trigger" data-tooltip="👶 Anak yang udah jago main sepeda roda tiga, jadi cepet banget belajar naik sepeda roda dua karena udah tahu cara gowes."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Teknik memindahkan parameter/bobot terlatih dari suatu model ke domain tugas baru yang berlabel sedikit demi memangkas kebutuhan anotasi manual secara signifikan.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Intrinsic Space / Dimension</span>
                    <span class="baby-trigger" data-tooltip="👶 Isi tas mainan yang bener-bener kamu butuhin buat main di luar, bukan kardus pembungkusnya yang bikin berat."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Jumlah parameter independen atau derajat kebebasan minimum yang sebenarnya dibutuhkan secara mutlak untuk merepresentasikan semua variabilitas penting pada data.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Variational Autoencoder (VAE)</span>
                    <span class="baby-trigger" data-tooltip="👶 Mesin gambar yang nggak cuma niru, tapi bisa gambar macem-macem kelinci lucu dari imajinasinya sendiri."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Pengembangan Autoencoder yang memetakan input menjadi parameter distribusi probabilitas (mean &amp; variance), kemudian menyematkan random sampling untuk menghasilkan ruang laten kontinu.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">KL Divergence (Kullback-Leibler)</span>
                    <span class="baby-trigger" data-tooltip="👶 Pak Polisi yang ngingetin biar semua mainan ditata rapi di kotak mainan, nggak boleh berantakan ke mana-mana."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Loss term tambahan pada VAE yang bertindak sebagai regularisasi untuk mengukur kemiripan antara distribusi laten bentukan encoder dengan distribusi standar (Gaussian).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Disentangled Features</span>
                    <span class="baby-trigger" data-tooltip="👶 Kotak pilah mainan: laci khusus roda, laci khusus warna, biar kalau mau ganti roda nggak perlu ngebongkar seluruh mobil-mobilan."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Karakteristik di mana setiap dimensi atau neuron di area bottleneck mewakili tepat satu fitur fisik/semantik yang terpisah secara independen (misal: ketebalan garis saja).</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Automatic Pruning</span>
                    <span class="baby-trigger" data-tooltip="👶 Kabel mainan yang nggak kepake otomatis copot sendiri biar mainannya nggak keberatan."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Fenomena otomatis pada VAE di mana dimensi laten yang berlebih (tidak dibutuhkan oleh data) dinonaktifkan (dead neurons), membantu memetakan dimensi intrinsik asli data secara presisi.</span>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kuis Kilat">
        <Quiz questions={quizQuestions} title="Uji Pemahaman Autoencoders" />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="Ex0nhOPzLIs" {chapters} />

<style>
    /* Styling tambahan untuk visual konsep */
    .visual-concept-card small {
        display: block;
        color: var(--color-ink-muted);
        margin-top: 0.25rem;
    }
    
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
        background: #fff9c4; /* soft pastel baby yellow */
        color: #5d4037; /* warm cozy brown text for perfect readability */
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
        transition: opacity 0.2s, transform 0.2s;
        z-index: 100;
        line-height: 1.4;
        text-align: left;
    }
    
    .baby-trigger:hover::after {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
    
    /* Cute little popover speech bubble arrow pointing downwards */
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

    /* Video Timestamp Badges & Containers */
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

    h3 .timestamp-badge {
        margin-left: 0.5rem;
        font-size: 0.7rem;
    }
</style>
