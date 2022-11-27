<template>
    <div class="card">
        <div class="card-body">
            <DataTable :key="tableKey" title="Voucher Types" :columns="columns" :data="store.voucher_types"
                       :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewVoucherType">
        <Modal id="create-voucher-type">
            <template #title>Create New Voucher Type</template>
            <template #body>
                <FormKit type="radio" name="type" validation="required|matches:locked,unlocked"
                         :classes="{options: 'd-flex justify-content-between',wrapper:'form-check', input:'form-check-input', label:'form-check-label'}"
                         :options="{locked:'Locked', unlocked:'Unlocked'}"/>
                <FormKit type="text" name="name" placeholder="Enter voucher name"
                         :classes="{input:'form-control', outer:'mb-3'}" validation="required"/>
                <FormKit type="number" min="1" name="limit" step="1" placeholder="Enter limit amount"
                         :classes="{input:'form-control', outer:'mb-3'}" validation="required"/>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Create
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import Modal from "@/components/Modal.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { VoucherType } from "@/utils/types";
import { Modal as BSModal } from 'bootstrap'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { useVoucherTypeStore } from "@/stores/voucher-types";
import TableDate from "@/components/TableDate.vue";

const columnHelper = createColumnHelper<VoucherType>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('is_locked', {
        header: 'Is Locked',
        cell: info => String(Boolean(info.getValue())).toUpperCase()
    }),
    columnHelper.accessor('limit_amount', {
        header: () => 'Limit',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('expires_at', {
        header: 'Expires At',
        cell: ({ row }: CellContext<VoucherType, string>) => h(TableDate, { date: row.original.expires_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<VoucherType, string>) => h(
            RouterLink,
            { to: { name: 'voucher-types.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]
const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

const store = useVoucherTypeStore();
const tableKey = ref(0);

const handleCreateRow = () => state.modal?.show()

const submitNewVoucherType = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        await store.create(formData as VoucherType)

        state.modal?.hide()
        node?.reset()

        tableKey.value += 1
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    state.modal = new BSModal('#create-voucher-type', {})

    store.fetchVoucherTypes()
})
</script>

<style scoped>

</style>