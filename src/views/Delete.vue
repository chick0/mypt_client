<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>프로젝트 삭제중입니다...</p>
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