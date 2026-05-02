<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import HeapifyDownAnimation from "./components/HeapifyDownAnimation.svelte";
    import BuildMinHeapAnimation from "./components/BuildMinHeapAnimation.svelte";
    import DataStructureVisuals from "./components/DataStructureVisuals.svelte";
    import StackDemo from "./components/StackDemo.svelte";
    import QueueDemo from "./components/QueueDemo.svelte";
    import LinkedListDemo from "./components/LinkedListDemo.svelte";
    import TreeDemo from "./components/TreeDemo.svelte";

    const strukturDataQuiz = [
        {
            question: "Kalau pola kebutuhanmu adalah Last In First Out, struktur data paling cocok adalah...",
            options: ["Queue", "Stack", "Heap", "Hash Table"],
            correctIndex: 1,
            explanation: "LIFO adalah ciri utama stack."
        },
        {
            question: "Operasi insert dan extract-min pada binary min-heap rata-rata/worst umumnya...",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctIndex: 1,
            explanation: "Perubahan posisi elemen berjalan sepanjang tinggi heap, yaitu sekitar log n."
        },
        {
            question: "Struktur data yang paling kuat untuk representasi relasi parent-child adalah...",
            options: ["Tree", "Stack", "Array statis", "Hash set"],
            correctIndex: 0,
            explanation: "Tree memang didesain untuk hubungan hierarki parent-child."
        },
        {
            question: "Kalau kamu butuh akses cepat berdasarkan key seperti nama -> nilai, pilihan yang paling pas adalah...",
            options: ["Linked List", "Hash Table", "Queue", "Binary Tree biasa"],
            correctIndex: 1,
            explanation: "Hash table unggul untuk lookup berdasarkan key dengan rata-rata O(1)."
        },
        {
            question: "Struktur data yang cocok untuk antrean proses adalah...",
            options: ["Stack", "Queue", "Heap", "Graph"],
            correctIndex: 1,
            explanation: "Queue mengikuti FIFO, jadi cocok untuk antrian proses."
        },
        {
            question: "Representasi graph yang lebih hemat untuk graph sparse biasanya...",
            options: ["Adjacency list", "Adjacency matrix", "Array 1D", "Stack"],
            correctIndex: 0,
            explanation: "Adjacency list lebih hemat memori kalau edge-nya tidak terlalu padat."
        },
        {
            question: "Traversal inorder pada BST menghasilkan urutan...",
            options: ["Acak", "Naik", "Turun selalu", "Sama dengan level order"],
            correctIndex: 1,
            explanation: "Pada BST, inorder memberi urutan naik jika tree-nya valid."
        }
    ];
</script>

<svelte:head>
    <title>Struktur Data Dasar Sebelum Sorting - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi pondasi struktur data untuk Desain Algoritma Lanjut: stack, queue, linked list, tree, heap, hash table, graph, plus kompleksitas dan contoh penggunaan."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Struktur Data Dasar Sebelum Masuk Sorting"
        date="20 April 2026"
        status="done"
        tags={["DAL", "Struktur Data", "Stack", "Heap", "Tree"]}
    />

    <NoteSection title="Kenapa Materi Ini Ditaruh Sebelum Sorting?">
        <p>
            Banyak algoritma sorting dan searching sebenarnya sangat dipengaruhi pilihan
            struktur data. Kalau pondasi struktur data belum kuat, nanti kamu bakal hafal
            langkah algoritma, tapi bingung kapan dipakai di kasus nyata.
        </p>
        <Callout type="info" title="Mindset penting">
            Jangan cuma tanya: "Algoritmanya apa?".
            Tanyakan juga: "Datanya disimpan dalam bentuk apa?".
            Jawaban pertanyaan kedua sering menentukan efisiensi paling besar.
        </Callout>
    </NoteSection>

    <NoteSection title="Peta Besar: ADT vs Implementasi">
        <p>
            <strong>Abstract Data Type (ADT)</strong> adalah definisi perilaku:
            operasi apa yang didukung dan aturan logikanya.
            <strong>Implementasi</strong> adalah cara mewujudkan ADT itu di memori.
        </p>
        <ul>
            <li><strong>Contoh ADT:</strong> stack, queue, set, map.</li>
            <li><strong>Contoh implementasi:</strong> array, linked list, hash table, tree.</li>
        </ul>
        <Callout type="tip" title="Dampak praktis">
            Satu ADT bisa punya beberapa implementasi dengan trade-off beda.
            Misalnya queue bisa pakai array melingkar atau linked list.
        </Callout>
    </NoteSection>

    <NoteSection title="Ringkasan Kompleksitas Operasi Inti">
        <div class="table-wrap">
            <table class="note-table">
                <thead>
                    <tr>
                        <th>Struktur Data</th>
                        <th>Operasi Umum</th>
                        <th>Kompleksitas Tipikal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Array</td>
                        <td>Akses indeks</td>
                        <td>O(1)</td>
                    </tr>
                    <tr>
                        <td>Linked List</td>
                        <td>Akses indeks ke-i</td>
                        <td>O(n)</td>
                    </tr>
                    <tr>
                        <td>Stack</td>
                        <td>push, pop, top</td>
                        <td>O(1)</td>
                    </tr>
                    <tr>
                        <td>Queue</td>
                        <td>enqueue, dequeue</td>
                        <td>O(1)</td>
                    </tr>
                    <tr>
                        <td>Hash Table</td>
                        <td>insert, search, delete</td>
                        <td>Rata-rata O(1), worst O(n)</td>
                    </tr>
                    <tr>
                        <td>Binary Search Tree</td>
                        <td>insert, search, delete</td>
                        <td>Rata-rata O(log n), worst O(n)</td>
                    </tr>
                    <tr>
                        <td>Heap</td>
                        <td>insert, extract-min/max</td>
                        <td>O(log n)</td>
                    </tr>
                    <tr>
                        <td>Graph (adjacency list)</td>
                        <td>Iterasi tetangga node</td>
                        <td>O(deg(v))</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </NoteSection>

    <NoteSection title="Ilustrasi Cepat: Bentuk dan Pola">
        <p>
            Kalau kamu suka belajar lewat visual, bagian ini merangkum bentuk dasar tiap struktur data.
            Tujuannya supaya kamu tidak cuma hafal nama, tapi juga langsung kebayang bentuk dan alur datanya secara interaktif.
        </p>

        <DataStructureVisuals />

        <Callout type="tip" title="Cara baca cepat">
            Stack dan queue dibaca dari arah ujungnya. Linked list dibaca dengan pointer. Tree dan heap
            dibaca dari relasi parent-child. Hash table dibaca dari key ke bucket. Graph dibaca dari relasi antar node.
        </Callout>
    </NoteSection>

    <NoteSection title="1) Stack (LIFO)">
        <p>
            Stack mengikuti pola <strong>Last In First Out</strong>: elemen terakhir
            yang masuk adalah yang pertama keluar.
        </p>
        <p><strong>Operasi utama:</strong> <code>push</code>, <code>pop</code>, <code>peek/top</code>.</p>
        <p><strong>Kapan dipakai:</strong></p>
        <ul>
            <li>Undo/redo di editor.</li>
            <li>Evaluasi ekspresi dan parsing.</li>
            <li>DFS iteratif dan simulasi rekursi.</li>
        </ul>

        <StackDemo />

        <CodeBlock
            language="text"
            filename="stack_pseudocode.txt"
            code={`Kamus:
    stack : array of integer
    last, top_val : integer

Algoritma:
    push(stack, 10)
    push(stack, 20)
    push(stack, 30)

    last <- pop(stack)      // 30
    top_val <- top(stack)   // 20`}
        />

        <Callout type="warning" title="Kesalahan umum">
            Menganggap stack cocok untuk ambil elemen tengah secara cepat.
            Tidak cocok, karena kekuatan stack hanya di ujung atas.
        </Callout>
    </NoteSection>

    <NoteSection title="2) Queue (FIFO)">
        <p>
            Queue mengikuti pola <strong>First In First Out</strong>: elemen pertama
            yang masuk akan keluar lebih dulu.
        </p>
        <p><strong>Operasi utama:</strong> <code>enqueue</code>, <code>dequeue</code>, <code>front</code>.</p>
        <p><strong>Kapan dipakai:</strong></p>
        <ul>
            <li>Antrian request server.</li>
            <li>Scheduling proses.</li>
            <li>BFS pada graph/tree.</li>
        </ul>

        <QueueDemo />

        <CodeBlock
            language="text"
            filename="queue_pseudocode.txt"
            code={`Kamus:
    q : queue of string
    first, front_val : string

Algoritma:
    enqueue(q, "A")
    enqueue(q, "B")
    enqueue(q, "C")

    first <- dequeue(q)     // "A"
    front_val <- front(q)   // "B"`}
        />
    </NoteSection>

    <NoteSection title="3) Linked List">
        <p>
            Linked list adalah kumpulan node, tiap node menyimpan data dan pointer
            ke node berikutnya (dan bisa juga sebelumnya untuk doubly linked list).
        </p>
        <p><strong>Kelebihan:</strong></p>
        <ul>
            <li>Insert/delete di posisi tertentu efisien jika nodenya sudah diketahui.</li>
            <li>Tidak butuh alokasi memori kontigu seperti array.</li>
        </ul>
        <p><strong>Kekurangan:</strong></p>
        <ul>
            <li>Akses random by index lambat: harus traversal.</li>
            <li>Overhead memori untuk pointer.</li>
        </ul>

        <LinkedListDemo />

        <Callout type="info" title="Kompleksitas singkat">
            Akses elemen ke-i biasanya O(n), sedangkan insert di head O(1).
        </Callout>
    </NoteSection>

    <NoteSection title="4) Tree (Hierarki)">
        <p>
            Tree adalah struktur non-linear dengan relasi parent-child. Node paling atas
            disebut <strong>root</strong>, node tanpa anak disebut <strong>leaf</strong>.
        </p>
        <p><strong>Istilah inti:</strong></p>
        <ul>
            <li><strong>Depth</strong>: jarak dari root ke node.</li>
            <li><strong>Height</strong>: jarak maksimum dari node ke leaf.</li>
            <li><strong>Subtree</strong>: bagian tree yang juga tree.</li>
        </ul>
        <p><strong>Variasi penting:</strong></p>
        <ul>
            <li><strong>Binary Tree</strong>: maksimal 2 anak per node.</li>
            <li><strong>Binary Search Tree (BST)</strong>: kiri &lt; root &lt; kanan.</li>
            <li><strong>Balanced Tree</strong> (AVL/Red-Black): tinggi dijaga agar operasi tetap cepat.</li>
        </ul>

        <TreeDemo />

        <Callout type="tip" title="Koneksi ke sorting/searching">
            Inorder traversal pada BST menghasilkan urutan naik.
            Ini alasan konsep tree sering nyambung ke topik searching dan sorting.
        </Callout>
    </NoteSection>

    <NoteSection title="5) Heap (Priority Structure)">
        <p><strong>Apa itu heap?</strong></p>
        <p>
            Heap adalah complete binary tree dengan aturan khusus:
            <strong>min-heap</strong> (parent &lt;= child) atau <strong>max-heap</strong> (parent &gt;= child).
            Biasanya diimplementasikan pakai array.
        </p>
        <p>
            Cara mikir paling gampang: heap itu "mesin prioritas". Bukan untuk bikin data terurut total,
            tapi untuk memastikan elemen prioritas selalu cepat diambil dari root.
        </p>
        <p><strong>Karakteristik utama heap:</strong></p>
        <ul>
            <li><strong>Complete binary tree</strong>: bentuknya rapat dari kiri ke kanan.</li>
            <li><strong>Heap-order property</strong>: relasi parent-anak selalu valid (min atau max).</li>
            <li><strong>Akar/root adalah elemen prioritas</strong>: min di min-heap, max di max-heap.</li>
            <li><strong>Representasi array</strong>: efisien memori, tidak wajib pointer seperti tree biasa.</li>
        </ul>

        <CodeBlock
            language="text"
            filename="heap_concept_example.txt"
            code={`Contoh min-heap (array): [2, 4, 7, 9, 10, 8]

Visual tree:
        2
      /   \\
     4     7
    / \   /
   9  10 8

Interpretasi:
- root = 2 (nilai minimum)
- parent selalu <= anak
- urutan global belum tentu sorted penuh`}
        />

        <p><strong>Karakter utama:</strong></p>
        <ul>
            <li>Bukan untuk pencarian elemen arbitrer cepat.</li>
            <li>Sangat kuat untuk ambil elemen prioritas tertinggi/terendah berulang.</li>
        </ul>
        <p><strong>Operasi penting:</strong></p>
        <ul>
            <li><code>peek-min/max</code>: O(1)</li>
            <li><code>insert</code>: O(log n)</li>
            <li><code>extract-min/max</code>: O(log n)</li>
            <li><code>build-heap</code> dari array: O(n)</li>
        </ul>

        <CodeBlock
            language="text"
            filename="heap_mapping.txt"
            code={`array index: 0  1  2  3  4  5
value      : 1, 3, 6, 8, 10, 9

parent index i = floor((i - 1) / 2)
left child  = 2i + 1
right child = 2i + 2`}
        />

        <Callout type="tip" title="Yang dijamin di heap">
            Heap tidak menjamin seluruh elemen terurut seperti array sorted.
            Yang dijamin hanya node root adalah nilai prioritas tertinggi (max-heap)
            atau terendah (min-heap).
        </Callout>

        <p><strong>Operasi 1: Insert (bubble up / sift up)</strong></p>
        <p>
            Saat insert, elemen baru ditaruh dulu di posisi terakhir (biar bentuk complete tree aman),
            lalu dinaikkan selama melanggar aturan heap terhadap parent.
        </p>

        <CodeBlock
            language="text"
            filename="heap_insert_step_by_step.txt"
            code={`Contoh min-heap awal (array): [2, 4, 7, 9, 10, 8]
Insert nilai: 3

Langkah 1 (append di belakang):
[2, 4, 7, 9, 10, 8, 3]

Langkah 2 (compare dengan parent):
index(3)=6, parent index=2, parent value=7
karena 3 < 7, swap -> [2, 4, 3, 9, 10, 8, 7]

Langkah 3:
index(3)=2, parent index=0, parent value=2
karena 3 >= 2, berhenti

Hasil akhir: [2, 4, 3, 9, 10, 8, 7]
Kompleksitas: O(log n)`}
        />

        <CodeBlock
            language="text"
            filename="heap_insert_pseudocode.txt"
            code={`Kamus:
    i, p, temp : integer
    heap : array of integer

Algoritma procedure HEAP_INSERT_MIN(heap, x):
    tambahkan x ke akhir array heap
    i <- length(heap) - 1

    while i > 0 do
        p <- (i - 1) div 2
        if heap[p] <= heap[i] then
            break
        end if
        
        temp <- heap[p]; heap[p] <- heap[i]; heap[i] <- temp
        i <- p
    end while`}
        />

        <p><strong>Operasi 2: Extract-min / Extract-max (bubble down / sift down)</strong></p>
        <p>
            Untuk min-heap, extract-min mengambil root. Setelah root diambil,
            elemen terakhir dipindah ke root lalu diturunkan sampai aturan heap valid lagi.
        </p>

        <CodeBlock
            language="text"
            filename="heap_extract_step_by_step.txt"
            code={`Contoh min-heap awal (array): [2, 4, 3, 9, 10, 8, 7]

Langkah 1: ambil root = 2
Langkah 2: pindahkan elemen terakhir (7) ke root
[7, 4, 3, 9, 10, 8]

Langkah 3 (heapify down):
anak root: 4 dan 3, pilih yang lebih kecil = 3
swap 7 dengan 3 -> [3, 4, 7, 9, 10, 8]

Langkah 4:
index(7)=2, anaknya hanya 8
karena 7 <= 8, berhenti

Hasil akhir: [3, 4, 7, 9, 10, 8]
Kompleksitas: O(log n)`}
        />

        <CodeBlock
            language="text"
            filename="heap_extract_pseudocode.txt"
            code={`Kamus:
    minValue, n, left, right, smallest, temp : integer
    heap : array of integer

Algoritma function HEAP_EXTRACT_MIN(heap) -> integer:
    if length(heap) = 0 then
        return ERROR
    end if

    minValue <- heap[0]
    heap[0] <- heap[length(heap) - 1]
    hapus elemen terakhir dari heap

    HEAPIFY_DOWN_MIN(heap, 0)
    return minValue

Algoritma procedure HEAPIFY_DOWN_MIN(heap, i):
    n <- length(heap)

    while true do
        left <- 2 * i + 1
        right <- 2 * i + 2
        smallest <- i

        if (left < n) and (heap[left] < heap[smallest]) then
            smallest <- left
        end if
        if (right < n) and (heap[right] < heap[smallest]) then
            smallest <- right
        end if

        if smallest = i then
            break
        end if

        temp <- heap[i]; heap[i] <- heap[smallest]; heap[smallest] <- temp
        i <- smallest
    end while`}
        />

        <Callout type="info" title="HEAPIFY_DOWN_MIN itu ngapain?">
            Intinya: fungsi ini menurunkan node di indeks <code>i</code> sampai aturan min-heap kembali valid.
            Biasanya dipanggil setelah root diganti elemen terakhir saat <code>extract-min</code>.
            
            Langkah bacanya:
            1) Ambil indeks anak kiri/kanan dari node sekarang.
            2) Cari nilai terkecil di antara <code>node sekarang</code>, <code>anak kiri</code>, dan <code>anak kanan</code>.
            3) Kalau node sekarang sudah yang paling kecil, berhenti (heap sudah valid di cabang itu).
            4) Kalau bukan, tukar dengan anak yang lebih kecil, lalu lanjut turun dari posisi baru.
            
            Efek akhirnya: elemen yang terlalu besar "melorot" ke bawah sampai ketemu posisi yang benar.
        </Callout>

        <h4 style="margin-top: 1.5rem; color: var(--color-ink);">Visualisasi Animasi Heapify Down</h4>
        <p>Coba mainkan animasi di bawah ini untuk melihat bagaimana elemen <strong>7</strong> (yang dipindahkan ke root untuk menggantikan nilai extract-min) <em>melorot</em> ke bawah pada Min-Heap mencari posisinya yang benar.</p>
        <HeapifyDownAnimation />

        <p><strong>Operasi 3: Peek</strong></p>
        <ul>
            <li>Min-heap: nilai minimum selalu di root (index 0).</li>
            <li>Max-heap: nilai maksimum selalu di root (index 0).</li>
            <li>Kompleksitas <code>peek</code> adalah O(1).</li>
        </ul>

        <CodeBlock
            language="text"
            filename="heap_peek_pseudocode.txt"
            code={`Kamus:
    heap : array of integer

Algoritma function HEAP_PEEK(heap) -> integer:
    if length(heap) = 0 then
        return ERROR
    end if
    
    return heap[0]`}
        />

        <p><strong>Operasi 4: Build-heap dari array acak</strong></p>
        <p>
            Cara efisien bukan insert satu-satu, tapi heapify dari node non-leaf paling kanan ke root.
            Itulah kenapa <code>build-heap</code> bisa O(n), bukan O(n log n).
        </p>

        <Callout type="info" title="Kenapa loop-nya mulai dari bawah (floor(n/2) - 1)? Kenapa tidak dari root?">
            <strong>1. Kenapa mulai dari <code>floor(n/2) - 1</code>?</strong><br/>
            Setengah elemen terakhir di dalam array adalah <strong>node daun (leaf)</strong>, alias node yang nggak punya anak sama sekali. Sebuah node tanpa anak sudah pasti merupakan Heap yang valid. Jadi, kita bisa mem-<em>bypass</em> mereka dan mulai dari <strong>node pertama yang memiliki anak</strong> dari belakang (yaitu <code>floor(n/2) - 1</code>).<br/><br/>

            <strong>2. Kenapa harus mundur (dari bawah ke atas), kok nggak langsung dari root (0)?</strong><br/>
            Syarat mutlak agar fungsi <code>heapify-down(i)</code> berhasil adalah: <strong>kedua sub-tree (anak kiri dan kanan) dari node <code>i</code> HARUS sudah berupa Heap yang valid</strong>. <br/>
            Kalau kita mulai dari root (0), anak-anaknya masih acak-acakan (belum jadi Heap). Tapi kalau kita mulai dari bawah, kita sedang membangun pondasi Heap yang valid perlahan-lahan ke atas. Saat giliran root diproses, kita yakin 100% kalau anak kiri dan kanannya sudah beres duluan.
        </Callout>

        <CodeBlock
            language="text"
            filename="build_heap_outline.txt"
            code={`Input: [9, 1, 7, 3, 6]

Mulai heapify dari index floor(n/2)-1 ke 0:
i = 1 lalu i = 0

Setelah semua heapify-down selesai:
hasil min-heap valid, contoh: [1, 3, 7, 9, 6]

Kompleksitas build-heap: O(n)`}
        />

        <CodeBlock
            language="text"
            filename="build_heap_pseudocode.txt"
            code={`Kamus:
    n, i : integer
    heap : array of integer

Algoritma procedure BUILD_MIN_HEAP(heap):
    n <- length(heap)
    for i <- (n div 2) - 1 down to 0 do
        HEAPIFY_DOWN_MIN(heap, i)
    end for
    
    return heap`}
        />

        <h4 style="margin-top: 1.5rem; color: var(--color-ink);">Visualisasi Animasi Build Min-Heap</h4>
        <p>Lihat bagaimana <code>build-heap</code> bekerja dengan memulai iterasi dari node non-leaf paling kanan, lalu memanggil <code>heapify-down</code> hingga mencapai root.</p>
        <BuildMinHeapAnimation />

        <CodeBlock
            language="text"
            filename="heap_usage.txt"
            code={`Kamus:
    data : array of integer
    smallest : integer

Algoritma:
    data <- [9, 1, 7, 3, 6]
    BUILD_MIN_HEAP(data)            // O(n)

    HEAP_INSERT_MIN(data, 2)        // O(log n)
    smallest <- HEAP_EXTRACT_MIN(data) // O(log n)`}
        />

        <Callout type="info" title="Use case populer">
            Priority queue untuk Dijkstra, penjadwalan tugas, top-k problem,
            dan stream processing.
        </Callout>
    </NoteSection>

    <NoteSection title="6) Hash Table (Map/Dictionary)">
        <p>
            Hash table menyimpan pasangan key-value. Key dipetakan ke indeks array
            melalui fungsi hash.
        </p>
        <p><strong>Kelebihan:</strong> akses rata-rata sangat cepat.</p>
        <p><strong>Tantangan:</strong> collision (dua key ke bucket sama), perlu strategi seperti chaining atau open addressing.</p>

        <CodeBlock
            language="text"
            filename="hash_collision.txt"
            code={`hash("andi")  -> bucket 1
hash("budi")  -> bucket 2
hash("cici")  -> bucket 2

bucket 2 menyimpan collision, misalnya:
[budi: 91] -> [cici: 95]`}
        />

        <CodeBlock
            language="text"
            filename="hash_table.txt"
            code={`Kamus:
    score : hash table (map) of string -> integer
    exists : boolean
    nilai : integer

Algoritma:
    score["andi"] <- 88
    score["budi"] <- 91

    exists <- ("andi" in score)    // O(1)
    nilai <- score["budi"]         // 91`}
        />
    </NoteSection>

    <NoteSection title="7) Graph (Relasi Umum)">
        <p>
            Graph merepresentasikan relasi umum antar entitas, tidak harus hierarkis.
            Terdiri dari <strong>vertex</strong> (node) dan <strong>edge</strong> (hubungan).
        </p>
        <p><strong>Contoh:</strong> peta jalan, jejaring sosial, dependensi modul.</p>
        <p><strong>Representasi:</strong></p>
        <ul>
            <li>Adjacency list: hemat untuk graph sparse.</li>
            <li>Adjacency matrix: akses cek edge O(1), tapi boros jika graph besar dan sparse.</li>
        </ul>

        <CodeBlock
            language="text"
            filename="graph_adj_list.txt"
            code={`1: 2, 4
2: 1, 3
3: 2, 4
4: 1, 3

node 1 terhubung ke 2 dan 4,
jadi kita simpan tetangganya dalam daftar`}
        />

        <p><strong>Pseudocode operasi graph dasar (adjacency list):</strong></p>

        <CodeBlock
            language="text"
            filename="graph_add_edge_pseudocode.txt"
            code={`Kamus:
    adj : hash table/array of list
    u, v : node

Algoritma procedure ADD_EDGE_UNDIRECTED(adj, u, v):
    if u tidak ada di adj then
        adj[u] <- list kosong
    end if
    if v tidak ada di adj then
        adj[v] <- list kosong
    end if

    tambahkan v ke akhir adj[u]
    tambahkan u ke akhir adj[v]`}
        />

        <CodeBlock
            language="text"
            filename="graph_bfs_pseudocode.txt"
            code={`Kamus:
    adj : array/hash table of list
    visited : set of node
    q : queue of node
    start, u, v : node

Algoritma procedure BFS(adj, start):
    visited <- set kosong
    q <- queue kosong

    tambahkan start ke visited
    enqueue(q, start)

    while q tidak kosong do
        u <- dequeue(q)
        proses node u

        for each v in adj[u] do
            if v tidak ada di visited then
                tambahkan v ke visited
                enqueue(q, v)
            end if
        end for
    end while`}
        />

        <CodeBlock
            language="text"
            filename="graph_dfs_iterative_pseudocode.txt"
            code={`Kamus:
    adj : array/hash table of list
    visited : set of node
    st : stack of node
    start, u, v : node

Algoritma procedure DFS_ITERATIVE(adj, start):
    visited <- set kosong
    st <- stack kosong

    push(st, start)

    while st tidak kosong do
        u <- pop(st)
        if u ada di visited then
            continue
        end if

        tambahkan u ke visited
        proses node u

        for each v in reverse(adj[u]) do
            if v tidak ada di visited then
                push(st, v)
            end if
        end for
    end while`}
        />

        <Callout type="tip" title="Algoritma yang sering dipakai">
            BFS, DFS, Dijkstra, Minimum Spanning Tree, Topological Sort.
        </Callout>
    </NoteSection>

    <NoteSection title="Latihan Mandiri">
        <p>
            Coba kerjakan tanpa lihat jawaban dulu. Fokusnya bukan hafalan nama struktur,
            tapi kemampuan memilih struktur data yang paling masuk akal untuk pola masalah tertentu.
        </p>
        <ol>
            <li>Jelaskan perbedaan stack dan queue dengan satu contoh aktivitas sehari-hari.</li>
            <li>Kenapa linked list cocok untuk insert/delete di posisi yang sudah diketahui, tapi tidak cocok untuk akses by index?</li>
            <li>Sebutkan 2 kasus nyata yang lebih cocok memakai heap daripada array biasa.</li>
            <li>Kalau data sering dicari berdasarkan key, kenapa hash table biasanya lebih unggul daripada tree biasa?</li>
            <li>Bandingkan adjacency list dan adjacency matrix untuk graph sparse.</li>
            <li>Buat satu contoh masalah yang bisa diselesaikan dengan BFS dan jelaskan kenapa queue terlibat di sana.</li>
            <li>Ambil BST sederhana berisi 5 angka, lalu tuliskan hasil inorder traversal-nya.</li>
        </ol>

        <Callout type="warning" title="Tips mengerjakan">
            Kalau buntu, jangan langsung mencari nama struktur data. Mulai dari pertanyaan: operasi apa yang paling sering?
            Akses? Insert? Delete? Prioritas? Jawaban itu biasanya sudah mengerucutkan pilihan.
        </Callout>
    </NoteSection>

    <NoteSection title="Cara Memilih Struktur Data Saat Ketemu Soal">
        <ol>
            <li>Tentukan operasi dominan: baca, cari, insert, delete, atau ambil prioritas.</li>
            <li>Lihat constraint: ukuran n, limit waktu, limit memori, pola update.</li>
            <li>Cocokkan ke struktur dengan biaya operasi paling masuk akal.</li>
            <li>Uji edge case: data kosong, duplikat, nilai ekstrem, dan skenario terburuk.</li>
        </ol>
        <Callout type="warning" title="Anti-jebakan pemula">
            Struktur data populer belum tentu paling cocok.
            Pilih berdasarkan operasi dominan, bukan berdasarkan "yang paling sering dipakai".
        </Callout>
    </NoteSection>

    <NoteSection title="Penutup Singkat">
        <p>
            Sebelum lanjut ke macam-macam sorting, pastikan kamu sudah nyaman membedakan:
            kapan perlu stack/queue, kapan tree/heap, dan kapan hash table.
            Ini akan bikin analisis algoritmamu jauh lebih tajam.
        </p>
    </NoteSection>

    <NoteSection title="Cek Pemahaman Cepat">
        <Quiz title="Quiz Struktur Data Dasar" questions={strukturDataQuiz} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
