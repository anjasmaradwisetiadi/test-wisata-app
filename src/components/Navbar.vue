<template>
    <!-- ********* trigger loading   -->
    <div v-if="getLoading">
        <div
            id="modal-bg" class="w-full h-full z-20 absolute top-0 absolute blur-background">
        </div>
        <div 
            class="sm:w-[385px] sm:min-w-[30vw] min-w-[60vw] min-h-[30vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 top-1/2 left-1/2 -translate-x-1/2 absolute z-20">
            <img src="../assets/animated/spinner.svg" alt="spinner">
        </div>
    </div>
    <div id="Navbar">
        <transition name="fade">
            <div class="w-screen flex justify-center title text-center pb-3 pt-4 mb-8 px-3 z-10 fixed bg-sky-400 shadow-lg">
                <div class="container flex flex-row justify-between">
                    <div class="w-1/2 flex justify-start cursor-pointer" @click="goBack()">
                        <h3 class="lg:text-4xl md:text-4xl text-xl text-white font-bold py-5">App Todo List</h3>
                    </div>
                    <div class="w-1/2 flex justify-end items-center">
                        <div class="flex justify-center align-center md:px-6 lg:px-6 px-4 py-2 rounded-full bg-white text-sm text-white cursor-pointer lg:mr-6" 
                            @click="logout()"
                        >
                            <h3 class="lg:text-xl md:text-2xl text-xl text-sky-400 font-bold">
                                Logout
                            </h3>
                        </div>
                    </div>  
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { utilize } from '@/utilize';
import { errorHandle } from '@/utilize/HandleError';

import Swal from 'sweetalert2';
const authStore = useAuthStore()
const router = useRouter();

const nameRoutePath = ref('');

onBeforeMount(()=>{
    const paramsRoute = router.currentRoute.value.name;
    nameRoutePath.value = paramsRoute
})


const getLogoutResponse = computed(()=>{
    return authStore.logoutResponse;
})

const getLoading = computed(()=>{
    return authStore.loading;
})

watch(getLogoutResponse, (newValue, oldValue) => {
    if(newValue?.status === 200 && newValue?.data.message === 'Success'){
        Swal.fire({
            icon: "success",
            title: "Success Logout",
            text: "You will redirect to login",
            confirmButtonColor: '#38bdf8',
            confirmButtonText: "Yes",
        }).then((result)=>{
            if (result.isConfirmed || result.isDismissed) {
                authStore.logoutResponse = null
                authStore.loading = false;

                router.push('/login')
            }
        })
    } else {
        return
    }
})

async function fetchData(data) {
    nameRoutePath.value = data.name;
}

function logout(){
    Swal.fire({
        icon: "warning",
        title: "Are you sure want Logout ? ",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: '#38bdf8',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            authStore.logout()
        } else{
            return false;
        }
    });
}

function goBack(){
    router.push('/')
}

</script>

<style scoped>
.v-leave-active {
  transition: opacity 3s ease;
}

</style>