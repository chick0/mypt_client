<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'AboutMe' }">← 뒤로 돌아가기</router-link>
    </section>

    <section class="head">
        <h1 class="title one">태그 검색</h1>
        <p class="text"><span class="badge primary"># {{ tag }}</span> (와)과 관련된 프로젝트를 확인하고 있습니다.</p>
    </section>

    <section>
        <Projects :path="path" :key="trash"></Projects>
    </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Projects from '@/component/Projects.vue';

export default {
    components: {
        Projects
    },
    setup(){
        const route = useRoute();
        const tag = ref();
        const old = ref();
        const path = ref(); // 요청할 API 경로
        const trash = ref(0);

        // 라우터 링크로 넘어오면 상관 없지만,
        // 새로고침 하거나 링크로 들어오면 Array로 인식됨.
        //   => 한글 인식 이슈 해결을 위해 발생된 문제
        const cleanTag = () => {
            if(typeof tag.value == "object"){
                tag.value = tag.value[0];
            }

            // 태그 정돈이 끝나면 API 경로 업데이트
            path.value = `/api/tag?tag=${tag.value}`;

            // 옛날 값과 바뀐 태그가 다르다면
            if(tag.value != old.value){
                // 쓰레기 값 1증가 시키기
                trash.value += 1;

                // 옛날 값 업데이트
                old.value = tag.value;
            }

        };

        // 태그 변동 감지기를 설치하고 값을 변경
        watch(tag, cleanTag);
        tag.value = route.params.tag;
        old.value = tag.value; // 초기 값 수동 지정

        // 다른 태그로 넘어가는지 감시하는 감지기
        watch(() => route.params.tag, () => {
            // 그러면 태그 변동 감지기 작동시키기
            tag.value = route.params.tag;
        });

        return {
            tag: tag,
            path: path,
            trash: trash
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

.head > .text {
    font-size: 26px;
    font-weight: 200 !important;

    margin-top: -10px;
}
</style>