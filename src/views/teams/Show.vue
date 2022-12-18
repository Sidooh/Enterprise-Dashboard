<template>
    <div class="row">
        <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <DataTable title="Team Accounts" :columns="columns" :data="store.team?.accounts"/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <h5 class="card-header text-center bg-primary">{{ store.team.name }}</h5>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Number of accounts</b></h6>
                            <small>{{ store.team?.accounts?.length ?? 0 }}</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { h } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Team, VoucherType } from "@/utils/types";
import TableDate from "@/components/TableDate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DataTable from "@/components/datatable/DataTable.vue";
import { useTeamStore } from "@/stores/teams";

const store = useTeamStore()
const { id } = useRoute().params

const columnHelper = createColumnHelper<Team>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: ({ row }: CellContext<Team, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<VoucherType, string>) => h(
            RouterLink,
            { to: { name: 'vouchers.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]

await store.fetchTeam(Number(id))
</script>

<style scoped>

</style>