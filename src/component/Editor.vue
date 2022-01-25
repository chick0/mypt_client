<template>
    <div v-if="projectLoad == true">
        <ul class="list">
            <li class="item">
                <b>제목</b> <input type="text" v-model="title">
            </li>
            <li class="item">
                <b>날짜</b> <input type="date" v-model="date">
            </li>
            <li class="item">
                <b>태그</b> <input type="text" v-model="tag">
            </li>
            <li class="item">
                <b>깃헙</b> <input type="url" v-model="github">
            </li>
            <li class="item">
                <b>웹사이트</b> <input type="url" v-model="web">
            </li>
        </ul>

        <h2 class="title two">기획의도</h2>
        <textarea v-model="a" @focus="resize" @input="resize"></textarea>

        <h2 class="title two">특징</h2>
        <textarea v-model="b" @focus="resize" @input="resize"></textarea>

        <h2 class="title two">느낀점</h2>
        <textarea v-model="c" @focus="resize" @input="resize"></textarea>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import config from '@/config';

export default {
    name: "Editor",
    props: {
        uuid: String,
    },
    setup(props){
        const UUID   = ref(props.uuid);
        const title  = ref();
        const date   = ref();
        const tag    = ref();
        const github = ref();
        const web    = ref();
        const a      = ref();
        const b      = ref();
        const c      = ref();
        const projectLoad = ref(false);

        const resize = (element) => {
            element.target.style.height = element.target.scrollHeight - 4 + 'px';
        };

        if(UUID.value.length == 36){
            axios({
                method: "GET",
                url: config.api.host + `/api/project/${UUID.value}`
            }).then((e) => {
                const data = e.data;

                title.value  = data.title;
                date.value   = data.dt;
                tag.value    = data.tags.join(", ");
                github.value = data.github;
                web.value    = data.web;
                a.value      = data.content.a;
                b.value      = data.content.b;
                c.value      = data.content.c;

                projectLoad.value = true;
            }).catch((e) => {
                alert("프로젝트 로드중 오류 발생");
                console.error(e);
            });
        }

        return {
            title:  title,
            date:   date,
            tag:    tag,
            github: github,
            web:    web,
            a:      a,
            b:      b,
            c:      c,
            projectLoad: projectLoad,

            resize: resize
        }
    }
}
</script>

<style scoped>
.item > b {
    display: inline-block;
    font-size: 16px;
    width: 95px;
}

.item > input {
    font-size: 16px;
    border: none;
    border-bottom: 2px var(--selection) solid;

    width: calc(100% - 110px);
}

textarea {
    font-size: 16px;
    width: 100%;
    border: none;
    min-height: 90px;
    height: auto;
}
</style>