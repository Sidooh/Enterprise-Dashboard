<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Teams" :columns="columns" :data="tableData" :on-create-row="handleCreateTeams"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Team } from "@/utils/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const columnHelper = createColumnHelper<Team>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() as Status })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<Team, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
            h(
                RouterLink,
                { to: { name: 'teams.show', params: { id: row.original.id } } },
                () => h(FontAwesomeIcon, { icon: faEye })
            ),
            h(
                RouterLink,
                { to: { name: 'teams.show', params: { id: row.original.id } }, class: 'text-danger' },
                () => h(FontAwesomeIcon, { icon: faTrash })
            )
        ])
    },
]

const tableData: Team[] = [
    {
        id: 1,
        name: 'Matiger',
        status: Status.ACTIVE,
    },
    {
        id: 2,
        name: 'Mafisi',
        status: Status.INACTIVE,
    },
]

const handleCreateTeams = () => {
    console.log('weee')
}
</script>

<style scoped>

</style>