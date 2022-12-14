<template>
    <div class="card">
        <div class="card-body">
            <FormKit
                type="form" id="registration-example" submit-label="Register"
                @submit="submitHandler" :actions="false" #default="{ value }">
                <h1>Profile!</h1>
                <p>
                    Here is your profile.
                </p>
                <hr/>

                <FormKit type="text" name="name" label="Name" placeholder="Jane Doe" input-class="form-control"
                         outer-class="mb-3" validation="required" v-model="user.name"/>

                <div class="row g-2">
                    <div class="col mb-3">
                        <FormKit type="text" name="phone" label="Phone number" placeholder="254123456789"
                                 input-class="form-control" outer-class="mb-3" v-model="user.enterprise.phone"
                                 validation="required"/>
                    </div>
                    <div class="col mb-3">
                        <FormKit type="email" name="email" label="Email address" placeholder="jane@example.com"
                                 input-class="form-control" outer-class="mb-3" v-model="user.email"
                                 validation="required|email"/>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col mb-3">
                        <FormKit type="text" name="country" label="Country" placeholder="Kenya"
                                 input-class="form-control" outer-class="mb-3"/>
                    </div>
                    <div class="col mb-3">
                        <FormKit type="text" name="address" label="Address" placeholder="Maruti Apartments"
                                 input-class="form-control" outer-class="mb-3"
                                 validation="required|email"/>
                    </div>
                </div>

                <hr>

                <FormKit type="password" name="current_password" label="Current Password" input-class="form-control"
                         outer-class="mb-3" placeholder="Enter current password"/>
                <div class="row g-2">
                    <div class="col mb-3">
                        <FormKit type="password" name="password" label="New Password" input-class="form-control"
                                 validation="required|length:6|matches:/[^a-zA-Z]/"
                                 :validation-messages="{ matches: 'Please include at least one symbol'}"
                                 placeholder="Enter new password"/>
                    </div>
                    <div class="col mb-3">
                        <FormKit type="password" name="password_confirm" label="Confirm password"
                                 input-class="form-control" placeholder="Confirm new password"
                                 validation="required|confirm"/>
                    </div>
                </div>

                <FormKit type="submit" input-class="btn btn-primary ms-auto">
                    Update
                    <font-awesome-icon :icon="faRotate" class="ms-2"/>
                </FormKit>
            </FormKit>
            <div v-if="submitted">
                <h2>Submission successful!</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from "@/stores/auth";

const submitted = ref(false)
const user = ref(useAuthStore().user)

const submitHandler = async () => {
    // Let's pretend this is an ajax request:
    await new Promise((r) => setTimeout(r, 1000))
    submitted.value = true
}

</script>

<style scoped>

</style>