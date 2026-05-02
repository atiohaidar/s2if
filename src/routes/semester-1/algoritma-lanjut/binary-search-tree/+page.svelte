<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import MathBlock from '$lib/components/MathBlock.svelte';
  import BSTSearchVisualizer from './components/BSTSearchVisualizer.svelte';
  import BSTDeleteVisualizer from './components/BSTDeleteVisualizer.svelte';
  import BSTInsertVisualizer from './components/BSTInsertVisualizer.svelte';
  import BSTTraversalVisualizer from './components/BSTTraversalVisualizer.svelte';
  import BSTRankVisualizer from './components/BSTRankVisualizer.svelte';
  import BSTLCAVisualizer from './components/BSTLCAVisualizer.svelte';
  import BSTSuccessorVisualizer from './components/BSTSuccessorVisualizer.svelte';
  import AVLRotationVisualizer from './components/AVLRotationVisualizer.svelte';
  import Quiz from '$lib/components/Quiz.svelte';

  let h: string; // Placeholder to prevent ReferenceError if Svelte 5 misinterprets text

  const nodeStructCode = `
type Simpul struct
    kunci     : integer
    kiri      : Simpul
    kanan     : Simpul
    induk     : Simpul
    size      : integer
    tinggi    : integer
    prioritas : integer
end type
    `.trim();

  const searchParentCode = `
Diberikan:
    T   : pointer ke akar pohon BST
    p   : pointer ke cabang pohon
    val : nilai yang dicari
Hasil:
    pointer ke induk simpul dengan nilai val atau nil
Algoritma:
function searchParentBST(p, val)
    if p == nil then
        return p
    else if p.kunci ≥ val then
        if p.kiri == nil then
            return p
        else
            return searchParentBST(p.kiri, val)
        end if
    else
        if p.kanan == nil then
            return p
        else
            return searchParentBST(p.kanan, val)
        end if
    end if
end function
    `.trim();

  const updateIndukCode = `
Diberikan:
    T  : pointer ke akar pohon BST
    p  : pointer ke simpul lama
    pa : pointer ke simpul baru
Hasil:
    p ke simpul yang dihapus
Algoritma:
procedure updateInduk(p, pa)
    if p.induk == nil then
        T := pa
    else if p.induk.kiri == p then
        p.induk.kiri := pa
    else
        p.induk.kanan := pa
    end if
end procedure
    `.trim();

  const rankSearchCode = `
Diberikan:
    T : pointer ke akar pohon BST (dengan informasi size)
    k : peringkat simpul yang dicari, k > 0
Hasil:
    p : pointer ke simpul yang dicari
Algoritma:
function peringkatBST(p, k)
    if p == nil then
        return p
    else if p.kiri ≠ nil then
        peringkat := p.kiri.size + 1
    else
        peringkat := 1
    end if

    if peringkat == k then
        return p
    else if k < peringkat then
        return peringkatBST(p.kiri, k)
    else
        return peringkatBST(p.kanan, k - peringkat)
    end if
end function
    `.trim();

  const searchCode = `
Diberikan:
    T   : pointer ke akar pohon BST
    p   : pointer ke cabang pohon
    val : nilai yang dicari
Hasil:
    p   : simpul dengan nilai val atau nil
Algoritma:
function searchBST(p, val)
    if p == nil ∨ p.kunci == val then
        return p
    else if p.kunci ≥ val then
        return searchBST(p.kiri, val)
    else
        return searchBST(p.kanan, val)
    end if
end function
    `.trim();

  const minMaxCode = `
Diberikan:
    T : pointer ke akar pohon BST
    p : pointer ke cabang pohon
Hasil:
    p : simpul dengan nilai maksimum
Algoritma:
function minBST(p)
    if p == nil ∨ p.kiri == nil then
        return p
    else
        return minBST(p.kiri)
    end if
end function

function maxBST(p)
    if p == nil ∨ p.kanan == nil then
        return p
    else
        return maxBST(p.kanan)
    end if
end function
    `.trim();

  const successorCode = `
Diberikan:
    x : simpul yang dicari penerusnya
Hasil:
    y : simpul suksesor dari x
Algoritma:
function successorBST(x)
    if x.kanan ≠ nil then
        return minBST(x.kanan)
    end if
    
    y := x.induk
    while y ≠ nil ∧ x == y.kanan do
        x := y
        y := y.induk
    end while
    return y
end function
    `.trim();

  const insertCode = `
Diberikan:
    T   : pointer ke akar pohon BST
    val : nilai yang disisipkan
Hasil:
    p   : pointer ke simpul yang baru disisipkan
Algoritma:
function insertBST(val)
    p := createNode(val)
    induk := searchParentBST(T, val)
    if induk == nil then
        T := p
    else if induk.kunci > val then
        induk.kiri := p
    else
        induk.kanan := p
    end if
    p.induk := induk
    return p
end function
    `.trim();

  const deleteCode = `
Diberikan:
    T : pointer ke akar pohon BST
    p : pointer ke cabang pohon
Hasil:
    p : simpul yang dihapus
Algoritma:
function delBST(p)
    if p == nil then
        return nil
    else if p.kiri == nil ∧ p.kanan == nil then
        pa := nil
    else if p.kanan == nil then
        pa := p.kiri
    else if p.kiri == nil then
        pa := p.kanan
    else
        pa := delBST(maxBST(p.kiri))
        pa.kiri := p.kiri
        pa.kanan := p.kanan
    end if
    updateInduk(p, pa)
    return p
end function
    `.trim();

  const inorderCode = `
Diberikan:
    T : pointer ke akar pohon BST
    p : pointer ke awal simpul penelusuran inorder
Hasil:
    keterurutan data
Algoritma:
procedure inOrderBST(p)
    if p ≠ nil then
        inOrderBST(p.kiri)
        process(p.kunci)
        inOrderBST(p.kanan)
    end if
end procedure
    `.trim();

  const rotationCode = `
Diberikan:
    T : pointer ke akar pohon BST (dengan informasi size)
    p : pointer pada simpul yang akan dirotasi
Hasil:
    p : simpul berada pada posisi baru sesuai rotasi
Algoritma:
function rotasiKiriBST(p)
    pk := p.kanan
    updateInduk(p, pk)
    p.kanan := pk.kiri
    p.induk := pk
    if pk.kiri ≠ nil then
        pk.kiri.induk := p
    end if
    return pk
end function
    `.trim();
</script>

<svelte:head>
  <title>Binary Search Tree (BST) - S2IF Notebook</title>
  <meta
    name="description"
    content="Pembahasan mendalam mengenai Binary Search Tree (BST), operasi dasar, kompleksitas, hingga AVL Tree."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader title="Binary Search Tree (BST)" date="27 April 2026" status="done" />

  <NoteSection title="1. Pendahuluan">
    <p>
      Setiap struktur data dibentuk agar operasi dasar mengakses data relatif efisien.
      <strong>Binary Search Tree (BST)</strong> adalah struktur data pohon biner di mana penempatan simpul
      mengikuti aturan invarian kunci.
    </p>

    <Callout type="tip" title="Analoginya begini...">
      <p>
        Bayangkan BST seperti <strong>Lemari Arsip</strong> yang sangat rapi. Jika Anda mencari nama "Budi",
        Anda tidak perlu cek semua laci. Cukup lihat laci tengah; jika "Budi" secara abjad lebih kecil
        dari label laci itu, Anda pasti carinya di sebelah kiri. Jika lebih besar, pasti di kanan. Ini
        jauh lebih cepat daripada mencari satu-satu dari awal!
      </p>
    </Callout>

    <Callout type="info" title="Operasi Dasar BST">
      <ul>
        <li>
          <strong>Search:</strong> Mencari elemen (Rata-rata <MathBlock
            latex="O(\log N)"
            displayMode={false}
          />, Terburuk <MathBlock latex="O(N)" displayMode={false} />).
        </li>
        <li><strong>Successor/Predecessor:</strong> Mencari tetangga urutan.</li>
        <li><strong>Min/Max:</strong> Mencari nilai ekstrem.</li>
        <li><strong>Insert/Delete:</strong> Modifikasi struktur pohon.</li>
      </ul>
    </Callout>

    <h3 style="margin-top: 2rem;">Bedah Istilah (Glosarium)</h3>
    <p>
      Sebelum melangkah lebih jauh, mari kita samakan persepsi mengenai istilah-istilah teknis yang
      sering muncul:
    </p>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Istilah</th>
            <th>Penjelasan Sederhana</th>
            <th>Contoh / Analogi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kunci (Key)</strong></td>
            <td>Nilai identitas yang digunakan untuk mengurutkan data.</td>
            <td
              >Dalam database mahasiswa, <strong>NIM</strong> adalah kuncinya. Di BST, angka yang kita
              simpan (misal: 15, 20) disebut kunci.</td
            >
          </tr>
          <tr>
            <td><strong>Simpul (Node)</strong></td>
            <td>Unit atau "kotak" penyimpan data dalam pohon.</td>
            <td
              >Satu laci dalam lemari arsip. Setiap simpul punya kunci, data, dan pointer ke anak.</td
            >
          </tr>
          <tr>
            <td><strong>Invarian</strong></td>
            <td>Aturan baku yang harus selalu benar (tidak boleh dilanggar).</td>
            <td
              >Aturan "Anak kiri harus lebih kecil". Jika dilanggar, pohon tersebut bukan lagi BST.</td
            >
          </tr>
          <tr>
            <td><strong>Sub-pohon (Sub-tree)</strong></td>
            <td>Bagian dari pohon yang jika dipisah tetap membentuk struktur pohon.</td>
            <td>Dahan besar pada pohon asli yang memiliki dahan-dahan kecil di atasnya.</td>
          </tr>
          <tr>
            <td><strong>Akar (Root)</strong></td>
            <td>Simpul paling atas, titik awal pencarian.</td>
            <td>Pintu masuk utama gedung. Semua akses dimulai dari sini.</td>
          </tr>
          <tr>
            <td><strong>Daun (Leaf)</strong></td>
            <td>Simpul yang tidak memiliki anak (ujung akhir).</td>
            <td>Jalan buntu di ujung labirin.</td>
          </tr>
          <tr>
            <td><strong>Skewed (Miring)</strong></td>
            <td>Kondisi di mana pohon hanya tumbuh ke satu sisi.</td>
            <td>Antrean di kasir yang lurus memanjang, kehilangan keuntungan struktur "cabang".</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NoteSection>

  <NoteSection title="2. Struktur & Properti Dasar">
    <p>Properti invarian BST untuk setiap simpul <code>x</code>:</p>
    <ul>
      <li>
        Semua simpul di sub-pohon <strong>Kiri</strong> memiliki kunci <MathBlock
          latex="\le x.kunci"
          displayMode={false}
        />.
      </li>
      <li>
        Semua simpul di sub-pohon <strong>Kanan</strong> memiliki kunci <MathBlock
          latex="> x.kunci"
          displayMode={false}
        />.
      </li>
    </ul>

    <Callout type="warning" title="Apa itu 'Invarian'?">
      <p>
        <strong>Invarian</strong> adalah istilah keren untuk <strong>"Aturan Baku"</strong>. Dalam
        BST, aturan ini tidak boleh dilanggar. Jika ada satu angka saja yang salah posisi (misal:
        angka besar di sebelah kiri), maka pohon tersebut bukan lagi BST dan semua rumus pencarian
        kita akan rusak.
      </p>
    </Callout>

    <BSTSearchVisualizer />

    <Callout type="warning" title="Struktur Simpul">
      <p>
        Untuk mendukung operasi seperti <em>Successor</em> atau <em>Deletion</em> yang efisien,
        simpul biasanya menyimpan pointer ke <code>parent</code> (induk). Berikut adalah struktur data
        simpul menurut Diktat:
      </p>
      <CodeBlock
        code={nodeStructCode}
        language="algorithm"
        filename="Algoritma 1: Struktur Simpul BST"
      />
    </Callout>
  </NoteSection>

  <NoteSection title="3. Operasi Dasar">
    <h3>Pencarian (Search)</h3>
    <p>
      Pencarian dimulai dari akar. Jika nilai target lebih kecil dari kunci, pindah ke kiri; jika
      lebih besar, pindah ke kanan. Versi iteratif lebih disukai dalam praktek karena menghindari <em
        >overhead</em
      > rekursi.
    </p>
    <CodeBlock code={searchCode} language="algorithm" filename="Algoritma Pencarian" />

    <h3 style="margin-top: 2rem;">Minimum & Maximum</h3>
    <p>
      Mencari nilai terkecil sangat mudah: cukup telusuri anak kiri sejauh mungkin. Sebaliknya untuk
      nilai terbesar, telusuri anak kanan.
    </p>
    <CodeBlock code={minMaxCode} language="algorithm" filename="Mencari Nilai Ekstrem" />

    <h3 style="margin-top: 2rem;">Successor (Penerus)</h3>
    <p>
      Successor simpul <code>x</code> adalah simpul dengan kunci terkecil yang masih lebih besar
      dari <code>x.kunci</code>.
    </p>

    <Callout type="info" title="Bahasa Sederhananya...">
      <p>
        <strong>Successor</strong> adalah <strong>"Angka urutan berikutnya"</strong> jika semua data kita
        urutkan dari yang terkecil. Misalnya ada angka [10, 15, 20], maka suksesurnya 15 adalah 20. Di
        dalam pohon, kita butuh suksesur ini terutama saat mau menghapus angka yang punya dua anak, agar
        struktur pohon tetap rapi.
      </p>
    </Callout>

    <p>
      Jika <code>x</code> punya anak kanan, suksesurnya adalah minimum di sub-pohon kanan. Jika
      tidak, ia adalah leluhur terendah yang mana <code>x</code> berada di sub-pohon kirinya.
    </p>
    <BSTSuccessorVisualizer />
    <CodeBlock code={successorCode} language="algorithm" filename="Mencari Successor" />

    <h3 style="margin-top: 2rem;">Penyisipan (Insertion)</h3>
    <p>Penyisipan memerlukan pencarian posisi induk yang tepat terlebih dahulu.</p>
    <BSTInsertVisualizer />
    <CodeBlock
      code={searchParentCode}
      language="algorithm"
      filename="Algoritma 4: Pencarian Induk BST"
    />
    <div style="margin-top: 1rem;"></div>
    <CodeBlock code={insertCode} language="algorithm" filename="Algoritma 5: Penyisipan Elemen BST" />

    <h3 style="margin-top: 2rem;">Penghapusan (Deletion)</h3>
    <p>
      Menghapus simpul <code>z</code> memerlukan pembaruan relasi induk-anak.
    </p>
    <CodeBlock
      code={updateIndukCode}
      language="algorithm"
      filename="Algoritma 7: Update Induk Simpul"
    />
    <div style="margin-top: 1rem;"></div>
    <BSTDeleteVisualizer />
    <CodeBlock code={deleteCode} language="algorithm" filename="Algoritma 6: Penghapusan Simpul" />

    <h3 style="margin-top: 2rem;">Penelusuran (Traversal)</h3>
    <p>
      Tiga jenis penelusuran utama pada BST: In-Order (menghasilkan data terurut), Pre-Order (untuk
      menyalin pohon), dan Post-Order (untuk menghapus pohon).
    </p>
    <BSTTraversalVisualizer />
  </NoteSection>

  <NoteSection title="4. Analisis Kompleksitas">
    <p>
      Efisiensi BST sangat bergantung pada <strong
        >tinggi pohon (<MathBlock latex="h" displayMode={false} />)</strong
      >.
    </p>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Operasi</th>
            <th>Rata-rata (Balanced)</th>
            <th>Terburuk (Skewed)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Search / Insert / Delete</td>
            <td><MathBlock latex="O(\log N)" displayMode={false} /></td>
            <td><MathBlock latex="O(N)" displayMode={false} /></td>
          </tr>
          <tr>
            <td>Min / Max / Successor</td>
            <td><MathBlock latex={'O(\\log N)'} displayMode={false} /></td>
            <td><MathBlock latex={'O(N)'} displayMode={false} /></td>
          </tr>
          <tr>
            <td>In-Order Traversal</td>
            <td><MathBlock latex="O(N)" displayMode={false} /></td>
            <td><MathBlock latex="O(N)" displayMode={false} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p style="margin-top: 1rem;">
      Kasus terburuk terjadi ketika data dimasukkan secara terurut (misal: 1, 2, 3, 4, 5), yang
      membuat pohon berbentuk seperti <em>Linked List</em>. Istilah teknisnya adalah
      <strong>Skewed</strong> atau pohon yang "miring/berat sebelah". Itulah alasan dibutuhkannya pohon
      yang setimbang (Balanced BST).
    </p>

    <Callout type="tip" title="Seberapa cepat O(log N)?">
      <p>
        Sangat cepat! Jika Anda punya <strong>1.000.000 data</strong>, pencarian biasa (satu-satu)
        butuh 1 juta langkah. Tapi dengan <MathBlock latex="O(\log N)" displayMode={false} /> di BST yang
        seimbang, Anda cuma butuh maksimal <strong>20 langkah</strong> saja.
      </p>
    </Callout>
  </NoteSection>

  <NoteSection title="5. BST Setimbang (AVL Tree)">
    <p>
      <strong>AVL Tree</strong> (Adelson-Velsky and Landis) adalah BST pertama yang bisa menyeimbangkan
      diri secara otomatis.
    </p>

    <Callout type="tip" title="Syarat Setimbang">
      <p>
        Untuk setiap simpul, perbedaan tinggi sub-pohon kiri dan kanan (<strong
          >Balance Factor / BF</strong
        >) maksimal adalah 1. Jika <MathBlock latex="|BF| > 1" displayMode={false} />, lakukan
        rotasi.
      </p>
    </Callout>

    <Callout type="info" title="Sederhananya tentang Rotasi">
      <p>
        Bayangkan Anda sedang memegang <strong>timbangan</strong>. Jika sisi kanan terlalu berat,
        Anda memindahkan beban ke kiri agar seimbang lagi. <strong>Rotasi</strong> adalah cara kita "memutar"
        posisi simpul agar tinggi pohon kiri dan kanan jadi hampir sama.
      </p>
    </Callout>

    <h3>Empat Kasus Penyeimbangan</h3>
    <p>
      Ada empat skenario utama saat pohon tidak setimbang (<MathBlock
        latex="BF > 1"
        displayMode={false}
      /> atau <MathBlock latex="BF < -1" displayMode={false} />):
    </p>

    <AVLRotationVisualizer />

    <h3 style="margin-top: 2rem;">Implementasi Rotasi</h3>
    <CodeBlock code={rotationCode} language="algorithm" filename="Kode Rotasi AVL" />

    <h3 style="margin-top: 2rem;">Analisis Tinggi (Teorema Fibonacci)</h3>
    <p>
      Mengapa AVL dijamin <MathBlock latex={'O(\\log N)'} displayMode={false} />? Diktat menjelaskan
      bahwa tinggi pohon AVL (<MathBlock latex={'h'} displayMode={false} />) dengan <MathBlock
        latex={'N'}
        displayMode={false}
      /> simpul dibatasi oleh:
    </p>
    <MathBlock latex={'h < 1.44 \\log(N + 2)'} />
    <p>
      Ini dibuktikan dengan relasi rekurensi jumlah minimum simpul <MathBlock
        latex={'N_h = 1 + N_{h-1} + N_{h-2}'}
        displayMode={false}
      />, yang sangat mirip dengan deret Fibonacci. Secara asimtotik, ini memastikan pencarian tetap
      efisien bahkan dalam kasus terburuk.
    </p>
  </NoteSection>

  <NoteSection title="6. Augmented BST & Operasi Lanjut">
    <p>
      Kita bisa menyimpan informasi tambahan di setiap simpul (seperti <code>size</code> atau
      <code>height</code>) untuk mendukung operasi yang lebih kompleks. Ini disebut sebagai
      <strong>Augmented BST</strong>.
    </p>

    <h3>Pencarian Peringkat ke-k (Rank Search)</h3>
    <p>
      Jika setiap simpul menyimpan <code>size</code> (jumlah total simpul di sub-pohonnya), kita
      bisa mencari elemen terkecil ke-k dalam waktu <MathBlock
        latex={'O(h)'}
        displayMode={false}
      />.
    </p>
    <BSTRankVisualizer />
    <CodeBlock
      code={rankSearchCode}
      language="algorithm"
      filename="Algoritma 9: Pencarian Peringkat ke-k"
    />

    <h3 style="margin-top: 2rem;">Lowest Common Ancestor (LCA)</h3>
    <p>
      LCA dari dua simpul <code>u</code> dan <code>v</code> adalah leluhur terdalam yang dimiliki
      keduanya. Di BST, mencari LCA sangat mudah: LCA adalah simpul pertama yang nilainya berada di
      antara <code>u</code> dan <code>v</code> saat kita menelusuri dari akar.
    </p>
    <BSTLCAVisualizer />

    <h3 style="margin-top: 2rem;">Aplikasi: Inversion Count</h3>
    <p>
      Selain Merge Sort, kita bisa menghitung jumlah inversi dalam array menggunakan Augmented BST.
      Saat memasukkan angka ke-<code>i</code>, jumlah elemen yang sudah ada di BST yang lebih besar
      dari angka tersebut adalah jumlah inversi untuk angka itu.
    </p>
  </NoteSection>

  <NoteSection title="7. Miskonsepsi & Fakta Penting">
    <p>
      Berdasarkan soal-soal ujian tahun lalu, berikut adalah beberapa poin krusial yang sering
      disalahpahami:
    </p>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Topik</th>
            <th>Miskonsepsi (Salah ❌)</th>
            <th>Fakta Sebenarnya (Benar ✅)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kompleksitas BST</strong></td>
            <td
              >"Semua operasi dasar BST selalu <MathBlock
                latex="O(\log N)"
                displayMode={false}
              />."</td
            >
            <td
              ><strong>Salah.</strong> Jika pohon miring (skewed), operasinya bisa menjadi <MathBlock
                latex="O(N)"
                displayMode={false}
              />. <MathBlock latex="O(\log N)" displayMode={false} /> hanya dijamin pada
              <strong>Balance BST</strong>.</td
            >
          </tr>
          <tr>
            <td><strong>Tinggi Pohon Setimbang</strong></td>
            <td>"Semua daun di Balance BST harus punya tinggi yang sama."</td>
            <td
              ><strong>Salah.</strong> Itu adalah syarat <em>Perfect Binary Tree</em>. Balance BST
              (seperti AVL) memperbolehkan selisih tinggi maksimal 1.</td
            >
          </tr>
          <tr>
            <td><strong>Kompleksitas Traversal</strong></td>
            <td
              >"Traversal BST butuh <MathBlock latex="O(N \log N)" displayMode={false} /> karena mirip
              sorting."</td
            >
            <td
              ><strong>Salah.</strong> Traversal (mengunjungi semua simpul) hanya butuh
              <strong><MathBlock latex="O(N)" displayMode={false} /></strong>. Kita hanya
              mengunjungi setiap simpul tepat satu kali.</td
            >
          </tr>
          <tr>
            <td><strong>Operasi Akar</strong></td>
            <td>"Mengganti akar BST itu sulit dan lambat."</td>
            <td
              ><strong>Salah.</strong> Jika kita sudah memegang pointernya, mengganti simpul akar
              (atau melepas subtree) secara logis dapat dilakukan dalam
              <strong><MathBlock latex="O(1)" displayMode={false} /></strong>.</td
            >
          </tr>
          <tr>
            <td><strong>Tujuan Balance BST</strong></td>
            <td>"Tujuannya agar tetap berbentuk biner."</td>
            <td
              >Tujuan utamanya adalah <strong>menjamin</strong> semua operasi (Cari, Min, Max, dsb)
              tetap dalam batas
              <strong><MathBlock latex="O(\log N)" displayMode={false} /></strong>.</td
            >
          </tr>
        </tbody>
      </table>
    </div>

    <Callout type="info" title="Ringkasan untuk Ujian">
      <ul>
        <li>
          BST biasa tidak menjamin kecepatan, tapi <strong
            >Balance BST (AVL, Red-Black, 2-3 Tree, dsb) menjamin <MathBlock
              latex="O(\log N)"
              displayMode={false}
            /></strong
          >.
        </li>
        <li>
          Hanya <strong>In-Order Traversal</strong> yang menjamin data keluar secara terurut (Sorted).
        </li>
        <li>Operasi rotasi digunakan untuk menyeimbangkan pohon tanpa merusak invarian BST.</li>
      </ul>
    </Callout>
  </NoteSection>

  <NoteSection title="8. Uji Pemahaman (Kuis)">
    <Quiz
      title="Kuis BST & AVL"
      questions={[
        {
          question:
            'Berapa kompleksitas waktu terburuk untuk operasi pencarian pada BST biasa dengan N simpul?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
          correctIndex: 2,
          explanation:
            'Pada BST yang tidak seimbang (skewed), pohon bisa berbentuk seperti Linked List, sehingga pencarian membutuhkan waktu O(N).',
        },
        {
          question:
            'Jika simpul x memiliki duplicate value, manakah kebijakan penempatan yang disarankan oleh diktat referensi?',
          options: [
            'Sub-pohon Kiri',
            'Sub-pohon Kanan',
            'Dibuang (tidak boleh duplikat)',
            'Di atas akar',
          ],
          correctIndex: 0,
          explanation:
            'Berdasarkan diktat (halaman 2), nilai yang sama diletakkan di sub-pohon kiri (<= x).',
        },
        {
          question:
            'Berapa batas maksimal selisih tinggi (Balance Factor) antara sub-pohon kiri dan kanan pada AVL Tree?',
          options: ['0', '1', '2', 'log N'],
          correctIndex: 1,
          explanation:
            'Syarat AVL adalah |BF| <= 1. Jika BF > 1 atau BF < -1, maka harus dilakukan rotasi.',
        },
        {
          question:
            'Di manakah letak Successor dari sebuah simpul x jika x memiliki sub-pohon kanan?',
          options: [
            'Maksimum di sub-pohon kiri',
            'Minimum di sub-pohon kanan',
            'Leluhur (parent) dari x',
            'Anak kiri dari x',
          ],
          correctIndex: 1,
          explanation:
            'Successor adalah nilai terkecil yang lebih besar dari x. Jika ada sub-pohon kanan, nilai tersebut pasti yang paling kiri (minimum) di sub-pohon tersebut.',
        },
        {
          question:
            'Penelusuran (traversal) manakah yang menghasilkan urutan kunci yang terurut menaik (sorted)?',
          options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
          correctIndex: 1,
          explanation:
            'In-order traversal mengunjungi (Kiri -> Akar -> Kanan), yang sesuai dengan properti invarian BST.',
        },
        {
          question:
            'Berapa batas atas tinggi (h) pohon AVL dengan N simpul menurut analisis Fibonacci?',
          options: ['h < log N', 'h < 1.44 log N', 'h < 2 log N', 'h < N'],
          correctIndex: 1,
          explanation:
            'Diktat menyebutkan h < 1.44 log(N+2), yang menjamin performa logaritmik bahkan di kasus terburuk.',
        },
        {
          question:
            'Untuk melakukan Rank Search (mencari elemen ke-k) dalam O(h), informasi tambahan apa yang harus disimpan di tiap simpul?',
          options: [
            'Tinggi (height)',
            'Warna (color)',
            'Ukuran sub-pohon (size)',
            'Nilai maksimal',
          ],
          correctIndex: 2,
          explanation:
            "Dengan menyimpan 'size' (jumlah node di sub-pohon), kita bisa menentukan apakah harus ke kiri atau kanan berdasarkan peringkat relatif di tiap cabang.",
        },
        {
          question:
            "Jika terjadi ketidakseimbangan karena penyisipan di 'anak kanan dari anak kanan' (Kasus RR), rotasi apa yang diperlukan?",
          options: [
            'Satu kali Rotasi Kanan',
            'Satu kali Rotasi Kiri',
            'Rotasi Kiri-Kanan (LR)',
            'Rotasi Kanan-Kiri (RL)',
          ],
          correctIndex: 1,
          explanation:
            'Kasus RR (Right-Right) diselesaikan dengan satu kali Rotasi Kiri pada simpul yang tidak seimbang.',
        },
        {
          question:
            'Manakah properti yang benar untuk Lowest Common Ancestor (LCA) dari simpul u dan v (di mana u < v) di sebuah BST?',
          options: ['LCA.key < u', 'LCA.key > v', 'u <= LCA.key <= v', 'LCA selalu merupakan akar'],
          correctIndex: 2,
          explanation:
            'Di BST, LCA adalah simpul pertama yang memisahkan jalur u dan v, sehingga nilainya harus berada di antara keduanya.',
        },
        {
          question: 'Apa kegunaan utama dari penelusuran Post-order?',
          options: [
            'Menghapus pohon / evaluasi ekspresi matematika',
            'Menyalin (replikasi) pohon',
            'Mencari nilai minimum',
            'Menampilkan data terurut',
          ],
          correctIndex: 0,
          explanation:
            'Post-order (Kiri -> Kanan -> Akar) sering digunakan untuk operasi penghapusan karena kita memproses anak-anaknya dulu sebelum menghapus induknya.',
        },
      ]}
    />
  </NoteSection>
  <NoteSection title="9. Latihan Mandiri (Checklist)">
    <p>Coba uji pemahamanmu dengan poin-poin berikut:</p>
    <ol>
      <li>
        Gambarkan BST yang dihasilkan dari urutan angka: <code
          >[15, 6, 18, 3, 7, 17, 20, 2, 4, 13, 9]</code
        >.
      </li>
      <li>
        Dari pohon di atas, apa <em>successor</em> dari angka 13? Dan apa <em>predecessor</em> dari angka
        17?
      </li>
      <li>
        Hapus angka 6 dari pohon tersebut. Bagaimana struktur pohonnya sekarang? (Ingat: gunakan
        suksesor sebagai pengganti).
      </li>
      <li>
        Mengapa <em>In-Order Traversal</em> pada BST selalu menghasilkan urutan data yang terurut menaik?
      </li>
      <li>Kapan kita harus memilih menggunakan AVL Tree dibandingkan BST biasa?</li>
    </ol>
  </NoteSection>

  <BackLink href="/semester-1/algoritma-lanjut" label="Kembali ke Algoritma Lanjut" />
</article>

<style>
  .visual-placeholder {
    background: var(--color-surface-soft);
    padding: 2rem;
    border-radius: 12px;
    margin: 1.5rem 0;
    border: 1px dashed var(--color-line);
    color: var(--color-primary);
  }

  .table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 8px;
    border: 1px solid var(--color-line);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-line);
  }

  th {
    background: var(--color-surface-soft);
    color: var(--color-ink-strong);
    font-weight: 600;
  }

  h3 {
    color: var(--color-ink-strong);
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .rotation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .rotation-card {
    background: var(--color-surface-soft);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--color-line);
  }

  .rotation-card h4 {
    margin: 0 0 0.5rem 0;
    color: var(--color-primary);
    font-size: 1rem;
  }

  .rotation-card p {
    font-size: 0.85rem;
    margin: 0.5rem 0 0 0;
  }

  .visual-mini {
    font-family: monospace;
    background: var(--color-surface);
    padding: 0.5rem;
    border-radius: 4px;
    text-align: center;
    border: 1px dashed var(--color-line);
    color: var(--color-ink-weak);
  }
</style>
