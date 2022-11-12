<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Voucher Types" :columns="columns" :data="tableData"
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
import StatusBadge from "@/components/StatusBadge.vue";
import Modal from "@/components/Modal.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h, onMounted, reactive } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { VoucherType } from "@/utils/types";
import { Modal as BSModal } from 'bootstrap'
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { FormKitNode } from "@formkit/core";

const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

const columnHelper = createColumnHelper<VoucherType>()
const columns = [
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor(row => row.type, {
        id: 'type',
        cell: info => info.getValue(),
        header: () => 'Type',
    }),
    columnHelper.accessor('limit', {
        header: () => 'Limit',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() as Status })
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

const tableData: VoucherType[] = [
    {
        id: 1,
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: Status.ACTIVE,
    },
    {
        id: 2,
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: Status.INACTIVE,
    },
    {
        id: 3,
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: Status.ACTIVE,
    },
]

onMounted(() => {
    state.modal = new BSModal('#create-voucher-type', {})
})

const handleCreateRow = () => {
    console.log('weee')

    state.modal?.show()
}

const submitNewVoucherType = async (formData: VoucherType, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        console.log(formData)

        await new Promise((r) => setTimeout(r, 2000))

        state.modal?.hide()
        node?.reset()
    } catch (err) {
        console.log(err)
    }
}
</script>

<style scoped>

</style>