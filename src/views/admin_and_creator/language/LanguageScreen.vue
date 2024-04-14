<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ALL_LANGUAGE_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
        <div class="bigButton">
            <router-link to="/language/new">
                <i class="material-icons">add_circle</i>
                Add New Language
            </router-link>
        </div>
        <div class="languageList">
            <div v-for="genre in languageList" class="genreCard">
            <div class="about">
                <h3>{{ genre['languageName'] }}</h3>
                <p>{{ genre['languageCode'] }}</p>
                <p>Added by: {{ genre['userFullName'] }}</p>
            </div>
            <hr />
            <div class="genreCard__buttons">
                <router-link :to="genre['editUrl']">
                    <i class="material-icons">edit</i>
                </router-link>
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
            languageList: []
        }
    },
    mounted() {
        this.getLanguage();
    },
    methods: {
        getLanguage() {
            fetch(ALL_LANGUAGE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("ma-t")
                }
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        this.languageList = data["data"];

                        for (let i = 0; i < this.languageList.length; i++) {
                            this.languageList[i].editUrl = '/language/' + this.languageList[i]['languageId'] + '/update';
                        }

                        this.isLoading = false;
                    });
                } else if (res.status === 401) {
                    localStorage.clear();
                    this.$router.push('/login');
                } else {
                    alert('Something went wrong');
                }
            });
        }
    }
}
</script>

<style scoped>
.languageList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 32px;
}

.languageList .genreCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
    background-color: rgba(41, 42, 45, 0.4);
    border-radius: 16px;
    border: 1px solid rgba(41, 42, 45, 0.4);
}

.languageList .genreCard .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.languageList .genreCard .about {
    display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
}

.languageList .genreCard .about h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
}

.languageList .genreCard .about p {
    font-size: 0.7rem;
    margin: 0;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(146, 148, 154);
}

.languageList .genreCard:hover {
    background-color: rgba(41, 42, 45, 0.8);
    border: 1px solid rgba(41, 42, 45, 0.8);
}

.languageList .genreCard .genreCard__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.languageList .genreCard .genreCard__buttons a {
    padding: 4px;
    border: 1px solid rgba(41, 42, 45, 0.4);
    border-radius: 8px;
    margin-left: 4px;
    margin-right: 4px;
    cursor: pointer;
}

.languageList .genreCard .genreCard__buttons a:hover {
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