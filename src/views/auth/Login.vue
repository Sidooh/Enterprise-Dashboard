<template>
    <div class="row d-flex justify-content-center align-items-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 position-relative">
            <a class="d-flex align-items-center justify-content-center mb-4" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="100">
            </a>
            <FormKit type="form" #default="{ value, state: { valid } }" :plugins="[stepPlugin]" @submit="submitApp"
                     :actions="false">
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
                    <header class="shadow-sm">
                        <div class="d-flex">
                            <div class="progress-step" :class="{'active':activeStep === stepName}"
                                 v-for="(step, stepName) in steps" :key="`step-${i}`">
                                <span>{{ stepName }}</span>
                                <div class="position-absolute title">{{ step.title }}</div>
                            </div>
                        </div>
                    </header>

                    <section class="card shadow-sm" :class="state.animation">
                        <div class="card-body p-4 p-sm-5 d-flex flex-column justify-content-center align-items-center">

                            <h2>{{ state.formSteps[state.activeStep].title }}</h2>

                            <section v-show="activeStep === '01'">
                                <FormKit type="group" id="01" name="01"
                                         :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                    <FormKit type="email" name="email" placeholder="Email address"
                                             validation="required"/>

                                    <FormKit type="password" name="password" placeholder="password"
                                             validation="required"/>
                                </FormKit>
                            </section>

                            <section v-show="activeStep === '02'">
                                <FormKit type="group" id="02" name="02"
                                         :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                    <FormKit name="otp" placeholder="Enter verification OTP"
                                             validation="required"/>
                                </FormKit>
                            </section>

                            <div class="mt-3 d-flex align-self-end">
                                <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                         v-if="activeStep !== '01'" @click="setStep(-1)">
                                    Back
                                    <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                </FormKit>
                                <FormKit type="button" input-class="btn btn-sm btn-primary ms-2"
                                         v-if="activeStep !== '02' " @click="setStep(1)">
                                    Proceed
                                    <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                </FormKit>
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
                        <i><small class="text-center opacity-75">Sidooh, Makes You Money with Every
                            Purchase!</small></i>
                    </div>
                </article>
            </FormKit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons'
import type { FormKitGroupValue, FormKitNode } from "@formkit/core";
import useSteps from "@/hooks/useSteps";

type MultiFormState = {
    activeStep: number;
    animation: string;
    formSteps: {
        title: string;
        fields: {
            type?: string;
            name: string;
            label: string;
            value: string;
            valid: boolean;
            validation: string
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
                {
                    type: 'email',
                    label: 'Email address',
                    name: 'email',
                    value: '',
                    valid: true,
                    validation: 'required|email'
                },
                {
                    type: 'password',
                    label: 'Password',
                    name: 'password',
                    value: '',
                    valid: true,
                    validation: 'required|length:8'
                },
            ]
        },
        {
            title: 'Verification',
            fields: [
                { label: 'Enter verification OTP', name: 'otp', value: '', valid: true, validation: 'required' },
            ]
        }
    ]
})

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()

// NEW: submit handler, which posts to our fake backend.
const submitApp = async (formData: FormKitGroupValue, node: FormKitNode) => {
    try {
        alert('Your application was submitted successfully!')
    } catch (err: any) {
        node.setErrors(err.formErrors, err.fieldErrors)
    }
}

const checkStepValidity = (stepName: string) => {
    return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
}
</script>

