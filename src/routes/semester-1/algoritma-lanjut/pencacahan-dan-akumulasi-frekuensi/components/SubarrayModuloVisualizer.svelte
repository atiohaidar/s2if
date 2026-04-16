<script lang="ts">
    import { onDestroy } from "svelte";

    const presets = [
        { name: "Dasar", arr: [2, 1, 2, 1], m: 3 },
        { name: "Variatif", arr: [4, -2, 7, 3, -1, 6], m: 5 },
        { name: "Lebih Panjang", arr: [5, 2, -4, 9, 1, -3, 8, 2], m: 4 },
    ];

    let sampleA = $state<number[]>([4, -2, 7, 3, -1, 6]);
    let M = $state(5);
    let arrayInput = $state("4, -2, 7, 3, -1, 6");
    let modulusInput = $state("5");

    let step = $state(-1);
    let pref = $state(0);
    let ans = $state(0);
    let freq = $state<number[]>([1, 0, 0, 0, 0]);
    let message = $state("Mulai dari prefix kosong: remainder 0 sudah muncul 1 kali.");

    let history = $state<
        Array<{
            step: number;
            pref: number;
            ans: number;
            freq: number[];
            message: string;
        }>
    >([]);

    let autoplayId = $state<ReturnType<typeof setInterval> | null>(null);
    let autoplayMs = $state(850);

    function modNormalize(value: number, modulus: number): number {
        return ((value % modulus) + modulus) % modulus;
    }

    function parseArray(input: string): number[] | null {
        const chunks = input
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

        if (chunks.length === 0) {
            return null;
        }

        const parsed = chunks.map((item) => Number(item));
        if (parsed.some((n) => !Number.isFinite(n))) {
            return null;
        }

        return parsed.map((n) => Math.trunc(n));
    }

    function applyScenario(arr: number[], modulus: number) {
        sampleA = [...arr];
        M = modulus;
        arrayInput = arr.join(", ");
        modulusInput = String(modulus);
        reset();
        message = "Dataset dimuat. Klik Next atau Auto untuk mulai animasi.";
    }

    function applyCustomInput() {
        const arr = parseArray(arrayInput);
        const m = Number(modulusInput);

        if (!arr) {
            message = "Format array tidak valid. Gunakan format: 4, -2, 7, 3";
            return;
        }

        if (!Number.isInteger(m) || m <= 1) {
            message = "Nilai M harus bilangan bulat dan > 1.";
            return;
        }

        applyScenario(arr, m);
    }

    function snapshot() {
        history.push({
            step,
            pref,
            ans,
            freq: [...freq],
            message,
        });
    }

    function reset() {
        step = -1;
        pref = 0;
        ans = 0;
        freq = Array(M).fill(0);
        freq[0] = 1;
        history = [];
        message = "Mulai dari prefix kosong: remainder 0 sudah muncul 1 kali.";
        stopAutoplay();
    }

    function nextStep() {
        if (sampleA.length === 0) {
            message = "Array kosong. Masukkan data dulu.";
            return;
        }

        if (step >= sampleA.length - 1) {
            message = `Selesai. Total subarray valid = ${ans}.`;
            stopAutoplay();
            return;
        }

        snapshot();

        step += 1;
        const x = sampleA[step];
        const prevPref = pref;
        pref = modNormalize(pref + x, M);

        const matches = freq[pref];
        ans += matches;
        freq[pref] += 1;

        message =
            `i=${step}, x=${x}. ` +
            `pref: (${prevPref}+${x}) mod ${M} = ${pref}. ` +
            `freq[${pref}] lama = ${matches} -> ans tambah ${matches}, ans sekarang ${ans}. ` +
            `Lalu freq[${pref}] jadi ${freq[pref]}.`;

        if (step >= sampleA.length - 1) {
            stopAutoplay();
        }
    }

    function prevStep() {
        stopAutoplay();
        if (history.length === 0) {
            return;
        }

        const prev = history.pop();
        if (!prev) {
            return;
        }

        step = prev.step;
        pref = prev.pref;
        ans = prev.ans;
        freq = prev.freq;
        message = prev.message;
    }

    function startAutoplay() {
        if (autoplayId || step >= sampleA.length - 1) {
            return;
        }

        autoplayId = setInterval(() => {
            nextStep();
            if (step >= sampleA.length - 1) {
                stopAutoplay();
            }
        }, autoplayMs);
    }

    function stopAutoplay() {
        if (autoplayId) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    onDestroy(() => {
        stopAutoplay();
    });
</script>

<div class="visualizer-box">
    <h4>Visualizer Soal 1: Subarray Sum Divisible by M</h4>
    <p class="context">Coba preset atau masukkan angka sendiri untuk melihat perubahan alur per langkah.</p>

    <div class="preset-row">
        {#each presets as preset (preset.name)}
            <button class="ghost" onclick={() => applyScenario(preset.arr, preset.m)}>{preset.name}</button>
        {/each}
    </div>

    <div class="config-grid">
        <label class="field">
            <span>Array A (pisahkan koma)</span>
            <input bind:value={arrayInput} placeholder="contoh: 4, -2, 7, 3" />
        </label>
        <label class="field field-m">
            <span>Modulus M</span>
            <input bind:value={modulusInput} type="number" min="2" step="1" />
        </label>
        <div class="field field-action">
            <span>&nbsp;</span>
            <button onclick={applyCustomInput}>Apply Input</button>
        </div>
    </div>

    <div class="controls">
        <button onclick={nextStep} disabled={step >= sampleA.length - 1}>→ Next</button>
        <button onclick={prevStep} disabled={history.length === 0}>← Prev</button>
        <button onclick={startAutoplay} disabled={autoplayId !== null || step >= sampleA.length - 1}>▶ Auto</button>
        <button onclick={stopAutoplay} disabled={autoplayId === null}>⏸ Stop</button>
        <button onclick={reset}>↻ Reset</button>
        <select bind:value={autoplayMs}>
            <option value={1200}>Auto lambat</option>
            <option value={850}>Auto normal</option>
            <option value={500}>Auto cepat</option>
        </select>
        <span class="badge">step: {step + 1}/{sampleA.length}</span>
    </div>

    <div class="progress-wrap" aria-hidden="true">
        <div class="progress" style={`width: ${sampleA.length > 0 ? ((step + 1) / sampleA.length) * 100 : 0}%`}>
        </div>
    </div>

    <div class="panel">
        <div class="array-row">
            <span class="label">A</span>
            {#each sampleA as val, i (i)}
                <div class="cell" class:active={i === step}>{val}</div>
            {/each}
        </div>

        <div class="stats">
            <div class="stat"><strong>pref (mod M):</strong> {pref}</div>
            <div class="stat"><strong>ans:</strong> {ans}</div>
            <div class="stat"><strong>elemen aktif:</strong> {step >= 0 ? sampleA[step] : "-"}</div>
        </div>

        <div class="array-row">
            <span class="label">freq</span>
            {#each freq as val, r (r)}
                <div class="cell" class:hit={r === pref && step >= 0}>{val}</div>
            {/each}
        </div>
        <div class="index-row">
            <span class="label"></span>
            {#each Array(M)
                .fill(0)
                .map((_, i) => i) as r}
                <span class="idx">r={r}</span>
            {/each}
        </div>
    </div>

    <div class="message">{message}</div>
</div>

<style>
    .visualizer-box {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid var(--color-border-default);
        border-radius: 0.75rem;
        background: var(--color-surface-raised);
    }

    h4 {
        margin: 0 0 0.25rem;
    }

    .context {
        margin: 0 0 0.75rem;
        opacity: 0.85;
    }

    .preset-row {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
    }

    .config-grid {
        display: grid;
        grid-template-columns: 1fr 130px 140px;
        gap: 0.55rem;
        margin-bottom: 0.75rem;
    }

    .field {
        display: grid;
        gap: 0.3rem;
    }

    .field span {
        font-size: 0.82rem;
        opacity: 0.85;
    }

    input,
    select {
        border: 1px solid var(--color-border-default);
        background: var(--color-surface-default);
        padding: 0.45rem 0.55rem;
        border-radius: 0.45rem;
    }

    .field-action {
        align-content: end;
    }

    .controls {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
    }

    button {
        border: 1px solid var(--color-border-default);
        background: var(--color-surface-default);
        padding: 0.4rem 0.7rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    button.ghost {
        background: color-mix(in srgb, var(--color-brand-primary) 10%, white);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .progress-wrap {
        height: 0.5rem;
        border-radius: 999px;
        background: var(--color-surface-muted);
        margin-bottom: 0.75rem;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        background: linear-gradient(90deg, var(--color-brand-primary), var(--color-accent-success));
        transition: width 0.25s ease;
    }

    .badge {
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        background: var(--color-surface-muted);
        align-self: center;
        font-size: 0.85rem;
    }

    .panel {
        padding: 0.75rem;
        border: 1px dashed var(--color-border-default);
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
    }

    .array-row,
    .index-row {
        display: flex;
        gap: 0.45rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0.4rem;
    }

    .label {
        width: 3.4rem;
        font-weight: 600;
    }

    .cell {
        width: 2.2rem;
        height: 2.2rem;
        display: grid;
        place-items: center;
        border-radius: 0.45rem;
        border: 1px solid var(--color-border-default);
        background: var(--color-surface-default);
        font-weight: 600;
    }

    .cell.active {
        border-color: var(--color-brand-primary);
        background: color-mix(in srgb, var(--color-brand-primary) 16%, white);
    }

    .cell.hit {
        border-color: var(--color-accent-success);
        background: color-mix(in srgb, var(--color-accent-success) 16%, white);
    }

    .idx {
        width: 2.2rem;
        text-align: center;
        font-size: 0.8rem;
        opacity: 0.8;
    }

    .stats {
        display: flex;
        gap: 1rem;
        margin: 0.3rem 0 0.55rem;
        flex-wrap: wrap;
    }

    .stat {
        font-size: 0.95rem;
    }

    .message {
        border-left: 3px solid var(--color-brand-primary);
        padding: 0.65rem 0.75rem;
        background: color-mix(in srgb, var(--color-brand-primary) 8%, white);
        border-radius: 0.25rem;
        line-height: 1.5;
    }

    @media (max-width: 780px) {
        .config-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
