<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import MathBlock from '$lib/components/MathBlock.svelte';
</script>

<svelte:head>
  <title>Bedah Soal: Persiapan UTS - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Bedah Soal: Persiapan UTS"
    date="Malam ini"
    status="wip"
    tags={['UTS', 'Latihan', 'Live']}
  />

  <NoteSection title="💡 Tips Strategis & Kamus Trigger">
    <p>
      Jangan menghafal kode! Hafalkan <strong>Pola Masalah</strong>. Gunakan tabel di bawah untuk
      menentukan algoritma apa yang harus dipakai saat membaca soal UTS.
    </p>

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
            <td>Bisa Update dan Query dalam <MathBlock latex="O(\log N)" displayMode={false} />.</td
            >
          </tr>
          <tr>
            <td>"Cari kapasitas/nilai MINIMUM agar syarat X terpenuhi"</td>
            <td><strong>Binary Search on Answer</strong></td>
            <td>Jika jawaban bersifat monoton (makin besar makin mungkin), BS sangat cepat.</td>
          </tr>
          <tr>
            <td>"Cari elemen ke-k / median" + "Data dinamis"</td>
            <td><strong>Augmented BST (Size)</strong></td>
            <td
              >Informasi <code>size</code> membuat kita tahu posisi tanpa harus mensortir ulang.</td
            >
          </tr>
          <tr>
            <td>"Cek konektivitas / apakah terhubung?"</td>
            <td><strong>DSU</strong></td>
            <td
              >Operasi <code>find</code> dan <code>union</code> hampir instan (<MathBlock
                latex="O(\alpha(N))"
                displayMode={false}
              />).</td
            >
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
        <li>
          <strong>N &le; 1000:</strong> Masih aman pakai <MathBlock
            latex="O(N^2)"
            displayMode={false}
          />.
        </li>
        <li>
          <strong>N &le; 10^5:</strong> Wajib <MathBlock latex="O(N \log N)" displayMode={false} /> atau
          <MathBlock latex="O(N)" displayMode={false} />.
        </li>
        <li>
          <strong>N &le; 10^18:</strong> Wajib <MathBlock latex="O(\log N)" displayMode={false} />.
        </li>
      </ul>
    </Callout>

    <div
      style="background: var(--color-surface-soft); padding: 1.5rem; border-radius: 12px; margin-top: 2rem; border: 1px dashed var(--color-primary);"
    >
      <h3
        style="margin-top: 0; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;"
      >
        🧠 Prinsip Utama: Konsep > Hafalan
      </h3>
      <p>
        Di UTS DAL, soal hampir tidak pernah menanyakan algoritma standar secara mentah. Soal
        biasanya berupa <strong>Penerapan</strong> atau <strong>Improvement</strong>. Tipsnya:
      </p>
      <ul>
        <li>
          <strong>Pahami "Why":</strong> Jangan hafal <code>2*node</code>, tapi pahami bahwa itu
          adalah cara "melompat" ke anak dalam array. Jika paham konsep "Lompatan Matematika", kamu
          bisa bangun kodenya dari nol.
        </li>
        <li>
          <strong>Gunakan Skeleton:</strong> Hafalkan kerangka besarnya saja (Recursive Base Case, Split,
          Combine). Isinya (apakah SUM, MIN, atau LCM) tinggal menyesuaikan permintaan soal.
        </li>
        <li>
          <strong>Rekonstruksi dengan Visual:</strong> Jika lupa kodenya, gambar pohonnya di kertas coretan.
          Alur panah yang kamu gambar secara intuitif biasanya adalah alur rekursi yang harus kamu tulis.
        </li>
      </ul>
    </div>
  </NoteSection>

  <NoteSection title="🧱 Library Kerangka Dasar (Skeleton Code)">
    <p>
      Hafalkan pola dasar ini. Bagian yang ditandai dengan <code>[...]</code> adalah bagian yang berubah
      sesuai soal.
    </p>

    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>1. Skeleton Segment Tree</h4>
        <CodeBlock
          language="algorithm"
          code={`procedure solve(node, L, R):
    if L = R then:
        Tree[node] := [Isi Daun]
        return
    
    mid := (L + R) / 2
    solve(2*node, L, mid)
    solve(2*node+1, mid+1, R)
    
    // BAGIAN PENTING (COMBINE)
    Tree[node] := [Operasi](Tree[2*node], Tree[2*node+1])`}
        />
      </div>

      <div>
        <h4>2. Skeleton DSU</h4>
        <CodeBlock
          language="algorithm"
          code={`function find(x):
    if parent[x] = x then return x
    // Path Compression
    parent[x] := find(parent[x])
    return parent[x]

procedure union(a, b):
    rootA := find(a)
    rootB := find(b)
    if rootA != rootB then:
        // Gabungkan akar ke akar
        parent[rootA] := rootB`}
        />
      </div>

      <div>
        <h4>3. Skeleton BS on Answer</h4>
        <CodeBlock
          language="algorithm"
          code={`low := [Batas Bawah], high := [Batas Atas]
while low <= high do:
    mid := (low + high) / 2
    if check(mid) then:
        ans := mid
        high := mid - 1 // atau low := mid + 1
    else:
        low := mid + 1  // atau high := mid - 1
return ans`}
        />
      </div>

      <div>
        <h4>4. Skeleton Augmented BST</h4>
        <CodeBlock
          language="algorithm"
          code={`procedure update(p):
    p.size := 1 + size(p.kiri) + size(p.kanan)
    p.info := [Operasi](p.kiri.info, p.kanan.info)

procedure insert(p, val):
    if p = nil then return [Node Baru]
    if val < p.data then p.kiri := insert(p.kiri, val)
    else p.kanan := insert(p.kanan, val)
    update(p)`}
        />
      </div>

      <div>
        <h4>5. Skeleton Heap (Heapify Down)</h4>
        <CodeBlock
          language="algorithm"
          code={`procedure heapifyDown(i, n):
    target := i, L := 2*i, R := 2*i+1
    if L <= n AND A[L] > A[target] then target := L
    if R <= n AND A[R] > A[target] then target := R
    if target != i then:
        swap(A[i], A[target])
        heapifyDown(target, n)`}
        />
      </div>

      <div>
        <h4>6. Skeleton Quick Sort (Partition)</h4>
        <CodeBlock
          language="algorithm"
          code={`function partition(low, high):
    pivot := A[high]
    i := low - 1
    for j := low to high-1 do:
        if A[j] < pivot then:
            i := i + 1, swap(A[i], A[j])
    swap(A[i+1], A[high])
    return i + 1`}
        />
      </div>

      <div>
        <h4>7. Skeleton Merge Sort</h4>
        <CodeBlock
          language="algorithm"
          code={`procedure mergeSort(L, R):
    if L < R then:
        mid := (L + R) / 2
        mergeSort(L, mid)
        mergeSort(mid + 1, R)
        merge(L, mid, R) // Fungsi gabung`}
        />
      </div>

      <div>
        <h4>8. Skeleton AVL Rotation (Right)</h4>
        <CodeBlock
          language="algorithm"
          code={`function rotateRight(y):
    x := y.kiri, T2 := x.kanan
    x.kanan := y
    y.kiri := T2
    updateHeight(y), updateHeight(x)
    return x`}
        />
      </div>

      <div>
        <h4>9. Skeleton Graph Traversal</h4>
        <CodeBlock
          language="algorithm"
          code={`// DFS (Recursive)
procedure DFS(u):
    visited[u] := true
    for v in neighbors(u) do:
        if not visited[v] then DFS(v)

// BFS (Queue)
procedure BFS(start):
    Q.push(start), visited[start] := true
    while not Q.empty() do:
        u := Q.pop()
        for v in neighbors(u) do:
            if not visited[v] then:
                visited[v] := true, Q.push(v)`}
        />
      </div>
    </div>
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
      <p>
        Diberikan array <code>[1, 3, 5, 7]</code>. Jelaskan langkah melakukan
        <code>update(index=1, value=10)</code>
        dan hitung <code>sum(0, 2)</code> pada Segment Tree.
      </p>
    </Callout>

    <div class="thinking-process">
      <h3>🧠 Pola Pikir</h3>
      <p>
        <strong>Update:</strong> Dari daun ke akar (Bottom-Up).
        <br /><strong>Sum:</strong> Pecah rentang query jadi bagian-bagian node (Top-Down).
      </p>
    </div>

    <Callout type="info" title="Konsep: Kenapa Pakai Array?">
      <p>
        Segment Tree disimpan dalam array linear, tapi diakses secara hierarkis menggunakan rumus:
      </p>
      <ul>
        <li>Anak Kiri = <code>2 * node</code></li>
        <li>Anak Kanan = <code>2 * node + 1</code></li>
        <li>Induk = <code>node / 2</code></li>
      </ul>
      <p>
        <strong>Penting:</strong> Bedakan antara <code>node</code> (posisi di array pohon) dengan
        <code>L</code>
        dan <code>R</code> (rentang indeks di array asli).
      </p>
      <p>
        Contoh: <code>Tree[node]</code> yang punya <code>L=0, R=3</code> artinya node tersebut menyimpan
        hasil untuk data asli dari indeks 0 sampai 3.
      </p>
    </Callout>

    <CodeBlock
      language="algorithm"
      filename="Pseudocode Segment Tree"
      code={`// Operasi Update
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
    return querySum(2*node, L, mid, qL, qR) + querySum(2*node+1, mid+1, R, qL, qR)`}
    />

    <div
      style="background: var(--color-surface-soft); padding: 1rem; border-radius: 8px; margin-top: 1rem;"
    >
      <h4>Langkah Visual:</h4>
      <ul>
        <li>
          <strong>Update(1, 10):</strong> Daun indeks 1 jadi 10. Bapaknya (Node [0-1]) jadi
          <code>1+10=11</code>. Root jadi <code>11+(5+7)=23</code>.
        </li>
        <li>
          <strong>Sum(0, 2):</strong> Ambil Node [0-1] (nilai 11) + Node [2-2] (nilai 5). Hasil =
          <strong>16</strong>.
        </li>
      </ul>
    </div>
  </NoteSection>

  <!-- SOAL 2: COMBO LCA + SUBTREE LCM -->
  <NoteSection title="Soal 2: Combo LCA + Subtree LCM">
    <Callout type="info" title="Problem Statement">
      <p>
        Diberikan dua node <strong>p</strong> dan <strong>q</strong> pada Augmented BST. Cari
        <strong>LCM</strong> dari seluruh elemen di dalam sub-pohon terkecil yang memuat p dan q.
      </p>
    </Callout>

    <div class="thinking-process">
      <h3>🧠 Pola Pikir (2 Langkah)</h3>
      <ol>
        <li><strong>Cari LCA:</strong> Temukan "Bapak Terdekat" yang memayungi p dan q.</li>
        <li>
          <strong>Ambil LCM:</strong> Karena BST sudah di-augmentasi, cukup ambil nilai
          <code>lcm_subtree</code> dari node LCA tersebut.
        </li>
      </ol>
    </div>

    <CodeBlock
      language="algorithm"
      filename="Pseudocode LCA & LCM"
      code={`// 1. Mencari Bapak Terdekat (LCA) di BST
function findLCA(root, p, q):
    if root = nil then return nil
    
    // Jika keduanya di kiri
    if p.kunci < root.kunci AND q.kunci < root.kunci then
        return findLCA(root.kiri, p, q)
    
    // Jika keduanya di kanan
    if p.kunci > root.kunci AND q.kunci > root.kunci then
        return findLCA(root.kanan, p, q)
    
    // Jika berpisah (split), berarti root adalah bapaknya
    return root

// 2. Main Procedure
procedure solveLCMLCA(p, q):
    bapak := findLCA(RootPohon, p, q)
    print "KPK Keluarga adalah: " + bapak.lcm_subtree`}
    />

    <Callout type="tip" title="Kenapa Efisien?">
      <p>
        Mencari LCA di BST cuma butuh waktu <strong>O(H)</strong> (tinggi pohon). Setelah dapat LCA,
        ambil LCM cuma <strong>O(1)</strong>. Total waktu jauh lebih cepat daripada menghitung KPK
        satu-satu!
      </p>
    </Callout>
  </NoteSection>

  <!-- SOAL 3: MENCARI PUNCAK (BITONIC) -->
  <NoteSection title="Soal 3: Mencari Titik Puncak (O log N)">
    <Callout type="info" title="Problem Statement">
      <p>
        Cari nilai puncak dalam array "gunung" (naik lalu turun) dalam waktu <strong
          >O(log N)</strong
        >.
      </p>
    </Callout>

    <div class="thinking-process">
      <h3>🧠 Pola Pikir</h3>
      <p>
        Gunakan Binary Search bukan untuk mencari nilai, tapi mencari <strong>lereng</strong>. Jika
        <code>A[mid] &lt; A[mid+1]</code>, kita sedang mendaki, puncak ada di kanan.
      </p>
    </div>

    <CodeBlock
      language="algorithm"
      filename="Pseudocode Peak Finding"
      code={`function findPeak(A, n):
    low := 0
    high := n - 1
    while low < high do
        mid := (low + high) / 2
        if A[mid] < A[mid+1] then
            low := mid + 1
        else
            high := mid
    return A[low]`}
    />
  </NoteSection>

  <!-- SOAL 4: MATEMATIKA KOMPLEKSITAS -->
  <NoteSection title="Soal 4: Perbandingan Efisiensi Nyata">
    <Callout type="info" title="Problem Statement">
      <p>
        Algoritma A (N²) butuh 1 detik untuk N=1000. Algoritma B (N log N) butuh 500 detik untuk
        N=1000. Di N berapakah B mulai lebih efisien dari A?
      </p>
    </Callout>

    <div class="thinking-process">
      <h3>🧠 Pola Pikir</h3>
      <p>
        Waktu nyata algoritma didefinisikan sebagai <MathBlock
          latex="T(N) = c \cdot f(N)"
          displayMode={false}
        />. Kita harus mencari konstanta <code>c</code> untuk masing-masing algoritma sebelum membandingkannya.
      </p>
    </div>

    <div
      class="calculation-steps"
      style="background: var(--color-surface-soft); padding: 1.5rem; border-radius: 12px; margin: 1rem 0; border: 1px solid var(--color-border);"
    >
      <h4>1. Mencari Konstanta Algoritma A (<MathBlock latex={'N^2'} displayMode={false} />)</h4>
      <MathBlock latex={'T_A(1000) = c_A \\cdot 1000^2 = 1s'} />
      <MathBlock latex={'c_A = \\frac{1}{1.000.000} = 10^{-6}'} />

      <h4 style="margin-top: 1.5rem;">
        2. Mencari Konstanta Algoritma B (<MathBlock latex={'N \\log_2 N'} displayMode={false} />)
      </h4>
      <MathBlock latex={'T_B(1000) = c_B \\cdot (1000 \\cdot \\log_2 1000) = 500s'} />
      <p style="font-size: 0.9rem; color: var(--color-text-muted); text-align: center;">
        (Asumsi <MathBlock latex={'\\log_2 1000 \\approx 10'} displayMode={false} />)
      </p>
      <MathBlock latex={'500 = c_B \\cdot 10.000 \\implies c_B = 0.05'} />

      <h4 style="margin-top: 1.5rem;">
        3. Mencari Titik Potong (<MathBlock latex={'T_B(N) < T_A(N)'} displayMode={false} />)
      </h4>
      <MathBlock latex={'0.05 \\cdot N \\cdot \\log_2 N < 10^{-6} \\cdot N^2'} />
      <p style="font-size: 0.9rem; color: var(--color-text-muted); text-align: center;">
        (Bagi kedua ruas dengan <MathBlock latex={'N \\cdot 10^{-6}'} displayMode={false} />)
      </p>
      <MathBlock latex={'50.000 \\cdot \\log_2 N < N'} />

      <h4 style="margin-top: 1.5rem;">4. Uji Coba Nilai N</h4>
      <p>Jika kita masukkan <MathBlock latex={'N = 10^6'} displayMode={false} />:</p>
      <MathBlock latex={'50.000 \\cdot \\log_2(10^6) \\approx 50.000 \\cdot 20 = 1.000.000'} />
      <p style="font-weight: bold; color: var(--color-success); text-align: center;">
        Hasil: 1.000.000 = 1.000.000 (Titik Temu)
      </p>
    </div>

    <div
      style="background: var(--color-primary-soft); padding: 1rem; border-radius: 8px; margin: 1rem 0;"
    >
      <h4 style="margin-top: 0;">💡 Trik Cepat Menebak Nilai N</h4>
      <p>
        Di ujian, jangan buang waktu menghitung logaritma eksak. Hafalkan "Pasangan Sakti" berikut:
      </p>
      <ul>
        <li>
          <MathBlock latex={'N = 10^3 \\implies \\log_2 N \\approx 10'} displayMode={false} />
        </li>
        <li>
          <MathBlock latex={'N = 10^6 \\implies \\log_2 N \\approx 20'} displayMode={false} />
        </li>
        <li>
          <MathBlock latex={'N = 10^9 \\implies \\log_2 N \\approx 30'} displayMode={false} />
        </li>
      </ul>
      <p>
        Pada soal di atas, kita punya persamaan <MathBlock
          latex={'N / \\log_2 N = 50.000'}
          displayMode={false}
        />. <br />Cek pasangan kedua: <MathBlock
          latex={'10^6 / 20 = 50.000'}
          displayMode={false}
        />. <strong>COCOK!</strong>
      </p>
    </div>

    <Callout type="info" title="Kesimpulan Akhir">
      <p>
        Algoritma B (<MathBlock latex="N \\log N" displayMode={false} />) baru akan lebih efisien
        (lebih cepat) daripada Algoritma A (<MathBlock latex="N^2" displayMode={false} />) ketika
        <strong>N > 1.000.000</strong>.
      </p>
    </Callout>
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
