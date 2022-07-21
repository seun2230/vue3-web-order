import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Homepage.vue'
import Review from '@/components/Review.vue'
import CommentList from '@/components/comment/CommentList.vue'
import admin from '@/routes/admin.js';
import user from '@/routes/user.js';

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
    meta: { metaName: '리뷰'}
  },
  {
    path: '/board',
    name: 'board',
    component: CommentList,
    meta: { metaName: '게시판'}
  },
  ...user,
  ...admin
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router