<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import VideoSidebar from "$lib/components/VideoSidebar.svelte";
    import VideoSyncArticle from "$lib/components/VideoSyncArticle.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import { HelpCircle, Play } from "lucide-svelte";

    const videoBaseUrl = "https://www.youtube.com/watch?v=_hQm74PbME4";
    
    let videoSidebar: VideoSidebar;

    // Chapter timeline (muncul di sidebar)
    const chapters = [
        { title: 'Intro', time: '0:00', seconds: 0 },
        { title: 'Eliminasi Distraksi', time: '1:31', seconds: 91 },
        { title: 'Target yang Jelas', time: '2:44', seconds: 164 },
        { title: 'Aturan 4%', time: '4:04', seconds: 244 },
        { title: 'Stasiun Pengecasan', time: '7:16', seconds: 436 },
        { title: 'Mindset "Tanggung"', time: '9:30', seconds: 570 },
        { title: 'Tingkatkan Standar', time: '10:03', seconds: 603 },
        { title: 'What to Expect', time: '10:33', seconds: 633 }
    ];

    // Pemetaan section catatan ke rentang waktu video
    const sectionMap = [
        { id: 'intro', startSeconds: 0, endSeconds: 90 },
        { id: 'eliminasi-distraksi', startSeconds: 91, endSeconds: 163 },
        { id: 'target-yang-jelas', startSeconds: 164, endSeconds: 243 },
        { id: 'aturan-4-persen', startSeconds: 244, endSeconds: 435 },
        { id: 'stasiun-pengecasan', startSeconds: 436, endSeconds: 569 },
        { id: 'mindset-tanggung', startSeconds: 570, endSeconds: 602 },
        { id: 'tingkatkan-standar', startSeconds: 603, endSeconds: 632 },
        { id: 'what-to-expect', startSeconds: 633, endSeconds: 688 }
    ];

    function handleTimestampClick(event: MouseEvent) {
        const badge = (event.target as HTMLElement).closest('.timestamp-badge') as HTMLAnchorElement | null;
        if (!badge) return;
        const href = badge.getAttribute('href') ?? '';
        const match = href.match(/t=(\d+)m(\d+)s/);
        const match2 = href.match(/t=(\d+)s/); // For seconds only format
        
        if (match) {
            event.preventDefault();
            const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2]);
            videoSidebar?.seekTo(totalSeconds);
        } else if (match2) {
            event.preventDefault();
            const totalSeconds = parseInt(match2[1]);
            videoSidebar?.seekTo(totalSeconds);
        }
    }

    const quizQuestions = [
        {
            question: "Apa tujuan utama dari 'Aturan 4%' dalam mengelola fokus?",
            options: [
                "Memberikan waktu istirahat 4% dari total waktu belajar",
                "Mengerjakan tugas yang 4% lebih mudah dari kemampuan kita agar cepat selesai",
                "Mengerjakan tugas yang 4% lebih sulit untuk masuk ke State of Flow",
                "Mengurangi distraksi sebesar 4% setiap harinya"
            ],
            correctIndex: 2,
            explanation: "Aturan 4% bertujuan memberikan tantangan yang sedikit di atas kemampuan saat ini (optimal level of challenge) sehingga kita tidak terlalu stres maupun terlalu bosan, memudahkan masuk ke State of Flow."
        },
        {
            question: "Kapan waktu yang paling tepat untuk menyiapkan meja dan perlengkapan belajar berdasarkan materi 'Stasiun Pengecasan'?",
            options: [
                "Saat merasa sangat termotivasi",
                "Setelah keluar dari Stasiun Pengecasan (misal: selesai mandi/tidur)",
                "Sebelum memasuki Stasiun Pengecasan",
                "Saat sudah kelelahan dan ingin beristirahat"
            ],
            correctIndex: 2,
            explanation: "Meja dan peralatan harus disiapkan sebelum memasuki Stasiun Pengecasan. Dengan demikian, ketika kita sudah pulih (segar kembali), kita bisa langsung duduk dan belajar tanpa hambatan mencari-cari barang."
        },
        {
            question: "Apa fungsi dari 'Lembar Distraksi' (Distraction Sheet)?",
            options: [
                "Untuk mencatat semua jadwal harian",
                "Untuk melampiaskan emosi saat sedang stres belajar",
                "Untuk menuliskan ide atau hal penting yang terlintas saat belajar agar pikiran kembali fokus",
                "Untuk mencatat kesalahan-kesalahan yang dilakukan saat mengerjakan soal"
            ],
            correctIndex: 2,
            explanation: "Lembar Distraksi digunakan untuk menampung ide atau pikiran yang tiba-tiba muncul saat belajar. Dengan mencatatnya, kita melegakan pikiran dan bisa kembali fokus pada materi."
        }
    ];
</script>

<svelte:head>
    <title>Cara Fokus Belajar Berjam-jam (7+ Tips Efektif) - S2IF</title>
</svelte:head>

<article class="note-article" onclick={handleTimestampClick}>
    <NoteHeader 
        title="Cara Fokus Belajar Berjam-jam (7+ Tips Efektif)" 
        date="18 May 2026" 
        status="done" 
        tags={["fokus", "produktivitas", "belajar"]} 
    />

    <Callout type="info" title="Sumber Materi">
        Catatan ini disusun berdasarkan video edukasi dan pengembangan diri dari <strong>Zahid Ibrahim</strong> yang berjudul <em>"Cara fokus belajar berjam-jam (7+ tips efektif)"</em>. Video lengkap dapat diakses melalui: <a href="https://www.youtube.com/watch?v=_hQm74PbME4" target="_blank" rel="noopener noreferrer">YouTube — Cara fokus belajar berjam-jam (7+ tips efektif)</a>.
    </Callout>

    <VideoSyncArticle {sectionMap}>
        <div data-section-id="intro">
            <NoteSection title="Intro">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=0m0s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 0:00 Intro
                    </a>
                </div>
                <p>
                    Strategi ini merupakan cara untuk meningkatkan intensitas fokus belajar kita.
                    Tips ini berguna terutama bagi kita yang sedang menghadapi persiapan ujian besar, maupun yang ingin bisa produktif seharian tanpa harus kehabisan tenaga di awal.
                    Orang yang tadinya cuma bisa belajar 30 menit hingga maksimal 2 jam, ternyata bisa melatih otot fokusnya hingga 4 jam sampai 8 jam sehari seperti di sekolah.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="eliminasi-distraksi">
            <NoteSection title="Eliminasi Distraksi">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=1m31s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 1:31 Eliminasi Distraksi
                    </a>
                </div>
                <p>
                    Langkah paling fundamental adalah menjauhkan ponsel atau pemicu lainnya. 
                    Sekali fokus kita buyar karena mengecek sesuatu, butuh energi sangat besar untuk kembali ke dalam zona fokus. 
                </p>
                <p>
                    Apabila distraksi datang dari <strong>pikiran sendiri</strong> (tiba-tiba melamun), gunakan dua teknik berikut:
                </p>
                <ul>
                    <li><strong>Aturan 3 Detik:</strong> Jika mulai melamun ke hal-hal tidak penting (misal: <em>"Aduh, kemarin ayam gue udah dikasih makan belum ya?"</em>), hitung perlahan "1, 2, 3", lalu lupakan pikiran itu dan segera kembali fokus ke tugas tanpa basa-basi.</li>
                    <li><strong>Lembar Distraksi (Distraction Sheet):</strong> Jika terlintas pikiran penting atau ide menarik saat belajar (misal: tiba-tiba terpikir ide obat kanker, makanan yang mau dimasak, atau ide berkarya), siapkan selembar kertas kosong dan catat ide tersebut di sana. Setelah selesai sesi belajar, barulah Anda boleh mengunjungi kembali lembar tersebut.</li>
                </ul>
            </NoteSection>
        </div>

        <div data-section-id="target-yang-jelas">
            <NoteSection title="Target yang Jelas">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=2m44s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 2:44 Target yang Jelas
                    </a>
                </div>
                <p>
                    Belajar tanpa target sama seperti pelari yang berlari keliling lapangan tanpa tahu garis finis-nya; kita akan lebih mudah menyerah di tengah jalan saat merasa lelah.
                </p>
                <p>
                    Selalu tetapkan target konkrit <em>sebelum</em> memulai, seperti:
                </p>
                <ul>
                    <li>Jumlah soal (misal: "menyelesaikan 20 soal matematika").</li>
                    <li>Jumlah materi bab (misal: "menyelesaikan rangkuman 1 bab").</li>
                    <li>Lama waktu belajar (misal: "menggunakan teknik Pomodoro 25 menit fokus, 5 menit istirahat").</li>
                </ul>
            </NoteSection>
        </div>

        <div data-section-id="aturan-4-persen">
            <NoteSection title="Aturan 4% (State of Flow)">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=4m4s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 4:04 Aturan 4%
                    </a>
                </div>
                <p>
                    Konsep <strong>Flow</strong>, yang diperkenalkan oleh Mihaly Csikszentmihalyi, adalah zona mental di mana kita sepenuhnya tenggelam dalam suatu aktivitas hingga mengabaikan hal lain dan merasa sangat menikmati prosesnya.
                </p>
                <p>
                    Syarat untuk masuk ke dalam Zona Flow adalah memberikan diri kita tantangan yang tingkat kesulitannya kurang lebih <strong>4% di atas kemampuan kita saat ini</strong>.
                </p>
                <ul>
                    <li>Jika terlalu sulit (lebih dari 4%), kita akan stres, cemas, dan berujung menyerah.</li>
                    <li>Jika terlalu mudah, kita akan kekurangan rangsangan stimulasi, merasa bosan, dan berhenti belajar.</li>
                    <li>Prinsip ini mirip dengan *matchmaking* dalam video game yang mempertemukan pemain dengan lawan yang sejajar atau sedikit lebih hebat.</li>
                </ul>
                <p>
                    Dalam penerapannya: Jika kamu terbiasa mengerjakan 20 soal dalam 15 menit, maka untuk sesi berikutnya pasang target mengerjakan 23 soal. Begitu pula dengan durasi, tingkatkan durasi Pomodoro secara perlahan.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="stasiun-pengecasan">
            <NoteSection title="Stasiun Pengecasan (Charging Station)">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=7m16s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 7:16 Stasiun Pengecasan
                    </a>
                </div>
                <p>
                    Kapasitas *willpower* (motivasi internal) setiap hari sifatnya terbatas. Memaksakan 100% *willpower* tanpa henti dalam waktu panjang akan menyebabkan kelelahan ekstrem (<em>burnout</em>).
                </p>
                <p>
                    Efek kalau sudah <em>burnout</em> biasanya kita jadi malas belajar, dan bawaannya hanya ingin rebahan sambil mendengarkan <strong>lagu-lagu ambyar</strong>.
                </p>
                <p>
                    Strategi terbaik adalah membuat <strong>Charging Station</strong>: aktivitas yang dikaitkan dengan "mental reset". Aktivitas ini berfungsi sebagai pemicu untuk transisi kembali ke mode belajar atau hadiah setelah belajar.
                </p>
                <ul>
                    <li><strong>Contoh aktivitas:</strong> Tidur siang, mandi, menyeduh teh/kopi (teh beneran, bukan 'nge-teh' yang lain!).</li>
                    <li>Gunakan ini sebagai siklus: Belajar → Masuk Charging Station (misal mandi) → Kembali belajar dengan mental yang telah segar kembali.</li>
                </ul>
                <Callout type="warning" title="Penting: Siapkan Area Tempur!">
                    Pastikan mejamu sudah beres dan perlengkapan belajarmu telah siap <em>sebelum</em> kamu memasuki Charging Station. Sehingga saat keluar dari sana (contoh: seusai tidur siang), tidak ada lagi alasan repot mencari barang dan bisa langsung duduk belajar.
                </Callout>
            </NoteSection>
        </div>

        <div data-section-id="mindset-tanggung">
            <NoteSection title="Mindset 'Tanggung'">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=9m30s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 9:30 Mindset "Tanggung"
                    </a>
                </div>
                <p>
                    Ini merupakan trik sugesti ke diri sendiri dengan kata "Tanggung". 
                    Saat kita menetapkan target mengerjakan 7 soal, dan telah menyelesaikannya, maka yakinkan diri: "Tanggung, 3 soal lagi genap jadi 10."
                </p>
                <p>
                    Tanpa disadari, trik kecil ini terus-menerus memaksa batas kemampuan kita untuk bekerja lebih lama dan lebih produktif. Ini adalah cara natural untuk memperluas ketahanan otak.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="tingkatkan-standar">
            <NoteSection title="Tingkatkan Standar">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=10m3s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 10:03 Tingkatkan Standar
                    </a>
                </div>
                <p>
                    Dengan terus-menerus menggunakan <em>mindset tanggung</em>, kita melatih diri menaikkan standar rata-rata.
                    Jika minggu lalu batas kita adalah 1 jam, minggu ini batas bawah kita secara perlahan akan bergeser ke 1 jam 15 menit. Evaluasi terus rutinitas belajar dan dorong batas kemampuanmu.
                </p>
            </NoteSection>
        </div>

        <div data-section-id="what-to-expect">
            <NoteSection title="Ekspektasi (What to Expect)">
                <div class="section-meta-timestamps">
                    <span class="meta-label">Materi Video:</span>
                    <a href="{videoBaseUrl}&t=10m33s" target="_blank" rel="noopener noreferrer" class="timestamp-badge">
                        <Play size={12} /> 10:33 What to Expect
                    </a>
                </div>
                <p>
                    <strong>Konsisten setiap hari.</strong> Jangan harap durasi fokusmu akan instan melonjak dari 1 jam ke 4 jam hanya dalam 1 atau 2 hari.
                </p>
                <p>
                    Perkembangan ini hanya akan dirasakan jika kamu melihat gambaran yang lebih luas (zoom out). Kenaikan hanya hitungan menit setiap harinya, tapi setelah 3 atau 4 bulan, perubahannya sangat drastis. Dirimu di masa depan pasti akan berterima kasih!
                </p>
            </NoteSection>
        </div>
    </VideoSyncArticle>

    <NoteSection title="Glosarium">
        <div class="glossary-container">
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">State of Flow</span>
                    <span class="baby-trigger" data-tooltip="👶 Ibarat main game seru banget sampai lupa makan dan lupa waktu."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Kondisi mental di mana seseorang sepenuhnya tenggelam, fokus, dan menikmati proses aktivitas yang sedang dilakukan, biasanya terjadi ketika tingkat tantangan seimbang dengan tingkat kemampuan.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Willpower</span>
                    <span class="baby-trigger" data-tooltip="👶 Baterai 'niat' di otak kita. Kalau dipakai terus tanpa dicas, lama-lama habis."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Kapasitas tekad atau kemauan (motivasi internal) seseorang untuk memaksakan diri melakukan sesuatu. Sifatnya terbatas layaknya baterai yang bisa habis terkuras.</span>
            </div>
            <div class="glossary-item">
                <div class="term-wrapper">
                    <span class="glossary-term">Pomodoro Technique</span>
                    <span class="baby-trigger" data-tooltip="👶 Belajar sebentar, istirahat sebentar. Biar otak nggak meledak."><HelpCircle size={16} /></span>
                </div>
                <span class="glossary-definition">Metode manajemen waktu yang menggunakan timer untuk membagi waktu kerja menjadi interval (biasanya 25 menit) yang dipisahkan oleh istirahat singkat (5 menit).</span>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kuis Pemahaman">
        <Quiz questions={quizQuestions} title="Uji Pemahaman: Teknik Fokus" />
    </NoteSection>

    <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Proses" />
</article>

<VideoSidebar bind:this={videoSidebar} videoId="_hQm74PbME4" {chapters} />

<style>
    /* Styling tambahan untuk visual konsep dan Glosarium */
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
