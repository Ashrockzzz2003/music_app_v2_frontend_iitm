<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { NEW_ALBUM_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-if="!isLoading">
        <div class="form-container">
            <form @submit.prevent="createNewAlbum" id="the_form" target="hiddenFrame">
                <h1>New Album</h1>
                <hr />
                <div class="input-container">
                    <label for="albumName">Album Title</label>
                    <input type="text" name="albumName" id="albumName" placeholder="Enter Album's title" v-model="albumName"
                        style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="albumDescription">Tell something about the album</label>
                    <textarea type="text" name="albumDescription" id="albumDescription" placeholder="Album Description>"
                        style="width: 540px;" v-model="albumDescription"></textarea>
                </div>
                <div class="input-container">
                    <label for="albumImage">Album Cover/Poster</label>
                    <input type="file" name="albumImage" id="albumImage" accept="image/png" style="width: 540px;"
                        required />
                </div>
                <div class="input-container">
                    <label for="albumReleaseDate">Album Release Date</label>
                    <input type="date" name="albumReleaseDate" id="albumReleaseDate" placeholder="Choose Album Release Date" v-model="albumReleaseDate"
                        style="width: 540px;" required />
                </div>
                <input type="hidden" name="token" id="token" :value="token" />
                <div class="input-container">
                    <input type="submit" value="Create New Album" />
                </div>
            </form>
        </div>
    </div>

    <iframe name="hiddenFrame" style="display: none;"></iframe>


</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            albumName: '',
            albumDescription: '',
            albumReleaseDate: '',
            token: `Bearer ${localStorage.getItem('ma-t')}`,
        }
    },
    methods: {
        createNewAlbum() {
            const form = document.getElementById('the_form');

            form.action = NEW_ALBUM_URL;
            form.method = 'POST';

            form.enctype = 'multipart/form-data';

            form.submit();

            setTimeout(() => {
                this.isLoading = true;
            }, 2000);

            setTimeout(() => {
                this.$router.replace('/album');
                this.isLoading = false;
            }, 4000);
        }
    }
}
</script>