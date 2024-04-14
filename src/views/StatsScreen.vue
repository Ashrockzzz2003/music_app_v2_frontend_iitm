<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { STATS_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />

    <div class="content" v-else>
        <h1>Stats</h1>
        <div class="row">
            <div class="bigButton2">
                <a>
                    <div style="padding: 16px;">
                        <i class="material-icons">person</i>
                    </div>
                    <div class="count">{{ statsData.noOfCreators }} artists</div>
                </a>
            </div>
            <div class="bigButton2">
                <a>
                    <div style="padding: 16px;">
                        <i class="material-icons">people</i>
                    </div>
                    <div class="count">{{ statsData.noOfUsers }} users</div>
                </a>
            </div>
            <div class="bigButton2">
                <a href="/genre">
                    <div style="padding: 16px;">
                        <i class="material-icons">category</i>
                    </div>
                    <div class="count">{{ statsData.noOfGenres }} genres</div>
                </a>
            </div>
            <div class="bigButton2">
                <a href="/song/search">
                    <div style="padding: 16px;">
                        <i class="material-icons">library_music</i>
                    </div>
                    <div class="count">{{ statsData.noOfSongs }} songs</div>
                </a>
            </div>
            <div class="bigButton2">
                <a href="/album/search">
                    <div style="padding: 16px;">
                        <i class="material-icons">album</i>
                    </div>
                    <div class="count">{{ statsData.noOfAlbums }} albums</div>
                </a>
            </div>
            <div class="bigButton2">
                <a href="/playlist">
                    <div style="padding: 16px;">
                        <i class="material-icons">playlist_play</i>
                    </div>
                    <div class="count">{{ statsData.noOfPlaylists }} playlists</div>
                </a>
            </div>
            <div class="bigButton2">
                <a href="/language">
                    <div style="padding: 16px;">
                        <i class="material-icons">language</i>
                    </div>
                    <div class="count">{{ statsData.noOfLanguages }} languages</div>
                </a>
            </div>
        </div>


        <!-- Top Performing Song -->

        <div class="row">
            <div class="bigButton">
                <img :src="statsData['mostLikedSong'].songImageUrl" style="height: 240px; border-radius: 16px;">
                <p>{{ statsData['mostLikedSong'].songName }}</p>
                <p style="font-size: small; color: grey; margin: 0;">by {{ statsData['mostLikedSong'].createdBy }}</p>
                <p style="font-size: x-small; color: grey; margin: 0;">{{ statsData['mostLikedSong'].songDescription }}</p>
                <audio controls style="margin-top: 8px;">
                    <source :src="statsData['mostLikedSong'].songAudioUrl" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <div class="likes">
                    <i class="material-icons">thumb_up</i>
                    <span>{{ statsData['mostLikedSong'].likesCount }}</span>
                </div>
                <div class="count">Top Liked Song</div>
            </div>

            <div class="bigButton">
                <img :src="statsData['mostPlayedSong'].songImageUrl" style="height: 240px; border-radius: 16px;">
                <p>{{ statsData['mostPlayedSong'].songName }}</p>
                <p style="font-size: small; color: grey; margin: 0;">by {{ statsData['mostPlayedSong'].createdBy }}</p>
                <p style="font-size: x-small; color: grey; margin: 0;">{{ statsData['mostPlayedSong'].songDescription }}</p>
                <audio controls style="margin-top: 8px;">
                    <source :src="statsData['mostPlayedSong'].songAudioUrl" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <div class="likes">
                    <i class="material-icons">play_arrow</i>
                    <span>{{ statsData['mostPlayedSong'].songPlaysCount }}</span>
                </div>
                <div class="count">Top Played Song</div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.row {
    padding: 16px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.likes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
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

.likes i {
    vertical-align: middle;
    text-decoration: none;
    font-size: medium;
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

.bigButton2 {
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(41, 42, 45);
    border-radius: 16px;
    cursor: pointer;
    padding: 8px;
    margin: 4px;
}

.bigButton2 i {
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


.bigButton2:hover {
    background-color: rgba(41, 42, 45, 0.4);
}

.count {
    font-size: 1.2rem;
    border: 1px solid rgba(41, 42, 45);
    background-image: linear-gradient(315deg, #f9cf17 10%, #f9f1a9 57%);
    color: black;
    font-weight: 400;
    margin-top: 8px;
    padding: 12px;

    border-radius: 16px;
}
</style>

<script>
export default {
    name: 'StatsScreen',
    data() {
        return {
            isLoading: true,
            statsData: {},
        }
    },
    mounted() {
        this.getStatsData();
    },
    methods: {
        getStatsData() {
            fetch(STATS_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('ma-t'),
                },
            }).then((res) => {
                if (res.status == 200) {

                    /*
                    "data": {
                        "mostLikedSong": {
                            "createdBy": "Ajoy Shetty",
                            "likesCount": 2,
                            "songDescription": "Devotional song of Lord Shiva",
                            "songId": 3,
                            "songName": "Chandra Choota"
                        },
                        "mostPlayedSong": {
                            "createdBy": "Ajoy Shetty",
                            "songDescription": "Sid Malayalam song.",
                            "songId": 4,
                            "songName": "Parayuvaan",
                            "songPlaysCount": 12
                        },
                        "noOfAlbums": 3,
                        "noOfCreators": 1,
                        "noOfGenres": 6,
                        "noOfLanguages": 4,
                        "noOfPlaylists": 3,
                        "noOfSongs": 3,
                        "noOfUsers": 3
                    },
                    */

                    res.json().then((data) => {
                        this.statsData = data.data;

                        this.statsData.mostLikedSong['songImageUrl'] = 'http://127.0.0.1:5000/static/song/poster/' + this.statsData.mostLikedSong.songId + '.png'
                        this.statsData.mostPlayedSong['songImageUrl'] = 'http://127.0.0.1:5000/static/song/poster/' + this.statsData.mostPlayedSong.songId + '.png'

                        this.statsData.mostLikedSong['songAudioUrl'] = 'http://127.0.0.1:5000/static/song/audio/' + this.statsData.mostLikedSong.songId + '.mp3'
                        this.statsData.mostPlayedSong['songAudioUrl'] = 'http://127.0.0.1:5000/static/song/audio/' + this.statsData.mostPlayedSong.songId + '.mp3'

                        this.isLoading = false;
                    });

                } else if (res.status == 401) {
                    localStorage.clear();
                    this.$router.push("/login");
                } else {
                    alert('Something went wrong');
                }
            })
        },
    },
}
</script>