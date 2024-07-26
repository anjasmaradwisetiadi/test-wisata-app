<template>
    <div 
        id="ActivityComponent" class="flex justify-center min-h-screen ">
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex flex-row fixed justify-between px-4 container bg-gray-50 dark:bg-gray-900 mt-24 lg:mt-24 py-3 lg:pt-10 ">
                <div>
                    <h1 class="lg:text-3xl md:text-3xl text-xl sm: font-bold">ACTIVITY</h1>
                </div>
                <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer">
                    <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                        add
                    </span>
                    <h1 class="md:text-2xl lg:text-2xl text-lg ">&nbsp;Tambah</h1>
                </div>
            </div>
            <div class="flex flex-row flex-wrap justify-center mt-24 lg:mt-28 pt-20 lg:pt-24">
                <div 
                    v-for="(item, index) in activity_dummy_data.data"
                    :key="index"
                    class="w-2/4 lg:w-1/4 py-2 lg:py-4 px-2 lg:px-4 "

                >
                    <div class="border border-solid border-gray-200 shadow-lg rounded-md px-4 py-6">
                        <div 
                            @click="onDetail(item?.id)"
                            class="h-[12rem] text-2xl font-semibold cursor-pointer">
                            {{ item?.title }}
                        </div>
                        <div class="flex justify-between align-center text-gray-500">
                            <div class="flex items-center align-center text-xl">
                                {{ convertDate(item?.created_at) }}
                            </div>
                            <div class="flex items-center align-center">
                                <span 
                                    class="material-icons-outlined text-gray-500 cursor-pointer text-3xl" style="line-height: 1rem;" 
                                    @click="onDelete(item?.created_at)"
                                >
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DeleteDataModal
    :loading="loading" 
        :isOpenModal="isOpenModalGlobal"
        :confirmButton="nameModalButtonGlobal" 
        :nameModal="nameModal" 
        :isConfirmModal="isConfirmModalGlobal"  
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="responseModalGlobal" 
    >

    </DeleteDataModal>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { activity_dummy_data } from '@/utilize/DataDummy';
import DeleteDataModal from '@/components/DeleteDataModal.vue';
import { utilize } from '@/utilize/index'

const router = useRouter();

const isOpenModalGlobal = ref(false);
const nameModalButtonGlobal = ref('Yes');
const nameModal = ref('delete_activity');
const isConfirmModal = ref(false);
const responseModalGlobal = ref(null);
const isConfirmModalGlobal = ref(false);


function convertDate(data){
    return utilize.convertTimeDate(data);
}

function isOpenModelCloseServer (event) {
    isConfirmModal.value = false;
    isOpenModalGlobal.value = false;
    responseModalGlobal.value = null;
    isConfirmModalGlobal.value = false;
}

const onDelete = () => {
    isConfirmModal.value = true;
    isOpenModalGlobal.value = true;
    isConfirmModalGlobal.value = true;
    responseModalGlobal.value = {
        title: 'Delete Data',
        message: 'Are you sure want delete this data ?'
    }
}

const onDetail = (data) =>{
    router.push(`activity/detail/${data}`)
}


</script>

<style scoped>

</style>