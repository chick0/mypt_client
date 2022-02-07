<template>
    <div class="projects">
        <h2 class="title two">프로젝트</h2>

        <router-link
            class="project"
            v-for:="project in projects"
            :to="fetchUrl(project.uuid)"
        >
            <h3 class="title three">{{ project.title }}</h3>
            <div class="tagbox">
                <router-link
                    class="badge tag"
                    v-for:="tag in project.tags"
                    :to="{ name: 'Tag', params: { tag: tag } }"
                >
                    # {{ tag }}
                </router-link>
            </div>

            <p class="date">{{ project.date }}</p>
        </router-link>
    </div>

    <div class="page" v-if="max_page != 1">
        <button class="button" @click="page -= 1">← 이전 페이지</button>
        <button class="button" @click="page += 1">다음 페이지 →</button>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import config from "@/config";

export default {
    name: "Projects",
    props: {
        path: String,
    },
    setup(props) {
        const page = ref(1);
        const max_page = ref(1);
        const projects = ref([]);
        const route = useRoute();
        const router = useRouter();

        // 쿼리 스트링으로 받은 페이지 번호가 숫자이고 0보다 크면 적용
        if (Number(route.query.page) > 0) {
            page.value = route.query.page;
        }

        // 프로젝트 불러올 함수
        const fetchProjects = () => {
            let url = config.api.host + props.path;
            if (!url.includes("page=")) {
                if (url.includes("?")) {
                    url += `&page=${page.value}`;
                } else {
                    url += `?page=${page.value}`;
                }
            }

            if (page.value > 0) {
                axios({
                    method: "GET",
                    url: url,
                })
                    .then((e) => {
                        page.value = e.data.page.this;
                        max_page.value = e.data.page.max;
                        projects.value = [];
                        Object.assign(projects.value, e.data.projects);
                    })
                    .catch((e) => {
                        page.value = max_page.value;
                        alert(e.response.data.error.message);
                    });
            } else {
                alert("이전 페이지가 없습니다.");
                page.value = 1;
            }
        };

        // 페이지 넘어가는거 체크
        watch(page, fetchProjects);
        watch(page, () => {
            // `프로젝트` 텍스트 위치로 스크롤 이동
            document.querySelector(".projects").scrollIntoView();
        });

        // 프로젝트를 API에서 불러온다면
        watch(projects, () => {
            // 조회된 프로젝트가 없다면
            if (projects.value.length == 0) {
                if (
                    confirm(
                        "* 검색된 프로젝트가 없습니다!\n" +
                            "* 메인 페이지로 이동하시겠습니까?"
                    )
                ) {
                    router.push({ name: "AboutMe" });
                }
            }
        });

        // 페이지 불러오기
        fetchProjects();

        // :to 링크 생성기
        const fetchUrl = (uuid) => {
            let url = {
                name: "Project",
                params: {
                    uuid: uuid,
                },
                query: {
                    page: page.value,
                },
            };

            // 1페이지면 페이지 쿼리스트링 추가되는거 삭제
            if (page.value == 1) {
                delete url.query;
            }
            return url;
        };

        return {
            page: page,
            max_page: max_page,
            projects: projects,
            fetchUrl: fetchUrl,
        };
    },
};
</script>

<style scoped>
/* Projects */
.projects > .project {
    display: block;
    color: #000 !important;

    padding-top: 3px;
    padding-bottom: 15px;
}

.projects > .project:hover {
    background-color: var(--hover);
}

.projects > .project > .tagbox {
    font-size: 20px;
}

.projects > .project > .tagbox > .tag {
    margin-right: 5px;
}

.projects > .project > .date {
    font-size: 16px;
    margin: 0;
}

/* Page */
.page {
    display: flex;
    text-align: center;

    padding-top: 30px;
    padding-bottom: 45px;
}
.page > .button {
    flex: 1;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 1rem;
}
</style>
