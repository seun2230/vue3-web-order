import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login.vue'
import MenuList from '../components/MenuList'
import Review from '../components/Review'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuList,
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;