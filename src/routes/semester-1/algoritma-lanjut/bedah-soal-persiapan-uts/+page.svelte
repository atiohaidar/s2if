<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
</script>

<svelte:head>
    <title>Bedah Soal: Persiapan UTS - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Persiapan UTS (Live)"
        date="Malam ini"
        status="wip"
        tags={["UTS", "Latihan", "Live"]}
    />

    <NoteSection title="💡 Tips Strategis & Kamus Trigger">
        <p>Jangan menghafal kode! Hafalkan <strong>Pola Masalah</strong>. Gunakan tabel di bawah untuk menentukan algoritma apa yang harus dipakai saat membaca soal UTS.</p>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Jika kamu melihat kata kunci...</th>
                        <th>Gunakan Algoritma...</th>
                        <th>Alasannya?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>"Query rentang [L, R]" + "Data sering diupdate"</td>
                        <td><strong>Segment Tree</strong></td>
                        <td>Bisa Update dan Query dalam <MathBlock latex="O(\log N)" displayMode={false} />.</td>
                    </tr>
                    <tr>
                        <td>"Cari kapasitas/nilai MINIMUM agar syarat X terpenuhi"</td>
                        <td><strong>Binary Search on Answer</strong></td>
                        <td>Jika jawaban bersifat monoton (makin besar makin mungkin), BS sangat cepat.</td>
                    </tr>
                    <tr>
                        <td>"Cari elemen ke-k / median" + "Data dinamis"</td>
                        <td><strong>Augmented BST (Size)</strong></td>
                        <td>Informasi <code>size</code> membuat kita tahu posisi tanpa harus mensortir ulang.</td>
                    </tr>
                    <tr>
                        <td>"Cek konektivitas / apakah terhubung?"</td>
                        <td><strong>DSU</strong></td>
                        <td>Operasi <code>find</code> dan <code>union</code> hampir instan (<MathBlock latex="O(\alpha(N))" displayMode={false} />).</td>
                    </tr>
                    <tr>
                        <td>"Hitung frekuensi" + "Nilai data kecil"</td>
                        <td><strong>Frequency Array</strong></td>
                        <td>Langsung akses indeks dalam <MathBlock latex="O(1)" displayMode={false} />.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning" title="Aturan Batasan N (Constraints)">
            <ul>
                <li><strong>N &le; 20:</strong> Bisa pakai Brute Force / Exponential.</li>
                <li><strong>N &le; 1000:</strong> Masih aman pakai <MathBlock latex="O(N^2)" displayMode={false} />.</li>
                <li><strong>N &le; 10^5:</strong> Wajib <MathBlock latex="O(N \log N)" displayMode={false} /> atau <MathBlock latex="O(N)" displayMode={false} />.</li>
                <li><strong>N &le; 10^18:</strong> Wajib <MathBlock latex="O(\log N)" displayMode={false} />.</li>
            </ul>
        </Callout>
    </NoteSection>

    <NoteSection title="Pusat Latihan UTS">
        <p>
            Halaman ini difokuskan pada materi-materi kunci yang sering muncul di UTS Algoritma Lanjut. 
            Fokus pada pemahaman logika (pseudocode) dan cara berpikir kritis untuk setiap tipe soal.
        </p>
    </NoteSection>

    <!-- SOAL 1: SEGMENT TREE UPDATE & SUM -->
    <NoteSection title="Soal 1: Segment Tree (Update & Sum)">
        <Callout type="info" title="Problem Statement">
            <p>Diberikan array <code>[1, 3, 5, 7]</code>. Jelaskan langkah melakukan <code>update(index=1, value=10)</code> dan hitung <code>sum(0, 2)</code> pada Segment Tree.</p>
        </Callout>

        <div class="thinking-process">
            <h3>🧠 Pola Pikir</h3>
            <p>
                <strong>Update:</strong> Dari daun ke akar (Bottom-Up). 
                <br><strong>Sum:</strong> Pecah rentang query jadi bagian-bagian node (Top-Down).
            </p>
        </div>

        <CodeBlock language="algorithm" filename="Pseudocode Segment Tree" code={`// Operasi Update
procedure update(node, L, R, idx, val):
    if L = R then
        Tree[node] := val
    else
        mid := (L + R) / 2
        if idx <= mid then
            update(2*node, L, mid, idx, val)
        else
            update(2*node+1, mid+1, R, idx, val)
        Tree[node] := Tree[2*node] + Tree[2*node+1]

// Operasi Query Sum
function querySum(node, L, R, qL, qR):
    if qR < L or R < qL then return 0
    if qL <= L and R <= qR then return Tree[node]
    
    mid := (L + R) / 2
    return querySum(2*node, L, mid, qL, qR) + querySum(2*node+1, mid+1, R, qL, qR)`} />

        <div style="background: var(--color-surface-soft); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <h4>Langkah Visual:</h4>
            <ul>
                <li><strong>Update(1, 10):</strong> Daun indeks 1 jadi 10. Bapaknya (Node [0-1]) jadi <code>1+10=11</code>. Root jadi <code>11+(5+7)=23</code>.</li>
                <li><strong>Sum(0, 2):</strong> Ambil Node [0-1] (nilai 11) + Node [2-2] (nilai 5). Hasil = <strong>16</strong>.</li>
            </ul>
        </div>
    </NoteSection>

    <!-- SOAL 2: LCM DALAM AUGMENTED BST -->
    <NoteSection title="Soal 2: Augmented BST (Subtree LCM)">
        <Callout type="info" title="Problem Statement">
            <p>Bagaimana cara mencari LCM (KPK) dari seluruh elemen dalam sebuah <strong>Binary Search Tree</strong> secara efisien?</p>
        </Callout>

        <div class="thinking-process">
            <h3>🧠 Pola Pikir</h3>
            <p>
                Gunakan <strong>Node Augmentation</strong>. Setiap simpul menyimpan LCM dari seluruh subtree-nya agar query menjadi O(1).
            </p>
        </div>

        <CodeBlock language="algorithm" filename="Pseudocode Augmented BST" code={`type Simpul struct:
    kunci, size, height : integer
    lcm_subtree : integer
    kiri, kanan, induk : Simpul

procedure updateLCM(p):
    valKiri := if p.kiri != nil then p.kiri.lcm_subtree else 1
    valKanan := if p.kanan != nil then p.kanan.lcm_subtree else 1
    p.lcm_subtree := LCM(p.kunci, valKiri, valKanan)`} />

        <p style="margin-top: 1rem;">
            <strong>Kapan di-update?</strong> Saat melakukan <code>insert</code>, <code>delete</code>, atau <code>rotasi</code> (seperti di AVL Tree).
        </p>
    </NoteSection>

    <!-- SOAL 3: MENCARI PUNCAK (BITONIC) -->
    <NoteSection title="Soal 3: Mencari Titik Puncak (O log N)">
        <Callout type="info" title="Problem Statement">
            <p>Cari nilai puncak dalam array "gunung" (naik lalu turun) dalam waktu <strong>O(log N)</strong>.</p>
        </Callout>

        <div class="thinking-process">
            <h3>🧠 Pola Pikir</h3>
            <p>
                Gunakan Binary Search bukan untuk mencari nilai, tapi mencari <strong>lereng</strong>. Jika <code>A[mid] &lt; A[mid+1]</code>, kita sedang mendaki, puncak ada di kanan.
            </p>
        </div>

        <CodeBlock language="algorithm" filename="Pseudocode Peak Finding" code={`function findPeak(A, n):
    low := 0
    high := n - 1
    while low < high do
        mid := (low + high) / 2
        if A[mid] < A[mid+1] then
            low := mid + 1
        else
            high := mid
    return A[low]`} />
    </NoteSection>

    <!-- SOAL 4: MATEMATIKA KOMPLEKSITAS -->
    <NoteSection title="Soal 4: Perbandingan Efisiensi Nyata">
        <Callout type="info" title="Problem Statement">
            <p>
                Algoritma A (N²) butuh 1 detik untuk N=1000. 
                Algoritma B (N log N) butuh 500 detik untuk N=1000. 
                Di N berapakah B mulai lebih efisien dari A?
            </p>
        </Callout>

        <div class="thinking-process">
            <h3>🧠 Pola Pikir</h3>
            <p>Cari konstanta <code>c</code> masing-masing: <MathBlock latex="T(N) = c \cdot f(N)" displayMode={false} />.</p>
        </div>

        <div style="font-family: monospace; background: #222; color: #fff; padding: 1rem; border-radius: 8px;">
            1. Hitung cA: cA * 1000^2 = 1 => cA = 10^-6<br>
            2. Hitung cB: cB * (1000 * 10) = 500 => cB = 0.05<br>
            3. Bandingkan: 0.05 * N * log(N) &lt; 10^-6 * N^2<br>
            4. Sederhanakan: 50.000 * log(N) &lt; N<br>
            5. Cek N=10^6: 50.000 * 20 = 1.000.000. (Titik temu)<br><br>
            Kesimpulan: B lebih efisien jika N &gt; 1.000.000.
        </div>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali ke Algoritma Lanjut" />
</article>

<style>
    .note-article {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }
    .thinking-process {
        background: var(--color-surface-soft);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid var(--color-primary);
    }
    .thinking-process h3 {
        margin-top: 0;
        font-size: 1.1rem;
        color: var(--color-primary);
    }
</style>
