const tokenKey = "mypt_token";

export function isLogin() {
    const token = localStorage.getItem(tokenKey);

    return token != null && token.length > 0;
}

export function doLogin(token) {
    localStorage.setItem(tokenKey, token);
}

export function clearLogin() {
    localStorage.removeItem(tokenKey);
}
