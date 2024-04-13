<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

import { ALL_GENRES, ALL_LANGUAGES, NEW_SONG_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />

    <div class="content">
        <div class="form-container">
            <!-- <form action="/song/new" method="POST" enctype="multipart/form-data"> -->
            <form id="the_form" @submit.prevent="submitForm" target="hiddenFrame">
                <h1>New Song</h1>
                <hr />
                <div class="input-container">
                    <label for="songName">Song Title</label>
                    <input type="text" name="songName" id="songName" placeholder="Enter song's title"
                        style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="songDescription">Tell something about the song</label>
                    <textarea type="text" name="songDescription" id="songDescription" placeholder="Song Description>"
                        style="width: 540px;"></textarea>
                </div>
                <div class="input-container">
                    <label for="songLanguageId">Song Language</label>
                    <select class="select" name="songLanguageId" id="songLanguageId" style="width: 540px;" required>
                        <option class="select" value="" disabled selected>Select Language</option>
                        <option v-for="language in languageList" class="select" :value="language['languageId']">{{ language["languageName"] }}</option>

                        <!-- {% for language in languageList %}
                        <option class="select" value="{{ language[0] }}">{{ language[1] }}</option>
                        {% endfor %} -->
                    </select>
                </div>
                <span class="helper">Can't find the language? <a href="/genre/new">Add New Language</a></span>
                <div class="input-container">
                    <label for="songImage">Song Cover/Poster</label>
                    <input type="file" name="songImage" id="songImage" accept="image/png" style="width: 540px;"
                        required />
                </div>
                <div class="input-container">
                    <label for="songAudio">Song Audio File</label>
                    <input type="file" name="songAudio" id="songAudio" accept="audio/mp3" style="width: 540px;"
                        required />
                </div>
                <div class="input-container">
                    <label for="songLyrics">Lyrics</label>
                    <textarea type="text" name="songLyrics" id="songLyrics" placeholder="Song Lyrics>"
                        style="width: 540px;" required></textarea>
                </div>
                <div class="input-container">
                    <label for="songReleaseDate">Song Release Date</label>
                    <input type="date" name="songReleaseDate" id="songReleaseDate"
                        placeholder="Choose Song Release Date" style="width: 540px;" required />
                </div>
                <div class="input-container">
                    <label for="songGenreId">Genre</label>
                    <select class="select" name="songGenreId" id="songGenreId" style="width: 540px;" required>
                        <option class="select" value="" disabled selected>Select Genre</option>
                        <option v-for="genre in genreList" class="select" :value="genre['genreId']">{{ genre["genreName"] }}</option>
                        <!-- {% for genre in genreList %}
                        <option class="select" value="{{ genre[0] }}">{{ genre[1] }}</option>
                        {% endfor %} -->
                    </select>
                </div>
                <!--Hidden Fields-->
                <input type="hidden" name="songDuration" id="songDuration" value="00:04:00" />
                <input type="hidden" name="songAudioFileExt" id="songAudioFileExt" value="mp3" />
                <input type="hidden" name="songImageFileExt" id="songImageFileExt" value="png" />
                <input type="hidden" name="token" id="token" :value="token"/>

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
            token: `Bearer ${localStorage.getItem('ma-t')}`,
        };
    },

    mounted() {
        this.initWithOptions();
    },

    methods: {
        initWithOptions() {
            this.isLoading = true;

            try {
                fetch(ALL_GENRES).then((res) => {
                    if (res.status == 200) {
                        res.json().then((data) => {
                            this.genreList = data["data"];
                        });
                    }
                });

                fetch(ALL_LANGUAGES).then((res) => {
                    if (res.status == 200) {
                        res.json().then((data) => {
                            this.languageList = data["data"];
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

            form.action = NEW_SONG_URL;
            form.method = 'POST';

            form.enctype = 'multipart/form-data';
            this.isLoading = true;

            form.submit();

            this.isLoading = false;

            this.$router.replace('/my-songs')
        }
    },
};
</script>