<script setup lang="ts">
import { ArrowRight, MapPin, Phone, Sparkles } from 'lucide-vue-next';
import { studioInfo, featuredWorks } from '@/data/mock';
</script>

<template>
  <div>
    <section class="container pt-8 md:pt-16 pb-16 md:pb-24">
      <div class="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="animate-slideUp">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vintage/10 text-vintage text-sm font-medium mb-6">
            <Sparkles :size="16" />
            <span>八年匠心 · 三千家庭的选择</span>
          </div>
          <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-ink mb-6 text-balance">
            {{ studioInfo.name }}
          </h1>
          <p class="text-xl md:text-2xl font-serif text-vintage-dark mb-6">
            {{ studioInfo.slogan }}
          </p>
          <p class="text-ink/70 leading-relaxed mb-8 text-balance max-w-lg">
            {{ studioInfo.description }}
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/booking" class="btn-primary">
              立即预约
              <ArrowRight :size="18" />
            </RouterLink>
            <RouterLink to="/portfolio" class="btn-outline">
              浏览作品
            </RouterLink>
          </div>
          <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/60">
            <div class="flex items-center gap-2">
              <MapPin :size="16" class="text-vintage" />
              <span>{{ studioInfo.address }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Phone :size="16" class="text-vintage" />
              <span>{{ studioInfo.phone }}</span>
            </div>
          </div>
        </div>

        <div class="relative animate-fadeIn">
          <div class="absolute -top-6 -left-6 w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-vintage/10 -z-10"></div>
          <div class="absolute -bottom-8 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-full bg-sand/50 -z-10"></div>
          <div class="grid grid-cols-2 gap-3 md:gap-4">
            <div class="space-y-3 md:space-y-4">
              <div
                v-for="(w, i) in featuredWorks.slice(0, 3)"
                :key="'a' + i"
                class="group relative overflow-hidden rounded-2xl shadow-md"
                :style="{ aspectRatio: `1 / ${w.ratio + 0.1}` }"
              >
                <img :src="w.url" :alt="w.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-3 left-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{ w.title }}</div>
              </div>
            </div>
            <div class="space-y-3 md:space-y-4 pt-8 md:pt-14">
              <div
                v-for="(w, i) in featuredWorks.slice(3, 6)"
                :key="'b' + i"
                class="group relative overflow-hidden rounded-2xl shadow-md"
                :style="{ aspectRatio: `1 / ${w.ratio + 0.1}` }"
              >
                <img :src="w.url" :alt="w.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-3 left-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{ w.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white/50 border-y border-sand">
      <div class="container">
        <div class="text-center mb-12">
          <div class="inline-block w-12 h-px bg-vintage mb-4"></div>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">精选作品</h2>
          <p class="text-ink/60">用镜头讲述你的故事</p>
        </div>

        <div class="masonry">
          <div
            v-for="(w, i) in featuredWorks"
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

        <div class="text-center mt-10">
          <RouterLink to="/portfolio" class="btn-outline">
            查看全部作品
            <ArrowRight :size="18" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="container py-16 md:py-24">
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(item, idx) in [
            { num: '8+', label: '年专业经验', desc: '深耕人像摄影领域' },
            { num: '3000+', label: '服务客户', desc: '收获无数好评与信任' },
            { num: '100%', label: '满意承诺', desc: '拍到满意为止' },
          ]"
          :key="idx"
          class="card p-8 text-center hover:shadow-md transition-shadow duration-300"
        >
          <div class="font-serif text-5xl font-bold text-vintage mb-2">{{ item.num }}</div>
          <div class="font-serif text-xl text-ink mb-1">{{ item.label }}</div>
          <div class="text-ink/50 text-sm">{{ item.desc }}</div>
        </div>
      </div>
    </section>
  </div>
</template>
