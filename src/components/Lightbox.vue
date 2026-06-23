<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-vue-next';
import type { PortfolioItem } from '@/data/mock';

interface Props {
  items: PortfolioItem[];
  currentIndex: number | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:currentIndex', v: number | null): void }>();

const open = computed(() => props.currentIndex !== null);
const index = computed(() => (props.currentIndex ?? 0));
const item = computed(() => props.items[index.value]);
const total = computed(() => props.items.length);

const loaded = ref(false);
watch(index, () => (loaded.value = false));

const close = () => emit('update:currentIndex', null);
const prev = () => {
  if (!open.value || total.value <= 1) return;
  const next = (index.value - 1 + total.value) % total.value;
  emit('update:currentIndex', next);
};
const next = () => {
  if (!open.value || total.value <= 1) return;
  const n = (index.value + 1) % total.value;
  emit('update:currentIndex', n);
};

const handleKey = (e: KeyboardEvent) => {
  if (!open.value) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') prev();
  else if (e.key === 'ArrowRight') next();
};

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));

watch(open, (v) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = v ? 'hidden' : '';
});
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[200] bg-ink/92 backdrop-blur-sm animate-fadeIn"
        @click.self="close"
      >
        <button
          class="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
          @click="close"
          aria-label="关闭"
        >
          <X :size="22" />
        </button>

        <button
          v-if="total > 1"
          class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all active:scale-95"
          @click.stop="prev"
          aria-label="上一张"
        >
          <ChevronLeft :size="28" />
        </button>

        <button
          v-if="total > 1"
          class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur text-white/80 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all active:scale-95"
          @click.stop="next"
          aria-label="下一张"
        >
          <ChevronRight :size="28" />
        </button>

        <div class="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-16 py-20">
          <div
            class="relative w-full max-w-5xl flex items-center justify-center flex-1 animate-fadeIn"
            :key="item.id"
          >
            <div
              v-if="!loaded"
              class="absolute inset-0 flex items-center justify-center text-white/50"
            >
              <ZoomIn :size="28" class="animate-pulse" />
            </div>
            <img
              :src="item.url"
              :alt="item.title"
              class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
              :class="loaded ? 'opacity-100' : 'opacity-0'"
              @load="loaded = true"
              draggable="false"
            />
          </div>

          <div class="mt-6 text-center text-white/80 animate-slideUp">
            <h3 class="font-serif text-xl md:text-2xl font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-white/50">
              {{ index + 1 }} / {{ total }}
            </p>
          </div>

          <div v-if="total > 1" class="mt-4 flex items-center gap-2 flex-wrap justify-center max-w-md">
            <button
              v-for="(_, i) in items"
              :key="i"
              class="w-2 h-2 rounded-full transition-all duration-200"
              :class="i === index ? 'bg-vintage w-6' : 'bg-white/30 hover:bg-white/50'"
              @click.stop="emit('update:currentIndex', i)"
              :aria-label="`切换到第 ${i + 1} 张`"
            />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
