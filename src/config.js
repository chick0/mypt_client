export const api = {
    host:
        process.env.NODE_ENV === "production"
            ? "https://mypt.ch1ck.xyz"
            : "http://localhost:5000",
};

export const about_me = {
    name: "chick_0",
    email: "chick_0@ch1ck.xyz",
    github: "https://github.com/chick0",
};

export const auth = {
    service: "github",
};
