<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
</script>

<main
  class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4"
>
  <div class="max-w-4xl w-full">
    <!-- Hero Section -->
    <div class="text-center mb-12 animate-fade-in">
      <div class="flex justify-center gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer"
          class="transform transition-all duration-300 hover:scale-110 hover:rotate-6"
        >
          <img
            src={viteLogo}
            class="h-24 w-24 drop-shadow-2xl hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite Logo"
          />
        </a>
        <a
          href="https://svelte.dev"
          target="_blank"
          rel="noreferrer"
          class="transform transition-all duration-300 hover:scale-110 hover:-rotate-6"
        >
          <img
            src={svelteLogo}
            class="h-24 w-24 drop-shadow-2xl hover:drop-shadow-[0_0_2em_#ff3e00aa]"
            alt="Svelte Logo"
          />
        </a>
      </div>

      <h1
        class="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
      >
        Vite + Svelte
      </h1>

      <p class="text-xl text-blue-200 font-light">Powered by Tailwind CSS</p>
    </div>

    <!-- Card Section with Glassmorphism -->
    <div
      class="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 mb-8"
    >
      <Counter />
    </div>

    <!-- Info Cards -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div
        class="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
      >
        <h3 class="text-2xl font-bold text-white mb-3">⚡ Lightning Fast</h3>
        <p class="text-blue-100">
          Vite provides instant server start and lightning-fast HMR for the best
          developer experience.
        </p>
      </div>

      <div
        class="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
      >
        <h3 class="text-2xl font-bold text-white mb-3">🎨 Beautiful UI</h3>
        <p class="text-purple-100">
          Tailwind CSS makes it easy to build stunning, responsive interfaces
          with utility-first classes.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center">
      <p class="text-blue-200 mb-4">
        Check out <a
          href="https://github.com/sveltejs/kit#readme"
          target="_blank"
          rel="noreferrer"
          class="text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-4 transition-colors"
          >SvelteKit</a
        >, the official Svelte app framework powered by Vite!
      </p>

      <p class="text-sm text-blue-300/60">
        Click on the Vite and Svelte logos to learn more
      </p>
    </div>
  </div>
</main>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
</style>
