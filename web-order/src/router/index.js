import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Index from '@/components/UserList.vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
