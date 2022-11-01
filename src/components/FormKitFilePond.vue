<template>
    <file-pond v-model="file" label-idle="Drop company registration letter here..."
               store-as-file
               ref="pond" accepted-file-types="application/pdf, application/msword"/>
</template>

<script setup lang="ts">
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import 'filepond/dist/filepond.min.css';

const props = defineProps({
    context: Object,
})

const FilePond = vueFilePond(FilePondPluginFileValidateType);
</script>

<style scoped>

</style>