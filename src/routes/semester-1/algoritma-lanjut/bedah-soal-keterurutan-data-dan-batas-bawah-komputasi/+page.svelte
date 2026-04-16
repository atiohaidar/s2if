<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
</script>

<svelte:head>
    <title>Bedah Soal: Keterurutan Data dan Batas Bawah Komputasi - S2IF Notebook</title>
    <meta
        name="description"
        content="Bedah soal tentang kompleksitas solusi pada data terurut dan batas bawah sorting berbasis komparasi."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Keterurutan Data dan Batas Bawah Komputasi"
        date="14 April 2026"
        status="done"
        tags={['Bedah Soal', 'Sorting', 'Lower Bound']}
    />

    <NoteSection title="Soal 1 (Dari Gambar)">
        <div class="problem-sheet">
            <p>Ada dua buah situasi seperti di bawah ini:</p>
            <ol>
                <li>
                    Adanya sebuah problem X ketika datanya diurutkan lebih dulu maka kompleksitas solusi tidak akan lebih dari
                    <code>O(log N)</code>.
                </li>
                <li>
                    Ada sebuah problem Y di mana hasilnya jika dicetak/dikeluarkan akan selalu menghasilkan data yang terurut
                    membesar.
                </li>
            </ol>
            <p>Manakah pernyataan yang benar dari pilihan yang diberikan?</p>
            <p>ps. Besar data input adalah <code>N</code>.</p>
            <p><strong>Pilihan jawaban:</strong></p>
            <ol type="A">
                <li>Kompleksitas problem X <code>Ω(N log N)</code> dan kompleksitas solusi Y <code>O(N log N)</code></li>
                <li>Kompleksitas problem X <code>Ω(N log N)</code> dan kompleksitas solusi Y <code>O(log N)</code></li>
                <li>Kompleksitas solusi X <code>O(N log N)</code> dan kompleksitas problem Y <code>Ω(N log N)</code></li>
                <li>Kompleksitas solusi X <code>O(log N)</code> dan kompleksitas problem Y <code>Ω(N log N)</code></li>
            </ol>
        </div>

        <Callout type="info" title="Inti baca soalnya">
            <p>
                Soal ini sedang membandingkan dua ide penting: <strong>solusi pada data terurut</strong> dan
                <strong>batas bawah sorting berbasis komparasi</strong>.
            </p>
            <p>
                Kalau data sudah terurut, banyak problem query bisa diselesaikan dengan <code>O(log N)</code>.
                Tapi kalau data awal belum terurut, biaya sorting tetap harus dihitung.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Bedah Konsep X">
        <p>
            Pernyataan pertama mengatakan bahwa setelah data diurutkan, solusi problem X tidak lebih dari
            <code>O(log N)</code>. Ini tipikal problem seperti pencarian atau query pada data terurut.
        </p>
        <Callout type="info" title="Kenapa X dijumlah?">
            <p>
                Karena narasi X berbunyi <strong>"ketika datanya diurutkan lebih dulu"</strong>, berarti ada
                tahap preprocessing sorting sebelum proses inti dijalankan.
            </p>
            <p>
                Jadi biaya total solusi X dihitung sebagai:
                biaya sorting <code>O(N log N)</code> ditambah biaya query pada data terurut <code>O(log N)</code>.
            </p>
            <p>
                Ini beda dengan Y yang langsung problem sorting, sehingga tidak ditulis sebagai penjumlahan dua tahap.
            </p>
        </Callout>
        <p>
            Jadi urutan biaya yang relevan untuk data mentah adalah:
        </p>
        <MathBlock latex={String.raw`T_X(N)=O(N\log N)+O(\log N)=O(N\log N)`} />
        <p>
            Artinya, kalau yang dimaksud adalah <strong>kompleksitas solusi lengkap</strong>, maka X berada pada
            <code>O(N log N)</code> karena sorting-nya tidak bisa diabaikan.
        </p>
    </NoteSection>

    <NoteSection title="Bedah Konsep Y">
        <p>
            Pernyataan kedua mendeskripsikan problem yang keluarannya selalu terurut membesar. Ini persis ciri
            <strong>sorting</strong>.
        </p>
        <Callout type="info" title="Narasi mana yang jadi dasar Y = sorting?">
            <p>
                Dasarnya ada di kalimat soal: <strong>"hasilnya jika dicetak/dikeluarkan akan selalu menghasilkan data yang terurut membesar"</strong>.
                Ini berarti output yang diminta memang urutan elemen secara naik, yaitu definisi tugas sorting.
            </p>
            <p>
                Karena Y dibaca sebagai problem sorting berbasis komparasi, kita pakai teorema batas bawah sorting:
                <code>Omega(N log N)</code> pada worst-case.
            </p>
        </Callout>
        <p>
            Untuk sorting berbasis komparasi, batas bawah worst-case-nya adalah:
        </p>
        <MathBlock latex={String.raw`\Omega(N\log N)`} />
        <p>
            Jadi problem Y memiliki batas bawah komputasi sebesar <code>Omega(N log N)</code>.
        </p>
        <Callout type="tip" title="Kenapa Y tidak dijumlah dengan N log N lagi?">
            <p>
                Pada Y, proses utamanya memang sorting itu sendiri. Jadi tidak ada tahap tambahan seperti
                "sort dulu lalu query" yang harus dijumlahkan seperti pada X.
            </p>
            <p>
                Karena itu, untuk Y kita langsung bicara batas bawah problemnya: <code>Omega(N log N)</code>
                (khusus model sorting berbasis komparasi), bukan <code>O(...)+O(...)</code>.
            </p>
            <p>
                Ringkas beda notasinya: <code>O</code> itu batas atas (maksimal), sedangkan <code>Ω</code>
                itu batas bawah (minimal yang tetap harus terjadi).
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Jawaban yang Benar">
        <Callout type="success" title="Pilihan benar">
            <p>
                <strong>Kompleksitas solusi X <code>O(N log N)</code> dan kompleksitas problem Y <code>Ω(N log N)</code></strong>.
            </p>
        </Callout>

        <p>
            Jadi jawaban yang tepat adalah <strong>opsi 3</strong>.
        </p>
    </NoteSection>

    <NoteSection title="Kenapa Opsi Lain Salah">
        <ul>
            <li>
                Opsi 1 salah karena X ditulis <code>Ω(N log N)</code>, padahal yang dibahas adalah <em>solusi</em> X dengan
                preprocessing sorting, bukan lower bound problem X.
            </li>
            <li>
                Opsi 2 salah karena Y bukan <code>O(log N)</code>; menghasilkan data terurut adalah ciri sorting, dan sorting
                komparasi punya batas bawah <code>Ω(N log N)</code>.
            </li>
            <li>
                Opsi 4 salah karena <code>O(log N)</code> untuk X hanya berlaku jika data sudah terurut dan biaya sorting
                diabaikan. Dalam soal kompleksitas solusi lengkap, sorting tetap masuk hitungan.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Ringkasan 1 Kalimat">
        <p>
            X adalah problem yang bisa dicari cepat pada data terurut, tetapi tetap butuh sorting di awal sehingga totalnya
            <code>O(N log N)</code>; Y adalah problem sorting, jadi batas bawahnya <code>Ω(N log N)</code>.
        </p>
    </NoteSection>

    <NoteSection title="Soal 2 (Merging Dua Array Terurut)">
        <div class="problem-sheet">
            <p>
                <strong>Maksud "algoritma merging varian and"</strong>:
                ini adalah versi merge yang loop utamanya berjalan selama
                <code>i &lt; R1 and j &lt; R2</code> (dua sisi harus sama-sama masih punya elemen).
            </p>
            <p>
                Setelah salah satu sisi habis, sisa elemen dari sisi lain disalin oleh loop sisa.
                Karena itu strukturnya selalu 3 loop: loop utama <strong>X</strong>, lalu loop sisa
                <strong>Y</strong> dan <strong>Z</strong>.
            </p>
            <p>
                Diberikan dua array terurut:
                <code>A[0..N-1] = &#123;1,1,3,9&#125;</code> dan
                <code>B[0..M-1] = &#123;1,4,5,5,5&#125;</code>.
            </p>
            <p>
                Algoritma merging varian <code>and</code> mempunyai 3 loop:
                <strong>X</strong> (<code>i &lt; R1 and j &lt; R2</code>),
                <strong>Y</strong> (<code>i &lt; R1</code>), dan
                <strong>Z</strong> (<code>j &lt; R2</code>).
            </p>
            <p>Loop manakah yang dieksekusi dan mana yang dilewati?</p>
            <p><strong>Pilihan jawaban:</strong></p>
            <ol type="A">
                <li>A saja</li>
                <li>A dan B</li>
                <li>tidak ada yang dilewati</li>
                <li>B dan C</li>
                <li>A dan C</li>
            </ol>
        </div>

        <Callout type="info" title="Kerangka varian and (ringkas)">
            <p>
                <code>X: while (i &lt; R1 and j &lt; R2)</code> bandingkan kepala A dan B, lalu ambil yang lebih kecil.
            </p>
            <p>
                <code>Y: while (i &lt; R1)</code> salin sisa A jika B lebih dulu habis.
            </p>
            <p>
                <code>Z: while (j &lt; R2)</code> salin sisa B jika A lebih dulu habis.
            </p>
        </Callout>

        <CodeBlock
            language="python"
            filename="merge_varian_and.py"
            code={`def merge_and(a, b):
    i, j = 0, 0
    r1, r2 = len(a), len(b)
    c = []

    # Loop X
    while i < r1 and j < r2:
        if a[i] <= b[j]:
            c.append(a[i])
            i += 1
        else:
            c.append(b[j])
            j += 1

    # Loop Y
    while i < r1:
        c.append(a[i])
        i += 1

    # Loop Z
    while j < r2:
        c.append(b[j])
        j += 1

    return c


A = [1, 1, 3, 9]
B = [1, 4, 5, 5, 5]
print(merge_and(A, B))  # [1, 1, 1, 3, 4, 5, 5, 5, 9]`}
        />
    </NoteSection>

    <NoteSection title="Bedah Soal 2">
        <p>
            Pada loop utama <strong>X</strong>, pointer <code>i</code> dan <code>j</code> bergerak sampai salah satu array habis.
            Dengan data ini, elemen di <code>B</code> lebih cepat habis karena setelah nilai 9 di <code>A</code> dibandingkan,
            elemen <code>4,5,5,5</code> di <code>B</code> akan terserap dulu.
        </p>

        <Callout type="info" title="Status akhir setelah loop X">
            <p>
                Setelah loop X selesai, kondisi menjadi <code>j = R2</code> (array B habis), sedangkan
                <code>i &lt; R1</code> (array A masih sisa elemen <code>9</code>).
            </p>
        </Callout>

        <p>
            Konsekuensinya:
        </p>
        <ul>
            <li>Loop <strong>X</strong> dieksekusi.</li>
            <li>Loop <strong>Y</strong> dieksekusi untuk menyalin sisa elemen dari A.</li>
            <li>Loop <strong>Z</strong> dilewati karena B sudah habis.</li>
        </ul>

        <Callout type="success" title="Jawaban Soal 2">
            <p>
                Loop yang masuk: <strong>X dan Y</strong>, loop yang dilewati: <strong>Z</strong>.
            </p>
            <p>
                Jika opsi A/B/C memetakan ke loop X/Y/Z secara berurutan,
                maka pilihan yang benar adalah <strong>A dan B</strong>.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Soal 3 (Pair Sum dengan Posisi Berbeda)">
        <div class="problem-sheet">
            <p>
                Diberikan <code>n</code> bilangan integer, carilah sepasang data dari posisi berbeda
                dimana jumlahnya persis senilai <code>x</code>.
            </p>
            <p>
                Input terdiri dari 2 baris. Baris pertama berisi <code>n</code> dan <code>x</code>.
                Baris kedua berisi <code>a1, a2, ..., an</code>. Batasan:
                <code>1 &lt;= n &lt;= 200000</code> dan <code>1 &lt;= x, ai &lt;= 1000000000</code>.
            </p>
            <p>
                Output dua posisi bilangan yang jumlahnya <code>x</code>. Jika solusi lebih dari satu,
                cukup cetak satu pasangan. Jika tidak ada solusi, cetak <code>TIDAK BISA</code>.
            </p>

            <p><strong>Contoh:</strong></p>
            <CodeBlock
                language="text"
                filename="contoh_soal_3.txt"
                code={`Input:
4 8
2 7 5 1
Output salah satu yang valid:
2 4

Input:
1 2
1
Output:
TIDAK BISA`}
            />
        </div>
    </NoteSection>

    <NoteSection title="Bedah Soal 3">
        <p>
            Karena <code>n</code> bisa sampai 200.000, pendekatan <code>O(N^2)</code> jelas terlalu lambat.
            Solusi yang aman dan cepat adalah memakai <strong>hash map</strong> untuk menyimpan nilai yang
            sudah pernah dilihat beserta posisinya.
        </p>

        <Callout type="info" title="Ide utamanya">
            <p>
                Saat membaca elemen <code>a[i]</code>, kita cari pasangan yang dibutuhkan:
                <code>need = x - a[i]</code>.
            </p>
            <p>
                Kalau <code>need</code> sudah ada di hash map, berarti ketemu dua posisi berbeda.
                Kalau belum ada, simpan <code>a[i]</code> ke map dan lanjut.
            </p>
        </Callout>

        <CodeBlock
            language="python"
            filename="pair_sum_positions.py"
            code={`def solve(n, x, arr):
    seen = {}  # nilai -> posisi (1-based)

    for i, value in enumerate(arr, start=1):
        need = x - value

        if need in seen:
            return f"{seen[need]} {i}"

        # Simpan posisi pertama agar output tetap valid posisi berbeda
        if value not in seen:
            seen[value] = i

    return "TIDAK BISA"


# Contoh pakai input sampel
n, x = 4, 8
arr = [2, 7, 5, 1]
print(solve(n, x, arr))  # Salah satu output valid: 2 4`}
        />

        <p>
            Kompleksitas waktu rata-rata: <code>O(N)</code>. Kompleksitas memori: <code>O(N)</code>.
            Ini memenuhi batasan input besar pada soal.
        </p>

        <Callout type="success" title="Hal penting dari output">
            <p>
                Posisi yang dicetak harus <strong>berbeda</strong>. Kode di atas otomatis menjamin ini
                karena pasangan ditemukan dari elemen sebelumnya dan elemen saat ini.
            </p>
            <p>
                Jika tidak pernah menemukan pasangan sampai akhir iterasi, hasilnya <code>TIDAK BISA</code>.
            </p>
        </Callout>
    </NoteSection>
</article>