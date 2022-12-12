<template>
    <Suspense>
        <slot/>

        <template #fallback>
            <div class="wrapper">
                <div style="width: 5rem; height: 5rem">
                    <div class="spinner-border text-primary" role="status" style="width: 5rem; height: 5rem">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
    z-index: 1301;
}
</style>