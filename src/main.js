import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { createWebHashHistory, createRouter } from "vue-router";

import LoginScreen from "./views/auth/LoginScreen.vue";
import HomeScreen from "./views/HomeScreen.vue";
import RegisterScreen from "./views/auth/RegisterScreen.vue";
import ProfileScreen from "./views/ProfileScreen.vue";

import MySongsScreen from "./views/admin_and_creator/song/MySongsScreen.vue";
import NewSongScreen from "./views/admin_and_creator/song/NewSongScreen.vue";
import EditSong from "./views/admin_and_creator/song/EditSong.vue";

import NewGenre from "./views/admin_and_creator/genre/NewGenre.vue";
import GenreScreen from "./views/admin_and_creator/genre/GenreScreen.vue";
import EditGenre from "./views/admin_and_creator/genre/EditGenre.vue";

import NewLanguage from "./views/admin_and_creator/language/NewLanguage.vue";
import LanguageScreen from "./views/admin_and_creator/language/LanguageScreen.vue";
import EditLanguage from "./views/admin_and_creator/language/EditLanguage.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/login", component: LoginScreen },
  { path: "/register", component: RegisterScreen },
  { path: "/profile", component: ProfileScreen },
  { path: "/my-songs", component: MySongsScreen },
  { path: "/song/new", component: NewSongScreen },
  { path: "/song/:songId/update", component: EditSong },

  { path: '/genre', component: GenreScreen },
  { path: '/genre/new', component: NewGenre },
  { path: '/genre/:genreId/update', component: EditGenre },

  {path: '/language', component: LanguageScreen},
  {path: '/language/new', component: NewLanguage},
  {path: '/language/:languageId/update', component: EditLanguage},


  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
