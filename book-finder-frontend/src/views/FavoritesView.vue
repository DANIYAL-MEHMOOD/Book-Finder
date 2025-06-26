<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useBookStore } from "@/stores/bookStore";

const route = useRoute();
const toast = useToast();
const bookStore = useBookStore();

let favorites = ref([]);

const fetchFavorites = async () => {
  const token = localStorage.getItem("token");  
  if (!token) return;  

  try {
    const response = await axios.get("https://localhost:44331/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    favorites.value = response.data;
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
  }
};

onMounted(async () => {
  await bookStore.fetchBooks();
  await bookStore.fetchFavorites();
  await fetchFavorites();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">📚 Favorite Books</h1>
    
    <div v-if="favorites.length > 0" class="books-grid">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in favorites" :key="book.book.id" class="bg-white shadow-lg rounded-lg p-4">
          <img :src="book.book.coverImageUrl" alt="Book Cover" class="w-full h-40 object-cover rounded">
          <h2 class="text-lg font-semibold mt-2">{{ book.book.title }}</h2>
          <p class="text-gray-600 mb-2">{{ book.book.author }}</p>
          <div class="flex justify-between items-center">
            <!-- ✅ Fixed Favorite Button -->
            <button
                @click="bookStore.toggleFavorite(book.book.id)"
                class="mt-2 p-2 rounded flex items-center text-white text-sm"
                :class="bookStore.favoriteBooks.includes(book.book.id) 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'"
              >
                <span class="mr-2">
                  <i v-if="bookStore.favoriteBooks.includes(book.book.id)" class="fas fa-heart"></i>
                  <i v-else class="far fa-heart"></i>
                </span>
                {{ bookStore.favoriteBooks.includes(book.book.id) ? "Remove from Favorites" : "Add to Favorites" }}
              </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else>No favorites found.</p>
  </div>
</template>
