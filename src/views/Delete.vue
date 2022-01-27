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

            axios({
                method: "DELETE",
                url: config.api.host + `/manage/${uuid}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((e) => {
                console.log(e);
                router.push({ name: "AboutMe" });
            }).catch((e) => {
                const code = e.response.status;
                const data = e.response.data;

                if(code == 404){
                    alert(data.error.message);
                } else {
                    alert(code + ": " + data.message);
                }
            });
        }
    }
}
</script>