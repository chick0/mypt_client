<template>
    <section class="aboutme">
        <h1 class="title one">{{ about_me.name }}</h1>

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
import Projects from '@/component/Projects.vue';
import config from '@/config';
import { is_login } from '@/check';

export default {
    components: {
        Projects
    },
    setup(){
        return {
            about_me: config.about_me,
            path: "/api/projects",
            logined: is_login(),
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