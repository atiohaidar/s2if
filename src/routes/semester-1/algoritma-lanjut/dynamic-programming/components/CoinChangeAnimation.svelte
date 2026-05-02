<script lang="ts">
    const coins = [1, 3, 4];
    const target = 6;
    const INF = 999;

    let dp = $state<number[]>(new Array(target + 1).fill(INF));
    let usedCoin = $state<number[]>(new Array(target + 1).fill(-1));
    let currentX = $state(-1);
    let currentCoin = $state(-1);
    let step = $state(0);
    let message = $state("Klik 'Next' untuk mulai mengisi tabel DP Coin Change.");
    let isFinished = $state(false);
    let highlightCells = $state<number[]>([]);

    // Pre-compute all steps
    type Step = {
        x: number;
        coin: number;
        dp: number[];
        usedCoin: number[];
        msg: string;
        highlights: number[];
    };

    function computeAllSteps(): Step[] {
        const steps: Step[] = [];
        const d = new Array(target + 1).fill(INF);
        const u = new Array(target + 1).fill(-1);
        d[0] = 0;

        steps.push({
            x: -1, coin: -1,
            dp: [...d], usedCoin: [...u],
            msg: "Base case: dp[0] = 0 (butuh 0 koin untuk nilai 0).",
            highlights: [0]
        });

        for (let x = 1; x <= target; x++) {
            for (const c of coins) {
                if (x - c >= 0 && d[x - c] + 1 < d[x]) {
                    d[x] = d[x - c] + 1;
                    u[x] = c;
                    steps.push({
                        x, coin: c,
                        dp: [...d], usedCoin: [...u],
                        msg: `dp[${x}]: coba koin ${c} → dp[${x}-${c}]+1 = dp[${x - c}]+1 = ${d[x]}. Update!`,
                        highlights: [x, x - c]
                    });
                } else if (x - c >= 0) {
                    steps.push({
                        x, coin: c,
                        dp: [...d], usedCoin: [...u],
                        msg: `dp[${x}]: coba koin ${c} → dp[${x - c}]+1 = ${d[x - c] + 1} ≥ ${d[x]}. Skip.`,
                        highlights: [x, x - c]
                    });
                }
            }
        }

        return steps;
    }

    const allSteps = computeAllSteps();

    function nextStep() {
        if (step >= allSteps.length) {
            isFinished = true;
            message = `Selesai! dp[${target}] = ${dp[target]}. Minimum ${dp[target]} koin untuk nilai ${target}.`;
            return;
        }
        const s = allSteps[step];
        dp = s.dp;
        usedCoin = s.usedCoin;
        currentX = s.x;
        currentCoin = s.coin;
        message = s.msg;
        highlightCells = s.highlights;
        step++;

        if (step >= allSteps.length) {
            isFinished = true;
            message += ` → Selesai! Minimum ${dp[target]} koin.`;
        }
    }

    function reset() {
        dp = new Array(target + 1).fill(INF);
        usedCoin = new Array(target + 1).fill(-1);
        currentX = -1;
        currentCoin = -1;
        step = 0;
        message = "Klik 'Next' untuk mulai mengisi tabel DP Coin Change.";
        isFinished = false;
        highlightCells = [];
    }

    function autoPlay() {
        if (isFinished) return;
        const interval = setInterval(() => {
            if (step >= allSteps.length) {
                isFinished = true;
                message = `Selesai! dp[${target}] = ${dp[target]}. Minimum ${dp[target]} koin untuk nilai ${target}.`;
                clearInterval(interval);
                return;
            }
            nextStep();
        }, 800);
    }

    function displayVal(v: number): string {
        return v >= INF ? "∞" : String(v);
    }
</script>

<div class="demo-container">
    <div class="demo-header">
        <h4>Animasi DP: Minimum Coin Change</h4>
        <span class="badge">Koin: {`{${coins.join(', ')}}`}, Target: {target}</span>
    </div>

    <div class="info-panel">
        <p>{message}</p>
    </div>

    <div class="table-area">
        <table class="dp-table">
            <thead>
                <tr>
                    <th>x</th>
                    {#each dp as _, i}
                        <th class:active-col={highlightCells.includes(i)}>{i}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="label-cell">dp[x]</td>
                    {#each dp as val, i}
                        <td 
                            class:highlight={highlightCells.includes(i)}
                            class:base={i === 0 && val === 0}
                            class:infinity={val >= INF}
                        >
                            {displayVal(val)}
                        </td>
                    {/each}
                </tr>
                <tr>
                    <td class="label-cell">koin</td>
                    {#each usedCoin as c, i}
                        <td class="coin-cell" class:highlight={highlightCells.includes(i)}>
                            {c >= 0 ? c : "-"}
                        </td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </div>

    <div class="coin-indicator">
        <span class="coin-label">Koin yang sedang dicoba:</span>
        {#each coins as c}
            <span class="coin-chip" class:active-coin={currentCoin === c}>{c}</span>
        {/each}
    </div>

    <div class="controls">
        <button class="btn-play" onclick={nextStep} disabled={isFinished}>Next</button>
        <button class="btn-auto" onclick={autoPlay} disabled={isFinished}>Auto Play</button>
        <button class="btn-reset" onclick={reset}>Reset</button>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        font-family: inherit;
    }

    .demo-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .demo-header h4 { margin: 0; color: var(--color-ink); }

    .badge {
        background: var(--color-status-info-soft);
        color: var(--color-status-info-border);
        padding: 0.2rem 0.7rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .info-panel {
        background: var(--color-surface);
        border: 1px dashed var(--color-link);
        border-radius: 6px;
        padding: 0.8rem 1rem;
        margin-bottom: 1rem;
        min-height: 48px;
        display: flex;
        align-items: center;
    }
    .info-panel p { margin: 0; font-weight: 600; color: var(--color-ink); font-size: 0.92rem; }

    .table-area { overflow-x: auto; margin-bottom: 1rem; }

    .dp-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 400px;
    }

    .dp-table th, .dp-table td {
        border: 1px solid var(--color-line);
        text-align: center;
        padding: 0.5rem 0.6rem;
        font-size: 0.95rem;
        transition: background 0.3s, color 0.3s;
    }

    .dp-table th {
        background: var(--color-surface-soft);
        font-weight: 700;
    }

    .label-cell {
        font-weight: 700;
        background: var(--color-surface-soft);
        min-width: 50px;
    }

    .active-col { background: var(--color-status-info-soft) !important; }

    .highlight {
        background: var(--color-status-success-soft) !important;
        font-weight: bold;
    }

    .base {
        background: var(--color-status-success-soft) !important;
        color: var(--color-status-success-text) !important;
        font-weight: bold;
    }

    .infinity { color: var(--color-ink-muted); }

    .coin-cell { font-size: 0.85rem; color: var(--color-ink-muted); }

    .coin-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .coin-label { font-weight: 600; font-size: 0.9rem; color: var(--color-ink-muted); }

    .coin-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--color-surface);
        border: 2px solid var(--color-line);
        font-weight: bold;
        font-size: 0.9rem;
        transition: all 0.3s;
    }

    .active-coin {
        background: var(--color-link);
        color: white;
        border-color: var(--color-link);
        transform: scale(1.15);
    }

    .controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        color: white;
        transition: transform 0.1s, opacity 0.2s;
    }
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-play { background: var(--color-link); }
    .btn-auto { background: var(--color-status-success-text, #38a169); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
