<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Teams" :key="tableKey" :columns="columns" :data="store.teams"
                       :on-create-row="handleCreateRow"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewTeam">
        <Modal id="create-team">
            <template #title>Create New Team</template>
            <template #body>
                <FormKit name="name" placeholder="Enter team name" validation="required"
                         :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
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
import StatusBadge from "@/components/StatusBadge.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h, onMounted, reactive, ref } from "vue";
import { Status } from "@/utils/enums";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Team } from "@/utils/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { toast } from "@/utils/helpers";
import { useTeamStore } from "@/stores/teams";

const columnHelper = createColumnHelper<Team>()
const columns = [
    columnHelper.accessor('name', {
        header: () => 'Name',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => h(StatusBadge, { status: info.getValue() ?? Status.ACTIVE as Status })
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
const state = reactive<{ modal?: BSModal }>({
    modal: undefined
})

const store = useTeamStore();
const tableKey = ref(0);

const handleCreateRow = () => state.modal?.show()

const submitNewTeam = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        await store.create(formData as Team)

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Team Created Successfully!' })

        tableKey.value += 1
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#create-team', {})

    store.fetchTeams()
})
</script>

<style scoped>

</style>