<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 col-12 col-md-6">
        <div class="container">
            <div class="d-flex justify-content-center row">
                <div class="col-auto col-xl-7">
                    <FormKit type="form" :plugins="[stepPlugin]" :actions="false" :incomplete-message="false">
                        <article>
                            <section class="card shadow-sm">
                                <div class="step-header ps-2">
                                    <div class="d-flex">
                                        <div class="step"
                                             :class="{'active':activeStep === stepName, 'bg-danger text-light':checkStepValidity(stepName)}"
                                             v-for="(_, stepName) in steps" :key="stepName">
                                            <font-awesome-icon v-if="checkStepValidity(stepName)"
                                                               :icon="faCircleExclamation"
                                                               class="small exclaim text-danger"/>
                                        </div>
                                    </div>
                                </div>
                                <h2 class="px-3 mt-3">Sign In</h2>
                                <div
                                    class="card-body p-4 p-xl-5 d-flex flex-column justify-content-center align-items-center">
                                    <section v-show="activeStep === '01'">
                                        <FormKit type="form" #default="{ value, state: { valid } }"
                                                 :plugins="[stepPlugin]" @submit="submitCredentials"
                                                 :actions="false" :incomplete-message="false">
                                            <FormKit type="group" id="01" name="01" title="Sign In"
                                                     :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                                <FormKit type="email" name="email" placeholder="Email address"
                                                         validation="required"/>

                                                <FormKit type="password" name="password" placeholder="password"
                                                         validation="required|min:8"/>
                                            </FormKit>

                                            <div class="text-center">
                                                <small class="text-danger" v-show="invalidCredentials">
                                                    Invalid Credentials
                                                </small>
                                            </div>

                                            <FormKit type="submit" input-class="btn btn-sm btn-primary ms-auto"
                                                     :disabled="!valid">
                                                Sign In
                                                <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                            </FormKit>
                                        </FormKit>
                                    </section>

                                    <section v-show="activeStep === '02'">
                                        <FormKit type="form" #default="{ value, state: { valid } }"
                                                 :plugins="[stepPlugin]" @submit="submitVerification"
                                                 :actions="false" :incomplete-message="false">
                                            <FormKit type="group" id="02" name="02" title="Verification"
                                                     :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                                <FormKit name="otp" placeholder="Enter verification OTP"
                                                         validation="required"/>
                                            </FormKit>

                                            <div class="mt-3 d-flex justify-content-end">
                                                <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                                         v-if="activeStep !== '01'" @click="setStep(-1)">
                                                    <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                                    Back
                                                </FormKit>
                                                <FormKit type="submit" input-class="btn btn-sm btn-primary ms-2"
                                                         :disabled="!valid">
                                                    Verify
                                                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                                                </FormKit>
                                            </div>
                                        </FormKit>
                                    </section>

                                    <div class="mt-3">
                                        <small>Haven't Signed In? </small>
                                        <small>
                                            <a href="/register">Sign Up</a>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleExclamation, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import type { FormKitNode } from "@formkit/core";
import useSteps from "@/hooks/useSteps";
import { LoginData, useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import router from "@/router";

const invalidCredentials = ref(false)

const { steps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = async (formData: { '01': LoginData }, node?: FormKitNode) => {
    try {
        await useAuthStore().authenticate(formData['01'].email, formData['01'].password)

        setStep(1)
    } catch (err) {
        invalidCredentials.value = true

        if (node) node.props.disabled = false
    }
}

const submitVerification = async (formData: { '02': { otp: string } }, node?: FormKitNode) => {
    console.log(formData)

    try {
        const res = await useAuthStore().verify(formData['02'].otp)

        console.log(res)

        await router.push({ name: 'dashboard' })
    } catch (err: any) {
        invalidCredentials.value = true

        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}
</script>

