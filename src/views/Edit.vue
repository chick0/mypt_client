<template>
    <section class="fixed-top">
        <router-link
            :to="{ name: 'Project', query: { uuid: $route.params.uuid } }"
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
import { gate_check } from "@/check";

export default {
    name: "project-edit",
    components: {
        Editor,
    },
    setup() {
        // gate_check
        if (gate_check()) {
            const route = useRoute();
            const router = useRouter();
            const UUID = route.params.uuid;

            if (UUID.length != 36) {
                router.push({ name: "AboutMe" });
            }

            return {
                UUID: UUID,
            };
        }
    },
};
</script>

<style scoped></style>
