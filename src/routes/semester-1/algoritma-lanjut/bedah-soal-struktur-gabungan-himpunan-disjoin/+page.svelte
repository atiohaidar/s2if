<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";

    const opsiSoal1 = [
        "parent[a,b,...,h]={f,f,f,g,f,f,f,f} dan rank[a,b,...,h]={0,0,2,0,1,3,2,0}",
        "parent[a,b,...,h]={e,c,f,g,f,f,f,g} dan rank[a,b,...,h]={0,0,1,0,1,2,1,0}",
        "parent[a,b,...,h]={a,a,b,a,a,e,d,d} dan rank[a,b,...,h]={2,1,0,1,1,0,0,0}",
        "parent[a,b,...,h]={f,f,f,g,f,f,f,f} dan rank[a,b,...,h]={0,0,1,0,1,2,1,0}",
        "parent[a,b,...,h]={a,a,b,a,a,e,d,d} dan rank[a,b,...,h]={4,1,0,2,1,0,0,0}"
    ];

    const langkahOperasi = [
        "union(a,e)",
        "union(d,g)",
        "union(h,g)",
        "printfind(h)",
        "union(e,f)",
        "union(b,c)",
        "union(a,b)",
        "printfind(b)",
        "printfind(d)"
    ];
</script>

<svelte:head>
    <title>Bedah Soal: Struktur Gabungan Himpunan Disjoin - S2IF Notebook</title>
    <meta
        name="description"
        content="Bedah soal DSU: telusuri perubahan parent[] dan rank[] setelah rangkaian makeSet, union, dan find."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Struktur Gabungan Himpunan Disjoin (DSU)"
        date="16 April 2026"
        status="wip"
        tags={["Bedah Soal", "DSU", "Union-Find"]}
    />

    <NoteSection title="Soal 1 (Sesuai Prompt)">
        <p>
            Diberikan data <code>{"{a,b,c,d,e,f,g,h}"}</code>. Setelah dilakukan
            <code>makeSet(x)</code> untuk setiap elemen, jalankan operasi berikut:
        </p>

        <ol>
            {#each langkahOperasi as op}
                <li><code>{op}</code></li>
            {/each}
        </ol>

        <p>
            Tentukan isi akhir <code>parent[]</code> dan <code>rank[]</code>.
            Opsi jawaban:
        </p>

        <ol class="option-list">
            {#each opsiSoal1 as opsi}
                <li><code>{opsi}</code></li>
            {/each}
        </ol>
    </NoteSection>

    <NoteSection title="Aturan DSU yang Dipakai pada Bedah Ini">
        <p>
            Bedah ini memakai varian DSU umum: <strong>path compression</strong> pada
            <code>find</code> dan <strong>union by rank</strong>.
        </p>

        <CodeBlock
            language="python"
            filename="aturan_dsu.py"
            code={`def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]


def union_set(x, y):
    rx = find(x)
    ry = find(y)

    if rx == ry:
        return

    if rank[rx] < rank[ry]:
        parent[rx] = ry
    elif rank[rx] > rank[ry]:
        parent[ry] = rx
    else:
        parent[rx] = ry
        rank[ry] += 1`}
        />

        <Callout type="info" title="Catatan penting">
            Saat rank sama, tie-break boleh dipilih ke kanan atau ke kiri. Keduanya valid
            selama dipakai konsisten di seluruh operasi.
        </Callout>
    </NoteSection>

    <NoteSection title="Pembahasan Langkah demi Langkah">
        <p>Inisialisasi makeSet untuk semua elemen:</p>
        <CodeBlock
            language="text"
            filename="state_awal.txt"
            code={`parent[a,b,c,d,e,f,g,h] = [a,b,c,d,e,f,g,h]
rank[a,b,c,d,e,f,g,h]   = [0,0,0,0,0,0,0,0]`}
        />

        <p>
            Karena saat rank sama ada dua kebijakan tie-break, maka untuk soal ini ada
            dua versi jawaban akhir.
        </p>

        <p><strong>Versi A (tie-break ke kanan):</strong></p>
        <CodeBlock
            language="text"
            filename="state_akhir_soal1_tie_kanan.txt"
            code={`1) union(a,e): parent[a]=e, rank[e]=1
2) union(d,g): parent[d]=g, rank[g]=1
3) union(h,g): parent[h]=g
4) printfind(h): root(h)=g (tidak mengubah state penting)
5) union(e,f): parent[f]=e
6) union(b,c): parent[b]=c, rank[c]=1
7) union(a,b): find(a)=e, find(b)=c, rank sama
   -> parent[e]=c, rank[c]=2
8) printfind(b): root(b)=c
9) printfind(d): root(d)=g

Final:
parent[a,b,c,d,e,f,g,h] = [e,c,c,g,c,e,g,g]
rank[a,b,c,d,e,f,g,h]   = [0,0,2,0,1,0,1,0]`}
        />

        <p><strong>Versi B (tie-break ke kiri):</strong></p>
        <CodeBlock
            language="text"
            filename="state_akhir_soal1_tie_kiri.txt"
            code={`1) union(a,e): parent[e]=a, rank[a]=1
2) union(d,g): parent[g]=d, rank[d]=1
3) union(h,g): parent[h]=d
4) printfind(h): root(h)=d (tidak mengubah state penting)
5) union(e,f): find(e)=a, maka parent[f]=a
6) union(b,c): parent[c]=b, rank[b]=1
7) union(a,b): find(a)=a, find(b)=b, rank sama
   -> parent[b]=a, rank[a]=2
8) printfind(b): root(b)=a
9) printfind(d): root(d)=d

Final:
parent[a,b,c,d,e,f,g,h] = [a,a,b,d,a,a,d,d]
rank[a,b,c,d,e,f,g,h]   = [2,1,0,1,0,0,0,0]`}
        />

        <Callout type="warning" title="Evaluasi opsi pada soal">
            Dengan rangkaian operasi yang diberikan, komponen &#123;a,b,c,e,f&#125; dan
            komponen &#123;d,g,h&#125; tidak pernah digabung. Karena itu, state akhir yang benar
            seharusnya tetap terdiri dari dua komponen terpisah.
        </Callout>

        <Callout type="danger" title="Kesimpulan Soal 1">
            Jadi soal ini memang bisa punya dua jawaban akhir yang sama-sama valid,
            tergantung kebijakan tie-break saat rank sama: ke kanan atau ke kiri.
        </Callout>
    </NoteSection>

    <NoteSection title="Validasi Cepat Manual">
        <ul>
            <li>Pada tie-break kanan: <code>find(b)=c</code> dan <code>find(d)=g</code>.</li>
            <li>Pada tie-break kiri: <code>find(b)=a</code> dan <code>find(d)=d</code>.</li>
            <li>Perbedaan bentuk parent tidak mengubah keabsahan partisi himpunan.</li>
            <li>Rank naik hanya saat union dua akar dengan rank yang sama.</li>
        </ul>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
