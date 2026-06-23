<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Props {
  modelValue: Date | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', v: Date): void }>();

const today = new Date();
today.setHours(0, 0, 0, 0);

const viewYear = ref(today.getFullYear());
const viewMonth = ref(today.getMonth());

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

const monthLabel = computed(() => `${viewYear.value} 年 ${viewMonth.value + 1} 月`);

const days = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1);
  const last = new Date(viewYear.value, viewMonth.value + 1, 0);
  const startWeekday = first.getDay();
  const total = last.getDate();
  const arr: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) arr.push(null);
  for (let d = 1; d <= total; d++) arr.push(new Date(viewYear.value, viewMonth.value, d));
  while (arr.length % 7 !== 0) arr.push(null);
  return arr;
});

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isDisabled = (d: Date) => d.getTime() < today.getTime();

const isSelected = (d: Date) => props.modelValue && isSameDay(d, props.modelValue);

const isToday = (d: Date) => isSameDay(d, today);

const goPrevMonth = () => {
  if (viewMonth.value === 0) {
    viewYear.value--;
    viewMonth.value = 11;
  } else {
    viewMonth.value--;
  }
};

const goNextMonth = () => {
  if (viewMonth.value === 11) {
    viewYear.value++;
    viewMonth.value = 0;
  } else {
    viewMonth.value++;
  }
};

const canGoPrev = computed(() => {
  const firstView = new Date(viewYear.value, viewMonth.value, 1);
  return firstView.getTime() >= today.getTime() || viewMonth.value !== today.getMonth() || viewYear.value !== today.getFullYear();
});

const selectDay = (d: Date) => {
  if (isDisabled(d)) return;
  emit('update:modelValue', d);
};
</script>

<template>
  <div class="card p-5 md:p-6">
    <div class="flex items-center justify-between mb-5">
      <button
        class="w-9 h-9 rounded-lg flex items-center justify-center text-ink/60 hover:bg-sand/60 hover:text-vintage transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        :disabled="!canGoPrev"
        @click="goPrevMonth"
      >
        <ChevronLeft :size="20" />
      </button>
      <h3 class="font-serif text-xl font-semibold text-ink">{{ monthLabel }}</h3>
      <button
        class="w-9 h-9 rounded-lg flex items-center justify-center text-ink/60 hover:bg-sand/60 hover:text-vintage transition-colors"
        @click="goNextMonth"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center mb-2">
      <div
        v-for="(w, i) in weekDays"
        :key="w"
        class="py-2 text-xs font-medium"
        :class="i === 0 || i === 6 ? 'text-vintage/70' : 'text-ink/50'"
      >
        {{ w }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div v-for="(d, idx) in days" :key="idx" class="aspect-square">
        <button
          v-if="d"
          type="button"
          class="w-full h-full rounded-lg text-sm font-medium transition-all duration-200 relative"
          :class="[
            isDisabled(d)
              ? 'text-sand cursor-not-allowed line-through'
              : isSelected(d)
              ? 'bg-vintage text-white shadow-md scale-[1.02]'
              : isToday(d)
              ? 'bg-vintage/10 text-vintage border border-vintage/30 hover:bg-vintage/20'
              : 'text-ink/80 hover:bg-sand/60 hover:text-vintage',
          ]"
          :disabled="isDisabled(d)"
          @click="selectDay(d)"
        >
          {{ d.getDate() }}
          <span
            v-if="isToday(d) && !isSelected(d)"
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vintage"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>
