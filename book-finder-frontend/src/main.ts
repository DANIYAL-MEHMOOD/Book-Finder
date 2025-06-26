import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@/assets/main.css';
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router); 
app.use(createPinia());
app.use(Toast);
app.mount('#app'); 

