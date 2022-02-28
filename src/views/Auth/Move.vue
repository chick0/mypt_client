<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>로그인 화면으로 이동중입니다...</p>
    </section>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { auth } from "@/config";
import { getToken } from "@/login";

export default {
    name: "move-to-oauth",
    setup() {
        const router = useRouter();
        const token = getToken();

        if (token == null) {
            axios({
                method: "GET",
                url: "/auth/get-url",
            })
                .then((e) => {
                    const urls = e.data;
                    const url = urls[auth.service];

                    if (url == undefined) {
                        alert(
                            "* 지원하지 않는 로그인 서비스 입니다.\n" +
                                "* API 서버를 확인해주세요.\n" +
                                "* 메인화면으로 이동합니다."
                        );

                        router.push({ name: "Home" });
                    } else {
                        location.replace(url);
                    }
                })
                .catch(() => {
                    alert(
                        "* API 서버에서 OAuth 정보를 불러오는데 실패했습니다.\n" +
                            "* 메인화면으로 이동합니다."
                    );

                    router.push({ name: "Home" });
                });
        } else {
            alert("* 이미 로그인 되어있습니다.");

            router.push({ name: "Home" });
        }
    },
};
</script>
