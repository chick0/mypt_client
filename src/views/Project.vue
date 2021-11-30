<template>
    <div class="container fixed-top bg-white py-3">
        <router-link :to="{ name: 'AboutMe', query: { page: $route.query.page } }">← 뒤로 돌아가기</router-link>
    </div>
    <div class="container mt-3 pt-5" v-if="projectLoad == true">
        <h1 class="display-3">{{ project.title }}</h1>
        <p class="lead">{{ project.date }}</p>

        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-if="checkLength(project.github)">
                <span class="badge badge-title bg-dark">Github</span>
                <a :href="project.github" target="_blank" rel="noreferrer">{{ project.github_preview }}</a>
            </li>
            <li class="list-group-item" v-if="checkLength(project.web)">
                <span class="badge badge-title bg-primary">Web</span>
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
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import axios from 'axios';
import config from '../config';

export default {
    setup(){
        const projectLoad = ref(false);
        const project = ref({
            content: {
                a: "", 
                b: "",
                c: ""
            },
            date: "", 
            github: "",
            github_preview: "",
            tag: "",
            title: "", 
            web: ""
        });

        const route = useRoute();
        const uuid = route.params.uuid;

        if(uuid.length != 36){
            location.href = "/";
        }

        const renderer = new marked.Renderer();
        renderer.link = ( href, title, text ) => `<a target="_blank" rel="noreferrer" href="${ href }">${ text }</a>`;

        marked.setOptions({
            gfm: true,
            renderer: renderer
        });

        axios({
            method: "get",
            url: config.api.host + "/api/project/" + uuid
        }).then((resp) => {
            // API에서 불러온 데이터 적용
            Object.assign(project.value, resp.data);

            // 마크다운만 렌더링해서 다시 적용
            const content = resp.data.content;
            project.value.content = {
                a: marked.parse(content.a),
                b: marked.parse(content.b),
                c: marked.parse(content.c),
            }

            // 프로젝트 로딩 완료
            projectLoad.value = true;
        }).catch((e) => {
            if(e.response.status == 404){
                location.href = "/";
            }

            alert("오류가 발생했습니다!");
            console.log(e);
        });

        const checkLength = text => {
            if(text == null){
                return false;
            }
            else if(text.length == 0){
                return false;
            }
            else{
                return true;
            }
        };

        return {
            project: project,
            projectLoad: projectLoad,
            checkLength: checkLength
        }
    }
}
</script>