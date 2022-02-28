const tokenKey = "mypt_token";

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function isLogin() {
    const token = getToken();

    return token != null && token.length > 0;
}

export function doLogin(token) {
    localStorage.setItem(tokenKey, token);
}

export function clearLogin() {
    localStorage.removeItem(tokenKey);
}
