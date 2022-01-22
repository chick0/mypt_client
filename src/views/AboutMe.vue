<template>
    <section class="aboutme">
        <h1 class="name">{{ about_me.name }}</h1>

        <ul class="list">
            <li class="item">
                <span class="badge dark">Github</span>
                <a :href="about_me.github" target="_blank" rel="noreferrer">{{ about_me.github }}</a>
            </li>
            <li class="item">
                <span class="badge primary">E-Mail</span>
                <a :href="'mailto:'+about_me.email" target="_blank">{{ about_me.email }}</a>
            </li>
        </ul>
    </section>

    <section class="projects">
        <h2 class="title two">프로젝트</h2>

        <router-link class="project" v-for:="project in projects" :to="fetchUrl(project.uuid)">
            <h3 class="title three">{{ project.title }}</h3>
            <div class="tagbox">
                {{ project.tag }}
            </div>

            <p class="date">{{ project.date }}</p>
        </router-link>
    </section>

    <section class="page" v-if="max_page != 1">
        <button class="button" @click="page -= 1">← 이전 페이지</button>
        <button class="button" @click="page += 1">다음 페이지 →</button>
    </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import config from '../config';

export default {
    setup(){
        const page = ref(1);
        const max_page = ref(1);
        const projects = ref([]);
        const route = useRoute();

        // 쿼리 스트링으로 받은 페이지 번호가 숫자이고 0보다 크면 적용
        if(Number(route.query.page) > 0){
            page.value = route.query.page;
        }

        const fetchProjects = () => {
            if(page.value > 0) {
                axios({
                    method: "get",
                    url: config.api.host + "/api/projects" + `?page=${page.value}`
                }).then((e) => {
                    page.value = e.data.page.this;
                    max_page.value = e.data.page.max;
                    projects.value = [];
                    Object.assign(projects.value, e.data.projects);
                }).catch((e) => {
                    page.value = max_page.value;
                    alert(e.response.data.error.message);
                });
            } else {
                alert("이전 페이지가 없습니다.")
                page.value = 1;
            }
        }

        // 페이지 넘어가는거 체크
        watch(page, fetchProjects);
        watch(page, () => {
            // `프로젝트` 텍스트 위치로 스크롤 이동
            document.querySelector(".projects").scrollIntoView();
        });

        // 페이지 불러오기
        fetchProjects();

        const fetchUrl = uuid => {
            let url = {
                name: 'Project',
                params: { 
                    uuid: uuid
                },
                query: { 
                    page: page.value
                }
            };

            // 1페이지면 페이지 쿼리스트링 추가되는거 삭제
            if(page.value == 1){ delete url.query; }
            return url;
        };

        return {
            page: page,
            max_page: max_page,
            projects: projects,
            about_me: config.about_me,
            fetchUrl: fetchUrl
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

.aboutme > .name {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 60px;
    font-weight: 150;
    vertical-align: middle;
}

.aboutme > .list > .item > .badge {
    width: 50px !important;
    margin-right: 10px !important;
}

/* Projects */
.projects > .project{
    display: block;
    color: #000 !important;

    padding-top: 3px;
    padding-bottom: 15px;
}

.projects > .project:hover{
    background-color: var(--hover);
}

.projects > .project > .tagbox {
    font-size: 20px;
}

.projects > .project > .date {
    font-size: 16px;
    margin: 0;
}

/* Page */
.page {
    display: flex;
    text-align: center;

    padding-top: 30px;
    padding-bottom: 45px;
}
.page > .button {
    flex: 1;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 1rem;
}
</style>