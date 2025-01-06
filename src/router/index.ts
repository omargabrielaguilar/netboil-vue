import { createRouter, createWebHistory } from 'vue-router';
import UserCrud from '../components/UserCrud.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserCrud
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
