<template>

    <div class="spinner" tabindex="-1" v-if="spinner == true">
    </div>
    <router-view />

</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup(){
        const spinner = ref(false);

        // axios 요청 시작시 스피너 보이기
        // 오류나거나 요청이 끝나면 스피터 숨기기
        axios.interceptors.request.use(config => {
            spinner.value = true;   return config;
        }, error => {
            spinner.value = false;  return Promise.reject(error);
        });

        axios.interceptors.response.use(response => {
            spinner.value = false;  return response;
        }, error => {
            spinner.value = false;  return Promise.reject(error);
        });

        return {
            spinner: spinner
        }
    }
};
</script>

<style>
/* Fonts */
@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'),
         url('/fonts/noto-sans-kr-v12-latin_korean-regular.woff2') format('woff2'),
         url('/fonts/noto-sans-kr-v12-latin_korean-regular.woff') format('woff');
}

/* Section */
section {
    text-align: left;
    margin-left: 5%;
    margin-right: 5%;
}

@media (min-width: 700px) {
    section {
        margin-left: 20%;
        margin-right: 20%;
    }
}
</style>