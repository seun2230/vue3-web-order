import Admin from '@/views/admin/Admin.vue';
import FoodManagePage from '@/views/admin/page/FoodManagePage.vue';
import NullImageManagePage from '@/views/admin/page/NullImageManagePage.vue';
import SlideManagePage from '@/views/admin/page/SlideManagePage.vue';
import OrderPage from '../views/admin/page/OrderPage.vue';
import UserManagePage from '@/views/admin/page/UserManagePage.vue';
import CouponManagePage from '@/views/admin/page/CouponManagePage.vue'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { RootName: 'admin' },
    children: [
      {
        path: 'nullImage',
        name: 'nullImage',
        component: NullImageManagePage,
      },
      {
        path: 'foodManagement',
        name: 'foodManagement',
        component: FoodManagePage,
      },
      {
        path: 'SlideImage',
        name: 'SlideImage',
        component: SlideManagePage,
      },
      {
        path: 'order',
        name: 'order',
        component: OrderPage,
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: UserManagePage
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: CouponManagePage
      }
    ]
  },
]