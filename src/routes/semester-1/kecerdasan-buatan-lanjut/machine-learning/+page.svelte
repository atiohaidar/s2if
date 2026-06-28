<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const quizQuestions = [
        {
            question: "Berdasarkan definisi formal Tom Mitchell, jika sebuah program catur belajar meningkatkan persentase kemenangan bermainnya dengan terus bermain melawan dirinya sendiri, manakah yang bertindak sebagai Task (T)?",
            options: [
                "Persentase kemenangan game yang diperoleh.",
                "Bermain game catur.",
                "Kumpulan game latihan melawan diri sendiri.",
                "Algoritma pencarian minimax."
            ],
            correctIndex: 1,
            explanation: "Task (T) adalah tugas atau aktivitas yang ingin diselesaikan oleh program, yaitu bermain game catur. Persentase kemenangan adalah Performance (P), dan game latihan adalah Experience (E)."
        },
        {
            question: "Mengapa analisis data menjadi kunci penting di era modern saat ini?",
            options: [
                "Karena sensor data sangat mahal untuk dipasang.",
                "Karena data sangat mudah dikumpulkan, disimpan, dan ditransmisikan, sehingga ekstraksi manfaat memerlukan analisis.",
                "Karena pemrograman tradisional tidak memerlukan data input.",
                "Karena internet membatasi kapasitas penyimpanan data."
            ],
            correctIndex: 1,
            explanation: "Di era saat ini, biaya pengumpulan, penyimpanan, dan transmisi data sangat murah. Tantangannya adalah bagaimana mengambil keuntungan dari data tersebut, sehingga analisis data menjadi kunci."
        }
    ];
</script>

<svelte:head>
    <title>Machine Learning - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Machine Learning"
        date="17 April 2026"
        status="done"
        tags={["ML", "Supervised", "Unsupervised"]}
    />

    <NoteSection title="1. Apa Itu Machine Learning?">
        <p>
            <strong>Machine Learning (ML)</strong> adalah bidang studi yang memberikan kemampuan pada komputer untuk belajar tanpa diprogram secara eksplisit.
        </p>
        <p>Secara bahasa:</p>
        <ul>
            <li><strong>Machine:</strong> Merujuk pada komputer atau program komputer.</li>
            <li><strong>Learning:</strong> Meningkatkan performa (performance) pada tugas (task) tertentu berdasarkan pengalaman (experience) atau contoh data.</li>
        </ul>
        <p>
            <strong>Masalah Pemrograman Tradisional:</strong> Sangat sulit menulis program manual untuk memecahkan masalah kompleks seperti mengenali objek 3 dimensi. Kita tidak tahu persis bagaimana otak kita melakukannya (sehingga kita tidak tahu apa yang harus ditulis), dan kalaupun kita tahu, programnya akan menjadi sangat rumit.
        </p>
        <p>
            <strong>Solusi Machine Learning:</strong> Alih-alih programmer menulis aturan (rules) kaku secara manual, kita mengumpulkan banyak contoh data yang mencantumkan output yang benar untuk setiap input. Programmer kemudian memprogram komputer mengenai *cara belajar dari contoh* tersebut. Program hasil bentukan ML seringkali sangat berbeda dari kode buatan manusia, dan dalam banyak kasus komputer bisa menjadi jauh lebih hebat pada tugas tersebut dibanding programmernya sendiri! Secara ekonomi, komputasi masif saat ini jauh lebih murah daripada membayar manusia untuk menulis kode aturan spesifik secara manual.
        </p>

        <Callout type="tip" title="Definisi Formal oleh Tom Mitchell (1997)">
            <p>
                Sebuah program komputer dikatakan belajar dari pengalaman <strong>E</strong> (<em>Experience</em>) berkaitan dengan kelas tugas <strong>T</strong> (<em>Task</em>) dan pengukuran kinerja <strong>P</strong> (<em>Performance</em>), jika kinerjanya pada tugas-tugas di <strong>T</strong>, sebagaimana diukur oleh <strong>P</strong>, meningkat dengan adanya pengalaman <strong>E</strong>.
            </p>
        </Callout>

        <p><strong>Studi Kasus Permainan Checkers (Arthur Samuel, 50-an & 60-an):</strong></p>
        <ul>
            <li><strong>Task T:</strong> Bermain game checkers.</li>
            <li><strong>Performance P:</strong> Persentase permainan checkers yang dimenangkan melawan musuh.</li>
            <li><strong>Experience E:</strong> Bermain game latihan melawan dirinya sendiri (thousands of times) untuk mempelajari posisi mana yang baik dan buruk.</li>
        </ul>
    </NoteSection>

    <NoteSection title="2. Pemrograman Tradisional vs Machine Learning">
        <p>
            Perbedaan mendasar terletak pada apa yang dimasukkan ke dalam sistem dan apa hasil akhirnya:
        </p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Aspek</th>
                        <th>Pemrograman Tradisional</th>
                        <th>Machine Learning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Input</strong></td>
                        <td>Data + Aturan (Rules) tertulis</td>
                        <td>Data + Contoh Output (Labels/Experience)</td>
                    </tr>
                    <tr>
                        <td><strong>Proses</strong></td>
                        <td>Komputer mengeksekusi aturan pada data</td>
                        <td>Komputer mencari pola aturan secara mandiri</td>
                    </tr>
                    <tr>
                        <td><strong>Output</strong></td>
                        <td>Jawaban / Hasil</td>
                        <td>Model / Aturan Pembelajaran baru</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </NoteSection>

    <NoteSection title="3. Relevansi ML di Era Modern (Availability of Data)">
        <p>
            Mengapa Machine Learning berkembang sangat pesat belakangan ini?
        </p>
        <ul>
            <li><strong>Mudah mengumpulkan data:</strong> Sensor menjadi sangat murah, dan hampir seluruh informasi saat ini tersimpan dalam bentuk digital.</li>
            <li><strong>Mudah menyimpan data:</strong> Kapasitas hard drive sangat besar dan harganya semakin murah.</li>
            <li><strong>Mudah mentransmisikan data:</strong> Pengiriman data melalui internet hampir tidak berbayar (essentially free).</li>
        </ul>
        <p>
            <strong>Bottom Line:</strong> Karena data melimpah ruah, **analisis data (data analysis)** menjadi kunci utama untuk mengekstrak manfaat dari data tersebut.
        </p>
    </NoteSection>

    <NoteSection title="4. Taksonomi Machine Learning">
        <p>
            Secara konseptual, hubungan kecerdasan buatan dapat dimodelkan sebagai berikut:
        </p>
        <div class="visual-concept-card" style="background: var(--color-surface-elevated); padding: 1.25rem; border: 1px solid var(--color-line); border-radius: 8px;">
            <p><strong>Hierarki Kecerdasan Buatan:</strong></p>
            <code>Artificial Intelligence (AI) ⊃ Machine Learning (e.g. Logistic Regression) ⊃ Representation Learning (e.g. Shallow Autoencoders) ⊃ Deep Learning (e.g. MLPs)</code>
        </div>
        <p>
            <strong>Paradigma Pembelajaran Utama:</strong>
        </p>
        <ul>
            <li>
                <strong>Supervised Learning:</strong> Kita memiliki dataset yang sudah dilengkapi dengan nilai target (label yang ingin diprediksi). Model mempelajari fungsi pemetaan dari fitur input ke target. Memiliki 2 jenis:
                <ul>
                    <li><strong>Classification:</strong> Output yang diprediksi berupa label kategorikal (kelas).</li>
                    <li><strong>Regression:</strong> Output yang diprediksi berupa nilai numerik kontinu.</li>
                </ul>
            </li>
            <li>
                <strong>Unsupervised Learning:</strong> Kita memiliki dataset tanpa target nilai. Tugas model adalah menemukan struktur tersembunyi atau representasi internal yang baik dari data (e.g., clustering, density estimation, noise reduction).
            </li>
            <li>
                <strong>Semi-Supervised Learning:</strong> Menggabungkan sedikit data berlabel dengan banyak data tidak berlabel untuk menghemat biaya pelabelan manual.
            </li>
            <li>
                <strong>Reinforcement Learning:</strong> Agen belajar memilih aksi untuk memaksimalkan payoff (hadiah masa depan). Fungsi reward dan penalty memberi tahu seberapa baik suatu state/action. Keputusan saat ini mempengaruhi opsi keputusan di masa depan.
            </li>
            <li>
                <strong>Ensembles Method:</strong> Menggabungkan beberapa model dasar untuk memperoleh performansi prediksi yang lebih tinggi dibandingkan jika model digunakan sendiri-sendiri.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="5. Contoh Penerapan Riil & Perbandingan Tradisional">
        <ul>
            <li>
                <strong>Tic-Tac-Toe:</strong>
                <ul>
                    <li><em>Option A (Tradisional):</em> Menulis aturan manual (misal: "jika musuh punya 2 garis miring, taruh disitu"). Sangat melelahkan dan tidak scalable.</li>
                    <li><em>Option B:</em> Menelusuri seluruh game tree secara optimal menggunakan heuristik pemotongan pohon.</li>
                    <li><em>Option C (ML):</em> Membiarkan komputer mencoba berbagai strategi dengan bermain melawan dirinya sendiri dan mencatat mana yang menang/kalah.</li>
                </ul>
            </li>
            <li>
                <strong>Spam Filtering:</strong> Tradisional menggunakan kata statis seperti "viagra" (sulit dan tidak adaptif terhadap taktik spammer). ML melatih model berdasarkan email yang ditandai pengguna sebagai spam/legit secara otomatis.
            </li>
            <li>
                <strong>Prediction of Search Queries:</strong> Tradisional menyediakan kamus statis (kata berubah seiring waktu!). ML menggunakan query pencarian sebelumnya sebagai contoh latihan.
            </li>
            <li>
                <strong>Credit Card Fraud:</strong> Mempelajari pola normal transaksi pelanggan secara dinamis untuk mendeteksi transaksi yang "tidak lazim".
            </li>
            <li>
                <strong>Character Recognition:</strong> Pengurutan surat otomatis berdasarkan digit angka tulisan tangan pada amplop, dan digitalisasi koran/buku lama.
            </li>
            <li>
                <strong>Face Recognition:</strong> Tradisional menulis aturan fisik seperti "jika rambut pendek dan hidung besar" (mustahil mengukur ukuran hidung secara eksak!). ML melatih komputer dengan ribuan pasangan gambar-nama agar model mencari fitur pembeda sendiri.
            </li>
            <li>
                <strong>Self-driving Cars:</strong> Memproses data sensor (kamera, radar) yang superior dibanding mata manusia agar komputer bereaksi tepat.
            </li>
            <li>
                <strong>Social Media Analysis:</strong> Mencari berita breaking news, mendeteksi wabah penyakit menular, melacak sentimen konsumen terhadap produk, dan merekomendasikan teman/followers.
            </li>
            <li>
                <strong>Machine Translation & Speech:</strong> Menggunakan statistical machine translation berbasis data contoh, text-to-speech, dan asisten pintar (e.g., Google Duplex).
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="6. Milestone Penting AI & ML">
        <p>
            Bukti nyata kehebatan Machine Learning:
        </p>
        <div class="timeline">
            <ul>
                <li><strong>[2011] IBM Watson:</strong> Mengalahkan 2 juara bertahan kuis Jeopardy!.</li>
                <li><strong>[2015-2018] ImageNet Challenge:</strong> Jaringan saraf tiruan melampaui akurasi manusia dalam klasifikasi visual 1000 kelas objek.</li>
                <li><strong>[2016] AlphaGo (DeepMind):</strong> Mengalahkan pemain pro 9-dan Lee Sedol dengan skor 4-1 menggunakan data latih 100.000 game manusia.</li>
                <li><strong>[2017] AlphaGo Zero:</strong> Belajar catur Go sepenuhnya dari nol (*learning from scratch*) hanya dengan bermain melawan dirinya sendiri lewat Reinforcement Learning, mengalahkan versi AlphaGo sebelumnya dan menang 2-1 vs Ke Jie (pemain no 1 dunia saat itu).</li>
                <li><strong>[2017] Libratus / DeepBlue:</strong> Mengalahkan pemain profesional poker.</li>
                <li><strong>[2017] OpenAI Dota 2 Bot:</strong> Mengalahkan pemain pro 1v1 Dota 2.</li>
                <li><strong>[2018] AI Art:</strong> Lukisan potret buatan AI terjual $432,000 di lelang Christie's.</li>
                <li><strong>[2018] Video-to-Video Synthesis:</strong> Pembangkitan video sintetik realistik dari peta semantik.</li>
            </ul>
        </div>
    </NoteSection>

    <NoteSection title="7. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
