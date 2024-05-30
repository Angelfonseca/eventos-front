import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue'; 
import HomeView from '../views/HomeView.vue'; 
import EventsView from '../views/EventsView.vue'; 
import MyEventsView from '../views/MyEventsView.vue'; 
import EventDetailView from '../views/EventDetailView.vue'; // Nueva vista para el detalle del evento
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
      component: HomeView, 
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView, 
    },
    {
      path: '/TEST', // Ruta dinámica para el detalle del evento
      name: 'event-detail',
      component: EventDetailView, 
      props: true // Habilita pasar props a la vista
    },
    {
      path: '/myevents',
      name: 'myevents',
      component: MyEventsView, 
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
