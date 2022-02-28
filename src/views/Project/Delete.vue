<template>
    <section>
        <h1 class="title two">잠시만요!</h1>
        <p>프로젝트 삭제중입니다...</p>
    </section>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/config";
import { isLogin, getToken } from "@/login";

export default {
    name: "remove-project",
    setup() {
        const router = useRouter();
        if (!isLogin()) {
            router.push({ name: "Home" });
            return {};
        }

        const route = useRoute();
        const uuid = route.params.uuid;
        const token = getToken();

        if (confirm("* 프로젝트를 삭제할까요?")) {
            axios({
                method: "DELETE",
                baseURL: api.host,
                url: `/manage/${uuid}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((e) => {
                    alert(e.data.message);
                    router.push({ name: "Home" });
                })
                .catch((e) => {
                    const code = e.response.status;
                    const data = e.response.data;

                    if (code == 404) {
                        alert(data.error.message);
                    } else {
                        alert(code + ": " + data.message);
                    }

                    router.push({
                        name: "Project.View",
                        params: { uuid: uuid },
                    });
                });
        } else {
            alert("프로젝트 삭제가 취소되었습니다.");
            router.push({ name: "Project.View", params: { uuid: uuid } });
        }

        return {};
    },
};
</script>
