<template>
    <section class="fixed-top">
        <router-link
            :to="{ name: 'Project.View', query: { uuid: $route.params.uuid } }"
        >
            ← 프로젝트로 돌아가기
        </router-link>
    </section>

    <section class="after-top">
        <Editor :uuid="UUID"></Editor>
    </section>
</template>

<script>
import Editor from "@/component/Editor.vue";
import { useRoute, useRouter } from "vue-router";
import { isLogin } from "@/login";

export default {
    name: "project-edit",
    components: {
        Editor,
    },
    setup() {
        const router = useRouter();
        if (!isLogin()) {
            router.push({ name: "Home" });
            return {};
        }

        const route = useRoute();
        const UUID = route.params.uuid;

        if (UUID.length != 36) {
            router.push({ name: "Home" });
        }

        return {
            UUID: UUID,
        };
    },
};
</script>

<style scoped></style>
