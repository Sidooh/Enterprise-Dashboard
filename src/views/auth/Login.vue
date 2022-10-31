<template>
    <div class="row d-flex justify-content-center align-items-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 position-relative">
            <a class="d-flex align-items-center justify-content-center mb-4" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="100">
            </a>

            <article>
                <header class="shadow-sm">
                    <div class="d-flex">
                        <div class="progress-step" :class="{'active':i === state.activeStep}"
                             v-for="(step, i) in state.formSteps" :key="`step-${i}`">
                            <span>{{ String(i + 1).padStart(2, '0') }}</span>
                            <div class="position-absolute title">{{ step.title }}</div>
                        </div>
                    </div>
                </header>

                <section class="card shadow-sm" :class="state.animation">
                    <div class="card-body p-4 p-sm-5 d-flex flex-column justify-content-center align-items-center">
                        <h2>{{ state.formSteps[state.activeStep].title }}</h2>

                        <div class="input-fields w-100">
                            <div class="mb-3" v-for="(field, i) in state.formSteps[state.activeStep].fields"
                                 :key="`field-${i}`">
                                <input v-if="field?.type !== 'file'" :type="field?.type ?? 'text'"
                                       v-model="field.value" class="form-control" :class="{'is-invalid': !field.valid}"
                                       :placeholder="field.label" required>
                            </div>
                        </div>

                        <div class="mt-3 align-self-end">
                            <button class="btn btn-sm btn-outline-secondary" @click="prevStep"
                                    v-if="state.activeStep > 0 && state.activeStep <= state.formSteps.length - 2">
                                <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                Back
                            </button>
                            <button class="btn btn-sm btn-primary ms-2" @click="nextStep"
                                    v-if="state.activeStep + 1 < state.formSteps.length - 1">Proceed
                                <font-awesome-icon :icon="faRightLong" class="ms-2"/>
                            </button>
                            <button class="btn btn-sm btn-primary ms-2" @click="nextStep"
                                    v-if="state.activeStep + 1 === state.formSteps.length - 1">
                                Finish
                                <font-awesome-icon :icon="faUserPlus" class="ms-1"/>
                            </button>
                        </div>

                        <div class="col-auto fs--1 text-600">
                            <small>Already registered? </small>
                            <small>
                                <router-link :to="{name:'login'}">Sign In</router-link>
                            </small>
                        </div>
                    </div>
                </section>

                <div class="position-relative mt-4">
                    <hr/>
                    <div class="text-center">🌟</div>
                </div>

                <div class="text-center">
                    <i><small class="text-center opacity-75">Sidooh, Makes You Money with Every Purchase!</small></i>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLeftLong, faRightLong, faUserPlus } from '@fortawesome/free-solid-svg-icons'

type MultiFormState = {
    activeStep: number;
    animation: string;
    formSteps: {
        title: string;
        fields: {
            type?: string;
            label: string;
            value: string;
            valid: boolean;
            pattern: RegExp;
        }[];
    }[];
}

const state = reactive<MultiFormState>({
    activeStep: 0,
    animation: 'animate-in',
    formSteps: [
        {
            title: 'Sign In',
            fields: [
                { type: 'email', label: 'Email address', value: '', valid: true, pattern: /.+/ },
                { type: 'password', label: 'Password', value: '', valid: true, pattern: /.+/ },
            ]
        },
        {
            title: 'Verification',
            fields: [
                { label: 'Phone verification OTP', value: '', valid: true, pattern: /.+/ },
            ]
        }
    ]
})

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

const nextStep = () => {
    state.animation = 'animate-out'

    setTimeout(() => {
        state.animation = 'animate-in'
        state.activeStep++
    }, 500)
}

const prevStep = () => {
    state.animation = 'animate-out'

    setTimeout(() => {
        state.animation = 'animate-in'
        state.activeStep--
    }, 500)
}

const submit = () => {
    emailError.value = !isEmailValid(email.value)
    passwordError.value = !isPasswordValid(password.value)

    if (!emailError.value && !passwordError.value) {
        useAuthStore()
            .authenticate(email.value, password.value)
            .then(() => {
                let urlIntended = localStorage.getItem('urlIntended') || '/';
                localStorage.removeItem('urlIntended')

                router.push({ path: urlIntended })
            })
            .catch(() => invalidCredentials.value = true)
    }
}
</script>

