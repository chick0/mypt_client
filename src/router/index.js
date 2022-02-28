import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    },

    // Auth part
    {
        path: "/auth",
        name: "Auth.Move",
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Move.vue"),
    },
    {
        path: "/auth/logout",
        name: "Auth.Logout",
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Logout.vue"),
    },
    {
        path: "/auth/callback",
        // name: "Auth.Callback",
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Callback.vue"),
    },

    // Tag part
    {
        path: "/tag/:tag(.*)*", // 한글 인식 이슈
        name: "Tag.View",
        component: () =>
            import(/* webpackChunkName: "tag" */ "@/views/Tag/View.vue"),
        props: true,
    },

    // Project part
    {
        path: "/project/:uuid",
        name: "Project.View",
        component: () =>
            import(
                /* webpackChunkName: "project" */ "@/views/Project/View.vue"
            ),
        props: true,
    },
    {
        path: "/:uuid",
        name: "Project.Short",
        component: () =>
            import(
                /* webpackChunkName: "project" */ "@/views/Project/Short.vue"
            ),
        props: true,
    },

    // Manage part
    {
        path: "/manage/new-project",
        name: "Manage.Write",
        component: () =>
            import(/* webpackChunkName: "manage" */ "@/views/Manage/Write.vue"),
    },
    {
        path: "/manage/:uuid",
        name: "Manage.Edit",
        component: () =>
            import(/* webpackChunkName: "manage" */ "@/views/Manage/Edit.vue"),
        props: true,
    },
    {
        path: "/manage/:uuid/delete",
        name: "Manage.Delete",
        component: () =>
            import(
                /* webpackChunkName: "manage" */ "@/views/Manage/Delete.vue"
            ),
        props: true,
    },

    // return to "/"
    {
        path: "/:catchAll(.*)*",
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
