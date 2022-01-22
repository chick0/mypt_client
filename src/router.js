import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "AboutMe",
        component: () => import('./views/AboutMe.vue'),
    },

    // Tag 
    {
        path: "/tag/:tag(.*)*", // 한글 인식 이슈
        name: "Tag",
        component: () => import('./views/Tag.vue'),
        props: true
    },

    // Project
    {
        path: "/project/:uuid",
        name: "Project",
        component: () => import('./views/Project.vue'),
        props: true
    },
    { // old endpoint
        path: "/:uuid",
        name: "ShortProject",
        component: () => import('./views/ShortProject.vue'),
        props: true
    },

    // Back to Root
    {
        path: "/:catchAll(.*)*",
        redirect: "/",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;