<script setup lang="ts">
import { ref, computed } from 'vue';
import { User, Phone, Send, AlertCircle } from 'lucide-vue-next';

interface Props {
  disabled?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'submit', v: { name: string; phone: string }): void }>();

const name = ref('');
const phone = ref('');
const touched = ref({ name: false, phone: false });

const nameError = computed(() => {
  if (!touched.value.name) return '';
  if (!name.value.trim()) return '请输入您的姓名';
  if (name.value.trim().length < 2) return '姓名至少 2 个字';
  return '';
});

const phoneError = computed(() => {
  if (!touched.value.phone) return '';
  if (!phone.value.trim()) return '请输入手机号码';
  if (!/^1[3-9]\d{9}$/.test(phone.value.trim())) return '请输入正确的 11 位手机号';
  return '';
});

const valid = computed(() => !nameError.value && !phoneError.value && name.value.trim() && phone.value.trim());

const handleSubmit = () => {
  touched.value = { name: true, phone: true };
  if (!valid.value || props.disabled) return;
  emit('submit', { name: name.value.trim(), phone: phone.value.trim() });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card p-5 md:p-6 space-y-5">
    <h3 class="font-serif text-xl font-semibold text-ink mb-2">填写联系信息</h3>
    <p class="text-sm text-ink/50 -mt-3">我们的顾问会在预约前一天与您电话确认</p>

    <div>
      <label class="block text-sm font-medium text-ink/70 mb-2">
        <span class="inline-flex items-center gap-1.5">
          <User :size="14" class="text-vintage" />
          姓名
          <span class="text-vintage">*</span>
        </span>
      </label>
      <div class="relative">
        <input
          v-model="name"
          type="text"
          placeholder="请输入您的姓名"
          class="input-field pr-10"
          :class="nameError ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''"
          @blur="touched.name = true"
        />
        <AlertCircle
          v-if="nameError"
          :size="18"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
        />
      </div>
      <p v-if="nameError" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        {{ nameError }}
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-ink/70 mb-2">
        <span class="inline-flex items-center gap-1.5">
          <Phone :size="14" class="text-vintage" />
          手机号
          <span class="text-vintage">*</span>
        </span>
      </label>
      <div class="relative">
        <input
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入 11 位手机号码"
          class="input-field pr-10"
          :class="phoneError ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''"
          @blur="touched.phone = true"
        />
        <AlertCircle
          v-if="phoneError"
          :size="18"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
        />
      </div>
      <p v-if="phoneError" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        {{ phoneError }}
      </p>
    </div>

    <button type="submit" class="btn-primary w-full !py-3 text-base" :disabled="disabled || !valid">
      <Send :size="18" />
      提交预约
    </button>
  </form>
</template>
