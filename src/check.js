import { useRouter } from "vue-router";

export function is_login() {
    const token = localStorage.getItem("mypt_token");

    return token != null && token.length > 0;
}

export function gate_check() {
    if (!is_login()) {
        const router = useRouter();

        alert("로그인 상태가 아닙니다.");
        router.push({ name: "AboutMe" });

        return false;
    } else {
        return true;
    }
}
