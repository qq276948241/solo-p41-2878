import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BookingView from '@/views/BookingView.vue';
import PortfolioView from '@/views/PortfolioView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/booking', name: 'booking', component: BookingView },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
