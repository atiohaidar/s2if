<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import BlindSearchTreeVisualizer from "./components/BlindSearchTreeVisualizer.svelte";

    const algorithms = [
        { name: "BFS", full: "Breadth-First Search", icon: "↔️", desc: "Eksplorasi level per level.", tags: ["FIFO", "Optimal"] },
        { name: "DFS", full: "Depth-First Search", icon: "↕️", desc: "Eksplorasi sedalam mungkin.", tags: ["LIFO", "Hemat Memori"] },
        { name: "DLS", full: "Depth-Limited Search", icon: "🛑", desc: "DFS dengan batas kedalaman.", tags: ["Batas L"] },
        { name: "IDS", full: "Iterative Deepening Search", icon: "🔄", desc: "BFS rasa DFS (Terbaik).", tags: ["Optimal", "Hemat"] },
        { name: "UCS", full: "Uniform Cost Search", icon: "💰", desc: "Pilih jalur biaya terendah.", tags: ["Dijkstra-ish"] },
        { name: "BDS", full: "Bi-Directional Search", icon: "🤝", desc: "Cari dari start & goal sekaligus.", tags: ["Efisien"] }
    ];
</script>

<svelte:head>
    <title>Blind Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Blind Search (Uninformed Search)"
        date="24 April 2026"
        status="done"
        tags={["BFS", "DFS", "UCS", "IDS"]}
    />

    <NoteSection title="Konsep Dasar: Ruang Keadaan (State Space)">
        <p class="section-intro">
            Sebelum menjalankan algoritma, masalah AI harus dimodelkan ke dalam <strong>State Space</strong>. 
            Searching adalah proses menemukan urutan aksi dari <em>Initial State</em> ke <em>Goal State</em>.
        </p>
        <div class="state-grid">
            <div class="state-card">
                <span class="label">Initial State</span>
                <strong>Kondisi Awal</strong>
                <p>Titik mulai (misal: semua wadah kosong).</p>
            </div>
            <div class="state-card">
                <span class="label">Operators</span>
                <strong>Aksi/Aturan</strong>
                <p>Langkah legal untuk pindah antar state.</p>
            </div>
            <div class="state-card">
                <span class="label">Goal Test</span>
                <strong>Kondisi Akhir</strong>
                <p>Pengecekan apakah state saat ini adalah tujuan.</p>
            </div>
            <div class="state-card">
                <span class="label">Path Cost</span>
                <strong>Biaya Jalur</strong>
                <p>Total usaha/biaya untuk mencapai goal.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kriteria Evaluasi Algoritma">
        <div class="perf-grid">
            <div class="perf-item">
                <strong>Completeness</strong>
                <p>Apakah algoritma dijamin menemukan solusi jika ada?</p>
            </div>
            <div class="perf-item">
                <strong>Optimality</strong>
                <p>Apakah solusi yang ditemukan adalah jalur termurah?</p>
            </div>
            <div class="perf-item">
                <strong>Time Complexity</strong>
                <p>Berapa lama waktu yang dibutuhkan? (Notasi Big-O)</p>
            </div>
            <div class="perf-item">
                <strong>Space Complexity</strong>
                <p>Berapa banyak memori yang dipakai? (Node di frontier)</p>
            </div>
        </div>
        <Callout type="info">
            Variabel notasi: <strong>b</strong> (branching factor), <strong>d</strong> (depth of solution), <strong>m</strong> (max depth).
        </Callout>
    </NoteSection>

    <NoteSection title="Daftar Algoritma Blind Search">
        <div class="algo-grid">
            {#each algorithms as algo}
                <div class="algo-card">
                    <div class="algo-header">
                        <span class="algo-icon">{algo.icon}</span>
                        <h3>{algo.name}</h3>
                    </div>
                    <p class="algo-full">{algo.full}</p>
                    <p>{algo.desc}</p>
                    <div class="algo-tags">
                        {#each algo.tags as tag}
                            <span>{tag}</span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </NoteSection>

    <NoteSection title="Visualisasi Interaktif">
        <p>Bandingkan perilaku BFS, DFS, dan UCS pada tree yang sama:</p>
        <BlindSearchTreeVisualizer />
    </NoteSection>

    <NoteSection title="1. Breadth-First Search (BFS)">
        <p>Eksplorasi menyebar level demi level. Menggunakan struktur data <strong>Queue (FIFO)</strong>.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Masukkan node awal ke <strong>Queue</strong>.</li>
                    <li>Ambil node terdepan, cek apakah Goal.</li>
                    <li>Jika bukan, masukkan semua tetangganya ke belakang Queue.</li>
                    <li>Ulangi sampai Goal ketemu atau Queue kosong.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Complete:</strong> Pasti ketemu solusinya kalau ada.</li>
                    <li><strong>Optimal:</strong> Menemukan jalur terpendek (step terkecil).</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Memori Boros:</strong> Harus simpan semua node di setiap level (Eksponensial).</li>
                    <li>Penggunaan memori bisa <strong>melebihi kapasitas</strong> jika state space terlalu luas.</li>
                </ul>
            </div>
        </div>

        <div class="memory-note">
            <h4>💡 Kenapa Memorinya bᵈ?</h4>
            <p>
                Banyak yang bingung: <em>"Kalau level 1 ada 2 node, kenapa parent-nya nggak ikut dihitung?"</em>
            </p>
            <p>
                Karena BFS pakai sistem <strong>Antrean (Queue)</strong>. Sebelum anak-anak dimasukkan, si Parent sudah <strong>dikeluarkan (pop)</strong> dari antrean untuk diproses. Jadi, memori BFS itu sebenarnya menghitung <strong>jumlah node terbanyak yang sedang 'antre' di saat bersamaan</strong>, yaitu node-node di level paling bawah.
            </p>
        </div>
    </NoteSection>

    <NoteSection title="2. Depth-First Search (DFS)">
        <p>Menelusuri satu cabang sampai mentok sebelum pindah ke cabang lain. Menggunakan <strong>Stack (LIFO)</strong>.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Masukkan node awal ke <strong>Stack</strong>.</li>
                    <li>Ambil node teratas, cek apakah Goal.</li>
                    <li>Jika bukan, masukkan tetangganya ke Stack.</li>
                    <li>Jika buntu, <strong>Backtrack</strong> ke node sebelumnya di Stack.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Irit Memori:</strong> Cuma simpan node di jalur yang sedang dilewati (Linear).</li>
                    <li>Cepat nemu solusi kalau solusinya ada di cabang yang dalam.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Tidak Complete:</strong> Bisa nyasar selamanya di cabang tak terhingga (Infinite Path).</li>
                    <li><strong>Tidak Optimal:</strong> Belum tentu jalur yang ketemu itu yang terpendek.</li>
                </ul>
            </div>
        </div>

        <div class="memory-note">
            <h4>💡 Kenapa DFS Irit Memori?</h4>
            <p>
                Berbeda dengan BFS yang "nyapu rata", DFS cuma perlu ingat <strong>jalur yang lagi dia lewatin</strong> sekarang (dari Root sampai ke node saat ini). Dia nggak perlu simpan tetangga-tetangganya di level yang sama. Itulah kenapa memorinya cuma <strong>Linear O(bm)</strong>, bukan eksponensial.
            </p>
        </div>
    </NoteSection>

    <NoteSection title="3. Uniform Cost Search (UCS)">
        <p>Digunakan jika setiap jalur memiliki biaya berbeda. Menggunakan <strong>Priority Queue</strong> berdasarkan total cost terkecil.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Gunakan <strong>Priority Queue</strong>, urutkan berdasarkan biaya terkecil (g).</li>
                    <li>Selalu ambil node dengan total biaya paling murah dari start.</li>
                    <li>Update biaya tetangga kalau ketemu jalur yang lebih murah.</li>
                    <li>Goal dicek saat node <strong>dihapus</strong> dari queue, bukan saat dimasukkan.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Pasti Optimal:</strong> Menemukan jalur dengan biaya termurah (bukan cuma step tersedikit).</li>
                    <li>Complete jika biaya tiap step > 0.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Eksponensial:</strong> Masih makan banyak memori dan waktu kalau solusinya jauh.</li>
                    <li>Bisa terjebak loop kalau ada biaya nol/negatif.</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="4. Depth-Limited Search (DLS)">
        <p>Sama seperti DFS, tapi diberikan batas kedalaman (Limit) agar tidak nyasar terlalu jauh.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Jalankan DFS seperti biasa.</li>
                    <li>Tentukan <strong>Limit = L</strong>.</li>
                    <li>Jika sudah sampai kedalaman <strong>L</strong>, jangan buka node di bawahnya lagi.</li>
                    <li>Anggap jalan buntu dan lakukan backtrack.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Irit Memori:</strong> Sama iritnya dengan DFS.</li>
                    <li>Menghindari masalah <em>Infinite Path</em> (jalur tak terhingga).</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Tidak Complete:</strong> Jika goal ada di kedalaman d > L, maka goal nggak akan pernah ketemu.</li>
                    <li>Butuh pengetahuan awal soal berapa kedalaman solusinya.</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="5. Iterative Deepening Search (IDS)">
        <p>
            <strong>IDS</strong> adalah solusi kalau kita mau se-optimal BFS tapi mau se-irit DFS. 
        </p>

        <Callout type="tip">
            <strong>Analogi Detektif di Gedung 10 Lantai:</strong>
            <ul>
                <li><strong>Gaya BFS:</strong> Kamu kerahkan 100 polisi buat ngecek semua ruangan di Lantai 1 barengan. (Butuh banyak pasukan = <strong>RAM Penuh</strong>).</li>
                <li><strong>Gaya DFS:</strong> Kamu suruh 1 polisi lari kenceng langsung ke Lantai 10. (Cuma butuh 1 orang, tapi <strong>Bisa Nyasar/Lama</strong>).</li>
                <li><strong>Gaya IDS:</strong> Kamu suruh 1 polisi cek Lantai 1. Nggak ada? Suruh dia balik, lalu cek sampai Lantai 2. Nggak ada? Balik lagi, cek sampai Lantai 3.</li>
            </ul>
        </Callout>

        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Jalankan DLS dengan <strong>Limit = 0</strong>.</li>
                    <li>Kalau belum ketemu, jalankan lagi DLS dengan <strong>Limit = 1</strong>.</li>
                    <li>Naikkan limit terus sampai Goal ditemukan.</li>
                    <li>Setiap ganti limit, pencarian diulang dari Root.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Irit & Optimal:</strong> Cuma butuh 1 jalur memori (kayak DFS) tapi dapet jalur terpendek (kayak BFS).</li>
                    <li>Paling stabil buat pohon yang cabangnya banyak banget.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Waktu:</strong> Ada waktu yang terbuang buat ngecek ulang node yang sama.</li>
                </ul>
            </div>
        </div>

        <div class="ids-why">
            <h4>💡 Kenapa Harus Ngulang dari Root?</h4>
            <p>
                Mungkin kamu mikir: <em>"Kenapa nggak lanjutin aja dari level terakhir? Kok harus repot-repot ngulang dari atas lagi pas limitnya naik?"</em>
            </p>
            <div class="logic-box">
                <p><strong>Jawabannya: Memori.</strong></p>
                <p>
                    Kalau kamu mau "melanjutkan" tanpa mengulang, kamu harus <strong>mengingat (menyimpan di RAM)</strong> semua node yang ada di level sebelumnya supaya tahu mana yang harus dilanjutin. Kalau kamu simpan semuanya, selamat... kamu baru saja mengubah IDS menjadi <strong>BFS</strong> (yang boros memori itu).
                </p>
                <p>
                    Dengan cara <strong>ngulang dari awal</strong>, komputer cuma perlu nginget jalur yang lagi dia lewatin doang (kayak DFS). Memori tetap irit, tapi kita tetep dapet hasil yang optimal. 
                </p>
                <p class="highlight-text">
                    <strong>Prinsipnya:</strong> Lebih baik komputer "kerja lembur" buat ngulang jalan (CPU) daripada programnya "mati" karena kehabisan tempat penyimpanan (RAM).
                </p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="6. Bi-Directional Search (BDS)">
        <p>Mencari dari dua sisi sekaligus: dari <strong>Start</strong> maju ke depan, dan dari <strong>Goal</strong> mundur ke belakang.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Jalankan dua pencarian (biasanya BFS) secara bersamaan.</li>
                    <li>Pencarian 1: Mulai dari <strong>Start</strong>.</li>
                    <li>Pencarian 2: Mulai dari <strong>Goal</strong>.</li>
                    <li>Berhenti saat kedua pencarian <strong>bertemu di tengah</strong>.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Sangat Cepat:</strong> Mengurangi kompleksitas waktu secara drastis (dari bᵈ jadi bᵈ/²).</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Syarat Berat:</strong> Goal harus spesifik dan aksi harus bisa dibalik (reversible).</li>
                    <li>Butuh memori buat simpan kedua frontier.</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Tabel Perbandingan Performa">
        <div class="table-wrap">
            <table class="recap-table comparison">
                <thead>
                    <tr>
                        <th></th>
                        <th>BFS</th>
                        <th>DFS</th>
                        <th>DLS</th>
                        <th>IDS</th>
                        <th>UCS</th>
                        <th>BDS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Complete</strong></td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-mid">If <em>l > d</em></td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-good">Yes</td>
                    </tr>
                    <tr>
                        <td><strong>Optimum</strong></td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-good">Yes</td>
                    </tr>
                    <tr>
                        <td><strong>Memory</strong></td>
                        <td class="cell-bad">High (bᵈ⁺¹)</td>
                        <td class="cell-good">Low (bm)</td>
                        <td class="cell-good">Low (bl)</td>
                        <td class="cell-good">Low (bd)</td>
                        <td class="cell-bad">High (bᵈ)</td>
                        <td class="cell-mid">High (bᵈ/²)</td>
                    </tr>
                    <tr>
                        <td><strong>Time</strong></td>
                        <td class="cell-mid">bᵈ⁺¹</td>
                        <td class="cell-bad">bᵐ</td>
                        <td class="cell-mid">bˡ</td>
                        <td class="cell-mid">bᵈ</td>
                        <td class="cell-mid">bᵈ</td>
                        <td class="cell-good">bᵈ/²</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="table-footnote">Indikator: <span class="dot-legend good"></span> Bagus | <span class="dot-legend mid"></span> Cukup | <span class="dot-legend bad"></span> Kurang</p>
    </NoteSection>

    <NoteSection title="Contoh Kasus: Water Jug Problem">
        <p>Menuangkan air tepat 2 gallon ke wadah 3-gal menggunakan wadah 4-gal dan 3-gal.</p>
        <div class="jug-example">
            <div class="jug-states">
                <div class="step-line"><span>(0,0)</span> ➔ Start</div>
                <div class="step-line"><span>(0,3)</span> ➔ Fill 3-gal</div>
                <div class="step-line"><span>(3,0)</span> ➔ Pour 3 to 4</div>
                <div class="step-line"><span>(3,3)</span> ➔ Fill 3-gal</div>
                <div class="step-line"><span>(4,2)</span> ➔ Pour 3 to 4 (Goal!)</div>
                <div class="step-line highlight"><span>Goal: (*,2)</span></div>
            </div>
            <div class="jug-note">
                <strong>Analisis:</strong>
                <ul>
                    <li><strong>State:</strong> (isi wadah 4, isi wadah 3)</li>
                    <li><strong>Operators:</strong> Fill, Empty, Pour.</li>
                    <li><strong>Kenapa Searching?</strong> Karena dari (0,0) ada banyak cabang aksi. Blind search akan mencoba satu-satu sampai ketemu (4,2) atau (0,2).</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kuis Tantangan: Uji Pemahaman">
        <Quiz 
            title="Quiz Blind Search"
            questions={[
                {
                    question: "Manakah alasan utama BFS hampir tidak pernah digunakan untuk masalah dunia nyata dengan ruang keadaan (state space) yang sangat besar?",
                    options: [
                        "Waktu pencarian yang sangat lambat dibanding DFS.",
                        "Konsumsi memori O(bᵈ) yang melebihi kapasitas jauh sebelum waktu pencarian habis.",
                        "Ketidakmampuan BFS dalam menjamin solusi optimal.",
                        "BFS sering terjebak dalam loop tak terbatas pada graph dengan cycle."
                    ],
                    correctIndex: 1,
                    explanation: "Memory adalah bottleneck utama BFS. Pada pohon dengan branching factor 10 dan kedalaman 10, BFS membutuhkan memori yang sangat besar untuk menyimpan frontier, sementara DFS hanya membutuhkan memori linear O(bm)."
                },
                {
                    question: "IDS (Iterative Deepening Search) melakukan ekspansi ulang pada level yang sama berkali-kali. Mengapa ini tetap dianggap efisien?",
                    options: [
                        "Karena IDS menggunakan memori yang sama besarnya dengan BFS.",
                        "Karena node pada level terdalam mendominasi total jumlah ekspansi, sehingga overhead ekspansi ulang level atas relatif kecil.",
                        "Karena IDS menjamin solusi yang lebih optimal daripada UCS.",
                        "Karena IDS tidak memerlukan struktur data Stack maupun Queue."
                    ],
                    correctIndex: 1,
                    explanation: "Meskipun ada redundansi, jumlah node di level terakhir d adalah bᵈ, sementara total node di level-level sebelumnya jauh lebih sedikit. Secara asimtotik, waktu IDS tetap O(bᵈ) namun dengan memori O(bd)."
                },
                {
                    question: "Dalam kondisi apa Uniform Cost Search (UCS) dapat kehilangan sifat optimality-nya?",
                    options: [
                        "Jika terdapat edge dengan biaya (cost) nol atau negatif.",
                        "Jika branching factor b bersifat dinamis.",
                        "Jika graph memiliki banyak goal state.",
                        "Jika kedalaman solusi d sangat besar."
                    ],
                    correctIndex: 0,
                    explanation: "UCS (mirip Dijkstra) mengasumsikan biaya jalur selalu meningkat. Jika ada cost negatif, node yang sudah 'selesai' diekspansi mungkin memiliki jalur lebih murah yang baru ditemukan nanti."
                },
                {
                    question: "Jika Anda memiliki limit kedalaman L=10 pada DLS, namun goal sebenarnya berada pada kedalaman d=11, apa yang akan terjadi?",
                    options: [
                        "Algoritma akan memberikan solusi suboptimal.",
                        "Algoritma akan terus berjalan selamanya.",
                        "Algoritma akan melaporkan kegagalan (failure) tanpa menemukan goal.",
                        "Algoritma akan secara otomatis meningkatkan limit menjadi 11."
                    ],
                    correctIndex: 2,
                    explanation: "DLS bersifat 'blind' terhadap apa pun di bawah limit L. Jika goal > L, DLS akan berhenti dan melaporkan tidak ada solusi pada ruang yang dicari."
                },
                {
                    question: "Apa syarat utama agar Bi-Directional Search (BDS) bisa diimplementasikan pada suatu masalah?",
                    options: [
                        "Branching factor b harus bernilai 1.",
                        "State space harus tidak terbatas (infinite).",
                        "Goal state harus diketahui secara spesifik dan operator harus dapat dibalik (reversible).",
                        "Algoritma harus menggunakan fungsi heuristik."
                    ],
                    correctIndex: 2,
                    explanation: "BDS membutuhkan pencarian mundur dari goal. Jika goal tidak spesifik (misal: 'setiap state yang genap') atau aksi tidak bisa dibalik (misal: 'hanya bisa maju'), maka BDS tidak bisa dilakukan."
                },
                {
                    question: "Pada graph yang memiliki jalur tidak terhingga (infinite paths), manakah algoritma yang dijamin GAGAL (tidak complete) meskipun solusi sebenarnya ada?",
                    options: [
                        "BFS",
                        "DFS",
                        "IDS",
                        "UCS (dengan biaya tiap langkah > 0)"
                    ],
                    correctIndex: 1,
                    explanation: "DFS akan terus menelusuri satu cabang sampai ke kedalaman tak terhingga. Jika goal berada di cabang lain, DFS tidak akan pernah 'backtrack' ke cabang tersebut. BFS, IDS, dan UCS tetap complete karena mereka mengeksplorasi berdasarkan kedalaman atau biaya yang meningkat."
                },
                {
                    question: "Jika sebuah pohon memiliki branching factor b=2 dan solusi berada di kedalaman d=3, berapa jumlah node maksimal yang harus disimpan di memori (frontier) saat menggunakan BFS?",
                    options: [
                        "4 node",
                        "8 node",
                        "15 node",
                        "16 node"
                    ],
                    correctIndex: 1,
                    explanation: "Pada BFS, frontier menyimpan semua node pada kedalaman tertentu. Untuk d=3 dengan b=2, jumlah node di level tersebut adalah 2³ = 8 node."
                },
                {
                    question: "Kapan algoritma UCS (Uniform Cost Search) akan berperilaku persis sama dengan BFS?",
                    options: [
                        "Ketika graph tidak memiliki cycle.",
                        "Ketika semua edge memiliki biaya (path cost) yang sama (unit cost).",
                        "Ketika goal state berada di kedalaman yang sangat dangkal.",
                        "Ketika branching factor b bernilai 1."
                    ],
                    correctIndex: 1,
                    explanation: "Jika semua cost sama (misal: 1), maka urutan prioritas berdasarkan 'biaya terendah' pada UCS akan sama persis dengan urutan 'level terendah' pada BFS."
                },
                {
                    question: "Dalam pemodelan '8-puzzle' sebagai searching problem, manakah yang paling tepat didefinisikan sebagai Operator?",
                    options: [
                        "Memindahkan angka ke posisi target secara langsung.",
                        "Menggeser ubin kosong (blank space) ke atas, bawah, kiri, atau kanan.",
                        "Menghitung jumlah ubin yang salah posisi.",
                        "Menukar posisi dua ubin sembarang yang diinginkan."
                    ],
                    correctIndex: 1,
                    explanation: "Operator adalah aksi legal yang mengubah satu state ke state lain. Dalam 8-puzzle, kita hanya bisa menggeser angka ke ruang kosong, atau secara teknis menggeser 'ruang kosong' itu sendiri."
                },
                {
                    question: "Di antara algoritma berikut, manakah yang memiliki Space Complexity paling efisien untuk pohon yang sangat dalam namun memiliki branching factor yang kecil?",
                    options: [
                        "BFS",
                        "IDS",
                        "DFS",
                        "BDS"
                    ],
                    correctIndex: 2,
                    explanation: "DFS memiliki space complexity O(bm) di mana m adalah kedalaman maksimum. Jika b kecil, memori yang dibutuhkan sangat sedikit dibanding BFS/UCS yang bersifat eksponensial terhadap kedalaman solusi d."
                }
            ]}
        />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .section-intro { margin-bottom: 1.5rem; color: var(--color-ink-soft); }

    .state-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .state-card {
        background: var(--color-surface-soft);
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .state-card .label {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--color-binder);
        display: block;
        margin-bottom: 0.25rem;
    }
    .state-card strong { display: block; font-size: 1rem; margin-bottom: 0.5rem; }
    .state-card p { font-size: 0.85rem; color: var(--color-ink-soft); margin: 0; }

    .perf-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 1rem 0;
    }
    .perf-item {
        background: var(--color-surface-elevated);
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid var(--color-line);
    }
    .perf-item strong { display: block; font-size: 0.95rem; margin-bottom: 0.25rem; }
    .perf-item p { font-size: 0.85rem; color: var(--color-ink-soft); margin: 0; }

    .algo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .algo-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        transition: all 0.2s ease;
    }
    .algo-card:hover { border-color: var(--color-binder); transform: translateY(-3px); }
    .algo-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
    .algo-icon { font-size: 1.5rem; }
    .algo-card h3 { margin: 0; font-size: 1.2rem; color: var(--color-binder); }
    .algo-full { font-size: 0.8rem; font-weight: 700; color: var(--color-ink-soft); margin-bottom: 0.75rem; }
    .algo-card p { font-size: 0.85rem; line-height: 1.4; margin-bottom: 1rem; }
    .algo-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .algo-tags span { font-size: 0.7rem; background: var(--color-line); padding: 2px 8px; border-radius: 6px; font-weight: 700; }

    .method-box {
        background: var(--color-surface-elevated);
        padding: 1.25rem;
        border-radius: 12px;
        margin-bottom: 1rem;
        border: 1px solid var(--color-line);
    }
    .method-box h4 { margin-top: 0; color: var(--color-binder); }
    .method-box ol { margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; }

    .algo-detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .detail-box {
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
        background: var(--color-surface-soft);
    }
    .detail-box h4 {
        margin-top: 0;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
    }
    .detail-box.flow { border-left: 4px solid var(--color-binder); }
    .detail-box.pros { border-left: 4px solid #10b981; }
    .detail-box.cons { border-left: 4px solid #ef4444; }
    .detail-box.flow h4 { color: var(--color-binder); }
    .detail-box.pros h4 { color: #10b981; }
    .detail-box.cons h4 { color: #ef4444; }
    
    .detail-box ul, .detail-box ol {
        margin: 0;
        padding-left: 1.1rem;
        font-size: 0.85rem;
        line-height: 1.5;
    }
    .detail-box li { margin-bottom: 0.4rem; }

    .analogy-simple {
        background: rgba(var(--color-binder-rgb), 0.05);
        border: 1px dashed var(--color-binder);
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }
    .analogy-simple p {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-ink-soft);
    }

    .combo-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background: var(--color-surface-soft);
        padding: 2rem;
        border-radius: 20px;
        margin: 1.5rem 0;
        border: 2px dashed var(--color-line);
    }
    .combo-part { text-align: center; }
    .combo-part strong { display: block; color: var(--color-binder); margin-bottom: 0.5rem; }
    .plus { font-size: 2rem; font-weight: 800; color: var(--color-line); }

    .table-wrap { overflow-x: auto; margin: 1.5rem 0; border-radius: 12px; border: 1px solid var(--color-line); }
    .recap-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .recap-table th { background: var(--color-surface-soft); text-align: left; padding: 1rem; color: var(--color-binder); border: 1px solid var(--color-line); }
    .recap-table td { padding: 1rem; border: 1px solid var(--color-line); text-align: center; }
    .recap-table.comparison td:first-child { text-align: left; background: var(--color-surface-soft); font-weight: 600; }
    
    .cell-good { background-color: rgba(153, 204, 51, 0.2) !important; color: #4d661a; font-weight: 700; }
    .cell-mid { background-color: rgba(255, 204, 255, 0.2) !important; color: #990099; font-weight: 700; }
    .cell-bad { background-color: rgba(255, 102, 153, 0.2) !important; color: #990033; font-weight: 700; }

    /* For dark mode compatibility, we use slightly different colors or opacity */
    :global(html.dark) .cell-good { background-color: rgba(153, 204, 51, 0.15) !important; color: #bde070; }
    :global(html.dark) .cell-mid { background-color: rgba(255, 204, 255, 0.15) !important; color: #f0a0f0; }
    :global(html.dark) .cell-bad { background-color: rgba(255, 102, 153, 0.15) !important; color: #ff99bb; }

    .table-footnote { font-size: 0.8rem; color: var(--color-ink-soft); font-style: italic; display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; }
    .dot-legend { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .dot-legend.good { background: #99cc33; }
    .dot-legend.mid { background: #ffccff; }
    .dot-legend.bad { background: #ff6699; }

    .jug-example {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
    }
    .jug-states { display: flex; flex-direction: column; gap: 0.5rem; }
    .step-line { font-family: var(--font-mono); font-size: 0.85rem; }
    .step-line span { font-weight: 800; color: var(--color-binder); }
    .step-line.highlight { background: var(--color-highlight); padding: 4px 8px; border-radius: 6px; }
    .jug-note { font-size: 0.9rem; color: var(--color-ink-soft); line-height: 1.6; }
    .jug-note ul { padding-left: 1.25rem; margin-top: 0.5rem; }

    .ids-why {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        margin-top: 1rem;
    }
    .ids-why h4 {
        margin-top: 0;
        color: var(--color-binder);
        margin-bottom: 0.75rem;
    }
    .ids-why p {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--color-ink-soft);
        margin-bottom: 0.75rem;
    }
    .memory-note {
        background: rgba(var(--color-binder-rgb), 0.05);
        padding: 1.25rem;
        border-radius: 12px;
        margin-top: 1rem;
        border: 1px dashed var(--color-line);
    }
    .memory-note h4 {
        margin-top: 0;
        font-size: 0.9rem;
        color: var(--color-binder);
        margin-bottom: 0.5rem;
    }
    .memory-note p {
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-ink-soft);
    }
    .logic-box {
        background: rgba(var(--color-binder-rgb), 0.03);
        padding: 1.25rem;
        border-radius: 12px;
        border-left: 3px solid var(--color-binder);
    }
    .highlight-text {
        color: var(--color-binder);
        font-weight: 600;
        border-top: 1px solid var(--color-line);
        padding-top: 0.75rem;
        margin-top: 0.75rem;
    }
    .ids-why p:last-child { margin-bottom: 0; }

    @media (max-width: 768px) {
        .jug-example, .perf-grid, .combo-box { grid-template-columns: 1fr; flex-direction: column; }
    }
</style>
