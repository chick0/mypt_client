<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'AboutMe', query: { page: $route.query.page } }">← 뒤로 돌아가기</router-link>
    </section>

    <section class="head" v-if="projectLoad == true">
        <h1 class="title one" id="top">{{ project.title }}</h1>
        <p class="date">{{ project.date }}</p>

        <ul class="list">
            <li class="item" v-if="checkLength(project.github)">
                <span class="badge dark">Github</span>
                <a :href="project.github" target="_blank" rel="noreferrer">{{ project.github_preview }}</a>
            </li>
            <li class="item" v-if="checkLength(project.web)">
                <span class="badge primary">Web</span>
                <a :href="project.web" target="_blank">{{ project.web }}</a>
            </li>
        </ul>
    </section>

    <section class="body" v-if="projectLoad == true">
        <div class="pad">
            <h2 class="title two">기획의도</h2>
            <div class="content" v-html="project.content.a"></div>
        </div>

        <div class="pad">
            <h2 class="title two">특징</h2>
            <div class="content" v-html="project.content.b"></div>
        </div>

        <div class="pad">
            <h2 class="title two">느낀점</h2>
            <div class="content" v-html="project.content.c"></div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import axios from 'axios';
import config from '../config';

export default {
    setup(){
        const router = useRouter();
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
            router.push({ name: "AboutMe" });
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

            if(project.value.title.includes("[작성중]")){
                if(
                    confirm("* 해당 프로젝트의 설명은 작성 중입니다.\n" +
                            "* 메인 페이지로 이동하시겠습니까?")
                ){
                    const page = route.query.page;

                    if(page == undefined || Number(page) < 1){
                        router.push({ name: "AboutMe" });
                    } else {
                        router.push({
                            name: "AboutMe",
                            page: page
                        });
                    }
                }
            }
        }).catch((e) => {
            if(e.response.status == 404){
                router.push({ name: "AboutMe" });
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

<style scoped>
/* fixed-top */
.fixed-top {
    position: fixed;

    top: 0; 
    left: 0;
    width: 100%;

    padding-top: 20px;
    padding-bottom: 10px;

    background-color: #fff !important;
    z-index: 10;
}

/* Head */
.head {
    padding-top: 40px;
}

.head > .date {
    font-size: 20px;
    margin-top: 0;
}

.head > .list > .item > .badge {
    width: 50px !important;
    margin-right: 10px !important;
}

/* Body */
.body > .pad {
    padding-top: 15px;
    padding-bottom: 30px;
}

.body > .pad > .content {
    font-size: 16px;
    line-height: 26px;
}
</style>