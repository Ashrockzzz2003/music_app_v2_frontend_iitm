<script setup>
import NavBar from '@/components/NavBar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <NavBar />
    <div class="content">
        <div class="row">
            <div class="col-12">
                <i class="home_logo material-icons" style="font-size: xx-large;"><svg xmlns="http://www.w3.org/2000/svg"
                        height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />
                    </svg></i>
                <h1 class="title">Music App</h1>
                <p class="description" style="max-width: 420px;">A music app that allows you to listen to your favorite
                    songs, be a creator and release songs, albums and create your own
                    playlists.</p>
            </div>
        </div>
        <div class="row">
            <div class="bigButton">
                <RouterLink to="/login">
                    <i><svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                            <path
                                d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg></i>
                    <span class="button-text">Get Started</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped>

/* .content to middle vertically and horizontally */
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 75vh;
}

</style>