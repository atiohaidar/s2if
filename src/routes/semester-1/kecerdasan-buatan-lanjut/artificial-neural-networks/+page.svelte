<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    // LaTeX formulas defined inside script block to prevent Svelte HTML compiler errors
    const linearModel = String.raw`y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_d x_d`;
    const perceptronOutput = String.raw`\hat{y}_i = \text{sign}(w \cdot x_i + b)`;
    const errorIndicator = String.raw`E(w) = \frac{1}{N} \sum_{i=1}^N \mathbb{I}(y_i \neq \hat{y}_i)`;
    const perceptronUpdate = String.raw`w^{t+1} = w^t + \alpha(y_i - \hat{y}_i)x_i`;
    const sigmoidFormula = String.raw`\sigma(z) = \frac{1}{1 + e^{-z}}`;
    const sigmoidDerivative = String.raw`\sigma'(x) = \sigma(x) - \sigma(x)^2 = \sigma(x)(1 - \sigma(x))`;
    const tanhDerivative = String.raw`\sigma'(x) = 1 - \tanh^2(x)`;
    const logisticModel = String.raw`f(x) = \frac{1}{1 + e^{-(w \cdot x + b)}}`;
    const crossEntropyLoss = String.raw`E(w,b) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]`;
    const gradientUpdate = String.raw`w \leftarrow w - \alpha \frac{\partial E}{\partial w}`;
    
    // Matrix Math Example Formulas
    const matrixX = String.raw`X = \begin{pmatrix} 1 \\ 2 \end{pmatrix}`;
    const matrixW1 = String.raw`W_1 = \begin{pmatrix} 2 & 4 \\ 6 & 2 \\ 3 & 1 \end{pmatrix}`;
    const matrixHCalculation = String.raw`h = W_1 \cdot X = \begin{pmatrix} 2 & 4 \\ 6 & 2 \\ 3 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix} = \begin{pmatrix} 2\cdot 1 + 4\cdot 2 \\ 6\cdot 1 + 2\cdot 2 \\ 3\cdot 1 + 1\cdot 2 \end{pmatrix} = \begin{pmatrix} 10 \\ 10 \\ 5 \end{pmatrix}`;
    const matrixW2 = String.raw`W_2 = \begin{pmatrix} 1 & 3 & 5 \end{pmatrix}`;
    const matrixYCalculation = String.raw`y = W_2 \cdot h = \begin{pmatrix} 1 & 3 & 5 \end{pmatrix} \begin{pmatrix} 10 \\ 10 \\ 5 \end{pmatrix} = 10 + 30 + 25 = 65`;

    // Backprop 1-Layer formulas
    const bp1ForwardV = String.raw`v = W \cdot x^T + b`;
    const bp1ForwardA = String.raw`A = \frac{1}{1+e^{-v}} = \hat{y}`;
    const bp1Error = String.raw`E = y - \hat{y}`;
    const bp1dAdv = String.raw`\frac{\partial A}{\partial v} = A(1 - A)`;
    const bp1dvdW = String.raw`\frac{\partial v}{\partial W} = x, \quad \frac{\partial v}{\partial b} = 1`;
    const bp1dv = String.raw`dv = \frac{\partial A}{\partial v} \cdot E = A(1-A) \cdot E`;
    const bp1dW = String.raw`dW = dv \cdot x`;
    const bp1Update = String.raw`W = W + \alpha \cdot dW, \quad b = b + \alpha \cdot db`;

    // Backprop 2-Layer formulas
    const bp2Forward1 = String.raw`v_1 = W_1 \cdot x^T + b_1, \quad A_1 = \frac{1}{1+e^{-v_1}}`;
    const bp2Forward2 = String.raw`v_2 = W_2 \cdot A_1^T + b_2, \quad A_2 = \frac{1}{1+e^{-v_2}} = \hat{y}`;
    const bp2dv2 = String.raw`dv_2 = A_2(1-A_2) \cdot E`;
    const bp2dW2 = String.raw`dW_2 = dv_2 \cdot A_1, \quad db_2 = dv_2`;
    const bp2dA1 = String.raw`dA_1 = dv_2 \cdot W_2^T`;
    const bp2dv1 = String.raw`dv_1 = A_1(1-A_1) \cdot dA_1`;
    const bp2dW1 = String.raw`dW_1 = dv_1 \cdot x, \quad db_1 = dv_1`;
    const bp2Update = String.raw`W_1 = W_1 + \alpha \cdot dW_1, \quad W_2 = W_2 + \alpha \cdot dW_2`;

    const b1Symbol = String.raw`\beta_0`;
    const b2Symbol = String.raw`\beta_i`;
    const ySymbol = String.raw`y`;
    const classRange = "$\{-1, +1\}$";
    const indicatorFormula = String.raw`\mathbb{I}(y_i \neq \hat{y}_i)`;
    const rangeZeroOne = String.raw`[0, 1]`;
    const inputX = String.raw`x_1, x_2, \dots`;
    const sumSymbol = String.raw`\sum`;
    const phiSymbol = String.raw`\varphi`;
    const yHatSymbol = String.raw`\hat{y}`;
    const yInZeroOne = String.raw`y \in \{0, 1\}`;

    const quizQuestions = [
        {
            question: "Mengapa fungsi aktivasi non-linear sangat penting dalam arsitektur Multi-Layer Perceptron (MLP)?",
            options: [
                "Untuk mempercepat komputasi perkalian matriks.",
                "Tanpa fungsi non-linear, tumpukan banyak layer tersembunyi (hidden layers) akan menyusut menjadi operasi linear tunggal yang setara dengan satu layer saja.",
                "Untuk mencegah terjadinya vanishing gradient secara total pada semua jenis network.",
                "Untuk memastikan decision boundary yang dihasilkan selalu berbentuk lingkaran sempurna."
            ],
            correctIndex: 1,
            explanation: "Komposisi dari beberapa fungsi linear adalah fungsi linear. Tanpa aktivasi non-linear di antara layer, MLP sedalam apa pun hanya akan memetakan input-output secara linear, sama saja seperti Single Layer Perceptron biasa."
        },
        {
            question: "Manakah pernyataan yang BENAR mengenai perbedaan fungsi loss antara Linear Regression dan Logistic Regression?",
            options: [
                "Linear Regression menggunakan Cross-Entropy Loss, sedangkan Logistic Regression menggunakan Mean Squared Error (MSE).",
                "Logistic Regression menggunakan Cross-Entropy Loss karena penggunaan MSE pada output sigmoid menghasilkan fungsi biaya non-convex yang sulit dioptimasi.",
                "Kedua model menggunakan MSE karena selalu menghasilkan global optimum dengan Gradient Descent.",
                "Perceptron menggunakan Cross-Entropy loss sebagai default aturan belajarnya."
            ],
            correctIndex: 1,
            explanation: "Pada Logistic Regression, jika kita menggunakan MSE pada output non-linear sigmoid, fungsi biaya yang dihasilkan menjadi non-convex (memiliki banyak lokal minima) sehingga Gradient Descent sulit mencari global minimum. Oleh karena itu, digunakan Cross-Entropy Loss yang bersifat convex."
        }
    ];
</script>

<svelte:head>
    <title>Artificial Neural Networks - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Artificial Neural Networks"
        date="08 Mei 2026"
        status="done"
        tags={["Neural Networks", "Perceptron", "Backpropagation"]}
    />

    <NoteSection title="1. Sejarah & Motivasi: Pengklasifikasi Linear">
        <p>
            Hubungan input-output pada <strong>Linear Regression</strong> dimodelkan sebagai persamaan garis lurus multivariat:
        </p>
        <MathBlock latex={linearModel} />
        <p>
            Di mana <MathBlock latex={b1Symbol} displayMode={false} /> adalah y-intercept (bias) dan <MathBlock latex={b2Symbol} displayMode={false} /> adalah bobot slope (weight). Untuk melatih model, kita menggunakan pendekatan kuadrat terkecil (Least Square Error) untuk meminimalkan fungsi biaya (SSE/MSE) dengan mencari turunan pertamanya. Namun, perhitungan ini menjadi sangat mahal seiring bertambahnya dimensi fitur data.
        </p>
        <p>
            Untuk klasifikasi biner, target <MathBlock latex="y" displayMode={false} /> bersifat kategorikal <MathBlock latex={String.raw`\{-1, +1\}`} displayMode={false} />. Kita menggunakan fungsi diskriminatif tanda (<em>sign function</em>):
        </p>
        <MathBlock latex={perceptronOutput} />
        <p>
            <strong>Masalah Kuadrat Terkecil untuk Klasifikasi:</strong> Jika kita meminimalkan error kuadrat (MSE) untuk klasifikasi biner, titik data yang berada sangat jauh dari batas keputusan (decision boundary) akan memberikan penalti error yang teramat besar dan merusak model. Solusinya adalah meminimalkan jumlah kesalahan klasifikasi secara langsung menggunakan fungsi indikator:
        </p>
        <MathBlock latex={errorIndicator} />
    </NoteSection>

    <NoteSection title="2. Perceptron & Logistic Regression">
        <p><strong>Perceptron (Frank Rosenblatt, 1957):</strong></p>
        <p>
            Merupakan implementasi awal jaringan saraf tiruan. Mesin Mark I Perceptron terhubung ke kamera dengan sel foto CdS berukuran 20x20 piksel untuk mengenali huruf alfabet pada gambar 400 piksel.
        </p>
        <p>Aturan pembelajaran ad-hoc perceptron:</p>
        <MathBlock latex={perceptronUpdate} />
        <p>
            Algoritma ini dijamin akan konvergen menemukan hyperplane pemisah <strong>jika dan hanya jika</strong> kedua kelas data dapat dipisahkan secara linear (linearly separable). Jika tidak, algoritma akan berulang selamanya tanpa henti. Apabila data linearly separable, terdapat tidak terhingga jumlah hyperplane yang mungkin (pemilihan hyperplane optimal diselesaikan di materi SVM).
        </p>

        <p><strong>Logistic Regression:</strong></p>
        <p>
            Untuk klasifikasi biner <MathBlock latex={yInZeroOne} displayMode={false} />, nilai keluaran fungsi linear dilewatkan ke dalam fungsi <strong>Sigmoid (Logistic)</strong> agar nilainya berada di rentang <MathBlock latex={rangeZeroOne} displayMode={false} /> yang merepresentasikan probabilitas keanggotaan kelas.
        </p>
        <MathBlock latex={sigmoidFormula} />
        <MathBlock latex={logisticModel} />
        <p>
            Meskipun fungsi skornya non-linear, batas keputusan (decision boundary) dari Logistic Regression tetaplah linear.
        </p>
        <p>
            <strong>Loss Function:</strong> Logistic regression menggunakan <strong>Cross-Entropy Loss (Log Loss)</strong> karena penggunaan MSE pada output sigmoid menghasilkan fungsi biaya non-convex yang memiliki banyak lokal minima sehingga Gradient Descent sulit mencari global minimum.
        </p>
        <MathBlock latex={crossEntropyLoss} />
    </NoteSection>

    <NoteSection title="3. Algoritma Gradient Descent & Optimasi">
        <p>
            Gradient Descent digunakan untuk memperbarui bobot model secara bertahap dengan bergerak ke arah kemiringan negatif (gradient turunan parsial) dari fungsi error:
        </p>
        <MathBlock latex={gradientUpdate} />
        <p>
            Di mana <MathBlock latex={String.raw`\alpha`} displayMode={false} /> adalah learning rate yang menentukan ukuran langkah (step size) pembaruan bobot.
        </p>

        <p><strong>Tipe Gradient Descent berdasarkan jumlah data sampel:</strong></p>
        <ul>
            <li><strong>Vanilla Gradient Descent (Batch GD):</strong> Menggunakan seluruh <MathBlock latex={String.raw`N`} displayMode={false} /> contoh data latihan dalam setiap iterasi tunggal untuk menghitung gradien. Sangat lambat dan memakan memori jika dataset besar.</li>
            <li><strong>Stochastic Gradient Descent (SGD):</strong> Menggunakan tepat 1 contoh data acak di setiap iterasi. Data latihan di-shuffle ulang secara acak setiap setelah selesai 1 epoch. Jauh lebih cepat dan dinamis.</li>
        </ul>

        <p><strong>Hyperparameter Learning Rate &amp; Monitoring:</strong></p>
        <ul>
            <li><strong>Step size:</strong> Mengontrol seberapa jauh bobot diperbarui. Learning rate adalah hyperparameter paling krusial.</li>
            <li><strong>Coarse search (pencarian kasar):</strong> Teknik inisialisasi praktis dengan mencoba nilai sangat kecil (misal: <MathBlock latex={"10^{-6}"} displayMode={false} />), mencoba nilai sangat tinggi (misal: <MathBlock latex={"10^{-1}"} displayMode={false} />), kemudian mempersempit (narrowing) pencarian ke area nilai yang stabil.</li>
            <li><strong>Gap Akurasi Train/Val:</strong> Selisih (gap) antara akurasi training dan akurasi validation mengindikasikan tingkat keparahan overfitting (overfit indicator).</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Model Neuron: Biologis vs Buatan">
        <p>
            Artificial Neural Network terinspirasi oleh sistem saraf biologis, tetapi terdapat perbedaan cara kerja yang signifikan:
        </p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Komponen Biologis</th>
                        <th>Komponen Buatan (ANN)</th>
                        <th>Peran</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Dendrit</strong></td>
                        <td>Input Signals (<MathBlock latex={inputX} displayMode={false} />)</td>
                        <td>Menerima sinyal dari luar atau neuron lain</td>
                    </tr>
                    <tr>
                        <td><strong>Sinapsis</strong></td>
                        <td>Weights (<MathBlock latex={inputX} displayMode={false} />)</td>
                        <td>Mengatur kekuatan sambungan (bobot)</td>
                    </tr>
                    <tr>
                        <td><strong>Soma (Badan Sel)</strong></td>
                        <td>Summing Junction (<MathBlock latex={sumSymbol} displayMode={false} />) + Aktivasi (<MathBlock latex={phiSymbol} displayMode={false} />)</td>
                        <td>Menjumlahkan sinyal masukan dan mengaktifkan impuls</td>
                    </tr>
                    <tr>
                        <td><strong>Akson</strong></td>
                        <td>Output (<MathBlock latex={ySymbol} displayMode={false} />)</td>
                        <td>Menyalurkan hasil sinyal keluaran</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Callout type="warning" title="Batasan Analogi Otak">
            Jangan menyamakan ANN dengan otak manusia seutuhnya. Dendrit biologis mampu melakukan komputasi non-linear yang sangat rumit secara mandiri, dan sinapsis biologis merupakan sistem dinamis non-linear yang kompleks, bukan sekadar konstanta bobot statis.
        </Callout>
    </NoteSection>

    <NoteSection title="5. Multi-Layer Perceptron (MLP)">
        <p>
            Single Layer Perceptron hanya dapat menyelesaikan masalah klasifikasi linear (tidak dapat menyelesaikan gerbang XOR). Oleh karena itu disusunlah <strong>Multi-Layer Perceptron (MLP)</strong> (atau Feed-Forward Network) yang terdiri atas:
        </p>
        <ol>
            <li>Input Layer</li>
            <li>Hidden Layer(s) - menggunakan fungsi aktivasi non-linear</li>
            <li>Output Layer</li>
        </ol>
        <p>
            <strong>Kapasitas Jaringan:</strong> Semakin banyak layer dan neuron, kapasitas ekspresi fungsi model semakin rumit (Trade-off: model lebih rentan mengalami *overfitting* pada data latih).
        </p>

        <Callout type="tip" title="Studi Kasus: Perhitungan Matriks MLP (Slide 41-42)">
            <p><strong>Asumsi parameter model (mengabaikan fungsi aktivasi):</strong></p>
            <ul>
                <li>Vektor input 2 dimensi: <MathBlock latex={matrixX} displayMode={false} /></li>
                <li>1 hidden layer dengan 3 neuron, matriks bobotnya: <MathBlock latex={matrixW1} displayMode={false} /></li>
                <li>1 output neuron dengan bobot: <MathBlock latex={matrixW2} displayMode={false} /></li>
            </ul>
            <p><strong>1. Menghitung Output Hidden Layer (<MathBlock latex="h" displayMode={false} />):</strong></p>
            <MathBlock latex={matrixHCalculation} />
            <p><strong>2. Menghitung Output Akhir (<MathBlock latex="y" displayMode={false} />):</strong></p>
            <MathBlock latex={matrixYCalculation} />
        </Callout>

        <p><strong>Proses Backpropagation:</strong></p>
        <ul>
            <li><strong>Forward Pass:</strong> Menghitung sinyal masukan lapis demi lapis hingga menghasilkan output <MathBlock latex={yHatSymbol} displayMode={false} /> dan nilai loss error.</li>
            <li><strong>Backward Pass:</strong> Menghitung gradien loss terhadap setiap bobot dari arah belakang menggunakan <strong>aturan rantai (chain rule)</strong> kalkulus untuk memperbarui bobot menggunakan Gradient Descent.</li>
        </ul>

        <Callout type="info" title="Detail Formula: Backpropagation 1-Layer NN (Slide 56)">
            <p><strong>Forward Pass:</strong></p>
            <MathBlock latex={bp1ForwardV} />
            <MathBlock latex={bp1ForwardA} />
            <p><strong>Hitung Error:</strong></p>
            <MathBlock latex={bp1Error} />
            <p><strong>Backward Pass:</strong></p>
            <MathBlock latex={bp1dAdv} />
            <MathBlock latex={bp1dvdW} />
            <MathBlock latex={bp1dv} />
            <MathBlock latex={bp1dW} />
            <p><strong>Weight Update:</strong></p>
            <MathBlock latex={bp1Update} />
        </Callout>

        <Callout type="info" title="Detail Formula: Backpropagation 2-Layer NN (Slide 58-60)">
            <p><strong>Forward Pass:</strong></p>
            <MathBlock latex={bp2Forward1} />
            <MathBlock latex={bp2Forward2} />
            <p><strong>Hitung Error:</strong> <MathBlock latex={bp1Error} displayMode={false} /></p>
            <p><strong>Backward Pass (dari output ke input):</strong></p>
            <MathBlock latex={bp2dv2} />
            <MathBlock latex={bp2dW2} />
            <MathBlock latex={bp2dA1} />
            <MathBlock latex={bp2dv1} />
            <MathBlock latex={bp2dW1} />
            <p><strong>Weight Update:</strong></p>
            <MathBlock latex={bp2Update} />
        </Callout>
    </NoteSection>

    <NoteSection title="6. Fungsi Aktivasi Utama">
        <p>
            Fungsi aktivasi memperkenalkan sifat non-linearitas agar jaringan dapat mempelajari pola yang kompleks. Tanpa fungsi aktivasi, jaringan saraf sedalam apa pun hanya akan berupa tumpukan fungsi linear tunggal (<em>single linear sandwich</em>) yang memiliki kapasitas ekspresi setara dengan pengklasifikasi linear sederhana biasa.
        </p>
        <p>Beberapa fungsi aktivasi utama dan masalahnya berdasarkan slide:</p>
        <ul>
            <li>
                <strong>Sigmoid:</strong> <MathBlock latex={sigmoidFormula} displayMode={false} />. Memetakan output ke rentang $[0, 1]$. Turunannya: <MathBlock latex={sigmoidDerivative} displayMode={false} />. Memiliki <strong>3 Masalah Utama</strong>:
                <ul>
                    <li><em>Saturated neurons "kill" gradients:</em> Saat nilai input sangat besar atau kecil, gradien lokal bernilai mendekati nol, mematikan aliran gradien selama backward pass.</li>
                    <li><em>Outputs are not zero-centered:</em> Output selalu positif, membuat arah pembaruan gradien berkelok-kelok (zig-zag) dan memperlambat konvergensi.</li>
                    <li><em>exp() is compute expensive:</em> Operasi eksponensial relatif mahal secara komputasi dibanding operasi aritmatika sederhana.</li>
                </ul>
            </li>
            <li>
                <strong>Tanh (Hiperbolik Tangen):</strong> <MathBlock latex={String.raw`\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}`} displayMode={false} />. Memetakan output ke rentang $[-1, 1]$. Turunannya: <MathBlock latex={tanhDerivative} displayMode={false} />. Bersifat zero-centered (bagus untuk optimasi), namun masih memiliki masalah di mana gradien tetap mati (saturated) ketika neuron mengalami saturasi di ujung-ujung ekstrem.
            </li>
            <li>
                <strong>ReLU (Rectified Linear Unit):</strong> <MathBlock latex="f(z) = \max(0, z)" displayMode={false} />. Sangat populer karena sederhana, komputasi cepat (hanya thresholding), dan menghindari vanishing gradient untuk input positif.
            </li>
            <li>
                <strong>Leaky ReLU:</strong> <MathBlock latex="f(z) = \max(0.01z, z)" displayMode={false} />. Mencegah masalah "dead ReLU" dengan meloloskan gradien kecil kemiringan <MathBlock latex="0.01" displayMode={false} /> ketika <MathBlock latex="z &lt; 0" displayMode={false} />.
            </li>
            <li>
                <strong>ELU (Exponential Linear Unit):</strong> Menggunakan fungsi eksponensial untuk nilai negatif agar transisi lebih mulus di sekitar nol.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="7. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
