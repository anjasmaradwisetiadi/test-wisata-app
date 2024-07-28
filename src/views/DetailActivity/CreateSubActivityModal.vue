<template>
    <div id="CreateSubActivityComponent">
        <div 
            v-if=" props?.isOpenModal" 
            id="modal-bg" class="w-full h-full z-20 fixed top-0 blur-background overflow-hidden">
        </div>
        <!-- loading -->
        <div
            v-if="props?.loading" 
            class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 fixed z-20">
            <img src="../assets/animated/spinner.svg" alt="spinner">
        </div>
        <transition
            v-if="props?.isOpenModal && !props?.loading"  name="fade"
        >
            <div
                id="modal-box" 
                class="w-[385px] min-w-[30vw] lg:w-[385px] lg:min-w-[30vw] lg:min-h-[20vh] flex flex-col items-center gap-2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 shadow-md z-20 border border-solid border-gray-200 fixed"
            >
                <div class="flex w-full justify-between py-6 px-6 border-b border-gray-400">
                    <div>
                        <h2 class="text-xl text-blue-primary font-medium mt-2">{{props?.responseModal?.title}} </h2>
                    </div>
                    <div>
                        <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg cursor-pointer" @click="onToggle(false)">
                            close
                        </span>
                    </div>
                </div>
                <div class="w-full px-6 py-3">
                    <div class="flex flex-col">
                        <div class="font-semibold">
                            Name List Item
                        </div>
                        <div>
                            <input
                                v-model="nameSubActivity"
                                id="name"
                                name="name"
                                autocomplete="username"
                                type="text"
                                required
                                class="block w-full rounded-md border py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-[8px]"
                                placeholder="Schedule Name"
                                :disabled="isEdit"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col mt-2">
                        <div class="font-semibold">
                            Priorty List Item
                        </div>
                        <div>
                            <div class="relative text-lg w-full">
                                <button
                                    class="flex items-center justify-between ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600 px-3 py-2 bg-white w-full rounded-lg"
                                    @click="isOptionsExpanded = !isOptionsExpanded"
                                    @blur="isOptionsExpanded = false"
                                >
                                    <div class="flex items-center">
                                        <template v-if="selectedOption === 1">
                                            <span class="bullet-make bullet-color-red">
                                            </span>
                                            <span>
                                                Very High
                                            </span>
                                        </template>
                                        <template v-if="selectedOption === 2">
                                            <span class="bullet-make bullet-color-yellow">
                                            </span>
                                            <span>
                                                High
                                            </span>
                                        </template>
                                        <template v-if="selectedOption === 3">
                                            <span class="bullet-make bullet-color-green">
                                            </span>
                                            <span>
                                                Normal
                                            </span>
                                        </template>
                                        <template v-if="selectedOption === 4">
                                            <span class="bullet-make bullet-color-blue">
                                            </span>
                                            <span>
                                                Low
                                            </span>
                                        </template>
                                        <template v-if="selectedOption === 5">
                                            <span class="bullet-make bullet-color-purple">
                                            </span>
                                            <span>
                                                Very Low
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
                                                <template v-if="option.value === 1">
                                                    <span class="bullet-make bullet-color-red">
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                                <template v-if="option.value === 2">
                                                    <span class="bullet-make bullet-color-yellow">
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                                <template v-if="option.value === 3">
                                                    <span class="bullet-make bullet-color-green">
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                                <template v-if="option.value === 4">
                                                    <span class="bullet-make bullet-color-blue">
                                                    </span>
                                                    <span>
                                                        {{ option?.key }}
                                                    </span>
                                                </template>
                                                <template v-if="option.value === 5">
                                                    <span class="bullet-make bullet-color-purple">
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
                </div>
                <div class="flex w-full justify-end px-6">
                    <div class="flex">
                        <button id="modal-close" class="py-2 px-6 bg-red-primary rounded-lg text-white mb-7 mr-2"
                            @click="onToggle(false)"
                        > Cancel </button>
                    </div>
                    <div class="flex ">
                        <button id="modal-close" class="py-2 px-6 bg-sky-400 rounded-lg text-white mb-7"
                            @click="onToggle(true)"
                        > Submit </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useSubActivitiesStore } from '@/stores/subActivityStore';
import '@/css/bullet-priority.css'

const subActivitiesStore = useSubActivitiesStore()
const nameSubActivity = ref('');
const isOptionsExpanded = ref(false);
const selectedOption = ref(1);
const isEdit= ref(false)
const options = ref([
    {
        key: 'Very High',
        value: 1 
    },
    {
        key: 'High',
        value: 2 
    },
    {
        key: 'Normal',
        value: 3 
    },
    {
        key: 'Low',
        value: 4
    },
    {
        key: 'Very Low',
        value: 5 
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
    }
})

const emit = defineEmits([
    'confirm',
    'confirmDelete',
    'isOpenModelCloseGeneral',
]);

function onToggle(data) {
    if(data){
        if(props.nameModal === 'create_form'){
            console.log("Create form")
            const payload = {
                "activity_id": props?.id,
                "title": nameSubActivity.value,
                "is_active": true,
                "priority": selectedOption.value
            }
            subActivitiesStore.subActivitiesCreate(payload)
        } else {
            console.log("edit form")
        }
    }
    const payload = {
        name: props.nameModal,
        value: data
    }

    emit('isOpenModelCloseGeneral', payload)
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