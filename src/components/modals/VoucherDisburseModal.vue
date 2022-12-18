<template>
    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitVoucherDisbursement">
        <Modal id="disburse-voucher">
            <template #title>Disburse Voucher</template>
            <template #body>
                <FormKit type="number" min="100" :max="floatStore.float_account.balance" name="amount"
                         placeholder="Enter amount to disburse"
                         :validation="`required|min:100|max:${floatStore.float_account.balance}`"
                         :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Disburse
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { toast } from "@/utils/helpers";
import { onMounted, reactive } from "vue";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { useFloatStore } from "@/stores/float";
import { useVoucherTypeStore } from "@/stores/voucher-types";

const props = defineProps<{ voucherTypeId: number, accountId?: number }>()
const emit = defineEmits<{ (e: 'init', modal: BSModal): void, (e: 'created'): void }>()

const floatStore = useFloatStore();
const voucherTypeStore = useVoucherTypeStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitVoucherDisbursement = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        if (!props.accountId) return toast({ titleText: 'Invalid account!' })

        await voucherTypeStore.disburse(props.voucherTypeId, props.accountId, Number(formData.amount))

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Account Created Successfully!' })

        emit('created')
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#disburse-voucher')

    emit('init', state.modal)

    console.log(floatStore.fetchAccount())
})
</script>