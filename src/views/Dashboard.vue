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
                            <span class="cursor-pointer position-absolute top-0 end-0 me-2 mt-1" title="Top Up Float">
                                <font-awesome-icon :icon="faCirclePlus"/>
                            </span>
                        </div>
                        <div class="card-footer">
                            Float Amount
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xxl-12">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            500
                        </div>
                        <div class="card-footer">
                            Vouchers Disbursed
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xxl-12">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            50
                        </div>
                        <div class="card-footer">
                            Accounts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card mt-3">
        <div class="card-body">
            <DataTable title="Latest Transactions" :columns="columns" :data="tableData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import DataTable from "@/components/datatable/DataTable.vue";
import { createColumnHelper } from "@tanstack/vue-table";
import Chart from 'chart.js/auto';
import { onMounted, ref, shallowRef } from "vue";

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

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const columnHelper = createColumnHelper<Person>()
const columns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => 'Last Name',
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
    }),
    columnHelper.accessor('visits', {
        header: () => 'Visits',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
    }),
]
const tableData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'Lil',
        lastName: 'Nabz',
        age: 21,
        visits: 20,
        status: 'Complicated',
        progress: 70,
    },
]
</script>

<style scoped>

</style>