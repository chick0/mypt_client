<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>메인 화면으로 이동중입니다...</p>
    </section>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    setup(){
        localStorage.removeItem("mypt_token");

        const router = useRouter();
        router.push({ name: "AboutMe" });
    }
}
</script>