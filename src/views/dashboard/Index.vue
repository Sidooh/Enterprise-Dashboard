<template>
    <div class="row g-3">
        <Chart/>

        <ComponentLoader><Stats/></ComponentLoader>
    </div>

    <ComponentLoader><RecentTransactions/></ComponentLoader>
<!--    <Suspense>
        <RecentTransactions/>

        <template #fallback><ComponentLoader/></template>
    </Suspense>-->
</template>

<script setup lang="ts">
import Chart from '@/views/dashboard/Chart.vue';
import Stats from "@/views/dashboard/Statistics.vue";
import RecentTransactions from "@/views/dashboard/RecentTransactions.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";</script>