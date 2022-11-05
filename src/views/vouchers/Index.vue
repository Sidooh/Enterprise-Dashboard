<template>
    <div class="card mt-3">
        <div class="card-body">
            <DataTable title="Latest Transactions" :columns="columns" :data="tableData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import { createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h } from "vue";
import StatusBadge from '@/components/StatusBadge.vue'

type VoucherType = {
    name: string
    type: string
    limit: number
    status: string
}

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
        cell: info => h(StatusBadge, { status: info.getValue() })
    }),
]
const tableData: VoucherType[] = [
    {
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: 'ACTIVE',
    },
    {
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: 'INACTIVE',
    },
    {
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: 'Active',
    },
]
</script>

<style scoped>

</style>