<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const quizQuestions = [
        {
            question: "Bagaimanakah persaingan antara submodel Generator dan Discriminator pada GAN dimodelkan menurut teori permainan (game theory)?",
            options: [
                "Sebagai Cooperative Game, di mana kedua model saling bertukar parameter bobot.",
                "Sebagai Zero-Sum Game, di mana keuntungan yang diraih satu model merupakan kerugian bagi model lainnya.",
                "Sebagai Multi-Agent Reinforcement Learning tanpa interaksi langsung.",
                "Sebagai model klasterisasi partitional keras."
            ],
            correctIndex: 1,
            explanation: "GAN dimodelkan sebagai zero-sum game (minimax) di mana Generator berusaha meminimalkan peluang Discriminator mengenali sampel buatannya, sedangkan Discriminator berusaha memaksimalkannya."
        },
        {
            question: "Manakah paper milestone sejarah GAN yang pertama kali memperkenalkan pembuatan foto wajah manusia realistis dengan metode pertumbuhan progresif?",
            options: [
                "Ian Goodfellow, et al. (2014) - Generative Adversarial Networks.",
                "Alec Radford, et al. (2015) - DCGAN.",
                "Tero Karras, et al. (2017) - Progressive Growing of GANs.",
                "Andrew Brock, et al. (2018) - BigGAN."
            ],
            correctIndex: 2,
            explanation: "Tero Karras et al. (2017) merilis paper Progressive Growing of GANs (ProGAN) yang melatih generator dan discriminator dari resolusi rendah ke tinggi secara bertahap untuk menghasilkan foto wajah realistis."
        }
    ];
</script>

<svelte:head>
    <title>Generative Adversarial Networks (GANs) - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Generative Adversarial Networks (GANs)"
        date="31 Mei 2026"
        status="done"
        tags={["Unsupervised", "Generative-Models", "GANs", "Deep-Learning"]}
    />

    <NoteSection title="1. Apa Itu Generative Adversarial Networks (GAN)?">
        <p>
            <strong>Generative Adversarial Networks (GAN)</strong> adalah arsitektur deep learning yang digunakan untuk pemodelan generatif (<em>generative modeling</em>), yaitu melatih model untuk menghasilkan contoh data baru yang tampak sangat mirip dan masuk akal berasal dari distribusi data asli.
        </p>
        <p>
            GAN dilatih menggunakan dua model neural network yang saling bertentangan:
        </p>
        <ul>
            <li>
                <strong>Generator (Generative Network):</strong> Belajar membuat sampel data baru (fake samples) yang mirip dengan sampel asli untuk mengelabui Discriminator.
            </li>
            <li>
                <strong>Discriminator (Discriminative Network):</strong> Belajar membedakan mana contoh data asli (dari dataset riil) dan mana contoh data tiruan (dari Generator).
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="2. Dinamika Persaingan (Zero-Sum Game)">
        <p>
            Kedua model disusun dalam sebuah pertarungan atau kompetisi berbasis <strong>teori permainan (game theory)</strong>:
        </p>
        <ul>
            <li>Generator menerima input acak (noise vector) dan mencoba memetakan ke ruang sampel tiruan. Tujuannya adalah mengelabui Discriminator.</li>
            <li>Discriminator diberikan dua jenis data secara bergantian: data asli dari dataset, dan data tiruan dari Generator. Tujuannya adalah mendeteksi pemalsuan secara akurat.</li>
            <li>Ini disebut sebagai <strong>Zero-Sum Game</strong>: keuntungan bagi Generator (berhasil menipu) adalah kerugian bagi Discriminator, dan sebaliknya. Jaringan dilatih bersama menggunakan rumusan minimax loss.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Penerapan Praktis GAN">
        <p>Beberapa aplikasi luar biasa dari GAN di industri:</p>
        <ul>
            <li>Membangkitkan contoh baru untuk dataset gambar (e.g. data augmentation).</li>
            <li>Membangkitkan foto wajah manusia tiruan yang sangat realistis.</li>
            <li>Pembangkitan karakter kartun/anime.</li>
            <li>Image-to-Image translation (e.g. foto siang menjadi malam, sketsa menjadi foto).</li>
            <li>Text-to-Image translation (deskripsi teks menjadi gambar).</li>
            <li>Face frontal view generation (pembuatan wajah tampak depan).</li>
            <li>Generate new human poses (generasi pose tubuh manusia baru).</li>
            <li>Photos to Emojis (mengubah wajah menjadi emoji).</li>
            <li>Photograph editing &amp; blending.</li>
            <li>Face aging (efek penuaan wajah).</li>
            <li>Super Resolution (menaikkan resolusi gambar pecah menjadi tajam).</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Paper &amp; Milestone Sejarah GAN">
        <div class="timeline">
            <ul>
                <li>
                    <strong>[2014] Ian Goodfellow, et al. - "Generative Adversarial Networks":</strong> Paper pertama memperkenalkan konsep GAN dasar, diujikan pada dataset MNIST, CIFAR-10, dan Toronto Face Database.
                </li>
                <li>
                    <strong>[2015] Alec Radford, et al. - "Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks" (DCGAN):</strong> Memadukan arsitektur CNN ke dalam GAN untuk menghasilkan gambar kamar tidur (bedrooms) yang realistis serta membuktikan adanya aritmatika vektor laten pada wajah (e.g., Man dengan kacamata - Man tanpa kacamata + Woman tanpa kacamata = Woman dengan kacamata).
                </li>
                <li>
                    <strong>[2017] Tero Karras, et al. - "Progressive Growing of GANs (ProGAN)":</strong> Melatih generator &amp; discriminator secara progresif mulai dari resolusi sangat rendah (4x4) kemudian naik ke resolusi tinggi (1024x1024) secara bertahap. Sukses menghasilkan foto wajah manusia resolusi tinggi yang sangat realistis.
                </li>
                <li>
                    <strong>[2018] Andrew Brock, et al. - "Large Scale GAN Training for High Fidelity Natural Image Synthesis" (BigGAN):</strong> Melatih GAN skala besar untuk mensintesis gambar alami berkualitas tinggi yang hampir tidak bisa dibedakan dari foto asli.
                </li>
                <li>
                    <strong>[2017] Yanghua Jin, et al.:</strong> Melakukan pembuatan wajah karakter anime Jepang secara otomatis menggunakan GAN.
                </li>
            </ul>
        </div>
    </NoteSection>

    <NoteSection title="5. Uji Pemahaman (Quiz)">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Daftar Materi" />
</article>
