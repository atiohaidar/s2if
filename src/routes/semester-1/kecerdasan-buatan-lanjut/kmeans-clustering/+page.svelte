<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const euclideanFormula = String.raw`d(x_i, c_j) = \|x_i - c_j\| = \sqrt{\sum_{k=1}^d (x_{ik} - c_{jk})^2}`;
    const centroidFormula = String.raw`c_j = rac{1}{|S_j|} \sum_{x_i \in S_j} x_i`;
    const sseFormula = String.raw`SSE = \sum_{j=1}^K \sum_{x_i \in S_j} \|x_i - c_j\|^2`;
    const silhouetteFormula = String.raw`s_i = rac{b_i - a_i}{\max(a_i, b_i)}`;
    
    const cohesionSymbol = String.raw`a_i`;
    const separationSymbol = String.raw`b_i`;
    const kSymbol = String.raw`K`;

    const quizQuestions = [
        {
            question: "Manakah yang merupakan kelemahan utama dari algoritma K-Means Clustering?",
            options: [
                "Sangat lambat untuk data berdimensi rendah.",
                "Menghasilkan cluster yang tumpang tindih (soft clustering).",
                "Sangat sensitif terhadap pemilihan inisialisasi centroid awal dan outliers.",
                "Tidak memerlukan penentuan nilai K di awal."
            ],
            correctIndex: 2,
            explanation: "K-Means sangat bergantung pada inisialisasi centroid awal (dapat terjebak di local optima) dan sangat sensitif terhadap noise/outliers karena update centroid didasarkan pada nilai rata-rata (mean)."
        },
        {
            question: "Apa arti dari nilai Silhouette Coefficient yang mendekati +1 bagi suatu titik data?",
            options: [
                "Titik data berada di perbatasan antar kluster yang membingungkan.",
                "Titik data tersebut sangat cocok dengan klusternya sendiri dan jauh dari kluster tetangga terdekat.",
                "Titik data tersebut diklasifikasikan ke kluster yang salah.",
                "Kluster yang terbentuk memiliki bentuk non-convex."
            ],
            correctIndex: 1,
            explanation: "Nilai Silhouette Coefficient berkisar dari -1 hingga +1. Nilai mendekati +1 berarti jarak ke kluster sendiri sangat kecil (cohesion tinggi) dan jarak ke kluster lain terdekat sangat besar (separation tinggi)."
        }
    ];
</script>

<svelte:head>
    <title>K-Means Clustering - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="K-Means Clustering"
        date="24 April 2026"
        status="done"
        tags={["Unsupervised", "Clustering", "K-Means"]}
    />

    <NoteSection title="1. Pendahuluan & Motivasi">
        <p>
            <strong>Supervised vs Unsupervised Learning:</strong> Pada supervised, kita memiliki target label dan mencari fungsi pemetaan data ke label tersebut. Pada unsupervised, kita hanya memiliki data tidak berlabel dan bertujuan mengeksplorasi struktur internal data tanpa melakukan prediksi nilai target spesifik.
        </p>
        <p>
            <strong>Clustering (Analisis Kluster):</strong> Adalah proses mengelompokkan sekumpulan objek data ke dalam kelas-kelas objek yang serupa (cluster).
        </p>
        <ul>
            <li><strong>Intra-class similarity:</strong> Objek dalam satu kluster harus sangat mirip (cohesion tinggi).</li>
            <li><strong>Inter-class similarity:</strong> Objek dari kluster yang berbeda harus sangat tidak mirip (separation tinggi).</li>
        </ul>
        <p>
            Analisis kluster membantu menjawab pertanyaan: Berapa sub-populasi yang ada? Berapa ukuran tiap sub-populasi? Apakah anggotanya berbagi sifat bersama? Apakah klusternya padat atau bisa dipecah lagi? Apakah ada data pencilan (outliers)?
        </p>
        <p>
            <strong>Pertanyaan Desain:</strong> Berapa banyak kluster yang ada? Apa kriteria kluster yang baik? Bagaimana cara melakukan pengelompokan secara matematis?
        </p>
    </NoteSection>

    <NoteSection title="2. Klasifikasi Tipe Clustering">
        <ul>
            <li>
                <strong>Hierarchical (Connectivity-based):</strong> Mengasumsikan objek lebih dekat hubungannya dengan tetangga terdekat dibanding objek yang jauh. Data disusun dalam pohon (dendrogram). Setiap pemotongan garis horizontal pada dendrogram merepresentasikan suatu partitional clustering.
            </li>
            <li>
                <strong>Partitional (Centroid-based):</strong> Setiap kluster diwakili oleh sebuah pusat (centroid) berdasarkan pengukuran kedekatan. Nilai K dan metrik jarak ditentukan di awal oleh pengguna.
            </li>
            <li>
                <strong>Tipe lain:</strong> Distribution-based, Density-based, dll.
            </li>
        </ul>

        <p><strong>Kriteria Pengelompokan (Grouping Criteria):</strong></p>
        <ul>
            <li><strong>Monothetic:</strong> Objek dikelompokkan berdasarkan satu atribut tunggal yang sama.</li>
            <li><strong>Polythetic:</strong> Objek dikelompokkan berdasarkan kemiripan multivariat keseluruhan (jarak).</li>
        </ul>

        <p><strong>Kriteria Overlap:</strong></p>
        <ul>
            <li><strong>Hard Clustering:</strong> Setiap titik data dimasukkan ke tepat satu kluster.</li>
            <li><strong>Soft Clustering:</strong> Setiap titik data memiliki probabilitas keanggotaan di setiap kluster.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Perbandingan Algoritma Kluster Utama">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Algoritma</th>
                        <th>Kriteria Grouping</th>
                        <th>Tipe Arsitektur</th>
                        <th>Kriteria Overlap</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>K-Means</strong></td>
                        <td>Polythetic</td>
                        <td>Partitional</td>
                        <td>Hard Clustering</td>
                    </tr>
                    <tr>
                        <td><strong>Agglomerative</strong></td>
                        <td>Monothetic</td>
                        <td>Hierarchical</td>
                        <td>Hard Clustering</td>
                    </tr>
                    <tr>
                        <td><strong>EM Clustering</strong></td>
                        <td>Polythetic</td>
                        <td>Partitional</td>
                        <td>Soft Clustering</td>
                    </tr>
                    <tr>
                        <td><strong>Fuzzy C-Means</strong></td>
                        <td>Polythetic</td>
                        <td>Partitional</td>
                        <td>Soft Clustering</td>
                    </tr>
                    <tr>
                        <td><strong>K-D Trees</strong></td>
                        <td>Monothetic</td>
                        <td>Hierarchical</td>
                        <td>Hard Clustering</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            <strong>Aplikasi Penggunaan:</strong> Pengenalan kelas data tersembunyi, reduksi dimensi, pewarnaan graf (graph coloring), segmentasi gambar berbasis warna, analisis jaringan sosial, dan segmentasi pasar.
        </p>
    </NoteSection>

    <NoteSection title="4. Algoritma K-Means & Langkah Detail">
        <p>
            K-Means adalah algoritma partitional, polythetic, dan hard clustering yang membagi data menjadi sejumlah <MathBlock latex={kSymbol} displayMode={false} /> kluster.
        </p>
        <p><strong>Langkah Kerja Algoritma:</strong></p>
        <ol>
            <li>Tentukan jumlah kluster K.</li>
            <li>Inisialisasi K centroid secara acak ($c_j$) dari data input.</li>
            <li><strong>Tahap Asosiasi:</strong> Petakan setiap titik data ke centroid terdekat menggunakan metrik jarak (Euclidean distance).</li>
            <li><strong>Tahap Update:</strong> Hitung ulang posisi centroid baru sebagai rata-rata (mean) dari semua titik data yang terasosiasi dengannya.</li>
            <li>Ulangi langkah 3 dan 4 sampai posisi centroid tidak berubah (konvergen).</li>
        </ol>
        
        <p><strong>Metrik Jarak Euclidean:</strong></p>
        <MathBlock latex={euclideanFormula} />
        
        <p><strong>Pembaruan Posisi Centroid:</strong></p>
        <MathBlock latex={centroidFormula} />
    </NoteSection>

    <NoteSection title="5. Simulasi Iterasi K-Means">
        <p>
            Misalkan kita mengelompokkan 8 data poin ($o_1$ s.d. $o_8$) di ruang 2D dengan K = 2:
        </p>
        <ul>
            <li><strong>Iterasi 1:</strong> Dua centroid awal $c_1, c_2$ dipilih secara acak. Jarak Euclidean dari setiap objek $o_i$ ke $c_1, c_2$ dihitung. Objek dipetakan ke kluster terdekat. Centroid baru kemudian dihitung sebagai titik rata-rata koordinat tiap anggota kluster.</li>
            <li><strong>Iterasi 2:</strong> Menggunakan centroid baru hasil Iterasi 1, objek diasosiasikan ulang. Karena posisi centroid bergeser, beberapa objek mungkin berpindah kluster. Centroid diperbarui lagi dari koordinat anggota baru.</li>
            <li><strong>Iterasi 3:</strong> Evaluasi keanggotaan dilakukan lagi. Jika tidak ada objek yang berpindah kluster, centroid bernilai sama. Iterasi dihentikan karena konvergen.</li>
        </ul>
    </NoteSection>

    <NoteSection title="6. Tiga Masalah Utama K-Means (Slide 30-45)">
        <ol>
            <li>
                <strong>Sensitivitas Inisialisasi Awal (Problem 1):</strong> Jika kita menjalankan K-means dua kali dengan inisialisasi centroid awal acak yang berbeda (Try 1 vs Try 2), konfigurasi kluster akhir bisa berbeda. Titik-titik data yang secara spasial berdekatan (nearby points) bisa berakhir di kluster yang berbeda.
            </li>
            <li>
                <strong>Outliers &amp; Noise (Problem 2):</strong> Titik pencilan yang berada jauh dari kluster utama dapat menarik centroid menjauh dari posisi kelompok padat yang sebenarnya, merusak representasi kluster.
            </li>
            <li>
                <strong>Bentuk Data Non-Convex (Problem 3):</strong> Centroid-based clustering berasumsi bentuk kluster cembung/bulat. Jika data berbentuk cincin melingkar, bulan sabit, atau melengkung, K-Means akan gagal mengelompokkannya secara akurat.
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="7. Kualitas Kluster &amp; Metrik Evaluasi">
        <p>
            Bagaimana mengukur seberapa baik kluster yang terbentuk?
        </p>
        <p><strong>1. Sum of Squared Errors (SSE):</strong></p>
        <p>Mengukur akumulasi kuadrat jarak dari setiap data ke centroid klusternya. Semakin kecil SSE, semakin rapat kluster yang dibentuk.</p>
        <MathBlock latex={sseFormula} />

        <p><strong>2. Silhouette Coefficient:</strong></p>
        <p>Mengukur kemiripan suatu objek dengan klusternya sendiri (cohesion) dibanding kluster tetangga terdekat lainnya (separation).</p>
        <MathBlock latex={silhouetteFormula} />
        <ul>
            <li><MathBlock latex={cohesionSymbol} displayMode={false} />: Rata-rata jarak titik $i$ ke seluruh objek lain di dalam kluster yang sama.</li>
            <li><MathBlock latex={separationSymbol} displayMode={false} />: Jarak rata-rata terendah dari titik $i$ ke seluruh objek di kluster tetangga terdekat lainnya.</li>
        </ul>
        <p><strong>Metrik Evaluasi Lainnya:</strong> Davies–Bouldin index, Dunn Index, Mutual Information, Purity, F-Measure, Jaccard Index.</p>
    </NoteSection>

    <NoteSection title="8. Strategi Penanganan Masalah K-Means">
        <ul>
            <li><strong>Menghadapi Outliers:</strong> Deteksi dan hapus data pencilan sebelum clustering, atau gunakan random sampling.</li>
            <li><strong>Menghadapi Initial Seeds:</strong> Jalankan algoritma berkali-kali dengan inisialisasi starting points berbeda, lalu pilih hasil dengan SSE terkecil (atau gunakan algoritma K-Means++).</li>
            <li><strong>Menentukan Jumlah Kluster K:</strong>
                <ul>
                    <li><strong>Elbow Method:</strong> Plot nilai SSE terhadap jumlah kluster K. Pilih nilai K pada titik tekukan ("siku") di mana penurunan SSE mulai mendatar (level out). Kita bisa menggunakan cross-validation rata-rata SSE pada setiap lipatan (fold).</li>
                    <li><strong>Silhouette Analysis:</strong> Pilih nilai K yang memberikan nilai rata-rata Silhouette Coefficient tertinggi bagi keseluruhan data.</li>
                </ul>
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="9. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
