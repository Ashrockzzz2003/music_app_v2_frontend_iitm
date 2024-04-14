<script setup>
import NavBar from '@/components/NavBar.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { NEW_LANGUAGE_URL } from '@/api';
</script>

<template>
    <NavBar />
    <LoadingScreen v-if="isLoading" />

    <div class="content" v-if="!isLoading">
        <div class="form-container">
            <form @submit.prevent="createNewLanguage" >
                <h1>Add New Language</h1>
                <hr />
                <div class="input-container">
                    <label for="languageName">Language Name</label>
                    <input type="text" name="languageName" id="languageName" placeholder="Enter Language's name" style="width: 540px;" v-model="languageName" required />
                </div>
                <div class="input-container">
                    <label for="languageCode">Language Code (eg. en, ta, ma)</label>
                    <input type="text" name="languageCode" id="languageCode" placeholder="Enter language code" style="width: 540px;" v-model="languageCode" required />
                </div>
                <div class="input-container">
                    <input type="submit" value="Add Language" />
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
            languageName: '',
            languageCode: ''
        }
    },
    methods: {
        async createNewLanguage() {
            this.isLoading = true;

            const response = await fetch(NEW_LANGUAGE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('ma-t')
                },
                body: JSON.stringify({
                    languageName: this.languageName,
                    languageCode: this.languageCode
                })
            });
            this.isLoading = false;
            if (response.status === 200) {
                const data = await response.json();
                this.$router.push('/language');
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