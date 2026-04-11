<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import LinearRegressionVisualizer from "./components/LinearRegressionVisualizer.svelte";

    const singleFeatureModel = String.raw`\hat{y} = wx + b`;
    const multiFeatureModel = String.raw`\hat{y} = w_1x_1 + w_2x_2 + \cdots + w_nx_n + b`;
    const mseFormula = String.raw`J(w,b) = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)^2`;
    const gradientUpdateFormula = String.raw`w := w - \alpha \frac{\partial J}{\partial w}, \quad b := b - \alpha \frac{\partial J}{\partial b}`;
    const dwFormula = String.raw`\frac{\partial J}{\partial w} = \frac{2}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)x_i`;
    const dbFormula = String.raw`\frac{\partial J}{\partial b} = \frac{2}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)`;
    const chainRuleFormula = String.raw`\hat{y}_i = wx_i + b \Rightarrow \frac{\partial \hat{y}_i}{\partial w}=x_i,\;\frac{\partial \hat{y}_i}{\partial b}=1`;
    const maeFormula = String.raw`\text{MAE} = \frac{1}{m} \sum_{i=1}^{m} |\hat{y}_i - y_i|`;
    const r2Formula = String.raw`R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}`;
    const residualFormula = String.raw`r_i = y_i - \hat{y}_i`;
    const yHatSymbol = String.raw`\hat{y}`;
    const yHatIndexedSymbol = String.raw`\hat{y}_i`;
    const alphaSymbol = String.raw`\alpha`;
    const wStarSymbol = String.raw`w^*`;
    const bStarSymbol = String.raw`b^*`;
    const r2Symbol = String.raw`R^2`;
</script>

<svelte:head>
    <title>Regresi Linear - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi dasar regresi linear: model, fungsi biaya, dan cara menghubungkan prediksi dengan proses optimasi."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Regresi Linear"
        date="11 April 2026"
        status="done"
        tags={['Regresi', 'Optimasi', 'Model Linear']}
    />

    <NoteSection title="Apa Itu Regresi Linear?">
        <p>
            Regresi linear adalah model yang memetakan hubungan antara variabel
            input dan output secara linear terhadap parameternya. Untuk satu
            fitur, bentuknya terlihat seperti garis lurus; untuk banyak fitur,
            bentuknya menjadi bidang atau hyperplane. Tujuannya bukan hanya
            menebak nilai, tetapi membangun model yang paling cocok terhadap
            data yang tersedia.
        </p>
        <Callout type="info" title="Inti konsep">
            Dalam regresi linear, kita mencari parameter terbaik agar prediksi
            model sedekat mungkin dengan nilai asli.
        </Callout>
    </NoteSection>

    <NoteSection title="Bentuk Model">
        <p>Untuk satu fitur, bentuk paling sederhana adalah:</p>
        <MathBlock latex={singleFeatureModel} />
        <p>
            Di sini <code>w</code> adalah bobot, <code>b</code> adalah bias,
            <code>x</code> adalah input, dan <MathBlock latex={yHatSymbol} displayMode={false} />
            adalah nilai prediksi.
        </p>
        <p>
            Kalau fiturnya lebih dari satu, modelnya menjadi:
        </p>
        <MathBlock latex={multiFeatureModel} />
        <p>
            Keterangan simbol: <code>w</code> atau <code>w_j</code> adalah bobot,
            <code>b</code> adalah bias, <code>x</code> atau <code>x_j</code> adalah
            fitur input, dan <MathBlock latex={yHatSymbol} displayMode={false} /> adalah
            hasil prediksi.
        </p>
    </NoteSection>

    <NoteSection title="Kenapa Ini Termasuk Optimasi?">
        <p>
            Karena kita tidak sekadar menulis rumus. Kita perlu mencari parameter
            <code>w</code> dan <code>b</code> yang meminimalkan error prediksi.
            Salah satu fungsi biaya yang paling umum adalah mean squared error
            (MSE).
        </p>
        <MathBlock latex={mseFormula} />
        <p>
            Semakin kecil nilai <code>J</code>, semakin baik model menyesuaikan
            data latih.
        </p>
        <p>
            Di rumus ini, <code>m</code> adalah jumlah sampel data,
            <code>y_i</code> adalah nilai aktual sampel ke-<code>i</code>, dan
            <MathBlock latex={yHatIndexedSymbol} displayMode={false} /> adalah nilai
            prediksinya.
        </p>
        <Callout type="tip" title="Cara berpikirnya">
            Regresi linear = model + fungsi biaya + proses mencari parameter
            terbaik.
        </Callout>
    </NoteSection>

    <NoteSection title="Proses Training (Gradient Descent)">
        <p>
            Supaya model benar-benar belajar dari data, parameter tidak boleh
            dipilih manual terus-menerus. Kita update <code>w</code> dan
            <code>b</code> secara iteratif menggunakan gradient descent.
        </p>
        <MathBlock latex={gradientUpdateFormula} />
        <p>
            <MathBlock latex={alphaSymbol} displayMode={false} /> adalah learning rate. Jika terlalu besar,
            training bisa tidak stabil; jika terlalu kecil, konvergensi lambat.
        </p>
        <Callout type="info" title="Alpha itu apa?">
            Alpha adalah ukuran langkah saat kita mengubah parameter pada setiap
            iterasi. Nilai alpha mengontrol seberapa cepat model bergerak menuju
            titik minimum loss.
        </Callout>
        <ul>
            <li>Alpha terlalu besar: loss bisa naik-turun liar dan gagal konvergen.</li>
            <li>Alpha terlalu kecil: training aman, tapi sangat lambat.</li>
            <li>Praktik umum: coba beberapa nilai (misal 0.1, 0.01, 0.001) lalu pilih yang loss-nya turun stabil.</li>
        </ul>
        <CodeBlock
            language="python"
            filename="gradient_descent_step.py"
            code={`def train_step(x, y, w, b, alpha):
    m = len(x)
    dw = 0.0
    db = 0.0

    for xi, yi in zip(x, y):
        y_hat = w * xi + b
        err = y_hat - yi
        dw += err * xi
        db += err

    dw = (2 / m) * dw
    db = (2 / m) * db

    w = w - alpha * dw
    b = b - alpha * db
    return w, b`}
        />
    </NoteSection>

    <NoteSection title="Dapatkan w dan b Optimal: Penurunan Rumus">
        <p>
            Intinya, nilai <code>w</code> dan <code>b</code> optimal adalah nilai
            yang membuat fungsi biaya minimum. Karena fungsi biaya berbentuk
            kuadrat, kita bisa pakai turunan untuk melihat arah penurunan loss.
        </p>
        <p>
            Mulai dari fungsi biaya:
        </p>
        <MathBlock latex={mseFormula} />
        <p>
            Dengan aturan rantai untuk model linear:
        </p>
        <MathBlock latex={chainRuleFormula} />
        <p>
            Maka gradien terhadap parameter menjadi:
        </p>
        <MathBlock latex={dwFormula} />
        <MathBlock latex={dbFormula} />
        <p>
            Setelah gradien didapat, lakukan update berulang sampai perubahan
            loss sangat kecil (konvergen) atau iterasi maksimum tercapai.
        </p>
        <MathBlock latex={gradientUpdateFormula} />
        <Callout type="tip" title="Intuisi update parameter">
            Jika gradien bernilai positif, parameter diturunkan. Jika gradien
            bernilai negatif, parameter dinaikkan. Tujuannya selalu sama:
            bergerak ke arah loss yang lebih kecil.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Training Sampai Konvergen">
        <p>
            Contoh ini memakai data kecil dengan sedikit noise agar lebih mirip
            kondisi nyata, bukan data yang sudah sempurna linear.
        </p>
        <CodeBlock
            language="python"
            filename="linear_regression_train.py"
            code={`def predict(x, w, b):
    return w * x + b


def mean_squared_error(y_true, y_pred):
    return sum((yp - yt) ** 2 for yt, yp in zip(y_true, y_pred)) / len(y_true)


def train_linear_regression(x, y, alpha=0.01, epochs=5000, tol=1e-9):
    w = 0.0
    b = 0.0
    m = len(x)
    prev_loss = float("inf")

    for _ in range(epochs):
        predictions = [predict(xi, w, b) for xi in x]
        errors = [yp - yt for yp, yt in zip(predictions, y)]

        dw = (2 / m) * sum(err * xi for err, xi in zip(errors, x))
        db = (2 / m) * sum(errors)

        w = w - alpha * dw
        b = b - alpha * db

        loss = mean_squared_error(y, [predict(xi, w, b) for xi in x])
        if abs(prev_loss - loss) < tol:
            break
        prev_loss = loss

    return w, b, loss


x = [1, 2, 3, 4, 5]
y = [2.0, 4.1, 6.3, 7.9, 10.2]
w_opt, b_opt, final_loss = train_linear_regression(x, y)

print("w* =", w_opt)
print("b* =", b_opt)
print("final loss =", final_loss)`}
    />
        <p>
            Dari sini, <MathBlock latex={wStarSymbol} displayMode={false} /> dan <MathBlock latex={bStarSymbol} displayMode={false} /> adalah estimasi
            parameter optimal untuk data latih yang digunakan.
        </p>
    </NoteSection>

    <NoteSection title="Contoh Sederhana">
        <p>
            Misalkan kita punya data jam belajar dan nilai ujian. Model akan
            mencoba menarik garis yang paling masuk akal untuk menjelaskan pola
            naik-turunnya data, meski tidak semua titik harus pas di garis.
        </p>
        <CodeBlock
            language="python"
            filename="linear_regression_demo.py"
            code={`def predict(x, w, b):
    return w * x + b


def mean_squared_error(y_true, y_pred):
    total = 0
    for actual, predicted in zip(y_true, y_pred):
        total += (predicted - actual) ** 2
    return total / len(y_true)


x = [1, 2, 3, 4, 5]
y = [2.0, 4.1, 6.3, 7.9, 10.2]
w = 1.95
b = 0.2

predictions = [predict(value, w, b) for value in x]
loss = mean_squared_error(y, predictions)

print(predictions)
print(loss)`}
    />
        />
        <p>
            Kalau nilai loss masih besar, berarti parameter belum optimal dan
            perlu diperbaiki lewat proses optimasi. Pada praktiknya, langkah
            prediksi-loss ini diulang berkali-kali sambil memperbarui parameter.
        </p>
    </NoteSection>

    <NoteSection title="Asumsi dan Batasan Penting">
        <ul>
            <li>Hubungan input-output diasumsikan cukup linear.</li>
            <li>Error idealnya independen; pada model dengan intercept, residual di data latih biasanya berjumlah mendekati nol.</li>
            <li>Varians error relatif konstan (homoskedastis).</li>
            <li>Regresi linear sensitif terhadap outlier ekstrem.</li>
        </ul>
        <Callout type="warning" title="Kapan hasil bisa menipu?">
            Jika pola data sebenarnya non-linear kuat, model linear bisa terlihat
            sederhana tetapi memberi bias prediksi yang besar.
        </Callout>
        <Callout type="info" title="Kenapa asumsi ini penting?">
            Asumsi-asumsi ini paling terasa saat kita ingin menafsirkan koefisien,
            menilai residual, atau memakai model untuk inferensi statistik. Untuk
            sekadar prediksi, model masih bisa dipakai selama performanya cukup baik
            di data uji.
        </Callout>
    </NoteSection>

    <NoteSection title="Regresi Linear Dipakai Untuk Apa?">
        <p>
            Regresi linear cocok saat kita ingin memprediksi nilai kontinu dan
            butuh model yang mudah dijelaskan ke orang non-teknis.
        </p>
        <p>
            Contoh penggunaan umum:
        </p>
        <ul>
            <li>Prediksi nilai ujian dari jam belajar.</li>
            <li>Estimasi penjualan dari budget iklan.</li>
            <li>Prediksi biaya operasional dari volume produksi.</li>
            <li>Baseline model sebelum memakai model yang lebih kompleks.</li>
        </ul>
        <Callout type="tip" title="Bagus untuk apa?">
            Bagus untuk hubungan yang relatif linear, dataset kecil-menengah,
            dan situasi ketika interpretasi koefisien lebih penting daripada
            akurasi maksimum.
        </Callout>
        <Callout type="warning" title="Kurang bagus untuk apa?">
            Kurang bagus untuk pola sangat non-linear, data dengan banyak
            outlier ekstrem, atau relasi yang melibatkan interaksi kompleks
            tanpa rekayasa fitur tambahan.
        </Callout>
    </NoteSection>

    <NoteSection title="Visualisasi Interaktif Regresi + Residual">
        <p>
            Coba ubah nilai <code>w</code>, <code>b</code>, dan <MathBlock latex={alphaSymbol} displayMode={false} />
            lalu lihat bagaimana garis prediksi, residual, dan loss ikut berubah.
        </p>
        <LinearRegressionVisualizer />
        <Callout type="tip" title="Cara baca cepat">
            Residual yang tersebar acak di sekitar nol biasanya menandakan model
            linear cukup masuk akal. Jika muncul pola melengkung, pertimbangkan
            fitur non-linear atau model lain.
        </Callout>
    </NoteSection>

    <NoteSection title="Residual Itu Apa?">
        <p>
            Residual adalah selisih antara nilai aktual dan nilai prediksi model.
        </p>
        <MathBlock latex={residualFormula} />
        <ul>
            <li><code>r_i &gt; 0</code>: model memprediksi terlalu rendah (under-predict).</li>
            <li><code>r_i &lt; 0</code>: model memprediksi terlalu tinggi (over-predict).</li>
            <li><code>|r_i|</code> makin besar: error untuk sampel itu makin besar.</li>
        </ul>
        <p>
            Di residual plot, kondisi yang diharapkan adalah titik residual
            menyebar acak di sekitar garis nol tanpa pola tertentu.
        </p>
        <Callout type="warning" title="Sinyal masalah dari residual">
            Jika residual membentuk pola lengkung, kipas (makin melebar), atau
            tren sistematis, biasanya model linear belum cukup merepresentasikan
            data.
        </Callout>
    </NoteSection>

    <NoteSection title="Evaluasi Model">
        <p>
            Selain MSE, biasanya kita lihat MAE dan <MathBlock latex={r2Symbol} displayMode={false} /> agar
            interpretasi performa lebih lengkap.
        </p>
        <MathBlock latex={maeFormula} />
        <MathBlock latex={r2Formula} />
        <ul>
            <li>MSE: lebih sensitif terhadap error besar.</li>
            <li>MAE: mudah diinterpretasi dalam satuan asli target.</li>
            <li><MathBlock latex={r2Symbol} displayMode={false} />: proporsi variasi target yang dijelaskan model.</li>
        </ul>
        <p>
            Selalu bandingkan metrik pada data latih dan data uji untuk mengecek
            generalisasi, bukan hanya hafalan terhadap data latih.
        </p>
    </NoteSection>

    <NoteSection title="Ringkasan Praktis">
        <ul>
            <li>Regresi linear memodelkan hubungan input-output dengan garis lurus.</li>
            <li>Prediksi dihitung dari bobot dan bias.</li>
            <li>Fungsi biaya dipakai untuk mengukur seberapa jauh prediksi dari data asli.</li>
            <li>Optimasi mencari parameter yang membuat error sekecil mungkin.</li>
            <li>Residual membantu mengecek apakah pola error masih sesuai asumsi model linear.</li>
            <li>Evaluasi perlu beberapa metrik dan harus diuji di data yang belum dilatih.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Checklist Alur Praktik">
        <ol>
            <li>Siapkan data dan lakukan pembagian train-test.</li>
            <li>Inisialisasi parameter <code>w</code> dan <code>b</code>.</li>
            <li>Lakukan prediksi, hitung loss, lalu update parameter.</li>
            <li>Ulangi sampai konvergen atau mencapai jumlah iterasi tertentu.</li>
            <li>Evaluasi model pada data uji dengan MSE, MAE, dan <MathBlock latex={r2Symbol} displayMode={false} />.</li>
        </ol>
    </NoteSection>

    <BackLink href="/semester-1/pemodelan-dan-optimasi-lanjut" label="Kembali ke Pemodelan dan Optimasi Lanjut" />
</article>