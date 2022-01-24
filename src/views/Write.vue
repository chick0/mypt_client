<template>
    <section class="fixed-top">
        <router-link :to="{ name: 'AboutMe' }">← 뒤로 돌아가기</router-link>
    </section>

    <section class="after-top">
        <h1>Write</h1>

    </section>
</template>

<script>
export default {
    setup(){
        alert("editor ready");
    }
}
</script>