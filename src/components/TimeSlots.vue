<script setup lang="ts">
import { computed } from 'vue';
import { Clock, Check, Users } from 'lucide-vue-next';
import type { TimeSlot } from '@/data/mock';

interface Props {
  slots: TimeSlot[];
  modelValue: string | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const groups = computed(() => {
  const defs = [
    { key: 'morning', label: '上午时段', icon: Clock },
    { key: 'afternoon', label: '下午时段', icon: Clock },
    { key: 'evening', label: '晚间时段', icon: Clock },
  ] as const;
  return defs.map((g) => ({
    ...g,
    items: props.slots.filter((s) => s.period === g.key),
  }));
});

const select = (slot: TimeSlot) => {
  if (slot.booked) return;
  emit('update:modelValue', slot.id);
};
</script>

<template>
  <div class="card p-5 md:p-6">
    <h3 class="font-serif text-xl font-semibold text-ink mb-6 flex items-center gap-2">
      <Clock :size="20" class="text-vintage" />
      选择时段
    </h3>

    <div class="space-y-6">
      <div v-for="g in groups" :key="g.key">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-semibold text-ink/70 flex items-center gap-2">
            <span class="w-1 h-4 rounded-full bg-vintage/70"></span>
            {{ g.label }}
          </h4>
          <span
            class="text-xs px-2 py-0.5 rounded-full"
            :class="
              g.items.every((s) => s.booked)
                ? 'bg-sand text-ink/40'
                : 'bg-vintage/10 text-vintage'
            "
          >
            {{ g.items.filter((s) => !s.booked).length }} / {{ g.items.length }} 可约
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
          <button
            v-for="s in g.items"
            :key="s.id"
            type="button"
            class="relative px-3 py-3 md:py-3.5 rounded-xl text-sm font-medium transition-all duration-200 border"
            :class="[
              s.booked
                ? 'bg-sand/40 border-sand text-ink/30 cursor-not-allowed'
                : modelValue === s.id
                ? 'bg-vintage border-vintage text-white shadow-md scale-[1.02]'
                : 'bg-white border-sand text-ink/80 hover:border-vintage hover:text-vintage hover:shadow-sm',
            ]"
            :disabled="s.booked"
            @click="select(s)"
          >
            <span class="flex items-center justify-center gap-1.5">
              <Check v-if="modelValue === s.id && !s.booked" :size="14" />
              <Users v-if="s.booked" :size="14" class="opacity-60" />
              {{ s.time }}
            </span>
            <span v-if="s.booked" class="text-[11px] block mt-1 opacity-70">
              已约满
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
