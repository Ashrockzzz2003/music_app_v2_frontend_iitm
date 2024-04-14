<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { NEW_PLAYLIST_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
        <div class="form-container">
            <form @submit.prevent="createPlaylist">
                <h1>New Playlist</h1>
                <hr />
                <div class="input-container">
                    <label for="playlistName">Playlist Name</label>
                    <input type="text" name="playlistName" id="playlistName" placeholder="Enter playlist name" v-model="playlistName" style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="playlistDescription">Tell something about the playlist (Optional)</label>
                    <textarea type="text" name="playlistDescription" id="playlistDescription" placeholder="Playlist Description>" v-model="playlistDescription" style="width: 540px;"></textarea>
                </div>
                <!-- Gender -->
                <div class="input-container">
                    <label for="isPublic">Want it to be Public?</label>
                    <div class="radioButtonGroup">
                        <div class="radioOption">
                            <input type="radio" value="1" v-model="isPublic" name="isPublic" id="maleGender" required />
                            <label for="maleGender">Yes</label>
                        </div>
                        <div class="radioOption">
                            <input type="radio" value="0" v-model="isPublic" name="isPublic" id="femaleGender" required />
                            <label for="femaleGender">No</label>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" value="Create Playlist" class="btn" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewPlaylist',
    data() {
        return {
            isLoading: false,
            playlistName: '',
            playlistDescription: '',
            isPublic: 1
        }
    },
    methods: {
        async createPlaylist() {
            this.isLoading = true;

            const response = await fetch(NEW_PLAYLIST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('ma-t')
                },
                body: JSON.stringify({
                    playlistName: this.playlistName,
                    playlistDescription: this.playlistDescription,
                    isPublic: this.isPublic,
                    hasImage: '0'
                })
            });
            this.isLoading = false;
            if (response.status === 200) {
                const data = await response.json();
                this.$router.push('/playlist');
            } else if (response.status === 401) {
                alert('Unauthorized');
            } else if (response.status === 400) {
                const data = await response.json();

                alert(data.message);
            } else {
                alert('Something went wrong');
            }
        }
    }
}
</script>