<template>
    <router-view />

    <section class="footer">
        <p>&copy; 2022 chick_0</p>
    </section>
</template>

<script>
import axios from "axios";
import { ref, watch } from "vue";
import { useLoading } from "vue-loading-overlay";
import { api } from "@/config";

export default {
    setup() {
        // 스피너 객체를 보관하는 변수
        const loading = useLoading();
        let loadingObj = undefined;

        // 스피너가 돌아야 하는지 여부를 저장하는 변수
        const spinner = ref();

        // 스피너 핸들러
        watch(spinner, () => {
            if (spinner.value) {
                loadingObj = loading.show({
                    color: "#FFCC4D",
                    canCancel: false,
                });
            } else {
                if (loadingObj != undefined) {
                    loadingObj.hide();
                }
            }
        });

        // axios 전역 설정
        axios.defaults.baseURL = api.host;

        // axios 요청 시작시 스피너 보이기
        // 오류나거나 요청이 끝나면 스피터 숨기기
        axios.interceptors.request.use(
            (config) => {
                spinner.value = true;
                return config;
            },
            (error) => {
                spinner.value = false;
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                spinner.value = false;
                return response;
            },
            (error) => {
                spinner.value = false;
                return Promise.reject(error);
            }
        );
    },
};
</script>

<style>
/* Base */
@import "./css/color.css";
@import "./css/main.css";
@import "./css/title.css";

/* Extension */
@import "./css/list.css";
@import "./css/badge.css";
@import "./css/button.css";
@import "./css/fixed-top.css";
</style>
