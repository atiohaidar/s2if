<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import VideoSidebar from "$lib/components/VideoSidebar.svelte";
    import VideoSyncArticle from "$lib/components/VideoSyncArticle.svelte";
    import { Play } from "lucide-svelte";

    const videoBaseUrl = "https://www.youtube.com/watch?v=TpMIssRdhco";

    let videoSidebar: VideoSidebar;

    // Chapter timeline (muncul di sidebar)
    const chapters = [
        { title: 'Intro', time: '0:01', seconds: 1 },
        { title: 'Supervised Learning', time: '0:16', seconds: 16 },
        { title: 'Unsupervised & GAN Submodels', time: '1:10', seconds: 70 },
        { title: 'Example: Flower Generation', time: '3:14', seconds: 194 },
        { title: 'Zero-Sum Game', time: '5:01', seconds: 301 },
        { title: 'Applications', time: '6:09', seconds: 369 },
        { title: 'Conclusion', time: '8:00', seconds: 480 }
    ];

    // Pemetaan section catatan ke rentang waktu video
    const sectionMap = [
        { id: 'pendahuluan', startSeconds: 1, endSeconds: 69 },
        { id: 'konsep-gans', startSeconds: 70, endSeconds: 193 },
        { id: 'alur-kerja-dan-contoh', startSeconds: 194, endSeconds: 300 },
        { id: 'zero-sum-game', startSeconds: 301, endSeconds: 368 },
        { id: 'aplikasi-dan-limitasi', startSeconds: 369, endSeconds: 493 }
    ];

    /**
     * Event delegation: intercept clicks on any .timestamp-badge link,
     * parse the YouTube ?t= parameter, dan seek player inline secara dinamis.
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
            question: "Apa peran utama Generator dalam arsitektur Generative Adversarial Network (GAN)?",
            options: [
                "Mengklasifikasikan apakah data input merupakan data riil atau data buatan.",
                "Membuat data sintetis (fake samples) dari random input vector (noise) agar mirip dengan data riil.",
                "Melatih Discriminator agar memiliki parameter weight yang optimal.",
                "Menghitung reconstruction loss dari dataset latih secara unsupervised."
            ],
            correctIndex: 1,
            explanation: "Generator bertugas memetakan input acak (noise vector) menjadi sampel data baru (misalnya gambar bunga) yang sangat mirip dengan data riil dari domain asli agar bisa mengelabui Discriminator."
        },
        {
            question: "Bagaimana dinamika 'Zero-Sum Game' bekerja saat melatih sebuah GAN?",
            options: [
                "Kedua model (Generator dan Discriminator) diperbarui secara bersamaan dengan besaran gradient yang sama.",
                "Salah satu model selalu menang dan model yang kalah harus memperbarui parameter weight-nya untuk meminimalkan error-nya sendiri.",
                "Kedua model tidak mengalami perubahan weight apabila Discriminator berhasil mengenali fake sample sebesar 50%.",
                "Loss value dari kedua model dijumlahkan dan hasilnya harus selalu bernilai 1.0."
            ],
            correctIndex: 1,
            explanation: "GAN bekerja seperti zero-sum game di mana ada pemenang dan pecundang di setiap iterasi. Pihak yang menang tidak berubah modelnya, sedangkan pihak yang kalah (misal Discriminator gagal mendeteksi fake, atau Generator gagal mengelabui) harus memperbarui weight modelnya agar menjadi lebih pintar di siklus berikutnya."
        },
        {
            question: "Pada implementasi GAN untuk pemrosesan gambar, arsitektur neural network apa yang paling sering digunakan untuk Generator dan Discriminator?",
            options: [
                "RNN (Recurrent Neural Networks)",
                "Transformer Networks",
                "CNN (Convolutional Neural Networks)",
                "Perceptron Satu Layer Klasik"
            ],
            correctIndex: 2,
            explanation: "Untuk memproses dan menghasilkan data gambar, Generator dan Discriminator paling sering diimplementasikan menggunakan Convolutional Neural Networks (CNN) karena keunggulannya dalam mengenali spatial pattern pada gambar."
        }
    ];
</script>

<svelte:head>
    <title>Generative Adversarial Networks (GANs) - S2IF Notebook</title>
    <meta name="description" content="Catatan kuliah komprehensif mengenai konsep dasar Generative Adversarial Networks (GANs), peran Generator & Discriminator, alur kerja training, serta dinamika zero-sum game." />
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article class="note-article" onclick={handleTimestampClick}>
    <NoteHeader
        title="Generative Adversarial Networks (GANs)"
        date="31 Mei 2026"
        status="done"
        tags={["Generative-AI", "GANs", "Unsupervised", "Deep-Learning"]}
    />

    <Callout type="info" title="Sumber Materi">
        Catatan ini disusun berdasarkan video penjelasan dari <strong>IBM Technology</strong> berjudul <em>"What are GANs (Generative Adversarial Networks)?"</em>. Video lengkap tersedia di: <a href="https://www.youtube.com/watch?v=TpMIssRdhco" target="_blank" rel="noopener noreferrer">YouTube — What are GANs (Generative Adversarial Networks)?</a>.
    </Callout>

    <VideoSyncArticle {sectionMap}>
        <div data-section-id="pendahuluan">
            <NoteSection title="Pendahuluan: Supervised vs Unsupervised Learning">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=0m1s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 0:01 Intro
                    </a>
                    <a href="{videoBaseUrl}&t=0m16s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 0:16 Supervised Learning
                    </a>
                </div>
                <p>
                    Sebagian besar model machine learning yang kita kenal menggunakan pendekatan <strong>Supervised Learning</strong>. 
                    Kita mulai dengan input training data berlabel, memasukkannya ke dalam model, membandingkan prediksi model dengan expected output, 
                    lahu memperbarui parameter model agar output-nya semakin presisi.
                </p>
                
                <p>
                    Tapi bagaimana jika data kita sama sekali tidak memiliki label? <em>Enter Unsupervised Learning.</em>
                </p>

                <p>
                    <strong>Generative Adversarial Networks (GANs)</strong> adalah terobosan luar biasa di ranah unsupervised learning. 
                    Hebatnya, GAN mampu <strong>mengawasi dirinya sendiri (self-supervising)</strong> tanpa bantuan label eksternal dari manusia!
                </p>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Q:</strong> "Bagaimana mungkin sebuah model melatih dirinya sendiri tanpa 'guru' (label)?"
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        <strong>A:</strong> "Simple. Dengan mengadu dua submodel internal yang saling bertanding! Satu berperan membuat barang palsu (Generator), dan satu lagi bertindak sebagai detektif (Discriminator)."
                    </p>
                </div>
            </NoteSection>
        </div>

        <div data-section-id="konsep-gans">
            <NoteSection title="Submodel GANs: Generator & Discriminator">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=1m10s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 1:10 Unsupervised & Submodels
                    </a>
                    <a href="{videoBaseUrl}&t=1m49s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 1:49 Generator & Discriminator Roles
                    </a>
                </div>
                <p>
                    Sebuah arsitektur GAN terdiri dari dua submodel utama yang bekerja secara paralel dan kompetitif:
                </p>

                <ul>
                    <li>
                        <strong>Generator Submodel:</strong> Bertugas menciptakan data tiruan/palsu (<em>fake samples</em>) dari random noise. 
                        Tujuan tertingginya adalah menghasilkan sampel yang sangat meyakinkan.
                    </li>
                    <li>
                        <strong>Discriminator Submodel:</strong> Bertugas memeriksa sampel data yang ia terima dan membedakan apakah sampel tersebut 
                        merupakan data asli dari domain pelatihan (<em>real sample</em>) atau data buatan Generator (<em>fake sample</em>).
                    </li>
                </ul>

                <p>
                    Di sinilah letak sifat <strong>adversarial (persaingan)</strong> tersebut. Kita memiliki pemalsu ulung yang terus memproduksi barang tiruan, 
                    dan detektif jeli yang terus mencoba menangkap kepalsuan tersebut.
                </p>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Konsep Persaingan GANs</h4>
                    <code style="font-size: 1.05rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-top: 0.5rem; color: var(--color-binder);">
                        Generator (Noise Input) ➔ [Fake Flower] ➔ Discriminator ➔ Real (1) / Fake (0)
                    </code>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Discriminator juga menerima [Real Flower] langsung dari domain asli sebagai pembanding.
                    </p>
                </div>
            </NoteSection>
        </div>

        <div data-section-id="alur-kerja-dan-contoh">
            <NoteSection title="Alur Kerja & Studi Kasus Pembuatan Bunga">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=3m14s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 3:14 Flower Example
                    </a>
                    <a href="{videoBaseUrl}&t=4m34s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 4:34 The Decision
                    </a>
                </div>
                <p>
                    Mari kita ambil contoh nyata bagaimana kita melatih GAN untuk memalsukan gambar <strong>bunga (flower)</strong>:
                </p>

                <ol>
                    <li>
                        <strong>Langkah 1 — Melatih Detektif (Discriminator):</strong><br>
                        Pertama-tama, kita melatih Discriminator untuk mengenali seperti apa rupa bunga asli. Kita menyuapinya dengan ribuan foto bunga 
                        dari domain latih. Discriminator akan menganalisis atribut visualnya: warna, bayangan (shading), bentuk kelopak, dsb. Kita juga memasukkan 
                        gambar-gambar acak yang bukan bunga agar ia tahu apa yang *bukan* bunga. Di fase ini, Generator dibekukan (<em>frozen</em>).
                    </li>
                    <li>
                        <strong>Langkah 2 — Generator Beraksi:</strong><br>
                        Setelah Discriminator cukup jeli mengenali bunga, Generator yang tadinya beku mulai diaktifkan. Generator mengambil sebuah 
                        <strong>random input vector (noise)</strong> dan menggunakannya untuk menghasilkan gambar bunga palsu pertamanya.
                    </li>
                    <li>
                        <strong>Langkah 3 — Keputusan Utama:</strong><br>
                        Gambar bunga tiruan tersebut dikirim ke Discriminator. Discriminator harus memutuskan: <em>apakah ini bunga asli dari domain, atau bunga palsu hasil buatan Generator?</em>
                    </li>
                </ol>

                <Callout type="warning" title="Pengungkapan Hasil">
                    Setelah keputusan dibuat, kebenaran diungkapkan kepada kedua submodel tersebut. Jawaban apakah bunga itu asli atau palsu akan menentukan 
                    bagaimana kedua submodel memperbarui diri mereka di fase berikutnya.
                </Callout>
            </NoteSection>
        </div>

        <div data-section-id="zero-sum-game">
            <NoteSection title="Dinamika Zero-Sum Game">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=5m01s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 5:01 Zero-Sum Game Dynamics
                    </a>
                </div>
                <p>
                    Dunia pelatihan GAN adalah sebuah <strong>zero-sum game</strong>. Selalu ada pemenang dan selalu ada pecundang. 
                    Tidak ada skenario sama-sama menang (win-win).
                </p>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Q:</strong> "Apa yang terjadi pada pemenang dan pecundang setelah hasil keputusan keluar?"
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        <strong>A:</strong> "Pihak yang menang berhak tersenyum puas tanpa mengubah modelnya sedikit pun. Sebaliknya, pihak yang kalah dipaksa memperbarui parameter modelnya agar tidak kalah lagi."
                    </p>
                </div>

                <h3>Dua Skenario Pelatihan:</h3>
                <ul>
                    <li>
                        <strong>Skenario A — Detektif Menang:</strong><br>
                        Discriminator sukses mendeteksi bahwa gambar dari Generator adalah palsu.
                        <ul>
                            <li><strong>Discriminator (Pemenang):</strong> Model tidak berubah sama sekali.</li>
                            <li><strong>Generator (Pecundang):</strong> Harus meng-update parameter modelnya agar bisa menciptakan tiruan bunga yang jauh lebih halus dan meyakinkan pada siklus berikutnya.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Skenario B — Pemalsu Menang:</strong><br>
                        Generator sukses menciptakan gambar bunga yang sangat realistis hingga menipu Discriminator.
                        <ul>
                            <li><strong>Generator (Pemenang):</strong> Model tidak berubah sama sekali.</li>
                            <li><strong>Discriminator (Pecundang):</strong> Harus meng-update parameter modelnya agar lebih jeli mendeteksi detail-detail kepalsuan kecil yang sebelumnya ia lewatkan.</li>
                        </ul>
                    </li>
                </ul>

                <p>
                    <strong>Bottom Line:</strong> Kita mengulangi siklus perseteruan ini ribuan kali. Proses iteratif ini terus berjalan hingga Generator menjadi 
                    sangat mahir membuat *forgery* tingkat tinggi yang membuat Discriminator (dan bahkan mata manusia) tidak lagi mampu membedakan mana bunga riil dan mana bunga sintetis.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="aplikasi-dan-limitasi">
            <NoteSection title="Implementasi CNN & Aplikasi Praktis">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=6m09s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 6:09 CNN Implementation
                    </a>
                    <a href="{videoBaseUrl}&t=6m40s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 6:40 Applications
                    </a>
                </div>
                <p>
                    Dalam implementasi nyata, terutama untuk pemrosesan data gambar, submodel Generator dan Discriminator biasanya dirancang menggunakan arsitektur 
                    <strong>Convolutional Neural Networks (CNNs)</strong>. CNN sangat terbukti andal dalam mendeteksi dan mengekstrak pattern spatial dari gambar.
                </p>

                <p>
                    Pemanfaatan GAN tidak hanya terbatas pada pembuatan foto bunga atau wajah palsu di internet. Kita bisa menerapkan konsep adversarial ini ke banyak use case canggih:
                </p>

                <div class="use-cases-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                    <div style="background: var(--color-surface-soft); border: 1px solid var(--color-line); padding: 1rem; border-radius: 6px;">
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--color-binder);">1. Video Frame Prediction</h4>
                        <p style="margin: 0; font-size: 0.9rem;">
                            Memasukkan frame video saat ini ke dalam GAN untuk memprediksi frame berikutnya secara instan. Sangat krusial untuk sistem surveillance/keamanan masa depan.
                        </p>
                    </div>
                    <div style="background: var(--color-surface-soft); border: 1px solid var(--color-line); padding: 1rem; border-radius: 6px;">
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--color-binder);">2. Image Enhancement</h4>
                        <p style="margin: 0; font-size: 0.9rem;">
                            Mengubah gambar dengan resolusi rendah menjadi resolusi tinggi (super-resolution) dengan menebak piksel-piksel yang hilang secara cerdas menggunakan kekuatan generatif GAN.
                        </p>
                    </div>
                    <div style="background: var(--color-surface-soft); border: 1px solid var(--color-line); padding: 1rem; border-radius: 6px;">
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--color-binder);">3. Secure Encryption</h4>
                        <p style="margin: 0; font-size: 0.9rem;">
                            Melatih sistem enkripsi/dekripsi secara adversarial untuk melahirkan algoritma pengamanan data super tangguh yang mustahil disadap dari luar.
                        </p>
                    </div>
                </div>
            </NoteSection>
        </div>
    </VideoSyncArticle>

    <NoteSection title="Uji Pemahaman: Kuis GANs">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Kecerdasan Buatan Lanjut" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="TpMIssRdhco" {chapters} />

<style>
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
