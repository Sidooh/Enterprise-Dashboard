<template>
    <component :is="layout"/>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from '@/components/layouts/Default.vue'
import { useAuthStore } from "@/stores/auth";
// import SimpleBar from 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(() => {
    useAuthStore().checkLocalAuth()

    // Array.prototype.forEach.call(document.querySelectorAll('.scrollbar-overlay'), el => new SimpleBar(el, {
    //     autoHide: true
    // }));
})
</script>

<style>
.scrollbar,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody {
    overflow: auto;
}

.scrollbar::-webkit-scrollbar,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody::-webkit-scrollbar {
    visibility: hidden;
    -webkit-appearance: none;
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0)
}

.scrollbar::-webkit-scrollbar-thumb,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody::-webkit-scrollbar-thumb {
    visibility: hidden;
    border-radius: 3px;
    background-color: var(--scrollbar-bg);
}

.scrollbar:hover::-webkit-scrollbar,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody:hover::-webkit-scrollbar,
.scrollbar:hover::-webkit-scrollbar-thumb,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody:hover::-webkit-scrollbar-thumb,
.scrollbar:focus::-webkit-scrollbar,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody:focus::-webkit-scrollbar,
.scrollbar:focus::-webkit-scrollbar-thumb,
.dataTables_wrapper .dataTables_scroll .dataTables_scrollBody:focus::-webkit-scrollbar-thumb {
    visibility: visible
}
</style>
