<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Dasar Power Automate - S2IF Notebook</title>
    <meta name="description" content="Pengenalan ekosistem Power Automate dan cara kerja otomasi berbasis flow." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Dasar Power Automate"
        date="04 Mei 2026"
        status="todo"
    />

    <NoteSection title="Apa itu Power Automate?">
        <p>Power Automate adalah layanan dari Microsoft yang membantu Anda membuat alur kerja otomatis antara aplikasi dan layanan favorit Anda untuk sinkronisasi file, mendapatkan notifikasi, mengumpulkan data, dan banyak lagi.</p>
    </NoteSection>

    <NoteSection title="Jenis-jenis Flow">
        <ul>
            <li><strong>Automated Flows:</strong> Dipicu oleh peristiwa tertentu (misal: email masuk).</li>
            <li><strong>Instant Flows:</strong> Dipicu secara manual dengan menekan tombol.</li>
            <li><strong>Scheduled Flows:</strong> Berjalan pada waktu yang ditentukan (misal: setiap hari jam 8 pagi).</li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Use Case">
        <p>Berikut adalah beberapa skenario nyata di mana Power Automate dapat sangat membantu:</p>
        <ul>
            <li><strong>Notifikasi Persetujuan (Approval):</strong> Mengirimkan permintaan persetujuan secara otomatis ke Teams atau email ketika seseorang mengunggah dokumen baru ke SharePoint.</li>
            <li><strong>Penyimpanan Lampiran Email:</strong> Secara otomatis menyimpan lampiran dari setiap email yang masuk ke folder tertentu di OneDrive atau Google Drive.</li>
            <li><strong>Sinkronisasi Data:</strong> Menyalin baris data baru dari Form Microsoft ke spreadsheet Excel Online atau database SQL secara real-time.</li>
            <li><strong>Pengingat Harian:</strong> Mengirimkan pesan pengingat ke grup WhatsApp atau Teams setiap pagi berisi daftar tugas (To-Do List) dari Microsoft Planner.</li>
            <li><strong>Web Scraping & Desktop Automation:</strong> Menggunakan Power Automate Desktop untuk mengambil data dari situs web yang tidak memiliki API atau mengotomatiskan aplikasi legacy di PC.</li>
        </ul>
    </NoteSection>

    <Callout type="tip" title="Tips Produktivitas">
        <p>Anda bisa menginstal aplikasi <strong>Power Automate</strong> di smartphone untuk memicu <em>Instant Flows</em> hanya dengan satu ketukan tombol widget, sangat berguna untuk mencatat pengeluaran atau lokasi secara cepat.</p>
    </Callout>

    <BackLink href="/luar-perkuliahan/microsoft-automation" label="Kembali ke Microsoft Automation" />
</article>
