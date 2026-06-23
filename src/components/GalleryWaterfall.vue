<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import type { FeaturedWork } from '@/data/mock';

interface Props {
  title?: string;
  subtitle?: string;
  works: FeaturedWork[];
  showMoreLink?: string;
}
withDefaults(defineProps<Props>(), {
  title: '精选作品',
  subtitle: '用镜头讲述你的故事',
  showMoreLink: undefined,
});
</script>

<template>
  <section class="py-16 bg-white/50 border-y border-sand">
    <div class="container">
      <div class="text-center mb-12">
        <div class="inline-block w-12 h-px bg-vintage mb-4"></div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">{{ title }}</h2>
        <p class="text-ink/60">{{ subtitle }}</p>
      </div>

      <div class="masonry">
        <div
          v-for="(w, i) in works"
          :key="w.id"
          class="group relative overflow-hidden rounded-2xl shadow-sm border border-sand animate-fadeIn"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <img
            :src="w.url"
            :alt="w.title"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span class="text-white font-medium text-lg font-serif">{{ w.title }}</span>
          </div>
        </div>
      </div>

      <div v-if="showMoreLink" class="text-center mt-10">
        <RouterLink :to="showMoreLink" class="btn-outline">
          查看全部作品
          <ArrowRight :size="18" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
