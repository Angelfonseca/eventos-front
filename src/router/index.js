import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue'; 
import { useRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView, 
    },
    {
      path: '/main',
      name: 'home',
      component:() => import ('../views/HomeView.vue') , 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), 
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue'), 
    }
  ],
});
export function Logged() {
  const router = useRouter();
  const isAuth = window.localStorage.getItem('credit-token');

  if (!isAuth) {
    router.push('/');
  };
}
export default router;

