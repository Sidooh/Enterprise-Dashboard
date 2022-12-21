<template>
    <div class="row">
        <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <DataTable :key="tableKey" title="Vouchers" :columns="vouchersTableColumns"
                               :data="store.account?.vouchers"/>
                </div>
            </div>
            <div v-if="store.account.teams?.length" class="card mt-3">
                <div class="card-body">
                    <DataTable title="Teams" :columns="teamsTableColumns" :data="store.account?.teams"/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <h5 class="card-header text-center text-light bg-primary">{{ store.account.name }}</h5>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Phone Number</b></h6>
                            <small>
                                <Phone :phone="store.account.phone"/>
                            </small>
                        </li>
                    </ul>
                </div>
                <div class="card-footer bg-secondary">
                    <button class="btn w-100 btn-warning" @click="() => {
                        voucherTypeId = undefined
                        voucherDisburseModal?.show()
                    }">
                        Disburse Voucher
                        <font-awesome-icon :icon="faCircleDollarToSlot"/>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal" :account-id="id"
                          :voucher-type-id="voucherTypeId" @created="tableKey+=1"/>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { h, ref } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Team, Voucher, VoucherType } from "@/utils/types";
import TableDate from "@/components/TableDate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useAccountStore } from "@/stores/accounts";
import Phone from "@/components/Phone.vue";
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";
import DataTable from "@/components/datatable/DataTable.vue";
import { currencyFormat } from "@/utils/helpers";
import Tooltip from "@/components/Tooltip.vue";

const store = useAccountStore()
const id = Number(useRoute().params.id)
const voucherDisburseModal = ref()
const voucherTypeId = ref()
const tableKey = ref(0);

const voucherTableColumnHelper = createColumnHelper<Voucher>()
const vouchersTableColumns = [
    voucherTableColumnHelper.accessor(row => row.voucher_type.name, {
        header: 'Voucher',
    }),
    voucherTableColumnHelper.accessor('balance', {
        header: () => 'Balance',
        cell: info => currencyFormat(info.getValue())
    }),
    voucherTableColumnHelper.accessor('created_at', {
        header: 'Created At',
        cell: ({ row }: CellContext<Voucher, string>) => h(TableDate, { date: row.original.created_at })
    }),
    voucherTableColumnHelper.accessor('updated_at', {
        header: 'Last Updated At',
        cell: ({ row }: CellContext<Voucher, string>) => h(TableDate, { date: row.original.updated_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<Voucher, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
            h(
                RouterLink,
                { to: { name: 'vouchers.show', params: { id: row.original.id } } },
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
                        voucherTypeId.value = row.original.voucher_type.id
                    }
                },
                { default: () => h(FontAwesomeIcon, { icon: faCircleDollarToSlot }) }
            )
        ])
    },
]
const teamsTableColumnHelper = createColumnHelper<Team>()
const teamsTableColumns = [
    teamsTableColumnHelper.accessor('name', {
        header: () => 'Name',
    }),
    teamsTableColumnHelper.accessor('created_at', {
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

await store.fetchAccount(Number(id))
</script>

<style scoped>

</style>