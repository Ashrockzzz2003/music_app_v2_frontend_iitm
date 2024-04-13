import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { createWebHashHistory, createRouter } from "vue-router";

import LoginScreen from "./views/auth/LoginScreen.vue";
import HomeScreen from "./views/HomeScreen.vue";
import RegisterScreen from "./views/auth/RegisterScreen.vue";
import ProfileScreen from "./views/ProfileScreen.vue";
import MySongsScreen from "./views/admin_and_creator/MySongsScreen.vue";
import NewSongScreen from "./views/admin_and_creator/NewSongScreen.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/login", component: LoginScreen },
  { path: "/register", component: RegisterScreen },
  { path: "/profile", component: ProfileScreen },
  { path: "/my-songs", component: MySongsScreen },
  { path: "/song/new", component: NewSongScreen },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
