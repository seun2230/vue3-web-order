import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import User from '../views/user/User.vue'
import Sign from '../views/user/page/SignUpLSW.vue'
import Login from '../views/user/page/LoginFormLSW.vue'
import Menu from '../views/user/page/Menu.vue'
import Content from '../views/user/page/Content.vue'
import PageList from '../components/PageList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    compoent: HomePage,
  },

  {
    path: '/user',
    name: 'user',
    component: Menu,
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: Sign
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'menu',
        name: 'menu',
        component: User
      },
      {
        path: 'content',
        name: 'content',
        component: Content
      },
      {
        path: 'page',
        name: 'page',
        component: PageList
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
        path: 'order',
        name: 'order',
        component: Menu,
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