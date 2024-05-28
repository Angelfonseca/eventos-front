
<template>
<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex items-center justify-between">
      <a href="http://pabellon.tecnm.mx/" class="flex items-center">
        <img src="../../src/assets/nav-logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="text-2xl font-semibold dark:text-white">Eventos ITPA</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="block md:hidden">
        <svg class="w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-gray-600 dark:focus:ring-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col md:flex-row md:space-x-4 md:mt-0">
          <li>
            <router-link to="/main" class="text-gray-900 dark:text-white hover:text-blue-700">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
          <li>
            <router-link to="/upload" class="text-gray-900 dark:text-white hover:text-blue-700">
              <i class="fas fa-shopping-cart"></i> Subir credito
            </router-link>
          </li>
          <li><a
          class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          @click="logout"
          href="/"
        >
          Cerrar sesión
        </a>
      </li>
        </ul>
      </div>
    </div>
  </nav>


</template>
<script>
import {useRouter} from 'vue-router'

export default {
  methods: {
    logout() {
      localStorage.removeItem('itpa-token');
      
      useRouter.push('/');
    }
  }
}
</script>
