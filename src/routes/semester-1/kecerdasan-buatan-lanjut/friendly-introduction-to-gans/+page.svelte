<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import VideoSidebar from "$lib/components/VideoSidebar.svelte";
    import VideoSyncArticle from "$lib/components/VideoSyncArticle.svelte";
    import { Play } from "lucide-svelte";

    const videoBaseUrl = "https://www.youtube.com/watch?v=8L11aMN5KY8";

    let videoSidebar: VideoSidebar;

    // Chapter timeline (muncul di sidebar)
    const chapters = [
        { title: 'Intro & Analogi GANs', time: '0:03', seconds: 3 },
        { title: 'Slanted Land', time: '2:09', seconds: 129 },
        { title: 'Building the Discriminator', time: '4:03', seconds: 243 },
        { title: 'Sigmoid & Probabilitas', time: '5:14', seconds: 314 },
        { title: 'Building the Generator', time: '6:50', seconds: 410 },
        { title: 'Error Functions (Log Loss)', time: '9:22', seconds: 562 },
        { title: 'Backpropagation & Training', time: '12:29', seconds: 749 },
        { title: 'Melatih Kedua Network', time: '13:22', seconds: 802 },
        { title: 'Hasil Training & Kode', time: '16:53', seconds: 1013 },
        { title: 'Penutup', time: '19:42', seconds: 1182 }
    ];

    // Pemetaan section catatan ke rentang waktu video
    const sectionMap = [
        { id: 'pendahuluan', startSeconds: 3, endSeconds: 128 },
        { id: 'slanted-land', startSeconds: 129, endSeconds: 242 },
        { id: 'discriminator', startSeconds: 243, endSeconds: 409 },
        { id: 'generator', startSeconds: 410, endSeconds: 561 },
        { id: 'error-functions', startSeconds: 562, endSeconds: 748 },
        { id: 'training-process', startSeconds: 749, endSeconds: 1012 },
        { id: 'hasil-dan-kode', startSeconds: 1013, endSeconds: 1260 }
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
            question: "Dalam analogi Luis Serrano, Generator berperan sebagai pemalsu lukisan (counterfeiter) dan Discriminator sebagai polisi (cop). Apa tujuan akhir dari pelatihan adversarial ini?",
            options: [
                "Generator mampu membuat data palsu yang begitu realistis sehingga Discriminator tidak bisa membedakannya dari data asli.",
                "Discriminator menjadi sangat sempurna sehingga selalu bisa mendeteksi data palsu dengan akurasi 100%.",
                "Kedua neural network menghasilkan bobot (weight) yang identik setelah training selesai.",
                "Generator belajar menyalin gambar training secara piksel per piksel."
            ],
            correctIndex: 0,
            explanation: "Tujuan utama pelatihan GAN adalah membuat Generator yang mampu menghasilkan data baru yang tidak bisa dibedakan dari data asli oleh Discriminator. Proses adversarial memaksa Generator terus meningkatkan kualitas output-nya."
        },
        {
            question: "Mengapa fungsi Sigmoid digunakan pada output Discriminator dalam arsitektur GAN?",
            options: [
                "Sigmoid mengubah skor mentah (raw score) menjadi probabilitas antara 0 dan 1, yang menunjukkan keyakinan Discriminator bahwa input tersebut adalah data asli.",
                "Sigmoid digunakan sebagai fungsi error untuk menghitung loss.",
                "Sigmoid memastikan semua bobot jaringan tetap bernilai positif.",
                "Sigmoid mempercepat konvergensi proses training secara eksponensial."
            ],
            correctIndex: 0,
            explanation: "Sigmoid memetakan nilai skor linear dari Discriminator ke rentang (0, 1), yang bisa diinterpretasikan sebagai probabilitas. Misalnya, sigmoid(1) = 0.73 berarti Discriminator 73% yakin bahwa gambar tersebut adalah wajah asli."
        },
        {
            question: "Pada proses training GAN, error function Generator dan Discriminator saling 'bertarung.' Mengapa kedua error function ini tidak saling bertabrakan meskipun berlawanan arah?",
            options: [
                "Karena error function Generator hanya memperbarui weight Generator, dan error function Discriminator hanya memperbarui weight Discriminator — mereka beroperasi pada parameter yang berbeda.",
                "Karena kedua error function selalu menghasilkan nilai yang sama pada setiap epoch.",
                "Karena gradient descent otomatis menghentikan satu model saat model lain sedang diperbarui.",
                "Karena kedua model berbagi weight yang sama dan diperbarui secara bergantian."
            ],
            correctIndex: 0,
            explanation: "Meskipun error function Generator (−log D(G(z))) dan Discriminator (−log(1 − D(G(z)))) berlawanan arah, mereka tidak bertabrakan karena masing-masing hanya memperbarui bobot jaringannya sendiri melalui backpropagation."
        }
    ];
</script>

<svelte:head>
    <title>A Friendly Introduction to GANs - S2IF Notebook</title>
    <meta name="description" content="Catatan intuitif tentang Generative Adversarial Networks (GANs) berdasarkan video Luis Serrano — analogi Counterfeiter vs Cop, dunia Slanted Land 2x2 piksel, error functions, dan proses training." />
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article class="note-article" onclick={handleTimestampClick}>
    <NoteHeader
        title="A Friendly Introduction to Generative Adversarial Networks (GANs)"
        date="31 Mei 2026"
        status="done"
        tags={["Generative-AI", "GANs", "Math", "Intuition"]}
    />

    <Callout type="info" title="Sumber Materi">
        Catatan ini disusun berdasarkan video <strong>Luis Serrano</strong> (Serrano Academy) berjudul <em>"A Friendly Introduction to Generative Adversarial Networks (GANs)"</em>. Video lengkap tersedia di: <a href="https://www.youtube.com/watch?v=8L11aMN5KY8" target="_blank" rel="noopener noreferrer">YouTube — A Friendly Introduction to GANs</a>.
    </Callout>

    <VideoSyncArticle {sectionMap}>
        <div data-section-id="pendahuluan">
            <NoteSection title="Pendahuluan: Analogi Counterfeiter vs Cop">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=0m3s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 0:03 Intro
                    </a>
                    <a href="{videoBaseUrl}&t=1m2s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 1:02 Konsep GANs
                    </a>
                </div>
                <p>
                    <strong>Generative Adversarial Networks (GANs)</strong> dikembangkan oleh <strong>Ian Goodfellow</strong>
                    dan para peneliti di Montreal. GANs merupakan terobosan besar dalam machine learning yang memiliki banyak
                    aplikasi menakjubkan — salah satu yang paling terkenal adalah <strong>pembuatan wajah manusia yang tidak pernah ada</strong>
                    (lihat situs <em>This Person Does Not Exist</em>).
                </p>

                <p>
                    Luis Serrano menjelaskan konsep GANs dengan analogi yang sangat intuitif:
                </p>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Analogi:</strong> "GANs terdiri dari dua neural network yang saling bertarung. Satu disebut <strong>Generator</strong> dan yang lain <strong>Discriminator</strong>."
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        Generator = <strong>Pemalsu Lukisan (Counterfeiter)</strong> yang terus berusaha membuat lukisan palsu.<br>
                        Discriminator = <strong>Polisi (Cop)</strong> yang terus berusaha menangkap hasil pemalsuan.
                    </p>
                </div>

                <p>
                    Seiring si pemalsu terus tertangkap oleh polisi, ia terus memperbaiki tekniknya — meningkatkan kualitas lukisannya —
                    hingga suatu hari ia akhirnya berhasil membuat lukisan palsu yang <strong>sempurna</strong> dan benar-benar menipu sang polisi.
                </p>

                <p>
                    Dalam bahasa neural network: kita melatih Generator dan Discriminator menggunakan sekumpulan <strong>gambar asli</strong> dan
                    sekumpulan <strong>gambar palsu</strong> yang dihasilkan oleh Generator. Discriminator dilatih untuk mengidentifikasi
                    mana gambar asli dan mana yang palsu, sementara Generator dilatih untuk mengelabui Discriminator agar menganggap
                    gambar palsunya sebagai gambar asli.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="slanted-land">
            <NoteSection title="Slanted Land: Dunia 2×2 Piksel">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=2m9s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 2:09 Slanted Land
                    </a>
                    <a href="{videoBaseUrl}&t=3m5s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 3:05 Wajah vs Noise
                    </a>
                    <a href="{videoBaseUrl}&t=3m45s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 3:45 Skala Piksel
                    </a>
                </div>
                <p>
                    Untuk menyederhanakan konsep, Luis Serrano membangun dunia imajiner bernama <strong>Slanted Land</strong> — tempat di mana
                    semua penduduknya terlihat sedikit memanjang dan berjalan dengan kemiringan 45 derajat.
                </p>

                <ul>
                    <li>
                        <strong>Resolusi layar:</strong> Hanya 2×2 piksel (hitam-putih). Ini adalah resolusi terbaik yang pernah dicapai
                        oleh teknologi di Slanted Land.
                    </li>
                    <li>
                        <strong>Neural network:</strong> Penduduk Slanted Land hanya mengenal neural network satu layer yang sangat sederhana.
                    </li>
                </ul>

                <h3>Wajah vs Noise di Slanted Land</h3>
                <p>
                    Di layar 2×2 piksel, <strong>wajah</strong> penduduk Slanted Land terlihat seperti garis diagonal (backslash <code>\</code>):
                    piksel <em>kiri-atas</em> dan <em>kanan-bawah</em> berwarna gelap, sementara piksel lainnya terang.
                </p>
                <p>
                    Sedangkan <strong>gambar noise</strong> (bukan wajah) memiliki pola piksel yang acak — tidak membentuk garis diagonal.
                </p>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Skala Nilai Piksel</h4>
                    <code style="font-size: 1.05rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-top: 0.5rem; color: var(--color-binder);">
                        Putih = 0 &nbsp;|&nbsp; Hitam = 1
                    </code>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Setiap piksel di layar 2×2 memiliki nilai antara 0 (putih) dan 1 (hitam).
                    </p>
                </div>
            </NoteSection>
        </div>

        <div data-section-id="discriminator">
            <NoteSection title="Membangun Discriminator: Mengenali Wajah dari Noise">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=4m3s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 4:03 Building Discriminator
                    </a>
                    <a href="{videoBaseUrl}&t=5m14s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 5:14 Sigmoid
                    </a>
                    <a href="{videoBaseUrl}&t=6m6s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 6:06 Contoh Non-Face
                    </a>
                </div>
                <p>
                    Pertanyaan kunci: <em>Bagaimana membedakan wajah dari gambar noise?</em>
                </p>

                <p>
                    Perhatikan bahwa pada semua <strong>wajah</strong> di Slanted Land, piksel <em>kiri-atas</em> dan <em>kanan-bawah</em>
                    memiliki nilai besar (gelap), sedangkan dua piksel lainnya memiliki nilai kecil (terang). Pada gambar <strong>noise</strong>,
                    nilainya bisa apa saja secara acak.
                </p>

                <h3>Formula Discriminator</h3>
                <p>
                    Cara membedakan wajah: <strong>jumlahkan</strong> nilai piksel kiri-atas dan kanan-bawah, lalu <strong>kurangkan</strong>
                    nilai piksel kanan-atas dan kiri-bawah.
                </p>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Skor Discriminator</h4>
                    <code style="font-size: 1.05rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-top: 0.5rem; color: var(--color-binder);">
                        Skor = (+1)×KiriAtas + (−1)×KananAtas + (−1)×KiriBawah + (+1)×KananBawah − Bias
                    </code>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Threshold (bias) = 1. Jika skor ≥ 1 → Wajah. Jika skor &lt; 1 → Bukan wajah.
                    </p>
                </div>

                <ul>
                    <li>
                        <strong>Contoh wajah:</strong> Skor = 2. Karena 2 ≥ 1, Discriminator mengatakan ini adalah wajah. ✅
                    </li>
                    <li>
                        <strong>Contoh noise:</strong> Skor = −0.5. Karena −0.5 &lt; 1, Discriminator mengatakan ini bukan wajah. ✅
                    </li>
                </ul>

                <h3>Menambahkan Probabilitas dengan Sigmoid</h3>
                <p>
                    Untuk mendapatkan probabilitas, kita terapkan <strong>fungsi sigmoid</strong> pada skor mentah.
                    Sigmoid mengirimkan angka besar mendekati 1 dan angka kecil mendekati 0.
                </p>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Contoh:</strong> "sigmoid(1) = 0.73 → Discriminator memberikan probabilitas 73% bahwa gambar ini adalah wajah."
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        Karena 73% > 50%, Discriminator menyimpulkan gambar tersebut adalah wajah. Dan memang benar!
                    </p>
                </div>

                <p>
                    Untuk gambar noise: sigmoid(−0.5) = 0.37. Karena 37% &lt; 50%, Discriminator menyimpulkan ini bukan wajah. Benar lagi!
                </p>

                <Callout type="info" title="Konvensi Visual">
                    Sepanjang video, garis tebal (thick edges) merepresentasikan bobot positif dan garis tipis (thin edges) merepresentasikan bobot negatif.
                </Callout>
            </NoteSection>
        </div>

        <div data-section-id="generator">
            <NoteSection title="Membangun Generator: Menciptakan Wajah dari Noise">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=6m50s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 6:50 Building Generator
                    </a>
                    <a href="{videoBaseUrl}&t=8m29s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 8:29 Sigmoid Output
                    </a>
                </div>
                <p>
                    Generator adalah neural network yang bertugas <strong>menghasilkan wajah</strong>. Langkah pertama:
                    ambil sebuah <strong>input acak (random number)</strong> antara 0 dan 1, misalnya <code>Z = 0.7</code>.
                </p>

                <h3>Arsitektur Generator</h3>
                <p>
                    Kita ingin piksel kiri-atas dan kanan-bawah bernilai besar, sedangkan piksel kanan-atas dan kiri-bawah bernilai kecil.
                    Maka:
                </p>
                <ul>
                    <li>Untuk output yang harus <strong>besar</strong> (kiri-atas, kanan-bawah): bobot = <strong>+1</strong>, bias = <strong>+1</strong>.</li>
                    <li>Untuk output yang harus <strong>kecil</strong> (kanan-atas, kiri-bawah): bobot = <strong>−1</strong>, bias = <strong>−1</strong>.</li>
                </ul>

                <h3>Contoh Perhitungan</h3>
                <p>Dengan input Z = 0.7:</p>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Perhitungan Generator (Z = 0.7)</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.75rem; text-align: center;">
                        <div style="padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                            <strong>Kiri-Atas</strong><br>
                            <small>Skor = (+1)×0.7 + 1 = 1.7</small><br>
                            <small>sigmoid(1.7) = <strong>0.85</strong></small>
                        </div>
                        <div style="padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                            <strong>Kanan-Atas</strong><br>
                            <small>Skor = (−1)×0.7 − 1 = −1.7</small><br>
                            <small>sigmoid(−1.7) = <strong>0.15</strong></small>
                        </div>
                        <div style="padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                            <strong>Kiri-Bawah</strong><br>
                            <small>Skor = (−1)×0.7 − 1 = −1.7</small><br>
                            <small>sigmoid(−1.7) = <strong>0.15</strong></small>
                        </div>
                        <div style="padding: 0.5rem; background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 4px;">
                            <strong>Kanan-Bawah</strong><br>
                            <small>Skor = (+1)×0.7 + 1 = 1.7</small><br>
                            <small>sigmoid(1.7) = <strong>0.85</strong></small>
                        </div>
                    </div>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Hasilnya: gambar 2×2 dengan pola diagonal (0.85, 0.15, 0.15, 0.85) — sebuah wajah Slanted Land! 🎉
                    </p>
                </div>

                <Callout type="tip" title="Properti Penting Generator Ini">
                    Karena cara kita mendesain bobot-bobotnya, neural network ini <strong>selalu menghasilkan wajah</strong> — tidak peduli
                    berapa pun nilai input Z (selama Z antara 0 dan 1). Piksel kiri-atas dan kanan-bawah selalu besar, sedangkan dua piksel
                    lainnya selalu kecil. Ini berarti generator ini adalah <strong>generator yang baik</strong>.
                </Callout>

                <p>
                    Tentu saja, kita membangun kedua neural network ini dengan cara <em>mengira-ngira bobot secara manual (eyeballing)</em>.
                    Dalam praktik nyata, kita harus <strong>melatih</strong> neural network untuk menemukan bobot terbaik secara otomatis.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="error-functions">
            <NoteSection title="Error Functions: Logarithmic Loss (Log Loss)">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=9m22s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 9:22 Konsep Error Function
                    </a>
                    <a href="{videoBaseUrl}&t=9m52s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 9:52 Log Loss (Label = 1)
                    </a>
                    <a href="{videoBaseUrl}&t=10m48s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 10:48 Log Loss (Label = 0)
                    </a>
                </div>
                <p>
                    <strong>Error function (cost function)</strong> adalah cara kita memberitahu neural network seberapa bagus atau buruk
                    performanya. Jika error besar, berarti network perlu memperbaiki diri; jika error kecil, network sudah bekerja dengan baik.
                </p>

                <h3>Kasus 1: Kita Ingin Prediksi = 1 (Label = 1)</h3>
                <p>
                    Misalkan label sebenarnya adalah 1. Kita ingin prediksi mendekati 1.
                </p>
                <ul>
                    <li>
                        Prediksi = 0.1 → Prediksi <strong>buruk</strong> → Error harus <strong>besar</strong>.<br>
                        <code>−ln(0.1) = 2.3</code> ✅ (besar)
                    </li>
                    <li>
                        Prediksi = 0.9 → Prediksi <strong>bagus</strong> → Error harus <strong>kecil</strong>.<br>
                        <code>−ln(0.9) = 0.1</code> ✅ (kecil)
                    </li>
                </ul>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Error Function Label = 1</h4>
                    <code style="font-size: 1.1rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-top: 0.5rem; color: var(--color-binder);">
                        Error = −ln(prediksi)
                    </code>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Semakin dekat prediksi ke 1, semakin kecil error. Semakin dekat ke 0, semakin besar error.
                    </p>
                </div>

                <h3>Kasus 2: Kita Ingin Prediksi = 0 (Label = 0)</h3>
                <p>
                    Misalkan label sebenarnya adalah 0. Kita ingin prediksi mendekati 0.
                </p>
                <ul>
                    <li>
                        Prediksi = 0.1 → Prediksi <strong>bagus</strong> → Error harus <strong>kecil</strong>.<br>
                        <code>−ln(1 − 0.1) = −ln(0.9) = 0.1</code> ✅ (kecil)
                    </li>
                    <li>
                        Prediksi = 0.9 → Prediksi <strong>buruk</strong> → Error harus <strong>besar</strong>.<br>
                        <code>−ln(1 − 0.9) = −ln(0.1) = 2.3</code> ✅ (besar)
                    </li>
                </ul>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Error Function Label = 0</h4>
                    <code style="font-size: 1.1rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-top: 0.5rem; color: var(--color-binder);">
                        Error = −ln(1 − prediksi)
                    </code>
                    <p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-ink-muted);">
                        Semakin dekat prediksi ke 0, semakin kecil error. Semakin dekat ke 1, semakin besar error.
                    </p>
                </div>

                <Callout type="warning" title="Mengapa Logaritma?">
                    Logaritma natural (ln) muncul di banyak error function karena merupakan fungsi yang sangat <em>convenient</em> secara
                    matematis. Alasan lebih dalamnya berkaitan dengan teori informasi dan maximum likelihood estimation, tetapi untuk sekarang
                    cukup pahami bahwa ln memiliki properti yang tepat: error membesar secara dramatis saat prediksi menjauhi label.
                </Callout>
            </NoteSection>
        </div>

        <div data-section-id="training-process">
            <NoteSection title="Backpropagation & Training: Melatih Kedua Network">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=12m29s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 12:29 Backpropagation
                    </a>
                    <a href="{videoBaseUrl}&t=13m22s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 13:22 Training Keduanya
                    </a>
                    <a href="{videoBaseUrl}&t=14m11s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 14:11 Error Functions
                    </a>
                    <a href="{videoBaseUrl}&t=16m6s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 16:06 Adversarial Harmony
                    </a>
                </div>
                <p>
                    Sekarang kita telah memiliki error functions, saatnya menggabungkan semuanya untuk melatih Generator dan Discriminator
                    secara bersamaan menggunakan <strong>backpropagation</strong>.
                </p>

                <h3>Langkah Training</h3>
                <ol>
                    <li>Mulai dengan bobot acak (random weights) untuk kedua network.</li>
                    <li>Pilih angka acak <strong>Z</strong> antara 0 dan 1 sebagai input Generator.</li>
                    <li><strong>Forward pass Generator:</strong> Hasilkan gambar (kemungkinan besar bukan wajah, karena bobot masih acak).</li>
                    <li><strong>Forward pass Discriminator:</strong> Masukkan gambar hasil Generator ke Discriminator. Discriminator menghasilkan probabilitas, misal <code>0.68</code>.</li>
                </ol>

                <h3>Error Function yang Tepat untuk Setiap Network</h3>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Q:</strong> "Apa yang diinginkan Discriminator saat melihat gambar dari Generator?"
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        <strong>A:</strong> "Discriminator ingin mengatakan bahwa gambar itu PALSU (output = 0). Maka error function Discriminator: <code>−ln(1 − D(G(z)))</code>"
                    </p>
                </div>

                <div class="dialogue-block" style="background: var(--color-surface-soft); border-left: 4px solid var(--color-binder); padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-style: italic;">
                        <strong>Q:</strong> "Apa impian terbesar Generator?"
                    </p>
                    <p style="margin: 0; font-weight: 500; color: var(--color-binder);">
                        <strong>A:</strong> "Generator bermimpi gambar palsunya dianggap ASLI oleh Discriminator (output = 1). Maka error function Generator: <code>−ln(D(G(z)))</code>"
                    </p>
                </div>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Dua Error Function yang Saling Berlawanan</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem;">
                        <div style="padding: 0.75rem; background: var(--color-status-info-soft); border: 1px solid var(--color-callout-info-border); border-radius: 6px;">
                            <strong style="color: var(--color-binder);">Generator Error</strong><br>
                            <code>−ln(D(G(z)))</code><br>
                            <small>Ingin output = 1</small>
                        </div>
                        <div style="padding: 0.75rem; background: var(--color-status-warning-soft); border: 1px solid var(--color-status-warning-border); border-radius: 6px;">
                            <strong style="color: var(--color-binder);">Discriminator Error</strong><br>
                            <code>−ln(1 − D(G(z)))</code><br>
                            <small>Ingin output = 0</small>
                        </div>
                    </div>
                </div>

                <Callout type="tip" title="Mengapa Tidak Bertabrakan?">
                    Meskipun kedua error function ini berlawanan arah, mereka <strong>tidak saling bertabrakan</strong>. Alasannya:
                    error function Generator hanya mengubah bobot Generator, dan error function Discriminator hanya mengubah bobot Discriminator.
                    Mereka beroperasi pada parameter yang berbeda — sehingga justru saling memperbaiki kedua network secara paralel.
                </Callout>

                <h3>Siklus Training Lengkap</h3>
                <ol>
                    <li>Pilih nilai acak Z → Generator menghasilkan gambar palsu.</li>
                    <li>Masukkan gambar palsu ke Discriminator → hitung prediksi.</li>
                    <li>Backpropagation: perbarui bobot <strong>kedua</strong> network menggunakan error function masing-masing.</li>
                    <li>Ambil gambar <strong>asli</strong> dari dataset → masukkan ke Discriminator → perbarui bobot Discriminator lagi.</li>
                    <li><strong>Ulangi</strong> proses ini ribuan kali (epoch).</li>
                </ol>
            </NoteSection>
        </div>

        <div data-section-id="hasil-dan-kode">
            <NoteSection title="Hasil Training & Implementasi Python">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=16m53s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 16:53 Training Results
                    </a>
                    <a href="{videoBaseUrl}&t=17m31s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 17:31 Verifikasi Manual
                    </a>
                    <a href="{videoBaseUrl}&t=18m23s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 18:23 Kode Python
                    </a>
                </div>
                <p>
                    Setelah menjalankan training di notebook Python, Luis Serrano mendapatkan bobot-bobot yang optimal untuk kedua network.
                    Berikut observasinya:
                </p>

                <h3>Verifikasi Hasil Generator</h3>
                <ul>
                    <li>
                        Karena input Z selalu antara 0 dan 1, dan dua edge teratas pada Generator bernilai <strong>positif</strong>,
                        maka output sigmoid untuk piksel kiri-atas selalu <strong>besar</strong> → piksel gelap. ✅
                    </li>
                    <li>
                        Dua edge lainnya bernilai <strong>positif</strong> juga → piksel kanan-bawah selalu besar. ✅
                    </li>
                    <li>
                        Edge untuk piksel kanan-atas dan kiri-bawah bernilai <strong>negatif</strong> → piksel terang. ✅
                    </li>
                    <li>
                        Hasilnya: gambar selalu terlihat seperti <strong>garis diagonal</strong> — sebuah wajah khas Slanted Land!
                    </li>
                </ul>

                <h3>Implementasi Python Murni</h3>
                <p>
                    Seluruh implementasi GAN ini ditulis dalam <strong>Python murni</strong> tanpa library deep learning apa pun
                    (tanpa TensorFlow, tanpa PyTorch). Kode tersedia di GitHub milik Luis Serrano.
                </p>

                <p>Struktur kode meliputi:</p>
                <ul>
                    <li><strong>Hard-coded faces:</strong> Dataset wajah Slanted Land (gambar diagonal) dan random noise.</li>
                    <li><strong>Discriminator class:</strong> Penurunan turunan (derivative) terhadap bobot dan bias untuk gambar wajah dan gambar noise.</li>
                    <li><strong>Generator class:</strong> Penurunan turunan terhadap bobot dan bias berdasarkan error function Generator.</li>
                    <li><strong>Error function plots:</strong> Grafik yang menunjukkan Generator error menurun dan stabil, sementara Discriminator error naik seiring Generator menjadi semakin mahir.</li>
                </ul>

                <Callout type="info" title="Hasil Akhir">
                    Setelah training, Generator diminta menghasilkan gambar-gambar acak — dan semuanya terlihat seperti wajah penduduk Slanted Land!
                    Ini membuktikan bahwa sepasang GAN sederhana (hanya satu layer!) sudah cukup mampu menghasilkan wajah realistis di dunia 2×2 piksel.
                </Callout>

                <div class="visual-concept-card" style="background: var(--color-surface-elevated); border: 2px solid var(--color-line); padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                    <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); font-size: 1.2rem;">Perilaku Error Function Selama Training</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem;">
                        <div style="padding: 0.75rem; background: var(--color-status-success-soft); border: 1px solid var(--color-status-done-start); border-radius: 6px;">
                            <strong>Generator Error</strong><br>
                            <small>📉 Turun dan stabil</small><br>
                            <small style="color: var(--color-ink-muted);">Generator semakin mahir</small>
                        </div>
                        <div style="padding: 0.75rem; background: var(--color-status-warning-soft); border: 1px solid var(--color-status-warning-border); border-radius: 6px;">
                            <strong>Discriminator Error</strong><br>
                            <small>📈 Naik di akhir</small><br>
                            <small style="color: var(--color-ink-muted);">Generator berhasil mengelabui</small>
                        </div>
                    </div>
                </div>
            </NoteSection>
        </div>
    </VideoSyncArticle>

    <NoteSection title="Uji Pemahaman: Kuis">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Kecerdasan Buatan Lanjut" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="8L11aMN5KY8" {chapters} />

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
