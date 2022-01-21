import { RouteRecordRaw } from 'vue-router';

export const superMarketRoutes: Array<RouteRecordRaw> = [
  {
    path: '/supermercados',
    name: 'SuperMarkets',
    component: () => import('@/ui/pages/supermarkets/SuperMarketsView.vue'),
  },
  {
    path: '/supermercados/novo',
    name: 'NewSuperMarket',
    component: () => import('@/ui/pages/supermarkets/SaveSuperMarket.vue'),
  },
  {
    path: '/supermercados/editar/:superMarketId',
    name: 'EditSuperMarket',
    component: () => import('@/ui/pages/supermarkets/SaveSuperMarket.vue'),
    props: true,
  },
];
