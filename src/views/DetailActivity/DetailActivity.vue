<template>
    <div 
        id="ActivityDetailComponent"
        class="flex justify-center min-h-screen "
    >
        <div class="relative overflow-y-auto overflow-x-hidden z-1 container">
            <div class="flex flex-row flex-wrap fixed justify-between px-4 container bg-gray-50 dark:bg-gray-900 mt-24 lg:mt-24 py-3 lg:pt-10 ">
                <div class="flex items-center mb-4 lg:mb-0">
                    <span class="lg:text-3xl md:text-3xl text-xl cursor-pointer material-icons-outlined pr-3"
                        @click="onBack()"
                    >
                        arrow_back_ios
                    </span>
                    <template v-if="!isActivityEdit">
                        <h1 class="lg:text-3xl md:text-3xl text-xl cursor-pointer"> {{activityName}}</h1>
                    </template>
                    <template v-if="isActivityEdit">
                        <div >   
                            <input
                                v-model="activityName"
                                id="name"
                                name="name"
                                type="text"
                                required
                                class="block w-full rounded-md border border-gray-400 py-2 text-gray-900 ring-0 focus:ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-[8px]"
                                placeholder="Schedule Name"
                                />
                        </div>
                    </template>
                    <template v-if="!isActivityEdit">
                        <span class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined pl-5 cursor-pointer" 
                            @click="editActivity()"
                        >
                            edit
                        </span>
                    </template>
                    <template v-if="isActivityEdit">
                        <span class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined pl-5 cursor-pointer" 
                            @click="onSubmitActivity()"
                        >
                            done
                        </span>
                </template>
                </div>
                <div class="flex flex-row sm:justify-between sm:pt-3 w-full lg:w-auto">
                    <div class="flex">
                        <!--********** draggable mode -->
                        <button
                            class="flex justify-center h-14 w-14 py-4 px-3 rounded-full items-center bg-white border border-gray-400 mr-4"
                            @click="isDraggble = !isDraggble"
                            @blur="isDraggble = false"
                        >
                            <template v-if="!isDraggble">
                                <span class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined cursor-pointer" 
                                >
                                    unfold_more
                                </span>
                            </template>
                            <template v-if="isDraggble">
                                <span class="lg:text-3xl md:text-3xl text-xl text-stone-400 font-bold material-icons-outlined  cursor-pointer" 
                                >
                                    done
                                </span>
                            </template>
                        </button>
                    </div>
                    <!--********** filter task choice -->
                    <div class="relative text-lg w-80 mr-3 w-full">
                        <div class="flex w-full  lg:justify-end justify-start">
                            <button
                                class="flex h-14 w-14 rounded-full items-center justify-between px-4 py-3 bg-white border border-gray-400 "
                                @click="isOptionsExpanded = !isOptionsExpanded"
                                @blur="isOptionsExpanded = false"
                            >
                                <FilterIcon></FilterIcon>
                            </button>
                        </div>
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
                            class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-48"
                            >
                                <li
                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                    @mousedown.prevent="setOption('newest')"
                                >
                                    <div class="flex justify-center items-center">
                                        <div class="w-3/12 px-3 flex justify-center items-center">
                                            <Newest></Newest>
                                        </div>
                                        <div class="w-6/12">
                                            Terbaru
                                        </div>
                                        <div class="w-3/12 text-right">
                                            <template
                                                v-if="selectOption === 'newest'"
                                            >
                                                <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                                    done
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                    @mousedown.prevent="setOption('oldest')"
                                >
                                    <div class="flex justify-center items-center">
                                        <div class="w-3/12 px-3 flex justify-center items-center">
                                            <Oldest></Oldest>
                                        </div>
                                        <div class="w-6/12">
                                            Terlama
                                        </div>
                                        <div class="w-3/12 text-right">
                                            <template
                                                v-if="selectOption === 'oldest'"
                                            >
                                                <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                                    done
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                    @mousedown.prevent="setOption('AToZ')"
                                >
                                    <div class="flex justify-center items-center">
                                        <div class="w-3/12 px-3 flex justify-center items-center">
                                            <AToZ></AToZ>
                                        </div>
                                        <div class="w-6/12">
                                            A To Z
                                        </div>
                                        <div class="w-3/12 text-right">
                                            <template
                                                v-if="selectOption === 'AToZ'"
                                            >
                                                <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                                    done
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                    @mousedown.prevent="setOption('ZToA')"
                                >
                                    <div class="flex justify-center items-center">
                                        <div class="w-3/12 px-3 flex justify-center items-center">
                                            <ZtoA></ZtoA>
                                        </div>
                                        <div class="w-6/12">
                                            Z To A
                                        </div>
                                        <div class="w-3/12 text-right">
                                            <template
                                                v-if="selectOption === 'ZToA'"
                                            >
                                                <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                                    done
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
                                    @mousedown.prevent="setOption('NotDone')"
                                >
                                    <div class="flex justify-center items-center">
                                        <div class="w-3/12 px-3 flex justify-center items-center">
                                            <NotDone></NotDone>
                                        </div>
                                        <div class="w-6/12">
                                            Belum Selesai
                                        </div>
                                        <div class="w-3/12 text-right">
                                            <template
                                                v-if="selectOption === 'NotDone'"
                                            >
                                                <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                                    done
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                    <!--********** add sub-activity -->
                    <div class="flex w-full justify-end">
                        <div class="flex justify-center align-center items-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-sky-400 hover:bg-sky-600 text-sm text-white cursor-pointer"
                            @click="onCreateSubActivity()"
                        >
                            <span class="material-icons-outlined md:text-2xl lg:text-2xl text-lg">
                                add
                            </span>
                            <h1 class="md:text-2xl lg:text-2xl text-lg">&nbsp;Tambah</h1>
                        </div>
                    </div>
                </div>
            </div>
            <!--********* table detail activity  -->
            <ListDetailActivity
                :isDraggble = "isDraggble"
            ></ListDetailActivity>
        </div>
        
    </div>
    <CreateSubActivityModal
        :isOpenModal="isOpenModalGlobal"
        :nameModal="nameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="responseModalGlobal" 
        :loading="loading"
    >
    </CreateSubActivityModal>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import FilterIcon from '@/assets/svg/FilterIcon.vue'
import AToZ from '@/assets/svg/AToZ.vue';
import ZtoA from '@/assets/svg/ZtoA.vue';
import Newest from '@/assets/svg/Newest.vue';
import Oldest from '@/assets/svg/Oldest.vue';
import NotDone from '@/assets/svg/NotDone.vue';
import ListDetailActivity from '@/views/DetailActivity/ListDetailActivity.vue'
import CreateSubActivityModal from '@/views/DetailActivity/CreateSubActivityModal.vue';

const router = useRouter();

const selectOption = ref('')
const isOptionsExpanded = ref(false)
const isActivityEdit = ref(false);
const activityName = ref('New Create Activity')
const isDraggble = ref(false)

//********** */ trigger modal activity 

const dataSubMenuActivity = ref([])
const loading = ref(false)
const nameModal = ref('create_form')
const responseModalGlobal = ref(null)
const isOpenModalGlobal = ref(false)

onMounted(()=>{

})

const editActivity = () => {
    isActivityEdit.value = true
}

const onSubmitActivity = () =>{
    isActivityEdit.value = false
    console.log("submit activity")
}

const setOption = (option) => {
    selectOption.value = option;
    isOptionsExpanded.value = false;
}

const onCreateSubActivity = () => {
    // ***** call modal need parse from store pinia
    console.log("onCreateSubActivity")
    isOpenModalGlobal.value = true;
    loading.value = false;
    nameModal.value ='create_form'
    responseModalGlobal.value = {
        title: 'Delete Data',
        message: 'Are you sure want delete this data ?'
    }
}

const isOpenModelCloseServer = (event) =>{
    // ***** call modal need parse from store pinia
    isOpenModalGlobal.value = false;
    loading.value = false;
    nameModal.value = ''
    responseModalGlobal.value = null
    
}

const onBack = () => {
    router.push(`/`)

}
</script>

<style scoped>

</style>