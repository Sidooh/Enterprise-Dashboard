<template>
    <div class="col-xxl-9">
        <div class="card overflow-hidden h-100">
            <div class="card-body d-flex flex-column justify-content-between" style="height:200px">
                <div class="align-items-center g-0 row">
                    <h5 class="col">Vouchers Disbursed</h5>
                    <div class="col-auto">
                        <select class="form-select form-select-sm" v-model="voucherType">
                            <option v-for="(vt, i) in Object.keys(store.chart_datasets)" :key="`chart-opt-${i}`"
                                    :value="vt">{{ vt }} Disbursements
                            </option>
                        </select>
                    </div>
                </div>
                <canvas ref="chartEl" style="margin-bottom: 2rem;"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from "vue";
import Chart from "chart.js/auto";
import { useEnterpriseStore } from "@/stores/enterprise";

const chartEl = ref()
const voucherType = ref<string>("ALL")
const chart = shallowRef()
const store = useEnterpriseStore();

onMounted(() => {
    console.log(store.chart_datasets[voucherType.value])
    chart.value = new Chart(chartEl.value.getContext('2d'), {
        type: 'line',
        data: {
            labels: store.chart_datasets[voucherType.value].labels,
            datasets: [{
                label: '#amount',
                data: store.chart_datasets[voucherType.value].data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                tension: 0.3
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

watch(voucherType, (newValue) => {
    chart.value.data.datasets.forEach((set: any) => set.data = store.chart_datasets[newValue].data)
    chart.value.update()
})

await store.fetchChartData()
</script>

<style scoped>

</style>