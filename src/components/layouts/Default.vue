<template>
    <div class="container-fluid">
        <Sidebar/>

        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/partials/Sidebar.vue";</script>

<style scoped>
.content {
    min-height: 100vh;
    position: relative;
}

.content {
    min-height: 100vh;
    position: relative;
    padding-bottom: 6.375rem
}

@media (min-width: 576px) {
    .content {
        padding-bottom: 3.9875rem
    }
}

@media (min-width: 576px) {
    .sidebar.sidebar-expand-xl + .content {
        margin-left: 15.625rem;
    }
}
</style>