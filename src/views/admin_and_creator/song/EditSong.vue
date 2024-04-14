<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

import { ALL_GENRES, ALL_LANGUAGES, SONG_UPDATE_PREFIX } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />

    <div class="content" v-if="!isLoading">
        <div class="form-container">
            <!-- <form action="/song/new" method="POST" enctype="multipart/form-data"> -->
            <form id="the_form" @submit.prevent="submitForm" target="hiddenFrame">
                <h1>Edit Song</h1>
                <hr />
                <div class="input-container">
                    <label for="songName">Song Title</label>
                    <input type="text" name="songName" id="songName" placeholder="Enter song's title"
                        style="width: 540px;" v-model="songName" required />
                </div>
                <div class="input-container">
                    <label for="songDescription">Tell something about the song</label>
                    <textarea type="text" v-model="songDescription" name="songDescription" id="songDescription"
                        placeholder="Song Description>" style="width: 540px;"></textarea>
                </div>
                <div class="input-container">
                    <label for="songLanguageId">Song Language</label>
                    <select class="select" name="songLanguageId" id="songLanguageId" style="width: 540px;" required>
                        <option class="select" value="" disabled>Select Language</option>
                        <option v-for="language in languageList" class="select" :value="language['languageId']">
                            {{ language["languageName"] }}
                        </option>
                        <option v-for="language in selectedLanguageList" class="select" :value="language['languageId']"
                            selected>
                            {{ language["languageName"] }}
                        </option>

                        <!-- {% for language in languageList %}
                        <option class="select" value="{{ language[0] }}">{{ language[1] }}</option>
                        {% endfor %} -->
                    </select>
                </div>
                <span class="helper">Can't find the language? <a href="/genre/new">Add New Language</a></span>
                <div class="input-container">
                    <label for="songImage">Song Cover/Poster</label>
                    <br />
                    <img :src="imageUrl" alt="Song Cover"
                        style="width: 540px; border-radius: 16px; margin-left: auto; margin-right: auto;" />
                    <p style="text-align: center;">Click the button below to update</p>
                    <input type="file" name="songImage" id="songImage" accept="image/jpeg" style="width: 540px;" />
                </div>
                <div class="input-container">
                    <label for="songAudio">Song Audio File</label>
                    <br />
                    <audio controls>
                        <source :src="songUrl" type="audio/mpeg">
                    </audio>
                    <p style="text-align: center;">Click the button below to update</p>
                    <input type="file" name="songAudio" id="songAudio" accept="audio/mp3" style="width: 540px;" />
                </div>
                <div class="input-container">
                    <label for="songLyrics">Lyrics</label>
                    <textarea type="text" v-model="songLyrics" name="songLyrics" id="songLyrics"
                        placeholder="Song Lyrics>" style="width: 540px;" required></textarea>
                </div>
                <div class="input-container">
                    <label for="songReleaseDate">Song Release Date</label>
                    <input type="date" v-model="songReleaseDate" name="songReleaseDate" id="songReleaseDate"
                        placeholder="Choose Song Release Date" style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="songGenreId">Genre</label>
                    <select class="select" name="songGenreId" id="songGenreId" style="width: 540px;" required>
                        <option class="select" value="" disabled selected>Select Genre</option>

                        <option v-for="genre in genreList" class="select" :value="genre['genreId']">
                            {{ genre["genreName"] }}
                        </option>

                        <option v-for="genre in selectedGenreList" class="select" :value="genre['genreId']" selected>
                            {{ genre["genreName"] }}
                        </option>

                        <!-- <option v-for="genre in genreList" class="select" :value="genre['genreId']">{{
                            genre["genreName"] }}
                        </option> -->
                        <!-- {% for genre in genreList %}
                        <option class="select" value="{{ genre[0] }}">{{ genre[1] }}</option>
                        {% endfor %} -->
                    </select>
                </div>
                <!--Hidden Fields-->
                <input type="hidden" name="songDuration" id="songDuration" value="00:04:00" />
                <input type="hidden" name="songAudioFileExt" id="songAudioFileExt" value="mp3" />
                <input type="hidden" name="songImageFileExt" id="songImageFileExt" value="png" />
                <input type="hidden" name="token" id="token" :value="token" />
                <input type="hidden" name="updateSongAudio" id="updateSongAudio" v-model="updateSongAudio" />
                <input type="hidden" name="updateSongImage" id="updateSongImage" v-model="updateSongImage" />


                <span class="helper">Can't find the genre? <a href="/genre/new">Add New Genre</a></span>
                <div class="input-container">
                    <input type="submit" title="New Song" />
                </div>
            </form>
        </div>
    </div>

    <iframe name="hiddenFrame" style="display: none;"></iframe>
</template>

<script>
export default {
    name: 'NewSongScreen',

    data() {
        return {
            isLoading: false,
            genreList: [],
            languageList: [],
            selectedLanguageList: [],
            selectedGenreList: [],
            token: `Bearer ${localStorage.getItem('ma-t')}`,
            songId: "",
            songName: "",
            songDescription: "",
            songLyrics: "",
            songReleaseDate: "",
            songGenreId: "",
            songLanguageId: "",
            songAudioExt: "",
            songImageExt: "",
            songUrl: "",
            imageUrl: "",
            updateSongAudio: 0,
            updateSongImage: 0,
        };
    },

    mounted() {
        this.initWithOptions();
    },

    methods: {
        initWithOptions() {
            this.isLoading = true;

            try {
                // fetch song
                fetch(
                    SONG_UPDATE_PREFIX + "/" + this.$route.params.songId,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('ma-t')}`,
                        }
                    },).then((res) => {
                        if (res.status == 200) {
                            res.json().then((data) => {
                                console.log(data["data"]["songId"])
                                this.songId = data["data"]["songId"];
                                this.songName = data["data"]["songName"];
                                this.songDescription = data["data"]["songDescription"];
                                this.songLyrics = data["data"]["songLyrics"];
                                this.songReleaseDate = data["data"]["songReleaseDate"];
                                this.songGenreId = data["data"]["genreId"];
                                this.songLanguageId = data["data"]["languageId"];
                                this.songAudioExt = data["data"]["songAudioFileExt"];
                                this.songImageExt = data["data"]["songImageFileExt"];
                                this.songUrl = `http://127.0.0.1:5000/static/song/audio/${this.songId}.${this.songAudioExt}`;
                                this.imageUrl = `http://127.0.0.1:5000/static/song/poster/${this.songId}.${this.songImageExt}`;

                                fetch(ALL_GENRES).then((res) => {
                                    if (res.status == 200) {
                                        res.json().then((data) => {
                                            for (let genre of data["data"]) {
                                                if (genre["genreId"] == this.songGenreId) {
                                                    this.selectedGenreList.push(genre);
                                                } else {
                                                    this.genreList.push(genre);
                                                }
                                            }
                                        });
                                    }
                                });

                                fetch(ALL_LANGUAGES).then((res) => {
                                    if (res.status == 200) {
                                        res.json().then((data) => {
                                            for (let language of data["data"]) {
                                                if (language["languageId"] == this.songLanguageId) {
                                                    this.selectedLanguageList.push(language);
                                                } else {
                                                    this.languageList.push(language);
                                                }
                                            }
                                        });
                                    }
                                });

                            });
                        }
                    });
            } catch (error) {
                console.error(error);
            }

            this.isLoading = false;
        },

        submitForm() {
            const form = document.getElementById('the_form');

            const songId = this.$route.params.songId;

            form.action = SONG_UPDATE_PREFIX + "/" + songId + "/update";
            form.method = 'POST';

            form.enctype = 'multipart/form-data';
            // this.isLoading = true;

            // check if the song audio file is updated
            if (document.getElementById('songAudio').files.length > 0) {
                this.updateSongAudio = 1;
            }

            // check if the song image file is updated
            if (document.getElementById('songImage').files.length > 0) {
                this.updateSongImage = 1;
            }

            form.submit();

            setTimeout(() => {
                this.isLoading = true;
            }, 2000);

            setTimeout(() => {
                this.$router.replace('/my-songs');
                this.isLoading = false;
            }, 4000);
        }
    },
};
</script>