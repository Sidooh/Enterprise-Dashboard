<template>
    <div class="row">
        <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <DataTable :key="tableKey" title="Team Accounts" :columns="columns" :data="store.team?.accounts"
                               :on-create-row="() => createTeamAccountModal?.show()"/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <h5 class="card-header text-center text-light bg-primary">{{ store.team.name }}</h5>
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

    <CreateTeamAccountModal @init="modal => createTeamAccountModal = modal" @created="() => tableKey+=1" :team-id="id"/>
    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal" :account-id="accountId"/>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { h, ref } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Account } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useTeamStore } from "@/stores/teams";
import CreateTeamAccountModal from "@/components/modals/CreateTeamAccountModal.vue";
import { faCircleDollarToSlot, faTrash } from "@fortawesome/free-solid-svg-icons";
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";
import { DataTable, PhoneNumber, Tooltip } from "@nabcellent/sui-vue";

const store = useTeamStore()
const id = Number(useRoute().params.id)
const createTeamAccountModal = ref()
const voucherDisburseModal = ref()
const accountId = ref<number>()
const tableKey = ref(0);

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone number',
        cell: info => h(PhoneNumber, { phone: info.getValue() })
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
                Tooltip,
                {
                    class: 'cursor-pointer text-success',
                    title: 'Disburse',
                    placement: 'right',
                    onClick: () => {
                        voucherDisburseModal.value?.show()
                        accountId.value = row.original.id
                    }
                },
                { default: () => h(FontAwesomeIcon, { icon: faCircleDollarToSlot }) }
            ),
            h(
                RouterLink,
                { to: { name: 'accounts.show', params: { id: row.original.id } }, class: 'text-danger' },
                () => h(FontAwesomeIcon, { icon: faTrash })
            )
        ])
    },
]

await store.fetchTeam(Number(id))
</script>

<style scoped>

</style>