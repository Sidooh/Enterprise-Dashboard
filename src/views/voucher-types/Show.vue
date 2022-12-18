<template>
    <div class="row">
        <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <DataTable title="Vouchers" :columns="columns" :data="store.voucher_type?.vouchers"/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <h5 class="card-header text-center bg-primary">{{ store.voucher_type.name }} VOUCHER</h5>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Voucher is Locked</b></h6>
                            <small>{{ store.voucher_type.is_locked ? 'True' : 'False' }}</small>
                        </li>
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Voucher limit amount</b></h6>
                            <small>KSH {{ store.voucher_type.limit_amount }}</small>
                        </li>
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Number of vouchers</b></h6>
                            <small>{{ store.voucher_type?.vouchers?.length ?? 0 }}</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal" :account-id="accountId" :voucher-type-id="id"/>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { useVoucherTypeStore } from "@/stores/voucher-types";
import { h, ref } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Voucher } from "@/utils/types";
import { currencyFormat } from "@/utils/helpers";
import TableDate from "@/components/TableDate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DataTable from "@/components/datatable/DataTable.vue";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/components/Tooltip.vue";
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";

const store = useVoucherTypeStore()
const id = Number(useRoute().params.id)
const voucherDisburseModal = ref()
const accountId = ref<number>()

const columnHelper = createColumnHelper<Voucher>()
const columns = [
    columnHelper.accessor('balance', {
        header: () => 'Balance',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: ({ row }: CellContext<Voucher, string>) => h(TableDate, { date: row.original.created_at })
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
                        accountId.value = row.original.account_id
                    }
                },
                { default: () => h(FontAwesomeIcon, { icon: faCircleDollarToSlot }) }
            )
        ])
    },
]

await store.fetchVoucherType(id)
</script>

<style scoped>

</style>