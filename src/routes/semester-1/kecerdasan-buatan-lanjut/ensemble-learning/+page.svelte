<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    // LaTeX formulas defined inside script block to prevent Svelte HTML compiler errors
    const majorityCorrect = String.raw`P_{\text{Gabung}} = P(\text{Semua 3 Benar}) + P(\text{Tepat 2 Benar})`;
    const majorityCorrectFormula = String.raw`P_{\text{Gabung}} = p^3 + 3 \cdot p^2(1 - p)`;
    const majorityCorrectCalc1 = String.raw`P_{\text{Gabung}} = (0.7)^3 + 3 \cdot (0.7)^2 \cdot (0.3) = 0.343 + 0.441 = 0.784 \implies 78.4\%`;
    const majorityCorrectCalc2 = String.raw`P_{\text{Gabung}} = (0.4)^3 + 3 \cdot (0.4)^2 \cdot (0.6) = 0.064 + 0.288 = 0.352 \implies 35.2\%`;
    const majorityGeneralFormula = String.raw`P_{\text{Gabung}} = \sum_{i=\lceil M/2 \rceil}^M \binom{M}{i} p^i (1 - p)^{M-i}`;
    
    // Different Accuracies Calculations
    const diffAccFormula = String.raw`P_{ABC} = (P_A P_B P_C) + P_A P_B (1-P_C) + P_A P_C (1-P_B) + P_B P_C (1-P_A)`;
    const diffAccCalc1 = String.raw`P_{ABC} = (0.80 \times 0.82 \times 0.85) + (0.80 \times 0.82 \times 0.15) + (0.80 \times 0.85 \times 0.18) + (0.82 \times 0.85 \times 0.20) = 0.5576 + 0.0984 + 0.1224 + 0.1394 = 0.9178 \implies 91.78\%`;
    const diffAccCalc2 = String.raw`P_{ABC} = (0.20 \times 0.60 \times 0.90) + (0.20 \times 0.60 \times 0.10) + (0.20 \times 0.90 \times 0.40) + (0.60 \times 0.90 \times 0.80) = 0.108 + 0.012 + 0.072 + 0.432 = 0.6240 \implies 62.40\%`;
    
    // Bootstrap Math
    const bootstrapFormula1 = String.raw`\lim_{N \to \infty} \left( 1 - \frac{1}{N} \right)^N = e^{-1} \approx 36.79\%`;
    const bootstrapFormula2 = String.raw`1 - e^{-1} \approx 63.21\%`;

    const pSymbol = String.raw`p = 70\% = 0.7`;
    const percent70 = String.raw`70\%`;
    const percent78 = String.raw`78.4\%`;

    const quizQuestions = [
        {
            question: "Ada 3 model klasifikasi independen yang masing-masing memiliki akurasi sebesar 70%. Jika kita menggabungkan keputusan ketiganya menggunakan majority voting, berapa akurasi akhir model gabungan tersebut?",
            options: [
                "70.0%",
                "78.4%",
                "90.0%",
                "65.7%"
            ],
            correctIndex: 1,
            explanation: "Dengan majority voting, keputusan benar jika minimal 2 dari 3 model benar. Peluangnya: P(3 benar) + P(2 benar) = (0.7)^3 + 3 * (0.7)^2 * (0.3) = 0.343 + 0.441 = 0.784 atau 78.4%."
        },
        {
            question: "Bagaimanakah keterkaitan antara metode Bagging dan Boosting terhadap minimalisasi Bias Error dan Variance Error?",
            options: [
                "Bagging mengurangi bias sedangkan Boosting mengurangi variance.",
                "Bagging mengurangi variance sedangkan Boosting mengurangi bias.",
                "Keduanya sama-sama berfokus mengurangi bias saja.",
                "Bagging digunakan jika model mengalami underfitting ekstrem."
            ],
            correctIndex: 1,
            explanation: "Bagging melatih beberapa model independen secara paralel untuk mengurangi sensitivitas variansi (Variance Error/Overfitting). Boosting melatih model secara berurutan untuk memperbaiki kesalahan sebelumnya sehingga mengurangi Bias Error (Underfitting)."
        }
    ];
</script>

<svelte:head>
    <title>Ensemble Learning - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Ensemble Learning"
        date="15 Mei 2026"
        status="done"
        tags={["Ensemble", "Bagging", "Boosting", "Bias-Variance"]}
    />

    <NoteSection title="1. Apa Itu Ensemble Learning?">
        <p>
            <strong>Ensemble methods</strong> adalah meta-algoritma yang menggabungkan beberapa teknik machine learning (model dasar/base learner) menjadi satu model prediksi tunggal yang bertujuan untuk meningkatkan kinerja komputasi dan akurasi prediksi.
        </p>
        <p>
            Dua fokus optimasi utama dari metode ensemble adalah:
        </p>
        <ul>
            <li><strong>Mengurangi Variance</strong> (melalui metode Bagging)</li>
            <li><strong>Mengurangi Bias</strong> (melalui metode Boosting)</li>
        </ul>
    </NoteSection>

    <NoteSection title="2. Perbandingan Bias Error vs Variance Error">
        <p>
            Saat melatih model, kita dihadapkan pada trade-off antara Bias dan Variance:
        </p>
        
        <p><strong>Bias Error:</strong></p>
        <p>
            Mengukur seberapa jauh perbedaan antara nilai prediksi model dengan nilai target asli pada data latih (training data). Terjadi akibat asumsi model yang terlalu sederhana (<em>underfitting</em>).
        </p>
        <ul>
            <li><strong>Karakteristik:</strong> Error training tinggi, Error testing tinggi.</li>
            <li><strong>Contoh High Bias:</strong> Memaksakan regresi linear pada data kuadratik/non-linear.</li>
        </ul>

        <p><strong>Variance Error:</strong></p>
        <p>
            Mengukur seberapa sensitif perubahan model jika dilatih pada dataset training yang berbeda. Terjadi akibat model yang terlalu kompleks (<em>overfitting</em>), sehingga menghafal detail noise data training saat ini.
        </p>
        <ul>
            <li><strong>Karakteristik:</strong> Error training sangat rendah, Error testing tinggi.</li>
            <li><strong>Contoh High Variance:</strong> Penggunaan fungsi polinomial berderajat tinggi pada data linear yang memicu fluktuasi tajam.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Analisis Matematika Akurasi Gabungan">
        <Callout type="tip" title="Studi Kasus 1: Model Identik (Slide 4-8)">
            <p>
                {"Misalkan kita memiliki 3 model independen identik dengan akurasi masing-masing $p$ untuk klasifikasi biner. Keputusan akhir bernilai benar jika minimal 2 dari 3 model benar."}
            </p>
            <p><strong>A. Jika Akurasi Model $p = 70\%$:</strong></p>
            <MathBlock latex={majorityCorrect} />
            <MathBlock latex={majorityCorrectFormula} />
            <MathBlock latex={majorityCorrectCalc1} />
            <p><strong>B. Jika Akurasi Model $p = 40\%$:</strong></p>
            <MathBlock latex={majorityCorrectCalc2} />
            <p><strong>Formula Umum Akurasi Gabungan ($M$ model):</strong></p>
            <MathBlock latex={majorityGeneralFormula} />
            <p><strong>Hukum Teori Kunci:</strong></p>
            <ul>
                <li>Jika akurasi model dasar $p &gt; 0.5$, maka menambah jumlah model $M$ akan mendongkrak akurasi gabungan mendekati 100% (contoh: 101 model dengan akurasi 70% menghasilkan akurasi gabungan <strong>99.9%</strong>).</li>
                <li>Jika akurasi model dasar $p &lt; 0.5$, maka menambah jumlah model $M$ justru menurunkan akurasi gabungan mendekati 0% (contoh: 100 model dengan akurasi 40% menghasilkan akurasi gabungan <strong>0%</strong>).</li>
            </ul>
        </Callout>

        <Callout type="tip" title="Studi Kasus 2: Model dengan Akurasi Berbeda (Slide 9-10)">
            <p>
                Jika model memiliki akurasi berbeda ($P_A, P_B, P_C$), rumus kombinatorika general tidak berlaku. Kita harus menjabarkan seluruh kombinasi keadaan mayoritas suara benar (yaitu: semua 3 benar, atau tepat 2 benar):
            </p>
            <MathBlock latex={diffAccFormula} />
            <p><strong>A. Kasus Model A=80%, B=82%, C=85%:</strong></p>
            <MathBlock latex={diffAccCalc1} />
            <p><strong>B. Kasus Model A=20%, B=60%, C=90%:</strong></p>
            <MathBlock latex={diffAccCalc2} />
            <p>
                *Catatan:* Formula ini menghitung akurasi rata-rata dalam kondisi acak. Kadang di dunia nyata, kombinasi tertentu bisa memberikan hasil yang sedikit berbeda tergantung korelasi antar model.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="4. Metode Bagging (Bootstrap Aggregating) &amp; Random Forest">
        <p>
            Ditemukan oleh Leo Breiman pada 1994, bagging digunakan untuk **mengurangi Variance Error** (mengatasi overfitting). Sangat cocok untuk model yang tidak stabil seperti Decision Tree dan ANN (di mana adanya sedikit perubahan pada data latih akan berpengaruh besar pada model pembelajaran yang dihasilkan).
        </p>
        <p><strong>Langkah Kerja Bagging:</strong></p>
        <ol>
            <li>Bangkitkan $r$ subhimpunan data latih baru menggunakan metode **Bootstrap (Random Sampling with Replacement)** dari data sumber secara acak dengan peluang seragam ($1/N$).</li>
            <li>Latih $r$ model dasar secara paralel dan independen pada masing-masing subhimpunan data.</li>
            <li>Gabungkan prediksi seluruh model. Klasifikasi menggunakan suara terbanyak (Voting), sedangkan Regresi menggunakan nilai rata-rata (Averaging).</li>
        </ol>

        <Callout type="info" title="Bukti Matematis Bootstrap Porsi 63.21% (Slide 18)">
            <p>
                Misalkan terdapat $N$ objek data. Peluang suatu data terpilih dalam satu kali pengambilan acak adalah $1/N$, sehingga peluang untuk tidak terpilih adalah $1 - 1/N$.
            </p>
            <p>
                Peluang data tersebut sama sekali tidak terpilih setelah $N$ kali pengambilan berturut-turut adalah:
            </p>
            <MathBlock latex={bootstrapFormula1} />
            <p>
                Sehingga, peluang data tersebut terpilih minimal sekali di dalam bootstrap sample adalah:
            </p>
            <MathBlock latex={bootstrapFormula2} />
            <p>
                Ini membuktikan bahwa secara teoretis, setiap subhimpunan bootstrap akan mengandung sekitar <strong>63.21%</strong> objek data unik asli, sedangkan sisanya (36.79%) merupakan duplikasi data.
            </p>
        </Callout>

        <p><strong>Random Forest (Varian dari Bagging - Breiman 2001):</strong></p>
        <p>
            Random Forest (RF) adalah kombinasi dari beberapa pohon keputusan (decision trees) di mana setiap pohon bergantung pada nilai-nilai vektor acak yang disampling secara independen dengan distribusi yang sama.
        </p>
        <p><strong>Perbedaan Utama Random Forest vs Bagging Klasik:</strong></p>
        <ul>
            <li><strong>Penggunaan Fitur:</strong> Bagging menggunakan seluruh atribut/fitur untuk membangun sejumlah model independen. Random Forest hanya menggunakan sebagian fitur saja secara acak untuk memilah setiap simpul (biasanya sekitar <strong>20%</strong> dari total fitur).</li>
            <li><strong>Manfaat:</strong> RF jauh lebih hemat dalam komputasi, dan kumpulan model independen yang dihasilkan lebih bervariasi (korelasi antar pohon berkurang).</li>
        </ul>

        <p><strong>Performansi Random Forest (Slide 36):</strong></p>
        <ol>
            <li>Random Forest bekerja amat sangat cepat.</li>
            <li>Cepat dalam proses pembangunan, apalagi dalam klasifikasi.</li>
            <li>Dalam aplikasi praktis, RF tidak memerlukan cross-validation.</li>
            <li>RF bisa diimplementasikan secara parallel penuh sehingga bisa jauh lebih cepat.</li>
            <li>Tahan terhadap over-training.</li>
            <li>Mampu menangani data tanpa preprocessing.</li>
            <li>Data tidak perlu diskalakan ulang, ditransformasi, atau dimodifikasi.</li>
            <li>Tahan terhadap outlier.</li>
            <li>Memiliki penanganan otomatis terhadap nilai-nilai kosong (missing values).</li>
        </ol>

        <p><strong>Kekuatan Random Forest (Slide 37):</strong></p>
        <ol>
            <li>RF adalah salah satu algoritma yang paling akurat.</li>
            <li>Sangat efisien untuk himpunan data yang besar.</li>
            <li>Bisa menangani ribuan atribut tanpa perlu penghapusan.</li>
            <li>Bisa mengestimasi apakah suatu atribut penting dalam proses klasifikasi atau tidak.</li>
            <li>Membangkitkan estimasi yang tidak bias secara internal berdasarkan generalisasi kesalahan selama progres pembangunan sejumlah pohon keputusan.</li>
            <li>Mempunyai metode efektif untuk mengestimasi data yang hilang dan menjaga akurasi ketika banyak nilai data yang hilang.</li>
        </ol>

        <Callout type="warning" title="Kelemahan Random Forest (Slide 38)">
            <ul>
                <li>Random Forest terkadang mengalami <strong>overfit</strong> untuk sejumlah himpunan data yang memiliki derau (noisy data).</li>
                <li>Untuk data dengan atribut kategorial dengan jumlah level berbeda, Random Forest mengalami <strong>bias</strong>. Artinya, nilai kepentingan atribut dari RF tidak layak untuk data kategorial.</li>
            </ul>
        </Callout>
    </NoteSection>

    <NoteSection title="5. Metode Boosting">
        <p>
            Diusulkan oleh Robert E. Schapire pada 1990, boosting bekerja secara sekuensial untuk **mengurangi Bias Error** (mengatasi underfitting).
        </p>
        <p><strong>Langkah Kerja Boosting:</strong></p>
        <ol>
            <li>Dimulai dari melatih model klasifikasi awal yang lemah (weak learner).</li>
            <li>Lakukan penyamplingan bootstrap objek data secara berurutan sebanyak $T$ kali berdasarkan **pembobotan dinamis**. Objek data yang salah diklasifikasikan oleh model sebelumnya akan diberi bobot (weight) lebih tinggi agar mendapat perhatian lebih di model berikutnya.</li>
            <li>Gabungkan $T$ model yang dihasilkan menggunakan **Majority Voting dengan pembobotan proporsional terhadap akurasi model**. Model dengan akurasi tertinggi mendapat bobot terbesar, sedangkan model terlemah mendapat bobot terkecil. Contoh algoritma: AdaBoost, Gradient Boosting, XGBoost.</li>
        </ol>
    </NoteSection>

    <NoteSection title="6. Sumber Variance dalam Supervised Learning">
        <p>Dari slide Ensemble Methods, ada beberapa sumber utama yang menyebabkan variance pada model:</p>
        <ul>
            <li><strong>Noise pada target atau atribut input</strong> — data yang tidak bersih secara inheren.</li>
            <li><strong>Bias (model mismatch)</strong> — asumsi model yang tidak sesuai dengan pola data asli.</li>
            <li><strong>Randomness dalam training sample</strong> — variasi data latih yang digunakan, termasuk: cross-validation split, train/early stopping set.</li>
            <li><strong>Randomness dalam algoritma pembelajaran</strong> — misalnya inisialisasi bobot neural network secara acak.</li>
        </ul>
    </NoteSection>

    <NoteSection title="7. Strategi Membangkitkan Base Classifiers">
        <p>Ensemble methods dapat membangkitkan model dasar (base classifiers) dengan beberapa strategi:</p>
        <ul>
            <li><strong>Sampling Training Examples:</strong> Melatih $k$ model pada $k$ subset yang diambil dari data latih (seperti Bagging).</li>
            <li><strong>Using Different Learning Models:</strong> Menggunakan semua data latih tetapi menerapkan algoritma pembelajaran yang berbeda-beda untuk setiap model.</li>
            <li><strong>Sampling Features:</strong> Melatih $k$ model pada $k$ subset fitur yang diambil dari feature space (seperti Random Forest).</li>
            <li><strong>Learning "Randomly":</strong> Memasukkan elemen randomness ke dalam prosedur pembelajaran (misalnya inisialisasi bobot acak di ANN).</li>
        </ul>

        <p><strong>Perbandingan Combine by Consensus vs Combine by Learning:</strong></p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Aspek</th>
                        <th>Combine by Consensus</th>
                        <th>Combine by Learning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Contoh Algoritma</strong></td>
                        <td>Bagging, Random Forest, Model Averaging</td>
                        <td>Boosting, Stacked Generalization, Bayesian Model Averaging</td>
                    </tr>
                    <tr>
                        <td><strong>Kebutuhan Label</strong></td>
                        <td>Tidak perlu data berlabel untuk kombinasi</td>
                        <td>Butuh data berlabel untuk melatih ensemble model</td>
                    </tr>
                    <tr>
                        <td><strong>Kelebihan</strong></td>
                        <td>Dapat meningkatkan generalisasi tanpa label</td>
                        <td>Mendapat feedback dari labeled data, bisa meningkatkan akurasi</td>
                    </tr>
                    <tr>
                        <td><strong>Kekurangan</strong></td>
                        <td>Tidak ada feedback dari label; asumsi consensus harus lebih baik</td>
                        <td>Butuh menyimpan data label; berisiko overfit pada labeled data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </NoteSection>

    <NoteSection title="8. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
