<template>
    <div class="container">
        <div class="d-flex justify-content-center row">
            <div class="col-auto col-xl-9">
                <FormKit type="form" :plugins="[stepPlugin]" :actions="false" :incomplete-message="false">
                    <article>
                        <section class="card shadow-sm p-2">
                            <div class="card-header">
                                <div class="step-header">
                                    <img src="/sidooh.png" alt="" width="100">
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
                                <h5>Enterprise Sign In</h5>
                            </div>
                            <div
                                class="card-body d-flex flex-column justify-content-center align-items-center">
                                <section v-show="activeStep === 'auth'">
                                    <FormKit type="form" #default="{ value, state: { valid } }"
                                             :plugins="[stepPlugin]" @submit="submitCredentials"
                                             :actions="false" :incomplete-message="false">
                                        <FormKit type="group" id="auth" name="auth" title="Sign In"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <FormKit type="email" name="email" placeholder="Email address"
                                                     validation="required"/>

                                            <FormKit type="password" name="password" placeholder="password"
                                                     validation="required"/>
                                        </FormKit>

                                        <FormKit type="submit" input-class="btn btn-sm btn-primary ms-auto"
                                                 :disabled="!valid">
                                            Sign In
                                            <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                        </FormKit>
                                    </FormKit>
                                </section>

                                <section v-show="activeStep === 'verify'">
                                    <FormKit type="form" #default="{ value, state: { valid } }"
                                             ref="verificationForm"
                                             :plugins="[stepPlugin]" @submit="submitVerification"
                                             :actions="false" :incomplete-message="false">
                                        <FormKit type="group" id="verify" name="verify" title="Verification"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <div class="alert alert-success small py-1 new-otp-alert" role="alert">
                                                A one time password verification code has been sent to your phone!
                                            </div>

                                            <FormKit type="number" name="otp" placeholder="Enter verification OTP"
                                                     step="1" min="0" validation="required|number|length:6,6"
                                                     :validation-messages="{length:'OTP must be 6 characters.'}"/>

                                            <div id="resend" class="alert alert-warning small py-1" role="alert">
                                                Haven't received it?
                                                <b v-show="!resendingOTP" @click="resendOTP"
                                                   :class="{'text-decoration-underline cursor-pointer': !(timer > 0)}">
                                                    resend OTP{{ timer > 0 ? ` in ${timer}s` : '.' }}
                                                </b>
                                                <b v-show="resendingOTP"
                                                   @click="resendOTP">Resending...</b>
                                            </div>
                                        </FormKit>

                                        <div class="mt-3 d-flex justify-content-end">
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
                                    <small><a href="/register">Sign Up</a></small>
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
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleExclamation, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import type { FormKitNode } from "@formkit/core";
import { FormKitGroupValue } from "@formkit/core";
import useSteps from "@/hooks/useSteps";
import { LoginData, useAuthStore, User } from "@/stores/auth";
import { ref, watch } from "vue";
import router from "@/router";
import { toast } from "@nabcellent/sui-vue";
import { logger } from "@/utils/logger";

const OTPResendTimer = 60
const timer = ref(OTPResendTimer)
const verificationForm = ref<{ node: FormKitNode | null }>(null!)
const resendingOTP = ref(false)
const { steps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        await useAuthStore().login(formData.auth as LoginData)

        setStep(1)
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'warning' })

        if (node) node.props.disabled = false
    }
}

const submitVerification = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        const data = formData.verify as { otp: string }
        node?.clearErrors()

        await useAuthStore().verifyOTP(Number(data.otp))

        toast({ titleText: 'Login Successful!' })

        router.push({ name: 'dashboard' })

        localStorage.removeItem("userId")
    } catch (err: any) {
        logger.error(err)

        toast({ titleText: 'Invalid OTP!', icon: 'warning' })

        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}

const resendOTP = async () => {
    if (!(timer.value > 0)) {
        resendingOTP.value = true

        const node = verificationForm.value?.node

        if (node) node.props.disabled = true

        const id = (JSON.parse(String(localStorage.getItem("user"))) as User)?.id as number

        await useAuthStore().sendOTP(id, 'SMS')

        if (node) node.props.disabled = false

        resendingOTP.value = false

        timer.value = OTPResendTimer

        document.getElementsByClassName('new-otp-alert').item(0)!.innerHTML = "<b>A new OTP has been sent to your phone.</b>"
    }
}

watch([timer, activeStep], (value) => {
    if (value[1] === 'verify') {
        if (value[0] > 0) {
            setTimeout(() => {
                timer.value--
            }, 1000)
        }
    }
}, { immediate: true })
</script>

