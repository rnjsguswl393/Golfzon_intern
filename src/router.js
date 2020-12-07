import Vue from "vue";
import Router from "vue-router";

import Main from "./pages/Main.vue";
import MapView from "./pages/MapView.vue";
import MainFooter from "./component/MainFooter.vue";
import ListView from "./pages/listView.vue";
import Detail from "./pages/detailView.vue";
import BookMark from "./pages/BookMark.vue";

Vue.use(Router);

export default new Router({
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/",
            name: "Main",
            components: { default: Main },
        },
        {
            path: "/mapview",
            name: "MapView",
            components: {
                default: MapView,
                footer: MainFooter,
            },
        },
        {
            path: "/listView",
            name: "ListView",
            components: {
                default: ListView,
                footer: MainFooter,
            },
        },
        
        {
            path: "/detail/:Pid",
            name: "Detail",
            components: {
                default: Detail,
                footer: MainFooter,
            },
        },
        
        {
            path: "/bookmark",
            name: "bookmark",
            components: {
                default: BookMark,
                footer: MainFooter,
            },
        },
        
    ],
});
