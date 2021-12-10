import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import Order from '../views/admin/page/Order.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import HomePage from '../views/HomePage.vue'
import Review from '../components/Review'
import Login from '../components/'


const routes = [

  {
    path: '/',
    name: 'Homepage',
    component: HomePage,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'review',
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