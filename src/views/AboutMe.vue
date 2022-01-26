<template>
    <section class="aboutme">
        <h1 class="title one" @click="loginCounter++">{{ about_me.name }}</h1>

        <div v-if="loginUI == true">
            <router-link :to="{ name: 'Auth' }">로그인</router-link> |
            <router-link :to="{ name: 'Logout' }">로그아웃</router-link>
        </div>

        <ul class="list">
            <li class="item">
                <span class="badge dark big">Github</span>
                <a :href="about_me.github" target="_blank" rel="noreferrer">{{ about_me.github }}</a>
            </li>
            <li class="item">
                <span class="badge primary big">E-Mail</span>
                <a :href="'mailto:'+about_me.email" target="_blank">{{ about_me.email }}</a>
            </li>
        </ul>
    </section>

    <section v-if="logined == true">
        <router-link class="button" :to="{ name: 'Write' }">프로젝트 등록하기</router-link>
    </section>

    <section>
        <Projects :path="path"></Projects>
    </section>
</template>

<script>
import { ref, watch } from 'vue';
import Projects from '@/component/Projects.vue';
import config from '@/config';
import { is_login } from '@/check';

export default {
    components: {
        Projects
    },
    setup(){
        const loginUI = ref(false);
        const loginCounter = ref(0);

        watch(loginCounter, () => {
            if(loginCounter.value >= 3){
                loginUI.value = true;
            } else {
                loginUI.value = false;
            }
        });

        return {
            about_me: config.about_me,
            path: "/projects",
            logined: is_login(),

            loginUI: loginUI,
            loginCounter: loginCounter
        }
    },
}
</script>

<style scoped>
/* About Me */
.aboutme {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 30px;
}

.aboutme > .list > .item > .badge {
    width: 50px !important;
    margin-right: 10px !important;
}
</style>