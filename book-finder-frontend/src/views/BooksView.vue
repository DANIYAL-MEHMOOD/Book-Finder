<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from 'vue-router';
import axios from "axios";
import { useBookStore } from "@/stores/bookStore"; // Import Pinia store
import { useToast } from "vue-toastification";
// import { BackButton } from "../components/BackButton.vue";

const route = useRoute(); // Get route parameters
const selectedBook = ref(null); // Store book details
const toast = useToast();
const bookStore = useBookStore();

onMounted(async () => {
  await bookStore.fetchBooks();
  await bookStore.fetchFavorites();
});

watchEffect(async () => {
  const bookId = route.params.id;
  if (!bookId) return;

  try {
    const response = await axios.get(`https://localhost:44331/api/books/${bookId}`);
    selectedBook.value = response.data;
  } catch (error) {
    console.error("❌ Error fetching book:", error);
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4"> 📚 Selected Book</h1>
    <div class="flex justify-left items-center mt-4">
      <RouterLink 
        to="/" 
        class="flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
      >
        <i class="fas fa-arrow-left mr-2"></i> Back to Home View
      </RouterLink>
    </div> 

    <div v-if="selectedBook" class="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
      <img :src="selectedBook.coverImageUrl" alt="Book Cover" class="w-full h-60 object-cover rounded">
      <h2 class="text-lg font-semibold mt-2">{{ selectedBook.title }}</h2>
      <p class="text-gray-600 mb-2">by {{ selectedBook.author }}</p>

      <!-- Favorite Button -->
      <button
        @click="bookStore.toggleFavorite(selectedBook.id)"
        class="mt-2 p-2 rounded flex items-center text-white text-sm"
        :class="
          bookStore.favoriteBooks.includes(selectedBook.id)
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        "
      >
        <span class="mr-2">
          <i v-if="bookStore.favoriteBooks.includes(selectedBook.id)" class="fas fa-heart"></i>
          <i v-else class="far fa-heart"></i>
        </span>
        {{ bookStore.favoriteBooks.includes(selectedBook.id) ? "Remove from Favorites" : "Add to Favorites" }}
      </button>
    </div>

    <p v-else class="text-gray-500 text-center">Loading book details...</p>
  </div>
</template>
