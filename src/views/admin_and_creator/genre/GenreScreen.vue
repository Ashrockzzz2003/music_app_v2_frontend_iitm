<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_GENRE_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
        <div class="bigButton">
            <router-link to="/genre/new">
                <i class="material-icons">add_circle</i>
                Add New Genre
            </router-link>
        </div>
        <div class="genreList">
            <div v-for="genre in genreList" class="genreCard">
            <div class="about">
                <h3>{{ genre['genreName'] }}</h3>
                <p>{{ genre['genreDescription'] }}</p>
            </div>
            <hr />
            <div class="genreCard__buttons">
                <router-link :to="genre['editUrl']">
                    <i class="material-icons">edit</i>
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

<script>
export default {
    data() {
        return {
            isLoading: true,
            genreList: []
        }
    },
    mounted() {
        this.getGenre();
    },
    methods: {
        getGenre() {
            fetch(ALL_GENRE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("ma-t")
                }
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        this.genreList = data["data"];

                        for (let i = 0; i < this.genreList.length; i++) {
                            this.genreList[i].editUrl = '/genre/' + this.genreList[i]['genreId'] + '/update';
                        }

                        this.isLoading = false;
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.genreList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 32px;
}

.genreList .genreCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: rgba(41, 42, 45, 0.4);
    border-radius: 16px;
    border: 1px solid rgba(41, 42, 45, 0.4);
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
    border: 1px solid rgba(41, 42, 45, 0.4);
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