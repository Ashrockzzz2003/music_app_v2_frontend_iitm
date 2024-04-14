<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_ALBUMS_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-if="!isLoading">
        <div class="form-container">
            <form @submit.prevent="updateAlbum" id="the_form" target="hiddenFrame">
                <h1>Update Album</h1>
                <hr />
                <div class="input-container">
                    <label for="albumName">Album Title</label>
                    <input type="text" name="albumName" id="albumName" placeholder="Enter Album's title"
                        v-model="albumName" style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="albumDescription">Tell something about the album</label>
                    <textarea type="text" name="albumDescription" id="albumDescription" placeholder="Album Description>"
                        style="width: 540px;" v-model="albumDescription"></textarea>
                </div>
                <div class="input-container">
                    <label for="albumImage">Album Cover/Poster</label>
                    <br />
                    <img :src="albumImageUrl" alt="Album Cover"
                        style="width: 540px; border-radius: 16px; margin-left: auto; margin-right: auto;" />
                    <p style="text-align: center;">Click the button below to update</p>
                    <input type="file" name="albumImage" id="albumImage" accept="image/png" style="width: 540px;" />
                </div>
                <div class="input-container">
                    <label for="albumReleaseDate">Album Release Date</label>
                    <input type="date" name="albumReleaseDate" id="albumReleaseDate"
                        placeholder="Choose Album Release Date" v-model="albumReleaseDate" style="width: 540px;"
                        required />
                </div>
                <input type="hidden" name="token" id="token" :value="token" />
                <input type="hidden" name="updateReleaseDate" id="updateReleaseDate" :value="updateReleaseDate" />
                <input type="hidden" name="updateImage" id="updateImage" :value="updateImage" />
                <div class="input-container">
                    <input type="submit" value="Update Album" />
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
            updateReleaseDate: '1',
            updateImage: '0',
            albumImageUrl: '',
            token: `Bearer ${localStorage.getItem('ma-t')}`,
        }
    },
    mounted() {
        this.getAlbum();
    },
    methods: {
        getAlbum() {
            fetch(ALL_ALBUMS_URL + "/" + this.$route.params.albumId, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ma-t')}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then((data) => {
                        data = data.data;
                        this.albumImageUrl = 'http://localhost:5000/static/album/' + this.$route.params.albumId + '.png';
                        this.albumName = data.albumName;
                        this.albumDescription = data.albumDescription;
                        this.albumReleaseDate = data.albumReleaseDate;
                    })
                } else if (res.status == 401) {
                    localStorage.clear();
                    this.$router.replace('/login');
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            })
        },
        updateAlbum() {
            const form = document.getElementById('the_form');

            form.action = ALL_ALBUMS_URL + "/" + this.$route.params.albumId + "/update";
            form.method = 'POST';

            form.enctype = 'multipart/form-data';

            // check if image was uploaded

            if (form.albumImage.files.length > 0) {
                this.updateImage = '1';
            }

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