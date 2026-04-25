<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    import InformedSearchVisualizer from "./components/InformedSearchVisualizer.svelte";
    import LocalSearchVisualizer from "./components/LocalSearchVisualizer.svelte";
    import MemoryBoundedVisualizer from "./components/MemoryBoundedVisualizer.svelte";
</script>

<svelte:head>
    <title>Informed Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Informed (Heuristic) Search"
        date="24 April 2026"
        status="done"
        tags={["Heuristic", "A*", "Hill Climbing", "Local Search"]}
    />

    <NoteSection title="Penting: Dua Jenis 'Searching' di AI">
        <p>Sebelum masuk ke algoritma, kita harus paham kalau "Searching" itu nggak selalu tentang gambar pohon (tree). Ada dua kubu besar:</p>
        
        <div class="search-type-grid">
            <div class="type-card">
                <div class="type-icon">🗺️</div>
                <h4>1. Pathfinding (Cari Jalur)</h4>
                <p>Mencari <strong>urutan langkah</strong> dari Start ke Goal.</p>
                <ul>
                    <li><strong>Struktur:</strong> Tree / Graph.</li>
                    <li><strong>Fokus:</strong> "Lewat mana saja supaya sampai?".</li>
                    <li><strong>Contoh:</strong> BFS, DFS, A*, Greedy.</li>
                </ul>
            </div>
            <div class="type-card">
                <div class="type-icon">🏆</div>
                <h4>2. Optimization (Cari State)</h4>
                <p>Mencari <strong>keadaan terbaik</strong>, nggak peduli langkahnya.</p>
                <ul>
                    <li><strong>Struktur:</strong> Landscape (Naik-Turun).</li>
                    <li><strong>Fokus:</strong> "Apa settingan paling optimal?".</li>
                    <li><strong>Contoh:</strong> Hill Climbing, Simulated Annealing.</li>
                </ul>
            </div>
        </div>
        
        <Callout type="info">
            <strong>Kesimpulan:</strong> Di <strong>Pathfinding</strong> kamu mau cari "Jalan ke Puncak", sedangkan di <strong>Optimization</strong> kamu cuma mau cari "Mana Puncak Tertinggi".
        </Callout>

        <div class="tree-family">
            <h4>💡 Silsilah Keluarga Node</h4>
            <div class="family-grid">
                <div class="fam-item"><strong>Ancestor:</strong> Nenek moyang (Bapak, Kakek, dst sampai Root).</div>
                <div class="fam-item"><strong>Descendant:</strong> Keturunan (Anak, Cucu, dst ke bawah).</div>
                <div class="fam-item"><strong>Parent/Child:</strong> Hubungan langsung satu tingkat.</div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kamus Istilah: f, g, dan h">
        <p class="section-intro">
            Di Informed Search, kita nggak cuma asal jalan. Kita pake "perhitungan modal" supaya nggak nyasar. Ini tiga variabel kuncinya:
        </p>
        
        <div class="variable-grid">
            <div class="var-card g">
                <div class="var-name">g(n)</div>
                <div class="var-title">Path Cost</div>
                <p>Biaya yang <strong>sudah</strong> dikeluarkan dari Start sampai sekarang.</p>
                <div class="var-analogy">Analogi: <strong>Bensin yang sudah habis.</strong></div>
            </div>
            <div class="var-card h">
                <div class="var-name">h(n)</div>
                <div class="var-title">Heuristic Cost</div>
                <p>Estimasi biaya dari sekarang sampai ke <strong>Goal</strong>.</p>
                <div class="var-analogy">Analogi: <strong>"Feeling" sisa jarak.</strong></div>
            </div>
            <div class="var-card f">
                <div class="var-name">f(n)</div>
                <div class="var-title">Total Cost</div>
                <p>Total estimasi biaya dari awal sampai akhir.</p>
                <div class="var-formula">f(n) = g(n) + h(n)</div>
            </div>
        </div>

        <Callout type="tip">
            <strong>Kenapa harus ada f(n)?</strong> Kalau kamu cuma pake <strong>h (feeling)</strong>, kamu bisa tertipu jalan pintas yang ternyata jalannya rusak parah. Kalau kamu cuma pake <strong>g (bensin)</strong>, kamu bakal muter-muter ke segala arah (kayak BFS). Dengan <strong>f(n)</strong>, kamu dapet yang terbaik dari keduanya.
        </Callout>
    </NoteSection>

    <NoteSection title="Syarat Heuristik: Admissible & Consistent">
        <p>Supaya A* bisa nemu jalan paling murah (Optimal), heuristiknya nggak boleh asal tebak. Ada dua syarat:</p>
        
        <div class="property-grid">
            <div class="prop-card">
                <div class="prop-header">
                    <span class="prop-icon">😇</span>
                    <h4>1. Admissible (Optimis)</h4>
                </div>
                <p>Heuristik <strong>tidak boleh lebay</strong> (overestimate). Tebakan kamu harus selalu lebih kecil atau sama dengan jarak aslinya.</p>
                <div class="prop-example">
                    <strong>Contoh:</strong> Jarak asli ke Goal itu 10km.
                    <ul>
                        <li>Tebak 8km ✅ (Admissible)</li>
                        <li>Tebak 10km ✅ (Admissible)</li>
                        <li>Tebak 12km ❌ (Gak Admissible)</li>
                    </ul>
                </div>
            </div>
            
            <div class="prop-card">
                <div class="prop-header">
                    <span class="prop-icon">📏</span>
                    <h4>2. Consistent (Masuk Akal)</h4>
                </div>
                <p>Tebakan kamu harus <strong>konsisten</strong> di tiap langkah. Jarak yang kamu tempuh antar node harus sebanding dengan penurunan nilai heuristiknya.</p>
                <div class="prop-example">
                    <strong>Contoh:</strong> Kamu jalan 2km ke depan. Logikanya, sisa jarak ke Goal (heuristik) harusnya berkurang maksimal 2km juga.
                </div>
            </div>
        </div>

        <Callout type="info">
            <strong>Analogi Sederhana:</strong> 
            <strong>Admissible</strong> itu kayak kamu "rendah hati" (nebak harga barang lebih murah dari aslinya). 
            <strong>Consistent</strong> itu kayak kamu "nggak plin-plan" (kalau udah jalan deket ke toko, tebakan harganya juga harus makin akurat).
        </Callout>
    </NoteSection>

    <NoteSection title="1. Hill Climbing">
        <p>Strategi pencarian yang selalu mendaki ke arah tetangga yang lebih baik. Cocok untuk masalah optimasi lokal.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Mulai dari state awal.</li>
                    <li>Cek tetangga sekitar.</li>
                    <li>Jika ada tetangga yang lebih bagus dari sekarang, langsung pindah ke sana.</li>
                    <li>Ulangi sampai tidak ada lagi tetangga yang lebih bagus (sampai puncak).</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Irit Memori:</strong> Cuma perlu simpan state sekarang (O(1)).</li>
                    <li>Sangat cepat untuk masalah sederhana.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Local Maxima:</strong> Bisa terjebak di "bukit kecil", mengira itu puncak tertinggi padahal ada gunung yang lebih tinggi di sebelahnya.</li>
                    <li>Bisa "stuck" di area datar (Plateau).</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            <strong>Analogi Kabut Tebal:</strong> Bayangkan kamu mendaki gunung di tengah kabut tebal. Kamu cuma bisa liat tanah di bawah kakimu. Strategimu cuma satu: "Pokoknya kalau langkah selanjutnya lebih tinggi, aku jalan." Kamu bakal sampe puncak, tapi nggak tau itu puncak gunung tertinggi atau cuma gundukan tanah.
        </Callout>

        <LocalSearchVisualizer type="HC" />
    </NoteSection>

    <NoteSection title="2. Simulated Annealing (SA)">
        <p>Versi Hill Climbing yang lebih "berani". Kadang-kadang mau ambil langkah buruk demi bisa keluar dari jebakan <em>Local Maxima</em>.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Mulai dengan <strong>Temperatur (T)</strong> tinggi.</li>
                    <li>Pilih tetangga secara acak.</li>
                    <li>Kalau lebih bagus, pindah.</li>
                    <li>Kalau lebih buruk, tetep ada peluang buat pindah (berdasarkan rumus probabilitas).</li>
                    <li>Turunkan T secara bertahap sampai dingin (berhenti).</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li>Bisa keluar dari jebakan <strong>Local Maxima</strong> karena berani ambil risiko di awal.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li>Sangat lambat karena harus nunggu "suhu mendingin".</li>
                    <li>Susah nyari setingan suhu yang pas.</li>
                </ul>
            </div>
        </div>

        <Callout type="info">
            <strong>Analogi Orang Galau:</strong> Di awal (Suhu Tinggi), dia berani coba-coba jalan yang kelihatannya salah. Makin lama (Suhu Rendah), dia makin serius dan cuma mau ambil jalan yang benar-benar bagus.
        </Callout>

        <LocalSearchVisualizer type="SA" />
    </NoteSection>

    <NoteSection title="3. Greedy Best-First Search">
        <p>Pencarian yang cuma modal "feeling" ke depan tanpa peduli sudah sejauh mana dia berjalan. Fokus utama: <strong>h(n)</strong>.</p>
        
        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Gunakan <strong>Priority Queue</strong> berdasarkan nilai Heuristik h(n).</li>
                    <li>Selalu buka node yang kelihatannya paling dekat ke goal (h terkecil).</li>
                    <li>Abaikan biaya jalur yang sudah dilewati (g).</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li>Sangat cepat nemu solusi kalau heuristiknya bagus.</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Short-Sighted:</strong> Bisa muter-muter atau ambil jalan memutar karena tertipu "jarak udara".</li>
                    <li>Tidak Optimal & Tidak Complete.</li>
                </ul>
            </div>
        </div>

        <InformedSearchVisualizer algorithm="Greedy" />
    </NoteSection>

    <NoteSection title="4. A* Search">
        <p>Pencarian paling populer. Menggabungkan masa lalu (g) dan masa depan (h). Rumus: <strong>f(n) = g(n) + h(n)</strong>.</p>
        
        <Callout type="info">
            <strong>⭐ Kenapa pakai Bintang (*)?</strong> 
            Tanda bintang (Star) menandakan bahwa algoritma ini <strong>Optimal</strong>. Selama fungsi heuristiknya benar (Admissible), A* dijamin akan menemukan jalur paling murah. Kalau cuma disebut "A", dia belum tentu optimal!
        </Callout>

        <div class="algo-detail-grid">
            <div class="detail-box flow">
                <h4>Alur Kerja (Flow):</h4>
                <ol>
                    <li>Hitung <strong>g(n)</strong>: Biaya dari start ke node sekarang.</li>
                    <li>Hitung <strong>h(n)</strong>: Estimasi biaya dari sekarang ke goal.</li>
                    <li>Buka node dengan total <strong>f(n)</strong> terkecil.</li>
                </ol>
            </div>
            <div class="detail-box pros">
                <h4>Keuntungan:</h4>
                <ul>
                    <li><strong>Complete & Optimal:</strong> Pasti nemu jalan terpendek (asalkan heuristiknya Admissible).</li>
                </ul>
            </div>
            <div class="detail-box cons">
                <h4>Kerugian:</h4>
                <ul>
                    <li><strong>Makan RAM:</strong> Harus simpan semua node yang dibuka di memori (Eksponensial).</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            <strong>Analogi Belanja Murah:</strong> Kamu mau ke toko HP. Kamu nggak cuma liat toko mana yang paling deket (h), tapi kamu juga liat bensin yang udah abis berapa (g). A* bakal milih toko yang total (bensin + jarak sisa) paling irit.
        </Callout>
        
        <InformedSearchVisualizer algorithm="AStar" />

        <div class="contour-deep-dive">
            <h4>Deep Dive: Apa itu Ekspansi & f-contours?</h4>
            <div class="dive-grid">
                <div class="dive-item">
                    <strong>1. Ekspansi (Buka Cabang)</strong>
                    <p>Proses melihat tetangga dari sebuah node. Kayak kamu berdiri di persimpangan jalan, terus kamu "nengok" ke semua jalan yang tersedia.</p>
                </div>
                <div class="dive-item">
                    <strong>2. f-contours (Garis Batas)</strong>
                    <p>Garis khayal yang menghubungkan node-node dengan nilai f yang sama. A* bakal buka semua node di dalam "garis" f=10 dulu, baru meluap ke f=11, dst.</p>
                </div>
            </div>
            <div class="analogy-box">
                <p>🌊 <strong>Analogi Tumpahan Air:</strong> Bayangkan A* itu kayak air yang ditumpahin ke lantai nggak rata. Air bakal menelusuri area paling rendah (f terkecil) dulu sebelum meluap ke area yang lebih tinggi. Karena ada variabel h (feeling), airnya nggak nyebar bulat, tapi <strong>lonjong mengarah ke goal</strong>.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Studi Kasus: 8-Puzzle Heuristics">
        <p>Contoh pemodelan heuristik pada permainan puzzle angka:</p>
        <div class="puzzle-grid">
            <div class="puzzle-card">
                <strong>h1: Misplaced Tiles</strong>
                <p>Menghitung jumlah ubin yang tidak berada di posisi target.</p>
                <div class="badge">Sederhana</div>
            </div>
            <div class="puzzle-card">
                <strong>h2: Manhattan Distance</strong>
                <p>Menghitung total jarak pergeseran vertikal & horizontal setiap ubin ke target.</p>
                <div class="badge-blue">Lebih Efektif</div>
            </div>
        </div>
        <div class="formula-list">
            <div class="formula-item">
                <strong>Euclidean Distance:</strong>
                <code>d = √((x₂-x₁)² + (y₂-y₁)²)</code>
            </div>
            <div class="formula-item">
                <strong>Manhattan Distance:</strong>
                <code>d = |x₂-x₁| + |y₂-y₁|</code>
            </div>
        </div>
        <Callout type="info">
            Heuristik yang memberikan nilai lebih besar (namun tetap admissible) disebut <strong>dominating</strong> karena akan mengeksplorasi lebih sedikit node.
        </Callout>
    </NoteSection>

    <NoteSection title="Memory-Bounded Search (Solusi Hemat RAM)">
        <div class="variants-grid">
            <div class="v-card">
                <strong>IDA* (Iterative Deepening A*)</strong>
                <p><strong>Logika:</strong> Lakukan pencarian mendalam (DFS) berkali-kali. Jika mentok karena biaya terlalu mahal (f-limit), ulangi lagi dengan batas biaya yang lebih longgar.</p>
                
                <Callout type="info">
                    <strong>Apa itu "Batas Lebih Longgar"?</strong> 
                    Kalau A* mentok di batas biaya 10, dia bakal nyari node mana yang biayanya <strong>paling mendekati 10 tapi sedikit lebih besar</strong> (misal 13). Nah, 13 inilah yang jadi "batas baru" supaya dia bisa jalan lebih jauh tanpa melewatkan jalur yang mungkin lebih murah.
                </Callout>

                <div class="vs-box">
                    <div class="vs-item">
                        <span class="vs-label">IDS (Blind)</span>
                        <p>Batasnya adalah <strong>Kedalaman</strong> (Lantai 1, 2, 3...)</p>
                    </div>
                    <div class="vs-item">
                        <span class="vs-label star">IDA* (Informed)</span>
                        <p>Batasnya adalah <strong>Biaya / f-cost</strong> (Contoh: Biaya 10, 20, 30...)</p>
                    </div>
                </div>

                <MemoryBoundedVisualizer algorithm="IDAStar" />
            </div>
            <div class="v-card">
                <strong>SMA* (Simplified Memory-bounded A*)</strong>
                <p><strong>Logika:</strong> Gunakan semua RAM yang ada. Kalau sudah penuh, hapus jalur yang paling gak menjanjikan. Tapi "catat" skornya supaya kalau ternyata jalur lain lebih busuk, kita bisa balik lagi ke sini.</p>
                
                <Callout type="warning">
                    <strong>Kenapa disebut "Jalur Buruk"?</strong> Dalam SMA*, jalur "buruk" bukan berarti jalurnya salah, tapi artinya jalur tersebut punya <strong>f-value (total biaya) paling tinggi</strong> dibanding node lain yang ada di memori saat itu. Jadi, dialah yang pertama kali dikorbankan (dihapus) buat kasih ruang ke node baru.
                </Callout>

                <MemoryBoundedVisualizer algorithm="SMAStar" />
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Tabel Perbandingan Performa">
        <div class="table-wrap">
            <table class="recap-table comparison">
                <thead>
                    <tr>
                        <th></th>
                        <th>Greedy BFS</th>
                        <th>A*</th>
                        <th>Hill Climbing</th>
                        <th>IDA*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Complete</strong></td>
                        <td class="cell-mid">Bisa Gagal</td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes</td>
                    </tr>
                    <tr>
                        <td><strong>Optimal</strong></td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes*</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes*</td>
                    </tr>
                    <tr>
                        <td><strong>Memory</strong></td>
                        <td class="cell-bad">High (bᵐ)</td>
                        <td class="cell-bad">High (bᵈ)</td>
                        <td class="cell-good">O(1)</td>
                        <td class="cell-good">Low (O(bd))</td>
                    </tr>
                    <tr>
                        <td><strong>Time</strong></td>
                        <td class="cell-mid">Cepat</td>
                        <td class="cell-mid">Moderately Cepat</td>
                        <td class="cell-good">Sangat Cepat</td>
                        <td class="cell-bad">Eksponensial</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="table-footnote">*Optimal jika h(n) admissible. Indikator: <span class="dot-legend good"></span> Bagus | <span class="dot-legend mid"></span> Cukup | <span class="dot-legend bad"></span> Kurang</p>
    </NoteSection>

    <NoteSection title="Kuis Tantangan: Informed Search">
        <Quiz 
            title="Quiz Heuristic Search"
            questions={[
                {
                    question: "Manakah dari berikut ini yang merupakan karakteristik dari lanskap 'Deceptive' dalam Hill Climbing?",
                    options: ["Banyak puncak dengan tinggi yang sama.", "Permukaan sangat halus sehingga mudah daki.", "Jalur yang terlihat menuju puncak global ternyata menjebak ke puncak lokal yang jauh dari goal.", "Tidak ada puncak sama sekali."],
                    correctIndex: 2,
                    explanation: "Deceptive landscape memberikan petunjuk yang menyesatkan bagi algoritma lokal seperti Hill Climbing."
                },
                {
                    question: "Mengapa konsistensi (consistency) pada heuristik dianggap lebih kuat daripada admissibility?",
                    options: ["Karena konsistensi hanya berlaku untuk tree.", "Karena konsistensi menjamin f-value tidak pernah berkurang di sepanjang jalur, mencegah evaluasi ulang node pada graph.", "Karena konsistensi membolehkan overestimate.", "Konsistensi tidak diperlukan untuk A*."],
                    correctIndex: 1,
                    explanation: "Jika h bersifat konsisten, maka f(n) = g(n) + h(n) bersifat monoton, yang menjamin efisiensi optimal pada pencarian graph."
                },
                {
                    question: "Apa tujuan utama dari annealing schedule (penurunan T secara bertahap) dalam Simulated Annealing?",
                    options: ["Untuk mempercepat komputasi.", "Untuk mengubah algoritma dari eksplorasi acak menjadi eksploitasi jalur terbaik secara perlahan.", "Untuk menghemat memori.", "Untuk menghindari goal state."],
                    correctIndex: 1,
                    explanation: "Seiring mendinginnya temperatur, algoritma menjadi lebih selektif dan cenderung hanya menerima langkah yang benar-benar meningkatkan kualitas state."
                },
                {
                    question: "Dalam A*, apa yang dimaksud dengan ekspansi berdasarkan 'f-contours'?",
                    options: ["Ekspansi node secara acak.", "Ekspansi node dalam bentuk lapisan kedalaman.", "Ekspansi node yang memiliki nilai f yang sama atau mirip, membentuk batas pencarian yang terarah.", "Ekspansi hanya pada node leaf."],
                    correctIndex: 2,
                    explanation: "A* beroperasi seperti air yang mengalir mengisi area dengan biaya f terendah terlebih dahulu, membentuk kontur pencarian yang efisien."
                },
                {
                    question: "Manakah varian A* yang paling cocok digunakan jika RAM komputer sangat terbatas namun waktu bukan masalah utama?",
                    options: ["Standard A*", "Greedy BFS", "IDA*", "SMA*"],
                    correctIndex: 2,
                    explanation: "IDA* menggunakan memori linear O(bd) karena ia berbasis DFS, namun mengulang pencarian berkali-kali sehingga memakan waktu lebih lama."
                },
                {
                    question: "Algoritma lokal manakah yang memiliki karakteristik 'membandingkan semua tetangga'?",
                    options: ["Simple Hill Climbing", "Steepest-Ascent Hill Climbing", "Simulated Annealing", "Random Walk"],
                    correctIndex: 1,
                    explanation: "Steepest-Ascent HC melakukan evaluasi pada seluruh tetangga sebelum mengambil keputusan langkah terbaik."
                },
                {
                    question: "Apa yang dilakukan SMA* ketika memorinya penuh tetapi belum mencapai goal?",
                    options: ["Berhenti dan lapor failure.", "Menghapus node dengan nilai f terburuk dan mencatat nilainya pada ancestor node.", "Mengganti fungsi heuristik secara otomatis.", "Meningkatkan limit kedalaman."],
                    correctIndex: 1,
                    explanation: "SMA* bersifat forgetful namun informatif; ia membuang jalur buruk tapi tetap menyimpan 'kenangan' biayanya agar tidak tersesat nanti."
                },
                {
                    question: "Pada masalah 8-puzzle, manakah dari berikut ini yang merupakan heuristik yang TIDAK admissible?",
                    options: ["h(n) = 0", "h(n) = jumlah ubin salah posisi", "h(n) = jarak Manhattan", "h(n) = kuadrat jarak Manhattan"],
                    correctIndex: 3,
                    explanation: "Kuadrat jarak Manhattan dapat menghasilkan nilai yang jauh lebih besar dari biaya asli langkah (overestimate), sehingga melanggar syarat admissibility."
                },
                {
                    question: "Dalam formula Simulated Annealing P = e^(-ΔE/T), jika ΔE = 0 (kualitas state sama), berapakah probabilitas diterimanya state tersebut?",
                    options: ["0", "0.5", "1", "Tergantung T"],
                    correctIndex: 2,
                    explanation: "e^0 = 1. Artinya state dengan kualitas yang sama (atau lebih baik) selalu diterima."
                },
                {
                    question: "Syarat utama agar A* dijamin optimal pada GRAPH (bukan tree) adalah...",
                    options: ["h(n) harus Admissible", "h(n) harus Konsisten (Consistent)", "Branching factor harus tak hingga", "g(n) harus bernilai 0"],
                    correctIndex: 1,
                    explanation: "Pada graph (di mana node bisa dicapai lewat banyak jalur), h yang konsisten menjamin jalur pertama yang mencapai suatu node adalah yang termurah."
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
    .search-type-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin: 1.5rem 0;
    }
    .type-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        text-align: center;
    }
    .type-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .type-card h4 { margin: 0 0 0.5rem; color: var(--color-binder); }
    .type-card p { font-size: 0.9rem; margin-bottom: 1rem; font-weight: 600; }
    .type-card ul { text-align: left; padding-left: 1.25rem; font-size: 0.85rem; color: var(--color-ink-soft); }
    .type-card li { margin-bottom: 0.3rem; }

    .section-intro { margin-bottom: 1.5rem; color: var(--color-ink-soft); }

    .h-card {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        margin: 1.5rem 0;
    }
    .h-formula { font-size: 2.5rem; font-weight: 800; color: var(--color-binder); font-family: var(--font-mono); }
    .h-desc p { margin-top: 0; font-weight: 600; }
    .h-desc ul { margin: 0.5rem 0 0; padding-left: 1.25rem; font-size: 0.9rem; color: var(--color-ink-soft); }

    .case-study-mini { margin-top: 1rem; font-size: 0.9rem; color: var(--color-ink-soft); }
    .case-study-mini ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; list-style: none; padding: 0; }
    .case-study-mini li { background: var(--color-surface-elevated); padding: 0.5rem; border-radius: 6px; border-left: 3px solid var(--color-line); }

    .landscape-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .landscape-item {
        background: var(--color-surface-soft);
        padding: 1rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid var(--color-line);
    }
    .l-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .landscape-item strong { display: block; font-size: 0.85rem; color: var(--color-binder); }
    .landscape-item p { font-size: 0.75rem; color: var(--color-ink-soft); margin: 0.25rem 0 0; }

    .simple-breakdown {
        background: var(--color-surface-soft);
        padding: 1.25rem;
        border-radius: 12px;
        border-left: 4px solid var(--color-binder);
        margin: 1.5rem 0;
        font-size: 0.95rem;
        line-height: 1.6;
        font-style: italic;
    }

    .variable-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .var-card {
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        text-align: center;
        background: var(--color-surface-soft);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .var-name { font-size: 1.8rem; font-weight: 800; font-family: var(--font-mono); margin-bottom: 0.25rem; }
    .var-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; opacity: 0.8; }
    .var-card p { font-size: 0.85rem; line-height: 1.4; margin-bottom: 1rem; }
    .var-analogy { font-size: 0.8rem; font-style: italic; color: var(--color-ink-soft); }
    .var-formula { font-size: 1rem; font-weight: 700; color: var(--color-binder); background: var(--color-surface-elevated); padding: 8px 12px; border-radius: 8px; }

    .var-card.g .var-name { color: #6366f1; }
    .var-card.h .var-name { color: #f59e0b; }
    .var-card.f .var-name { color: #10b981; }

    .var-card.f .var-name { color: #10b981; }

    .var-card.f .var-name { color: #10b981; }

    .tree-family {
        margin-top: 1.5rem;
        padding: 1rem;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 12px;
    }
    .tree-family h4 { margin-top: 0; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .family-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .fam-item { font-size: 0.8rem; color: var(--color-ink-soft); }

    .property-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin: 1.5rem 0;
    }
    .prop-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
    }
    .prop-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .prop-icon { font-size: 1.5rem; }
    .prop-header h4 { margin: 0; color: var(--color-binder); }
    .prop-card p { font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; }
    .prop-example { background: var(--color-surface-elevated); padding: 1rem; border-radius: 10px; font-size: 0.85rem; }
    .prop-example ul { margin: 0.5rem 0 0; padding-left: 1.25rem; }

    .contour-deep-dive {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--color-surface-soft);
        border-radius: 16px;
        border: 2px dashed var(--color-line);
    }
    .contour-deep-dive h4 { margin-top: 0; color: var(--color-binder); margin-bottom: 1rem; }
    .dive-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    .dive-item strong { display: block; margin-bottom: 0.5rem; color: var(--color-ink-strong); }
    .dive-item p { font-size: 0.85rem; line-height: 1.5; margin: 0; }
    .analogy-box {
        background: var(--color-surface-elevated);
        padding: 1rem;
        border-radius: 12px;
        font-size: 0.9rem;
        line-height: 1.6;
        border-left: 4px solid var(--color-binder);
    }

    .hc-variants, .variants-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin: 1rem 0;
    }
    .v-box, .v-card {
        background: var(--color-surface-elevated);
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .v-box h4 { margin-top: 0; color: var(--color-binder); }
    .v-box p, .v-card p { font-size: 0.85rem; margin: 0.5rem 0 0; line-height: 1.5; }

    .hc-problems {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-surface-soft);
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .prob-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .prob-tags span { background: var(--color-line); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }

    .sa-formula {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: #1a1a1a;
        color: #fff;
        padding: 1.5rem;
        border-radius: 16px;
        margin: 1rem 0;
    }
    .formula-box { font-size: 1.8rem; font-family: var(--font-mono); color: #ffcc33; }
    .formula-note { font-size: 0.85rem; opacity: 0.8; }

    .method-box { background: var(--color-surface-elevated); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--color-line); margin: 1rem 0; }
    .method-box h4 { margin-top: 0; color: var(--color-binder); }
    .method-box ol { padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; }

    .f-contour-explanation { background: var(--color-status-info-soft); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--color-status-info-border); margin: 1rem 0; font-size: 0.9rem; }

    .puzzle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1rem 0; }
    .puzzle-card { background: var(--color-surface-soft); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--color-line); text-align: center; }
    .badge { display: inline-block; margin-top: 0.75rem; background: #e0e0e0; color: #666; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
    .badge-blue { display: inline-block; margin-top: 0.75rem; background: #e3f2fd; color: #1976d2; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }

    .table-wrap { overflow-x: auto; margin: 1.5rem 0; border-radius: 12px; border: 1px solid var(--color-line); }
    .recap-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .recap-table th { background: var(--color-surface-soft); text-align: left; padding: 1rem; color: var(--color-binder); border: 1px solid var(--color-line); }
    .recap-table td { padding: 1rem; border: 1px solid var(--color-line); text-align: center; }
    .recap-table.comparison td:first-child { text-align: left; background: var(--color-surface-soft); font-weight: 600; }
    
    .cell-good { background-color: rgba(153, 204, 51, 0.2) !important; color: #4d661a; font-weight: 700; }
    .cell-mid { background-color: rgba(255, 204, 255, 0.2) !important; color: #990099; font-weight: 700; }
    .cell-bad { background-color: rgba(255, 102, 153, 0.2) !important; color: #990033; font-weight: 700; }

    .vs-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin: 1rem 0;
        background: var(--color-surface-soft);
        padding: 0.75rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .vs-item { font-size: 0.8rem; }
    .vs-label { display: block; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; margin-bottom: 0.25rem; color: var(--color-ink-soft); }
    .vs-label.star { color: var(--color-binder); }
    .vs-item p { margin: 0 !important; line-height: 1.4; }

    :global(html.dark) .cell-good { background-color: rgba(153, 204, 51, 0.15) !important; color: #bde070; }
    :global(html.dark) .cell-mid { background-color: rgba(255, 204, 255, 0.15) !important; color: #f0a0f0; }
    :global(html.dark) .cell-bad { background-color: rgba(255, 102, 153, 0.15) !important; color: #ff99bb; }

    .table-footnote { font-size: 0.8rem; color: var(--color-ink-soft); font-style: italic; display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; }
    .dot-legend { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .dot-legend.good { background: #99cc33; }
    .dot-legend.mid { background: #ffccff; }
    .dot-legend.bad { background: #ff6699; }

    .formula-item code { background: var(--color-surface-soft); padding: 2px 6px; border-radius: 4px; font-weight: 600; }

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

    @media (max-width: 768px) {
        .algo-detail-grid { grid-template-columns: 1fr; }
        .hc-variants, .variants-grid, .puzzle-grid, .sa-formula, .case-study-mini ul { grid-template-columns: 1fr; }
    }
</style>
