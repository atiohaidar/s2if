<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import GraphVisualizer from "./components/GraphVisualizer.svelte";
    import BFSSimulator from "./components/BFSSimulator.svelte";
    import DFSSimulator from "./components/DFSSimulator.svelte";
    import DijkstraSimulator from "./components/DijkstraSimulator.svelte";
    import PrimSimulator from "./components/PrimSimulator.svelte";

    const exampleNodes = [
        { id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' },
        { id: 'e' }, { id: 'f' }, { id: 'g' }, { id: 'h' }, { id: 'i' }
    ];

    const exampleEdges = [
        { source: 'a', target: 'i' }, { source: 'a', target: 'd' },
        { source: 'b', target: 'c' }, { source: 'b', target: 'd' },
        { source: 'c', target: 'd' }, { source: 'd', target: 'e' },
        { source: 'e', target: 'f' }, { source: 'e', target: 'g' },
        { source: 'e', target: 'h' }, { source: 'h', target: 'i' },
        { source: 'i', target: 'e' }
    ];

    const materiQuiz = [
        {
            question: "Manakah representasi graf yang paling efisien memori untuk graf yang renggang (sparse)?",
            options: ["Adjacency Matrix", "Adjacency List", "Incident Matrix", "Complete Graph"],
            correctIndex: 1,
            explanation: "Adjacency List hanya menyimpan tetangga yang ada, sehingga hemat tempat jika jumlah edge jauh lebih sedikit dari V^2."
        },
        {
            question: "Algoritma penelusuran graf yang menggunakan struktur data Queue adalah...",
            options: ["DFS", "BFS", "Dijkstra", "Prim"],
            correctIndex: 1,
            explanation: "BFS (Breadth First Search) menggunakan Queue untuk menelusuri graf lapis demi lapis (level-order)."
        },
        {
            question: "Pada graf tidak berbobot (unweighted), algoritma manakah yang secara otomatis menemukan jalur terpendek?",
            options: ["DFS", "BFS", "Prim", "Kruskal"],
            correctIndex: 1,
            explanation: "Karena BFS menelusuri berdasarkan level (jarak), maka node yang pertama kali ditemukan dipastikan berada pada jalur terpendek dari source."
        }
    ];
</script>

<svelte:head>
    <title>Teori Graf dan Algoritma Dasar - S2IF Notebook</title>
    <meta name="description" content="Materi komprehensif tentang teori graf: definisi, representasi, serta algoritma dasar seperti BFS, DFS, Dijkstra, dan Prim." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Teori Graf dan Algoritma Dasar"
        date="07 Mei 2026"
        status="done"
        tags={["DAL", "Graph", "BFS", "DFS", "Dijkstra"]}
    />

    <NoteSection title="1. Apa itu Graf?">
        <p>
            Graf adalah struktur data yang terdiri dari sekumpulan objek (disebut <strong>Vertex</strong> atau <strong>Node</strong>) yang dihubungkan oleh relasi (disebut <strong>Edge</strong> atau <strong>Busur</strong>).
        </p>
        <MathBlock latex="G = (V, E)" />
        <ul>
            <li><strong>V (Vertex):</strong> Himpunan titik/node dalam graf.</li>
            <li><strong>E (Edge):</strong> Himpunan pasangan (u, v) yang menghubungkan vertex u dan v.</li>
        </ul>

        <Callout type="info" title="Definisi Simple Graph">
            Graf sederhana (Simple Graph) adalah graf yang:
            <ol>
                <li>Tidak memiliki <strong>self-loop</strong> (edge dari node ke dirinya sendiri).</li>
                <li>Tidak memiliki <strong>multi-edge</strong> (lebih dari satu edge yang menghubungkan pasangan node yang sama).</li>
            </ol>
        </Callout>
    </NoteSection>

    <NoteSection title="2. Jenis-Jenis Graf">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="info-card">
                <h3>Berdasarkan Arah (Direction)</h3>
                <p><strong>Undirected Graph:</strong> Hubungan antar node tidak memiliki arah. Jika ada edge (u, v), maka kita bisa pergi dari u ke v dan sebaliknya.</p>
                <div class="visualizer-box">
                    <GraphVisualizer nodes={exampleNodes} edges={exampleEdges} directed={false} height={250} />
                </div>
                <p><strong>Directed Graph (Digraph):</strong> Hubungan memiliki arah. Edge (u, v) berarti jalan dari u ke v, tapi belum tentu sebaliknya.</p>
                <div class="visualizer-box">
                    <GraphVisualizer nodes={exampleNodes} edges={exampleEdges} directed={true} height={250} />
                </div>
            </div>
            <div class="info-card">
                <h3>Berdasarkan Bobot (Weight)</h3>
                <p><strong>Unweighted Graph:</strong> Semua edge dianggap memiliki beban yang sama (biasanya diasumsikan 1).</p>
                <p><strong>Weighted Graph:</strong> Setiap edge diberikan nilai numerik (bobot), misalnya jarak, waktu, atau biaya.</p>
                <div class="visualizer-box">
                    <GraphVisualizer 
                        nodes={[{id: 'A'}, {id: 'B'}, {id: 'C'}]} 
                        edges={[
                            {source: 'A', target: 'B', weight: 5},
                            {source: 'B', target: 'C', weight: 10},
                            {source: 'C', target: 'A', weight: 3}
                        ]} 
                        directed={true} 
                        height={250} 
                    />
                </div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="3. Representasi Graf di Komputer">
        <p>Ada tiga cara utama untuk merepresentasikan graf dalam kode program:</p>

        <h3>A. Adjacency Matrix</h3>
        <p>Menggunakan array 2 dimensi berukuran <MathBlock latex={"|V| \\times |V|"} displayMode={false} /> di mana <MathBlock latex={"a_{ij} = 1"} displayMode={false} /> jika ada edge dari <MathBlock latex={"i"} displayMode={false} /> ke <MathBlock latex={"j"} displayMode={false} />.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="overflow-x-auto">
                <table class="matrix-table">
                    <thead>
                        <tr><th>V \ V</th><th>1</th><th>2</th><th>3</th></tr>
                    </thead>
                    <tbody>
                        <tr><th>1</th><td>0</td><td>1</td><td>1</td></tr>
                        <tr><th>2</th><td>1</td><td>0</td><td>0</td></tr>
                        <tr><th>3</th><td>1</td><td>0</td><td>0</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="python" filename="adj_matrix.py" code={`# Contoh representasi matrix
adj_matrix = [
    [0, 1, 1], # Node 1 terhubung ke 2 dan 3
    [1, 0, 0], # Node 2 terhubung ke 1
    [1, 0, 0]  # Node 3 terhubung ke 1
]`} />
        </div>

        <div class="info-card mt-4">
            <strong>Karakteristik & Analisis:</strong>
            <ul>
                <li><strong>Ruang (Space):</strong> Membutuhkan <MathBlock latex="O(V^2)" displayMode={false} /> memori. Sangat boros jika graf renggang.</li>
                <li><strong>Waktu (Time):</strong> Cek apakah ada edge (u, v) sangat cepat (<MathBlock latex="O(1)" displayMode={false} />). Mencari semua tetangga butuh <MathBlock latex="O(V)" displayMode={false} />.</li>
                <li><strong>Sifat:</strong> Matriks bersifat <strong>simetris</strong> untuk graf tidak berarah.</li>
            </ul>
        </div>

        <h3>B. Adjacency List</h3>
        <p>Array dari list, di mana array indeks <MathBlock latex="i" displayMode={false} /> berisi daftar vertex yang terhubung dengan vertex <MathBlock latex="i" displayMode={false} />.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 rounded border font-mono">
                1: [2, 3]<br/>
                2: [1]<br/>
                3: [1]
            </div>
            <div class="visualizer-box">
                <GraphVisualizer 
                    nodes={[{id: '1'}, {id: '2'}, {id: '3'}]} 
                    edges={[{source: '1', target: '2'}, {source: '1', target: '3'}]}
                    height={150}
                />
            </div>
        </div>


        <div class="info-card mt-4">
            <strong>Karakteristik & Analisis:</strong>
            <ul>
                <li><strong>Ruang (Space):</strong> Sangat efisien (<MathBlock latex="O(V + E)" displayMode={false} />). Hanya menyimpan data yang ada.</li>
                <li><strong>Waktu (Time):</strong> Mencari semua tetangga sangat cepat (<MathBlock latex={"O(\\text{degree})"} displayMode={false} />). Cek edge (u, v) butuh waktu linear terhadap jumlah tetangga.</li>
                <li><strong>Penggunaan:</strong> Standar industri untuk hampir semua kasus graf dunia nyata.</li>
            </ul>
        </div>

        <h3>C. Incident Matrix</h3>
        <p>Matrix berukuran <MathBlock latex={"|V| \\times |E|"} displayMode={false} />. Setiap kolom mewakili satu edge dan berisi nilai 1 pada dua baris (vertex) yang dihubungkan oleh edge tersebut.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="overflow-x-auto">
                <table class="matrix-table">
                    <thead>
                        <tr>
                            <th>V \ E</th>
                            <th>e1 (1,2)</th>
                            <th>e2 (1,3)</th>
                            <th>e3 (2,4)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th>1</th><td>1</td><td>1</td><td>0</td></tr>
                        <tr><th>2</th><td>1</td><td>0</td><td>1</td></tr>
                        <tr><th>3</th><td>0</td><td>1</td><td>0</td></tr>
                        <tr><th>4</th><td>0</td><td>0</td><td>1</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="visualizer-box">
                <GraphVisualizer 
                    nodes={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}]} 
                    edges={[{source: '1', target: '2'}, {source: '1', target: '3'}, {source: '2', target: '4'}]}
                    height={200}
                />
            </div>
        </div>
        <CodeBlock language="text" filename="incident_matrix_build.txt" code={`// Membangun Incident Matrix
Initialize matrix[|V|][|E|] with 0
for each edge e_k connecting (u, v) in E:
    matrix[u][e_k] = 1
    matrix[v][e_k] = 1`} />

        <div class="info-card mt-4">
            <strong>Karakteristik & Analisis:</strong>
            <ul>
                <li><strong>Ruang (Space):</strong> Membutuhkan memori sebesar <MathBlock latex={"O(V \\times E)"} displayMode={false} />.</li>
                <li><strong>Struktur:</strong> Setiap kolom (edge) pasti memiliki tepat <strong>dua angka 1</strong> yang menunjukkan titik awal dan akhir.</li>
                <li><strong>Kegunaan:</strong> Memudahkan operasi yang berfokus pada hubungan antara vertex dan edge secara spesifik.</li>
            </ul>
        </div>

        <h3>D. Dense vs Sparse Graph</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="info-card">
                <p><strong>Sparse Graph:</strong> Memiliki sedikit edge (<MathBlock latex={"|E| \\approx |V|"} displayMode={false} />).</p>
                <GraphVisualizer 
                    nodes={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}]} 
                    edges={[{source: '1', target: '2'}, {source: '2', target: '3'}, {source: '3', target: '4'}]}
                    height={150}
                />
                <div class="p-2 bg-gray-50 rounded mt-2">
                    <pre>V=4, E=3 (Min: V-1)</pre>
                </div>
            </div>
            <div class="info-card">
                <p><strong>Dense Graph:</strong> Memiliki banyak edge (<MathBlock latex={"|E| \\approx |V|^2"} displayMode={false} />).</p>
                <GraphVisualizer 
                    nodes={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}]} 
                    edges={[
                        {source: '1', target: '2'}, {source: '1', target: '3'}, {source: '1', target: '4'},
                        {source: '2', target: '3'}, {source: '2', target: '4'}, {source: '3', target: '4'}
                    ]}
                    height={150}
                />
                <div class="p-2 bg-gray-50 rounded mt-2">
                    <pre>V=4, E=6 (Max: V*(V-1)/2)</pre>
                </div>
            </div>
        </div>
        <CodeBlock language="text" filename="density_check.txt" code={`// Menentukan jenis graf berdasarkan kepadatan
if |E| > (|V| * (|V| - 1)) / 4:
    return "DENSE" (Gunakan Adjacency Matrix)
else:
    return "SPARSE" (Gunakan Adjacency List)`} />
    </NoteSection>

    <NoteSection title="4. Jenis Graf Khusus">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="info-card">
                <ul>
                    <li><strong>Complete Graph:</strong> Setiap node terhubung ke setiap node lainnya.</li>
                    <li><strong>Bipartite Graph:</strong> Node dapat dibagi menjadi dua himpunan <MathBlock latex="K" displayMode={false} /> dan <MathBlock latex="L" displayMode={false} /> sedemikian sehingga setiap edge menghubungkan node di <MathBlock latex="K" displayMode={false} /> ke node di <MathBlock latex="L" displayMode={false} />.</li>
                </ul>
            </div>
            <div class="info-card">
                <ul>
                    <li><strong>Tree:</strong> Graf terhubung tanpa siklus (<MathBlock latex="|E| = |V| - 1" displayMode={false} />).</li>
                    <li><strong>Forest:</strong> Kumpulan tree yang tidak saling terhubung.</li>
                    <li><strong>Isomorphic Graph:</strong> Dua graf yang secara visual berbeda tapi memiliki struktur (konektivitas) yang identik.</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="5. Fakta & Pernyataan Penting">
        <p>Berikut adalah fakta-fakta kunci tentang graf yang sering muncul dalam soal ujian. Pastikan kamu memahami <strong>mengapa</strong> setiap pernyataan benar atau salah.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="info-card border-t-4 border-t-red-500">
                <h4>Handshaking Lemma</h4>
                <p>Jumlah seluruh derajat (degree) dari semua vertex dalam sebuah graf adalah tepat dua kali jumlah edge.</p>
                <MathBlock latex={"\\sum_{v \\in V} deg(v) = 2|E|"} />
                <p class="text-sm mt-2"><strong>Konsekuensi:</strong> Dalam graf apa pun, jumlah vertex yang memiliki derajat ganjil pasti genap.</p>
            </div>
            <div class="info-card border-t-4 border-t-blue-500">
                <h4>Kapasitas Maksimum Edge</h4>
                <p>Dalam graf sederhana dengan <MathBlock latex={"n"} displayMode={false} /> vertex, jumlah maksimum edge yang mungkin adalah:</p>
                <MathBlock latex={"|E|_{max} = \\frac{n(n-1)}{2}"} />
            </div>
        </div>

        <h4 class="mt-4">Klarifikasi Konsep yang Sering Keliru</h4>
        <div class="grid grid-cols-1 gap-4 mt-2">
            <div class="info-card border-l-4 border-l-blue-500">
                <h5>Directed vs Undirected Graph</h5>
                <p><strong>Benar:</strong> Graf berarah (directed) <strong>dapat merepresentasikan lebih banyak jenis masalah</strong> daripada graf tidak berarah, karena setiap edge memiliki arah (misal: relasi "mengikuti" di media sosial, urutan prasyarat mata kuliah). Graf tidak berarah adalah kasus khusus di mana setiap edge berlaku dua arah.</p>
            </div>
            <div class="info-card border-l-4 border-l-purple-500">
                <h5>Bipartite Graph</h5>
                <p><strong>Benar:</strong> Pada graf bipartit, <strong>vertex-nya</strong> (bukan edge-nya) yang dibagi menjadi dua himpunan disjoin K dan L, di mana setiap edge hanya menghubungkan vertex di K dengan vertex di L. Tidak ada edge antar sesama anggota K atau sesama anggota L.</p>
            </div>
            <div class="info-card border-l-4 border-l-orange-500">
                <h5>Representasi Graf</h5>
                <p><strong>Fakta:</strong> Struktur data untuk merepresentasikan graf tidak hanya dua. Selain Adjacency Matrix dan Adjacency List, ada juga <strong>Incident Matrix</strong> dan struktur lain seperti Edge List. Pernyataan "hanya ada dua" adalah <strong>salah</strong>.</p>
            </div>
            <div class="info-card border-l-4 border-l-green-500">
                <h5>Sparse vs Dense untuk Kasus Nyata</h5>
                <p><strong>Fakta:</strong> Untuk menyimpan data ratusan juta pengguna media sosial, yang diperlukan justru struktur graf <strong>sparse</strong> (renggang), bukan dense. Rata-rata orang hanya punya ratusan teman dari jutaan pengguna, sehingga sebagian besar slot di adjacency matrix akan kosong (boros). <strong>Adjacency List</strong> jauh lebih efisien untuk kasus ini.</p>
            </div>
            <div class="info-card border-l-4 border-l-red-500">
                <h5>Simple Graph vs Multigraph</h5>
                <p><strong>Benar untuk Simple Graph:</strong> Dalam graf sederhana, sebuah edge hanya menghubungkan dua simpul berbeda dan tidak boleh menghubungkan simpul ke dirinya sendiri (self-loop). Namun, dalam <strong>multigraph</strong>, self-loop dan multi-edge diperbolehkan.</p>
            </div>
        </div>

        <h4 class="mt-4">Fakta Algoritma Graf</h4>
        <div class="grid grid-cols-1 gap-4 mt-2">
            <div class="info-card border-l-4 border-l-green-500">
                <h5>Prim pada Graf Disconnected</h5>
                <p><strong>Benar:</strong> Algoritma Prim <strong>tidak akan menghasilkan pohon</strong> jika graf disconnected, karena Prim hanya bisa menjangkau node dalam satu komponen terhubung saja. Hasilnya bukan spanning tree dari seluruh graf.</p>
            </div>
            <div class="info-card border-l-4 border-l-blue-500">
                <h5>Kruskal pada Graf Disconnected</h5>
                <p><strong>Benar:</strong> Algoritma Kruskal <strong>menghasilkan forest</strong> (hutan, yaitu kumpulan tree) jika graf disconnected. Kruskal mengurutkan semua edge secara global dan menambahkan satu per satu, sehingga setiap komponen terhubung mendapat spanning tree-nya sendiri.</p>
            </div>
            <div class="info-card border-l-4 border-l-purple-500">
                <h5>Cycle Detection: BFS dan DFS</h5>
                <p><strong>Salah jika dikatakan hanya satu yang bisa.</strong> Baik <strong>BFS maupun DFS</strong> sama-sama dapat mendeteksi siklus dalam graf. DFS mendeteksi siklus melalui <em>back edge</em>, sedangkan BFS mendeteksi siklus ketika menemukan tetangga yang sudah dikunjungi dan bukan parent-nya.</p>
            </div>
            <div class="info-card border-l-4 border-l-orange-500">
                <h5>Dijkstra dan Siklus</h5>
                <p><strong>Benar:</strong> Dijkstra <strong>membolehkan adanya siklus</strong> dalam graf, asalkan semua bobot edge bernilai <strong>positif</strong>. Siklus dengan bobot positif tidak akan memperpendek jalur, sehingga tidak menjadi masalah. Yang tidak boleh hanya <strong>siklus berbobot negatif</strong>.</p>
            </div>
            <div class="info-card border-l-4 border-l-red-500">
                <h5>Bellman-Ford dan Siklus</h5>
                <p><strong>Fakta:</strong> Bellman-Ford sebenarnya <strong>memperkenankan siklus</strong>, bahkan bisa <strong>mendeteksi siklus berbobot negatif</strong>. Ia bekerja dengan melakukan relaksasi V-1 kali. Jika setelah V-1 iterasi masih ada relaksasi yang berhasil, berarti ada siklus negatif. Jadi pernyataan "Bellman-Ford tidak memperkenankan siklus" adalah <strong>salah</strong>.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="6. Operasi dan Query Dasar">
        <p>Beberapa operasi standar yang sering dilakukan pada graf:</p>
        <ul>
            <li><code>size(V)</code>: Mendapatkan jumlah vertex <MathBlock latex="|V|" displayMode={false} />.</li>
            <li><code>size(E)</code>: Mendapatkan jumlah edge <MathBlock latex="|E|" displayMode={false} />.</li>
            <li><code>degree(v)</code>: Jumlah edge yang terhubung ke vertex <MathBlock latex="v" displayMode={false} />.</li>
            <li><code>neighbors(v)</code>: Daftar vertex yang terhubung langsung dengan <MathBlock latex="v" displayMode={false} />.</li>
            <li><code>is_edge(u, v)</code>: Mengecek apakah ada hubungan langsung antara <MathBlock latex="u" displayMode={false} /> dan <MathBlock latex="v" displayMode={false} />.</li>
        </ul>
    </NoteSection>

    <NoteSection title="6. Penelusuran Graf (Graph Traversal)">
        <p>Ada dua algoritma standar untuk mengunjungi setiap node dalam graf:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border p-4 rounded-lg">
                <h3>Breadth First Search (BFS)</h3>
                <p>Menelusuri graf lapis demi lapis (level-order).</p>
                <ul>
                    <li><strong>Struktur Data:</strong> Queue (FIFO).</li>
                    <li><strong>Kompleksitas:</strong> <MathBlock latex="O(V + E)" displayMode={false} />.</li>
                    <li><strong>Properti:</strong> Menjamin jalur terpendek pada graf unweighted.</li>
                </ul>
                <CodeBlock language="text" filename="bfs_pseudocode.txt" code={`proc BFS(G, s)
    Initialize(G, s)
    Clear(Q)
    Enqueue(Q, s)
    while not Empty(Q) do
        u := Dequeue(Q)
        forall v in Neighbor(G, u) do
            if v.status == UNPROCESSED then
                v.status := INPROCESS
                v.value := u.value + 1
                v.parent := u
                Enqueue(Q, v)
            endif
        endfor
        u.status := PROCESSED
    endwhile

proc Initialize(G, s)
    forall v in V(G) do
        v.status := UNPROCESSED
        v.value := INFINITY
        v.parent := NIL
    endfor
    s.value := 0
    s.status := INPROCESS`} />
                <Callout type="tip" title="Observasi Antrian BFS">
                    Pada setiap saat dalam antrian BFS, hanya akan ada maksimal <strong>dua nilai jarak</strong> yang berbeda, dan nilai-nilai tersebut pasti berurutan (misal: semua node berjarak 3 atau 4).
                </Callout>

                <div class="info-card mt-4">
                    <strong>Karakteristik BFS:</strong>
                    <ul>
                        <li><strong>Kompleksitas Waktu:</strong> O(V + E)</li>
                        <li><strong>Kompleksitas Ruang:</strong> O(V) untuk menyimpan antrian dan status.</li>
                    </ul>
                    <strong>Keunggulan:</strong>
                    <ul>
                        <li>Menjamin jalur terpendek pada graf <strong>unweighted</strong>.</li>
                        <li>Cocok untuk menemukan semua node pada jarak tertentu dari sumber.</li>
                    </ul>
                    <strong>Limitasi:</strong>
                    <ul>
                        <li>Tidak bisa menangani graf berbobot (semua edge harus bernilai sama).</li>
                        <li>Memori lebih besar dari DFS karena menyimpan seluruh lapisan sekaligus.</li>
                    </ul>
                </div>

                <div class="mt-6">
                    <h4>Simulasi Interaktif BFS</h4>
                    <BFSSimulator />
                </div>
            </div>
            <div class="border p-4 rounded-lg">
                <h3>Depth First Search (DFS)</h3>
                <p>Menelusuri graf sedalam mungkin ke satu cabang sebelum kembali (backtrack).</p>
                <ul>
                    <li><strong>Struktur Data:</strong> Stack atau Rekursi.</li>
                    <li><strong>Kompleksitas:</strong> <MathBlock latex="O(V + E)" displayMode={false} />.</li>
                    <li><strong>Kegunaan:</strong> Topological sort, cycle detection, finding longest path in DAG.</li>
                </ul>
                <CodeBlock language="text" filename="dfs_pseudocode.txt" code={`proc DFS(G, s)
    Initialize(G, s)
    time := 0
    Clear(S)
    Push(S, s)
    while not Empty(S) do
        u := Pop(S)
        if u.status != PROCESSED then
            forall v in Neighbor(G, s) do
                if v.status == UNPROCESSED then
                    v.status := INPROCESS
                    v.stime := time++
                    Push(S, v)
                endif
            endfor
            u.status := PROCESSED
        endif
    endwhile

proc Initialize(G, s)
    forall v in V(G) do
        v.status := UNPROCESSED
        v.parent := NIL
    endfor
    s.status := INPROCESS`} />
                <Callout type="info" title="Aplikasi DFS Lainnya">
                    Selain penelusuran biasa, DFS sangat kuat untuk <strong>Branch and Bound</strong>, mencari <strong>Connected Components</strong>, dan <strong>Tree Traversal</strong>.
                </Callout>

                <div class="info-card mt-4">
                    <strong>Karakteristik DFS:</strong>
                    <ul>
                        <li><strong>Kompleksitas Waktu:</strong> O(V + E)</li>
                        <li><strong>Kompleksitas Ruang:</strong> O(V) untuk stack (atau O(h) jika rekursif, h = tinggi pohon).</li>
                    </ul>
                    <strong>Keunggulan:</strong>
                    <ul>
                        <li>Hemat memori dibanding BFS karena hanya menyimpan satu cabang.</li>
                        <li>Cocok untuk masalah yang butuh eksplorasi mendalam: <strong>Topological Sort</strong>, <strong>Cycle Detection</strong>, dan <strong>Strongly Connected Components</strong>.</li>
                    </ul>
                    <strong>Limitasi:</strong>
                    <ul>
                        <li><strong>Tidak menjamin</strong> jalur terpendek.</li>
                        <li>Bisa terjebak di cabang tak berujung (infinite branch) pada graf tak terhingga.</li>
                    </ul>
                </div>

                <div class="mt-6">
                    <h4>Simulasi Interaktif DFS</h4>
                    <DFSSimulator />
                </div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="7. Algoritma Dasar Lanjutan">
        
        <h3>Dijkstra (Shortest Path)</h3>
        <p>Mencari jalur terpendek dari satu titik asal (single-source) ke semua titik lainnya pada graf <strong>berbobot positif</strong>.</p>
        
        <div class="info-card bg-blue-50 mb-4">
            <h4>Bagaimana Ia Bekerja?</h4>
            <p class="text-sm italic mb-2"><strong>Analogi Sederhana:</strong> Bayangkan kamu sedang mencari jalan dari rumah ke kampus lewat Google Maps. Ada banyak pilihan jalan, tapi kamu mau pilih yang paling cepat (total waktu paling sedikit). Dijkstra bakal ngecek semua kemungkinan jalan tersebut dan memastikan kamu dapet rute paling "hemat" biaya/waktu.</p>
            <ol>
                <li><strong>Inisialisasi:</strong> Semua node diberi jarak tak terhingga (<MathBlock latex={String.raw`\infty`} displayMode={false} />), kecuali asal yang bernilai 0.</li>
                <li><strong>Greedy Choice:</strong> Ambil node dengan jarak terkecil dari antrian prioritas (Priority Queue).</li>
                <li><strong>Relaksasi (Relaxation):</strong> Cek semua tetangga. Jika lewat node saat ini menghasilkan jalur yang lebih pendek, update nilai jarak node tetangga tersebut.</li>
                <li><strong>Selesai:</strong> Ulangi sampai semua node diproses.</li>
            </ol>
        </div>

        <Callout type="warning" title="Siklus dan Bobot Negatif">
            Jalur terpendek tidak memerlukan kunjungan node lebih dari sekali (loop) jika bobot positif. Namun, jika ada siklus berbobot negatif, algoritma Dijkstra tidak dapat digunakan karena jalur bisa menjadi "tak terhingga" pendeknya.
        </Callout>
        <Callout type="info" title="Triangle Inequality">
            Jarak <MathBlock latex={"\\delta(s, v)"} displayMode={false} /> tidak akan pernah lebih besar dari <MathBlock latex={"\\delta(s, u) + d(u, v)"} displayMode={false} />. Prinsip inilah yang digunakan dalam relaksasi edge.
        </Callout>
        <div class="mt-4 mb-8">
            <h4>Simulasi Interaktif Dijkstra</h4>
            <DijkstraSimulator />
        </div>

        <div class="info-card mt-4">
            <strong>Karakteristik Dijkstra:</strong>
            <ul>
                <li><strong>Kompleksitas Waktu:</strong> O((V + E) log V) dengan Priority Queue (Binary Heap).</li>
                <li><strong>Kompleksitas Ruang:</strong> O(V) untuk menyimpan jarak dan status.</li>
                <li><strong>Tipe:</strong> Algoritma Greedy (selalu ambil yang terkecil saat ini).</li>
            </ul>
            <strong>Keunggulan:</strong>
            <ul>
                <li>Menjamin jalur terpendek pada graf berbobot <strong>positif</strong>.</li>
                <li>Sangat efisien untuk graf renggang (sparse).</li>
                <li>Bisa dioptimasi lebih lanjut dengan Fibonacci Heap menjadi O(E + V log V).</li>
            </ul>
            <strong>Limitasi:</strong>
            <ul>
                <li><strong>Tidak bisa</strong> menangani bobot negatif. Gunakan Bellman-Ford jika ada bobot negatif.</li>
                <li>Tidak cocok untuk graf dengan siklus berbobot negatif.</li>
                <li>Hanya menyelesaikan single-source shortest path (dari satu sumber saja).</li>
            </ul>
        </div>
        <CodeBlock language="text" filename="dijkstra_pseudocode.txt" code={`proc Dijkstra(G, s)
    Initialize(G, s)
    Clear(Q) // Priority Queue based on value
    Enqueue(Q, s)
    while not Empty(Q) do
        u := Dequeue(Q)
        forall v in Neighbor(G, u) do
            if v.status != PROCESSED then
                d := u.value + weight(u, v)
                if v.value > d then
                    v.value := d
                    v.parent := u
                    Requeue(Q, v)
                endif
            endif
        endfor
        u.status := PROCESSED
    endwhile

proc Initialize(G, s)
    forall v in V(G) do
        v.status := UNPROCESSED
        v.value := INFINITY
        v.parent := NIL
    endfor
    s.value := 0
    s.status := INPROCESS`} />

        <h3>Prim (Minimum Spanning Tree)</h3>
        <p>Mencari total bobot terkecil untuk menghubungkan semua node tanpa membentuk siklus.</p>

        <div class="info-card bg-green-50 mb-4">
            <h4>Bagaimana Ia Bekerja?</h4>
            <p class="text-sm italic mb-2"><strong>Analogi Sederhana:</strong> Bayangkan kamu disuruh menyambungkan kabel listrik ke 5 rumah yang berbeda. Tugasmu adalah memastikan semua rumah dapat listrik, tapi dengan total panjang kabel sesedikit mungkin biar hemat biaya. Prim bakal milih kabel terpendek satu per satu sampai semua rumah terhubung.</p>
            <ol>
                <li><strong>Mulai:</strong> Pilih satu node sembarang sebagai titik awal.</li>
                <li><strong>Grows Tree:</strong> Cari sisi (edge) dengan bobot terkecil yang menghubungkan node di dalam pohon (MST) dengan node di luar pohon.</li>
                <li><strong>Update:</strong> Tambahkan edge dan node tersebut ke dalam pohon.</li>
                <li><strong>Selesai:</strong> Ulangi sampai semua node terhubung dalam satu pohon.</li>
            </ol>
        </div>

        <div class="mt-4 mb-8">
            <h4>Simulasi Interaktif Prim</h4>
            <PrimSimulator />
        </div>
        <CodeBlock language="text" filename="prim_pseudocode.txt" code={`proc MST_Prim(G)
    s := 1 // mulai dari sembarang vertex
    Initialize(G, s)
    Clear(Q) // Priority Queue based on weight
    Enqueue(Q, s)
    while not Empty(Q) do
        u := Dequeue(Q)
        forall v in Neighbor(G, u) do
            if v.status != PROCESSED then
                if v.value > weight(u, v) then
                    v.value := weight(u, v)
                    v.parent := u
                    Requeue(Q, v)
                endif
            endif
        endfor
        u.status := PROCESSED
    endwhile

proc Initialize(G, s)
    forall v in V(G) do
        v.status := UNPROCESSED
        v.value := INFINITY
        v.parent := NIL
    endfor
    s.value := 0
    s.status := INPROCESS`} />

        <div class="info-card mt-4">
            <strong>Karakteristik Prim:</strong>
            <ul>
                <li><strong>Kompleksitas Waktu:</strong> O((V + E) log V) dengan Binary Heap.</li>
                <li><strong>Kompleksitas Ruang:</strong> O(V) untuk menyimpan status dan bobot.</li>
                <li><strong>Tipe:</strong> Algoritma Greedy (selalu pilih edge termurah).</li>
            </ul>
            <strong>Keunggulan:</strong>
            <ul>
                <li>Menjamin hasil MST yang optimal (total bobot minimum).</li>
                <li>Cocok untuk graf dense karena berbasis vertex.</li>
            </ul>
            <strong>Limitasi:</strong>
            <ul>
                <li>Hanya bekerja pada graf <strong>terhubung</strong> (connected). Jika graf tidak terhubung, hasilnya hanya spanning tree dari satu komponen.</li>
                <li>Tidak bisa menangani directed graph (hanya undirected).</li>
                <li>Untuk graf sparse, Kruskal bisa lebih efisien.</li>
            </ul>
        </div>
    </NoteSection>

    <NoteSection title="8. Aplikasi Algoritma Graf">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="info-card border-l-4 border-l-blue-500">
                <h5>Cycle Detection</h5>
                <p class="text-sm">Mendeteksi adanya putaran (loop) dalam graf. Sangat penting untuk mencegah *deadlock* atau mengecek validitas struktur data.</p>
            </div>
            <div class="info-card border-l-4 border-l-purple-500">
                <h5>Topological Sort</h5>
                <p class="text-sm">Mengurutkan node berdasarkan ketergantungan (hanya untuk DAG). Contoh: Urutan mata kuliah prasyarat.</p>
            </div>
            <div class="info-card border-l-4 border-l-orange-500">
                <h5>Connected Components</h5>
                <p class="text-sm">Menentukan kelompok node yang terisolasi atau saling terhubung satu sama lain dalam jaringan besar.</p>
            </div>
            <div class="info-card border-l-4 border-l-green-500">
                <h5>Euler & Hamilton Path</h5>
                <p class="text-sm">Mencari lintasan yang mengunjungi setiap edge tepat satu kali (Euler) atau setiap vertex tepat satu kali (Hamilton).</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Latihan Cepat">
        <Quiz questions={materiQuiz} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali ke Algoritma Lanjut" />
</article>

<style>
    .grid {
        display: grid;
    }
    @media (min-width: 768px) {
        .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .border { border: 1px solid var(--border-color, #ccc); }
    .p-4 { padding: 1rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .mt-6 { margin-top: 1.5rem; }

    .matrix-table {
        border-collapse: collapse;
        margin: 1rem 0;
        width: 100%;
        max-width: 500px;
    }
    .matrix-table th, .matrix-table td {
        border: 1px solid var(--border-color, #ccc);
        padding: 0.5rem;
        text-align: center;
    }
    .matrix-table th { background: var(--bg-secondary, #f0f0f5); }
    
    .info-card {
        padding: 1rem;
        background: var(--card-bg, #fff);
        border: 1px solid var(--border-color, #eee);
        border-radius: 8px;
    }
    .bg-blue-50 { background: #f0f7ff; border-color: #cce3ff; }
    .bg-green-50 { background: #f2fff5; border-color: #cdf7d5; }
    .mt-4 { margin-top: 1rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .text-sm { font-size: 0.875rem; }
    .italic { font-style: italic; }
    .border-l-orange-500 { border-left-color: #ff9500; }
    .border-t-4 { border-top-width: 4px; }
    .border-t-red-500 { border-top-color: #ff3b30; }
    .border-t-blue-500 { border-top-color: #007aff; }
    .border-l-4 { border-left-width: 4px; border-left-style: solid; }
    .border-l-blue-500 { border-left-color: #007aff; }
    .border-l-purple-500 { border-left-color: #5856d6; }
    .border-l-green-500 { border-left-color: #4cd964; }
    .border-l-red-500 { border-left-color: #ff3b30; }
    .mt-2 { margin-top: 0.5rem; }
    @media (min-width: 768px) {
        .md\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>
