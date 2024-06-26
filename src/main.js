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

import AllAlbumScreen from "./views/admin_and_creator/album/AllAlbumScreen.vue";
import AlbumScreen from "./views/admin_and_creator/album/AlbumScreen.vue";
import NewAlbumScreen from "./views/admin_and_creator/album/NewAlbumScreen.vue";
import AddSongToAlbum from "./views/admin_and_creator/album/AddSongToAlbum.vue";
import EditAlbumScreen from "./views/admin_and_creator/album/EditAlbumScreen.vue";
import SongQueryScreen from "./views/user/SongQueryScreen.vue";
import AlbumQueryScreen from "./views/user/AlbumQueryScreen.vue";
import IndiAlbumScreen from "./views/user/IndiAlbumScreen.vue";
import NewPlaylist from "./views/user/playlist/NewPlaylist.vue";
import PlaylistScreen from "./views/user/playlist/PlaylistScreen.vue";
import AllPlaylist from "./views/user/playlist/AllPlaylist.vue";
import AddSongToPlaylist from "./views/user/playlist/AddSongToPlaylist.vue";
import EditPlaylist from "./views/user/playlist/EditPlaylist.vue";
import RemoveSongFromPlaylist from "./views/user/playlist/RemoveSongFromPlaylist.vue";
import StatsScreen from "./views/StatsScreen.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/login", component: LoginScreen },
  { path: "/register", component: RegisterScreen },
  { path: "/profile", component: ProfileScreen },
  
  { path: "/song", component: SongQueryScreen },
  { path: "/my-songs", component: MySongsScreen },
  { path: "/song/new", component: NewSongScreen },
  { path: "/song/:songId/update", component: EditSong },

  { path: '/genre', component: GenreScreen },
  { path: '/genre/new', component: NewGenre },
  { path: '/genre/:genreId/update', component: EditGenre },

  {path: '/language', component: LanguageScreen},
  {path: '/language/new', component: NewLanguage},
  {path: '/language/:languageId/update', component: EditLanguage},

  {path: '/album', component: AllAlbumScreen},
  {path: '/album/search', component: AlbumQueryScreen},
  {path: '/album/search/:albumId', component: IndiAlbumScreen},
  {path: '/album/new', component: NewAlbumScreen},
  {path: '/album/:albumId', component: AlbumScreen},
  {path: '/album/:albumId/update', component: EditAlbumScreen},
  {path: '/album/:albumId/add-song', component: AddSongToAlbum},

  {path: '/playlist', component: AllPlaylist},
  {path:'/playlist/new', component: NewPlaylist},
  {path: '/playlist/:playlistId', component: PlaylistScreen},
  {path: '/playlist/:playlistId/add-song', component: AddSongToPlaylist},
  {path: '/playlist/:playlistId/update', component: EditPlaylist},
  {path: '/playlist/:playlistId/remove-song', component: RemoveSongFromPlaylist},

  {path: '/stats', component: StatsScreen},


  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
