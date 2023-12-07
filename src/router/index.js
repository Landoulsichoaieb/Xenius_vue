import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Dashboard from '../components/Pages/Dashboard.vue';
import Login from '../components/Pages/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
        if (!isLoggedIn()) {
          next('/Login');
        } else {
          next();
        }
      }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next('/Dashboard');
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  function isLoggedIn() {
    
    
    return localStorage.getItem('token') !== null;
  }

export default router;
