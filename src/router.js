import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "AboutMe",
        component: () => import('./views/AboutMe.vue'),
    },
    {
        path: "/project/:uuid",
        name: "Project",
        component: () => import('./views/Project.vue'),
        props: true
    },
    {
        path: "/:uuid",
        name: "ShortProject",
        component: () => import('./views/ShortProject.vue'),
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "this_is_soft_404",
        redirect: "/",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;