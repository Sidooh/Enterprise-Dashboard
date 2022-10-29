<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const state = reactive({
    activeStep: 0,
    animation: 'animate-in',
    formSteps: [
        {
            title: 'Enterprise Details',
            fields: [
                { label: 'Enterprise Name', value: '', valid: true, pattern: /.+/ },
                { label: 'Country', value: '', valid: true, pattern: /.+/ },
                { label: 'Address', value: '', valid: true, pattern: /.+/ },
                { label: 'Company Registration Letter', value: '', valid: true, pattern: /.+/ },
            ]
        },
        {
            title: 'Verification',
            fields: [
                { label: 'Phone verification OTP', value: '', valid: true, pattern: /.+/ },
                { label: 'Email Verification', value: '', valid: true, pattern: /.+/ }
            ]
        },
        {
            title: 'Welcome!'
        }
    ]
})

const nextStep = () => {
    state.animation = 'animate-out'

    setTimeout(() => {
        state.animation = 'animate-in'
        state.activeStep++
    }, 500)
}

const validateFields = () => {
    let valid = true;

    state.formSteps[state.activeStep].fields?.forEach(f => {
        if (!f.pattern.test(f.value)) {
            valid = false
            f.valid = false
        } else {
            f.valid = true
        }
    })

    if (valid) {
        nextStep()
    } else {
        state.animation = 'animate-invalid'

        setTimeout(() => state.animation = '', 400)
    }
}

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
            .then(() => {
                let urlIntended = localStorage.getItem('urlIntended') || '/';
                localStorage.removeItem('urlIntended')

                router.push({ path: urlIntended })
            })
            .catch(() => invalidCredentials.value = true)
    }
}
</script>

<template>
    <div class="row d-flex justify-content-center align-items-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 position-relative">
            <a class="d-flex align-items-center justify-content-center mb-4" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="100">
            </a>

            <article>
                <header>
                    <div class="progress-bar">
                        <div class="progress-step" :class="{'active':i === state.activeStep}"
                             v-for="(step, i) in state.formSteps" :key="`step-${i}`">
                            {{ i + 1 }}
                        </div>
                    </div>
                </header>

                <section class="card" :class="state.animation">
                    <div class="card-body p-4 p-sm-5 d-flex flex-column justify-content-center align-items-center">
                        <h2>{{ state.formSteps[state.activeStep].title }}</h2>

                        <div class="input-fields w-100">
                            <div class="mb-3" v-for="(field, i) in state.formSteps[state.activeStep].fields"
                                 :key="`field-${i}`">
                                <input type="text" v-model="field.value" class="form-control"
                                       :class="{'is-invalid': !field.valid}" :placeholder="field.label"
                                       required>
                            </div>
                        </div>

                        <div class="actions">
                            <button class="btn btn-sm btn-primary" @click="validateFields"
                                    v-if="state.activeStep + 1 < state.formSteps.length - 1">Proceed
                            </button>
                            <button class="btn btn-sm btn-primary" @click="validateFields"
                                    v-if="state.activeStep + 1 === state.formSteps.length - 1">Done
                            </button>
                        </div>
                    </div>
                </section>
            </article>

            <div class="card">
                <div class="card-body p-4 p-sm-5">
                    <div class="row align-items-center justify-content-between mb-2">
                        <div class="col-auto"><h5>Sign Up</h5></div>
                        <div class="col-auto fs-6 text-600">
                            <span>Have an account? <router-link :to="{name:'login'}">Sign In</router-link></span>
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

<style scoped>
article {
    display: flex;
    margin: 10px;
    width: calc(100% - 20px);
    max-width: 720px;
    min-height: 480px;
    perspective: 1000px;
}

article header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 480px;
    background-color: #fff;
    border-right: 2px dotted #070068;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
    0 10px 10px rgba(0, 0, 0, .2)
}

.progress-step {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 20px;
    color: #fff;
    background-color: #070068;
    font-weight: bold;
}

.progress-step.active {
    background-color: #070068;
}

.progress-step.active ~ .progress-step {
    color: #555;
    background-color: #ccc;
}

.progress-step.active ~ .progress-step::before {
    background-color: #ccc;
}

.progress-step:before {
    content: '';
    position: absolute;
    top: -20px;
    width: 2px;
    height: 20px;
    background-color: #070068;
    z-index: 10;
}

.progress-step:first-child::before {
    display: none;
}

section {
    width: 100%;
    border-radius: 0;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
    0 10px 10px rgba(0, 0, 0, .2)
}

section h2 {
    font-size: 1.6rem;
    color: #070068;
    margin: 0;
    padding: 20px;
}

.actions {
    margin: 0;
}

.animate-in {
    transform-origin: left;
    animation: in .6s ease-in-out;
}

.animate-out {
    transform-origin: bottom left;
    animation: out .6s ease-in-out;
}

.animate-invalid {
    /*transform-origin: bottom left;*/
    animation: invalid .4s ease-in-out;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: rotateY(90deg);
    }
    100% {
        opacity: 1;
        transform: rotateY(0deg);
    }
}

@keyframes out {
    0% {
        transform: translateY(0px) rotate(0deg);
    }
    60% {
        transform: rotate(10deg);
    }
    100% {
        transform: translateY(1000px);
    }
}

@keyframes invalid {
    0% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(40px);
    }
    40% {
        transform: translateX(20px);
    }
    60% {
        transform: translateX(40px);
    }
    80% {
        transform: translateX(20px);
    }
    100% {
        transform: translateX(0);
    }
}
</style>