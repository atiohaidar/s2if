<script lang="ts">
    import Sticker from "./Sticker.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Question {
        question: string;
        options: string[];
        correctIndex: number;
        explanation?: string;
    }

    interface Props {
        title?: string;
        questions: Question[];
    }

    let { title = "Kuis Kilat", questions }: Props = $props();

    let currentQuestion = $state(0);
    let selectedOption: number | null = $state(null);
    let isSubmitted = $state(false);
    let score = $state(0);
    let showResult = $state(false);

    function selectOption(index: number) {
        if (!isSubmitted) {
            selectedOption = index;
        }
    }

    function checkAnswer() {
        if (selectedOption === null) return;

        isSubmitted = true;
        if (selectedOption === questions[currentQuestion].correctIndex) {
            score++;
        }
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            selectedOption = null;
            isSubmitted = false;
        } else {
            showResult = true;
        }
    }

    function resetQuiz() {
        currentQuestion = 0;
        selectedOption = null;
        isSubmitted = false;
        score = 0;
        showResult = false;
    }
</script>

<div class="quiz-container">
    <div class="tape"></div>

    <header class="quiz-header">
        <h3><ThemeIcon name="edit" size={18} /> {title}</h3>
        {#if !showResult}
            <span class="progress"
                >Soal {currentQuestion + 1} / {questions.length}</span
            >
        {/if}
    </header>

    <div class="quiz-content">
        {#if showResult}
            <div class="result-card">
                <div class="score-circle">
                    <span class="score-val"
                        >{Math.round((score / questions.length) * 100)}</span
                    >
                    <span class="score-label">Nilai</span>
                </div>

                <p class="feedback">
                    {#if score === questions.length}
                        <ThemeIcon name="check" size={16} /> Sempurna! Kamu menguasai materi ini.
                    {:else if score > questions.length / 2}
                        Bagus! Coba lagi untuk nilai sempurna.
                    {:else}
                        <ThemeIcon name="topics" size={16} /> Perlu belajar lagi sepertinya.
                    {/if}
                </p>

                <div class="result-stats">
                    Benar {score} dari {questions.length} soal
                </div>

                <button class="action-btn restart" onclick={resetQuiz}>
                    <ThemeIcon name="close" size={14} /> Ulangi Kuis
                </button>
            </div>
        {:else}
            <!-- Question -->
            <div class="question-block">
                <p class="question-text">
                    {questions[currentQuestion].question}
                </p>

                <div class="options-list">
                    {#each questions[currentQuestion].options as option, i}
                        <button
                            class="option-btn"
                            class:selected={selectedOption === i}
                            class:correct={isSubmitted &&
                                i === questions[currentQuestion].correctIndex}
                            class:wrong={isSubmitted &&
                                selectedOption === i &&
                                i !== questions[currentQuestion].correctIndex}
                            disabled={isSubmitted}
                            onclick={() => selectOption(i)}
                        >
                            <span class="opt-letter"
                                >{String.fromCharCode(65 + i)}</span
                            >
                            <span class="opt-text">{option}</span>

                            {#if isSubmitted}
                                {#if i === questions[currentQuestion].correctIndex}
                                    <span class="status-icon"><ThemeIcon name="check" size={14} /></span>
                                {:else if selectedOption === i}
                                    <span class="status-icon"><ThemeIcon name="close" size={14} /></span>
                                {/if}
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Feedback / Explanation -->
            {#if isSubmitted}
                <div
                    class="explanation"
                    class:correct={selectedOption ===
                        questions[currentQuestion].correctIndex}
                >
                    <strong>
                        {selectedOption ===
                        questions[currentQuestion].correctIndex
                            ? "Benar!"
                            : "Kurang Tepat."}
                    </strong>
                    {#if questions[currentQuestion].explanation}
                        <p>{questions[currentQuestion].explanation}</p>
                    {/if}
                </div>

                <div class="actions">
                    <button class="action-btn next" onclick={nextQuestion}>
                        {currentQuestion < questions.length - 1
                            ? "Soal Selanjutnya →"
                            : "Lihat Hasil"}
                    </button>
                </div>
            {:else}
                <div class="actions">
                    <button
                        class="action-btn submit"
                        disabled={selectedOption === null}
                        onclick={checkAnswer}
                    >
                        Cek Jawaban
                    </button>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .quiz-container {
        background: #fffdf5; /* Sticky note yellow-ish tint */
        border: 1px solid #e8dcc8;
        border-radius: 4px; /* Slightly ragged feel but simpler with radius */
        padding: 1.5rem;
        margin: 2rem 0;
        position: relative;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
        font-family: var(--font-body);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        transform: rotate(-1deg); /* Sedikit miring */
    }

    .tape {
        width: 100px;
        height: 30px;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid rgba(0, 0, 0, 0.05);
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%) rotate(2deg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
    }

    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px dashed #d4b896;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
    }

    .quiz-header h3 {
        margin: 0;
        font-family: var(--font-handwriting);
        color: #8b4513;
        font-size: 1.5rem;
    }

    .progress {
        font-size: 0.8rem;
        font-weight: 600;
        color: #a67c52;
        background: rgba(139, 69, 19, 0.1);
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
    }

    .question-text {
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        color: #3d2b1f;
    }

    .options-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .option-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: white;
        border: 2px solid #e8dcc8;
        border-radius: 8px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: #5d4037;
    }

    .option-btn:hover:not(:disabled) {
        border-color: #d4b896;
        background: #faf7f0;
    }

    .option-btn.selected {
        border-color: #3498db;
        background: #ebf5fb;
    }

    .option-btn.correct {
        border-color: #27ae60;
        background: #eafaf1;
        color: #1e8449;
    }

    .option-btn.wrong {
        border-color: #e74c3c;
        background: #fdedec;
        opacity: 0.7;
    }

    .opt-letter {
        font-weight: 700;
        font-size: 0.85rem;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        flex-shrink: 0;
    }

    .opt-text {
        flex: 1;
    }

    .actions {
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-end;
    }

    .action-btn {
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.1s;
    }

    .action-btn:active {
        transform: scale(0.95);
    }

    .action-btn.submit {
        background: #3498db;
        color: white;
    }

    .action-btn.submit:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
    }

    .action-btn.next {
        background: #2c3e50;
        color: white;
    }

    .action-btn.restart {
        background: #95a5a6;
        color: white;
        margin-top: 1rem;
    }

    .explanation {
        margin-top: 1rem;
        padding: 1rem;
        background: #f0f0f0;
        border-radius: 8px;
        font-size: 0.9rem;
        animation: fadeIn 0.3s ease;
    }

    .explanation.correct {
        background: #eafaf1;
        border: 1px solid #a9dfbf;
    }

    /* Result State */
    .result-card {
        text-align: center;
        padding: 1rem;
    }

    .score-circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: white;
        border: 4px solid #8b4513;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
    }

    .score-val {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1;
        color: #2c3e50;
    }

    .score-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: #7f8c8d;
        margin-top: 0.2rem;
    }

    .feedback {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #3d2b1f;
    }

    .result-stats {
        color: #7f8c8d;
    }
</style>
