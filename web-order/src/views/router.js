import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AddFood from '../components/AddFood.vue'
import Admin from '../views/admin/Admin.vue'
import MyPage from '../views/MyPage.vue'
import Menu from '../views/Menu.vue'
import Board from '../views/Board.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import Edit from '../views/admin/page/Edit.vue'
import Diary from '../views/Practice.vue'

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
        path: 'edit',
        name: 'Edit',
        component: Edit,
      },
      {
        path: 'diary',
        name: 'diary',
        component: Diary,
      }
    ]
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/menu',
    name: "menu",
    component: Menu
  },
  {
    path: '/board',
    name: "board",
    component: Board
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router