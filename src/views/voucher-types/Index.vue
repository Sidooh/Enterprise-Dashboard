<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Voucher Types" :columns="columns" :data="tableData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { VoucherType } from "@/utils/types";

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
            { to: { name: 'voucher-types.vouchers', params: { id: row.original.id } } },
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
        status: 'ACTIVE',
    },
    {
        id: 2,
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: 'INACTIVE',
    },
    {
        id: 3,
        name: 'Lunch',
        type: 'Locked',
        limit: 7000,
        status: 'Active',
    },
]
</script>

<style scoped>

</style>