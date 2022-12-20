<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Float Transactions" :columns="columns" :data="store.transactions"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import TableDate from "@/components/TableDate.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { currencyFormat } from "@/utils/helpers";
import { h, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FloatTransaction } from "@/utils/types";
import moment from "moment";
import { useFloatStore } from "@/stores/float";

const columnHelper = createColumnHelper<FloatTransaction>()
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
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(
            RouterLink,
            { to: { name: 'float.accounts.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]

const store = useFloatStore();

onMounted(() => {
    store.fetchTransactions()
})
</script>

<style scoped>

</style>