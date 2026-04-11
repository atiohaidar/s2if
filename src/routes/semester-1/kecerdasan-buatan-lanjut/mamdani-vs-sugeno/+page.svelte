<script lang="ts">
    import { base } from '$app/paths';
    import BackLink from '$lib/components/BackLink.svelte';
    import Callout from '$lib/components/Callout.svelte';
    import MathBlock from '$lib/components/MathBlock.svelte';
    import NoteHeader from '$lib/components/NoteHeader.svelte';
    import NoteSection from '$lib/components/NoteSection.svelte';

    const comparisonRows = [
        {
            aspect: 'Bentuk output',
            mamdani: 'Output berupa himpunan fuzzy, lalu diubah lagi lewat defuzzification.',
            sugeno: 'Output biasanya angka langsung atau fungsi linear yang sudah siap dipakai.',
        },
        {
            aspect: 'Intuisi manusia',
            mamdani: 'Lebih mudah dijelaskan ke orang awam karena bentuk output masih “kurva fuzzy”.',
            sugeno: 'Lebih ringkas dan cocok untuk implementasi yang butuh kecepatan.',
        },
        {
            aspect: 'Komputasi',
            mamdani: 'Biasanya lebih berat karena perlu agregasi dan defuzzification.',
            sugeno: 'Lebih ringan karena output sudah tegas dari awal.',
        },
        {
            aspect: 'Cocok untuk',
            mamdani: 'Masalah kontrol yang ingin mudah dipahami secara visual.',
            sugeno: 'Sistem yang butuh efisiensi dan respons cepat.',
        },
    ];

    const stepCards = [
        {
            title: '1. Fuzzification',
            text: 'Input tegas, seperti suhu 30°C, diubah menjadi derajat keanggotaan pada himpunan fuzzy.',
        },
        {
            title: '2. Rule evaluation',
            text: 'Aturan IF-THEN dievaluasi untuk menentukan seberapa kuat tiap aturan aktif.',
        },
        {
            title: '3. Output',
            text: 'Mamdani menghasilkan output fuzzy set, sedangkan Sugeno langsung menghasilkan angka.',
        },
    ];
</script>

<svelte:head>
    <title>Mamdani vs Sugeno - S2IF Notebook</title>
    <meta
        name="description"
        content="Perbandingan Mamdani dan Sugeno dalam fuzzy logic, lengkap dengan penjelasan awam, diagram alur, dan contoh keluaran pada kontrol suhu."
    />
</svelte:head>

<article class="note-article compare-article">
    <NoteHeader
        title="Mamdani vs Sugeno"
        date="11 April 2026"
        status="done"
        tags={['Fuzzy', 'Mamdani', 'Sugeno']}
    />

    <NoteSection title="Gambaran Besar">
        <p>
            Mamdani dan Sugeno adalah dua cara populer untuk membangun sistem
            fuzzy inference. Keduanya sama-sama memakai aturan IF-THEN dan sama-sama
            cocok untuk masalah kontrol, tetapi cara menghasilkan outputnya berbeda.
        </p>
        <p>
            Kalau dijelaskan dengan bahasa sederhana: <strong>Mamdani</strong> lebih
            “visual” dan mudah dibayangkan, sedangkan <strong>Sugeno</strong> lebih
            “ringkas” dan biasanya lebih cepat dihitung.
        </p>

        <Callout type="info" title="Inti perbedaan">
            Perbedaan paling penting ada pada keluaran akhirnya. Mamdani memberi
            keluaran fuzzy yang masih perlu diubah menjadi angka, sedangkan Sugeno
            umumnya langsung memberi angka.
        </Callout>

        <Callout type="tip" title="Prasyarat">
            Halaman ini fokus pada perbandingan dua metode inferensi. Untuk konsep
            dasar (fuzzy set, membership function, operasi AND/OR/NOT, dan alur
            kerja fuzzy secara umum), lihat halaman
            <a href="{base}/semester-1/kecerdasan-buatan-lanjut/logika-fuzzy">
                <strong>Logika Fuzzy</strong>
            </a>.
        </Callout>
    </NoteSection>

    <NoteSection title="Cara Kerja Singkat">
        <div class="step-grid">
            {#each stepCards as card}
                <div class="step-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                </div>
            {/each}
        </div>

        <div class="flow-grid">
            <div class="flow-card">
                <h3>Alur Mamdani</h3>
                <svg viewBox="0 0 360 170" class="flow-svg" role="img" aria-label="Alur Mamdani">
                    <rect x="20" y="55" width="90" height="50" rx="12" class="flow-box" />
                    <rect x="135" y="55" width="90" height="50" rx="12" class="flow-box accent" />
                    <rect x="250" y="55" width="90" height="50" rx="12" class="flow-box" />
                    <line x1="110" y1="80" x2="135" y2="80" class="flow-line" />
                    <line x1="225" y1="80" x2="250" y2="80" class="flow-line" />
                    <text x="65" y="84" class="flow-label">Input</text>
                    <text x="180" y="76" class="flow-label">Fuzzy</text>
                    <text x="180" y="94" class="flow-label">output</text>
                    <text x="295" y="84" class="flow-label">Defuzzify</text>
                </svg>
                <p>Output masih berupa himpunan fuzzy, lalu diubah jadi angka tegas.</p>
            </div>

            <div class="flow-card">
                <h3>Alur Sugeno</h3>
                <svg viewBox="0 0 360 170" class="flow-svg" role="img" aria-label="Alur Sugeno">
                    <rect x="20" y="55" width="90" height="50" rx="12" class="flow-box" />
                    <rect x="135" y="55" width="90" height="50" rx="12" class="flow-box accent" />
                    <rect x="250" y="55" width="90" height="50" rx="12" class="flow-box" />
                    <line x1="110" y1="80" x2="135" y2="80" class="flow-line" />
                    <line x1="225" y1="80" x2="250" y2="80" class="flow-line" />
                    <text x="65" y="84" class="flow-label">Input</text>
                    <text x="180" y="76" class="flow-label">Rule</text>
                    <text x="180" y="94" class="flow-label">output</text>
                    <text x="295" y="84" class="flow-label">Angka</text>
                </svg>
                <p>
                    Output sudah berupa konstanta atau fungsi linear, jadi lebih
                    cepat diproses. Pada contoh ini, nilai 50 dan 80 adalah output
                    yang kita tetapkan sebagai konsekuen aturan.
                </p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Perbandingan Langsung">
        <div class="comparison-table" role="table" aria-label="Perbandingan Mamdani dan Sugeno">
            <div class="table-head" role="row">
                <div role="columnheader">Aspek</div>
                <div role="columnheader">Mamdani</div>
                <div role="columnheader">Sugeno</div>
            </div>
            {#each comparisonRows as row}
                <div class="table-row" role="row">
                    <div role="cell" class="aspect-cell">{row.aspect}</div>
                    <div role="cell">{row.mamdani}</div>
                    <div role="cell">{row.sugeno}</div>
                </div>
            {/each}
        </div>

        <MathBlock latex={String.raw`\text{Mamdani: } IF\ x\text{ is }A\ THEN\ y\text{ is }B`} />
        <MathBlock latex={String.raw`\text{Sugeno: } IF\ x\text{ is }A\ THEN\ z = p x + q y + r`} />
        <p>
            Pada Mamdani, bagian "THEN" masih berupa label fuzzy, misalnya
            "kipas sedang". Pada Sugeno, bagian "THEN" sudah berupa angka atau
            rumus, misalnya "kecepatan kipas = 60".
        </p>
    </NoteSection>

    <NoteSection title="Contoh Sederhana">
        <p>
            Bayangkan suhu ruangan 30°C dengan aturan berikut:
        </p>
        <ul>
            <li>IF suhu hangat THEN kipas sedang.</li>
            <li>IF suhu panas THEN kipas cepat.</li>
        </ul>

        <div class="example-grid">
            <div class="example-card">
                <h3>Mamdani</h3>
                <p>
                    Aturan menghasilkan output fuzzy seperti "sedang" dan "cepat".
                    Setelah digabung, sistem masih perlu defuzzification untuk
                    mendapatkan satu angka, misalnya 58% kecepatan kipas.
                </p>
            </div>
            <div class="example-card">
                <h3>Sugeno</h3>
                <p>
                    Aturan menghasilkan angka langsung. Pada contoh ini, kita
                    tetapkan keluaran aturan sebagai 50 dan 80 supaya perhitungannya
                    mudah diikuti. Angka seperti ini disebut <em>konsekuen</em>
                    dan biasanya ditentukan saat merancang sistem.
                </p>
            </div>
        </div>

        <MathBlock latex={String.raw`z = \frac{\sum w_i z_i}{\sum w_i}`} />
        <p>
            Rumus di atas menggambarkan inti Sugeno: setiap aturan memberi nilai
            output <em>z_i</em>, lalu dikalikan dengan bobot kekuatan aturan <em>w_i</em>.
        </p>

        <Callout type="tip">
            Untuk orang awam, gampangnya begini: Mamdani itu seperti menilai
            “seberapa panas”, lalu baru memutuskan angka akhirnya. Sugeno langsung
            melompat ke angka akhir dengan perhitungan yang lebih singkat.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Pengerjaan Lengkap">
        <p>
            Supaya lebih jelas, kita pakai contoh yang sama untuk dua metode ini.
            Misalkan kita ingin mengatur kecepatan kipas berdasarkan suhu ruangan.
            Input suhu yang dibaca sensor adalah <strong>30°C</strong>.
        </p>

        <div class="example-grid">
            <div class="example-card">
                <h3>Data awal</h3>
                <ul>
                    <li>Suhu = 30°C</li>
                    <li>μ<sub>hangat</sub>(30) = 0.6</li>
                    <li>μ<sub>panas</sub>(30) = 0.2</li>
                </ul>
                <p>
                    Artinya suhu 30°C lebih dekat ke kategori hangat, tetapi masih
                    ada sedikit unsur panas.
                </p>
            </div>
            <div class="example-card">
                <h3>Aturan yang dipakai</h3>
                <ul>
                    <li>IF suhu hangat THEN kipas sedang.</li>
                    <li>IF suhu panas THEN kipas cepat.</li>
                </ul>
                <p>
                    Kita sengaja memakai hanya dua aturan supaya hitungannya mudah
                    diikuti dari awal sampai akhir.
                </p>
            </div>
        </div>

        <div class="example-grid">
            <div class="example-card">
                <h3>Langkah Mamdani</h3>
                <ol>
                    <li>
                        <strong>Fuzzification:</strong> input 30°C menghasilkan
                        μ<sub>hangat</sub> = 0.6 dan μ<sub>panas</sub> = 0.2.
                    </li>
                    <li>
                        <strong>Rule activation:</strong> kekuatan aturan dihitung
                        dengan operator <em>min</em>.
                        <MathBlock displayMode={false} latex={String.raw`\alpha_1 = 0.6,\quad \alpha_2 = 0.2`} />
                    </li>
                    <li>
                        <strong>Implication:</strong> output fuzzy untuk "sedang"
                        dipotong setinggi 0.6, dan output fuzzy untuk "cepat"
                        dipotong setinggi 0.2.
                    </li>
                    <li>
                        <strong>Aggregation:</strong> kedua kurva output digabung
                        dengan operator <em>max</em>.
                    </li>
                    <li>
                        <strong>Defuzzification:</strong> untuk contoh manual sederhana,
                        kita pakai titik representatif:
                        <MathBlock displayMode={false} latex={String.raw`\text{sedang} = 50,\quad \text{cepat} = 80`} />
                        lalu dihitung pusat beratnya.
                        <MathBlock displayMode={false} latex={String.raw`z^* \approx \frac{(0.6 \times 50) + (0.2 \times 80)}{0.6 + 0.2}`} />
                        <MathBlock displayMode={false} latex={String.raw`z^* \approx \frac{30 + 16}{0.8} = 57.5`} />
                    </li>
                </ol>
                <p>
                    Jadi hasil Mamdani pada contoh manual ini sekitar
                    <strong>57.5%</strong> kecepatan kipas.
                </p>
            </div>

            <div class="example-card">
                <h3>Langkah Sugeno</h3>
                <ol>
                    <li>
                        <strong>Fuzzification:</strong> input yang sama menghasilkan
                        μ<sub>hangat</sub> = 0.6 dan μ<sub>panas</sub> = 0.2.
                    </li>
                    <li>
                        <strong>Rule output:</strong> setiap aturan langsung memberi
                        angka keluaran, misalnya:
                        <MathBlock displayMode={false} latex={String.raw`z_1 = 50,\quad z_2 = 80`} />
                        <p>
                            Di contoh ini, 50 mewakili kipas sedang dan 80 mewakili
                            kipas cepat. Nilai ini bukan muncul tiba-tiba saat dihitung,
                            tetapi memang kita pilih sebagai output tiap aturan.
                        </p>
                    </li>
                    <li>
                        <strong>Weighted average:</strong>
                        <MathBlock displayMode={false} latex={String.raw`z = \frac{(0.6 \times 50) + (0.2 \times 80)}{0.6 + 0.2}`} />
                        <MathBlock displayMode={false} latex={String.raw`z = \frac{46}{0.8} = 57.5`} />
                    </li>
                </ol>
                <p>
                    Hasil Sugeno pada contoh ini juga sekitar <strong>57.5%</strong>,
                    tetapi cara mendapatkannya lebih singkat karena output aturan
                    memang sudah berupa angka.
                </p>
            </div>
        </div>

        <Callout type="info" title="Kenapa hasilnya bisa sama?">
            Pada contoh sederhana ini, kita sengaja memilih nilai yang membuat
            perhitungan Mamdani dan Sugeno terlihat mirip. Bedanya tetap ada di
            prosesnya: Mamdani melewati bentuk fuzzy dulu, sedangkan Sugeno
            langsung menuju angka akhir.
        </Callout>

        <Callout type="tip" title="Asal angka 50 dan 80">
            Angka 50 dan 80 adalah nilai contoh yang kita tetapkan sebagai output
            aturan Sugeno. Dalam praktik, nilai itu biasanya berasal dari desain
            sistem, aturan pakar, atau fungsi konsekuen yang sudah ditentukan sejak
            awal. Jadi bukan angka acak yang muncul di tengah perhitungan.
        </Callout>
    </NoteSection>

    <NoteSection title="Kenapa Ada Rumus Titik Berat?">
        <p>
            Rumus titik berat muncul pada <strong>Mamdani</strong> karena output
            akhirnya masih berbentuk <em>daerah fuzzy</em>. Daerah ini belum bisa
            langsung dipakai sebagai satu angka, jadi kita perlu mencari satu nilai
            yang paling mewakili seluruh bentuk kurva itu.
        </p>
        <p>
            Nilai yang mewakili bentuk kurva biasanya diambil dari
            <strong>centroid</strong> atau <strong>center of gravity</strong>.
            Intuisi sederhananya: bayangkan bentuk fuzzy seperti papan karton.
            Titik beratnya adalah titik di mana papan itu bisa seimbang.
        </p>
        <p>
            Kalau perhitungannya dibuat <em>eksak</em>, kita pakai integral area.
            Tetapi untuk contoh pembelajaran di sini, kita pakai pendekatan manual
            yang lebih mudah dibaca, yaitu memakai nilai representatif dari tiap
            output lalu dihitung rata-ratanya secara berbobot.
        </p>
        <MathBlock latex={String.raw`z^* = \frac{\int z\,\mu(z)\,dz}{\int \mu(z)\,dz}`} />
        <p>
            Ini adalah rumus <strong>centroid</strong> atau titik berat. Pembilang
            menghitung momen area, sedangkan penyebut menghitung total luas area.
            Hasil akhirnya adalah posisi titik seimbang dari kurva output fuzzy.
        </p>
        <MathBlock latex={String.raw`z^* \approx \frac{\sum (\alpha_i \times z_i)}{\sum \alpha_i}`} />
        <p>
            Kalau dibuat manual untuk contoh sederhana, rumus di atas dipakai sebagai
            pendekatan diskrit. Artinya, tiap output dianggap punya nilai representatif
            <em>z_i</em> dan bobot kekuatan aturan <em>α_i</em>.
        </p>
        <Callout type="tip">
            Jadi, rumus titik berat itu bukan rumus tambahan yang muncul tiba-tiba.
            Itu adalah cara standar untuk mengubah output fuzzy Mamdani menjadi satu
            angka akhir.
        </Callout>
    </NoteSection>

    <NoteSection title="Rincian Step by Step">
        <p>
            Di bawah ini alurnya saya pecah per tahap supaya kelihatan jelas
            apa yang dihitung di tiap metode.
        </p>

        <div class="detail-grid">
            <div class="detail-card">
                <h3>1. Fuzzification</h3>
                <p>
                    Kita mulai dari input tegas <strong>30°C</strong>. Dari fungsi
                    keanggotaan yang sudah ditentukan sebelumnya, kita dapat:
                </p>
                <MathBlock latex={String.raw`\mu_{hangat}(30)=0.6`} />
                <MathBlock latex={String.raw`\mu_{panas}(30)=0.2`} />
                <p>
                    Artinya suhu 30°C dinilai 60% hangat dan 20% panas.
                    Ini adalah hasil membaca grafik membership function, bukan hasil
                    tebakan.
                </p>
            </div>

            <div class="detail-card">
                <h3>2. Rule evaluation</h3>
                <p>Dua aturan dipakai:</p>
                <ul>
                    <li>IF suhu hangat THEN kipas sedang.</li>
                    <li>IF suhu panas THEN kipas cepat.</li>
                </ul>
                <p>
                    Kekuatan aturan biasanya diambil dengan operator <em>min</em>.
                    Maksudnya, kekuatan aturan mengikuti nilai yang paling kecil dari
                    kondisi yang terlibat.
                </p>
                <MathBlock latex={String.raw`\alpha_1 = \mu_{hangat}(30) = 0.6`} />
                <MathBlock latex={String.raw`\alpha_2 = \mu_{panas}(30) = 0.2`} />
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-card">
                <h3>3A. Mamdani - implication</h3>
                <p>
                    Pada Mamdani, output fuzzy dipotong sesuai kekuatan aturan.
                    Misalnya:
                </p>
                <MathBlock latex={String.raw`\text{sedang dipotong di }0.6`} />
                <MathBlock latex={String.raw`\text{cepat dipotong di }0.2`} />
                <p>
                    Jadi hasil aturan pertama adalah kurva "sedang" yang tinggi
                    maksimumnya 0.6, dan aturan kedua adalah kurva "cepat" yang
                    tinggi maksimumnya 0.2. Ini disebut <em>clipping</em> (metode <strong>Min</strong>).
                </p>
                <Callout type="info" title="Implication method: Min vs Product (Larsen)">
                    <p><strong>Min (Mamdani)</strong> — output fuzzy di-<em>clip</em>,
                    dipotong mendatar pada nilai firing strength. Puncak kurva menjadi
                    datar. Ini metode default dan paling umum.</p>
                    <p><strong>Product (Larsen)</strong> — output fuzzy di-<em>scale</em>,
                    seluruh kurva dikecilkan proporsional. Bentuk tetap terjaga, hanya
                    tinggi maksimumnya yang berkurang.</p>
                    <p>Pilihan ini memengaruhi bentuk area agregasi dan hasil akhir
                    defuzzification meski firing strength-nya sama.</p>
                </Callout>
            </div>

            <div class="detail-card">
                <h3>3B. Sugeno - rule output</h3>
                <p>
                    Pada Sugeno, output aturan tidak berupa kurva fuzzy, tetapi
                    angka langsung. Misalnya kita tentukan:
                </p>
                <MathBlock latex={String.raw`z_1 = 50`} />
                <MathBlock latex={String.raw`z_2 = 80`} />
                <p>
                    Angka 50 mewakili kipas sedang, sedangkan 80 mewakili kipas cepat.
                </p>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-card">
                <h3>4A. Mamdani - aggregation</h3>
                <p>
                    Setelah dipotong, kedua output fuzzy digabung dengan operator
                    <em>max</em>. Secara sederhana, kita ambil area yang paling tinggi
                    di tiap titik.
                </p>
                <MathBlock latex={String.raw`\mu_{gabung}(x) = \max(\mu_{sedang}(x),\mu_{cepat}(x))`} />
                <p>
                    Jadi belum ada satu angka akhir di tahap ini. Hasilnya masih
                    berupa bentuk fuzzy gabungan.
                </p>
            </div>

            <div class="detail-card">
                <h3>4B. Sugeno - weighted average</h3>
                <p>
                    Karena output sudah tegas, hasil akhir dihitung dengan rata-rata
                    berbobot:
                </p>
                <MathBlock latex={String.raw`z = \frac{(0.6 \times 50) + (0.2 \times 80)}{0.6 + 0.2}`} />
                <MathBlock latex={String.raw`z = \frac{30 + 16}{0.8} = 57.5`} />
                <p>
                    Di sini kita mengalikan bobot aturan dengan nilai outputnya,
                    lalu dibagi total bobot. Jadi hasil akhirnya 57.5.
                </p>
            </div>
        </div>

        <div class="detail-grid single">
            <div class="detail-card">
                <h3>5. Defuzzification pada Mamdani</h3>
                <p>
                    Karena output Mamdani masih fuzzy, kita perlu defuzzification.
                    Pada contoh sederhana ini, kita pakai pendekatan titik representatif
                    agar mudah dihitung manual. Kalau ingin versi eksak, biasanya
                    dipakai integral centroid pada seluruh area output fuzzy:
                </p>
                <MathBlock latex={String.raw`\text{sedang} = 50,\quad \text{cepat} = 80`} />
                <MathBlock latex={String.raw`z^* \approx \frac{(0.6 \times 50) + (0.2 \times 80)}{0.6 + 0.2}`} />
                <MathBlock latex={String.raw`z^* \approx \frac{46}{0.8} = 57.5`} />
                <p>
                    Jadi hasil akhir Mamdani pada contoh ini juga sekitar 57.5.
                    Bedanya, angka itu didapat setelah melewati bentuk fuzzy dulu.
                </p>
            </div>
        </div>

        <Callout type="tip">
            Ringkasnya: Mamdani = fuzzify → rule evaluation → fuzzy output →
            defuzzification. Sugeno = fuzzify → rule evaluation → angka langsung.
        </Callout>
    </NoteSection>

    <NoteSection title="Kapan Dipakai?">
        <p>
            Pilih <strong>Mamdani</strong> kalau kamu ingin sistem yang mudah
            dijelaskan, divisualisasikan, dan cocok untuk pembelajaran konsep.
        </p>
        <p>
            Pilih <strong>Sugeno</strong> kalau kamu butuh perhitungan yang lebih
            cepat, implementasi yang lebih efisien, atau integrasi ke sistem
            kontrol yang real-time.
        </p>
        <Callout type="warning">
            Tidak ada yang selalu paling baik. Pilihan terbaik tergantung tujuan:
            apakah kamu ingin sistem yang intuitif untuk dipahami, atau sistem yang
            ringkas dan cepat dihitung.
        </Callout>
    </NoteSection>

    <BackLink href="/semester-1/kecerdasan-buatan-lanjut" label="Kembali ke Kecerdasan Buatan Lanjut" />
</article>

<style>
    .compare-article {
        --card-bg: color-mix(in srgb, var(--color-surface-elevated) 82%, #ffffff 18%);
        --card-border: color-mix(in srgb, var(--color-line) 68%, #7dd3fc 32%);
    }

    .step-grid,
    .flow-grid,
    .example-grid {
        display: grid;
        gap: 1rem;
    }

    .detail-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 1rem 0;
    }

    .detail-grid.single {
        grid-template-columns: 1fr;
    }

    .step-grid,
    .example-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .flow-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 1rem 0;
    }

    .step-card,
    .flow-card,
    .example-card,
    .detail-card,
    .comparison-table {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 16px;
        box-shadow: 0 10px 24px rgba(38, 50, 56, 0.05);
    }

    .step-card,
    .example-card,
    .detail-card,
    .flow-card {
        padding: 1rem 1.1rem;
    }

    .step-card h3,
    .example-card h3,
    .detail-card h3,
    .flow-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
    }

    .flow-svg {
        width: 100%;
        min-width: 320px;
        display: block;
        margin-bottom: 0.5rem;
    }

    .flow-box {
        fill: var(--color-surface-elevated);
        stroke: var(--color-line-dark);
        stroke-width: 2;
    }

    .flow-box.accent {
        fill: color-mix(in srgb, var(--color-highlight) 52%, #ffffff 48%);
    }

    .flow-line {
        stroke: var(--color-line-dark);
        stroke-width: 2;
    }

    .flow-label {
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 700;
        fill: var(--color-ink-strong);
        text-anchor: middle;
    }

    .comparison-table {
        display: grid;
        overflow-x: auto;
        margin: 1rem 0;
    }

    .table-head,
    .table-row {
        display: grid;
        grid-template-columns: 160px repeat(2, minmax(0, 1fr));
        gap: 0;
    }

    .table-head > div,
    .table-row > div {
        padding: 0.9rem 1rem;
        border-bottom: 1px solid var(--color-line);
        border-right: 1px solid var(--color-line);
    }

    .table-head > div:last-child,
    .table-row > div:last-child {
        border-right: 0;
    }

    .table-head {
        background: color-mix(in srgb, var(--color-surface-soft) 70%, #ffffff 30%);
        font-weight: 700;
    }

    .aspect-cell {
        font-weight: 700;
    }

    @media (max-width: 900px) {
        .step-grid,
        .flow-grid,
        .example-grid,
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
</style>