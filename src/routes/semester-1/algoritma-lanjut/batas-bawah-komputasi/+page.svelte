<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const modul5Quiz = [
        {
            question: "Mengapa sorting berbasis komparasi tidak bisa lebih cepat dari O(N log N) pada worst case?",
            options: [
                "Karena semua algoritma sorting selalu rekursif",
                "Karena jumlah permutasi input N! menuntut tinggi decision tree minimal log(N!)",
                "Karena operasi swap selalu mahal",
                "Karena memori tambahan selalu O(N)"
            ],
            correctIndex: 1,
            explanation:
                "Model pohon keputusan memberi batas bawah jumlah komparasi worst-case sebesar Omega(N log N)."
        },
        {
            question: "Kompleksitas Merge Sort dari recurrence T(N)=2T(N/2)+O(N) adalah...",
            options: ["O(N)", "O(log N)", "O(N log N)", "O(N^2)"],
            correctIndex: 2,
            explanation:
                "Setiap level rekursi mengerjakan O(N) dan jumlah level O(log N), jadi total O(N log N)."
        },
        {
            question: "Kenapa Counting Sort tidak melanggar batas bawah komparasi?",
            options: [
                "Karena Counting Sort lebih lambat dari Merge Sort",
                "Karena Counting Sort bukan algoritma sorting",
                "Karena Counting Sort tidak mengandalkan komparasi antar elemen",
                "Karena Counting Sort hanya untuk data terurut"
            ],
            correctIndex: 2,
            explanation:
                "Batas bawah decision tree hanya berlaku untuk algoritma sorting berbasis komparasi."
        }
    ];

    const lowerBoundLatex = String.raw`2^h \ge N! \Rightarrow h \ge \log(N!) = \Omega(N\log N)`;
    const mergeRecurrenceLatex = String.raw`T(N)=2T\left(\frac{N}{2}\right)+O(N)=O(N\log N)`;
</script>

<svelte:head>
    <title>Keterurutan Data dan Batas Bawah Komputasi - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi detail Modul 5: manfaat data terurut, merge sort, batas bawah sorting berbasis komparasi, dan teknik reduksi problem."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Keterurutan Data dan Batas Bawah Komputasi"
        date="13 April 2026"
        status="wip"
        tags={["DAL", "Sorting", "Lower Bound"]}
    />

    <NoteSection title="Ringkasan Materi">
        <p>
            Modul ini membahas hubungan kuat antara <strong>keterurutan data</strong>
            dan <strong>batas bawah kompleksitas komputasi</strong>. Intinya:
            data yang sudah terurut membuat banyak operasi jadi jauh lebih cepat,
            tetapi proses mengurutkan data berbasis komparasi punya batas teoretis
            yang tidak bisa dilampaui.
        </p>
        <Callout type="info" title="Catatan istilah">
            "Bound" pada modul ini merujuk ke <strong>batas bawah kompleksitas</strong>
            (lower bound), bukan topik Branch and Bound untuk pencarian solusi.
        </Callout>
        <Callout type="tip" title="Cara belajar paling efektif">
            Baca berurutan: manfaat data terurut -> merge sort -> decision tree
            lower bound -> reduksi. Urutan ini membuat alasan matematisnya terasa
            lebih natural.
        </Callout>
    </NoteSection>

    <NoteSection title="1) Kenapa Data Terurut Sangat Berharga?">
        <p>
            Mengurutkan data sebagai pra-proses sering membuat solusi utama lebih
            sederhana dan efisien. Pada data terurut, beberapa operasi penting jadi:
        </p>
        <ul>
            <li>
                <strong>Pencarian cepat</strong>: Binary Search dalam
                <code>O(log N)</code>.
            </li>
            <li>
                <strong>Deteksi duplikasi</strong>: cukup cek elemen bersebelahan
                dalam <code>O(N)</code>.
            </li>
            <li>
                <strong>Irisan dua himpunan</strong>: teknik two pointers dalam
                <code>O(N+M)</code>.
            </li>
            <li>
                <strong>Statistik pada data terurut</strong>: minimum, maksimum,
                atau elemen ke-k bisa diakses langsung pada posisi tertentu.
            </li>
            <li>
                <strong>Query rentang nilai [x, y)</strong>: lower bound dan upper
                bound masing-masing dalam <code>O(log N)</code>.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="2) Proses Merging dan Merge Sort">
        <p>
            Merge Sort memakai strategi Belah dan Kuasai. Dua bagian terurut
            digabung (merge) dengan dua pointer: pointer kiri untuk subarray A,
            pointer kanan untuk subarray B.
        </p>

        <CodeBlock
            language="python"
            filename="merge_two_sorted_arrays.py"
            code={`def merge(a, b):
    i, j = 0, 0
    c = []

    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            c.append(a[i])
            i += 1
        else:
            c.append(b[j])
            j += 1

    while i < len(a):
        c.append(a[i])
        i += 1

    while j < len(b):
        c.append(b[j])
        j += 1

    return c`}
        />
        <p>
            Diktat juga menampilkan varian merge lain yang memakai kondisi
            <code>while k &lt; RC</code> (versi or). Inti keduanya sama: pilih elemen
            terkecil di kepala dua subarray, lalu majukan pointer.
        </p>
        <CodeBlock
            language="text"
            filename="merge_sort_outline.txt"
            code={`procedure mergeSort(A[low..high))
    if low < high:
        mid <- low + (high-low)/2
        mergeSort(A[low..mid))
        mergeSort(A[mid..high))
        merge(A[low..mid), A[mid..high), Aux[low..high))
        copy Aux[low..high) back to A[low..high)`}
        />
        <p>
            Pada Merge Sort, recurrence-nya:
        </p>
        <MathBlock latex={mergeRecurrenceLatex} />
        <p>
            Kompleksitas waktu tetap <code>O(N log N)</code> bahkan pada worst case,
            dengan kebutuhan memori tambahan <code>O(N)</code> untuk array bantu.
        </p>
    </NoteSection>

    <NoteSection title="3) Model Pohon Keputusan dan Batas Bawah Sorting">
        <p>
            Untuk sorting berbasis komparasi, tiap perbandingan dianggap sebagai
            simpul internal decision tree, dan setiap hasil akhir urutan data adalah
            daun. Karena ada <code>N!</code> kemungkinan permutasi input, jumlah daun
            minimal adalah <code>N!</code>.
        </p>
        <Callout type="info" title="Makna sederhana 'batas bawah kompleksitas'">
            Batas bawah itu <strong>batas minimum</strong> langkah yang secara teori
            tetap harus dilakukan algoritma terbaik untuk kelas masalah tertentu.
            Jadi ini bukan "algoritma tertentu lambat", melainkan
            "semua algoritma sejenis tidak bisa lewat batas ini".
        </Callout>
        <MathBlock latex={lowerBoundLatex} />
        <p>
            Karena <code>log(N!)</code> bertumbuh seorde <code>N log N</code>, jumlah
            komparasi minimum di worst case juga mengikuti orde tersebut.
        </p>
        <p>
            Intuisi cepatnya: kalau input berukuran <code>N</code>, ada sangat banyak
            kemungkinan urutan awal. Algoritma komparasi harus bisa membedakan semua
            kemungkinan itu, dan tiap komparasi hanya memberi informasi terbatas.
            Karena itu, jumlah komparasi minimum tidak mungkin terlalu kecil.
        </p>
        <CodeBlock
            language="text"
            filename="lower_bound_example_n8.txt"
            code={`Contoh N = 8
Jumlah kemungkinan urutan input = 8! = 40.320

Setiap komparasi seperti pertanyaan ya/tidak,
sehingga setelah h komparasi, maksimum kasus yang bisa dibedakan = 2^h.

Supaya semua 40.320 kemungkinan bisa dibedakan:
2^h >= 40.320
h >= log2(40.320) ≈ 15,3

Artinya minimal butuh 16 komparasi (worst-case) untuk N=8.
Ini menunjukkan bahwa kebutuhan langkah tidak mungkin sekadar O(N).`}
        />
        <Callout type="warning" title="Konsekuensi penting">
            Tidak ada algoritma sorting berbasis komparasi yang bisa lebih cepat
            dari <code>Omega(N log N)</code> pada kasus terburuk.
        </Callout>
    </NoteSection>

    <NoteSection title="4) Kenapa Counting Sort Bisa Lebih Cepat?">
        <p>
            Counting Sort tidak bertentangan dengan batas bawah di atas karena ia
            <strong>bukan</strong> algoritma berbasis komparasi murni.
        </p>
        <ul>
            <li>Kompleksitasnya <code>O(N + K)</code>, tergantung rentang nilai K.</li>
            <li>Efektif untuk domain nilai diskret terbatas.</li>
            <li>Tidak cocok untuk semua jenis data (misalnya real tak-terbatas).</li>
        </ul>
    </NoteSection>

    <NoteSection title="5) Reduksi Problem dan Implikasi Kompleksitas">
        <p>
            Reduksi dipakai untuk mentransfer pengetahuan kompleksitas dari problem A
            ke problem B. Jika A direduksi ke B dengan biaya transformasi kecil,
            batas bawah A memberi petunjuk batas bawah B.
        </p>
        <ol>
            <li>
                <strong>MXP (minimum/maximum) &lt;= SORT</strong>: bisa diselesaikan
                dengan sorting dulu, tetapi jadi mahal karena terbawa biaya sorting.
            </li>
            <li>
                <strong>SORT &lt;= MXP</strong>: mengulang cari minimum menghasilkan
                pola Selection Sort dengan biaya kuadratik.
            </li>
            <li>
                <strong>SRP &lt;= SORT</strong>: data diurutkan dulu, lalu Binary Search.
            </li>
            <li>
                <strong>CHP &lt;= SORT</strong>: pada convex hull (contoh Graham Scan),
                langkah sorting sering mendominasi biaya <code>O(N log N)</code>.
            </li>
            <li>
                <strong>SORT &lt;= CHP</strong>: data dapat dipetakan ke titik di
                parabola <code>y=x^2</code>, lalu urutan titik pada convex hull
                merekonstruksi urutan data. Ini menunjukkan lower bound CHP juga
                tidak bisa lebih baik dari sorting komparasi.
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="6) Latihan Pemahaman">
        <p>
            Coba jawab kuis berikut untuk cek pemahaman konsep modul.
        </p>
        <Quiz questions={modul5Quiz} />
    </NoteSection>

    <NoteSection title="7) Ringkasan Akhir">
        <ul>
            <li>
                Data terurut membuka banyak operasi cepat (search, range query,
                dedup, dan set intersection).
            </li>
            <li>
                Merge Sort memberi jaminan <code>O(N log N)</code> dengan trade-off
                memori tambahan <code>O(N)</code>.
            </li>
            <li>
                Lower bound decision tree menjelaskan kenapa sorting komparasi
                tidak bisa menembus <code>Omega(N log N)</code> pada worst case.
            </li>
            <li>
                Teknik reduksi membantu memetakan relasi kompleksitas antar problem.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="7.1) Contoh Kelas Algoritma vs Batas Bawah">
        <ul>
            <li>
                <strong>Merge Sort / Heap Sort</strong>: <code>O(N log N)</code>,
                sudah sejalan dengan batas bawah komparasi.
            </li>
            <li>
                <strong>Quick Sort</strong>: rata-rata <code>O(N log N)</code>,
                worst case <code>O(N^2)</code>.
            </li>
            <li>
                <strong>Counting Sort</strong>: bisa <code>O(N+K)</code> karena
                bukan komparasi murni, jadi tidak melanggar teori lower bound komparasi.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="8) Checklist Cakupan Terhadap PDF Modul 5">
        <ul>
            <li>Pendahuluan manfaat data terurut: sudah.</li>
            <li>Proses merging dan merge sort: sudah.</li>
            <li>Analisis kompleksitas merge sort (waktu dan memori): sudah.</li>
            <li>Model decision tree + bukti lower bound sorting: sudah.</li>
            <li>Catatan counting sort vs lower bound komparasi: sudah.</li>
            <li>Reduksi dan implikasi (MXP, SRP, CHP): sudah.</li>
            <li>Latihan/cek pemahaman: sudah (quiz).</li>
        </ul>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
