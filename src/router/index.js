import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/activity'
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: () => import('../views/dashboard/Dashboard.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/activity/Activity.vue')
    },
    {
      path: '/activity/detail/:id',
      name: 'activity-detail',
      component: () => import('../views/DetailActivity/DetailActivity.vue')
    },

    { path: '/:pathMatch(.*)*', component: () => import('../components/PageNotFound.vue'), meta: {requiresAuth: true} },
  ]
})

export default router
