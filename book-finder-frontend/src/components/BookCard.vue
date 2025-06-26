<script setup>
import { defineProps, computed } from "vue";
import { useBooksStore } from "../store/books";

const props = defineProps(["book"]);
const booksStore = useBooksStore();

const isFavorite = computed(() => booksStore.favorites.some(fav => fav.id === props.book.id));

const toggleFavorite = () => {
  if (isFavorite.value) {
    booksStore.removeFromFavorites(props.book.id);
  } else {
    booksStore.addToFavorites(props.book);
  }
};
</script>

<template>
  <div class="book-card">
    <img :src="book.cover" :alt="book.title" />
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }}</p>
    <button @click="toggleFavorite">
      {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
    </button>
  </div>
</template>

<style scoped>
.book-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
button {
  margin-top: 8px;
  cursor: pointer;
}
</style>
