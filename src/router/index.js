import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/Dashboard.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/notification/Notification.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import('../views/another_page/AnotherPage.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/another_page/AnotherPage.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/another_page/AnotherPage.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/another_page/AnotherPage.vue')
    },
    { path: '/:pathMatch(.*)*', component: () => import('../components/PageNotFound.vue'), meta: {requiresAuth: true} },
  ]
})

export default router
