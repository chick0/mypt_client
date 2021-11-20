<template>

    <router-view />

    <footer class="py-3 my-4 text-center">
        <router-link to="/" class="text-muted">&copy; {{ year }} chick_0</router-link>
    </footer>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    setup(){
        const today = new Date();

        return {
            year: today.getUTCFullYear()
        }
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
