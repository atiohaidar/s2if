<script lang="ts">
  import NoteSection from '$lib/components/NoteSection.svelte';
  import NoteHeader from '$lib/components/NoteHeader.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Callout from '$lib/components/Callout.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';
  import Sticker from '$lib/components/Sticker.svelte';

  // Questions for Logic Test (Questions 1 - 15)
  const logicQuestions = [
    {
      question: 'Observe the following numerical series that models a growth pattern: 2, 4, 8, 14, ..., 32. Based on this progression, which numerical entity is the most appropriate to fill the gap in the pattern?',
      options: ['18', '20', '22', '24', '26'],
      correctIndex: 2,
      explanation: 'Barisan aritmetika tingkat kedua. Selisih progresif antar angka mematuhi penambahan bernilai genap murni berturut-turut: 4 - 2 = +2; 8 - 4 = +4; 14 - 8 = +6. Pola berikutnya adalah +8, sehingga 14 + 8 = 22. Validasi ke fase akhir: 22 + 10 = 32.'
    },
    {
      question: 'Given an alphabetical series with asymmetrical intervals: A, C, F, J, O, ... If this series continues without backward repetition, what letter will occupy the next position?',
      options: ['S', 'T', 'U', 'V', 'W'],
      correctIndex: 2,
      explanation: 'Pergeseran matriks alfabetik yang tidak konstan. Jarak antar huruf bertambah secara linear: A ke C (+2), C ke F (+3), F ke J (+4), J ke O (+5). Lompatan berikutnya harus sebesar +6. Bergeser 6 langkah setelah O (P, Q, R, S, T, U) merujuk pada huruf U.'
    },
    {
      question: 'In a primitive encryption algorithm, the word "KUCING" is translated into the character matrix "LXEKRJ". By applying the same relational hash function, the encrypted form of the word "BURUNG" is:',
      options: ['CWSYRJ', 'CXTWRJ', 'CVWXQK', 'CVXWRKE', 'CWTXQJ'],
      correctIndex: 1,
      explanation: 'Pola enkripsi menggunakan pergeseran huruf (stride) dinamis untuk setiap posisi karakter: K->L (+1), U->X (+3), C->E (+2), I->K (+2), N->R (+4), G->J (+3). Pola pergeseran [+1, +3, +2, +2, +4, +3] jika diterapkan ke BURUNG menghasilkan: B(+1)->C, U(+3)->X, R(+2)->T, U(+2)->W, N(+4)->R, G(+3)->J. Jadi, CXTWRJ.'
    },
    {
      question: 'An autonomous locomotive moves at a constant speed of 60 km/h on a straight track. What is the exact travel time required to cover a displacement distance of 180 km?',
      options: ['2 hours', '2.5 hours', '3 hours', '3.5 hours', '4 hours'],
      correctIndex: 2,
      explanation: 'Menggunakan rumus fisika dasar kecepatan linear: Waktu (t) = Jarak (s) / Kecepatan (v). Maka t = 180 km / 60 km/jam = 3 jam.'
    },
    {
      question: 'A corporate entity allocates a software project to a team of 16 experts, with an estimated completion time of 9 operational days. If on the first day, 4 experts suddenly resign from the project due to health issues, what is the percentage of additional time (in day ratio) required for the remaining team to complete the entire original workload?',
      options: ['20%', '25%', '33.3%', '50%', '75%'],
      correctIndex: 2,
      explanation: 'Perbandingan berbalik nilai. Total beban kerja proyek adalah 16 orang * 9 hari = 144 orang-hari. Karena 4 orang resign, sisa tim tinggal 12 orang. Waktu penyelesaian menjadi 144 / 12 = 12 hari. Terdapat penambahan waktu sebanyak 3 hari (12 - 9). Persentase tambahan waktu: (3 / 9) * 100% = 33.3%.'
    },
    {
      question: 'An e-commerce platform implements a dynamic discount system. The algorithm dictates that if the gross total spending exceeds the threshold of Rp 200,000, the user is entitled to a uniform discount of 20% off the gross total. If a user acquires 3 units of Product A (Rp 50,000 per unit) and 2 units of Product B (Rp 30,000 per unit), what is the final transaction value that must be settled at the payment gateway?',
      options: ['Rp 210,000', 'Rp 168,000', 'Rp 160,000', 'Rp 180,000', 'Rp 200,000'],
      correctIndex: 1,
      explanation: 'Total pengeluaran bruto: (3 * Rp 50.000) + (2 * Rp 30.000) = Rp 150.000 + Rp 60.000 = Rp 210.000. Karena Rp 210.000 melebihi ambang batas Rp 200.000, pengguna berhak mendapat diskon 20%. Nilai diskon: Rp 210.000 * 20% = Rp 42.000. Jumlah akhir yang dibayar: Rp 210.000 - Rp 42.000 = Rp 168.000.'
    },
    {
      question: 'Consider the following two syllogistic logic premises:\nPremise 1: It is confirmed that all programmers are a subset of humans.\nPremise 2: Some of the human population is known to have a preference for consuming coffee.\n\nWhat is the most valid deduction that can be drawn from the combination of these two premises?',
      options: [
        'All programmers definitely have a preference for consuming coffee.',
        'Some programmers absolutely like consuming coffee.',
        'There is not a single programmer who does not like drinking coffee.',
        'Every entity that likes drinking coffee can be classified as a programmer.',
        'The available premises do not have enough justification to conclude that all programmers like coffee.'
      ],
      correctIndex: 4,
      explanation: 'Non-Sequitur Logical Fallacy. Meskipun semua programmer adalah manusia, dan sebagian manusia suka kopi, tidak ada premis penghubung yang menjamin bahwa kelompok programmer beririsan dengan kelompok penyuka kopi. Oleh karena itu, kita tidak dapat menarik kesimpulan pasti mengenai programmer dan kegemaran minum kopi dari informasi yang ada.'
    },
    {
      question: "Major Premise: All applications registered and available for download on the App Store are guaranteed to have passed Apple's strict review procedures.\nMinor Premise: The TaskMaster application is verified to have not yet gone through Apple's review process stages.\n\nBased on the inference principle of Modus Tollens, the resulting conclusion is:",
      options: [
        'The TaskMaster application was developed for non-iOS platforms.',
        'The TaskMaster application is pending in the review queue.',
        'The TaskMaster application cannot be found on the App Store.',
        'Some entities on the App Store operate without a review.',
        'The TaskMaster application will be eliminated by Apple.'
      ],
      correctIndex: 2,
      explanation: 'Mengikuti logika Modus Tollens (P -> Q, ~Q -> ~P). Jika aplikasi terdaftar di App Store (P), maka aplikasi tersebut pasti sudah melewati review (Q). TaskMaster belum melewati review (~Q), sehingga TaskMaster dipastikan tidak terdaftar di App Store (~P).'
    },
    {
      question: 'Given a comparative relational model where A > B, B > C, and D < C. Using the mathematical law of transitivity, which of the following operational statements is guaranteed to have an absolute FALSE truth value?',
      options: ['A > C', 'B > D', 'D > A', 'C < A', 'A > D'],
      correctIndex: 2,
      explanation: 'Dari premis A > B, B > C, dan D < C (yang berarti C > D), kita dapat membuat rantai relasi transitif terurut: A > B > C > D. Berdasarkan rantai ini, A adalah nilai terbesar dan D adalah nilai terkecil. Oleh karena itu, pernyataan D > A dipastikan bernilai SALAH mutlak.'
    },
    {
      question: "Four colleagues—Feri, Gita, Hani, and Irfan—are testing a board game. Their seating configuration is governed by the following limitations:\n- Feri must sit directly next to Gita.\n- Hani is strictly forbidden from sitting directly next to Feri.\n\nIf the seating arrangement forms a closed circle containing 4 chairs, where is Irfan's seating position relative to Gita?",
      options: [
        'Exactly to the right of Gita.',
        'Exactly to the left of Gita.',
        'In the position directly opposite (facing) Gita.',
        'To the right of Hani.',
        'Exactly to the left of Hani.'
      ],
      correctIndex: 2,
      explanation: 'Pada susunan melingkar 4 kursi: Letakkan Feri berdampingan dengan Gita. Karena Hani dilarang bersebelahan dengan Feri, Hani harus ditempatkan di kursi kosong lain yang tidak menempel dengan Feri, yaitu di sisi samping Gita yang satunya. Kursi terakhir secara otomatis ditempati oleh Irfan (di antara Feri dan Hani). Dalam formasi lingkaran (Feri - Gita - Hani - Irfan), Irfan akan duduk berhadapan langsung (opposite) dengan Gita.'
    },
    {
      question: 'Six individuals (P, Q, R, S, T, U) hold a Focus Group Discussion at a circular table with 6 symmetrical chairs. The constraint parameters are as follows:\n- P is positioned directly opposite and parallel to T.\n- R sits occupying the space exactly between P and U.\n- S is configured to sit exactly on the left side of T (from T\'s perspective facing the table).\n\nWho is the entity occupying the position directly facing U?',
      options: ['P', 'Q', 'R', 'S', 'T'],
      correctIndex: 1,
      explanation: 'Langkah pemetaan lingkaran 6 kursi:\n1. Letakkan P di posisi 12:00 (posisi 0) dan T berseberangan di 6:00 (posisi 3).\n2. Perspektif T menghadap ke tengah meja: Kiri T adalah arah 8:00 (posisi 4). Jadi, S berada di posisi 4.\n3. R duduk tepat di antara P (0) dan U. Karena posisi 4 sudah diisi S, maka R harus diletakkan di posisi 2:00 (posisi 1) dan U di posisi 4:00 (posisi 2).\n4. Sisa satu kursi kosong di posisi 10:00 (posisi 5) yang secara otomatis diisi oleh Q.\n5. Kursi yang berseberangan dengan U (posisi 2) adalah posisi 5, yang ditempati oleh Q.'
    },
    {
      question: "There is a computational performance comparison among five Academy learners (Jaka, Kiki, Lina, Mita, and Nino) in a simulation. The speed performance parameters are as follows:\n- Jaka's measured completion score is higher than Lina's, and exactly twice as fast as Nino's metric.\n- The combined calculative value of Jaka and Nino is in equilibrium with Kiki's score.\n- Lina's speed is absolutely higher than Mita's time, but Lina's value is only one-third of Kiki's speed.\n\nWho is the individual that mathematically has the slowest/lowest performance score?",
      options: ['Jaka', 'Kiki', 'Lina', 'Mita', 'Nino'],
      correctIndex: 3,
      explanation: 'Pemodelan skor numerik:\n- Misalkan skor Kiki = 300.\n- Skor Jaka + Nino = Kiki = 300. Diketahui Jaka = 2 * Nino, maka 2N + N = 300 -> Nino = 100, Jaka = 200.\n- Skor Lina = 1/3 Kiki = 100. (Sehingga Lina = Nino = 100).\n- Diketahui Lina > Mita. Karena Lina = 100, maka Mita memiliki skor di bawah 100.\n- Urutan performa: Kiki (300) > Jaka (200) > Lina (100) = Nino (100) > Mita (< 100). Maka Mita adalah yang terlambat/paling lambat.'
    },
    {
      question: 'Eight Apple Developer Academy mentors (Faiz, Lili, Desi, Tiara, Nabilah, Murti, Aulia, Riza) are conducting a circular evaluation session. Here is their spatial topology:\n- Tiara is placed diametrically opposite Faiz.\n- Nabilah is allocated to the exact left side of Tiara.\n- Lili is absolutely wedged in the middle between Murti and Desi.\n- Riza acts as a separator between Faiz and Aulia.\n- Aulia occupies the exact opposite position to Lili.\n- Desi occupies the nearest left side of Faiz\'s position.\n\nIf, in the middle of the discussion, an interruption requires Tiara and Lili to swap chairs directly, who is the personnel now located exactly to the right of Aulia (viewed from Aulia\'s orientation facing the center of the circle)?',
      options: ['Riza', 'Tiara', 'Nabilah', 'Murti', 'Desi'],
      correctIndex: 2,
      explanation: 'Pemetaan melingkar 8 kursi (searah jarum jam sebagai arah kiri dari perspektif menghadap pusat):\n1. Faiz = pos 1. Tiara = pos 5 (seberang).\n2. Desi di kiri Faiz -> Desi = pos 2.\n3. Lili diapit Desi dan Murti -> Lili = pos 3, Murti = pos 4.\n4. Aulia berseberangan dengan Lili (3) -> Aulia = pos 7.\n5. Riza pemisah Faiz (1) dan Aulia (7) -> Riza = pos 8.\n6. Nabilah di kiri Tiara (5) -> Nabilah = pos 6.\n- Tiara (pos 5) dan Lili (pos 3) bertukar kursi. Sekarang Tiara di pos 3, Lili di pos 5.\n- Di sebelah kanan Aulia (pos 7, menghadap pusat meja) berorientasi berlawanan jarum jam, yaitu posisi 6, yang diduduki oleh Nabilah.'
    },
    {
      question: 'Five Academy learners (A, B, C, D, E) are standing in a single file queue. The configuration is governed by the following constraints:\n- E stands at the absolute front of the queue.\n- B is standing exactly in the middle of the queue.\n- A is standing directly ahead of C.\n- D is not the last person in the queue.\n\nWhich of the following represents the correct sequence of the queue from front to back?',
      options: [
        'E, D, B, A, C',
        'E, B, D, A, C',
        'D, E, B, A, C',
        'A, C, B, E, D',
        'E, D, B, C, A'
      ],
      correctIndex: 0,
      explanation: 'Gunakan metode eliminasi cepat:\n- E harus di depan (posisi 1) -> mengeliminasi opsi C dan D.\n- B harus persis di tengah (posisi 3) -> mengeliminasi opsi B.\n- A tepat di depan C (format A, C berdampingan) -> opsi A memenuhi, sedangkan opsi E salah karena menempatkan C di depan A. Maka opsi A (E, D, B, A, C) adalah satu-satunya jawaban benar.'
    },
    {
      question: 'Observe the following numerical progression: 1, 4, 9, 16, ..., 36. Which numerical entity is the most appropriate to fill the gap in the pattern?',
      options: ['21', '23', '25', '27', '29'],
      correctIndex: 2,
      explanation: 'Deret bilangan kuadrat berurutan: 1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36. Selisih antar angka berturut-turut membentuk barisan ganjil konstan (+3, +5, +7, +9, +11). Maka 16 + 9 = 25.'
    }
  ];

  // Questions for Programming Test (Questions 16 - 28)
  const programmingQuestions = [
    {
      question: 'In the System Development Life Cycle (SDLC) methodology, the sequential abstraction of processing an unresolved state towards a final product must hierarchically go through the following phases:',
      options: [
        'Problem – Flowchart – Pseudocode – Execution – Program – Result.',
        'Problem – Analysis – Algorithm – Program – Execution – Result.',
        'Algorithm – Problem – Model – Program – Execution – Result.',
        'Pseudocode – Problem – Flowchart – Execution – Result.',
        'Program – Execution – Debugging – Problem – Algorithm – Result.'
      ],
      correctIndex: 1,
      explanation: 'Di dalam rekayasa perangkat lunak, alur pengembangan program ideal dimulai dari mengidentifikasi masalah (Problem), melakukan analisis kebutuhan (Analysis), mendesain alur logika pemecahan (Algorithm), mengimplementasikan dalam sintaks kode (Program), menjalankan instruksi pada komputer (Execution), hingga mendapatkan hasil keluaran (Result).'
    },
    {
      question: 'As a form of performance optimization and compile-time safety, the Swift programming language enforces a strict lexical distinction between mutated variables and static values. The syntax that must be executed by a developer to declare a constant (a piece of data that absolutely cannot be reassigned post-initialization) is:',
      options: ['var', 'const', 'let', 'final', 'static'],
      correctIndex: 2,
      explanation: 'Swift menggunakan kata kunci "let" untuk mendeklarasikan nilai konstan (immutable) dan "var" untuk variabel (mutable). Pendekatan ini mengoptimalkan alokasi memori dan menjamin keamanan kompilasi sejak awal.'
    },
    {
      question: 'Given the following simple sequential algorithm: Memory variables are allocated as a = 2 and b = 3. A linear function runs executing a new synchronous assignment where c = a * b, which is immediately followed by assigning d = c * c. What is the final residual value in registries c and d post-execution?',
      options: ['c = 5, d = 25', 'c = 6, d = 12', 'c = 9, d = 12', 'c = 6, d = 36', 'c > 3, d > 2'],
      correctIndex: 3,
      explanation: 'Penelusuran alur synchronous assignment:\n- c = a * b = 2 * 3 = 6.\n- d = c * c = 6 * 6 = 36.\nMaka nilai akhir c = 6 dan d = 36.'
    },
    {
      question: 'Data collections in Swift are armed with high-level declarative functionality (Higher-Order Functions). Perform code tracing on the code block below:\n\nlet numbers = [1, 2, 3]\nlet result = numbers.map { $0 * 2 }\nprint(result)\n\nThe exact prediction of the console output from the routine above is:',
      options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', '[3, 6, 9]', 'Program fails to compile (Compile error).'],
      correctIndex: 1,
      explanation: 'Metode .map adalah Higher-Order Function yang menerapkan closure transformasi ke setiap elemen dalam array. Ekspresi { $0 * 2 } melipatgandakan setiap nilai elemen dalam [1, 2, 3] sehingga menghasilkan array baru [2, 4, 6].'
    },
    {
      question: 'The Swift language implements the Optional construct to explicitly represent the existence or absence of data. In interacting with Optional types, the Nil-Coalescing Operator (??) acts as a data insurance mechanism. Based on the following script segment:\n\nvar optionalName: String? = nil\nlet defaultName = "Guest"\nlet nameToDisplay = optionalName ?? defaultName\n\nWhat is the functional resolution of the mechanism above?',
      options: [
        'Interrupts the system with a Fatal Error due to a null pointer dereference.',
        'Initiates a semantic mutation process from String to Boolean.',
        'Inspects optionalName; if it encounters a nil state, the system performs a fallback resolution by distributing "Guest" to the nameToDisplay variable.',
        'Intervenes in memory by overwriting the defaultName value to nil.',
        'Skips the instruction without affecting the memory placement of nameToDisplay.'
      ],
      correctIndex: 2,
      explanation: 'Operator Nil-Coalescing (??) memeriksa nilai opsional di sebelah kiri. Jika nilainya nil, operator akan mengembalikan nilai default di sebelah kanan ("Guest") sebagai langkah pengamanan (fallback) agar variabel tujuan aman dari crash.'
    },
    {
      question: 'Safe unwrapping of Optional values can be managed by if let or guard let instruction controls. Architecturally, what is the fundamental differentiation in the distribution (scoping) of variable values post-unwrapping between these two methods?',
      options: [
        'The if let instruction forces the program to perform an early exit, while guard let maintains the persistence of the function\'s lifecycle.',
        'The reference value from guard let is transfused outside its origin block (available to the overall function scope post-resolution), whereas the variable from if let is exclusively imprisoned within the curly braces of that if construct.',
        'Calling guard let only functions in isolated restricted recursion operations.',
        'The memory paradigm of both is identical with no difference in scope visibility.',
        'if let is designed to handle reference classes, and guard let is specifically engineered for value structure entities.'
      ],
      correctIndex: 1,
      explanation: 'Perbedaan utama terletak pada cakupan (scope) visibilitas variabel hasil unwrapping: Variabel dari "if let" hanya dapat diakses secara lokal di dalam blok kurung kurawal if tersebut. Sebaliknya, variabel hasil "guard let" akan tersedia di seluruh cakupan fungsi di bawah blok guard tersebut.'
    },
    {
      question: 'The utilization of the half-open range operator is a typical looping syntax convention in Swift. In this terminal iteration (looping):\n\nlet names = ["Anna", "Alex", "Brian", "Jack"]\nfor name in names[..<2] {\n    print(name)\n}\n\nWhat terminal result is recorded on the interface output screen?',
      options: ['Anna, Alex, Brian, Jack', 'Alex, Brian', 'Anna, Alex, Brian', 'Anna, Alex', 'Brian, Jack'],
      correctIndex: 3,
      explanation: 'Operator range setengah terbuka (half-open range operator) ..<2 memerintahkan perulangan dari indeks awal hingga tepat sebelum indeks ke-2, yaitu mengambil indeks 0 ("Anna") dan indeks 1 ("Alex"). Indeks 2 tidak diikutkan.'
    },
    {
      question: 'The primary construction of object-oriented computing dictates that a series of states (variables) and capabilities (methods) must be aggregated into an independent container that limits the exposure of functional implementation details from the reach of external agents. The pillar of Object-Oriented Programming (OOP) that shelters this protection is called:',
      options: ['Polymorphism', 'Abstraction', 'Encapsulation', 'Inheritance', 'Parallel Construction'],
      correctIndex: 2,
      explanation: 'Enkapsulasi (Encapsulation) adalah pilar OOP yang menyembunyikan detail implementasi internal suatu objek dan membatasi akses langsung dari pihak luar menggunakan modifier tingkat akses (seperti private atau fileprivate).'
    },
    {
      question: 'The ontological uniqueness between Struct and Class in the Swift language requires developers to carefully choose data structure representations based on memory management. The structural distinction that most differentiates these two software architecture elements centers on:',
      options: [
        'Struct inherits memory management on the Heap, while Class is fully archived in the Registers.',
        'Struct accommodates multiple inheritance transmission, which is natively rejected by classes.',
        'The Class environment supports purely static compilation properties, contrary to the dynamic Struct.',
        'Struct is defined as a value type—where data manipulation causes the system to allocate persistent and independent data copies on the Stack—whereas Class is a reference type where object assignment shares a reference to single mutable memory in the Heap territory.',
        'Only Struct can bridge the creation of extension functions.'
      ],
      correctIndex: 3,
      explanation: 'Struct adalah Value Type yang dialokasikan pada memori Stack; operasi salin (assignment) akan menduplikasi seluruh datanya secara independen. Sementara Class adalah Reference Type yang disimpan di memori Heap; penyalinannya hanya menduplikasi alamat pointer ke objek yang sama di memori.'
    },
    {
      question: 'A code adaptation pattern that allows a derived subclass to execute modifications, override, or even change the intrinsic built-in implementation of its ancestor\'s method (superclass) demonstrates the adoption of the theoretical concept:',
      options: ['Sequential Inheritance', 'Cyclic Modularity', 'Dynamic Polymorphism', 'Delegate Assignment', 'Full Encapsulation'],
      correctIndex: 2,
      explanation: 'Kemampuan subclass untuk menimpa (override) implementasi metode milik superclass, sehingga program mengeksekusi fungsi yang tepat secara dinamis pada saat runtime, merupakan wujud dari konsep Polimorfisme Dinamis (Dynamic Polymorphism).'
    },
    {
      question: 'The iOS operational cycle is governed by an automatic memory management engine. This internal controller system module closely monitors the reference topology graph. Its core function is tasked with counting the number of external entities that have a strong dependency association with a class memory instance, and it will deallocate that instance if the counter value reaches an absolute zero. This specific instrument is called:',
      options: ['Garbage Collection Collector', 'Automatic Reference Counting (ARC)', 'Heuristic Memory Allocator', 'Cycle Delegation Control', 'Object Retention Protocol'],
      correctIndex: 1,
      explanation: 'Swift/iOS menggunakan Automatic Reference Counting (ARC) untuk mengelola memori objek kelas secara otomatis. ARC melacak jumlah referensi kuat (strong reference) ke suatu objek, dan akan membebaskan objek tersebut dari memori Heap ketika jumlah referensinya turun ke titik nol.'
    },
    {
      question: 'ARC management is vulnerable to deallocation anomalies if an unbroken cross-reference occurs. If Object Instance A has strong connectivity to Object B, but paradoxically, Object B records an asymmetric strong reference back to Object A, then their reference values lock each other permanently so that the system loses deallocation access. This memory leak dysfunction phenomenon is academically identified as:',
      options: ['Mutex Suspension', 'Static Delegation Failure', 'Retain Cycle', 'Chaining Unwrapping Failure', 'Overload Exception'],
      correctIndex: 2,
      explanation: 'Retain Cycle (siklus retensi kuat melingkar) terjadi saat dua objek saling memegang referensi kuat satu sama lain. Karena kedua counter tidak akan pernah bisa mencapai nol, ARC tidak bisa membebaskan memori mereka, sehingga menyebabkan kebocoran memori (memory leak).'
    },
    {
      question: 'Review the memory reference allocation scheme in the following functional block:\n\nclass SistemPenghitung {\n    var kuantitas = 0\n}\nlet perangkatA = SistemPenghitung()\nlet perangkatB = perangkatA\nperangkatB.kuantitas = 7\nprint(perangkatA.kuantitas)\n\nConsidering the axiom of Reference Semantics for classes in Swift, what is the output interruption that will be displayed later when the console resolution process is executed?',
      options: ['0', '7', 'The program causes an internal discrepancy due to overriding the let constant.', 'Premature termination occurs due to asynchronous access.', 'nil'],
      correctIndex: 1,
      explanation: 'Karena SistemPenghitung dideklarasikan sebagai Class (Reference Type), variabel perangkatA dan perangkatB berbagi penunjuk (pointer) memori yang sama. Modifikasi pada kuantitas perangkatB juga mengubah data pada perangkatA. Maka output konsol adalah 7.'
    }
  ];
</script>

<svelte:head>
  <title>Persiapan Ujian Masuk Apple Developer Academy - S2IF Notebook</title>
  <meta
    name="description"
    content="Panduan taktis dan instrumen ujian simulasi masuk Apple Developer Academy (Logic & Programming Test) lengkap dengan kuis interaktif dan pembahasan."
  />
</svelte:head>

<article class="note-article">
  <NoteHeader
    title="Persiapan Ujian Masuk Apple Developer Academy"
    date="21 Juni 2026"
    status="done"
    tags={['Apple', 'Academy', 'Logic', 'Swift', 'Seleksi']}
  />

  <Callout type="info" title="Sumber Referensi">
    Catatan ini disusun sebagai rangkuman teoretis dan panduan simulasi praktis dari dokumen instrumen ujian masuk <strong>Apple Developer Academy</strong> (penilaian logika &amp; pemrograman). Latihan ini membantumu membangun cara berpikir komputasional yang dibutuhkan untuk lolos tahap tes daring.
  </Callout>

  <NoteSection title="1. Pendahuluan & Struktur Seleksi">
    <p>
      <strong>Apple Developer Academy</strong> merupakan inisiatif prestisius untuk mengembangkan talenta ekonomi digital berkelas dunia dalam ekosistem Apple. Kampus akademi di Indonesia tersebar di beberapa lokasi seperti <strong>BINUS BSD Tangerang</strong>, <strong>Universitas Ciputra Surabaya</strong>, <strong>Infinite Learning Batam</strong>, <strong>BINUS Bali</strong>, dan <strong>Central Jakarta</strong>.
    </p>
    <p>
      Kurikulum intensif selama 10 bulan ini menggunakan metode pembelajaran **Challenge Based Learning (CBL)** yang mendorong kolaborasi multidisipliner (coding, design, dan business). Tujuannya adalah melahirkan developer **T-Shaped**, yaitu individu yang ahli dalam bidang teknis mendalam sekaligus mampu berkomunikasi lintas disiplin.
    </p>
    <p>Proses seleksi penerimaan peserta terdiri dari tiga tahapan utama:</p>
    <div class="steps-container">
      <div class="step-card">
        <span class="step-num">1</span>
        <h5>Seleksi Berkas</h5>
        <p>Evaluasi Curriculum Vitae (CV) dan Portofolio portofolio karya kreatif atau teknis.</p>
      </div>
      <div class="step-card">
        <span class="step-num">2</span>
        <h5>Tes Daring (Online Test)</h5>
        <p>Ujian logika & pemrograman selama 120 menit dengan sistem webcam proctoring.</p>
      </div>
      <div class="step-card">
        <span class="step-num">3</span>
        <h5>FGD (Focus Group Discussion)</h5>
        <p>Diskusi kelompok untuk menilai kolaborasi, inisiatif, dan komunikasi interpersonal.</p>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="2. Metrik Evaluasi Ujian Daring">
    <p>
      Tes daring dirancang adil bagi kandidat non-IT. Evaluasi difokuskan pada pemetaan kapasitas adaptasi komputasional, bukan hafalan sintaks bahasa.
    </p>

    <div class="metrics-grid">
      <div class="metric-card logic">
        <h4>Seksi Logika (Logic Test)</h4>
        <ul>
          <li><strong>Fokus Asesmen:</strong> Penalaran analitis, pengenalan pola, silogisme deduktif, aritmetika komputasional, dan pemetaan spasial.</li>
          <li><strong>Kurva Kesulitan:</strong> Progresif meningkat (naik sekitar 4% tiap soal), beralih dari hubungan linear sederhana ke model matriks multi-variabel.</li>
          <li><strong>Relevansi Ekosistem:</strong> Menguji kemampuan memetakan masalah (problem framing) sebelum merancang alur UX atau solusi bisnis aplikasi.</li>
        </ul>
      </div>

      <div class="metric-card programming">
        <h4>Seksi Pemrograman (Programming Test)</h4>
        <ul>
          <li><strong>Fokus Asesmen:</strong> Logika algoritmik dasar, struktur control flow, tipe opsional (Optional), dan pilar pemrograman berorientasi objek (OOP).</li>
          <li><strong>Kurva Kesulitan:</strong> Beranjak dari analisis pseudokode dasar ke arsitektur manajemen memori Swift (Reference vs Value Type, ARC, Retain Cycles).</li>
          <li><strong>Relevansi Ekosistem:</strong> Menjamin kandidat memiliki intuisi struktur memori yang aman (memory-safe) untuk menerima kurikulum iOS development.</li>
        </ul>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="3. Tips & Trik Taktis Ujian Daring">
    <p>
      Gunakan strategi berikut untuk menghemat waktu berharga dan mendongkrak skormu saat tes daring sesungguhnya:
    </p>

    <div class="tricks-grid">
      <div class="trick-card">
        <div class="trick-badge">Trik 1</div>
        <h5>Eliminasi Cepat (Option Elimination)</h5>
        <p>
          Jangan menyelesaikan seluruh posisi susunan logika jika opsi jawaban sudah bisa dieliminasi satu per satu berdasarkan petunjuk. Jika petunjuk menyebutkan <em>"E di paling depan"</em>, langsung coret opsi yang tidak diawali E. Ini menghemat waktu coret-coretan kertas secara drastis!
        </p>
      </div>

      <div class="trick-card">
        <div class="trick-badge">Trik 2</div>
        <h5>Istilah Spasial Meja Melingkar</h5>
        <p>
          Pahami arti spasial: <em>"A is directly ahead of C"</em> berarti A tepat di depan C. Untuk meja melingkar, bayangkan dirimu duduk menghadap ke pusat meja. Di posisi Utara, arah kirimu adalah Timur (searah jarum jam). Di posisi Selatan, arah kirimu adalah Barat (berlawanan jarum jam).
        </p>
      </div>

      <div class="trick-card">
        <div class="trick-badge">Trik 3</div>
        <h5>Pola Deret Bertingkat & Kuadrat</h5>
        <p>
          Jika deret angka tidak memiliki selisih konstan, cek selisih tingkat keduanya (aritmetika bertingkat) atau bilangan kuadrat (1, 4, 9, 16, 25, ...). Pola kuadrat memiliki selisih antar angka berurutan berupa deret bilangan ganjil (+3, +5, +7, +9, ...).
        </p>
      </div>

      <div class="trick-card">
        <div class="trick-badge">Trik 4</div>
        <h5>Swift Labels: Perhatikan Error!</h5>
        <p>
          Swift mewajibkan label parameter saat pemanggilan fungsi, misal <code>greet(name: "Aulia")</code>. Pemanggilan tanpa label seperti <code>greet("Aulia")</code> akan menyebabkan **Compile Error**, kecuali deklarasi fungsinya menggunakan wildcard underscore <code>func greet(_ name: String)</code>.
        </p>
      </div>

      <div class="trick-card">
        <div class="trick-badge">Trik 5</div>
        <h5>Kriptografi / Sandi Cepat</h5>
        <p>
          Saat menjumpai soal sandi bergeser, jangan buang waktu memecahkan seluruh huruf. Temukan pola geser untuk huruf pertama dan terakhir saja, lalu langsung eliminasi pilihan ganda yang tidak diawali dan diakhiri huruf hasil enkripsi tersebut.
        </p>
      </div>
    </div>
  </NoteSection>

  <NoteSection title="4. Uji Kemampuan I: Kuis Logic Test">
    <p>
      Bagian pertama menguji penalaran verbal, logika aritmetika, urutan posisi, dan orientasi spasialmu. Selesaikan kuis 15 soal ini secara interaktif di bawah ini:
    </p>
    <Quiz questions={logicQuestions} title="Kuis 1: Logic Test (15 Soal)" />
  </NoteSection>

  <NoteSection title="5. Uji Kemampuan II: Kuis Programming Test">
    <p>
      Bagian kedua menguji pemahamanmu terhadap pseudokode, control flow, Optional, konsep OOP, serta mekanisme memori Swift (ARC &amp; Retain Cycle). Selesaikan kuis 13 soal ini:
    </p>
    <Quiz questions={programmingQuestions} title="Kuis 2: Programming Test (13 Soal)" />
  </NoteSection>

  <NoteSection title="6. Pembahasan & Rasionalisasi Teknis Lengkap">
    <p>
      Jika kamu ingin mempelajari teori logika di balik setiap soal secara komprehensif tanpa melalui kuis, kami menyediakan daftar pembahasan terurut di bawah ini. Klik judul soal untuk membuka penjelasan lengkap:
    </p>

    <div class="accordion-container">
      <h4 class="accordion-group-title">Bagian 1: Seksi Logika (Logic Test)</h4>

      <details class="accordion-item">
        <summary><strong>Soal 1: Deret Pertumbuhan Numerik (2, 4, 8, 14, ..., 32)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> 22 (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Deret ini memiliki selisih antar angka yang meningkat secara genap konstan (+2, +4, +6):</p>
          <ul>
            <li>4 - 2 = 2</li>
            <li>8 - 4 = 4</li>
            <li>14 - 8 = 6</li>
          </ul>
          <p>Dengan demikian, lompatan selisih berikutnya harus bertambah 8 (+8), sehingga: 14 + 8 = 22. Jika kita validasikan ke angka terakhir: 22 + 10 = 32 (Terbukti benar).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 2: Deret Alfabet Asimetris (A, C, F, J, O, ...)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> U (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Jarak pergeseran huruf meningkat secara linear (+2, +3, +4, +5):</p>
          <ul>
            <li>A (+2) -> C</li>
            <li>C (+3) -> F</li>
            <li>F (+4) -> J</li>
            <li>J (+5) -> O</li>
          </ul>
          <p>Maka pergeseran berikutnya harus berjarak 6 langkah (+6). Menggeser 6 huruf dari O (P, Q, R, S, T, U) merujuk pada abjad U.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 3: Sandi Enkripsi Kriptografis (KUCING -> LXEKRJ)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> CXTWRJ (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Kita petakan selisih huruf dari kata KUCING ke LXEKRJ untuk menemukan pola geser dinamisnya:</p>
          <ul>
            <li>K -> L (Indeks +1)</li>
            <li>U -> X (Indeks +3)</li>
            <li>C -> E (Indeks +2)</li>
            <li>I -> K (Indeks +2)</li>
            <li>N -> R (Indeks +4)</li>
            <li>G -> J (Indeks +3)</li>
          </ul>
          <p>Terapkan pola stride [+1, +3, +2, +2, +4, +3] ini secara urut pada kata BURUNG:</p>
          <ul>
            <li>B (+1) -> C</li>
            <li>U (+3) -> X</li>
            <li>R (+2) -> T</li>
            <li>U (+2) -> W</li>
            <li>N (+4) -> R</li>
            <li>G (+3) -> J</li>
          </ul>
          <p>Hasil akhir enkripsi adalah CXTWRJ.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 4: Waktu Tempuh Lokomotif Otonom</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> 3 hours (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Gunakan rumus dasar hubungan waktu, jarak, dan kecepatan: Waktu (t) = Jarak (s) / Kecepatan (v). Memasukkan data: t = 180 km / 60 km/jam = 3 jam.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 5: Alokasi Proyek & Resign Karyawan</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> 33.3% (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Persoalan perbandingan berbalik nilai:</p>
          <ul>
            <li>Total daya kerja yang dibutuhkan: 16 orang x 9 hari = 144 orang-hari.</li>
            <li>Setelah 4 orang resign, sisa tim menjadi 12 orang (16 - 4).</li>
            <li>Waktu baru untuk menyelesaikan total beban kerja: 144 orang-hari / 12 orang = 12 hari.</li>
            <li>Selisih tambahan waktu yang dibutuhkan: 12 hari - 9 hari = 3 hari.</li>
            <li>Rasio penambahan waktu terhadap estimasi semula: 3 hari / 9 hari = 1/3 atau 33.33%.</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 6: Evaluasi Algoritma Diskon Dinamis E-Commerce</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Rp 168,000 (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Hitung total harga bruto belanjaan:</p>
          <ul>
            <li>Product A: 3 unit x Rp 50.000 = Rp 150.000.</li>
            <li>Product B: 2 unit x Rp 30.000 = Rp 60.000.</li>
            <li>Total Bruto: Rp 150.000 + Rp 60.000 = Rp 210.000.</li>
          </ul>
          <p>Algoritma mengevaluasi kondisi: <code>if (Total Bruto > Rp 200.000)</code>. Karena Rp 210.000 > Rp 200.000 bernilai TRUE, diskon 20% diberikan:</p>
          <ul>
            <li>Potongan harga: Rp 210.000 x 20% = Rp 42.000.</li>
            <li>Total Netto yang harus dibayar: Rp 210.000 - Rp 42.000 = Rp 168.000.</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 7: Penarikan Deduksi Silogisme (Programmer & Kopi)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> The available premises do not have enough justification to conclude that all programmers like coffee. (Opsi E)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Analisis diagram Venn relasional:</p>
          <ul>
            <li>Himpunan besar adalah "Humans" (Manusia).</li>
            <li>"Programmers" adalah subset penuh di dalam himpunan Humans (semua programmer adalah manusia).</li>
            <li>"Coffee Lovers" (Penyuka Kopi) adalah subset yang tumpang tindih dengan Humans (sebagian manusia menyukai kopi).</li>
          </ul>
          <p>Karena tidak ada premis yang menyatakan hubungan antara subset Programmers dan subset Coffee Lovers, maka kita tidak memiliki cukup bukti logis untuk menyimpulkan hubungan apa pun di antara keduanya. Menarik simpulan bahwa sebagian programmer pasti suka kopi adalah sebuah cacat logika (Logical Fallacy).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 8: Modus Tollens Validasi Aplikasi App Store</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> The TaskMaster application cannot be found on the App Store. (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Bentuk hukum Modus Tollens menyatakan:</p>
          <p><code>P -> Q</code> (Jika aplikasi ada di App Store, pasti sudah lolos review Apple)</p>
          <p><code>~Q</code> (Aplikasi TaskMaster belum lolos review Apple)</p>
          <p>Maka dapat ditarik kesimpulan <code>~P</code> (Aplikasi TaskMaster tidak terdaftar di App Store).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 9: Hukum Transitivitas Pertidaksamaan Relasional</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> D > A (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Gabungkan seluruh premis pertidaksamaan:</p>
          <ul>
            <li>A > B</li>
            <li>B > C</li>
            <li>D &lt; C (artinya C > D)</li>
          </ul>
          <p>Dengan menyatukannya secara linear berdasarkan hukum transitivitas: A > B > C > D. Dari urutan ini, A adalah nilai tertinggi dan D adalah nilai terendah. Pernyataan D > A (D lebih besar dari A) dipastikan bernilai SALAH mutlak.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 10: Posisi Duduk Melingkar 4 Kursi (Game Papan)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> In the position directly opposite (facing) Gita. (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Mari kita visualisasikan kursi melingkar 4 posisi (Utara, Timur, Selatan, Barat):</p>
          <ol>
            <li>Letakkan Feri di posisi Utara dan Gita di posisi Timur (karena Feri harus bersebelahan dengan Gita).</li>
            <li>Sisa kursi kosong berada di posisi Barat (sebelah Feri) dan posisi Selatan (sebelah Gita).</li>
            <li>Karena Hani tidak boleh duduk di samping Feri, maka Hani tidak boleh menempati posisi Barat. Hani harus duduk di posisi Selatan.</li>
            <li>Kursi tersisa di posisi Barat secara otomatis diduduki oleh Irfan.</li>
          </ol>
          <p>Berdasarkan layout melingkar (Utara: Feri, Timur: Gita, Selatan: Hani, Barat: Irfan), terlihat bahwa posisi Irfan di Barat berhadapan langsung (opposite) 180 derajat dengan Gita di Timur.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 11: Diskusi Lingkaran 6 Kursi (Focus Group Discussion)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Q (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Mari kita petakan 6 kursi melingkar simetris (posisi 0 hingga 5 berurutan searah jarum jam):</p>
          <ul>
            <li>Letakkan P di posisi 0 (12:00) dan T berseberangan di posisi 3 (6:00).</li>
            <li>S duduk di sebelah kiri T (dari perspektif T menghadap tengah meja / arah Utara). Tangan kiri T akan menunjuk ke arah posisi 4 (8:00). Jadi, S = posisi 4.</li>
            <li>R duduk persis di antara P (posisi 0) dan U. Karena posisi 4 sudah diisi S, satu-satunya slot yang tersisa bagi R untuk mengapit adalah posisi 1 (2:00) dan U di posisi 2 (4:00).</li>
            <li>Sisa satu kursi kosong di posisi 5 (10:00) ditempati oleh Q.</li>
            <li>Pertanyaan: Siapa yang duduk berseberangan dengan U? Posisi yang berhadapan 180 derajat dengan U (posisi 2) adalah posisi 5, yaitu diduduki oleh Q.</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 12: Komparasi Kecepatan Performa Algoritma Siswa</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Mita (Opsi D)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Terjemahkan deskripsi ke persamaan numerik (nilai besar = cepat, nilai kecil = lambat):</p>
          <ul>
            <li>Misalkan Kiki = 300.</li>
            <li>Jaka + Nino = Kiki = 300. Diketahui Jaka = 2 * Nino. Maka 2N + N = 300 -> Nino = 100, Jaka = 200.</li>
            <li>Skor Lina = 1/3 Kiki = 100. (Sehingga Lina = Nino = 100).</li>
            <li>Diketahui Lina > Mita. Karena Lina = 100, maka skor Mita harus di bawah 100 (misalkan 80).</li>
          </ul>
          <p>Urutan performa dari tercepat ke terlambat: Kiki (300) > Jaka (200) > Lina (100) = Nino (100) > Mita (&lt;100). Dengan demikian, Mita adalah siswa dengan skor performa terlambat/terendah.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 13: Spasial Lingkaran 8 Kursi (Pertukaran Tempat Mentor)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Nabilah (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Mari kita petakan 8 kursi melingkar (posisi 1 sampai 8, searah jarum jam sebagai arah kiri dari perspektif menghadap pusat meja):</p>
          <ol>
            <li>Letakkan Faiz di posisi 1. Tiara berseberangan di posisi 5.</li>
            <li>Desi di sebelah kiri Faiz -> Desi berada di posisi 2 (searah jarum jam).</li>
            <li>Lili diapit Desi (posisi 2) dan Murti -> Lili berada di posisi 3, Murti berada di posisi 4.</li>
            <li>Aulia di seberang Lili (posisi 3) -> Aulia berada di posisi 7.</li>
            <li>Riza pemisah Faiz (posisi 1) dan Aulia (posisi 7) -> Riza berada di posisi 8.</li>
            <li>Nabilah di sebelah kiri Tiara (posisi 5). Menghadap ke pusat dari posisi 5, arah kiri mengarah ke posisi 6. Jadi Nabilah = posisi 6.</li>
          </ol>
          <p>Skenario interupsi: Tiara (posisi 5) dan Lili (posisi 3) bertukar kursi. Sekarang Tiara di pos 3, Lili di pos 5.</p>
          <p>Ditanyakan: Siapa yang duduk tepat di sebelah kanan Aulia (posisi 7)? Menghadap pusat dari posisi 7, arah kanan mengarah berlawanan jarum jam ke posisi 6, yang ditempati oleh Nabilah.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 14: Urutan Antrean Berkas Masuk</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> E, D, B, A, C (Opsi A)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Gunakan petunjuk eliminasi bertahap:</p>
          <ul>
            <li>E di depan (posisi 1) -> Opsi C dan D dicoret karena tidak diawali E.</li>
            <li>B di tengah (posisi 3) -> Opsi B dicoret karena menaruh B di posisi 2.</li>
            <li>A di depan C (format A, C berdampingan) -> Opsi E dicoret karena menaruh C sebelum A.</li>
            <li>Opsi tersisa yang memenuhi seluruh aturan adalah opsi A (E, D, B, A, C).</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 15: Pola Pertumbuhan Kuadrat</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> 25 (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Deret angka 1, 4, 9, 16, ..., 36 merupakan barisan bilangan kuadrat berurutan: 1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36. Selisih antar angka berurutan juga membentuk deret bilangan ganjil bertambah konstan (+3, +5, +7, +9, +11). Maka angka berikutnya adalah 16 + 9 = 25.</p>
        </div>
      </details>

      <h4 class="accordion-group-title">Bagian 2: Seksi Pemrograman (Programming Test)</h4>

      <details class="accordion-item">
        <summary><strong>Soal 16: Sekuensial Tahapan Abstraksi SDLC</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Problem – Analysis – Algorithm – Program – Execution – Result. (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Di dalam rekayasa perangkat lunak, alur pengembangan program ideal dimulai dari mengidentifikasi masalah (Problem), menganalisis kebutuhan (Analysis), mendesain alur logika pemecahan (Algorithm), mengimplementasikan dalam sintaks kode (Program), menjalankan instruksi pada komputer (Execution), hingga mendapatkan hasil keluaran (Result).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 17: Sintaks Immutability Swift</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> let (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Swift memisahkan secara tegas deklarasi nilai statis dan variabel dinamis demi keamanan memori. Kata kunci <code>let</code> digunakan untuk konstanta (immutable), sedangkan <code>var</code> digunakan untuk variabel (mutable) yang nilainya dapat berubah pasca-inisialisasi.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 18: Evaluasi Alur Logika Penugasan Variabel</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> c = 6, d = 36 (Opsi D)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Trace alur eksekusi baris per baris secara berurutan:</p>
          <ol>
            <li>Inisialisasi: a = 2, b = 3.</li>
            <li>Operasi c = a * b -> c = 2 * 3 = 6.</li>
            <li>Operasi d = c * c -> d = 6 * 6 = 36.</li>
          </ol>
          <p>Maka di akhir program, nilai c = 6 dan d = 36.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 19: Higher-Order Function Map di Swift</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> [2, 4, 6] (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Metode <code>.map</code> adalah Higher-Order Function yang digunakan untuk memetakan transformasi ke setiap elemen dalam koleksi array. Closure <code>&#123; $0 * 2 &#125;</code> melipatgandakan setiap nilai elemen (direpresentasikan oleh $0) dalam array <code>[1, 2, 3]</code> sehingga menghasilkan array baru <code>[2, 4, 6]</code> tanpa mengubah array aslinya.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 20: Nil-Coalescing Operator (??) pada Tipe Opsional</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Inspects optionalName; if it encounters a nil state, the system performs a fallback resolution by distributing "Guest" to the nameToDisplay variable. (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Operator Nil-Coalescing (<code>??</code>) di Swift bertindak sebagai penjamin nilai. Operator ini akan mengevaluasi ekspresi opsional di sebelah kirinya. Jika variabel opsional tersebut bernilai <code>nil</code>, sistem akan otomatis menggunakan nilai default di sebelah kanannya (<code>"Guest"</code>) untuk ditugaskan ke variabel target, mencegah terjadinya runtime crash akibat null pointer.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 21: Perbedaan Lingkup (Scope) Unwrapping: if let vs guard let</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> The reference value from guard let is transfused outside its origin block (available to the overall function scope post-resolution), whereas the variable from if let is exclusively imprisoned within the curly braces of that if construct. (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Perbedaan mendasar terletak pada cakupan (scope) visibilitas variabel hasil unwrapping:</p>
          <ul>
            <li><strong>if let:</strong> Variabel yang berhasil di-unwrap hanya dapat diakses secara eksklusif di dalam blok kurung kurawal if tersebut.</li>
            <li><strong>guard let:</strong> Variabel hasil unwrap akan terekspos dan dapat digunakan pada cakupan keseluruhan fungsi di bawah blok guard tersebut (membuat penulisan kode lebih datar/flat tanpa terlalu banyak nested brackets).</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 22: Operator Rentang Setengah Terbuka (Half-Open Range)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Anna, Alex (Opsi D)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Operator rentang setengah terbuka (half-open range operator) <code>..&lt;2</code> melakukan perulangan dari indeks awal (indeks 0) hingga sebelum indeks ke-2. Pada array <code>["Anna", "Alex", "Brian", "Jack"]</code>, elemen yang diakses adalah indeks ke-0 (<code>"Anna"</code>) dan indeks ke-1 (<code>"Alex"</code>). Indeks ke-2 (<code>"Brian"</code>) tidak dimasukkan ke dalam perulangan.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 23: Pilar Pemrograman OOP (Penyembunyian Detail Data)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Encapsulation (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Enkapsulasi (Encapsulation) adalah konsep menyembunyikan detail implementasi internal suatu kelas/struktur dan membatasi akses langsung dari pihak luar menggunakan modifier tingkat akses (seperti private atau internal). Ini menjaga agar data tetap aman dari modifikasi yang tidak diinginkan.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 24: Paradigma Memori Swift: Struct vs Class</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Struct is defined as a value type—where data manipulation causes the system to allocate persistent and independent data copies on the Stack—whereas Class is a reference type where object assignment shares a reference to single mutable memory in the Heap territory. (Opsi D)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Perbedaan mendasar di Swift antara struktur (Struct) dan kelas (Class) terletak pada alokasi memori:</p>
          <ul>
            <li><strong>Struct:</strong> Merupakan Value Type yang dialokasikan di Stack. Saat disalin atau dikirim ke fungsi, nilainya diduplikasi secara independen.</li>
            <li><strong>Class:</strong> Merupakan Reference Type yang dialokasikan di Heap. Saat disalin, yang disalin hanya pointer referensinya saja, sehingga beberapa variabel menunjuk ke objek yang sama di memori.</li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 25: Polimorfisme Dinamis (Dynamic Polymorphism)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Dynamic Polymorphism (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Kemampuan subclass untuk menimpa (override) implementasi metode milik superclass, sehingga program mengeksekusi fungsi yang tepat secara dinamis pada saat runtime, merupakan wujud dari konsep Polimorfisme Dinamis (Dynamic Polymorphism).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 26: Mesin Manajemen Memori iOS (ARC)</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Automatic Reference Counting (ARC) (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>iOS/Swift menggunakan Automatic Reference Counting (ARC) untuk mengelola memori objek kelas secara otomatis dengan melacak jumlah referensi kuat (strong reference) ke objek tersebut. Objek akan dilepaskan (deallocated) ketika jumlah referensinya mencapai nol.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 27: Kebocoran Memori Retain Cycle</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> Retain Cycle (Opsi C)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Retain Cycle (siklus retensi kuat melingkar) terjadi saat dua objek saling memegang referensi kuat satu sama lain. Karena kedua counter tidak akan pernah bisa mencapai nol, ARC tidak bisa membebaskan memori mereka, sehingga menyebabkan kebocoran memori (memory leak).</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary><strong>Soal 28: Semantik Referensi pada Alokasi Kelas Swift</strong></summary>
        <div class="accordion-content">
          <p><strong>Jawaban Benar:</strong> 7 (Opsi B)</p>
          <p><strong>Pembahasan:</strong></p>
          <p>Karena <code>SistemPenghitung</code> bertipe Class (Reference Type), baris <code>let perangkatB = perangkatA</code> tidak menduplikasi objek baru, melainkan menyalin alamat pointer referensi objek yang sama. Sehingga, modifikasi nilai <code>perangkatB.kuantitas = 7</code> juga mengubah nilai di <code>perangkatA.kuantitas</code>. Output yang tercetak adalah 7.</p>
        </div>
      </details>
    </div>
  </NoteSection>

  <BackLink href="/luar-perkuliahan/dalam-proses" label="Kembali ke Kategori Dalam Proses" />
</article>

<style>
  /* Premium CSS for Apple Developer Academy prep page */
  .steps-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin: 1.5rem 0;
  }

  .step-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    position: relative;
    box-shadow: var(--shadow-sm);
    transition: all 0.25s ease;
  }

  .step-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-binder);
  }

  .step-num {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-status-info-soft);
    font-family: var(--font-handwriting);
    line-height: 1;
    opacity: 0.8;
  }

  .step-card h5 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-ink-strong);
  }

  .step-card p {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--color-ink-muted);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .metric-card {
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    box-shadow: var(--shadow-sm);
  }

  .metric-card.logic {
    background: var(--color-status-info-soft);
    border-left: 5px solid var(--color-callout-info-border);
  }

  .metric-card.programming {
    background: var(--color-status-success-soft);
    border-left: 5px solid var(--color-status-done-start);
  }

  .metric-card h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.15rem;
    font-weight: 700;
  }

  .metric-card.logic h4 {
    color: var(--color-binder);
  }

  .metric-card.programming h4 {
    color: var(--color-status-done-start);
  }

  .metric-card ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .metric-card li {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-ink);
  }

  .tricks-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin: 1.5rem 0;
  }

  .trick-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
  }

  .trick-badge {
    background: var(--color-status-warning-soft);
    color: var(--color-status-warning-border);
    border: 1px solid var(--color-status-warning-border);
    padding: 0.15rem 0.5rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 700;
    width: fit-content;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }

  .trick-card h5 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-ink-strong);
  }

  .trick-card p {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--color-ink-muted);
  }

  /* Accordion style for Solutions Section */
  .accordion-container {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .accordion-group-title {
    margin: 1rem 0 0.5rem;
    color: var(--color-binder);
    font-size: 1.1rem;
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 0.35rem;
  }

  .accordion-item {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .accordion-item:hover {
    border-color: var(--color-binder);
  }

  .accordion-item summary {
    padding: 1rem;
    cursor: pointer;
    font-size: 0.95rem;
    color: var(--color-ink-strong);
    user-select: none;
    outline: none;
  }

  .accordion-item[open] summary {
    border-bottom: 1px solid var(--color-line);
    background: var(--color-surface-soft);
  }

  .accordion-content {
    padding: 1.25rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-ink);
    background: var(--color-surface);
  }

  .accordion-content ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
  }

  .accordion-content li {
    margin-bottom: 0.25rem;
  }

  .accordion-content p {
    margin-top: 0;
    margin-bottom: 0.75rem;
  }

  .accordion-content p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .steps-container,
    .metrics-grid,
    .tricks-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
