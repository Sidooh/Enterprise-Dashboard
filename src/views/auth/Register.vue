<template>
    <div class="row d-flex justify-content-center align-items-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-6 position-relative">
            <a class="d-flex align-items-center justify-content-center mb-4" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="100">
            </a>

            <FormKit type="form" #default="{ value, state: { valid } }" :plugins="[stepPlugin]" @submit="submitApp"
                     :actions="false">
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
                                <font-awesome-icon v-if="checkStepValidity(stepName)" :icon="faCircleExclamation"
                                                   class="small exclaim text-danger"/>
                            </div>
                        </div>
                    </header>

                    <section class="card shadow-sm">
                        <div class="card-body p-4 d-flex flex-column justify-content-center align-items-center">

                            <h2>Sign Up</h2>

                            <section v-show="activeStep === '01'">
                                <FormKit type="group" id="01" name="01" title="Sign Up"
                                         :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                    <FormKit name="name" placeholder="Enterprise name" validation="required"/>

                                    <div class="row g-2">
                                        <div class="col">
                                            <FormKit name="country" placeholder="Country" validation="required"/>
                                        </div>
                                        <div class="col">
                                            <FormKit name="address" placeholder="Address" validation="required"/>
                                        </div>
                                    </div>

                                    <file-pond v-model="file" label-idle="Drop company registration letter here..."
                                               ref="pond" accepted-file-types="application/pdf, application/msword"/>

                                    <hr>

                                    <FormKit name="admin_name" placeholder="Full Name" validation="required"/>

                                    <div class="row g-2">
                                        <div class="col">
                                            <FormKit type="email" name="admin_email" placeholder="Email address"
                                                     validation="required|email"/>
                                        </div>
                                        <div class="col">
                                            <FormKit type="tel" name="admin_phone" placeholder="Phone number"
                                                     validation="required|number"/>
                                        </div>
                                    </div>

                                    <FormKit type="password" name="password" placeholder="password"
                                             validation="required|min:7"/>
                                </FormKit>
                            </section>

                            <section v-show="activeStep === '02'">
                                <FormKit type="group" id="02" name="02" title="Verification"
                                         :config="{classes:{message:'text-danger small', input:'form-control', outer:'mb-3'}}">
                                    <FormKit name="email_otp" placeholder="Email verification OTP"
                                             validation="required"/>
                                    <FormKit name="phone_otp" placeholder="Phone verification OTP"
                                             validation="required"/>
                                </FormKit>
                            </section>

                            <div class="mt-3 d-flex align-self-end">
                                <FormKit type="button" input-class="btn btn-sm btn-outline-secondary"
                                         v-if="activeStep !== '01'" @click="setStep(-1)">
                                    <font-awesome-icon :icon="faLeftLong" class="me-2"/>
                                    Back
                                </FormKit>
                                <FormKit type="button" input-class="btn btn-sm btn-primary ms-2"
                                         v-if="activeStep !== '02'" @click="setStep(1)">
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleExclamation, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import vueFilePond from 'vue-filepond';
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// Import styles
import 'filepond/dist/filepond.min.css';
import type { FormKitGroupValue, FormKitNode } from "@formkit/core";
import useSteps from "@/hooks/useSteps";
import { ref } from "vue";

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType);

const file = ref(null)

const { steps, visitedSteps, activeStep, setStep, stepPlugin, checkStepValidity } = useSteps()

// NEW: submit handler, which posts to our fake backend.
const submitApp = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        console.log(formData)

        alert('Your application was submitted successfully!')
    } catch (err: any) {
        node?.setErrors(err.formErrors, err.fieldErrors)
    }
}
</script>