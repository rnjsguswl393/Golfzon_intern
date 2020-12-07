<template>
    <div class="container_main">
        <div class="content">
            <div class="logo">
                <img src="/images/logo.png" class="animate__animated animate__zoomInDown" alt="hit the ball" />
            </div>

            <hgroup>
                <h1 class="ttl">HIT THE BALL</h1>
                <p class="spot">PLAY DIFFERENT</p>
            </hgroup>

            <div class="btns">
                <router-link to="/MapView" class="btn_main"><b-button block variant="danger">지도에서 보기</b-button></router-link>
                <router-link to="/ListView" class="btn_main"><b-button block variant="info">리스트로 보기</b-button></router-link>
            </div>
        </div>
        <div class="copy">ⓒ GOLFZON. All rights reserved.</div>
        <div class="bg"></div>
    </div>
</template>
<script>
    export default {
        name: "index",
        components: {},
    };
</script>

<style lang="scss" scoped>
    @import "../scss/main.scss";
</style>
