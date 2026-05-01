<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import CorrelationVisualizer from "./components/CorrelationVisualizer.svelte";

    const pearsonFormula = String.raw`r = \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n} (x_i - \bar{x})^2 \sum_{i=1}^{n} (y_i - \bar{y})^2}}`;
    const simplePearson = String.raw`r \in [-1, 1]`;
</script>

<svelte:head>
    <title>Analisis Korelasi - S2IF Notebook</title>
    <meta 
        name="description" 
        content="Memahami hubungan antar variabel menggunakan Koefisien Korelasi Pearson, interpretasi nilai r, dan visualisasi scatter plot." 
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Analisis Korelasi"
        date="26 April 2026"
        status="done"
        tags={['Statistika', 'Pemodelan', 'Analisis Data']}
    />

    <NoteSection title="Apa Itu Analisis Korelasi?">
        <p>
            Sebelum membangun model prediksi seperti Regresi Linear, kita perlu memahami 
            bagaimana variabel-variabel dalam data saling berhubungan. Analisis korelasi 
            adalah teknik statistik yang digunakan untuk mengukur kekuatan dan arah 
            hubungan linear antara dua variabel.
        </p>
        <Callout type="info" title="Kenapa ini penting?">
            Jika dua variabel tidak memiliki korelasi, maka menggunakan satu variabel 
            untuk memprediksi variabel lainnya (lewat model linear) kemungkinan besar 
            tidak akan memberikan hasil yang akurat.
        </Callout>
    </NoteSection>

    <NoteSection title="Koefisien Korelasi Pearson (r)">
        <p>
            Metode yang paling umum digunakan adalah <strong>Pearson Product-Moment Correlation</strong>. 
            Nilai koefisien korelasi (dilambangkan dengan <code>r</code>) menunjukkan seberapa 
            dekat titik-titik data dengan garis lurus ideal.
        </p>
        <MathBlock latex={pearsonFormula} />
        <p>Rentang nilai korelasi adalah:</p>
        <MathBlock latex={simplePearson} />
        
        <ul>
            <li><strong>r = 1:</strong> Korelasi positif sempurna (garis lurus naik).</li>
            <li><strong>r = -1:</strong> Korelasi negatif sempurna (garis lurus turun).</li>
            <li><strong>r = 0:</strong> Tidak ada hubungan linear sama sekali.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Visualisasi Interaktif">
        <p>
            Gunakan visualizer di bawah ini untuk memahami bagaimana distribusi data 
            mempengaruhi nilai <code>r</code>. Anda bisa menggeser titik-titik atau 
            menggunakan preset yang tersedia.
        </p>
        
        <CorrelationVisualizer />

        <Callout type="tip" title="Cara Membaca Arah">
            <ul>
                <li><strong>Positif:</strong> Jika X naik, Y cenderung naik.</li>
                <li><strong>Negatif:</strong> Jika X naik, Y cenderung turun.</li>
            </ul>
        </Callout>
    </NoteSection>

    <NoteSection title="Interpretasi Kekuatan Hubungan">
        <p>
            Secara praktis, kita sering menggunakan panduan berikut untuk menginterpretasikan 
            nilai absolut dari <code>r</code>:
        </p>
        <table>
            <thead>
                <tr>
                    <th>Nilai |r|</th>
                    <th>Interpretasi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0.00 - 0.19</td>
                    <td>Sangat Lemah</td>
                </tr>
                <tr>
                    <td>0.20 - 0.39</td>
                    <td>Lemah</td>
                </tr>
                <tr>
                    <td>0.40 - 0.59</td>
                    <td>Moderat</td>
                </tr>
                <tr>
                    <td>0.60 - 0.79</td>
                    <td>Kuat</td>
                </tr>
                <tr>
                    <td>0.80 - 1.00</td>
                    <td>Sangat Kuat</td>
                </tr>
            </tbody>
        </table>
    </NoteSection>

    <NoteSection title="Korelasi vs Kausalitas">
        <Callout type="warning" title="Peringatan Penting">
            <em>Correlation does not imply causation.</em> Korelasi yang tinggi antara dua 
            variabel tidak berarti variabel yang satu <strong>menyebabkan</strong> variabel lainnya terjadi. 
            Bisa jadi ada variabel ketiga (confounding variable) yang mempengaruhi keduanya.
        </Callout>
        <p>
            Contoh klasik: Penjualan es krim dan jumlah orang tenggelam mungkin berkorelasi kuat 
            (keduanya naik saat musim panas), tapi bukan berarti makan es krim menyebabkan orang tenggelam.
        </p>
    </NoteSection>

    <NoteSection title="Implementasi dengan Python">
        <p>
            Dalam analisis data modern, kita biasanya menggunakan <code>pandas</code> atau 
            <code>numpy</code> untuk menghitung korelasi dengan cepat.
        </p>
        <CodeBlock 
            language="python"
            filename="correlation.py"
            code={`import pandas as pd

# Sample data
data = {
    'jam_belajar': [1, 2, 3, 4, 5],
    'nilai_ujian': [2.0, 4.1, 6.3, 7.9, 10.2]
}
df = pd.DataFrame(data)

# Menghitung matriks korelasi
correlation_matrix = df.corr(method='pearson')

print(correlation_matrix)
# Output akan menunjukkan korelasi antara jam_belajar dan nilai_ujian (~0.99)`}
        />
    </NoteSection>

    <BackLink href="/semester-1/pemodelan-dan-optimasi-lanjut" label="Kembali ke Pemodelan dan Optimasi Lanjut" />
</article>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
    }
    th, td {
        padding: 0.75rem;
        border: 1px solid var(--color-border, #e2e8f0);
        text-align: left;
    }
    th {
        background: color-mix(in oklab, var(--color-surface, #f8efdf) 90%, black);
        font-weight: 700;
    }
</style>
