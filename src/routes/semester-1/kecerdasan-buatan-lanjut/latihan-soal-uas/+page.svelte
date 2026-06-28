<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import { CheckCircle2, XCircle, Award, BookOpen, RefreshCw } from "lucide-svelte";

    // Define LaTeX formulas inside script block to prevent HTML parser errors
    const sseFormula = String.raw`SSE = \sum_{j=1}^K \sum_{x_i \in S_j} \|x_i - c_j\|^2`;
    const silhouetteFormula = String.raw`s_i = \frac{b_i - a_i}{\max(a_i, b_i)}`;
    const matrixCalculation = String.raw`h = W_1 \cdot X = \begin{pmatrix} 2 & 4 \\ 6 & 2 \\ 3 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix} = \begin{pmatrix} 2(1) + 4(2) \\ 6(1) + 2(2) \\ 3(1) + 1(2) \end{pmatrix} = \begin{pmatrix} 10 \\ 10 \\ 5 \end{pmatrix}`;
    const voteFormula = String.raw`P_{\text{Gabung}} = \binom{3}{2}(0.7)^2(0.3) + \binom{3}{3}(0.7)^3 = 3(0.147) + 0.343 = 0.784`;
    const voteAccDiff = String.raw`P_{ABC} = (0.8 \cdot 0.82 \cdot 0.85) + (0.8 \cdot 0.82 \cdot 0.15) + (0.8 \cdot 0.85 \cdot 0.18) + (0.82 \cdot 0.85 \cdot 0.20) = 0.9178`;
    const cnnSizeFormula = String.raw`O = \frac{W - K + 2P}{S} + 1 = \frac{9 - 3 + 0}{1} + 1 = 7`;
    const cnnSizeFormulaCalc = String.raw`O = \frac{7 - 3 + 2(1)}{2} + 1 = \frac{6}{2} + 1 = 4`;
    const bp1dvFormula = String.raw`dv = A(1-A) \cdot E`;
    const cdFormula = String.raw`\Delta W = P(h_0|v_0)v_0^T - P(h_k|v_k)v_k^T`;
    const bootstrapMath = String.raw`1 - \lim_{N \to \infty} (1 - 1/N)^N = 1 - e^{-1} \approx 63.21\%`;

    interface Question {
        id: number;
        topic: string;
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
        latex?: string;
    }

    const questions: Question[] = [
        {
            id: 1,
            topic: "Introduction to ML",
            question: "Berdasarkan definisi formal Tom Mitchell, jika sebuah program catur belajar meningkatkan persentase kemenangan bermainnya dengan terus bermain melawan dirinya sendiri, manakah yang bertindak sebagai Task (T)?",
            options: [
                "Persentase kemenangan game yang diperoleh.",
                "Bermain game catur.",
                "Kumpulan game latihan melawan diri sendiri.",
                "Algoritma pencarian minimax."
            ],
            correctIndex: 1,
            explanation: "Task (T) adalah tugas atau aktivitas yang ingin diselesaikan oleh program, yaitu bermain game catur. Persentase kemenangan adalah Performance (P), dan kumpulan game latihan adalah Experience (E)."
        },
        {
            id: 2,
            topic: "Introduction to ML",
            question: "Dalam taksonomi kecerdasan buatan, manakah hubungan cakupan yang benar mengenai AI, Machine Learning, dan Deep Learning?",
            options: [
                "Deep Learning ⊃ Representation Learning ⊃ Machine Learning ⊃ AI",
                "AI ⊃ Machine Learning ⊃ Representation Learning ⊃ Deep Learning",
                "Representation Learning ⊃ Deep Learning ⊃ Machine Learning ⊃ AI",
                "AI ⊃ Deep Learning ⊃ Machine Learning ⊃ Representation Learning"
            ],
            correctIndex: 1,
            explanation: "Hubungan hierarki yang benar adalah AI mencakup Machine Learning, yang mencakup Representation Learning, yang mencakup Deep Learning (AI ⊃ ML ⊃ Representation Learning ⊃ DL)."
        },
        {
            id: 3,
            topic: "Introduction to ML",
            question: "Apa perbedaan utama antara pencarian query tradisional dengan Machine Learning untuk prediksi query pencarian?",
            options: [
                "Tradisional menggunakan neural network, sedangkan ML menggunakan kamus kaku.",
                "Tradisional menyediakan kamus statis (kaku terhadap perubahan kata), sedangkan ML menggunakan query pencarian sebelumnya sebagai contoh latihan adaptif.",
                "Tradisional tidak memerlukan memori, sedangkan ML tidak memerlukan data.",
                "Tradisional lebih cepat, sedangkan ML tidak dapat di-deploy secara online."
            ],
            correctIndex: 1,
            explanation: "Pencarian query tradisional bersifat statis karena menggunakan kamus manual (kosakata sulit beradaptasi dengan perubahan trend), sedangkan ML bersifat adaptif karena melatih model menggunakan data query pencarian sebelumnya secara otomatis."
        },
        {
            id: 4,
            topic: "Introduction to ML",
            question: "Manakah yang membedakan AlphaGo Zero (2017) secara fundamental dari versi AlphaGo awal (2016)?",
            options: [
                "AlphaGo Zero dilatih menggunakan dataset master game catur cina.",
                "AlphaGo Zero belajar catur Go sepenuhnya dari nol (learning from scratch) lewat bermain melawan dirinya sendiri tanpa base data game manusia.",
                "AlphaGo Zero memiliki akurasi klasifikasi yang lebih rendah dibanding versi awal.",
                "AlphaGo Zero didasarkan pada model Swarm Intelligence saja."
            ],
            correctIndex: 1,
            explanation: "AlphaGo versi awal dilatih menggunakan dataset 100.000 game manusia. Sedangkan AlphaGo Zero belajar mandiri sepenuhnya dari nol (learning from scratch) menggunakan Reinforcement Learning dengan cara bertanding melawan dirinya sendiri."
        },
        {
            id: 5,
            topic: "K-Means Clustering",
            question: "Manakah klasifikasi karakteristik yang tepat bagi algoritma K-Means Clustering?",
            options: [
                "Monothetic, Hierarchical, Hard Clustering",
                "Polythetic, Partitional, Soft Clustering",
                "Polythetic, Partitional, Hard Clustering",
                "Monothetic, Partitional, Soft Clustering"
            ],
            correctIndex: 2,
            explanation: "K-Means mengelompokkan data berdasarkan jarak multivariat keseluruhan (Polythetic), mengelompokkan data ke pusat centroid (Partitional), dan menetapkan data ke tepat satu kluster (Hard Clustering)."
        },
        {
            id: 6,
            topic: "K-Means Clustering",
            question: "Secara teoretis probabilitas, berapakah proporsi objek data asli unik yang terkandung di dalam setiap subhimpunan sampel bootstrap?",
            options: [
                "36.79%",
                "50.00%",
                "63.21%",
                "95.00%"
            ],
            correctIndex: 2,
            explanation: "Peluang suatu data tidak terpilih dalam N kali sampling dengan pengembalian adalah (1 - 1/N)^N. Di batas limit N mendekati tak terhingga, nilai ini adalah e^-1 ≈ 36.79%. Maka peluang terpilih minimal sekali adalah 1 - e^-1 ≈ 63.21%.",
            latex: bootstrapMath
        },
        {
            id: 7,
            topic: "K-Means Clustering",
            question: "Apabila nilai Silhouette Coefficient (si) suatu titik data bernilai mendekati -1, apakah makna spasial dari data tersebut?",
            options: [
                "Titik data berada di pusat centroid klusternya dan sangat kohesif.",
                "Titik data tersebut sangat tidak mirip dengan klusternya sendiri dan lebih dekat ke kluster tetangga terdekat (salah kluster).",
                "Jarak intra-cluster (ai) bernilai nol.",
                "Kluster yang terbentuk memiliki bentuk non-convex."
            ],
            correctIndex: 1,
            explanation: "Silhouette Coefficient berkisar dari -1 hingga +1. Nilai mendekati -1 terjadi ketika jarak intra-cluster (ai) jauh lebih besar daripada jarak ke kluster tetangga terdekat (bi), mengindikasikan salah kluster."
        },
        {
            id: 8,
            topic: "K-Means Clustering",
            question: "Bagaimanakah cara kerja metode Elbow untuk menentukan jumlah kluster K yang optimal?",
            options: [
                "Memilih nilai K yang memberikan rata-rata Silhouette Coefficient tertinggi.",
                "Memilih nilai K pada titik tekukan kurva di mana penurunan Sum of Squared Errors (SSE) mulai melandai (level out).",
                "Memilih nilai K terbesar yang mungkin didukung memori.",
                "Menghapus outliers dari dataset secara acak."
            ],
            correctIndex: 1,
            explanation: "Metode Elbow memplot nilai K terhadap SSE. Semakin banyak kluster, SSE akan semakin turun. Kita memilih K pada titik 'siku' (tekukan) di mana penurunan SSE mulai mendatar.",
            latex: sseFormula
        },
        {
            id: 9,
            topic: "Artificial Neural Networks",
            question: "Dalam analogi biologis sel saraf manusia terhadap Artificial Neural Network (ANN), manakah padanan soma (badan sel) yang tepat?",
            options: [
                "Input signals",
                "Synaptic weights",
                "Summing junction dan activation function",
                "Output axon"
            ],
            correctIndex: 2,
            explanation: "Dendrit diwakili input, sinapsis diwakili weights, soma diwakili summing junction (penjumlah sinyal) + activation function, dan akson diwakili output."
        },
        {
            id: 10,
            topic: "Artificial Neural Networks",
            question: "Mengapa gerbang logika XOR (Exclusive OR) tidak dapat diselesaikan oleh Single Layer Perceptron?",
            options: [
                "Karena gerbang XOR membutuhkan nilai bias negatif.",
                "Karena data gerbang XOR tidak dapat dipisahkan secara linear (non-linearly separable) oleh garis lurus tunggal.",
                "Karena ReLU tidak kompatibel dengan XOR.",
                "Karena output XOR bernilai kontinu."
            ],
            correctIndex: 1,
            explanation: "Single Layer Perceptron hanya dapat menggambar batas keputusan linear (garis lurus). Data XOR berada pada posisi silang yang secara geometris memerlukan minimal dua garis (sehingga butuh Multi-Layer Perceptron)."
        },
        {
            id: 11,
            topic: "Artificial Neural Networks",
            question: "Mengapa fungsi Cross-Entropy Loss lebih disukai daripada Mean Squared Error (MSE) untuk melatih model Logistic Regression?",
            options: [
                "Keuntungan komputasi matriks yang linear.",
                "Karena penggunaan MSE bersama fungsi aktivasi non-linear sigmoid menghasilkan fungsi biaya non-convex dengan banyak lokal optima.",
                "Karena Cross-Entropy menjamin akurasi model selalu 100%.",
                "Karena MSE membatasi nilai output berada di luar rentang [0, 1]."
            ],
            correctIndex: 1,
            explanation: "Kombinasi MSE dan sigmoid non-linear menghasilkan kurva loss yang non-convex (bergelombang dengan banyak local minima) sehingga menyulitkan Gradient Descent. Cross-Entropy menghasilkan kurva convex yang memiliki satu global optimum."
        },
        {
            id: 12,
            topic: "Artificial Neural Networks",
            question: "Diberikan vektor input X = [1, 2]^T. Hidden layer memiliki matriks bobot W1 (di bawah). Jika kita mengabaikan bias dan fungsi aktivasi, berapakah vektor output tersembunyi h yang dihasilkan?",
            options: [
                "[10, 10, 5]^T",
                "[8, 14, 5]^T",
                "[6, 10, 3]^T",
                "[12, 10, 6]^T"
            ],
            correctIndex: 0,
            explanation: "Perkalian matriks: h = W1 * X. Baris 1: 2(1) + 4(2) = 10. Baris 2: 6(1) + 2(2) = 10. Baris 3: 3(1) + 1(2) = 5. Sehingga h = [10, 10, 5]^T.",
            latex: matrixCalculation
        },
        {
            id: 13,
            topic: "Ensemble Learning",
            question: "Misalkan terdapat 3 model klasifikasi independen yang masing-masing memiliki akurasi individual sebesar 70%. Jika digabungkan dengan majority voting, berapakah akurasi gabungannya?",
            options: [
                "70.0%",
                "78.4%",
                "90.0%",
                "65.7%"
            ],
            correctIndex: 1,
            explanation: "Dengan 3 model, suara mayoritas bernilai benar jika minimal 2 model benar. Peluangnya: P(3 benar) + P(2 benar) = p^3 + 3*p^2*(1-p) = (0.7)^3 + 3*(0.7)^2*(0.3) = 0.343 + 0.441 = 0.784 atau 78.4%.",
            latex: voteFormula
        },
        {
            id: 14,
            topic: "Ensemble Learning",
            question: "Menurut hukum teoretis ensemble, apa yang terjadi pada akurasi gabungan jika akurasi model dasar (p) kurang dari 50% dan jumlah model (M) terus ditambah mendekati tak terhingga?",
            options: [
                "Akurasi gabungan akan meningkat mendekati 100%.",
                "Akurasi gabungan akan menurun mendekati 0%.",
                "Akurasi gabungan akan tetap konstan pada nilai p.",
                "Akurasi gabungan berfluktuasi secara acak."
            ],
            correctIndex: 1,
            explanation: "Jika akurasi model dasar p < 0.5 (lebih buruk dibanding tebakan acak), penambahan model baru justru akan memperbanyak suara salah, menyeret akurasi gabungan turun menuju 0%."
        },
        {
            id: 15,
            topic: "Ensemble Learning",
            question: "Misalkan terdapat tiga model A, B, dan C dengan akurasi masing-masing 80%, 82%, dan 85%. Berapakah akurasi gabungan ketiga model tersebut menggunakan majority voting?",
            options: [
                "82.33%",
                "91.78%",
                "85.00%",
                "95.50%"
            ],
            correctIndex: 1,
            explanation: "Karena akurasi berbeda, kita hitung kombinasi suara mayoritas: P(ABC benar) + P(AB benar, C salah) + P(AC benar, B salah) + P(BC benar, A salah) = (0.8*0.82*0.85) + (0.8*0.82*0.15) + (0.8*0.85*0.18) + (0.82*0.85*0.2) = 0.5576 + 0.0984 + 0.1224 + 0.1394 = 0.9178.",
            latex: voteAccDiff
        },
        {
            id: 16,
            topic: "Ensemble Learning",
            question: "Mengapa metode Bagging sangat cocok diterapkan pada model pembelajaran yang tidak stabil (unstable learners) seperti Decision Tree dan ANN?",
            options: [
                "Karena model tidak stabil memiliki bias yang sangat tinggi.",
                "Karena adanya sedikit perubahan pada data latih akan berpengaruh besar pada model pembelajaran yang dihasilkan, sehingga agregasi paralel bootstrap dapat meredam variansi tersebut.",
                "Karena Bagging melatih model secara berurutan untuk memperbaiki bias.",
                "Karena model tidak stabil tidak memerlukan inisialisasi bobot."
            ],
            correctIndex: 1,
            explanation: "Model yang tidak stabil sensitif terhadap variasi data latih (high variance). Dengan melatih beberapa model independen pada sampel bootstrap yang berbeda secara paralel lalu merata-ratakannya, Bagging meredam fluktuasi variansi tersebut."
        },
        {
            id: 17,
            topic: "Deep Learning",
            question: "Berapakah jumlah trainable layers (lapisan dengan parameter bobot yang dapat dilatih) pada arsitektur klasik AlexNet (2012)?",
            options: [
                "5 layers",
                "8 layers (5 Conv + 3 FC)",
                "11 layers",
                "3 layers (semuanya Fully Connected)"
            ],
            correctIndex: 1,
            explanation: "AlexNet memiliki total 8 trainable layers, yang terdiri atas 5 Convolutional layers di bagian awal dan 3 Fully Connected layers di bagian akhir."
        },
        {
            id: 18,
            topic: "Deep Learning",
            question: "Manakah di bawah ini yang merupakan jajaran non-trainable layers (tanpa parameter bobot) pada arsitektur AlexNet?",
            options: [
                "Convolutional layers dan activation functions.",
                "3 Max Pooling layers, 2 Local Response Normalization layers, dan 1 Dropout layer.",
                "Fully connected layers dan Softmax output.",
                "Semua layer pada AlexNet adalah trainable."
            ],
            correctIndex: 1,
            explanation: "Non-trainable layers pada AlexNet mencakup 3 pooling layers (downsampling), 2 normalization layers (LRN), dan 1 dropout layer (regularisasi)."
        },
        {
            id: 19,
            topic: "Convolutional Neural Networks",
            question: "Diberikan citra input berukuran 9x9 piksel. Citra diproses konvolusi menggunakan filter 3x3, stride = 1, dan padding = 0. Berapakah ukuran output feature map yang terbentuk?",
            options: [
                "9x9 piksel",
                "7x7 piksel",
                "8x8 piksel",
                "5x5 piksel"
            ],
            correctIndex: 1,
            explanation: "Menggunakan formula output: O = (W - K + 2P)/S + 1. Maka O = (9 - 3 + 2*0)/1 + 1 = 6 + 1 = 7. Ukuran output adalah 7x7.",
            latex: cnnSizeFormula
        },
        {
            id: 20,
            topic: "Convolutional Neural Networks",
            question: "Bagaimanakah operasi Max Pooling membantu model CNN memperoleh sifat spatial invariance?",
            options: [
                "Dengan melipatgandakan nilai piksel negatif agar menjadi bernilai positif.",
                "Dengan mengambil nilai maksimum pada area jendela geser, sehingga sedikit pergeseran posisi fitur lokal pada gambar tidak mengubah nilai output pooling.",
                "Dengan menyeimbangkan jumlah bobot filter secara spasial.",
                "Dengan memotong piksel tepi gambar secara acak."
            ],
            correctIndex: 1,
            explanation: "Max Pooling menyaring nilai terbesar dalam area lokal. Jika suatu fitur bergeser sedikit namun tetap berada di dalam jendela pooling yang sama, output yang dihasilkan tetap sama. Ini memberikan kekebalan translasi (spatial invariance)."
        },
        {
            id: 21,
            topic: "Deep Unsupervised Learning",
            question: "Bagaimanakah skema deteksi anomali (Anomaly Detection) menggunakan Autoencoder diimplementasikan secara praktis?",
            options: [
                "Latih Autoencoder hanya pada data normal, lalu catat batas maksimum reconstruction error pada data validasi. Jika ada data produksi yang memiliki error melebihi batas tersebut, data ditandai sebagai anomali.",
                "Model dilatih dengan data anomali dan normal secara seimbang menggunakan binary cross-entropy.",
                "Menggunakan classifier layer yang ditempelkan langsung pada bottleneck untuk mengeluarkan label biner.",
                "Memasukkan noise buatan secara terus-menerus ke dalam decoder."
            ],
            correctIndex: 0,
            explanation: "Autoencoder sangat mahir merekonstruksi data sejenis yang dipelajarinya (data normal). Jika diberikan data anomali (outlier), rekonstruksinya akan buruk dan menghasilkan error di atas threshold validasi."
        },
        {
            id: 22,
            topic: "Deep Unsupervised Learning",
            question: "Apakah aturan koneksi utama pada Restricted Boltzmann Machine (RBM) yang membedakannya dari arsitektur Boltzmann Machine umum?",
            options: [
                "Node visible terhubung langsung dengan visible lainnya.",
                "Terdapat koneksi antar-node di dalam layer yang sama (intra-layer connections).",
                "Merupakan bipartite graph, di mana node terhubung antar layer (visible-hidden), tetapi tidak ada koneksi antar node di dalam layer yang sama.",
                "RBM hanya memiliki satu arah koneksi dari visible ke hidden (directed graph)."
            ],
            correctIndex: 2,
            explanation: "Kata 'Restricted' (terbatas) merujuk pada pembatasan koneksi: node RBM membentuk bipartite graph, di mana koneksi hanya boleh terjadi lintas layer (visible ke hidden dan sebaliknya). Koneksi intra-layer dilarang."
        },
        {
            id: 23,
            topic: "Deep Unsupervised Learning",
            question: "Dalam pelatihan RBM, apakah peran dari Contrastive Divergence (CD-k)?",
            options: [
                "Menghitung error turunan parsial bobot menggunakan chain rule backpropagation.",
                "Memperbarui matriks bobot W berdasarkan selisih perkalian luar probabilitas visible-hidden langkah awal (v0, h0) dengan hasil rekonstruksi ke-k (vk, hk).",
                "Meminimalkan jumlah kluster K secara dinamis.",
                "Melakukan random sampling visible bias secara eksponensial."
            ],
            correctIndex: 1,
            explanation: "Pelatihan RBM menggunakan Contrastive Divergence (CD-k) yang memperbarui bobot berdasarkan selisih outer product keadaan awal (data asli v0) dan keadaan ke-k (hasil sampling Gibbs vk).",
            latex: cdFormula
        },
        {
            id: 24,
            topic: "RNN & LSTM",
            question: "Di dalam Recurrent Neural Network (RNN), apakah yang dimaksud dengan prinsip parameter sharing?",
            options: [
                "Membagi bobot model secara merata ke komputer server lain.",
                "Menggunakan set matriks bobot yang sama (U untuk input, W untuk hidden state recurrent, V untuk output) di setiap langkah waktu (time step).",
                "Membagi data latih menjadi beberapa folder secara acak.",
                "Menggunakan fungsi aktivasi yang sama di seluruh hidden layer."
            ],
            correctIndex: 1,
            explanation: "Parameter sharing berarti matriks bobot U, W, dan V nilainya konstan dan digunakan berulang-ulang di setiap time step t. Ini meminimalkan jumlah parameter yang harus dilatih model."
        },
        {
            id: 25,
            topic: "RNN & LSTM",
            question: "Secara matematis, mengapa proses Backpropagation Through Time (BPTT) pada RNN standar memicu terjadinya Vanishing Gradient?",
            options: [
                "Karena RNN tidak menggunakan fungsi aktivasi non-linear.",
                "Karena gradien hidden state masa lalu melibatkan perkalian berantai matriks bobot recurrent W. Jika nilai eigen W < 1, gradien akan mengecil secara eksponensial menuju nol.",
                "Karena output layer menggunakan fungsi softmax yang memotong nilai gradien negatif.",
                "Karena total loss RNN dicari menggunakan Least Square Error."
            ],
            correctIndex: 1,
            explanation: "Dalam BPTT, perhitungan turunan hidden state saat ini terhadap hidden state jauh di masa lalu melibatkan perkalian berantai matriks recurrent W sebanyak selisih time step. Jika nilai bobot kecil, perkalian berulang ini membuat gradien meluruh ke nol."
        },
        {
            id: 26,
            topic: "RNN & LSTM",
            question: "Pada arsitektur LSTM, gerbang (gate) manakah yang secara spesifik menentukan seberapa banyak informasi dari cell state lama yang akan dipertahankan atau dibuang?",
            options: [
                "Input Gate (it)",
                "Output Gate (ot)",
                "Forget Gate (ft)",
                "Candidate State (C~t)"
            ],
            correctIndex: 2,
            explanation: "Forget Gate (ft) mengeluarkan nilai probabilitas sigmoid antara 0 dan 1. Nilai 0 berarti membuang seluruh informasi cell state lama pada dimensi tersebut, sedangkan nilai 1 berarti mempertahankan semuanya."
        },
        {
            id: 27,
            topic: "Introduction to ML",
            question: "Bagaimanakah program Arthur Samuel checkers melatih dirinya sendiri agar bisa bermain secara mandiri pada tahun 50-an?",
            options: [
                "Melatih kemampuannya hanya dengan melawan programmer penciptanya sendiri.",
                "Bermain melawan dirinya sendiri puluhan ribu kali dan mempelajari posisi mana yang baik dan buruk berdasarkan perolehan hasil akhir game.",
                "Menggunakan database game catur Go yang dimuat secara eksternal.",
                "Menggunakan feedback koreksi manual dari penonton game."
            ],
            correctIndex: 1,
            explanation: "Program checkers Arthur Samuel melatih dirinya sendiri dengan bertanding melawan salinan dirinya sendiri ribuan kali, mengidentifikasi posisi board yang menguntungkan/merugikan, hingga akhirnya menjadi jauh lebih jago dibanding programmer pembuatnya."
        },
        {
            id: 28,
            topic: "Introduction to ML",
            question: "Manakah batasan utama penyaringan email spam tradisional (berbasis aturan kata) dibandingkan dengan sistem berbasis Machine Learning?",
            options: [
                "Sistem tradisional memerlukan memori penyimpanan yang terlalu besar.",
                "Sistem tradisional sulit beradaptasi dengan perubahan pola/kata spam baru (seperti taktik manipulasi ejaan kata) karena aturan bersifat kaku dan statis.",
                "Sistem tradisional membutuhkan komputasi GPU yang mahal.",
                "Sistem tradisional tidak dapat menyaring kata kunci viagra."
            ],
            correctIndex: 1,
            explanation: "Spam filtering tradisional menggunakan aturan kaku (misal: if word == 'viagra' -> spam). Spammer dengan mudah mengakalinya dengan mengubah ejaan (misal: 'v1agra'). ML adaptif mempelajari kata-kata baru yang sering menandakan spam dari feedback penandaan user."
        },
        {
            id: 29,
            topic: "K-Means Clustering",
            question: "Pada Hierarchical Clustering, kapankah pembagian data berubah menjadi bentuk Partitional Clustering?",
            options: [
                "Ketika semua objek data disatukan ke dalam satu root tunggal.",
                "Saat dilakukan pemotongan garis secara horizontal pada pohon dendrogram hasil connectivity-based clustering.",
                "Ketika kita menentukan bobot matriks RBM secara acak.",
                "Saat data diolah menggunakan metrik jarak Cosine."
            ],
            correctIndex: 1,
            explanation: "Setiap pemotongan garis secara horizontal pada struktur pohon dendrogram (hierarchical clustering) akan menghasilkan partisi objek yang membagi data menjadi kelompok-kelompok terpisah (partitional clustering)."
        },
        {
            id: 30,
            topic: "K-Means Clustering",
            question: "Manakah metrik di bawah ini yang digunakan untuk mengukur kualitas kluster (cluster quality) secara eksternal (menggunakan ground truth label)?",
            options: [
                "Sum of Squared Errors (SSE)",
                "Silhouette Coefficient",
                "Purity, F-Measure, dan Jaccard Index",
                "Hopkins Statistic dan Elbow Method"
            ],
            correctIndex: 2,
            explanation: "Purity, F-Measure, dan Jaccard Index mengukur kualitas kluster secara eksternal dengan membandingkan kluster bentukan terhadap label kelas asli (ground truth). SSE dan Silhouette mengukurnya secara internal dari struktur jarak data."
        },
        {
            id: 31,
            topic: "Artificial Neural Networks",
            question: "Berapakah nilai fungsi aktivasi Leaky ReLU jika diberikan nilai input z = -5?",
            options: [
                "0.00",
                "-5.00",
                "-0.05",
                "-0.50"
            ],
            correctIndex: 2,
            explanation: "Untuk input negatif (z < 0), Leaky ReLU meloloskan nilai kecil dengan kemiringan 0.01. Maka f(-5) = 0.01 * -5 = -0.05."
        },
        {
            id: 32,
            topic: "Artificial Neural Networks",
            question: "Dalam proses Backpropagation, aturan kalkulus manakah yang digunakan untuk merambatkan nilai error dari output layer kembali ke hidden layer guna menghitung gradien bobot?",
            options: [
                "Aturan Perkalian (Product Rule)",
                "Aturan Rantai (Chain Rule)",
                "Aturan Pembagian (Quotient Rule)",
                "Aturan Integrasi Parsial"
            ],
            correctIndex: 1,
            explanation: "Aturan Rantai (Chain Rule) kalkulus digunakan untuk menghitung turunan parsial dari fungsi loss terhadap bobot di layer-layer terdalam dengan mengalikan turunan di setiap hubungan layer secara berantai."
        },
        {
            id: 33,
            topic: "Ensemble Learning",
            question: "Mengapa kombinasi 101 model identik dengan akurasi 70% menghasilkan akurasi gabungan mendekati 99.9%, sementara kombinasi 100 model dengan akurasi 40% menghasilkan gabungan mendekati 0%?",
            options: [
                "Karena hukum teoretis menyatakan penambahan model selalu menurunkan akurasi jika model tersebut genap.",
                "Karena majority voting melipatgandakan bias secara eksponensial.",
                "Karena jika p > 0.5, penambahan model memperkecil peluang suara mayoritas salah. Namun jika p < 0.5, penambahan model justru memperbesar peluang suara salah mendominasi.",
                "Karena model dengan akurasi 40% tidak stabil."
            ],
            correctIndex: 2,
            explanation: "Teorema Juri Condorcet menyatakan: jika akurasi model p > 0.5, menambah jumlah pengambil keputusan independen akan meningkatkan akurasi gabungan menuju 100%. Jika p < 0.5, akurasinya akan anjlok menuju 0%."
        },
        {
            id: 34,
            topic: "Deep Learning",
            question: "Manakah di bawah ini yang merupakan urutan kronologis kemunculan arsitektur pemenang kompetisi ILSVRC (ImageNet Challenge) yang benar?",
            options: [
                "AlexNet (2012) -> GoogLeNet / VGG (2014) -> ResNet (2015)",
                "ResNet (2012) -> AlexNet (2014) -> ZFNet (2015)",
                "LeNet-5 (2012) -> GoogLeNet (2013) -> AlexNet (2015)",
                "AlexNet (2012) -> ResNet (2014) -> VGG (2015)"
            ],
            correctIndex: 0,
            explanation: "Urutan kemunculan yang benar adalah: AlexNet memenangkan ILSVRC 2012, ZFNet memenangkan ILSVRC 2013, GoogLeNet memenangkan ILSVRC 2014 (bersama VGGNet runner-up), dan ResNet memenangkan ILSVRC 2015."
        },
        {
            id: 35,
            topic: "Convolutional Neural Networks",
            question: "Apakah tujuan penerapan Local Response Normalization (LRN) setelah activation function pada arsitektur AlexNet?",
            options: [
                "Mengurangi dimensi spatial gambar agar sejalan dengan max pooling.",
                "Mengimitasi efek lateral inhibition pada sel saraf biologis, di mana neuron yang aktif sangat kuat menekan respon neuron di sekitarnya.",
                "Mematikan neuron secara acak untuk mencegah overfitting.",
                "Mengubah nilai piksel negatif menjadi nol."
            ],
            correctIndex: 1,
            explanation: "LRN menormalisasi nilai aktivasi lokal dengan membagi respon suatu neuron dengan jumlah respon neuron tetangganya, meniru lateral inhibition biologi untuk meningkatkan daya generalisasi model."
        },
        {
            id: 36,
            topic: "Deep Unsupervised Learning",
            question: "Bagaimanakah perbedaan fungsi bias pada visible layer (visible bias) terhadap bias pada hidden layer (hidden bias) di dalam Restricted Boltzmann Machine (RBM)?",
            options: [
                "Visible bias membantu backward pass untuk rekonstruksi input, sedangkan hidden bias membantu forward pass untuk aktivasi laten.",
                "Visible bias melatih model classifier, sedangkan hidden bias melatih model regression.",
                "RBM tidak memiliki bias pada visible layer.",
                "Keduanya memiliki nilai yang selalu nol pada CD-k."
            ],
            correctIndex: 0,
            explanation: "RBM memiliki dua set bias: hidden bias membantu menghasilkan aktivasi pada forward pass (visible -> hidden), sedangkan visible bias membantu menghasilkan rekonstruksi input pada backward pass (hidden -> visible)."
        },
        {
            id: 37,
            topic: "Deep Unsupervised Learning",
            question: "Mengapa Deep Restricted Boltzmann Network (DRBN) dianggap sebagai model rekayasa fitur (feature engineering) otomatis?",
            options: [
                "Karena DRBN menggunakan backpropagation untuk melatih label secara langsung.",
                "Karena lapisan-lapisan RBM yang ditumpuk mengekstrak fitur tingkat rendah di awal, naik hingga fitur level tertinggi yang diskriminatif dan siap dimasukkan ke classifier eksternal (Naive Bayes, Decision Tree).",
                "Karena DRBN memotong dimensi input secara acak.",
                "Karena DRBN menggabungkan majority voting bobot."
            ],
            correctIndex: 1,
            explanation: "DRBN mengekstrak fitur bertingkat secara otomatis melalui tumpukan RBM. Fitur level tertinggi dari RBM terakhir sangat representatif dan dapat langsung digunakan sebagai input pengklasifikasi sederhana mana pun."
        },
        {
            id: 38,
            topic: "RNN & LSTM",
            question: "Apakah yang dimaksud dengan teknik Truncated Backpropagation Through Time (Truncated BPTT) pada pelatihan RNN?",
            options: [
                "Memotong semua bobot recurrent W menjadi bernilai nol.",
                "Membagi rangkaian data deret waktu yang sangat panjang menjadi beberapa subsequence yang lebih pendek untuk membatasi langkah forward dan backward pass BPTT.",
                "Mengganti fungsi aktivasi tanh dengan sigmoid secara paksa.",
                "Memotong dimensi input x_t di setiap time step."
            ],
            correctIndex: 1,
            explanation: "Truncated BPTT membagi rangkaian waktu panjang menjadi potongan-potongan subsequence kecil. Backpropagation hanya dirambatkan mundur sejauh panjang subsequence tersebut untuk menghemat memori dan waktu komputasi."
        },
        {
            id: 39,
            topic: "Generative Adversarial Networks",
            question: "Eksperimen aritmatika vektor laten pada wajah (wajah pria berkacamata - wajah pria tanpa kacamata + wajah wanita tanpa kacamata = wajah wanita berkacamata) pertama kali dibuktikan oleh paper GAN yang mana?",
            options: [
                "Ian Goodfellow, et al. (2014) - Generative Adversarial Networks.",
                "Alec Radford, et al. (2015) - DCGAN (Deep Convolutional GAN).",
                "Tero Karras, et al. (2017) - Progressive Growing of GANs.",
                "Andrew Brock, et al. (2018) - BigGAN."
            ],
            correctIndex: 1,
            explanation: "Paper DCGAN oleh Alec Radford et al. (2015) membuktikan bahwa generator mempelajari representasi ruang laten terstruktur, di mana operasi aritmatika vektor laten menghasilkan perubahan semantik gambar wajah yang konsisten."
        },
        {
            id: 40,
            topic: "Generative Adversarial Networks",
            question: "Bagaimanakah skema Progressive Growing of GANs (ProGAN) yang diusulkan oleh Tero Karras et al. (2017) membantu stabilisasi pelatihan?",
            options: [
                "Menggunakan fungsi aktivasi ReLU di seluruh layer Generator.",
                "Melatih Generator dan Discriminator secara bertahap mulai dari citra resolusi sangat rendah (4x4 piksel) kemudian naik ke resolusi tinggi (1024x1024 piksel) seiring berjalannya epoch.",
                "Mengeliminasi Discriminator secara bertahap.",
                "Melatih model hanya pada dataset MNIST."
            ],
            correctIndex: 1,
            explanation: "ProGAN melatih model dari resolusi kecil (4x4) untuk mempelajari struktur kasar gambar, lalu menambahkan lapisan-lapisan baru secara progresif hingga resolusi tinggi (1024x1024) untuk mempelajari detail halus, membuat pelatihan stabil dan hasil sangat tajam."
        },
        {
            id: 41,
            topic: "Ensemble Learning",
            question: "Manakah di bawah ini yang merupakan contoh model dengan karakteristik Low Bias berdasarkan materi Ensemble Methods?",
            options: [
                "Constant function prediction.",
                "Linear regression yang diterapkan pada data non-linear.",
                "ANN dengan banyak hidden unit yang dilatih hingga selesai (completion).",
                "Model yang independen dari data training."
            ],
            correctIndex: 2,
            explanation: "Berdasarkan slide, ANN dengan banyak hidden unit yang dilatih hingga tuntas (completion) dan regresi polinomial derajat 2 pada data kuadratik tergolong memiliki Low Bias karena modelnya cukup kompleks untuk mempelajari data."
        },
        {
            id: 42,
            topic: "Ensemble Learning",
            question: "Manakah di bawah ini yang merupakan contoh model dengan karakteristik High Variance?",
            options: [
                "Constant function prediction.",
                "Model yang bergantung pada ukuran stabil data seperti mean atau median.",
                "Regresi polinomial derajat tinggi (high degree polynomial).",
                "Regresi linear yang diterapkan pada data linear."
            ],
            correctIndex: 2,
            explanation: "Regresi polinomial derajat tinggi sangat sensitif terhadap perubahan data latih (overfitting), sehingga tergolong memiliki High Variance."
        },
        {
            id: 43,
            topic: "Ensemble Learning",
            question: "Manakah di bawah ini yang merupakan kelebihan (Pros) utama dari metode penggabungan ensemble berbasis konsensus (Combine by Consensus)?",
            options: [
                "Mendapatkan umpan balik (feedback) langsung dari data berlabel.",
                "Dapat meningkatkan akurasi secara drastis melalui cross-entropy optimization.",
                "Tidak membutuhkan data berlabel (do not need labeled data) untuk proses kombinasi dan dapat meningkatkan kinerja generalisasi.",
                "Menjamin tidak terjadi overfitting sama sekali pada semua kondisi."
            ],
            correctIndex: 2,
            explanation: "Metode kombinasi konsensus (seperti majority voting pada Bagging) tidak membutuhkan data berlabel tambahan untuk melatih penggabung, serta dapat meningkatkan kinerja generalisasi model."
        },
        {
            id: 44,
            topic: "Ensemble Learning",
            question: "Apakah kekurangan (Cons) utama dari metode penggabungan ensemble berbasis pembelajaran (Combine by Learning) seperti Boosting atau Stacking?",
            options: [
                "Akurasi model gabungan selalu lebih rendah dibandingkan konsensus.",
                "Memerlukan asumsi kaku bahwa konsensus selalu lebih baik.",
                "Perlu menyimpan data berlabel (labeled data) untuk melatih model ensemble dan rentan terhadap overfitting pada data berlabel tersebut.",
                "Hanya bisa digunakan pada model pohon keputusan."
            ],
            correctIndex: 2,
            explanation: "Combine by Learning melatih model penggabung (meta-model) menggunakan data berlabel. Kekurangannya adalah kita harus menyimpan data berlabel untuk melatih kombinasi tersebut, dan rentan overfitting jika data berlabel sedikit."
        },
        {
            id: 45,
            topic: "Ensemble Learning",
            question: "Berdasarkan algoritma AdaBoost, apa tindakan yang harus diambil jika tingkat error rate dari pengklasifikasi dasar yang dilatih melebihi 50%?",
            options: [
                "Lanjutkan pelatihan dengan meningkatkan bobot data salah.",
                "Ubah fungsi aktivasi menjadi softmax.",
                "Mulai ulang proses (start over) pelatihan pengklasifikasi tersebut.",
                "Gunakan majority voting secara langsung tanpa pembobotan."
            ],
            correctIndex: 2,
            explanation: "Berdasarkan algoritma AdaBoost di slide, jika error rate suatu classifier pada iterasi tertentu melebihi 50% (lebih buruk dibanding tebakan acak pada klasifikasi biner), proses harus diulang (start over)."
        },
        {
            id: 46,
            topic: "Deep Unsupervised Learning",
            question: "Mengapa deteksi anomali berbasis Autoencoder sangat berguna pada kasus unbalanced classes (kelas data tidak seimbang)?",
            options: [
                "Keuntungan komputasi matriks yang linear.",
                "Karena kita dapat melatih Autoencoder hanya menggunakan data kelas mayoritas (normal) tanpa membutuhkan contoh data anomali (kelas minoritas) yang langka atau mahal untuk diproduksi.",
                "Karena bottleneck secara otomatis menduplikasi kelas minoritas.",
                "Karena reconstruction error selalu bernilai nol pada kelas anomali."
            ],
            correctIndex: 1,
            explanation: "Dalam kasus nyata, data anomali (negatif/rusak) sangat sedikit dan mahal didapatkan. Autoencoder cukup dilatih dengan data normal saja (unsupervised). Data anomali akan terdeteksi lewat tingginya reconstruction error."
        },
        {
            id: 47,
            topic: "Deep Unsupervised Learning",
            question: "Berdasarkan hasil eksperimen pada dataset MNIST di slide, perbandingan akurasi kompresi Autoencoder berbasis Convolutional dibandingkan Fully Connected adalah...",
            options: [
                "87.5% (Convolutional) vs 97.5% (Fully Connected)",
                "97.5% (Convolutional) vs 87.5% (Fully Connected)",
                "50.0% (Convolutional) vs 50.0% (Fully Connected)",
                "99.9% (Convolutional) vs 99.9% (Fully Connected)"
            ],
            correctIndex: 1,
            explanation: "Eksperimen kompresi gambar MNIST pada slide menunjukkan bahwa Autoencoder berbasis Convolutional berkinerja jauh lebih baik dengan akurasi 97.5% dibandingkan Fully Connected yang hanya memperoleh 87.5%."
        },
        {
            id: 50,
            topic: "RNN & LSTM",
            question: "Pada model bahasa level karakter (Character Level Language Model) untuk mengenali kata 'hello', bagaimanakah cara pengkodean (representation) karakter input yang digunakan pada model?",
            options: [
                "Menggunakan representasi dense embedding berdimensi 300.",
                "Menggunakan One-Hot Encoding berdimensi ukuran alfabet unik (vocabulary size).",
                "Menggunakan representasi integer kontinu dari 0 hingga 255.",
                "Menggunakan representasi biner kelipatan 8."
            ],
            correctIndex: 1,
            explanation: "Berdasarkan diagram training level karakter di slide, setiap karakter input (seperti 'h', 'e', 'l', 'o') dipetakan menggunakan representasi vektor One-Hot Encoding sesuai dengan jumlah kosakata unik yang ada."
        },
        {
            id: 48,
            topic: "RNN & LSTM",
            question: "Di dalam struktur internal LSTM, apakah fungsi dari operasi Plus Junction (penjumlahan elemen-demi-elemen)?",
            options: [
                "Membatasi nilai input berada di rentang [0, 1] layaknya gate.",
                "Melakukan transfer informasi secara langsung tanpa hambatan (layaknya conveyor belt) dengan menjumlahkan informasi baru ke cell state lama.",
                "Mengalikan sinyal input dengan gating vector.",
                "Menghitung gradien bobot recurrent secara berantai."
            ],
            correctIndex: 1,
            explanation: "Plus junction menjumlahkan informasi baru ke cell state secara linear. Ini memungkinkan informasi mengalir tanpa hambatan (conveyor belt) dan menghindari vanishing gradient yang biasa terjadi pada perkalian berantai."
        },
        {
            id: 49,
            topic: "RNN & LSTM",
            question: "Misalkan sebuah sinyal vector bernilai [0.8, 0.8, 0.8]^T dilewatkan ke sebuah gating vector bernilai [1.0, 0.5, 0.0]^T melalui Times Junction (perkalian elemen-demi-elemen). Berapakah hasil akhir gating tersebut?",
            options: [
                "[0.8, 0.8, 0.8]^T",
                "[0.8, 0.4, 0.0]^T",
                "[1.8, 1.3, 0.8]^T",
                "[0.0, 0.0, 0.0]^T"
            ],
            correctIndex: 1,
            explanation: "Perkalian elemen-demi-elemen (Times Junction) menghasilkan: 0.8 * 1.0 = 0.8; 0.8 * 0.5 = 0.4; 0.8 * 0.0 = 0.0. Hasilnya adalah [0.8, 0.4, 0.0]^T."
        },
        {
            id: 51,
            topic: "Artificial Neural Networks",
            question: "Di dalam perhitungan Backpropagation 1-Layer NN, jika A adalah output sigmoid, dan E adalah error, berapakah formula turunan parsial error terhadap bias (db)?",
            options: [
                "db = A(1-A)",
                "db = A(1-A) * E",
                "db = x * E",
                "db = A - A^2"
            ],
            correctIndex: 1,
            explanation: "Untuk 1-Layer NN, dv = (dA/dv) * E. Karena A = sigmoid(v), maka dA/dv = A(1-A), sehingga dv = A(1-A) * E. Karena dv/db = 1, maka db = dv * (dv/db) = dv = A(1-A) * E.",
            latex: bp1dvFormula
        },
        {
            id: 52,
            topic: "Artificial Neural Networks",
            question: "Mengapa fungsi aktivasi Tanh lebih disukai daripada Sigmoid meskipun keduanya sama-sama memiliki masalah saturated neurons?",
            options: [
                "Karena Tanh memiliki operasi matematika exp() yang jauh lebih murah komputasinya.",
                "Karena output Tanh bersifat zero-centered (antara -1 hingga 1), yang membantu mencegah pergerakan update gradien yang berkelok-kelok (zig-zag).",
                "Karena Tanh tidak meluruhkan gradien menjadi nol saat saturated.",
                "Karena Tanh tidak menggunakan parameter bias."
            ],
            correctIndex: 1,
            explanation: "Fungsi Tanh memetakan nilai ke [-1, 1] sehingga bersifat zero-centered. Hal ini membantu menstabilkan proses update gradien saat optimasi, tidak seperti Sigmoid yang outputnya selalu positif sehingga arah update gradien menjadi zig-zag."
        },
        {
            id: 53,
            topic: "Ensemble Learning",
            question: "Mengapa Random Forest jauh lebih hemat secara komputasi dan meminimalkan korelasi antar pohon dibandingkan Bagging klasik?",
            options: [
                "Karena Random Forest melatih pohon secara sekuensial.",
                "Karena Random Forest hanya menggunakan subset fitur acak (biasanya sekitar 20% dari total fitur) untuk memilah (splitting) setiap simpul (node).",
                "Karena Random Forest menolak data outliers di awal preprocessing.",
                "Karena Random Forest menggunakan inisialisasi bobot RBM."
            ],
            correctIndex: 1,
            explanation: "Bagging klasik menggunakan seluruh fitur untuk melatih setiap pohon. Random Forest hanya memilih subset fitur acak (sekitar 20%) saat membagi node. Hal ini sangat memangkas biaya komputasi dan membuat setiap pohon lebih independen/kurang berkorelasi."
        },
        {
            id: 54,
            topic: "Ensemble Learning",
            question: "Manakah di bawah ini yang merupakan sumber utama terjadinya Variance Error dalam supervised learning menurut slide Ensemble Methods?",
            options: [
                "Terlalu menyederhanakan arsitektur model (underfitting).",
                "Inisialisasi bobot awal neural network secara acak, randomness dalam training sample (misal cross-validation splits), serta noise pada target atau input.",
                "Menggunakan model yang independen terhadap data latih.",
                "Mengatur learning rate terlalu kecil."
            ],
            correctIndex: 1,
            explanation: "Berdasarkan slide Ensemble Methods, sumber variance meliputi noise pada target/input, ketidakcocokan model, randomness sampel latihan (misal cross-validation, train/early-stopping sets), dan keacakan dalam algoritma (misal inisialisasi bobot neural net)."
        },
        {
            id: 55,
            topic: "RNN & LSTM",
            question: "Di dalam mekanisme LSTM, bagaimanakah cara kerja operasi Gating yang meregulasi aliran informasi?",
            options: [
                "Menambahkan nilai input dengan bias.",
                "Mengalikan vektor sinyal dengan vektor gerbang bernilai [0, 1] secara elemen-demi-elemen untuk melemahkan, mematikan, atau meloloskan sinyal.",
                "Membagi vektor sinyal dengan total panjang sekuens.",
                "Menggunakan fungsi aktivasi ReLU secara berulang."
            ],
            correctIndex: 1,
            explanation: "Gating bekerja dengan mengalikan vektor sinyal dengan vektor gerbang (output sigmoid [0, 1]). Jika gerbang bernilai 1.0, sinyal lolos penuh. Jika 0.5, sinyal dilemahkan separuh. Jika 0.0, sinyal diblokir/dimatikan sepenuhnya."
        },
        {
            id: 56,
            topic: "Generative Adversarial Networks",
            question: "Siapakah pencipta utama arsitektur Generative Adversarial Networks (GAN) yang mempublikasikan paper legendarisnya di tahun 2014?",
            options: [
                "Yann LeCun",
                "Ian Goodfellow",
                "Geoffrey Hinton",
                "Andrew Ng"
            ],
            correctIndex: 1,
            explanation: "Ian Goodfellow et al. mempublikasikan paper pertama berjudul 'Generative Adversarial Networks' pada tahun 2014 yang memperkenalkan arsitektur persaingan adversarial ini."
        },
        {
            id: 57,
            topic: "Convolutional Neural Networks",
            question: "Sebuah citra berukuran 7x7 piksel diproses dengan filter konvolusi berukuran 3x3, padding = 1, dan stride = 2. Berapakah ukuran output feature map yang dihasilkan?",
            options: [
                "5x5 piksel",
                "4x4 piksel",
                "3x3 piksel",
                "7x7 piksel"
            ],
            correctIndex: 1,
            explanation: "Menggunakan rumus: O = (W - K + 2P)/S + 1. Maka O = (7 - 3 + 2*1)/2 + 1 = (4 + 2)/2 + 1 = 6/2 + 1 = 3 + 1 = 4. Jadi output berukuran 4x4 piksel.",
            latex: cnnSizeFormulaCalc
        },
        {
            id: 58,
            topic: "Deep Unsupervised Learning",
            question: "Mengapa unit-unit di dalam visible dan hidden layer pada Restricted Boltzmann Machine (RBM) bersifat stokastik?",
            options: [
                "Agar proses feed-forward berjalan lebih cepat secara linear.",
                "Untuk memodelkan distribusi probabilitas gabungan antara input dan fitur tersembunyi secara probabilistik menggunakan sampling Gibbs.",
                "Untuk meniru lateral inhibition sel saraf biologis.",
                "Karena RBM tidak memiliki parameter bias."
            ],
            correctIndex: 1,
            explanation: "RBM menggunakan unit stokastik (probabilistik) untuk mempelajari representasi probabilitas gabungan dari data. Ini memungkinkan RBM menghasilkan sampling dan merekonstruksi data secara probabilistik."
        },
        {
            id: 59,
            topic: "Introduction to ML",
            question: "Dalam perbandingan alur input-output, manakah perbedaan yang benar antara Pemrograman Tradisional dengan Machine Learning?",
            options: [
                "Pemrograman tradisional menerima Data dan Model untuk menghasilkan Aturan.",
                "Pemrograman tradisional menerima Data dan Aturan untuk menghasilkan Jawaban, sedangkan Machine Learning menerima Data dan Contoh Jawaban untuk menghasilkan Model (Aturan Baru).",
                "Machine Learning menerima Aturan secara manual untuk menghasilkan Data baru.",
                "Tidak ada perbedaan, keduanya beroperasi dengan cara yang sama."
            ],
            correctIndex: 1,
            explanation: "Dalam pemrograman tradisional, manusia menulis aturan (rules) untuk memproses data guna menghasilkan jawaban. Dalam Machine Learning, kita memasukkan data dan contoh jawaban (labels) agar komputer mencari aturan/model tersebut sendiri secara otomatis."
        },
        {
            id: 60,
            topic: "Artificial Neural Networks",
            question: "Manakah pernyataan di bawah ini yang membedakan Stochastic Gradient Descent (SGD) secara fundamental dari Batch Gradient Descent?",
            options: [
                "SGD menghitung gradien menggunakan seluruh data training secara serentak.",
                "SGD menghitung gradien dan memperbarui bobot berdasarkan tepat 1 data sampel acak di setiap iterasi, serta melakukan pengacakan (shuffling) data setiap selesai 1 epoch.",
                "SGD tidak menggunakan learning rate dalam pembaruan bobot.",
                "SGD selalu menjamin konvergensi yang mulus tanpa fluktuasi loss."
            ],
            correctIndex: 1,
            explanation: "Batch GD menghitung gradien dari seluruh N data latih sekaligus per iterasi (sangat lambat). SGD memperbarui bobot berdasarkan satu data acak per iterasi dan melakukan shuffle data setiap akhir epoch untuk variabilitas yang baik."
        }
    ];

    // State Variables using Svelte 5 Runes
    let testMode = $state<"study" | "exam">("study");
    let userAnswers = $state<Record<number, number>>({});
    let examSubmitted = $state(false);
    let showExpl = $state<Record<number, boolean>>({});
    let activeQuestionIndex = $state(0);

    const q = $derived(questions[activeQuestionIndex]);
    const selectedOpt = $derived(userAnswers[q.id]);
    const hasAnswered = $derived(selectedOpt !== undefined);
    const isCorrectAnswer = $derived(selectedOpt === q.correctIndex);

    const score = $derived.by(() => {
        let count = 0;
        questions.forEach((q) => {
            if (userAnswers[q.id] === q.correctIndex) {
                count++;
            }
        });
        return count;
    });

    const isCompleted = $derived(Object.keys(userAnswers).length === questions.length);

    function selectOption(qId: number, optIndex: number) {
        if (examSubmitted && testMode === "exam") return;
        userAnswers[qId] = optIndex;
        if (testMode === "study") {
            showExpl[qId] = true;
        }
    }

    function resetQuiz() {
        userAnswers = {};
        examSubmitted = false;
        showExpl = {};
        activeQuestionIndex = 0;
    }

    function submitExam() {
        examSubmitted = true;
    }

    function changeMode(mode: "study" | "exam") {
        testMode = mode;
        resetQuiz();
    }
</script>

<svelte:head>
    <title>Latihan Soal Persiapan UAS - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Latihan Soal Persiapan UAS"
        date="28 Juni 2026"
        status="done"
        tags={["kuis", "latihan", "uas", "kbl"]}
    />

    <NoteSection title="1. Mode Latihan Kuis">
        <p>
            Selamat datang di pusat latihan UAS Kecerdasan Buatan Lanjut. Kuis ini dirancang untuk menguji pemahaman komprehensif kamu terhadap semua detail dari 11 slide kuliah.
        </p>
        <p>Pilih mode belajarmu:</p>
        <div class="mode-selector" style="display: flex; gap: 1rem; margin: 1rem 0;">
            <button
                class="mode-btn"
                class:active={testMode === "study"}
                onclick={() => changeMode("study")}
                style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-line); background: {testMode === 'study' ? 'var(--color-status-info-soft)' : 'var(--color-surface-soft)'}; color: {testMode === 'study' ? 'var(--color-binder)' : 'var(--color-ink)'}; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            >
                BookOpen Study Mode (Instant Feedback)
            </button>
            <button
                class="mode-btn"
                class:active={testMode === "exam"}
                onclick={() => changeMode("exam")}
                style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-line); background: {testMode === 'exam' ? 'var(--color-status-warning-soft)' : 'var(--color-surface-soft)'}; color: {testMode === 'exam' ? 'var(--color-status-warning-border)' : 'var(--color-ink)'}; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            >
                Award Exam Mode (Submit at the End)
            </button>
        </div>
    </NoteSection>

    <div class="quiz-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; margin-top: 1.5rem;">
        <!-- Left Sidebar: Question Navigation -->
        <aside class="q-sidebar" style="background: var(--color-surface-elevated); padding: 1rem; border-radius: 8px; border: 1px solid var(--color-line); max-height: 700px; overflow-y: auto;">
            <h4 style="margin-top: 0; color: var(--color-binder); font-family: var(--font-handwriting); border-bottom: 2px solid var(--color-line); padding-bottom: 0.5rem;">Daftar Soal</h4>
            <div class="q-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                {#each questions as q, idx}
                    {@const isAnswered = userAnswers[q.id] !== undefined}
                    {@const isCurrent = activeQuestionIndex === idx}
                    {@const isCorrect = testMode === "study" && userAnswers[q.id] === q.correctIndex}
                    {@const isWrong = testMode === "study" && isAnswered && userAnswers[q.id] !== q.correctIndex}
                    {@const isExamCorrect = examSubmitted && userAnswers[q.id] === q.correctIndex}
                    {@const isExamWrong = examSubmitted && isAnswered && userAnswers[q.id] !== q.correctIndex}
                    <button
                        onclick={() => activeQuestionIndex = idx}
                        style="aspect-ratio: 1; border-radius: 6px; border: 1px solid var(--color-line); font-weight: bold; cursor: pointer; font-size: 0.85rem;
                        background: {
                            isCurrent ? 'var(--color-binder)' :
                            (testMode === 'study' && isCorrect) || (testMode === 'exam' && isExamCorrect) ? 'var(--color-status-done-start)' :
                            (testMode === 'study' && isWrong) || (testMode === 'exam' && isExamWrong) ? 'var(--color-status-error-start)' :
                            isAnswered ? 'var(--color-surface-soft)' : 'var(--color-surface-elevated)'
                        };
                        color: {isCurrent || (testMode === 'study' && isAnswered) || examSubmitted ? '#fff' : 'var(--color-ink)'};"
                    >
                        {q.id}
                    </button>
                {/each}
            </div>
            
            <div class="sidebar-footer" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-line);">
                {#if testMode === "exam"}
                    {#if !examSubmitted}
                        <button
                            onclick={submitExam}
                            disabled={!isCompleted}
                            style="width: 100%; padding: 0.75rem; border-radius: 6px; background: {isCompleted ? 'var(--color-status-done-start)' : 'var(--color-line)'}; color: #fff; border: none; font-weight: bold; cursor: {isCompleted ? 'pointer' : 'not-allowed'};"
                        >
                            Submit Exam
                        </button>
                        <p style="font-size: 0.75rem; color: var(--color-ink-muted); text-align: center; margin-top: 0.5rem;">
                            {!isCompleted ? `Jawab semua soal (${Object.keys(userAnswers).length}/${questions.length}) untuk submit.` : "Semua soal telah dijawab!"}
                        </p>
                    {:else}
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; font-weight: 800; color: var(--color-binder);">{score} / {questions.length}</div>
                            <div style="font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem;">Skor Kamu ({(score/questions.length*100).toFixed(1)}%)</div>
                            <button
                                onclick={resetQuiz}
                                style="width: 100%; padding: 0.5rem; border-radius: 6px; background: var(--color-surface-soft); border: 1px solid var(--color-line); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.25rem;"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    {/if}
                {:else}
                    <button
                        onclick={resetQuiz}
                        style="width: 100%; padding: 0.6rem; border-radius: 6px; background: var(--color-surface-soft); border: 1px solid var(--color-line); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.25rem; font-weight: bold;"
                    >
                        Reset Kuis
                    </button>
                {/if}
            </div>
        </aside>

        <!-- Right Side: Active Question Display -->
        <main class="question-container" style="background: var(--color-surface-elevated); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-line); display: flex; flex-direction: column; justify-content: space-between; min-height: 500px;">
            <div>
                <div class="q-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-line); padding-bottom: 0.75rem; margin-bottom: 1rem;">
                    <span style="background: var(--color-surface-soft); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; color: var(--color-binder);">{q.topic}</span>
                    <span style="font-size: 0.85rem; font-weight: bold; color: var(--color-ink-muted);">Soal {activeQuestionIndex + 1} dari {questions.length}</span>
                </div>

                <h3 style="margin-top: 0; line-height: 1.5; font-size: 1.15rem; color: var(--color-ink);">{q.question}</h3>

                {#if q.latex}
                    <div style="margin: 1rem 0; padding: 0.5rem; background: var(--color-surface-soft); border-radius: 6px;">
                        <MathBlock latex={q.latex} />
                    </div>
                {/if}

                <div class="options-list" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem;">
                    {#each q.options as opt, optIdx}
                        {@const isSelected = selectedOpt === optIdx}
                        {@const isCorrect = q.correctIndex === optIdx}
                        {@const isWrong = isSelected && !isCorrect}
                        
                        <button
                            onclick={() => selectOption(q.id, optIdx)}
                            style="text-align: left; padding: 1rem; border-radius: 8px; border: 1px solid var(--color-line); font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: space-between;
                            background: {
                                isSelected && (testMode === 'study' || examSubmitted) ? 
                                    (isCorrect ? 'var(--color-status-done-soft)' : 'var(--color-status-error-soft)') :
                                    (testMode === 'study' || examSubmitted) && isCorrect ? 'var(--color-status-done-soft)' :
                                    isSelected ? 'var(--color-surface-soft)' : 'var(--color-surface-elevated)'
                            };
                            border-color: {
                                isSelected && (testMode === 'study' || examSubmitted) ? 
                                    (isCorrect ? 'var(--color-status-done-start)' : 'var(--color-status-error-start)') :
                                    (testMode === 'study' || examSubmitted) && isCorrect ? 'var(--color-status-done-start)' :
                                    isSelected ? 'var(--color-binder)' : 'var(--color-line)'
                            };"
                        >
                            <span>{opt}</span>
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Explanations / Feedback Footer -->
            <div class="q-footer" style="margin-top: 2rem; border-top: 1px solid var(--color-line); padding-top: 1.5rem;">
                {#if (testMode === "study" && showExpl[q.id]) || (testMode === "exam" && examSubmitted)}
                    <Callout type={isCorrectAnswer ? "tip" : "danger"} title={isCorrectAnswer ? "Jawaban Benar! 🎉" : "Jawaban Kurang Tepat 💡"}>
                        <p style="margin: 0; line-height: 1.6; font-size: 0.9rem;">
                            <strong>Pembahasan:</strong> {q.explanation}
                        </p>
                    </Callout>
                {/if}

                <div class="navigation-buttons" style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <button
                        onclick={() => activeQuestionIndex = Math.max(0, activeQuestionIndex - 1)}
                        disabled={activeQuestionIndex === 0}
                        style="padding: 0.5rem 1.25rem; border-radius: 6px; border: 1px solid var(--color-line); background: var(--color-surface-soft); cursor: {activeQuestionIndex === 0 ? 'not-allowed' : 'pointer'}; opacity: {activeQuestionIndex === 0 ? 0.5 : 1};"
                    >
                        Sebelumnya
                    </button>
                    <button
                        onclick={() => activeQuestionIndex = Math.min(questions.length - 1, activeQuestionIndex + 1)}
                        disabled={activeQuestionIndex === questions.length - 1}
                        style="padding: 0.5rem 1.25rem; border-radius: 6px; border: 1px solid var(--color-line); background: var(--color-surface-soft); cursor: {activeQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer'}; opacity: {activeQuestionIndex === questions.length - 1 ? 0.5 : 1};"
                    >
                        Berikutnya
                    </button>
                </div>
            </div>
        </main>
    </div>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .mode-btn {
        transition: all 0.2s ease-in-out;
    }
    .mode-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
</style>
