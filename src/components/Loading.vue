<template>
    <div id="Loading">
        <div 
            id="modal-bg" class="w-full h-full z-20 absolute top-0 absolute blur-background">
        </div>
        <div class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-20">
            <img src="../assets/animated/spinner.svg" alt="spinner">
        </div>
    </div>
</template>

<script setup>
import {collectUrl} from '../utilize/collectUrl'

</script>

<style scoped>
.blur-background{
    background-color: rgba(255,255,255, 0.7);
}
</style>