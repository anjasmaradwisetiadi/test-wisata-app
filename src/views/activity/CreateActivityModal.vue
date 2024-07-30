<template>
    <div id="CreateActivityComponent">
        <div 
            v-if=" props?.isOpenModal" 
            id="modal-bg" class="w-full h-full z-20 fixed top-0 blur-background overflow-hidden">
        </div>
        <!-- loading -->
        <div
            v-if="props?.loading" 
            class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 fixed z-20">
            <img src="../../assets/animated/spinner.svg" alt="spinner">
        </div>
        <transition
            v-if="props?.isOpenModal"  name="fade"
        >
            <div
                id="modal-box" 
                class="w-[385px] min-w-[30vw] lg:w-[385px] lg:min-w-[30vw] lg:min-h-[20vh] flex flex-col items-center gap-2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 shadow-md z-20 border border-solid border-gray-200 fixed"
            >
                <header class="flex w-full justify-between py-6 px-6 border-b border-gray-400">
                    <div>
                        <h2 class="text-xl text-blue-primary font-medium mt-2">{{props?.responseModal?.title}} </h2>
                    </div>
                    <div>
                        <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg cursor-pointer" @click="onToggle(false)">
                            close
                        </span>
                    </div>
                </header>
                <main class="w-full px-6 py-3">
                    <div class="flex flex-col">
                            <div class="font-semibold">
                                Name Activity
                            </div>
                            <div>
                                <input
                                    v-model="nameActivity"
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                                    placeholder="Activity name"
                                />
                                <small v-if="isNameError" class="form-text invalid-feedback">Pleasse fill this field</small>
                            </div>
                        </div>
                    <div class="flex flex-col mt-2">
                        <div class="font-semibold">
                            Activity List Item
                        </div>
                        <div>
                            <div class="relative text-lg w-full">
                                <button
                                    class="flex items-center justify-between ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600 px-3 py-2 bg-white w-full rounded-lg"
                                    @click="isOptionsExpanded = !isOptionsExpanded"
                                    @blur="isOptionsExpanded = false"
                                >
                                    <div class="flex items-center">
                                        <template v-if="selectedOption === 'activity_task'">
                                            <span class="material-icons-outlined mr-4">
                                                checklist
                                            </span>
                                            <span>
                                                Activity Task
                                            </span>
                                        </template>
                                        <template v-if="selectedOption === 'activity_text'">
                                            <span class="material-icons-outlined mr-4">
                                                edit_note
                                            </span>
                                            <span>
                                                Activity Text
                                            </span>
                                        </template>
                                    </div>
                                    <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
                                    :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                    </svg>
                                </button>
                                <transition
                                    enter-active-class="transform transition duration-500 ease-custom"
                                    enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                    enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                    leave-active-class="transform transition duration-300 ease-custom"
                                    leave-class="translate-y-0 scale-y-100 opacity-100"
                                    leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                                >
                                    <ul
                                    v-show="isOptionsExpanded"
                                    class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
                                    >
                                        <li
                                            v-for="(option, index) in options"
                                            :key="index"
                                            class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                            @mousedown.prevent="setOption(option.value)"
                                        >
                                            <div class="flex items-center">
                                                <template v-if="option.value === 'activity_task'">
                                                    <span class="material-icons-outlined mr-4">
                                                        checklist
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                                <template v-if="option.value === 'activity_text'">
                                                    <span class="material-icons-outlined mr-4">
                                                        edit_note
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                            </div>
                                        </li>
                                    </ul>
                                </transition>
                            </div>
                        </div>
                    </div>
                </main>
                <footer class="flex w-full justify-end px-6">
                    <div class="flex ">
                        <button id="modal-close" class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7 mr-2"
                            @click="onToggle(true)"
                        > Submit </button>
                    </div>
                    <div class="flex">
                        <button id="modal-close" class="py-2 px-6 bg-red-primary rounded-lg text-white mb-7"
                            @click="onToggle(false)"
                        > Cancel </button>
                    </div>
                </footer>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useSubActivitiesStore } from '@/stores/subActivityStore';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { useRouter } from 'vue-router';
import '@/css/bullet-priority.css'
import { errorHandle } from '@/utilize/HandleError';

const router = useRouter();
const subActivitiesStore = useSubActivitiesStore()
const activitiesStore = useActivitiesStore();


const nameSubActivity = ref('');
const isOptionsExpanded = ref(false);
const selectedOption = ref('activity_task');
const isEdit= ref(false)
const nameActivity = ref('');

const isNameError = ref(false);

const options = ref([
    {
        key: 'Activity Task',
        value: 'activity_task' 
    },
    {
        key: 'Activity Text',
        value: 'activity_text' 
    },
])

const props = defineProps({
    loading:{
        default: false
    },
    responseModal:{
        type: Object,
        default() {
            return {
                title: 'Something Wrong',
                message: 'Please contact your admin',
            }
        }
    },
    // for add name modal unique
    nameModal: {
        default: ''
    },
    isOpenModal: {
        default: false
    },
    id: {
        type: String,
        default: ''
    },
    idSubActivity: {
        type: String,
        default: ''
    }
})

const emit = defineEmits([
    'isOpenModelCloseGeneral',
]);

const checkValidty = () => {
    const nameValidty = nameActivity.value ? false : true

    isNameError.value = nameValidty

    return nameValidty
}

const resetState = () =>{
    isNameError.value = false
}

function onToggle(data) {
    const result = checkValidty()
    const payload = {
        name: props.nameModal,
        value: data
    }

    if(data){
        if(!result){
            if(selectedOption.value === 'activity_task'){
                const payload = {
                    title: nameActivity.value,
                    type: 'activity_task'
                }
                activitiesStore.activitiesCreate(payload)
            } else {
                const payload = {
                    title: nameActivity.value,
                    type: 'activity_text'
                }
                activitiesStore.activitiesCreate(payload)
            }

            resetState()
            emit('isOpenModelCloseGeneral', payload)   
        } else {
            errorHandle.errorMessage('Please fill required input')
        }
    } else {
        resetState()
        emit('isOpenModelCloseGeneral', payload)   
    }
}

function setOption(option) {
      selectedOption.value = option;
      isOptionsExpanded.value = false;
}

</script>

<style scoped>

.blur-background{
    background-color: rgba(255,255,255, 0.8);
}

</style>