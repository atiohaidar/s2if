<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const hyperplaneFormula = String.raw`f(x) = w^T x + b`;
    const decisionRuleFormula = String.raw`\hat{y} = \text{sign}(w^T x + b)`;
    const functionalMarginFormula = String.raw`y_i(w^T x_i + b) \ge 1`;
    const marginFormula = String.raw`\text{margin} = \frac{2}{\lVert w \rVert}`;
    const objectiveFormula = String.raw`\min_{w,b} \frac{1}{2}\lVert w \rVert^2 + C \sum_{i=1}^{m} \max(0, 1 - y_i(w^T x_i + b))`;
    const kernelFormula = String.raw`K(x_i, x_j) = \phi(x_i)^T \phi(x_j)`;
    const rbfFormula = String.raw`K(x_i, x_j) = \exp(-\gamma \lVert x_i - x_j \rVert^2)`;
    const supportVectorFormula = String.raw`y_i(w^T x_i + b) = 1`;
    const slackFormula = String.raw`\xi_i \ge 0`;
</script>

<svelte:head>
    <title>Support Vector Machine - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi dasar Support Vector Machine: hyperplane, margin, support vector, hinge loss, dan kernel trick."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Support Vector Machine"
        date="16 April 2026"
        status="done"
        tags={['SVM', 'Klasifikasi', 'Kernel']}
    />

    <NoteSection title="Apa Itu Support Vector Machine?">
        <p>
            Support Vector Machine (SVM) adalah model pembelajaran mesin untuk
            klasifikasi yang mencari batas keputusan paling tegas di antara kelas.
            Intinya, SVM tidak hanya memisahkan kelas, tetapi juga berusaha
            membuat jarak pemisahnya selebar mungkin supaya generalisasi lebih baik.
        </p>
        <Callout type="info" title="Inti konsep">
            SVM mencari hyperplane yang memisahkan kelas dengan margin terbesar.
        </Callout>
    </NoteSection>

    <NoteSection title="Hyperplane dan Keputusan Kelas">
        <p>
            Untuk data dua kelas, SVM membangun hyperplane sebagai batas pemisah:
        </p>
        <MathBlock latex={hyperplaneFormula} />
        <p>
            Prediksi kelas ditentukan dari tanda nilai fungsi tersebut:
        </p>
        <MathBlock latex={decisionRuleFormula} />
        <p>
            Jika nilai fungsi positif, data masuk satu kelas. Jika negatif, data
            masuk kelas lain. Untuk kasus 2 dimensi, hyperplane adalah garis;
            untuk dimensi lebih tinggi, bentuknya tetap hyperplane.
        </p>
    </NoteSection>

    <NoteSection title="Kenapa Margin Penting?">
        <p>
            Dua model bisa sama-sama memisahkan data, tetapi model dengan margin
            lebih besar biasanya lebih stabil saat bertemu data baru. Margin adalah
            jarak aman antara hyperplane dan titik data terdekat dari tiap kelas.
        </p>
        <MathBlock latex={marginFormula} />
        <p>
            Saat data benar-benar terpisah sempurna, SVM mencari pemisah dengan
            margin maksimum. Titik data yang paling dekat dengan batas itu disebut
            support vector.
        </p>
        <MathBlock latex={supportVectorFormula} />
        <Callout type="tip" title="Kenapa support vector penting?">
            Karena hanya titik-titik inilah yang paling menentukan posisi batas
            keputusan. Kalau titik lain digeser sedikit, batas sering tidak berubah.
        </Callout>
    </NoteSection>

    <NoteSection title="Hard Margin dan Soft Margin">
        <p>
            Pada data ideal, semua titik bisa dipisahkan tanpa kesalahan. Ini
            disebut hard margin. Di dunia nyata, data sering berisik atau saling
            tumpang tindih, jadi kita pakai soft margin agar model tetap fleksibel.
        </p>
        <MathBlock latex={functionalMarginFormula} />
        <p>
            Untuk soft margin, kita tambahkan variabel slack agar sebagian titik
            boleh melanggar margin dengan toleransi tertentu:
        </p>
        <MathBlock latex={slackFormula} />
        <p>
            Nilai <code>C</code> mengontrol kompromi antara margin besar dan
            penalti kesalahan. <code>C</code> besar membuat model lebih ketat terhadap
            error, sedangkan <code>C</code> kecil memberi ruang lebih banyak pada data yang
            sulit dipisahkan.
        </p>
        <Callout type="warning" title="Kalau C terlalu besar">
            Model bisa terlalu fokus mengejar data latih dan menjadi kurang tahan
            terhadap noise.
        </Callout>
    </NoteSection>

    <NoteSection title="Fungsi Objektif SVM">
        <p>
            SVM biasanya diformulasikan sebagai optimasi yang menyeimbangkan margin
            dan penalti kesalahan klasifikasi. Salah satu bentuk umumnya adalah:
        </p>
        <MathBlock latex={objectiveFormula} />
        <p>
            Bagian <code>1/2 ||w||^2</code> mendorong margin yang besar, sedangkan
            hinge loss memberi penalti untuk titik yang salah klasifikasi atau
            terlalu dekat ke batas. Ini membuat SVM bekerja seperti optimasi yang
            mencari batas paling aman.
        </p>
    </NoteSection>

    <NoteSection title="Hinge Loss">
        <p>
            Hinge loss adalah fungsi kerugian yang sangat cocok untuk klasifikasi
            margin-based. Jika titik sudah aman di luar margin, penalti kecil atau
            nol. Jika titik melanggar margin, penalti naik cepat.
        </p>
        <ul>
            <li>Jika <code>y_i(w^T x_i + b) &gt;= 1</code>, titik berada di luar margin.</li>
            <li>Jika <code>0 &lt; y_i(w^T x_i + b) &lt; 1</code>, titik benar tetapi masih di dalam margin.</li>
            <li>Jika <code>y_i(w^T x_i + b) &lt;= 0</code>, titik salah klasifikasi.</li>
        </ul>
        <Callout type="info" title="Bedanya dengan regresi">
            Regresi mengejar error nilai kontinu. SVM mengejar batas keputusan yang
            memisahkan kelas dengan margin terbesar.
        </Callout>
    </NoteSection>

    <NoteSection title="Kernel Trick">
        <p>
            Tidak semua data bisa dipisahkan dengan garis lurus di ruang asli.
            Kernel trick membantu SVM memetakan data ke ruang fitur yang lebih tinggi
            tanpa harus menghitung transformasinya secara eksplisit.
        </p>
        <MathBlock latex={kernelFormula} />
        <p>
            Salah satu kernel populer adalah RBF:
        </p>
        <MathBlock latex={rbfFormula} />
        <p>
            Dengan kernel, data yang awalnya non-linear bisa menjadi lebih mudah
            dipisahkan. Ini sebabnya SVM sering dipakai untuk dataset yang pola
            batasnya rumit.
        </p>
        <Callout type="tip" title="Kapan kernel berguna?">
            Saat data tidak bisa dipisahkan dengan satu garis lurus, tetapi masih
            punya struktur yang bisa dipisahkan setelah transformasi fitur.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Implementasi Sederhana">
        <p>
            Contoh ini memakai library scikit-learn untuk melatih SVM klasifikasi
            pada data dua dimensi sederhana.
        </p>
        <CodeBlock
            language="python"
            filename="svm_demo.py"
            code={`from sklearn.svm import SVC


x = [
    [1.0, 2.0],
    [1.5, 1.8],
    [5.0, 8.0],
    [6.0, 9.0],
]
y = [0, 0, 1, 1]

model = SVC(kernel="linear", C=1.0)
model.fit(x, y)

print("support vectors:", model.support_vectors_)
print("prediction [2, 2]:", model.predict([[2.0, 2.0]]))`}
        />
        <p>
            Pada output, support vectors adalah titik yang paling berpengaruh pada
            posisi hyperplane. Kalau titik itu diubah, batas keputusan bisa ikut berubah.
        </p>
    </NoteSection>

    <NoteSection title="Kelebihan dan Keterbatasan">
        <ul>
            <li>Bagus untuk klasifikasi dengan margin yang jelas.</li>
            <li>Efektif pada ruang fitur berdimensi tinggi.</li>
            <li>Kernel memberi fleksibilitas untuk data non-linear.</li>
            <li>Model cukup kuat meski jumlah data tidak terlalu besar.</li>
        </ul>
        <p>
            Tapi SVM juga punya keterbatasan. Pada dataset sangat besar, training
            bisa mahal. Tuning parameter <code>C</code> dan kernel juga perlu percobaan
            yang cukup hati-hati.
        </p>
        <Callout type="warning" title="Hal yang perlu diwaspadai">
            Kalau fitur belum diskalakan dengan baik, SVM bisa bias ke fitur yang
            skalanya lebih besar. Normalisasi atau standardisasi sering sangat membantu.
        </Callout>
    </NoteSection>

    <NoteSection title="Ringkasan Praktis">
        <ul>
            <li>SVM mencari hyperplane terbaik untuk memisahkan kelas.</li>
            <li>Margin besar biasanya berarti generalisasi yang lebih baik.</li>
            <li>Support vector adalah titik yang paling menentukan batas keputusan.</li>
            <li>Soft margin dan parameter <code>C</code> membantu menangani data berisik.</li>
            <li>Kernel trick dipakai saat batas linear tidak cukup.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Checklist Belajar SVM">
        <ol>
            <li>Pahami dulu hyperplane, margin, dan support vector.</li>
            <li>Bedakan hard margin dan soft margin.</li>
            <li>Pelajari hinge loss dan peran parameter <code>C</code>.</li>
            <li>Coba kernel linear lalu kernel non-linear seperti RBF.</li>
            <li>Selalu cek preprocessing fitur sebelum melatih model.</li>
        </ol>
    </NoteSection>

    <BackLink href="/semester-1/pemodelan-dan-optimasi-lanjut" label="Kembali ke Pemodelan dan Optimasi Lanjut" />
</article>