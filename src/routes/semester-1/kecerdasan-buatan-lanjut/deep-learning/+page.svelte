<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const quizQuestions = [
        {
            question: "Mengapa arsitektur AlexNet (2012) dianggap sebagai pemicu utama kebangkitan Deep Learning modern?",
            options: [
                "Karena AlexNet merupakan model pertama yang menggunakan sel foto cadmium sulfide.",
                "Karena berhasil memenangkan tantangan klasifikasi ImageNet 2012 dengan selisih yang signifikan menggunakan tumpukan convolutional layers dalam yang dilatih di GPU.",
                "Karena berhasil mengalahkan pecatur profesional Go Lee Sedol.",
                "Karena AlexNet didasarkan pada model Swarm Intelligence."
            ],
            correctIndex: 1,
            explanation: "Pada kompetisi ILSVRC 2012, tim SuperVision memenangkan klasifikasi gambar dengan arsitektur AlexNet yang melatih CNN dalam secara langsung pada GPU, memicu revolusi Deep Learning."
        },
        {
            question: "Manakah di bawah ini yang merupakan salah satu dari non-trainable layers yang ada pada arsitektur AlexNet?",
            options: [
                "Convolutional layers",
                "Fully connected layers",
                "Pooling layers, normalization layers, dan dropout layers",
                "Fungsi aktivasi ReLU"
            ],
            correctIndex: 2,
            explanation: "AlexNet memiliki 8 trainable layers (5 conv dan 3 fully connected). Selain itu ada non-trainable layers yang tidak memiliki parameter bobot untuk dipelajari, yaitu 3 pooling layers, 2 normalization layers, dan 1 dropout layer."
        }
    ];
</script>

<svelte:head>
    <title>Deep Learning - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Deep Learning"
        date="22 Mei 2026"
        status="done"
        tags={["Deep Learning", "Neural Network", "History"]}
    />

    <NoteSection title="1. Apa Itu Deep Learning?">
        <p>
            <strong>Deep Learning</strong> (Deep Structured Learning) adalah bagian dari metode machine learning yang berbasis pada arsitektur <strong>Artificial Neural Network</strong>.
        </p>
        <p>
            Kata <strong>"deep"</strong> merujuk pada penggunaan <strong>banyak lapisan (multiple layers)</strong> di dalam jaringan. Jaringan ini memanfaatkan tumpukan lapisan tersembunyi tersebut untuk mengekstrak fitur tingkat tinggi (higher-level features) dari data mentah secara bertahap melalui representasi abstrak.
        </p>
        <p><strong>Arsitektur utama Deep Learning meliputi:</strong></p>
        <ul>
            <li>Deep Neural Networks (DNN)</li>
            <li>Deep Belief Networks (DBN)</li>
            <li>Graph Neural Networks (GNN)</li>
            <li>Recurrent Neural Networks (RNN)</li>
            <li>Convolutional Neural Networks (CNN)</li>
        </ul>
        <p>
            <strong>Bidang Penerapan Utama:</strong> Computer Vision, Speech Recognition, Natural Language Processing (NLP), Audio Recognition, Social Network Filtering, Machine Translation, dan pembuatan program kecerdasan game papan (seperti catur dan Go).
        </p>
    </NoteSection>

    <NoteSection title="2. Sejarah &amp; ImageNet Challenge (ILSVRC)">
        <div class="timeline">
            <ul>
                <li>
                    <strong>[1998] LeNet-5 (Yann LeCun):</strong> Arsitektur Convolutional Neural Network awal yang dirancang untuk membaca kode pos dan digit angka tulisan tangan pada cek bank.
                </li>
                <li>
                    <strong>Kompetisi ImageNet (ILSVRC):</strong> Kompetisi visual berskala besar menggunakan dataset ImageNet yang terdiri dari 10.000.000 gambar berlabel dengan 10.000+ kategori objek. Tugas utama kompetisi meliputi: Klasifikasi, Klasifikasi dengan lokalisasi, dan Klasifikasi *fine-grained*.
                </li>
                <li>
                    <strong>[2012] Kemenangan AlexNet (SuperVision):</strong> Alex Krizhevsky, Ilya Sutskever, dan Geoffrey Hinton dari University of Toronto memenangkan tantangan klasifikasi ImageNet menggunakan Deep CNN yang dilatih langsung pada piksel mentah RGB gambar menggunakan GPU. Model ini berhasil menekan tingkat kesalahan secara signifikan dibanding metode computer vision tradisional.
                </li>
                <li>
                    <strong>[2013] ZFNet:</strong> Diusulkan oleh Matthew Zeiler dan Rob Fergus yang memenangkan kompetisi ILSVRC 2013 dengan menyempurnakan hyperparameter AlexNet, disusul oleh arsitektur GoogLeNet, VGGNet, dan ResNet di tahun-tahun berikutnya.
                </li>
            </ul>
        </div>
    </NoteSection>

    <NoteSection title="3. Struktur Detail Arsitektur AlexNet">
        <p>
            AlexNet terdiri dari total 8 lapisan yang parameter bobotnya dapat dilatih (<em>trainable layers</em>):
        </p>
        <ul>
            <li><strong>5 Convolutional Layers</strong> (lapisan awal mengekstrak fitur lokal gambar).</li>
            <li><strong>3 Fully Connected Layers</strong> (lapisan akhir melakukan pemungutan suara klasifikasi).</li>
        </ul>
        <p>
            Setiap *trainable layer* diikuti oleh fungsi aktivasi non-linear <strong>ReLU</strong>, kecuali lapisan Fully Connected terakhir yang menggunakan fungsi <strong>Softmax</strong> untuk menghasilkan distribusi probabilitas kelas.
        </p>
        <p>
            <strong>Lapisan Non-Trainable pada AlexNet (Tanpa Parameter Bobot):</strong>
        </p>
        <ul>
            <li><strong>3 Pooling Layers:</strong> Menggunakan Max Pooling untuk mereduksi dimensi spasial gambar (downsampling).</li>
            <li><strong>2 Normalization Layers:</strong> Local Response Normalization untuk menormalisasi nilai aktivasi antar layer.</li>
            <li><strong>1 Dropout Layer:</strong> Mematikan neuron secara acak untuk mengurangi risiko overfitting data.</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
