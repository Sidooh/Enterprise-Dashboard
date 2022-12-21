<template>
    <div class="row g-3">
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <h4><count-up :end-val="store.dash_stats.float_balance" :options="{prefix:'KES '}"/></h4>
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1"
                          @click="() => floatTopUpModal?.show()">
                        <Tooltip title="Top Up Float" placement="left">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </Tooltip>
                    </span>
                </div>
                <button :class="`card-footer btn bg-${floatAmountBtnHover?'warning':'primary'} text-white border-top-0`"
                        @mouseover="floatAmountBtnHover=true" @mouseleave="floatAmountBtnHover=false"
                        @click="() => floatTopUpModal?.show()">
                    {{ floatAmountBtnHover ? 'Top Up Float' : 'Float Amount' }}
                </button>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <h4><count-up :end-val="store.dash_stats.disbursed_vouchers_amount" :options="{prefix:'KES '}"/></h4>
<!--                    <h4><count-up :end-val="store.dash_stats.disbursed_vouchers_count"/></h4>-->
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1"
                          @click="() => voucherDisburseModal?.show()">
                        <Tooltip title="Disburse Voucher" placement="left">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </Tooltip>
                    </span>
                </div>
                <button
                    :class="`card-footer btn bg-${voucherDisbursementsBtnHover?'warning':'primary'} text-white border-top-0`"
                    @mouseover="voucherDisbursementsBtnHover=true" @mouseleave="voucherDisbursementsBtnHover=false"
                    @click="() => voucherDisburseModal?.show()">
                    {{ voucherDisbursementsBtnHover ? 'Disburse Voucher' : 'Voucher Disbursements' }}
                </button>
            </div>
        </div>
        <div class="col-md-4 col-xxl-12">
            <div class="card text-center h-100">
                <div class="card-body position-relative">
                    <h4><count-up :end-val="store.dash_stats.accounts_count"/></h4>
                    <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1"
                          @click="() => createAccountModal?.show()">
                        <Tooltip title="Create Account" placement="left">
                            <font-awesome-icon :icon="faCirclePlus" class="text-warning"/>
                        </Tooltip>
                    </span>
                </div>
                <button :class="`card-footer btn bg-${accountBtnHover?'warning':'primary'} text-white border-top-0`"
                        @mouseover="accountBtnHover=true" @mouseleave="accountBtnHover=false"
                        @click="() => createAccountModal?.show()">
                    {{ accountBtnHover ? 'Create Account' : 'Accounts' }}
                </button>
            </div>
        </div>
    </div>

    <FloatTopUpModal @init="modal => floatTopUpModal = modal"/>
    <CreateAccountModal @init="modal => createAccountModal = modal" @created="() => store.fetchDashboardStatistics()"/>
    <VoucherDisburseModal @init="modal => voucherDisburseModal = modal"/>
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
import VoucherDisburseModal from "@/components/modals/VoucherDisburseModal.vue";

const createAccountModal = ref(),
    floatTopUpModal = ref(),
    voucherDisburseModal = ref()
const floatAmountBtnHover = ref(false),
    accountBtnHover = ref(false),
    voucherDisbursementsBtnHover = ref(false)

const store = useEnterpriseStore();

await store.fetchDashboardStatistics()
</script>