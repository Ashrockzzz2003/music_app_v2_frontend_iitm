<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_ALBUMS_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
        <div class="bigButton">
            <router-link to="/album/new">
                <i class="material-icons">add_circle</i>
                Create New Album
            </router-link>
        </div>

        <h1>Albums</h1>
        <div class="albumList">

            <div v-if="albumList.length == 0">
                <p>No Albums Found</p>
            </div>

            <div v-for="album in albumList" class="albumCard">
                <div class="albumCard__image">
                    <img :src="album.albumImageUrl" alt="Album Image">
                </div>
                <div class="about">
                    <h3>{{album['albumName']}}</h3>
                    <p>{{album['albumDescription']}}</p>
                    <p v-if="userRoleId == 1">by | {{album['userFullName']}}</p>
                </div>
                <hr />
                <div class="albumCard__buttons">
                    <router-link :to="album.albumEditLink">
                        <i class="material-icons play">edit</i>
                    </router-link>
                    <router-link :to="album.albumLink" class="iconRow playButton">
                        <i class="material-icons play">library_music</i>
                        <p class="button-text">View Album</p>
                    </router-link>
                    <a v-if="userRoleId == 1" @click="deleteAlbum(album.albumId)">
                        <i class="material-icons play">delete</i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    name: 'AlbumScreen',
    data() {
        return {
            albumList: [],
            isLoading: true,
            userRoleId: localStorage.getItem('ma-ur'),
        }
    },

    mounted() {
        this.fetchAlbums();
    },

    methods: {
        fetchAlbums() {
            fetch(ALL_ALBUMS_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ma-t')}`
                }
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then((data) => {
                        this.albumList = data['data'];

                        for (let i = 0; i < this.albumList.length; i++) {
                            this.albumList[i]['albumImageUrl'] = `http://127.0.0.1:5000/static/album/${this.albumList[i]['albumId']}.png`;
                            this.albumList[i]['albumLink'] = `/album/${this.albumList[i]['albumId']}`;
                            this.albumList[i]['albumEditLink'] = `/album/${this.albumList[i]['albumId']}/update`;
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

        async deleteAlbum(albumId) {
            this.isLoading = true;

            try {
                const url = ALL_ALBUMS_URL + "/" + albumId + '/delete';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("ma-t"),
                    },
                });

                if (response.status === 200) {
                    this.fetchAlbums();
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