import { createWebHistory, createRouter } from "vue-router";

import AboutMe from "./views/AboutMe.vue";


const routes = [
    {
        path: "/",
        name: "AboutMe",
        component: AboutMe,
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import('./views/Contact.vue'),
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