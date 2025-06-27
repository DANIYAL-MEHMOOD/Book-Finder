import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useBookStore = defineStore("bookStore", () => {
  const toast = useToast();
  const books = ref([]);
  const favoriteBooks = ref([]);
  const token = localStorage.getItem("token");

  // Fetch books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
      books.value = response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch user's favorite books
  const fetchFavorites = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      favoriteBooks.value = response.data.map((fav) => fav.book.id);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Toggle favorite status of a book
  const toggleFavorite = async (bookId) => {
    if (!token) {
      toast.error("Please log in to manage favorites.");
      return;
    }

    const isFavorite = favoriteBooks.value.includes(bookId);
    try {
      if (isFavorite) {
        // Find the favorite item to remove
        const favItem = (await axios.get(`${import.meta.env.VITE_API_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        })).data.find((fav) => fav.book.id === bookId);

        if (!favItem) return;

        await axios.delete(`${import.meta.env.VITE_API_URL}/api/favorites/${favItem.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        favoriteBooks.value = favoriteBooks.value.filter((id) => id !== bookId);
        
        toast.success("Book removed from favorites.");
      } else {
        // Add to favorites
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/favorites`,
          bookId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        favoriteBooks.value.push(bookId);
        toast.success("Book added to favorites.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error?.response?.data?.message || error.message);
      toast.error(`Error: ${error?.response?.data?.message || error.message}`);
    }
  };

  return {
    books,
    favoriteBooks,
    fetchBooks,
    fetchFavorites,
    toggleFavorite,
  };
});
