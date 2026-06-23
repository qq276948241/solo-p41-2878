<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Camera, Menu, X, X as XIcon } from 'lucide-vue-next';

const scrolled = ref(false);
const mobileOpen = ref(false);

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/portfolio', label: '作品集' },
  { to: '/booking', label: '在线预约' },
];

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value;
};

const closeMobile = () => {
  mobileOpen.value = false;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-sand' : 'bg-transparent"
  >
    <div class="container h-20 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 group" @click="closeMobile">
        <span class="w-9 h-9 rounded-lg bg-vintage text-white flex items-center justify-center transition-transform group-hover:scale-105">
          <Camera :size="20" :stroke-width="2" />
        </span>
        <span class="font-serif font-bold text-lg text-ink">光和盐</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-10">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/booking" class="btn-primary !py-2 !px-5 text-sm">立即预约</RouterLink>
      </nav>

      <button
        class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink/70 hover:bg-sand/50 transition-colors"
        @click="toggleMobile"
        :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
      >
        <Menu v-if="!mobileOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-sand bg-cream shadow-lg"
      >
        <div class="container py-4 flex flex-col gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
          :to="link.to"
          class="px-4 py-3 rounded-lg text-ink/80 hover:bg-sand/50 hover:text-vintage font-medium transition-colors"
          active-class="!bg-vintage/10 !text-vintage"
          @click="closeMobile"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          to="/booking"
          class="btn-primary mt-2"
          @click="closeMobile"
        >
          立即预约
        </RouterLink>
      </div>
    </transition>

    <div
      v-if="mobileOpen"
      class="md:hidden fixed inset-0 top-20 z-40 bg-ink/20 backdrop-blur-sm"
      @click="closeMobile"
    ></div>
  </header>
</template>
