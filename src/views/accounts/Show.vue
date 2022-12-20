<template>
    <div class="row">
        <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <!--                    <DataTable title="Team Accounts" :columns="columns" :data="store.account?.accounts"/>-->
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <h5 class="card-header text-center bg-primary">{{ store.account.name }}</h5>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h6 class="m-0"><b>Phone number</b></h6>
                            <small>
                                <Phone :phone="store.account.phone"/>
                            </small>
                        </li>
                    </ul>
                </div>
                <div class="card-footer bg-secondary">
                    <button class="btn w-100 btn-warning" @click="voucherDisburseModal?.show()">
                        Disburse Voucher
                        <font-awesome-icon :icon="faCircleDollarToSlot"/>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal" :account-id="id"/>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { h, ref } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Team, VoucherType } from "@/utils/types";
import TableDate from "@/components/TableDate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useAccountStore } from "@/stores/accounts";
import Phone from "@/components/Phone.vue";
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";

const store = useAccountStore()
const id = Number(useRoute().params.id)
const voucherDisburseModal = ref()

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

await store.fetchAccount(Number(id))
</script>

<style scoped>

</style>