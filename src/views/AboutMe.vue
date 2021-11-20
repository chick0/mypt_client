<template>
    <div class="container">
        <div class="py-3">
            <h1 class="display-2">{{ about_me.name }}</h1>
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
            <button class="col btn btn-outline-primary btn-lg" @click="page += 1">→ 다음 페이지</button>
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
            projects: projects,
            about_me: config.about_me
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

.list-group-item{
    padding-left: 0;
}
.badge{
    width: 60px;
    margin-right: 10px;
}
</style>