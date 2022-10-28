<template>
    <div>
<!--        <a href="#" @click="logout">Logout</a>-->
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const logout = () => {
    useAuthStore().logout()

    window.location.reload()
}
</script>

<style scoped>

</style>