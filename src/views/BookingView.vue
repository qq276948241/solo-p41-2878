<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDays, Clock, CheckCircle, X as XIcon } from 'lucide-vue-next';
import Calendar from '@/components/Calendar.vue';
import TimeSlots from '@/components/TimeSlots.vue';
import BookingForm from '@/components/BookingForm.vue';
import { generateDailySlots, type TimeSlot } from '@/data/mock';

const selectedDate = ref<Date | null>(null);
const selectedSlotId = ref<string | null>(null);

const dateKey = computed(() =>
  selectedDate.value
    ? `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth() + 1}-${selectedDate.value.getDate()}`
    : ''
);

const slots = ref<TimeSlot[]>([]);
watch(
  dateKey,
  (k) => {
    slots.value = k ? generateDailySlots(k) : [];
    selectedSlotId.value = null;
  },
  { immediate: true }
);

const selectedSlot = computed(() => slots.value.find((s) => s.id === selectedSlotId.value));
const formReady = computed(() => selectedDate.value && selectedSlot.value);

const dateText = computed(() => {
  if (!selectedDate.value) return '未选择';
  const d = selectedDate.value;
  const week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日 · 周${week}`;
});

const showToast = ref(false);
const toastTimer = ref<number | null>(null);

const handleFormSubmit = ({ name, phone }: { name: string; phone: string }) => {
  console.log('提交预约:', { name, phone, date: dateText.value, slot: selectedSlot.value?.time });

  showToast.value = true;
  if (toastTimer.value) clearTimeout(toastTimer.value);
  toastTimer.value = window.setTimeout(() => {
    showToast.value = false;
  }, 2800);

  selectedDate.value = null;
  selectedSlotId.value = null;
};
</script>

<template>
  <div class="container pt-8">
    <div class="text-center mb-10 md:mb-12">
      <div class="inline-block w-12 h-px bg-vintage mb-4"></div>
      <h1 class="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">在线预约</h1>
      <p class="text-ink/60 max-w-md mx-auto">选择方便的日期和时段，留下您的联系方式，我们会尽快确认</p>
    </div>

    <div class="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
      <div class="lg:col-span-3 space-y-6">
        <div>
          <h2 class="font-serif text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <CalendarDays :size="20" class="text-vintage" />
            选择日期
          </h2>
          <Calendar v-model="selectedDate" />
        </div>

        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Clock :size="20" class="text-vintage" />
              选择时段
            </h2>
            <p v-if="!selectedDate" class="text-xs text-ink/40">请先在上方选择日期</p>
          </div>
          <TimeSlots v-if="selectedDate" :slots="slots" v-model="selectedSlotId" />
          <div v-else class="card p-10 text-center text-ink/40">
            <CalendarDays :size="40" class="mx-auto mb-3 opacity-40" />
            <p class="font-medium">请先选择预约日期</p>
            <p class="text-sm mt-1">选好日期后，这里会显示当天的可约时段</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="card p-5 md:p-6 sticky top-24">
          <h3 class="font-serif text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <CheckCircle :size="18" class="text-vintage" />
            预约摘要
          </h3>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between items-center py-2 border-b border-sand/60">
              <dt class="text-ink/50">预约日期</dt>
              <dd class="font-medium" :class="selectedDate ? 'text-ink' : 'text-ink/30'">{{ dateText }}</dd>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-sand/60">
              <dt class="text-ink/50">预约时段</dt>
              <dd class="font-medium" :class="selectedSlot ? 'text-ink' : 'text-ink/30'">
                {{ selectedSlot?.time || '未选择' }}
              </dd>
            </div>
            <div class="flex justify-between items-center py-2">
              <dt class="text-ink/50">服务地点</dt>
              <dd class="font-medium text-ink text-right">徐汇区衡山路 888 号</dd>
            </div>
          </dl>
          <div class="mt-5 p-3 rounded-lg bg-vintage/5 border border-vintage/10 text-xs text-vintage-dark leading-relaxed">
            💡 温馨提示：预约成功后我们将提前一天与您确认。如需改期请提前 24 小时来电。
          </div>
        </div>

        <BookingForm :disabled="!formReady" @submit="handleFormSubmit" />
      </div>
    </div>

    <teleport to="body">
      <transition
        enter-active-class="animate-toastIn"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="showToast"
          class="fixed top-24 left-1/2 z-[100] bg-vintage-dark/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
        >
          <div class="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <CheckCircle :size="22" />
          </div>
          <div>
            <p class="font-semibold font-serif text-base">预约提交成功！</p>
            <p class="text-xs text-white/70 mt-0.5">我们会尽快与您电话确认，请留意来电</p>
          </div>
          <button
            class="ml-2 w-7 h-7 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            @click="showToast = false"
          >
            <XIcon :size="16" />
          </button>
        </div>
      </transition>
    </teleport>
  </div>
</template>
