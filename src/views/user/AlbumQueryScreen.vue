<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALBUM_SEARCH_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
        <h1>Albums</h1>

        <form class="filter_box" @submit.prevent="fetchAlbums">
            <input type="text" v-model="q" placeholder="Search Song by name, artist, genre, language, album">
            <input type="submit" value="Search">
        </form>

        <div class="albumList">

            <div v-if="albumList.length == 0">
                <p>No Albums Found</p>
            </div>

            <div v-for="album in albumList" class="albumCard">
                <div class="albumCard__image">
                    <img :src="album.albumImageUrl" alt="Album Image">
                </div>
                <div class="about">
                    <h3>{{ album['albumName'] }}</h3>
                    <p>{{ album['albumDescription'] }}</p>
                    <p>by | {{ album['userFullName'] }}</p>
                </div>
                <hr />
                <div class="albumCard__buttons">
                    <router-link :to="album.albumLink" class="iconRow playButton">
                        <i class="material-icons play">library_music</i>
                        <p class="button-text">View Album</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px auto;
    width: fit-content;
}
.albumList {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    margin-bottom: 16px;
}

.albumList .albumCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
    width: 240px;
    height: 320px;
    background-color: rgba(41, 42, 45, 0.4);
    border-radius: 16px;
    border: 1px solid rgba(41, 42, 45, 0.4);
}

.albumList .albumCard .albumCard__image {
    overflow: hidden;
    border-radius: 16px;
}

.albumList .albumCard .albumCard__image img {
    height: 240px;
    width: 240px;
    object-fit: cover;
    border-radius: 16px;
}

.albumList .albumCard .albumCard__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.albumList .albumCard .albumCard__buttons a {
    padding: 4px;
    border: 1px solid rgba(41, 42, 45, 0.4);
    border-radius: 8px;
    margin-left: 4px;
    margin-right: 4px;
    cursor: pointer;
}

.albumList .albumCard .albumCard__buttons a:hover {
    background-color: rgba(41, 42, 45, 0.6);
}

.albumList .albumCard hr {
    width: 100%;
    border: 0.5px solid rgba(41, 42, 45, 0.4);
}

.albumList .albumCard .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.albumList .albumCard .about h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
}

.albumList .albumCard .about p {
    font-size: 0.7rem;
    margin: 0;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(146, 148, 154);
}

/* scale image but within bounds of card on hover */

.albumList .albumCard:hover>.albumCard__image img {
    transform: scale(1.2);
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


.bigButton:hover {
    background-color: rgba(41, 42, 45, 0.4);
}

hr {
    width: 100%;
    border: 0.5px solid rgba(41, 42, 45, 0.4);
}
</style>


<script>
export default {
    name: 'AlbumQueryScreen',
    data() {
        return {
            albumList: [],
            isLoading: true,
            q: '',
            userRoleId: localStorage.getItem('ma-ur') ?? -1,
        }
    },
    mounted() {
        this.fetchAlbums();
    },
    methods: {
        fetchAlbums() {
            this.isLoading = true;

            let url = ALBUM_SEARCH_URL;

            if (this.q.length > 0) {
                url += `?q=${this.q}`;
            }

            fetch(url, {
                method: 'GET',
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then((data) => {
                        this.albumList = data['data'];

                        for (let i = 0; i < this.albumList.length; i++) {
                            this.albumList[i]['albumImageUrl'] = `http://127.0.0.1:5000/static/album/${this.albumList[i]['albumId']}.png`;
                            this.albumList[i]['albumLink'] = `/album/search/${this.albumList[i]['albumId']}`;
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
};
</script>