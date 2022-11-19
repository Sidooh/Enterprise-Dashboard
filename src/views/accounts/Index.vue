<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :columns="columns" :data="tableData" :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewAccount">
        <Modal id="create-account">
            <template #title>Create New Account</template>
            <template #body>
                <div class="row">
                    <FormKit name="first_name" placeholder="Enter first name" validation="required"
                             :classes="{input:'form-control', outer:'col mb-3'}" validation-label="First name"/>
                    <FormKit name="last_name" placeholder="Enter last name" validation="required"
                             :classes="{input:'form-control', outer:'col mb-3'}" validation-label="Last name"/>
                </div>
                <div class="row">
                    <FormKit type="tel" min="1" name="phone" step="1" placeholder="Phone number"
                             :classes="{input:'form-control', outer:'col mb-3'}" validation="required"/>
                    <FormKit type="select" name="role" placeholder="Select role"
                             :options="{admin:'Admin', employee:'Employee'}"
                             :classes="{input:'form-control', outer:'col mb-3'}" validation="required"/>
                </div>
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
import Phone from "@/components/Phone.vue";
import Modal from "@/components/Modal.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h, onMounted, reactive } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account, VoucherType } from "@/utils/types";
import moment from "moment";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { Modal as BSModal } from "bootstrap";
import { FormKitNode } from "@formkit/core";

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone number',
        cell: info => h(Phone, { phone: info.getValue() })
    }),
    columnHelper.accessor('role', {
        header: 'Role',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() as Status })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<Account, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
            h(
                RouterLink,
                { to: { name: 'accounts.show', params: { id: row.original.id } } },
                () => h(FontAwesomeIcon, { icon: faEye })
            ),
            h(
                RouterLink,
                { to: { name: 'accounts.show', params: { id: row.original.id } }, class: 'text-danger' },
                () => h(FontAwesomeIcon, { icon: faTrash })
            )
        ])
    },
]
const tableData: Account[] = [
    {
        id: 1,
        name: 'Natasha Gichuhi',
        phone: 254727474615,
        status: Status.ACTIVE,
        role: 'Admin',
        updated_at: moment().subtract(1, 'd').toISOString()
    },
    {
        id: 2,
        name: 'Michael Nabangi',
        phone: 254110039317,
        status: Status.INACTIVE,
        role: 'Employee',
        updated_at: moment().subtract(1, 'd').toISOString()
    },
    {
        id: 3,
        name: 'Rehema Wangui',
        phone: 254777180801,
        status: Status.ACTIVE,
        role: 'Admin',
        updated_at: moment().subtract(1, 'd').toISOString()
    },
]
const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

onMounted(() => {
    state.modal = new BSModal('#create-account', {})
})

const handleCreateRow = () => {
    console.log('weee')

    state.modal?.show()
}

const submitNewAccount = async (formData: VoucherType, node?: FormKitNode) => {
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