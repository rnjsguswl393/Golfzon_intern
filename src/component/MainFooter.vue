<template>
    <div class="footer">
        <ul class="footer_nav">
            <li>
                <router-link to="/"><b-icon-house-fill></b-icon-house-fill></router-link>
            </li>
            <li>
                <router-link to="/Mapview"><b-icon-map-fill></b-icon-map-fill></router-link>
            </li>
            <li>
                <router-link to="/Listview"><b-icon-file-earmark-text></b-icon-file-earmark-text></router-link>
            </li>
            <li>
                <router-link to="/bookmark"><b-icon-bookmark-star></b-icon-bookmark-star></router-link>
            </li>
            <li @click="$router.go(-1)">
                <i class="fas fa-chevron-left" style="color: #fff"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {},
        components: {},
        methods: {},
    };
</script>

<style lang="scss" scoped>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 101;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        padding: 20px 0;
        background-color: #000;
        // overflow: hidden;
        text-align: center;
        .footer_nav {
            li {
                display: inline-block;
                margin-left: 25px;
                margin-right: 30px;
                font-size: 20px;
            }
            a {
                color: #fff;
            }
        }
    }
</style>
