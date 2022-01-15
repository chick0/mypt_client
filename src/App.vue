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
body {
    font-family: 'Noto Sans', sans-serif;
}

/* A */
a {
    text-decoration: none;
    color: rgb(0, 110, 255) !important;
}
a :hover{
    text-decoration: none;
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

/* List */
.list {
	display: flex;
	flex-direction: column;
	padding-left: 0;
	margin-bottom: 0;
    border-radius: 0;
}
.list > .item :first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
}
.list > .item {
	position: relative;
	display: block;

    padding: .5rem 1rem;
    padding-left: 0;

	text-decoration: none;
}

/* Badge !important */
.badge {
	display: inline-block !important;
	padding: .35em .65em !important;
	font-size: .75em !important;
	font-weight: 700 !important;
    text-align: center !important;
    vertical-align: center !important;
	white-space: nowrap !important;
	border-radius: .25rem !important;
}
.badge.primary{
    color: #FFF !important;
    background-color: rgb(0, 110, 255) !important;
}
.badge.dark{
    color: #FFF !important;
    background-color: #333 !important;
}

/* Titles */
.title{
    margin-top: 10px;
    margin-bottom: 3px;
}
.title.one {
    font-size: 60px;
    font-weight: 150;
}
.title.two {
    font-size: 45px;
    font-weight: 290;
}
.title.three{
    font-size: 35px;
    font-weight: 200;
}
</style>