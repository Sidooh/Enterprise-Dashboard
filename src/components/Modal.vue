<template>
    <div :id="id" class="modal fade" tabindex="-1" :aria-labelledby="`${id}_label`">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-0 border-0">
                <div class="modal-header border-0">
                    <h5 class="modal-title border-bottom">
                        <slot name="title"/>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="onClose"></button>
                </div>
                <div class="modal-body">
                    <slot name="body"/>
                </div>
                <div class="modal-footer border-0">
                    <slot name="footer"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string, onClose?: () => void }>()
</script>

<style scoped>

</style>