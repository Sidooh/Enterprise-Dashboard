<template>
    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitNewAccount">
        <Modal id="create-account">
            <template #title>Create New Account</template>
            <template #body>
                <div class="row">
                    <FormKit name="name" placeholder="Enter name" validation="required"
                             :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
                    <FormKit type="tel" name="phone" placeholder="Phone number"
                             :classes="{input:'form-control', outer:'col-md-6 mb-3'}" validation="required"/>
                    <FormKit type="select" name="role" placeholder="Select role"
                             :options="{admin:'Admin', employee:'Employee'}"
                             :classes="{input:'form-control', outer:'col-md-6 mb-3'}" validation="required"/>
                </div>


                <div class="position-relative my-4">
                    <hr/>
                    <div class="divider-content-center">OR</div>
                </div>

                <file-pond name="accounts" ref="pond" label-idle="Drop file containing accounts"
                           accepted-file-types="text/csv"/>
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
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { Account } from "@/utils/types";
import { toast } from "@/utils/helpers";
import { useAccountStore } from "@/stores/accounts";
import { onMounted, reactive } from "vue";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType);

const emit = defineEmits<{ (e: 'init', modal: BSModal): void, (e: 'created'): void }>()

const store = useAccountStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitNewAccount = async (formData: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        await store.create(formData as Account)

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Account Created Successfully!' })

        emit('created')
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#create-account')

    emit('init', state.modal)
})
</script>