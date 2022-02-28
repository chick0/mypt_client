<template>
    <div class="editor" v-if="projectLoad == true">
        <ul class="list">
            <li class="item">
                <b class="badge primary">제목</b>
                <input type="text" v-model="title" />
            </li>
            <li class="item">
                <b class="badge dark">날짜</b>
                <input type="date" v-model="date" />
            </li>
            <li class="item">
                <b class="badge tag">태그</b>
                <input type="text" v-model="tag" />
            </li>
            <li class="item">
                <b class="badge dark">Github</b>
                <input type="url" v-model="github" />
            </li>
            <li class="item">
                <b class="badge primary">Web</b>
                <input type="url" v-model="web" />
            </li>
        </ul>

        <br />

        <h2 class="title two">기획의도</h2>
        <textarea v-model="a" @focus="resize" @input="resize"></textarea>

        <h2 class="title two">특징</h2>
        <textarea v-model="b" @focus="resize" @input="resize"></textarea>

        <h2 class="title two">느낀점</h2>
        <textarea v-model="c" @focus="resize" @input="resize"></textarea>
    </div>

    <div class="tools" v-if="projectLoad == true">
        <button class="button save" @click="saveProject">프로젝트 저장</button>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { getToken } from "@/login";

export default {
    name: "ProjectEditor",
    props: {
        uuid: String,
    },
    setup(props) {
        const UUID = ref(props.uuid);
        const title = ref();
        const date = ref();
        const tag = ref();
        const github = ref();
        const web = ref();
        const a = ref();
        const b = ref();
        const c = ref();
        const projectLoad = ref(false);

        const resize = (element) => {
            element.target.style.height =
                element.target.scrollHeight - 4 + "px";
        };

        const fetchProject = () => {
            projectLoad.value = false;

            axios({
                method: "GET",
                url: `/project/${UUID.value}`,
            })
                .then((e) => {
                    const data = e.data;

                    title.value = data.title;
                    date.value = data.dt;
                    tag.value = data.tags.join(", ");
                    github.value = data.github;
                    web.value = data.web;
                    a.value = data.content.a;
                    b.value = data.content.b;
                    c.value = data.content.c;

                    projectLoad.value = true;
                })
                .catch(() => {
                    alert("프로젝트 로드중 오류 발생");
                });
        };

        if (UUID.value.length == 36) {
            fetchProject();
        } else {
            projectLoad.value = true;
        }

        const saveProject = () => {
            const token = getToken();
            const data = {
                title: title.value,
                date: date.value,
                tag: tag.value,
                github: github.value,
                web: web.value,
                a: a.value,
                b: b.value,
                c: c.value,
            };

            axios({
                method: "POST",
                url: `/manage/${UUID.value}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data,
            })
                .then((e) => {
                    if (e.data.uuid != undefined) {
                        UUID.value = e.data.uuid;
                    }

                    alert(e.data.message);
                    fetchProject();
                })
                .catch((e) => {
                    const code = e.response.status;
                    const data = e.response.data;

                    if (code == 404) {
                        alert(data.error.message);
                    } else {
                        alert(code + ": " + data.message);
                    }
                });
        };

        return {
            title: title,
            date: date,
            tag: tag,
            github: github,
            web: web,
            a: a,
            b: b,
            c: c,
            projectLoad: projectLoad,

            resize: resize,
            saveProject: saveProject,
        };
    },
};
</script>

<style scoped>
/* Editor */
.editor > .list > .item > b {
    display: inline-block;
    font-size: 16px;
    width: 50px;
    margin-right: 10px;
}

.editor > .list > .item > input {
    font-family: "Noto Sans", sans-serif;
    font-size: 16px;
    border: none;
    width: calc(100% - 120px);
    border-bottom: var(--red) 1px solid;
}

.editor > br {
    margin-top: 30px;
}

.editor > textarea {
    font-family: "Noto Sans", sans-serif;
    font-size: 16px;
    width: 100%;
    border: none;
    min-height: 200px;
    height: auto;
}

/* Tools */
.tools {
    display: flex;
    padding-top: 40px;
}

.tools > .save {
    flex: 1;
    font-size: 16px;
}
</style>
