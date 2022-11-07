<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :columns="columns" :data="tableData" :on-create-row="handleCreateAccounts"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import Phone from "@/components/Phone.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account } from "@/utils/types";
import moment from "moment";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

const handleCreateAccounts = () => {
    console.log('weee')
}
</script>

<style scoped>

</style>