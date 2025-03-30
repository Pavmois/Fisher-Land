import { createRouter, createWebHistory } from 'vue-router';
import bridge from '@vkontakte/vk-bridge';

// Отправляет событие инициализации нативному клиенту
bridge.send("VKWebAppInit");


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/wheel',
    component: () => import('../pages/Wheel.vue')
  },
  {
    path: '/info',
    component: () => import('../pages/Information.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  },
});

export default router