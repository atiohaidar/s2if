<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import RomaniaMapVisualizer from "./components/RomaniaMapVisualizer.svelte";
</script>

<svelte:head>
    <title>Bedah Soal: Romania Map Problem - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Romania Map Problem"
        date="23 April 2026"
        status="done"
        tags={["Romania Map", "BFS", "DFS", "UCS", "Greedy", "A*"]}
    />

    <NoteSection title="Konteks Soal">
        <p>
            Soal <strong>Romania Map</strong> adalah salah satu soal klasik dalam buku 
            <em>Artificial Intelligence: A Modern Approach</em> (Russell & Norvig). 
            Soal ini menyajikan peta 20 kota di Romania beserta jarak antar kota.
        </p>
        <p>
            Tantangannya sederhana: <strong>Temukan jalur terpendek dari kota A ke kota B.</strong> 
            Tapi cara menemukannya bisa sangat berbeda tergantung algoritma yang digunakan.
        </p>
        <Callout type="info">
            Gunakan visualisasi di bawah ini untuk <strong>membandingkan perilaku</strong> 
            masing-masing algoritma pada peta yang sama. Anda bisa memilih sendiri kota 
            asal dan tujuan, lalu melihat bagaimana setiap algoritma menjelajahi peta.
        </Callout>
    </NoteSection>

    <NoteSection title="Cara Menggunakan">
        <ul>
            <li><strong>Pilih Start &amp; Goal:</strong> Gunakan dropdown untuk memilih kota asal dan tujuan.</li>
            <li><strong>Pilih Algoritma:</strong> BFS, DFS, UCS, Greedy, atau A*.</li>
            <li><strong>Tekan Play:</strong> Lihat animasi langkah demi langkah.</li>
            <li><strong>Perhatikan:</strong> Jumlah node yang di-expand dan total cost jalur yang ditemukan.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Visualisasi Interaktif">
        <RomaniaMapVisualizer />
    </NoteSection>

    <NoteSection title="Apa yang Harus Diperhatikan?">
        <div class="observation-cards">
            <div class="obs-card">
                <h4>🔵 BFS vs DFS</h4>
                <p>BFS menjelajah selapis demi selapis (seperti riak air), sedangkan DFS menyelam ke satu jalur sedalam mungkin sebelum mundur.</p>
            </div>
            <div class="obs-card">
                <h4>💰 UCS vs BFS</h4>
                <p>UCS mirip BFS, tapi lebih pintar karena mempertimbangkan <strong>biaya jalan</strong>. Dia selalu menemukan jalur termurah.</p>
            </div>
            <div class="obs-card">
                <h4>🧠 Greedy vs A*</h4>
                <p>Greedy sangat cepat tapi bisa salah jalur. A* lebih lambat tapi <strong>selalu menemukan jalur optimal</strong> (jika heuristic admissible).</p>
            </div>
            <div class="obs-card">
                <h4>📊 Efisiensi</h4>
                <p>Bandingkan jumlah <strong>"Expanded"</strong> antar algoritma. Semakin sedikit node yang di-expand, semakin efisien algoritmanya.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Catatan Teknis">
        <ul>
            <li><strong>Heuristic</strong> yang digunakan untuk Greedy dan A* adalah <strong>jarak Euclidean</strong> (jarak lurus) antar kota di peta.</li>
            <li>Angka di setiap garis adalah <strong>jarak jalan (road distance)</strong> yang merupakan biaya sebenarnya.</li>
            <li>Heuristic Euclidean bersifat <strong>admissible</strong> (tidak pernah overestimate), sehingga A* dijamin optimal.</li>
        </ul>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .observation-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .obs-card {
        background: var(--color-surface-soft);
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .obs-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .obs-card h4 {
        font-family: var(--font-body);
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .obs-card p {
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
    }
</style>
