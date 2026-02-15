import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Leaderboard from '@/views/Leaderboard.vue'
import AddMatch from '@/views/AddMatch.vue'
import MatchHistory from '@/views/MatchHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'leaderboard' },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
    },
    {
      path: '/add-match',
      name: 'add-match',
      component: AddMatch,
      //meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/match-history',
      name: 'match-history',
      component: MatchHistory,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
})

export default router
