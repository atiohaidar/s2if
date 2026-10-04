<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import CodePlayground from './CodePlayground.svelte';
  import { ExternalLink } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Fundamental Programming untuk Vibe Coding - S2IF Notebook</title>
  <meta
    name="description"
    content="Catatan santai fundamental programming untuk vibe coding: Tipe Data & JSON, Function, Urutan Eksekusi, Debugging, dan Integrasi API."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Fundamental Programming untuk Vibe Coding"
    date="04 Oktober 2026"
    status="done"
    tags={['Vibe Coding', 'Fundamental', 'Praktek', 'Interactive']}
  />

  <NoteSection title="Kenapa Materi Ini Ada?">
    <Callout type="info" title="Yang Perlu Dicari Tau">
      Menurutku, modal dasar yang perlu dicari tau buat vibe coding tuh sebenernya ini aja:
      <ul class="clean-list">
        <li><strong>Tipe Data</strong> (ini bahkan masuk ke format JSON)</li>
        <li><strong>Urutan Eksekusi & Scope</strong> (eksekusi dari atas ke bawah dan batasan kurung kurawal)</li>
        <li><strong>Branching (If Else)</strong> (belok sesuai kondisi)</li>
        <li><strong>Looping</strong> (muter berulang-ulang)</li>
        <li><strong>Function</strong> (mesin pengolah input jadi output)</li>
        <li><strong>Syntax & Debugging</strong> (baca pesan error tanpa panik)</li>
        <li>
          <strong>Basic integrasi frontend-backend dengan API</strong> (kayak POST method atau nyambung
          ke sistem lain)
        </li>
      </ul>
    </Callout>

    <p>
      Dan biar <strong>ngerasain ngoding tuh kayak gimana</strong>, di setiap bagian konsepnya
      langsung pake kode untuk inputnya. Tinggal coba oprek sedikit, terus klik tombol
      <strong>"Jalankan Kode"</strong> buat liat hasilnya langsung!
    </p>
  </NoteSection>

  <!-- MODUL 1 -->
  <NoteSection title="1. Tipe Data & JSON">
    <p>Di programming, data itu jenisnya ada apa aja sih?</p>
    <ul>
      <li>
        <strong>String</strong>: Teks biasa. Cirinya wajib dibungkus tanda kutip (misal:
        <code>"Budi"</code>). Kalo gak pake kutip, komputernya bingung.
      </li>
      <li>
        <strong>Number</strong>: Angka biasa buat hitung-hitungan (misal: <code>20</code>). Gak pake
        kutip.
      </li>
      <li>
        <strong>Boolean</strong>: Cuma ada dua kemungkinan: <code>true</code> (bener) atau
        <code>false</code> (salah).
      </li>
      <li><strong>Array</strong>: Daftar kumpulan data, pake kurung siku <code>[ ... ]</code>.</li>
      <li>
        <strong>Object / JSON</strong>: Nah kalau berbagai data di atas dibungkus jadi satu kesatuan
        pake kurung kurawal <code>&#123; ... &#125;</code>, itu namanya Object atau
        <strong>JSON</strong>. Waktu kita ngobrol sama AI atau ngirim data lewat API, format JSON
        ini yang paling sering dipake.
      </li>
    </ul>

    <CodePlayground
      id="play-tipe-data"
      title="Playground: Tipe Data & JSON"
      description="Liat gimana tipe data dasar ditulis dan dibungkus jadi format JSON."
      challenge="Coba ubah nama jadi namamu sendiri, ganti umur, terus ganti isMember jadi false. Klik Jalankan Kode buat liat hasilnya!"
      initialCode={`// Tipe data biasa
let nama = "Budi";
let umur = 20;
let isMember = true;
let hobi = ["ngoding", "ngopi"];

// Dibungkus jadi Object / JSON
let profil = {
  nama: nama,
  umur: umur,
  isMember: isMember,
  hobi: hobi
};

console.log("Nama:", nama, "(Tipe:", typeof nama, ")");
console.log("Umur:", umur, "(Tipe:", typeof umur, ")");
console.log("Bentuk Object:", profil);
console.log("Format JSON String:", JSON.stringify(profil));`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_datatypes.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript Data Types</a
      >
      dan
      <a
        href="https://www.w3schools.com/js/js_json_intro.asp"
        target="_blank"
        rel="noopener noreferrer">JSON Introduction</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 2 -->
  <NoteSection title="2. Urutan Eksekusi & Konsep Scope">
    <p>
      Komputer itu membaca dan mengeksekusi kode <strong>urut dari baris paling atas ke bawah loh</strong>!
      Bukan acak atau sekaligus. Jadi urutan baris itu super berpengaruh: kalau nilai variabel diubah di baris 4, 
      maka baris 5 dan seterusnya bakal menerima nilai yang baru.
    </p>

    <h3>Konsep Scope (Batas Wilayah Kurung Kurawal &#123; &#125;)</h3>
    <p>
      Nah, selain urut dari atas ke bawah, ada aturan penting soal <strong>Scope</strong> (wilayah hidup variabel).
      Scope itu batasannya adalah <strong>tanda kurung kurawal</strong> <code>&#123; ... &#125;</code>:
    </p>
    <ul>
      <li>
        Kalo kita bikin variabel (pake <code>let</code> atau <code>const</code>) di <strong>dalem kurung kurawal</strong>, 
        variabel itu cuma hidup dan dikenal di dalem kurung kurawal itu aja! Begitu keluar, komputernya gak kenal alias <em>not defined</em>.
      </li>
      <li>
        Tapi sebaliknya, variabel yang ada di <strong>luar kurung kurawal</strong>, bisa dibaca bebas sama kode yang ada di dalem.
      </li>
    </ul>

    <CodePlayground
      id="play-urutan-scope"
      title="Playground: Urutan Eksekusi & Scope"
      description="Melihat alur eksekusi baris per baris dan pembuktian batasan wilayah kurung kurawal."
      challenge="Perhatiin urutan log skor 1, 2, dan 3. Terus coba hapus tanda '//' di baris paling terakhir (console.log(rahasiaDalam)), klik Jalankan, dan lihat errornya karena variabel rahasia terkunci di dalem kurung kurawal!"
      initialCode={`// 1. Eksekusi urut dari atas ke bawah:
let skor = 10;
console.log("1. Skor awal:", skor);

skor = skor + 5;
console.log("2. Skor setelah ditambah 5:", skor);

skor = skor * 2;
console.log("3. Skor setelah dikali 2:", skor);

console.log("-----------------------------------------");

// 2. Pembuktian Konsep Scope (wilayah kurung kurawal):
let namaLuar = "Budi"; // Variabel di luar

{
  let rahasiaDalam = "Kunci Rahasia"; // Variabel di dalem scope
  console.log("Di dalem scope:", namaLuar, "bisa megang", rahasiaDalam);
}

console.log("Di luar scope:", namaLuar, "masih ada.");

// Coba hilangkan tanda '//' di baris bawah ini, lalu klik Jalankan:
// console.log(rahasiaDalam); // Bakal error karena rahasiaDalam cuma hidup di dalem kurung kurawal!`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_scope.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript Scope</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 3 -->
  <NoteSection title="3. Branching (If Else: Belok Sesuai Kondisi)">
    <p>
      Nah kalo urutan eksekusi tadi jalannya lurus dari atas ke bawah, 
      dengan <strong>Branching (Percabangan)</strong>, jalurnya <strong>bisa belok</strong>!
    </p>
    <p>
      Ini gampang banget: cek kondisi. Kalo kondisinya terpenuhi ya jalanin blok <code>if</code>,
      kalo engga terpenuhi ya belok ke blok <code>else</code>.
    </p>

    <CodePlayground
      id="play-ifelse"
      title="Playground: If Else"
      description="Melihat komputer belok ke blok kode yang sesuai dengan kondisi saldo."
      challenge="Coba ganti saldo jadi 20000 (di bawah harga kopi), terus klik Jalankan. Liat gimana outputnya belok ke blok else!"
      initialCode={`let saldo = 50000;
let hargaKopi = 35000;

console.log("Saldo awal: Rp" + saldo);
console.log("Harga kopi : Rp" + hargaKopi);

if (saldo >= hargaKopi) {
  let sisa = saldo - hargaKopi;
  console.log("✅ Berhasil beli kopi! Sisa saldo: Rp" + sisa);
} else {
  console.log("❌ Saldo gak cukup! Kurang Rp" + (hargaKopi - saldo));
  console.log("Cari kopi gratisan aja dulu.");
}`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_if_else.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript If...Else Statement</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 4 -->
  <NoteSection title="4. Looping (Muter Berulang-Ulang)">
    <p>
      Kalo Branching tadi bikin belok, nah <strong>Looping (Perulangan)</strong> ini bikin komputer 
      <strong>muter berulang-ulang</strong> ngerjain hal yang sama sampai batasnya selesai.
    </p>
    <p>
      Kalo kita punya daftar barang belanjaan, masa kita harus ngetik perintah satu-satu manual.
      Tinggal pake looping (<code>for</code>) biar dia muter sendiri sampai semua barang selesai
      diproses.
    </p>

    <CodePlayground
      id="play-looping"
      title="Playground: Looping"
      description="Komputer otomatis ngulangin proses untuk tiap barang di dalam daftar."
      challenge="Coba tambahin barang baru di keranjang (misal: 'Snack' atau 'Headphone'), terus klik Jalankan!"
      initialCode={`let keranjang = ["Buku", "Pulpen", "Kopi"];

console.log("Mulai scan keranjang belanja...");

for (let i = 0; i < keranjang.length; i++) {
  console.log("Barang ke-" + (i + 1) + ": " + keranjang[i]);
}

console.log("Semua barang beres diproses!");`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_loop_for.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript For Loop</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 5 -->
  <NoteSection title="5. Function (Mesin Pengolah)">
    <p>
      <strong>Function</strong> itu ibarat mesin pengolah (kayak blender atau kalkulator mini):
    </p>
    <ul>
      <li>Kita kasih <strong>Input</strong> (argumen/parameter yang dimasukin).</li>
      <li>Dia proses perhitungannya di dalem.</li>
      <li>Terus dia ngeluarin <strong>Output</strong> (hasil <code>return</code>-nya).</li>
    </ul>
    <p>
      Enaknya, kita bikin rumusnya <strong>cukup sekali aja</strong>, tapi bisa kita pake
      berkali-kali pake nilai input yang beda-beda.
    </p>

    <CodePlayground
      id="play-function"
      title="Playground: Function"
      description="Bikin mesin hitung diskon sekali, bisa dipanggil berkali-kali."
      challenge="Coba buat variabel baru 'sepatu' seharga 400000 diskon 30% pake fungsi hitungDiskon, terus print hasilnya!"
      initialCode={`// Bikin mesin fungsinya sekali
function hitungDiskon(barang, hargaAsli, persen) {
  let potongan = hargaAsli * (persen / 100);
  let totalBayar = hargaAsli - potongan;
  
  return {
    nama: barang,
    bayar: totalBayar,
    hemat: potongan
  };
}

// Dipake berkali-kali pake input beda
let baju = hitungDiskon("Kaos", 150000, 20);
let jaket = hitungDiskon("Jaket", 300000, 50);

console.log(baju.nama, "-> Bayar: Rp" + baju.bayar, "(Hemat Rp" + baju.hemat + ")");
console.log(jaket.nama, "-> Bayar: Rp" + jaket.bayar, "(Hemat Rp" + jaket.hemat + ")");`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_functions.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript Functions</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 6 -->
  <NoteSection title="6. Syntax & Debugging (Baca Pesan Error Tanpa Panik)">
    <p>
      Pas lagi vibe coding bareng AI, sering banget pas kodenya dijalankan tiba-tiba muncul teks
      error merah di layar.
    </p>
    <p>
      Gak usah panik. Error itu bukan berarti komputernya rusak atau kita gak bakat ngoding. Error
      itu cuma komputer ngasih tau secara jujur: <em
        >"Eh, di baris ini ada kata yang aku gak ngerti maksudnya."</em
      >. Proses nyari tau dan benerin bagian yang keliru ini namanya <strong>Debugging</strong>.
    </p>

    <CodePlayground
      id="play-debugging"
      title="Playground: Detektif Typo & Debugging"
      description="Di kode bawah ini sengaja ada typo. Klik Jalankan dulu buat liat gimana bentuk pesan errornya!"
      challenge="Perhatiin errornya: ada tulisan 'consol is not defined'. Benerin kata 'consol' jadi 'console', terus klik Jalankan lagi sampe sukses!"
      initialCode={`let user = "Rian";
let skor = 95;

// Coba langsung klik tombol 'Jalankan Kode' dulu tanpa diubah:
consol.log("Halo", user); 
console.log("Skor kamu:", skor);`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_debugging.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript Debugging</a
      >
      dan
      <a href="https://www.w3schools.com/js/js_errors.asp" target="_blank" rel="noopener noreferrer"
        >JavaScript Errors (Try Catch)</a
      >
    </p>
  </NoteSection>

  <!-- MODUL 7 -->
  <NoteSection title="7. Basic Integrasi Frontend Backend (API & POST Method)">
    <p>
      Di web modern, Frontend (tampilan yang kita liat di layar) sama Backend (server di
      belakangnya) itu kan terpisah. Terus gimana caranya mereka saling ngobrol atau nyambung ke
      sistem lain?
    </p>
    <p>
      Jawabannya lewat <strong>API</strong>:
    </p>
    <ul>
      <li>
        <strong>GET</strong>: Kalo frontend mau <strong>ngambil / minta data</strong> dari server (misal:
        minta daftar user).
      </li>
      <li>
        <strong>POST</strong>: Kalo frontend mau <strong>ngirim / nyimpen data baru</strong> ke server
        (misal: submit form pendaftaran).
      </li>
    </ul>

    <CodePlayground
      id="play-api"
      title="Playground: Integrasi API (GET & POST)"
      description="Simulasi frontend ngobrol sama backend pake method GET dan POST."
      challenge="Coba ganti isi nama dan role di bagian dataBaru (POST) pake nama dan role impianmu sendiri, terus klik Jalankan!"
      initialCode={`// 1. Minta data ke server (GET method)
console.log("1. Mengambil data user dari server...");
let responseGet = await mockApi.get("/api/users");

console.log("Status:", responseGet.status, "OK");
console.log("Daftar User:", responseGet.data);

console.log("-----------------------------------------");

// 2. Ngirim data baru ke server (POST method)
let dataBaru = {
  nama: "Doni Pratama",
  role: "Vibe Coder"
};

console.log("2. Mengirim data baru via POST:", dataBaru);
let responsePost = await mockApi.post("/api/users", dataBaru);

console.log("Status Server:", responsePost.status, "Created");
console.log("Balasan Server:", responsePost.message);
console.log("Data yang Tersimpan:", responsePost.payloadDiterima);`}
    />

    <p class="ref-hint">
      📖 <strong>Referensi W3Schools:</strong>
      <a
        href="https://www.w3schools.com/js/js_api_fetch.asp"
        target="_blank"
        rel="noopener noreferrer">JavaScript Fetch API</a
      >
      dan
      <a
        href="https://www.w3schools.com/tags/ref_httpmethods.asp"
        target="_blank"
        rel="noopener noreferrer">HTTP Methods (GET vs POST)</a
      >
    </p>
  </NoteSection>

  <!-- PENUTUP -->
  <NoteSection title="Udah Deh, Sesederhana Itu!">
    <p>
      Dengan paham dasar-dasar ini (Tipe data & JSON, if else, loop, function, cara baca error, dan
      alur API), sekarang waktu kamu vibe coding bareng AI, kamu udah punya <em>feeling</em> ngodingnya.
      Kamu paham apa yang lagi dibikin sama AI dan tau ke mana harus ngecek kalau ada yang error!
    </p>
  </NoteSection>

  <!-- REFERENSI BELAJAR -->
  <NoteSection title="Referensi Belajar Tambahan">
    <p>
      Kalo ada bagian yang pengen kamu kepoin lebih dalam dengan dokumentasi resmi atau tutorial
      step-by-step yang lengkap, ini beberapa link rujukan yang paling ramah pemula:
    </p>

    <div class="ref-grid">
      <a
        href="https://www.w3schools.com/js/"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge">W3Schools</div>
        <div class="ref-info">
          <strong>JavaScript Tutorial Lengkap</strong>
          <span>Tutorial paling santai dan to-the-point dengan fitur live "Try it Yourself".</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>

      <a
        href="https://www.w3schools.com/js/js_scope.asp"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge">W3Schools</div>
        <div class="ref-info">
          <strong>JavaScript Scope (Block Scope)</strong>
          <span>Penjelasan lengkap batasan wilayah variabel di dalam kurung kurawal.</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>

      <a
        href="https://www.w3schools.com/js/js_json_intro.asp"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge">W3Schools</div>
        <div class="ref-info">
          <strong>JSON Introduction & Syntax</strong>
          <span>Panduan format data JSON yang jadi standar komunikasi web & AI.</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>

      <a
        href="https://www.w3schools.com/tags/ref_httpmethods.asp"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge">W3Schools</div>
        <div class="ref-info">
          <strong>HTTP Methods: GET vs POST</strong>
          <span>Penjelasan ringkas perbedaan saat mengambil data vs mengirim data ke server.</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>

      <a
        href="https://www.w3schools.com/js/js_debugging.asp"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge">W3Schools</div>
        <div class="ref-info">
          <strong>JavaScript Debugging</strong>
          <span>Cara mudah membaca console dan mencari letak kesalahan kode.</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>

      <a
        href="https://developer.mozilla.org/id/docs/Learn/JavaScript/First_steps"
        target="_blank"
        rel="noopener noreferrer"
        class="ref-card"
      >
        <div class="ref-badge mdn">MDN Docs</div>
        <div class="ref-info">
          <strong>Langkah Pertama JavaScript (Bahasa Indonesia)</strong>
          <span>Dokumentasi standar web dunia dari Mozilla dalam versi bahasa Indonesia.</span>
        </div>
        <ExternalLink size={16} class="ref-ext" />
      </a>
    </div>

    <Callout type="tip" title="Langkah Selanjutnya: Mindset Computational Thinking">
      Udah ngerasain langsung gimana bentuk kode dieksekusi? Langkah berikutnya adalah melatih cara merumuskan masalah buat AI: lanjut ke <a href="/luar-perkuliahan/vibe-coding/computational-thinking"><strong>Computational Thinking dalam Vibe Coding</strong></a>.
    </Callout>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/vibe-coding" label="Kembali ke Vibe Coding" />
</article>

<style>
  .note-article {
    max-width: 840px;
    margin: 0 auto;
    line-height: 1.7;
  }

  h3 {
    margin-top: 1.75rem;
    color: var(--color-binder);
    font-size: 1.15rem;
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 0.35rem;
  }

  p {
    margin-bottom: 1rem;
    color: var(--color-ink);
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.4rem;
  }

  li {
    margin-bottom: 0.45rem;
    color: var(--color-ink);
  }

  .clean-list {
    margin: 0.5rem 0 0;
    padding-left: 1.25rem;
  }

  code {
    background: var(--color-surface-soft);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    font-family: var(--font-mono, monospace);
    font-size: 0.88em;
    color: var(--color-ink-strong);
    border: 1px solid var(--color-line);
  }

  /* Ref Hint under Playgrounds */
  .ref-hint {
    font-size: 0.88rem;
    color: var(--color-ink-muted);
    margin-top: -0.5rem;
    margin-bottom: 1.25rem;
    padding: 0.4rem 0.75rem;
    background: var(--color-surface-soft);
    border-radius: 6px;
    border-left: 3px solid var(--color-binder);
  }

  .ref-hint a {
    color: var(--color-link);
    text-decoration: underline;
    text-underline-offset: 2px;
    font-weight: 600;
  }

  .ref-hint a:hover {
    color: var(--color-binder);
  }

  /* Reference Cards Grid */
  .ref-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
    margin-top: 1rem;
  }

  .ref-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  .ref-card:hover {
    border-color: var(--color-binder);
    background: var(--color-surface-soft);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  }

  .ref-badge {
    background: #04aa6d;
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }

  .ref-badge.mdn {
    background: #1b1b1b;
  }

  .ref-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .ref-info strong {
    font-size: 0.9rem;
    color: var(--color-ink-strong);
  }

  .ref-info span {
    font-size: 0.78rem;
    color: var(--color-ink-muted);
    line-height: 1.35;
  }

  .ref-card :global(.ref-ext) {
    color: var(--color-ink-muted);
    flex-shrink: 0;
    transition: color 0.15s ease;
  }

  .ref-card:hover :global(.ref-ext) {
    color: var(--color-binder);
  }

  @media (max-width: 640px) {
    .ref-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
