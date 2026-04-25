<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
</script>

<svelte:head>
    <title>Pengantar AI - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pengantar Kecerdasan Buatan"
        date="24 April 2026"
        status="done"
        tags={["AI", "Dasar", "History"]}
    />

    <NoteSection title="Capaian Pembelajaran & Prasyarat">
        <div class="overview-grid">
            <div class="overview-card">
                <h3>Prasyarat Pengetahuan</h3>
                <ul>
                    <li>Matematika Diskrit</li>
                    <li>Probabilitas dan Statistika</li>
                    <li>Algoritma & Pemrograman Dasar</li>
                    <li>Logika Matematika</li>
                </ul>
            </div>
            <div class="overview-card highlight">
                <h3>Objektif Mata Kuliah</h3>
                <ol>
                    <li>Memahami konsep dasar dan definisi AI.</li>
                    <li>Mampu menjelaskan teknik AI (Searching, Reasoning, Learning).</li>
                    <li>Mampu mendesain, mengimplementasi, dan menganalisis solusi berbasis AI.</li>
                </ol>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Definisi AI (4 Kategori)">
        <p class="section-intro">
            Kecerdasan Buatan biasanya dikelompokkan menjadi 4 kotak besar. Kuncinya ada pada dua pertanyaan: 
            <em>Apakah fokusnya ke Cara Berpikir atau Cara Bertindak?</em> dan 
            <em>Apakah acuannya Manusia atau Rasionalitas (Logika Ideal)?</em>
        </p>
        
        <div class="def-grid">
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-brain" size={24} /></div>
                <h3>Thinking Humanly</h3>
                <p>Mencoba meniru proses kognitif otak manusia (misal: bagaimana kita belajar atau memecahkan masalah).</p>
                <span class="focus-tag">Model Kognitif</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-user" size={24} /></div>
                <h3>Acting Humanly</h3>
                <p>Tidak peduli cara kerjanya, yang penting hasilnya terlihat natural seperti manusia (Contoh: Chatbot yang asik diajak ngobrol).</p>
                <span class="focus-tag">Turing Test</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-scale" size={24} /></div>
                <h3>Thinking Rationally</h3>
                <p>Menggunakan hukum logika yang kaku. Jika A=B dan B=C, maka A=C. Fokus pada kebenaran logis.</p>
                <span class="focus-tag">Hukum Logika</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-bot" size={24} /></div>
                <h3>Acting Rationally</h3>
                <p>Melakukan tindakan yang memberikan hasil paling optimal (terbaik) sesuai tujuan, meski caranya tidak mirip manusia.</p>
                <span class="focus-tag">Rational Agent</span>
            </div>
        </div>

        <Callout type="tip">
            <strong>Analogi Gampang:</strong>
            <ul>
                <li><strong>Thinking Humanly:</strong> Bikin robot yang punya "otak" dan "perasaan" kayak manusia.</li>
                <li><strong>Acting Humanly:</strong> Bikin robot yang outputnya (omongan/gerakan) bisa menipu orang sehingga dikira manusia.</li>
                <li><strong>Thinking Rationally:</strong> Bikin sistem yang super pintar matematika dan logika tanpa celah.</li>
                <li><strong>Acting Rationally:</strong> Bikin sistem yang selalu ngambil keputusan paling menguntungkan/tercepat.</li>
            </ul>
        </Callout>
    </NoteSection>

    <NoteSection title="Deep Dive: Turing Test (Uji Turing)">
        <div class="turing-section">
            <div class="turing-header">
                <div class="turing-badge">Konsep 1950</div>
                <p>
                    Banyak yang bingung: <em>"Gimana caranya ngetes kecerdasan komputer di tahun 1950 pas belum ada ChatGPT?"</em>
                </p>
            </div>
            
            <div class="turing-grid">
                <div class="turing-box">
                    <h4>Apa Itu Turing Test?</h4>
                    <p>
                        Bayangkan ini seperti <strong>"Blind Taste Test"</strong> tapi untuk kecerdasan. Ada seorang penilai (interogator) yang dipisah tembok dengan dua subjek: <strong>Satu Manusia</strong> dan <strong>Satu Mesin</strong>.
                    </p>
                    <p>
                        Si penilai cuma bisa tanya-tanya lewat chat teks (teletype). Kalau setelah tanya jawab si penilai <strong>nggak bisa bedain</strong> mana yang manusia dan mana yang mesin, berarti mesin itu <strong>Lolos Turing Test</strong>.
                    </p>
                </div>
                <div class="turing-box">
                    <h4>Total Turing Test</h4>
                    <p>
                        Ini adalah versi "Advanced". Kalau Turing Test biasa cuma lewat teks, di <strong>Total Turing Test</strong> si penilai juga bisa ngasih objek fisik atau ngeliat gerakan si mesin lewat video.
                    </p>
                    <p>
                        Biar lolos uji ini, mesin nggak cuma butuh "otak" buat jawab chat, tapi juga butuh:
                    </p>
                    <ul class="sub-list">
                        <li><strong>Computer Vision:</strong> Buat "melihat" dan mengenali objek di depannya.</li>
                        <li><strong>Robotics:</strong> Buat bergerak dan memanipulasi benda fisik.</li>
                    </ul>
                </div>
            </div>

            <div class="turing-comparison">
                <div class="turing-box">
                    <h4>Kenapa Harus Lewat Teks (Standard)?</h4>
                    <p>
                        Alan Turing sengaja milih teks supaya kita nggak teralihkan sama penampilan fisik. Kalau mesinnya berbentuk robot cantik atau suaranya merdu, penilaian kita bakal bias. Turing mau ngetes <strong>otaknya</strong>, bukan fisiknya.
                    </p>
                </div>
            </div>

            <Callout type="info">
                <strong>Senjata yang Dibutuhkan Mesin:</strong>
                <p>Biar bisa "nipu" penilai dan dikira manusia, mesin minimal harus punya 4 skill ini:</p>
                <ul class="req-list">
                    <li><strong>NLP:</strong> Biar bisa ngobrol pake bahasa manusia yang luwes.</li>
                    <li><strong>Knowledge:</strong> Biar punya wawasan buat jawab pertanyaan.</li>
                    <li><strong>Reasoning:</strong> Biar bisa mikir dan narik kesimpulan dari obrolan.</li>
                    <li><strong>Learning:</strong> Biar bisa belajar hal baru selama ngobrol.</li>
                </ul>
            </Callout>

            <p class="turing-footer">
                <strong>Intinya:</strong> Turing Test bukan ngetes apakah jawabannya "bener" atau "pinter matematika", tapi apakah mesin itu bisa <strong>bertingkah (acting)</strong> semirip mungkin dengan manusia.
            </p>
        </div>
    </NoteSection>

    <NoteSection title="Teknik AI Utama (Scope Kuliah)">
        <p>Mata kuliah ini berfokus pada tiga pilar utama teknik AI:</p>
        <div class="tech-grid">
            <div class="tech-item">
                <strong>Searching</strong>
                <p>A* Search, Simulated Annealing, Genetic Algorithm (GA)</p>
            </div>
            <div class="tech-item">
                <strong>Reasoning</strong>
                <p>Fuzzy Logic (Mamdani & Sugeno)</p>
            </div>
            <div class="tech-item">
                <strong>Learning</strong>
                <p>ID3, k-Nearest Neighbors (k-NN), Naïve Bayes</p>
            </div>
        </div>
        <Callout type="info">
            <strong>Planning</strong> merupakan salah satu pilar AI, namun tidak dibahas dalam kurikulum mata kuliah ini.
        </Callout>
    </NoteSection>

    <NoteSection title="Sejarah Singkat AI (Evolusi & AI Winter)">
        <div class="timeline">
            <div class="timeline-item">
                <span class="year">1951</span>
                <strong>Awal Mula: UNIVAC I</strong>
                <p>Komputer digital pertama untuk bisnis, berhasil memprediksi pemilu AS 1952 secara akurat.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1952 - 1969</span>
                <strong>Early Development (Era Keemasan Awal)</strong>
                <p>
                    • 1956: <strong>Dartmouth Conference</strong>. Istilah <em>"Artificial Intelligence"</em> resmi dicetuskan oleh <strong>John McCarthy</strong>.<br/>
                    • General Problem Solver (Newell & Simon).<br/>
                    • 1958: <strong>LISP</strong> dikembangkan oleh McCarthy sebagai bahasa pemrograman khusus AI.<br/>
                    • Mark I Perceptron (Rosenblatt) dan ELIZA chatbot.<br/>
                    • 1968: Hype AI lewat film <em>2001: A Space Odyssey</em>.
                </p>
            </div>
            <div class="timeline-item winter">
                <span class="year">1966 - 1974</span>
                <strong>1st AI Winter (Perkembangan Lambat)</strong>
                <p>Keterbatasan struktur dasar dan kegagalan pada masalah kompleks menyebabkan penghentian pendanaan besar-besaran.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1969 - 1979</span>
                <strong>Knowledge-based Systems</strong>
                <p>Era dominasi sistem berbasis pengetahuan dan logika formal.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1980 - 1988</span>
                <strong>Era Industri & Expert Systems</strong>
                <p>AI masuk industri (robot pabrik, sistem pakar). 1986: Kembalinya Jaringan Syaraf Tiruan lewat algoritma <strong>Back-Propagation</strong>.</p>
            </div>
            <div class="timeline-item winter">
                <span class="year">1990-an</span>
                <strong>2nd AI Winter & Era Ekstraksi Fitur</strong>
                <p>Keterbatasan data, daya komputasi, dan munculnya masalah <strong>Vanishing Gradient</strong>. Fokus bergeser ke teknik ekstraksi fitur manual.</p>
            </div>
            <div class="timeline-item highlight">
                <span class="year">2006 - Sekarang</span>
                <strong>Revolusi Deep Learning & AI Boom</strong>
                <p>
                    • 2006: Geoff Hinton mengoptimalkan Deep Learning (AutoEncoder, RBM).<br/>
                    • 2011: IBM Watson menang Jeopardy.<br/>
                    • 2015: AI mengalahkan akurasi manusia di ImageNet.<br/>
                    • 2016: AlphaGo mengalahkan Master Go.<br/>
                    • 2017-2019: AI menang di Poker pro dan OpenAI Dota 2.<br/>
                    • 2018: Lukisan AI terjual senilai <strong>$432,000</strong>.
                </p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Aplikasi AI Modern">
        <div class="app-grid">
            <div class="app-category">
                <h4>Visi & Persepsi</h4>
                <ul>
                    <li>Visual Recognition</li>
                    <li>Face & Fingerprint Detection</li>
                    <li>Image Captioning</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Bahasa & Teks</h4>
                <ul>
                    <li>Speech Recognition</li>
                    <li>Text Summarization</li>
                    <li>Real-time Translation</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Otomatisasi</h4>
                <ul>
                    <li>Self-driving Cars</li>
                    <li>Navigation Systems</li>
                    <li>Smart Home Systems</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Kreativitas & Game</h4>
                <ul>
                    <li>Game NPC AI</li>
                    <li>AI Art (GAN, Deep Dream)</li>
                    <li>Music Composition (AIVA)</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Masa Depan AI">
        <div class="future-box">
            <p>"AI is the new electricity."</p>
            <div class="analogy-grid">
                <div class="analogy-item">
                    <span>Data</span>
                    <strong>The New Oil</strong>
                </div>
                <div class="analogy-item">
                    <span>Machine Learning</span>
                    <strong>The Combustion Engine</strong>
                </div>
                <div class="analogy-item">
                    <span>Computing</span>
                    <strong>Becoming Free</strong>
                </div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Referensi Utama">
        <div class="ref-list">
            <p>• Suyanto. 2007. <em>Introduction to Artificial Intelligence: Searching, Reasoning, Planning and Learning</em>.</p>
            <p>• Russel, Stuart and Norvig, Peter. 1995. <em>Artificial Intelligence: A Modern Approach</em>.</p>
            <p>• Suyanto. 2018. <em>Machine Learning: Tingkat Dasar dan Lanjut</em>.</p>
        </div>
    </NoteSection>

    <NoteSection title="Uji Pemahaman">
        <Quiz 
            title="Kuis Dasar AI"
            questions={[
                {
                    question: "Sebuah chatbot yang dirancang untuk memberikan jawaban yang secara logis benar dan optimal dalam setiap situasi, tanpa harus meniru cara manusia berpikir, masuk ke dalam kategori...",
                    options: ["Thinking Humanly", "Thinking Rationally", "Acting Humanly", "Acting Rationally"],
                    correctIndex: 3,
                    explanation: "Fokus pada pencapaian hasil terbaik (optimal) adalah ciri dari 'Acting Rationally' atau pendekatan Rational Agent."
                },
                {
                    question: "Manakah dari komponen berikut yang merupakan syarat mutlak agar sebuah mesin dapat lolos Turing Test standar (bukan Total Turing Test)?",
                    options: ["Computer Vision", "Robotics", "Automated Reasoning", "Speech Synthesis"],
                    correctIndex: 2,
                    explanation: "Automated Reasoning diperlukan untuk menggunakan informasi yang disimpan guna menjawab pertanyaan dan menarik kesimpulan dalam percakapan."
                },
                {
                    question: "Apa penyebab utama terjadinya AI Winter pertama pada periode 1966-1974?",
                    options: ["Munculnya masalah 'vanishing gradient'", "Kurangnya ketersediaan Big Data", "Keterbatasan daya komputasi dan kegagalan pada masalah kompleks", "Ditemukannya algoritma Back-propagation yang rumit"],
                    correctIndex: 2,
                    explanation: "AI Winter pertama dipicu oleh keterbatasan struktur dasar dan kegagalan program AI saat menghadapi masalah dunia nyata yang kompleks."
                },
                {
                    question: "Jika Anda membangun sistem rekomendasi film berdasarkan pola perilaku pengguna, teknik AI manakah yang paling relevan digunakan?",
                    options: ["Searching", "Reasoning", "Learning", "Planning"],
                    correctIndex: 2,
                    explanation: "Sistem rekomendasi membutuhkan kemampuan untuk mengenali pola dari data masa lalu, yang merupakan domain utama dari Machine Learning."
                },
                {
                    question: "Mengapa tahun 2006 dianggap sebagai titik balik kembalinya Neural Networks setelah era 'AI Winter' kedua?",
                    options: ["Kemenangan IBM Watson di Jeopardy", "Optimasi Deep Learning oleh Geoff Hinton", "Keberhasilan AlphaGo mengalahkan Lee Sedol", "Munculnya internet berkecepatan tinggi"],
                    correctIndex: 1,
                    explanation: "Geoff Hinton memperkenalkan metode optimasi lapis-demi-lapis yang memicu revolusi Deep Learning modern."
                },
                {
                    question: "Pendekatan AI yang mencoba meniru proses kognitif manusia melalui eksperimen psikologis atau introspeksi disebut...",
                    options: ["Thinking Humanly", "Thinking Rationally", "Acting Humanly", "Acting Rationally"],
                    correctIndex: 0,
                    explanation: "Thinking Humanly berfokus pada pemodelan kognitif dan bagaimana manusia sebenarnya berpikir di dalam otak."
                },
                {
                    question: "Apa hambatan utama dalam pendekatan 'Thinking Rationally' (Hukum Logika) saat diterapkan pada dunia nyata?",
                    options: ["Komputer tidak bisa menjalankan logika", "Sulit menyatakan pengetahuan informal dalam notasi logika formal", "Logika tidak bisa digunakan untuk matematika", "Membutuhkan sensor fisik"],
                    correctIndex: 1,
                    explanation: "Banyak pengetahuan dunia nyata bersifat tidak pasti atau sulit diformalkan ke dalam simbol logika yang kaku."
                },
                {
                    question: "Dalam variasi 'Total Turing Test', mesin harus memiliki dua kemampuan fisik tambahan yaitu...",
                    options: ["Audio & Video", "Computer Vision & Robotics", "Database & Server", "Touchscreen & Sensor"],
                    correctIndex: 1,
                    explanation: "Total Turing Test mencakup interaksi fisik dengan dunia, sehingga membutuhkan penglihatan komputer dan penggerak robotik."
                },
                {
                    question: "Istilah 'Artificial Intelligence' pertama kali diperkenalkan secara resmi pada konferensi di tahun 1956. Siapa tokoh utamanya?",
                    options: ["Alan Turing", "John McCarthy", "Geoff Hinton", "Elon Musk"],
                    correctIndex: 1,
                    explanation: "John McCarthy mengusulkan istilah tersebut pada Konferensi Dartmouth tahun 1956 yang menjadi titik lahirnya AI sebagai bidang ilmu."
                },
                {
                    question: "Teknik AI yang digunakan untuk menemukan urutan aksi terbaik guna mencapai target (misal jalur terpendek di peta) adalah...",
                    options: ["Searching", "Reasoning", "Learning", "Perception"],
                    correctIndex: 0,
                    explanation: "Searching adalah teknik fundamental untuk mencari solusi melalui eksplorasi ruang keadaan (state space)."
                },
                {
                    question: "Program ELIZA (1966) sering disebut sebagai chatbot pertama. Teknik apa yang sebenarnya ia gunakan?",
                    options: ["Deep Learning", "Pattern Matching (Pencocokan Pola)", "Neural Networks", "Reinforcement Learning"],
                    correctIndex: 1,
                    explanation: "ELIZA tidak memiliki 'pemahaman'. Ia hanya mencocokkan kata kunci dari input pengguna untuk memberikan jawaban template."
                },
                {
                    question: "Apa yang dimaksud dengan 'AI Winter' dalam sejarah perkembangan kecerdasan buatan?",
                    options: ["Musim dingin di laboratorium AI", "Periode di mana dana dan minat terhadap riset AI menurun drastis", "Penemuan komputer super cepat", "Penggunaan AI untuk memprediksi cuaca"],
                    correctIndex: 1,
                    explanation: "AI Winter terjadi ketika janji-janji AI tidak terpenuhi, sehingga investor dan pemerintah menarik dukungan dana mereka."
                },
                {
                    question: "Bahasa pemrograman LISP dikembangkan oleh John McCarthy (1958) karena sangat cocok untuk AI. Apa kelebihannya?",
                    options: ["Sangat cepat untuk grafis", "Kemampuan manipulasi simbolik yang kuat", "Bisa berjalan di smartphone", "Otomatis memperbaiki hardware"],
                    correctIndex: 1,
                    explanation: "LISP dirancang untuk pemrosesan simbolik yang merupakan inti dari AI klasik (Good Old Fashioned AI)."
                },
                {
                    question: "Pilar AI manakah yang disebutkan dalam referensi materi sebagai bagian yang TIDAK dibahas secara mendalam dalam kuliah ini?",
                    options: ["Searching", "Reasoning", "Learning", "Planning"],
                    correctIndex: 3,
                    explanation: "Berdasarkan agenda kuliah, pilar 'Planning' (perencanaan) tidak masuk dalam cakupan pembahasan kurikulum ini."
                },
                {
                    question: "Apa maksud dari pernyataan Andrew Ng bahwa 'AI is the new electricity'?",
                    options: ["AI membutuhkan banyak listrik", "AI akan mentransformasi setiap industri seperti halnya listrik di masa lalu", "AI hanya bisa menyala jika ada listrik", "AI adalah pengganti PLN"],
                    correctIndex: 1,
                    explanation: "Maksudnya adalah AI akan menjadi teknologi dasar yang mengubah cara kerja hampir semua sektor industri di masa depan."
                }
            ]}
        />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .section-intro {
        margin-bottom: 1.5rem;
        color: var(--color-ink-soft);
    }

    .overview-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }
    .overview-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
    }
    .overview-card.highlight {
        border-color: var(--color-binder);
        background: rgba(var(--color-binder-rgb), 0.05);
    }
    .overview-card h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: var(--color-binder);
    }
    .overview-card ul, .overview-card ol {
        margin: 0;
        padding-left: 1.25rem;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .def-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.25rem;
        margin: 1.5rem 0;
    }
    .def-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 20px;
        border: 1px solid var(--color-line);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        position: relative;
        overflow: hidden;
    }
    .def-card:hover {
        transform: translateY(-5px);
        border-color: var(--color-binder);
        box-shadow: 0 10px 30px -10px rgba(var(--color-binder-rgb), 0.2);
    }
    .card-icon {
        color: var(--color-binder);
        margin-bottom: 0.25rem;
    }
    .def-card h3 {
        font-size: 1.05rem;
        font-weight: 700;
        margin: 0;
        color: var(--color-binder);
    }
    .def-card p {
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-ink-soft);
    }
    .focus-tag {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-binder);
        opacity: 0.8;
        margin-top: auto;
    }

    .turing-detail {
        font-size: 0.75rem;
        line-height: 1.4;
        background: rgba(var(--color-binder-rgb), 0.08);
        padding: 0.75rem;
        border-radius: 8px;
        color: var(--color-ink-soft);
        border-left: 3px solid var(--color-binder);
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .tech-item {
        background: var(--color-surface-elevated);
        padding: 1rem;
        border-radius: 12px;
        border-left: 4px solid var(--color-binder);
    }
    .tech-item strong {
        display: block;
        margin-bottom: 0.25rem;
    }
    .tech-item p {
        font-size: 0.85rem;
        margin: 0;
        color: var(--color-ink-soft);
    }

    .timeline {
        border-left: 2px solid var(--color-line);
        padding-left: 2rem;
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .timeline-item {
        position: relative;
    }
    .timeline-item::before {
        content: "";
        position: absolute;
        left: -2.45rem;
        top: 0.5rem;
        width: 14px;
        height: 14px;
        background: var(--color-surface);
        border: 2px solid var(--color-binder);
        border-radius: 50%;
        z-index: 1;
    }
    .timeline-item.winter::before {
        border-color: #3b82f6;
    }
    .timeline-item.winter strong {
        color: #3b82f6;
    }
    .year {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        background: var(--color-line);
        padding: 2px 8px;
        border-radius: 10px;
        margin-bottom: 0.5rem;
    }
    .timeline-item strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    .timeline-item p {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--color-ink-soft);
        margin: 0;
    }

    .app-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin: 1.5rem 0;
    }
    .app-category h4 {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-binder);
        margin-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-line);
        padding-bottom: 0.5rem;
    }
    .app-category ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .app-category li {
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .app-category li::before {
        content: "•";
        color: var(--color-binder);
    }

    .future-box {
        background: linear-gradient(135deg, var(--color-binder), #6366f1);
        color: white;
        padding: 2.5rem;
        border-radius: 24px;
        text-align: center;
        margin: 1.5rem 0;
    }
    .future-box p {
        font-size: 1.8rem;
        font-weight: 800;
        font-style: italic;
        margin-bottom: 2rem;
    }
    .analogy-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    .analogy-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.25rem;
        border-radius: 16px;
        backdrop-filter: blur(10px);
    }
    .analogy-item span {
        display: block;
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 0.25rem;
    }
    .analogy-item strong {
        font-size: 1rem;
    }

    .ref-list {
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        line-height: 1.6;
    }
    .ref-list p {
        margin-bottom: 0.5rem;
    }

    .turing-section {
        background: var(--color-surface-soft);
        padding: 2rem;
        border-radius: 20px;
        border: 1px solid var(--color-line);
    }
    .turing-header {
        margin-bottom: 1.5rem;
    }
    .turing-badge {
        display: inline-block;
        background: var(--color-binder);
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        margin-bottom: 1rem;
    }
    .turing-header p {
        font-size: 1.1rem;
        font-style: italic;
        color: var(--color-ink-soft);
        line-height: 1.5;
    }
    .turing-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .turing-box {
        background: var(--color-surface);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .turing-box h4 {
        margin-bottom: 0.75rem;
        color: var(--color-binder);
    }
    .turing-box p {
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .sub-list {
        margin: 0.75rem 0 0 0;
        padding-left: 1.25rem;
        font-size: 0.85rem;
        color: var(--color-ink-soft);
    }
    .sub-list li {
        margin-bottom: 0.4rem;
    }
    .turing-comparison {
        margin-top: 1.5rem;
    }
    .req-list {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
    }
    .req-list li {
        font-size: 0.85rem;
        background: rgba(var(--color-binder-rgb), 0.1);
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        border-left: 3px solid var(--color-binder);
    }
    .turing-footer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        text-align: center;
        border-top: 1px solid var(--color-line);
        padding-top: 1rem;
    }

    @media (max-width: 768px) {
        .overview-grid, .tech-grid, .analogy-grid, .turing-grid, .req-list {
            grid-template-columns: 1fr;
        }
    }
</style>
