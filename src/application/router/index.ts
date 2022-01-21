import { createRouter, createWebHashHistory } from 'vue-router';
import { superMarketRoutes } from './routes/supermarkets';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/supermercados',
      component: () => import('@/ui/pages/home/HomeView.vue'),
      children: [...superMarketRoutes],
    },
  ],
});

export default router;
