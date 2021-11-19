import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "AboutMe",
        component: () => import('./views/AboutMe.vue'),
    },
    {
        path: "/:uuid",
        name: "Project",
        component: () => import('./views/Project.vue'),
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;