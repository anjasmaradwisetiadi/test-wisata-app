<template>
    <div id="ListDetailActivity" class="flex flex-row flex-wrap justify-center mt-32 lg:mt-32 pt-28 lg:pt-28">
        <template v-if="!getLoading && !getSubActivities?.tasks?.length">
            <img 
                @click="onCreateSubActivity()"
                class="w-[92vw-10rem] cursor-pointer" src="@/assets/image/todo-empty-state.png" alt="image">
        </template>
        <template v-if="!getLoading && getSubActivities?.tasks?.length">
            <div class="flex flex-col w-full">
                <div
                    v-for="(item, index) in getSubActivities?.tasks"
                    :key="index"
                    class="flex w-full shadow-lg px-3 py-6 mt-2 border border border-solid border-gray-200"
                >
                    <div class="w-14 flex justify-center items-center align-center mr-1">
                        <template v-if="isDraggble">
                            <span class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined cursor-pointer" 
                            >
                                unfold_more
                            </span>
                        </template>
                        <template v-if="!isDraggble">
                            <input 
                                @change="onUpdateSubActivity(item)" 
                                :value="item?.is_active"
                                id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                :checked="!item?.is_active"
                                >
                        </template>
                    </div>
                    <div class="w-full flex items-center mr-1.5 overflow-text z-0">
                        <div class="flex w-8 items-center mr-0.5">
                            <template v-if="item.priority === 1">
                                <span class="bullet-make bullet-color-red">
                                </span>
                            </template>
                            <template v-if="item.priority === 2">
                                <span class="bullet-make bullet-color-yellow">
                                </span>
                            </template>
                            <template v-if="item.priority === 3">
                                <span class="bullet-make bullet-color-green">
                                </span>
                            </template>
                            <template v-if="item.priority === 4">
                                <span class="bullet-make bullet-color-blue">
                                </span>
                            </template>
                            <template v-if="item.priority === 5">
                                <span class="bullet-make bullet-color-purple">
                                </span>
                            </template>
                        </div>
                        <div class="flex w-full text-xl overflow-text">
                            <template v-if="item.is_active">
                                <span>
                                    {{item?.title}} 
                                </span>
                            </template>
                            <template v-if="!item.is_active">
                                <span class="text-gray-400 line-through">
                                    {{item?.title}}
                                </span>
                            </template>
                        </div>
                        <template v-if="!isDraggble">
                            <div class="w-12 flex items-center mx-1.5">
                                <span class="material-icons-outlined text-gray-500 cursor-pointer text-2xl" style="line-height: 1rem;"
                                        @click="onEditSubActivity(item?.id)"
                                    >
                                        edit
                                </span>
                            </div>
                        </template>
                    </div>
                    <template v-if="!isDraggble">
                        <div class="w-12 flex items-center align-center">
                            <span 
                                class="material-icons-outlined text-gray-500 cursor-pointer text-3xl" style="line-height: 1rem;" 
                                @click="onDeleteSubActivity(item)"
                            >
                                delete
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect, computed, onMounted, onBeforeMount } from 'vue';
import { useSubActivitiesStore } from '@/stores/subActivityStore';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { useRouter } from 'vue-router';
import { activity_detail_dummy_data } from '@/utilize/DataDummy';
import { useFormDataModalStore } from '@/stores/formDataModalStore';
import Swal from 'sweetalert2';

import '@/css/bullet-priority.css'

const router = useRouter();
const activitiesStore = useActivitiesStore()
const subActivitiesStore = useSubActivitiesStore()
const formDataModalStore = useFormDataModalStore()

const page = ref(0);
const limit = ref(0);
const search = ref('');

const props = defineProps({
    isDraggble: {
        type: Boolean,
        default: false
    }
})

const getLoading = computed(()=>{
    return activitiesStore.loading;
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

watchEffect(() => 
    getIsOpenModalGlobal, 
    getNameModal, 
    getResponseModalGlobal, 
{ immediate: true })

// ********** sub activity modal
const getSubActivities = computed(()=>{
    return subActivitiesStore.subActivities;
})

const getSuccess = computed(()=>{
    if(subActivitiesStore?.createResponse?.message === 'create'){
        return subActivitiesStore?.createResponse
    } else if (subActivitiesStore?.deleteResponse?.message === 'delete') {
        return subActivitiesStore?.deleteResponse
    } else if (subActivitiesStore?.updateResponse?.message === 'update') {
        return subActivitiesStore?.updateResponse
    } 
})

watch(getSuccess, (newValue, oldValue)=>{
    if(newValue){
        subActivity()
        return getSubActivities
    }
})

onMounted(()=>{
    subActivity()
})

const subActivity = () => {
    const routeId = router.currentRoute.value.params.id;
    subActivitiesStore.subActivitiesList(routeId)
}

function paginate(pageParam='', limitParam='', searchParam=''){
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

const dataSubMenuActivity = ref(activity_detail_dummy_data.data)
const loading = ref(false)
const nameModal = ref('create_form')
const responseModalGlobal = ref(null)
const isOpenModalGlobal = ref(false)


const onCreateSubActivity = () =>{
    // ***** call modal need parse from store pinia
    const isOpenModalGlobal = true;
    const nameModal ='create_form';
    const responseModalGlobal = {
        title: 'Create Form',
        message: ''
    }

    const payload = {
        'isOpenModalGlobal': isOpenModalGlobal,
        'nameModal': nameModal,
        'responseModalGlobal': responseModalGlobal
    }

    formDataModalStore.onActivatedModal(payload)
}

const onEditSubActivity = (id) => {
    const isOpenModalGlobal = true;
    const nameModal ='edit_form';
    const responseModalGlobal = {
        title: 'Edit Form',
        message: ''
    }

    const payload = {
        'isOpenModalGlobal': isOpenModalGlobal,
        'nameModal': nameModal,
        'responseModalGlobal': responseModalGlobal,
        'id':id
    }

    formDataModalStore.onActivatedModal(payload);
    subActivitiesStore.subActivitiesDetail(id)
}

const onUpdateSubActivity = (data) =>{
    let isActive = data?.is_active;
    isActive = !isActive;

    const payload = {
        "title": data?.title,
        "is_active": isActive,
        "priority": data?.priority,
        "order": data?.order
    }

    subActivitiesStore.subActivitiesEdit(data?.id, payload)
}

const onDeleteSubActivity = (data) =>{

    Swal.fire({
        icon: "warning",
        text: `Are you sure want delete this activity ${data.title}?`,
        title: "Delete Sub-Activity",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result)=>{
        if (result.isConfirmed) {
            subActivitiesStore.subActivitiesDelete(data?.id)
        }
    })
}
</script>

<style scoped>
    .overflow-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>