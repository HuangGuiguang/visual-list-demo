import Vue from "vue";
import VueRouter from "vue-router";
import BaseVisualList from "../views/BaseVisualList.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "baseVisualList",
        component: BaseVisualList,
    },
    {
        path: "/highLevelVisualList",
        name: "highLevelVisualList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "@/views/HighLevelVisualList.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
