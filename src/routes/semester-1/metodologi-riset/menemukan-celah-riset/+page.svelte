<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';
  import Sticker from '$lib/components/Sticker.svelte';

  // Tab State for "6 Lensa Pertanyaan"
  let activeTab = $state('methodology');

  const lenses = [
    {
      id: 'methodology',
      title: '1. METHODOLOGICAL',
      icon: 'subject-algoritma',
      questions: [
        'Why did they choose THIS methodology?',
        'What are limitations of this approach?',
        'What OTHER approaches could work?',
        'Did they justify the choice?',
        'Would different methodology give different result?',
      ],
      description:
        'Mengevaluasi keputusan metode penelitian. Kenapa mereka memilih metode ini, trade-off nya apa, dan opsi alternatif apa yang bisa dicoba.',
    },
    {
      id: 'scope',
      title: '2. SCOPE & CONTEXT',
      icon: 'subject-sistem-terdistribusi',
      questions: [
        'Did they study everything relevant?',
        'What did they NOT study?',
        'Why this specific context/sample/dataset?',
        'Would findings generalize to other contexts?',
        'What context NOT yet explored?',
      ],
      description:
        'Melihat batasan cakupan penelitian. Apa yang tidak mereka teliti (cakupan luar) sering kali jadi celah emas buat bahan risetmu.',
    },
    {
      id: 'assumption',
      title: '3. ASSUMPTION',
      icon: 'ai-brain',
      questions: [
        'What assumptions did they make?',
        'Are assumptions valid?',
        'What if assumptions different?',
        'Could alternative assumptions change findings?',
      ],
      description:
        'Menggali asumsi implisit (tak tertulis) yang diambil penulis. Begitu asumsi tersebut goyah, lahirlah celah riset baru.',
    },
    {
      id: 'significance',
      title: '4. SIGNIFICANCE',
      icon: 'ai-scale',
      questions: [
        'Are findings really new atau just confirming obvious?',
        'Is the effect size practically meaningful?',
        'Why should practitioners care?',
        "What's still unclear?",
      ],
      description:
        'Menakar kebaruan dan dampak nyata hasil penelitian. Apakah praktisi/industri beneran butuh atau cuma bagus di atas kertas?',
    },
    {
      id: 'mechanism',
      title: '5. MECHANISM',
      icon: 'subject-microsoft-automation',
      questions: [
        'They found X, but WHY does X happen?',
        'Do they explain the mechanism?',
        'Is it just correlation atau causal?',
        'What underlying processes?',
      ],
      description:
        'Membongkar sebab-akibat di balik hasil penelitian. Bukan sekadar tahu apa yang terjadi (korelasi), tapi paham *how & why* di baliknya secara mekanistik.',
    },
    {
      id: 'gap',
      title: '6. GAP & NEXT STEP',
      icon: 'subject-dalam-proses',
      questions: [
        'What question NOT answered?',
        'What would be logical next step?',
        "What's preventing them from answering?",
        'Could I address this?',
      ],
      description:
        'Menemukan petunjuk langsung tentang masa depan penelitian dari pertanyaan menggantung atau *future work* yang dibisikkan penulis.',
    },
  ];

  // Case Study Comparison Interactive State
  let showActiveAnalysis = $state(false);

  // Quiz Questions
  const quizQuestions = [
    {
      question:
        "Ketika kamu membaca paper yang menyimpulkan: 'Alat refactoring otomatis meningkatkan kualitas kode sebesar 30% secara rata-rata', apa reaksi pertama dari seorang ACTIVE RESEARCHER?",
      options: [
        'Wow, 30% itu angka yang besar! Saya akan langsung menggunakan alat tersebut tanpa ragu.',
        'Menarik, tapi bagaimana sebaran distribusinya? Di jenis kode apa ia gagal? Dimensi kualitas apa saja yang diukur?',
        'Ah, angka 30% itu pasti rekayasa. Saya tidak percaya penelitian ini.',
        'Saya akan merangkum paper tersebut secara pasif dan beralih ke paper berikutnya.',
      ],
      correctIndex: 1,
      explanation:
        'Active researcher tidak melihat statistik rata-rata sebagai akhir, melainkan awal dari pertanyaan kritis baru (seperti distribusi sebaran, batasan dimensi kualitas, dan failure cases) untuk memicu ide riset baru.',
    },
    {
      question: 'Mengapa celah (gap) riset itu selalu ada di hampir setiap literatur ilmiah?',
      options: [
        'Karena peneliti sebelumnya kurang teliti atau malas menyelesaikan pekerjaannya.',
        'Karena setiap penelitian menuntut pilihan sadar (trade-off), lingkungan/teknologi terus berkembang, dan setiap jawaban baru selalu memicu pertanyaan baru.',
        'Karena jurnal ilmiah sengaja membatasi halaman agar penelitian tidak pernah selesai.',
        'Celah riset sebenarnya tidak ada, kita hanya berpura-pura mencarinya.',
      ],
      correctIndex: 1,
      explanation:
        'Penelitian selalu berhadapan dengan keterbatasan (sumber daya, waktu, generalisasi). Pilihan sadar peneliti untuk fokus pada satu hal secara alami meninggalkan hal lain sebagai celah riset yang siap kamu eksplorasi.',
    },
  ];
</script>

<svelte:head>
  <title>Baca Paper Orang Lain tuh sampai mana ya? - S2IF Notebook</title>
  <meta
    name="description"
    content="Belajar membaca paper secara kritis dengan kacamata aktif peneliti untuk menemukan celah (gap) penelitian tanpa rasa cemas."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader title="Baca Paper Orang Lain tuh sampai mana ya?" date="30 Mei 2026" status="done" />

  <!-- Section 1: The Core Mindset -->
  <NoteSection title="Lensa Membaca: Pasif vs Aktif">
    <p>
      Perbedaan terbesar antara seorang mahasiswa biasa dengan seorang peneliti sejati bukan hanya
      pada <em>jumlah</em>
      paper yang mereka baca, melainkan pada <strong>mindset</strong> saat mereka membacanya.
    </p>

    <div class="comparison-grid">
      <!-- Passive Card -->
      <div class="mindset-card passive">
        <div class="badge-status-red">
          <ThemeIcon name="close" size={14} /> Passive Reader (just consume)
        </div>
        <div class="card-body">
          <p class="action-desc">Membaca seperti membaca novel atau berita:</p>
          <pre class="flow-code">
Read paper:
"Oh, they did X methodology 
and got Y result. Interesting!"

Finish reading.
Move to next paper.
          </pre>
          <div class="card-footer">
            <Sticker type="todo">Hasil</Sticker>
            <span>
              → Accumulate informasi tapi nggak generate insight<br />
              → Jadi tahu apa yang diketahui, tapi nggak lihat celah
            </span>
          </div>
        </div>
      </div>

      <!-- Active Card -->
      <div class="mindset-card active">
        <div class="badge-status-green">
          <ThemeIcon name="check" size={14} /> Active Researcher (question & analyze)
        </div>
        <div class="card-body">
          <p class="action-desc">Membaca dengan lensa kritis peneliti:</p>
          <pre class="flow-code">
Read paper dengan lensa KRITIS:

"They use methodology X... but WHY X? 
 What about limitations of X?
 Did they consider Y?
 Why not Z approach?
 Is result actually significant atau obvious?
 What questions still unanswered?"
          </pre>
          <div class="card-footer">
            <Sticker type="done">Hasil</Sticker>
            <span>
              → Accumulate informasi AND generate insight<br />
              → Lihat celah, keterbatasan, opportunity
            </span>
          </div>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- Section 2: Interactive 6 Lenses -->
  <NoteSection title="THE RESEARCHER'S MINDSET WHILE READING">
    <p></p>

    <!-- Tabs Widget -->
    <div class="lenses-widget">
      <div class="tabs-nav">
        {#each lenses as lens}
          <button
            class="tab-btn"
            class:active={activeTab === lens.id}
            onclick={() => (activeTab = lens.id)}
          >
            <ThemeIcon name={lens.icon} size={16} />
            <span>{lens.title.split('. ')[1]}</span>
          </button>
        {/each}
      </div>

      <div class="tab-content">
        {#each lenses as lens}
          {#if activeTab === lens.id}
            <div class="active-lens-details" style="animation: fadeIn 0.3s ease;">
              <div class="lens-header">
                <h4>
                  <ThemeIcon name={lens.icon} size={22} />
                  {lens.title}
                </h4>
                <p class="lens-desc">{lens.description}</p>
              </div>

              <div class="lens-questions-box">
                <h5>
                  <ThemeIcon name="callout-tip" size={16} /> Ajukan pertanyaan ini saat membaca:
                </h5>
                <ul>
                  {#each lens.questions as question}
                    <li>{question}</li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </NoteSection>

  <!-- Section 3: Concrete Case Study -->
  <NoteSection title="Studi Kasus Nyata: Menguliti Paper Refactoring">
    <p>
      Mari kita lihat simulasi konkritnya. Bayangkan kamu sedang membaca paper tentang <strong
        >automated code refactoring</strong
      > (penataan ulang struktur kode pemrograman agar lebih bersih).
    </p>

    <div class="case-study-box">
      <div class="case-header">
        <ThemeIcon name="note" size={20} />
        <span>Kutipan Temuan Paper yang Dibaca:</span>
      </div>

      <div class="paper-claim-container">
        <pre class="flow-code">
<strong>Paper: "Study of automated code refactoring"</strong>
- They implement 3 refactoring techniques
- Test pada 20 projects
- Result: Technique A best (85% success rate)
- Conclusion: Use Technique A
        </pre>
      </div>

      <div class="comparison-readers">
        <div class="reader-type passive-reader-box">
          <h5><ThemeIcon name="close" size={16} /> PASSIVE READING:</h5>
          <blockquote class="reader-quote">"Ok, got it. Technique A is best."</blockquote>
          <span class="outcome-tag red">→ No insight generated (Cuma nge-consume informasi)</span>
        </div>
      </div>

      <div class="interactive-case-toggle">
        <p>Bagaimana tanggapan kepalamu jika membaca sebagai <strong>Active Researcher</strong>?</p>
        <button class="toggle-btn" onclick={() => (showActiveAnalysis = !showActiveAnalysis)}>
          {showActiveAnalysis
            ? 'Sembunyikan Analisis Kritis'
            : 'Buka Tanggapan Kritis (Active Researcher)'}
        </button>
      </div>

      {#if showActiveAnalysis}
        <div
          class="analysis-timeline"
          style="animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);"
        >
          <div class="timeline-item">
            <span class="timeline-icon">Q</span>
            <div class="timeline-content">
              <strong>Q1: "Mereka test pada 20 projects... apa karakteristik projects?"</strong>
              <p><strong>A:</strong> "Mostly small Java projects"</p>
              <p>
                <strong>Q2-follow up:</strong> "Bagaimana dengan large projects? Python? Web code?"
              </p>
              <span class="found-gap"
                ><ThemeIcon name="callout-tip" size={14} /> GAP: No study pada different project types/languages</span
              >
            </div>
          </div>

          <div class="timeline-item">
            <span class="timeline-icon">Q</span>
            <div class="timeline-content">
              <strong
                >Q3: "Success rate 85%... maksud apa? Functionality correct? Code quality improved?
                Performance better?"</strong
              >
              <p><strong>A:</strong> "Just functionality (no bug introduced)"</p>
              <p>
                <strong>Q3-follow up:</strong> "Tapi apa readability meningkat? Complexity berkurang?
                Atau cuma functionality same tapi code masih messy?"
              </p>
              <span class="found-gap"
                ><ThemeIcon name="callout-tip" size={14} /> GAP: Only measure functionality, not comprehensive
                quality</span
              >
            </div>
          </div>

          <div class="timeline-item">
            <span class="timeline-icon">Q</span>
            <div class="timeline-content">
              <strong
                >Q4: "Mereka compare 3 techniques... tapi kenapa just 3? Apa ada technique lain yang
                nggak dipertimbangkan?"</strong
              >
              <p><strong>A:</strong> Paper not mention justification</p>
              <p>
                <strong>Q4-follow up:</strong> "Hmm, maybe ada approach lain yang worth testing. Apa hybrid
                approach between A & B?"
              </p>
              <span class="found-gap"
                ><ThemeIcon name="callout-tip" size={14} /> IDEA: Could combine techniques</span
              >
            </div>
          </div>

          <div class="timeline-item">
            <span class="timeline-icon">Q</span>
            <div class="timeline-content">
              <strong>Q5: "Input code sudah good atau legacy/messy code?"</strong>
              <p><strong>A:</strong> Paper not specify</p>
              <p>
                <strong>Q5-follow up:</strong> "Interesting! Effect might depend pada input quality. High
                quality code might not improve much, poor quality might improve more. But they didn't
                test this..."
              </p>
              <span class="found-gap"
                ><ThemeIcon name="callout-tip" size={14} /> GAP: Don't test how input quality affects
                refactoring outcome</span
              >
            </div>
          </div>

          <div class="timeline-item">
            <span class="timeline-icon">Q</span>
            <div class="timeline-content">
              <strong
                >Q6: "They use automated tool untuk refactoring... Bagaimana kalau gunakan AI
                instead?"</strong
              >
              <p><strong>A:</strong> Paper dari 2015, before LLMs exist</p>
              <p>
                <strong>Q6-follow up:</strong> "LLMs now exist! Could AI-based refactoring work better?
                Different trade-offs? Different challenges?"
              </p>
              <span class="found-gap"
                ><ThemeIcon name="callout-tip" size={14} /> GAP: No study yet on AI-based refactoring</span
              >
            </div>
          </div>

          <div class="success-box">
            <strong>See the difference?</strong> Dari satu paper saja, lewat active analysis kamu
            sudah berhasil men-spot <strong>beberapa gaps, ideas, dan angles</strong> yang luar biasa
            untuk bahan risetmu!
          </div>
        </div>
      {/if}
    </div>
  </NoteSection>

  <!-- Section: How to develop Research Eye -->
  <NoteSection title="How You Develop 'Research Eye'">
    <p>
      Melihat celah riset itu bukan bakat bawaan lahir (*magic*), melainkan sebuah keterampilan
      (*skill*) yang bisa dipelajari. Ini adalah <strong>5 keterampilan praktis</strong> yang bisa kamu
      latih untuk menumbuhkan "kacamata peneliti" dalam dirimu:
    </p>

    <div class="skills-carousel">
      <!-- Skill 1 -->
      <div class="skill-card">
        <div class="skill-header-card">
          <span class="skill-badge">Skill 1</span>
          <h4>Ask "Why?" constantly</h4>
        </div>
        <p class="skill-desc">
          Biasakan bertanya "Kenapa?" di setiap klaim atau keputusan metodologi penulis:
        </p>
        <pre class="flow-code">
Read: "They used methodology X"
Ask: "Why X, not Y?"
- Look at their justification (paper usually explain)
- Evaluate: Is justification convincing?
- Ask: What if Y was used instead?
- Think: Would result different?

→ This trains your brain untuk think critically.
        </pre>
      </div>

      <!-- Skill 2 -->
      <div class="skill-card">
        <div class="skill-header-card">
          <span class="skill-badge">Skill 2</span>
          <h4>Identify trade-offs</h4>
        </div>
        <p class="skill-desc">
          Setiap metodologi penelitian pasti memiliki trade-offs. Identifikasi itu secara jeli:
        </p>
        <pre class="flow-code">
Every methodology has trade-offs.

Example:
- Large sample size (n=1000): Generalizable, but expensive
- Small sample size (n=20): Detailed, but not generalizable

Read paper, identify trade-off:
"They chose small sample (n=20) untuk detailed analysis.
 But limits generalizability.
 What if larger sample with less detail?"

→ Gap: No study dengan large sample
        </pre>
      </div>

      <!-- Skill 3 -->
      <div class="skill-card">
        <div class="skill-header-card">
          <span class="skill-badge">Skill 3</span>
          <h4>Spot implicit assumptions</h4>
        </div>
        <p class="skill-desc">
          Temukan asumsi terselubung yang tidak ditulis secara blak-blakan oleh penulis:
        </p>
        <pre class="flow-code">
Paper assumes X, tapi nggak state explicit.

Example:
Paper: "Code refactoring technique works good"
Implicit assumption: Code written dalam certain style/language/domain
(maybe Python, maybe small projects, maybe certain coding patterns)

Ask: "Is this assumption universal atau context-specific?
     What if different context?"

→ Gap: Generalization concern
        </pre>
      </div>

      <!-- Skill 4 -->
      <div class="skill-card">
        <div class="skill-header-card">
          <span class="skill-badge">Skill 4</span>
          <h4>Notice what's NOT studied</h4>
        </div>
        <p class="skill-desc">
          Latih matamu untuk melihat apa saja dimensi penting yang dilewati atau diabaikan oleh
          paper:
        </p>
        <pre class="flow-code">
Paper study: "Does refactoring A work?"
What's NOT studied:
- WHEN is it work (mechanism understanding)
- FOR WHO is it useful (which developers, which contexts)
- WHY it work (underlying mechanisms)
- HOW MUCH effort needed to apply
- What are failure cases

→ Each "NOT studied" = potential gap
        </pre>
      </div>

      <!-- Skill 5 -->
      <div class="skill-card">
        <div class="skill-header-card">
          <span class="skill-badge">Skill 5</span>
          <h4>Understand trade-off choices</h4>
        </div>
        <p class="skill-desc">
          Pahami keputusan dilematis peneliti. Pilihan yang mereka tinggalkan adalah peluangmu:
        </p>
        <pre class="flow-code">
Researchers face choices:

Choice A: Study few projects deeply (detailed)
Choice B: Study many projects shallowly (generalizable)

Researchers usually choose ONE.

Ask:
- What did they choose?
- Why this choice?
- What if opposite choice?

→ Gap: Other direction not explored yet
        </pre>
      </div>
    </div>
  </NoteSection>

  <!-- Section: Practical Example -->
  <NoteSection title="Practical Example from Your Research">
    <p>
      Mari kita latih kelima skill di atas pada satu contoh temuan paper riil. Bayangkan kamu sedang
      membaca paper dengan temuan utama (finding) berikut:
    </p>

    <div class="practical-box">
      <div class="finding-card">
        <span class="finding-badge">Paper Finding</span>
        <blockquote
          class="paper-claim"
          style="border-left-color: var(--color-binder); margin-bottom: 0;"
        >
          "Automated refactoring tool improved code by average 30%"
        </blockquote>
      </div>

      <div class="comparison-readers" style="margin-top: 2rem;">
        <div class="reader-type passive-reader-box">
          <h5><ThemeIcon name="close" size={16} /> PASSIVE READING:</h5>
          <blockquote class="reader-quote">"Ok, 30% improvement. Good."</blockquote>
        </div>
      </div>

      <h5 class="active-title">
        <ThemeIcon name="check" size={16} /> ACTIVE ANALYSIS (7 Pertanyaan Kritis & Implikasinya):
      </h5>

      <div
        class="analysis-timeline"
        style="margin-top: 1.5rem; border-left-color: var(--color-binder);"
      >
        <!-- Q1 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">1</span
          >
          <div class="timeline-content">
            <strong>Q1: "30% is average... but distribution how?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> Maybe some code improved 80%, some 5%, average 30%. Doesn't
              mean all improve same!
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: No study of distribution, variability</span
            >
          </div>
        </div>

        <!-- Q2 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">2</span
          >
          <div class="timeline-content">
            <strong>Q2: "Improved code... improved in what dimension?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> Complexity? Readability? Performance? Security? Or just "fewer
              bugs"?
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: Single-dimensional evaluation, not comprehensive</span
            >
          </div>
        </div>

        <!-- Q3 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">3</span
          >
          <div class="timeline-content">
            <strong>Q3: "Average 30%... tested pada what kind of code?"</strong>
            <p class="implication-p"><strong>Implication:</strong> Legacy code? New code? Both?</p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: Don't know if improvement depends upon
              input code quality</span
            >
          </div>
        </div>

        <!-- Q4 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">4</span
          >
          <div class="timeline-content">
            <strong>Q4: "Using what methodology? Automated tool?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> Kalau automated: Different dari AI refactoring?
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: No comparison AI vs traditional automated</span
            >
          </div>
        </div>

        <!-- Q5 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">5</span
          >
          <div class="timeline-content">
            <strong>Q5: "Who need this? Practitioners find it useful?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> Or just technical improvement on paper?
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: No practical validation</span
            >
          </div>
        </div>

        <!-- Q6 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">6</span
          >
          <div class="timeline-content">
            <strong>Q6: "Methodology they use... could be applied differently?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> Could combine dengan other approach? Could adapt untuk different
              context?
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: Methodology not thoroughly explored</span
            >
          </div>
        </div>

        <!-- Q7 -->
        <div class="timeline-item">
          <span class="timeline-icon" style="background: var(--color-binder); color: white;">7</span
          >
          <div class="timeline-content">
            <strong>Q7: "Results surprising? Expected? Obvious?"</strong>
            <p class="implication-p">
              <strong>Implication:</strong> If obvious: Why belum semua orang pakai? If surprising: Why?
              What mechanism?
            </p>
            <span class="found-gap"
              ><ThemeIcon name="callout-tip" size={14} /> Gap: Lack of mechanism understanding</span
            >
          </div>
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- Section: Method Innovation -->
  <NoteSection title="How Method Innovation Happens">
    <p>
      Inovasi dalam metodologi penelitian tidak selalu berarti menciptakan sesuatu yang 100% baru
      dari nol. Sering kali, inovasi lahir ketika kamu berhasil <strong>menemukan kelemahan (weakness)
      pada metodologi yang sudah ada</strong> lalu memperbaikinya.
    </p>

    <div class="innovation-container">
      <!-- Example 1 -->
      <div class="innovation-card">
        <h5>Example 1: Spotting Metric Weakness</h5>
        <pre class="flow-code">
<strong>Existing paper:</strong>
"We evaluate refactoring using complexity metric only"

<strong>Your critical thought:</strong>
"Tapi complexity metric ada limitations:
- Doesn't measure readability
- Doesn't measure maintainability
- Doesn't guarantee code actually better untuk developers
- Missing practical perspective"

<strong>→ IDEA: Design multi-dimensional evaluation framework</strong>
        </pre>
        <div class="card-footer" style="border: none; padding-top: 0;">
          <Sticker type="done">Hasil</Sticker>
          <span style="font-size: 0.85rem; opacity: 0.9;"
            >Ini bukan metode baru total, melainkan <strong>IMPROVEMENT</strong> dari metode yang ada
            (komprehensif vs single-metric).</span
          >
        </div>
      </div>

      <!-- Example 2 -->
      <div class="innovation-card">
        <h5>Example 2: Spotting Test Weakness</h5>
        <pre class="flow-code">
<strong>Existing paper:</strong>
"We tested refactoring pada 20 projects of similar size/type"

<strong>Your critical thought:</strong>
"Tapi kalau input code quality different?
- Maybe improvement besar untuk bad code
- Maybe improvement kecil untuk good code
- Maybe tidak applicable untuk certain input conditions"

<strong>→ IDEA: Test dengan controlled input quality levels</strong>
        </pre>
        <div class="card-footer" style="border: none; padding-top: 0;">
          <Sticker type="done">Hasil</Sticker>
          <span style="font-size: 0.85rem; opacity: 0.9;"
            >Ini adalah <strong>METHODOLOGICAL IMPROVEMENT</strong>: Menguji objek yang sama, tapi
            dengan metode stratifikasi kualitas input.</span
          >
        </div>
      </div>
    </div>
  </NoteSection>

  <!-- Section: The Magic of Synthesis -->
  <NoteSection title="The Magic: Synthesis & Combination">
    <p>
      Selain memperbaiki kelemahan metode, cara paling ampuh dan instan untuk menemukan celah
      kebaruan (<em>novelty</em>) risetmu adalah dengan <strong>menggabungkan (synthesize) beberapa ide</strong> dari
      paper-paper yang berbeda:
    </p>

    <div class="synthesis-box-visual">
      <div class="synthesis-inputs">
        <div class="paper-bubble bubble-a">
          <span class="bubble-tag">Paper A</span>
          <p>"Code quality framework exist dengan 5 dimensions"</p>
        </div>
        <span class="math-operator">+</span>
        <div class="paper-bubble bubble-b">
          <span class="bubble-tag">Paper B</span>
          <p>"Input quality affect refactoring outcome"</p>
        </div>
        <span class="math-operator">+</span>
        <div class="paper-bubble bubble-c">
          <span class="bubble-tag">Paper C</span>
          <p>"AI tools make refactoring faster"</p>
        </div>
      </div>

      <div class="synthesis-divider">
        <ThemeIcon name="arrow-right" size={24} />
        <span class="divider-text">YOU NOTICE: No one combined these!</span>
      </div>

      <div class="synthesis-result">
        <span class="novelty-badge">YOUR NOVEL RESEARCH TOPIC!</span>
        <h4>
          "Comprehensive evaluation of AI refactoring (multi-dimensional) considering input quality
          effects for actual AI tools"
        </h4>
        <p class="result-desc">
          Risetmu = sintesis dari ide-ide yang sudah ada sebelumnya dengan cara yang benar-benar
          baru!
        </p>
      </div>
    </div>
  </NoteSection>

  <!-- Section 4: Why Gaps Exist -->
  <NoteSection title="KEY INSIGHT: Kenapa Celah Riset Selalu Ada?">
    <p>
      Kamu tidak perlu khawatir kalau semua topik di dunia ini sudah diselesaikan orang. Celah riset
      (*research gap*) akan <strong>selalu exist secara alami</strong> karena 7 alasan logis berikut:
    </p>

    <div class="bento-reasons" style="grid-template-columns: 1fr;">
      <!-- Reason 1 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 1: Researchers make choices</h5>
        <pre class="flow-code">
"Should I study A or B?" 
"I'll study A"
→ B become potential gap
        </pre>
      </div>

      <!-- Reason 2 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 2: Context changes</h5>
        <pre class="flow-code">
Old paper: Study X dalam context Y
New time: Context Y different now, atau new context Z exist
→ Need update & validation
        </pre>
      </div>

      <!-- Reason 3 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 3: Technology evolves</h5>
        <pre class="flow-code">
Old paper: Using technology X
New time: Technology Y exist, more powerful
→ How does Y change findings?
        </pre>
      </div>

      <!-- Reason 4 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 4: Limitations are acknowledged</h5>
        <pre class="flow-code">
Paper: "Our study limited to [X]"
→ Obvious gap: Need study beyond X
        </pre>
      </div>

      <!-- Reason 5 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 5: Incomplete understanding</h5>
        <pre class="flow-code">
Paper: "We found X works"
But: WHY does X work? Not explained
→ Gap: Mechanism understanding needed
        </pre>
      </div>

      <!-- Reason 6 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 6: Trade-off choices</h5>
        <pre class="flow-code">
Paper: Choose between thoroughness vs generalizability
→ Other direction unexplored
        </pre>
      </div>

      <!-- Reason 7 -->
      <div class="bento-card-mini">
        <h5 style="color: var(--color-accent);">REASON 7: No one thought of it yet</h5>
        <pre class="flow-code">
Combination of ideas yang no one synthesized yet
→ Novel idea dari synthesis (sintesis beberapa paper)
        </pre>
      </div>
    </div>
  </NoteSection>

  <!-- Section 5: Interactive Quiz -->
  <NoteSection title="Asah Insting Penelitimu!">
    <p>
      Mari kita uji pemahamanmu dengan kuis kilat interaktif berikut. Jangan cemas salah, kuis ini
      dirancang untuk membantumu memantapkan konsep!
    </p>
    <Quiz questions={quizQuestions} title="Kuis Kilat: Mindset Peneliti" />
  </NoteSection>

  <!-- Section 6: Feynman Reflection -->
  <NoteSection title="Catatan Feynman: Sederhanakan!">
    <div class="feynman-box">
      <div class="feynman-avatar"><ThemeIcon name="ai-brain" size={40} /></div>
      <div class="feynman-content">
        <h5>Metode Feynman untuk Belajar Cepat</h5>
        <p>
          "Jika kamu belum bisa menjelaskan suatu konsep ilmiah dengan bahasa yang sederhana, ramah,
          dan mudah dipahami anak kecil sekalipun, berarti kamu belum benar-benar memahami konsep
          tersebut."
        </p>
        <p class="feynman-conclusion">
          Begitu pula dengan riset. Jangan terjebak memakai bahasa rumit yang bikin cemas. Pahami
          logika dasarnya, ajukan pertanyaan 'Kenapa?', dan sampaikan pemahamanmu secara rileks.
          Kamu pasti bisa!
        </p>
      </div>
    </div>
  </NoteSection>

  <BackLink href="/semester-1/metodologi-riset" label="Kembali ke Metodologi Riset" />
</article>

<style>
  /* Comparison Grid (Pasif vs Aktif) */
  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

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

  .action-desc {
    font-size: 0.95rem;
    opacity: 0.85;
    margin-bottom: 0.75rem;
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

  .card-footer {
    margin-top: auto;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.9rem;
    opacity: 0.9;
    border-top: 1px dashed var(--color-line);
    padding-top: 1rem;
  }

  /* 6 Lenses Widget */
  .lenses-widget {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    margin: 2rem 0;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .tabs-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--color-surface-soft);
    border-bottom: 1px solid var(--color-line);
  }

  .tab-btn {
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

  .tab-btn:hover {
    color: var(--color-binder);
    background: rgba(139, 69, 19, 0.03);
  }

  .tab-btn.active {
    color: var(--color-binder);
    background: var(--color-surface-elevated);
    border-bottom-color: var(--color-binder);
  }

  .tab-content {
    padding: 2rem;
    min-height: 220px;
    background: var(--color-surface-elevated);
  }

  .lens-header h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.35rem;
    color: var(--color-binder);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .lens-desc {
    opacity: 0.85;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .lens-questions-box {
    background: var(--color-surface-soft);
    border: 1px dashed var(--color-note-lines);
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
  }

  .lens-questions-box h5 {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
    color: var(--color-ink-strong);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .lens-questions-box ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .lens-questions-box li {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: var(--color-ink);
  }

  /* Case Study Box */
  .case-study-box {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: var(--shadow-sm);
  }

  .case-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-ink-soft);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .paper-claim-container {
    margin-bottom: 1.5rem;
  }

  .comparison-readers {
    margin-bottom: 2rem;
  }

  .reader-type h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.05rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .passive-reader-box h5 {
    color: var(--color-status-important-start);
  }

  .reader-quote {
    font-style: italic;
    font-size: 1.15rem;
    color: var(--color-ink-strong);
    border-left: 4px solid var(--color-status-important-start);
    padding-left: 1rem;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .outcome-tag {
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    margin-top: 0.5rem;
  }

  .outcome-tag.red {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-text);
  }

  .interactive-case-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border-top: 1px solid var(--color-line);
    padding-top: 1.5rem;
    text-align: center;
  }

  .interactive-case-toggle p {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.85;
  }

  .toggle-btn {
    padding: 0.75rem 1.5rem;
    background: var(--color-binder);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 0 var(--color-ink-strong);
  }

  .toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 var(--color-ink-strong);
  }

  .toggle-btn:active {
    transform: translateY(0);
    box-shadow: 0 0 0 var(--color-ink-strong);
  }

  .analysis-timeline {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 2px dashed var(--color-line);
    padding-left: 1.5rem;
    margin-left: 1rem;
  }

  .timeline-item {
    position: relative;
  }

  .timeline-icon {
    position: absolute;
    left: -2.35rem;
    top: 0;
    width: 24px;
    height: 24px;
    background: var(--color-surface-elevated);
    border: 2px solid var(--color-line);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }

  .timeline-content strong {
    font-size: 1rem;
    color: var(--color-ink-strong);
    display: block;
    margin-bottom: 0.25rem;
  }

  .timeline-content p {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  .found-gap {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--color-callout-tip-start);
    border: 1px solid var(--color-callout-tip-border);
    color: var(--color-callout-tip-text);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .success-box {
    background: var(--color-status-success-soft);
    border: 1px solid var(--color-status-success-border);
    color: var(--color-status-success-text);
    padding: 1.25rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 1rem;
    text-align: center;
  }

  /* Bento Reasons */
  .bento-reasons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin: 2rem 0;
  }

  .bento-card-mini {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .bento-card-mini h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: var(--color-binder);
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
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Skills Grid */
  .skills-carousel {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .skill-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    min-width: 0; /* Prevents grid expansion layout issue */
  }

  .skill-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-binder);
  }

  .skill-header-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .skill-badge {
    background: var(--color-binder);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .skill-header-card h4 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-ink-strong);
    font-family: var(--font-body);
    font-weight: 700;
  }

  .skill-desc {
    font-size: 0.95rem;
    opacity: 0.9;
    margin-bottom: 0.75rem;
  }

  /* Practical Box styling */
  .practical-box {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: var(--shadow-sm);
  }

  .finding-card {
    background: var(--color-surface-soft);
    border: 1.5px dashed var(--color-binder);
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    position: relative;
    margin-bottom: 1.5rem;
  }

  .finding-badge {
    position: absolute;
    top: -12px;
    left: 1rem;
    background: var(--color-binder);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
  }

  .active-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-ink-strong);
    margin-top: 2rem;
    border-bottom: 2px dashed var(--color-line);
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .implication-p {
    font-size: 0.95rem;
    color: var(--color-ink);
    margin: 0.25rem 0 0.5rem 0;
  }

  /* Innovation & Synthesis Grid */
  .innovation-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .innovation-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevents grid expansion layout issue */
  }

  .innovation-card h5 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: var(--color-binder);
  }

  /* Synthesis Box Visuals */
  .synthesis-box-visual {
    background: var(--color-surface);
    border: 1px dashed var(--color-note-lines);
    border-radius: 20px;
    padding: 2.5rem;
    margin: 2.5rem 0;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    box-sizing: border-box; /* Avoids border/padding overflow */
  }

  .synthesis-inputs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    flex-wrap: nowrap;
  }

  .paper-bubble {
    background: var(--color-surface-elevated);
    border: 1.5px solid var(--color-line);
    border-radius: 16px;
    padding: 1.25rem;
    width: 220px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    position: relative;
    transition: transform 0.2s ease;
  }

  .paper-bubble:hover {
    transform: scale(1.03);
    border-color: var(--color-binder);
  }

  .bubble-tag {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: 700;
    color: #ffffff;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .bubble-a .bubble-tag {
    background: #3498db;
  }
  .bubble-b .bubble-tag {
    background: #e67e22;
  }
  .bubble-c .bubble-tag {
    background: #9b59b6;
  }

  .paper-bubble p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-ink-strong);
  }

  .math-operator {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-ink-soft);
  }

  .synthesis-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-binder);
  }

  .divider-text {
    font-family: var(--font-handwriting);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-accent);
  }

  .synthesis-result {
    background: var(--color-status-success-soft);
    border: 2px solid var(--color-status-success-border);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    max-width: 700px;
    box-shadow: var(--shadow-md);
    position: relative;
    box-sizing: border-box; /* Avoids border/padding overflow */
  }

  .novelty-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-status-success-start);
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 800;
    padding: 0.25rem 0.8rem;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  .synthesis-result h4 {
    margin: 0.5rem 0 1rem 0;
    font-size: 1.25rem;
    color: var(--color-status-success-text);
    line-height: 1.6;
    font-family: var(--font-body);
  }

  .result-desc {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.9;
    color: var(--color-ink-strong);
  }

  @media (max-width: 768px) {
    .comparison-grid,
    .bento-reasons,
    .innovation-container {
      grid-template-columns: 1fr;
    }

    .tabs-nav {
      grid-template-columns: repeat(2, 1fr);
    }

    .feynman-box {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .synthesis-inputs {
      flex-direction: column;
      gap: 1.5rem;
    }

    .math-operator {
      transform: rotate(90deg);
      margin: 0.25rem 0;
    }

    .synthesis-divider :global(svg) {
      transform: rotate(90deg);
    }
  }

  @media (max-width: 480px) {
    .tabs-nav {
      grid-template-columns: 1fr;
    }
  }
</style>
