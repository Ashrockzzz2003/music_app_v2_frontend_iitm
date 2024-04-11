<template>
    <header>
        <nav>
            <ul class="nav-bar">
                <router-link class="logo" to="/">
                    <i class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24"
                            viewBox="0 -960 960 960" width="24">
                            <path
                                d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />
                        </svg></i>
                    <span class="logo-text">Music App</span>
                </router-link>
                <span class="menu">
                    <li v-if="isLoggedIn === false"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn === false"><router-link to="/login">Login</router-link></li>
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
        if (typeof(localStorage.getItem('ma-t')) === 'string' && localStorage.getItem('ma-t').length > 0 && typeof(localStorage.getItem('ma-ue')) === 'string' && localStorage.getItem('ma-ue').length > 0) {
            this.isLoggedIn = true;
            this.userEmail = localStorage.getItem('ma-ue');
        } else {
            this.isLoggedIn = false;
        }
    },
    data() {
        return {
            userEmail: "",
            isLoggedIn: false
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