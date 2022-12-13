<template>
    <div class="card mt-3">
        <div class="card-body">
            <DataTable title="Recent Voucher Transactions" :columns="columns" :data="store.recent_voucher_transactions"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { VoucherTransaction } from "@/utils/types";
import { currencyFormat } from "@/utils/helpers";
import moment from "moment";
import { h } from "vue";
import TableDate from "@/components/TableDate.vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useEnterpriseStore } from "@/stores/enterprise";

const store = useEnterpriseStore();

const columnHelper = createColumnHelper<VoucherTransaction>()
const columns = [
    columnHelper.accessor('type', {
        header: 'Type',
    }),
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('description', {
        header: 'Description',
    }),
    columnHelper.accessor(row => moment(row.created_at).calendar(), {
        header: 'Created',
        cell: ({ row }: CellContext<VoucherTransaction, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<VoucherTransaction, string>) => h(
            RouterLink,
            { to: { name: 'voucher-transactions.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]

await store.fetchRecentVoucherTransactions()
</script>

<style scoped>

</style>