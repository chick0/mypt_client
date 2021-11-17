<template>

    <router-view />

    <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Contact</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Project</a></li>
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
