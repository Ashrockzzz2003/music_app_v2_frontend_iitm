import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { createWebHashHistory, createRouter } from "vue-router";

import LoginScreen from "./views/auth/LoginScreen.vue";
import HomeScreen from "./views/HomeScreen.vue";
import RegisterScreen from "./views/auth/RegisterScreen.vue";
import ProfileScreen from "./views/ProfileScreen.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/login", component: LoginScreen },
  { path: "/register", component: RegisterScreen },
  { path: "/profile", component: ProfileScreen },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
