import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Homepage'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import Sign from '../views/user/page/SignUpLSW.vue'
import Login from '../views/user/page/LoginFormLSW.vue'
import Review from '../components/Review'
import ReviewBoard from '../components/ReviewBoard'
import MenuPage from '../views/user/page/MenuPage.vue'
import UserPage from '../views/user/UserPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/review',
    name: 'review',
    component: Review,
  },
  {
    path: '/board',
    name: 'board',
    component: ReviewBoard
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    children: [
      {
        path: 'sign',
        name: 'Sign',
        component: Sign
      },
      {
        path: 'menu',
        name: 'Menu',
        component: MenuPage
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: 'dashBoard',
        name: "DashBoard",
        component: DashBoard,
      },
      {
        path: 'foodManagement',
        name: 'foodManagement',
        component: foodManagement
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router