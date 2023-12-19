import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Savings from '../views/Savings.vue'
import Payments from '../views/Payments.vue'
import PaymentHistory from '../views/PaymentHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/savings',
      name: 'savings',
      component: Savings
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments
    },
    {
      path: '/paymenthistory',
      name: 'paymenthistory',
      component: PaymentHistory
    }
  ]
})

export default router
