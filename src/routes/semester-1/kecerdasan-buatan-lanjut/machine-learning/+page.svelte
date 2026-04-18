<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
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

    <NoteSection title="Apa Itu Machine Learning?">
        <p>
            <strong>Machine Learning (ML)</strong> adalah pendekatan dalam AI di mana sistem
            belajar pola dari data, lalu menggunakan pola tersebut untuk membuat
            prediksi atau keputusan tanpa diprogram aturan detail satu per satu.
        </p>
        <p>
            Secara praktis, ML dipakai untuk klasifikasi email spam,
            rekomendasi produk, prediksi permintaan, hingga deteksi anomali.
        </p>
    </NoteSection>

    <NoteSection title="Jenis Pembelajaran Utama">
        <ul>
            <li>
                <strong>Supervised Learning</strong>: model belajar dari data berlabel,
                misalnya prediksi lulus/tidak lulus berdasarkan histori nilai.
            </li>
            <li>
                <strong>Unsupervised Learning</strong>: model mencari struktur dari data
                tanpa label, misalnya segmentasi pelanggan.
            </li>
            <li>
                <strong>Reinforcement Learning</strong>: agen belajar melalui reward dan
                penalty dari interaksi dengan lingkungan.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Alur Kerja Machine Learning">
        <ol>
            <li>Kumpulkan dan pahami data.</li>
            <li>Lakukan pembersihan data dan feature engineering.</li>
            <li>Bagi data menjadi train, validation, dan test.</li>
            <li>Latih model dan lakukan tuning hyperparameter.</li>
            <li>Evaluasi model dengan metrik yang sesuai.</li>
            <li>Deploy model dan monitor performanya.</li>
        </ol>

        <Callout type="info">
            Kualitas data biasanya lebih menentukan hasil akhir dibanding pemilihan
            algoritma yang terlalu kompleks.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Mini: Klasifikasi Sederhana">
        <CodeBlock
            language="python"
            code={`from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.tree import DecisionTreeClassifier

X = [
    [2, 1], [1, 3], [3, 2], [2, 4], [1, 2], [3, 1],
    [6, 7], [7, 6], [8, 7], [6, 5], [7, 8], [8, 6]
]
y = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.33, random_state=42, stratify=y
)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred, zero_division=0))
print("Recall:", recall_score(y_test, y_pred, zero_division=0))
print("F1-score:", f1_score(y_test, y_pred, zero_division=0))`}
        />
        <p>
            Kode di atas menunjukkan pipeline dasar supervised learning:
            split data, training, prediksi, lalu evaluasi dengan beberapa metrik.
            Untuk studi nyata, biasanya metrik dihitung dengan data yang lebih besar
            dan divalidasi ulang (misalnya dengan cross-validation).
        </p>
    </NoteSection>

    <NoteSection title="Evaluasi dan Risiko Umum">
        <ul>
            <li><strong>Overfitting</strong>: model terlalu hafal data latih.</li>
            <li><strong>Underfitting</strong>: model terlalu sederhana, pola penting tidak tertangkap.</li>
            <li><strong>Data leakage</strong>: informasi masa depan bocor ke proses training.</li>
            <li><strong>Bias data</strong>: data tidak representatif sehingga prediksi tidak adil.</li>
        </ul>
        <Callout type="warning">
            Pilih metrik sesuai masalah. Untuk dataset tidak seimbang, akurasi saja
            sering menyesatkan; gunakan juga precision, recall, dan F1-score.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
