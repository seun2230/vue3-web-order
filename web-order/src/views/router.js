import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AddFood from '../components/AddFood.vue'
import Admin from '../views/Admin.vue'
import MyPage from '../views/MyPage.vue'

const routes = [
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/AddFood',
    name: 'AddFood',
    component: AddFood
  },
  {
    path: '/Admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    component: MyPage
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router