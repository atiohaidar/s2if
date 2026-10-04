<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
</script>

<svelte:head>
  <title>Computational Thinking dalam Vibe Coding - S2IF Notebook</title>
  <meta
    name="description"
    content="Catatan Computational Thinking: pola pikir memformulasikan persoalan agar solusinya dapat dijalankan oleh agen pemroses informasi."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Computational Thinking dalam Vibe Coding"
    date="04 Oktober 2026"
    status="done"
    tags={['Vibe Coding', 'Computational Thinking', 'Mindset']}
  />

  <NoteSection title="Yang Aku Tangkep: Apa itu Computational Thinking?">
    <p class="highlight-text">
      <strong>Computational thinking</strong> itu proses memformulasikan persoalan agar solusinya dapat dijalankan oleh <strong>"agen pemroses informasi"</strong> (bisa manusia atau komputer).
    </p>
    <p>
      Jadi computational thinking itu <strong>bukan sekadar make komputer</strong>, tapi pola pikir untuk menciptakan solusi yang terstruktur.
    </p>

    <Callout type="info" title="Sederhananya">
      Sederhananya, computational thinking itu <strong>pola pikir yang dibutuhkan sebagaimana seorang programmer mau buat program</strong>.
    </Callout>

    <h3>Agen Pemroses Informasi & Critical Thinking</h3>
    <p>
      Kalo <strong>critical thinking biasa</strong> tuh bisa <em>problem solving</em> juga, tapi <strong>belum tentu solusinya bisa "dikomputerisasi"</strong>.
    </p>
    <p>
      Oh iya, <strong>"Agen Pemroses Informasi"</strong> itu engga cuman komputer, tapi juga manusia. Karena hakikatnya komputer itu meniru manusia.
    </p>
  </NoteSection>

  <NoteSection title="4 Pilar Computational Thinking">
    <p>
      Computational thinking terdiri dari <strong>4 pilar yang berkaitan satu sama lain</strong> walaupun <strong>engga harus dilakukan secara urut</strong>.
    </p>

    <div class="pillar-card">
      <h3>1. Dekomposisi</h3>
      <p>
        Dekomposisi itu <strong>bukan "mengurai"</strong>, tapi <strong>melihat struktur sehingga elemen dari struktur itu jadi teridentifikasi</strong>.
      </p>
      <div class="analogy-box">
        <span class="box-label">Contoh di stasiun:</span>
        <p>
          Dekomposisinya adalah di sana ada ruang tunggu, peron, Roti'O, toilet, ruang PPKA, dan depo lokomotif.
        </p>
      </div>
    </div>

    <div class="pillar-card">
      <h3>2. Abstraksi</h3>
      <p>
        Abstraksi itu <strong>membedakan mana yang penting dan mana yang kurang penting</strong>. 
        Bukan membuang hal yang kurang penting, tapi lebih ke <strong>memilih prioritas mana yang penting</strong>.
      </p>
      <p>
        Nah untuk abstraksi ini tergantung <em>problem</em>, <em>sudut pandang (sebagai apa)</em>, atau <em>tujuannya</em>:
      </p>
      <div class="analogy-box">
        <span class="box-label">Contoh di stasiun:</span>
        <ul>
          <li>
            <strong>Misal kita ke stasiun, tujuannya mau naik kereta:</strong> Setelah kita dekomposisi, kan jadi tau nih di stasiun ada apa aja. Kalau mau naik kereta berarti informasi tentang ruang PPKA, depo lokomotif tuh engga begitu penting. Jadi yang penting itu ruang tunggu, terus peronnya di mana.
          </li>
          <li>
            <strong>Tapi kalau mau beli tiket:</strong> Berarti informasi yang penting adalah loket.
          </li>
          <li>
            <strong>Kalau Kepala Stasiun:</strong> Mungkin menganggap ruang PPKA itu penting di stasiun.
          </li>
        </ul>
      </div>
    </div>

    <div class="pillar-card">
      <h3>3. Algoritma</h3>
      <p>
        Nah ini tuh <strong>menyusun langkah demi langkah yang instruksional yang sistematis</strong> untuk menyelesaikan masalah tersebut.
      </p>
      <div class="analogy-box">
        <span class="box-label">Berdasarkan Agen Pemroses Informasinya:</span>
        <ul>
          <li>
            Kalau si Agen Pemroses Informasinya adalah <strong>komputer</strong>: Berarti algoritma ini harus berupa <strong>kode program</strong>.
          </li>
          <li>
            Tapi kalau <strong>manusia</strong>: Ya tinggal make <strong>bahasa manusia aja biasa</strong> kek tata cara masak Indomie.
          </li>
        </ul>
      </div>
    </div>

    <div class="pillar-card">
      <h3>4. Pattern Recognition</h3>
      <p>
        Nah untuk pattern recognition, kan kita udah dapet nih solusinya. 
        Jadi kalau dapet <strong>masalah yang serupa</strong>, kita bisa <strong>menggunakan pola penyelesaian yang sama dengan masalah sebelumnya</strong>.
      </p>
      <div class="analogy-box">
        <span class="box-label">Contoh di stasiun:</span>
        <p>
          Jadi kalau kita udah tau polanya, ke stasiun kita engga harus ngulang men-define dekomposisi, abstraksi, algoritma dll, karena udah tau polanya.
        </p>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Kenapa Masuk di Vibe Coding?">
    <p>
      Kenapa catatan ini ditaruh di submateri Vibe Coding?
    </p>
    <p>
      Balik lagi ke poin awal: computational thinking itu pola pikir yang dibutuhkan sebagaimana seorang programmer mau buat program. 
      Waktu kita ngoding atau vibe coding bareng AI, AI itu kan Agen Pemroses Informasi. 
      Biar solusinya bisa jalan dan terstruktur, pola pikir 4 pilar inilah yang kita pakai buat merumuskan masalahnya.
    </p>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/vibe-coding" label="Kembali ke Vibe Coding" />
</article>

<style>
  .note-article {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .highlight-text {
    font-size: 1.05rem;
    color: var(--color-ink-strong);
    background: var(--color-surface-soft);
    border-left: 4px solid var(--color-binder);
    padding: 0.85rem 1.15rem;
    border-radius: 0 8px 8px 0;
    margin: 1rem 0;
  }

  h3 {
    margin-top: 1.5rem;
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
    margin-bottom: 0.75rem;
    padding-left: 1.4rem;
  }

  li {
    margin-bottom: 0.5rem;
    color: var(--color-ink);
  }

  /* Pillar Cards */
  .pillar-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  }

  .pillar-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    border-bottom: none;
    padding-bottom: 0;
    font-size: 1.2rem;
  }

  .analogy-box {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    border-left: 3px solid var(--color-binder);
    border-radius: 0 6px 6px 0;
    padding: 0.85rem 1rem;
    margin-top: 0.75rem;
  }

  .analogy-box .box-label {
    display: block;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-binder);
    margin-bottom: 0.4rem;
  }

  .analogy-box p {
    margin: 0;
    font-size: 0.95rem;
  }

  .analogy-box ul {
    margin: 0;
    padding-left: 1.25rem;
  }
</style>
