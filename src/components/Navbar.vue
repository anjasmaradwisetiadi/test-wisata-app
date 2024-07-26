<template>
    <div id="Navbar">
        <transition name="fade">
            <div class="w-screen flex justify-center title text-center pb-3 pt-4 mb-8 px-3 z-10 fixed bg-sky-400 shadow-lg">
                <div class="container flex flex-row justify-between">
                    <div class="w-1/2 flex justify-start cursor-pointer" @click="goBack()">
                        <h3 class="lg:text-4xl md:text-4xl text-xl text-white font-bold py-5">App Todo List</h3>
                    </div>
                    <div class="w-1/2 flex justify-end items-center">
                        <div class="cursor-pointer" @click="logout()">
                            <h3 class="lg:text-xl md:text-4xl text-xl text-white font-bold py-5">
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
import { ref, watch, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nameRoutePath = ref('');

watch(() => router.currentRoute.value, fetchData, { immediate: true })

onMounted(()=>{

})

onBeforeMount(()=>{
    const paramsRoute = router.currentRoute.value.name;
    nameRoutePath.value = paramsRoute
})

async function fetchData(data) {
    nameRoutePath.value = data.name;
}

function logout(){
    router.push('/notification')
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