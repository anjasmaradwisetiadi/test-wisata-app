<template>
    <div id="ListDetailActivity" class="flex flex-row flex-wrap justify-center mt-32 lg:mt-32 pt-28 lg:pt-28">
        <template v-if="!dataSubMenuActivity?.length">
            <img 
                @click="onCreateSubActivity()"
                class="w-[92vw-10rem] cursor-pointer" src="@/assets/image/todo-empty-state.png" alt="image">
        </template>
        <template v-if="dataSubMenuActivity?.length">
            <div>
                ada data
            </div>
        </template>
    </div>
    <!-- <CreateSubActivityModal
        :isOpenModal="isOpenModalGlobal"
        :nameModal="nameModal" 
        @isOpenModelCloseGeneral="isOpenModelCloseServer"
        :responseModal="responseModalGlobal" 
        :loading="loading"
    >

    </CreateSubActivityModal> -->
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onBeforeMount } from 'vue';
import { activity_detail_dummy_data } from '@/utilize/DataDummy';
import CreateSubActivityModal from '@/components/CreateSubActivityModal.vue';

const dataSubMenuActivity = ref([])
const loading = ref(false)
const nameModal = ref('create_form')
const responseModalGlobal = ref(null)
const isOpenModalGlobal = ref(false)

const onCreateSubActivity = () =>{
    // ***** call modal need parse from store pinia
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
</script>

<style scoped>

</style>