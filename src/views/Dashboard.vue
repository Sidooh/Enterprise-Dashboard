<template>
    <div class="row g-3">
        <div class="col-xxl-9">
            <div class="card overflow-hidden h-100">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div style="height:270px">
                        <canvas ref="chartEl" height="70"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row g-3">
                <div class="col-md-4 col-xxl-12">
                    <div class="card text-center h-100">
                        <div class="card-body position-relative">
                            KSH 40,000
                            <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1" title="Top Up Float"
                                  @click="() => state.modal?.show()">
                                <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                            </span>
                        </div>
                        <div class="card-footer bg-warning text-white border-top-0">
                            Float Amount
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xxl-12">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            500
                        </div>
                        <div class="card-footer bg-warning text-white border-top-0">
                            Vouchers Disbursed
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xxl-12">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            50
                        </div>
                        <div class="card-footer bg-warning text-white border-top-0">
                            Accounts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card mt-3">
        <div class="card-body">
            <DataTable title="Latest Transactions" :columns="columns" :data="store.recent_transactions"/>
        </div>
    </div>

    <FormKit type="form" submit-label="Create" :actions="false" #default="{ state: { valid } }"
             @submit="submitFloatTopUp">
        <Modal id="float-top-up">
            <template #title>Request Float Top Up</template>
            <template #body>
                <div class="row">
                    <FormKit type="number" name="amount" placeholder="Enter amount" min="1000" max="70000"
                             validation="required|min:1000|max:70000"
                             :classes="{input:'form-control', outer:'col-12 mb-3'}"/>
                    <FormKit type="tel" name="phone" placeholder="Phone number" v-model="phone"
                             :classes="{input:'form-control', outer:'col-md-12 mb-3'}" validation="required"/>
                </div>
            </template>
            <template #footer>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <FormKit type="submit" input-class="btn btn-primary" :disabled="!valid">
                    Request
                    <font-awesome-icon :icon="faCloudversify" class="ms-1"/>
                </FormKit>
            </template>
        </Modal>
    </FormKit>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import DataTable from "@/components/datatable/DataTable.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import Chart from 'chart.js/auto';
import { h, onMounted, reactive, ref, shallowRef } from "vue";
import { FormKitGroupValue, FormKitNode } from "@formkit/core";
import { currencyFormat, toast } from "@/utils/helpers";
import Modal from "@/components/Modal.vue";
import { Modal as BSModal } from "bootstrap";
import { faCloudversify } from '@fortawesome/free-brands-svg-icons'
import { useAuthStore } from "@/stores/auth";
import { useEnterpriseStore } from "@/stores/enterprise";
import { parsePhoneNumber } from "libphonenumber-js";
import { FloatTransaction } from "@/utils/types";
import moment from "moment/moment";
import TableDate from "@/components/TableDate.vue";
import { RouterLink } from "vue-router";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const chartEl = ref()
const chart = shallowRef()
const phone = ref(useAuthStore().auth.user.enterprise.phone)
const store = useEnterpriseStore();
const state = reactive<{ modal?: BSModal }>({ modal: undefined })

const submitFloatTopUp = async ({ amount, phone }: FormKitGroupValue, node?: FormKitNode) => {
    try {
        node?.clearErrors()

        const phoneNumber = parsePhoneNumber(String(phone), 'KE').number

        await store.creditFloat(Number(amount), Number(phoneNumber))

        /*const mpesa = new MpesaService({
            amount: Number(formData.amount),
            phone: String(formData.phone),
            onSuccess: async () => {
                // await store.create(formData as Account)

                logger.info('success')
            }
        });
        await mpesa.init();*/

        state.modal?.hide()
        node?.reset()

        toast({ titleText: 'Float Top Up Successful!' })
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'error' })
    }
}

onMounted(() => {
    state.modal = new BSModal('#float-top-up')
    store.fetchRecentTransactions()

    chart.value = new Chart(chartEl.value.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov'],
            datasets: [{
                label: '#something',
                data: [1200, 1900, 300, 500, 2000, 300],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    align: 'end',
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    })
})

const columnHelper = createColumnHelper<FloatTransaction>()
const columns = [
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info => currencyFormat(info.getValue())
    }),
    columnHelper.accessor('description', {
        header: 'Description',
    }),
    columnHelper.accessor(row => moment(row.created_at).calendar(), {
        header: 'Created',
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row }: CellContext<FloatTransaction, string>) => h(
            RouterLink,
            { to: { name: 'float.accounts.show', params: { id: row.original.id } } },
            () => h(FontAwesomeIcon, { icon: faEye })
        )
    },
]
</script>

<style scoped>

</style>