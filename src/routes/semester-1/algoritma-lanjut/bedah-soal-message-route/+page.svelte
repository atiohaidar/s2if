<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import MathBlock from '$lib/components/MathBlock.svelte';
</script>

<svelte:head>
  <title>Bedah Soal: Jaringan Komputer - S2IF Notebook</title>
  <meta
    name="description"
    content="Bedah soal pencarian jalur terpendek dalam jaringan komputer menggunakan algoritma BFS. Implementasi Python dan Pseudocode."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Bedah Soal: Jaringan Komputer (Message Route)"
    date="07 Mei 2026"
    status="done"
    tags={['Bedah Soal', 'Graph', 'BFS', 'Python']}
  />

  <NoteSection title="Soal (Utuh, Tanpa Reduksi)">
    <div class="problem-sheet">
      <p>
        Jaringan komputer terdiri dari <code>n</code> komputer dan terhubung multikoneksi melalui
        <code>m</code> koneksi. Tugas anda adalah mencari tahu apakah A dapat mengirimkan pesan ke B,
        dan jika ya, melalui berapa banyak komputer pesan tersebut akhir sampai ketujuan. Komputer A dan
        B bagian dari rangkaian komputer yang digunakan, selain itu komputer A diberi identifikasi 1 dan
        komputer B adalah komputer ke-n.
      </p>

      <div class="problem-block">
        <h4>Input</h4>
        <p>
          Baris pertama berisi dua buah bilangan bulat, <code>n</code> dan <code>m</code>; jumlah
          komputer dan koneksi antar komputer. Komputer dinomori 1, 2, ..., n.
          <code>2 &le; n &le; 100 000</code>, <code>1 &le; m &le; 200 000</code>.
        </p>
        <p>
          Berikutnya <code>m</code> baris deskripsi dari <code>m</code> koneksi, tiap baris berisi dua
          buah bilangan bulat nomor pasangan komputer yang dihubungkan oleh koneksi tersebut.
        </p>
        <p>
          Koneksi selalu menghubungkan dua komputer yang berbeda, dan sepasang komputer hanya
          terhubung oleh maksimum satu koneksi.
        </p>
      </div>

      <div class="problem-block">
        <h4>Output</h4>
        <p>
          Jika sebuah pesan dapat dikirimkan, cetaklah <code>k</code> yaitu berapa banyak komputer yang
          digunakan untuk menyampaikan pesan tersebut. Kemudian pada baris berikutnya cetaklah sebuah
          rute, urutan komputer yang menyampaikan pesan dari A ke B.
        </p>
        <p>Jika pesan tidak dapat tersampaikan, cetak saja "TIDAK BISA".</p>
      </div>

      <div class="problem-block">
        <h4>For example:</h4>
        <div class="example-table-wrap">
          <table class="example-table">
            <thead>
              <tr>
                <th>Input</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>5 5
1 2
1 3
1 4
2 3
5 4</pre>
                </td>
                <td
                  ><pre>3
1 4 5</pre></td
                >
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="Memahami Maksud Soal">
    <p>
      Soal ini meminta kita untuk mencari rute komunikasi antara dua komputer dalam jaringan. Karena
      setiap koneksi dianggap memiliki beban yang sama (tidak disebutkan adanya bobot), maka rute
      dengan "jumlah komputer paling sedikit" sama dengan <strong
        >jalur terpendek (shortest path)</strong
      > pada graf tidak berbobot.
    </p>
    <Callout type="info" title="Titik Penting">
      <ul>
        <li><strong>Start:</strong> Komputer 1 (A).</li>
        <li><strong>Target:</strong> Komputer <MathBlock latex="n" displayMode={false} /> (B).</li>
        <li><strong>Output:</strong> Jumlah node dalam jalur dan urutan node-nya.</li>
      </ul>
    </Callout>
  </NoteSection>

  <NoteSection title="Analisis & Pseudocode">
    <p>
      Algoritma yang paling tepat adalah <strong>BFS (Breadth-First Search)</strong> karena BFS menjamin
      penemuan jalur terpendek pada graf tanpa bobot.
    </p>

    <CodeBlock
      language="text"
      filename="pseudocode.txt"
      code={`procedure SolveMessageRoute(n, m, edges):
    // 1. Representasi Graf (Adjacency List)
    adj = array of lists size n+1
    for each (u, v) in edges:
        adj[u].add(v)
        adj[v].add(u)

    // 2. Inisialisasi BFS
    queue = new Queue()
    visited = array size n+1, filled with False
    parent = array size n+1, filled with 0
    
    queue.enqueue(1)
    visited[1] = True

    // 3. Proses BFS
    while queue is not empty:
        u = queue.dequeue()
        
        for each v in adj[u]:
            if visited[v] is False:
                visited[v] = True
                parent[v] = u
                queue.enqueue(v)
                if v == n: break // Optimal stop

    // 4. Output & Rekonstruksi
    if visited[n] is False:
        print "TIDAK BISA"
    else:
        path = []
        curr = n
        while curr != 0:
            path.add(curr)
            curr = parent[curr]
        
        reverse(path)
        print length(path)
        print path`}
    />
  </NoteSection>

  <NoteSection title="Implementasi (Python)">
    <p>
      Python sangat ringkas untuk implementasi graf. Kita menggunakan <code>collections.deque</code> untuk
      struktur data Queue yang efisien.
    </p>
    <CodeBlock
      language="python"
      filename="message_route.py"
      code={`import sys
from collections import deque

def solve():
    # Menggunakan sys.stdin.read().split() untuk pembacaan input yang cepat
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    m = int(input_data[1])
    
    # 1. Bangun Adjacency List
    adj = [[] for _ in range(n + 1)]
    idx = 2
    for _ in range(m):
        u = int(input_data[idx])
        v = int(input_data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
        
    # 2. Inisialisasi BFS
    q = deque([1])
    visited = [False] * (n + 1)
    parent = [0] * (n + 1)
    
    visited[1] = True
    
    # 3. Jalankan BFS
    while q:
        u = q.popleft()
        
        if u == n:
            break
            
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                parent[v] = u
                q.append(v)
                
    # 4. Cek Hasil & Rekonstruksi Jalur
    if not visited[n]:
        print("TIDAK BISA")
    else:
        path = []
        curr = n
        while curr != 0:
            path.append(curr)
            curr = parent[curr]
            
        path.reverse()
        
        print(len(path))
        print(*(path))

if __name__ == "__main__":
    solve()`}
    />
    <Callout type="warning" title="Input Besar di Python">
      Untuk <MathBlock latex="N=10^5" displayMode={false} /> dan <MathBlock latex="M=2 \times 10^5" displayMode={false} />, penggunaan <code>input()</code> biasa akan sangat
      lambat. Gunakan <code>sys.stdin.read().split()</code> untuk performa maksimal.
    </Callout>
  </NoteSection>

  <NoteSection title="Kompleksitas">
    <div class="grid grid-cols-2 gap-6">
      <div class="info-card border-t-4 border-t-blue-500">
        <h4>Waktu (Time)</h4>
        <MathBlock latex="O(V + E) = O(n + m)" />
        <p class="text-sm mt-2">
          Setiap node masuk antrian sekali dan setiap edge diperiksa maksimal dua kali.
        </p>
      </div>
      <div class="info-card border-t-4 border-t-green-500">
        <h4>Ruang (Space)</h4>
        <MathBlock latex="O(V + E)" />
        <p class="text-sm mt-2">
          Digunakan untuk menyimpan adjacency list dan array bantu (visited, parent).
        </p>
      </div>
    </div>
  </NoteSection>

  <BackLink href="/semester-1/algoritma-lanjut/graph-theory" label="Kembali ke Teori Graf" />
</article>

<style>
  .problem-sheet {
    border: 1px solid var(--color-line);
    border-radius: 10px;
    background: var(--color-surface-elevated);
    padding: 1rem;
  }

  .problem-sheet p {
    margin: 0 0 0.9rem;
    line-height: 1.7;
  }

  .problem-block {
    margin-top: 1rem;
    padding-top: 0.9rem;
    border-top: 1px dashed var(--color-line);
  }

  .problem-block h4 {
    margin: 0 0 0.55rem;
    color: var(--color-binder);
    font-size: 1rem;
  }

  .example-table-wrap {
    overflow-x: auto;
  }

  .example-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 520px;
  }

  .example-table th,
  .example-table td {
    border: 1px solid var(--color-line);
    vertical-align: top;
    padding: 0.65rem;
    text-align: left;
  }

  .example-table th {
    background: var(--color-surface-soft);
    font-weight: 700;
  }

  .example-table pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .info-card {
    padding: 1rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #eee);
    border-radius: 8px;
  }

  .border-t-4 {
    border-top-width: 4px;
    border-top-style: solid;
  }
  .border-t-blue-500 {
    border-top-color: #007aff;
  }
  .border-t-green-500 {
    border-top-color: #4cd964;
  }

  .grid {
    display: grid;
  }
  .gap-6 {
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .text-sm {
    font-size: 0.875rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }

  .info-card h4 {
    margin: 0 0 0.5rem;
    color: var(--color-binder);
    font-size: 1.1rem;
  }

  .info-card p {
    margin: 0;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    .problem-sheet {
      padding: 0.85rem;
    }
  }
</style>
