<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>해당 프로젝트로 이동중입니다...</p>
    </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const uuid = route.params.uuid;
        const page = route.query.page;

        console.log(`uuid = ${uuid}`);
        if (uuid.length != 36) {
            router.push({ name: "AboutMe" });
        } else {
            router.push({
                name: "Project",
                params: {
                    uuid: uuid,
                },
                query: {
                    page: page,
                },
            });
        }
    },
};
</script>
