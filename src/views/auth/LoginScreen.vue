<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <NavBar />
    <div class="content">
        <div class="form-container">
            <form @submit.prevent="loginUser">
                <h1>Login</h1>
                <hr />

                <div v-if="message.length > 0" class="error-container">
                    <span class="error">{{ message }}</span>
                </div>

                <hr v-if="message.length > 0" />

                <div class="input-container">
                    <label for="email">Email</label>
                    <input type="email" name="userEmail" id="userEmail" placeholder="Enter your Email-ID"
                        v-model="userEmail" required />
                </div>
                <div class="input-container">
                    <label for="password">Password</label>
                    <input type="password" name="userPassword" id="userPassword" v-model="userPassword"
                        placeholder="Enter a Password" required />
                </div>
                <span class="helper">Don't have an account? <router-link to="/register">Register</router-link></span>
                <div class="input-container">
                    <input type="submit" :disabled="!buttonEnabled" title="Login" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}

.error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: rgb(255, 158, 158);
    border-radius: 8px;
    padding: 8px;
    width: fit-content;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
}

.error {
    color: rgb(57, 0, 0);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
}

input[type="submit"]:disabled {
    background-color: rgba(124, 124, 124, 0.5);
    color: rgb(160, 160, 160);
    cursor: not-allowed;
}
</style>


<script>
import { LOGIN_URL } from '@/api';
import { validateEmail, validatePassword } from '@/helpers/dataValidator';


export default {
    name: 'LoginScreen',
    mounted() {
        if (typeof(localStorage.getItem('ma-t')) === 'string' && localStorage.getItem('ma-t').length > 0) {
            confirm('You are already logged in. Do you want to logout?') ? localStorage.clear() : this.$router.push('/');
        }
    },
    data() {
        return {
            userEmail: '',
            userPassword: '',
            message: '',
            buttonEnabled: true
        }
    },
    methods: {
        async loginUser() {
            this.buttonEnabled = false;

            if (!validateEmail(this.userEmail)) {
                this.message = 'Please enter a valid email address.';
                this.buttonEnabled = true;
                return;
            }

            if (!validatePassword(this.userPassword)) {
                this.message = 'Please enter a valid password. Password must be at least 8 characters long.';
                this.buttonEnabled = true;
                return;
            }

            this.message = '';


            try {
                const response = await fetch(LOGIN_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: this.userEmail,
                        userPassword: this.userPassword
                    })
                });

                if (response.status === 400) {
                    const data = await response.json();
                    this.message = data['message'] ?? 'Something went wrong. Please try again later.';
                } else if (response.status === 200) {
                    const data = await response.json();

                    localStorage.clear();

                    localStorage.setItem('ma-t', data['token'] ?? '');
                    localStorage.setItem('ma-ue', this.userEmail);

                    this.$router.push('/');


                } else {
                    this.message = 'Something went wrong. Please try again later.'
                }

            } catch (e) {
                this.message = 'Something went wrong. Please try again later.'
                console.error(e);
            } finally {
                this.buttonEnabled = true;
            }
        }
    }
}
</script>