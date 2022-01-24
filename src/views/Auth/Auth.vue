<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>로그인 화면으로 이동중입니다...</p>
    </section>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import config from '@/config';

export default {
    setup(){
        const router = useRouter();

        if(sessionStorage.getItem("mypt_login")) {
            alert(
                "* 대시보드 개발대기."
            );

            router.push({ name: "AboutMe" });
        } else {
            const timeout = 1500;
            setTimeout(() => {
                alert(
                    "* 로그인 시도가 실패했습니다.\n" +
                    "* 메인화면으로 이동합니다."
                ); router.push({ name: "AboutMe" });
            }, timeout);

            axios({
                method: "GET",
                url: config.api.host + '/auth/get-url'
            }).then((e) => {
                const urls = e.data;
                const url = urls[config.auth.service];

                if(url == undefined){
                    console.error("지원하지 않는 로그인 서비스. API 버전을 확인하세요.");
                } else {
                    location.replace(url);
                }
            }).catch(() => {
                console.error("API 서버에서 URL 정보를 불러오는데 실패했습니다.");
            });
        }
    }
}
</script>