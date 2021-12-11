import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/admin/Admin.vue'
import DashBoard from '../views/admin/page/DashBoard.vue'
import Order from '../views/admin/page/Order.vue'
import foodManagement from '../views/admin/page/FoodManageMent.vue'
import HomePage from '../views/HomePage.vue'
import Review from '../components/Review.vue'
import Slide from '../components/Slide.vue'
import PageList from '../components/PageList.vue'
import Category from '../components/Category.vue'
import Descript from '../components/Descript.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: HomePage,
    children: [
      {
        path: 'slide',
        name: 'slide',
        component: Slide
      },
      {
        path: 'pageList',
        name: 'pageList',
        component: PageList
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
      },
      {
        path: 'descript',
        name: 'descript',
        component: Descript,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
      },
      {
        path: 'review',
        name: 'review',
        component: Review,
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