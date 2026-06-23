<script setup lang="ts">
import { ref, computed } from 'vue';
import { Images, ZoomIn } from 'lucide-vue-next';
import Lightbox from '@/components/Lightbox.vue';
import { portfolioItems, categoryTabs, type PortfolioItem } from '@/data/mock';

type CategoryKey = (typeof categoryTabs)[number]['key'];

const activeTab = ref<CategoryKey>('wedding');
const lightboxIndex = ref<number | null>(null);

const filteredItems = computed<PortfolioItem[]>(() =>
  portfolioItems.filter((p) => p.category === activeTab.value)
);

const openLightbox = (i: number) => {
  lightboxIndex.value = i;
};

const categoryCount = (key: CategoryKey) =>
  portfolioItems.filter((p) => p.category === key).length;
</script>

<template>
  <div class="container pt-8">
    <div class="text-center mb-10 md:mb-12">
      <div class="inline-block w-12 h-px bg-vintage mb-4"></div>
      <h1 class="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">作品集</h1>
      <p class="text-ink/60 max-w-md mx-auto">
        <span class="inline-flex items-center gap-1.5">
          <Images :size="16" class="text-vintage" />
          共 {{ portfolioItems.length }} 组作品，精选呈现
        </span>
      </p>
    </div>

    <div class="flex justify-center mb-8 md:mb-10">
      <div class="inline-flex items-center p-1.5 rounded-2xl bg-white border border-sand shadow-sm">
        <button
          v-for="tab in categoryTabs"
          :key="tab.key"
          class="relative px-5 md:px-7 py-2.5 rounded-xl text-sm md:text-base font-medium transition-all duration-200"
          :class="
            activeTab === tab.key
              ? 'bg-vintage text-white shadow-md'
              : 'text-ink/60 hover:text-vintage hover:bg-sand/40'
          "
          @click="activeTab = tab.key"
        >
          <span class="inline-flex items-center gap-1.5">
            {{ tab.label }}
            <span
              class="text-xs px-1.5 py-0.5 rounded-md"
              :class="activeTab === tab.key ? 'bg-white/20' : 'bg-sand text-ink/50'"
            >
              {{ categoryCount(tab.key) }}
            </span>
          </span>
        </button>
      </div>
    </div>

    <div class="mb-4 flex items-center justify-between text-sm text-ink/50">
      <span>当前分类：<span class="text-vintage font-medium">{{ categoryTabs.find(t => t.key === activeTab)?.label }}</span></span>
      <span>共 {{ filteredItems.length }} 张作品</span>
    </div>

    <transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div :key="activeTab" class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="(item, i) in filteredItems"
          :key="item.id"
          class="group relative overflow-hidden rounded-2xl border border-sand shadow-sm cursor-zoom-in bg-white animate-fadeIn"
          :style="{ aspectRatio: `1 / ${item.ratio}`, animationDelay: `${i * 60}ms` }"
          @click="openLightbox(i)"
        >
          <img
            :src="item.thumb"
            :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-white/90 backdrop-blur text-vintage flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
              <ZoomIn :size="22" />
            </div>
          </div>
          <div class="absolute bottom-0 inset-x-0 p-4 pt-8 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 class="font-serif text-white font-medium text-base md:text-lg">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </div>
    </transition>

    <Lightbox
      :items="filteredItems"
      v-model:current-index="lightboxIndex"
    />
  </div>
</template>
