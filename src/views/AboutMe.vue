<template>
    <div class="container">
        <div class="py-3">
            <h1 class="display-2"><img class="profile" src="../assets/100.png"> {{ about_me.name }}</h1>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span class="badge bg-dark">Github</span>
                    <a :href="about_me.github" target="_blank" rel="noreferrer">{{ about_me.github }}</a>
                </li>
                <li class="list-group-item">
                    <span class="badge bg-primary">E-Mail</span>
                    <a :href="'mailto:'+about_me.email" target="_blank">{{ about_me.email }}</a>
                </li>
            </ul>
        </div>

        <h2 class="pt-4">프로젝트</h2>
        <div v-for:="project in projects">
            <router-link class="pj" :to="fetchUrl(project.uuid)">
                <div class="py-3">
                    <h4>{{ project.title }}</h4>
                    <p class="lead">{{ project.date }}</p>

                    {{ project.tag }}
                </div>
            </router-link>
        </div>

        <div class="row pt-3 gap-1" v-if="max_page != 1">
            <button class="col pg-l btn btn-outline-primary btn-lg" @click="page -= 1">← 이전 페이지</button>
            <button class="col pg-r btn btn-outline-primary btn-lg" @click="page += 1">→ 다음 페이지</button>
        </div>
    </div>
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
            // 프로젝트 목록 초기화해서 스크롤 상단 이동
            projects.value = [];

            if(page.value > 0) {
                axios({
                    method: "get",
                    url: config.api.host + "/api/projects" + `?page=${page.value}`
                }).then((e) => {
                    page.value = e.data.page.this;
                    max_page.value = e.data.page.max;
                    e.data.projects.forEach(project => {
                        projects.value.push({
                            uuid: project.uuid,
                            date: project.date,
                            title: project.title,
                            tag: project.tag
                        });
                    });
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
.pj {
    color: #000;
    text-decoration: none;
}
.pj:hover {
    color: rgb(20, 90, 220);
}

.profile{
    border-radius: 3rem;
    width: 65px;
}

.pg-l{
    margin-left: 5px;
}

.pg-r{
    margin-right: 5px;
}
</style>