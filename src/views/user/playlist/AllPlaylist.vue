<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_PLAYLIST_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="bigButton">
        <router-link to="/playlist/new">
            <i class="material-icons">add_circle</i>
            Create New Playlist
        </router-link>
    </div>
    <div v-if="!isLoading">
        <h1 style="color: white;">My Playlists</h1>

        <!-- each playlist has playlistName, playlistDescription, isPublic, userFullName -->
        <div class="genreList">
            <div v-for="genre in playlistData" class="genreCard">
                <div class="about">
                    <h3>{{ genre['playlistName'] }}</h3>
                    <p>{{ genre['playlistDescription'] }}</p>
                </div>
                <hr />
                <div class="genreCard__buttons">
                    <router-link :to="genre['playlistEditUrl']">
                        <i class="material-icons">edit</i>
                    </router-link>
                    <router-link :to="genre.playlistUrl" class="iconRow playButton" style="color: black;">
                        <i class="material-icons play">library_music</i>
                        <p class="button-text">View Playlist</p>
                    </router-link>
                </div>
                <hr />
                <div class="about">
                    <p>by | you</p>
                </div>
            </div>
        </div>

        <h1 v-if="publicPlaylistData.length > 0" style="color: white;">Public Playlists</h1>
        <div class="genreList">
            <div v-for="genre in publicPlaylistData" class="genreCard">
                <div class="about">
                    <h3>{{ genre['playlistName'] }}</h3>
                    <p>{{ genre['playlistDescription'] }}</p>
                </div>
                <hr />
                <div class="genreCard__buttons">
                    <router-link :to="genre.playlistUrl" class="iconRow playButton" style="color: black;">
                        <i class="material-icons play">library_music</i>
                        <p class="button-text">View Playlist</p>
                    </router-link>
                </div>
                <hr />
                <div class="about">
                    <p>Added by: {{ genre['userFullName'] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.genreList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 32px;
    color: white;
}

.genreList .genreCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: rgba(41, 42, 45, 0.4);
    border-radius: 16px;
    border: 1px solid rgba(41, 42, 45);
}

.genreList .genreCard .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.genreList .genreCard .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.genreList .genreCard .about h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
}

.genreList .genreCard .about p {
    font-size: 0.7rem;
    margin: 0;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(146, 148, 154);
}

.genreList .genreCard:hover {
    background-color: rgba(41, 42, 45, 0.8);
    border: 1px solid rgba(41, 42, 45, 0.8);
}

.genreList .genreCard .genreCard__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.genreList .genreCard .genreCard__buttons a {
    padding: 4px;
    border: 1px solid rgba(41, 42, 45);
    border-radius: 8px;
    margin-left: 4px;
    margin-right: 4px;
    cursor: pointer;
}

.genreList .genreCard .genreCard__buttons a:hover {
    background-color: rgba(41, 42, 45, 0.6);
}

.bigButton {
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(41, 42, 45);
    padding: 16px;
    border-radius: 16px;
    cursor: pointer;
    margin: 4px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    color: white;
}

.bigButton i {
    vertical-align: middle;
    text-decoration: none;
    font-size: xx-large;
    background-image: linear-gradient(315deg, #17d7f9 10%, #a9f9f8 57%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 200ms ease-in;
    border-radius: 50%;
    position: relative;
    margin-right: 4px;
}


.bigButton:hover {
    background-color: rgba(41, 42, 45, 0.4);
}

hr {
    width: 100%;
    border: 0.5px solid rgba(41, 42, 45);
}
</style>

<script>
export default {
    name: 'AllPlaylistScreen',
    data() {
        return {
            playlistData: [],
            publicPlaylistData: [],
            isLoading: true,
        }
    },
    mounted() {
        this.fetchPlaylistData();
    },
    methods: {
        async fetchPlaylistData() {
            this.isLoading = true;

            fetch(ALL_PLAYLIST_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('ma-t')}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        this.playlistData = data.data;
                        this.publicPlaylistData = data.public;

                        for(let i = 0; i < this.playlistData.length; i++) {
                            this.playlistData[i]['playlistEditUrl'] = `/playlist/${this.playlistData[i]['playlistId']}/update`;
                            this.playlistData[i]['playlistUrl'] = `/playlist/${this.playlistData[i]['playlistId']}`;
                        }

                        for (let i = 0; i < this.publicPlaylistData.length; i++) {
                            this.publicPlaylistData[i]['playlistEditUrl'] = `/playlist/${this.publicPlaylistData[i]['playlistId']}/update`;
                            this.publicPlaylistData[i]['playlistUrl'] = `/playlist/${this.publicPlaylistData[i]['playlistId']}`;
                        }

                        this.isLoading = false;
                    })
                } else if (res.status == 401) {
                    localStorage.clear();
                    this.$router.push('/login');
                } else {
                    alert('Something went wrong');
                }
            })
        }
    }
}
</script>