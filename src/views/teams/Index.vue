<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Float Transactions" :columns="columns" :data="tableData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import TableDate from "@/components/TableDate.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FloatTransaction } from "@/utils/types";
import moment from "moment";

const columnHelper = createColumnHelper<FloatTransaction>()
const columns = [
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() as Status })
    }),
    columnHelper.accessor(row => moment(row.created_at).calendar(), {
        header: 'Created',
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(
            RouterLink,
            { to: { name: 'voucher-types.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]

const tableData: FloatTransaction[] = [
    {
        id: 1,
        amount: 7000,
        status: Status.PENDING,
        created_at: moment().toISOString()
    },
    {
        id: 2,
        amount: 7000,
        status: Status.COMPLETED,
        created_at: moment().subtract(7, 'd').toISOString()
    },
    {
        id: 3,
        amount: 7000,
        status: Status.FAILED,
    },
    {
        id: 4,
        amount: 7000,
        status: Status.COMPLETED,
        created_at: moment().subtract(3, 'm').toISOString()
    },
]
</script>

<style scoped>

</style>