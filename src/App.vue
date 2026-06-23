<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-cream text-ink">
    <NavBar />
    <main class="pt-20 pb-16">
      <router-view />
    </main>
    <footer class="border-t border-sand bg-white/60 py-8">
      <div class="container text-center text-sm text-ink/50">
        © 2026 光和盐摄影工作室 · 用心记录每一刻
      </div>
    </footer>
  </div>
</template>
