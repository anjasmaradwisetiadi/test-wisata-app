<template>
    <div id="Navbar">
        <transition name="fade" v-if="nameRoutePath !== 'notification'">
            <div class="w-screen flex flex-row justify-between title text-center pb-3 pt-4 mb-8 px-3 z-10 fixed bg-white ">
                <div class="w-1/2 flex justify-start">
                    <h3 class="text-xl text-red-primary font-bold ">KerjaYuk !</h3>
                </div>
                <div class="w-1/2 flex justify-end items-center">
                    <div class="cursor-pointer" @click="goNotification()">
                        <span class="material-icons-outlined" style="font-size: 24px;">
                            notification_add
                        </span>
                    </div>
                </div>  
            </div>
        </transition>
        <transition name="fade" v-if="nameRoutePath === 'notification'">
                <div class="flex justify-start w-screen flex-row title text-center pb-3 pt-4 border-b-2 mb-8 px-3 border-t z-10 fixed bg-white shadow-md">
                    <div class="mr-3 cursor-pointer flex items-center" @click="goBack()">
                        <span class="material-icons" style="font-size: 24px;">
                            arrow_back
                        </span>
                    </div>
                    <h3 class="text-xl text-red-primary font-semibold ">Notification</h3>
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

function goNotification(){
    router.push('/notification')
}

function goBack(){
    router.go(-1)
}

</script>

<style scoped>
.v-leave-active {
  transition: opacity 3s ease;
}

</style>