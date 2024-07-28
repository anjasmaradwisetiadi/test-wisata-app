import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore; 

const router = createRouter({
  history: createWebHistory(),
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
      component: () => import('../views/auth/Login.vue'),
      meta: {requiresUnauth: true}
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/activity/Activity.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/activity/detail/:id',
      name: 'activity-detail',
      component: () => import('../views/DetailActivity/DetailActivity.vue'),
      meta: {requiresAuth: true}
    },
    // {
    //   path: '/draggble',
    //   name: 'draggble',
    //   component: () => import('../views/DraggableFeature/DraggbleView.vue'),
    //   meta: {requiresAuth: true}
    // },
    { path: '/:pathMatch(.*)*', component: () => import('../components/PageNotFound.vue'), meta: {requiresAuth: true} },
  ]
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('user') ? localStorage.getItem('user') : null
  const getToken = JSON.parse(userToken)
  const auth = to.meta.requiresAuth; 
  const unauth = to.meta.requiresUnauth; 

  if (auth && !getToken) {
    next('/login');
  } else if (unauth && getToken) {
    next('/tier-list');
  } else {
    next();
  }

})

export default router
