<script setup lang="ts">

import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const email = ref()
const password = ref()

const emailError = ref(false)
const passwordError = ref(false)
const invalidCredentials = ref(false)

const isEmailValid = (email: string) => {
    const emailRegex = /^[A-z\d]+@[A-z]+(\.[A-z]+)+$/;
    return email && email.toLowerCase().match(emailRegex)
}

const isPasswordValid = (password: string) => password && password.length >= 8

const submit = () => {
    emailError.value = !isEmailValid(email.value)
    passwordError.value = !isPasswordValid(password.value)

    if (!emailError.value && !passwordError.value) {
        useAuthStore()
            .authenticate(email.value, password.value)
            .then(() => router.push({ name: 'dashboard' }))
            .catch(() => invalidCredentials.value = true)
    }
}
</script>

<template>
    <div class="row d-flex justify-content-center align-items-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
            <a class="d-flex align-items-center justify-content-center mb-4" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="100">
            </a>
            <div class="card">
                <div class="card-body p-4 p-sm-5">
                    <div class="row align-items-center justify-content-between mb-2">
                        <div class="col-auto">
                            <h5>Sign In</h5>
                        </div>
                    </div>
                    <form id="sign-in">
                        <div class="mb-3">
                            <input class="form-control" type="email"
                                   placeholder="Email address" aria-label="" required
                                   v-model="email">
                            <small class="form-control-sm text-danger" v-show="emailError">Invalid email address</small>
                        </div>
                        <div class="mb-3">
                            <input class="form-control" type="password" placeholder="Password" aria-label="" required
                                   v-model="password">
                            <span class="form-control-sm alert-danger"
                                  v-show="passwordError">min password length: 8</span>
                        </div>
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                                <span class="form-control-sm alert-danger" v-show="invalidCredentials">Invalid Credentials</span>
                            </div>
                            <div class="col-auto">
                                <a class="fs--1" href="/password/reset">Forgot Password?</a>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                            <button type="submit" class="col btn btn-sm btn-primary ld-ext-right"
                                    @click.prevent="submit">
                                Sign In
                                <span class="ld ld-ring ld-spin"></span>
                            </button>
                        </div>
                    </form>

                    <div class="position-relative mt-4">
                        <hr/>
                        <div class="text-center">🌟</div>
                    </div>

                    <div class="text-center">
                        <i>
                            <small class="text-center opacity-75">Sidooh, Makes You Money with Every Purchase!</small>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

