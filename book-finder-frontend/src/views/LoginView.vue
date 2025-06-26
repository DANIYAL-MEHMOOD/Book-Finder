<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useToast } from "vue-toastification";

const toast = useToast();
const username = ref("");
const password = ref("");

const login = async () => {
    try {
        console.log("Logging in:", username.value, password.value);
        const response = await axios.post("https://localhost:44331/api/auth/login", {
            username: username.value,  
            password: password.value
        });

        console.log("API Response:", response.data);

        // ✅ Save token in localStorage
        if(window.localStorage && true){
            localStorage.setItem("token", response.data.token);
            
        }
        else{
            console.log("Local storage not available");
        }       
        toast.success("Login Successfully!");

        // Clear input fields
        username.value = "";
        password.value = "";

        // Redirect to home
        router.push("/");

    } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Enter Valid Credentials");
        //toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
};
</script>



<template>
    <div class="auth-container flex flex-col items-center justify-center min-h-screen bg-green-700 border-b border-green-500 text-white">
      <form @submit.prevent="login" class="flex flex-col gap-4 w-80 bg-white text-black p-6 rounded-lg shadow-lg">
        <RouterLink to="/" class="text-3xl font-bold mb-4">Book Finder Login</RouterLink> 
        
        <input 
          v-model="username" 
          type="text" 
          placeholder="Username" 
          class="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          required 
        />
        
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
          required 
        />
  
        <button 
          type="submit" 
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          Login
        </button>
      </form>
      
      <p>Don't have an account? 
        <router-link to="/register" class="text-green-300 hover:underline">Register</router-link>
      </p>
    </div>
  </template>