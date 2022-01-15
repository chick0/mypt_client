import { createApp } from 'vue';
import router from "./router";

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';


const app = createApp(App);
app.use(router);
app.use(VueLoading);
app.mount('#app');
