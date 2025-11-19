import { createApp } from 'vue';
import { SnackbarService } from "vue3-snackbar";
import "vue3-snackbar/styles";
import './style.scss';
import App from './App.vue';
import router from './router';

createApp(App)
    .use(router)
    .use(SnackbarService)
    .mount('#app');