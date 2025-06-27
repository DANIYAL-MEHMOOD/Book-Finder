<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";

import { useToast } from "vue-toastification";

const toast = useToast();

const username = ref("");
const password = ref("");

const register = async () => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            username: username.value,   
            password: password.value
        });

        //console.log("API Response:", response.data);
        toast.success("Registered successfully"); 

        // Clear inputs
        username.value = "";
        password.value = "";

        // Redirect to login
        router.push("/login");
    } catch (error) {
        console.error("Error registering:", error);
        toast.error("User already exists");
        // toast.error("Error registering: " + (error.response?.data?.message || error.message));
    }
};
</script>


<template>
  <div class="auth-container flex flex-col items-center justify-center min-h-screen bg-green-700 border-b border-green-500 text-white">
    
        <form @submit.prevent="register" 
        class="flex flex-col gap-4 w-80 bg-white text-black p-6 rounded-lg shadow-lg">
        <RouterLink to="/" class="text-2xl font-bold mb-4">Book Finder Register</RouterLink> 
            <input 
                v-model="username" 
                type="text"
                name="username" 
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
                type="button"
                @click="register" 
                class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                Register
            </button>
        </form>
        <p class="mt-4">
            Already have an account? 
            <router-link to="/login" class="text-green-300 hover:underline">Login</router-link>
        </p>
    </div>
  </template>


