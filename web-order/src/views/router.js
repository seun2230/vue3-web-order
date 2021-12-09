import { createWebHistory, createRouter } from 'vue-router'
import User from '../views/user/User.vue'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import Order from '../views/admin/page/Order.vue'
import Diary from '../views/Practice.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import Menu from '../views/user/page/Menu.vue'

const routes = [
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: Menu
      }
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
        component: Order,
      },
      {
        path: 'diary',
        name: 'diary',
        component: Diary,
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