<template>
    <main class="d-flex" style="height:100vh; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden">
        <Sidebar/>

        <router-view/>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/partials/Sidebar.vue";</script>

<style scoped></style>