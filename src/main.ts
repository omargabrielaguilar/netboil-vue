import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'; // Importa el router

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:5000'; 

app.use(VueAxios, axios);
app.use(router); // Agrega el router aquí
app.mount('#app');
