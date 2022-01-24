<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'Project', query: { uuid: $route.params.uuid } }">← 프로젝트로 돌아가기</router-link>
    </section>

    <section class="after-top">
        <h1>Edit</h1>

    </section>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
    setup(){
        const route = useRoute();
        const router = useRouter();
        const uuid = route.params.uuid;

        console.log(uuid);

        router.push({ name: "AboutMe" });
    }
}
</script>

<style scoped>

</style>