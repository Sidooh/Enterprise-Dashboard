<template>
    <div class="container-fluid px-0">
        <Sidebar/>

        <div class="content">
            <Header/>

            <div class="p-3">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/partials/Sidebar.vue";
import Header from "@/components/partials/Header.vue";</script>

<style scoped>
.content {
    min-height: 100vh;
    position: relative;
    transition: all .2s ease;
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

@media (min-width: 1200px) {
    .sidebar.sidebar-expand-xl + .content {
        margin-left: 15.625rem;
    }
    .sidebar-collapsed .sidebar.sidebar-expand-xl + .content {
        margin-left: 3.125rem;
    }
}
</style>