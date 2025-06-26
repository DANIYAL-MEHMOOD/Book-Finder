<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Logo import (optional)
import logo from "@/assets/vue.svg"; 

const route = useRoute();
const isActiveLink = (path) => route.path === path;

const isLoggedIn = ref(!!localStorage.getItem("token"));
// Dark mode state
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

// Toggle dark mode function
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
// Logout function
const logout = () => {
  localStorage.removeItem("token");  
  isLoggedIn.value = false;  
  router.push("/");  
};
// Apply theme on mount
onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <nav class="bg-green-700 dark:bg-gray-900 border-b border-green-500 dark:border-gray-700">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="HI" />
            <span class="hidden md:block text-white dark:text-gray-200 text-2xl font-bold ml-2">
              HI Book Finder
            </span>
          </RouterLink>

          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                  'text-white dark:text-gray-200', 'px-3', 'py-2', 'rounded-md'
                ]"
              >Home</RouterLink>

              <RouterLink
                to="/favorites"
                :class="[
                  isActiveLink('/favorites') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                  'text-white dark:text-gray-200', 'px-3', 'py-2', 'rounded-md'
                ]"
              >Favorites</RouterLink>

              <!-- <RouterLink
                to="/login"
                :class="[
                  isActiveLink('/login') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                  'text-white dark:text-gray-200', 'px-3', 'py-2', 'rounded-md'
                ]"
              >Login</RouterLink>

              <RouterLink
                to="/register"
                :class="[
                  isActiveLink('/register') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                  'text-white dark:text-gray-200', 'px-3', 'py-2', 'rounded-md'
                ]"
              >Register</RouterLink> -->
              <template v-if="!isLoggedIn">
                <RouterLink
                  to="/login"
                  :class="[isActiveLink('/login') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                    'text-white dark:text-gray-200 px-3 py-2 rounded-md']"
                >Login</RouterLink>

                <RouterLink
                  to="/register"
                  :class="[isActiveLink('/register') ? 'bg-green-900 dark:bg-gray-800' : 'hover:bg-gray-900 hover:text-white',
                    'text-white dark:text-gray-200 px-3 py-2 rounded-md']"
                >Register</RouterLink>
              </template>

              <!-- Show Logout when logged in -->
              <button
                v-if="isLoggedIn"
                @click="logout"
                class="text-white dark:text-gray-200 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>

              <!-- Dark Mode Toggle Button -->
              <button
                @click="toggleDarkMode"
                class="text-white dark:text-gray-200 px-3 py-2 rounded-md bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 flex items-center"
              >
                <span v-if="isDarkMode">☀️</span>
                <span v-else>🌙</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
