<script lang="ts">
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import NoteSection from "$lib/components/NoteSection.svelte";
</script>

<svelte:head>
    <title>Mengkritisi Paper Penelitian - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Mengkritisi Paper Penelitian"
        date="18 April 2026"
        status="done"
        tags={["Software Trend", "Paper Review", "Metodologi"]}
    />

    <NoteSection title="Prinsip Utama">
        <p>
            Inti mengkritisi paper adalah mencari <strong>validitas</strong>:
            apakah setiap klaim, metode, dan kesimpulan benar-benar didukung
            bukti yang kuat.
        </p>
        <Callout type="info">
            Mengkritisi bukan berarti hanya menjelaskan keburukan paper.
            Kelebihan paper juga perlu disampaikan.
        </Callout>
    </NoteSection>

    <NoteSection title="1. Abstrak">
        <p>
            Abstrak harus mampu menggambarkan informasi penelitian secara lengkap
            dan mandiri (self-explanatory).
        </p>
        <p><strong>Komponen yang harus ada:</strong></p>
        <ul>
            <li><strong>Introduction/Latar Belakang</strong> - pembaca harus tahu riset ini tentang apa.</li>
            <li><strong>Gap</strong> - perbedaan atau celah dengan riset sebelumnya.</li>
            <li><strong>Metodologi</strong> - metode yang digunakan (kualitatif, kuantitatif, desain eksperimen, dll.).</li>
            <li><strong>Hasil secara umum</strong> - ringkasan temuan utama.</li>
            <li><strong>Findings</strong> - kesimpulan temuan penelitian.</li>
        </ul>
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>Jika abstrak tidak lengkap, ini bisa dikritisi.</li>
            <li>Metodologi harus disebutkan walaupun hanya satu kalimat.</li>
            <li>Hasil penelitian juga harus disampaikan singkat di abstrak.</li>
        </ul>
    </NoteSection>

    <NoteSection title="2. Pendahuluan (Introduction)">
        <p>
            Pendahuluan perlu diperiksa apakah setiap pernyataan didukung
            evidence yang kuat.
        </p>
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>Setiap klaim harus memiliki dasar yang jelas.</li>
            <li>Research Question harus ada dan dirumuskan dengan jelas.</li>
            <li>Periksa apakah alur logika penulisan mudah diikuti atau membingungkan.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Kajian Pustaka (Literature Review)">
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>Keterbaruan pustaka: apakah referensi masih relevan atau sudah usang.</li>
            <li>Jika memakai referensi lama, cek sitasi conference/jurnal terbaru yang mengonfirmasi relevansinya.</li>
            <li>Keterkaitan: apakah pustaka nyambung dan relevan dengan topik penelitian.</li>
            <li>Keterkaitan teori: apakah teori sesuai dengan konteks penelitian.</li>
            <li>Gap: apakah research gap diidentifikasi dengan jelas.</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Metodologi">
        <p><strong>Aspek yang perlu diperiksa:</strong></p>
        <ul>
            <li>Partisipan/Subjek: apakah jumlah partisipan memadai untuk jenis penelitiannya.</li>
            <li>Instrumen: alat ukur apa yang digunakan, dan apakah valid serta reliabel.</li>
            <li>Metode pengumpulan data (Data Collection): apakah proses jelas dan dapat direplikasi.</li>
            <li>Sumber data: dari mana data diperoleh, dan apakah kredibel.</li>
            <li>Objek penelitian: apakah objek disebutkan dengan jelas.</li>
            <li>Detail konteks: jika berbasis proyek, nama dan konteks proyek harus disebutkan.</li>
            <li>Cara membandingkan: jika komparatif, metode perbandingan harus jelas.</li>
        </ul>
    </NoteSection>

    <NoteSection title="5. Hasil (Results)">
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>Hasil tidak boleh hanya angka, harus ada interpretasi makna.</li>
            <li>Apakah hasil mampu menjawab Research Question yang dirumuskan.</li>
            <li>Periksa konsistensi antara data yang disajikan dan klaim yang dibuat.</li>
        </ul>
    </NoteSection>

    <NoteSection title="6. Diskusi (Discussion)">
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>Diskusi harus membandingkan hasil dengan penelitian sebelumnya.</li>
            <li>Jika ada penelitian relevan yang tidak dibahas, ini bisa jadi bahan kritik.</li>
            <li>Periksa apakah penulis memberi penjelasan yang logis terhadap hasil.</li>
        </ul>
    </NoteSection>

    <NoteSection title="7. Kesimpulan (Conclusion)">
        <p><strong>Komponen yang harus ada:</strong></p>
        <ul>
            <li>Menyampaikan kembali tujuan penelitian dari awal.</li>
            <li>Menjelaskan kembali metodologi yang digunakan.</li>
            <li>Limitasi: keterbatasan penelitian harus disebutkan.</li>
            <li>Future Work: saran penelitian selanjutnya.</li>
        </ul>
        <p><strong>Poin kritik:</strong></p>
        <ul>
            <li>
                Jika future work terlalu generik atau tidak berdasar, ini bisa dikritisi.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Ringkasan Checklist">
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Bagian Paper</th>
                        <th>Pertanyaan Kunci</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Abstrak</td>
                        <td>Apakah semua komponen (latar belakang, gap, metode, hasil) ada?</td>
                    </tr>
                    <tr>
                        <td>Pendahuluan</td>
                        <td>Apakah setiap klaim didukung evidence? Adakah research question?</td>
                    </tr>
                    <tr>
                        <td>Kajian Pustaka</td>
                        <td>Apakah referensi terbaru dan relevan? Apakah gap teridentifikasi?</td>
                    </tr>
                    <tr>
                        <td>Metodologi</td>
                        <td>Apakah partisipan, instrumen, dan data collection memadai dan jelas?</td>
                    </tr>
                    <tr>
                        <td>Hasil</td>
                        <td>Apakah ada interpretasi angka? Apakah menjawab research question?</td>
                    </tr>
                    <tr>
                        <td>Diskusi</td>
                        <td>Apakah dibandingkan dengan penelitian lain? Adakah yang terlewat?</td>
                    </tr>
                    <tr>
                        <td>Kesimpulan</td>
                        <td>Apakah ada limitasi dan future work yang spesifik dan beralasan?</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="warning">
            Kunci utama mengkritisi paper adalah bertanya: "Ini kayaknya ada yang
            kurang, deh" lalu cari tahu apa yang kurang dan mengapa itu penting.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/tren-perangkat-lunak"
        label="Kembali ke Tren Perangkat Lunak"
    />
</article>

<style>
    .table-wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.75rem 0;
        font-size: 0.95rem;
    }

    th,
    td {
        border: 1px solid var(--color-line);
        padding: 0.65rem 0.75rem;
        text-align: left;
        vertical-align: top;
    }

    th {
        background: var(--color-surface-soft);
    }
</style>
