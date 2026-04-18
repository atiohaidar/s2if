<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ID3TreeVisualizer from "./components/ID3TreeVisualizer.svelte";

    const entropyFormula = String.raw`Entropy(S)=-\sum_{i=1}^{c}p_i\log_2(p_i)`;
    const gainFormula = String.raw`Gain(S,A)=Entropy(S)-\sum_{v\in Values(A)}\frac{|S_v|}{|S|}Entropy(S_v)`;

    const id3PseudoCode = `function ID3(data, fitur, target):
    if semua label target sama:
        return Leaf(label)

    if fitur habis:
        return Leaf(label_mayoritas)

    pilih fitur_terbaik dengan information gain terbesar
    buat node untuk fitur_terbaik

    untuk setiap nilai v dari fitur_terbaik:
        subset = data dengan fitur_terbaik = v
        if subset kosong:
            tambahkan Leaf(label_mayoritas_parent)
        else:
            tambahkan cabang ID3(subset, fitur - fitur_terbaik, target)

    return node`;
</script>

<svelte:head>
    <title>Decision Tree ID3 - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi Decision Tree dengan metode ID3: konsep entropy, information gain, dan contoh pembentukan tree dari data penerimaan pegawai."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Decision Tree dengan Metode ID3"
        date="18 April 2026"
        status="done"
        tags={["Decision Tree", "ID3", "Entropy", "Information Gain"]}
    />

    <NoteSection title="Konsep Dasar Decision Tree">
        <p>
            <strong>Decision Tree</strong> adalah model klasifikasi berbentuk pohon.
            Setiap <em>node internal</em> berisi pertanyaan terhadap fitur,
            setiap <em>cabang</em> berisi nilai fitur, dan <em>leaf</em>
            berisi keputusan akhir (kelas).
        </p>
        <p>
            Ide intinya sederhana: pilih fitur yang paling baik memisahkan data,
            lalu ulangi prosesnya secara rekursif sampai data di tiap leaf cukup murni.
        </p>
        <Callout type="info" title="Fokus ID3">
            Pada ID3, kriteria fitur terbaik ditentukan oleh
            <strong>information gain</strong>, yang dihitung dari nilai entropy.
        </Callout>
    </NoteSection>

    <NoteSection title="Dataset: Penerimaan Pegawai">
        <p>Target klasifikasi: <strong>Diterima</strong> (Ya/Tidak).</p>

        <div class="table-wrap" role="region" aria-label="Data penerimaan pegawai">
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
                    <tr><td>P1</td><td>Bagus</td><td>Tinggi</td><td>Baik</td><td>Ya</td></tr>
                    <tr><td>P2</td><td>Bagus</td><td>Sedang</td><td>Baik</td><td>Ya</td></tr>
                    <tr><td>P3</td><td>Bagus</td><td>Sedang</td><td>Buruk</td><td>Ya</td></tr>
                    <tr class="negative"><td>P4</td><td>Bagus</td><td>Rendah</td><td>Buruk</td><td>Tidak</td></tr>
                    <tr><td>P5</td><td>Cukup</td><td>Tinggi</td><td>Baik</td><td>Ya</td></tr>
                    <tr><td>P6</td><td>Cukup</td><td>Sedang</td><td>Baik</td><td>Ya</td></tr>
                    <tr><td>P7</td><td>Cukup</td><td>Sedang</td><td>Buruk</td><td>Ya</td></tr>
                    <tr class="negative"><td>P8</td><td>Cukup</td><td>Rendah</td><td>Buruk</td><td>Tidak</td></tr>
                    <tr><td>P9</td><td>Kurang</td><td>Tinggi</td><td>Baik</td><td>Ya</td></tr>
                    <tr class="negative"><td>P10</td><td>Kurang</td><td>Sedang</td><td>Buruk</td><td>Tidak</td></tr>
                    <tr><td>P11</td><td>Kurang</td><td>Rendah</td><td>Baik</td><td>Ya</td></tr>
                </tbody>
            </table>
        </div>

        <p>
            Ringkasan label: total 11 data, dengan 8 data <strong>Ya</strong> dan 3 data
            <strong>Tidak</strong>.
        </p>
    </NoteSection>

    <NoteSection title="Apa Itu Entropy?">
        <p>
            Entropy mengukur ketidakmurnian data. Semakin campur antara Ya dan Tidak,
            entropy semakin besar. Jika satu kelas dominan penuh, entropy mendekati 0.
        </p>

        <MathBlock latex={entropyFormula} />

        <p>Entropy awal dataset S:</p>
        <MathBlock latex={String.raw`Entropy(S)=-(\frac{8}{11}\log_2\frac{8}{11})-(\frac{3}{11}\log_2\frac{3}{11})\approx0.845`} />

        <Callout type="tip" title="Intuisi cepat">
            Entropy bisa dibayangkan sebagai tingkat "kebingungan" model.
            Kebingungan tinggi artinya pemisahan kelas belum jelas.
        </Callout>
    </NoteSection>

    <NoteSection title="Apa Itu Information Gain?">
        <p>
            Information gain mengukur seberapa besar entropy turun setelah data
            dipecah berdasarkan satu fitur.
        </p>

        <MathBlock latex={gainFormula} />

        <p>
            Semakin besar gain, semakin bagus fitur itu dipakai sebagai node saat ini.
        </p>
    </NoteSection>

    <NoteSection title="Perhitungan Gain Akar (Root)">
        <p>Hitung gain untuk tiap kandidat fitur: IPK, Psikologi, dan Wawancara.</p>

        <Callout type="tip" title="Contoh hitung detail satu fitur (Wawancara)">
            Supaya tidak terasa black-box, berikut breakdown satu kandidat fitur.
            <MathBlock latex={String.raw`Entropy(S|Wawancara)=\frac{6}{11}\cdot Entropy(Baik)+\frac{5}{11}\cdot Entropy(Buruk)`} />
            <MathBlock latex={String.raw`Entropy(Baik)=0\quad(6\ Ya,\ 0\ Tidak)`} />
            <MathBlock latex={String.raw`Entropy(Buruk)=-(\frac{2}{5}\log_2\frac{2}{5})-(\frac{3}{5}\log_2\frac{3}{5})\approx0.971`} />
            <MathBlock latex={String.raw`Entropy(S|Wawancara)=\frac{6}{11}\cdot0+\frac{5}{11}\cdot0.971\approx0.441`} />
            <MathBlock latex={String.raw`Gain(S,Wawancara)=0.845-0.441=0.404`} />
        </Callout>

        <div class="table-wrap" role="region" aria-label="Perhitungan gain root">
            <table>
                <thead>
                    <tr>
                        <th>Fitur</th>
                        <th>Entropy Setelah Split (Rata-rata Tertimbang)</th>
                        <th>Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IPK</td>
                        <td>0.840</td>
                        <td>0.845 - 0.840 = 0.005</td>
                    </tr>
                    <tr>
                        <td>Psikologi</td>
                        <td>0.578</td>
                        <td>0.845 - 0.578 = 0.267</td>
                    </tr>
                    <tr class="best">
                        <td>Wawancara</td>
                        <td>0.441</td>
                        <td>0.845 - 0.441 = 0.404 (terbesar)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="info" title="Keputusan root">
            Karena gain terbesar ada di <strong>Wawancara</strong>, maka akar tree adalah
            pertanyaan "Wawancara?".
        </Callout>

        <ul>
            <li>Cabang Wawancara = Baik: seluruh data berlabel Ya (pure leaf).</li>
            <li>Cabang Wawancara = Buruk: masih campur, jadi perlu split lanjutan.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Split Rekursif pada Cabang Buruk">
        <p>
            Subset Buruk berisi 5 data (2 Ya, 3 Tidak), entropy subset = 0.971.
            Kandidat fitur tersisa: IPK dan Psikologi.
        </p>

        <div class="table-wrap" role="region" aria-label="Perhitungan gain subset wawancara buruk">
            <table>
                <thead>
                    <tr>
                        <th>Fitur pada subset Buruk</th>
                        <th>Entropy Setelah Split</th>
                        <th>Gain terhadap subset Buruk</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IPK</td>
                        <td>0.800</td>
                        <td>0.971 - 0.800 = 0.171</td>
                    </tr>
                    <tr class="best">
                        <td>Psikologi</td>
                        <td>0.551</td>
                        <td>0.971 - 0.551 = 0.420 (terbesar)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            Maka node berikutnya adalah <strong>Psikologi</strong> pada cabang Buruk.
        </p>
        <ul>
            <li>Buruk + Rendah: semua Tidak (leaf).</li>
            <li>
                Buruk + Sedang: masih campur, lalu dipecah lagi oleh IPK dan menjadi pure.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Visualisasi Decision Tree Hasil ID3">
        <ID3TreeVisualizer />
    </NoteSection>

    <NoteSection title="Aturan Keputusan yang Dihasilkan">
        <ol>
            <li>Jika Wawancara = Baik, maka Diterima = Ya.</li>
            <li>Jika Wawancara = Buruk dan Psikologi = Rendah, maka Diterima = Tidak.</li>
            <li>
                Jika Wawancara = Buruk dan Psikologi = Sedang:
                jika IPK = Kurang maka Tidak, selain itu Ya.
            </li>
        </ol>

        <Callout type="warning" title="Catatan penting ID3">
            ID3 cenderung memilih fitur dengan gain tinggi pada data latih.
            Agar tidak overfitting, biasanya tree dipadukan dengan pruning
            atau validasi pada data terpisah.
        </Callout>
    </NoteSection>

    <NoteSection title="Pseudo-code ID3 (Ringkas)">
        <CodeBlock language="text" code={id3PseudoCode} />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .table-wrap {
        overflow-x: auto;
        margin: 0.75rem 0 1rem;
        border: 1px solid var(--color-line);
        border-radius: 10px;
        background: var(--color-surface-elevated);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 640px;
    }

    th,
    td {
        border: 1px solid var(--color-line);
        padding: 0.55rem 0.65rem;
        text-align: left;
        font-size: 0.95rem;
        white-space: nowrap;
    }

    th {
        background: var(--color-surface-soft);
        color: var(--color-ink-strong);
        font-weight: 700;
    }

    .negative {
        background: color-mix(in srgb, var(--color-status-info-soft) 65%, white 35%);
    }

    .best {
        background: color-mix(in srgb, var(--color-status-success-soft) 72%, white 28%);
        font-weight: 600;
    }

    @media (max-width: 768px) {
        th,
        td {
            font-size: 0.88rem;
            padding: 0.45rem 0.5rem;
        }
    }
</style>
