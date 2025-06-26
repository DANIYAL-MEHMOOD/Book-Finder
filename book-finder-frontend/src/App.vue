<script setup> 
import { RouterLink } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import { onMounted } from "vue";

onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <div>
    <NavBar/>
    <router-view />  
  </div>
</template>

