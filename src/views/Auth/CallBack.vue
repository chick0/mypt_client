<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>로그인 요청 처리중입니다...</p>
    </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { api, auth } from "@/config";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const code = route.query.code;

        if (code == undefined) {
            router.push({ name: "AboutMe" });
        } else {
            axios({
                method: "GET",
                url: api.host + `/auth/${auth.service}/callback?code=${code}`,
            })
                .then((e) => {
                    const token = e.data.token;
                    localStorage.setItem("mypt_token", token);

                    alert("로그인 성공");
                    router.push({ name: "AboutMe" });
                })
                .catch((e) => {
                    console.error(e);
                    console.log(e.response.data);

                    alert(
                        "* 해당 계정은 로그인 할 수 없습니다.\n" +
                            "* 메인화면으로 이동합니다."
                    );
                    router.push({ name: "AboutMe" });
                });
        }
    },
};
</script>
