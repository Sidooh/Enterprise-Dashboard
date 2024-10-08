<template>
    <div class="container">
        <div class="d-flex justify-content-center row">
            <div class="col-auto col-xl-11">
                <FormKit type="form" :plugins="[stepPlugin]" :actions="false" :incomplete-message="false">
                    <article>
                        <section class="card shadow-sm p-2">
                            <div class="card-header">
                                <div class="step-header">
                                    <img class="me-2" src="/sidooh.png" alt="" width="100">
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
                                <h5>Enterprise Sign Up</h5>
                            </div>

                            <div
                                class="card-body d-flex flex-column justify-content-center align-items-center">
                                <section v-show="activeStep === 'auth'">
                                    <FormKit type="form" #default="{ state: { valid } }"
                                             :plugins="[stepPlugin]" @submit="submitCredentials"
                                             :actions="false" :incomplete-message="false">
                                        <FormKit type="group" id="auth" name="auth" title="Sign Up"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <FormKit name="name" placeholder="Enterprise name" validation="required" autocomplete="off"/>
                                            <FormKit name="admin_name" placeholder="Admin name"
                                                     validation="required" validation-label="Admin name"/>

                                            <div class="row g-2">
                                                <div class="col">
                                                    <FormKit name="email" placeholder="Email address"
                                                             validation="required"
                                                             validation-label="Enterprise email"/>
                                                </div>
                                                <div class="col">
                                                    <FormKit name="phone" placeholder="Phone number"
                                                             validation="required"
                                                             validation-label="Enterprise phone"/>
                                                </div>
                                            </div>

                                            <div class="row g-2">
                                                <div class="col">
                                                    <FormKit type="password" name="password" placeholder="Password"
                                                             help="Uppercase, Lowercase, Number, Symbol, Min:10"
                                                             :validation="[['required'],['matches', /^(?=.*[A-Z])(?=.*\W)(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}:;<>,?~_+-=|]).{10,64}$/]]"/>
                                                </div>
                                                <div class="col">
                                                    <FormKit type="password" name="password_confirmation"
                                                             placeholder="Confirm password"
                                                             validation="required|confirm:password"
                                                             validation-label="Password confirmation"/>
                                                </div>
                                            </div>
                                        </FormKit>

                                        <FormKit type="submit" input-class="btn btn-sm btn-primary ms-auto"
                                                 :disabled="!valid || isLoading">
                                            Sign Up
                                            <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                        </FormKit>
                                    </FormKit>
                                </section>

                                <section v-show="activeStep === 'verify'">
                                    <FormKit type="form" #default="{ state: { valid } }"
                                             :plugins="[stepPlugin]" @submit="submitVerification"
                                             :actions="false" :incomplete-message="false">
                                        <FormKit type="group" id="verify" name="verify" title="Verification"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <FormKit type="number" name="email_otp"
                                                     placeholder="Email verification OTP"
                                                     validation="required|number|length:6,6" :validation-messages="{
                                                            length:'Email OTP must be 6 characters.'
                                                         }" validation-label="Email verification OTP"/>
                                            <FormKit type="number" name="phone_otp"
                                                     placeholder="Phone verification OTP"
                                                     validation="required|number|length:6,6" :validation-messages="{
                                                            length:'Phone OTP must be 6 characters.'
                                                         }" validation-label="Phone number verification OTP"/>
                                        </FormKit>

                                        <div class="mt-3 d-flex justify-content-end">
                                            <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                                     v-if="activeStep !== 'auth'" @click="setStep(-1)">
                                                <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                                Back
                                            </FormKit>
                                            <FormKit type="submit" input-class="btn btn-primary ms-2"
                                                     :disabled="!valid">
                                                Verify
                                                <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                                            </FormKit>
                                        </div>
                                    </FormKit>
                                </section>

                                <div class="mt-3">
                                    <small>Haven't Signed Up? </small>
                                    <small>
                                        <a href="/login">Sign In</a>
                                    </small>
                                </div>
                            </div>
                        </section>

                        <div class="position-relative mt-4">
                            <hr/>
                            <div class="text-center">🌟</div>
                        </div>

                        <div class="text-center">
                            <i>
                                <small class="text-center opacity-75">
                                    Sidooh, Makes You Money with Every Purchase!
                                </small>
                            </i>
                        </div>
                    </article>
                </FormKit>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleExclamation, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import type { FormKitGroupValue, FormKitNode } from "@formkit/core";
import useSteps from "@/hooks/useSteps";
import { RegistrationData, useAuthStore } from "@/stores/auth";
import router from "@/router";
import { toast } from "@nabcellent/sui-vue";
import { ref } from "vue";

const isLoading = ref(false)
const { steps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    isLoading.value = true

    try {
        const data = formData.auth as RegistrationData
        const res: any = await useAuthStore().register(data)

        if (res.error) {
            node?.setErrors(res.error)
        } else {
            setStep(1)
        }
    } catch (err: any) {
        isLoading.value = false

        if (node) node.props.disabled = false

        toast({
            html: 'Unable to sign you up. Kindly contact <a href="mailto:@customersupport@sidooh.co.ke">Customer support</a>',
            icon: 'error'
        })
    }
}

const submitVerification = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    isLoading.value = true

    try {
        const data = formData.verify as { phone_otp: number, email_otp: number }
        node?.clearErrors()

        await useAuthStore().verifyUser(Number(data.phone_otp), Number(data.email_otp))

        toast({ titleText: 'Registration Successful!' })

        await router.push({ name: 'login' })
    } catch (err: any) {
        isLoading.value = false

        node?.setErrors(err.formErrors, err.fieldErrors)

        toast({
            html: 'Unable to verify you. Kindly contact <a href="mailto:@customersupport@sidooh.co.ke">Customer support</a>',
            icon: 'error'
        })
    }
}
</script>