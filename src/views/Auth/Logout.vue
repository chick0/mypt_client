<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>메인 화면으로 이동중입니다...</p>
    </section>
</template>

<script>
import { useRouter } from "vue-router";
import { clearLogin } from "@/login";

export default {
    name: "remove-token",
    setup() {
        clearLogin();

        const router = useRouter();
        router.push({ name: "Home" });
    },
};
</script>
