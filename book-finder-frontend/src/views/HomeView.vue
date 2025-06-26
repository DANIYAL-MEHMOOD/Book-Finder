<script setup>
import { onMounted } from "vue";
import { useBookStore } from "@/stores/bookStore"; // Import Pinia store
import { useToast } from "vue-toastification";

const toast = useToast();
const bookStore = useBookStore();

onMounted(async () => {
  await bookStore.fetchBooks();
  await bookStore.fetchFavorites();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Book List</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      <div
        v-for="book in bookStore.books"
        :key="book.id"
        class="bg-white shadow-lg rounded-lg p-4"
      >
        <img :src="book.coverImageUrl" alt="Book Cover" class="w-full h-40 object-cover rounded" />
        <h2 class="text-lg font-semibold mt-2">{{ book.title }}</h2>
        <p class="text-gray-600 mb-2">{{ book.author }}</p>
        <div class="flex justify-between items-center mt-4">
          <!-- View Details Button -->
          <RouterLink
            :to="'/books/' + book.id"
            class="bg-green-500 text-white px-2 py-1 text-sm rounded-lg shadow hover:bg-green-600 transition duration-300 flex items-center"
          >
            <i class="fas fa-eye mr-2"></i> View Details
          </RouterLink>

          <!-- Favorite Button -->
          <button
            @click="bookStore.toggleFavorite(book.id)"
            class="px-3 py-1.5 text-sm rounded-lg shadow flex items-center transition duration-300"
            :class="bookStore.favoriteBooks.includes(book.id) 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'"
          >
            <i v-if="bookStore.favoriteBooks.includes(book.id)" class="fas fa-heart mr-2"></i>
            <i v-else class="far fa-heart mr-2"></i>
            {{ bookStore.favoriteBooks.includes(book.id) ? "Remove" : "Favorite" }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
