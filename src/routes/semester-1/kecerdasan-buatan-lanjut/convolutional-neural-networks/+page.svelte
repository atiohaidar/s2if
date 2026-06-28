<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    // LaTeX formulas defined inside script block to prevent Svelte HTML compiler errors
    const cnnOutputSize = String.raw`O = \frac{W - K + 2P}{S} + 1`;
    const reluFormula = String.raw`f(x) = \max(0, x)`;

    const quizQuestions = [
        {
            question: "Dalam operasi konvolusi 2D, jika gambar berukuran 9x9 piksel diproses dengan filter 3x3, stride = 1, dan padding = 0, berapakah ukuran output (feature map) yang dihasilkan?",
            options: [
                "9x9",
                "7x7",
                "8x8",
                "5x5"
            ],
            correctIndex: 1,
            explanation: "Menggunakan formula ukuran output: O = (W - K + 2P)/S + 1. Maka O = (9 - 3 + 2*0)/1 + 1 = 6 + 1 = 7. Jadi ukuran output adalah 7x7."
        },
        {
            question: "Apakah fungsi utama dari operasi Pooling (seperti Max Pooling) pada arsitektur CNN?",
            options: [
                "Memperkenalkan fungsi aktivasi non-linear baru.",
                "Mengurangi ukuran spasial gambar secara bertahap untuk menekan jumlah parameter dan memperoleh kekebalan translasi (spatial invariance).",
                "Melakukan klasifikasi akhir dengan memberikan hak suara pada kategori objek.",
                "Mengubah nilai piksel negatif menjadi nol."
            ],
            correctIndex: 1,
            explanation: "Max Pooling mengambil nilai maksimum pada suatu jendela geser untuk mengurangi dimensi representasi spasial (downsampling), mengurangi komputasi, serta menjaga invariance terhadap sedikit pergeseran gambar."
        }
    ];
</script>

<svelte:head>
    <title>Convolutional Neural Networks - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Convolutional Neural Networks"
        date="24 Mei 2026"
        status="done"
        tags={["CNN", "Convolution", "Pooling", "Deep-Learning"]}
    />

    <NoteSection title="1. Citra Sebagai Matriks & Masalah Pencocokan Piksel">
        <p>
            Komputer membaca citra sebagai <strong>array piksel dua dimensi</strong>. Upaya pengenalan citra tradisional (seperti membedakan huruf "X" dan "O") dengan mencocokkan piksel per piksel (pixel-by-pixel matching) akan mudah gagal jika gambar mengalami pergeseran (translation), penskalaan (scaling), rotasi, atau ketebalan garis yang berbeda.
        </p>
        <p>
            <strong>Solusinya:</strong> Membandingkan bagian-bagian gambar (fitur lokal) secara terpisah. Fitur penting untuk mengenali huruf "X" adalah: garis miring diagonal ke kanan, garis miring diagonal ke kiri, dan titik persilangan di tengah.
        </p>
    </NoteSection>

    <NoteSection title="2. Operasi Konvolusi (Convolution)">
        <p>
            Konvolusi adalah proses menggeser filter kecil (kernel/fitur) di atas gambar masukan untuk mencari kecocokan pola lokal.
        </p>
        <ul>
            <li>Setiap posisi filter pada gambar akan dihitung perkalian titik (<strong>dot product</strong>) elemen-demi-elemen antara nilai piksel gambar dengan nilai filter.</li>
            <li>Hasil perkalian dijumlahkan dan dibagi dengan total jumlah piksel dalam filter untuk menghasilkan nilai kecocokan ternormalisasi (berkisar antara -1 hingga 1). Nilai mendekati 1 menandakan kecocokan pola yang kuat.</li>
        </ul>

        <p><strong>Parameter Penting Konvolusi:</strong></p>
        <ul>
            <li><strong>Stride (Langkah):</strong> Ukuran langkah pergeseran filter di atas gambar. Stride yang lebih besar menghasilkan output spasial yang lebih kecil.</li>
            <li><strong>Padding (Margin):</strong> Penambahan nilai nol (zero padding) di sekeliling batas luar gambar agar filter dapat memproses bagian tepi gambar dan menjaga ukuran output.</li>
        </ul>

        <p><strong>Formula Ukuran Output Feature Map:</strong></p>
        <MathBlock latex={cnnOutputSize} />
        <ul>
            <li>$W$: Ukuran input (lebar/tinggi)</li>
            <li>$K$: Ukuran filter (kernel)</li>
            <li>$P$: Ukuran padding</li>
            <li>$S$: Nilai stride</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Operasi Aktivasi ReLU & Pooling">
        <p><strong>Aktivasi ReLU (Rectified Linear Unit):</strong></p>
        <p>
            Untuk memperkenalkan sifat non-linear pada model, setelah operasi konvolusi kita menerapkan fungsi ReLU yang akan mengubah semua nilai piksel negatif menjadi nol.
        </p>
        <MathBlock latex={reluFormula} />

        <p><strong>Operasi Pooling (Downsampling):</strong></p>
        <p>
            Pooling digunakan untuk memperkecil ukuran spasial gambar secara bertahap tanpa kehilangan informasi fitur penting.
        </p>
        <ul>
            <li><strong>Max Pooling:</strong> Mengambil nilai maksimum dalam jendela filter tertentu (misalnya jendela 2x2 dengan stride 2).</li>
            <li><strong>Manfaat:</strong> Mengurangi komputasi (jumlah parameter berkurang), meredam noise, dan memberikan sifat **spatial invariance** (kekebalan terhadap pergeseran posisi objek pada gambar).</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Fully Connected (FC) Layer">
        <p>
            Setelah gambar melewati beberapa tumpukan lapisan Konvolusi $ightarrow$ ReLU $ightarrow$ Pooling, ukuran gambar menjadi sangat kecil namun kaya akan fitur tingkat tinggi.
        </p>
        <p>
            Representasi 2D akhir ini kemudian diratakan (flattened) menjadi vektor satu dimensi dan dimasukkan ke dalam <strong>Fully Connected Layer</strong>. Di lapisan ini, setiap fitur lokal akan memberikan suara (vote) terbobot untuk menentukan klasifikasi akhir gambar masukan (misalnya, menentukan apakah objek tersebut merupakan huruf "X" atau "O").
        </p>
    </NoteSection>

    <NoteSection title="5. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
