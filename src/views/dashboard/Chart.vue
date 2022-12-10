<template>
    <div class="col-xxl-9">
        <div class="card overflow-hidden h-100">
            <div class="card-body d-flex flex-column justify-content-between">
                <div style="height:270px">
                    <canvas ref="chartEl" height="70"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import Chart from "chart.js/auto";

const chartEl = ref()
const chart = shallowRef()

onMounted(() => {
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
</script>

<style scoped>

</style>