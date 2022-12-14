<template>
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
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { toast } from "@/utils/helpers";
import { onMounted, reactive, ref } from "vue";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { parsePhoneNumber } from "libphonenumber-js";
import { useEnterpriseStore } from "@/stores/enterprise";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{ (e: 'init', modal: BSModal): void, (e: 'created'): void }>()

const phone = ref(useAuthStore().user?.enterprise.phone)
const store = useEnterpriseStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitFloatTopUp = async ({ amount, phone }: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        const phoneNumber = parsePhoneNumber(String(phone), 'KE').number

        await store.creditFloat(Number(amount), Number(phoneNumber))

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Float Top Up Successful!' })

        emit('created')
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#float-top-up')

    emit('init', state.modal)
})
</script>