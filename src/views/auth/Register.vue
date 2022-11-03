<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 col-12 col-md-6">
        <div class="container">
            <div class="d-flex justify-content-center row">
                <div class="col-auto col-xl-10">
                    <FormKit type="form" ref="form" #default="{ value, state: { valid } }" :plugins="[stepPlugin]"
                             @submit="submitApp" :actions="false" :incomplete-message="false">
                        <article>
                            <header class="shadow-sm">
                                <div class="d-flex">
                                    <div class="progress-step"
                                         :class="{'active':activeStep === stepName, 'bg-danger text-light':checkStepValidity(stepName)}"
                                         v-for="(step, stepName) in steps" :key="stepName">
                                        <span>{{ stepName }}</span>
                                        <div class="position-absolute title"
                                             :class="{'text-danger':checkStepValidity(stepName)}">{{ step.title }}
                                        </div>
                                        <font-awesome-icon v-if="checkStepValidity(stepName)"
                                                           :icon="faCircleExclamation"
                                                           class="small exclaim text-danger"/>
                                    </div>
                                </div>
                            </header>

                            <section class="card shadow-sm">
                                <div
                                    class="card-body p-4 p-sm-5 d-flex flex-column justify-content-center align-items-center">

                                    <h2>Sign Up</h2>

                                    <section v-show="activeStep === '01'">
                                        <h6 class="mb-0 mt-3">Enterprise</h6>
                                        <FormKit type="group" id="01" name="01" title="Sign Up"
                                                 :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
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

                                            <h6 class="mb-0 mt-3">Admin</h6>

                                            <FormKit name="admin_name" placeholder="Full Name" validation="required"
                                                     validation-label="Admin full name"/>

                                            <div class="row g-2">
                                                <div class="col">
                                                    <FormKit type="email" name="admin_email" placeholder="Email Address"
                                                             validation="required|email"
                                                             validation-label="Admin email address"/>
                                                </div>
                                                <div class="col">
                                                    <FormKit type="tel" name="admin_phone" placeholder="Phone number"
                                                             validation="required|number"
                                                             validation-label="Admin phone number"/>
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
                                                 :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
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
                                        <FormKit type="button" input-class="btn btn-sm btn-primary ms-2"
                                                 v-if="activeStep !== '02'" @click="submitCredentials(value['01'])">
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
import { RegistrationData, useAuthStore } from "@/stores/auth";
import { toast } from "@/utils/helpers";

const { steps, visitedSteps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

const submitCredentials = (formData: RegistrationData) => {
    if (!steps[activeStep.value].valid) {
        getNode(activeStep.value)?.submit()

        return
    }

    useAuthStore()
        .register(formData)
        .then(() => {
            setStep(1)
        })
        .catch(() => toast({
            html: 'Unable to sign you up. Kindly contact <a href="mailto:@customersupport@sidooh.co.ke">Customer support</a>',
            icon: 'error'
        }))
}

const submitApp = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        console.log(formData)

        alert('Your application was submitted successfully!')
    } catch (err: any) {
        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}
</script>