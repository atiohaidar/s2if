<script lang="ts">
    const strA = "TOHBAT";
    const strB = "BOBBA";
    const n = strA.length;
    const m = strB.length;

    type Step = {
        i: number; j: number;
        dp: number[][];
        msg: string;
        matchType: "match" | "mismatch" | "init";
    };

    function computeAllSteps(): Step[] {
        const steps: Step[] = [];
        const dp: number[][] = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));

        steps.push({
            i: 0, j: 0,
            dp: dp.map(r => [...r]),
            msg: "Inisialisasi: baris 0 dan kolom 0 diisi 0 (LCS dengan string kosong = 0).",
            matchType: "init"
        });

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (strA[i - 1] === strB[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                    steps.push({
                        i, j,
                        dp: dp.map(r => [...r]),
                        msg: `'${strA[i-1]}' = '${strB[j-1]}' (cocok!) → dp[${i}][${j}] = 1 + dp[${i-1}][${j-1}] = ${dp[i][j]}`,
                        matchType: "match"
                    });
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                    const from = dp[i-1][j] >= dp[i][j-1] ? `dp[${i-1}][${j}]` : `dp[${i}][${j-1}]`;
                    steps.push({
                        i, j,
                        dp: dp.map(r => [...r]),
                        msg: `'${strA[i-1]}' ≠ '${strB[j-1]}' → dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${dp[i][j]} (dari ${from})`,
                        matchType: "mismatch"
                    });
                }
            }
        }

        return steps;
    }

    const allSteps = computeAllSteps();

    let step = $state(0);
    let currentDp = $state<number[][]>(Array.from({length: n + 1}, () => new Array(m + 1).fill(0)));
    let currentI = $state(-1);
    let currentJ = $state(-1);
    let message = $state("Klik 'Next' untuk mulai mengisi tabel LCS.");
    let matchType = $state<"match"|"mismatch"|"init">("init");
    let isFinished = $state(false);

    function nextStep() {
        if (step >= allSteps.length) {
            isFinished = true;
            return;
        }
        const s = allSteps[step];
        currentDp = s.dp;
        currentI = s.i;
        currentJ = s.j;
        message = s.msg;
        matchType = s.matchType;
        step++;
        if (step >= allSteps.length) {
            isFinished = true;
            message += ` → Selesai! LCS = ${currentDp[n][m]}.`;
        }
    }

    function reset() {
        step = 0;
        currentDp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
        currentI = -1;
        currentJ = -1;
        message = "Klik 'Next' untuk mulai mengisi tabel LCS.";
        matchType = "init";
        isFinished = false;
    }

    function autoPlay() {
        if (isFinished) return;
        const interval = setInterval(() => {
            if (step >= allSteps.length) {
                clearInterval(interval);
                isFinished = true;
                message += ` → Selesai! LCS = ${currentDp[n][m]}.`;
                return;
            }
            nextStep();
        }, 600);
    }
</script>

<div class="demo-container">
    <div class="demo-header">
        <h4>Animasi DP: Longest Common Subsequence</h4>
        <span class="badge">A="{strA}", B="{strB}"</span>
    </div>

    <div class="info-panel" class:match-panel={matchType === "match"} class:miss-panel={matchType === "mismatch"}>
        <p>{message}</p>
    </div>

    <div class="table-area">
        <table class="dp-table">
            <thead>
                <tr>
                    <th></th>
                    <th>∅</th>
                    {#each strB.split("") as ch}
                        <th>{ch}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each currentDp as row, i}
                    <tr>
                        <th>{i === 0 ? "∅" : strA[i - 1]}</th>
                        {#each row as val, j}
                            <td
                                class:current={i === currentI && j === currentJ}
                                class:match-cell={i === currentI && j === currentJ && matchType === "match"}
                                class:miss-cell={i === currentI && j === currentJ && matchType === "mismatch"}
                                class:source-diag={matchType === "match" && i === currentI - 1 && j === currentJ - 1 && step > 0}
                                class:source-up={matchType === "mismatch" && i === currentI - 1 && j === currentJ && step > 0}
                                class:source-left={matchType === "mismatch" && i === currentI && j === currentJ - 1 && step > 0}
                            >{val}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="legend">
        <span class="legend-item"><span class="dot match-dot"></span> Cocok (diagonal)</span>
        <span class="legend-item"><span class="dot miss-dot"></span> Tidak cocok (max atas/kiri)</span>
        <span class="legend-item"><span class="dot source-dot"></span> Sumber nilai</span>
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
    }
    .demo-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;
    }
    .demo-header h4 { margin: 0; color: var(--color-ink); }
    .badge {
        background: var(--color-status-info-soft); color: var(--color-status-info-border);
        padding: 0.2rem 0.7rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600;
    }
    .info-panel {
        border: 1px dashed var(--color-line); border-radius: 6px;
        padding: 0.8rem 1rem; margin-bottom: 1rem; min-height: 48px;
        display: flex; align-items: center; background: var(--color-surface);
        transition: border-color 0.3s, background 0.3s;
    }
    .match-panel { border-color: var(--color-status-success-border); background: var(--color-status-success-soft); }
    .miss-panel { border-color: var(--color-status-warning-border, #e2a73b); }
    .info-panel p { margin: 0; font-weight: 600; font-size: 0.9rem; color: var(--color-ink); }

    .table-area { overflow-x: auto; margin-bottom: 1rem; }
    .dp-table { border-collapse: collapse; min-width: 300px; }
    .dp-table th, .dp-table td {
        border: 1px solid var(--color-line); text-align: center; padding: 0.45rem 0.55rem;
        font-size: 0.9rem; min-width: 36px; transition: all 0.3s;
    }
    .dp-table th { background: var(--color-surface-soft); font-weight: 700; }
    .dp-table td { background: var(--color-surface); }

    .current { font-weight: bold; }
    .match-cell { background: var(--color-status-success-soft) !important; outline: 2px solid var(--color-status-success-border); }
    .miss-cell { background: #fff3cd !important; outline: 2px solid #e2a73b; }
    .source-diag { background: #d4edda !important; }
    .source-up, .source-left { background: #fef3cd !important; }

    .legend { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; font-size: 0.85rem; color: var(--color-ink-muted); }
    .legend-item { display: flex; align-items: center; gap: 0.3rem; }
    .dot { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
    .match-dot { background: var(--color-status-success-soft); border: 1px solid var(--color-status-success-border); }
    .miss-dot { background: #fff3cd; border: 1px solid #e2a73b; }
    .source-dot { background: #d4edda; border: 1px solid #28a745; }

    .controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    button {
        padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;
        font-weight: bold; color: white; transition: transform 0.1s, opacity 0.2s;
    }
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-play { background: var(--color-link); }
    .btn-auto { background: var(--color-status-success-text, #38a169); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
