import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'; 
import './style.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(createPinia());
app.use(ToastService);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'light' // Força o modo claro
        }
    }
});

app.mount('#app');
