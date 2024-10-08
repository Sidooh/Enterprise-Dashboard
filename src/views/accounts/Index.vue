<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :key="tableKey" :columns="columns" :data="store.accounts"
                       :on-create-row="() => createAccountModal?.show()"/>
        </div>
    </div>

    <CreateAccountModal @init="modal => createAccountModal = modal" @created="() => tableKey+=1"/>
    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal" :account-id="accountId"/>
</template>

<script setup lang="ts">
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account } from "@/utils/types";
import { faCircleDollarToSlot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal as BSModal } from "bootstrap";
import { useAccountStore } from "@/stores/accounts";
import CreateAccountModal from "@/components/modals/CreateAccountModal.vue";
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";
import { DataTable, PhoneNumber, Tooltip } from "@nabcellent/sui-vue";

const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const store = useAccountStore();
const tableKey = ref(0);
const createAccountModal = ref()
const voucherDisburseModal = ref()
const accountId = ref<number>()

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

onMounted(() => {
    store.fetchAccounts()
})
</script>

<style scoped>

</style>