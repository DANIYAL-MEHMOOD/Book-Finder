import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import NotFoundView from '../views/NotFoundView.vue';
import BooksView from '../views/BooksView.vue';


const router = createRouter({
  history: createWebHistory(),
  routes:[
    { 
        path: "/", 
        name: "home", 
        component: HomeView 
    },
    { 
        path: "/login", 
        name: "login", 
        component: LoginView 
    },
    { 
        path: "/register", 
        name: "register", 
        component: RegisterView 
    },
    {
          path: '/books/:id',
          name: 'books',
          component: BooksView,
        },
    { 
        path: "/favorites", 
        name: "favorites", 
        component: FavoritesView, 
        meta: { requiresAuth: true } 
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ]  
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // 🔄 Redirect to login if not logged in
  } else {
    next(); // ✅ Allow navigation
  }
});

export default router;
