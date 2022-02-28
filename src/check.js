const tokenKey = "mypt_token";

export function isLogin() {
    const token = localStorage.getItem(tokenKey);

    return token != null && token.length > 0;
}
