<template>
    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitVoucherDisbursement">
        <Modal id="disburse-voucher">
            <template #title>Disburse Voucher</template>
            <template #body>
                <FormKit v-if="!accountId" type="select" name="account_id" placeholder="Select account"
                         :options="accountStore.accounts.map(t => ({label:`${t.phone}: ${t.name}`, value:t.id}))"
                         :classes="{input:'form-control', outer:'col-md-12 mb-3'}" validation="required"
                         validation-label="Account"/>
                <FormKit v-if="!voucherTypeId" type="select" name="voucher_type" placeholder="Select voucher"
                         :options="voucherTypeStore.voucher_types.map(t => ({label:t.name, value:t.id}))"
                         :classes="{input:'form-control', outer:'col-md-12 mb-3'}" validation="required"
                         validation-label="Voucher"/>
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
import { useAccountStore } from "@/stores/accounts";

const props = defineProps<{ voucherTypeId?: number, accountId?: number }>()
const emit = defineEmits<{ (e: 'init', modal: BSModal): void, (e: 'created'): void }>()

const accountStore = useAccountStore();
const floatStore = useFloatStore();
const voucherTypeStore = useVoucherTypeStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitVoucherDisbursement = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        const accountId = props.accountId ?? Number(formData.account_id)
        const voucherTypeId = props.voucherTypeId ?? Number(formData.voucher_type)

        if (!accountId) return toast({ titleText: 'Invalid account!' })
        if (!voucherTypeId) return toast({ titleText: 'Invalid voucher!' })

        await voucherTypeStore.disburse(voucherTypeId, accountId, Number(formData.amount))

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Voucher Disbursed!' })

        emit('created')
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#disburse-voucher')

    emit('init', state.modal)

    floatStore.fetchAccount()
    if (!props.accountId) accountStore.fetchAccounts()
    if (!props.voucherTypeId) voucherTypeStore.fetchVoucherTypes()
})
</script>