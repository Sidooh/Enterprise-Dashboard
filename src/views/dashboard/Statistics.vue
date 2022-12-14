<template>
    <div class="row g-3">
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <count-up :end-val="store.dash_stats.float_balance" :options="{prefix:'KES '}"/>
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1"
                          @click="() => floatTopUpModal?.show()">
                        <Tooltip title="Top Up Float" placement="left">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </Tooltip>
                    </span>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Float Amount
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <count-up :end-val="store.dash_stats.vouchers_disbursed" :options="{prefix:'KES '}"/>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Vouchers Disbursed
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <count-up :end-val="store.dash_stats.accounts_count" :options="{prefix:'KES '}"/>
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1"
                          @click="() => createAccountModal?.show()">
                        <Tooltip title="Create Account" placement="left">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </Tooltip>
                    </span>
                </div>
                <div class="card-footer bg-primary text-white border-top-0">
                    Accounts
                </div>
            </div>
        </div>
    </div>

    <FloatTopUpModal @init="modal => floatTopUpModal = modal"/>
    <CreateAccountModal @init="modal => createAccountModal = modal" @created="() => store.fetchDashboardStatistics()"/>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ref } from "vue";
import { useEnterpriseStore } from "@/stores/enterprise";
import CountUp from 'vue-countup-v3'
import FloatTopUpModal from "@/components/modals/FloatTopUpModal.vue";
import CreateAccountModal from "@/components/modals/CreateAccountModal.vue";
import Tooltip from "@/components/Tooltip.vue";

const createAccountModal = ref()
const floatTopUpModal = ref()

const store = useEnterpriseStore();

await store.fetchDashboardStatistics()
</script>