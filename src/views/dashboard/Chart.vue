<template>
    <div class="col-xxl-9">
        <div class="card overflow-hidden h-100">
            <div class="card-body d-flex flex-column justify-content-between"
                 style="height:200px; background-image: linear-gradient(-45deg, rgba(15, 27, 76, 1), rgba(245, 183, 0, 1))">
                <div class="align-items-center g-0 row justify-content-end">
                    <div class="col-auto">
                        <select class="form-select form-select-sm px-2" v-model="voucherType">
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
    Chart.defaults.color = '#eee'
    Chart.defaults.font.weight = '700'
    Chart.defaults.font.family = "'Avenir', sans-serif"

    chart.value = new Chart(chartEl.value.getContext('2d'), {
        type: 'line',
        data: {
            labels: store.chart_datasets[voucherType.value].labels,
            datasets: [{
                label: 'Amount',
                data: store.chart_datasets[voucherType.value].data,
                backgroundColor: ['#000'],
                borderColor: ['rgba(255, 255, 255, 1)'],
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Vouchers Disbursed in the last 6 Months',
                    font:{
                        size:17
                    }
                },
                legend: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        color: 'rgba(250, 250, 250, .3)'
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