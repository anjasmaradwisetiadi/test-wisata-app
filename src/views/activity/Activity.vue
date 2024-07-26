<template>
    <div id="ActivityComponent" class="flex justify-center min-h-screen mt-28 lg:mt-28 pt-2 lg:pt-10">
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex justify-between px-4">
                <div>
                    <h1 class="lg:text-3xl md:text-3xl text-xl sm: font-bold">ACTIVITY</h1>
                </div>
                <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 text-sm text-white">
                    <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                        add
                    </span>
                    <h1 class="md:text-2xl lg:text-2xl text-lg ">&nbsp;Tambah</h1>
                </div>
            </div>
            <div class="flex flex-row flex-wrap justify-center">

                <div 
                    v-for="(item, index) in activity_dummy_data.data"
                    :key="index"
                    class="w-2/4 lg:w-1/4 py-2 lg:py-4 px-2 lg:px-4 "

                >
                    <div class="border border-solid border-gray-200 shadow-lg rounded-md px-4 py-6">
                        <div class="h-[12rem] text-2xl font-semibold">
                            {{ item?.title }}
                        </div>
                        <div class="flex justify-between align-center text-gray-500">
                            <div class="text-xl">
                                {{ convertDate(item?.created_at) }}
                            </div>
                            <div>
                                <span class="material-icons-outlined text-gray-500 cursor-pointer text-3xl" style="line-height: 1rem;">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { activity_dummy_data } from '@/utilize/DataDummy';
import { utilize } from '@/utilize/index'


function convertDate(data){
    return utilize.convertTimeDate(data);
}
</script>

<style scoped>

</style>