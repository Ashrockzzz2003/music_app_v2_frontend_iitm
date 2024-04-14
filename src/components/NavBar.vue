<template>
    <header>
        <nav>
            <ul class="nav-bar">
                <router-link class="logo" to="/">
                    <i class="material-icons">music_note</i>
                    <span class="logo-text">Music App</span>
                </router-link>
                <span class="menu">
                    <li v-if="isLoggedIn === true && userRoleId != 1"><router-link to="/song">Music</router-link></li>
                    <li v-if="isLoggedIn === true && userRoleId != 1"><router-link to="/album/search">Album</router-link></li>
                    <li v-if="isLoggedIn === true"><router-link to="/playlist">Playlist</router-link></li>

                    <li v-if="isLoggedIn === false"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn === false"><router-link to="/login">Login</router-link></li>

                    <li v-if="(userRoleId == 2 || userRoleId == 1)"><router-link to="/my-songs">{{ userRoleId == 2 ? "My Songs" : "Songs"}}</router-link></li>
                    <li v-if="(userRoleId == 2 || userRoleId == 1)"><router-link to="/album">{{ userRoleId == 2 ? "My Albums" : "Albums"}}</router-link></li>
                    <li v-if="(userRoleId == 2 || userRoleId == 1)"><router-link to="/genre">Genre</router-link></li>
                    <li v-if="(userRoleId == 2 || userRoleId == 1)"><router-link to="/language">Language</router-link></li>

                    <li v-if="isLoggedIn === true"><router-link to="/profile">Profile</router-link></li>
                    <li v-if="isLoggedIn === true"><a href="/" @click="logout">Logout</a></li>
                </span>
            </ul>
        </nav>
    </header>
</template>


<script>
export default {
    name: 'NavBar',
    mounted() {
        if (typeof(localStorage.getItem('ma-t')) === 'string' && localStorage.getItem('ma-t').length > 0) {
            this.isLoggedIn = true;
            this.userEmail = localStorage.getItem('ma-ue') ?? "";
            this.userRoleId = localStorage.getItem('ma-ur') ?? -1;
        } else {
            this.isLoggedIn = false;
        }
    },
    data() {
        return {
            userEmail: "",
            isLoggedIn: false,
            userRoleId: -1,
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.isLoggedIn = false;
            this.$router.push('/');
        }
    }
}
</script>