<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Accounts" :key="tableKey" :columns="columns" :data="store.accounts"
                       :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewAccount">
        <Modal id="create-account">
            <template #title>Create New Account</template>
            <template #body>
                <div class="row">
                    <FormKit name="name" placeholder="Enter name" validation="required"
                             :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
                    <FormKit type="tel" min="1" name="phone" step="1" placeholder="Phone number"
                             :classes="{input:'form-control', outer:'col-md-6 mb-3'}" validation="required"/>
                    <FormKit type="select" name="role" placeholder="Select role"
                             :options="{admin:'Admin', employee:'Employee'}"
                             :classes="{input:'form-control', outer:'col-md-6 mb-3'}" validation="required"/>
                </div>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Create
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import Phone from "@/components/Phone.vue";
import Modal from "@/components/Modal.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Account } from "@/utils/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { Modal as BSModal } from "bootstrap";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { useAccountStore } from "@/stores/accounts";
import { toast } from "@/utils/helpers";

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
const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

const store = useAccountStore();
const tableKey = ref(0);

const handleCreateRow = () => state.modal?.show()

const submitNewAccount = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        await store.create(formData as Account)

        state.modal?.hide()
        node?.reset()

        toast({titleText:'Account Created Successfully!'})

        tableKey.value += 1
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#create-account', {})

    store.fetchAccounts()
})
</script>

<style scoped>

</style>