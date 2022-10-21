<template>
    <component :is="layout"/>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from '@/components/layouts/Default.vue'
import { useAuthStore } from "@/stores/auth";

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(() => {
    const authStore = useAuthStore()

    authStore.checkLocalAuth()
})
</script>

<style scoped>
</style>
