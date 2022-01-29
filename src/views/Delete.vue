<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>프로젝트 삭제중입니다...</p>
    </section>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { gate_check } from '@/check';
import config from '@/config';
import axios from 'axios';

export default {
    setup(){
        // gate_check
        if(gate_check()){
            const route = useRoute();
            const router = useRouter();
            const uuid = route.params.uuid;
            const token = sessionStorage.getItem("mypt_token");

            if(
                confirm(
                    "* 프로젝트를 삭제할까요?"
                )
            ){
                axios({
                    method: "DELETE",
                    url: config.api.host + `/manage/${uuid}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then((e) => {
                    alert(e.data.message);
                    router.push({ name: "AboutMe" });
                }).catch((e) => {
                    const code = e.response.status;
                    const data = e.response.data;

                    if(code == 404){
                        alert(data.error.message);
                    } else {
                        alert(code + ": " + data.message);
                    }

                    router.push({ name: "Project", params:{ uuid: uuid } });
                });
            } else {
                alert("프로젝트 삭제가 취소되었습니다.");
                router.push({ name: "Project", params:{ uuid: uuid } });
            }
        }
    }
}
</script>