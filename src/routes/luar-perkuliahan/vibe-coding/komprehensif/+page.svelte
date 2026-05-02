<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    let copiedId = $state<string | null>(null);

    function copyPrompt(text: string, id: string) {
        // Remove quotes if they exist at start/end
        const cleanText = text.replace(/^["']|["']$/g, '');
        navigator.clipboard.writeText(cleanText);
        copiedId = id;
        setTimeout(() => {
            if (copiedId === id) copiedId = null;
        }, 2000);
    }
</script>

<svelte:head>
    <title>Panduan Komprehensif Vibe Coding - S2IF Notebook</title>
    <meta
        name="description"
        content="Panduan lengkap Vibe Coding & AI-Assisted Development: filosofi, mindset, alur kerja, strategi UI/UX, teknik lanjutan, keamanan, dan prompt Socrates."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Panduan Komprehensif Vibe Coding"
        date="2 Mei 2026"
        status="wip"
        tags={["Vibe Coding", "AI-Assisted", "Prompt Engineering", "Workflow"]}
    />

    <NoteSection title="Pengantar">
        <p>
            Materi ini merupakan sintesa dari berbagai pengalaman yang aku lakukan dalam membangun aplikasi menggunakan bantuan AI secara efektif dan efisien (versi aku).
            Fokus utamanya bukan sekadar "jadi", tapi membangun sistem yang <strong>"berkualitas"</strong> dengan <strong>"pemahaman mendalam"</strong>.
        </p>
        <Callout type="info" title="Filosofi & Mindset Utama">
            Menurutku, Vibe Coding bukan berarti menyerahkan segalanya ke AI. Ini adalah tentang <strong>strategi kolaborasi</strong> antara kreativitas manusia dan eksekusi AI.
        </Callout>
    </NoteSection>

    <NoteSection title="1. Filosofi & Mindset Utama">
        <h3>A. Eksplorasi vs. Efisiensi</h3>
        <p>Bagiku, penggunaan AI itu bisa dibagi menjadi dua:</p>
        <ul>
            <li>
                <strong>Eksplorasi</strong>: Menggunakan AI untuk mempelajari sesuatu (misal: framework yang baru dipelajari, teknik pengkodean, dll). Fokusnya adalah memahami "mengapa" dan "bagaimana".
                <br/><em>Catatan: Pastikan untuk memvalidasi apa yang dipelajari melalui AI. Validasi dengan sumber yang terpercaya, AI untuk membangun pemahaman, lalu sumber terpercaya untuk memastikan apakah pemahamanku ini benar atau masih keliru.</em>
            </li>
            <li>
                <strong>Efisiensi</strong>: Menggunakan AI untuk mempercepat pengerjaan hal yang sudah kita pahami. Fokusnya adalah "apa" yang harus dibuat (eksekusi fitur).
            </li>
        </ul>

        <Callout type="tip" title="Contoh Prompt Eksplorasi">
            <ul>
                <li>"apa itu XSS Injection?"</li>
                <li>"kenapa harus pakai useState di sini?"</li>
                <li>"Gimana kalau user-nya meningkat jadi 20rb dalam satu jam? Apakah kodenya siap menampung lonjakan itu?"</li>
                <li>"Apakah skema database ini aman dari sisi security?"</li>
                <li>"apa pro dan kontra jika menerapkan clean code pada project ini?"</li>
            </ul>
        </Callout>

        <Callout type="info" title="Contoh Prompt Efisiensi">
            <ul>
                <li>"Bikin fitur X"</li>
                <li>"Bikin form login"</li>
                <li>"Bikin halaman dashboard"</li>
            </ul>
        </Callout>

        <h3>B. Riset > Eksekusi</h3>
        <p><strong>"Jangan Sok Tau, Tapi Ajak Diskusi"</strong></p>
        <p>
            Luangkan lebih banyak waktu untuk berdiskusi dan meriset solusi sebelum meminta AI menulis kode.
        </p>
        <ul>
            <li>Jangan langsung suruh "Bikin fitur X".</li>
            <li>Mulailah dengan "Saya mau bikin fitur X, menurutmu pendekatan apa yang paling efisien dan aman?".</li>
            <li>Tanyakan pro-kontra dari sebuah pendekatan. Jika risetnya matang, harusnya eksekusinya akan jauh lebih minim error.</li>
        </ul>

        <Callout type="tip" title="Contoh Diskusi">
            "aku mau bikin fitur login, menurutmu ada pendekatan apa aja, serta apa pro dan kontrannya?"
        </Callout>

        <h3>C. Menjawab Pertanyaan Dasar</h3>
        <p>
            Menurutku, ini <strong>bare minimum</strong> jika ngoding pakai AI. Bisa menjawab pertanyaan dasar dari apa yang dibuat. Pertanyaan yang biasa ditanyakan oleh orang awam.
        </p>
        <p>
            Misal: setidaknya tau kode ini untuk apa, kalau dari sisi keamanannya menggunakan apa, bagaimana cara kerjanya, kenapa pakai pendekatan kayak gini. Kalau misal mau nambah fitur, harus gimana.
        </p>
    </NoteSection>

    <NoteSection title="2. Alur yang Non-Linear & Iteratif (The Vibe Loop)">
        <p>
            Penting untuk dipahami bahwa alur ini <strong>tidak harus urut</strong>. Vibe Coding bersifat cair;
            kamu bisa sedang mengoding fitur lalu tiba-tiba balik ke diskusi layout, atau sedang refactor lalu pindah ke planning fitur baru.
            Ini adalah sekumpulan <strong>"Mode Kerja"</strong> yang bisa kamu masuki kapan saja:
        </p>

        <h3>A. Mode Planning & Brainstorming (Kapan Saja)</h3>
        <p>Lakukan ini setiap kali kamu merasa "stuck" atau ingin menambah sesuatu yang baru.</p>
        <ul>
            <li><strong>Pahami Domain</strong>: Jika membuat aplikasi keuangan, pelajari istilah dasar keuangan agar AI mendapat konteks bisnis yang tepat.</li>
            <li>
                <strong>Tulis idenya, dan minta saran</strong>: Agar AI tidak "halusinasi", buat dua file sebagai panduan utama:
                <ul>
                    <li><strong>SRS (System Requirements Specification)</strong>: Fokus pada <em>Apa</em> yang mau dibuat (fitur, user role, alur bisnis).</li>
                    <li><strong>SDD (System Design Document)</strong>: Fokus pada <em>Bagaimana</em> cara membuatnya secara teknis (skema database, API, struktur folder).</li>
                </ul>
                <p><em>Pro Tip: Selalu referensikan kedua file ini (gunakan @SRS.md atau @SDD.md) di setiap awal sesi chat baru agar AI tetap konsisten. Tulisan SRS dan SDD-nya bisa pakai tulisan yang berantakan nggak apa-apa, nanti tinggal dirapiin oleh AI.</em></p>
            </li>
            <li><strong>Dokumentasi Framework</strong>: Berikan dokumentasi library/framework ke AI sebagai konteks tambahan agar AI tidak menggunakan versi yang sudah usang.</li>
        </ul>

        <h3>B. Mode Visual & UI/UX (Anti-Generic AI)</h3>
        <p>
            Diskusi layout tidak hanya di awal. Kamu bisa melakukan "UI/UX Pivot" di tengah pengkodean jika merasa tampilannya mulai membosankan atau tidak praktis.
        </p>

        <h4>Checklist "Anti-AI-ish":</h4>
        <ul>
            <li>❌ <strong>Over-Gradient</strong>: Hindari gradient background di setiap section (terutama kombinasi Ungu/Biru yang sangat khas AI).</li>
            <li>❌ <strong>Excessive Rounded</strong>: Jangan gunakan <code>rounded-3xl</code> atau <code>rounded-full</code> pada semua elemen.</li>
            <li>❌ <strong>Glassmorphism Overkill</strong>: Penggunaan efek blur dan transparansi yang berlebihan malah merusak UX.</li>
            <li>❌ <strong>Hero Section Template</strong>: Hindari layout "teks di tengah + tombol CTA besar" yang terlalu standar.</li>
            <li>❌ <strong>Card Pattern Identik</strong>: Jangan gunakan pola icon-judul-deskripsi yang sama persis untuk semua info.</li>
            <li>❌ <strong>Shadow & Elevation</strong>: Hindari drop shadow yang terlalu tebal; gunakan shadow halus atau border tipis saja.</li>
            <li>❌ <strong>Default Shadcn/UI</strong>: Pastikan komponen (Button, Card, Input) sudah di-custom warnanya agar tidak terlihat seperti boilerplate.</li>
            <li>❌ <strong>Emoticon Keyboard vs Icon Library</strong>: Selalu gunakan library icon (Lucide, Phosphor) daripada emoji keyboard biasa.</li>
        </ul>

        <h3>C. Strategi Implementasi</h3>
        <p>Rekomendasi stack modern yang "gratisan":</p>
        <ul>
            <li><strong>Frontend</strong>: React (Vite) / Next.js</li>
            <li><strong>Backend</strong>: Hono.js</li>
            <li><strong>Database</strong>: Cloudflare D1</li>
            <li><strong>Tools Penting</strong>: Selama masih kuliah, manfaatkan <strong>GitHub Student Developer Pack</strong> untuk mendapatkan <strong>GitHub Copilot gratis</strong>.</li>
        </ul>

        <p><strong>Ada dua pendekatan utama:</strong></p>
        <ol>
            <li><strong>Fitur demi Fitur (Full-Stack)</strong>: 
                <ul>
                    <li>Bikin satu fitur (misal: Login) sampai tuntas (Frontend + Backend).</li>
                    <li>Pastikan style kodenya sudah sesuai keinginan.</li>
                    <li>Gunakan fitur pertama ini sebagai "referensi" untuk fitur berikutnya agar konsisten.</li>
                </ul>
            </li>
            <li><strong>Frontend First</strong>: 
                <ul>
                    <li>Cocok untuk aplikasi dengan UI kompleks.</li>
                    <li>Buat UI statis dulu, baru integrasikan backend.</li>
                    <li><strong>Risiko</strong>: Tantangan integrasi di akhir jika tidak direncanakan dengan baik.</li>
                </ul>
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="3. Menjaga 'Flow' & Loop (Vibe State)">
        <p>
            Vibe Coding sangat bergantung pada kecepatan iterasi. Jika kamu berhenti terlalu lama untuk memperbaiki error kecil, "vibe"-nya akan hilang.
        </p>
        <ol>
            <li><strong>Tight Feedback Loop</strong>: Langsung jalankan kode segera setelah AI selesai menulis. Gunakan <em>hot-reload</em> agar perubahan langsung terlihat.</li>
            <li><strong>Jangan Debat Hal Kecil</strong>: Jika AI melakukan kesalahan minor di UI (misal: margin kurang 2px), lebih baik perbaiki sendiri secara manual daripada harus ngetik prompt panjang. Simpan energi prompt untuk logika yang berat.</li>
            <li><strong>Pindahkan Konteks</strong>: Jika satu chat sudah terlalu panjang dan AI mulai "lemot" atau mulai ngaco, buat chat baru. Berikan rangkuman kode terakhir sebagai konteks awal (Context Refresh).</li>
            <li><strong>Human as Editor-in-Chief</strong>: Kamu adalah sutradaranya. AI adalah kru produksinya. Pastikan kamu tetap memegang kendali arah besar proyek, jangan biarkan AI mendikte fitur apa yang "seharusnya" ada jika itu tidak sesuai visi awalmu.</li>
        </ol>
    </NoteSection>

    <NoteSection title="4. Teknik Lanjutan dalam Vibe Coding">
        <h3>Context Engineering</h3>
        <p>
            Berikan konteks yang tepat. Jangan biarkan AI menebak. Jika ada dokumentasi framework khusus atau design system, berikan informasinya terlebih dahulu.
        </p>

        <h3>Parallel Prompting</h3>
        <p>Sambil menunggu AI menulis kode yang panjang, gunakan jendela/chat AI lain dalam proyek yang sama untuk:</p>
        <ul>
            <li>Meriset dokumentasi fitur selanjutnya.</li>
            <li>Menganalisis potensi bug pada file yang sudah ada.</li>
            <li>Menyiapkan aset atau skema database.</li>
        </ul>

        <h3>Refactoring Bertahap</h3>
        <p>
            Jangan refactor satu proyek sekaligus. Lakukan per file. Tanyakan kelebihan dan kekurangan kode yang sekarang, lalu minta saran optimasi sebelum dieksekusi.
        </p>

        <h3>Iterasi "Apa yang Belum?"</h3>
        <p>
            Gunaka prompt berulang untuk mengecek ketidakkonsistenan. Tanya: <em>"Coba cek lagi, apakah ada bagian UI yang belum konsisten?"</em>. Terus ulangi sampai AI tidak menemukan lagi hal yang perlu diperbaiki.
        </p>
    </NoteSection>

    <NoteSection title="5. Menangani Legacy Code (Reverse Engineering)">
        <p>Jika harus memperbaiki kode lama yang berantakan:</p>
        <ol>
            <li>Minta AI membuat <strong>dokumentasi teknis</strong> dari kode tersebut (Reverse Engineering).</li>
            <li>Pahami alur datanya.</li>
            <li>Pilih strategi: <strong>Perbaiki per file</strong> atau <strong>Tulis Ulang (Rewrite)</strong> berdasarkan dokumentasi teknis yang baru dibuat.</li>
        </ol>
    </NoteSection>

    <NoteSection title="6. Keamanan & Etika (Penting!)">
        <ul>
            <li>
                <strong>Data Kredensial</strong>: Jangan pernah meng-upload API Key, password, atau data sensitif lainnya ke dalam chat AI. Gunakan variabel environment (<code>.env</code>) dan berikan contoh dummy jika perlu mendiskusikan bagian kode tersebut.
            </li>
            <li>
                Untuk jaga-jaga, selama development jangan masukin env yang beneran dulu, khawatirnya si AI bisa ngebaca file <code>.env</code> nya.
            </li>
            <li>
                <strong>Verifikasi Output</strong>: Selalu asumsikan AI bisa melakukan kesalahan (<em>hallucination</em>). Verifikasi setiap logika krusial, terutama yang berkaitan dengan perhitungan uang atau keamanan data.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="7. Tantangan & Solusi (Safety Net)">
        <p>
            Meskipun Vibe Coding sangat efisien, ada beberapa risiko yang harus diwaspadai agar proyek tidak berantakan di tengah jalan:
        </p>

        <h3>A. Context Debt (Hutang Konteks)</h3>
        <p>
            AI memiliki batasan memori (<em>context window</em>). Semakin panjang chat, AI akan mulai lupa keputusan di awal.
        </p>
        <Callout type="tip" title="Solusi">
            Selalu dokumentasikan keputusan penting (misal: skema database, pilihan library, atau aturan styling) ke dalam file <code>README.md</code> atau <code>notes.md</code>. Saat kamu harus pindah ke chat baru, berikan file dokumentasi ini sebagai konteks awal.
        </Callout>

        <h3>B. Ilusi "Kelihatannya Jalan" (Testing Gap)</h3>
        <p>
            Hanya karena aplikasi terlihat bagus dan tombolnya bisa diklik, bukan berarti logikanya sudah benar di semua skenario.
        </p>
        <Callout type="tip" title="Solusi">
            Jangan malas untuk meminta AI membuat <strong>Unit Testing</strong>. Katakan: <em>"Buatkan unit test untuk fungsi X untuk memastikan semua edge cases tertangani"</em>. Verifikasi manual tetap wajib, terutama untuk fitur krusial.
        </Callout>

        <h3>C. Ketergantungan pada Tool (Tool Dependency)</h3>
        <p>
            Jika kamu terlalu bergantung pada satu AI, kamu akan lumpuh saat AI tersebut mengalami penurunan performa atau sedang <em>down</em>.
        </p>
        <Callout type="warning" title="Solusi">
            Tetap asah pemahaman fundamental. Gunakan AI untuk <strong>mempercepat</strong>, bukan <strong>menggantikan</strong> otakmu. Pastikan kamu masih bisa membaca dan menjelaskan setiap baris kode yang dihasilkan AI.
        </Callout>
    </NoteSection>

    <NoteSection title="8. Cheat Sheet: Prompt 'Socrates' (Kritis & Diskusi)">
        <p>
            Inti dari Vibe Coding adalah kolaborasi. Gunakan prinsip <strong>"Jangan sok tau, tapi ajak diskusi"</strong> dengan menggunakan prompt yang memancing AI untuk mengkritisi balik idemu. Klik untuk menyalin prompt:
        </p>

        <div class="prompt-category">
            <h4>UI/UX & Design:</h4>
            <div class="prompt-list">
                <button class="prompt-item" onclick={() => copyPrompt("Kritisi tampilan screenshot ini dari sisi UI/UX. Apa yang kurang?", "ui1")} class:copied={copiedId === "ui1"}>
                    <span class="prompt-text">"Kritisi tampilan screenshot ini dari sisi UI/UX. Apa yang kurang?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "ui1" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Menurutmu, bagian mana yang paling membingungkan bagi pengguna baru?", "ui2")} class:copied={copiedId === "ui2"}>
                    <span class="prompt-text">"Menurutmu, bagian mana yang paling membingungkan bagi pengguna baru?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "ui2" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Berikan beberapa opsi layout berbeda untuk fitur ini menggunakan ASCII dan jelaskan alasan masing-masing.", "ui3")} class:copied={copiedId === "ui3"}>
                    <span class="prompt-text">"Berikan beberapa opsi layout berbeda untuk fitur ini menggunakan ASCII dan jelaskan alasan masing-masing."</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "ui3" ? "check" : "copy"} size={14} /></span>
                </button>
            </div>
        </div>

        <div class="prompt-category">
            <h4>Kualitas Kode & Keamanan:</h4>
            <div class="prompt-list">
                <button class="prompt-item" onclick={() => copyPrompt("Apakah masih ada potensi masalah dari sisi maintability?", "code1")} class:copied={copiedId === "code1"}>
                    <span class="prompt-text">"Apakah masih ada potensi masalah dari sisi maintability?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "code1" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Apakah ada potensi celah keamanan pada projeet ini?", "code2")} class:copied={copiedId === "code2"}>
                    <span class="prompt-text">"Apakah ada potensi celah keamanan pada projeet ini?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "code2" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Apakah kode ini sudah menerapkan prinsip Clean Code?", "code3")} class:copied={copiedId === "code3"}>
                    <span class="prompt-text">"Apakah kode ini sudah menerapkan prinsip Clean Code?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "code3" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Apa kekurangan dari pendekatan kode yang kamu buat tadi?", "code4")} class:copied={copiedId === "code4"}>
                    <span class="prompt-text">"Apa kekurangan dari pendekatan kode yang kamu buat tadi?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "code4" ? "check" : "copy"} size={14} /></span>
                </button>
            </div>
        </div>

        <div class="prompt-category">
            <h4>Improvement:</h4>
            <div class="prompt-list">
                <button class="prompt-item" onclick={() => copyPrompt("menurutmu, fitur aplagi yang bisa ditambahkan pada project ini?", "imp1")} class:copied={copiedId === "imp1"}>
                    <span class="prompt-text">"menurutmu, fitur aplagi yang bisa ditambahkan pada project ini?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "imp1" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("apalagi yang bisa dilakukan atau diubah untuk meningkatkan ux pada project ini?", "imp2")} class:copied={copiedId === "imp2"}>
                    <span class="prompt-text">"apalagi yang bisa dilakukan atau diubah untuk meningkatkan ux pada project ini?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "imp2" ? "check" : "copy"} size={14} /></span>
                </button>
            </div>
        </div>

        <div class="prompt-category">
            <h4>Production-Ready:</h4>
            <div class="prompt-list">
                <button class="prompt-item" onclick={() => copyPrompt("Apa kekurangan dari kode project ini?", "prod1")} class:copied={copiedId === "prod1"}>
                    <span class="prompt-text">"Apa kekurangan dari kode project ini?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "prod1" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Apa yang harus dipertimbangkan lagi agar kode ini benar-benar siap untuk production?", "prod2")} class:copied={copiedId === "prod2"}>
                    <span class="prompt-text">"Apa yang harus dipertimbangkan lagi agar kode ini benar-benar siap untuk production?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "prod2" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Coba cek lagi, apakah ada potensi masalah yang belum tertangani?", "prod3")} class:copied={copiedId === "prod3"}>
                    <span class="prompt-text">"Coba cek lagi, apakah ada potensi masalah yang belum tertangani?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "prod3" ? "check" : "copy"} size={14} /></span>
                </button>
                <button class="prompt-item" onclick={() => copyPrompt("Kritisi design system di proyek ini, apakah sudah sesuai best practice?", "prod4")} class:copied={copiedId === "prod4"}>
                    <span class="prompt-text">"Kritisi design system di proyek ini, apakah sudah sesuai best practice?"</span>
                    <span class="copy-indicator"><ThemeIcon name={copiedId === "prod4" ? "check" : "copy"} size={14} /></span>
                </button>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kesimpulan">
        <p>
            Vibe coding yang sukses adalah tentang <strong>percakapan</strong>.
            Menurutku, semakin sering kamu berdiskusi dan mengkritisi AI, semakin tinggi kualitas produk yang kamu hasilkan.
        </p>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/vibe-coding" label="Kembali ke Vibe Coding" />
</article>

<style>
    .note-article {
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
    }

    h3 {
        margin-top: 2rem;
        color: var(--color-binder);
        border-bottom: 1px solid var(--color-line);
        padding-bottom: 0.5rem;
    }

    h4 {
        margin-top: 1.5rem;
        color: var(--color-ink);
        font-weight: 600;
    }

    ul, ol {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
    }

    em {
        color: var(--color-ink-muted);
    }

    /* Prompt Styles */
    .prompt-category {
        margin-bottom: 1.5rem;
    }

    .prompt-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }

    .prompt-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        padding: 0.75rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        color: inherit;
        font-style: italic;
    }

    .prompt-item:hover {
        border-color: var(--color-binder);
        background: var(--color-surface-soft);
        transform: translateX(4px);
    }

    .prompt-item.copied {
        border-color: #27ae60;
        background: rgba(39, 174, 96, 0.05);
    }

    .prompt-text {
        flex: 1;
        margin-right: 1rem;
    }

    .copy-indicator {
        color: var(--color-ink-muted);
        opacity: 0.5;
        transition: all 0.2s ease;
    }

    .prompt-item:hover .copy-indicator {
        opacity: 1;
        color: var(--color-binder);
    }

    .prompt-item.copied .copy-indicator {
        color: #27ae60;
        opacity: 1;
    }
</style>
