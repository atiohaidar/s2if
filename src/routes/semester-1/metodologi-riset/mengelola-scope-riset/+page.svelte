<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';
  import Sticker from '$lib/components/Sticker.svelte';

  // Tab state for "3 Cases of Complexity"
  let activeComplexityTab = $state('insight');

  const complexityCases = [
    {
      id: 'insight',
      title: 'Insight (Good)',
      icon: 'check',
      verdict: 'GOOD',
      verdictColor: 'var(--color-status-success-text)',
      scenario: `Orang lain: "Simple refactoring tool, improves code 20%"
Kamu: "When we consider input quality + context + multiple dimensions,
       effectiveness varies from -5% to 80% depending on conditions.
       Simple tool insufficient, need contextual approach."`,
      explanation:
        'Kamu discover bahwa simplicity dari orang lain adalah karena mereka nggak consider important variables! Kamu add complexity KARENA diperlukan.',
      points: [
        'You reveal why previous simple approach insufficient',
        'You show what factors matter',
        'Complexity adalah consequence dari deeper understanding',
        'Worth the added complexity',
      ],
    },
    {
      id: 'limitation',
      title: 'Limitation (OK)',
      icon: 'callout-info',
      verdict: 'OKAY',
      verdictColor: 'var(--color-binder)',
      scenario: `Kamu design: "Multi-dimensional evaluation framework dengan 7 metrics 
             across 4 code quality tiers, with statistical testing"

Result: More complex daripada orang lain's simple evaluation`,
      explanation:
        'Acknowledge saja trade-off nya. Ini acceptable untuk S2 research yang prioritize depth.',
      points: [
        'You acknowledge trade-off',
        'You justify complexity',
        'You explain benefit worth trade-off',
        'Shows maturity (understanding cost-benefit)',
      ],
    },
    {
      id: 'problem',
      title: 'Problem (Avoid)',
      icon: 'close',
      verdict: 'AVOID',
      verdictColor: 'var(--color-status-important-start)',
      scenario: `Orang lain: Clean, straightforward methodology
Kamu: "Aku harus do A, B, C plus X, Y, Z untuk more comprehensive"

Result: Metodologi jadi overly complicated, confusing, hard to execute`,
      explanation: 'Complexity tidak add value, just add work. Solusi: SIMPLIFY.',
      points: [
        'Cut X, Y, Z kalau tidak contribute untuk answer RQ',
        'Keep hanya essential parts',
        'Streamline methodology',
        'Complexity harus justified, bukan asal ditambah',
      ],
    },
  ];

  // Decision tree interactive state
  let dtAnswer1 = $state<null | boolean>(null);
  let dtAnswer2 = $state<null | boolean>(null);

  function resetDecisionTree() {
    dtAnswer1 = null;
    dtAnswer2 = null;
  }

  // Quiz
  const quizQuestions = [
    {
      question:
        'Seorang mahasiswa S2 merasa risetnya harus lebih "comprehensive" dari semua paper yang dibacanya. Dia berencana menguji 8 dimensi evaluasi sekaligus. Apa saran terbaik untuknya?',
      options: [
        'Lanjutkan saja, semakin banyak dimensi semakin bagus kontribusinya.',
        'Pilih 2-3 dimensi yang langsung menjawab Research Question, lalu analisis secara mendalam. Sisanya akui sebagai limitasi.',
        'Kurangi jadi 5 dimensi saja agar tetap terlihat komprehensif.',
        'Cari paper lain yang lebih sederhana agar tidak perlu banyak dimensi.',
      ],
      correctIndex: 1,
      explanation:
        'Research maturity = focused choice. Lebih baik 2-3 dimensi dianalisis mendalam (depth over breadth) daripada 8 dimensi yang dangkal. Dimensi lain diakui sebagai limitasi dan future work.',
    },
    {
      question:
        'Pembaca paper kamu berkomentar: "Studi ini hanya menganalisis complexity dan readability, tidak menyentuh performance atau security." Bagaimana respons yang paling tepat?',
      options: [
        'Meminta maaf dan berjanji menambahkan performance & security analysis.',
        'Mengabaikan komentar tersebut karena scope sudah ditentukan.',
        'Menjelaskan bahwa scope dipilih berdasarkan RQ, dimensi lain penting tapi out-of-scope, dan menjadi future work.',
        'Mengatakan bahwa performance & security tidak relevan sama sekali.',
      ],
      correctIndex: 2,
      explanation:
        'Respons proaktif: Acknowledge dimensi lain penting, jelaskan scope choice berdasarkan RQ, justify depth over breadth, dan posisikan sebagai future work. Ini menunjukkan research maturity.',
    },
  ];
</script>

<svelte:head>
  <title>Kok Penelitianku Makin Ribet Ya? - S2IF Notebook</title>
  <meta
    name="description"
    content="Panduan mengelola scope riset: cara memilih dimensi evaluasi yang tepat, menangani kompleksitas metodologi, dan menghadapi kritik pembaca soal keterbatasan penelitian."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader title="Kok Penelitianku Makin Ribet Ya?" date="30 Mei 2026" status="done" />

  <!-- Section 1: Misconception Terbesar -->
  <NoteSection title="Misconception Terbesar Mahasiswa Riset">
    <p>
      Kamu pernah berpikir begini? <em
        >"Orang lain test A, B, C. Berarti aku harus test A, B, C
        <strong>plus</strong> D supaya risetku lebih bagus!"</em
      >
    </p>

    <div class="comparison-grid">
      <!-- Junior Card -->
      <div class="mindset-card junior">
        <div class="badge-status-red">
          <ThemeIcon name="close" size={14} /> Junior Researcher Thinking
        </div>
        <div class="card-body">
          <pre class="flow-code">
"I need do everything they did + more"

→ Stretched thin
→ Mediocre execution
→ Overwhelmed
→ Thesis jadi "sambal ABC"
  (jack of all trades, master of none)
          </pre>
        </div>
      </div>

      <!-- Mature Card -->
      <div class="mindset-card mature">
        <div class="badge-status-green">
          <ThemeIcon name="check" size={14} /> Mature Researcher Thinking
        </div>
        <div class="card-body">
          <pre class="flow-code">
"I need choose WHAT to study deeply,
 accept other dimensions out-of-scope"

→ Deep analysis
→ Clear contribution
→ Manageable scope
→ Publishable quality
          </pre>
        </div>
      </div>
    </div>

    <Callout type="tip">
      <strong>Core issue.</strong> Better research bukan selalu "more dimensions". Better research
      adalah <strong>"right dimensions untuk your question"</strong>.
    </Callout>
  </NoteSection>

  <!-- Section 2: Focused vs Comprehensive -->
  <NoteSection title="Research = Focused Choice">
    <p>
      Mari kita lihat contoh nyata. Bayangkan kamu riset tentang <strong>AI Refactoring</strong>.
      Ada 2 opsi cara menentukan scope:
    </p>

    <div class="comparison-grid">
      <!-- Option A -->
      <div class="scope-card option-a">
        <div class="scope-header bad">
          <ThemeIcon name="close" size={16} />
          <span>Option A: "Comprehensive" (trying to do everything)</span>
        </div>
        <div class="scope-body">
          <pre class="flow-code">
Evaluate on dimensions:
1. Correctness
2. Performance
3. Code complexity
4. Code readability
5. Maintainability
6. Security
7. Code duplication

Plus:
- Test 5 different AI tools
- Test 3 programming languages
- Test on 50 code snippets
- Input quality variations (4 tiers)
          </pre>
          <div class="scope-verdict bad-verdict">
            <Sticker type="todo">Result</Sticker>
            <span>HUGE scope, shallow analysis, can't finish dalam 6-9 months</span>
          </div>
        </div>
      </div>

      <!-- Option B -->
      <div class="scope-card option-b">
        <div class="scope-header good">
          <ThemeIcon name="check" size={16} />
          <span>Option B: "Focused" (strategic choice)</span>
        </div>
        <div class="scope-body">
          <pre class="flow-code">
Primary focus:
"How does input code quality moderate
 AI refactoring effectiveness?"

Dimensions evaluated:
1. Correctness (binary: works or not)
2. Complexity reduction (main metric)
3. Maintainability improvement (secondary)

Skip (acknowledge as limitation):
- Performance, Security, Duplication

Scope:
- 1-2 AI tools (focused comparison)
- Python primarily (one language)
- 30 code snippets (manageable)
          </pre>
          <div class="scope-verdict good-verdict">
            <Sticker type="done">Result</Sticker>
            <span>Deep analysis, clear contribution, finishable, publishable quality</span>
          </div>
        </div>
      </div>
    </div>

    <Callout type="tip">
      <strong>See the difference?</strong> Option B bukan "kurang" dari Option A. Option B adalah
      <strong>pilihan strategis</strong> yang menghasilkan riset berkualitas lebih tinggi. Quality over
      Quantity. Always.
    </Callout>
  </NoteSection>

  <!-- Section 3: Complexity Cases (Tabs) -->
  <NoteSection title="Kapan Complexity itu OK?">
    <p>
      Wajar kalau kamu khawatir: <em
        >"Kalau solusi aku lebih ribet dari orang lain, itu berarti contribution aku tidak good?"</em
      >
      Jawabannya: <strong>tergantung</strong>. Ada 3 kasus yang perlu kamu bedakan:
    </p>

    <div class="complexity-widget">
      <div class="complexity-tabs">
        {#each complexityCases as c}
          <button
            class="complexity-tab-btn"
            class:active={activeComplexityTab === c.id}
            onclick={() => (activeComplexityTab = c.id)}
          >
            <ThemeIcon name={c.icon} size={16} />
            <span>{c.title}</span>
          </button>
        {/each}
      </div>

      <div class="complexity-content">
        {#each complexityCases as c}
          {#if activeComplexityTab === c.id}
            <div class="complexity-detail" style="animation: fadeIn 0.3s ease;">
              <div
                class="complexity-verdict-badge"
                style="color: {c.verdictColor}; border-color: {c.verdictColor};"
              >
                {c.verdict}
              </div>

              <pre class="flow-code">{c.scenario}</pre>

              <p class="complexity-explanation">{c.explanation}</p>

              <div class="complexity-points">
                {#each c.points as point}
                  <div class="complexity-point">
                    <ThemeIcon name={c.id === 'problem' ? 'close' : 'check'} size={14} />
                    <span>{point}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </NoteSection>

  <!-- Section 4: Decision Tree -->
  <NoteSection title="Decision Tree: Include vs Skip Dimension?">
    <p>
      Setiap kali kamu bimbang apakah harus menambahkan sebuah dimensi evaluasi ke risetmu, jawab <strong
        >3 pertanyaan</strong
      > ini secara berurutan:
    </p>

    <div class="decision-tree-box">
      <!-- Q1 -->
      <div class="dt-step">
        <div class="dt-question">
          <span class="dt-badge">Q1</span>
          <strong>"Does this dimension directly answer my Research Question?"</strong>
        </div>
        <div class="dt-options">
          <button
            class="dt-btn"
            class:selected={dtAnswer1 === true}
            onclick={() => {
              dtAnswer1 = true;
              dtAnswer2 = null;
            }}
          >
            YES
          </button>
          <button
            class="dt-btn dt-btn-no"
            class:selected={dtAnswer1 === false}
            onclick={() => {
              dtAnswer1 = false;
              dtAnswer2 = null;
            }}
          >
            NO
          </button>
        </div>
      </div>

      {#if dtAnswer1 === false}
        <div class="dt-result skip" style="animation: fadeIn 0.3s ease;">
          <ThemeIcon name="close" size={20} />
          <div>
            <strong>SKIP</strong>
            <p>Dimensi ini tidak menjawab RQ-mu. Mention sebagai limitation dan future work.</p>
          </div>
        </div>
      {/if}

      {#if dtAnswer1 === true}
        <!-- Q2 -->
        <div class="dt-step" style="animation: fadeIn 0.3s ease;">
          <div class="dt-question">
            <span class="dt-badge">Q2</span>
            <strong>"If I include it, can I analyze it properly (not superficial)?"</strong>
          </div>
          <div class="dt-options">
            <button
              class="dt-btn"
              class:selected={dtAnswer2 === true}
              onclick={() => (dtAnswer2 = true)}
            >
              YES
            </button>
            <button
              class="dt-btn dt-btn-no"
              class:selected={dtAnswer2 === false}
              onclick={() => (dtAnswer2 = false)}
            >
              NO
            </button>
          </div>
        </div>

        {#if dtAnswer2 === true}
          <div class="dt-result include" style="animation: fadeIn 0.3s ease;">
            <ThemeIcon name="check" size={20} />
            <div>
              <strong>INCLUDE</strong>
              <p>Dimensi ini menjawab RQ dan kamu bisa analisis mendalam. Masukkan!</p>
            </div>
          </div>
        {/if}

        {#if dtAnswer2 === false}
          <div class="dt-result skip" style="animation: fadeIn 0.3s ease;">
            <ThemeIcon name="close" size={20} />
            <div>
              <strong>SKIP</strong>
              <p>
                Better do 2 dimensions well than 5 superficial. Skip dan acknowledge sebagai
                limitation.
              </p>
            </div>
          </div>
        {/if}
      {/if}

      {#if dtAnswer1 !== null}
        <button class="dt-reset-btn" onclick={resetDecisionTree}> Reset Decision Tree </button>
      {/if}
    </div>

    <!-- 3 Examples -->
    <h4 class="examples-title">Contoh Penerapan Framework:</h4>

    <div class="examples-grid">
      <div class="example-card">
        <div class="example-header skip-header">
          <ThemeIcon name="close" size={16} />
          <span>Performance Testing</span>
        </div>
        <pre class="flow-code">
Q1: Does performance answer RQ?
→ Not directly (different dimension)
→ SKIP as primary

Q2: Can I analyze properly?
→ Need benchmark setup, complex analysis
→ Too much work for secondary dimension

DECISION: Skip, mention in limitations
        </pre>
      </div>

      <div class="example-card">
        <div class="example-header include-header">
          <ThemeIcon name="check" size={16} />
          <span>Maintainability Testing</span>
        </div>
        <pre class="flow-code">
Q1: Does maintainability answer RQ?
→ YES! Code quality includes this
→ INCLUDE

Q2: Can I analyze properly?
→ Doable (subjective + objective metrics)
→ YES

DECISION: Include as one dimension
        </pre>
      </div>

      <div class="example-card">
        <div class="example-header skip-header">
          <ThemeIcon name="close" size={16} />
          <span>Security Testing</span>
        </div>
        <pre class="flow-code">
Q1: Does security answer RQ?
→ No, different dimension entirely
→ SKIP

Q2: Can I analyze?
→ Needs specialized tools, expertise
→ Too much work

DECISION: Skip entirely, future work
        </pre>
      </div>
    </div>
  </NoteSection>

  <!-- Section 5: Handle Kritik Pembaca -->
  <NoteSection title="Cara Handle Kritik Pembaca">
    <p>
      <em
        >"Tapi nanti pembaca anggap penelitianku kurang dong, karena nggak cover semua dimensi?"</em
      >
      Pertanyaan yang sangat realistis. Mari kita hadapi head-on.
    </p>

    <Callout type="info">
      <strong>Truth.</strong> Tidak ada penelitian yang 100% comprehensive. Semua penelitian ada
      trade-off dan scope constraint. Ini <strong>normal</strong> dalam dunia akademik.
    </Callout>

    <div class="critic-types">
      <!-- Type 1 -->
      <div class="critic-card">
        <div class="critic-header fair">
          <span class="critic-badge fair-badge">Fair / Expected</span>
          <h5>Kritik Tipe 1: "Kurang membahas dimensi lain"</h5>
        </div>
        <div class="critic-body">
          <div class="critic-quote">
            <p>
              <em
                >"Studi ini hanya analyze complexity & readability, tapi tidak touch performance
                atau security."</em
              >
            </p>
          </div>
          <div class="critic-response">
            <strong>Respons proaktif kamu (tulis di paper):</strong>
            <pre class="flow-code">
"Our study focuses pada 2 dimensions 
(complexity & readability) yang directly 
answer research question.

Other dimensions (performance, security):
- Outside scope of current research
- Would require different methodology
- Represent opportunities for future work

We prioritize depth over breadth 
untuk achieve rigor within scope."
            </pre>
          </div>
          <div class="critic-reaction">
            <ThemeIcon name="check" size={14} />
            <span
              >Pembaca: <em>"Ah, mereka deliberately scoped itu. Fair choice untuk their RQ."</em
              ></span
            >
          </div>
        </div>
      </div>

      <!-- Type 2 -->
      <div class="critic-card">
        <div class="critic-header valid">
          <span class="critic-badge valid-badge">Valid Criticism</span>
          <h5>Kritik Tipe 2: "Scope choice tidak justified"</h5>
        </div>
        <div class="critic-body">
          <div class="critic-quote">
            <p><em>"Kenapa hanya 2 dimensi? Seems arbitrary, nggak justified."</em></p>
          </div>
          <div class="wrong-right-grid">
            <div class="wrong-box">
              <div class="wr-label wrong-label">
                <ThemeIcon name="close" size={14} /> Wrong Response
              </div>
              <pre class="flow-code">
"Kami hanya focus 2 dimensi 
karena... well, time constraint."
→ Sounds arbitrary, weak
              </pre>
            </div>
            <div class="right-box">
              <div class="wr-label right-label">
                <ThemeIcon name="check" size={14} /> Correct Response
              </div>
              <pre class="flow-code">
"We selected dimensions based on RQ.
Our RQ specifically asks about 
code maintainability.

- Complexity: Direct measure
- Readability: Maintainability perception
- Security: Orthogonal, separate RQ

Scope bounded untuk maintain rigor."
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- Section 6: Limitation vs Weakness -->
  <NoteSection title="Limitation vs Weakness">
    <p>
      Ini perbedaan paling krusial yang perlu kamu tanamkan dalam-dalam. Keduanya terdengar mirip,
      tapi maknanya <strong>sangat berbeda</strong> di dunia akademik:
    </p>

    <div class="comparison-grid">
      <div class="lw-card limitation-card">
        <div class="badge-status-green">
          <ThemeIcon name="check" size={14} /> LIMITATION (OK)
        </div>
        <pre class="flow-code">
"My study focus pada complexity 
& readability (out of many dimensions)"

→ Natural scope boundary
→ Expected & acceptable
→ Deliberate CHOICE
        </pre>
        <p class="lw-conclusion good-conclusion">
          Limitation adalah <strong>keputusan sadar</strong> yang kamu ambil dan kamu jelaskan dengan
          transparan.
        </p>
      </div>

      <div class="lw-card weakness-card">
        <div class="badge-status-red">
          <ThemeIcon name="close" size={14} /> WEAKNESS (Not OK)
        </div>
        <pre class="flow-code">
"I meant to analyze security tapi 
ran out of time, so skipped it"

→ Failed execution
→ Problematic
→ Unplanned FAILURE
        </pre>
        <p class="lw-conclusion bad-conclusion">
          Weakness adalah <strong>kegagalan eksekusi</strong> yang tidak direncanakan dan tidak bisa dijustifikasi.
        </p>
      </div>
    </div>

    <Callout type="warning">
      <strong>Bottom Line.</strong> Pastikan out-of-scope di risetmu adalah <strong>CHOICE</strong>,
      bukan <strong>FAILURE</strong>. Frame dengan jelas sebagai scope decision, bukan oversight.
    </Callout>
  </NoteSection>

  <!-- Section 7: Mindset Shift + Analogi -->
  <NoteSection title="Mindset Shift">
    <p>
      Saatnya mengubah cara berpikir secara fundamental. Dari perfectionism menuju strategic focus:
    </p>

    <div class="mindset-shift-visual">
      <div class="shift-from">
        <div class="shift-label from-label">
          <ThemeIcon name="close" size={16} /> FROM (Perfectionism)
        </div>
        <pre class="flow-code">
"Saya harus do semua yang orang lain 
 lakukan + lebih.
 Supaya research aku lebih good."
        </pre>
      </div>

      <div class="shift-arrow">
        <ThemeIcon name="arrow-right" size={28} />
      </div>

      <div class="shift-to">
        <div class="shift-label to-label">
          <ThemeIcon name="check" size={16} /> TO (Strategic Focus)
        </div>
        <pre class="flow-code">
"Saya pilih apa yang paling penting 
 untuk RQ saya.
 Saya analyze deeply, bukan broad.
 Quality > Quantity."
        </pre>
      </div>
    </div>

    <!-- Restaurant Analogy -->
    <div class="analogy-box">
      <h5>Analogi Restoran</h5>
      <div class="comparison-grid">
        <div class="analogy-card bad-analogy">
          <strong>Restaurant A</strong>
          <p>"Kami serve all cuisine — Italian, Thai, Japanese, French, Chinese"</p>
          <pre class="flow-code">
Reality: Semua mediocre, 
nggak expert di apapun

Customer: "Disappointing, 
everything average"
          </pre>
        </div>
        <div class="analogy-card good-analogy">
          <strong>Restaurant B</strong>
          <p>"Kami specialize dalam Italian cuisine"</p>
          <pre class="flow-code">
Reality: Excellent Italian, 
tapi nggak serve Thai/French

Customer: "Excellent! Know apa 
yang mereka do best"
          </pre>
        </div>
      </div>
      <p class="analogy-moral">
        Academic research sama persis. <strong>Readers prefer Restaurant B.</strong>
        Specialized focus (2 dimensions deeply) selalu lebih dihargai daripada trying be comprehensive
        (5 dimensions semua).
      </p>
    </div>
  </NoteSection>

  <!-- Section 8: Checklist -->
  <NoteSection title="Checklist: Is My Scope Appropriate?">
    <p>
      Gunakan checklist ini sebelum kamu finalize scope risetmu. Kalau semua YES, kamu sudah di
      jalur yang benar:
    </p>

    <div class="checklist-box">
      <div class="checklist-item">
        <span class="check-num">1</span>
        <span>Is my research question <strong>CLEAR & SPECIFIC</strong>?</span>
      </div>
      <div class="checklist-item">
        <span class="check-num">2</span>
        <span>Do my dimensions <strong>DIRECTLY address the RQ</strong>?</span>
      </div>
      <div class="checklist-item">
        <span class="check-num">3</span>
        <span>Can I <strong>DEEPLY analyze</strong> each dimension (not superficial)?</span>
      </div>
      <div class="checklist-item">
        <span class="check-num">4</span>
        <span>Is the scope <strong>FINISHABLE</strong> dalam 6-9 months?</span>
      </div>
      <div class="checklist-item">
        <span class="check-num">5</span>
        <span>Did I <strong>ACKNOWLEDGE limitations</strong> (what's out-of-scope)?</span>
      </div>
      <div class="checklist-item">
        <span class="check-num">6</span>
        <span>Is trade-off between depth & breadth <strong>JUSTIFIED</strong>?</span>
      </div>
    </div>

    <Callout type="tip">
      Kalau semua YES, scope risetmu <strong>appropriate</strong>. Kalau ada yang NO, adjust scope
      (skip dimensions, focus deeper). Simple.
    </Callout>
  </NoteSection>

  <!-- Section 9: Quiz -->
  <NoteSection title="Asah Insting Penelitimu!">
    <p>
      Mari kita uji pemahamanmu dengan kuis kilat berikut. Jangan cemas salah, kuis ini dirancang
      untuk memantapkan konsep!
    </p>
    <Quiz questions={quizQuestions} title="Kuis Kilat: Mengelola Scope Riset" />
  </NoteSection>

  <!-- Section 10: Feynman -->
  <NoteSection title="Catatan Feynman: Sederhanakan!">
    <div class="feynman-box">
      <div class="feynman-avatar"><ThemeIcon name="ai-brain" size={40} /></div>
      <div class="feynman-content">
        <h5>Rangkuman Sederhana</h5>
        <p>
          "Riset yang kuat bukan riset yang paling banyak dimensinya. Riset yang kuat adalah riset
          yang menjawab pertanyaan dengan jelas, mendalam, dan jujur soal batasannya."
        </p>
        <p class="feynman-conclusion">
          Fokus mendalam pada apa yang penting untuk RQ-mu. Skip dengan elegan apa yang di luar
          scope. Jelaskan trade-off dengan transparan. Kamu pasti bisa!
        </p>
      </div>
    </div>
  </NoteSection>

  <BackLink href="/semester-1/metodologi-riset" label="Kembali ke Metodologi Riset" />
</article>

<style>
  /* Comparison Grid */
  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  /* Mindset Cards */
  .mindset-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
  }

  .mindset-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-binder);
  }

  .badge-status-red,
  .badge-status-green {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
    border-radius: 99px;
    margin-bottom: 1.25rem;
    width: fit-content;
  }

  .badge-status-red {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .badge-status-green {
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
  }

  .flow-code {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    padding: 1rem;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    color: var(--color-ink-strong);
    margin-bottom: 1.25rem;
  }

  /* Scope Cards */
  .scope-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
  }

  .scope-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .scope-header {
    padding: 1rem 1.25rem;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .scope-header.bad {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .scope-header.good {
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
  }

  .scope-body {
    padding: 1.25rem;
  }

  .scope-verdict {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.9rem;
    border-top: 1px dashed var(--color-line);
    padding-top: 1rem;
    margin-top: 0.5rem;
  }

  /* Complexity Widget */
  .complexity-widget {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    margin: 2rem 0;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .complexity-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--color-surface-soft);
    border-bottom: 1px solid var(--color-line);
  }

  .complexity-tab-btn {
    padding: 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--color-ink-soft);
    transition: all 0.2s ease;
    border-bottom: 3px solid transparent;
  }

  .complexity-tab-btn:hover {
    color: var(--color-binder);
    background: rgba(139, 69, 19, 0.03);
  }

  .complexity-tab-btn.active {
    color: var(--color-binder);
    background: var(--color-surface-elevated);
    border-bottom-color: var(--color-binder);
  }

  .complexity-content {
    padding: 2rem;
    min-height: 220px;
    background: var(--color-surface-elevated);
  }

  .complexity-verdict-badge {
    display: inline-block;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    padding: 0.3rem 0.8rem;
    border: 2px solid;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .complexity-explanation {
    font-size: 0.95rem;
    opacity: 0.9;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .complexity-points {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .complexity-point {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  /* Decision Tree */
  .decision-tree-box {
    background: var(--color-surface);
    border: 1px dashed var(--color-note-lines);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .dt-step {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .dt-question {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 1rem;
  }

  .dt-badge {
    background: var(--color-binder);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .dt-options {
    display: flex;
    gap: 0.75rem;
    padding-left: 3rem;
  }

  .dt-btn {
    padding: 0.6rem 1.5rem;
    border: 2px solid var(--color-status-success-border);
    background: var(--color-surface-elevated);
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-status-success-text);
    transition: all 0.2s ease;
  }

  .dt-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .dt-btn.selected {
    background: var(--color-status-success-soft);
    border-color: var(--color-status-success-text);
  }

  .dt-btn-no {
    border-color: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .dt-btn-no.selected {
    background: var(--color-status-warning-soft);
    border-color: var(--color-status-warning-text);
  }

  .dt-result {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 12px;
    margin-left: 3rem;
  }

  .dt-result.include {
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
  }

  .dt-result.skip {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .dt-result strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .dt-result p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .dt-reset-btn {
    align-self: center;
    padding: 0.5rem 1.25rem;
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-ink-soft);
    transition: all 0.2s ease;
    font-family: var(--font-body);
  }

  .dt-reset-btn:hover {
    background: var(--color-surface-elevated);
    color: var(--color-binder);
  }

  /* Examples Grid */
  .examples-title {
    margin: 2.5rem 0 1rem 0;
    font-size: 1.15rem;
    color: var(--color-ink-strong);
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-bottom: 1rem;
  }

  .example-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    min-width: 0;
  }

  .example-header {
    padding: 0.75rem 1rem;
    font-weight: 700;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .skip-header {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .include-header {
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
  }

  .example-card .flow-code {
    margin: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }

  /* Critic Types */
  .critic-types {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .critic-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .critic-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-line);
  }

  .critic-header h5 {
    margin: 0.5rem 0 0;
    font-size: 1.1rem;
    color: var(--color-ink-strong);
  }

  .critic-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #fff;
  }

  .fair-badge {
    background: var(--color-binder);
  }

  .valid-badge {
    background: var(--color-status-important-start);
  }

  .critic-body {
    padding: 1.5rem;
  }

  .critic-quote {
    background: var(--color-surface-soft);
    border-left: 4px solid var(--color-line);
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin-bottom: 1.25rem;
  }

  .critic-quote p {
    margin: 0;
    font-size: 0.95rem;
  }

  .critic-response strong {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: var(--color-ink-strong);
  }

  .critic-reaction {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    margin-top: 1rem;
    color: var(--color-status-success-text);
    font-weight: 600;
  }

  .wrong-right-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .wr-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 700;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .wrong-label {
    color: var(--color-status-important-start);
  }

  .right-label {
    color: var(--color-status-success-text);
  }

  /* Limitation vs Weakness */
  .lw-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
  }

  .lw-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .lw-conclusion {
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    padding-top: 0.75rem;
    border-top: 1px dashed var(--color-line);
  }

  /* Mindset Shift Visual */
  .mindset-shift-visual {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
    margin: 2rem 0;
  }

  .shift-from,
  .shift-to {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .shift-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .from-label {
    color: var(--color-status-important-start);
  }

  .to-label {
    color: var(--color-status-success-text);
  }

  .shift-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-binder);
    opacity: 0.7;
  }

  /* Analogy Box */
  .analogy-box {
    background: var(--color-surface);
    border: 1px dashed var(--color-note-lines);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
  }

  .analogy-box h5 {
    margin: 0 0 1.25rem 0;
    font-size: 1.15rem;
    color: var(--color-binder);
  }

  .analogy-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: var(--shadow-sm);
  }

  .analogy-card strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .analogy-card p {
    font-size: 0.9rem;
    opacity: 0.85;
    margin: 0 0 0.75rem 0;
    font-style: italic;
  }

  .analogy-moral {
    margin: 1.5rem 0 0 0;
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: center;
    opacity: 0.9;
  }

  /* Checklist */
  .checklist-box {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.5rem;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-shadow: var(--shadow-sm);
  }

  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    background: var(--color-surface-elevated);
    border-radius: 10px;
    border: 1px solid var(--color-line);
    transition: all 0.2s ease;
  }

  .checklist-item:hover {
    border-color: var(--color-binder);
    transform: translateX(4px);
  }

  .check-num {
    background: var(--color-binder);
    color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* Feynman Box */
  .feynman-box {
    display: flex;
    gap: 1.5rem;
    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-soft) 100%);
    border: 1px dashed var(--color-binder);
    border-radius: 16px;
    padding: 1.75rem;
    margin: 2rem 0;
    box-shadow: var(--shadow-sm);
  }

  .feynman-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feynman-content h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.15rem;
    color: var(--color-binder);
  }

  .feynman-content p {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.9;
    font-style: italic;
  }

  .feynman-content .feynman-conclusion {
    font-style: normal;
    font-weight: 500;
    margin: 0;
    opacity: 0.95;
    color: var(--color-ink-strong);
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
    }

    .examples-grid {
      grid-template-columns: 1fr;
    }

    .wrong-right-grid {
      grid-template-columns: 1fr;
    }

    .mindset-shift-visual {
      grid-template-columns: 1fr;
    }

    .shift-arrow {
      transform: rotate(90deg);
    }

    .complexity-tabs {
      grid-template-columns: 1fr;
    }
  }
</style>
