<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 col-12 col-md-6">
        <div class="container">
            <div class="d-flex justify-content-center row">
                <div class="col-auto col-xl-10">
                    <FormKit type="form" ref="form" #default="{ value, state: { valid } }" :plugins="[stepPlugin]"
                             @submit="submitVerification" :actions="false" :incomplete-message="false">
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
                                <h2 class="px-3 mt-3">Sign Up</h2>

                                <div
                                    class="card-body p-4 p-sm-5 d-flex flex-column justify-content-center align-items-center">
                                    <section v-show="activeStep === '01'">
                                        <FormKit type="group" id="01" name="01" title="Sign Up"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <FormKit name="name" placeholder="Name" validation="required"/>

                                            <div class="row g-2">
                                                <div class="col">
                                                    <FormKit name="enterprise_email" placeholder="Email address"
                                                             validation="required" validation-label="Enterprise email"/>
                                                </div>
                                                <div class="col">
                                                    <FormKit name="enterprise_phone" placeholder="Phone number"
                                                             validation="required" validation-label="Enterprise phone"/>
                                                </div>
                                            </div>

                                            <div class="row g-2">
                                                <div class="col">
                                                    <FormKit type="password" name="password" placeholder="Password"
                                                             validation="required|min:7"/>
                                                </div>
                                                <div class="col">
                                                    <FormKit type="password" name="password_confirmation"
                                                             placeholder="Confirm password"
                                                             validation="required|confirm:password"
                                                             validation-label="Password confirmation"/>
                                                </div>
                                            </div>
                                        </FormKit>
                                    </section>

                                    <section v-show="activeStep === '02'">
                                        <FormKit type="group" id="02" name="02" title="Verification"
                                                 :config="{classes:{input:'form-control', outer:'mb-3'}}">
                                            <FormKit name="email_otp" placeholder="Email verification OTP"
                                                     validation="required" validation-label="Email verification OTP"/>
                                            <FormKit name="phone_otp" placeholder="Phone verification OTP"
                                                     validation="required"
                                                     validation-label="Phone number verification OTP"/>
                                        </FormKit>
                                    </section>

                                    <div class="mt-3 d-flex align-self-end">
                                        <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                                 v-if="activeStep !== '01'" @click="setStep(-1)">
                                            <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                            Back
                                        </FormKit>
                                        <FormKit type="submit" input-class="btn btn-sm btn-primary ms-2"
                                                 v-if="activeStep !== '02'"
                                                 @click.prevent="e => submitCredentials(value['01'], e)">
                                            Proceed
                                            <font-awesome-icon :icon="faRightLong" class="ms-1"/>
                                        </FormKit>
                                        <FormKit type="submit" input-class="btn btn-sm btn-primary ms-2"
                                                 v-if="activeStep === '02'" :disabled="!valid">
                                            Verify
                                            <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                                        </FormKit>
                                    </div>

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
                                    <small class="text-center opacity-75">Sidooh, Makes You Money with Every
                                        Purchase!</small>
                                </i>
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
import { RegistrationData, useAuthStore } from "@/stores/auth";
import { toast } from "@/utils/helpers";
import router from "@/router";

const { steps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = async (formData: RegistrationData, e: any) => {
    const node = getNode(activeStep.value)

    if (!node) return

    if (!steps[activeStep.value].valid) {
        node?.submit()

        return
    }

    if (node) node.props.disabled = true
    e.target.disabled = true
    e.target.classList.add('loading')

    try {
        await useAuthStore()
            .register(formData)

        setStep(1)
    } catch (err) {
        if (node) node.props.disabled = false
        e.target.disabled = false
        e.target.classList.remove('loading')

        await toast({
            html: 'Unable to sign you up. Kindly contact <a href="mailto:@customersupport@sidooh.co.ke">Customer support</a>',
            icon: 'error'
        })
    }
}

const submitVerification = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    if (node) node.props.disabled = true

    try {
        node?.clearErrors()

        await useAuthStore().verify((Object.values(formData)[1] as { otp: string }).otp)
            .then(() => {
                router.push({ name: 'login' })
            })
            .catch(err => console.log(err))
    } catch (err: any) {
        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}
</script>