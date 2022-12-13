<template>
    <div class="row g-3">
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <count-up :end-val="store.dash_stats.float_balance" :options="{prefix:'KES '}"/>
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1" title="Top Up Float"
                          @click="() => state.modal?.show()">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </span>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Float Amount
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body">
                    <count-up :end-val="store.dash_stats.vouchers_disbursed" :options="{prefix:'KES '}"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Vouchers Disbursed
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body">
                    <count-up :end-val="store.dash_stats.accounts_count" :options="{prefix:'KES '}"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Accounts
                </div>
            </div>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitFloatTopUp">
        <Modal id="float-top-up">
            <template #title>Request Float Top Up</template>
            <template #body>
                <div class="row">
                    <FormKit type="number" name="amount" placeholder="Enter amount" min="1000" max="70000"
                             validation="required|min:1000|max:70000"
                             :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
                    <FormKit type="tel" name="phone" placeholder="Phone number" v-model="phone"
                             :classes="{input:'form-control', outer:'col-md-12 mb-3'}" validation="required"/>
                </div>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Request
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, reactive, ref } from "vue";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { parsePhoneNumber } from "libphonenumber-js";
import { toast } from "@/utils/helpers";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { useAuthStore } from "@/stores/auth";
import { useEnterpriseStore } from "@/stores/enterprise";
import CountUp from 'vue-countup-v3'


const store = useEnterpriseStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })
const phone = ref(useAuthStore().auth.user.enterprise.phone)

const submitFloatTopUp = async ({ amount, phone }: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        const phoneNumber = parsePhoneNumber(String(phone), 'KE').number

        await store.creditFloat(Number(amount), Number(phoneNumber))

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Float Top Up Successful!' })
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

await store.fetchDashboardStatistics()

onMounted(() => {
    state.modal = new BSModal('#float-top-up')
})
</script>