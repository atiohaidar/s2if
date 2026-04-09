<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Metaheuristic Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Metaheuristic Search"
        date="09 April 2026"
        status="done"
        tags={["Optimization", "GA", "SA", "ACO", "PSO"]}
    />

    <NoteSection title="Definisi">
        <p>
            Metaheuristic search adalah pendekatan optimasi umum untuk masalah
            ruang solusi besar dan kompleks, ketika pencarian eksak terlalu
            mahal secara komputasi.
        </p>
    </NoteSection>

    <NoteSection title="Jenis Metaheuristic Populer">
        <ul>
            <li><strong>Genetic Algorithm (GA)</strong>: seleksi, crossover, mutasi.</li>
            <li><strong>Simulated Annealing (SA)</strong>: eksplorasi dengan probabilitas pendinginan.</li>
            <li><strong>Ant Colony Optimization (ACO)</strong>: jejak pheromone semut virtual.</li>
            <li><strong>Particle Swarm Optimization (PSO)</strong>: gerak partikel menuju solusi terbaik.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Penggunaan">
        <p>
            Metaheuristic banyak dipakai untuk scheduling, vehicle routing,
            feature selection, tuning hyperparameter, dan desain jaringan.
        </p>
        <Callout type="tip">
            Kekuatan metaheuristic ada pada keseimbangan eksplorasi dan
            eksploitasi. Parameter yang tepat sering lebih penting daripada
            memilih algoritma paling populer.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
