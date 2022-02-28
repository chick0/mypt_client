<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'Home', query: { page: $route.query.page } }">
            ← 메인 페이지로 돌아가기
        </router-link>
    </section>

    <section class="head after-top" v-if="projectLoad == true">
        <h1 class="title one" id="top">{{ project.title }}</h1>
        <p class="date">{{ project.date }}</p>

        <ul class="list">
            <li class="item" v-if="checkLength(project.github)">
                <span class="badge dark big">Github</span>
                <a :href="project.github" target="_blank" rel="noreferrer">
                    {{ project.github_preview }}
                </a>
            </li>
            <li class="item" v-if="checkLength(project.web)">
                <span class="badge primary big">Web</span>
                <a :href="project.web" target="_blank">{{ project.web }}</a>
            </li>
        </ul>
    </section>

    <section v-if="logined == true">
        <router-link
            class="button yellow margin"
            :to="{ name: 'Project.Edit', params: { uuid: $route.params.uuid } }"
        >
            수정하기
        </router-link>
        <router-link
            class="button red"
            :to="{
                name: 'Project.Delete',
                params: { uuid: $route.params.uuid },
            }"
        >
            삭제하기
        </router-link>
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

    <section class="tagbox">
        <router-link
            class="badge tag"
            v-for:="tag in project.tags"
            :to="{ name: 'Tag.View', params: { tag: tag } }"
        >
            # {{ tag }}
        </router-link>
    </section>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setOptions, Renderer, parse } from "marked";
import axios from "axios";
import { api } from "@/config";
import { isLogin } from "@/login";

export default {
    name: "view-project",
    setup() {
        const renderer = new Renderer();
        const router = useRouter();
        const projectLoad = ref(false);
        const project = ref({
            content: {
                a: "",
                b: "",
                c: "",
            },
            date: "",
            github: "",
            github_preview: "",
            tag: "",
            title: "",
            web: "",
        });

        const route = useRoute();
        const uuid = route.params.uuid;

        if (uuid.length != 36) {
            router.push({ name: "Home" });
        }

        renderer.link = (href, title, text) => {
            let url = new URL(href);
            let target = "_blank";

            if (window.location.host == url.host) {
                target = "_self";
            }

            return `<a target="${target}" rel="noreferrer" href="${href}">${text}</a>`;
        };

        setOptions({
            gfm: true,
            renderer: renderer,
        });

        axios({
            method: "GET",
            baseURL: api.host,
            url: `/project/${uuid}`,
        })
            .then((resp) => {
                // API에서 불러온 데이터 적용
                Object.assign(project.value, resp.data);

                // 마크다운만 렌더링해서 다시 적용
                const content = resp.data.content;
                project.value.content = {
                    a: parse(content.a),
                    b: parse(content.b),
                    c: parse(content.c),
                };

                // 프로젝트 로딩 완료
                projectLoad.value = true;

                if (!isLogin() && project.value.title.includes("[작성중]")) {
                    if (
                        confirm(
                            "* 해당 프로젝트의 설명은 작성 중입니다.\n" +
                                "* 메인 페이지로 이동하시겠습니까?"
                        )
                    ) {
                        const page = route.query.page;

                        if (page == undefined || Number(page) < 1) {
                            router.push({ name: "Home" });
                        } else {
                            router.push({
                                name: "Home",
                                page: page,
                            });
                        }
                    }
                }
            })
            .catch((e) => {
                alert(e.response.data.error.message);
                router.push({ name: "Home" });
            });

        const checkLength = (text) => {
            if (text == null) {
                return false;
            } else if (text.length == 0) {
                return false;
            } else {
                return true;
            }
        };

        return {
            project,
            projectLoad,
            checkLength,

            logined: isLogin(),
        };
    },
};
</script>

<style scoped>
/* Head */
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
}

.body > .pad > .content {
    font-size: 16px;
    line-height: 26px;
}

/* Tag Box */
.tagbox {
    font-size: 20px;

    padding-top: 20px;
    padding-bottom: 30px;
}

.tagbox > .tag {
    margin-right: 5px;
}
</style>
