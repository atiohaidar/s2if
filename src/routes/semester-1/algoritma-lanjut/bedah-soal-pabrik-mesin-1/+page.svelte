<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
</script>

<svelte:head>
    <title>Bedah Soal: Pabrik Mesin - S2IF Notebook</title>
    <meta
        name="description"
        content="Bedah soal waktu produksi minimum dengan n mesin: solusi step-by-step menggunakan binary search pada jawaban."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Pabrik Mesin (Waktu Produksi Minimum)"
        date="09 April 2026"
        status="done"
        tags={["Bedah Soal", "Binary Search"]}
    />

    <NoteSection title="Soal (Utuh, Tanpa Reduksi)">
        <div class="problem-sheet">
            <p>
                Diketahui pabrik mempunyai <code>n</code> mesin dengan kapasitas produk tertentu persatuan waktu.
                Anda harus menghitung waktu tercepat yang dibutuhkan untuk memproduksi <code>t</code> produk.
            </p>

            <p>
                Semua mesin bekerja bersamaan dan dapat sesuai kapasitasnya menghasilkan produk terus menerus.
            </p>

            <div class="problem-block">
                <h4>Input</h4>
                <p>
                    Baris pertama berisi dua bilangan <code>n</code> dan <code>t</code>, jumlah mesin dan target
                    produksi. <code>1≤n≤200000</code> dan <code>1≤t≤1000000000</code>.
                </p>
                <p>
                    Baris kedua berisi <code>n</code> data bilangan bulat;
                    <code>k1,k2,⋯kn</code>. <code>0 &lt; k_i ≤ 1000 000 000</code>
                </p>
            </div>

            <div class="problem-block">
                <h4>Output</h4>
                <p>
                    Sebuah bilangan bulat; waktu tercepat sebanyak <code>t</code> produk berhasil dibuat.
                </p>
            </div>

            <div class="problem-block">
                <h4>For example:</h4>
                <div class="example-table-wrap">
                    <table class="example-table">
                        <thead>
                            <tr>
                                <th>Input</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <pre>3 7
3 2 5</pre>
                                </td>
                                <td><pre>8</pre></td>
                            </tr>
                            <tr>
                                <td>
                                    <pre>10 10
6 6 4 3 4 9 3 2 6 10</pre>
                                </td>
                                <td><pre>6</pre></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Memahami Maksud Soal">
        <p>
            Angka <code>k_i</code> berarti mesin ke-i membutuhkan <strong>k_i satuan waktu
            untuk membuat 1 produk</strong>.
        </p>
        <Callout type="warning" title="Kenapa disimpulkan seperti itu?">
            Frasa <code>kapasitas produk per satuan waktu</code> memang bisa terasa ambigu.
            Di bedah soal ini, interpretasi <code>k_i</code> dipilih sebagai
            <strong>waktu per 1 produk</strong> karena hanya interpretasi ini yang konsisten
            dengan contoh output resmi.
            <br /><br />
            Untuk contoh <code>n=3, t=7, k=[3,2,5]</code>, jawaban resmi adalah <code>8</code>.
            Jika <code>k_i</code> dianggap produk per waktu, maka pada waktu <code>1</code>
            total produk sudah <code>3+2+5=10</code> (harusnya jawaban <code>1</code>),
            ini bertentangan dengan contoh.
            Karena itu, pembacaan yang dipakai adalah
            <code>produk_i(x)=floor(x/k_i)</code>.
        </Callout>
        <p>
            Jika kita pilih waktu <code>x</code>, maka mesin ke-i bisa membuat:
            <code>floor(x / k_i)</code> produk.
        </p>
        <MathBlock latex={"p_i(x)=\\left\\lfloor \\frac{x}{k_i} \\right\\rfloor"} />
        <p>
            Total produk dari semua mesin pada waktu <code>x</code> adalah:
            <code>floor(x/k_1) + floor(x/k_2) + ... + floor(x/k_n)</code>.
        </p>
        <MathBlock latex={"P(x)=\\sum_{i=1}^{n}\\left\\lfloor \\frac{x}{k_i} \\right\\rfloor"} />
        <Callout type="info" title="Target utama">
            Cari nilai <code>x</code> paling kecil sehingga total produk <code>>= t</code>.
        </Callout>
        <MathBlock latex={"x^*=\\min\\{x\\mid P(x)\\ge t\\}"} />
    </NoteSection>

    <NoteSection title="Model Matematika Soal (Dari Cerita ke Rumus)">
        <Callout type="info" title="Apa itu array k? Struktur dan makna">
            Array <code>k = [k₁, k₂, ..., kₙ]</code> adalah kumpulan <code>n</code> bilangan bulat, di mana:
            <ul>
                <li><code>k₁</code> = waktu yang dibutuhkan mesin 1 untuk membuat <strong>1</strong> produk (satuan: waktu)</li>
                <li><code>k₂</code> = waktu yang dibutuhkan mesin 2 untuk membuat <strong>1</strong> produk (satuan: waktu)</li>
                <li><code>...</code></li>
                <li><code>kₙ</code> = waktu yang dibutuhkan mesin n untuk membuat <strong>1</strong> produk (satuan: waktu)</li>
            </ul>
            Jadi setiap elemen array adalah <strong>waktu produksi per unit</strong> untuk mesin yang bersangkutan. Mesin dengan nilai <code>k</code> lebih kecil adalah mesin yang lebih cepat.
        </Callout>
        <p><strong>Kamus variabel + satuan:</strong></p>
        <ul>
            <li><code>x</code>: waktu total yang dicoba <em>(satuan waktu)</em></li>
            <li><code>k</code>: array waktu produksi per unit untuk setiap mesin <em>(array, setiap elemen satuan: waktu/produk)</em></li>
            <li><code>k_i</code>: waktu untuk membuat 1 produk di mesin ke-i <em>(satuan waktu/produk)</em></li>
            <li><code>p_i(x)</code>: jumlah produk dari mesin ke-i dalam waktu <code>x</code> <em>(produk)</em></li>
            <li><code>P(x)</code>: total produk semua mesin <em>(produk)</em></li>
            <li><code>t</code>: target produk <em>(produk)</em></li>
            <li><code>min(k)</code>: nilai terkecil dalam array <code>k</code> (mesin tercepat) <em>(satuan waktu)</em></li>
        </ul>

        <p>
            Anggap <code>x</code> adalah waktu (yang mau kita cari). Mesin ke-i butuh
            <code>k_i</code> waktu untuk membuat 1 produk.
        </p>

        <p>
            Kenapa muncul <code>x/k_i</code>? Karena ini konsep
            <strong>jumlah siklus kerja</strong>:
        </p>
        <ul>
            <li>Satu produk selesai tiap <code>k_i</code> satuan waktu.</li>
            <li>Waktu total yang tersedia adalah <code>x</code>.</li>
            <li>
                Jadi banyak siklus yang sempat dijalankan mesin i adalah
                <code>x/k_i</code>.
            </li>
            <li>
                Karena produk harus bilangan bulat (tidak bisa setengah produk),
                dipakai pembulatan ke bawah: <code>floor(x/k_i)</code>.
            </li>
        </ul>

        <p>
            Maka jumlah produk dari mesin ke-i dalam waktu <code>x</code> adalah:
        </p>
        <MathBlock latex={"p_i(x)=\\left\\lfloor \\frac{x}{k_i} \\right\\rfloor"} />
        <MathBlock
            latex={"\\frac{x}{k_i}=\\frac{\\text{waktu}}{\\frac{\\text{waktu}}{\\text{produk}}}=\\text{produk}"}
        />

        <p>Total produk dari semua mesin:</p>
        <MathBlock
            latex={"P(x)=\\sum_{i=1}^{n} \\left\\lfloor \\frac{x}{k_i} \\right\\rfloor"}
        />
        <MathBlock
            latex={"\\text{unit}(P(x))=\\sum_{i=1}^{n}\\text{produk}=\\text{produk}"}
        />

        <p>Kondisi agar target terpenuhi:</p>
        <MathBlock latex={"P(x) \\ge t"} />
        <MathBlock
            latex={"\\text{unit}(P(x))=\\text{unit}(t)=\\text{produk}"}
        />

        <p>Yang dicari oleh soal adalah waktu minimum:</p>
        <MathBlock latex={"x^*=\\min\\{x \\in \\mathbb{Z}_{\\ge 0} \\mid P(x) \\ge t\\}"} />
        <MathBlock latex={"\\text{unit}(x^*)=\\text{waktu}"} />

        <Callout type="tip" title="Intuisi singkat">
            Kita tidak mencari "berapa produk", tapi mencari <strong>waktu terkecil</strong>
            yang membuat total produk sudah mencapai target.
        </Callout>
    </NoteSection>

    <NoteSection title="Kenapa Binary Search?">
        <p>Definisikan predikat kelayakan:</p>
        <MathBlock
            latex={"\\mathrm{can}(x)=\\begin{cases}\\text{true}, & P(x)\\ge t\\\\\\text{false}, & P(x)<t\\end{cases}"}
        />
        <ul>
            <li>Kalau <code>can(x)</code> benar, maka untuk waktu lebih besar juga pasti benar.</li>
            <li>Kalau <code>can(x)</code> salah, maka waktu lebih kecil juga pasti salah.</li>
        </ul>
        <p>
            Sifat ini monotonic, jadi cocok untuk <strong>binary search pada jawaban</strong>.
        </p>
        <MathBlock latex={"x_1 < x_2 \\Rightarrow P(x_1) \\le P(x_2)"} />
        <MathBlock latex={"\\mathrm{can}(x)=\\text{false},\\ldots,\\text{false},\\text{true},\\ldots,\\text{true}"} />
        <p>
            Karena <code>P(x)</code> tidak pernah turun saat <code>x</code> membesar,
            himpunan waktu yang valid bentuknya seperti ini:
            <code>salah, salah, salah, ..., benar, benar, benar, ...</code>.
            Binary search dipakai untuk menemukan titik pertama yang bernilai benar.
        </p>
    </NoteSection>

    <NoteSection title="Step-by-Step Algoritma">
        <ol>
            <li>Tentukan batas kiri <code>left = 1</code>.</li>
            <li>
                Tentukan batas kanan aman <code>right = min(k) * t</code>.
                <Callout type="info" title="Penjelasan Satuan min(k) × t dan Konsep 'right'">
                    <p><strong>Analisis Satuan:</strong></p>
                    <MathBlock latex={"\\min(k) \\in \\text{[waktu/produk]}"} />
                    <MathBlock latex={"t \\in \\text{[produk]}"} />
                    <MathBlock latex={"\\min(k) \\times t = \\frac{\\text{[waktu]}}{\\text{[produk]}} \\times \\text{[produk]} = \\text{[waktu]} \\checkmark"} />
                    
                    <p style="margin-top: 1rem;"><strong>Konsep 'right' (batas atas):</strong></p>
                    <ul>
                        <li><code>right</code> adalah <strong>batas atas waktu yang pasti cukup</strong> untuk mencapai target produksi <code>t</code>.</li>
                        <li>Alasannya: jika hanya mesin tercepat (dengan <code>min(k)</code>) yang bekerja sendiri, ia membutuhkan 
                            <MathBlock latex={"\\text{waktu} = \\min(k) \\times t"} />
                            untuk menghasilkan <code>t</code> produk.
                        </li>
                        <li>Karena semua <code>n</code> mesin bekerja bersamaan, waktu aktual <strong>pasti lebih cepat atau sama dengan</strong> 
                            <MathBlock latex={"\\min(k) \\times t"} />
                        </li>
                        <li>Jadi, <code>right = min(k) × t</code> adalah batas atas yang aman, dan jawaban pasti ada dalam rentang <code>[left, right]</code>.</li>
                    </ul>
                </Callout>
            </li>
            <li>
                Selama <code>left &lt;= right</code>:
                <ul>
                    <li>Hitung <code>mid = (left + right) // 2</code>.</li>
                    <li>Hitung total produk pada waktu <code>mid</code>.</li>
                    <li>
                        Jika total <code>>= t</code>, simpan kandidat jawaban lalu geser ke kiri
                        (<code>right = mid - 1</code>) untuk mencari waktu yang lebih kecil.
                    </li>
                    <li>
                        Jika total <code>&lt; t</code>, berarti waktu kurang, geser ke kanan
                        (<code>left = mid + 1</code>).
                    </li>
                </ul>
            </li>
            <li>Nilai kandidat terkecil yang tersimpan adalah jawaban akhir.</li>
        </ol>
    </NoteSection>


    <NoteSection title="Contoh 1 (Sampel)">
        <p>Input:</p>
        <CodeBlock language="text" code={`3 7
3 2 5`} />

        <p>
            <strong>Interpretasi:</strong>
        </p>
        <ul>
            <li><code>n = 3</code>: ada 3 mesin</li>
            <li><code>t = 7</code>: target produksi 7 produk</li>
            <li><code>k = [3, 2, 5]</code>: array waktu per produk untuk setiap mesin
                <ul>
                    <li>Mesin 1 butuh 3 satuan waktu per 1 produk</li>
                    <li>Mesin 2 butuh 2 satuan waktu per 1 produk (mesin tercepat)</li>
                    <li>Mesin 3 butuh 5 satuan waktu per 1 produk</li>
                </ul>
            </li>
        </ul>

        <p>
            Coba waktu <code>x = 8</code>:
            <code>floor(8/3)=2</code>, <code>floor(8/2)=4</code>, <code>floor(8/5)=1</code>.
            Total = <code>2 + 4 + 1 = 7</code> (pas target).
        </p>
        <p>
            Coba waktu <code>x = 7</code>:
            <code>floor(7/3)=2</code>, <code>floor(7/2)=3</code>, <code>floor(7/5)=1</code>.
            Total = <code>6</code> (kurang).
        </p>
        <p>
            Jadi waktu minimum adalah <strong>8</strong>.
        </p>

        <Callout type="info" title="Catatan tentang right dalam binary search">
            Pada soal ini, batas atas binary search adalah:
            <MathBlock latex={"\\text{right} = \\min(k) \\times t = 2 \\times 7 = 14 \\text{ [waktu]}"} />
            Nilai ini adalah waktu maksimal yang mungkin diperlukan: jika hanya mesin tercepat (mesin 2 dengan <code>k=2</code>)
            yang bekerja untuk menghasilkan 7 produk, maka dibutuhkan waktu tersebut. Karena semua mesin bekerja bersamaan,
            waktu aktual pasti memenuhi kondisi:
            <MathBlock latex={"\\text{waktu aktual} \\le \\min(k) \\times t = 14"} />
        </Callout>
    </NoteSection>

    <NoteSection title="Implementasi (Python)">
        <CodeBlock
            language="python"
            filename="factory-machines.py"
            code={`def min_time_to_produce(n, t, k):
    left = 1
    right = min(k) * t
    answer = right

    while left <= right:
        mid = (left + right) // 2

        total = 0
        for speed in k:
            total += mid // speed
            if total >= t:
                break

        if total >= t:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1

    return answer


if __name__ == "__main__":
    n, t = map(int, input().split())
    k = list(map(int, input().split()))
    print(min_time_to_produce(n, t, k))`}
        />
    </NoteSection>

    <NoteSection title="Kompleksitas">
        <ul>
            <li>
                Setiap cek <code>can(mid)</code> butuh <code>O(n)</code>.
            </li>
            <li>
                Binary search butuh sekitar <code>O(log(min(k) * t))</code> iterasi.
            </li>
            <li>
                Total: <strong>O(n log(min(k) * t))</strong>.
            </li>
        </ul>

        <Callout type="tip" title="Catatan penting implementasi">
            Pakai integer 64-bit (misalnya <code>long long</code> di C++) karena nilai waktu
            dan hasil penjumlahan bisa sangat besar.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Desain Algoritma Lanjut"
    />
</article>

<style>
    .problem-sheet {
        border: 1px solid var(--color-line);
        border-radius: 10px;
        background: #fff;
        padding: 1rem;
    }

    .problem-sheet p {
        margin: 0 0 0.9rem;
        line-height: 1.7;
    }

    .problem-block {
        margin-top: 1rem;
        padding-top: 0.9rem;
        border-top: 1px dashed var(--color-line);
    }

    .problem-block h4 {
        margin: 0 0 0.55rem;
        color: var(--color-binder);
        font-size: 1rem;
    }

    .example-table-wrap {
        overflow-x: auto;
    }

    .example-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 520px;
    }

    .example-table th,
    .example-table td {
        border: 1px solid var(--color-line);
        vertical-align: top;
        padding: 0.65rem;
        text-align: left;
    }

    .example-table th {
        background: #f9f4ea;
        font-weight: 700;
    }

    .example-table pre {
        margin: 0;
        white-space: pre-wrap;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        line-height: 1.5;
    }


    @media (max-width: 640px) {
        .problem-sheet {
            padding: 0.85rem;
        }
    }
</style>
