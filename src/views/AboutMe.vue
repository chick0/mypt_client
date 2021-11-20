<template>
    <div class="container">
        <div class="py-3">
            <h1 class="display-2">chick_0</h1>
            <p >qwerty asdf jkl; / {{page}}</p>
        </div>

        <h2>프로젝트</h2>
        <div v-for:="project in projects">
            <router-link class="pj" :to="{ name: 'Project', params: { uuid: project.uuid }, query: { page: page } }">
                <div class="py-3">
                    <h4>{{ project.title }}</h4>
                    <p class="lead">{{ project.date }}</p>

                    {{ project.tag }}
                </div>
            </router-link>
        </div>

        <div class="row py-3 gap-1" v-if="max_page > page">
            <button class="col btn btn-outline-primary btn-lg" @click="page -= 1">← 이전 페이지</button>
            <button id="nextBtn" class="col btn btn-outline-primary btn-lg" @click="page += 1">→ 다음 페이지</button>
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
        const max_page = ref(0);
        const projects = ref([]);
        const route = useRoute();

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

                    e.data.projects.forEach(project => {
                        projects.value.push({
                            uuid: project.uuid,
                            date: project.date,
                            title: project.title,
                            tag: project.tag
                        });
                    });
                }).catch((e) => {
                    page.value -= 1;
                    console.log(e);
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

        return {
            page: page,
            max_page: max_page,
            projects: projects
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
</style>