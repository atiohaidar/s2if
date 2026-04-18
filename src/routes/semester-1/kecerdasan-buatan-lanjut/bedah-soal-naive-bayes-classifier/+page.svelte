<script lang="ts">
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NaiveBayesVisualizer from "./components/NaiveBayesVisualizer.svelte";

    const priorFormula = String.raw`P(C)=\frac{\text{jumlah data pada kelas }C}{\text{total data}}`;
    const posteriorFormula = String.raw`P(C|X) \propto P(C)\prod_{i=1}^{n}P(x_i|C)`;

    const dataset = [
        ['G1', 'Bagus', 'Tinggi', 'Sangat Baik', 'Ya'],
        ['G2', 'Bagus', 'Tinggi', 'Sangat Buruk', 'Ya'],
        ['G3', 'Bagus', 'Sedang', 'Buruk', 'Ya'],
        ['G4', 'Bagus', 'Rendah', 'Buruk', 'Tidak'],
        ['G5', 'Cukup', 'Tinggi', 'Sangat Baik', 'Ya'],
        ['G6', 'Cukup', 'Sedang', 'Buruk', 'Ya'],
        ['G7', 'Cukup', 'Sedang', 'Sangat Buruk', 'Ya'],
        ['G8', 'Cukup', 'Rendah', 'Baik', 'Ya'],
        ['G9', 'Cukup', 'Rendah', 'Buruk', 'Tidak'],
        ['G10', 'Kurang', 'Tinggi', 'Sangat Baik', 'Ya'],
        ['G11', 'Kurang', 'Tinggi', 'Sangat Buruk', 'Tidak'],
        ['G12', 'Kurang', 'Sedang', 'Sangat Baik', 'Tidak'],
        ['G13', 'Kurang', 'Sedang', 'Baik', 'Tidak'],
        ['G14', 'Kurang', 'Rendah', 'Sangat Buruk', 'Tidak'],
    ];

    const scoreTrace = `Data uji X = (IPK=Bagus, Psikologi=Rendah, Wawancara=Sangat Baik)

Kelas Ya:
P(Ya) = 8/14
P(IPK=Bagus | Ya) = 3/8
P(Psikologi=Rendah | Ya) = 1/8
P(Wawancara=Sangat Baik | Ya) = 3/8

Skor Ya = (8/14) × (3/8) × (1/8) × (3/8)
        = 9/896
        ≈ 0.01004

Kelas Tidak:
P(Tidak) = 6/14
P(IPK=Bagus | Tidak) = 1/6
P(Psikologi=Rendah | Tidak) = 3/6
P(Wawancara=Sangat Baik | Tidak) = 1/6

Skor Tidak = (6/14) × (1/6) × (3/6) × (1/6)
           = 1/168
           ≈ 0.00595

Normalisasi:
P(Ya | X) = 27/43 ≈ 62.8%
P(Tidak | X) = 16/43 ≈ 37.2%

Prediksi akhir: Diterima = Ya`;

    const naiveBayesPseudoCode = `function naive_bayes_predict(data_latih, x_baru):
    hitung prior untuk setiap kelas
    untuk setiap kelas C:
        skor[C] = prior(C)
        untuk setiap fitur x_i pada x_baru:
            skor[C] *= P(x_i | C)

    kembalikan kelas dengan skor terbesar`;
</script>

<svelte:head>
    <title>Bedah Soal: Naive Bayes Classifier - S2IF Notebook</title>
    <meta
        name="description"
        content="Bedah soal Naive Bayes Classifier untuk menentukan apakah pelamar diterima atau ditolak berdasarkan IPK, psikologi, dan wawancara."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Naive Bayes Classifier"
        date="18 April 2026"
        status="done"
        tags={['Bedah Soal', 'Naive Bayes', 'Machine Learning', 'Klasifikasi']}
    />

    <NoteSection title="Soal yang Dibedah">
        <p>
            Kita mau menentukan kelas target <strong>Diterima</strong> untuk seorang pelamar.
            Label yang mungkin hanya dua: <strong>Ya</strong> atau <strong>Tidak</strong>.
            Jadi, kalau hasilnya Ya artinya pelamar diterima, dan kalau Tidak artinya pelamar ditolak.
        </p>

        <Callout type="info" title="Data uji yang dicari">
            IPK = <strong>Bagus</strong>, Psikologi = <strong>Rendah</strong>, dan Wawancara = <strong>Sangat Baik</strong>.
        </Callout>

        <div class="table-wrap" role="region" aria-label="Dataset penerimaan pelamar">
            <table>
                <thead>
                    <tr>
                        <th>Pelamar</th>
                        <th>IPK</th>
                        <th>Psikologi</th>
                        <th>Wawancara</th>
                        <th>Diterima</th>
                    </tr>
                </thead>
                <tbody>
                    {#each dataset as row}
                        <tr class:negative={row[4] === 'Tidak'}>
                            {#each row as cell}
                                <td>{cell}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <p>
            Total data latih ada 14. Kelas <strong>Ya</strong> berjumlah 8, dan kelas
            <strong>Tidak</strong> berjumlah 6.
        </p>
    </NoteSection>

    <NoteSection title="Istilah Singkat yang Dipakai">
        <Callout type="tip" title="Kalau ada istilah yang terasa asing">
            <ul>
                <li><strong>Kelas</strong>: label atau jawaban yang mau diprediksi oleh model; di soal ini kelasnya hanya <strong>Ya</strong> dan <strong>Tidak</strong>. Contoh: kelas "Ya" berarti pelamar diterima.</li>
                <li><strong>Fitur</strong>: atribut atau ciri yang dipakai untuk membantu prediksi; di soal ini fiturnya adalah <strong>IPK</strong>, <strong>Psikologi</strong>, dan <strong>Wawancara</strong>. Contoh: IPK = Bagus.</li>
                <li><strong>Data latih</strong>: data contoh yang dipakai model untuk belajar pola. Contoh: baris G1 sampai G14 pada tabel.</li>
                <li><strong>Data uji</strong>: data baru yang belum pernah dilihat model; di soal ini adalah IPK Bagus, Psikologi Rendah, dan Wawancara Sangat Baik. Contoh: satu pelamar baru yang ingin dicek diterima atau tidak.</li>
                <li><strong>Prior</strong>: peluang awal suatu kelas sebelum melihat fitur apa pun. Contoh: <MathBlock displayMode={false} latex={String.raw`P(Ya)=\frac{8}{14}`} />.</li>
                <li><strong>Likelihood</strong>: peluang sebuah fitur muncul jika kelasnya sudah diketahui. Contoh: <MathBlock displayMode={false} latex={String.raw`P(IPK=Bagus\mid Ya)=\frac{3}{8}`} />.</li>
                <li><strong>Posterior</strong>: peluang akhir kelas setelah fitur uji dimasukkan. Contoh: <MathBlock displayMode={false} latex={String.raw`P(Ya\mid X)`} /> setelah semua fitur dihitung.</li>
                <li><strong>Independen bersyarat</strong>: fitur dianggap tidak saling memengaruhi setelah kelasnya diketahui. Contoh: setelah tahu kelasnya Ya, IPK dan Wawancara dihitung seolah tidak saling bergantung.</li>
                <li><strong>Normalisasi</strong>: mengubah skor mentah menjadi probabilitas yang lebih mudah dibaca. Contoh: skor Ya dan Tidak diubah menjadi 62.8% dan 37.2%.</li>
                <li><strong>Laplace smoothing</strong>: trik menambah nilai kecil agar peluang nol tidak membuat skor langsung nol; pada query soal ini kebetulan tidak dibutuhkan karena kombinasi fitur yang dihitung tidak menghasilkan nol. Contoh: kalau suatu nilai fitur belum pernah muncul di kelas tertentu, bisa diberi pengaman agar tidak jadi 0.</li>
            </ul>
        </Callout>
    </NoteSection>

    <NoteSection title="Ide Naive Bayes">
        <p>
            Naive Bayes membandingkan peluang tiap <strong>kelas</strong> dengan cara mengalikan prior
            dan likelihood setiap <strong>fitur</strong>. Asumsinya sederhana: kalau kelasnya sudah diketahui,
            fitur-fitur dianggap <em>independen bersyarat</em>, artinya hubungan antarfitur
            tidak lagi dihitung langsung.
        </p>

        <Callout type="tip" title="Arti simbol yang dipakai">
            <ul>
                <li><strong><MathBlock displayMode={false} latex={String.raw`P(\cdot)`} /></strong>: peluang atau probabilitas. Contoh <MathBlock displayMode={false} latex={String.raw`P(Ya)`} /> artinya peluang kelas Ya, seperti 8 dari 14 data masuk kelas Ya.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`\mid`} /></strong>: dibaca "dengan syarat". Contoh <MathBlock displayMode={false} latex={String.raw`P(x_i\mid C)`} /> artinya peluang fitur <MathBlock displayMode={false} latex={String.raw`x_i`} /> jika kelas <MathBlock displayMode={false} latex={String.raw`C`} /> sudah diketahui, misalnya <MathBlock displayMode={false} latex={String.raw`P(IPK=Bagus\mid Ya)`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`\propto`} /></strong>: dibaca "sebanding dengan". Artinya masih skor awal, belum probabilitas final yang dinormalisasi. Contoh: <MathBlock displayMode={false} latex={String.raw`P(Ya\mid X)\propto\frac{9}{896}`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`\prod`} /></strong>: simbol perkalian banyak nilai. Di sini artinya semua peluang fitur dikalikan. Contoh: <MathBlock displayMode={false} latex={String.raw`\prod P(x_i\mid C)`} /> berarti <MathBlock displayMode={false} latex={String.raw`\frac{3}{8}\times\frac{1}{8}\times\frac{3}{8}`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`X`} /></strong>: data uji lengkap yang mau diprediksi. Contoh: <MathBlock displayMode={false} latex={String.raw`X=(Bagus,\ Rendah,\ Sangat\ Baik)`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`x_i`} /></strong>: fitur ke-i dari data uji. Huruf <MathBlock displayMode={false} latex={String.raw`i`} /> hanya penanda urutan. Contoh: <MathBlock displayMode={false} latex={String.raw`x_1=IPK=Bagus`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`C`} /></strong>: kelas atau label target, misalnya Ya dan Tidak. Contoh: <MathBlock displayMode={false} latex={String.raw`C=Ya`} /> atau <MathBlock displayMode={false} latex={String.raw`C=Tidak`} />.</li>
                <li><strong><MathBlock displayMode={false} latex={String.raw`\approx`} /></strong>: kira-kira sama dengan. Contoh: <MathBlock displayMode={false} latex={String.raw`\frac{9}{896}\approx0.01004`} />.</li>
            </ul>
        </Callout>

        <MathBlock latex={priorFormula} />
        <MathBlock latex={posteriorFormula} />

        <Callout type="tip" title="Alur logika">
            Pertama cari peluang awal kelasnya (<em>prior</em>), lalu hitung peluang fitur
            satu per satu (<em>likelihood</em>), kemudian kalikan semuanya untuk memperoleh
            <em>posterior</em> atau skor akhir. Kelas dengan skor terbesar adalah hasil prediksi.
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 1: Hitung Prior">
        <p>Prior adalah peluang awal masing-masing kelas sebelum fitur uji dimasukkan.</p>

        <div class="prob-table">
            <table>
                <thead>
                    <tr>
                        <th>Kelas</th>
                        <th>Jumlah</th>
                        <th>Prior</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ya</td>
                        <td>8</td>
                        <td>8/14</td>
                    </tr>
                    <tr>
                        <td>Tidak</td>
                        <td>6</td>
                        <td>6/14</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>Jadi:</p>
        <MathBlock latex={String.raw`P(Ya)=\frac{8}{14}`} />
        <MathBlock latex={String.raw`P(Tidak)=\frac{6}{14}`} />
    </NoteSection>

    <NoteSection title="Langkah 2: Hitung Likelihood Tiap Fitur">
        <p>
            Sekarang kita lihat frekuensi tiap nilai fitur di dalam masing-masing kelas.
            Pada data uji ini tidak muncul probabilitas nol, jadi perhitungan bisa langsung.
            Kalau di kasus lain ada kombinasi fitur yang belum pernah muncul pada suatu kelas,
            gunakan Laplace smoothing agar skor kelas tidak langsung jadi nol.
        </p>

        <div class="table-wrap" role="region" aria-label="Likelihood fitur">
            <table>
                <thead>
                    <tr>
                        <th>Fitur uji</th>
                        <th>P(· | Ya)</th>
                        <th>P(· | Tidak)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IPK = Bagus</td>
                        <td>3/8</td>
                        <td>1/6</td>
                    </tr>
                    <tr>
                        <td>Psikologi = Rendah</td>
                        <td>1/8</td>
                        <td>3/6</td>
                    </tr>
                    <tr>
                        <td>Wawancara = Sangat Baik</td>
                        <td>3/8</td>
                        <td>1/6</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning" title="Kenapa angkanya begitu?">
            Contoh: untuk kelas Ya, IPK = Bagus muncul 3 kali dari total 8 data Ya,
            jadi <em>likelihood</em>-nya 3/8. Prinsipnya sama untuk semua fitur lain.
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 3: Kalikan Prior dan Likelihood">
        <p>
            Bagian ini menghitung <strong>skor mentah</strong>, yaitu hasil perkalian sebelum dinormalisasi.
            Skor mentah dipakai untuk membandingkan kelas mana yang paling kuat.
        </p>

        <p>Untuk kelas Ya:</p>
        <MathBlock latex={String.raw`P(Ya|X) \propto \frac{8}{14}\times\frac{3}{8}\times\frac{1}{8}\times\frac{3}{8}`} />
        <MathBlock latex={String.raw`P(Ya|X) \propto \frac{9}{896} \approx 0.01004`} />

        <p>Untuk kelas Tidak:</p>
        <MathBlock latex={String.raw`P(Tidak|X) \propto \frac{6}{14}\times\frac{1}{6}\times\frac{3}{6}\times\frac{1}{6}`} />
        <MathBlock latex={String.raw`P(Tidak|X) \propto \frac{1}{168} \approx 0.00595`} />

        <Callout type="info" title="Perbandingan langsung">
            Skor kelas Ya lebih besar daripada Tidak. Artinya, berdasarkan data latih,
            pelamar lebih kuat masuk kelas diterima.
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 4: Normalisasi Hasil">
        <p>
            Setelah skor mentah diperoleh, kita bisa menormalkan supaya nilainya mudah dibaca sebagai probabilitas.
            Normalisasi di sini artinya membagi skor tiap kelas dengan total skor semua kelas.
        </p>

        <MathBlock latex={String.raw`P(Ya|X)=\frac{27}{43}\approx 62.8\%`} />
        <MathBlock latex={String.raw`P(Tidak|X)=\frac{16}{43}\approx 37.2\%`} />

        <Callout type="info" title="Jawaban akhir">
            Karena probabilitas kelas <strong>Ya</strong> lebih besar, maka prediksinya adalah
            <strong>pelamar diterima</strong>.
        </Callout>
    </NoteSection>

    <NoteSection title="Visualisasi Alur Perhitungan">
        <p>
            Visualisasi di bawah memperlihatkan dua jalur perhitungan yang berjalan paralel:
            satu untuk kelas Ya, satu untuk kelas Tidak. Di setiap langkah, fitur uji masuk satu per satu
            lalu skor dibandingkan di akhir.
        </p>

        <NaiveBayesVisualizer />
    </NoteSection>

    <NoteSection title="Trace Perhitungan Lengkap">
        <CodeBlock language="text" filename="naive_bayes_trace.txt" code={scoreTrace} />
    </NoteSection>

    <NoteSection title="Pseudo-code Singkat">
        <CodeBlock language="text" code={naiveBayesPseudoCode} />
        <p>
            Intinya tetap sama: hitung prior, kalikan likelihood tiap fitur, lalu ambil kelas dengan skor paling besar.
        </p>
    </NoteSection>

    <NoteSection title="Ringkasannya">
        <ol>
            <li>Target klasifikasi adalah apakah pelamar diterima atau ditolak.</li>
            <li>Data uji: IPK Bagus, Psikologi Rendah, Wawancara Sangat Baik.</li>
            <li>Skor kelas Ya = 9/896 dan skor kelas Tidak = 1/168.</li>
            <li>Hasil normalisasi menunjukkan Ya lebih besar.</li>
            <li>Prediksi akhir: <strong>Diterima = Ya</strong>.</li>
        </ol>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .table-wrap,
    .prob-table {
        overflow-x: auto;
        margin: 0.75rem 0 1rem;
        border: 1px solid var(--color-line);
        border-radius: 10px;
        background: var(--color-surface-elevated);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 680px;
    }

    th,
    td {
        padding: 0.65rem 0.75rem;
        border-bottom: 1px solid var(--color-line);
        text-align: left;
    }

    thead th {
        background: var(--color-surface-soft);
    }

    tr.negative {
        background: color-mix(in srgb, var(--color-callout-danger-start) 18%, transparent);
    }

    :global(.note-article code) {
        font-size: 0.95em;
    }
</style>