<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_PLAYLIST_URL, SONG_URL_PREFIX } from '@/api';
</script>

<template>
    <div class="mainScreen">
        <NavBar />
        <LoadingScreen v-if="isLoading" />
        <div class="content" v-else>
            <h1 style="margin-top: 0; margin-bottom: 2px">{{ albumData.playlistName }}</h1>
            <p style="margin-top: 0; margin-bottom: 2px;">{{ albumData.playlistDescription }}</p>

            <div v-if="!isLoading" class="songList">

                <div v-if="!isLoading && songData.length > 0" v-for="song in songData" :key="song.songId"
                    id="songListElement">
                    <div class="songCard" :id="song.songCardId">
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
                            <a style="cursor: pointer" @click="dislikeSong(song.songId)"
                                id="unLikeButton_{{song.songId}}">
                                <i class="material-icons">thumb_down</i>
                            </a>
                        </div>
                        <div class="songCard__buttons">
                            <a class="iconRow playButton" style="cursor: pointer; background-image: none; color: white;"
                                id="likeButton_{{song.songId}}"
                                @click="addSongToPlaylist(albumData.playlistId, song.songId)">
                                <i class="material-icons">add_circle</i>
                                <p class="button-text">Add song to Playlist</p>
                            </a>
                        </div>
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
            albumData: {},
            songData: [],
            audioElements: {},
            lastPausedId: null,
            token: `Bearer ${localStorage.getItem('ma-t')}`,
            userRoleId: localStorage.getItem('ma-ur'),
            albumId: this.$route.params.playlistId,
            newSongToAlbumRoute: `/playlist/${this.$route.params.playlistId}/add-song`,
        }
    },
    mounted() {
        this.fetchAlbumData();
    },
    methods: {
        fetchAlbumData() {
            this.isLoading = true;
            fetch(ALL_PLAYLIST_URL + "/" + this.albumId + "/not-in-playlist", {
                method: 'GET',
                headers: {
                    "Authorization": this.token,
                }
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then((data) => {
                        this.albumData = data['data'];
                        this.songData = data['songs'];

                        for (let i = 0; i < this.songData.length; i++) {
                            this.songData[i].songImageUrl = `http://127.0.0.1:5000/static/song/poster/${this.songData[i].songId}.png`;
                            this.songData[i].songCardId = `songCard_${this.songData[i].songId}`;
                            this.songData[i].playButtonId = `playButton_${this.songData[i].songId}`;
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

                this.markPlayed(songId);

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
        async markPlayed(songId) {

            try {
                const url = SONG_URL_PREFIX + "/" + songId + '/play';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    for (let i = 0; i < this.songData.length; i++) {
                        if (this.songData[i].songId === songId) {
                            this.songData[i].songPlaysCount += 1;
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

        async addSongToPlaylist(albumId, songId) {
            this.isLoading = true;

            try {
                const url = ALL_PLAYLIST_URL + "/" + albumId + '/add-song/' + songId;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    this.fetchAlbumData();
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