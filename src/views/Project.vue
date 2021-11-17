<template>
    <div class="container">
        <div class="py-2">
            <router-link class="router-link" :to="{ name: 'AboutMe' }">← 뒤로 돌아가기</router-link>
        </div>

        <h1 class="display-3">{{ project.title }}</h1>
        <p class="lead">{{ project.date }}</p>

        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="padding-left:0">
                <span class="badge bg-dark" style="width:60px;margin-right:10px;">Github</span>
                <a :href="project.github" target="_blank" rel="noreferrer">{{ project.github }}</a>
            </li>
            <li class="list-group-item" style="padding-left:0">
                <span class="badge bg-primary" style="width:60px;margin-right:10px;">Web</span>
                <a :href="project.web" target="_blank">{{ project.web }}</a>
            </li>
        </ul>

        <div class="py-3">
            <h2>기획의도</h2>
            <div v-html="project.content.a"></div>
        </div>

        <div class="py-3">
            <h2>특징</h2>
            <div v-html="project.content.b"></div>
        </div>

        <div class="py-3">
            <h2>느낀점</h2>
            <div v-html="project.content.c"></div>
        </div>

        <p>{{ project.tag }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import axios from 'axios';
import apiConfig from '../apiConfig';

export default {
    setup(){
        const route = useRoute();
        const project = ref({});
        const uuid = route.params.uuid;

        if(uuid.length != 36){
            location.href = "/";
        }

        marked.setOptions({
            gfm: true,
        });

        axios({
            method: "get",
            url: apiConfig.host + "/api/project/" + uuid
        }).then((resp) => {
            console.log(resp.data)
            project.value = {
                "content": {
                    "a": marked.parse(resp.data.content.a),
                    "b": marked.parse(resp.data.content.b),
                    "c": marked.parse(resp.data.content.c)
                },
                "date": resp.data.date,
                "github": resp.data.github,
                "tag": resp.data.tag,
                "title": resp.data.title,
                "web": resp.data.web
            };
        }).catch((e) => {
            if(e.response.status == 404){
                location.href = "/";
            }

            alert("오류가 발생했습니다!");
            console.log(e);
        });

        return {
            project: project
        }
    }
}
</script>

<style>
</style>
