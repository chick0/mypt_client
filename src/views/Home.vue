<template>
    <section class="aboutme">
        <h1 class="title one" @click="loginCounter++">{{ aboutMe.name }}</h1>

        <div v-if="loginUI == true">
            <router-link :to="{ name: 'Auth.Move' }">로그인</router-link> |
            <router-link :to="{ name: 'Auth.Logout' }">로그아웃</router-link>
        </div>

        <ul class="list">
            <li class="item">
                <span class="badge dark big">Github</span>
                <a :href="aboutMe.github" target="_blank" rel="noreferrer">
                    {{ aboutMe.github }}
                </a>
            </li>
            <li class="item">
                <span class="badge primary big">E-Mail</span>
                <a :href="'mailto:' + aboutMe.email" target="_blank">
                    {{ aboutMe.email }}
                </a>
            </li>
        </ul>
    </section>

    <section v-if="loginStatus == true">
        <router-link class="button" :to="{ name: 'Manage.Write' }">
            프로젝트 등록하기
        </router-link>
    </section>

    <section class="markdown" v-html="html"></section>

    <section>
        <Projects :path="path"></Projects>
    </section>
</template>

<script>
import axios from "axios";
import { ref, watch } from "vue";
import { parse } from "marked";
import Projects from "@/component/Projects.vue";
import { aboutMe } from "@/config";
import { isLogin, getToken, clearLogin } from "@/login";
import { getMarkdown } from "@/me";

export default {
    name: "about-me",
    components: {
        Projects,
    },
    setup() {
        const loginUI = ref(false);
        const loginCounter = ref(0);
        const loginStatus = ref(false);

        watch(loginCounter, () => {
            if (loginCounter.value >= 3) {
                loginUI.value = true;
            } else {
                loginUI.value = false;
            }
        });

        if (isLogin()) {
            const token = getToken();
            axios({
                method: "GET",
                url: `/auth/test`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    loginStatus.value = true;
                })
                .catch((e) => {
                    const code = e.response.status;
                    const data = e.response.data.message;

                    alert(`${code}: ${data}`);
                    clearLogin();
                });
        }

        return {
            aboutMe,
            path: "/projects",

            loginUI,
            loginCounter,
            loginStatus,

            html: parse(getMarkdown()),
        };
    },
};
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

/* markdown */
.markdown {
    font-size: 18px;
}
</style>
