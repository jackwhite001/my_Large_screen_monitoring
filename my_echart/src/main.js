import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引用插件
const app = createApp(App);
import 'lib-flexible/flexible';

// app.config.globalProperties.$echarts = echarts;
console.log(app.config);
app.use(store).use(router).mount('#app');
