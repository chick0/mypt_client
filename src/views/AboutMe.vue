<template>
    <div class="container">
        <h1>작업중...</h1>

        <p @click="page += 1">go next page! : page = {{ page }}</p>
        <p @click="page = 1">reset to 1</p>

        <div v-for:="project in projects">
            <router-link :to="{ name: 'Project', params: { uuid: project.uuid } }">
                <div class="py-2">
                    <h3>{{ project.title }}</h3>
                    <p class="lead">{{ project.date }}</p>

                    {{ project.tag }}
                </div>
            </router-link>
        </div>

        <div class="d-grid py-3">
            <button class="btn btn-outline-primary btn-lg" @click="page += 1">더 불러오기</button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import apiConfig from '../apiConfig';

export default {
    setup(){
        const page = ref(1);
        const projects = ref([]);

        const fetchProjects = () => {
            axios({
                method: "get",
                url: apiConfig.host + "/api/projects" + `?page=${page.value}`
            }).then((e) => {
                page.value = e.data.page.this;
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
                alert("오류가 발생했습니다!");
                console.log(e);
            });
        }

        // 페이지 넘어가는거 체크
        watch(page, fetchProjects);

        // 페이지 불러오기
        fetchProjects();

        return {
            page: page,
            projects: projects
        }
    },
}
</script>

<style scoped>
a {
    color: #000;
}
</style>