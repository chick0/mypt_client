<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>로그인 요청 처리중입니다...</p>
    </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { auth } from "@/config";
import { doLogin } from "@/login";

export default {
    name: "callback-from-oauth",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const code = route.query.code;

        if (code == undefined) {
            router.push({ name: "Home" });
        } else {
            axios({
                method: "GET",
                url: `/auth/${auth.service}/callback`,
                params: {
                    code: code,
                },
            })
                .then((e) => {
                    const data = e.data;
                    doLogin(data.token);

                    alert("로그인 성공");
                    router.push({ name: "Home" });
                })
                .catch(() => {
                    alert(
                        "* 해당 계정은 로그인 할 수 없습니다.\n" +
                            "* 메인화면으로 이동합니다."
                    );
                    router.push({ name: "Home" });
                });
        }
    },
};
</script>
