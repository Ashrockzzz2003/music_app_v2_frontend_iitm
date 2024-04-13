<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { PROFILE_URL, REGISTER_AS_CREATOR_URL, SONG_URL_PREFIX } from '@/api';
</script>

<template>
    <div class="mainScreen">
        <NavBar />
        <LoadingScreen v-if="isLoading" />
        <!--
            {
                "createdAt": "2024-04-13 05:58:22",
                "lastUpdatedAt": "2024-04-13 05:58:22",
                "userAccountStatus": "1",
                "userDob": "2003-10-15",
                "userEmail": "shettyajoy@gmail.com",
                "userFullName": "Ajoy Shetty",
                "userGender": "F",
                "userId": 3,
                "userPassword": "shettyajoy",
                "userRoleId": 3
            }
        -->
        <div class="profile-card" v-if="!isLoading">
            <div class="profile-image">
                <img src="https://robohash.org/{{ profileData.userEmail }}" alt="Profile Image">
            </div>

            <div class="profile-details">
                <h2>{{ profileData.userFullName }}</h2>
                <p>{{ profileData.userEmail }}</p>
                <p>
                    {{
                        new Date(profileData.userDob).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                            day: 'numeric',
                        })
                    }}
                </p>
                <p v-if="profileData.userRoleId == 1">Admin</p>
                <p v-else-if="profileData.userRoleId == 2">Creator</p>
            </div>
        </div>

        <div v-if="!isLoading && profileData.userRoleId == 3" class="x-card">
            <h2>Become a Creator</h2>
            <p>Upload your songs and share them with the world!</p>
            <div class="bigButton" @click="registerAsCreator">
                <a >
                    <span class="button-text">Register as Creator</span>
                </a>
            </div>
        </div>

        <h2 v-if="!isLoading" class="history_title">Play History</h2>

        <div v-if="!isLoading && watchHistory.length === 0">
            <div class="no-card" style="max-width: 25%;">
                <p>You have not tuned in to any song yet here!</p>
            </div>
        </div>

        <div class="songList">
            <div v-if="!isLoading && watchHistory.length > 0" v-for="song in watchHistory" :key="song.songId"
                id="songListElement">
                <div class="songCard" :id="song.songCardId">
                    <div class="songCard__image">
                        <img :src="song.songImageUrl" alt="Song Image">
                    </div>
                    <div class="songCard__details">
                        <h3>{{ song.songName }}</h3>
                        <p style="font-size: small; color: azure; margin: 0; padding: 0;">{{ song.userFullName }}</p>
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

<style scoped>
.history_title {
    color: white;
    text-align: center;
    font-size: 1.5rem;
    margin: 0 auto;
    margin-top: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.no-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #373737;
    border: 1px solid #6f6f6f;
    border-radius: 16px;
    padding: 8px;
    margin: 8px auto;
}

.profile-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 24px;
    color: white;
    background-color: #373737;
    border: 1px solid #6f6f6f;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 24px;
}

.x-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: 24px;
    color: white;
    background-color: #000000;
    border: 1px solid #6f6f6f;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 24px;
}

.x-card h2 {
    margin: 0;
}

.x-card p {
    margin: 0;
}

.profile-image img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.profile-details {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
}

.profile-details h2 {
    margin: 16px;
}

.profile-details p {
    margin: 0;
}
</style>

<script>
export default {
    name: 'ProfileScreen',
    data() {
        return {
            profileData: null,
            isLoading: true,
            watchHistory: [],
            audioElements: {},
            lastPausedId: null,
        };
    },


    mounted() {
        if (typeof (localStorage.getItem('ma-t')) === 'string' && localStorage.getItem('ma-t').length > 0 && typeof (localStorage.getItem('ma-ue')) === 'string' && localStorage.getItem('ma-ue').length > 0) {
            this.isLoggedIn = true;
            this.userEmail = localStorage.getItem('ma-ue');
            this.getProfile();
        } else {
            this.isLoggedIn = false;
            this.$router.push('/');
        }
    },

    methods: {
        logout() {
            localStorage.clear()
            this.isLoggedIn = false;
            this.$router.push('/');
        },
        getProfile() {
            this.isLoading = true;

            fetch(PROFILE_URL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                },
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        this.profileData = data["data"];
                        this.watchHistory = data["songs"];

                        for (let i = 0; i < this.watchHistory.length; i++) {
                            this.watchHistory[i].songImageUrl = `http://127.0.0.1:5000/static/song/poster/${this.watchHistory[i].songId}.png`;
                            this.watchHistory[i].songCardId = `songCard_${this.watchHistory[i].songId}`;
                            this.watchHistory[i].playButtonId = `playButton_${this.watchHistory[i].songId}`;

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
                    for (let i = 0; i < this.watchHistory.length; i++) {
                        if (this.watchHistory[i].songId === songId) {
                            this.watchHistory[i].likesCount += 1;
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
                    for (let i = 0; i < this.watchHistory.length; i++) {
                        if (this.watchHistory[i].songId === songId) {
                            this.watchHistory[i].likesCount -= 1;
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
                    for (let i = 0; i < this.watchHistory.length; i++) {
                        if (this.watchHistory[i].songId === songId) {
                            this.watchHistory[i].songPlaysCount += 1;
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
        async registerAsCreator() {
            try {
                const response = await fetch(REGISTER_AS_CREATOR_URL, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {

                    this.profileData = data["data"];
                    localStorage.setItem('ma-t', response['token'] ?? '');
                    localStorage.setItem('ma-ur', 2);
                
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
        }
    }
};
</script>