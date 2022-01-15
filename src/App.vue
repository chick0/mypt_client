<template>

    <div class="spinner" tabindex="-1" v-if="spinner == true">
        <div class="spinner-border text-primary"></div>
    </div>
    <router-view />
    <div class="py-5"></div>

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
.spinner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.list-group-item{
    padding-left: 0;
}
.badge-title{
    width: 60px;
    margin-right: 10px;
}
</style>