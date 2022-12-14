<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :key="tableKey" :columns="columns" :data="store.accounts"
                       :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <CreateAccountModal @init="modal => createAccountModal = modal" @created="() => tableKey+=1"/>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import Phone from "@/components/Phone.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account } from "@/utils/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal as BSModal } from "bootstrap";
import { useAccountStore } from "@/stores/accounts";
import { logger } from "@/utils/logger";
import CreateAccountModal from "@/components/modals/CreateAccountModal.vue";

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('phone', {
        header: 'Phone number',
        cell: info => h(Phone, { phone: info.getValue() })
    }),
    columnHelper.accessor('role', {
        header: 'Role',
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
                RouterLink,
                { to: { name: 'accounts.show', params: { id: row.original.id } }, class: 'text-danger' },
                () => h(FontAwesomeIcon, { icon: faTrash })
            )
        ])
    },
]
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const store = useAccountStore();
const tableKey = ref(0);
const createAccountModal = ref()

const handleCreateRow = () => createAccountModal.value?.show()

onMounted(() => {
    store.fetchAccounts()

    logger.info(store.accounts)
})
</script>

<style scoped>

</style>