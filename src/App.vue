<template>

    <router-view />

    <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item">
                <router-link to="/" class="nav-link px-2 text-muted">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/contact" class="nav-link px-2 text-muted">Contact</router-link>
            </li>
        </ul>
        <p class="text-center text-muted">© {{ year }} chick_0</p>
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

<style>
a {
    text-decoration: none;
}
</style>
