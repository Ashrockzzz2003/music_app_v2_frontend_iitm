<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { NEW_GENRE_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />

    <div class="content" v-if="!isLoading">
        <div class="form-container">
            <form @submit.prevent="createNewGenre" >
                <h1>Add New Genre</h1>
                <hr />
                <div class="input-container">
                    <label for="genreName">Genre Name</label>
                    <input type="text" name="genreName" id="genreName" placeholder="Enter genre's name" style="width: 540px;" v-model="genreName" required />
                </div>
                <div class="input-container">
                    <label for="genreDescription">Tell something about the genre</label>
                    <textarea type="text" name="genreDescription" id="genreDescription" placeholder="Genre Description>" v-model="genreDescription" style="width: 540px;" required></textarea>
                </div>
                <div class="input-container">
                    <input type="submit" title="Add Genre" />
                </div>
            </form>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            isLoading: false,
            genreName: '',
            genreDescription: ''
        }
    },
    methods: {
        async createNewGenre() {
            this.isLoading = true;

            const response = await fetch(NEW_GENRE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('ma-t')
                },
                body: JSON.stringify({
                    genreName: this.genreName,
                    genreDescription: this.genreDescription
                })
            });
            this.isLoading = false;
            if (response.status === 200) {
                const data = await response.json();
                this.$router.push('/genre');
            } else if (response.status === 401) {
                alert('Unauthorized');
            } else if (response.status === 400) {
                const data = await response.json();

                alert(data.message);
            } else {
                alert('Something went wrong');
            }
        }
    }
}
</script>