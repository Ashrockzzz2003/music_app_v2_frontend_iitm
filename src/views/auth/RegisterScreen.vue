<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <NavBar />
    <div class="content">
        <div class="form-container">
            <form @submit.prevent="registerUser" v-if="currentStep == 0">
                <h1>Register</h1>
                <hr />

                <div v-if="message.length > 0" class="error-container">
                    <span class="error">{{ message }}</span>
                </div>

                <hr v-if="message.length > 0" />

                <div class="input-container">
                    <label for="userName">Full Name</label>
                    <input type="text" name="userName" id="userName" placeholder="Enter your full name"
                        v-model="userName" required />
                </div>
                <!-- DOB -->
                <div class="input-container">
                    <label for="userDob">Date of Birth</label>
                    <input type="date" name="userDob" id="userDob" placeholder="Enter your DOB" v-model="userDob"
                        required />
                </div>
                <!-- Gender -->
                <div class="input-container">
                    <label for="userGender">Gender</label>
                    <div class="radioButtonGroup">
                        <div class="radioOption">
                            <input type="radio" value="M" name="userGender" id="maleGender" v-model="userGender"
                                required />
                            <label for="maleGender">Male</label>
                        </div>
                        <div class="radioOption">
                            <input type="radio" value="F" name="userGender" id="femaleGender" v-model="userGender"
                                required />
                            <label for="femaleGender">Female</label>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <label for="userEmail">Email</label>
                    <input type="email" name="userEmail" id="userEmail" placeholder="Enter your Email-ID"
                        v-model="userEmail" required />
                </div>
                <div class="input-container">
                    <label for="userPassword">Password</label>
                    <input type="password" name="userPassword" id="userPassword" placeholder="Enter a Password"
                        v-model="userPassword" required />
                </div>
                <hr />
                <div
                    style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 32px;">
                    <input type="checkbox" name="userAgreement" id="userAgreement" required />
                    <label style="margin-left: 4px;" for="userAgreement">I agree to the <a href="/tc">Terms and
                            Conditions</a></label>
                </div>
                <div class="input-container">
                    <input type="submit" title="Register" class="btn" :disabled="!buttonEnabled" />
                </div>
                <hr />
                <div style="margin-top: 16px; margin-bottom: 16px;">
                    <span class="helper">Already have an account? <router-link to="/login">Login</router-link></span>
                </div>
            </form>
            <form @submit.prevent="verifyOtp" v-else>
                <h1>Verify OTP</h1>
                <hr />

                <div v-if="message.length > 0" class="error-container">
                    <span class="error">{{ message }}</span>
                </div>

                <hr v-if="message.length > 0" />

                <p class="message">Please enter the OTP sent to {{ userEmail  }} to verify your account.</p>

                <div class="input-container">
                    <label for="otp">OTP</label>
                    <input type="text" name="otp" id="otp" placeholder="Enter the OTP" v-model="otp" required />
                </div>

                <div class="input-container">
                    <input type="submit" title="Verify OTP" class="btn" :disabled="!buttonEnabled" />
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
    min-height: 88vh;
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

.message {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    background-color: rgb(169, 255, 158);
    color: rgb(0, 57, 1);
    padding: 8px;
    border-radius: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
    width: fit-content;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
}
</style>

<script>
import { REGISTER_URL, VERIFY_OTP_URL } from '@/api';
import { validateEmail, validateGender, validatePassword, validateUserDob, validateUserFullName, validateOtp } from '@/helpers/dataValidator';


export default {
    name: 'RegisterScreen',
    mounted() {
        if (typeof(localStorage.getItem('ma-t')) === 'string' && localStorage.getItem('ma-t').length > 0) {
            confirm('You are already logged in. Do you want to logout?') ? localStorage.clear() : this.$router.push('/');
        }
    },
    data() {
        return {
            userName: '',
            userDob: '',
            userGender: '',
            userEmail: '',
            userPassword: '',
            message: '',
            buttonEnabled: true,
            currentStep: 0,
            otp: '',
            otpToken: '',
        }
    },
    methods: {
        async registerUser() {
            this.buttonEnabled = false;

            if (!validateUserFullName(this.userName)) {
                this.message = 'Please enter a valid name.';
                this.buttonEnabled = true;
                return;
            }

            if (!validateGender(this.userGender)) {
                this.message = 'Please choose your gender';
                this.buttonEnabled = true;
                return;
            }

            if (!validateUserDob(this.userDob)) {
                this.message = 'Please enter a valid date of birth in the format YYYY-MM-DD.';
                this.buttonEnabled = true;
                return;
            }

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

            // console.log(JSON.stringify({
            //     "userFullName": this.userName,
            //     "userEmail": this.userEmail,
            //     "userPassword": this.userPassword,
            //     "userDob": this.userDob,
            //     "userGender": this.userGender,
            // }));


            try {
                const response = await fetch(REGISTER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "userFullName": this.userName,
                        "userEmail": this.userEmail,
                        "userPassword": this.userPassword,
                        "userDob": this.userDob,
                        "userGender": this.userGender,
                    }),
                });

                if (response.status === 400) {
                    const data = await response.json();
                    this.message = data['message'] ?? 'Something went wrong. Please try again later.';
                } else if (response.status === 200) {
                    this.currentStep = 1;
                    const data = await response.json();

                    this.otpToken = data['token'];

                } else {
                    this.message = 'Something went wrong. Please try again later.'
                }

            } catch (e) {
                this.message = 'Something went wrong. Please try again later.'
                console.error(e);
            } finally {
                this.buttonEnabled = true;
            }
        },

        async verifyOtp() {
            this.buttonEnabled = false;

            if (!validateOtp(this.otp)) {
                this.message = 'Please enter a valid OTP.';
                this.buttonEnabled = true;
                return;
            }

            this.message = '';

            try {
                const response = await fetch(VERIFY_OTP_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + this.otpToken,
                    },
                    body: JSON.stringify({
                        "otp": this.otp,
                    }),
                });

                if (response.status === 400) {
                    const data = await response.json();
                    this.message = data['message'] ?? 'Something went wrong. Please try again later.';
                } else if (response.status === 200) {
                    alert('Account created successfully. Please login to continue.');
                    this.$router.replace('/login');
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