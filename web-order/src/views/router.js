import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import UserInfo from '../store/userInfo'
import UserModify from '../views/user/page/Modify.vue'
import Sign from '../views/user/page/SignUpLSW.vue'
import Login from '../views/user/page/LoginFormLSW.vue'
import Review from '../components/Review'
import ReBoard from '../components/ReBoard'
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
    component: ReBoard
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    children: [
      {
        path: 'review',
        name: 'review',
        component: Review,
      },
      {
        path: 'board',
        name: 'board',
        component: ReBoard
      },
      {
        path: 'sign',
        name: 'Sign',
        component: Sign
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'menu',
        name: 'Menu',
        component: MenuPage
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: UserInfo,
      },
      {
        path: 'modify',
        name: 'modify',
        component: UserModify,
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