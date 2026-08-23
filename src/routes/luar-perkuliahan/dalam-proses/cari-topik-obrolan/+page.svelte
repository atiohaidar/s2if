<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import {
    MessageCircle,
    Lightbulb,
    Sparkles,
    ArrowRight,
    Compass,
    Share2,
    BookOpen,
  } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Cari Topik Obrolan — Cara Menjaga Percakapan Tetap Mengalir - S2IF Notebook</title>
  <meta
    name="description"
    content="Strategi praktis menemukan dan menjaga topik obrolan: dari pertanyaan pembuka ke cerita yang mengalir, teknik 'hook' dari jawaban lawan bicara, dan rumus Fakta → Alasan → Pengalaman → Pendapat → Cerita."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Cari Topik Obrolan"
    date="23 Agustus 2026"
    status="done"
    tags={['Komunikasi', 'Social Skills', 'Conversational', 'Mindset']}
  />

  <Callout type="info" title="Sumber">
    Catatan ini dirangkum dari diskusi dengan ChatGPT mengenai seni menjaga percakapan agar tidak
    mati di tengah jalan — terutama saat ketemu orang baru, misalnya anak dari kampus lain.
  </Callout>

  <!-- =========================================================
       SECTION 1: MASALAH INTI
  ========================================================== -->
  <NoteSection title="1. Akar Masalahnya">
    <div class="insight-box">
      <Lightbulb size={20} class="insight-icon" />
      <p>
        Masalahnya sering <strong>bukan karena pertanyaanmu kurang bagus</strong>, tapi karena
        pertanyaannya hanya membuka <strong>fakta</strong>, bukan membuka <strong>cerita</strong>.
      </p>
    </div>

    <p>
      Contoh klasik ketemu anak dari kampus lain — percakapan cepat mati karena pertanyaan yang
      diajukan hanya menghasilkan jawaban satu kata:
    </p>

    <div class="qa-comparison">
      <div class="qa-block closed">
        <div class="qa-header">
          <span class="qa-label closed-label">❌ Pertanyaan Tertutup (Menghasilkan Fakta)</span>
        </div>
        <div class="qa-exchanges">
          <div class="qa-row question"><span class="qa-bubble question-bubble">Kamu kuliah di mana?</span></div>
          <div class="qa-row answer"><span class="qa-bubble answer-bubble">Telkom.</span></div>
          <div class="qa-row question"><span class="qa-bubble question-bubble">Jurusan apa?</span></div>
          <div class="qa-row answer"><span class="qa-bubble answer-bubble">Informatika.</span></div>
          <div class="qa-row question"><span class="qa-bubble question-bubble">Semester berapa?</span></div>
          <div class="qa-row answer"><span class="qa-bubble answer-bubble">Semester 3.</span></div>
          <div class="qa-dead-end">💀 Selesai. Percakapan mati.</div>
        </div>
      </div>

      <div class="qa-block open">
        <div class="qa-header">
          <span class="qa-label open-label">✅ Pertanyaan Terbuka (Membuka Cerita)</span>
        </div>
        <div class="qa-exchanges">
          <div class="qa-row question"><span class="qa-bubble question-bubble">Kamu kuliah di mana?</span></div>
          <div class="qa-row answer"><span class="qa-bubble answer-bubble">Telkom.</span></div>
          <div class="qa-row question"><span class="qa-bubble question-bubble open-q">Oh Telkom. Kamu emang dari awal pengen masuk situ, atau sebenarnya ada kampus lain yang kamu incar?</span></div>
          <div class="qa-alive">🔥 Percakapan mulai hidup!</div>
        </div>
      </div>
    </div>

    <p>
      Bukan berarti pertanyaan singkat itu buruk — itu bagus sebagai <strong>pembuka</strong>. Tapi
      setelah mendapatkan jawabannya, jangan langsung pindah topik. <strong
        >Ambil sesuatu dari jawabannya.</strong>
    </p>
  </NoteSection>

  <!-- =========================================================
       SECTION 2: RUMUS FAKTA → CERITA
  ========================================================== -->
  <NoteSection title="2. Cari Pertanyaan yang Punya 'Ruang untuk Cerita'">
    <p>
      Ada pola alami yang bisa kamu ikuti untuk mendalami sebuah jawaban dari lawan bicara:
    </p>

    <div class="funnel-flow">
      <div class="funnel-step step-fakta">
        <div class="funnel-icon"><BookOpen size={16} /></div>
        <div class="funnel-content">
          <span class="funnel-label">Fakta</span>
          <span class="funnel-example">"Aku anak Informatika."</span>
        </div>
      </div>
      <div class="funnel-arrow"><ArrowRight size={16} /></div>
      <div class="funnel-step step-pengalaman">
        <div class="funnel-icon"><Compass size={16} /></div>
        <div class="funnel-content">
          <span class="funnel-label">Pengalaman</span>
          <span class="funnel-example">"Bagian yang paling kamu suka dari Informatika apa?"</span>
        </div>
      </div>
      <div class="funnel-arrow"><ArrowRight size={16} /></div>
      <div class="funnel-step step-opini">
        <div class="funnel-icon"><Lightbulb size={16} /></div>
        <div class="funnel-content">
          <span class="funnel-label">Opini / Alasan</span>
          <span class="funnel-example">"Awalnya bisa tertarik AI dari mana?"</span>
        </div>
      </div>
      <div class="funnel-arrow"><ArrowRight size={16} /></div>
      <div class="funnel-step step-cerita">
        <div class="funnel-icon"><Sparkles size={16} /></div>
        <div class="funnel-content">
          <span class="funnel-label">Cerita</span>
          <span class="funnel-example">"Berarti sebelum ChatGPT kamu sebenarnya nggak terlalu tertarik AI?"</span>
        </div>
      </div>
    </div>

    <p>
      Sekarang percakapannya sudah <strong>bergerak sendiri</strong> — kamu tinggal ikuti alirannya.
    </p>
  </NoteSection>

  <!-- =========================================================
       SECTION 3: HOOK DARI JAWABAN
  ========================================================== -->
  <NoteSection title="3. Gunakan 'Hook' dari Jawaban Mereka">
    <div class="insight-box primary">
      <MessageCircle size={20} class="insight-icon" />
      <p>
        Ini mungkin <strong>skill paling penting dalam ngobrol</strong>. Jangan terlalu sibuk
        memikirkan <em>"Pertanyaan selanjutnya apa ya?"</em> — lebih baik pikirkan:
        <strong>"Apa yang menarik dari jawaban dia tadi?"</strong>
      </p>
    </div>

    <p>Misalnya dia bilang:</p>

    <div class="quote-card">
      <p>"Aku sekarang kuliah sambil jual item game."</p>
    </div>

    <p>Nah, itu banyak banget <strong>hook</strong> yang bisa kamu ambil:</p>

    <div class="hook-grid">
      <div class="hook-item">
        <span class="hook-emoji">🎮</span>
        <span>"Jual item game? Game apa?"</span>
      </div>
      <div class="hook-item">
        <span class="hook-emoji">💡</span>
        <span>"Kok bisa kepikiran jualan?"</span>
      </div>
      <div class="hook-item">
        <span class="hook-emoji">🚀</span>
        <span>"Awalnya iseng atau memang niat bisnis?"</span>
      </div>
      <div class="hook-item">
        <span class="hook-emoji">💰</span>
        <span>"Lumayan nggak hasilnya?"</span>
      </div>
      <div class="hook-item">
        <span class="hook-emoji">😂</span>
        <span>"Pernah dapat pengalaman lucu dari jualan?"</span>
      </div>
      <div class="hook-item hook-item-highlight">
        <span class="hook-emoji">🔥</span>
        <span>"Menurutmu lebih susah cari itemnya atau cari pembelinya?"</span>
      </div>
    </div>

    <Callout type="tip" title="Kenapa hook terakhir lebih baik?">
      Pertanyaan yang meminta <em>pendapat atau perbandingan</em> (bukan sekadar fakta) lebih
      mungkin menghasilkan <strong>cerita</strong> — karena orang perlu berpikir dan mengingat
      pengalaman mereka untuk menjawabnya.
    </Callout>
  </NoteSection>

  <!-- =========================================================
       SECTION 4: KAMPUS HANYA PINTU MASUK
  ========================================================== -->
  <NoteSection title="4. Kampus Hanya Pintu Masuk, Bukan Topik Utama">
    <p>
      Kalau ketemu anak beda kampus, jangan jadikan "kampus" sebagai topik utama — itu cuma
      <strong>pintu masuk</strong>. Setelah pintu terbuka, masuk ke dalam.
    </p>

    <div class="conversation-flow">
      <div class="conv-step">
        <div class="conv-q">Kamu dari kampus mana?</div>
        <div class="conv-a">Aku dari UPI.</div>
        <div class="conv-note">Pintu terbuka →</div>
      </div>
      <div class="conv-step">
        <div class="conv-q">Oh UPI. Kenapa akhirnya milih UPI?</div>
        <div class="conv-a">Karena...</div>
        <div class="conv-note">Masuk ke alasan →</div>
      </div>
      <div class="conv-step">
        <div class="conv-q">Berarti waktu SMA emang udah tahu mau masuk jurusan itu?</div>
        <div class="conv-a">Awalnya sih...</div>
        <div class="conv-note">Masuk ke masa lalu →</div>
      </div>
      <div class="conv-step highlight-step">
        <div class="conv-q hot-q">Kalau sekarang setelah dijalanin, ternyata sesuai ekspektasi nggak?</div>
        <div class="conv-note">💬 Pengalaman pribadi + perspektif</div>
      </div>
      <div class="conv-step highlight-step">
        <div class="conv-q hot-q">Kalau bisa balik ke masa SMA, kamu bakal tetap pilih jurusan yang sama?</div>
        <div class="conv-note">🔥 Jauh lebih conversational!</div>
      </div>
    </div>
  </NoteSection>

  <!-- =========================================================
       SECTION 5: INTERVIEW vs EXPLORATION
  ========================================================== -->
  <NoteSection title="5. Percakapan ≠ Interview — Ikuti Rasa Penasaranmu">
    <div class="insight-box">
      <Compass size={20} class="insight-icon" />
      <p>
        <strong>Jangan berusaha mencari pertanyaan yang pintar. Cari sesuatu yang membuatmu
          benar-benar penasaran.</strong>
      </p>
    </div>

    <p>
      Prinsip yang sama dipakai ketika mengajar dengan menjaga rasa penasaran berlaku saat ngobrol:
      ikuti curiosity-mu, bukan script-mu.
    </p>

    <div class="mode-comparison">
      <div class="mode-card mode-bad">
        <div class="mode-icon-wrap bad-icon">❌</div>
        <h5>Mode Interview</h5>
        <div class="mode-flow">
          <span class="flow-item">Pertanyaan</span>
          <ArrowRight size={12} />
          <span class="flow-item">Jawaban</span>
          <ArrowRight size={12} />
          <span class="flow-item">Pertanyaan</span>
          <ArrowRight size={12} />
          <span class="flow-item">Jawaban</span>
        </div>
        <p class="mode-desc">Terasa seperti beasiswa interview. Kaku dan melelahkan.</p>
      </div>
      <div class="mode-card mode-good">
        <div class="mode-icon-wrap good-icon">✅</div>
        <h5>Mode Exploration</h5>
        <div class="mode-flow">
          <span class="flow-item">Jawaban</span>
          <ArrowRight size={12} />
          <span class="flow-item">Temukan sesuatu</span>
          <ArrowRight size={12} />
          <span class="flow-item">Penasaran</span>
          <ArrowRight size={12} />
          <span class="flow-item">Eksplorasi</span>
        </div>
        <p class="mode-desc">Natural, mengalir, dan terasa seperti ngobrol beneran.</p>
      </div>
    </div>
  </NoteSection>

  <!-- =========================================================
       SECTION 6: CERITA KECILMU SENDIRI
  ========================================================== -->
  <NoteSection title="6. Pakai Cerita Kecilmu Sendiri">
    <p>
      Ini penting supaya lawan bicara nggak merasa <strong>diinterogasi</strong>. Sesekali share
      pengalamanmu dulu, baru tanya.
    </p>

    <div class="share-then-ask">
      <div class="sta-label">Contoh:</div>
      <div class="sta-row">
        <div class="sta-person you">Kamu</div>
        <div class="sta-bubble">
          "Oh Telkom. Aku juga pernah kepikiran masuk Telkom dulu. Tapi akhirnya malah ambil... Kalau kamu sendiri kenapa akhirnya pilih Telkom?"
        </div>
      </div>
    </div>

    <Callout type="tip" title="Share sedikit + bertanya">
      Formula ini jauh lebih natural. Dengan berbagi cerita kecilmu, kamu menunjukkan bahwa ini
      bukan wawancara — kamu juga membuka diri. Itu mendorong lawan bicara untuk lebih terbuka.
    </Callout>

    <div class="dont-do">
      <div class="dont-label">❌ Hindari terlalu banyak pertanyaan berturut-turut:</div>
      <div class="dont-list">
        <span>"Kampus mana?"</span>
        <span>"Jurusan apa?"</span>
        <span>"Kenapa pilih jurusan itu?"</span>
        <span>"Semester berapa?"</span>
        <span>"Asalnya dari mana?"</span>
      </div>
      <div class="dont-note">Rasanya seperti <strong>interview beasiswa</strong> 😂</div>
    </div>
  </NoteSection>

  <!-- =========================================================
       SECTION 7: RUMUS SIMPEL
  ========================================================== -->
  <NoteSection title="7. Rumus Sederhana: Dari Satu Topik ke 30 Menit Ngobrol">
    <p>Kalau mau ngobrol lebih panjang, ingat rumus ini:</p>

    <div class="formula-chain">
      <div class="formula-step">
        <div class="fs-num">1</div>
        <div class="fs-text">
          <strong>Fakta</strong>
          <span>"Kamu kuliah di mana?"</span>
        </div>
      </div>
      <div class="formula-arrow">↓</div>
      <div class="formula-step">
        <div class="fs-num">2</div>
        <div class="fs-text">
          <strong>Alasan</strong>
          <span>"Kenapa pilih kampus itu?"</span>
        </div>
      </div>
      <div class="formula-arrow">↓</div>
      <div class="formula-step">
        <div class="fs-num">3</div>
        <div class="fs-text">
          <strong>Pengalaman</strong>
          <span>"Waktu masuk ternyata sesuai bayanganmu nggak?"</span>
        </div>
      </div>
      <div class="formula-arrow">↓</div>
      <div class="formula-step">
        <div class="fs-num">4</div>
        <div class="fs-text">
          <strong>Pendapat</strong>
          <span>"Bagian paling seru selama kuliah apa?"</span>
        </div>
      </div>
      <div class="formula-arrow">↓</div>
      <div class="formula-step step-cerita-final">
        <div class="fs-num">5</div>
        <div class="fs-text">
          <strong>Cerita</strong>
          <span>"Pernah ada kejadian paling absurd selama kuliah?"</span>
        </div>
      </div>
    </div>

    <div class="big-insight">
      <Share2 size={22} class="big-icon" />
      <div>
        <p>
          Dari satu topik <strong>"kampus"</strong>, kamu bisa ngobrol <strong
            >20–30 menit</strong> tanpa harus terus-terusan mencari topik baru.
        </p>
      </div>
    </div>
  </NoteSection>

  <!-- =========================================================
       SECTION 8: MINDSET UTAMA
  ========================================================== -->
  <NoteSection title="8. Mindset yang Mengubah Segalanya">
    <div class="final-quote">
      <Sparkles size={24} class="fq-icon" />
      <blockquote>
        <p>
          "Tujuan ngobrol bukan mendapatkan sebanyak mungkin informasi tentang orang lain. Tujuannya
          menemukan sesuatu yang membuat kalian berdua ingin terus membicarakannya."
        </p>
        <footer>— Itu perbedaan antara <em>"bertanya kepada seseorang"</em> dan <em>"ngobrol dengan seseorang."</em></footer>
      </blockquote>
    </div>

    <h4>Point penting untuk diingat:</h4>
    <ul class="key-points">
      <li>
        <strong>Pertanyaan sederhana sebagai acuan</strong> — Jadikan jawaban lawan bicara sebagai
        bahan untuk mendalami, cari hal yang menarik dari sana.
      </li>
      <li>
        <strong>Rumus pendalaman:</strong> Fakta → Pengalaman → Opini/Alasan → Cerita
      </li>
      <li>
        <strong>Kalau lawan bicara pendiem</strong> — Coba cerita dulu berdasarkan pengalamanmu
        yang berkaitan dengan jawaban mereka, baru ajak mereka ke arah yang sama.
      </li>
    </ul>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<style>
  /* =====================================================
     INSIGHT BOX
  ===================================================== */
  .insight-box {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    background: linear-gradient(135deg, var(--color-surface-elevated), var(--color-status-info-soft));
    border-left: 4px solid var(--color-binder);
    padding: 1.25rem 1.5rem;
    border-radius: 0 12px 12px 0;
    margin: 1.5rem 0;
  }

  .insight-box.primary {
    background: linear-gradient(135deg, var(--color-status-success-soft), var(--color-surface-elevated));
    border-left-color: var(--color-status-done-start);
  }

  .insight-box p {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.65;
    color: var(--color-ink);
  }

  :global(.insight-icon) {
    color: var(--color-binder);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .insight-box.primary :global(.insight-icon) {
    color: var(--color-status-done-start);
  }

  /* =====================================================
     QA COMPARISON
  ===================================================== */
  .qa-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .qa-block {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--color-line);
  }

  .qa-header {
    padding: 0.75rem 1rem;
    background: var(--color-surface-soft);
    border-bottom: 1px solid var(--color-line);
  }

  .qa-label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .closed-label { color: var(--color-status-error-start); }
  .open-label { color: var(--color-status-done-start); }

  .qa-exchanges {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--color-surface);
  }

  .qa-row {
    display: flex;
  }

  .qa-row.question { justify-content: flex-end; }
  .qa-row.answer { justify-content: flex-start; }

  .qa-bubble {
    max-width: 80%;
    padding: 0.5rem 0.85rem;
    border-radius: 12px;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .question-bubble {
    background: var(--color-binder);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .open-q {
    background: var(--color-status-done-start);
    color: #fff;
  }

  .answer-bubble {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    color: var(--color-ink-muted);
    border-bottom-left-radius: 4px;
  }

  .qa-dead-end {
    text-align: center;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-status-error-start);
    padding: 0.5rem;
    margin-top: 0.25rem;
  }

  .qa-alive {
    text-align: center;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-status-done-start);
    padding: 0.5rem;
    margin-top: 0.25rem;
  }

  /* =====================================================
     FUNNEL FLOW (Fakta → Cerita)
  ===================================================== */
  .funnel-flow {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin: 1.75rem 0;
    overflow-x: auto;
  }

  .funnel-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    min-width: 160px;
    flex: 1;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .funnel-step:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  }

  .funnel-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .funnel-content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .funnel-label {
    font-weight: 700;
    font-size: 0.88rem;
  }

  .funnel-example {
    font-size: 0.78rem;
    color: var(--color-ink-muted);
    font-style: italic;
    line-height: 1.4;
  }

  .funnel-arrow {
    display: flex;
    align-items: center;
    color: var(--color-ink-muted);
    padding: 0 0.25rem;
    flex-shrink: 0;
  }

  .step-fakta { background: var(--color-surface-elevated); }
  .step-fakta .funnel-icon { background: var(--color-status-info-soft); color: var(--color-binder); }
  .step-fakta .funnel-label { color: var(--color-binder); }

  .step-pengalaman { background: var(--color-surface-elevated); }
  .step-pengalaman .funnel-icon { background: rgba(130, 80, 255, 0.1); color: #8250df; }
  .step-pengalaman .funnel-label { color: #8250df; }

  .step-opini { background: var(--color-surface-elevated); }
  .step-opini .funnel-icon { background: var(--color-status-warning-soft); color: var(--color-status-warning-border); }
  .step-opini .funnel-label { color: var(--color-status-warning-border); }

  .step-cerita { background: var(--color-surface-elevated); }
  .step-cerita .funnel-icon { background: var(--color-status-success-soft); color: var(--color-status-done-start); }
  .step-cerita .funnel-label { color: var(--color-status-done-start); }

  /* =====================================================
     HOOK GRID
  ===================================================== */
  .hook-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 1.25rem 0;
  }

  .hook-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--color-ink);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .hook-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }

  .hook-item-highlight {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, var(--color-status-success-soft), var(--color-surface-elevated));
    border-color: var(--color-status-done-start);
    border-left-width: 3px;
    font-weight: 600;
  }

  .hook-emoji {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  /* =====================================================
     CONVERSATION FLOW
  ===================================================== */
  .conversation-flow {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1.5rem 0;
    border-left: 3px solid var(--color-line);
    padding-left: 1.25rem;
  }

  .conv-step {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 0;
    border-bottom: 1px dashed var(--color-line);
  }

  .conv-step:last-child { border-bottom: none; }

  .conv-q {
    font-size: 0.9rem;
    color: var(--color-ink);
    font-weight: 500;
    padding: 0.5rem 0.85rem;
    background: var(--color-status-info-soft);
    border-radius: 6px;
    border-left: 3px solid var(--color-binder);
    width: fit-content;
    max-width: 90%;
  }

  .hot-q {
    background: var(--color-status-success-soft);
    border-left-color: var(--color-status-done-start);
    font-weight: 600;
  }

  .conv-a {
    font-size: 0.85rem;
    color: var(--color-ink-muted);
    font-style: italic;
    padding-left: 0.5rem;
  }

  .conv-note {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding-left: 0.25rem;
  }

  .highlight-step {
    background: var(--color-surface-elevated);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-left: -1.25rem;
    padding-left: 1.25rem;
    border-left: 3px solid var(--color-status-done-start) !important;
  }

  /* =====================================================
     MODE COMPARISON (Interview vs Exploration)
  ===================================================== */
  .mode-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .mode-card {
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .mode-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.06);
  }

  .mode-bad {
    background: var(--color-status-danger-soft);
    border-color: var(--color-status-error-start);
  }

  .mode-good {
    background: var(--color-status-success-soft);
    border-color: var(--color-status-done-start);
  }

  .mode-icon-wrap {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .mode-card h5 {
    margin: 0.5rem 0 1rem;
    font-size: 1rem;
    font-weight: 700;
  }

  .mode-bad h5 { color: var(--color-status-error-start); }
  .mode-good h5 { color: var(--color-status-done-start); }

  .mode-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  .flow-item {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    color: var(--color-ink);
  }

  .mode-desc {
    margin: 0;
    font-size: 0.88rem;
    color: var(--color-ink-muted);
    line-height: 1.5;
  }

  /* =====================================================
     SHARE THEN ASK
  ===================================================== */
  .share-then-ask {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    margin: 1.25rem 0;
  }

  .sta-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-ink-muted);
    margin-bottom: 0.75rem;
  }

  .sta-row {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .sta-person {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .sta-person.you {
    background: var(--color-binder);
    color: #fff;
  }

  .sta-bubble {
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--color-ink);
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    flex: 1;
  }

  /* =====================================================
     DON'T DO
  ===================================================== */
  .dont-do {
    background: var(--color-status-danger-soft);
    border: 1px solid var(--color-status-error-start);
    border-radius: 10px;
    padding: 1.25rem;
    margin: 1.25rem 0;
  }

  .dont-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-status-error-start);
    margin-bottom: 0.75rem;
  }

  .dont-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .dont-list span {
    font-size: 0.82rem;
    padding: 0.3rem 0.65rem;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 6px;
    color: var(--color-ink-muted);
  }

  .dont-note {
    font-size: 0.85rem;
    color: var(--color-ink-muted);
  }

  /* =====================================================
     FORMULA CHAIN
  ===================================================== */
  .formula-chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin: 1.75rem 0;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }

  .formula-step {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    width: 100%;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .formula-step:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }

  .step-cerita-final {
    background: linear-gradient(135deg, var(--color-status-success-soft), var(--color-surface-elevated));
    border-color: var(--color-status-done-start);
    border-left-width: 4px;
  }

  .formula-arrow {
    font-size: 1.25rem;
    color: var(--color-ink-muted);
    padding: 0.15rem 0;
    align-self: center;
    line-height: 1;
  }

  .fs-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-binder);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .step-cerita-final .fs-num {
    background: var(--color-status-done-start);
  }

  .fs-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
  }

  .fs-text strong {
    font-size: 0.92rem;
    color: var(--color-ink);
  }

  .fs-text span {
    font-size: 0.82rem;
    color: var(--color-ink-muted);
    font-style: italic;
  }

  /* =====================================================
     BIG INSIGHT
  ===================================================== */
  .big-insight {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: linear-gradient(135deg, var(--color-status-success-soft), var(--color-surface-elevated));
    border: 1px solid var(--color-status-done-start);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  :global(.big-icon) {
    color: var(--color-status-done-start);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .big-insight p {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.6;
    color: var(--color-ink);
  }

  /* =====================================================
     FINAL QUOTE
  ===================================================== */
  .final-quote {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: var(--color-surface-elevated);
    border-radius: 16px;
    padding: 2rem;
    margin: 1.5rem 0;
    text-align: center;
    border: 1px solid var(--color-line);
  }

  :global(.fq-icon) {
    color: var(--color-binder);
  }

  .final-quote blockquote {
    margin: 0;
    padding: 0;
    border: none;
  }

  .final-quote blockquote p {
    font-size: 1.05rem;
    font-style: italic;
    line-height: 1.7;
    color: var(--color-ink);
    margin: 0 0 0.75rem;
  }

  .final-quote blockquote footer {
    font-size: 0.88rem;
    color: var(--color-ink-muted);
  }

  /* =====================================================
     KEY POINTS
  ===================================================== */
  .key-points {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .key-points li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem 1.1rem;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--color-ink);
    border-left: 4px solid var(--color-binder);
  }

  .key-points li::before {
    content: '→';
    color: var(--color-binder);
    font-weight: 700;
    flex-shrink: 0;
  }

  /* =====================================================
     QUOTE CARD
  ===================================================== */
  .quote-card {
    background: var(--color-surface-elevated);
    border-left: 4px solid var(--color-binder);
    padding: 1rem 1.5rem;
    border-radius: 0 8px 8px 0;
    margin: 1.25rem 0;
    font-style: italic;
  }

  .quote-card p {
    margin: 0;
    color: var(--color-ink);
    font-size: 1rem;
    line-height: 1.6;
  }

  /* =====================================================
     RESPONSIVE
  ===================================================== */
  @media (max-width: 768px) {
    .qa-comparison,
    .mode-comparison {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .hook-grid {
      grid-template-columns: 1fr;
    }

    .funnel-flow {
      flex-direction: column;
      align-items: stretch;
    }

    .funnel-arrow {
      justify-content: center;
      transform: rotate(90deg);
    }

    .funnel-step {
      min-width: unset;
    }

    .hook-item-highlight {
      grid-column: 1;
    }

    .formula-chain {
      max-width: 100%;
    }

    .big-insight,
    .final-quote,
    .share-then-ask,
    .dont-do,
    .insight-box {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .conv-q, .conv-a {
      font-size: 0.82rem;
    }

    .formula-step {
      padding: 0.75rem 1rem;
    }

    .fs-text strong {
      font-size: 0.85rem;
    }

    .fs-text span {
      font-size: 0.77rem;
    }
  }
</style>
