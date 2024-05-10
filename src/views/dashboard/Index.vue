<template>
    <div class="row g-3">
        <Chart/>

        <div class="col">
            <ComponentLoader><Stats/></ComponentLoader>
        </div>
    </div>

    <ComponentLoader>
        <RecentVoucherTransactions/>
    </ComponentLoader>

    <ComponentLoader>
        <RecentFloatTransactions/>
    </ComponentLoader>
</template>

<script setup lang="ts">
import Chart from '@/views/dashboard/Chart.vue';
import Stats from "@/views/dashboard/Statistics.vue";
import RecentFloatTransactions from "@/views/dashboard/RecentFloatTransactions.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import RecentVoucherTransactions from "@/views/dashboard/RecentVoucherTransactions.vue";</script>