<template>
    <div id="ActivityTextComponent" class="flex justify-center min-h-screen ">
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex flex-row fixed justify-between px-4 container bg-gray-50 dark:bg-gray-900 mt-24 lg:mt-24 py-3 lg:pt-10 ">
                <div class="mr-3">
                    <div class="flex items-center mb-4 lg:mb-0">
                        <span class="lg:text-3xl md:text-3xl text-xl cursor-pointer material-icons-outlined pr-3"
                            @click="onBack()"
                        >
                            arrow_back_ios
                        </span>
                        <template v-if="!isActivityEdit">
                            <div class="flex overflow-text">
                                <h1 class=" lg:text-3xl md:text-3xl text-xl cursor-pointer "> {{getDetailResponseActivity?.title}}</h1>
                            </div>
                        </template>
                        <template v-if="isActivityEdit">
                            <div class="w-full border-b-2 border-black">   
                                <input
                                    v-model="activityName"
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    class="block w-full rounded-md border-none border-bottom bg-gray-50 focus:outline-none focus:ring-0 text-xl lg:text-3xl py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-[8px]"
                                    placeholder="Schedule Name"
                                    />
                            </div>
                        </template>
                        <template v-if="!isActivityEdit">
                            <span 
                                v-if="selectOption !== 'notdone'"
                                class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined pl-4 cursor-pointer" 
                                @click="editActivity(getDetailResponseActivity)"
                            >
                                edit
                            </span>
                        </template>
                        <template v-if="isActivityEdit">
                            <span
                                class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined pl-4 cursor-pointer" 
                                @click="onUpdateActivity(getDetailResponseActivity)"
                            >
                                done
                            </span>
                        </template>
                    </div>
                </div>
                <div class="w-18">
                    <div class="flex justify-center align-center md:px-6 lg:px-6 px-2 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer"
                        @click="onEdit()"
                    >
                        <template v-if="!isEdit">
                            <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                edit
                            </span>
                            <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Edit</h1>
                        </template>
                        <template v-if="isEdit">
                            <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                done
                            </span>
                            <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Submit</h1>
                        </template>
                    </div>
                </div>
            </div>
            <div class="flex flex-row flex-wrap justify-center mt-24 lg:mt-28 pt-20 lg:pt-24 px-4">
                <template
                    v-if="!isEdit"
                >
                    <div class="w-full">
                        <label for="inputBody">Note: </label>
                        <div class="bg-white shadow-lg lg:p-8 p-4 border border-gray-300 rounded-lg">
                            <div class="card-body">
                                <div class="information-html" v-html="note"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template 
                    v-if="isEdit"
                >
                    <div class="w-full">
                        <label for="inputBody">Note: </label>
                        <quill-editor 
                            id="inputBody" 
                            v-model:content="note" 
                            content-type="html" 
                            placeholder="Write your information....">
                        </quill-editor>
                    </div>

                </template>
            </div>
        </div>
    </div>
    <!-- ******* display loading, success ,error, activity  -->
    <LoadingAndAlert
        :loading="getLoadingActivity"
        :responseSwalError="getErrorActivity"
        :responseSwalSuccess="getSuccessActivity"
    >
    </LoadingAndAlert>

    <!-- ******* display loading, success ,error, sub-activity  -->
    <LoadingAndAlert
        :loading="getLoadingSubActivityText"
        :responseSwalError="getErrorActivityText"
        :responseSwalSuccess="getSuccessActivityText"
    >
    </LoadingAndAlert>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount, watchEffect } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'
import { useActivitiesStore } from '@/stores/activitiesStore';
import { useSubActivitiesTextStore } from '@/stores/subActivityTextStore';
import { useRouter } from 'vue-router';
import LoadingAndAlert from '@/components/LoadingAndAlert.vue';
import '@/css/format-text.css'

const router = useRouter();
const activitiesStore = useActivitiesStore()
const subActivitiesTextStore = useSubActivitiesTextStore()

const textDefault = `<p class="default-text">Fill your note empty ....</p>`
const note = ref(textDefault);
const isActivityEdit = ref(false);
const activityName = ref('');
const idActivity = ref('');
const valueSaveActivityDetail = ref(null);
// const idActivityText = ref('');
const isEdit = ref(false)

//********** */ get activity response 
const getLoadingActivity = computed(()=>{
    return activitiesStore.loading;
})

const getErrorActivity = computed(()=>{
    return activitiesStore.errorResponse;
})

const getErrorActivityText = computed(()=>{
    return subActivitiesTextStore.errorResponse;
})

const getDetailResponseActivity = computed(()=>{
    if(activitiesStore.detailResponse && createResponse){
        getSubActivityText(activitiesStore?.detailResponse?.id)
    }
    return activitiesStore.detailResponse;
})

const getSuccessActivity = computed(()=>{
    if(activitiesStore?.updateResponse?.message === 'update'){
        getActivityParent();
        return activitiesStore?.updateResponse
    } 
})

const getSuccessActivityText = computed(()=>{
    if(subActivitiesTextStore?.updateResponse?.message === 'update'){
        getActivityParent();
        return subActivitiesTextStore?.updateResponse
    } 
})

//********** */ get sub activity text response 
const getLoadingSubActivityText = computed(()=>{
    return subActivitiesTextStore.loading;
})

const getDetailResponseSubActivityText = computed(()=>{
    return subActivitiesTextStore.subActivitiesText;
})

const createResponse = computed( ()=>{
    return subActivitiesTextStore?.createResponse;
})

onMounted(()=>{
    // ******** trigger data get activity detail
    getActivityParent();
})

watchEffect(() => getSuccessActivity, { immediate: true })
watchEffect(createResponse, { immediate: true })
// watchEffect(getSubActivitiesText, { immediate: true })

const getActivityParent = () =>{
    const payloadSlug = router.currentRoute.value.params.id;
    idActivity.value = payloadSlug
    const positionSubActivity = 'activity_text'
    subActivitiesTextStore.subActivitiesTextList(payloadSlug);
    activitiesStore.activitiesDetail(payloadSlug, positionSubActivity);
}

watch(getDetailResponseSubActivityText, (newValue, oldValue)=>{
    if(newValue){
        note.value = newValue?.texts?.length ? newValue?.texts[0]?.text : `<p class="default-text">Fill your note shahsi....</p>`;
        valueSaveActivityDetail.value = newValue?.texts[0]
        return newValue
    }
})

const getSubActivityText = (id) =>{
    subActivitiesTextStore.subActivitiesTextList(id)
}

const editActivity = (data) => {
    isActivityEdit.value = true
    activityName.value = data?.title
}

const onUpdateActivity = (data) =>{
    isActivityEdit.value = false
    const payload = {
        title: activityName.value,
         type: 'activity_text'
    }
    activitiesStore.activitiesEdit(data?.id, payload)
}

function onEdit(){
    isEdit.value = !isEdit.value
    if(!isEdit.value){
        const idText =  valueSaveActivityDetail.value ? valueSaveActivityDetail.value.id : ''
        const payload = {
            text : note.value
        }
        subActivitiesTextStore.subActivitiesTextEdit(idText, payload)
    }
}

const onBack = () => {
    router.push(`/`)
}
</script>

<style>

</style>