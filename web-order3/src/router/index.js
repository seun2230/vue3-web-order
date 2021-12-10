import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const beforeAuth = isAuth => (from, to, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated'];
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
    name: 'MyPage',
    component: () => import('../views/MyPage.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/modify',
    name: 'MofidyForm',
    component: () => import('../components/ModifyForm.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/orderhistory',
    name: 'OrderHistory',
    component: () => import('../views/OrderHistory.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/validation',
    name: 'Validation',
    component: () => import('../components/FormValidation.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
