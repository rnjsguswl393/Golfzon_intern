<template>
    <div id="app">
        <router-view name="header" />
        <router-view />
        <router-view name="footer" />
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.css";
    import "bootstrap-vue/dist/bootstrap-vue.css";
    import "animate.css";

    export default {};
</script>

<style lang="scss">
    @import "@/scss/common.scss";
</style>
