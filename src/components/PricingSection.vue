<script setup lang="ts">
import { Check, Star, ArrowRight } from 'lucide-vue-next';
import type { PricingPlan, StudioStats } from '@/data/mock';

interface Props {
  stats?: StudioStats[];
  plans?: PricingPlan[];
}
withDefaults(defineProps<Props>(), {
  stats: () => [],
  plans: () => [],
});
</script>

<template>
  <section class="container py-16 md:py-24">
    <div v-if="stats && stats.length" class="mb-20">
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="item in stats"
          :key="item.label"
          class="card p-8 text-center hover:shadow-md transition-shadow duration-300"
        >
          <div class="font-serif text-5xl font-bold text-vintage mb-2">{{ item.num }}</div>
          <div class="font-serif text-xl text-ink mb-1">{{ item.label }}</div>
          <div class="text-ink/50 text-sm">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div v-if="plans && plans.length">
      <div class="text-center mb-12">
        <div class="inline-block w-12 h-px bg-vintage mb-4"></div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">热门套餐</h2>
        <p class="text-ink/60">为不同场景量身定制，透明价格所见即所得</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="relative card p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          :class="plan.featured ? 'ring-2 ring-vintage bg-vintage/[0.02]' : ''"
        >
          <span
            v-if="plan.featured"
            class="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vintage text-white text-xs font-medium shadow-md"
          >
            <Star :size="12" :fill="'currentColor'" />
            人气之选
          </span>

          <div class="mb-4">
            <h3 class="font-serif text-2xl font-bold text-ink mb-1.5">{{ plan.name }}</h3>
            <p class="text-sm text-ink/55 leading-relaxed">{{ plan.description }}</p>
          </div>

          <div class="mb-6">
            <span class="text-sm text-vintage">¥</span>
            <span class="font-serif text-4xl font-bold text-vintage">{{ plan.price }}</span>
            <span class="text-sm text-ink/40 ml-1">起</span>
          </div>

          <ul class="space-y-3 mb-8 flex-1">
            <li
              v-for="feat in plan.features"
              :key="feat"
              class="flex items-start gap-2.5 text-sm text-ink/80"
            >
              <span class="mt-0.5 w-5 h-5 rounded-full bg-vintage/10 text-vintage flex items-center justify-center flex-shrink-0">
                <Check :size="13" :stroke-width="3" />
              </span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <RouterLink
            to="/booking"
            class="w-full"
            :class="plan.featured ? 'btn-primary w-full' : 'btn-outline w-full'"
          >
            预约此套餐
            <ArrowRight :size="16" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
