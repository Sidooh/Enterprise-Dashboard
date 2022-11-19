<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Float Requests" :columns="columns" :data="tableData" :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewFloatRequest">
        <Modal id="create-float-request">
            <template #title>Create New Float Request</template>
            <template #body>
                <FormKit type="number" min="1" name="amount" step="1" placeholder="Enter float amount"
                         :classes="{input:'form-control', outer:'mb-3'}" validation="required"/>
                <FormKit type="textarea" name="reason" placeholder="Enter float request reason..."
                         :classes="{input:'form-control', outer:'mb-3'}" validation=""/>
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
import TableDate from "@/components/TableDate.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h, onMounted, reactive } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FloatRequest } from "@/utils/types";
import moment from "moment";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'


const columnHelper = createColumnHelper<FloatRequest>()
const columns = [
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() as Status })
    }),
    columnHelper.accessor('modified_by', {
        header: 'Modified By',
    }),
    columnHelper.accessor('updated_at', {
        header: 'Approved At',
        cell: ({ row }: CellContext<FloatRequest, string>) => h(TableDate, { date: row.original.updated_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<FloatRequest, string>) => h(
            RouterLink,
            { to: { name: 'float.accounts.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]
const tableData: FloatRequest[] = [
    {
        id: 1,
        amount: 17000,
        status: Status.APPROVED,
        modified_by: 'Dr. H',
        updated_at: moment().subtract(1, 'd').toISOString()
    },
    {
        id: 1,
        amount: 73000,
        status: Status.APPROVED,
        modified_by: 'Lil Nabz',
        updated_at: moment().subtract(1, 'M').toISOString()
    },
    {
        id: 1,
        amount: 27000,
        status: Status.DECLINED,
        modified_by: 'Sidney',
        updated_at: moment().subtract(1, 'h').toISOString()
    },
]

const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

onMounted(() => {
    state.modal = new BSModal('#create-float-request', {})
})

const handleCreateRow = () => {
    console.log('weee')

    state.modal?.show()
}

const submitNewFloatRequest = async (formData: FormKitGroupValue, node?: FormKitNode) => {
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