<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import SegmentTreeAnimation from "./components/SegmentTreeAnimation.svelte";
    import HeapifyDownAnimation from "../struktur-data-dasar/components/HeapifyDownAnimation.svelte";
    import BuildMinHeapAnimation from "../struktur-data-dasar/components/BuildMinHeapAnimation.svelte";
    import HeapSortAnimation from "../macam-macam-sorting-dan-searching/components/HeapSortAnimation.svelte";

    const quizQuestions = [
        {
            question: "Jika sebuah simpul heap berada di indeks i (array mulai dari 0), di manakah indeks anak kirinya?",
            options: ["2i", "2i + 1", "2i + 2", "i / 2"],
            correctIndex: 1,
            explanation: "Dalam representasi array dengan root di indeks 0, anak kiri ada di 2i + 1 dan anak kanan di 2i + 2."
        },
        {
            question: "Berapa kompleksitas waktu untuk membangun sebuah heap (buildHeap) dari array acak?",
            options: ["O(N)", "O(N log N)", "O(log N)", "O(1)"],
            correctIndex: 0,
            explanation: "Meskipun operasi tunggal memakan waktu O(log N), proses buildHeap dari bawah ke atas dapat dibuktikan berjalan dalam O(N) secara matematis."
        }
    ];
</script>

<svelte:head>
    <title>Struktur Pohon Berbasis Array (Heap & Segment Tree) - S2IF Notebook</title>
    <meta name="description" content="Modul 2 DAL: Representasi pohon pada array, Pohon Segmen, struktur Heap, dan Priority Queue." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Struktur Data Pohon Berbasis Array (Heap & Segment Tree)"
        date="16 April 2026"
        status="wip"
        tags={["DAL", "Heap", "Segment Tree", "Array Tree"]}
    />

    <NoteSection title="Pendahuluan">
        <p>
            Biasanya, pohon biner (binary tree) dibuat menggunakan <em>pointer</em> (simpul kiri, simpul kanan). 
            Namun, cara tersebut sering memakan banyak memori dan lambat diakses karena datanya terpencar.
        </p>
        <p>
            Jika pohon kita berbentuk <strong>hampir lengkap (almost complete binary tree)</strong>, kita bisa menyimpannya secara praktis 
            di dalam <strong>array biasa</strong>. Ini adalah trik rahasia di balik efisiensi <em>Heap</em> dan <em>Segment Tree</em>!
        </p>
        <Callout type="info" title="Utak-Atik Indeks Array">
            <p>Jika kita meletakkan akar (root) pohon di indeks <code>0</code>, maka untuk sebuah simpul di indeks <code>i</code>:</p>
            <ul>
                <li>Induk (Parent) berada di indeks: <code>⌊(i − 1) / 2⌋</code></li>
                <li>Anak kiri (Left Child) berada di indeks: <code>2i + 1</code></li>
                <li>Anak kanan (Right Child) berada di indeks: <code>2i + 2</code></li>
            </ul>
            <p><strong>Coba Bayangkan:</strong> Root di indeks 0. Anaknya di 1 dan 2. Anak dari 1 ada di 3 dan 4. Sangat rapi, bukan?</p>
        </Callout>
    </NoteSection>

    <NoteSection title="1. Pohon Segmen (Segment Tree)">
        <p>
            Di modul sebelumnya (Prefix Sum), kita tahu cara cepat menghitung jumlah data di suatu rentang. 
            Tapi kelemahannya: jika datanya di-<em>update</em>, kita harus menghitung ulang prefix sum-nya (butuh O(N)).
        </p>
        <p>
            <strong>Pohon Segmen</strong> hadir sebagai penyelamat. Operasi Query dan Update keduanya bisa selesai secepat kilat dalam <code>O(log N)</code>!
        </p>

        <h4>Aplikasi di Dunia Nyata</h4>
        <ul>
            <li><strong>Google Maps / Game:</strong> Hanya memuat area peta yang sedang dilihat pemain (Viewport Culling) dengan membagi peta jadi kuadran-kuadran.</li>
            <li><strong>Manajemen RAM (Sistem Operasi):</strong> Mencari blok memori kosong yang berurutan secara super cepat.</li>
            <li><strong>Trader Saham:</strong> Melacak harga minimum/maksimum dari jam 10.00-11.00 meski datanya terus berubah-ubah secara real-time (Range Minimum Query).</li>
            <li><strong>Firewall:</strong> Menerapkan aturan pemblokiran IP dalam rentang tertentu secara instan (Lazy Propagation).</li>
        </ul>

        <h4>Ide Dasar Pohon Segmen</h4>
        <ul>
            <li>Akar pohon mewakili keseluruhan array: <code>[0 ... N-1]</code></li>
            <li>Setiap simpul dibagi 2. Anak kiri mewakili separuh kiri <code>[L ... M-1]</code>, anak kanan separuh kanan <code>[M ... R]</code>.</li>
            <li>Simpul paling ujung (daun) hanya mewakili 1 elemen.</li>
        </ul>

        <h4>Algoritma 1: Membangun Segment Tree (Build)</h4>
        <CodeBlock
            language="text"
            filename="pseudocode_build_segtree.txt"
            code={`Diberikan: N elemen data (asumsi N = 2^K)
Hasil: Array Tree[0...4N-1] berisi pohon segmen

procedure build(node, left, right)
  if right - left == 1 then           // Kasus dasar: simpul daun (1 elemen)
    Tree[node] := Data[left]
  else
    mid := (left + right) / 2
    build(2*node + 1, left, mid)      // Bangun anak kiri
    build(2*node + 2, mid, right)     // Bangun anak kanan
    
    // Gabungkan hasil (Bisa diganti min/max tergantung kebutuhan)
    Tree[node] := Tree[2*node + 1] + Tree[2*node + 2]
  end if
end procedure`}
        />

        <h4>Algoritma 2: Point Update (Update 1 Elemen)</h4>
        <CodeBlock
            language="text"
            filename="pseudocode_update_segtree.txt"
            code={`procedure update(node, left, right, idx, val)
  if right - left == 1 then
    Data[idx] := val
    Tree[node] := val                 // Update di daun
  else
    mid := (left + right) / 2
    if left <= idx and idx < mid then // Jika indeks ada di paruh kiri
      update(2*node + 1, left, mid, idx, val)
    else                              // Jika indeks ada di paruh kanan
      update(2*node + 2, mid, right, idx, val)
    end if
    
    // Perbarui parent berdasarkan anak yang baru di-update
    Tree[node] := Tree[2*node + 1] + Tree[2*node + 2]
  end if
end procedure`}
        />

        <h4>Algoritma 3: Range Query (Mencari Jumlah di Suatu Rentang)</h4>
        <p>Cara kerjanya pintar: Jika rentang yang diminta cocok 100% dengan simpul saat ini, langsung kembalikan nilainya tanpa menelusuri ke bawah lagi!</p>
        <CodeBlock
            language="text"
            filename="pseudocode_query_segtree.txt"
            code={`function query(node, left, right, l, r)
  // Kasus 1: Rentang simpul di luar batas pencarian [l, r)
  if r <= left or right <= l then
    return 0
  end if
  
  // Kasus 2: Rentang simpul ada di dalam pencarian [l, r) sepenuhnya
  if l <= left and right <= r then
    return Tree[node]
  end if
  
  // Kasus 3: Rentang simpul beririsan parsial, pecah jadi 2
  mid := (left + right) / 2
  p1 := query(2*node + 1, left, mid, l, r)
  p2 := query(2*node + 2, mid, right, l, r)
  
  return p1 + p2
end function`}
        />

        <p><strong>Simulasi Visual Query Segment Tree:</strong></p>
        <SegmentTreeAnimation />
    </NoteSection>

    <NoteSection title="2. Struktur Heap dan Priority Queue">
        <p>
            Selain Segment Tree, representasi array sangat populer untuk <strong>Heap</strong>. 
            Heap menjamin bahwa nilai terbesar (atau terkecil) <em>selalu</em> berada di akar pohon!
        </p>
        <ul>
            <li><strong>Max-Heap:</strong> Nilai parent <code>&ge;</code> anak-anaknya. Root = elemen terbesar.</li>
            <li><strong>Min-Heap:</strong> Nilai parent <code>&le;</code> anak-anaknya. Root = elemen terkecil.</li>
        </ul>
        <Callout type="tip" title="Aplikasi: Priority Queue (Antrian Berprioritas)">
            Heap adalah nyawa dari struktur data <code>PriorityQueue</code>. Digunakan untuk kasus seperti: 
            Pasien UGD (yang parah duluan yang ditangani), algoritma Dijkstra (jalur terpendek dievaluasi duluan).
        </Callout>

        <h4>Algoritma 4: maxHeapify (Memperbaiki Heap yang Rusak ke Bawah)</h4>
        <p>Jika ada 1 elemen yang salah posisi (lebih kecil dari anaknya), kita "tenggelamkan" ia ke bawah perlahan-lahan.</p>
        <CodeBlock
            language="text"
            filename="pseudocode_maxheapify.txt"
            code={`procedure maxHeapify(p)
  largest := p
  done := false
  
  repeat
    left := 2*p + 1
    right := 2*p + 2
    
    if left <= heapSize and Heap[left] > Heap[largest] then
      largest := left
    end if
    
    if right <= heapSize and Heap[right] > Heap[largest] then
      largest := right
    end if
    
    if largest > p then
      swap(Heap[p], Heap[largest])
      p := largest      // Terus telusuri ke bawah
    else
      done := true      // Jika parent sudah terbesar, beres!
    end if
  until done
end procedure`}
        />

        <p><strong>Simulasi Visual Heapify Down (Min-Heap):</strong></p>
        <HeapifyDownAnimation />

        <h4>Algoritma 5: buildHeap (Menyulap Array Acak Menjadi Heap)</h4>
        <p>
            Karena semua daun sudah pasti merupakan Heap (mereka tak punya anak), kita tinggal memanggil <code>maxHeapify</code> 
            mulai dari parent terdalam lalu naik ke atas hingga mencapai root. Waktu totalnya secara ajaib adalah <code>O(N)</code>!
        </p>
        <CodeBlock
            language="text"
            filename="pseudocode_buildheap.txt"
            code={`procedure buildHeap()
  for i := (heapSize / 2) - 1 downto 0 do
    maxHeapify(i)
  end for
end procedure`}
        />

        <p><strong>Simulasi Visual Build Min-Heap:</strong></p>
        <BuildMinHeapAnimation />
    </NoteSection>

    <NoteSection title="3. HeapSort">
        <p>
            Ingat Selection Sort? Dia lambat karena selalu mencari angka terbesar dari awal terus-menerus.
            <strong>HeapSort</strong> memakai ide serupa, tapi mencari nilai terbesarnya jauh lebih cepat menggunakan Max-Heap!
        </p>
        <ol>
            <li>Siapkan data menjadi Max-Heap <code>(buildHeap)</code>.</li>
            <li>Angka terbesar kini di posisi akar (0). Pindahkan ke ujung array.</li>
            <li>Kurangi batasan <code>heapSize</code> (agar ujung array tidak diganggu).</li>
            <li>Perbaiki lagi sisanya dengan <code>maxHeapify(0)</code>. Ulangi.</li>
        </ol>

        <CodeBlock
            language="text"
            filename="pseudocode_heapsort.txt"
            code={`procedure heapSort()
  buildHeap()
  size := heapSize
  
  for i := size - 1 downto 1 do
    swap(Heap[0], Heap[i])  // Pindahkan max ke ujung
    heapSize := heapSize - 1
    maxHeapify(0)           // Perbaiki root yang baru
  end for
end procedure`}
        />

        <p><strong>Simulasi Visual Heap Sort:</strong></p>
        <HeapSortAnimation />

        <Callout type="info" title="Analisis Heapsort">
            Waktu: <code>O(N log N)</code>, Memori: <code>O(1)</code> (Tidak butuh array tambahan).
        </Callout>
    </NoteSection>

    <NoteSection title="4. Latihan (Eksplorasi)">
        <p>Di akhir diktat Modul 2, terdapat beberapa kasus untuk dipecahkan:</p>
        <ul>
            <li><strong>Range Minimum Query (RMQ):</strong> Memodifikasi fungsi Sum di Segment Tree agar menjadi pencari nilai Minimum (gunakan <code>&infin;</code> saat berada di luar rentang).</li>
            <li><strong>Dynamic Median (Stream Data):</strong> Menjaga median data yang terus bertambah menggunakan 2 Heap (satu Max-Heap untuk separuh kecil, satu Min-Heap untuk separuh besar).</li>
            <li><strong>Lazy Propagation:</strong> Teknik update tertunda agar Range Update Segment Tree bisa tetap berjalan dalam waktu <code>O(log N)</code>.</li>
        </ul>
    </NoteSection>

    <NoteSection title="5. Cek Pemahaman">
        <Quiz questions={quizQuestions} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
