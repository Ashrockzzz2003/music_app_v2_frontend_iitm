<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ADMIN_SONG_PREFIX, ALL_SONGS_URL, CREATOR_SONGS_URL, SONG_URL_PREFIX } from '@/api';
</script>

<template>
    <div class="mainScreen">
        <NavBar />
        <LoadingScreen v-if="isLoading" />

        <div class="content bigButton">
            <router-link to="/song/new">
                <i class="material-icons">add_circle</i>
                <span class="button-text">New Song</span>
            </router-link>
        </div>

        <div style="color: white;">
            <h1 v-if="userRoleId == 1">Songs</h1>
            <h1 v-else>My Songs</h1>
        </div>

        <div style="color: white;" v-if="!isLoading && songData.length == 0">
            <p>No Songs Found</p>
        </div>

        <div v-if="!isLoading" class="songList">

            <div v-if="!isLoading && songData.length > 0" v-for="song in songData" :key="song.songId"
                id="songListElement">
                <div class="songCard" :id="song.songCardId" v-if="song.isActive == '1'">
                    <div class="songCard__image">
                        <img :src="song.songImageUrl" alt="Song Image">
                    </div>
                    <div class="songCard__details">
                        <h3>{{ song.songName }}</h3>
                        <p style="font-size: small; color: azure; margin: 0; padding: 0;"> {{ song.genreName }} | {{
                            song.userFullName }}</p>
                    </div>
                    <hr />
                    <div class="songCard__buttons">
                        <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;"
                            id="likeButton_{{song.songId}}">
                            <i class="material-icons">visibility</i>
                            <p class="button-text">{{ song.songPlaysCount }}</p>
                        </a>
                        <div class="iconRow playButton" :id="song.playButtonId"
                            @click="handlePlayPause(song.songId, `mp3`)">
                            <i class="material-icons play">play_arrow</i>
                            <i class="material-icons pause hidden">pause</i>
                            <p class="button-text">Play</p>
                        </div>
                        <a>
                            <i class="material-icons"
                                @click="lyricsModalPopup(song.songName, song.songLyrics)">lyrics</i>
                        </a>
                        <router-link :to="song.editSongUrl">
                            <i class="material-icons">edit</i>
                        </router-link>
                    </div>
                    <div class="songCard__buttons">
                        <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;"
                            id="likeButton_{{song.songId}}" @click="likeSong(song.songId)">
                            <i class="material-icons">thumb_up</i>
                            <p class="button-text">{{ song.likesCount }}</p>
                        </a>
                        <a style="cursor: pointer" @click="dislikeSong(song.songId)" id="unLikeButton_{{song.songId}}">
                            <i class="material-icons">thumb_down</i>
                        </a>
                        <a v-if="userRoleId == 1" @click="deleteSong(song.songId)">
                            <i class="material-icons play">delete</i>
                        </a>
                        <a v-if="userRoleId == 1" @click="flagSong(song.songId)">
                            <i class="material-icons play">flag</i>
                        </a>
                    </div>
                </div>
                <div class="songCard" style="border: red 1px solid;" :id="song.songCardId" v-else>
                    <div class="songCard__image">
                        <img :src="song.songImageUrl" alt="Song Image">
                    </div>
                    <div class="songCard__details">
                        <h3>{{ song.songName }}</h3>
                        <p style="font-size: small; color: azure; margin: 0; padding: 0;"> {{ song.genreName }} | {{
                            song.userFullName }}</p>
                    </div>
                    <hr />
                    <div class="songCard__buttons">
                        <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;"
                            id="likeButton_{{song.songId}}">
                            <i class="material-icons">visibility</i>
                            <p class="button-text">{{ song.songPlaysCount }}</p>
                        </a>
                        <div class="iconRow playButton" :id="song.playButtonId"
                            @click="handlePlayPause(song.songId, `mp3`)">
                            <i class="material-icons play">play_arrow</i>
                            <i class="material-icons pause hidden">pause</i>
                            <p class="button-text">Play</p>
                        </div>
                        <a>
                            <i class="material-icons"
                                @click="lyricsModalPopup(song.songName, song.songLyrics)">lyrics</i>
                        </a>
                    </div>
                    <div class="songCard__buttons">
                        <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;"
                            id="likeButton_{{song.songId}}" @click="likeSong(song.songId)">
                            <i class="material-icons">thumb_up</i>
                            <p class="button-text">{{ song.likesCount }}</p>
                        </a>
                        <a style="cursor: pointer" @click="dislikeSong(song.songId)" id="unLikeButton_{{song.songId}}">
                            <i class="material-icons">thumb_down</i>
                        </a>
                        <a v-if="userRoleId == 1" @click="deleteSong(song.songId)">
                            <i class="material-icons play">delete</i>
                        </a>
                    </div>
                    <p style="color: red; text-align: center; margin: 0;">This song is flagged by Admin</p>
                    <p style="color: grey; font-size: x-small; text-align: center;">It will not be shown to users.</p>
                    <div class="songCard__buttons" v-if="userRoleId == 1">
                        <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;" @click="flagSong(song.songId)">
                            <i class="material-icons">verified</i>
                            <p class="button-text">RePublish song</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal">
        <div class="modal-content">
            <div class="form-container">
                <span class="close" @click="closeModal()">&times;</span>
                <h2 id="modalTitle"></h2>
            </div>
            <p id="lyricsBody"></p>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            songData: [],
            audioElements: {},
            lastPausedId: null,
            userRoleId: localStorage.getItem('ma-ur'),
        }
    },
    mounted() {
        this.getCreatorSongs();
    },

    methods: {
        logout() {
            localStorage.clear()
            this.isLoggedIn = false;
            this.$router.push('/');
        },
        getCreatorSongs() {
            this.isLoading = true;

            let url = CREATOR_SONGS_URL;

            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                },
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {

                        this.songData = data["data"];

                        console.log(this.songData);

                        for (let i = 0; i < this.songData.length; i++) {
                            this.songData[i].songImageUrl = `http://127.0.0.1:5000/static/song/poster/${this.songData[i].songId}.png`;
                            this.songData[i].songCardId = `songCard_${this.songData[i].songId}`;
                            this.songData[i].playButtonId = `playButton_${this.songData[i].songId}`;
                            this.songData[i].editSongUrl = `/song/${this.songData[i].songId}/update`;

                        }

                        this.isLoading = false;
                    });
                } else if (res.status === 401) {
                    // Logout User
                    this.logout();
                } else {
                    alert("Something went wrong");
                }
            });
        },
        lyricsModalPopup(songName, songLyrics) {
            console.log(songName, songLyrics);
            const mainScreen = document.querySelector('.mainScreen');
            mainScreen.style.filter = 'blur(10px)';
            const modal = document.querySelector('.modal');
            const modalTitle = document.querySelector('#modalTitle');
            const lyricsBody = document.querySelector('#lyricsBody');

            songLyrics = songLyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');

            modalTitle.innerHTML = songName;
            lyricsBody.innerHTML = songLyrics;

            modal.style.display = 'block';
        },
        closeModal() {
            const modal = document.querySelector('.modal');
            modal.style.display = 'none';
            const mainScreen = document.querySelector('.mainScreen');
            mainScreen.style.filter = 'blur(0px)';
        },
        handlePlayPause(songId, songFormat) {
            const playButton = document.querySelector(`#playButton_${songId}`);
            const songCard = document.querySelector(`#songCard_${songId}`);

            if (this.audioElements[songId] != undefined) {
                if (this.audioElements[songId].paused) {
                    this.handlePlay(songId);
                } else {
                    this.handlePause(songId);
                }
            } else {
                const audioUrl = `http://127.0.0.1:5000/static/song/audio/${songId}.${songFormat}`;
                const audioElement = new Audio(audioUrl);
                this.audioElements[songId] = audioElement;

                audioElement.addEventListener('ended', () => {
                    this.handlePause(songId);
                });

                this.handlePlay(songId);
            }
        },
        handlePlay(songId) {
            const playButton = document.querySelector(`#playButton_${songId}`);
            const songCard = document.querySelector(`#songCard_${songId}`);

            const playIcon = playButton.querySelector('.play');
            const pauseIcon = playButton.querySelector('.pause');
            const buttonText = playButton.querySelector('.button-text');

            const audioElement = this.audioElements[songId];

            // stop all other songs
            for (const key in this.audioElements) {
                if (key != songId) {
                    const playButton = document.querySelector(`#playButton_${key}`);
                    const songCard = document.querySelector(`#songCard_${key}`);

                    const playIcon = playButton.querySelector('.play');
                    const pauseIcon = playButton.querySelector('.pause');
                    const buttonText = playButton.querySelector('.button-text');

                    this.audioElements[key].pause();
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                    buttonText.innerHTML = 'Play';
                    songCard.style.border = '1px solid rgba(41, 42, 45, 0.4)';
                }
            }


            audioElement.play();
            playIcon.classList.toggle('hidden');
            pauseIcon.classList.toggle('hidden');
            buttonText.innerHTML = 'Pause';
            songCard.style.border = '1px solid #e2f8f6d7';
        },
        handlePause(songId) {
            const playButton = document.querySelector(`#playButton_${songId}`);
            const songCard = document.querySelector(`#songCard_${songId}`);

            const audioElement = this.audioElements[songId];

            const playIcon = playButton.querySelector('.play');
            const pauseIcon = playButton.querySelector('.pause');
            const buttonText = playButton.querySelector('.button-text');

            audioElement.pause();
            playIcon.classList.toggle('hidden');
            pauseIcon.classList.toggle('hidden');
            buttonText.innerHTML = 'Play';
            songCard.style.border = '1px solid rgba(41, 42, 45, 0.4)';
        },
        async likeSong(songId) {
            this.isLoading = true;

            try {
                const url = SONG_URL_PREFIX + "/" + songId + '/like';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    for (let i = 0; i < this.songData.length; i++) {
                        if (this.songData[i].songId === songId) {
                            this.songData[i].likesCount += 1;
                            break;
                        }
                    }
                } else if (response.status === 401) {
                    // Logout User
                    this.logout();
                } else if (response.status === 400) {
                    const data = await response.json();
                    alert(data['message']);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong');
            } finally {
                this.isLoading = false;
            }

        },

        async dislikeSong(songId) {
            this.isLoading = true;

            try {
                const url = SONG_URL_PREFIX + "/" + songId + '/dislike';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    for (let i = 0; i < this.songData.length; i++) {
                        if (this.songData[i].songId === songId) {
                            this.songData[i].likesCount -= 1;
                            break;
                        }
                    }
                } else if (response.status === 401) {
                    // Logout User
                    this.logout();
                } else if (response.status === 400) {
                    const data = await response.json();
                    alert(data['message']);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong');
            } finally {
                this.isLoading = false;
            }
        },
        async deleteSong(songId) {
            this.isLoading = true;

            try {
                const url = ADMIN_SONG_PREFIX + "/" + songId + '/delete';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    this.getCreatorSongs();
                } else if (response.status === 401) {
                    // Logout User
                    this.logout();
                } else if (response.status === 400) {
                    const data = await response.json();
                    alert(data['message']);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong');
            } finally {
                this.isLoading = false;
            }

        },
        async flagSong(songId) {
            this.isLoading = true;
            try {
                const url = ADMIN_SONG_PREFIX + "/" + songId + '/toggle-status';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    this.getCreatorSongs();
                } else if (response.status === 401) {
                    // Logout User
                    this.logout();
                } else if (response.status === 400) {
                    const data = await response.json();
                    alert(data['message']);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong');
            } finally {
                this.isLoading = false;
            }

        },
    }
}
</script>