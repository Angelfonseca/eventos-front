<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex items-center justify-between" id="navbar">
      <a href="http://pabellon.tecnm.mx/" class="flex items-center" id="logo">
        <img src="../../src/assets/nav-logo.png" class="h-6 mr-3" id="nav-logo" alt="Flowbite Logo" />
        <span class="text-lg font-semibold text-white dark:text-white">Eventos ITPA</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="block md:hidden">
        <svg class="w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-gray-600 dark:focus:ring-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col md:flex-row md:space-x-4 md:mt-0">
          <li class="opcion-nav" v-if="currentRoute !== '/main' && isDocente">
            <router-link to="/main" class="text-white hover:text-blue-700">
              <i class="fas fa-home"></i> Crear evento
            </router-link>
          </li>
          <li class="opcion-nav" v-if="currentRoute !== '/events'">
            <router-link to="/events" class="text-white hover:text-blue-700">
              <i class="fas fa-shopping-cart"></i> Eventos
            </router-link>
          </li>
          <li class="opcion-nav" v-if="currentRoute !== '/myevents' && !isDocente">
            <router-link to="/myevents" class="text-white hover:text-blue-700">
              <i></i> Mis eventos
            </router-link>
          </li>
          <li class="opcion-nav">
            <a @click="logout" href="#" class="text-white hover:text-blue-700">
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.path)

const isDocente = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.isdocente ? user.isdocente : false;
})

const logout = () => {
  localStorage.removeItem('itpa-token');
  localStorage.removeItem('user');
  router.push('/');
}
</script>

<style scoped>
#nav-logo {
  width: 25px;
  height: 25px;
}
#logo {
  margin-left: 10px;
}
.opcion-nav {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
}
#navbar {
  padding: 0.5rem;
  background-color: #313131;
}
</style>
