<template>
    <div class="row justify-content-between">
        <div class="col mb-3">
            <h6 class="mb-0 text-nowrap py-2 py-xl-0">
                {{ selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title }}
            </h6>
        </div>
    </div>
    <table class="table">
        <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th class="fw-bolder" v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
                @click="header.column.getToggleSortingHandler()?.($event)">
                <template v-if="!header.isPlaceholder">
                    <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()"/>
                    <font-awesome-icon v-show="header.column.getIsSorted() === 'asc'" className="ms-2"
                                       :icon="faSortUp"/>
                    <font-awesome-icon v-show="header.column.getIsSorted() === 'desc'" className="ms-2"
                                       :icon="faSortDown"/>
                </template>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <p class="mb-0">
                <span>Page </span>
                <strong>{{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</strong>
            </p>
            <p class="mb-0 ms-2">| &nbsp;</p>

            <div v-if="Boolean(selectedRowsCount)">
                {{ selectedRowsCount }} of {{ table.getPreFilteredRowModel().rows.length }} Total Rows Selected
            </div>

            <span>Total: <b>{{ table.getRowModel().rows.length }}</b></span>
        </div>
        <div class="d-flex">
            <button class="btn btn-sm btn-primary" :disabled="!table.getCanPreviousPage()"
                    @click="table.setPageIndex(0)">
                <font-awesome-icon :icon="faAnglesLeft" font-size="15"/>
            </button>
            <button class="btn btn-sm btn-primary ms-1" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                <font-awesome-icon :icon="faAngleLeft" font-size="15"/>
            </button>
            <select name="" id="" class="form-select form-select-sm w-auto mx-2 border-0 pe-4">
                <option :value="pageSize" v-for="(pageSize, i) in [5, 10, 20, 40]" :key="i">Show {{ pageSize }}</option>
            </select>
            <button class="btn btn-sm btn-primary" :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()">
                <font-awesome-icon :icon="faAngleRight" font-size="15"/>
            </button>
            <button class="btn btn-sm btn-primary ms-1" :disabled="!table.getCanNextPage()"
                    @click="table.setPageIndex(table.getPageCount() - 1)">
                <font-awesome-icon :icon="faAnglesRight" font-size="15"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faSortDown,
    faSortUp
} from '@fortawesome/free-solid-svg-icons'
import type { SortingState } from "@tanstack/vue-table";
import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable, } from '@tanstack/vue-table'
import { ref } from 'vue'

const props = defineProps<{ title: string, columns: any, data: any }>()

const tableTitle = ref(props.title)

const sorting = ref<SortingState>([])
const rowSelection = ref({})
const selectedRowsCount = Object.keys(rowSelection.value).length;
const data = ref(props.data)

const table = useVueTable({
    get data() {
        return data.value
    },
    columns: props.columns,
    state: {
        get sorting() {
            return sorting.value
        },
        rowSelection: rowSelection.value
    },
    onSortingChange: updaterOrValue => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
})

</script>

<style scoped>

</style>