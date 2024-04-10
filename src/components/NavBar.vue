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
                    <li><router-link to="/register">Register</router-link></li>
                    <li><router-link to="/login">Login</router-link></li>
                </span>
            </ul>
        </nav>
    </header>
</template>