<template>
    <div 
        id="ActivityComponent" class="flex justify-center min-h-screen ">
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex flex-row fixed justify-between px-4 container bg-gray-50 dark:bg-gray-900 mt-24 lg:mt-24 py-3 lg:pt-10 ">
                <div>
                    <h1 class="lg:text-3xl md:text-3xl text-xl font-bold">ACTIVITY</h1>
                </div>
                <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer"
                    @click="onCreateActivity()"
                >
                    <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                        add
                    </span>
                    <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Tambah</h1>
                </div>
            </div>
            <div class="flex flex-row flex-wrap justify-center mt-24 lg:mt-28 pt-20 lg:pt-24">
                <div 
                    v-for="(item, index) in getActivities?.data"
                    :key="index"
                    class="w-2/4 lg:w-1/4 py-2 lg:py-4 px-2 lg:px-4 "

                >
                    <div class="border border-solid border-gray-200 shadow-lg rounded-md px-4 py-6">
                        <div 
                            @click="onDetail(item)"
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
                                    @click="onDelete(item)"
                                >
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex w-full justify-start shadow-lg px-2">
                    <div class="flex border items-center border-solid border-gray-300 w-full px-4 py-3 my-8">
                        <button 
                            class="mr-2 cursor-pointer bg-sky-400 hover:bg-sky-600 rounded-lg px-3 py-1 border border-gray-500 disabled:opacity-50 disabled:bg-gray-200 disabled:cursor-not-allowed" 
                            @click="prevPage()"
                            :disabled=" page <= 1 ?'' : disabled "
                        >
                            <span class="material-icons-outlined md:text-xl lg:text-xl text-lg">
                                arrow_back_ios
                            </span>
                        </button>
                        <button class="mr-5 cursor-pointer bg-sky-400 hover:bg-sky-600 rounded-lg px-3 py-1 border border-gray-500 disabled:opacity-50 disabled:bg-gray-200 disabled:cursor-not-allowed" 
                            @click="nextPage()"
                            :disabled="page < getActivities?.paging?.total_page ?  disabled : '' "
                        >
                            <span class="material-icons-outlined md:text-xl lg:text-xl text-lg ">
                                arrow_forward_ios
                            </span>
                        </button>
                        <div>
                            {{ getActivities?.paging?.current_page > 1 ? (getActivities?.paging?.current_page - 1) * 8 : 1 }} - {{ (getActivities?.paging?.current_page * 8) > getActivities?.paging?.count ? getActivities?.paging?.count : (getActivities?.paging?.current_page * 8) }} of {{ getActivities?.paging?.count }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingAndAlert
        :loading="getLoading"
        :responseSwalError="getError"
        :responseSwalSuccess="getSuccess"
    >
    </LoadingAndAlert>
    <CreateActivityModal
        :isOpenModal="getIsOpenModalGlobal"
        :nameModal="getNameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="getResponseModalGlobal" 
    >
    </CreateActivityModal>
</template>

<script setup>
import { ref, watch, watchEffect, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { utilize } from '@/utilize/index'
import { useActivitiesStore } from '@/stores/activitiesStore';
import LoadingAndAlert from '@/components/LoadingAndAlert.vue';
import CreateActivityModal from './CreateActivityModal.vue';
import { useFormDataModalStore } from '@/stores/formDataModalStore';

import Swal from 'sweetalert2';

const router = useRouter();
const activitiesStore = useActivitiesStore();
const formDataModalStore = useFormDataModalStore();

const page = ref(0);
const limit = ref(0);
const search = ref('');

// ********* get data activity
const getLoading = computed(()=>{
    return activitiesStore.loading;
})

const getActivities = computed(()=>{
    return activitiesStore.activities;
})

const getError = computed(()=>{
    return activitiesStore.errorResponse;
})

const getSuccess = computed(()=>{
    if(activitiesStore?.createResponse?.message === 'create'){
        activitiesStore.activitiesList(paginate())
        return activitiesStore?.createResponse
    } else if (activitiesStore?.deleteResponse?.message === 'delete') {
        activitiesStore.activitiesList(paginate())
        return activitiesStore?.deleteResponse
    } 
})

//********** */ form modal data trigger response 
const getIsOpenModalGlobal = computed(()=>{
    return formDataModalStore.isOpenModalGlobal
})
const getNameModal = computed(()=>{
    return formDataModalStore.nameModal
})
const getResponseModalGlobal = computed(()=>{
    return formDataModalStore.responseModalGlobal
})
const getIdSubActivity = computed(()=>{
    return formDataModalStore.idData;
})

watchEffect(() => 
    getIsOpenModalGlobal, 
    getNameModal, 
    getResponseModalGlobal, 
    getIdSubActivity,
 { immediate: true })

watchEffect(()=>getSuccess, {immediate: true})


onMounted(()=>{
    activitiesStore.activitiesList(paginate())
})

function convertDate(data){
    return utilize.convertTimeDate(data);
}

function paginate(pageParam=1, limitParam=8, searchParam=''){
    page.value = pageParam;
    limit.value = limitParam;
    search.value = searchParam;
    
    const payloadPage = {
        page: page.value,
        limit: limit.value,
        search: search.value,
    }

    return payloadPage
}

const onDelete = (data) => {
    Swal.fire({
        icon: "warning",
        text: `Are you sure want delete this activity ${data.title}?`,
        title: "Delete Activity",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result)=>{
        if (result.isConfirmed) {
            activitiesStore.activitiesDelete(data?.id)
        }
    })
}

const onCreateActivity = () => {

    const isOpenModalGlobal = true;
    const nameModal ='create_activity';
    const responseModalGlobal = {
        title: 'Create Activity',
        message: ''
    }

    const payload = {
        'isOpenModalGlobal': isOpenModalGlobal,
        'nameModal': nameModal,
        'responseModalGlobal': responseModalGlobal
    }
    formDataModalStore.onActivatedModal(payload)
}

const onDetail = (data) =>{
    
    if(data?.type === "activity_task"){
        router.push(`activity/activity-task/${data?.id}`)
    } else {
        // it need add testing route etxt
        router.push(`activity/activity-text/${data?.id}`)
    }
}

const isOpenModelCloseServer = (event) =>{
    formDataModalStore.onDeactivatedModal()
}

const nextPage = () => {
    page.value = page.value+1
    activitiesStore.activitiesList(paginate(page.value, 8, ''))
}

const prevPage = () =>{
    page.value = page.value-1
    activitiesStore.activitiesList(paginate(page.value, 8, ''))
}


</script>

<style scoped>

</style>