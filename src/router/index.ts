import { createRouter, createWebHistory } from 'vue-router';
// import bridge from '@vkontakte/vk-bridge';

// Отправляет событие инициализации нативному клиенту
// bridge.send("VKWebAppInit");


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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router