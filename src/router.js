import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "AboutMe",
        component: () => import(/* webpackChunkName: "a" */'./views/AboutMe.vue'),
    },

    // Auth
    {
        path: "/auth",
        name: "Auth",
        component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Auth.vue'),
    },
    {
        path: "/auth/logout",
        name: "Logout",
        component: () => import(/* webpackChunkName: "auth" */ './views/Auth/Logout.vue'),
    },
    {
        path: "/auth/callback",
        name: "CallBack",
        component: () => import(/* webpackChunkName: "auth" */ './views/Auth/CallBack.vue'),
    },

    // Tag 
    {
        path: "/tag/:tag(.*)*", // 한글 인식 이슈
        name: "Tag",
        component: () => import(/* webpackChunkName: "a" */ './views/Tag.vue'),
        props: true,
    },

    // Project
    {
        path: "/project/:uuid",
        name: "Project",
        component: () => import(/* webpackChunkName: "b" */ './views/Project.vue'),
        props: true,
    },
    { // old endpoint
        path: "/:uuid",
        name: "ShortProject",
        component: () => import(/* webpackChunkName: "c" */'./views/ShortProject.vue'),
        props: true,
    },

    // Editor
    {
        path: "/write",
        name: "Write",
        component: () => import(/* webpackChunkName: "editor" */ './views/Write.vue'),
    },
    {
        path: "/project/:uuid/edit",
        name: "Edit",
        component: () => import(/* webpackChunkName: "editor" */ './views/Edit.vue'),
        props: true,
    },
    {
        path: "/project/:uuid/delete",
        name: "Delete",
        component: () => import(/* webpackChunkName: "editor" */ './views/Delete.vue'),
        props: true,
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