<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

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

        <CodeBlock
            language="python"
            filename="stack_example.py"
            code={`stack = []

stack.append(10)   # push
stack.append(20)   # push
stack.append(30)   # push

last = stack.pop() # 30
top = stack[-1]    # 20`}
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

        <CodeBlock
            language="python"
            filename="queue_example.py"
            code={`from collections import deque

q = deque()
q.append("A")      # enqueue
q.append("B")
q.append("C")

first = q.popleft() # dequeue -> "A"
front = q[0]        # "B"`}
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

        <CodeBlock
            language="text"
            filename="tree_example.txt"
            code={`        8
       / \\
      3  10
     / \\   \\
    1   6   14

Inorder traversal -> 1, 3, 6, 8, 10, 14`}
        />

        <Callout type="tip" title="Koneksi ke sorting/searching">
            Inorder traversal pada BST menghasilkan urutan naik.
            Ini alasan konsep tree sering nyambung ke topik searching dan sorting.
        </Callout>
    </NoteSection>

    <NoteSection title="5) Heap (Priority Structure)">
        <p>
            Heap adalah complete binary tree dengan aturan khusus:
            <strong>min-heap</strong> (parent &lt;= child) atau <strong>max-heap</strong> (parent &gt;= child).
            Biasanya diimplementasikan pakai array.
        </p>
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
            language="python"
            filename="heap_example.py"
            code={`import heapq

data = [9, 1, 7, 3, 6]
heapq.heapify(data)        # build min-heap, O(n)

heapq.heappush(data, 2)    # O(log n)
smallest = heapq.heappop(data)  # O(log n), nilai terkecil keluar`}
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
            language="python"
            filename="hash_table_example.py"
            code={`score = {}
score["andi"] = 88
score["budi"] = 91

exists = "andi" in score   # O(1) rata-rata
nilai = score.get("budi")`}
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
        <Callout type="tip" title="Algoritma yang sering dipakai">
            BFS, DFS, Dijkstra, Minimum Spanning Tree, Topological Sort.
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
