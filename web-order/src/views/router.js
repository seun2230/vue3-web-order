import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Admin from '../views/admin/Admin.vue'
import FoodManagePage from '../views/admin/page/FoodManagePage.vue'
import UserInfo from '../views/user/page/MyPageUser.vue'
import UserModify from '../views/user/page/Modify.vue'
import SignPage from '../views/user/page/SignPage.vue'
import LoginPage from '../views/user/page/LoginPage.vue'
import Review from '../components/Review'
import ReBoard from '../components/ReBoard'
import BoardDetail from '../components/BoardDetail.vue'
import MenuPage from '../views/user/page/MenuPage.vue'
import UserPage from '../views/user/UserPage.vue'
import UserMyPage from '../views/user/page/UserMyPage.vue'
import Show from './Show.vue' 

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
        path: 'board/:id',
        name: 'boardItem',
        component: BoardDetail
      },
      {
        path: 'sign',
        name: 'Sign',
        component: SignPage
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage
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
      {
        path: 'mypage',
        name: 'mypage',
        component: UserMyPage
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      // {
      //   path: 'dashBoard',
      //   name: "DashBoard",
      //   component: DashBoard,
      // },
      {
        path: 'foodManagement',
        name: 'foodManagement',
        component: FoodManagePage
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router