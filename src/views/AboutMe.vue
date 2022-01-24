<template>
    <section class="aboutme">
        <h1 class="title one">{{ about_me.name }}</h1>

        <ul class="list">
            <li class="item">
                <span class="badge dark big">Github</span>
                <a :href="about_me.github" target="_blank" rel="noreferrer">{{ about_me.github }}</a>
            </li>
            <li class="item">
                <span class="badge primary big">E-Mail</span>
                <a :href="'mailto:'+about_me.email" target="_blank">{{ about_me.email }}</a>
            </li>
        </ul>
    </section>

    <section>
        <Projects :path="path"></Projects>
    </section>
</template>

<script>
import config from '@/config';

import Projects from '@/component/Projects.vue';

export default {
    components: {
        Projects
    },
    setup(){
        return {
            about_me: config.about_me,
            path: "/api/projects"
        }
    },
}
</script>

<style scoped>
/* About Me */
.aboutme {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 30px;
}

.aboutme > .list > .item > .badge {
    width: 50px !important;
    margin-right: 10px !important;
}

/* Projects */
.projects > .project{
    display: block;
    color: var(--black) !important;

    padding-top: 3px;
    padding-bottom: 15px;
}

.projects > .project:hover{
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