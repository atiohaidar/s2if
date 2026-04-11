<script lang="ts">
    import { base } from '$app/paths';
    import BackLink from '$lib/components/BackLink.svelte';
    import Callout from '$lib/components/Callout.svelte';
    import MathBlock from '$lib/components/MathBlock.svelte';
    import NoteHeader from '$lib/components/NoteHeader.svelte';
    import NoteSection from '$lib/components/NoteSection.svelte';

    const crispVsFuzzy = [
        {
            label: 'Crisp logic',
            description: 'Nilai hanya 0 atau 1. Suatu kondisi dianggap benar atau salah sepenuhnya.',
        },
        {
            label: 'Fuzzy logic',
            description: 'Nilai berada di rentang 0 sampai 1. Sebuah kondisi bisa benar sebagian.',
        },
    ];

    const fuzzyPhases = [
        { title: 'Fuzzification', text: 'Mengubah input tegas menjadi derajat keanggotaan fuzzy.' },
        { title: 'Rule Evaluation', text: 'Menerapkan operator fuzzy (AND/OR) pada antecedent rules.' },
        { title: 'Aggregation', text: 'Menggabungkan output semua aturan menjadi satu himpunan fuzzy.' },
        { title: 'Defuzzification', text: 'Mengubah himpunan fuzzy akhir menjadi angka tegas.' },
    ];

    const exampleMembership = [
        { label: 'Dingin', className: 'dingin', value: '0.25', width: '25%' },
        { label: 'Hangat', className: 'hangat', value: '0.75', width: '75%' },
        { label: 'Panas', className: 'panas', value: '0.0', width: '0%' },
    ];

    const sampleRules = [
        'IF suhu dingin THEN kipas lambat',
        'IF suhu hangat THEN kipas sedang',
        'IF suhu panas THEN kipas cepat',
    ];

    const multiInputRules = [
        'IF suhu panas AND kelembaban tinggi THEN kipas cepat',
        'IF suhu hangat AND kelembaban rendah THEN kipas lambat',
        'IF suhu dingin OR kelembaban rendah THEN kipas mati',
    ];

    const references = [
        { author: 'Zadeh, L.A.', year: 1965, title: 'Fuzzy Sets', journal: 'Information and Control, 8(3), 338–353' },
        { author: 'Mamdani, E.H. & Assilian, S.', year: 1975, title: 'An Experiment in Linguistic Synthesis with a Fuzzy Logic Controller', journal: 'International Journal of Man-Machine Studies, 7(1), 1–13' },
        { author: 'Takagi, T. & Sugeno, M.', year: 1985, title: 'Fuzzy Identification of Systems and Its Applications to Modeling and Control', journal: 'IEEE Transactions on Systems, Man, and Cybernetics, 15(1), 116–132' },
        { author: 'Jang, J.-S.R.', year: 1993, title: 'ANFIS: Adaptive-Network-Based Fuzzy Inference System', journal: 'IEEE Transactions on Systems, Man, and Cybernetics, 23(3), 665–685' },
    ];
</script>

<svelte:head>
    <title>Logika Fuzzy - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi logika fuzzy lanjut: fuzzy set, membership function (segitiga, trapesium, Gaussian), operasi fuzzy, inferensi Mamdani vs Sugeno, defuzzification, contoh multi-input, dan pengantar neuro-fuzzy."
    />
</svelte:head>

<article class="note-article fuzzy-article">
    <NoteHeader
        title="Logika Fuzzy"
        date="11 April 2026"
        status="done"
        tags={['Fuzzy', 'AI', 'Kontrol Cerdas', 'Mamdani', 'Sugeno']}
    />

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 1 — Pengantar -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Apa Itu Logika Fuzzy?">
        <p>
            Logika fuzzy adalah cara berpikir komputasional yang tidak memaksa
            sebuah kondisi hanya bernilai <strong>benar</strong> atau
            <strong>salah</strong>. Dalam fuzzy logic, sebuah kondisi bisa benar
            sebagian, misalnya 0.2, 0.6, atau 0.9.
        </p>
        <p>
            Konsep ini pertama kali diperkenalkan oleh <strong>Lotfi A. Zadeh</strong>
            pada tahun 1965 melalui paper <em>Fuzzy Sets</em>. Ide dasarnya: banyak
            konsep di dunia nyata tidak punya batas tegas. "Tinggi", "cepat", "panas"
            — semuanya bersifat gradual, bukan biner.
        </p>
        <p>
            Ini sangat berguna untuk masalah yang sifatnya <strong>abu-abu</strong>:
            suhu ruangan, kecepatan kipas, tingkat kenyamanan, kualitas air,
            risiko penyakit, dan banyak kasus nyata lain yang sulit dibuat batas
            tegasnya.
        </p>

        <div class="comparison-grid">
            {#each crispVsFuzzy as item}
                <div class="comparison-card">
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                </div>
            {/each}
        </div>

        <Callout type="info" title="Intuisi singkat">
            Kalau logika klasik bertanya "apakah ini panas?", fuzzy logic bertanya
            "seberapa panas?". Pertanyaan kedua jauh lebih mirip cara manusia
            menilai keadaan nyata.
        </Callout>
    </NoteSection>

    <NoteSection title="Konsep Inti yang Harus Dipahami">
        <ul>
            <li>
                <strong>Fuzzy set</strong>: himpunan dengan derajat keanggotaan,
                bukan anggota mutlak.
            </li>
            <li>
                <strong>Membership function (MF)</strong>: fungsi yang memetakan input
                ke nilai 0 sampai 1. Bentuknya bisa segitiga, trapesium, Gaussian, dsb.
            </li>
            <li>
                <strong>Fuzzy operations</strong>: operasi AND (min), OR (max), NOT (complement)
                pada himpunan fuzzy.
            </li>
            <li>
                <strong>Fuzzy rule</strong>: aturan IF-THEN yang meniru cara
                berpikir pakar.
            </li>
            <li>
                <strong>Inference engine</strong>: mesin yang mengevaluasi aturan
                dan menghasilkan output fuzzy. Dua metode utama: <strong>Mamdani</strong> dan <strong>Sugeno</strong>.
            </li>
            <li>
                <strong>Defuzzification</strong>: proses mengubah output fuzzy
                menjadi satu angka tegas.
            </li>
        </ul>
        <MathBlock displayMode={false} latex={"\\mu_A(x) \\in [0,1]"} />
        <p>
            Notasi di atas dibaca sebagai: derajat keanggotaan suatu nilai <em>x</em>
            pada himpunan fuzzy <em>A</em> selalu berada di rentang 0 sampai 1.
        </p>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 2 — Fuzzy Set & Membership Function -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Fuzzy Set dan Membership Function">
        <p>
            Cara paling gampang memahami <strong>fuzzy set</strong> adalah begini:
            sebuah benda tidak harus masuk atau tidak masuk ke suatu kelompok
            secara mutlak. Benda itu boleh masuk <em>sebagian</em>.
        </p>
        <p>
            Misalnya pada suhu ruangan, angka 28°C bisa dianggap cukup hangat
            dan sedikit dingin sekaligus. Jadi, yang kita simpan bukan status
            "ya" atau "tidak", melainkan <strong>seberapa cocok</strong>
            suhu itu terhadap label tertentu.
        </p>

        <Callout type="info" title="Bedanya dengan himpunan biasa">
            Pada himpunan tegas, anggota hanya punya dua pilihan: masuk atau tidak
            masuk. Pada fuzzy set, satu nilai bisa punya derajat keanggotaan 0.3,
            0.7, atau 0.9. Angka ini menunjukkan tingkat kecocokan, bukan peluang.
        </Callout>

        <Callout type="warning" title="Derajat keanggotaan ≠ probabilitas">
            <p>Ini miskonsepsi paling umum. Perhatikan perbedaan:</p>
            <p><strong>Probabilitas:</strong> "Peluang besok hujan = 0.7" → besok <em>pasti</em> hujan atau tidak (binary outcome). Angka 0.7 menunjukkan ketidakpastian kita.</p>
            <p><strong>Fuzzy:</strong> "Derajat 'tinggi' untuk orang 170cm = 0.7" → orang ini <em>memang</em> 170cm, dan 170cm cukup cocok dengan konsep 'tinggi' menurut definisi kita. Tidak ada ketidakpastian event.</p>
            <p>Selain itu, total derajat keanggotaan di semua himpunan <strong>tidak harus berjumlah 1</strong>. Ini berbeda dengan probabilitas yang total-nya selalu 1.</p>
        </Callout>

        <MathBlock latex={String.raw`A = \{x \mid \mu_A(x) \in [0,1]\}`} />
        <p>
            Artinya, himpunan fuzzy <em>A</em> didefinisikan lewat fungsi keanggotaan
            <em>μ</em> yang memberi nilai antara 0 dan 1 untuk setiap input <em>x</em>.
        </p>

        <MathBlock latex={String.raw`\mu_A(x) = 0 \Rightarrow x \text{ tidak termasuk } A`} />
        <MathBlock latex={String.raw`\mu_A(x) = 1 \Rightarrow x \text{ termasuk penuh ke } A`} />
        <MathBlock latex={String.raw`0 < \mu_A(x) < 1 \Rightarrow x \text{ termasuk sebagian ke } A`} />

        <p>
            Jadi, membership function itu seperti alat ukur yang menjawab
            pertanyaan: <strong>seberapa kuat sebuah input cocok dengan label ini?</strong>
        </p>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 3 — Jenis-jenis Membership Function -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Jenis-Jenis Membership Function">
        <p>
            Bentuk membership function menentukan bagaimana sebuah input
            dipetakan ke derajat keanggotaan. Pemilihan bentuk MF punya <strong>dampak besar</strong>
            terhadap performa sistem fuzzy. Berikut tiga jenis yang paling umum dipakai.
        </p>

        <!-- === Segitiga === -->
        <h3 class="mf-heading">1. Segitiga (Triangular)</h3>
        <p>
            Bentuk paling sederhana. Mudah dihitung, cocok untuk kasus yang cukup
            linier.
        </p>
        <MathBlock
            latex={String.raw`\mu_{\mathrm{tri}}(x)=\begin{cases}0, & x\le a\\ \frac{x-a}{b-a}, & a<x\le b\\ \frac{c-x}{c-b}, & b<x<c\\ 0, & x\ge c\end{cases}`}
        />
        <p>
            Parameter <strong>a</strong>, <strong>b</strong>, <strong>c</strong>
            menentukan titik awal, puncak, dan akhir segitiga. Urutannya selalu
            <strong>a &lt; b &lt; c</strong>. Dari <strong>a</strong> ke <strong>b</strong>,
            derajat keanggotaan naik. Di titik <strong>b</strong>, nilainya maksimal (1).
            Dari <strong>b</strong> ke <strong>c</strong>, turun kembali ke 0.
        </p>

        <div class="formula-grid">
            <div class="formula-card">
                <h3>Contoh angka</h3>
                <MathBlock displayMode={false} latex={String.raw`a = 20,\ b = 28,\ c = 36`} />
                <p>
                    Label <strong>hangat</strong>: suhu 20°C mulai masuk hangat, 28°C adalah pusat,
                    36°C mulai keluar.
                </p>
            </div>
            <div class="formula-card">
                <h3>Contoh hitung</h3>
                <MathBlock displayMode={false} latex={String.raw`x = 28 \Rightarrow \mu_{\mathrm{tri}}(28)=\frac{28-20}{28-20}=1`} />
                <MathBlock displayMode={false} latex={String.raw`x = 24 \Rightarrow \mu_{\mathrm{tri}}(24)=\frac{24-20}{28-20}=0.5`} />
            </div>
        </div>

        <div class="chart-card" aria-label="Grafik segitiga membership function">
            <svg viewBox="0 0 760 320" class="chart-svg" role="img" aria-labelledby="triTitle triDesc">
                <title id="triTitle">Grafik segitiga membership function</title>
                <desc id="triDesc">Contoh parameter a=20, b=28, c=36 pada kurva hangat.</desc>

                <defs>
                    <marker id="triArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
                    </marker>
                </defs>

                <line x1="80" y1="250" x2="690" y2="250" class="axis" marker-end="url(#triArrow)" />
                <line x1="80" y1="250" x2="80" y2="45" class="axis" marker-end="url(#triArrow)" />

                <path d="M160 250 L360 90 L560 250" class="tri-curve" />

                <line x1="360" y1="90" x2="360" y2="250" class="tri-guide b" />

                <circle cx="160" cy="250" r="6" class="tri-point a" />
                <circle cx="360" cy="90" r="7" class="tri-point b" />
                <circle cx="560" cy="250" r="6" class="tri-point c" />

                <!-- x=24 → μ=0.5, halfway on left slope -->
                <circle cx="260" cy="170" r="6" class="tri-point sample" />
                <line x1="260" y1="170" x2="260" y2="250" class="tri-guide x" />

                <text x="138" y="274" class="axis-label">a = 20</text>
                <text x="335" y="274" class="axis-label">b = 28</text>
                <text x="535" y="274" class="axis-label">c = 36</text>

                <text x="342" y="72" class="tri-label peak">μ = 1</text>
                <text x="200" y="162" class="tri-label sample">x=24, μ=0.5</text>
                <text x="595" y="104" class="tri-label peak">label hangat</text>

                <text x="318" y="303" class="axis-title">Suhu (°C)</text>
                <text x="14" y="165" class="axis-title vertical">Derajat keanggotaan</text>
            </svg>
        </div>

        <!-- === Trapesium === -->
        <h3 class="mf-heading">2. Trapesium (Trapezoidal)</h3>
        <p>
            Mirip segitiga tapi punya <strong>area puncak datar</strong>. Cocok untuk
            label yang punya rentang "pasti penuh" — misalnya suhu "panas" di atas 38°C
            tetap bernilai 1 sampai batas tertentu.
        </p>

        <MathBlock
            latex={String.raw`\mu_{\mathrm{trap}}(x)=\begin{cases}0, & x\le a\\ \frac{x-a}{b-a}, & a<x\le b\\ 1, & b<x\le c\\ \frac{d-x}{d-c}, & c<x<d\\ 0, & x\ge d\end{cases}`}
        />
        <p>
            Sekarang ada empat parameter: <strong>a &lt; b &lt; c &lt; d</strong>.
            Bagian dari <strong>b</strong> ke <strong>c</strong> adalah "plateau" di mana
            derajat keanggotaan konstan di 1.
        </p>

        <div class="chart-card" aria-label="Grafik trapesium membership function">
            <svg viewBox="0 0 760 320" class="chart-svg" role="img" aria-labelledby="trapTitle">
                <title id="trapTitle">Grafik trapesium membership function</title>

                <defs>
                    <marker id="trapArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
                    </marker>
                </defs>

                <line x1="80" y1="250" x2="690" y2="250" class="axis" marker-end="url(#trapArrow)" />
                <line x1="80" y1="250" x2="80" y2="45" class="axis" marker-end="url(#trapArrow)" />

                <path d="M140 250 L260 90 L440 90 L560 250" class="trap-curve" />

                <circle cx="140" cy="250" r="6" class="tri-point a" />
                <circle cx="260" cy="90" r="6" class="tri-point b" />
                <circle cx="440" cy="90" r="6" class="tri-point b" />
                <circle cx="560" cy="250" r="6" class="tri-point a" />

                <text x="118" y="274" class="axis-label">a</text>
                <text x="248" y="274" class="axis-label">b</text>
                <text x="428" y="274" class="axis-label">c</text>
                <text x="548" y="274" class="axis-label">d</text>

                <text x="310" y="72" class="tri-label peak">μ = 1 (plateau)</text>

                <text x="318" y="303" class="axis-title">Input</text>
                <text x="14" y="165" class="axis-title vertical">Derajat keanggotaan</text>
            </svg>
        </div>

        <!-- === Gaussian === -->
        <h3 class="mf-heading">3. Gaussian</h3>
        <p>
            Bentuk lonceng yang <strong>smooth</strong> — tidak ada sudut tajam.
            Sering dipakai di sistem yang membutuhkan transisi halus antar label.
            Juga populer di <strong>neuro-fuzzy</strong> karena parameter-nya mudah
            dioptimasi via gradient descent.
        </p>

        <MathBlock
            latex={String.raw`\mu_{\mathrm{gauss}}(x) = e^{-\frac{(x - c)^2}{2\sigma^2}}`}
        />
        <p>
            Parameter <strong>c</strong> adalah pusat kurva (titik di mana μ=1), dan
            <strong>σ</strong> mengatur lebar — semakin besar σ, semakin "gemuk" kurvanya.
        </p>

        <div class="chart-card" aria-label="Grafik Gaussian membership function">
            <svg viewBox="0 0 760 320" class="chart-svg" role="img" aria-labelledby="gaussTitle">
                <title id="gaussTitle">Grafik Gaussian membership function</title>

                <defs>
                    <marker id="gaussArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
                    </marker>
                </defs>

                <line x1="80" y1="250" x2="690" y2="250" class="axis" marker-end="url(#gaussArrow)" />
                <line x1="80" y1="250" x2="80" y2="45" class="axis" marker-end="url(#gaussArrow)" />

                <!-- Gaussian bell curve approximation via cubic bezier -->
                <path d="M120 250 C180 250, 220 248, 260 230 C300 210, 330 150, 360 90 C390 150, 420 210, 460 230 C500 248, 540 250, 600 250" class="gauss-curve" />

                <circle cx="360" cy="90" r="7" class="tri-point b" />
                <line x1="360" y1="90" x2="360" y2="250" class="tri-guide b" />

                <!-- sigma marker -->
                <line x1="290" y1="165" x2="430" y2="165" class="sigma-line" />
                <text x="340" y="155" class="tri-label sigma">2σ</text>

                <text x="345" y="274" class="axis-label">c</text>
                <text x="365" y="78" class="tri-label peak">μ = 1</text>

                <text x="318" y="303" class="axis-title">Input</text>
                <text x="14" y="165" class="axis-title vertical">Derajat keanggotaan</text>
            </svg>
        </div>

        <Callout type="tip" title="Kapan pilih bentuk mana?">
            <p><strong>Segitiga</strong> — default yang bagus, murah secara komputasi, cukup untuk kebanyakan kasus.</p>
            <p><strong>Trapesium</strong> — kalau ada rentang input yang "pasti termasuk penuh" (misalnya suhu di atas 40°C pasti panas).</p>
            <p><strong>Gaussian</strong> — kalau butuh transisi halus atau akan di-tune otomatis (neuro-fuzzy, ANFIS).</p>
        </Callout>

        <Callout type="info" title="💡 Self-check: Coba hitung sendiri">
            <p>Diberikan MF segitiga <strong>Hangat</strong> dengan a=20, b=28, c=36.</p>
            <p>Berapa <strong>μ<sub>hangat</sub>(32°C)</strong>? (Petunjuk: 32 berada di sisi kanan segitiga, antara b dan c.)</p>
            <p><em>Jawaban: (c−x)/(c−b) = (36−32)/(36−28) = 4/8 = <strong>0.5</strong></em></p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 4 — Grafik Membership + Contoh Angka Konsisten -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Grafik Membership Function — Contoh Suhu">
        <p>
            Grafik di bawah memperlihatkan tiga himpunan fuzzy untuk suhu:
            <strong>dingin</strong>, <strong>hangat</strong>, dan <strong>panas</strong>.
            Perhatikan bahwa satu nilai suhu bisa punya derajat di lebih dari satu himpunan
            sekaligus — dan totalnya <strong>tidak harus 1</strong>.
        </p>

        <Callout type="info" title="Shoulder function untuk Dingin dan Panas">
            Pada grafik ini, <strong>Dingin</strong> dan <strong>Panas</strong> menggunakan
            <em>shoulder function</em> (trapesium terbuka ke satu sisi) — μ tetap bernilai 1
            di luar batas ekstrem. Ini lebih realistis: suhu 5°C sudah pasti dingin, 44°C
            pasti panas, tanpa perlu batas bawah/atas yang kaku. <strong>Hangat</strong> di
            tengah tetap segitiga karena memiliki batas kiri dan kanan yang jelas.
            Meski bentuknya berbeda, cara menghitung μ pada bagian miringnya tetap sama dengan
            segitiga biasa.
        </Callout>

        <div class="chart-card" aria-label="Grafik membership function suhu">
            <svg viewBox="0 0 760 340" class="chart-svg" role="img" aria-labelledby="membershipTitle membershipDesc">
                <title id="membershipTitle">Grafik membership function suhu</title>
                <desc id="membershipDesc">Kurva segitiga untuk dingin (10–20–28), hangat (20–28–36), dan panas (28–36–44) pada sumbu suhu. Titik contoh di 26°C.</desc>

                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
                    </marker>
                </defs>

                <line x1="80" y1="270" x2="700" y2="270" class="axis" marker-end="url(#arrow)" />
                <line x1="80" y1="270" x2="80" y2="40" class="axis" marker-end="url(#arrow)" />

                <g class="grid-lines">
                    <line x1="80" y1="215" x2="700" y2="215" />
                    <line x1="80" y1="160" x2="700" y2="160" />
                    <line x1="80" y1="105" x2="700" y2="105" />
                </g>

                <!--
                    Mapping: 10°C=120px, 20°C=280px, 28°C=408px, 36°C=536px, 44°C=664px
                    Dingin: (10,1)→(20,1)→(28,0) = triangular with a=10, b=20, c=28
                    But let's make dingin shoulder: μ=1 from 10 to 20, drops to 0 at 28
                    Hangat: a=20, b=28, c=36 → triangular
                    Panas: shoulder: 0 at 28, rises to 1 at 36, stays 1 to 44+
                -->
                <!-- Dingin: shoulder left, peak at 20, drops to 0 at 28 -->
                <path d="M120 105 L280 105 L408 270" class="curve cold" />
                <!-- Hangat: triangle 20→28→36 -->
                <path d="M280 270 L408 105 L536 270" class="curve warm" />
                <!-- Panas: shoulder right, 0 at 28, peak at 36 -->
                <path d="M408 270 L536 105 L664 105" class="curve hot" />

                <!--
                    At x=26°C: position = 280 + (26-20)/(28-20) * (408-280) = 280 + 0.75*128 = 376
                    Dingin at 26: (28-26)/(28-20) = 0.25 → y = 270 - 0.25*165 = 228.75
                    Hangat at 26: (26-20)/(28-20) = 0.75 → y = 270 - 0.75*165 = 146.25
                    Panas at 26: 0 → y = 270
                -->
                <line x1="376" y1="146" x2="376" y2="270" class="sample-guide" />
                <circle cx="376" cy="229" r="5" class="point sample-cold" />
                <circle cx="376" cy="146" r="5" class="point sample-warm" />

                <text x="386" y="140" class="sample-label">26°C</text>
                <text x="386" y="224" class="sample-label micro">dingin=0.25</text>
                <text x="386" y="156" class="sample-label micro">hangat=0.75</text>

                <text x="46" y="109" class="axis-label">1.0</text>
                <text x="46" y="164" class="axis-label">0.5</text>
                <text x="50" y="274" class="axis-label">0.0</text>

                <text x="110" y="292" class="axis-label">10</text>
                <text x="270" y="292" class="axis-label">20</text>
                <text x="398" y="292" class="axis-label">28</text>
                <text x="526" y="292" class="axis-label">36</text>
                <text x="654" y="292" class="axis-label">44</text>

                <text x="150" y="88" class="curve-label cold">Dingin</text>
                <text x="378" y="88" class="curve-label warm">Hangat</text>
                <text x="574" y="88" class="curve-label hot">Panas</text>

                <text x="340" y="327" class="axis-title">Suhu (°C)</text>
                <text x="14" y="170" class="axis-title vertical">Derajat keanggotaan</text>
            </svg>
        </div>

        <p>
            Pada contoh di atas, untuk suhu <strong>26°C</strong>:
        </p>

        <div class="membership-bars" aria-label="Derajat keanggotaan pada suhu 26°C">
            {#each exampleMembership as item}
                <div class="membership-row">
                    <div class="membership-label">{item.label}</div>
                    <div class="membership-track">
                        <div class={`membership-fill ${item.className}`} style={`width: ${item.width};`}></div>
                    </div>
                    <div class="membership-value">{item.value}</div>
                </div>
            {/each}
        </div>

        <Callout type="info" title="Kapan total derajat keanggotaan bisa ≠ 1?">
            <p>Pada contoh ini, total = 0.25 + 0.75 + 0.0 = 1.0. Ini terjadi <strong>by
            design</strong> — MF dirancang bertetangga (<em>partitioning</em>) sehingga di
            setiap titik tepat dua kurva yang aktif dan jumlahnya selalu 1.</p>
            <p>Pada sistem lain dengan <strong>gap</strong> antar MF (overlap tidak penuh),
            totalnya bisa <strong>kurang dari 1</strong>. Dengan tiga MF yang tumpang
            tindih secara bersamaan, bisa <strong>lebih dari 1</strong>. Dalam fuzzy logic
            tidak ada kewajiban total = 1 — inilah yang membedakannya dari distribusi
            probabilitas.</p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 5 — Operasi Fuzzy -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Operasi pada Himpunan Fuzzy">
        <p>
            Sebelum memahami bagaimana rules dievaluasi, kita perlu tahu <strong>tiga operasi dasar</strong>
            pada himpunan fuzzy. Operasi ini penting karena rule fuzzy sering punya antecedent banyak:
            "IF suhu panas <strong>AND</strong> kelembaban tinggi THEN ...".
        </p>

        <div class="ops-grid">
            <div class="ops-card">
                <h3>AND (Intersection)</h3>
                <MathBlock displayMode={false} latex={String.raw`\mu_{A \cap B}(x) = \min(\mu_A(x),\, \mu_B(x))`} />
                <p>Ambil nilai <strong>paling kecil</strong>. Logikanya: agar A <em>dan</em> B terpenuhi, keduanya harus terpenuhi — dan yang paling lemah yang menentukan.</p>
            </div>
            <div class="ops-card">
                <h3>OR (Union)</h3>
                <MathBlock displayMode={false} latex={String.raw`\mu_{A \cup B}(x) = \max(\mu_A(x),\, \mu_B(x))`} />
                <p>Ambil nilai <strong>paling besar</strong>. Cukup salah satu terpenuhi.</p>
            </div>
            <div class="ops-card">
                <h3>NOT (Complement)</h3>
                <MathBlock displayMode={false} latex={String.raw`\mu_{\bar{A}}(x) = 1 - \mu_A(x)`} />
                <p>"Tidak panas" berarti <strong>kebalikan</strong> dari derajat panas.</p>
            </div>
        </div>

        <p>
            Operasi-operasi inilah yang dipakai saat mengevaluasi <strong>antecedent
            </strong> pada setiap rule fuzzy. Rule
            <em>"IF suhu panas AND kelembaban tinggi THEN ..."</em> — bagian
            <strong>panas AND tinggi</strong> itu dihitung dengan
            <code>min(μ<sub>panas</sub>, μ<sub>tinggi</sub>)</code>. Semakin lemah
            kondisi yang paling lemah, semakin kecil <em>firing strength</em> rulanya.
        </p>

        <div class="formula-card example-calc">
            <h3>Contoh Perhitungan</h3>
            <p>
                Misalkan pada suhu 30°C: <strong>μ<sub>panas</sub> = 0.25</strong>, dan
                pada kelembaban 70%: <strong>μ<sub>tinggi</sub> = 0.8</strong>.
            </p>
            <MathBlock displayMode={false} latex={String.raw`\text{IF panas AND tinggi: } \min(0.25,\, 0.8) = 0.25`} />
            <MathBlock displayMode={false} latex={String.raw`\text{IF panas OR tinggi: } \max(0.25,\, 0.8) = 0.8`} />
            <MathBlock displayMode={false} latex={String.raw`\text{NOT panas: } 1 - 0.25 = 0.75`} />
            <p>
                Nilai 0.25 ini disebut <strong>firing strength</strong> (kekuatan aturan).
                Aturan tetap aktif, tetapi dengan bobot 0.25.
            </p>
        </div>

        <Callout type="tip" title="t-norm dan t-conorm">
            MIN/MAX bukan satu-satunya pilihan. Dalam literatur lanjut, operasi AND bisa
            diganti dengan t-norm lain seperti product (μ<sub>A</sub> × μ<sub>B</sub>),
            dan OR dengan probabilistic sum. Pilihan operator ini mempengaruhi
            perilaku inferensi.
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 6 — Alur Kerja Fuzzy Logic -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Alur Kerja Fuzzy Logic">
        <p>
            Secara umum, sistem fuzzy bekerja lewat empat tahap berikut.
            Perhatikan bahwa <strong>aggregation</strong> adalah langkah terpisah dari inference —
            ini sering dilupakan.
        </p>

        <div class="phase-grid">
            {#each fuzzyPhases as phase}
                <div class="phase-card">
                    <h3>{phase.title}</h3>
                    <p>{phase.text}</p>
                </div>
            {/each}
        </div>

        <div class="flow-card" aria-label="Diagram alur fuzzy logic">
            <svg viewBox="0 0 980 220" class="flow-svg" role="img" aria-labelledby="flowTitle flowDesc">
                <title id="flowTitle">Diagram alur fuzzy logic</title>
                <desc id="flowDesc">Input tegas → fuzzification → rule evaluation → aggregation → defuzzification → output tegas.</desc>

                <defs>
                    <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
                    </marker>
                </defs>

                <g class="flow-node">
                    <rect x="10" y="70" width="130" height="70" rx="16" />
                    <text x="75" y="98">Input tegas</text>
                    <text x="75" y="120">(mis. 26°C)</text>
                </g>

                <g class="flow-node accent">
                    <rect x="175" y="70" width="140" height="70" rx="16" />
                    <text x="245" y="98">Fuzzification</text>
                    <text x="245" y="120">→ derajat μ</text>
                </g>

                <g class="flow-node">
                    <rect x="350" y="70" width="140" height="70" rx="16" />
                    <text x="420" y="98">Rule Eval</text>
                    <text x="420" y="120">AND/OR</text>
                </g>

                <g class="flow-node accent">
                    <rect x="525" y="70" width="140" height="70" rx="16" />
                    <text x="595" y="98">Aggregation</text>
                    <text x="595" y="120">gabung output</text>
                </g>

                <g class="flow-node">
                    <rect x="700" y="70" width="155" height="70" rx="16" />
                    <text x="777" y="98">Defuzzification</text>
                    <text x="777" y="120">→ output tegas</text>
                </g>

                <line x1="140" y1="105" x2="175" y2="105" class="flow-line" marker-end="url(#flowArrow)" />
                <line x1="315" y1="105" x2="350" y2="105" class="flow-line" marker-end="url(#flowArrow)" />
                <line x1="490" y1="105" x2="525" y2="105" class="flow-line" marker-end="url(#flowArrow)" />
                <line x1="665" y1="105" x2="700" y2="105" class="flow-line" marker-end="url(#flowArrow)" />
            </svg>
        </div>

        <Callout type="info" title="Kenapa aggregation dipisah?">
            Karena setiap aturan menghasilkan output fuzzy sendiri. Sebelum defuzzification,
            semua output aturan harus <strong>digabung</strong> dulu (biasanya pakai MAX)
            menjadi satu himpunan fuzzy tunggal. Baru kemudian dikonversi ke angka tegas.
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 7 — Mamdani vs Sugeno -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Inferensi: Mamdani vs Sugeno">
        <p>
            Dua metode inferensi fuzzy yang paling banyak dipakai adalah <strong>Mamdani</strong>
            (1975) dan <strong>Sugeno</strong> (Takagi-Sugeno, 1985). Perbedaan utamanya terletak
            pada <strong>bentuk consequent</strong> (bagian THEN).
        </p>

        <div class="comparison-grid">
            <div class="comparison-card mamdani-card">
                <h3>Mamdani</h3>
                <p>Consequent berupa <strong>himpunan fuzzy</strong>.</p>
                <div class="rule-item mini">IF suhu panas THEN kipas <em>cepat</em></div>
                <p>"Cepat" adalah label fuzzy — butuh defuzzification untuk jadi angka.</p>
            </div>
            <div class="comparison-card sugeno-card">
                <h3>Sugeno (Takagi-Sugeno)</h3>
                <p>Consequent berupa <strong>fungsi linier</strong> dari input.</p>
                <div class="rule-item mini">IF suhu panas THEN kipas = 0.8×suhu + 5</div>
                <p>Output langsung berupa angka — lebih efisien, mudah dioptimasi.</p>
            </div>
        </div>

        <h3 class="mf-heading">Output Akhir Sugeno</h3>
        <MathBlock
            latex={String.raw`z^* = \frac{\sum_{i=1}^{n} w_i \cdot z_i}{\sum_{i=1}^{n} w_i}`}
        />
        <p>
            Di mana <em>w<sub>i</sub></em> adalah firing strength aturan ke-<em>i</em>, dan
            <em>z<sub>i</sub></em> adalah output fungsi linier aturan ke-<em>i</em>.
            Formula ini juga dipakai oleh ANFIS (lihat bagian bawah).
        </p>

        <Callout type="tip" title="📖 Pembahasan lengkap ada di halaman terpisah">
            Perbandingan detail Mamdani vs Sugeno — termasuk implication method
            (Min vs Larsen), contoh step-by-step, penjelasan centroid, dan
            diagram alur — dibahas tuntas di halaman
            <a href="{base}/semester-1/kecerdasan-buatan-lanjut/mamdani-vs-sugeno">
                <strong>Mamdani vs Sugeno</strong>
            </a>.
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 8 — Contoh Kasus Sederhana: Kontrol Kipas -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Contoh Kasus: Kontrol Kecepatan Kipas (Single-Input)">
        <p>
            Misalkan kita ingin mengatur kipas berdasarkan suhu ruangan.
            Aturan sederhananya seperti ini:
        </p>

        <div class="rule-list" role="list" aria-label="Contoh aturan fuzzy">
            {#each sampleRules as rule}
                <div class="rule-item" role="listitem">{rule}</div>
            {/each}
        </div>

        <p>
            Jika suhu ruangan <strong>26°C</strong>, dari grafik membership sebelumnya:
            <strong>dingin = 0.25</strong>, <strong>hangat = 0.75</strong>, dan <strong>panas = 0.0</strong>.
        </p>

        <h3 class="mf-heading">Defuzzification: Metode Centroid (Step-by-Step)</h3>
        <p>
            Metode centroid mencari <strong>titik pusat</strong> dari area output fuzzy.
            Untuk contoh diskrit sederhana, kita bisa pakai pendekatan weighted average:
        </p>

        <div class="formula-card example-calc">
            <h3>Perhitungan</h3>
            <p>Misalkan output kipas didefinisikan sebagai:</p>
            <ul>
                <li><strong>Lambat</strong> = 20% kecepatan, firing strength = 0.25 (dari rule 1)</li>
                <li><strong>Sedang</strong> = 50% kecepatan, firing strength = 0.75 (dari rule 2)</li>
                <li><strong>Cepat</strong> = 90% kecepatan, firing strength = 0.0 (dari rule 3)</li>
            </ul>
            <MathBlock
                latex={String.raw`z^* = \frac{(0.25 \times 20) + (0.75 \times 50) + (0.0 \times 90)}{0.25 + 0.75 + 0.0}`}
            />
            <MathBlock
                latex={String.raw`z^* = \frac{5 + 37.5 + 0}{1.0} = \frac{42.5}{1.0} = 42.5\%`}
            />
            <p>
                Jadi output tegas: kipas berputar pada <strong>sekitar 42.5% kecepatan</strong>.
            </p>
            <Callout type="warning" title="Catatan: ini bukan centroid integrasi penuh">
                Perhitungan di atas adalah <strong>weighted average of centroids</strong> —
                setiap label diwakili satu titik pusat, lalu dibobot. Centroid sejati
                mengintegrasikan <em>seluruh area</em> output fuzzy yang terbentuk setelah
                implication dan agregasi. Pendekatan ini identik dengan cara kerja Sugeno,
                dan cocok untuk pemahaman awal. Untuk Mamdani yang akurat, area output perlu
                dihitung secara geometri atau numerik.
            </Callout>
        </div>

        <div class="result-panel">
            <div>
                <span class="result-label">Input</span>
                <strong>26°C</strong>
            </div>
            <div>
                <span class="result-label">Dominan</span>
                <strong>hangat (0.75)</strong>
            </div>
            <div>
                <span class="result-label">Output tegas</span>
                <strong>≈ 42.5% kecepatan</strong>
            </div>
        </div>

        <Callout type="info" title="Metode defuzzification lainnya">
            <p>Centroid bukan satu-satunya cara. Metode lain yang umum:</p>
            <p><strong>Mean of Maximum (MoM)</strong> — rata-rata dari semua titik di mana μ paling tinggi. Cepat tapi kurang presisi.</p>
            <p><strong>Bisector</strong> — titik yang membagi area fuzzy menjadi dua bagian sama besar.</p>
            <p><strong>SoM / LoM</strong> — Smallest / Largest of Maximum, ambil ujung kiri/kanan dari area μ tertinggi.</p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 9 — Multi-Input Example -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Contoh Lanjut: Multi-Input (Suhu + Kelembaban)">
        <p>
            Sistem nyata jarang hanya punya satu input. Berikut contoh dengan
            <strong>dua input</strong> (suhu dan kelembaban) dan satu output (kecepatan kipas).
        </p>

        <div class="rule-list" role="list" aria-label="Contoh aturan multi-input">
            {#each multiInputRules as rule}
                <div class="rule-item" role="listitem">{rule}</div>
            {/each}
        </div>

        <div class="formula-card example-calc">
            <h3>Contoh Evaluasi Rule 1</h3>
            <p>Input: suhu 34°C, kelembaban 75%</p>
            <p>Dari membership function masing-masing:</p>
            <MathBlock displayMode={false} latex={String.raw`\mu_{\text{panas}}(34) = 0.6,\quad \mu_{\text{tinggi}}(75) = 0.8`} />
            <p>Rule: IF suhu panas <strong>AND</strong> kelembaban tinggi → pakai MIN:</p>
            <MathBlock displayMode={false} latex={String.raw`\text{firing strength} = \min(0.6, 0.8) = 0.6`} />
            <p>
                Aturan ini aktif dengan kekuatan 0.6. Output "cepat" dipotong di μ = 0.6.
            </p>
        </div>

        <div class="formula-card example-calc">
            <h3>Melanjutkan: Evaluasi Rule 2 &amp; 3 + Defuzzification</h3>
            <p>Dari input yang sama (suhu 34°C, kelembaban 75%), evaluasi semua rule:</p>
            <ul>
                <li>
                    <strong>Rule 2</strong> (IF hangat AND rendah):
                    μ<sub>hangat</sub>(34) ≈ 0.25, μ<sub>rendah</sub>(75) ≈ 0.1
                    → <code>min(0.25, 0.1)</code> = <strong>0.1</strong>
                </li>
                <li>
                    <strong>Rule 3</strong> (IF dingin OR rendah):
                    μ<sub>dingin</sub>(34) = 0.0, μ<sub>rendah</sub>(75) ≈ 0.1
                    → <code>max(0.0, 0.1)</code> = <strong>0.1</strong>
                </li>
            </ul>
            <p>
                <strong>Agregasi</strong> (MAX semua output fuzzy) → lalu weighted average
                defuzzification (pusat output: cepat = 90%, lambat = 20%, mati = 0%):
            </p>
            <MathBlock
                latex={String.raw`z^* = \frac{(0.6 \times 90)+(0.1 \times 20)+(0.1 \times 0)}{0.6+0.1+0.1} = \frac{54+2+0}{0.8} = \frac{56}{0.8} = 70\%`}
            />
            <p>
                Kipas berputar pada <strong>70% kecepatan</strong> — didominasi Rule 1
                karena firing strength-nya (0.6) jauh lebih tinggi dari rule lain.
            </p>
        </div>

        <Callout type="danger" title="Rule Explosion — Masalah Nyata!">
            <p>Dengan <em>k</em> variabel input, masing-masing <em>n</em> label fuzzy, jumlah rules <strong>bisa mencapai n<sup>k</sup></strong>.</p>
            <p>Contoh: 3 input × 5 label = 5³ = <strong>125 rules</strong>. Dengan 5 input: 5⁵ = <strong>3.125 rules</strong>!</p>
            <p>Ini disebut <strong>curse of dimensionality</strong> di fuzzy logic. Solusinya: hierarchical fuzzy systems, atau beralih ke Sugeno + optimasi otomatis.</p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 10 — Kelebihan & Keterbatasan -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Kelebihan dan Keterbatasan">
        <div class="pros-cons">
            <div class="pros-card">
                <h3>Kelebihan</h3>
                <ul>
                    <li>Mudah memodelkan masalah yang samar dan tidak kaku.</li>
                    <li>Cocok untuk sistem kontrol yang mengikuti intuisi manusia.</li>
                    <li>Tidak butuh model matematis eksak — cukup pengetahuan pakar.</li>
                    <li>Cocok ketika data training terbatas (berbeda dari ML yang butuh data besar).</li>
                    <li>Hasil mudah diinterpretasi (terutama Mamdani).</li>
                </ul>
            </div>
            <div class="cons-card">
                <h3>Keterbatasan</h3>
                <ul>
                    <li><strong>Desain MF sangat sensitif</strong> — sedikit geser parameter a, b, c bisa mengubah output drastis.</li>
                    <li><strong>Rule explosion</strong> — jumlah rules tumbuh eksponensial dengan jumlah variabel (n<sup>k</sup>).</li>
                    <li><strong>Tidak bisa belajar dari data</strong> (fuzzy murni) — berbeda dari ML yang bisa self-optimize.</li>
                    <li>Validasi perlu dilakukan secara empiris (RMSE, MAE dibandingkan ground truth).</li>
                    <li>Kurang cocok untuk masalah non-linear yang sangat kompleks tanpa bantuan neural network.</li>
                </ul>
            </div>
        </div>

        <Callout type="tip" title="Kapan pakai fuzzy vs machine learning?">
            <p><strong>Pilih fuzzy</strong> — saat punya pengetahuan pakar yang jelas, data terbatas, dan butuh interpretabilitas tinggi.</p>
            <p><strong>Pilih ML</strong> — saat punya data besar, pola kompleks, dan interpretabilitas bukan prioritas.</p>
            <p><strong>Gabungkan keduanya</strong> — neuro-fuzzy (ANFIS) menggabungkan kekuatan keduanya.</p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 11 — Neuro-Fuzzy & ANFIS -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Neuro-Fuzzy dan ANFIS">
        <p>
            Salah satu kelemahan utama fuzzy logic murni adalah <strong>MF harus didesain manual</strong>
            oleh pakar. Bagaimana kalau parameter MF bisa <strong>belajar dari data</strong>?
        </p>
        <p>
            Itulah ide di balik <strong>ANFIS (Adaptive Neuro-Fuzzy Inference System)</strong>,
            diperkenalkan oleh Jyh-Shing Roger Jang pada tahun 1993. ANFIS menggunakan
            arsitektur neural network berlapis lima untuk mengoptimasi parameter MF sekaligus
            parameter output Sugeno dari data, sambil tetap mempertahankan struktur aturan
            IF-THEN yang interpretable.
        </p>

        <h3 class="mf-heading">Arsitektur 5-Layer ANFIS</h3>
        <p>Setiap layer punya fungsi spesifik dan tidak dapat dipertukarkan urutan-nya:</p>
        <div class="anfis-layers">
            <div class="anfis-layer">
                <span class="layer-num">L1</span>
                <div>
                    <strong>Fuzzification</strong> — setiap node mengaplikasikan MF pada
                    input. Parameter layer ini (<em>a, b, c</em> untuk segitiga;
                    <em>c, σ</em> untuk Gaussian) adalah <em>premise parameters</em>
                    yang akan di-tune.
                </div>
            </div>
            <div class="anfis-layer">
                <span class="layer-num">L2</span>
                <div>
                    <strong>Rule Strength</strong> — setiap node mengalikan (product)
                    derajat keanggotaan dari antecedent-nya. Satu node = satu aturan.
                    Hasilnya disebut <em>firing strength</em> (w<sub>i</sub>).
                </div>
            </div>
            <div class="anfis-layer">
                <span class="layer-num">L3</span>
                <div>
                    <strong>Normalization</strong> — membagi firing strength tiap rule
                    dengan total semua firing strength (w̄<sub>i</sub> = w<sub>i</sub> /
                    Σw<sub>j</sub>). Memastikan kontribusi relatif tiap rule terukur.
                </div>
            </div>
            <div class="anfis-layer">
                <span class="layer-num">L4</span>
                <div>
                    <strong>Consequent</strong> — mengalikan normalized firing strength
                    dengan fungsi output Sugeno: w̄<sub>i</sub> · (p<sub>i</sub>x₁ +
                    q<sub>i</sub>x₂ + r<sub>i</sub>). Parameter <em>p, q, r</em>
                    inilah <em>consequent parameters</em> yang juga di-tune.
                </div>
            </div>
            <div class="anfis-layer">
                <span class="layer-num">L5</span>
                <div>
                    <strong>Output</strong> — menjumlahkan seluruh output dari L4 menjadi
                    satu angka akhir: z* = Σ(w̄<sub>i</sub> · z<sub>i</sub>). Layer ini
                    tidak punya parameter yang di-tune.
                </div>
            </div>
        </div>

        <h3 class="mf-heading">Hybrid Learning Algorithm</h3>
        <p>
            ANFIS tidak bisa ditraining dengan satu metode saja. Ia menggunakan dua
            metode optimasi secara bergantian per epoch:
        </p>
        <div class="ops-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 1rem;">
            <div class="ops-card">
                <h3>Forward Pass — Least Squares</h3>
                <p>Input mengalir maju (L1→L5). <strong>Consequent parameters</strong>
                (p, q, r) dioptimasi dengan <em>least squares estimator</em> — cepat dan
                eksak untuk parameter linier.</p>
            </div>
            <div class="ops-card">
                <h3>Backward Pass — Backpropagation</h3>
                <p>Error dipropagasi dari L5 ke L1. <strong>Premise parameters</strong>
                (a, b, c, σ) dioptimasi dengan <em>gradient descent</em> — menggeser posisi
                dan lebar MF sesuai data.</p>
            </div>
        </div>

        <div class="formula-grid">
            <div class="formula-card">
                <h3>Apa yang dipelajari ANFIS?</h3>
                <ul>
                    <li>Parameter membership function (<em>premise parameters</em>)</li>
                    <li>Koefisien fungsi output Sugeno (<em>consequent parameters</em>)</li>
                </ul>
                <p>Hasil: sistem fuzzy yang optimal berdasarkan data, bukan tebakan pakar.</p>
            </div>
            <div class="formula-card">
                <h3>Kapan pakai ANFIS?</h3>
                <ul>
                    <li>Ada data training yang memadai</li>
                    <li>Butuh interpretabilitas (bukan black-box murni)</li>
                    <li>Jumlah input tidak terlalu banyak (idealnya ≤ 4–5 variabel)</li>
                </ul>
            </div>
        </div>

        <Callout type="info" title="ANFIS = Sugeno + Neural Network">
            ANFIS hanya bekerja dengan inferensi Sugeno (bukan Mamdani) karena output
            liniernya mudah dioptimasi oleh gradient descent dan least squares. Ini salah
            satu alasan Sugeno tetap sangat populer di riset dan aplikasi industri.
        </Callout>

        <Callout type="warning" title="Keterbatasan ANFIS">
            <p>
                ANFIS optimal untuk input <strong>berdimensi rendah</strong>. Dengan lebih
                banyak variabel, jumlah rules tumbuh eksponensial (n<sup>k</sup>) dan
                training menjadi tidak praktis. Untuk dimensi tinggi, pertimbangkan deep
                learning atau <em>hierarchical neuro-fuzzy systems</em>.
            </p>
        </Callout>
    </NoteSection>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- BAGIAN 12 — Ringkasan & Referensi -->
    <!-- ═══════════════════════════════════════════════════════════ -->

    <NoteSection title="Ringkasan Cepat">
        <ol>
            <li>Fuzzy logic memungkinkan nilai berada di antara benar dan salah (derajat keanggotaan 0–1).</li>
            <li>Membership function mengubah input menjadi derajat keanggotaan. Bentuk utama: segitiga, trapesium, dan Gaussian.</li>
            <li>Tiga operasi dasar: AND (min), OR (max), NOT (1−μ). Operator lain (product, probabilistic sum) juga bisa dipakai.</li>
            <li>Dua metode inferensi utama: <strong>Mamdani</strong> (output fuzzy, intuitif) dan <strong>Sugeno</strong> (output fungsi linier, efisien).</li>
            <li>Defuzzification mengubah hasil fuzzy menjadi angka tegas. Centroid paling umum, tapi MoM, bisector, SoM/LoM juga ada.</li>
            <li>Hati-hati <strong>rule explosion</strong> pada multi-input systems (n<sup>k</sup> rules).</li>
            <li>ANFIS menggabungkan fuzzy dengan neural network untuk optimasi parameter MF dari data.</li>
        </ol>
    </NoteSection>

    <NoteSection title="Referensi">
        <ol class="reference-list">
            {#each references as ref}
                <li>
                    {ref.author} ({ref.year}). <em>{ref.title}</em>. {ref.journal}.
                </li>
            {/each}
        </ol>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .fuzzy-article {
        --fuzzy-surface: color-mix(in srgb, var(--color-surface-elevated) 78%, #ffffff 22%);
        --fuzzy-border: color-mix(in srgb, var(--color-line) 72%, #6aa9ff 28%);
    }

    /* ── Grid containers ── */

    .comparison-grid,
    .phase-grid,
    .pros-cons,
    .ops-grid {
        display: grid;
        gap: 1rem;
    }

    .comparison-grid,
    .pros-cons {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .ops-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    /* ── Card base ── */

    .comparison-card,
    .phase-card,
    .pros-card,
    .cons-card,
    .chart-card,
    .flow-card,
    .result-panel,
    .ops-card {
        background: var(--fuzzy-surface);
        border: 1px solid var(--fuzzy-border);
        border-radius: 16px;
        box-shadow: 0 10px 24px rgba(38, 50, 56, 0.05);
    }

    .comparison-card,
    .phase-card,
    .pros-card,
    .cons-card,
    .ops-card {
        padding: 1rem 1.1rem;
    }

    .comparison-card h3,
    .phase-card h3,
    .pros-card h3,
    .cons-card h3,
    .ops-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
    }

    .ops-card p {
        font-size: 0.92rem;
        line-height: 1.6;
    }

    /* ── MF subheadings ── */

    .mf-heading {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        padding-bottom: 0.3rem;
        border-bottom: 2px solid var(--fuzzy-border);
        font-size: 1.15rem;
    }

    /* ── Chart / flow ── */

    .chart-card,
    .flow-card {
        padding: 1rem;
        overflow-x: auto;
        margin: 1rem 0;
    }

    .chart-svg,
    .flow-svg {
        width: 100%;
        min-width: 680px;
        height: auto;
        display: block;
    }

    .axis,
    .grid-lines line,
    .flow-line {
        stroke: var(--color-line-dark);
        stroke-width: 2;
        fill: none;
    }

    .grid-lines line {
        stroke-dasharray: 6 8;
        opacity: 0.35;
    }

    .curve {
        fill: none;
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .curve.cold {
        stroke: #3178c6;
    }

    .curve.warm {
        stroke: #d98f1f;
    }

    .curve.hot {
        stroke: #d64545;
    }

    .tri-curve {
        fill: none;
        stroke: #2f855a;
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .trap-curve {
        fill: none;
        stroke: #6366f1;
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .gauss-curve {
        fill: none;
        stroke: #e27d60;
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .sigma-line {
        stroke: #94a3b8;
        stroke-width: 2;
        stroke-dasharray: 6 4;
    }

    .tri-guide {
        stroke: #94a3b8;
        stroke-width: 2;
        stroke-dasharray: 6 7;
    }

    .sample-guide {
        stroke: var(--color-ink-soft);
        stroke-width: 1.5;
        stroke-dasharray: 4 4;
        opacity: 0.6;
    }

    .tri-point {
        stroke: var(--color-surface-elevated);
        stroke-width: 3;
    }

    .tri-point.a,
    .tri-point.c {
        fill: #94a3b8;
    }

    .tri-point.b {
        fill: #2f855a;
    }

    .tri-point.sample {
        fill: var(--color-ink-strong);
    }

    .point.sample-cold {
        fill: #3178c6;
        stroke: var(--color-surface-elevated);
        stroke-width: 2;
    }

    .point.sample-warm {
        fill: #d98f1f;
        stroke: var(--color-surface-elevated);
        stroke-width: 2;
    }

    .tri-label {
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 700;
        fill: var(--color-ink-strong);
    }

    .tri-label.peak {
        fill: #2f855a;
    }

    .tri-label.sigma {
        fill: #94a3b8;
    }

    .tri-label.sample {
        fill: var(--color-ink-strong);
        font-size: 13px;
    }

    .point.sample {
        fill: var(--color-ink-strong);
        stroke: var(--color-surface-elevated);
        stroke-width: 3;
    }

    .sample-label,
    .axis-label,
    .axis-title,
    .curve-label,
    .flow-node text {
        font-family: var(--font-sans);
        fill: var(--color-ink-strong);
        font-size: 14px;
    }

    .sample-label.micro {
        font-size: 12px;
        font-weight: 600;
    }

    .axis-title {
        font-weight: 700;
    }

    .axis-title.vertical {
        transform: rotate(-90deg);
        transform-origin: 20px 160px;
    }

    .curve-label {
        font-weight: 700;
    }

    .curve-label.cold {
        fill: #3178c6;
    }

    .curve-label.warm {
        fill: #d98f1f;
    }

    .curve-label.hot {
        fill: #d64545;
    }

    /* ── Membership bars ── */

    .membership-bars {
        display: grid;
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .membership-row {
        display: grid;
        grid-template-columns: 82px minmax(0, 1fr) 44px;
        gap: 0.75rem;
        align-items: center;
    }

    .membership-label,
    .membership-value {
        font-weight: 700;
        color: var(--color-ink-strong);
    }

    .membership-track {
        height: 14px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--color-surface-soft) 82%, #ffffff 18%);
        overflow: hidden;
        border: 1px solid var(--color-line);
    }

    .membership-fill {
        height: 100%;
        border-radius: inherit;
    }

    .membership-fill.dingin {
        background: #3178c6;
    }

    .membership-fill.hangat {
        background: #d98f1f;
    }

    .membership-fill.panas {
        background: #d64545;
    }

    /* ── Phase grid ── */

    .phase-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin-bottom: 1rem;
    }

    /* ── Flow nodes ── */

    .flow-card {
        padding-bottom: 0.5rem;
    }

    .flow-node rect {
        fill: var(--color-surface-elevated);
        stroke: var(--color-line-dark);
        stroke-width: 2;
    }

    .flow-node.accent rect {
        fill: color-mix(in srgb, var(--color-highlight) 50%, #ffffff 50%);
        stroke: #8da8ff;
    }

    .flow-node text {
        text-anchor: middle;
        font-weight: 700;
    }

    /* ── Rule list ── */

    .rule-list {
        display: grid;
        gap: 0.75rem;
        margin: 1rem 0;
    }

    .rule-item {
        background: color-mix(in srgb, var(--color-surface-soft) 82%, #ffffff 18%);
        border: 1px solid var(--color-line);
        border-left: 4px solid var(--color-binder);
        border-radius: 12px;
        padding: 0.85rem 1rem;
        font-family: var(--font-mono);
        overflow-x: auto;
    }

    .rule-item.mini {
        font-size: 0.88rem;
        padding: 0.65rem 0.85rem;
        margin: 0.5rem 0;
        border-radius: 8px;
    }

    /* ── Result panel ── */

    .result-panel {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin: 1rem 0;
        padding: 1rem;
    }

    .result-panel div {
        display: grid;
        gap: 0.35rem;
    }

    .result-label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-ink-soft);
    }

    /* ── Formula grid ── */

    .formula-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .formula-card {
        background: var(--fuzzy-surface);
        border: 1px solid var(--fuzzy-border);
        border-radius: 16px;
        padding: 1rem 1.1rem;
        box-shadow: 0 10px 24px rgba(38, 50, 56, 0.05);
    }

    .formula-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
    }

    .formula-card.example-calc {
        grid-column: 1 / -1;
    }

    /* ── Mamdani / Sugeno accent ── */

    .mamdani-card {
        border-left: 4px solid #d98f1f;
    }

    .sugeno-card {
        border-left: 4px solid #6366f1;
    }

    /* ── References ── */

    .reference-list li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
    }

    /* ── ANFIS layers ── */

    .anfis-layers {
        display: grid;
        gap: 0.5rem;
        margin: 1rem 0;
    }

    .anfis-layer {
        display: grid;
        grid-template-columns: 44px 1fr;
        gap: 0.85rem;
        align-items: start;
        background: var(--fuzzy-surface);
        border: 1px solid var(--fuzzy-border);
        border-radius: 12px;
        padding: 0.75rem 1rem;
    }

    .layer-num {
        font-weight: 800;
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        color: var(--color-binder);
        background: color-mix(in srgb, var(--color-binder) 14%, transparent);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        flex-shrink: 0;
    }

    /* ── Responsive ── */

    @media (max-width: 900px) {
        .comparison-grid,
        .pros-cons,
        .phase-grid,
        .result-panel,
        .ops-grid,
        .formula-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 720px) {
        .membership-row {
            grid-template-columns: 66px minmax(0, 1fr) 34px;
        }

        .sample-label,
        .axis-label,
        .axis-title,
        .curve-label,
        .flow-node text {
            font-size: 12px;
        }
    }
</style>