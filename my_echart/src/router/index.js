import { createRouter, createWebHistory } from 'vue-router';
import Page from '../views/Echarts/index.vue';

const routes = [
    {
        path: '/page',
        name: 'Page',
        component: Page,
    },
    {
        path: '/',
        redirect: '/page',
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
