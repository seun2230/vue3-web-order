import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const beforeAuth = isAuth => (from, to, next) => {
  const isAuthenticated = store.getters['isAuthenticated'];
  if ((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {
    return next();
  } else {
    next('/index');
  }
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../components/Main.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: () => import('../components/Mypage.vue'),
    beforeEnter: beforeAuth(true),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
