<template>
    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewAccount">
        <Modal id="create-team-account">
            <template #title>Add Account To Team</template>
            <template #body>
                <div class="row">
                    <FormKit type="select" name="account_id" placeholder="Select account to add"
                             :options="accountStore.accounts.map(t => ({label:`${t.phone}: ${t.name}`, value:t.id}))"
                             :classes="{input:'form-control', outer:'col-md-12 mb-3'}" validation="required"/>
                </div>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Add
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { toast } from "@/utils/helpers";
import { useAccountStore } from "@/stores/accounts";
import { onMounted, reactive } from "vue";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { useTeamStore } from "@/stores/teams";

const props = defineProps<{ teamId?: number }>()
const emit = defineEmits<{ (e: 'init', modal: BSModal): void, (e: 'created'): void }>()

const accountStore = useAccountStore();
const teamStore = useTeamStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitNewAccount = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        const teamId = props.teamId ?? Number(formData.team_id)

        await teamStore.addAccount(teamId, Number(formData.account_id))

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Account Added Successfully!' })

        emit('created')
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#create-team-account')

    emit('init', state.modal)

    accountStore.fetchAccounts()

    if (!props.teamId) teamStore.fetchTeams()
})
</script>