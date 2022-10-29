<script setup lang="ts">
import { reactive } from "vue";
import vueFilePond from 'vue-filepond';
// Import plugins
import FilePondPluginFileValidateType
    from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
// Import styles
import 'filepond/dist/filepond.min.css';

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType);


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
                { type: 'file', label: 'Company Registration Letter', value: '', valid: true, pattern: /.+/ },
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

const prevStep = () => {
    state.animation = 'animate-out'

    setTimeout(() => {
        state.animation = 'animate-in'
        state.activeStep--
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
</script>

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
                            <span>{{ i + 1 }}</span>
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
                                <input v-if="field.type !== 'file'" :type="field.type ?? 'text'"
                                       v-model="field.value" class="form-control" :class="{'is-invalid': !field.valid}"
                                       :placeholder="field.label" required>
                            </div>
                            <div class="mb-3" v-for="(f, i) in state.formSteps[state.activeStep].fields">
                                <file-pond :key="`file-field-${i}`" v-if="f?.type === 'file'" v-model="f.value"
                                           label-idle="Drop company registration letter here..." ref="pond"
                                           accepted-file-types="application/pdf, application/msword"/>
                            </div>
                        </div>

                        <div class="align-self-end">
                            <button class="btn btn-sm btn-outline-secondary" @click="prevStep"
                                    v-if="state.activeStep > 0">Back
                            </button>
                            <button class="btn btn-sm btn-primary ms-2" @click="nextStep"
                                    v-if="state.activeStep + 1 < state.formSteps.length - 1">Proceed
                            </button>
                            <button class="btn btn-sm btn-primary ms-2" @click="nextStep"
                                    v-if="state.activeStep + 1 === state.formSteps.length - 1">Sign Up
                            </button>
                        </div>
                    </div>
                </section>

                <div class="position-relative mt-4">
                    <hr/>
                    <div class="text-center">🌟</div>
                </div>

                <div class="text-center">
                    <i>
                        <small class="text-center opacity-75">Sidooh, Makes You Money with Every Purchase!</small>
                    </i>
                </div>
            </article>
        </div>
    </div>
</template>

<style scoped>
article {
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
}

.progress-step {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 20px 75px 30px;
    color: #fff;
    background-color: #070068;
    font-weight: bold;
}

.progress-step .title {
    color: #070068;
    font-weight: bold;
}

.progress-step.active ~ .progress-step .title {
    color: #777;
    font-weight: normal;
}

.progress-step .title {
    bottom: -1.3rem;
    font-size: 10pt;
    white-space: nowrap;
}

.progress-step.active {
    background-color: #070068;
}

.progress-step.active ~ .progress-step {
    color: #777;
    background-color: #ccc;
}

.progress-step.active ~ .progress-step::before {
    background-color: #ccc;
}

.progress-step:before {
    content: '';
    position: absolute;
    left: -150px;
    width: 150px;
    height: 2px;
    background-color: #070068;
    z-index: 10;
}

.progress-step:first-child::before {
    display: none;
}

section {
    width: 100%;
    border-radius: 0;
}

section h2 {
    font-size: 1.6rem;
    color: #070068;
    margin: 0;
    padding: .75rem;
}

.animate-in {
    transform-origin: top;
    animation: in .6s ease-in-out;
}

.animate-out {
    transform-origin: top left;
    animation: out .6s ease-in-out;
}

.animate-invalid {
    /*transform-origin: bottom left;*/
    animation: invalid .4s ease-in-out;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: rotateX(-90deg);
    }
    100% {
        opacity: 1;
        transform: rotateX(0deg);
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