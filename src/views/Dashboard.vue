<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Latest Transactions" :columns="columns" :data="tableData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import { createColumnHelper } from "@tanstack/vue-table";

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