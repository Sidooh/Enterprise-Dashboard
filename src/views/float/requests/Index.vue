<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Float Requests" :columns="columns" :data="tableData"/>
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
import { FloatRequest } from "@/utils/types";
import moment from "moment";

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
</script>

<style scoped>

</style>