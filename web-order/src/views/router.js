import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import User from '../views/user/User.vue'
import Menu from '../views/user/page/SignUpLSW.vue'

const routes = [
  {
    path: '/user',
    name: 'user',
    component: Menu,
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: User
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