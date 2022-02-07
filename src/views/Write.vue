<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'AboutMe' }">
            ← 메인 페이지로 돌아가기
        </router-link>
    </section>

    <section class="after-top" v-if="show == true">
        <Editor :uuid="uuid"></Editor>
    </section>
</template>

<script>
import Editor from "@/component/Editor.vue";
import { gate_check } from "@/check";

export default {
    components: {
        Editor,
    },
    setup() {
        // gate_check
        if (gate_check()) {
            return {
                uuid: "new", // 새로운 프로젝트!
                show: true,
            };
        }
    },
};
</script>
