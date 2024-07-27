<template>
    <div id="Loading">
        <div
            v-if="props?.loading" 
            id="modal-bg" class="w-full h-full z-20 absolute top-0 absolute blur-background">
        </div>
        <div 
            v-if="condition"
            class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-20">
            <img src="../assets/animated/spinner.svg" alt="spinner">
        </div>
        <div class="sweet-alert" v-if="props.responseSwal">
           <div style="display: none;">{{responseSwalDisplay}}</div> 
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import {collectUrl} from '../utilize/collectUrl'
import { successHandle } from '@/utilize/HandleSuccess';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    responseSwal: {
        default: null
    }
})

const responseSwalDisplay = computed(() => {
    const responseSwal = props?.responseSwal;
})
</script>

<style scoped>
.blur-background{
    background-color: rgba(255,255,255, 0.7);
}
</style>