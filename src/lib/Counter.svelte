<script lang="ts">
  let count: number = $state(0);
  const increment = () => {
    count += 1;
  };
</script>

<div class="text-center">
  <button
    onclick={increment}
    class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95"
  >
    Count is {count}
  </button>

  <p class="mt-4 text-sm text-blue-200/80">
    Edit <code class="bg-white/10 px-2 py-1 rounded text-blue-300"
      >src/lib/Counter.svelte</code
    > to test HMR
  </p>
</div>
