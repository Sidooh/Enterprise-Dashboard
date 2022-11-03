<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 col-12 col-md-6">
        <div class="container">
            <div class="d-flex justify-content-center row">
                <div class="col-auto col-xl-7">
                    <FormKit type="form" #default="{ value, state: { valid } }" :plugins="[stepPlugin]" @submit="submit"
                             :actions="false" :incomplete-message="false">
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
                                        <FormKit type="group" id="01" name="01" title="Sign In"
                                                 :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                            <FormKit type="email" name="email" placeholder="Email address"
                                                     validation="required|email"/>

                                            <FormKit type="password" name="password" placeholder="password"
                                                     validation="required|min:8"/>
                                        </FormKit>
                                    </section>

                                    <section v-show="activeStep === '02'">
                                        <FormKit type="group" id="02" name="02" title="Verification"
                                                 :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                            <FormKit name="otp" placeholder="Enter verification OTP"
                                                     validation="required"/>
                                        </FormKit>
                                    </section>

                                    <div class="text-center">
                                        <small class="text-danger" v-show="invalidCredentials">Invalid
                                            Credentials</small>
                                    </div>

                                    <div class="mt-3 d-flex align-self-end">
                                        <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                                 v-if="activeStep !== '01'" @click="setStep(-1)">
                                            <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                            Back
                                        </FormKit>
                                        <FormKit type="button" input-class="btn btn-sm btn-primary ms-2"
                                                 v-if="activeStep !== '02'"
                                                 @click="e => submitCredentials(value['01'], e)">
                                            Sign In
                                            <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                        </FormKit>
                                        <FormKit type="submit" input-class="btn btn-sm btn-primary ms-2"
                                                 v-if="activeStep === '02'" :disabled="!valid">
                                            Verify
                                            <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                                        </FormKit>
                                    </div>

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
import type { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { getNode } from "@formkit/core";
import useSteps from "@/hooks/useSteps";
import { LoginData, useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import router from "@/router";

const invalidCredentials = ref(false)

const { steps, visitedSteps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = (formData: LoginData, e: any) => {
    const node = getNode(activeStep.value)

    if (!node) return

    if (!steps[activeStep.value].valid) {
        node?.submit()

        return
    }

    if (node) node.props.disabled = true
    e.target.disabled = true

    useAuthStore()
        .authenticate(formData.email, formData.password)
        .then(() => {
            invalidCredentials.value = false

            setStep(1)
        })
        .catch(() => invalidCredentials.value = true)
}

const submit = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    if (node) node.props.disabled = true

    try {
        node?.clearErrors()

        await useAuthStore().verify((Object.values(formData)[1] as { otp: string }).otp)
            .then(() => {
                router.push({ name: 'dashboard' })
            })
            .catch(() => invalidCredentials.value = true)
    } catch (err: any) {
        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}
</script>

