import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/user/User.vue'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import Order from '../views/admin/page/Order.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import Menu from '../views/Home.vue'
import Review from '../components/Review'


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
      },
      {
        path: '/review',
        name: 'Review',
        component: Review,
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