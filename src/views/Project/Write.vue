<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'Home' }">
            ← 메인 페이지로 돌아가기
        </router-link>
    </section>

    <section class="after-top" v-if="show == true">
        <Editor :uuid="uuid"></Editor>
    </section>
</template>

<script>
import Editor from "@/component/Editor.vue";
import { useRouter } from "vue-router";
import { isLogin } from "@/check";

export default {
    name: "write-project",
    components: {
        Editor,
    },
    setup() {
        const router = useRouter();
        if (!isLogin()) {
            router.push({ name: "Home" });
            return {};
        }

        return {
            uuid: "new", // 새로운 프로젝트!
            show: true,
        };
    },
};
</script>
